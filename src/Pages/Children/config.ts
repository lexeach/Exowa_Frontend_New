import * as yup from "yup";

// --- Topic Mapping Data ---
/**
 * Maps each grade value to an array of topic options for that grade.
 * This is the source of truth for dynamic updates.
 */
export const GRADE_TOPICS_MAP = {
  "5th Grade": [
    { value: "5_topic_1", label: "5th Grade - Topic A" },
    { value: "5_topic_2", label: "5th Grade - Topic B" },
  ],
  "6th Grade": [
    { value: "6_topic_1", label: "6th Grade - Topic X" },
    { value: "6_topic_2", label: "6th Grade - Topic Y" },
    { value: "6_topic_3", label: "6th Grade - Topic Z" },
  ],
  "7th Grade": [
    { value: "7_topic_1", label: "7th Grade - Advanced Algebra" },
    { value: "7_topic_2", label: "7th Grade - Basic Geometry" },
    { value: "7_topic_3", label: "7th Grade - Probability" },
  ],
  // Add mappings for other grades (8th, 9th, 10th, 11th, 12th) as needed...
  "8th Grade": [{ value: "8_topic_1", label: "8th Grade - Physics Intro" }],
  "9th Grade": [{ value: "9_topic_1", label: "9th Grade - Chemistry" }],
  "10th Grade": [{ value: "10_topic_1", label: "10th Grade - Biology" }],
  "11th Grade": [{ value: "11_topic_1", label: "11th Grade - Calculus" }],
  "12th Grade": [{ value: "12_topic_1", label: "12th Grade - Electives" }],
};

// --- Grade Options (for Grade Select Field) ---
const gradeOptions = [
  { value: "5th Grade", label: "5th Grade" },
  { value: "6th Grade", label: "6th Grade" },
  { value: "7th Grade", label: "7th Grade" },
  { value: "8th Grade", label: "8th Grade" },
  { value: "9th Grade", label: "9th Grade" },
  { value: "10th Grade", label: "10th Grade" },
  { value: "11th Grade", label: "11th Grade" },
  { value: "12th Grade", label: "12th Grade" },
];

// --- Form Fields Definition ---
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
    options: gradeOptions, // Use the defined grade options
    wrapperClassName: "mb-6",
    fieldWrapperClassName: "col-span-6",
  },
  {
    name: "topics",
    label: "Topic",
    placeholder: "Select Topic(s) ...",
    type: "select",
    multi: true,
    // The 'options' here should be dynamically provided by your form component.
    // I'm setting it to an empty array as a default/fallback, but your form
    // framework must override this based on the selected 'grade'.
    options: [],
    // Adding a dependency flag can help your form component know which field
    // needs dynamic updating based on another field's value.
    dependsOn: "grade",
    wrapperClassName: "mb-6",
    fieldWrapperClassName: "col-span-6",
  },
];

// --- Validation Schema ---
export const schema = yup
  .object()
  .shape({
    name: yup.string().required("This field required"),
    age: yup.string().required("This field required"),
    grade: yup.string().required("This field required"),
    // Add topics validation. It should be an array of strings if 'multi: true'
    topics: yup.array().min(1, "Please select at least one topic").required("This field required"),
  })
  .required();

// --- Example of how your form component would use the map ---
/*
// Inside your form component's render logic (e.g., in a React component):

const selectedGrade = formik.values.grade; // Get the currently selected grade value
const dynamicTopicOptions = GRADE_TOPICS_MAP[selectedGrade] || []; // Lookup topics or default to empty array

// Then, when rendering the 'topics' field, you pass dynamicTopicOptions as its 'options' prop.
*/
