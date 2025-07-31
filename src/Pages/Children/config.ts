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
    name: "class",
    label: "class",
    placeholder: "Select Chapter ...",
    type: "select",
    options: [
      {
        value: "5th class",
        label: "5th class",
      },
      {
        value: "6th class",
        label: "6th class",
      },
      {
        value: "7th class",
        label: "7th class",
      },
      {
        value: "8th class",
        label: "8th class",
      },
      {
        value: "9th class",
        label: "9th class",
      },
      {
        value: "10th class",
        label: "10th class",
      },
      {
        value: "11th class",
        label: "11th class",
      },
      {
        value: "12th class",
        label: "12th class",
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
    class: yup.string().required("this_field_required")
  })
  .required();
