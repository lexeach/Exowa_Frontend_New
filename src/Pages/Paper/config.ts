import * as yup from "yup";

const options = [
  { value: 10, label: "10" },
  { value: 15, label: "15" },
  { value: 20, label: "20" },
];

const classoptions = [
  { value: 10, label: "10" },
];

const classTopicMapping = {
  "11": [
    { value: "topic_1", label: "Topic 1" },
    { value: "topic_2", label: "Topic 2" },
  ],
  "12": [
    { value: "topic_2", label: "Topic 2" },
    { value: "topic_3", label: "Topic 3" },
  ],
  "10": [
    { value: "topic_1", label: "General Topic 1" },
    { value: "topic_2", label: "General Topic 2" },
  ],
  default: [
    { value: "topic_1", label: "Topic 1" },
    { value: "topic_2", label: "Topic 2" },
    { value: "topic_3", label: "Topic 3" },
  ],
};

// --- SUBJECT MAPPING ---
const classTopicSubjectMapping = {
  "11_topic_1": [
    { value: "Chemistry", label: "Chemistry" },
    { value: "Physics", label: "Physics" },
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
  "10_topic_1": [
    { value: "Mathematics", label: "Mathematics" },
    { value: "Science", label: "Science" },
    { value: "English", label: "English" },
  ],
  "10_topic_2": [
    { value: "Social Science", label: "Social Science" },
    { value: "Hindi", label: "Hindi" },
  ],
};

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
    [
      "Financial Management",
      "Financial Markets",
      "Marketing Management",
      "Consumer Protection",
    ],
  ],
  [
    "11-Physics-NCERT",
    [
      "Physical World",
      "Units and Measurements",
      "Motion in a Straight Line",
      "Motion in a Plane",
      "Laws of Motion",
      "Work, Energy and Power",
      "System of Particles and Rotational Motion",
      "Gravitation",
      "Mechanical Properties of Solids",
      "Mechanical Properties of Fluids",
      "Thermal Properties of Matter",
      "Thermodynamics",
      "Kinetic Theory",
      "Oscillations",
    ],
  ],
  [
    "12-Accountancy Part 2-NCERT",
    [
      "Financial Statements of a Company",
      "Analysis of Financial Statements",
      "Accounting Ratios",
      "Cash Flow Statement",
    ],
  ],
]);

// --- Helper: Chapter Options ---
const generateChapterOptions = (selectedClass, subject, syllabus) => {
  let key;
  let chapterData = null;

  if (syllabus) {
    key = `${selectedClass}-${subject}-${syllabus}`;
    chapterData = chapterCounts.get(key);
  }

  if (!chapterData) {
    key = `${selectedClass}-${subject}-NCERT`;
    chapterData = chapterCounts.get(key);
  }

  if (!chapterData) {
    key = `${selectedClass}-${subject}-Default`;
    chapterData = chapterCounts.get(key);
  }
  if (!chapterData) {
    key = `${selectedClass}-${subject}-CBSE`;
    chapterData = chapterCounts.get(key);
  }

  if (Array.isArray(chapterData)) {
    return chapterData.map((chapterName, index) => ({
      value: chapterName,
      label: (index + 1).toString(),
    }));
  } else if (typeof chapterData === "number") {
    return Array.from({ length: chapterData }, (_, i) => ({
      value: (i + 1).toString(),
      label: (i + 1).toString(),
    }));
  }

  return [];
};

// --- MAIN FUNCTION ---
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

  // --- FIXED SUBJECT LOGIC ---
  let subjectOptions = [];

  if (currentClass && currentTopic) {
    const safeCurrentClass = String(currentClass);
    const topicValue =
      typeof currentTopic === "object" ? currentTopic.value : currentTopic;

    const subjectKey = `${safeCurrentClass}_${topicValue}`;
    subjectOptions =
      classTopicSubjectMapping[subjectKey] && classTopicSubjectMapping[subjectKey].length > 0
        ? classTopicSubjectMapping[subjectKey]
        : [
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
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-12",
      className: "mobile-select-no-keyboard",
      getValueCallback: (value) => {
        setCurrentClass(value);
        setCurrentTopic(null);
        setCurrentSubject(null);
      },
    },
    {
      name: "syllabus",
      label: "Syllabus",
      placeholder: "Select Syllabus ...",
      type: "select",
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
      options: topicOptionsForClass,
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-6",
      getValueCallback: (value) => {
        setCurrentTopic(value);
        setCurrentSubject(null);
      },
      disabled: !currentClass || topicOptionsForClass.length === 0,
    },
    {
      name: "subject",
      label: "Subject",
      placeholder: "Select Subject ...",
      type: "select",
      options: subjectOptions,
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-6",
      className: "mobile-select-no-keyboard",
      getValueCallback: (value) => setCurrentSubject(value),
      disabled: !currentTopic,
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
      disabled:
        !currentClass || !currentSubject || chapterOptions.length === 0,
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
      disabled:
        !currentClass || !currentSubject || chapterOptions.length === 0,
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
        { value: "Tamil", label: "Tamil" },
        { value: "Telugu", label: "Telugu" },
        { value: "Bengali", label: "Bengali" },
        { value: "Gujarati", label: "Gujarati" },
        { value: "Kannada", label: "Kannada" },
        { value: "Malayalam", label: "Malayalam" },
        { value: "Urdu", label: "Urdu" },
      ],
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-6",
      className: "mobile-select-no-keyboard",
    },
    {
      name: "no_of_question",
      label: "Number Of Questions",
      placeholder: "Select Number ...",
      type: "select",
      options: options,
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-6 mb-[400px] sm:mb-5",
      className: "mobile-select-no-keyboard",
    },
  ];
};

// --- VALIDATION SCHEMA ---
export const schema = yup
  .object()
  .shape({
    language: yup.string().required("This field is required"),
    chapter_from: yup.string().required("This field is required"),
    chapter_to: yup.string().when("chapter_from", {
      is: (chapter_from) => chapter_from,
      then: (schema) =>
        schema
          .required("This field is required")
          .test(
            "is-greater-or-equal",
            "Chapter To cannot be less than Chapter From",
            function (chapter_to) {
              const {
                chapter_from,
                subject,
                class: classValue,
                syllabus,
              } = this.parent;

              if (!chapter_from || !chapter_to) return true;

              const numFrom = parseInt(chapter_from);
              const numTo = parseInt(chapter_to);

              if (!isNaN(numFrom) && !isNaN(numTo)) {
                return numTo >= numFrom;
              }

              let key = syllabus
                ? `${classValue}-${subject}-${syllabus}`
                : `${classValue}-${subject || "Default"}-Default`;
              const chapterData = chapterCounts.get(key);

              if (Array.isArray(chapterData)) {
                const indexFrom = chapterData.indexOf(chapter_from);
                const indexTo = chapterData.indexOf(chapter_to);
                if (indexFrom !== -1 && indexTo !== -1)
                  return indexTo >= indexFrom;
              }

              return true;
            }
          ),
      otherwise: (schema) => schema.required("This field is required"),
    }),
    syllabus: yup.string().required("This field is required"),
    subject: yup.string().required("This field is required"),
    no_of_question: yup.string().required("This field is required"),
    class: yup.string().required("This field is required"),
    topics: yup.string().required("This field is required"),
  })
  .required();
