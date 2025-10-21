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

// MAPPING FOR CLASS-BASED TOPICS
const classTopicMapping = {
  "11": [
    { value: "topic_1", label: "Topic 1" },
    { value: "topic_2", label: "Topic 2" },
  ],
  "12": [
    { value: "topic_2", label: "Topic 2" },
    { value: "topic_3", label: "Topic 3" },
  ],
  default: [
    { value: "topic_1", label: "Topic 1" },
    { value: "topic_2", label: "Topic 2" },
    { value: "topic_3", label: "Topic 3" },
  ],
};

// MAPPING FOR TOPIC-BASED SUBJECTS
const topic_1_subjects = [
    { value: "Chemistry", label: "Chemistry" },
    { value: "Physics", label: "Physics" },
    { value: "Biology", label: "Biology" },
];
const topic_2_subjects = [
    { value: "Business Studies Part 1", label: "Business Studies Part 1" },
    { value: "Business Studies Part 2", label: "Business Studies Part 2" },
];

const topicSubjectMapping = {
  topic_1: topic_1_subjects,
  topic_2: topic_2_subjects,
  // MODIFIED: Default is an empty array to show nil list when no topic is selected.
  default: [],
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
  // NEW: Generic Subject Key for Class 11 Physics (Combines Part 1 and 2 chapters)
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

  // NEW: Generic Subject Key for Class 11 Chemistry (Combines Part 1 and 2 chapters)
  [
    "11-Chemistry-NCERT",
    [
      "Some Basic Concepts of Chemistry",
      "Structure of Atom",
      "Classification of Elements and Periodicity in Properties",
      "Chemical Bonding and Molecular Structure",
      "Chemical Thermodynamics",
      "Equilibrium",
      "Redox Reactions",
      "Organic Chemistry – Some Basic Principles and Techniques",
      "Hydrocarbons",
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

  // 1. Check for specific subject/syllabus combination (e.g., "11-Physics Part 1-NCERT")
  if (syllabus) {
    key = `${selectedClass}-${subject}-${syllabus}`;
    chapterData = chapterCounts.get(key);
  }

  // 2. Check for generic subject/common syllabus (e.g., "11-Chemistry-NCERT")
  if (!chapterData) {
    // Try NCERT first
    key = `${selectedClass}-${subject}-NCERT`;
    chapterData = chapterCounts.get(key);
  }

  // 3. Fallback checks for Default/CBSE if the exact or NCERT key wasn't found
  if (!chapterData) {
    key = `${selectedClass}-${subject}-Default`;
    chapterData = chapterCounts.get(key);
  }
  if (!chapterData) {
    key = `${selectedClass}-${subject}-CBSE`;
    chapterData = chapterCounts.get(key);
  }

  // 4. If data is an array (list of chapter names)
  if (Array.isArray(chapterData)) {
    return chapterData.map((chapterName, index) => ({
      value: chapterName,
      label: (index + 1).toString(),
    }));
  }
  // 5.
