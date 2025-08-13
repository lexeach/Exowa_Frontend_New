import React, { useState, useEffect, KeyboardEvent } from "react";
import { CheckCircleIcon } from "lucide-react";

// --- MOCK IMPLEMENTATIONS START ---
// The following components and hooks are mocked to resolve the import errors
// and make the component runnable in a standalone environment.

const UILayout = ({ children }: { children: React.ReactNode }) => (
  <div className="ui-layout">{children}</div>
);

const ErrorToaster = (message: string) => {
  console.error("TOAST_ERROR:", message);
  // In a real app, you would render a toast component here.
};

const BaseURL = "http://localhost:3000";

// Mock data that simulates the API response for a single paper.
const mockSinglePaperData = {
  data: {
    author: { _id: "author-123" },
    questions: [
      {
        questionNumber: 1,
        question: "What is the capital of France?",
        choices: { a: "Berlin", b: "Madrid", c: "Paris", d: "Rome" },
      },
      {
        questionNumber: 2,
        question: "Which planet is known as the Red Planet?",
        choices: { a: "Earth", b: "Mars", c: "Jupiter", d: "Venus" },
      },
      {
        questionNumber: 3,
        question: "What is the largest ocean on Earth?",
        choices: {
          a: "Atlantic",
          b: "Indian",
          c: "Arctic",
          d: "Pacific",
        },
      },
       {
        questionNumber: 4,
        question: "What is 2 + 2?",
        choices: {
          a: "3",
          b: "4",
          c: "5",
          d: "6",
        },
      },
    ],
  },
};

// Mock hook to simulate fetching paper data.
const useGetSinglePaperQuery = (id: string | undefined, options: any) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setTimeout(() => {
        setData(mockSinglePaperData);
        setIsLoading(false);
      }, 1000); // Simulate network delay
    } else {
        setIsLoading(false);
    }
  }, [id]);

  return { data, isLoading };
};

// Mock hook to simulate submitting answers.
const useAnswerPaperMutation = () => {
    const answerQuestion = async (payload: any) => {
        console.log("Submitting answers:", payload);
        // Simulate a successful API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ unwrap: () => Promise.resolve() });
            }, 500);
        });
    };
    return [answerQuestion];
};

// Mock for react-router-dom hooks
const useParams = () => ({ id: "paper-123" });
const useNavigate = () => {
    return (path: string, options?: any) => {
        console.log(`Navigating to: ${path}`, options);
        // In a real app, this would change the URL.
    }
};

// --- MOCK IMPLEMENTATIONS END ---


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

  useEffect(() => {
    if (!paperLoading && questions.length > 0) {
      console.log("Total Questions:", questions.length);
      console.log("Answers Recorded:", Object.keys(answers).length, answers);
      console.log(
        "Is Submit Button Disabled?",
        Object.keys(answers).length < questions.length
      );
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
    console.log(`Q${questionNumber} selected: ${selectedOption}`);

    // *** FIX: Blur the currently focused element after selection. ***
    // This prevents arrow keys from changing the radio selection while
    // allowing them to scroll the page normally.
    if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
    }
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
                      onChange={() =>
                        handleOptionChange(question.questionNumber, key)
                      }
                      // The onKeyDown handler has been removed from here
                      className="
                        absolute
                        z-10
                        left-0 top-0
                        w-full h-full
                        opacity-0
                        cursor-pointer
                      "
                      aria-hidden="true"
                    />
                    <span
                      className={`
                        w-5 h-5 border-2 rounded-full flex items-center justify-center flex-shrink-0
                        ${
                          answers[question.questionNumber] === key
                            ? "border-blue-500 bg-blue-500"
                            : "border-gray-400"
                        }
                      `}
                    >
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
    console.log("Submit button clicked!");
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
        });

        setTimeout(() => {
          navigate("/auth/thankyou", { state: id });
        }, 1000);
      } catch (error: any) {
        console.error("Submission Error:", error);
        ErrorToaster(error?.data?.message || "Issue in submitting answers");
      }
    } else {
      console.log("Not all questions answered yet. Button remains disabled.");
      ErrorToaster(`Please answer all ${questions.length} questions.`);
    }
  };

  if (paperLoading) {
    return <div className="p-6 text-center">Loading...</div>;
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
