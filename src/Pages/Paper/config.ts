import * as yup from "yup";
import React, { useState } from "react";

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

const classoptions = [
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
  { value: 10, label: "10" },
  { value: 11, label: "11" },
  { value: 12, label: "12" },
  { value: "B Sc (1st year)", label: "B Sc (1st year)" },
];

const generateChapterOptions = (selectedClass) => {
  let chapterCount = 10;

  if (selectedClass === 6) {
    chapterCount = 8;
  } else if (selectedClass === 7) {
    chapterCount = 9;
  } else if (selectedClass === 8) {
    chapterCount = 10;
  } else if (selectedClass === 9) {
    chapterCount = 11;
  } else if (selectedClass === 10) {
    chapterCount = 12;
  } else if (selectedClass === 11) {
    chapterCount = 13;
  } else if (selectedClass === 12) {
    chapterCount = 14;
  }

  const chapterOptions = [];
  for (let i = 1; i <= chapterCount; i++) {
    chapterOptions.push({ value: i, label: i.toString() });
  }
  return chapterOptions;
};

export const fields = (
  useGetSubjectOptionsMutation,
  useGetSyllabusOptionsMutation,
  selectedClass,
  setSelectedClass
) => {
  const chapterOptions = generateChapterOptions(selectedClass);

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
      onChange: (e) => {
        const selectedValue = parseInt(e.target.value);
        setSelectedClass(selectedValue);
        console.log("Selected Class:", selectedValue);
      },
    },
    {
      name: "chapter_from",
      label: "Chapter From",
      placeholder: "Select Chapter ...",
      type: "select",
      options: chapterOptions,
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-6",
    },
    {
      name: "chapter_to",
      label: "Chapter To",
      placeholder: "Select Chapter ...",
      type: "select",
      options: chapterOptions,
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
      fieldWrapperClassName: "col-span-6  mb-[400px] sm:mb-5",
    },
    {
      name:"textInput",
      label: "Text Input",
      placeholder: "Enter Text...",
      type:"text",
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-12"
    }

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

function MyForm({ useGetSubjectOptionsMutation, useGetSyllabusOptionsMutation }) {
  const [selectedClass, setSelectedClass] = useState(6);

  const formFields = fields(
    useGetSubjectOptionsMutation,
    useGetSyllabusOptionsMutation,
    selectedClass,
    setSelectedClass
  );

  return (
    <div>
      {formFields.map((field) => (
        <div key={field.name}>
          <label>{field.label}</label>
          {field.type === "select" && (
            <select
              name={field.name}
              onChange={field.onChange ? field.onChange : undefined}
            >
              {field.options &&
                field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </select>
          )}
          {field.type === "text" && (
            <input type="text" name={field.name} placeholder={field.placeholder} />
          )}
        </div>
      ))}
    </div>
  );
}

export default MyForm;
