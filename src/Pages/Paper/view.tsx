import UILayout from "@/UI/Elements/Layout";
import ViewHeader from "@/UI/Container/ViewHeader";
import {
  useGetSinglePaperQuery,
  useAssignPaperMutation,
  useGenerateNewOTPMutation,
} from "@/service/paper";
import { useGetChildrenListQuery } from "@/service/children";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { CheckCircleIcon, ClipboardPaste, XCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import UIButton from "@/UI/Elements/Button";
import UISelect from "@/UI/Elements/Select";
import { ErrorToaster, SuccessToaster } from "@/UI/Elements/Toast";
import { BaseURL } from "../../config";

const PaperView = () => {
  const param = useParams();
  const location = useLocation().pathname.split("/").filter(Boolean)[0];
  const { id } = param;
  const [generateNewOTP] = useGenerateNewOTPMutation();
  const navigate = useNavigate();
  const [assignPaper] = useAssignPaperMutation();
  const [urlDate, setUrlUpdate] = useState(false);
  const { data: singlePaper, refetch: DetailRefetch } = useGetSinglePaperQuery(
    id,
    { skip: !id }
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
  const OTP = singlePaper?.data?.otp;
  const QuestionURL = singlePaper?.data?.url;
  const childName = singlePaper?.data?.children?.name || "";
  const childGrade = singlePaper?.data?.children?.grade || "";
  const [copied, setCopied] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const totalMarks = questions.length;
  const obtainedMarks = answers.reduce((score, answer) => {
    const question = questions.find(
      (q) => q.questionNumber === answer.questionNumber
    );
    return question?.correctAnswer === answer.option ? score + 1 : score;
  }, 0);
  const percentage = ((obtainedMarks / totalMarks) * 100).toFixed(2);

  const renderQuestions = () => {
    const [selectedChild, setSelectedChild] = useState("");
    const [generatedLink, setGeneratedLink] = useState("");
    const [selectedOption, setSelectedOption] = useState<string | string[]>("");
    const [childOptions, setChildOptions] = useState([]);

    useEffect(() => {
      const options = children?.data?.map((child) => ({
        label: child.name,
        value: child._id,
      }));
      setChildOptions(options);
    }, [children?.data]);

    const handleCopyOtp = () => {
      if (OTP) {
        navigator.clipboard.writeText(OTP);
        setShowMessage(true); // Show "Copied!" message
        setTimeout(() => setShowMessage(false), 1000);
      }
    };

    const handleSelectChange = (value: string | string[]) => {
      setSelectedOption(value);
      setSelectedChild(value);
    };

    const handleGenerateLink = async () => {
      if (selectedChild) {
        const newUrl = `${BaseURL}/#/auth/answer/${id}`;
        const assignRes = await assignPaper({
          childId: selectedChild,
          paperId: id,
          url: newUrl,
        }).unwrap();
        setGeneratedLink(newUrl);
        setUrlUpdate(true);
      }
    };

    const handleCopy = () => {
      navigator.clipboard.writeText(QuestionURL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    };

    const handleAddChild = () => {
      navigate("/children");
    };

    const handleGenerateOTP = async () => {
      try {
        await generateNewOTP(id).unwrap();
        refetch();
        SuccessToaster("OTP Generated Successfully");
      } catch (error) {
        ErrorToaster("OTP Generation Failed");
      }
    };

    const handlePractice = () => {
      const newURL = `${BaseURL}/#/student-answer/${id}`;
      if (selectedChild) {
        window.open(newURL, "_blank"); // Open in new tab
      } else {
        ErrorToaster("Please select a child first");
      }
    };

    return (
      <div className="space-y-4">
        {/* Generate Link and OTP Section */}
        <div className="mb-6">
          {children?.data?.length === 0 ? (
            <div className="p-4">
              <UIButton size="lg" onClick={handleAddChild} className="w-full">
                Don't Have a Child? Add One.
              </UIButton>
            </div>
          ) : (
            answers.length === 0 && (
              <div className="p-4 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <UISelect
                      label="Select A Child"
                      options={childOptions}
                      placeholder="Choose an option"
                      value={selectedOption}
                      onChange={handleSelectChange}
                    />
                  </div>
                  <div className="">
                    <UIButton
                      variant="sky"
                      size="md"
                      onClick={handleGenerateLink}
                      tooltipContent={
                        selectedChild
                          ? "Assign the question to the selected child"
                          : "Select a child first"
                      }
                      disabled={!selectedChild}
                      className="w-full md:w-auto block my-2"
                    >
                      Assign Question to Child
                    </UIButton>
                    <UIButton
                      variant="sky"
                      size="md"
                      onClick={handlePractice}
                      tooltipContent={
                        selectedChild
                          ? "Assign the question to the selected child"
                          : "Select a child first"
                      }
                      disabled={!selectedChild}
                      className="w-full md:w-auto block my-2"
                    >
                      Do Practice
                    </UIButton>
                  </div>
                </div>

                {OTP ? (
                  <div className="flex items-center gap-4">
                    <UIButton
                      variant="sky"
                      size="lg"
                      className="w-full md:w-auto flex items-center justify-center gap-2"
                      onClick={handleCopyOtp}
                    >
                      Copy OTP: <span className="text-center">({OTP})</span>
                      <ClipboardPaste width={20} />
                    </UIButton>

                    {showMessage && (
                      <span className="text-green-500">Copied !!!</span>
                    )}
                  </div>
                ) : (
                  <UIButton
                    variant="destructive"
                    size="lg"
                    className="w-full md:w-auto flex items-center justify-center gap-2"
                    onClick={handleGenerateOTP}
                  >
                    Generate OTP
                  </UIButton>
                )}

                {QuestionURL && (
                  <div className="p-4 border rounded-md bg-gray-50 relative">
                    <p className="font-semibold text-gray-700 text-sm md:text-base">
                      Generated Link:{" "}
                      <span className="text-green-600 text-xs md:text-sm">
                        (only valid for selected child) (Name: {childName})
                      </span>
                    </p>
                    <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mt-2">
                      <p className="text-blue-600 text-sm break-all">
                        {QuestionURL}
                      </p>
                      <ClipboardPaste
                        onClick={handleCopy}
                        className="cursor-pointer mt-2 md:mt-0"
                        width={20}
                      />

                      {copied && (
                        <span className="text-green-500 absolute top-[125px] sm:top-[20px] right-[8px]">
                          Copied !!!
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          )}
        </div>

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
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
                {/* <div className="mt-2 md:mt-4 text-blue-600 font-semibold text-sm md:text-base">
                  Correct Answer: {question.correctAnswer}
                </div> */}
              </div>
            ))
          : questions.map((question) => {
              const userAnswer = answers.find(
                (answer) => answer.questionNumber === question.questionNumber
              );

              return (
                <div
                  key={question.questionNumber}
                  className="p-4 rounded-md bg-white"
                >
                  <h2 className="text-base md:text-lg font-bold break-words">
                    Question {question.questionNumber}: {question.question}
                  </h2>
                  <div className="mt-2 md:mt-4 space-y-2">
                    {Object.entries(question.choices).map(([key, value]) => {
                      const isCorrect = key === question.correctAnswer;
                      const isUserAnswer = userAnswer?.option === key;

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
                            {value}
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
                  <div className="mt-2 md:mt-4 text-blue-600 font-semibold text-sm md:text-base">
                    Correct Answer: {question.correctAnswer}
                  </div>
                </div>
              );
            })}
      </div>
    );
  };

  const AnswerURL = `${BaseURL}/#/auth/result/${id}`;
  const handleCopyAnswer = () => {
    navigator.clipboard.writeText(AnswerURL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <UILayout>
      <div className="p-4 md:p-6">
        <ViewHeader heading="Question Detail" backUrl="/papers" />
      </div>
      <div className="flex flex-col md:flex-row px-4 md:px-12 py-4 space-y-6 md:space-y-0 md:space-x-8">
        <div className="w-full md:w-3/5">
          {answers?.length > 0 && location === "papers" && (
            <div className="border border-dark p-4 md:p-6 rounded-lg shadow mb-3 relative">
              <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center">
                <p className="text-blue-600 py-2 text-sm md:text-base break-all">
                  {AnswerURL}
                </p>
                <ClipboardPaste
                  onClick={handleCopyAnswer}
                  className="cursor-pointer mt-2 md:mt-0"
                  width={20}
                />
              </div>
              {copied && (
                <span className="absolute top-[-28px] right-0 bg-green-500 text-white text-xs px-2 py-1 rounded shadow">
                  Copied!
                </span>
              )}
            </div>
          )}
          <div className="border border-dark p-4 md:p-6 rounded-lg shadow">
            {renderQuestions()}
          </div>
        </div>

        {/* Result Summary */}
        {answers?.length > 0 && (
          <div className="w-full md:w-1/3">
            <div className="border border-dark shadow rounded-lg p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-center text-gray-800 border-b pb-3 mb-4">
                Result Summary
              </h3>
              <div className="space-y-3 md:space-y-4 text-sm md:text-base">
                <div className="flex justify-between">
                  <span className="text-gray-600">Children Name:</span>
                  <span className="font-semibold text-gray-800 break-words">
                    {childName || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Questions:</span>
                  <span className="font-semibold text-gray-800">
                    {totalMarks}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Marks Obtained:</span>
                  <span className="font-semibold text-green-600">
                    {obtainedMarks}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Percentage:</span>
                  <span className="font-semibold text-blue-600">
                    {percentage}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Grade:</span>
                  <span className="font-semibold text-purple-600">
                    {childGrade || "NA"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </UILayout>
  );
};

export default PaperView;
