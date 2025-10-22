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

// ✅ Topic list based on class
const topicOptionsByClass = {
  "11": [
    { value: "1", label: "Topic 1" },
    { value: "2", label: "Topic 2" },
  ],
  "12": [
    { value: "1", label: "Topic 1" },
    { value: "2", label: "Topic 2" },
  ],
};

// ✅ Subject list based on class & topic
const dynamicSubjectByClassAndTopic = {
  "11": {
    "1": [
      { value: "Physics Part 1", label: "Physics Part 1" },
      { value: "Physics Part 2", label: "Physics Part 2" },
    ],
    "2": [
      { value: "Chemistry Part 1", label: "Chemistry Part 1" },
      { value: "Chemistry Part 2", label: "Chemistry Part 2" },
      { value: "Biology", label: "Biology" },
    ],
  },
  "12": {
    "2": [
      { value: "Business Studies Part 1", label: "Business Studies Part 1" },
      { value: "Business Studies Part 2", label: "Business Studies Part 2" },
    ],
  },
};

// ✅ Helper functions
const getTopicOptions = (selectedClass) => {
  return topicOptionsByClass[selectedClass] || [];
};

const getSubjectOptions = (selectedClass, selectedTopic) => {
  if (selectedClass && selectedTopic) {
    return (
      (dynamicSubjectByClassAndTopic[selectedClass] &&
        dynamicSubjectByClassAndTopic[selectedClass][selectedTopic]) ||
      []
    );
  }
  return [];
};

// ✅ Chapter map (unchanged)
const chapterCounts = new Map([
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
      "Classification of Elements and Periodicity in Properties",
      "Chemical Bonding and Molecular Structure",
      "Chemical Thermodynamics",
      "Equilibrium",
    ],
  ],
  [
    "11-Chemistry Part 2-NCERT",
    [
      "Redox Reactions",
      "Organic Chemistry – Some Basic Principles and Techniques",
      "Hydrocarbons",
    ],
  ],
  [
    "11-Biology-NCERT",
    [
      "The Living World",
      "Biological Classification",
      "Plant Kingdom",
      "Animal Kingdom",
      "Morphology of Flowering Plants",
      "Anatomy of Flowering Plants",
      "Structural Organisation in Animals",
      "Cell: The Unit of Life",
      "Biomolecules",
      "Cell Cycle and Cell Division",
      "Photosynthesis in Higher Plants",
      "Respiration in Plants",
      "Plant Growth and Development",
      "Breathing and Exchange of Gases",
      "Body Fluids and Circulation",
      "Excretory Products and their Elimination",
      "Locomotion and Movement",
      "Neural Control and Coordination",
      "Chemical Coordination and Integration",
    ],
  ],
]);

// ✅ Function for chapter generation (same)
const generateChapterOptions = (selectedClass, subject, syllabus) => {
  let key;
  let chapterData = null;

  if (syllabus) {
    key = `${selectedClass}-${subject}-${syllabus}`;
    chapterData = chapterCounts.get(key);

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
  } else {
    key = `${selectedClass}-${subject || "Default"}-Default`;
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

// ✅ Main export
export const fields = (
  useGetSubjectOptionsMutation,
  useGetSyllabusOptionsMutation,
  currentClass,
  setCurrentClass,
  currentSubject,
  setCurrentSubject,
  currentSyllabus,
  setCurrentSyllabus,
  currentTopic,
  setCurrentTopic
) => {
  const topicOptions = getTopicOptions(currentClass);
  const subjectOptionsForClass = getSubjectOptions(currentClass, currentTopic);

  const chapterOptions = generateChapterOptions(
    currentClass,
    currentSubject,
    currentSyllabus
  );

  return [
    {
      name: "class",
      label: "Class",
      placeholder: "Select Class...",
      type: "select",
      options: classoptions,
      getValueCallback: (value) => {
        setCurrentClass(value);
        setCurrentTopic(null);
        setCurrentSubject(null);
      },
    },
    {
      name: "topics",
      label: "Topic",
      placeholder: "Select Topic...",
      type: "select",
      options: topicOptions,
      getValueCallback: (value) => {
        setCurrentTopic(value);
        setCurrentSubject(null);
      },
      disabled: !currentClass,
    },
    {
      name: "subject",
      label: "Subject",
      placeholder: "Select Subject...",
      type: "select",
      options: subjectOptionsForClass,
      getValueCallback: (value) => setCurrentSubject(value),
      disabled: !currentTopic,
    },
  ];
};

// ✅ Validation Schema
export const schema = yup
  .object()
  .shape({
    class: yup.string().required("This field required"),
    topics: yup.string().required("This field required"),
    subject: yup.string().required("This field required"),
  })
  .required();
