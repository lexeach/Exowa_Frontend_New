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
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
  { value: 10, label: "10" },
  { value: 11, label: "11" },
  { value: 12, label: "12" },
];

// Language options
const languageOptions = [
  { value: "English", label: "English" },
  { value: "Hindi", label: "Hindi" },
  { value: "Urdu", label: "Urdu" },
  { value: "Marathi", label: "Marathi" },
  { value: "Tamil", label: "Tamil" },
  { value: "Telugu", label: "Telugu" },
];

export default function ClassSelectionForm() {
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [chapterOptions, setChapterOptions] = useState<{ value: number; label: string }[]>([]);

  // Update chapter options based on selected class
  useEffect(() => {
    if (selectedClass === 6) {
      setChapterOptions(
        Array.from({ length: 8 }, (_, i) => ({ value: i + 1, label: `6 - Chapter ${i + 1}` }))
      );
    } else if (selectedClass === 7) {
      setChapterOptions(
        Array.from({ length: 9 }, (_, i) => ({ value: i + 1, label: `7 - Chapter ${i + 1}` }))
      );
    } else if (selectedClass === 8) {
      setChapterOptions(
        Array.from({ length: 10 }, (_, i) => ({ value: i + 1, label: `8 - Chapter ${i + 1}` }))
      );
    } else if (selectedClass === 9) {
      setChapterOptions(
        Array.from({ length: 10 }, (_, i) => ({ value: i + 1, label: `9 - Chapter ${i + 1}` }))
      );
    } else if (selectedClass === 10) {
      setChapterOptions(
        Array.from({ length: 15 }, (_, i) => ({ value: i + 1, label: `10 - Chapter ${i + 1}` }))
      );
    } else if (selectedClass === 11) {
      setChapterOptions(
        Array.from({ length: 9 }, (_, i) => ({ value: i + 1, label: `11 - Chapter ${i + 1}` }))
      );
    } else if (selectedClass === 12) {
      setChapterOptions(
        Array.from({ length: 10 }, (_, i) => ({ value: i + 1, label: `12 - Chapter ${i + 1}` }))
      );
    } else {
      setChapterOptions([]);
    }
  }, [selectedClass]);

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-lg">
      {/* Class Selection */}
      <label className="block text-sm font-medium text-gray-700">Class</label>
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

      {/* Chapter From */}
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

      {/* Chapter To */}
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
        {languageOptions.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
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
