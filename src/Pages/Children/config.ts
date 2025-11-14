import * as yup from "yup";

// ====================================================================
// DYNAMIC TOPIC LOGIC (Using if/else)
// Your form component must call this function based on the selected grade.
// ====================================================================
export const getTopicsByGrade = (selectedGrade) => {
  if (selectedGrade === "5th Grade") {
    return [
      { value: "topic_1", label: "Topic 1" },
      { value: "topic_2", label: "Topic 1" },
      { value: "topic_3", label: "Topic 1" },
    ];
  } else if (selectedGrade === "6th Grade") {
    return [
      { value: "6_math_int", label: "Math: Integers" },
      { value: "6_sci_food", label: "Science: Components of Food" },
      { value: "6_geo_maps", label: "Geography: Globe and Maps" },
    ];
  } else if (selectedGrade === "7th Grade") {
    return [
      { value: "7_math_rational", label: "Math: Rational Numbers" },
      { value: "7_sci_climate", label: "Science: Weather and Climate" },
      { value: "7_hist_med", label: "History: Medieval India" },
    ];
  } else if (selectedGrade === "8th Grade") {
    return [
      { value: "8_math_lin_eq", label: "Math: Linear Equations" },
      { value: "8_sci_current", label: "Science: Chemical Effects of Current" },
    ];
  } else if (selectedGrade === "9th Grade") {
    return [
      { value: "9_phys_motion", label: "Physics: Motion" },
      { value: "9_econ_palampur", label: "Economics: Palampur Village" },
    ];
  } else if (selectedGrade === "10th Grade") {
    return [
      { value: "10_bio_life", label: "Biology: Life Processes" },
      { value: "10_pol_power", label: "Pol. Sc: Power Sharing" },
    ];
  } else if (selectedGrade === "11th Grade") {
    return [
      { value: "11_pcb", label: "Science Stream Topics" },
      { value: "11_comm", label: "Commerce Stream Topics" },
      { value: "11_hum", label: "Humanities Stream Topics" },
    ];
  } else if (selectedGrade === "12th Grade") {
    return [
      { value: "12_calc", label: "Math: Calculus" },
      { value: "12_acct", label: "Accountancy: Partnership" },
      { value: "12_hist", label: "History: Themes in Indian History" },
    ];
  } else {
    // Default or fallback options
    return [
      { value: "", label: "← Select a Grade first" },
    ];
  }
};

// ====================================================================
// FORM FIELDS DEFINITION
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
      { value: "5th Grade", label: "5th Grade" },
      { value: "6th Grade", label: "6th Grade" },
      { value: "7th Grade", label: "7th Grade" },
      { value: "8th Grade", label: "8th Grade" },
      { value: "9th Grade", label: "9th Grade" },
      { value: "10th Grade", label: "10th Grade" },
      { value: "11th Grade", label: "11th Grade" },
      { value: "12th Grade", label: "12th Grade" },
    ],
    wrapperClassName: "mb-6",
    fieldWrapperClassName: "col-span-6",
  },
  {
    name: "topics",
    label: "Topic",
    placeholder: "Select Topic(s) ...",
    type: "select",
    multi: true,
    // Options are set to an empty array here. Your form component must 
    // dynamically override this by calling getTopicsByGrade().
    options: [], 
    // This property is a hint for your rendering component
    dependsOn: "grade",
    wrapperClassName: "mb-6",
    fieldWrapperClassName: "col-span-6",
  },
];

// ====================================================================
// VALIDATION SCHEMA
// ====================================================================
export const schema = yup
  .object()
  .shape({
    name: yup.string().required("Name is required"),
    age: yup.string().required("Age is required"),
    grade: yup.string().required("Grade is required"),
    topics: yup.array().min(1, "Please select at least one topic").required("Topics are required"),
  })
  .required();
