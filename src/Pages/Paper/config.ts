import * as yup from "yup";
import { useState, useEffect } from "react";

const options = [
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 15, label: "15" },
  { value: 20, label: "20" },
  { value: 25, label: "25" },
  { value: 30, label: "30" },
  { value: 35, label: "35" },
  { value: 40, label: "40" },
  { value: 45, label: "45" },
  { value: 50, label: "50" },
];

const classoptions = Array.from({ length: 12 }, (_, i) => ({
  value: i + 1,
  label: `Class ${i + 1}`,
}));

// Map of chapters per class
const chapterOptionsMap = {
  1: Array.from({ length: 10 }, (_, i) => ({ value: i + 1, label: `Chapter ${i + 1}` })),
  2: Array.from({ length: 10 }, (_, i) => ({ value: i + 1, label: `Chapter ${i + 1}` })),
  3: Array.from({ length: 10 }, (_, i) => ({ value: i + 1, label: `Chapter ${i + 1}` })),
  4: Array.from({ length: 10 }, (_, i) => ({ value: i + 1, label: `Chapter ${i + 1}` })),
  5: Array.from({ length: 10 }, (_, i) => ({ value: i + 1, label: `Chapter ${i + 1}` })),
  6: Array.from({ length: 10 }, (_, i) => ({ value: i + 1, label: `Chapter ${i + 1}` })),
  7: Array.from({ length: 10 }, (_, i) => ({ value: i + 1, label: `Chapter ${i + 1}` })),
  8: Array.from({ length: 10 }, (_, i) => ({ value: i + 1, label: `Chapter ${i + 1}` })),
  9: Array.from({ length: 10 }, (_, i) => ({ value: i + 1, label: `Chapter ${i + 1}` })),
  10: Array.from({ length: 15 }, (_, i) => ({ value: i + 1, label: `Chapter ${i + 1}` })), // Class 10 has 15 chapters
  11: Array.from({ length: 10 }, (_, i) => ({ value: i + 1, label: `Chapter ${i + 1}` })),
  12: Array.from({ length: 10 }, (_, i) => ({ value: i + 1, label: `Chapter ${i + 1}` })),
};

export const fields = (
  useGetSubjectOptionsMutation,
  useGetSyllabusOptionsMutation
) => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [chapteroptions, setChapterOptions] = useState([]);

  // Update chapteroptions when selectedClass changes
  useEffect(() => {
    if (selectedClass && chapterOptionsMap[selectedClass]) {
      setChapterOptions(chapterOptionsMap[selectedClass]);
    } else {
      setChapterOptions([]); // Default to empty if no class is selected
    }
  }, [selectedClass]);

  return [
    {
      name: "class",
      label: "Class",
      placeholder: "Select Class...",
      type: "select",
      options: classoptions,
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-12",
      onChange: (e) => {
        const selectedValue = Number(e.target.value);
        setSelectedClass(selectedValue);
      },
    },
    {
      name: "chapter_from",
      label: "Chapter From",
      placeholder: "Select Chapter...",
      type: "select",
      options: chapteroptions.length > 0 ? chapteroptions : [{ value: "", label: "No Record Found" }],
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-6",
    },
    {
      name: "chapter_to",
      label: "Chapter To",
      placeholder: "Select Chapter...",
      type: "select",
      options: chapteroptions.length > 0 ? chapteroptions : [{ value: "", label: "No Record Found" }],
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-6",
    },
  ];
};
