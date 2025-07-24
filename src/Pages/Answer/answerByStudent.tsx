import UILayout from "@/UI/Elements/Layout";
import { useGetSinglePaperQuery } from "@/service/paper";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
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

  const questions = singlePaper?.data?.questions ?? [];
  const parentId = singlePaper?.data?.author?._id;

  const handleOptionChange = (
    questionNumber: number,
    selectedOption: string
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [questionNumber]: selectedOption,
    }));
    // *** Add this console log for debugging on mobile! ***
    console.log(`Option selected for Q${questionNumber}: ${selectedOption}`);
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
                <div key={key} className="relative flex items-center"> {/* Added relative to parent of label */}
                  <label
                    htmlFor={`question-${question.questionNumber}-option-${key}`}
                    className="flex items-center space-x-2 cursor-pointer w-full p-3 rounded-md hover:bg-gray-100 transition-colors duration-150 select-none" // Increased padding, added select-none
                    // *** ADD THIS FOR DIAGNOSTIC ***
                    // onClick={(e) => {
                    //   console.log("Label clicked!");
                    //   // If the input doesn't change, you could programmatically click it here
                    //   // const inputEl = document.getElementById(`question-${question.questionNumber}-option-${key}`) as HTMLInputElement;
                    //   // if (inputEl && !inputEl.checked) {
                    //   //   inputEl.click();
                    //   // }
                    // }}
                  >
                    <input
                      type="radio"
                      name={`question-${question.questionNumber}`}
                      id={`question-${question.questionNumber}-option-${key}`}
                      value={key}
                      checked={answers[question.questionNumber] === key}
                      onChange={(e) => {
                        handleOptionChange(question.questionNumber, key);
                        // console.log("Input onChange fired:", e.target.checked); // For debugging
                      }}
                      // --- ULTIMATE HIDING/INTERACTION METHOD ---
                      className="
                        absolute // Position absolutely
                        z-10 // Give it a higher z-index to ensure it's on top of its siblings
                        left-0 top-0 // Place it at the start of the label
                        w-full h-full // Make it cover the *entire label area*
                        opacity-0 // Make it completely transparent
                        cursor-pointer // Show cursor pointer
                      "
                      // Removed `peer` from input directly, as we're making the input itself the full clickable area.
                      // The visual span will now be styled based on `answers` state directly.
                    />

                    {/* The custom visual indicator - now styled purely by React state */}
                    <span className={`
                        w-5 h-5 border-2 rounded-full flex items-center justify-center flex-shrink-0
                        ${answers[question.questionNumber] === key
                            ? 'border-blue-500 bg-blue-500' // Checked state
                            : 'border-gray-400' // Unchecked state
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
    // ... (rest of your handleSubmit function)
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
            <div className="text-right">
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
