import * as yup from "yup";

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
];

// Mapping of chapter counts based on class, subject, and syllabus
const chapterCounts = new Map([
  // General Subjects
  ["6,English-National Council of Educational Research and Training (NCERT)", 10],
  ["6,English-CBSE", 20],
  ["6-General-Default", 10],
  ["6-General-Default", 10],
  ["7-General-Default", 13],
  ["8-General-Default", 13],
  ["9-General-Default", 12],
  ["10-General-Default", 14],
  ["11-General-Default", 16],
  ["12-General-Default", 13],

  // English Subject
  ["6-English-Default", 21],
  ["7-English-Default", 24],
  ["8-English-Default", 23],
  ["9-English-Default", 25],
  ["10-English-Default", 26],
  ["11-English-Default", 28],
  ["12-English-Default", 30],

  // Syllabus-Specific (Add your syllabus data here)
  ["6-General-SyllabusA", 15],
  ["7-General-SyllabusA", 18],
  ["8-General-SyllabusA", 20],
  ["9-General-SyllabusB", 22],
  ["10-English-SyllabusC", 27],
  ["11-English-SyllabusD", 32],
  ["12-General-SyllabusE", 17],
  // Add other syllabus and class combinations as needed...
]);

// Function to generate chapter options based on selected class, subject, and syllabus
const generateChapterOptions = (selectedClass, subject, syllabus) => {
  let key;

  if (syllabus) {
    key = `${selectedClass}-${subject}-${syllabus}`;
  } else {
    key = `${selectedClass}-${subject}-Default`;
  }

  const chapterCount = chapterCounts.get(key) || 10; // Default to 10 if not found

  return Array.from({ length: chapterCount }, (_, i) => {
    return {
      value: i + 1,
      label: (i + 1).toString(),
    };
  });
};

export const fields = (
  useGetSubjectOptionsMutation,
  useGetSyllabusOptionsMutation,
  currentClass,
  setCurrentClass,
  currentSubject,
  setCurrentSubject,
  currentSyllabus,
  setCurrentSyllabus
) => {
  const chapterOptions = generateChapterOptions(currentClass, currentSubject, currentSyllabus);

  return [
    {
      name: "subject",
      label: "Subject",
      placeholder: "Select Subject ...",
      type: "select",
      fetchData: useGetSubjectOptionsMutation,
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-12",
      getValueCallback: (value) => setCurrentSubject(value),
    },
    {
      name: "syllabus",
      label: "Syllabus",
      placeholder: "Syllabus Subject ...",
      type: "select",
      fetchData: useGetSyllabusOptionsMutation,
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-12",
      getValueCallback: (value) => setCurrentSyllabus(value),
    },
    {
      name: "class",
      label: "Class",
      placeholder: "Class ...",
      type: "select",
      options: classoptions,
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-12",
      getValueCallback: (value) => setCurrentClass(value),
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
  ];
};

// Validation Schema
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
