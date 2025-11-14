import * as yup from "yup";

// 🔥 1. Dynamic Topic List Based on Grade
const topicListByGrade = {
  "5th Grade": [
    { value: "t5_1", label: "Basic Maths" },
    { value: "t5_2", label: "General Science" },
  ],
  "6th Grade": [
    { value: "t6_1", label: "Fractions" },
    { value: "t6_2", label: "Algebra Basics" },
  ],
  "7th Grade": [
    { value: "t7_1", label: "Integers" },
    { value: "t7_2", label: "Nutrition in Plants" },
  ],
  "8th Grade": [
    { value: "t8_1", label: "Force & Pressure" },
    { value: "t8_2", label: "Rational Numbers" },
  ],
  "9th Grade": [
    { value: "t9_1", label: "Motion" },
    { value: "t9_2", label: "Number Systems" },
  ],
  "10th Grade": [
    { value: "t10_1", label: "Electricity" },
    { value: "t10_2", label: "Polynomials" },
  ],
  "11th Grade": [
    { value: "t11_1", label: "Physics – Kinematics" },
    { value: "t11_2", label: "Chemistry – Mole Concept" },
  ],
  "12th Grade": [
    { value: "t12_1", label: "Electrostatics" },
    { value: "t12_2", label: "Organic Chemistry" },
  ],
};

// ✅ Return topic list based on selected Grade
const getTopics = (grade) => {
  return topicListByGrade[grade] || [];
};

// 🔥 2. UPDATED `fields` to function to support dynamic behavior
export const fields = (
  selectedGrade,        // state of selected grade
  setSelectedGrade,     // function to update grade state
  setSelectedTopics     // function to reset topics
) => [
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
      { value: "5th Grade", label: "5th Grade" },
      { value: "6th Grade", label: "6th Grade" },
      { value: "7th Grade", label: "7th Grade" },
      { value: "8th Grade", label: "8th Grade" },
      { value: "9th Grade", label: "9th Grade" },
      { value: "10th Grade", label: "10th Grade" },
      { value: "11th Grade", label: "11th Grade" },
      { value: "12th Grade", label: "12th Grade" },
    ],
    onChange: (value) => {
      setSelectedGrade(value);   // update grade
      setSelectedTopics([]);     // reset topics when grade changes
    },
    wrapperClassName: "mb-6",
    fieldWrapperClassName: "col-span-6",
  },

  {
    name: "topics",
    label: "Topic",
    placeholder: "Select Topic ...",
    type: "select",
    multi: true,
    options: getTopics(selectedGrade),   // 🔥 dynamic topic based on grade
    disabled: !selectedGrade,            // disable until grade is selected
    wrapperClassName: "mb-6",
    fieldWrapperClassName: "col-span-6",
  },
];

// 🔥 3. Validation Schema
export const schema = yup.object().shape({
  name: yup.string().required("This field required"),
  age: yup.string().required("This field required"),
  grade: yup.string().required("This field required"),
});
