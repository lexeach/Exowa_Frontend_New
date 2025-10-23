import * as yup from "yup";

const options = [
  { value: 10, label: "10" },
  { value: 15, label: "15" },
  { value: 20, label: "20" },
];

/* ---------- Topic Mapping (from previous request) ---------- */
const topicOptionsByClass = {
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

const getTopicOptions = (selectedClass) => {
    if (!selectedClass) return topicOptionsByClass.default;
    return topicOptionsByClass[String(selectedClass)] || topicOptionsByClass.default;
};

/* ------------------------------------------------------------- */

/* ---------- Subject Topic Filtering (Updated) ---------- */
// Define which subjects (by label) are available for a given class-topic combination.
const subjectTopicFilter = {
    // Class 11 Logic:
    "11-topic_1": ["Physics Part 1", "Physics Part 2", "Chemistry Part 1", "Chemistry Part 2", "Mathematics", "Biology"],
    "11-topic_2": ["Political Science Political Theory", "History Themes in World History", "Economics Indian Economic Development", "Business Studies", "Sociology Introducing Sociology", "English Hornbill"],
    // Class 12 Logic:
    "12-topic_2": ["English Vistas", "Psychology", "Sociology Indian Society", "Sanskrit"],
    "12-topic_3": ["Mathematics Part 1", "Mathematics Part 2", "Chemistry", "Accountancy", "Business Studies Part 1"],
};

const getSubjectOptions = (selectedClass, selectedTopic, masterOptions) => {
    // 1. If Class OR Topic is missing, return an empty list: [] (No subjects show)
    if (!selectedClass || !selectedTopic) {
        return [];
    }

    const key = `${selectedClass}-${selectedTopic}`;
    const allowedLabels = subjectTopicFilter[key];

    // 2. If a filter exists, apply it.
    if (allowedLabels && allowedLabels.length > 0) {
        const classSubjects = masterOptions[selectedClass] || masterOptions.default;
        return classSubjects.filter(subject => allowedLabels.includes(subject.label));
    }

    // 3. If no specific filter is defined for this combination, show no subjects, or you can 
    //    optionally return all subjects for the class, but based on your request, we return none.
    //    To return all: return masterOptions[selectedClass] || [];
    return [];
};
/* --------------------------------------------------- */

// Define the dynamic subject options based on class (MASTER LIST)
const dynamicSubjectOptions = {
    // ... (Your complete lists for "11" and "12" remain unchanged here)
    // Trimming for display brevity
    "11": [
        { value: "English Woven Words", label: "English Woven Words" },
        { value: "English Hornbill", label: "English Hornbill" },
        { value: "Physics Part 1", label: "Physics Part 1" },
        { value: "Physics Part 2", label: "Physics Part 2" },
        { value: "Mathematics", label: "Mathematics" },
        { value: "Chemistry Part 1", label: "Chemistry Part 1" },
        { value: "Chemistry Part 2", label: "Chemistry Part 2" },
        { value: "Biology", label: "Biology" },
        { value: "Sanskrit Bhaswati", label: "Sanskrit Bhaswati" },
        { value: "Sanskrit Shashwati", label: "Sanskrit Shashwati" },
        { value: "Psychology", label: "Psychology" },
        { value: "Biotechnology", label: "Biotechnology" },
        { value: "Geography Fundamental of Physical Geography", label: "Geography Fundamental of Physical Geography", },
        { value: "Geography Pratical Work in Geography", label: "Geography Pratical Work in Geography", },
        { value: "Geography India Physical Environment", label: "Geography India Physical Environment", },
        { value: "Hindi Antra Part 1", label: "Hindi Antra Part 1" },
        { value: "Hindi Aroh", label: "Hindi Aroh" },
        { value: "Hindi Vitan Part 1", label: "Hindi Vitan Part 1" },
        { value: "Sociology Introducing Sociology", label: "Sociology Introducing Sociology", },
        { value: "Sociology Understanding Society", label: "Sociology Understanding Society", },
        { value: "Political Science Political Theory", label: "Political Science Political Theory", },
        { value: "Political Science India Constitution at Work", label: "Political Science India Constitution at Work", },
        { value: "History Themes in World History", label: "History Themes in World History", },
        { value: "Economics Indian Economic Development", label: "Economics Indian Economic Development", },
        { value: "Economics Statistics for Economics", label: "Economics Statistics for Economics", },
        { value: "Business Studies", label: "Business Studies" },
        { value: "Urdu", label: "Urdu" },
        { value: "Home Science Human Ecology and Family Sciences Part 1", label: "Home Science Human Ecology and Family Sciences Part 1", },
        { value: "Home Science Human Ecology and Family Sciences Part 2", label: "Home Science Human Ecology and Family Sciences Part 2", },
        { value: "Creative Writing and Translation", label: "Creative Writing and Translation", },
        { value: "Informatics Practices", label: "Informatics Practices" },
        { value: "Computer Science", label: "Computer Science" },
        { value: "Financial Accounting", label: "Financial Accounting" },
        { value: "Accountancy", label: "Accountancy" },
    ],
    "12": [
        { value: "English Vistas", label: "English Vistas" },
        { value: "Physics Part 1", label: "Physics Part 1" },
        { value: "Physics Part 2", label: "Physics Part 2" },
        { value: "Mathematics Part 1", label: "Mathematics Part 1" },
        { value: "Mathematics Part 2", label: "Mathematics Part 2" },
        { value: "Chemistry", label: "Chemistry" },
        { value: "Biology", label: "Biology" },
        { value: "Sanskrit", label: "Sanskrit" },
        { value: "Computerised Accounting System", label: "Computerised Accounting System", },
        { value: "Accountancy", label: "Accountancy" },
        { value: "Psychology", label: "Psychology" },
        { value: "Biotechnology", label: "Biotechnology" },
        { value: "Geography Fundamentals of Human Geography", label: "Geography Fundamentals of Human Geography", },
        { value: "Geography Pratical Work in Geography", label: "Geography Pratical Work in Geography", },
        { value: "Geography India People And Economy", label: "Geography India People And Economy", },
        { value: "Hindi Antra Part 2", label: "Hindi Antra Part 2" },
        { value: "Hindi Aroh Part 2", label: "Hindi Aroh Part 2" },
        { value: "Hindi Vitan Part 2", label: "Hindi Vitan Part 2" },
        { value: "Sociology Indian Society", label: "Sociology Indian Society" },
        { value: "Sociology Social Change and Development in India", label: "Sociology Social Change and Development in India", },
        { value: "Political Science Politics in India Since Independence", label: "Political Science Politics in India Since Independence", },
        { value: "Political Science Contemporary World Politics", label: "Political Science Contemporary World Politics", },
        { value: "History Themes in Indian History Part 1", label: "History Themes in Indian History Part 1", },
        { value: "History Themes in Indian History Part 2", label: "History Themes in Indian History Part 2", },
        { value: "History Themes in Indian History Part 3", label: "History Themes in Indian History Part 3", },
        { value: "Economics Introductory Microeconomics", label: "Economics Introductory Microeconomics", },
        { value: "Economics Introductory Macroeconomics", label: "Economics Introductory Macroeconomics", },
        { value: "Business Studies Part 1", label: "Business Studies Part 1" },
        { value: "Business Studies Part 2", label: "Business Studies Part 2" },
        { value: "Urdu", label: "Urdu" },
        { value: "Home Science Human Ecology and Family Sciences Part 1", label: "Home Science Human Ecology and Family Sciences Part 1", },
        { value: "Home Science Human Ecology and Family Sciences Part 2", label: "Home Science Human Ecology and Family Sciences Part 2", },
        { value: "Creative Writing and Translation", label: "Creative Writing and Translation", },
        { value: "Informatics Practices", label: "Informatics Practices" },
        { value: "Computer Science", label: "Computer Science" },
    ],
    default: [],
};

const chapterCounts = new Map([
    // ... (Your chapterCounts data remains unchanged)
    ["11-Mathematics-NCERT", ["Sets", "Relations and Functions", "Trigonometric Functions", "Principle of Mathematical Induction", "Complex Numbers and Quadratic Equations", "Linear Inequalities", "Permutations and Combinations", "Binomial Theorem", "Sequences and Series", "Straight Lines", "Conic Sections", "Introduction to Three Dimensional Geometry", "Limits and Derivatives", "Mathematical Reasoning", "Statistics", "Probability",],],
    ["12-Mathematics Part 1-NCERT", ["Relations and Functions", "Inverse Trigonometric Functions", "Matrices", "Determinants", "Continuity and Differentiability", "Application of Derivatives",],],
    ["12-Mathematics Part 2-NCERT", ["Integrals", "Application of Integrals", "Differential Equations", "Vector Algebra", "Three Dimensional Geometry", "Linear Programming", "Probability",],],
    // ... (All other mappings from your original code)
]);

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
    setCurrentTopic, 
    childrenListData,
    childrenListClass
) => {

    const topicOptions = getTopicOptions(currentClass);
    
    // The subject list is dynamically filtered and will be empty if currentClass or currentTopic is null.
    const subjectOptions = getSubjectOptions(
        currentClass, 
        currentTopic, 
        dynamicSubjectOptions
    );

    const chapterOptions = generateChapterOptions(
        currentClass,
        currentSubject,
        currentSyllabus
    );

    // Determines if both Class and Topic have been selected
    const isSubjectSelectionEnabled = currentClass && currentTopic;


    return [
        {
            name: "class",
            label: "Class",
            placeholder: "Class ...",
            type: "select",
            options: childrenListClass?.data?.data || [],
            autoFocus: true,
            wrapperClassName: "mb-6",
            fieldWrapperClassName: "col-span-12",
            className: "mobile-select-no-keyboard",
            getValueCallback: (value) => {
                setCurrentClass(value);
                // Reset dependent fields when class changes
                setCurrentSubject(null); 
                setCurrentTopic(null);
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
            getValueCallback: (value) => {
                setCurrentTopic(value);
                // Reset subject when topic changes, forcing re-selection based on new topic
                setCurrentSubject(null); 
            },
            disabled: !currentClass || topicOptions.length === 0
        },
        {
            name: "subject",
            label: "Subject",
            placeholder: "Select Subject ...",
            type: "select",
            autoFocus: true,
            // The options list will be empty if not both fields are selected (handled in getSubjectOptions)
            options: subjectOptions, 
            wrapperClassName: "mb-6",
            fieldWrapperClassName: "col-span-6",
            className: "mobile-select-no-keyboard",
            getValueCallback: (value) => setCurrentSubject(value),
            // The field is disabled if the options array is empty (which happens when Class or Topic is missing)
            disabled: !isSubjectSelectionEnabled || subjectOptions.length === 0,
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
            disabled: (() => {
                const isDisabled =
                    !currentClass || !currentSubject || chapterOptions.length === 0;

                return isDisabled;
            })(),
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
            disabled: (() => {
                const isDisabled =
                    !currentClass || !currentSubject || chapterOptions.length === 0;

                return isDisabled;
            })(),
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
