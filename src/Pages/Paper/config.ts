import * as yup from "yup";

/* ---------- static lists ---------- */
const options = [
  { value: 10, label: "10" },
  { value: 15, label: "15" },
  { value: 20, label: "20" },
];

const classoptions = [
  { value: "10", label: "10" },
  { value: "11", label: "11" },
  { value: "12", label: "12" },
];

/* ---------- Topic & Subject mapping (VERIFIED) ---------- */
const topicOptionsByClass = {
  "10": [
    { value: "1", label: "Topic 1" },
    { value: "2", label: "Topic 2" },
  ],
  "11": [
    { value: "1", label: "Topic 1" },
    { value: "2", label: "Topic 2" },
    { value: "3", label: "Topic 3" },
  ],
  "12": [
    { value: "1", label: "Topic 1" },
    { value: "2", label: "Topic 2" },
  ],
  default: [
    { value: "1", label: "Topic 1" },
    { value: "2", label: "Topic 2" },
  ],
};

const dynamicSubjectByClassAndTopic = {
  "11": {
    "1": [
      { value: "Physics Part 1", label: "Physics Part 1" },
      { value: "Physics Part 2", label: "Physics Part 2" },
    ],
    "2": [
      { value: "Chemistry Part 1", label: "Chemistry Part 1" },
      { value: "Chemistry Part 2", label: "Chemistry Part 2" },
    ],
    "3": [
      // optional fallback
    ],
  },
  "12": {
    "2": [
      { value: "Business Studies Part 1", label: "Business Studies Part 1" },
      { value: "Business Studies Part 2", label: "Business Studies Part 2" },
    ],
    "1": [
      // optional mapping
    ],
  },
};

/* ---------- Chapter data (retained) ---------- */
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
    ],
  ],
  // ... (retain rest of your earlier large map as needed) ...
]);

/* ---------- Chapter helper (original logic preserved) ---------- */
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

/* ---------- Utility getters (ROBUST VALUE EXTRACTION) ---------- */

const safeExtractValue = (value) => {
    if (value === null || value === undefined || value === '') return null;
    
    // If the value is an object (common for select libraries)
    if (typeof value === 'object' && value.value !== undefined) {
        return value.value === null || value.value === undefined ? null : String(value.value);
    }
    
    // Otherwise, assume it's the primitive value itself (string or number)
    return String(value);
};

const getTopicOptions = (selectedClass) => {
  if (!selectedClass) return [];
  return topicOptionsByClass[String(selectedClass)] || topicOptionsByClass["default"];
};

const getSubjectOptions = (selectedClass, selectedTopic) => {
  if (!selectedClass || !selectedTopic) {
    return [];
  }

  const classKey = String(selectedClass);
  const topicKey = String(selectedTopic);

  // Check if the keys exist in the mapping
  const byClass = dynamicSubjectByClassAndTopic[classKey] || {};
  const subjects = byClass[topicKey] || [];
  
  return subjects;
};

