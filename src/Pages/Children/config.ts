import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// ————————————————————————
// 1. Field Definitions (same as yours)
// ————————————————————————
const baseFields = [
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
    placeholder: "Select Topics ...",
    type: "select",
    multi: true,
    options: [], // Will be filled dynamically
    wrapperClassName: "mb-6",
    fieldWrapperClassName: "col-span-6",
  },
];

// ————————————————————————
// 2. Dynamic Topics per Grade
// ————————————————————————
const topicsByGrade: Record<string, { value: string; label: string }[]> = {
  "6th Grade": [
    { value: "topic_1", label: "Topic 1" },
    { value: "topic_2", label: "Topic 2" },
  ],
  "7th Grade": [
    { value: "topic_3", label: "Topic 3" },
    { value: "topic_4", label: "Topic 4" },
  ],
  "8th Grade": [
    { value: "topic_5", label: "Topic 5" },
  ],
  // Add more if needed
};

// ————————————————————————
// 3. Validation Schema
// ————————————————————————
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  age: yup
    .number()
    .required("Age is required")
    .positive()
    .integer()
    .typeError("Age must be a number"),
  grade: yup.string().required("Grade is required"),
  topics: yup
    .array()
    .of(yup.string())
    .min(1, "Select at least one topic")
    .required("Topics are required"),
});

// ————————————————————————
// 4. Main Form Component
// ————————————————————————
export default function DynamicTopicsForm() {
  const [topicOptions, setTopicOptions] = useState<{ value: string; label: string }[]>([]);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      age: "",
      grade: "",
      topics: [],
    },
  });

  const selectedGrade = watch("grade");

  // Update topics when grade changes
  useEffect(() => {
    const options = topicsByGrade[selectedGrade] || [];
    setTopicOptions(options);
    setValue("topics", [], { shouldValidate: true }); // Clear previous selection
  }, [selectedGrade, setValue]);

  const onSubmit = (data: any) => {
    console.log("Submitted:", data);
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md grid grid-cols-12 gap-4"
    >
      <h2 className="col-span-12 text-2xl font-bold text-center mb-6">Student Form</h2>

      {baseFields.map((field) => {
        // Text / Number inputs
        if (field.type !== "select") {
          return (
            <div
              key={field.name}
              className={`${field.wrapperClassName} ${field.fieldWrapperClassName}`}
            >
              <label className="block text-sm font-medium mb-1">{field.label}</label>
              <input
                type={field.type}
                {...register(field.name as any)}
                placeholder={field.placeholder}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {errors[field.name] && (
                <p className="text-red-500 text-xs mt-1">
                  {(errors[field.name] as any)?.message}
                </p>
              )}
            </div>
          );
        }

        // Grade select
        if (!field.multi) {
          return (
            <div
              key={field.name}
              className={`${field.wrapperClassName} ${field.fieldWrapperClassName}`}
            >
              <label className="block text-sm font-medium mb-1">{field.label}</label>
              <select
                {...register(field.name)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{field.placeholder}</option>
                {field.options.map((opt: any) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors[field.name] && (
                <p className="text-red-500 text-xs mt-1">
                  {(errors[field.name] as any)?.message}
                </p>
              )}
            </div>
          );
        }

        // Topics multi-select
        return (
          <div
            key={field.name}
            className={`${field.wrapperClassName} ${field.fieldWrapperClassName}`}
          >
            <label className="block text-sm font-medium mb-1">{field.label}</label>
            <Controller
              control={control}
              name="topics"
              render={({ field: { onChange, value = [] } }) => (
                <select
                  multiple
                  value={value}
                  onChange={(e) =>
                    onChange(Array.from(e.target.selectedOptions, (opt) => opt.value))
                  }
                  className="w-full p-2 border rounded-md h-32 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  disabled={topicOptions.length === 0}
                >
                  {topicOptions.length === 0 ? (
                    <option disabled>
                      {selectedGrade ? "No topics for this grade" : "Select grade first"}
                    </option>
                  ) : (
                    topicOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))
                  )}
                </select>
              )}
            />
            {errors.topics && (
              <p className="text-red-500 text-xs mt-1">
                {(errors.topics as any)?.message}
              </p>
            )}
          </div>
        );
      })}

      {/* Submit Button */}
      <div className="col-span-12 text-center mt-6">
        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
