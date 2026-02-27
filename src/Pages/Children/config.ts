import * as yup from "yup";

// ====================================================================
// DYNAMIC TOPIC LOGIC
// Values here must match the 'value' property in the grade options below.
// ====================================================================
export const getTopicsByGrade = (selectedGrade?: string) => {
  if (selectedGrade === "5") {
    return [
      { value: "5_math_frac", label: "Math: Fractions" },
      { value: "5_sci_machines", label: "Science: Simple Machines" },
      { value: "5_hist_ancient", label: "History: Ancient Civilizations" },
    ];
  } else if (selectedGrade === "6") {
    return [
      { value: "6_math_int", label: "Math: Integers" },
      { value: "6_sci_food", label: "Science: Components of Food" },
      { value: "6_geo_maps", label: "Geography: Globe and Maps" },
    ];
  } else if (selectedGrade === "7") {
    return [
      { value: "7_math_rational", label: "Math: Rational Numbers" },
      { value: "7_sci_climate", label: "Science: Weather and Climate" },
      { value: "7_hist_med", label: "History: Medieval India" },
    ];
  } else if (selectedGrade === "8") {
    return [
      { value: "8_math_lin_eq", label: "Math: Linear Equations" },
      { value: "8_sci_current", label: "Science: Chemical Effects of Current" },
    ];
  } else if (selectedGrade === "9" || selectedGrade === "10") {
    return [
      { value: "secondary_math", label: "Secondary Math" },
      { value: "secondary_sci", label: "Secondary Science" },
      { value: "secondary_ss", label: "Secondary Social Science" },
    ];
  } else if (selectedGrade === "11_sci" || selectedGrade === "12_sci") {
    return [
      { value: "secondary_Phy", label: "Secondary Physics" },
      { value: "secondary_Chem", label: "Secondary Chemistry" },
      { value: "secondary_Bio", label: "Secondary Biology" },
    ];
  } else if (selectedGrade === "11_com" || selectedGrade === "12_com") {
    return [
      { value: "hsc_Economic", label: "HSC Economics" },
      { value: "hsc_Account", label: "HSC Accountancy" },
      { value: "hsc_Math", label: "HSC Math" },
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
      { value: "11", label: "11th Science" },
      { value: "11", label: "11th Commerce" },
      { value: "12", label: "12th Science" },
      { value: "12", label: "12th Commerce" },
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
