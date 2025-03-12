import * as yup from "yup";

const options = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "5",
  },
  {
    value: 6,
    label: "6",
  },
  {
    value: 7,
    label: "7",
  },
  {
    value: 8,
    label: "8",
  },
  {
    value: 9,
    label: "9",
  },
  {
    value: 10,
    label: "10",
  },
  {
    value: 11,
    label: "11",
  },
  {
    value: 12,
    label: "12",
  },
];
export const fields = (
  useGetSubjectOptionsMutation,
  useGetSyllabusOptionsMutation
) => [
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
    options: options,
    wrapperClassName: "mb-6",
    fieldWrapperClassName: "col-span-12",
  },
  {
    name: "chapter_from",
    label: "Chapter From",
    placeholder: "Select Chapter ...",
    type: "select",
    options: options,
    wrapperClassName: "mb-6",
    fieldWrapperClassName: "col-span-6",
  },
  {
    name: "chapter_to",
    label: "Chapter To",
    placeholder: "Select Chapter ...",
    type: "select",
    options: options,
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
];

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
