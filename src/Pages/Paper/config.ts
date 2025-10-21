import * as yup from "yup";

// Options
const options = [
  { value: 10, label: "10" },
  { value: 15, label: "15" },
  { value: 20, label: "20" },
];

const classoptions = [{ value: 10, label: "10" }];

// Topic mapping
const classTopicMapping = {
  "10": [
    { value: "topic_1", label: "General Topic 1" },
    { value: "topic_2", label: "General Topic 2" },
  ],
  "11": [
    { value: "topic_1", label: "Topic 1" },
    { value: "topic_2", label: "Topic 2" },
  ],
  "12": [
    { value: "topic_2", label: "Topic 2" },
    { value: "topic_3", label: "Topic 3" },
  ],
  default: [{ value: "topic_1", label: "Topic 1" }],
};

// Subject mapping
const classTopicSubjectMapping = {
  "10_topic_1": [
    { value: "Mathematics", label: "Mathematics" },
    { value: "Science", label: "Science" },
    { value: "English", label: "English" },
  ],
  "10_topic_2": [
    { value: "Social Science", label: "Social Science" },
    { value: "Hindi", label: "Hindi" },
  ],
  "11_topic_1": [
    { value: "Physics", label: "Physics" },
    { value: "Chemistry", label: "Chemistry" },
    { value: "Biology", label: "Biology" },
  ],
  "11_topic_2": [
    { value: "Business Studies", label: "Business Studies" },
    { value: "Economics", label: "Economics" },
  ],
  "12_topic_2": [
    { value: "Business Studies", label: "Business Studies" },
    { value: "Economics", label: "Economics" },
  ],
  "12_topic_3": [
    { value: "Accountancy", label: "Accountancy" },
    { value: "Mathematics", label: "Mathematics" },
  ],
};

// Chapter map
const chapterCounts = new Map([
  [
    "12-Business Studies-NCERT",
    [
      "Nature and Significance of Management",
      "Principles of Management",
      "Business Environment",
      "Planning",
      "Organising",
      "Staffing",
      "Directing",
      "Controlling",
    ],
  ],
]);

// Chapter generator
const generateChapterOptions = (selectedClass, subject, syllabus) => {
  let key = `${selectedClass}-${subject}-${syllabus || "NCERT"}`;
  const chapterData = chapterCounts.get(key);
  if (Array.isArray(chapterData)) {
    return chapterData.map((chapterName, i) => ({
      value: chapterName,
      label: (i + 1).toString(),
    }));
  }
  return [];
};

// ✅ MAIN FUNCTION
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
  const topicOptionsForClass =
    classTopicMapping[String(currentClass)] || classTopicMapping["default"];

  // ✅ FIX: Safe extraction
  let subjectOptions = [];
  if (currentClass && currentTopic) {
    const classKey = String(currentClass?.value || currentClass);
    const topicValue =
      typeof currentTopic === "object"
        ? currentTopic.value
        : String(currentTopic);

    const subjectKey = `${classKey}_${topicValue}`;
    console.log("🔑 Generated Subject Key:", subjectKey);

    subjectOptions =
      classTopicSubjectMapping[subjectKey] ||
      [
        { value: "Mathematics", label: "Mathematics" },
        { value: "Science", label: "Science" },
        { value: "English", label: "English" },
      ];
  }

  const chapterOptions = generateChapterOptions(
    currentClass,
    currentSubject,
    currentSyllabus
  );

  return [
    {
      name: "class",
      label: "Class",
      placeholder: "Select Class ...",
      type: "select",
      options: childrenListClass?.data?.data || classoptions,
      autoFocus: true,
      getValueCallback: (value) => {
        setCurrentClass(value);
        setCurrentTopic(null);
        setCurrentSubject(null);
      },
    },
    {
      name: "topics",
      label: "Topic",
      placeholder: "Select Topic ...",
      type: "select",
      options: topicOptionsForClass,
      getValueCallback: (value) => {
        setCurrentTopic(value);
        setCurrentSubject(null);
      },
      disabled: !currentClass,
    },
    {
      name: "subject",
      label: "Subject",
      placeholder: "Select Subject ...",
      type: "select",
      options: subjectOptions,
      getValueCallback: (value) => setCurrentSubject(value),
      disabled: !currentTopic,
    },
    {
      name: "syllabus",
      label: "Syllabus",
      placeholder: "Select Syllabus ...",
      type: "select",
      fetchData: useGetSyllabusOptionsMutation,
      getValueCallback: (value) => setCurrentSyllabus(value),
    },
    {
      name: "chapter_from",
      label: "Chapter From",
      placeholder: "Select Chapter ...",
      type: "select",
      options: chapterOptions,
      disabled: !currentSubject,
    },
    {
      name: "chapter_to",
      label: "Chapter To",
      placeholder: "Select Chapter ...",
      type: "select",
      options: chapterOptions,
      disabled: !currentSubject,
    },
    {
      name: "language",
      label: "Language",
      placeholder: "Select Language ...",
      type: "select",
      options: [
        { value: "English", label: "English" },
        { value: "Hindi", label: "Hindi" },
        { value: "Marathi", label: "Marathi" },
      ],
    },
    {
      name: "no_of_question",
      label: "Number Of Questions",
      placeholder: "Select Number ...",
      type: "select",
      options,
    },
  ];
};

// ✅ Validation schema
export const schema = yup
  .object()
  .shape({
    class: yup.string().required("This field is required"),
    topics: yup.string().required("This field is required"),
    subject: yup.string().required("This field is required"),
    syllabus: yup.string().required("This field is required"),
    chapter_from: yup.string().required("This field is required"),
    chapter_to: yup.string().required("This field is required"),
    language: yup.string().required("This field is required"),
    no_of_question: yup.string().required("This field is required"),
  })
  .required();
