import * as yup from "yup";

const options = [
  { value: 10, label: "10" },
  { value: 15, label: "15" },
  { value: 20, label: "20" },
];

const classoptions = [
  { value: "11", label: "11" },
  { value: "12", label: "12" },
];

// ✅ Function to generate dynamic subject list based on selected class & topic
const getDynamicSubjectOptions = (selectedClass, selectedTopic) => {
  if (!selectedClass || !selectedTopic) return [];

  if (String(selectedClass) === "11" && selectedTopic === "topic_1") {
    return [
      { value: "Chemistry", label: "Chemistry" },
      { value: "Physics", label: "Physics" },
      { value: "Biology", label: "Biology" },
    ];
  }

  if (String(selectedClass) === "12" && selectedTopic === "topic_2") {
    return [
      { value: "Business Studies Part 1", label: "Business Studies Part 1" },
      { value: "Business Studies Part 2", label: "Business Studies Part 2" },
    ];
  }

  return [];
};

// ✅ Chapter dataset
const chapterCounts = new Map([
  [
    "11-Physics-NCERT",
    ["Physical World", "Units and Measurements", "Laws of Motion", "Work, Energy and Power"],
  ],
  [
    "11-Chemistry-NCERT",
    ["Structure of Atom", "Chemical Bonding", "Equilibrium"],
  ],
  [
    "11-Biology-NCERT",
    ["Cell", "Photosynthesis", "Respiration", "Growth and Development"],
  ],
  [
    "12-Business Studies Part 1-NCERT",
    [
      "Nature and Significance of Management",
      "Principles of Management",
      "Planning",
      "Organising",
    ],
  ],
  [
    "12-Business Studies Part 2-NCERT",
    [
      "Financial Management",
      "Marketing Management",
      "Consumer Protection",
    ],
  ],
]);

// ✅ Generate chapter options for the selected subject
const generateChapterOptions = (selectedClass, subject, syllabus) => {
  const key = `${selectedClass}-${subject}-NCERT`;
  const chapterData = chapterCounts.get(key);

  if (Array.isArray(chapterData)) {
    return chapterData.map((chapterName, index) => ({
      value: chapterName,
      label: `${index + 1}. ${chapterName}`,
    }));
  }

  return [];
};

// ✅ Main Field Export
export const fields = (
  useGetSubjectOptionsMutation,
  useGetSyllabusOptionsMutation,
  currentClass,
  setCurrentClass,
  currentSubject,
  setCurrentSubject,
  currentSyllabus,
  setCurrentSyllabus,
  childrenListData,
  childrenListClass,
  currentTopic,
  setCurrentTopic
) => {
  const subjectOptionsForClass = getDynamicSubjectOptions(currentClass, currentTopic);
  const chapterOptions = generateChapterOptions(currentClass, currentSubject, currentSyllabus);

  return [
    {
      name: "class",
      label: "Class",
      placeholder: "Select Class ...",
      type: "select",
      options: childrenListClass?.data?.data || classoptions,
      autoFocus: true,
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-12",
      className: "mobile-select-no-keyboard",
      getValueCallback: (value) => {
        setCurrentClass(String(value)); // ✅ Always store as string
        setCurrentSubject(null);
        setCurrentTopic(null);
      },
    },
    {
      name: "syllabus",
      label: "Syllabus",
      placeholder: "Select Syllabus ...",
      type: "select",
      autoFocus: true,
      fetchData: useGetSyllabusOptionsMutation,
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-12",
      className: "mobile-select-no-keyboard",
      getValueCallback: (value) => setCurrentSyllabus(value),
    },
    {
      name: "topics",
      label: "Topic",
      placeholder: "Select Topic ...",
      type: "select",
      options: [
        { value: "topic_1", label: "Topic 1" },
        { value: "topic_2", label: "Topic 2" },
        { value: "topic_3", label: "Topic 3" },
      ],
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-6",
      getValueCallback: (value) => {
        setCurrentTopic(value);
        setCurrentSubject(null); // reset subject when topic changes
      },
    },
    {
      name: "subject",
      label: "Subject",
      placeholder: "Select Subject ...",
      type: "select",
      autoFocus: true,
      options: subjectOptionsForClass,
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-6",
      className: "mobile-select-no-keyboard",
      getValueCallback: (value) => setCurrentSubject(value),
      disabled: !currentClass || !currentTopic,
    },
    {
      name: "chapter_from",
      label: "Chapter From",
      placeholder: "Select Chapter ...",
      type: "select",
      options: chapterOptions,
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-6",
      className: "mobile-select-no-keyboard",
      disabled: !currentClass || !currentSubject,
    },
    {
      name: "chapter_to",
      label: "Chapter To",
      placeholder: "Select Chapter ...",
      type: "select",
      options: chapterOptions,
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-6",
      className: "mobile-select-no-keyboard",
      disabled: !currentClass || !currentSubject,
    },
    {
      name: "language",
      label: "Language",
      placeholder: "Select Language ...",
      type: "select",
      options: [
        { value: "English", label: "English" },
        { value: "Hindi", label: "Hindi" },
      ],
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-6",
      className: "mobile-select-no-keyboard",
    },
    {
      name: "no_of_question",
      label: "Number Of Question",
      placeholder: "Select Number ...",
      type: "select",
      options: options,
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-6 mb-[400px] sm:mb-5",
      className: "mobile-select-no-keyboard",
    },
  ];
};

export const schema = yup
  .object()
  .shape({
    language: yup.string().required("This field required"),
    chapter_from: yup.string().required("This field required"),
    chapter_to: yup.string().required("This field required"),
    syllabus: yup.string().required("This field required"),
    subject: yup.string().required("This field required"),
    no_of_question: yup.string().required("This field required"),
    class: yup.string().required("This field required"),
    topics: yup.string().required("This field required"),
  })
  .required();
