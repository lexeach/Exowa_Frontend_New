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

// Class options dropdown
const classoptions = Array.from({ length: 12 }, (_, i) => ({
  value: i + 1,
  label: {i + 1}`,
}));

// Unique chapters for each class
const chapterOptionsMap = {
  1: Array.from({ length: 8 }, (_, i) => ({ value: i + 1, label: `Class 1 - Chapter ${i + 1}` })),
  2: Array.from({ length: 9 }, (_, i) => ({ value: i + 1, label: `Class 2 - Chapter ${i + 1}` })),
  3: Array.from({ length: 10 }, (_, i) => ({ value: i + 1, label: `Class 3 - Chapter ${i + 1}` })),
  4: Array.from({ length: 7 }, (_, i) => ({ value: i + 1, label: `Class 4 - Chapter ${i + 1}` })),
  5: Array.from({ length: 11 }, (_, i) => ({ value: i + 1, label: `Class 5 - Chapter ${i + 1}` })),
  6: Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: `Class 6 - Chapter ${i + 1}` })),
  7: Array.from({ length: 13 }, (_, i) => ({ value: i + 1, label: `Class 7 - Chapter ${i + 1}` })),
  8: Array.from({ length: 14 }, (_, i) => ({ value: i + 1, label: `Class 8 - Chapter ${i + 1}` })),
  9: Array.from({ length: 10 }, (_, i) => ({ value: i + 1, label: `Class 9 - Chapter ${i + 1}` })),
  10: Array.from({ length: 15 }, (_, i) => ({ value: i + 1, label: `Class 10 - Chapter ${i + 1}` })), // Class 10 has 15 chapters
  11: Array.from({ length: 9 }, (_, i) => ({ value: i + 1, label: `Class 11 - Chapter ${i + 1}` })),
  12: Array.from({ length: 10 }, (_, i) => ({ value: i + 1, label: `Class 12 - Chapter ${i + 1}` })),
};

export const fields = (
  useGetSubjectOptionsMutation,
  useGetSyllabusOptionsMutation
) => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [chapterOptions, setChapterOptions] = useState([]);

  // Update chapter options dynamically when class is selected
  useEffect(() => {
    if (selectedClass && chapterOptionsMap[selectedClass]) {
      setChapterOptions(chapterOptionsMap[selectedClass]);
    } else {
      setChapterOptions([]); // Default to empty if no class is selected
    }
  }, [selectedClass]);

  return [
    {
      name: "subject",
      label: "Subject",
      placeholder: "Select Subject...",
      type: "select",
      fetchData: useGetSubjectOptionsMutation,
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-12",
    },
    {
      name: "syllabus",
      label: "Syllabus",
      placeholder: "Select Syllabus...",
      type: "select",
      fetchData: useGetSyllabusOptionsMutation,
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-12",
    },
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
        if (!isNaN(selectedValue)) {
          setSelectedClass(selectedValue);
        }
      },
    },
    {
      name: "chapter_from",
      label: "Chapter From",
      placeholder: "Select Chapter...",
      type: "select",
      options: chapterOptions.length > 0 ? chapterOptions : [{ value: "", label: "No Record Found" }],
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-6",
    },
    {
      name: "chapter_to",
      label: "Chapter To",
      placeholder: "Select Chapter...",
      type: "select",
      options: chapterOptions.length > 0 ? chapterOptions : [{ value: "", label: "No Record Found" }],
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-6",
    },
    {
      name: "language",
      label: "Language",
      placeholder: "Select Language...",
      type: "select",
      options: [
        { value: "English", label: "English" },
        { value: "Hindi", label: "Hindi" },
        { value: "Urdu", label: "Urdu" },
        { value: "Marathi", label: "Marathi" },
        { value: "Tamil", label: "Tamil" },
        { value: "Telugu", label: "Telugu" },
      ],
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-6",
    },
    {
      name: "no_of_question",
      label: "Number Of Questions",
      placeholder: "Select Number...",
      type: "select",
      options: options,
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-6 mb-[400px] sm:mb-5",
    },
  ];
};

export const schema = yup
  .object()
  .shape({
    language: yup.string().required("This field is required"),
    chapter_to: yup.string().required("This field is required"),
    chapter_from: yup.string().required("This field is required"),
    syllabus: yup.string().required("This field is required"),
    subject: yup.string().required("This field is required"),
    no_of_question: yup.string().required("This field is required"),
    class: yup.string().required("This field is required"),
  })
  .required();
