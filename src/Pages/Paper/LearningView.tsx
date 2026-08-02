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

import UIButton from "@/UI/Elements/Button";

import {  useParams } from "react-router-dom";
import { CheckCircleIcon, XCircleIcon, BookOpen } from "lucide-react";

import { useEffect, useState, useRef } from "react";
//import axios from "axios";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import api from "@/service/apiSlice";




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
const PaperView = () => {
  const param = useParams();
  const { id } = param;
  
  const [selectedQuestionForLearning, setSelectedQuestionForLearning] =
  useState(null);

const [openAccordion, setOpenAccordion] =
  useState("");

const [verificationOpen, setVerificationOpen] =
  useState(false);

interface VerificationQuestionState {
    questionNumber:number;
    [key:string]:any;
}

const [verificationQuestion,setVerificationQuestion]=
useState<VerificationQuestionState | null>(null);

const [completedQuestions, setCompletedQuestions] =
  useState<CompletedQuestions>({});

//====================================================
// Browser Learning Resources
//====================================================

const [browserVideos, setBrowserVideos] =
  useState<any[]>([]);

const [browserPdfs, setBrowserPdfs] =
  useState<any[]>([]);

const resourceCache =
    sessionStorage;

const [loadingResources, setLoadingResources] =
  useState(false);
  const [explanationLoading, setExplanationLoading] =
  useState(false);

const explanationTimer =
  useRef<NodeJS.Timeout | null>(null);
  
  const [waitingForExplanation, setWaitingForExplanation] =
useState(false);

const pollingTimer =
useRef<NodeJS.Timeout | null>(null);

const [selectedPdf, setSelectedPdf] =
  useState<string | null>(null);

const [selectedVideo, setSelectedVideo] =
  useState<string | null>(null);
  const [playingVideo, setPlayingVideo] =
  useState<any>(null);

const videoPlayerRef = useRef<HTMLDivElement>(null);

const [iframeReady, setIframeReady] = useState(false);
  const [getVerificationStatus] =
  useLazyGetLearningVerificationQuery();

const { data: singlePaper, refetch: DetailRefetch } =
  useGetSinglePaperQuery(id, {
    skip: !id,
  });

const {
    data: allLearningResources,
    refetch: refetchAllLearningResources,
} = useGetAllLearningResourcesQuery(id,{
    skip:!id,
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

  useEffect(() => {

    if (
        waitingForExplanation &&
        learningData?.data
    ) {

        setWaitingForExplanation(false);

        if (pollingTimer.current) {
            clearInterval(pollingTimer.current);
        }

        refetchAllLearningResources();

        loadBrowserResources();

        setOpenAccordion(
            `question-${selectedQuestionForLearning?.questionNumber}`
        );

    }

}, [
    learningData,
    waitingForExplanation
]);

  const questions = singlePaper?.data?.questions ?? [];
  const answers = singlePaper?.data?.answers ?? [];

  // Filter only wrong answers
  const wrongAnswers = answers.filter((answer) => {
    const question = questions.find(
      (q) => q.questionNumber === answer.questionNumber
    );
    return question?.correctAnswer !== answer.option;
  });
  useEffect(() => {

  if (!id || wrongAnswers.length === 0)
    return;

  const loadVerificationStatus =
    async () => {

      const completed = {};

      for (const answer of wrongAnswers) {

        try {

          const response: any =
            await getVerificationStatus({

              paperId: id,

              questionNumber:
                answer.questionNumber,

            }).unwrap();

          if (
            response?.data?.status ===
            "Completed"
          ) {

            completed[
              answer.questionNumber
            ] = true;

          }

        } catch (error) {

          console.error(
            "Verification status error",
            error
          );

        }

      }

      setCompletedQuestions(
        completed
      );

    };

  loadVerificationStatus();

}, [
  id,
  wrongAnswers,
  getVerificationStatus,
]);
  // Set default selected question to first wrong answer when answers exist
 // Set default selected question to first wrong answer when answers exist
useEffect(() => {
  if (
    wrongAnswers.length > 0 &&
    !selectedQuestionForLearning &&
    allLearningResources?.data
  ) {
    const firstWrongQuestion = questions.find(
      (q) => q.questionNumber === wrongAnswers[0].questionNumber
    );

    if (!firstWrongQuestion) return;

    const learningItem = allLearningResources.data.find(
      (item) =>
        item.questionIndex ===
        firstWrongQuestion.questionNumber
    );

    setSelectedQuestionForLearning({
      ...firstWrongQuestion,
      learningId: learningItem?._id,
    });
  }
}, [
  wrongAnswers,
  questions,
  selectedQuestionForLearning,
  allLearningResources,
]);
  //--------------------------------------------------
// Auto Load Browser Resources
//--------------------------------------------------

useEffect(() => {

    if (learningData?.data?.videoSearchQuery) {

        loadBrowserResources();

    }

}, [

    learningData

]);



 const handleLearning = async (
    question: any,
    accordionValue: string
) => {

    if (openAccordion === accordionValue) {
        setOpenAccordion("");
        return;
    }

    const learningItem =
        allLearningResources?.data?.find(
            (item: any) =>
                Number(item.questionIndex) ===
                Number(question.questionNumber)
        );

    if (!learningItem) {
        console.error(
            "Learning resource not found."
        );
        return;
    }

    setSelectedQuestionForLearning({
        ...question,
        learningId: learningItem._id,
    });

    setOpenAccordion(accordionValue);

    setBrowserVideos([]);
    setBrowserPdfs([]);
    setSelectedVideo(null);
    setSelectedPdf(null);

    setWaitingForExplanation(true);

    refetchLearningResources();

    if (pollingTimer.current) {
        clearInterval(pollingTimer.current);
    }

    pollingTimer.current = setInterval(async () => {

        try {

            const result: any =
                await refetchLearningResources();

            if (result?.data?.data) {

                clearInterval(
                    pollingTimer.current!
                );

                pollingTimer.current = null;

                setWaitingForExplanation(false);

                refetchAllLearningResources();

                loadBrowserResources();

            }

        } catch (err) {

            console.log(
                "Waiting for explanation..."
            );

        }

    }, 3000);

};

  
  // Function to parse and render markdown-like content

  //====================================================
// Provider Placeholder
//====================================================

const loadBrowserResources = async () => {

    if (!learningData?.data)
        return;

    try {

        setLoadingResources(true);

       const query =
    learningData.data.videoSearchQuery || "";
      if (!query) {

    setBrowserVideos([]);

    setLoadingResources(false);

    return;

}

const cacheKey =
    `yt_${query}`;

const cached =
    resourceCache.getItem(cacheKey);

if (cached) {

    const videos =
        JSON.parse(cached);

    setBrowserVideos(videos);

    if (videos.length > 0) {

        setIframeReady(false);

setSelectedVideo(videos[0].videoId);

setPlayingVideo(videos[0]);

    }

    setLoadingResources(false);

    return;

}

        if (!query) {

    setBrowserVideos([]);

    setLoadingResources(false);

    return;

}
        //--------------------------------------------------
        // Search first query
        //--------------------------------------------------


      console.log("API URL =", import.meta.env.VITE_API_URL);

console.log(
    "Calling =>",
    `${import.meta.env.VITE_API_URL}/api/youtube/search`
);
      
       const response = await api.get("/api/youtube/search", {
    params: {
        q: query,
    },
});

        const videos = response.data.videos || [];

resourceCache.setItem(

    cacheKey,

    JSON.stringify(videos)

);

setBrowserVideos(videos);

if (videos.length > 0) {

    setIframeReady(false);

setSelectedVideo(videos[0].videoId);

setPlayingVideo(videos[0]);

}

    }

    catch (error) {

        console.error(

            "Video Search Error",

            error

        );

        setBrowserVideos([]);

    }

    finally {

        setLoadingResources(false);

    }

};
  
  const parseExplanationContent = (text) => {
    if (!text) return null;

    // Split text into lines
    const lines = text.split('\n');
    const elements = [];
    let currentParagraph = [];
    let listItems = [];

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        const paragraphText = currentParagraph.join(' ');
        elements.push(
          <p key={`p-${elements.length}`} className="mb-3 leading-relaxed">
            {parseInlineFormatting(paragraphText)}
          </p>
        );
        currentParagraph = [];
      }
    };

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`ul-${elements.length}`} className="mb-3 ml-4 space-y-1">
            {listItems.map((item, idx) => (
              <li key={idx} className="leading-relaxed">
                {parseInlineFormatting(item)}
              </li>
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    const parseInlineFormatting = (line) => {
      // Handle bold text (but not headings)
      const parts = [];
      let lastIndex = 0;
      const boldRegex = /\*\*(.+?)\*\*/g;
      let match;

      while ((match = boldRegex.exec(line)) !== null) {
        // Add text before the bold
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        // Add bold text
        parts.push(<strong key={`bold-${match.index}`} className="font-semibold">{match[1]}</strong>);
        lastIndex = match.index + match[0].length;
      }

      // Add remaining text
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      return parts.length > 0 ? parts : line;
    };

    lines.forEach((line) => {
      const trimmedLine = line.trim();

      // Empty line - flush current paragraph or list
      if (!trimmedLine) {
        flushParagraph();
        flushList();
        return;
      }

      // Check for heading (bold text followed by colon or at start of line)
      const headingMatch = trimmedLine.match(/^\*\*(.+?)\*\*:?$/);
      if (headingMatch) {
        flushParagraph();
        flushList();
        elements.push(
          <h3 key={`h3-${elements.length}`} className="font-bold text-gray-900 text-base mb-2 mt-4">
            {headingMatch[1]}
          </h3>
        );
        return;
      }

      // Check for bullet point (starts with * or number.)
      const bulletMatch = trimmedLine.match(/^[*•]\s+(.+)$/);
      const numberedMatch = trimmedLine.match(/^\d+\.\s+(.+)$/);
      
      if (bulletMatch || numberedMatch) {
        flushParagraph();
        const content = bulletMatch ? bulletMatch[1] : numberedMatch[1];
        listItems.push(content);
        return;
      }

      // Regular text - add to current paragraph
      currentParagraph.push(trimmedLine);
    });

    // Flush any remaining content
    flushParagraph();
    flushList();

    return elements;
  };

  const renderQuestions = () => {
    return (
      <div className="space-y-4">
        {/* Questions */}
        {answers.length === 0
          ? questions.map((question) => (
              <div
                key={question.questionNumber}
                className="p-4 rounded-md bg-white"
              >
                <h2 className="text-base md:text-lg font-bold break-words">
                  Question {question.questionNumber}: {question.question}
                </h2>
                <div className="mt-2 md:mt-4 space-y-2">
                  {Object.entries(question.choices).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center space-x-2 md:space-x-3"
                    >
                      <span className="font-medium">{key}:</span>
                      <span className="text-sm md:text-base break-words">
                        {String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          : wrongAnswers.map((wrongAnswer) => {
              const question = questions.find(
                (q) => q.questionNumber === wrongAnswer.questionNumber
              );

              if (!question) return null;

              return (
                <div
                  key={question.questionNumber}
                  className="p-4 rounded-md bg-white border-l-4 border-red-500"
                >
                  <h2 className="text-base md:text-lg font-bold break-words">
                    Question {question.questionNumber}: {question.question}
                  </h2>
                  <div className="mt-2 md:mt-4 space-y-2">
                    {Object.entries(question.choices).map(([key, value]) => {
                      const isCorrect = key === question.correctAnswer;
                      const isUserAnswer = wrongAnswer?.option === key;

                      return (
                        <div
                          key={key}
                          className={`flex items-center space-x-2 md:space-x-3 ${
                            isUserAnswer
                              ? isCorrect
                                ? "text-green-600"
                                : "text-red-600"
                              : ""
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isUserAnswer}
                            readOnly
                            className="h-4 w-4 accent-blue-600"
                          />
                          <span className="font-medium">{key}:</span>
                          <span className="text-sm md:text-base break-words">
                            {String(value)}
                          </span>
                          {isUserAnswer &&
                            (isCorrect ? (
                              <CheckCircleIcon className="h-5 w-5 text-green-600" />
                            ) : (
                              <XCircleIcon className="h-5 w-5 text-red-600" />
                            ))}
                        </div>
                      );
                    })}
                  </div>

                  {/* Accordion for Learning Content */}
                  {(() => {
                    const isSelected =
                      selectedQuestionForLearning?.questionNumber === question.questionNumber;
                    const showPendingMessage =
                      isSelected &&
                      (
                        (learningIsError &&
                          isExplanationGenerationPending(learningError)) ||
                        learningData?.code === 404
                      );

                    if (showPendingMessage) {
                      return (
                        <div className="mt-4 rounded-md border border-yellow-200 bg-yellow-50 p-4">
                          <h4 className="font-semibold text-yellow-900 text-base">
                            Explanation in progress
                          </h4>
                          <p className="mt-2 text-sm text-yellow-800">
                            Explanation generation in progress. Please try again later.
                          </p>
                        </div>
                      );
                    }

                    return (
                      <Accordion
                        type="single"
                        collapsible
                        value={openAccordion}
                        onValueChange={() =>
                          handleLearning(
                            question,
                            `question-${question.questionNumber}`
                          )
                        }
                        className="mt-4"
                      >
                        <AccordionItem
                          value={`question-${question.questionNumber}`}
                          className="border-none"
                        >
                          <AccordionTrigger
                            className="text-sm font-semibold text-blue-600 hover:text-blue-800 hover:no-underline py-2 justify-start gap-2"
                            disabled={
                              (loadingLearning || fetchingLearning) &&
                              selectedQuestionForLearning?.questionNumber ===
                                question.questionNumber
                            }
                          >
                            {(loadingLearning || fetchingLearning) &&
                            selectedQuestionForLearning?.questionNumber ===
                              question.questionNumber ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                                <span>Loading Learning Content...</span>
                              </>
                            ) : (
                              <>
                                <BookOpen size={16} />
                                <span>Learning Content</span>
                              </>
                            )}
                          </AccordionTrigger>
                          <AccordionContent>
                            {waitingForExplanation ? (

    <div className="py-8 text-center">

        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>

        <h3 className="mt-5 text-lg font-semibold text-blue-700">

            Explanation Loading...

        </h3>

        <p className="mt-2 text-gray-500">

            Please wait while AI is generating your learning content.

        </p>

        <p className="mt-2 text-xs text-gray-400">

            This usually takes 10–30 seconds.

        </p>

    </div>

) : (loadingLearning || fetchingLearning) &&
selectedQuestionForLearning?.questionNumber ===
question.questionNumber ? (

    <div className="text-center py-5">

        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>

        <p className="text-gray-500 mt-3">

            Loading Explanation...

        </p>

    </div>

) : selectedQuestionForLearning?.questionNumber ===
question.questionNumber &&
learningData?.data ? (

  
                              <div className="space-y-4">
                                {/* Explanation Section */}
                                {/* Learning Resources */}

{learningData?.data && (

<div className="space-y-4">

    {/* Topic */}

    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">

        <h4 className="font-bold text-blue-700 mb-2">
            📘 Topic
        </h4>

        <p className="text-gray-700">
            {learningData.data.topic}
        </p>

    </div>

    {/* Learning Objective */}

    <div className="bg-green-50 border border-green-200 rounded-lg p-4">

        <h4 className="font-bold text-green-700 mb-2">
            🎯 Learning Objective
        </h4>

        <p className="text-gray-700">
            {learningData.data.learningObjective}
        </p>

    </div>

    {/* Keywords */}

    {/* Explanation */}

<div className="bg-white border border-blue-200 rounded-lg p-4">

    <h4 className="font-bold text-blue-700 mb-3">

        📖 Explanation

    </h4>

    <div className="prose prose-sm max-w-none text-gray-700 leading-7">

        {parseExplanationContent(
            learningData.data.explanation
        )}

    </div>

</div>
  
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">

        <h4 className="font-bold text-yellow-700 mb-3">
            🏷 Keywords
        </h4>

        <div className="flex flex-wrap gap-2">

            {(learningData.data.keywords || []).map(
                (item, index) => (

                    <span
                        key={index}
                        className="px-3 py-1 rounded-full bg-yellow-200 text-sm"
                    >
                        {item}
                    </span>

                )
            )}

        </div>

    </div>

    {/* YouTube */}

    <div
    className="
        bg-red-50
        border
        border-red-200
        rounded-xl
        p-3
        md:p-5
    "
>

        <h4
    className="
        font-bold
        text-red-700
        text-lg
        mb-4
        flex
        items-center
        justify-between
        flex-wrap
        gap-2
    "
>
            ▶ Learn from YouTube

<span
    className="
        px-2
        py-1
        rounded-full
        bg-white
        text-xs
        text-gray-500
        border
    "
>

({browserVideos.length})

</span>
        </h4>

        <div
    className="
        grid
        gap-5
    "
>
          {loadingResources ? (

<div className="text-center py-10">

    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>

    <p className="mt-3 text-gray-500">

        Searching YouTube...

    </p>

</div>

) : (
  <div
    ref={videoPlayerRef}
    className="
        mb-6
        sticky
        top-2
        z-10
    "
>
   {selectedVideo && (

<>

{!iframeReady && (

<div className="absolute inset-0 flex items-center justify-center bg-black/70 z-20 rounded-xl">

<div className="text-white text-center">

<div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white mx-auto"></div>

<p className="mt-3">

Preparing Video...

</p>

</div>

</div>

)}


<div
    className="
        relative
        w-full
        overflow-hidden
        rounded-2xl
        border
        shadow-lg
        bg-black
        aspect-video
    "
>

        
        <iframe
    key={selectedVideo}
    src={`https://www.youtube-nocookie.com/embed/${selectedVideo}?autoplay=1&playsinline=1&controls=1&rel=0&modestbranding=1&enablejsapi=1`}
    title="Learning Video"
    className="absolute inset-0 w-full h-full"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    onLoad={()=>{
        setIframeReady(true);
    }}
/>
    

</div>
    )}
  </div>
)}
  {browserVideos.length === 0 ? (

    <div className="text-center py-8 text-gray-500">

        <div className="space-y-3">

            <p>No videos found.</p>

            <button
                type="button"
                onClick={() => {

                    resourceCache.clear();

                    loadBrowserResources();

                }}
                className="px-4 py-2 rounded-lg bg-red-600 text-white"
            >
                Retry
            </button>

        </div>

    </div>

) : (

    browserVideos.map((video, index) => (

<div
    className="..."
>

    <img
        src={video.thumbnail}
        alt={video.title}
        className="
w-full
md:w-44
h-52
md:h-28
rounded-lg
object-cover
flex-shrink-0
shadow
mx-auto
"
    />

   <div
    className="
        flex-1
        flex
        flex-col
        justify-between
        text-center
        md:text-left
        w-full
    "
>

    <div>

        {playingVideo?.videoId === video.videoId && (

            <div className="mb-3">

                <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-600 text-white text-xs font-bold">

                    ▶ NOW PLAYING

                </span>

            </div>

        )}

        <h3
            className="
                text-lg
                font-bold
                text-gray-900
                leading-6
                break-words
            "
        >
            {video.title}
        </h3>

        <p
            className="
                mt-2
                text-sm
                text-gray-500
                break-words
            "
        >
            📺 {video.channelTitle}
        </p>

        <p
            className="
                mt-1
                text-sm
                font-medium
                text-blue-600
            "
        >
            ⏱ {video.duration}
        </p>

    </div>

    <button
    type="button"
    disabled={!iframeReady}
    onClick={(e) => {

        e.preventDefault();

        e.stopPropagation();

        if(!iframeReady) return;

        setIframeReady(false);

        setSelectedVideo(video.videoId);

        setPlayingVideo(video);

        setTimeout(() => {

            videoPlayerRef.current?.scrollIntoView({

                behavior:"smooth",

                block:"start",

            });

        },150);

    }}
    className={`

        mt-5

        w-full

        rounded-lg

        py-3

        font-semibold

        transition

        ${
            iframeReady
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }

    `}
>

{iframeReady ? "▶ Play Video" : "Preparing Video..."}

</button>

</div>

</div>
))
)}
</div>
</div>
  
    {/* PDF */}

    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">

        <h4 className="font-bold text-purple-700 mb-3">
            📄 Learn from PDF Notes
        </h4>

      {selectedPdf && (
    <div
    ref={videoPlayerRef}
    className="mb-5"
>
        <iframe
            src={selectedPdf}
            width="100%"
            height="700"
            className="rounded-xl border"
            title="PDF Viewer"
        />
    </div>
)}

        <div className="grid gap-3">

{browserPdfs.length === 0 ? (

<div className="text-center py-6 text-gray-500">

PDF Search Provider Coming Soon

</div>

) : (

browserPdfs.map((pdf, index) => (
        <div
    key={index}
    onClick={() => setSelectedPdf(pdf.url)}
    className="cursor-pointer border rounded-lg p-3 hover:bg-purple-100 transition"
>
            <div className="font-medium text-blue-700">
                {pdf.title}
            </div>
        </div>
    ))
  )}
</div>
    </div>

</div>

)}
                                {/* Learning Verification Button */}

<div className="flex justify-end">
  {completedQuestions[question.questionNumber] ? (
    <UIButton
      type="button"
      disabled
      className="bg-green-600 text-white cursor-default"
    >
      ✓ Learning Verified
    </UIButton>
  ) : (
    <UIButton
      type="button"
      onClick={() => {
        setVerificationQuestion(question);
        setVerificationOpen(true);
      }}
    >
      I Learnt
    </UIButton>
  )}
</div>
                                {/* References Section */}
                                {/* {learningData.data?.references && (
                                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200"> */}
                                  {/* <h4 className="font-bold text-purple-900 text-base mb-3">
                                    📚 Additional Learning Resources
                                  </h4> */}
                                  
                                  {/* Videos */}
                                  {/* {learningData.data.references.videos && learningData.data.references.videos.length > 0 && (
                                    <div className="mb-4">
                                      <h5 className="font-semibold text-purple-800 text-sm mb-2 flex items-center gap-2">
                                        🎥 Recommended Videos
                                      </h5>
                                      <ul className="space-y-2">
                                        {learningData.data.references.videos.map((video, index) => (
                                          <li key={index} className="text-sm text-gray-700 pl-4 border-l-2 border-purple-300">
                                            {video}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )} */}
                                  
                                  {/* Articles */}
                                  {/* {learningData.data.references.articles && learningData.data.references.articles.length > 0 && (
                                    <div className="mb-4">
                                      <h5 className="font-semibold text-purple-800 text-sm mb-2 flex items-center gap-2">
                                        📄 Helpful Articles
                                      </h5>
                                      <ul className="space-y-2">
                                        {learningData.data.references.articles.map((article, index) => (
                                          <li key={index} className="text-sm text-gray-700 pl-4 border-l-2 border-purple-300">
                                            {article}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )} */}
                                  
                                  {/* Books */}
                                  {/* {learningData.data.references.books && learningData.data.references.books.length > 0 && (
                                    <div>
                                      <h5 className="font-semibold text-purple-800 text-sm mb-2 flex items-center gap-2">
                                        📖 Reference Books
                                      </h5>
                                      <ul className="space-y-2">
                                        {learningData.data.references.books.map((book, index) => (
                                          <li key={index} className="text-sm text-gray-700 pl-4 border-l-2 border-purple-300">
                                            {book}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )} */}
                                {/* </div>
                              )} */}
                              </div>
                            ) : selectedQuestionForLearning?.questionNumber ===
                                question.questionNumber && !learningData ? (
                              <div className="text-center py-4">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                                <p className="text-gray-500 text-sm mt-2">
                                  Loading explanation...
                                </p>
                              </div>
                            ) : (
                              <div className="text-center text-gray-500 py-4">
                                <p className="text-sm">
                                  No learning content available
                                </p>
                              </div>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
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
      <ViewHeader
        heading="Question Detail"
        backUrl="/papers"
      />
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
    onClose={() => {
      setVerificationOpen(false);
    }}
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

}

export default PaperView
