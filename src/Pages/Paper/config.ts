import * as yup from "yup";
import { useState } from "react";

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
  { value: 1, label: "Class 1" },
  { value: 2, label: "Class 2" },
  { value: 3, label: "Class 3" },
];

// Chapter options for each class
const chapteroptions1 = [
  { value: 1, label: "Class 1 - Chapter 1" },
  { value: 2, label: "Class 1 - Chapter 2" },
];

const chapteroptions2 = [
  { value: 1, label: "Class 2 - Chapter 1" },
  { value: 2, label: "Class 2 - Chapter 2" },
  { value: 3, label: "Class 2 - Chapter 3" },
];

const chapteroptions3 = [
  { value: 1, label: "Class 3 - Chapter 1" },
  { value: 2, label: "Class 3 - Chapter 2" },
  { value: 3, label: "Class 3 - Chapter 3" },
  { value: 4, label: "Class 3 - Chapter 4" },
];

export default function ClassSelectionForm() {
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [chapterOptions, setChapterOptions] = useState<{ value: number; label: string }[]>([]);

  // Handle class selection and update chapter options
  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = Number(e.target.value);
    setSelectedClass(selectedValue);

    // Assign the correct chapter options based on class selection
    if (selectedValue === 1) {
      setChapterOptions(chapteroptions1);
    } else if (selectedValue === 2) {
      setChapterOptions(chapteroptions2);
    } else if (selectedValue === 3) {
      setChapterOptions(chapteroptions3);
    } else {
      setChapterOptions([]);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-lg">
      {/* Subject Selection */}
      <label className="block text-sm font-medium text-gray-700">Subject</label>
      <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
        <option value="">Select Subject...</option>
        <option value="Math">Math</option>
        <option value="Science">Science</option>
      </select>

      {/* Syllabus Selection */}
      <label className="block text-sm font-medium text-gray-700 mt-4">Syllabus</label>
      <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
        <option value="">Select Syllabus...</option>
        <option value="CBSE">CBSE</option>
        <option value="ICSE">ICSE</option>
      </select>

      {/* Class Selection */}
      <label className="block text-sm font-medium text-gray-700 mt-4">Class</label>
      <select
        onChange={handleClassChange}
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

      {/* Number of Questions */}
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
        <option value="">Select Language...</option>
        <option value="English">English</option>
        <option value="Hindi">Hindi</option>
      </select>
    </div>
  );
}

// Validation Schema
export const schema = yup.object().shape({
  class: yup.string().required("Class is required"),
  chapter_from: yup.string().required("Chapter From is required"),
  chapter_to: yup.string().required("Chapter To is required"),
  no_of_question: yup.string().required("Number of questions is required"),
  language: yup.string().required("Language is required"),
});
