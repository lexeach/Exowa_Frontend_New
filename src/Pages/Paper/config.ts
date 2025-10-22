import * as yup from "yup";



const options = [

  //{ value: 5, label: "5" },

  { value: 10, label: "10" },

  { value: 15, label: "15" },

  { value: 20, label: "20" },

];



const classoptions = [

  //{ value: 6, label: "6" },

  //{ value: 7, label: "7" },

  //{ value: 8, label: "8" },

  //{ value: 9, label: "9" },

  { value: 10, label: "10" },

  //{ value: 11, label: "11" },

  //{ value: 12, label: "12" },

];



// Define the dynamic subject options based on class

const dynamicSubjectOptions = {

  "11": [

    { value: "Physics Part 1", label: "Physics Part 1" },

    { value: "Physics Part 2", label: "Physics Part 2" },

    { value: "Mathematics", label: "Mathematics" },

    { value: "Chemistry Part 1", label: "Chemistry Part 1" },

    { value: "Chemistry Part 2", label: "Chemistry Part 2" },

    { value: "Biology", label: "Biology" },

   

  ],

  "12": [

   

    { value: "Business Studies Part 1", label: "Business Studies Part 1" },

    { value: "Business Studies Part 2", label: "Business Studies Part 2" },

     ],

  default: [],

};



