import * as yup from "yup";

const options = [
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 15, label: "15" },
  { value: 20, label: "20" },
  { value: 25, label: "25" },
  { value: 30, label: "30" },
  { value: 35, label: "35" },
  { value: 40, label: "40" },
  { value: 45, label: "45" },
  { value: 50, label: "50" },
];

const classoptions = [
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
  { value: 10, label: "10" },
  { value: 11, label: "11" },
  { value: 12, label: "12" },
];

// Define the dynamic subject options based on class
const dynamicSubjectOptions = {
  "6": [
    { value: "English", label: "English" },
    { value: "Hindi", label: "Hindi" },
    { value: "Mathematics", label: "Mathematics" },
    { value: "Science", label: "Science" },
    { value: "Social Science", label: "Social Science" },
  ],
  "7": [
    { value: "English", label: "English" },
    { value: "Hindi", label: "Hindi" },
    { value: "Mathematics", label: "Mathematics" },
    { value: "Science", label: "Science" },
    { value: "Social Science", label: "Social Science" },
  ],
  "8": [
    { value: "English", label: "English" },
    { value: "Hindi", label: "Hindi" },
    { value: "Mathematics", label: "Mathematics" },
    { value: "Science", label: "Science" },
    { value: "Social Science", label: "Social Science" },
  ],
  "9": [
    { value: "English", label: "English" },
    { value: "Hindi", label: "Hindi" },
    { value: "Mathematics", label: "Mathematics" },
    { value: "Science", label: "Science" },
    { value: "Social Science", label: "Social Science" },
  ],
  // Add more class-subject mappings as needed
  // Example for other classes, using some from your original subjectoptions if still relevant
  "10": [
    { value: "English", label: "English" },
    { value: "Hindi", label: "Hindi" },
    { value: "Mathematics", label: "Mathematics" },
    { value: "Science", label: "Science" },
    { value: "Social Science", label: "Social Science" },
  ],
  "11": [
    { value: "English", label: "English" },
    { value: "Physics", label: "Physics" },
    { value: "Mathematics", label: "Mathematics" },
    { value: "Chemistry", label: "Chemistry" },
    { value: "Biology", label: "Biology" },
  ],
  "12": [
    { value: "Mathematics", label: "Mathematics" },
    { value: "Science", label: "Science" },
  ],
  // Default or empty array if no specific subjects are defined for a class
  "default": [],
};

// Mapping of chapter counts based on class, subject, and syllabus
const chapterCounts = new Map([
  // Class 6to12 Mathematics for NCERT
  ["6-Mathematics-National Council of Educational Research and Training (NCERT)", 10],
  ["7-Mathematics-National Council of Educational Research and Training (NCERT)", 13],
  ["8-Mathematics-National Council of Educational Research and Training (NCERT)", 13],
  ["9-Mathematics-National Council of Educational Research and Training (NCERT)", 12],
  ["10-Mathematics-National Council of Educational Research and Training (NCERT)", 14],
  ["11-Mathematics-National Council of Educational Research and Training (NCERT)", 16],
  ["12-Mathematics-National Council of Educational Research and Training (NCERT)", 13],

  // Class 6to12 Mathematics for CBSE
  ["6-Mathematics-CBSE", 0],
  ["7-Mathematics-CBSE", 3],
  ["8-Mathematics-CBSE", 3],
  ["9-Mathematics-CBSE", 2],
  ["10-Mathematics-CBSE", 4],
  ["11-Mathematics-CBSE", 6],
  ["12-Mathematics-CBSE", 3],

  // Add other class, subject, and syllabus combinations as needed...
  // Example:
  ["7-Science-Default", 15], // Added for new subjects
  ["7-Geography-Default", 10],
  ["7-Economics-Default", 8],
  ["8-Physics-Default", 12],
  ["8-Chemistry-Default", 11],
  ["8-Biology-Default", 13],
  ["6-English-Default", 10], // Added for new subjects
  ["6-Hindi-Default", 10],
  ["6-Mathematics-Default", 10],
  ["7-Math-State Board", 15],
  ["8-English-Default", 25],
  ["9-Social Studies-Default", 12],
  // ... more entries ...
]);

