import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import UIButton from "@/UI/Elements/Button";

import VerificationQuestion from "./VerificationQuestion";
import VerificationResult from "./VerificationResult";

import {
  useGenerateLearningVerificationMutation,
  useSubmitLearningVerificationMutation,
} from "@/service/learningVerification";

interface VerificationDialogProps {
  open: boolean;

  onClose: () => void;

  paperId: string;

  questionNumber: number;

  learningContent: string;

  onCompleted?: () => void;
}

const VerificationDialog = ({
  open,
  onClose,
  paperId,
  questionNumber,
  learningContent,
  onCompleted,
}: VerificationDialogProps) => {
  /**
   * APIs
   */

  const [
    generateVerification,
    {
      isLoading: generatingPaper,
    },
  ] = useGenerateLearningVerificationMutation();

  const [
    submitVerification,
    {
      isLoading: submittingPaper,
    },
  ] = useSubmitLearningVerificationMutation();

  /**
   * States
   */

  const [questions, setQuestions] = useState<any[]>([]);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState<string[]>([]);

  const [verificationId, setVerificationId] =
    useState<string>("");

  const [showResult, setShowResult] =
    useState(false);

  const [result, setResult] = useState<any>(null);

  /**
   * Generate Verification Paper
   */

  useEffect(() => {
    if (!open) return;

    const generatePaper = async () => {
      try {
        const response: any =
          await generateVerification({
            paperId,
            questionNumber,
          }).unwrap();

        const data = response.data || response;

        setVerificationId(data._id);
        setQuestions(response.data.questions || []);

        setAnswers(
          new Array(
            response.data.questions?.length || 3
          ).fill("")
        );

        setCurrentQuestion(0);

        setShowResult(false);

        setResult(null);
      } catch (error) {
        console.error(
          "Unable to generate verification paper",
          error
        );
      }
    };

    generatePaper();
  }, [
    open,
    paperId,
    questionNumber,
    generateVerification,
  ]);

  /**
   * Loading UI
   */

  if (generatingPaper) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-2xl">

          <DialogHeader>
            <DialogTitle>
              Learning Verification
            </DialogTitle>
          </DialogHeader>

          <div className="py-16 flex flex-col items-center">

            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />

            <p className="mt-6 text-gray-500">
              Preparing your verification questions...
            </p>

          </div>

        </DialogContent>
      </Dialog>
    );
  }

    /**
   * Select Answer
   */
  const handleSelectAnswer = (answer: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = answer;
    setAnswers(updatedAnswers);
  };

  /**
   * Previous Question
   */
  const handlePrevious = () => {
    if (currentQuestion === 0) return;

    setCurrentQuestion((prev) => prev - 1);
  };

  /**
   * Next Question
   */
  const handleNext = () => {
    if (!answers[currentQuestion]) {
      alert("Please select an answer before continuing.");
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  /**
   * Submit Verification Paper
   */
  const handleSubmit = async () => {
    const unanswered = answers.some((answer) => !answer);

    if (unanswered) {
      alert("Please answer all questions.");
      return;
    }

    try {
      const response: any = await submitVerification({
        verificationId,
        answers,
      }).unwrap();

      setResult(response.data);

      setShowResult(true);

      if (
        response.data?.status === "Completed" &&
        onCompleted
      ) {
        onCompleted();
      }
    } catch (error) {
      console.error(
        "Unable to submit verification paper",
        error
      );
    }
  };

  /**
   * Retry
   */
  const handleRetry = async () => {
    try {
      const response: any = await generateVerification({
        paperId,
        questionNumber,
      }).unwrap();

      setVerificationId(response.data._id);

      setQuestions(response.data.questions);

      setAnswers(
        new Array(data.questions.length).fill("")
      );

      setCurrentQuestion(0);

      setShowResult(false);

      setResult(null);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Render Result Screen
   */
  if (showResult && result) {
    return (
      <Dialog
        open={open}
        onOpenChange={onClose}
      >
        <DialogContent className="sm:max-w-2xl">

          <DialogHeader>
            <DialogTitle>
              Learning Verification
            </DialogTitle>
          </DialogHeader>

          <VerificationResult
            score={result.score}
            totalQuestions={result.totalQuestions}
            isCompleted={
              result.status === "Completed"
            }
            onClose={onClose}
            onRetry={handleRetry}
          />

        </DialogContent>
      </Dialog>
    );
  }

    /**
   * Main Dialog
   */

  return (
    <Dialog
      open={open}
      onOpenChange={onClose}
    >
      <DialogContent className="sm:max-w-3xl">

        <DialogHeader>
          <DialogTitle className="text-xl">
            Learning Verification
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">

          {questions.length > currentQuestion && (
            <VerificationQuestion
              questionNumber={currentQuestion + 1}
              questions[currentQuestion] ?? {}
              selectedAnswer={answers[currentQuestion]}
              onSelect={handleSelectAnswer}
            />
          )}

        </div>

        {/* Progress */}

        <div className="mt-8">

          <div className="flex justify-between text-sm text-gray-500 mb-2">

            <span>
              Progress
            </span>

            <span>
              {currentQuestion + 1} / {questions.length}
            </span>

          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">

            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
               questions.length
               ? ((currentQuestion + 1)/questions.length)*100
               :0
               }%`,
              }}
            />

          </div>

        </div>

        {/* Footer */}

        <div className="mt-8 flex justify-between">

          <UIButton
            variant="secondary"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </UIButton>

          {currentQuestion === questions.length - 1 ? (

            <UIButton
              variant="success"
              onClick={handleSubmit}
              loading={submittingPaper}
            >
              Submit
            </UIButton>

          ) : (

            <UIButton
  variant="primary"
  onClick={handleNext}
  disabled={!answers[currentQuestion]}
    >
              Next
            </UIButton>

          )}

        </div>

      </DialogContent>
    </Dialog>
  );
};

export default VerificationDialog;