const chapterCounts = new Map<string, string[] | number>([

  [

  

  [

   

  [

    "12-Business Studies Part 1-NCERT",

    [

      "Nature and Significance of Management",

      "Principles of Management",

      "Business Environment",

      "Planning",

      "Organising",

      "Staffing",

      "Directing",

      "Controlling",

    ],

  ],

  [

    "12-Business Studies Part 2-NCERT",

    [

      "Financial Management",

      "Financial Markets",

      "Marketing Management",

      "Consumer Protection",

    ],

  ],

  

  [

    "11-Physics Part 1-NCERT",

    [

      "Physical World",

      "Units and Measurements",

      "Motion in a Straight Line",

      "Motion in a Plane",

      "Laws of Motion",

      "Work, Energy and Power",

      "System of Particles and Rotational Motion",

    ],

  ],

  [

    "11-Physics Part 2-NCERT",

    [

      "Gravitation",

      "Mechanical Properties of Solids",

      "Mechanical Properties of Fluids",

      "Thermal Properties of Matter",

      "Thermodynamics",

      "Kinetic Theory",

      "Oscillations",

    ],

  ],

  [

    "12-Physics Part 1-NCERT",

    [

      "Electric Charges and Fields",

      "Electrostatic Potential and Capacitance",

      "Current Electricity",

      "Moving Charges and Magnetism",

      "Magnetism and Matter",

      "Electromagnetic Induction",

      "Alternating Current",

      "Electromagnetic Waves",

    ],

  ],

  [

    "12-Physics Part 2-NCERT",

    [

      "Ray Optics and Optical Instruments",

      "Wave Optics",

      "Dual Nature of Radiation and Matter",

      "Atoms",

      "Nuclei",

      "Semiconductor Electronics",

    ],

  ],



  [

    "11-Chemistry Part 1-NCERT",

    [

      "Some Basic Concepts of Chemistry",

      "Structure of Atom",

      "Classification of Elements and Periodicity in Properties",

      "Chemical Bonding and Molecular Structure",

      "Chemical Thermodynamics",

      "Equilibrium",

    ],

  ],

  [

    "11-Chemistry Part 2-NCERT",

    [

      "Redox Reactions",

      "Organic Chemistry – Some Basic Principles and Techniques",

      "Hydrocarbons",

    ],

  ],

  [

    "12-Chemistry Part 1-NCERT",

    [

      "Solutions",

      "Electrochemistry",

      "Chemical Kinetics",

      "The d- and f-Block Elements",

      "Coordination Compounds",

    ],

  ],

  [

    "12-Chemistry Part 2-NCERT",

    [

      "Haloalkanes and Haloarenes",

      "Alcohols, Phenols and Ethers",

      "Aldehydes, Ketones and Carboxylic Acids",

      "Amines",

      "Biomolecules",

    ],

  ],



  [

    "11-Biology-NCERT",

    [

      "The Living World",

      "Biological Classification",

      "Plant Kingdom",

      "Animal Kingdom",

      "Morphology of Flowering Plants",

      "Anatomy of Flowering Plants",

      "Structural Organisation in Animals",

      "Cell: The Unit of Life",

      "Biomolecules",

      "Cell Cycle and Cell Division",

      "Photosynthesis in Higher Plants",

      "Respiration in Plants",

      "Plant Growth and Development",

      "Breathing and Exchange of Gases",

      "Body Fluids and Circulation",

      "Excretory Products and their Elimination",

      "Locomotion and Movement",

      "Neural Control and Coordination",

      "Chemical Coordination and Integration",

    ],

  ],

  [

    "12-Biology-NCERT",

    [

      "Sexual Reproduction in Flowering Plants",

      "Human Reproduction",

      "Reproductive Health",

      "Principles of Inheritance and Variation",

      "Molecular Basis of Inheritance",

      "Evolution",

      "Human Health and Disease",

      "Microbes in Human Welfare",

      "Biotechnology - Principles and Processes",

      "Biotechnology and its Applications",

      "Organisms and Populations",

      "Ecosystem",

      "Biodiversity and Conservation",

    ],

  ],



  [

    "12-Accountancy Part 2-NCERT",

    [

      "Financial Statements of a Company",

      "Analysis of Financial Statements",

      "Accounting Ratios",

      "Cash Flow Statement",

    ],

  ],

  

]);



const generateChapterOptions = (selectedClass, subject, syllabus) => {

  let key;



  let chapterData = null;



  if (syllabus) {

    // Try the exact syllabus first

    key = `${selectedClass}-${subject}-${syllabus}`;

    chapterData = chapterCounts.get(key);



    // If not found, try with NCERT (most common)

    if (!chapterData) {

      key = `${selectedClass}-${subject}-NCERT`;

      chapterData = chapterCounts.get(key);

    }



    // If still not found, try with Default

    if (!chapterData) {

      key = `${selectedClass}-${subject}-Default`;

      chapterData = chapterCounts.get(key);

    }



    // If still not found, try with CBSE

    if (!chapterData) {

      key = `${selectedClass}-${subject}-CBSE`;

      chapterData = chapterCounts.get(key);

    }

  } else {

    key = `${selectedClass}-${subject || "Default"}-Default`;

    chapterData = chapterCounts.get(key);

  }



  if (Array.isArray(chapterData)) {

    // Correct logic: value is the chapter name, label is the number

    return chapterData.map((chapterName, index) => ({

      value: chapterName,

      label: (index + 1).toString(),

    }));

  } else if (typeof chapterData === "number") {

    // Correct logic: both are the number, as there's no name data

    return Array.from({ length: chapterData }, (_, i) => ({

      value: (i + 1).toString(),

      label: (i + 1).toString(),

    }));

  }



  return [];

};



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

  childrenListClass

) => {

  const subjectOptionsForClass =

    dynamicSubjectOptions[currentClass] || dynamicSubjectOptions["default"];



  const chapterOptions = generateChapterOptions(

    currentClass,

    currentSubject,

    currentSyllabus

  );



  // Use predefined class options instead of children data to show all classes 6-12

  // const classOptions = classoptions;



  return [

    {

      name: "class",

      label: "Class",

      placeholder: "Class ...",

      type: "select",

      options: childrenListClass?.data?.data || [],

      autoFocus: true,

      wrapperClassName: "mb-6",

      fieldWrapperClassName: "col-span-12",

      className: "mobile-select-no-keyboard",

      getValueCallback: (value) => {

        setCurrentClass(value);

        setCurrentSubject(null);

      },

    },

    {

      name: "syllabus",

      label: "Syllabus",

      placeholder: "Syllabus Subject ...",

      type: "select",

      autoFocus: true,

      fetchData: useGetSyllabusOptionsMutation,

      wrapperClassName: "mb-6",

      fieldWrapperClassName: "col-span-12",

      className: "mobile-select-no-keyboard",

      getValueCallback: (value) => setCurrentSyllabus(value),

    },

    {

      name: "topics",

      label: "Topic",

      placeholder: "Select Chapter ...",

      type: "select",

      options: [

        {

          value: "topic_1",

          label: "Topic 1",

        },

        {

          value: "topic_2",

          label: "Topic 2",

        },

        {

          value: "topic_3",

          label: "Topic 3",

        },

      ],

      wrapperClassName: "mb-6",

      fieldWrapperClassName: "col-span-6",

    },

    {

      name: "subject",

      label: "Subject",

      placeholder: "Select Subject ...",

      type: "select",

      autoFocus: true,

      options: subjectOptionsForClass,

      wrapperClassName: "mb-6",

      fieldWrapperClassName: "col-span-6",

      className: "mobile-select-no-keyboard",

      getValueCallback: (value) => setCurrentSubject(value),

      disabled: (() => {

        const isDisabled = !currentClass || subjectOptionsForClass.length === 0;

        return isDisabled;

      })(),

    },



    {

      name: "chapter_from",

      label: "Chapter From",

      placeholder: "Select Chapter ...",

      type: "select",

      autoFocus: true,

      options: chapterOptions,

      wrapperClassName: "mb-6",

      fieldWrapperClassName: "col-span-6",

      className: "mobile-select-no-keyboard",

      disabled: (() => {

        const isDisabled =

          !currentClass || !currentSubject || chapterOptions.length === 0;



        return isDisabled;

      })(),

    },

    {

      name: "chapter_to",

      label: "Chapter To",

      placeholder: "Select Chapter ...",

      type: "select",

      autoFocus: true,

      options: chapterOptions,

      wrapperClassName: "mb-6",

      fieldWrapperClassName: "col-span-6",

      className: "mobile-select-no-keyboard",

      disabled: (() => {

        const isDisabled =

          !currentClass || !currentSubject || chapterOptions.length === 0;



        return isDisabled;

      })(),

    },

    {

      name: "language",

      label: "Language",

      placeholder: "Chapter Language ...",

      type: "select",

      autoFocus: true,

      options: [

        { value: "English", label: "English" },

        { value: "Hindi", label: "Hindi" },

        { value: "Marathi", label: "Marathi" },

        { value: "Tamil", label: "Tamil" },

        { value: "Telugu", label: "Telugu" },

        { value: "Bengali", label: "Bengali" },

        { value: "Gujarati", label: "Gujarati" },

        { value: "Kannada", label: "Kannada" },

        { value: "Malayalam", label: "Malayalam" },

        { value: "Urdu", label: "Urdu" },

        { value: "Manipuri", label: "Manipuri" },

        { value: "Kashmiri", label: "Kashmiri" },

      ],

      wrapperClassName: "mb-6",

      fieldWrapperClassName: "col-span-6",

      className: "mobile-select-no-keyboard",

    },

    {

      name: "no_of_question",

      label: "Number Of Question",

      placeholder: "Select Number ...",

      type: "select",

      options: options,

      autoFocus: true,

      wrapperClassName: "mb-6",

      fieldWrapperClassName: "col-span-6 mb-[400px] sm:mb-5",

      className: "mobile-select-no-keyboard",

    },

  ];

};



export const schema = yup

  .object()

  .shape({

    language: yup.string().required("This field required"),

    chapter_from: yup.string().required("This field required"),

    chapter_to: yup.string().when("chapter_from", {

      is: (chapter_from) => chapter_from,

      then: (schema) =>

        schema

          .required("This field required")

          .test(

            "is-greater-or-equal",

            "Chapter to cannot be less than Chapter from",

            function (chapter_to) {

              const {

                chapter_from,

                subject,

                class: classValue,

                syllabus,

              } = this.parent;



              if (!chapter_from || !chapter_to) {

                return true; // Pass validation if one is missing

              }



              // Try to parse the values as numbers. This works for numerical chapters (e.g., Math)

              const numChapterFrom = parseInt(chapter_from);

              const numChapterTo = parseInt(chapter_to);



              if (!isNaN(numChapterFrom) && !isNaN(numChapterTo)) {

                return numChapterTo >= numChapterFrom;

              }



              // If parsing fails, it means the values are chapter names (e.g., Science).

              // We must find their index in the original data to compare them.

              let key;

              if (syllabus) {

                key = `${classValue}-${subject}-${syllabus}`;

              } else {

                key = `${classValue}-${subject || "Default"}-Default`;

              }

              const chapterData = chapterCounts.get(key);



              if (Array.isArray(chapterData)) {

                const indexFrom = chapterData.indexOf(chapter_from);

                const indexTo = chapterData.indexOf(chapter_to);



                // Ensure both chapter names were found and compare their indices

                if (indexFrom !== -1 && indexTo !== -1) {

                  return indexTo >= indexFrom;

                }

              }



              // If the logic above couldn't find a valid comparison,

              // we return true to not block the user.

              return true;

            }

          ),

      otherwise: (schema) => schema.required("This field required"),

    }),

    syllabus: yup.string().required("This field required"),

    subject: yup.string().required("This field required"),

    no_of_question: yup.string().required("This field required"),

    class: yup.string().required("This field required"),

    topics: yup.string().required("This field required"),

  })

  .required();
