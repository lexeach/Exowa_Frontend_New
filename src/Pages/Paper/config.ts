import * as yup from "yup";

const options = [
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 15, label: "15" },
  { value: 20, label: "20" },
  //{ value: 25, label: "25" },
  //{ value: 30, label: "30" },
  //{ value: 35, label: "35" },
  //{ value: 40, label: "40" },
  //{ value: 45, label: "45" },
  //{ value: 50, label: "50" },
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
    { value: "Urdu", label: "Urdu" },
    { value: "Sanskrit", label: "Sanskrit" },
  ],
  "7": [
    { value: "English", label: "English" },
    { value: "Hindi", label: "Hindi" },
    { value: "Mathematics", label: "Mathematics" },
    { value: "Science", label: "Science" },
    { value: "Social Science", label: "Social Science" },
    { value: "Urdu", label: "Urdu" },
    { value: "Sanskrit", label: "Sanskrit" },
  ],
  "8": [
    { value: "English It So Happened", label: "English It So Happened" },
    { value: "English HoneyDew", label: "English HoneyDew" },
    { value: "Hindi", label: "Hindi" },
    { value: "Mathematics", label: "Mathematics" },
    { value: "Science", label: "Science" },
    { value: "Political Science", label: "Political Science" },
    { value: "History", label: "History" },
    { value: "Geography", label: "Geography" },
    { value: "Urdu", label: "Urdu" },
    { value: "Sanskrit", label: "Sanskrit" },
  ],
  "9": [
    { value: "English Beehive", label: "English Beehive" },
    { value: "English Moments Supplementary Reader", label: "English Moments Supplementary Reader" },
    { value: "English Words and Expressions 1", label: "English Words and Expressions 1" },
    { value: "Hindi Kshitij", label: "Hindi Kshitij" },
    { value: "Hindi Sprash", label: "Hindi Sprash" },
    { value: "Hindi Kritika", label: "Hindi Kritika" },
    { value: "Hindi Sanchayan", label: "Hindi Sanchayan" },
    { value: "Mathematics", label: "Mathematics" },
    { value: "Science", label: "Science" },
    { value: "Political Science", label: "Political Science" },
    { value: "History", label: "History" },
    { value: "Geography", label: "Geography" },
    { value: "Economics", label: "Economics" },
    { value: "Urdu", label: "Urdu" },
    { value: "Sanskrit Shemushi Prathmo", label: "Sanskrit Shemushi Prathmo" },
    { value: "Sanskrit Vyakranavithi", label: "Sanskrit Vyakranavithi" },
    { value: "Sanskrit Abhyaswaan Bhav", label: "Sanskrit Abhyaswaan Bhav" },
    { value: "Information and Communication Technology", label: "Information and Communication Technology" },
  ],
  // Add more class-subject mappings as needed
  // Example for other classes, using some from your original subjectoptions if still relevant
  "10": [
    { value: "English First Flight", label: "English First Flight" },
    { value: "English Foot Prints Without Feet", label: "English Foot Prints Without Feet" },
    { value: "English Words and Expressions 2", label: "English Words and Expressions 2" },
    { value: "Hindi Kshitij", label: "Hindi Kshitij" },
    { value: "Hindi Sprash", label: "Hindi Sprash" },
    { value: "Hindi Kritika", label: "Hindi Kritika" },
    { value: "Hindi Sanchayan", label: "Hindi Sanchayan" },
    { value: "Mathematics", label: "Mathematics" },
    { value: "Science", label: "Science" },
    { value: "Political Science", label: "Political Science" },
    { value: "History", label: "History" },
    { value: "Geography", label: "Geography" },
    { value: "Economics", label: "Economics" },
    { value: "Urdu", label: "Urdu" },
    { value: "Sanskrit Shemushi Part 2", label: "Sanskrit Shemushi Prathmo" },
    { value: "Sanskrit Vyakranavithi", label: "Sanskrit Vyakranavithi" },
    { value: "Sanskrit Abhyaswaan Bhav", label: "Sanskrit Abhyaswaan Bhav" },
  ],
  "11": [
    { value: "English Woven Words", label: "English Woven Words" },
    { value: "English Hornbill", label: "English Hornbill" },
    { value: "English Snapshots Supplementary Reader", label: "English Snapshots Supplementary Reader" },
    { value: "Physics Part 1", label: "Physics Part 1" },
    { value: "Physics Part 2", label: "Physics Part 2" },
    { value: "Mathematics", label: "Mathematics" },
    { value: "Chemistry Part 1", label: "Chemistry Part 1" },
    { value: "Chemistry Part 2", label: "Chemistry Part 2" },
    { value: "Biology", label: "Biology" },
    { value: "Sanskrit Bhaswati", label: "Sanskrit Bhaswati" },
    { value: "Sanskrit Shashwati", label: "Sanskrit Shashwati" },
  //{ value: "Accountancy", label: "Accountancy" },
  { value: "Psychology", label: "Psychology" },
  { value: "Geography Fundamental of Physical Geography", label: "Geography Fundamental of Physical Geography" },
  { value: "Geography Pratical Work in Geography", label: "Geography Pratical Work in Geography" },
  { value: "Geography India Physical Environment", label: "Geography India Physical Environment" },
  { value: "Hindi Antra Part 1", label: "Hindi Antra Part 1" },
    { value: "Hindi Aroh", label: "Hindi Aroh" },
    { value: "Hindi Vitan Part 1", label: "Hindi Vitan Part 1" },
  { value: "Sociology Introducing Sociology", label: "Sociology Introducing Sociology" },
    { value: "Sociology Understanding Society", label: "Sociology Understanding Society" },
  { value: "Political Science Political Theory", label: "Political Science Political Theory" },
    { value: "Political Science India Constitution at Work", label: "Political Science India Constitution at Work" },
  { value: "History Themes in Indian History", label: "History Themes in Indian History" },
   // { value: "History Themes in Indian History", label: "History Themes in Indian History" },
  { value: "Economics Indian Economic Development", label: "Economics Indian Economic Development" },
    { value: "Economics Statistics for Economics", label: "Economics Statistics for Economics" },
  { value: "Business Studies", label: "Business Studies" },
  { value: "Urdu", label: "Urdu" },
  { value: "Home Science Human Ecology and Family Sciences Part 1", label: "Home Science Human Ecology and Family Sciences Part 1" },
    { value: "Home Science Human Ecology and Family Sciences Part 2", label: "Home Science Human Ecology and Family Sciences Part 2" },
  { value: "Creative Writing and Translation", label: "Creative Writing and Translation" },
  { value: "Informatics Practices", label: "Informatics Practices" },
  { value: "Computer Science", label: "Computer Science" },
    { value: "Financial Accounting", label: "Financial Accounting" },
    { value: "Accountancy", label: "Accountancy" },
  ],
  "12": [
    //{ value: "English Kaleidoscope", label: "English Kaleidoscope" },
    //{ value: "English Flamingo", label: "English Flamingo" },
    { value: "English Vistas", label: "English Vistas" },
    { value: "Physics Part 1", label: "Physics Part 1" },
    { value: "Physics Part 2", label: "Physics Part 2" },
    { value: "Mathematics Part 1", label: "Mathematics Part 1" },
    { value: "Mathematics Part 2", label: "Mathematics Part 2" },
    { value: "Chemistry", label: "Chemistry" },
    { value: "Biology", label: "Biology" },
     { value: "Sanskrit", label: "Sanskrit" },
  { value: "Computerised Accounting System", label: "Computerised Accounting System" },
  { value: "Accountancy", label: "Accountancy" },
  { value: "Psychology", label: "Psychology" },
  { value: "Geography Fundamentals of Human Geography", label: "Geography Fundamentals of Human Geography" },
    { value: "Geography Pratical Work in Geography", label: "Geography Pratical Work in Geography" },
    { value: "Geography India People And Economy", label: "Geography India People And Economy" },
  { value: "Hindi Antra Part 2", label: "Hindi Antra Part 2" },
    { value: "Hindi Aroh Part 2", label: "Hindi Aroh Part 2" },
    { value: "Hindi Vitan Part 2", label: "Hindi Vitan Part 2" },
  { value: "Sociology Indian Society", label: "Sociology Indian Society" },
    { value: "Sociology Social Change and Development in India", label: "Sociology Social Change and Development in India" },
  { value: "Political Science Politics in India Since Independence", label: "Political Science Politics in India Since Independence" },
    { value: "Political Science Contemporary World Politics", label: "Political Science Contemporary World Politics" },
  { value: "History Themes in Indian History Part 1", label: "History Themes in Indian History Part 1" },
    { value: "History Themes in Indian History Part 2", label: "History Themes in Indian History Part 2" },
    { value: "History Themes in Indian History Part 3", label: "History Themes in Indian History Part 3" },
  { value: "Economics Introductory Microeconomics", label: "Economics Introductory Microeconomics" },
    { value: "Economics Introductory Macroeconomics", label: "Economics Introductory Macroeconomics" },
  { value: "Business Studies Part 1", label: "Business Studies Part 1" },
    { value: "Business Studies Part 2", label: "Business Studies Part 2" },
  { value: "Urdu", label: "Urdu" },
  { value: "Home Science Human Ecology and Family Sciences Part 1", label: "Home Science Human Ecology and Family Sciences Part 1" },
    { value: "Home Science Human Ecology and Family Sciences Part 2", label: "Home Science Human Ecology and Family Sciences Part 2" },
  { value: "Creative Writing and Translation", label: "Creative Writing and Translation" },
  { value: "Informatics Practices", label: "Informatics Practices" },
  { value: "Computer Science", label: "Computer Science" },
  ],
  // Default or empty array if no specific subjects are defined for a class
  "default": [],
};

