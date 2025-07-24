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
                <div key={key} className="flex items-center"> {/* Removed space-x-3 here to give label full control */}
                  <label
                    htmlFor={`question-${question.questionNumber}-option-${key}`}
                    className="flex items-center space-x-2 cursor-pointer w-full" // Added w-full to make label cover full width
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
                      className="hidden peer"
                    />
                    {/* The visual indicator */}
                    <span className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-0 peer-checked:bg-blue-500"> {/* Changed to rounded-full for radio, added peer-checked:bg-blue-500 for a solid fill when checked */}
                      {answers[question.questionNumber] === key && (
                        <CheckCircleIcon
                          width={16} // Reduced size slightly to fit better if solid fill is used
                          height={16}
                          className="text-white" // Changed to white to contrast with blue background
                        />
                      )}
                    </span>
                    <span className="font-medium text-gray-800">{value}</span> {/* Added a text color for clarity */}
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
    if (Object.keys(answers).length === questions.length) {
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
          const AnswerURL = `${BaseURL}/#/auth/result/${id}`;
          navigate(`/papers/${id}`); // This navigate is likely to stay within the app
          window.open(AnswerURL, "_blank"); // This opens the result in a new tab
        }, 1000);
      } catch (error) {
        ErrorToaster(error?.data?.message || "Issue in submitting answers");
      }
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
