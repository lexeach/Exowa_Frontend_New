import * as yup from "yup";
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
    type: "text",
    wrapperClassName: "mb-6",
    fieldWrapperClassName: "col-span-6",
  },
  {
    name: "grade",
    label: "Grade",
    placeholder: "Select Chapter ...",
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
    ],
    wrapperClassName: "mb-6",
    fieldWrapperClassName: "col-span-6",
  },
];

export const schema = yup
  .object()
  .shape({
    name: yup.string().required("this_field_required"),
    age: yup.string().required("this_field_required"),
    grade: yup.string().required("this_field_required")
  })
  .required();