// Mapping of chapter counts based on class, subject, and syllabus
const chapterCounts = new Map([
  // Class 6to12 Mathematics for NCERT
  ["6-Mathematics-National Council of Educational Research and Training (NCERT)", 10],
  ["7-Mathematics-National Council of Educational Research and Training (NCERT)", 8],
  ["8-Mathematics-National Council of Educational Research and Training (NCERT)", 16],
  ["9-Mathematics-National Council of Educational Research and Training (NCERT)", 12],
  ["10-Mathematics-National Council of Educational Research and Training (NCERT)", 14],
  ["11-Mathematics-National Council of Educational Research and Training (NCERT)", 14],
  ["12-Mathematics Part 1-National Council of Educational Research and Training (NCERT)", 6],
  ["12-Mathematics Part 2-National Council of Educational Research and Training (NCERT)", 7],

  // Class 6to12 Urdu for NCERT
  ["6-Urdu-National Council of Educational Research and Training (NCERT)", 14],
  ["7-Urdu-National Council of Educational Research and Training (NCERT)", 14],
  ["8-Urdu-National Council of Educational Research and Training (NCERT)", 22],
  ["9-Urdu-National Council of Educational Research and Training (NCERT)", 12],
  ["10-Urdu-National Council of Educational Research and Training (NCERT)", 14],
  ["11-Urdu-National Council of Educational Research and Training (NCERT)", 16],
  ["12-Urdu-National Council of Educational Research and Training (NCERT)", 13],


  // Class 6to12 Hindi for NCERT
  ["6-Hindi-National Council of Educational Research and Training (NCERT)", 13],
  ["7-Hindi-National Council of Educational Research and Training (NCERT)", 10],
  ["8-Hindi-National Council of Educational Research and Training (NCERT)", 13],
  ["9-Hindi Kshitij-National Council of Educational Research and Training (NCERT)", 13],
  ["9-Hindi Sprash-National Council of Educational Research and Training (NCERT)", 10],
  ["9-Hindi Kritika-National Council of Educational Research and Training (NCERT)", 3],
  ["9-Hindi Sanchayan-National Council of Educational Research and Training (NCERT)", 4],
  ["10-Hindi Kshitij-National Council of Educational Research and Training (NCERT)", 12],
  ["10-Hindi Sprash-National Council of Educational Research and Training (NCERT)", 14],
  ["10-Hindi Kritika-National Council of Educational Research and Training (NCERT)", 3],
  ["10-Hindi Sanchayan-National Council of Educational Research and Training (NCERT)", 3],
  ["11-Hindi Antra Part 1-National Council of Educational Research and Training (NCERT)", 16],
  ["11-Hindi Aroh-National Council of Educational Research and Training (NCERT)", 16],
  ["11-Hindi Vitan Part 1-National Council of Educational Research and Training (NCERT)", 5],
  ["12-Hindi Antra Part 2-National Council of Educational Research and Training (NCERT)", 17],
  ["12-Hindi Aroh Part 2-National Council of Educational Research and Training (NCERT)", 15],
  ["12-Hindi Vitan Part 2-National Council of Educational Research and Training (NCERT)", 3],
  
   // Class 6to12 Sanskrit for NCERT
  ["6-Sanskrit-National Council of Educational Research and Training (NCERT)", 16],
  ["7-Sanskrit-National Council of Educational Research and Training (NCERT)", 15],
  ["8-Sanskrit-National Council of Educational Research and Training (NCERT)", 14],
  ["9-Sanskrit Shemushi Prathmo-National Council of Educational Research and Training (NCERT)", 10],
  ["9-Sanskrit Vyakranavithi-National Council of Educational Research and Training (NCERT)", 12],
  ["9-Sanskrit Abhyaswaan Bhav-National Council of Educational Research and Training (NCERT)", 12],
  ["10-Sanskrit Shemushi Part 2-National Council of Educational Research and Training (NCERT)", 10],
  ["10-Sanskrit Vyakranavithi-National Council of Educational Research and Training (NCERT)", 12],
  ["10-Sanskrit Abhyaswaan Bhav-National Council of Educational Research and Training (NCERT)", 14],
  ["11-Sanskrit Bhaswati-National Council of Educational Research and Training (NCERT)", 11],
  ["11-Sanskrit Shashwati-National Council of Educational Research and Training (NCERT)", 16],
  ["12-Sanskrit-National Council of Educational Research and Training (NCERT)", 13],

  
  // Class 6to12 English for NCERT
  ["6-English-National Council of Educational Research and Training (NCERT)", 5],
  ["7-English-National Council of Educational Research and Training (NCERT)", 5],
  ["8-English HoneyDew-National Council of Educational Research and Training (NCERT)", 8],
  ["8-English It So Happened-National Council of Educational Research and Training (NCERT)", 8],
  ["9-English Beehive-National Council of Educational Research and Training (NCERT)", 9],
  ["9-English Moments Supplementary Reader-National Council of Educational Research and Training (NCERT)", 9],
  ["9-English Words and Expressions 1-National Council of Educational Research and Training (NCERT)", 9],
  ["10-English First Flight-National Council of Educational Research and Training (NCERT)", 9],
  ["10-English Foot Prints Without Feet-National Council of Educational Research and Training (NCERT)", 9],
  ["10-English Words and Expressions 2-National Council of Educational Research and Training (NCERT)", 9],
  ["11-English Woven Words-National Council of Educational Research and Training (NCERT)", 16],
  ["11-English Hornbill-National Council of Educational Research and Training (NCERT)", 16],
  ["11-English Snapshots Supplementary Reader-National Council of Educational Research and Training (NCERT)", 16],
  ["12-English Vistas-National Council of Educational Research and Training (NCERT)", 6],
  //["12-English Kaleidoscope-National Council of Educational Research and Training (NCERT)", 13],
  //["12-English Kaleidoscope-National Council of Educational Research and Training (NCERT)", 13],

  
 // Class 6to10 Science for NCERT
  ["6-Science-National Council of Educational Research and Training (NCERT)", 12],
  ["7-Science-National Council of Educational Research and Training (NCERT)", 12],
  ["8-Science-National Council of Educational Research and Training (NCERT)", 18],
  ["9-Science-National Council of Educational Research and Training (NCERT)", 12],
  ["10-Science-National Council of Educational Research and Training (NCERT)", 13],

  // Class 6to8 Social Science for NCERT
  ["6-Social Science-National Council of Educational Research and Training (NCERT)", 14],
  ["7-Social Science-National Council of Educational Research and Training (NCERT)", 12],

  // Class  9 information and comunication technology for NCERT
  ["9-Information and Communication Technology-National Council of Educational Research and Training (NCERT)", 8],
  
    // Class 9to12 Political Science for NCERT
  ["8-Political Science-National Council of Educational Research and Training (NCERT)", 10],
  ["9-Political Science-National Council of Educational Research and Training (NCERT)", 5],
  ["10-Political Science-National Council of Educational Research and Training (NCERT)", 5],
  ["11-Political Science Political Theory-National Council of Educational Research and Training (NCERT)", 8],
  ["11-Political Science India Constitution at Work-National Council of Educational Research and Training (NCERT)", 10],
  ["12-Political Science Contemporary World Politics-National Council of Educational Research and Training (NCERT)", 7],
  ["12-Political Science Politics in India Since Independence-National Council of Educational Research and Training (NCERT)", 8],

   // Class 9to12 History for NCERT
  ["8-History-National Council of Educational Research and Training (NCERT)", 12],
  ["9-History-National Council of Educational Research and Training (NCERT)", 5],
  ["10-History-National Council of Educational Research and Training (NCERT)", 5],
  ["11-History Themes in Indian History-National Council of Educational Research and Training (NCERT)", 7],
  ["12-History Themes in Indian History Part 1-National Council of Educational Research and Training (NCERT)", 4],
  ["12-History Themes in Indian History Part 2-National Council of Educational Research and Training (NCERT)", 4],
  ["12-History Themes in Indian History Part 3-National Council of Educational Research and Training (NCERT)", 4],

    // Class 9to12 Geography for NCERT
  ["8-Geography-National Council of Educational Research and Training (NCERT)", 6],
  ["9-Geography-National Council of Educational Research and Training (NCERT)", 6],
  ["10-Geography-National Council of Educational Research and Training (NCERT)", 7],
  ["11-Geography Fundamental of Physical Geography-National Council of Educational Research and Training (NCERT)", 14],
  ["11-Geography Pratical Work in Geography-National Council of Educational Research and Training (NCERT)", 6],
  ["11-Geography India Physical Environment-National Council of Educational Research and Training (NCERT)", 6],
  ["12-Geography Fundamentals of Human Geography-National Council of Educational Research and Training (NCERT)", 8],
  ["12-Geography Pratical Work in Geography-National Council of Educational Research and Training (NCERT)", 4],
  ["12-Geography India People And Economy-National Council of Educational Research and Training (NCERT)", 9],

   // Class 9to12 Economics for NCERT
  ["9-Economics-National Council of Educational Research and Training (NCERT)", 4],
  ["10-Economics-National Council of Educational Research and Training (NCERT)", 5],
  ["11-Economics Indian Economic Development-National Council of Educational Research and Training (NCERT)", 8],
  ["11-Economics Statistics for Economics-National Council of Educational Research and Training (NCERT)", 8],
  ["12-Economics Introductory Microeconomics-National Council of Educational Research and Training (NCERT)", 5],
  ["12-Economics Introductory Macroeconomics-National Council of Educational Research and Training (NCERT)", 6],

  // Class 11 to 12 Business Studies for NCERT
  ["11-Business Studies-National Council of Educational Research and Training (NCERT)", 11],
  ["12-Business Studies Part 1-National Council of Educational Research and Training (NCERT)", 8],
  ["12-Business Studies Part 2-National Council of Educational Research and Training (NCERT)", 8],

  // Class 11 to 12 Home science for NCERT
  ["11-Home Science Human Ecology and Family Sciences Part 1-National Council of Educational Research and Training (NCERT)", 7],
  ["11-Home Science Human Ecology and Family Sciences Part 2-National Council of Educational Research and Training (NCERT)", 4],
  ["12-Home Science Human Ecology and Family Sciences Part 1-National Council of Educational Research and Training (NCERT)", 7],
  ["12-Home Science Human Ecology and Family Sciences Part 2-National Council of Educational Research and Training (NCERT)", 4],


  // Class 11 to 12  Informatics Practices for NCERT
  ["11-Informatics Practices-National Council of Educational Research and Training (NCERT)", 8],
  ["12-Informatics Practices-National Council of Educational Research and Training (NCERT)", 7],

   // Class 11 to 12  computer science for NCERT
  ["11-Computer Science-National Council of Educational Research and Training (NCERT)", 11],
  ["12-Computer Science-National Council of Educational Research and Training (NCERT)", 13],

  // Class 11 to 12  Biotechnology for NCERT
  ["11-Biotechnology-National Council of Educational Research and Training (NCERT)", 12],
  ["12-Biotechnology-National Council of Educational Research and Training (NCERT)", 13],
  
  // Class 11 to 12 physics for NCERT
  ["11-Physics Part 1-National Council of Educational Research and Training (NCERT)", 7],
  ["11-Physics Part 2-National Council of Educational Research and Training (NCERT)", 7],
  ["12-Physics Part 1-National Council of Educational Research and Training (NCERT)", 8],
  ["12-Physics Part 2-National Council of Educational Research and Training (NCERT)", 6],

  // Class 11 to 12 chemistry for NCERT
  ["11-Chemistry Part 1-National Council of Educational Research and Training (NCERT)", 6],
  ["11-Chemistry Part 2-National Council of Educational Research and Training (NCERT)", 3],
  ["12-Chemistry Part 1-National Council of Educational Research and Training (NCERT)", 5],
  ["12-Chemistry Part 2-National Council of Educational Research and Training (NCERT)", 5],

  // Class 11 to 12 biology for NCERT
  ["11-Biology-National Council of Educational Research and Training (NCERT)", 19],
  ["12-Biology-National Council of Educational Research and Training (NCERT)", 13],

  // Class 11 to 12 Psychology for NCERT
  ["11-Psychology-National Council of Educational Research and Training (NCERT)", 8],
  ["12-Psychology-National Council of Educational Research and Training (NCERT)", 7],

  // Class 11 to 12 Sociology for NCERT
  ["11-Sociology Introducing Sociology-National Council of Educational Research and Training (NCERT)", 5],
  ["11-Sociology Understanding Society-National Council of Educational Research and Training (NCERT)", 5],
  ["12-Sociology Indian Society-National Council of Educational Research and Training (NCERT)", 7],
  ["12-Sociology Social Change and Development in India-National Council of Educational Research and Training (NCERT)", 8],


  
  // Class 11 to 12 Accountancy for NCERT
  ["11-Financial Accounting-National Council of Educational Research and Training (NCERT)", 7],
  ["11-Accountancy-National Council of Educational Research and Training (NCERT)", 2],
  ["12-Computerised Accounting System-National Council of Educational Research and Training (NCERT)", 4],
  ["12-Accountancy-National Council of Educational Research and Training (NCERT)", 4],


  
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
      options: options,
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
