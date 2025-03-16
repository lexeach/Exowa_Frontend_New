import * as yup from "yup";
import { useState } from "react";

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
  label: `${i + 1}`,
}));

const chapterOptionsMap = {
  1: [{ value: 1, label: "Chapter 1" }, { value: 2, label: "Chapter 2" }],
  2: [{ value: 1, label: "Chapter 1" }, { value: 2, label: "Chapter 2" }],
  3: [{ value: 1, label: "Chapter 1" }, { value: 2, label: "Chapter 2" }],
  4: [{ value: 1, label: "Chapter 1" }, { value: 2, label: "Chapter 2" }],
  5: [{ value: 1, label: "Chapter 1" }, { value: 2, label: "Chapter 2" }],
  6: [{ value: 1, label: "Chapter 1" }, { value: 2, label: "Chapter 2" }],
  7: [{ value: 1, label: "Chapter 1" }, { value: 2, label: "Chapter 2" }],
  8: [{ value: 1, label: "Chapter 1" }, { value: 2, label: "Chapter 2" }],
  9: [{ value: 1, label: "Chapter 1" }, { value: 2, label: "Chapter 2" }],
  10: [{ value: 1, label: "Chapter 1" }, { value: 15, label: "Chapter 15" }],
  11: [{ value: 1, label: "Chapter 1" }, { value: 2, label: "Chapter 2" }],
  12: [{ value: 1, label: "Chapter 1" }, { value: 2, label: "Chapter 2" }],
};

export const fields = (
  useGetSubjectOptionsMutation,
  useGetSyllabusOptionsMutation
) => {
  const [selectedClass, setSelectedClass] = useState(null);

  const chapteroptions = selectedClass
    ? chapterOptionsMap[selectedClass] || []
    : [];

  return [
    {
      name: "subject",
      label: "Subject",
      placeholder: "Select Subject ...",
      type: "select",
      fetchData: useGetSubjectOptionsMutation,
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-12",
    },
    {
      name: "syllabus",
      label: "Syllabus",
      placeholder: "Syllabus Subject ...",
      type: "select",
      fetchData: useGetSyllabusOptionsMutation,
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-12",
    },
    {
      name: "class",
      label: "Class",
      placeholder: "Class ...",
      type: "select",
      options: classoptions,
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-12",
      onChange: (e) => setSelectedClass(e.target.value),
    },
    {
      name: "chapter_from",
      label: "Chapter From",
      placeholder: "Select Chapter ...",
      type: "select",
      options: chapteroptions,
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-6",
    },
    {
      name: "chapter_to",
      label: "Chapter To",
      placeholder: "Select Chapter ...",
      type: "select",
      options: chapteroptions,
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-6",
    },
    {
      name: "language",
      label: "Language",
      placeholder: "Chapter Language ...",
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
      label: "Number Of Question",
      placeholder: "Select Number ...",
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
    language: yup.string().required("this_field_required"),
    chapter_to: yup.string().required("this_field_required"),
    chapter_from: yup.string().required("this_field_required"),
    syllabus: yup.string().required("this_field_required"),
    subject: yup.string().required("this_field_required"),
    no_of_question: yup.string().required("this_field_required"),
    class: yup.string().required("this_field_required"),
  })
  .required();
