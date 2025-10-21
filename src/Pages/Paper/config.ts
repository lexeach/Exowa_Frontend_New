import * as yup from "yup";

const options = [
  { value: 10, label: "10" },
  { value: 15, label: "15" },
  { value: 20, label: "20" },
];

const classoptions = [{ value: 10, label: "10" }];

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

// ✅ FIXED SUBJECT MAPPING
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
    { value: "Business Studies Part 1", label: "Business Studies Part 1" },
    { value: "Business Studies Part 2", label: "Business Studies Part 2" },
  ],
  "12_topic_2": [
    { value: "Business Studies Part 1", label: "Business Studies Part 1" },
    { value: "Business Studies Part 2", label: "Business Studies Part 2" },
  ],
  "12_topic_3": [
    { value: "Economics", label: "Economics" },
    { value: "Accountancy", label: "Accountancy" },
  ],
};

// ✅ FIXED CHAPTER LIST
const chapterCounts = new Map<string, string[] | number>([
  [
    "12-Business Studies Part 1-NCERT",
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
  [
    "12-Business Studies Part 2-NCERT",
    ["Financial Management", "Financial Markets", "Marketing Management", "Consumer Protection"],
  ],
]);

// ✅ GENERATE CHAPTER OPTIONS
const generateChapterOptions = (selectedClass, subject, syllabus) => {
  let key = `${selectedClass}-${subject}-${syllabus || "NCERT"}`;
  const chapterData = chapterCounts.get(key);

  if (Array.isArray(chapterData)) {
    return chapterData.map((chapterName, i) => ({
      value: chapterName,
      label: (i + 1).toString(),
    }));
  }

  if (typeof chapterData === "number") {
    return Array.from({ length: chapterData }, (_, i) => ({
      value: (i + 1).toString(),
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
  const topicOptionsForClass = classTopicMapping[String(currentClass)] || classTopicMapping["default"];

  // ✅ FIXED SUBJECT LOGIC (Always Resolves)
  let subjectOptions = [];
  if (currentClass && currentTopic) {
    const classKey = String(currentClass);
    const topicValue = typeof currentTopic === "object" ? currentTopic.value : currentTopic;
    const subjectKey = `${classKey}_${topicValue}`;
    console.log("🧠 Subject Key:", subjectKey);

    subjectOptions = classTopicSubjectMapping[subjectKey] || [
      { value: "Mathematics", label: "Mathematics" },
      { value: "Science", label: "Science" },
      { value: "English", label: "English" },
    ];
  }

  const chapterOptions = generateChapterOptions(currentClass, currentSubject, currentSyllabus);

  return [
    {
      name: "class",
      label: "Class",
      placeholder: "Select Class ...",
      type: "select",
      options: childrenListClass?.data?.data || classoptions,
      autoFocus: true,
      fieldWrapperClassName: "col-span-12",
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
      fieldWrapperClassName: "col-span-6",
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
      fieldWrapperClassName: "col-span-6",
      getValueCallback: (value) => setCurrentSubject(value),
      disabled: !currentTopic,
    },
    {
      name: "syllabus",
      label: "Syllabus",
      placeholder: "Select Syllabus ...",
      type: "select",
      fetchData: useGetSyllabusOptionsMutation,
      fieldWrapperClassName: "col-span-12",
      getValueCallback: (value) => setCurrentSyllabus(value),
    },
    {
      name: "chapter_from",
      label: "Chapter From",
      placeholder: "Select Chapter ...",
      type: "select",
      options: chapterOptions,
      fieldWrapperClassName: "col-span-6",
      disabled: !currentSubject,
    },
    {
      name: "chapter_to",
      label: "Chapter To",
      placeholder: "Select Chapter ...",
      type: "select",
      options: chapterOptions,
      fieldWrapperClassName: "col-span-6",
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
      fieldWrapperClassName: "col-span-6",
    },
    {
      name: "no_of_question",
      label: "Number Of Questions",
      placeholder: "Select Number ...",
      type: "select",
      options: options,
      fieldWrapperClassName: "col-span-6",
    },
  ];
};

// ✅ VALIDATION
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
