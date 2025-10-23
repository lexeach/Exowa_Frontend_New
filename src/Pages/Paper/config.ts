import * as yup from "yup";

// ✅ Fixed options
const options = [
  { value: 10, label: "10" },
  { value: 15, label: "15" },
  { value: 20, label: "20" },
];

// ✅ Dynamic subject list based on Class & Topic
const getDynamicSubjects = (selectedClass, selectedTopic) => {
  if (selectedClass === "11" && selectedTopic === "1") {
    return [
      { value: "Physics Part 1", label: "Physics Part 1" },
      { value: "Physics Part 2", label: "Physics Part 2" },
    ];
  } else if (selectedClass === "11" && selectedTopic === "2") {
    return [
      { value: "Chemistry Part 1", label: "Chemistry Part 1" },
      { value: "Chemistry Part 2", label: "Chemistry Part 2" },
    ];
  } else if (selectedClass === "12" && selectedTopic === "2") {
    return [
      { value: "Business Studies Part 1", label: "Business Studies Part 1" },
      { value: "Business Studies Part 2", label: "Business Studies Part 2" },
    ];
  }
  return []; // default when no match
};

// ✅ Dynamic Chapter/Topic list (example data)
const chapterCounts = new Map([
  [
    "11-Physics Part 1-NCERT",
    [
      "Physical World",
      "Units and Measurements",
      "Motion in a Straight Line",
      "Motion in a Plane",
      "Laws of Motion",
    ],
  ],
  [
    "11-Physics Part 2-NCERT",
    [
      "Work, Energy and Power",
      "System of Particles and Rotational Motion",
      "Gravitation",
      "Mechanical Properties of Solids",
    ],
  ],
  [
    "11-Chemistry Part 1-NCERT",
    [
      "Some Basic Concepts of Chemistry",
      "Structure of Atom",
      "Classification of Elements",
      "Chemical Bonding",
    ],
  ],
  [
    "12-Business Studies Part 1-NCERT",
    [
      "Nature and Significance of Management",
      "Principles of Management",
      "Business Environment",
      "Planning",
    ],
  ],
]);

// ✅ Function to generate chapter list
const generateChapterOptions = (selectedClass, subject, syllabus) => {
  let key = `${selectedClass}-${subject}-${syllabus}`;
  const chapterData = chapterCounts.get(key);

  if (Array.isArray(chapterData)) {
    return chapterData.map((chapterName, index) => ({
      value: chapterName,
      label: `${index + 1}. ${chapterName}`,
    }));
  }
  return [];
};

// ✅ Form Fields
export const fields = (
  useGetSubjectOptionsMutation,
  useGetSyllabusOptionsMutation,
  currentClass,
  setCurrentClass,
  currentTopic,
  setCurrentTopic,
  currentSubject,
  setCurrentSubject,
  currentSyllabus,
  setCurrentSyllabus,
  childrenListData,
  childrenListClass
) => {
  const subjectOptions = getDynamicSubjects(currentClass, currentTopic);

  return [
    {
      name: "class",
      label: "Select Class",
      type: "select",
      placeholder: "Choose Class",
      options: [
        { value: "11", label: "Class 11" },
        { value: "12", label: "Class 12" },
      ],
      onChange: (value) => {
        setCurrentClass(value);
        setCurrentTopic("");
        setCurrentSubject("");
        setCurrentSyllabus("");
      },
      validation: yup.string().required("Class is required"),
    },

    {
      name: "topic",
      label: "Select Topic",
      type: "select",
      placeholder: "Choose Topic",
      options: [
        { value: "1", label: "Topic 1" },
        { value: "2", label: "Topic 2" },
      ],
      onChange: (value) => {
        setCurrentTopic(value);
        setCurrentSubject("");
        setCurrentSyllabus("");
      },
      validation: yup.string().required("Topic is required"),
    },

    {
      name: "subject",
      label: "Select Subject",
      type: "select",
      placeholder: "Choose Subject",
      options: subjectOptions,
      disabled: subjectOptions.length === 0,
      onChange: (value) => {
        setCurrentSubject(value);
        setCurrentSyllabus("");
      },
      validation: yup.string().required("Subject is required"),
    },

    {
      name: "syllabus",
      label: "Syllabus Type",
      type: "select",
      placeholder: "Choose Syllabus",
      options: [
        { value: "NCERT", label: "NCERT" },
        { value: "CBSE", label: "CBSE" },
      ],
      onChange: (value) => setCurrentSyllabus(value),
      validation: yup.string().required("Syllabus is required"),
    },

    {
      name: "chapter",
      label: "Select Chapter / Topic",
      type: "select",
      placeholder: "Choose Chapter / Topic",
      options:
        generateChapterOptions(currentClass, currentSubject, currentSyllabus) ||
        [],
      validation: yup.string().required("Chapter/Topic is required"),
    },

    {
      name: "language",
      label: "Select Language",
      type: "select",
      placeholder: "Choose Language",
      options: [
        { value: "English", label: "English" },
        { value: "Hindi", label: "Hindi" },
      ],
      validation: yup.string().required("Language is required"),
    },

    {
      name: "numOfQuestions",
      label: "No. of Questions",
      type: "select",
      placeholder: "Select number",
      options: options,
      validation: yup.string().required("Please select number of questions"),
    },
  ];
};
