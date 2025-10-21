import * as yup from "yup";

const options = [
  { value: 10, label: "10" },
  { value: 15, label: "15" },
  { value: 20, label: "20" },
];

const classoptions = [
  { value: "11", label: "11" },
  { value: "12", label: "12" },
];

// Function to generate dynamic subject list based on selected class & topic
const getDynamicSubjectOptions = (selectedClass, selectedTopic) => {
  if (!selectedClass || !selectedTopic) return [];

  if (String(selectedClass) === "11" && selectedTopic === "22") {
    return [
      { value: "Chemistry", label: "Chemistry" },
      { value: "Physics", label: "Physics" },
      { value: "Biology", label: "Biology" },
    ];
  }

  if (String(selectedClass) === "12" && selectedTopic === "topic_2") {
    return [
      { value: "Business Studies Part 1", label: "Business Studies Part 1" },
      { value: "Business Studies Part 2", label: "Business Studies Part 2" },
    ];
  }

  return [];
};

const chapterCounts = new Map([
  ["11-Physics-NCERT", ["Physical World", "Units and Measurements", "Laws of Motion"]],
  ["11-Chemistry-NCERT", ["Structure of Atom", "Chemical Bonding", "Equilibrium"]],
  ["12-Business Studies Part 1-NCERT", ["Nature and Significance of Management", "Planning"]],
]);

const generateChapterOptions = (selectedClass, subject, syllabus) => {
  const key = `${selectedClass}-${subject}-NCERT`;
  const chapterData = chapterCounts.get(key);

  if (Array.isArray(chapterData)) {
    return chapterData.map((chapterName, index) => ({
      value: chapterName,
      label: `${index + 1}. ${chapterName}`,
    }));
  }

  return [];
};

// --- Fields Export
export const fields = (
  useGetSubjectOptionsMutation,
  useGetSyllabusOptionsMutation,
  currentClass,
  setCurrentClass,
  currentSubject,
  setCurrentSubject,
  currentSyllabus,
  setCurrentSyllabus,
  childrenListData,
  childrenListClass,
  currentTopic,
  setCurrentTopic
) => {

  // ✅ Debug: Log current class and topic
  console.log("Current Class:", currentClass);
  console.log("Current Topic:", currentTopic);

  const subjectOptionsForClass = getDynamicSubjectOptions(currentClass, currentTopic);

  // ✅ Debug: Log dynamic subjects
  console.log("Subject Options For Class+Topic:", subjectOptionsForClass);

  const chapterOptions = generateChapterOptions(currentClass, currentSubject, currentSyllabus);

  return [
    {
      name: "class",
      label: "Class",
      placeholder: "Select Class ...",
      type: "select",
      options: childrenListClass?.data?.data || classoptions,
      getValueCallback: (value) => {
        setCurrentClass(String(value));
        setCurrentTopic(null);
        setCurrentSubject(null);
      },
    },
    {
      name: "topics",
      label: "Topic",
      placeholder: "Select Topic ...",
      type: "select",
      options: [
        { value: "22", label: "Topic 1" },
        { value: "topic_2", label: "Topic 2" },
        { value: "topic_3", label: "Topic 3" },
      ],
      getValueCallback: (value) => {
        setCurrentTopic(value);
        setCurrentSubject(null);
      },
    },
    {
      name: "subject",
      label: "Subject",
      placeholder: "Select Subject ...",
      type: "select",
      options: subjectOptionsForClass,
      getValueCallback: (value) => setCurrentSubject(value),
      disabled: !currentClass || !currentTopic,
    },
    {
      name: "chapter_from",
      label: "Chapter From",
      placeholder: "Select Chapter ...",
      type: "select",
      options: chapterOptions,
      disabled: !currentClass || !currentSubject,
    },
  ];
};

// --- Yup Schema ---
export const schema = yup.object().shape({
  class: yup.string().required("This field required"),
  topics: yup.string().required("This field required"),
  subject: yup.string().required("This field required"),
  chapter_from: yup.string().required("This field required"),
}).required();
