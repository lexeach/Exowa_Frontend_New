import UILayout from "@/UI/Elements/Layout";
import { useGetSinglePaperQuery } from "@/service/paper";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { CheckCircleIcon } from "lucide-react";
import { ErrorToaster } from "@/UI/Elements/Toast";
import { useAnswerPaperMutation } from "@/service/paper";
import { BaseURL } from "../../config";

const Answer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [answerQuestion] = useAnswerPaperMutation();

  const { data: singlePaper, isLoading: paperLoading } = useGetSinglePaperQuery(
    id,
    { skip: !id }
  );

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  const questions = singlePaper?.data?.questions ?? [];
  const parentId = singlePaper?.data?.author?._id;

  // DEBUGGING: Log answers state and button disable status
  useEffect(() => {
    if (!paperLoading && questions.length > 0) {
      console.log("Total Questions:", questions.length);
      console.log("Answers Recorded:", Object.keys(answers).length, answers);
      console.log("Is Submit Button Disabled?", Object.keys(answers).length < questions.length);
    }
  }, [answers, questions.length, paperLoading]);
  // END DEBUGGING

  const handleOptionChange = (
    questionNumber: number,
    selectedOption: string
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [questionNumber]: selectedOption,
    }));
    console.log(`Q${questionNumber} selected: ${selectedOption}`);
  };

  const renderQuestions = () => {
    return (
      <div>
        {questions.map((question) => (
          <div
            key={question.questionNumber}
            className="p-4 rounded-md my-4 bg-white"
          >
            <h2 className="text-lg font-bold">
              Question {question.questionNumber}: {question.question}
            </h2>
            <div className="mt-4 space-y-2">
              {Object.entries(question.choices).map(([key, value]) => (
                <div key={key} className="relative flex items-center">
                  <label
                    htmlFor={`question-${question.questionNumber}-option-${key}`}
                    className="flex items-center space-x-2 cursor-pointer w-full p-3 rounded-md hover:bg-gray-100 transition-colors duration-150 select-none"
                  >
                    <input
                      type="radio"
                      name={`question-${question.questionNumber}`}
                      id={`question-${question.questionNumber}-option-${key}`}
                      value={key}
                      checked={answers[question.questionNumber] === key}
                      onChange={(e) => {
                        handleOptionChange(question.questionNumber, key);
                      }}
                      className="absolute z-10 left-0 top-0 w-full h-full opacity-0 cursor-pointer"
                      aria-hidden="true"
                    />

                    <span className={`
                        w-5 h-5 border-2 rounded-full flex items-center justify-center flex-shrink-0
                        ${answers[question.questionNumber] === key
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-400'
                        }
                    `}>
                      {answers[question.questionNumber] === key && (
                        <CheckCircleIcon
                          width={16}
                          height={16}
                          className="text-white"
                        />
                      )}
                    </span>
                    <span className="font-medium text-gray-800 break-words">
                      {value}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const handleSubmit = async () => {
    console.log("Submit button clicked!"); // Check if this logs
    console.log("Current answers length:", Object.keys(answers).length);
    console.log("Total questions length:", questions.length);

    if (Object.keys(answers).length === questions.length) {
      console.log("All questions answered. Proceeding with submission.");
      setIsSubmitted(true);
      const formattedAnswers = Object.entries(answers).map(
        ([questionNumber, option]) => ({
          questionNumber: Number(questionNumber),
          option,
        })
      );

      try {
        await answerQuestion({
          questionId: id,
          answers: formattedAnswers,
          userId: parentId,
        }).unwrap();

        setTimeout(() => {
          //const AnswerURL = `${BaseURL}/#/auth/result/${id}`;
          navigate("/auth/thankyou", { state: id });
           setIsAnswered(true);
          window.open(AnswerURL, "_blank");
        }, 1000);
      } catch (error) {
        // *** IMPORTANT: Ensure error is explicitly logged for debugging ***
        console.error("Submission Error:", error);
        ErrorToaster(error?.data?.message || "Issue in submitting answers");
      }
    } else {
      console.log("Not all questions answered yet. Button remains disabled.");
      ErrorToaster(`Please answer all ${questions.length} questions.`);
    }
  };

  if (paperLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pb-12">
      <UILayout>
        <div className="p-6 text-center">
          <p className="font-semibold text-4xl text-content leading-[70px]">
            Question Paper
          </p>
        </div>
        <div
          className="flex justify-center px-4"
          style={{ maxHeight: "calc(100vh - 150px)" }}
        >
          <div className="w-full max-w-4xl border border-dark p-6 rounded-lg shadow overflow-y-auto">
            {renderQuestions()}
            {/* *** IMPORTANT CHANGE HERE: Make the parent div relative with z-index *** */}
            <div className="text-right relative z-20">
              <button
                onClick={handleSubmit}
                disabled={Object.keys(answers).length < questions.length}
                className={`mt-6 px-6 py-2 rounded-lg text-white transition-colors duration-200 ${
                  Object.keys(answers).length === questions.length
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Submit
              </button>
            </div>
            {isSubmitted && (
              <div className="mt-4 text-green-600 font-semibold">
                Answers submitted successfully!
              </div>
            )}
          </div>
        </div>
      </UILayout>
    </div>
  );
};

export default Answer;
