import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFormFields } from "./useFormFields";
import { schema } from "./schema";

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