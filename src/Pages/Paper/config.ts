import * as yup from "yup";
import { useState, useEffect } from "react";

// Number of questions options
const options = [
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 15, label: "15" },
  { value: 20, label: "20" },
  { value: 25, label: "25" },
  { value: 30, label: "30" },
];

// Class selection options
const classoptions = [
  { value: 6, label: "Class 6" },
  { value: 7, label: "Class 7" },
  { value: 8, label: "Class 8" },
  { value: 9, label: "Class 9" },
  { value: 10, label: "Class 10" },
  { value: 11, label: "Class 11" },
  { value: 12, label: "Class 12" },
];

// Subject options
const subjectOptions = [
  { value: "math", label: "Mathematics" },
  { value: "science", label: "Science" },
  { value: "english", label: "English" },
];

// Syllabus options
const syllabusOptions = [
  { value: "cbse", label: "CBSE" },
  { value: "icse", label: "ICSE" },
  { value: "state", label: "State Board" },
];

// Function to generate chapter options dynamically
const generateChapterOptions = (selectedClass) => {
  let chapterCount = 10; // Default value

  if (selectedClass === 6) chapterCount = 8;
  else if (selectedClass === 7) chapterCount = 12;
  else if (selectedClass === 8) chapterCount = 11;
  else if (selectedClass === 9) chapterCount = 13;
  else if (selectedClass === 10) chapterCount = 14;
  else if (selectedClass === 11) chapterCount = 15;
  else if (selectedClass === 12) chapterCount = 16;

  return Array.from({ length: chapterCount }, (_, i) => ({
    value: i + 1,
    label: `Chapter ${i + 1}`,
  }));
};

export default function ClassSelectionForm() {
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [chapterOptions, setChapterOptions] = useState<{ value: number; label: string }[]>([]);

  // Update chapter options when selectedClass changes
  useEffect(() => {
    if (selectedClass) {
      setChapterOptions(generateChapterOptions(selectedClass));
    } else {
      setChapterOptions([]);
    }
  }, [selectedClass]);

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-lg">
      {/* Subject Selection */}
      <label className="block text-sm font-medium text-gray-700">Subject</label>
      <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
        <option value="">Select Subject...</option>
        {subjectOptions.map((subj) => (
          <option key={subj.value} value={subj.value}>
            {subj.label}
          </option>
        ))}
      </select>

      {/* Syllabus Selection */}
      <label className="block text-sm font-medium text-gray-700 mt-4">Syllabus</label>
      <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
        <option value="">Select Syllabus...</option>
        {syllabusOptions.map((syll) => (
          <option key={syll.value} value={syll.value}>
            {syll.label}
          </option>
        ))}
      </select>

      {/* Class Selection */}
      <label className="block text-sm font-medium text-gray-700 mt-4">Class</label>
      <select
        onChange={(e) => setSelectedClass(Number(e.target.value))}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
      >
        <option value="">Select a Class</option>
        {classoptions.map((cls) => (
          <option key={cls.value} value={cls.value}>
            {cls.label}
          </option>
        ))}
      </select>

      {/* Chapter From Selection */}
      <label className="block text-sm font-medium text-gray-700 mt-4">Chapter From</label>
      <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
        {chapterOptions.length > 0 ? (
          chapterOptions.map((chap) => (
            <option key={chap.value} value={chap.value}>
              {chap.label}
            </option>
          ))
        ) : (
          <option value="">No Record Found</option>
        )}
      </select>

      {/* Chapter To Selection */}
      <label className="block text-sm font-medium text-gray-700 mt-4">Chapter To</label>
      <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
        {chapterOptions.length > 0 ? (
          chapterOptions.map((chap) => (
            <option key={chap.value} value={chap.value}>
              {chap.label}
            </option>
          ))
        ) : (
          <option value="">No Record Found</option>
        )}
      </select>

      {/* Number Of Questions */}
      <label className="block text-sm font-medium text-gray-700 mt-4">Number Of Questions</label>
      <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Language Selection */}
      <label className="block text-sm font-medium text-gray-700 mt-4">Language</label>
      <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
        <option value="English">English</option>
        <option value="Hindi">Hindi</option>
        <option value="Urdu">Urdu</option>
      </select>
    </div>
  );
}

// Validation Schema
export const schema = yup.object().shape({
  subject: yup.string().required("Subject is required"),
  syllabus: yup.string().required("Syllabus is required"),
  class: yup.string().required("Class is required"),
  chapter_from: yup.string().required("Chapter From is required"),
  chapter_to: yup.string().required("Chapter To is required"),
  no_of_question: yup.string().required("Number of questions is required"),
  language: yup.string().required("Language is required"),
});
