import UILayout from "@/UI/Elements/Layout";
import ViewHeader from "@/UI/Container/ViewHeader";
import {
  useGetSinglePaperQuery,
  useGetQuestionExplanationQuery,
} from "@/service/paper";
import { useGetChildrenListQuery } from "@/service/children";
import {  useParams } from "react-router-dom";
import { CheckCircleIcon, XCircleIcon, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import UIButton from "@/UI/Elements/Button";

const PaperView = () => {
  const param = useParams();
  const { id } = param;
  
  const [urlDate, setUrlUpdate] = useState(false);
  const [selectedQuestionForLearning, setSelectedQuestionForLearning] = useState(null);
  const { data: singlePaper, refetch: DetailRefetch } = useGetSinglePaperQuery(
    id,
    { skip: !id }
  );

  const { data: explanationData, isLoading: loadingExplanation } = useGetQuestionExplanationQuery(
    {
      questionId: id,
      questionNumber: selectedQuestionForLearning?.questionNumber
    },
    { skip: !id || !selectedQuestionForLearning?.questionNumber }
  );

  const { data: children, refetch } = useGetChildrenListQuery({});
  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    DetailRefetch();
  }, [urlDate]);

  const questions = singlePaper?.data?.questions ?? [];
  const answers = singlePaper?.data?.answers ?? [];

  
  

  const totalMarks = questions.length;
  const obtainedMarks = answers.reduce((score, answer) => {
    const question = questions.find(
      (q) => q.questionNumber === answer.questionNumber
    );

    if (answer.option === "E") {
      return score;
    }

    if (question?.correctAnswer === answer.option) {
      return score + 1;
    }

    return score - 2;
  }, 0);

  // Filter only wrong answers
  const wrongAnswers = answers.filter((answer) => {
    const question = questions.find(
      (q) => q.questionNumber === answer.questionNumber
    );
    return question?.correctAnswer !== answer.option && answer.option !== "E";
  });

  console.log('selectedQuestionForLearning', selectedQuestionForLearning);
  

  // Set default selected question to first wrong answer when answers exist
  useEffect(() => {
    if (wrongAnswers.length > 0 && !selectedQuestionForLearning) {
      const firstWrongQuestion = questions.find(
        (q) => q.questionNumber === wrongAnswers[0].questionNumber
      );

      console.log('firstWrongQuestion #', firstWrongQuestion);
      
      if (firstWrongQuestion) {
        setSelectedQuestionForLearning(firstWrongQuestion);
      }
    }
  }, [wrongAnswers, questions, selectedQuestionForLearning]);



  const handleLearning = (question) => {
    console.log('question # >>>> <<<< ', question);
    
    setSelectedQuestionForLearning(question);
  };

  console.log('loadingExplanation ....', loadingExplanation);
  

  const renderQuestions = () => {
    const [childOptions, setChildOptions] = useState([]);

    useEffect(() => {
      const options = children?.data?.map((child) => ({
        label: child.name,
        value: child._id,
      }));
      setChildOptions(options);
    }, [children?.data]);

    console.log('answers # >>>> <<<< ', answers);
    console.log('questions # >>>> <<<< ', questions);
    

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
                  <div className="mt-4 flex justify-end">
                    <UIButton
                      variant="outline"
                      size="sm"
                      onClick={() => handleLearning(question)}
                      className="flex items-center gap-2"
                      disabled={loadingExplanation && selectedQuestionForLearning?.questionNumber === question.questionNumber}
                    >
                      {loadingExplanation && selectedQuestionForLearning?.questionNumber === question.questionNumber ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                          <span className="text-sm">Loading...</span>
                        </>
                      ) : (
                        <>
                          <BookOpen size={16} />
                          <span className="text-sm">Learn</span>
                        </>
                      )}
                    </UIButton>
                  </div>
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
      <div className="flex flex-col md:flex-row px-4 md:px-12 py-4 space-y-6 md:space-y-0 md:space-x-8">
        <div className="w-full md:w-3/5">
          <div className="border border-dark p-4 md:p-6 rounded-lg shadow">
            {renderQuestions()}
          </div>
        </div>

        {/* Learning Section */}
        <div className="w-full md:w-1/3">
          <div className="border border-dark shadow rounded-lg p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-bold text-center text-gray-800 border-b pb-3 mb-4">
              Learning Content
            </h3>
            {loadingExplanation && selectedQuestionForLearning ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-500 mt-2">Loading explanation for Question {selectedQuestionForLearning.questionNumber}...</p>
              </div>
            ) : selectedQuestionForLearning && explanationData?.data ? (
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Question ID: {selectedQuestionForLearning.questionNumber}</h4>
                  <p className="text-sm text-blue-700">
                    {explanationData.data?.description || `This is the learning content for question ${selectedQuestionForLearning.questionNumber}.`}
                  </p>
                </div>
                
                {explanationData.data?.keyConcepts && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Key Concepts</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      {explanationData.data.keyConcepts.map((concept, index) => (
                        <li key={index}>• {concept}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {explanationData.data?.explanation && (
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">Explanation</h4>
                    <p className="text-sm text-purple-700">
                      {explanationData.data.explanation}
                    </p>
                  </div>
                )}

                {explanationData.data?.studyTips && (
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">Study Tips</h4>
                    <div className="text-sm text-yellow-700">
                      {explanationData.data.studyTips.map((tip, index) => (
                        <p key={index}>• {tip}</p>
                      ))}
                    </div>
                  </div>
                )}

                {explanationData.data?.additionalResources && (
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-indigo-800 mb-2">Additional Resources</h4>
                    <div className="text-sm text-indigo-700">
                      {explanationData.data.additionalResources}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <p>No learning content available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </UILayout>
  );

}

export default PaperView
