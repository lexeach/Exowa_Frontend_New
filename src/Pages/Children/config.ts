import * as yup from "yup";

// ====================================================================
// DYNAMIC TOPIC LOGIC (Using if/else)
// This function determines the options based on the selected grade.
// ====================================================================
export const getTopicsByGrade = (selectedGrade?: string) => {
  if (selectedGrade === "5th Grade") {
    return [
      { value: "5_math_frac", label: "Math: Fractions" },
      { value: "5_sci_machines", label: "Science: Simple Machines" },
      { value: "5_hist_ancient", label: "History: Ancient Civilizations" },
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
  } else if (selectedGrade === "9th Grade" || selectedGrade === "10th Grade") {
    return [
      { value: "secondary_math", label: "Secondary Math" },
      { value: "secondary_sci", label: "Secondary Science" },
      { value: "secondary_ss", label: "Secondary Social Science" },
    ];
  } else if (selectedGrade === "11th Grade" || selectedGrade === "12th Grade") {
    return [
      { value: "hsc_science", label: "HSC Science Stream" },
      { value: "hsc_commerce", label: "HSC Commerce Stream" },
      { value: "hsc_arts", label: "HSC Arts Stream" },
    ];
  } else {
    // Default options when no grade is selected
    return [
      { value: "", label: "← Select a Grade first" },
    ];
  }
};


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
      {
        value: "5th Grade",
        label: "5th Grade",
      },
      {
        value: "6th Grade",
        label: "6th Grade",
      },
      {
        value: "7th Grade",
        label: "7th Grade",
      },
      {
        value: "8th Grade",
        label: "8th Grade",
      },
      {
        value: "9th Grade",
        label: "9th Grade",
      },
      {
        value: "10th Grade",
        label: "10th Grade",
      },
      {
        value: "11th Grade",
        label: "11th Grade",
      },
      {
        value: "12th Grade",
        label: "12th Grade",
      },
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
    // Removed static options; they will be provided dynamically in the form.tsx file
    options: [], 
    wrapperClassName: "mb-6",
    fieldWrapperClassName: "col-span-6",
  },
];

export const schema = yup
  .object()
  .shape({
    name: yup.string().required("This field required"),
    age: yup.string().required("This field required"),
    grade: yup.string().required("This field required"),
    // Added topics validation
    topics: yup.array().min(1, "Please select at least one topic").required("This field required"),
  })
  .required();
