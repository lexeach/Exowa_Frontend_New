import UILayout from "@/UI/Elements/Layout";
import ViewHeader from "@/UI/Container/ViewHeader";

import {
  useGetSinglePaperQuery,
  useGetLearningResourcesQuery,
  useGetAllLearningResourcesQuery,
} from "@/service/paper";
import {
  useLazyGetLearningVerificationQuery,
} from "@/service/learningVerification";
import VerificationDialog from "@/components/LearningVerification/VerificationDialog";

import { useParams } from "react-router-dom";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";

import { useEffect, useState, useRef, useCallback } from "react";
import api from "@/service/apiSlice";
import {
    useYoutubePlayer
} from "@/components/Learning/hooks";
import LearningAccordion
from "@/components/Learning/LearningAccordion";

const isExplanationGenerationPending = (error: unknown): boolean => {
  if (!error || typeof error !== "object") {
    return false;
  }

  const { status, data } = error as { status?: number; data?: unknown };

  if (status === 404) {
    return true;
  }

  if (data && typeof data === "object") {
    const { code } = data as { code?: number };
    if (code === 404) {
      return true;
    }
  }

  return false;
};

interface CompletedQuestions {
  [key: number]: boolean;
}

interface VerificationQuestionState {
    questionNumber: number;
    [key: string]: any;
}

