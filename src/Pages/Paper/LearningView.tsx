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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PaperView = () => {
  const param = useParams();
  const { id } = param;
  
  const [urlDate, setUrlUpdate] = useState(false);
  const [selectedQuestionForLearning, setSelectedQuestionForLearning] = useState(null);
  const [openAccordion, setOpenAccordion] = useState("");
  const { data: singlePaper, refetch: DetailRefetch } = useGetSinglePaperQuery(
    id,
    { skip: !id }
  );

  const { data: explanationData, isLoading: loadingExplanation, isFetching: fetchingExplanation } = useGetQuestionExplanationQuery(
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

  

  // Set default selected question to first wrong answer when answers exist
  useEffect(() => {
    if (wrongAnswers.length > 0 && !selectedQuestionForLearning) {
      const firstWrongQuestion = questions.find(
        (q) => q.questionNumber === wrongAnswers[0].questionNumber
      );
      
      if (firstWrongQuestion) {
        setSelectedQuestionForLearning(firstWrongQuestion);
      }
    }
  }, [wrongAnswers, questions, selectedQuestionForLearning]);



  const handleLearning = (question, accordionValue) => {
    
    // If accordion is being closed, just close it
    if (openAccordion === accordionValue) {
      setOpenAccordion("");
      return;
    }
    
    // If content is not loaded for this question, load it
    if (selectedQuestionForLearning?.questionNumber !== question.questionNumber) {
      setSelectedQuestionForLearning(question);
    }
    
    // Open the accordion
    setOpenAccordion(accordionValue);
  };

  
  // Function to parse and render markdown-like content
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
    const [childOptions, setChildOptions] = useState([]);

    useEffect(() => {
      const options = children?.data?.map((child) => ({
        label: child.name,
        value: child._id,
      }));
      setChildOptions(options);
    }, [children?.data]);
    

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
                  <Accordion
                    type="single"
                    collapsible
                    value={openAccordion}
                    onValueChange={() => handleLearning(question, `question-${question.questionNumber}`)}
                    className="mt-4"
                  >
                    <AccordionItem value={`question-${question.questionNumber}`} className="border-none">
                      <AccordionTrigger 
                        className="text-sm font-semibold text-blue-600 hover:text-blue-800 hover:no-underline py-2 justify-start gap-2"
                        disabled={(loadingExplanation || fetchingExplanation) && selectedQuestionForLearning?.questionNumber === question.questionNumber}
                      >
                        {(loadingExplanation || fetchingExplanation) && selectedQuestionForLearning?.questionNumber === question.questionNumber ? (
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
                        {(loadingExplanation || fetchingExplanation) && selectedQuestionForLearning?.questionNumber === question.questionNumber ? (
                          <div className="text-center py-4">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="text-gray-500 text-sm mt-2">Loading explanation...</p>
                          </div>
                        ) : selectedQuestionForLearning?.questionNumber === question.questionNumber && explanationData?.data && explanationData.data.questionNumber === question.questionNumber ? (
                          <div className="space-y-4">
                            {/* Explanation Section */}
                            {explanationData.data?.explanation && (
                              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                                <h4 className="font-bold text-blue-900 text-base mb-3 flex items-center gap-2">
                                  <BookOpen size={18} />
                                  Detailed Explanation
                                </h4>
                                <div className="text-sm text-gray-800">
                                  {parseExplanationContent(explanationData.data.explanation)}
                                </div>
                              </div>
                            )}
                            
                            {/* References Section */}
                            {/* {explanationData.data?.references && (
                              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200"> */}
                                {/* <h4 className="font-bold text-purple-900 text-base mb-3">
                                  📚 Additional Learning Resources
                                </h4> */}
                                
                                {/* Videos */}
                                {/* {explanationData.data.references.videos && explanationData.data.references.videos.length > 0 && (
                                  <div className="mb-4">
                                    <h5 className="font-semibold text-purple-800 text-sm mb-2 flex items-center gap-2">
                                      🎥 Recommended Videos
                                    </h5>
                                    <ul className="space-y-2">
                                      {explanationData.data.references.videos.map((video, index) => (
                                        <li key={index} className="text-sm text-gray-700 pl-4 border-l-2 border-purple-300">
                                          {video}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )} */}
                                
                                {/* Articles */}
                                {/* {explanationData.data.references.articles && explanationData.data.references.articles.length > 0 && (
                                  <div className="mb-4">
                                    <h5 className="font-semibold text-purple-800 text-sm mb-2 flex items-center gap-2">
                                      📄 Helpful Articles
                                    </h5>
                                    <ul className="space-y-2">
                                      {explanationData.data.references.articles.map((article, index) => (
                                        <li key={index} className="text-sm text-gray-700 pl-4 border-l-2 border-purple-300">
                                          {article}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )} */}
                                
                                {/* Books */}
                                {/* {explanationData.data.references.books && explanationData.data.references.books.length > 0 && (
                                  <div>
                                    <h5 className="font-semibold text-purple-800 text-sm mb-2 flex items-center gap-2">
                                      📖 Reference Books
                                    </h5>
                                    <ul className="space-y-2">
                                      {explanationData.data.references.books.map((book, index) => (
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
                        ) : selectedQuestionForLearning?.questionNumber === question.questionNumber && !explanationData ? (
                          <div className="text-center py-4">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="text-gray-500 text-sm mt-2">Loading explanation...</p>
                          </div>
                        ) : (
                          <div className="text-center text-gray-500 py-4">
                            <p className="text-sm">No learning content available</p>
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
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
    </UILayout>
  );

}

export default PaperView
