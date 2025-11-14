import React, { useState, useEffect } from "react";

export default function NoDependencyForm() {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    grade: "",
    topics: [],
  });

  const [errors, setErrors] = useState({});
  const [topicOptions, setTopicOptions] = useState([]);

  // Dynamic topics per grade
  const topicsByGrade = {
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
  };

  // Update topics when grade changes
  useEffect(() => {
    const options = topicsByGrade[formData.grade] || [];
    setTopicOptions(options);
    setFormData((prev) => ({ ...prev, topics: [] })); // clear old selection
  }, [formData.grade]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        topics: checked
          ? [...prev.topics, value]
          : prev.topics.filter((t) => t !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Validate form
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.age || formData.age <= 0) newErrors.age = "Valid age is required";
    if (!formData.grade) newErrors.grade = "Grade is required";
    if (formData.topics.length === 0) newErrors.topics = "Select at least one topic";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Submitted:", formData);
      alert("Form Submitted!\n" + JSON.stringify(formData, null, 2));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md grid grid-cols-12 gap-4"
    >
      <h2 className="col-span-12 text-2xl font-bold text-center mb-6">Student Form</h2>

      {/* Name */}
      <div className="mb-6 col-span-6">
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter Name ..."
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      {/* Age */}
      <div className="mb-6 col-span-6">
        <label className="block text-sm font-medium mb-1">Age</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Enter Age ..."
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
        {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
      </div>

      {/* Grade */}
      <div className="mb-6 col-span-6">
        <label className="block text-sm font-medium mb-1">Grade</label>
        <select
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Grade ...</option>
          {[
            "5th Grade",
            "6th Grade",
            "7th Grade",
            "8th Grade",
            "9th Grade",
            "10th Grade",
            "11th Grade",
            "12th Grade",
          ].map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        {errors.grade && <p className="text-red-500 text-xs mt-1">{errors.grade}</p>}
      </div>

      {/* Topics (Multi-select using checkboxes) */}
      <div className="mb-6 col-span-6">
        <label className="block text-sm font-medium mb-1">Topics</label>
        <div className="border rounded-md p-3 max-h-32 overflow-y-auto bg-gray-50">
          {topicOptions.length === 0 ? (
            <p className="text-gray-500 text-sm">
              {formData.grade ? "No topics available" : "Select a grade first"}
            </p>
          ) : (
            topicOptions.map((topic) => (
              <label
                key={topic.value}
                className="flex items-center space-x-2 text-sm cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={topic.value}
                  checked={formData.topics.includes(topic.value)}
                  onChange={handleChange}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>{topic.label}</span>
              </label>
            ))
          )}
        </div>
        {errors.topics && <p className="text-red-500 text-xs mt-1">{errors.topics}</p>}
      </div>

      {/* Submit */}
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