/* ---------- Main exported fields function ---------- */
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
  // CRITICAL DEBUGGING: Check what state values are being used to generate the list
  console.log("Subject list generation check:");
  console.log(`  currentClass: ${currentClass} (Type: ${typeof currentClass})`);
  console.log(`  currentTopic: ${currentTopic} (Type: ${typeof currentTopic})`);

  // Derive dynamic options using the helper functions
  const topicOptions = getTopicOptions(currentClass);
  const subjectOptionsForClassTopic = getSubjectOptions(currentClass, currentTopic);
  
  console.log(`  Subject Options found: ${subjectOptionsForClassTopic.length}`); // Should be > 0 when valid Class/Topic selected

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
      options: childrenListClass?.data?.data?.length ? childrenListClass.data.data : classoptions, 
      autoFocus: true,
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-12",
      className: "mobile-select-no-keyboard",
      getValueCallback: (value) => {
        const classVal = safeExtractValue(value);
        setCurrentClass(classVal); 
        // Reset dependent fields
        setCurrentTopic(null);
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
      placeholder: "Select Topic ...",
      type: "select",
      options: topicOptions,
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-6",
      className: "mobile-select-no-keyboard",
      getValueCallback: (value) => {
        const topicVal = safeExtractValue(value);
        setCurrentTopic(topicVal);
        // Reset subject when topic changes
        setCurrentSubject(null);
      },
      disabled: !currentClass || topicOptions.length === 0,
    },
    {
      name: "subject",
      label: "Subject",
      placeholder: "Select Subject ...",
      type: "select",
      autoFocus: true,
      // Dynamic Subject options based on Class AND Topic
      options: subjectOptionsForClassTopic,
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-6",
      className: "mobile-select-no-keyboard",
      getValueCallback: (value) => {
        const subjVal = safeExtractValue(value);
        setCurrentSubject(subjVal);
      },
      // Check if the list is empty or disabled based on state
      disabled: !currentTopic || subjectOptionsForClassTopic.length === 0,
    },
    {
      name: "chapter_from",
      label: "Chapter From",
      placeholder: "Select Chapter ...",
      type: "select",
      autoFocus: true,
      options: chapterOptions,
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-6",
      className: "mobile-select-no-keyboard",
      disabled: !currentClass || !currentSubject || chapterOptions.length === 0,
    },
    {
      name: "chapter_to",
      label: "Chapter To",
      placeholder: "Select Chapter ...",
      type: "select",
      autoFocus: true,
      options: chapterOptions,
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-6",
      className: "mobile-select-no-keyboard",
      disabled: !currentClass || !currentSubject || chapterOptions.length === 0,
    },
    {
      name: "language",
      label: "Language",
      placeholder: "Chapter Language ...",
      type: "select",
      autoFocus: true,
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
        { value: "Manipuri", label: "Manipuri" },
        { value: "Kashmiri", label: "Kashmiri" },
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
      autoFocus: true,
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-6 mb-[400px] sm:mb-5",
      className: "mobile-select-no-keyboard",
    },
  ];
};

/* ---------- Validation Schema (unchanged behavior) ---------- */
export const schema = yup
  .object()
  .shape({
    language: yup.string().required("This field required"),
    chapter_from: yup.string().required("This field required"),
    chapter_to: yup.string().when("chapter_from", {
      is: (chapter_from) => chapter_from,
      then: (schema) =>
        schema
          .required("This field required")
          .test(
            "is-greater-or-equal",
            "Chapter to cannot be less than Chapter from",
            function (chapter_to) {
              const {
                chapter_from,
                subject,
                class: classValue,
                syllabus,
              } = this.parent;

              if (!chapter_from || !chapter_to) {
                return true;
              }

              const numChapterFrom = parseInt(chapter_from);
              const numChapterTo = parseInt(chapter_to);

              if (!isNaN(numChapterFrom) && !isNaN(numChapterTo)) {
                return numChapterTo >= numChapterFrom;
              }

              let key;
              if (syllabus) {
                key = `${classValue}-${subject}-${syllabus}`;
              } else {
                key = `${classValue}-${subject || "Default"}-Default`;
              }
              const chapterData = chapterCounts.get(key);

              if (Array.isArray(chapterData)) {
                const indexFrom = chapterData.indexOf(chapter_from);
                const indexTo = chapterData.indexOf(chapter_to);

                if (indexFrom !== -1 && indexTo !== -1) {
                  return indexTo >= indexFrom;
                }
              }

              return true;
            }
          ),
      otherwise: (schema) => schema.required("This field required"),
    }),
    syllabus: yup.string().required("This field required"),
    subject: yup.string().required("This field required"),
    no_of_question: yup.string().required("This field required"),
    class: yup.string().required("This field required"),
    topics: yup.string().required("This field required"),
  })
  .required();