// Function to generate chapter options based on selected class, subject, and syllabus
const generateChapterOptions = (selectedClass, subject, syllabus) => {
  let key;

  if (syllabus) {
    key = `${selectedClass}-${subject}-${syllabus}`;
  } else {
    // It's good practice to ensure 'subject' is not undefined or null here
    // before concatenating. Default to "Default" for subject if it's not set.
    key = `${selectedClass}-${subject || "Default"}-Default`;
  }

  const chapterCount = chapterCounts.get(key) || 0; // Default to 0 if not found

  return Array.from({ length: chapterCount }, (_, i) => {
    return {
      value: i + 1,
      label: (i + 1).toString(),
    };
  });
};

export const fields = (
  useGetSubjectOptionsMutation, // This is now likely unused for the subject field
  useGetSyllabusOptionsMutation,
  currentClass,
  setCurrentClass,
  currentSubject,
  setCurrentSubject,
  currentSyllabus,
  setCurrentSyllabus,
  childrenListData // Pass children list data here
) => {
  // Determine subject options based on currentClass
  const subjectOptionsForClass = dynamicSubjectOptions[currentClass] || dynamicSubjectOptions["default"];

  const chapterOptions = generateChapterOptions(currentClass, currentSubject, currentSyllabus);

  // Map childrenListData to dropdown options format
  const classOptions =
    childrenListData?.map((item) => {
      const numericGrade = item?.grade?.match(/\d+/)?.[0] || ""; // Extract first number
      return {
        value: numericGrade,
        label: numericGrade,
      };
    }) || [];

  return [
    {
      name: "class",
      label: "Class",
      placeholder: "Class ...",
      type: "select",
      options: classOptions, // Dynamically set from API
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-12",
      getValueCallback: (value) => {
        setCurrentClass(value);
        setCurrentSubject(null); // Reset subject when class changes
      },
    },

    {
      name: "syllabus",
      label: "Syllabus",
      placeholder: "Syllabus Subject ...",
      type: "select",
      fetchData: useGetSyllabusOptionsMutation,
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-12",
      getValueCallback: (value) => setCurrentSyllabus(value),
    },
    {
      name: "subject",
      label: "Subject",
      placeholder: "Select Subject ...",
      type: "select",
      options: subjectOptionsForClass, // Dynamically set based on selected class
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-12",
      getValueCallback: (value) => setCurrentSubject(value),
      // Add disabled prop if no class is selected or no subjects for selected class
      disabled: !currentClass || subjectOptionsForClass.length === 0,
    },
    {
      name: "chapter_from",
      label: "Chapter From",
      placeholder: "Select Chapter ...",
      type: "select",
      options: chapterOptions,
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-6",
    },
    {
      name: "chapter_to",
      label: "Chapter To",
      placeholder: "Select Chapter ...",
      type: "select",
      options: chapterOptions,
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-6",
    },
    {
      name: "language",
      label: "Language",
      placeholder: "Chapter Language ...",
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
        { value: "Manipuri", label: "Manipuri" },
        { value: "Kashmiri", label: "Kashmiri" },
      ],
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-6",
    },
    {
      name: "no_of_question",
      label: "Number Of Question",
      placeholder: "Select Number ...",
      type: "select",
      options: [
        { value: 5, label: "5" },
        { value: 10, label: "10" },
        { value: 15, label: "15" },
        { value: 20, label: "20" },
        { value: 25, label: "25" },
        { value: 30, label: "30" },
        { value: 35, label: "35" },
        { value: 40, label: "40" },
        { value: 45, label: "45" },
        { value: 50, label: "50" },
      ],
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-6 mb-[400px] sm:mb-5",
    },
  ];
};

// Validation Schema
export const schema = yup
  .object()
  .shape({
    language: yup.string().required("this_field_required"),
    chapter_to: yup.string().required("this_field_required"),
    chapter_from: yup.string().required("this_field_required"),
    syllabus: yup.string().required("this_field_required"),
    subject: yup.string().required("this_field_required"),
    no_of_question: yup.string().required("this_field_required"),
    class: yup.string().required("this_field_required"),
  })
  .required();
