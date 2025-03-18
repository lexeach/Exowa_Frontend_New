import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Options for the "Number of Questions" field
const options = [
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 15, label: "15" },
  { value: 20, label: "20" },
  { value: 25, label: "25" },
  { value: 30, label: "30" },
  { value: 35, label: "35" },
  { value: 40, label: "40" },
  { value: 45, label: "45" },
  { value: 50, label: "50" },
];

// Options for the "Class" field
const classoptions = [
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
  { value: 10, label: "10" },
  { value: 11, label: "11" },
  { value: 12, label: "12" },
  { value: "B Sc (1st year)", label: "B Sc (1st year)" },
];

// Function to generate chapter options based on the selected class
const generateChapterOptions = (selectedClass) => {
  let chapterCount = 10; // Default value

  if (selectedClass === 6) {
    chapterCount = 8;
  } else if (selectedClass === 7) {
    chapterCount = 12;
  } else if (selectedClass === 8) {
    chapterCount = 11;
  } else if (selectedClass === 9) {
    chapterCount = 13;
  } else if (selectedClass === 10) {
    chapterCount = 14;
  } else if (selectedClass === 11) {
    chapterCount = 15;
  } else if (selectedClass === 12) {
    chapterCount = 16;
  }

  const chapterOptions = [];
  for (let i = 1; i <= chapterCount; i++) {
    chapterOptions.push({ value: i, label: i.toString() });
  }
  return chapterOptions;
};

// Custom hook to generate form fields
const useFormFields = (useGetSubjectOptionsMutation, useGetSyllabusOptionsMutation) => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [chapterOptions, setChapterOptions] = useState([]);

  // Update chapterOptions whenever selectedClass changes
  useEffect(() => {
    if (selectedClass !== null) {
      const newChapterOptions = generateChapterOptions(selectedClass);
      setChapterOptions(newChapterOptions);
    }
  }, [selectedClass]);

  const fields = [
    {
      name: "subject",
      label: "Subject",
      placeholder: "Select Subject ...",
      type: "select",
      fetchData: useGetSubjectOptionsMutation,
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-12",
    },
    {
      name: "syllabus",
      label: "Syllabus",
      placeholder: "Syllabus Subject ...",
      type: "select",
      fetchData: useGetSyllabusOptionsMutation,
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-12",
    },
    {
      name: "class",
      label: "Class",
      placeholder: "Class ...",
      type: "select",
      options: classoptions,
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-12",
    },
    {
      name: "chapter_from",
      label: "Chapter From",
      placeholder: "Select Chapter ...",
      type: "select",
      options: chapterOptions,
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-6",
    },
    {
      name: "chapter_to",
      label: "Chapter To",
      placeholder: "Select Chapter ...",
      type: "select",
      options: chapterOptions,
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-6",
    },
    {
      name: "language",
      label: "Language",
      placeholder: "Chapter Language ...",
      type: "select",
      options: [
        { value: "English", label: "English" },
        { value: "Hindi", label: "Hindi" },
        { value: "Urdu", label: "Urdu" },
        { value: "Marathi", label: "Marathi" },
        { value: "Tamil", label: "Tamil" },
        { value: "Telugu", label: "Telugu" },
      ],
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-6",
    },
    {
      name: "no_of_question",
      label: "Number Of Question",
      placeholder: "Select Number ...",
      type: "select",
      options: options,
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-6  mb-[400px] sm:mb-5",
    },
  ];

  return { fields, selectedClass, setSelectedClass };
};

// Validation schema
const schema = yup.object().shape({
  language: yup.string().required("This field is required"),
  chapter_to: yup.string().required("This field is required"),
  chapter_from: yup.string().required("This field is required"),
  syllabus: yup.string().required("This field is required"),
  subject: yup.string().required("This field is required"),
  no_of_question: yup.string().required("This field is required"),
  class: yup.string().required("This field is required"),
});

// Main component
const App = () => {
  // Mock mutations (replace with your actual mutations)
  const useGetSubjectOptionsMutation = () => [
    { value: "math", label: "Mathematics" },
    { value: "science", label: "Science" },
  ];

  const useGetSyllabusOptionsMutation = () => [
    { value: "cbse", label: "CBSE" },
    { value: "icse", label: "ICSE" },
  ];

  // Get form fields and state
  const { fields, selectedClass, setSelectedClass } = useFormFields(
    useGetSubjectOptionsMutation,
    useGetSyllabusOptionsMutation
  );

  // React Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Form submission handler
  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Dynamic Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div key={index} className={field.wrapperClassName}>
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>
            <Controller
              name={field.name}
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => {
                if (field.type === "select") {
                  return (
                    <select
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => {
                        onChange(e);
                        if (field.name === "class") {
                          setSelectedClass(parseInt(e.target.value, 10));
                        }
                      }}
                      value={value}
                    >
                      <option value="">{field.placeholder}</option>
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                      {field.fetchData?.().map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  );
                }
                return null;
              }}
            />
            {errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[field.name].message}
              </p>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;
