import UILayout from "@/UI/Elements/Layout";
import { useGetSinglePaperQuery } from "@/service/paper";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react"; // Added useEffect import for potential future debugging if needed
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

  // Optional: Keep this useEffect for debugging, it logs current state of answers
  useEffect(() => {
    if (!paperLoading && questions.length > 0) {
      console.log("Total Questions:", questions.length);
      console.log("Answers Recorded:", Object.keys(answers).length, answers);
      console.log("Is Submit Button Disabled?", Object.keys(answers).length < questions.length);
    }
  }, [answers, questions.length, paperLoading]);


  const handleOptionChange = (
    questionNumber: number,
    selectedOption: string
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [questionNumber]: selectedOption,
    }));
    // Optional: Log selection for debugging
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
                // Added 'relative' to the parent div of the label for absolute positioning context
                <div key={key} className="relative flex items-center">
                  <label
                    htmlFor={`question-${question.questionNumber}-option-${key}`}
                    // Enhanced label for better clickability and UX
                    className="flex items-center space-x-2 cursor-pointer w-full p-3 rounded-md hover:bg-gray-100 transition-colors duration-150 select-none"
                  >
                    <input
                      type="radio"
                      name={`question-${question.questionNumber}`}
                      id={`question-${question.questionNumber}-option-${key}`}
                      value={key}
                      checked={answers[question.questionNumber] === key}
                      onChange={() =>
                        handleOptionChange(question.questionNumber, key)
                      }
                      // --- RECTIFIED CODE FOR CHECKBOX INTERACTION ---
                      // This makes the input cover the entire label area, but is transparent
                      className="
                        absolute // Position absolutely
                        z-10 // Give it a higher z-index to ensure it's on top of its siblings
                        left-0 top-0 // Place it at the start of the label
                        w-full h-full // Make it cover the *entire label area*
                        opacity-0 // Make it completely transparent
                        cursor-pointer // Show cursor pointer for desktop
                      "
                      aria-hidden="true" // Optional: hide from screen readers if label is descriptive
                    />
                    {/* The custom visual indicator for the radio button */}
                    <span className={`
                        w-5 h-5 border-2 rounded-full flex items-center justify-center flex-shrink-0
                        ${answers[question.questionNumber] === key
                            ? 'border-blue-500 bg-blue-500' // Checked state: blue border and fill
                            : 'border-gray-400' // Unchecked state: gray border
                        }
                    `}>
                      {answers[question.questionNumber] === key && (
                        <CheckCircleIcon
                          width={16} // Smaller icon for better fit
                          height={16}
                          className="text-white" // White icon for contrast on blue background
                        />
                      )}
                    </span>
                    <span className="font-medium text-gray-800 break-words">{value}</span> {/* Added text color and word break */}
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
    // Optional: Keep these console logs for debugging submit button behavior
    console.log("Submit button clicked!");
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
          // Changed navigation for result page as per previous discussions
          // Assuming /auth/result/:id is the desired URL.
          // window.open(`${BaseURL}/#/auth/result/${id}`, "_blank");
          navigate("/auth/thankyou", { state: id }); // Navigating within the app as per your original code
        }, 1000);
      } catch (error) {
        console.error("Submission Error:", error); // Log the full error for debugging
        ErrorToaster(error?.data?.message || "Issue in submitting answers");
      }
    } else {
      console.log("Not all questions answered yet. Button remains disabled.");
      ErrorToaster(`Please answer all ${questions.length} questions.`); // User feedback if not all answered
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
            {/* Keeping the submit button's parent div with relative and z-index as discussed previously
                to help with potential overlay issues on mobile for the button itself. */}
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
