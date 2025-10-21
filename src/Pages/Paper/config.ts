import * as yup from "yup";

const options = [
  //{ value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 15, label: "15" },
  { value: 20, label: "20" },
];

const classoptions = [
  //{ value: 6, label: "6" },
  //{ value: 7, label: "7" },
  //{ value: 8, label: "8" },
  //{ value: 9, label: "9" },
  { value: 10, label: "10" },
  //{ value: 11, label: "11" },
  //{ value: 12, label: "12" },
];

// Define the dynamic subject options based on class
const dynamicSubjectOptions = {
  "11": [
    { value: "Physics Part 1", label: "Physics Part 1" },
    { value: "Physics Part 2", label: "Physics Part 2" },
    { value: "Mathematics", label: "Mathematics" },
    { value: "Chemistry Part 1", label: "Chemistry Part 1" },
    { value: "Chemistry Part 2", label: "Chemistry Part 2" },
    { value: "Biology", label: "Biology" },
  ],
  "12": [
    { value: "Business Studies Part 1", label: "Business Studies Part 1" },
    { value: "Business Studies Part 2", label: "Business Studies Part 2" },
  ],
  default: [],
};

// --- NEW MAPPING FOR TOPIC-BASED SUBJECTS ---
const topicSubjectMapping = {
  // If topic 1 is selected then show subject list Chemistry, Physics and Biology
  topic_1: [
    { value: "Chemistry", label: "Chemistry" },
    { value: "Physics", label: "Physics" },
    { value: "Biology", label: "Biology" },
  ],
  // If topic 2 is selected then show subject list Business Studies Part 1 and Business Studies Part 2
  topic_2: [
    { value: "Business Studies Part 1", label: "Business Studies Part 1" },
    { value: "Business Studies Part 2", label: "Business Studies Part 2" },
  ],
  default: [],
};
// ----------------------------------------------


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
    "12-Physics Part 1-NCERT",
    [
      "Electric Charges and Fields",
      "Electrostatic Potential and Capacitance",
      "Current Electricity",
      "Moving Charges and Magnetism",
      "Magnetism and Matter",
      "Electromagnetic Induction",
      "Alternating Current",
      "Electromagnetic Waves",
    ],
  ],
  [
    "12-Physics Part 2-NCERT",
    [
      "Ray Optics and Optical Instruments",
      "Wave Optics",
      "Dual Nature of Radiation and Matter",
      "Atoms",
      "Nuclei",
      "Semiconductor Electronics",
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
    "12-Chemistry Part 1-NCERT",
    [
      "Solutions",
      "Electrochemistry",
      "Chemical Kinetics",
      "The d- and f-Block Elements",
      "Coordination Compounds",
    ],
  ],
  [
    "12-Chemistry Part 2-NCERT",
    [
      "Haloalkanes and Haloarenes",
      "Alcohols, Phenols and Ethers",
      "Aldehydes, Ketones and Carboxylic Acids",
      "Amines",
      "Biomolecules",
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
  [
    "12-Biology-NCERT",
    [
      "Sexual Reproduction in Flowering Plants",
      "Human Reproduction",
      "Reproductive Health",
      "Principles of Inheritance and Variation",
      "Molecular Basis of Inheritance",
      "Evolution",
      "Human Health and Disease",
      "Microbes in Human Welfare",
      "Biotechnology - Principles and Processes",
      "Biotechnology and its Applications",
      "Organisms and Populations",
      "Ecosystem",
      "Biodiversity and Conservation",
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

const generateChapterOptions = (selectedClass, subject, syllabus) => {
  let key;

  let chapterData = null;

  if (syllabus) {
    // Try the exact syllabus first
    key = `${selectedClass}-${subject}-${syllabus}`;
    chapterData = chapterCounts.get(key);

    // If not found, try with NCERT (most common)
    if (!chapterData) {
      key = `${selectedClass}-${subject}-NCERT`;
      chapterData = chapterCounts.get(key);
    }

    // If still not found, try with Default
    if (!chapterData) {
      key = `${selectedClass}-${subject}-Default`;
      chapterData = chapterCounts.get(key);
    }

    // If still not found, try with CBSE
    if (!chapterData) {
      key = `${selectedClass}-${subject}-CBSE`;
      chapterData = chapterCounts.get(key);
    }
  } else {
    key = `${selectedClass}-${subject || "Default"}-Default`;
    chapterData = chapterCounts.get(key);
  }

  if (Array.isArray(chapterData)) {
    // Correct logic: value is the chapter name, label is the number
    return chapterData.map((chapterName, index) => ({
      value: chapterName,
      label: (index + 1).toString(),
    }));
  } else if (typeof chapterData === "number") {
    // Correct logic: both are the number, as there's no name data
    return Array.from({ length: chapterData }, (_, i) => ({
      value: (i + 1).toString(),
      label: (i + 1).toString(),
    }));
  }

  return [];
};

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
  // ADDED currentTopic and setCurrentTopic at the end to avoid breaking existing arguments
  currentTopic, 
  setCurrentTopic
) => {
  const subjectOptionsForClass =
    dynamicSubjectOptions[currentClass] || dynamicSubjectOptions["default"];
    
  // Get subject options based on the selected topic
  const subjectOptionsForTopic =
    topicSubjectMapping[currentTopic] || topicSubjectMapping["default"];


  const chapterOptions = generateChapterOptions(
    currentClass,
    currentSubject,
    currentSyllabus
  );

  return [
    {
      name: "class",
      label: "Class",
      placeholder: "Class ...",
      type: "select",
      options: childrenListClass?.data?.data || [], // This now receives the correct data object
      autoFocus: true,
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-12",
      className: "mobile-select-no-keyboard",
      getValueCallback: (value) => {
        setCurrentClass(value);
        setCurrentSubject(null);
      },
    },
    {
      name: "syllabus",
      label: "Syllabus",
      placeholder: "Syllabus Subject ...",
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
      placeholder: "Select Chapter ...",
      type: "select",
      options: [
        {
          value: "topic_1",
          label: "Topic 1",
        },
        {
          value: "topic_2",
          label: "Topic 2",
        },
        {
          value: "topic_3",
          label: "Topic 3",
        },
      ],
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-6",
      // Callback to set the topic and reset subject
      getValueCallback: (value) => {
        setCurrentTopic(value);
        setCurrentSubject(null);
      },
    },
    {
      name: "subject",
      label: "Subject",
      placeholder: "Select Subject ...",
      type: "select",
      autoFocus: true,
      // Use topic-based subject options
      options: subjectOptionsForTopic,
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-6",
      className: "mobile-select-no-keyboard",
      getValueCallback: (value) => setCurrentSubject(value),
      disabled: (() => {
        const isDisabled = !currentTopic || subjectOptionsForTopic.length === 0;
        return isDisabled;
      })(),
