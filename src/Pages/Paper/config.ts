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
const classoptions = Array.from({ length: 12 }, (_, i) => ({
  value: i + 1,
  label: `Class ${i + 1}`,
}));

// Unique chapters for each class
const chapterOptionsMap: Record<number, { value: number; label: string }[]> = {
  1: Array.from({ length: 8 }, (_, i) => ({ value: i + 1, label: `Class 1 - Chapter ${i + 1}` })),
  2: Array.from({ length: 9 }, (_, i) => ({ value: i + 1, label: `Class 2 - Chapter ${i + 1}` })),
  3: Array.from({ length: 10 }, (_, i) => ({ value: i + 1, label: `Class 3 - Chapter ${i + 1}` })),
  10: Array.from({ length: 15 }, (_, i) => ({ value: i + 1, label: `Class 10 - Chapter ${i + 1}` })),
};

export default function ClassSelectionForm() {
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [chapterOptions, setChapterOptions] = useState<{ value: number; label: string }[]>([]);

  useEffect(() => {
    console.log("Selected Class:", selectedClass);
    if (selectedClass && chapterOptionsMap[selectedClass]) {
      setChapterOptions(chapterOptionsMap[selectedClass]);
    } else {
      setChapterOptions([]);
    }
  }, [selectedClass]);

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-lg">
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

      <label className="block text-sm font-medium text-gray-700 mt-4">Number Of Questions</label>
      <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
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
});
