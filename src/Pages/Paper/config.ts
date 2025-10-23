import * as yup from "yup";

const options = [
  { value: 10, label: "10" },
  { value: 15, label: "15" },
  { value: 20, label: "20" },
];

// ✅ Subject mapping based on Class + Topic
const dynamicSubjectMapping = {
  "11-topic_1": [
    { value: "Physics Part 1", label: "Physics Part 1" },
    { value: "Physics Part 2", label: "Physics Part 2" },
  ],
  "11-topic_2": [
    { value: "Chemistry Part 1", label: "Chemistry Part 1" },
    { value: "Chemistry Part 2", label: "Chemistry Part 2" },
  ],
  "12-topic_2": [
    { value: "Chemistry", label: "Chemistry" },
    { value: "Biology", label: "Biology" },
  ],
  default: [],
};

// ✅ Chapter data
const chapterCounts = new Map([
  [
    "11-Physics Part 1-NCERT",
    [
      "Physical World",
      "Units and Measurements",
      "Motion in a Straight Line",
      "Motion in a Plane",
      "Laws of Motion",
      "Work, Energy and Power",
      "System of Particles and Rotational Motion",
    ],
  ],
  [
    "11-Physics Part 2-NCERT",
    [
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
    "11-Chemistry Part 1-NCERT",
    [
      "Some Basic Concepts of Chemistry",
      "Structure of Atom",
      "Classification of Elements",
      "Chemical Bonding and Molecular Structure",
      "Thermodynamics",
      "Equilibrium",
    ],
  ],
  [
    "11-Chemistry Part 2-NCERT",
    [
      "Redox Reactions",
      "Organic Chemistry – Basics",
      "Hydrocarbons",
    ],
  ],
  [
    "12-Chemistry-NCERT",
    [
      "Solutions",
      "Electrochemistry",
      "Chemical Kinetics",
      "The d- and f-Block Elements",
      "Coordination Compounds",
    ],
  ],
  [
    "12-Biology-NCERT",
    [
      "Reproduction",
      "Genetics",
      "Evolution",
      "Human Health",
      "Biotechnology",
      "Ecosystem",
    ],
  ],
]);

// ✅ Function to generate chapters
const generateChapterOptions = (selectedClass, subject, syllabus) => {
  let key = `${selectedClass}-${subject}-${syllabus}`;
  let chapterData = chapterCounts.get(key);

  if (!chapterData && syllabus !== "NCERT")
    chapterData = chapterCounts.get(`${selectedClass}-${subject}-NCERT`);

  if (!chapterData) return [];

  return chapterData.map((chapter, i) => ({
    value: chapter,
    label: `${i + 1}. ${chapter}`,
  }));
};

// ✅ Form Field Definitions
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
  const subjectOptions =
    dynamicSubjectMapping[`${currentClass}-${currentTopic}`] ||
    dynamicSubjectMapping["default"];

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
      options: childrenListClass?.data?.data || [],
      getValueCallback: (value) => {
        setCurrentClass(value);
        setCurrentSubject(null);
      },
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
      name: "topics",
      label: "Topic",
      placeholder: "Select Topic ...",
      type: "select",
      options: [
        { value: "topic_1", label: "Topic 1" },
        { value: "topic_2", label: "Topic 2" },
        { value: "topic_3", label: "Topic 3" },
      ],
      getValueCallback: (value) => {
        setCurrentTopic(value);
        setCurrentSubject(null); // refresh subject list
      },
    },
    {
      name: "subject",
      label: "Subject",
      placeholder: "Select Subject ...",
      type: "select",
      options: subjectOptions,
      getValueCallback: (value) => setCurrentSubject(value),
      disabled: !currentClass || !currentTopic,
    },
    {
      name: "chapter_from",
      label: "Chapter From",
      placeholder: "Select Chapter From ...",
      type: "select",
      options: chapterOptions,
      disabled: !currentSubject,
    },
    {
      name: "chapter_to",
      label: "Chapter To",
      placeholder: "Select Chapter To ...",
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
      label: "Number of Questions",
      placeholder: "Select Number ...",
      type: "select",
      options: options,
    },
  ];
};

// ✅ Validation Schema
export const schema = yup
  .object()
  .shape({
    class: yup.string().required("Class is required"),
    topics: yup.string().required("Topic is required"),
    subject: yup.string().required("Subject is required"),
    syllabus: yup.string().required("Syllabus is required"),
    chapter_from: yup.string().required("Select chapter from"),
    chapter_to: yup.string().required("Select chapter to"),
    language: yup.string().required("Language is required"),
    no_of_question: yup.string().required("Number of questions is required"),
  })
  .required();