const PaperView = () => {
  const param = useParams();
  const { id } = param;
  
  const [selectedQuestionForLearning, setSelectedQuestionForLearning] =
    useState<any>(null);

  const [pendingLearningQuestion, setPendingLearningQuestion] =
    useState<any>(null);

  const [openAccordion, setOpenAccordion] =
    useState("");

  const [verificationOpen, setVerificationOpen] =
    useState(false);

  const [verificationQuestion, setVerificationQuestion] =
    useState<VerificationQuestionState | null>(null);

  const [completedQuestions, setCompletedQuestions] =
    useState<CompletedQuestions>({});

  const [browserVideos, setBrowserVideos] =
    useState<any[]>([]);

  const [browserPdfs, setBrowserPdfs] =
    useState<any[]>([]);

  const learningCacheRef = useRef<Record<number, any>>({});

  const browserCacheRef = useRef<Record<number, {
      videos: any[];
      pdfs: any[];
      selectedVideo?: string | null;
      selectedPdf?: string | null;
  }>>({});

  const resourceCache = sessionStorage;

  const {
      videoPlayerRef,
      selectedVideo,
      setSelectedVideo,
      setPlayingVideo,
      iframeReady,
      setIframeReady,
  } = useYoutubePlayer();

  const [loadingResources, setLoadingResources] =
    useState(false);
  
  const [explanationLoading] = useState(false);

  const [waitingForExplanation, setWaitingForExplanation] =
    useState(false);
  
  const activeQuestionRef = useRef<number | null>(null);
  const browserLoadingRef = useRef(false);
  const resourcesLoadedRef = useRef(false);
  const isRestoringCacheRef = useRef(false);
  const pollingTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
        if (pollingTimer.current) {
            clearInterval(pollingTimer.current);
        }
    };
  }, []);

  const {
      data: allLearningResources,
      refetch: refetchAllLearningResources,
  } = useGetAllLearningResourcesQuery(id, {
      skip: !id,
  });

  const {
      data: learningData,
      error: learningError,
      isError: learningIsError,
      isLoading: loadingLearning,
      isFetching: fetchingLearning,
      refetch: refetchLearningResources,
  } = useGetLearningResourcesQuery(
      selectedQuestionForLearning?.learningId,
      {
          skip: !selectedQuestionForLearning?.learningId,
      }
  );

  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  const saveBrowserCache = useCallback((questionNumber: number) => {
      browserCacheRef.current[questionNumber] = {
          videos: browserVideos,
          pdfs: browserPdfs,
          selectedVideo,
          selectedPdf,
      };
  }, [browserVideos, browserPdfs, selectedVideo, selectedPdf]);

  const restoreBrowserCache = useCallback((questionNumber: number) => {
      const cache = browserCacheRef.current[questionNumber];
      if (!cache) return false;

      isRestoringCacheRef.current = true;
      setBrowserVideos(cache.videos);
      setBrowserPdfs(cache.pdfs);
      setSelectedVideo(cache.selectedVideo || null);
      setSelectedPdf(cache.selectedPdf || null);
      setLoadingResources(false);
      setWaitingForExplanation(false);
      return true;
  }, [setSelectedVideo]);

  const pollLearningUntilReady = useCallback((learningId: string) => {
      if (pollingTimer.current) {
          clearInterval(pollingTimer.current);
          pollingTimer.current = null;
      }

      pollingTimer.current = setInterval(async () => {
          try {
              const result: any = await refetchAllLearningResources();
              const resources = result?.data?.data || [];
              const learningItem = resources.find((x: any) => x._id === learningId);

              if (!learningItem) {
                  console.log("⌛ Waiting Resource");
                  return;
              }

              if (learningItem.status !== "Completed") {
                  console.log("⏳ AI Still Working...");
                  return;
              }

              console.log("✅ Learning Completed");
              if (pollingTimer.current) {
                  clearInterval(pollingTimer.current);
                  pollingTimer.current = null;
              }

              setSelectedQuestionForLearning((prev: any) => ({
                  ...prev,
                  learningId,
                  updatedAt: Date.now(),
              }));

              setTimeout(async () => {
                  try {
                      await refetchLearningResources();
                  } finally {
                      setWaitingForExplanation(false);
                  }
              }, 300);
          } catch (err) {
              console.error(err);
          }
      }, 3000);
  }, [refetchAllLearningResources, refetchLearningResources]);

  const loadBrowserResources = useCallback(async () => {
      if (browserLoadingRef.current) return;
      browserLoadingRef.current = true;

      if (!learningData?.data) {
          browserLoadingRef.current = false;
          setLoadingResources(false);
          return;
      }

      if (isRestoringCacheRef.current) {
          isRestoringCacheRef.current = false;
          browserLoadingRef.current = false;
          return;
      }

      if (browserVideos.length > 0 && selectedVideo) {
          console.log("✅ Browser resources already loaded");
          browserLoadingRef.current = false;
          setLoadingResources(false);
          return;
      }

      try {
          setLoadingResources(true);
          const query = learningData.data.videoSearchQuery || "";

          if (query) {
              const cacheKey = `yt_${query}`;
              const cached = resourceCache.getItem(cacheKey);

              if (cached) {
                  const videos = JSON.parse(cached);
                  setBrowserVideos(videos);
                  if (videos.length > 0) {
                      setIframeReady(false);
                      setSelectedVideo(videos[0].videoId);
                      setPlayingVideo(videos[0]);
                  }
              } else {
                  const response = await api.get("/api/youtube/search", {
                      params: { q: query },
                  });
                  const videos = response.data.videos || [];
                  resourceCache.setItem(cacheKey, JSON.stringify(videos));
                  setBrowserVideos(videos);
                  if (videos.length > 0) {
                      setIframeReady(false);
                      setSelectedVideo(videos[0].videoId);
                      setPlayingVideo(videos[0]);
                  }
              }
          } else {
              setBrowserVideos([]);
          }

          const pdfQuery = learningData.data.pdfSearchQuery || "";
          if (pdfQuery) {
              const pdfKey = `pdf_${pdfQuery}`;
              const cachedPdf = resourceCache.getItem(pdfKey);
              if (cachedPdf) {
                  setBrowserPdfs(JSON.parse(cachedPdf));
              } else {
                  const response = await api.get("/api/pdf/search", {
                      params: { q: pdfQuery },
                  });
                  const pdfs = response.data.pdfs || [];
                  resourceCache.setItem(pdfKey, JSON.stringify(pdfs));
                  setBrowserPdfs(pdfs);
              }
          } else {
              setBrowserPdfs([]);
          }

          if (selectedQuestionForLearning?.questionNumber && !isRestoringCacheRef.current) {
              saveBrowserCache(selectedQuestionForLearning.questionNumber);
          }
      } catch (err) {
          console.error("Browser Resource Error", err);
      } finally {
          browserLoadingRef.current = false;
          setLoadingResources(false);
      }
  }, [learningData, browserVideos, selectedVideo, selectedQuestionForLearning, resourceCache, setIframeReady, setSelectedVideo, setPlayingVideo, saveBrowserCache]);

  const [getVerificationStatus] = useLazyGetLearningVerificationQuery();
  const { data: singlePaper, refetch: DetailRefetch } = useGetSinglePaperQuery(id, {
      skip: !id,
  });

  useEffect(() => {
      if (!id) return;
      const timer = setInterval(async () => {
          const result: any = await refetchAllLearningResources();
          if (result?.data?.data?.length > 0) {
              console.log("Resources arrived");
              if (pendingLearningQuestion) {
                  const item = result.data.data.find(
                      (x: any) => Number(x.questionIndex) === Number(pendingLearningQuestion.questionNumber)
                  );
                  if (item) {
                      activeQuestionRef.current = pendingLearningQuestion.questionNumber;
                      setSelectedQuestionForLearning({
                          ...pendingLearningQuestion,
                          learningId: item._id
                      });
                  }
              }
              clearInterval(timer);
          }
      }, 3000);
      return () => clearInterval(timer);
  }, [id, pendingLearningQuestion, refetchAllLearningResources]);

  useEffect(() => {
      if (!learningData?.data) return;
      console.log("✅ Fresh learning data received");
      setWaitingForExplanation(false);
      if (selectedQuestionForLearning?.questionNumber) {
          learningCacheRef.current[selectedQuestionForLearning.questionNumber] = learningData;
      }
      loadBrowserResources();
      if (pollingTimer.current) {
          clearInterval(pollingTimer.current);
          pollingTimer.current = null;
      }
      setOpenAccordion(`question-${selectedQuestionForLearning?.questionNumber}`);
  }, [learningData, selectedQuestionForLearning, loadBrowserResources]);

  useEffect(() => {
      if (!pendingLearningQuestion || !allLearningResources?.data || allLearningResources.data.length === 0) return;

      const learningItem = allLearningResources.data.find(
          (item: any) => Number(item.questionIndex) === Number(pendingLearningQuestion.questionNumber)
      );

      if (!learningItem) return;

      console.log("✅ Pending Learning Resource Found");
      setBrowserVideos([]);
      setBrowserPdfs([]);
      setSelectedVideo(null);
      setSelectedPdf(null);
      setWaitingForExplanation(true);

      const nextLearning = {
          ...pendingLearningQuestion,
          learningId: learningItem._id,
      };

      activeQuestionRef.current = pendingLearningQuestion.questionNumber;
      setSelectedQuestionForLearning(nextLearning);
      setOpenAccordion(`question-${pendingLearningQuestion.questionNumber}`);
      pollLearningUntilReady(learningItem._id);
      setPendingLearningQuestion(null);
  }, [allLearningResources, pendingLearningQuestion, pollLearningUntilReady, setSelectedVideo]);

  const questions = singlePaper?.data?.questions ?? [];
  const answers = singlePaper?.data?.answers ?? [];

  const wrongAnswers = answers.filter((answer: any) => {
    const question = questions.find((q: any) => q.questionNumber === answer.questionNumber);
    return question?.correctAnswer !== answer.option;
  });

  useEffect(() => {
    if (!id || wrongAnswers.length === 0) return;

    const loadVerificationStatus = async () => {
      const completed: CompletedQuestions = {};
      for (const answer of wrongAnswers) {
        try {
          const response: any = await getVerificationStatus({
            paperId: id,
            questionNumber: answer.questionNumber,
          }).unwrap();

          if (response?.data?.status === "Completed") {
            completed[answer.questionNumber] = true;
          }
        } catch (error) {
          console.error("Verification status error", error);
        }
      }
      setCompletedQuestions(completed);
    };

    loadVerificationStatus();
  }, [id, wrongAnswers, getVerificationStatus]);

  useEffect(() => {
    if (wrongAnswers.length > 0 && !selectedQuestionForLearning && allLearningResources?.data) {
      const firstWrongQuestion = questions.find((q: any) => q.questionNumber === wrongAnswers[0].questionNumber);
      if (!firstWrongQuestion) return;

      const learningItem = allLearningResources.data.find((item: any) => item.questionIndex === firstWrongQuestion.questionNumber);
      setSelectedQuestionForLearning({
        ...firstWrongQuestion,
        learningId: learningItem?._id,
      });
    }
  }, [wrongAnswers, questions, selectedQuestionForLearning, allLearningResources]);

  useEffect(() => {
    if (!learningData?.data) return;
    if (resourcesLoadedRef.current) {
        resourcesLoadedRef.current = false;
        return;
    }
    loadBrowserResources();
  }, [learningData, loadBrowserResources]);

  const handleLearning = useCallback(async (question: any, accordionValue: string) => {
      if (openAccordion === accordionValue) {
          setOpenAccordion("");
          return;
      }

      setOpenAccordion(accordionValue);

      if (restoreBrowserCache(question.questionNumber)) {
          console.log("✅ Browser cache restored");
          const cachedLearning = learningCacheRef.current[question.questionNumber];
          if (cachedLearning) {
              setSelectedQuestionForLearning({
                  ...question,
                  learningId: cachedLearning?.data?._id ?? cachedLearning?._id,
              });
          }
          resourcesLoadedRef.current = true;
          return;
      }

      const isNewQuestion = activeQuestionRef.current !== question.questionNumber;
      if (isNewQuestion) {
          activeQuestionRef.current = question.questionNumber;
          setBrowserVideos([]);
          setBrowserPdfs([]);
          setSelectedVideo(null);
          setSelectedPdf(null);
          setWaitingForExplanation(true);
      }

      let learningItem = allLearningResources?.data?.find(
          (item: any) => Number(item.questionIndex) === Number(question.questionNumber)
      );

      if (!learningItem) {
          setPendingLearningQuestion(question);
          await refetchAllLearningResources();
          return;
      }

      const nextLearning = {
          ...question,
          learningId: learningItem._id,
      };

      setSelectedQuestionForLearning(nextLearning);

      if (learningItem.status === "Completed") {
          resourcesLoadedRef.current = false;
          await refetchLearningResources();
          setWaitingForExplanation(false);
          return;
      }

      pollLearningUntilReady(learningItem._id);
  }, [openAccordion, restoreBrowserCache, allLearningResources, refetchAllLearningResources, refetchLearningResources, pollLearningUntilReady, setSelectedVideo]);

  const renderQuestions = () => {
    return (
      <div className="space-y-4">
        {answers.length === 0
          ? questions.map((question: any) => (
              <div key={question.questionNumber} className="p-4 rounded-md bg-white">
                <h2 className="text-base md:text-lg font-bold break-words">
                  Question {question.questionNumber}: {question.question}
                </h2>
                <div className="mt-2 md:mt-4 space-y-2">
                  {Object.entries(question.choices).map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-2 md:space-x-3">
                      <span className="font-medium">{key}:</span>
                      <span className="text-sm md:text-base break-words">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          : wrongAnswers.map((wrongAnswer: any) => {
              const question = questions.find((q: any) => q.questionNumber === wrongAnswer.questionNumber);
              if (!question) return null;

              return (
                <div key={question.questionNumber} className="p-4 rounded-md bg-white border-l-4 border-red-500">
                  <h2 className="text-base md:text-lg font-bold break-words">
                    Question {question.questionNumber}: {question.question}
                  </h2>
                  <div className="mt-2 md:mt-4 space-y-2">
                    {Object.entries(question.choices).map(([key, value]) => {
                      const isCorrect = key === question.correctAnswer;
                      const isUserAnswer = wrongAnswer?.option === key;
                      return (
                        <div key={key} className={`flex items-center space-x-2 md:space-x-3 ${isUserAnswer ? (isCorrect ? "text-green-600" : "text-red-600") : ""}`}>
                          <input type="checkbox" checked={isUserAnswer} readOnly className="h-4 w-4 accent-blue-600" />
                          <span className="font-medium">{key}:</span>
                          <span className="text-sm md:text-base break-words">{String(value)}</span>
                          {isUserAnswer && (isCorrect ? <CheckCircleIcon className="h-5 w-5 text-green-600" /> : <XCircleIcon className="h-5 w-5 text-red-600" />)}
                        </div>
                      );
                    })}
                  </div>

                  {(() => {
                    const isSelected = selectedQuestionForLearning?.questionNumber === question.questionNumber;
                    const showPendingMessage = isSelected && ((learningIsError && isExplanationGenerationPending(learningError)) || learningData?.code === 404);

                    if (showPendingMessage) {
                      return (
                        <div className="mt-4 rounded-md border border-yellow-200 bg-yellow-50 p-4">
                          <h4 className="font-semibold text-yellow-900 text-base">Explanation in progress</h4>
                          <p className="mt-2 text-sm text-yellow-800">Explanation generation in progress. Please try again later.</p>
                        </div>
                      );
                    }

                    return (
                      <LearningAccordion
                        question={question}
                        openAccordion={openAccordion}
                        setOpenAccordion={setOpenAccordion}
                        handleLearning={handleLearning}
                        loadingLearning={loadingLearning}
                        fetchingLearning={fetchingLearning}
                        waitingForExplanation={waitingForExplanation}
                        learningData={learningData}
                        browserVideos={browserVideos}
                        browserPdfs={browserPdfs}
                        loadingResources={loadingResources}
                        iframeReady={iframeReady}
                        setIframeReady={setIframeReady}
                        selectedVideo={selectedVideo}
                        setVerificationOpen={setVerificationOpen}                    
                        setSelectedVideo={setSelectedVideo}
                        setPlayingVideo={setPlayingVideo}
                        videoPlayerRef={videoPlayerRef}
                        explanationLoading={explanationLoading}
                        completedQuestions={completedQuestions}
                        verificationOpen={verificationOpen}
                        setVerificationQuestion={setVerificationQuestion}
                        resourceCache={resourceCache}
                        loadBrowserResources={loadBrowserResources}
                      />
                    );
                  })()}
                </div>
              );
            })}
      </div>
    );
  };

  return (
    <UILayout>
      <div className="p-4 md:p-6">
        <ViewHeader heading="Question Detail" backUrl="/papers" />
      </div>
      <div className="px-4 md:px-12 py-4">
        <div className="w-full">
          <div className="border border-dark p-4 md:p-6 rounded-lg shadow">
            {renderQuestions()}
          </div>
        </div>
      </div>
      {verificationQuestion && (
        <VerificationDialog
          open={verificationOpen}
          onClose={() => setVerificationOpen(false)}
          paperId={id as string}
          questionNumber={verificationQuestion.questionNumber}
          onCompleted={() => {
            setCompletedQuestions((prev) => ({
              ...prev,
              [verificationQuestion.questionNumber]: true,
            }));
            setVerificationOpen(false);
            DetailRefetch();
          }}
        />
      )}
    </UILayout>
  );
};

export default PaperView;
