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
  } else if (selectedGrade === "11" || selectedGrade === "12") {
    const topics = [
        // --- First 11 values (Green) ---
        { value: "English_Sci", label: "English", color: "green" },
        { value: "Physics", label: "Physics", color: "green" },
        { value: "Mathematics", label: "Mathematics", color: "green" },
        { value: "Chemistry", label: "Chemistry", color: "green" },
        { value: "Biology", label: "Biology", color: "green" },
        { value: "Psychology_Sci", label: "Psychology", color: "green" },
        { value: "Biotechnology", label: "Biotechnology", color: "green" },
        { value: "Hindi_Sci", label: "Hindi", color: "green" },
        { value: "Home Science", label: "Home Science", color: "green" },
        { value: "Informatics Practices_Sci", label: "Informatics Practices", color: "green" },
        { value: "Computer Science_Sci", label: "Computer Science", color: "green" },

        // --- Next 10 values (Red) ---
        { value: "English_Com", label: "English", color: "red" },
        { value: "Hindi_Com", label: "Hindi", color: "red" },
        { value: "Economics", label: "Economics", color: "red" },
        { value: "Business Studies", label: "Business Studies", color: "red" },
        { value: "Informatics Practices_Com", label: "Informatics Practices", color: "red" },
        { value: "Computer Science_Com", label: "Computer Science", color: "red" },
        { value: "Financial Accounting", label: "Financial Accounting", color: "red" },
        { value: "Accountancy", label: "Accountancy", color: "red" },
        { value: "English_Arts", label: "English", color: "red" },
        { value: "Sanskrit", label: "Sanskrit", color: "red" },

        // --- Rest of the values (Dark Yellow) ---
        { value: "Psychology_Arts", label: "Psychology", color: "#cc9900" },
        { value: "Geography", label: "Geography", color: "#cc9900" },
        { value: "Hindi_Arts", label: "Hindi", color: "#cc9900" },
        { value: "Sociology", label: "Sociology", color: "#cc9900" },
        { value: "Political Science", label: "Political Science", color: "#cc9900" },
        { value: "History", label: "History", color: "#cc9900" },
        { value: "Urdu", label: "Urdu", color: "#cc9900" },
        { value: "Creative Writing and Translation", label: "Creative Writing and Translation", color: "#cc9900" }
    ];
    return topics;
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
      { value: "6", label: "6th Grade" },
      { value: "7", label: "7th Grade" },
      { value: "8", label: "8th Grade" },
      { value: "9", label: "9th Grade" },
      { value: "10", label: "10th Grade" },
      { value: "11", label: "11" },
      { value: "11th Commerce", label: "11th Commerce" },
      { value: "11th Humanity", label: "11th Humanity" },
      { value: "12", label: "12" },
      { value: "12th Commerce", label: "12th Commerce" },
      { value: "12th Humanity", label: "12th Humanity" },
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
