import * as yup from "yup";

// ====================================================================
// DYNAMIC TOPIC LOGIC
// Values here must match the 'value' property in the grade options below.
// ====================================================================
export const getTopicsByGrade = (selectedGrade?: string) => {
   if (selectedGrade === "6") {
    return [
    { value: "English", label: "English" },
    { value: "Hindi", label: "Hindi" },
    { value: "Mathematics", label: "Mathematics" },
    { value: "Science", label: "Science" },
    { value: "Social Science", label: "Social Science" },
    { value: "Urdu", label: "Urdu" },
    { value: "Sanskrit", label: "Sanskrit" },
    ];
  } else if (selectedGrade === "7") {
    return [
      { value: "English", label: "English" },
    { value: "Hindi", label: "Hindi" },
    { value: "Mathematics", label: "Mathematics" },
    { value: "Science", label: "Science" },
    { value: "Social Science", label: "Social Science" },
    { value: "Urdu", label: "Urdu" },
    { value: "Sanskrit", label: "Sanskrit" },
    ];
  } else if (selectedGrade === "8") {
    return [
      { value: "English", label: "English" },
        { value: "Hindi", label: "Hindi" },
    { value: "Mathematics", label: "Mathematics" },
    { value: "Science", label: "Science" },
    { value: "Political Science", label: "Political Science" },
    { value: "History", label: "History" },
    { value: "Geography", label: "Geography" },
    { value: "Urdu", label: "Urdu" },
    { value: "Sanskrit", label: "Sanskrit" },
    ];
  } else if (selectedGrade === "9" || selectedGrade === "10") {
    return [
    { value: "English", label: "English" },
    { value: "Hindi", label: "Hindi" },
    { value: "Mathematics", label: "Mathematics" },
    { value: "Science", label: "Science" },
    { value: "Political Science", label: "Political Science" },
    { value: "History", label: "History" },
    { value: "Geography", label: "Geography" },
    { value: "Urdu", label: "Urdu" },
    { value: "Sanskrit", label: "Sanskrit" },
    { value: "Information and Communication Technology", label: "Information and Communication Technology",}
    ];
  } else if (selectedGrade === "11th Science" || selectedGrade === "12th Science") {
    return [
    { value: "English", label: "English" },
    { value: "Physics", label: "Physics" },
    { value: "Mathematics", label: "Mathematics" },
    { value: "Chemistry", label: "Chemistry" },
    { value: "Biology", label: "Biology" },
    { value: "Psychology", label: "Psychology" },
    { value: "Biotechnology", label: "Biotechnology" },
    { value: "Hindi", label: "Hindi" },
    {value: "Home Science", label: "Home Science"},
    
    { value: "Informatics Practices", label: "Informatics Practices" },
    { value: "Computer Science", label: "Computer Science" },
    
    ];
  } else if (selectedGrade === "11th Commerce" || selectedGrade === "12th Commerce") {
    return [
      
    { value: "English", label: "English" },
    { value: "Hindi", label: "Hindi" },
    {value: "Economics", label: "Economics"},
    { value: "Business Studies", label: "Business Studies"},
    
    { value: "Informatics Practices", label: "Informatics Practices" },
    { value: "Computer Science", label: "Computer Science" },
    { value: "Financial Accounting", label: "Financial Accounting" },
    { value: "Accountancy", label: "Accountancy" },
    ];
    } else if (selectedGrade === "11th Humanity" || selectedGrade === "12th Humanity") {
    return [
      
    { value: "English", label: "English" },
    { value: "Sanskrit", label: "Sanskrit" },
    { value: "Psychology", label: "Psychology" },
    { value: "Geography", label: "Geography"},
    { value: "Hindi", label: "Hindi" },
    {value: "Sociology", label: "Sociology"},
    
    {value: "Political Science", label: "Political Science"},
    
    {value: "History", label: "History"},
    { value: "Urdu", label: "Urdu" },
    
    {value: "Creative Writing and Translation", label: "Creative Writing and Translation"},
    
    ];
  } else {
    // Default fallback
    return [{ value: "", label: "← Select a Grade first", disabled: true }];
  }
};

// ====================================================================
// FORM FIELDS CONFIGURATION
// ====================================================================
export const fields = [
  {
    name: "name",
    label: "Name",
    placeholder: "Enter Name ...",
    type: "text",
    wrapperClassName: "mb-6",
    fieldWrapperClassName: "col-span-6",
  },
  {
    name: "age",
    label: "Age",
    placeholder: "Enter Age ...",
    type: "number",
    wrapperClassName: "mb-6",
    fieldWrapperClassName: "col-span-6",
  },
  {
    name: "grade",
    label: "Grade",
    placeholder: "Select Grade ...",
    type: "select",
    options: [
      { value: "5", label: "5th Grade" },
      { value: "6", label: "6th Grade" },
      { value: "7", label: "7th Grade" },
      { value: "8", label: "8th Grade" },
      { value: "9", label: "9th Grade" },
      { value: "10", label: "10th Grade" },
      { value: "11th Science", label: "11th Science" },
      { value: "11th Commerce", label: "11th Commerce" },
      { value: "11th Humanity", label: "11th Humanity" },
      { value: "12", label: "12th Science" },
      { value: "12", label: "12th Commerce" },
      { value: "12", label: "12th Humanity" },
    ],
    wrapperClassName: "mb-6",
    fieldWrapperClassName: "col-span-6",
  },
  {
    name: "topics",
    label: "Topic",
    placeholder: "Select Topics ...",
    type: "select",
    multi: true,
    // Initial options are empty; PapersForm will inject them dynamically
    options: [], 
    wrapperClassName: "mb-6",
    fieldWrapperClassName: "col-span-6",
  },
];

// ====================================================================
// YUP SCHEMA FOR VALIDATION
// ====================================================================
export const schema = yup
  .object()
  .shape({
    name: yup.string().required("Name is required"),
    age: yup
      .number()
      .typeError("Age must be a number")
      .required("Age is required")
      .positive()
      .integer(),
    grade: yup.string().required("Grade is required"),
    topics: yup
      .array()
      .of(yup.string())
      .min(1, "Select at least one topic")
      .required("Topics are required"),
  })
  .required();
