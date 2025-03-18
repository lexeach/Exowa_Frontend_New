import * as yup from "yup";

export const schema = yup.object().shape({
  language: yup.string().required("This field is required"),
  chapter_to: yup.string().required("This field is required"),
  chapter_from: yup.string().required("This field is required"),
  syllabus: yup.string().required("This field is required"),
  subject: yup.string().required("This field is required"),
  no_of_question: yup.string().required("This field is required"),
  class: yup.string().required("This field is required"),
});