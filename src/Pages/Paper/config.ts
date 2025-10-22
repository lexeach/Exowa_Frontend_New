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

/* ---------- Topic & Subject mapping ---------- */
/* Topic options organized per class (values are strings "1","2","3" to match your request) */
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

/* Subjects depend on class AND topic. */
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
      // optional fallback for topic_3 of class 11 - kept for structure
    ],
  },
  "12": {
    "2": [
      { value: "Business Studies Part 1", label: "Business Studies Part 1" },
      { value: "Business Studies Part 2", label: "Business Studies Part 2" },
    ],
    "1": [
      // optional mapping for topic 1 of class 12 - kept for structure
    ],
  },
};

/* ---------- Chapter data (kept as in your original file) ---------- */
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

/* ---------- Chapter helper (your original logic preserved) ---------- */
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
    // Attempt to use a default lookup key
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

/* ---------- Utility getters (for clarity) ---------- */

const getTopicOptions = (selectedClass) => {
  if (!selectedClass) return [];
  return topicOptionsByClass[String(selectedClass)] || topicOptionsByClass["default"];
};

const getSubjectOptions = (selectedClass, selectedTopic) => {
  if (!selectedClass || !selectedTopic) return [];
  const byClass = dynamicSubjectByClassAndTopic[String(selectedClass)] || {};
  return byClass[String(selectedTopic)] || [];
};

/* ---------- Main exported fields function (signature kept as requested) ---------- */
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
  // Derive dynamic options using the helper functions
  const topicOptions = getTopicOptions(currentClass);
  const subjectOptionsForClassTopic = getSubjectOptions(currentClass, currentTopic);

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
        // --- FIX: Defensive normalization for Class ---
        // If value is an object (e.g., from a Select component: {value: "11", label: "11"}), extract value.value
        const classVal = (typeof value === "object" && value !== null) ? (value.value ?? value) : value;
        setCurrentClass(classVal != null ? String(classVal) : null);
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
      // Dynamic Topic options based on Class
      options: topicOptions,
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-6",
      className: "mobile-select-no-keyboard",
      getValueCallback: (value) => {
        // --- FIX: Defensive normalization for Topic ---
        // If value is an object (e.g., from a Select component: {value: "1", label: "Topic 1"}), extract value.value
        const topicVal = (typeof value === "object" && value !== null) ? (value.value ?? value) : value;
        setCurrentTopic(topicVal != null ? String(topicVal) : null);
        // Reset subject when topic changes
        setCurrentSubject(null);
      },
      // Disable if no class is selected
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
        // Simple normalization for subject value
        const subjVal = typeof value === "object" ? value.value ?? value : value;
        setCurrentSubject(subjVal != null ? String(subjVal) : null);
      },
      // Disable if no topic is selected (as subjects depend on topic)
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
