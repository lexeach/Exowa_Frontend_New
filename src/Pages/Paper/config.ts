import * as yup from "yup";

const options = [
  { value: 10, label: "10" },
  { value: 15, label: "15" },
  { value: 20, label: "20" },
];

/* ---------- Topic Mapping (NEW) ---------- */
// Topic options based on Class selection
const topicOptionsByClass = {
  "11": [
    { value: "topic_1", label: "Topic 1" },
    { value: "topic_2", label: "Topic 2" },
  ],
  "12": [
    { value: "topic_2", label: "Topic 2" },
    { value: "topic_3", label: "Topic 3" },
  ],
  // Default list if class is not 11 or 12
  default: [
    { value: "topic_1", label: "Topic 1" },
    { value: "topic_2", label: "Topic 2" },
    { value: "topic_3", label: "Topic 3" },
  ],
};

const getTopicOptions = (selectedClass) => {
    if (!selectedClass) return topicOptionsByClass.default;
    // Safely look up the class-specific topic list
    return topicOptionsByClass[String(selectedClass)] || topicOptionsByClass.default;
};
/* ------------------------------------------- */


// Define the dynamic subject options based on class
const dynamicSubjectOptions = {
  "11": [
    { value: "English Woven Words", label: "English Woven Words" },
    { value: "English Hornbill", label: "English Hornbill" },
    {
      value: "English Snapshots Supplementary Reader",
      label: "English Snapshots Supplementary Reader",
    },
    { value: "Physics Part 1", label: "Physics Part 1" },
    { value: "Physics Part 2", label: "Physics Part 2" },
    { value: "Mathematics", label: "Mathematics" },
    { value: "Chemistry Part 1", label: "Chemistry Part 1" },
    { value: "Chemistry Part 2", label: "Chemistry Part 2" },
    { value: "Biology", label: "Biology" },
    { value: "Sanskrit Bhaswati", label: "Sanskrit Bhaswati" },
    { value: "Sanskrit Shashwati", label: "Sanskrit Shashwati" },
    { value: "Psychology", label: "Psychology" },
    { value: "Biotechnology", label: "Biotechnology" },
    {
      value: "Geography Fundamental of Physical Geography",
      label: "Geography Fundamental of Physical Geography",
    },
    {
      value: "Geography Pratical Work in Geography",
      label: "Geography Pratical Work in Geography",
    },
    {
      value: "Geography India Physical Environment",
      label: "Geography India Physical Environment",
    },
    { value: "Hindi Antra Part 1", label: "Hindi Antra Part 1" },
    { value: "Hindi Aroh", label: "Hindi Aroh" },
    { value: "Hindi Vitan Part 1", label: "Hindi Vitan Part 1" },
    {
      value: "Sociology Introducing Sociology",
      label: "Sociology Introducing Sociology",
    },
    {
      value: "Sociology Understanding Society",
      label: "Sociology Understanding Society",
    },
    {
      value: "Political Science Political Theory",
      label: "Political Science Political Theory",
    },
    {
      value: "Political Science India Constitution at Work",
      label: "Political Science India Constitution at Work",
    },
    {
      value: "History Themes in World History",
      label: "History Themes in World History",
    },
    {
      value: "Economics Indian Economic Development",
      label: "Economics Indian Economic Development",
    },
    {
      value: "Economics Statistics for Economics",
      label: "Economics Statistics for Economics",
    },
    { value: "Business Studies", label: "Business Studies" },
    { value: "Urdu", label: "Urdu" },
    {
      value: "Home Science Human Ecology and Family Sciences Part 1",
      label: "Home Science Human Ecology and Family Sciences Part 1",
    },
    {
      value: "Home Science Human Ecology and Family Sciences Part 2",
      label: "Home Science Human Ecology and Family Sciences Part 2",
    },
    {
      value: "Creative Writing and Translation",
      label: "Creative Writing and Translation",
    },
    { value: "Informatics Practices", label: "Informatics Practices" },
    { value: "Computer Science", label: "Computer Science" },
    { value: "Financial Accounting", label: "Financial Accounting" },
    { value: "Accountancy", label: "Accountancy" },
  ],
  "12": [
    { value: "English Vistas", label: "English Vistas" },
    { value: "Physics Part 1", label: "Physics Part 1" },
    { value: "Physics Part 2", label: "Physics Part 2" },
    { value: "Mathematics Part 1", label: "Mathematics Part 1" },
    { value: "Mathematics Part 2", label: "Mathematics Part 2" },
    { value: "Chemistry", label: "Chemistry" },
    { value: "Biology", label: "Biology" },
    { value: "Sanskrit", label: "Sanskrit" },
    {
      value: "Computerised Accounting System",
      label: "Computerised Accounting System",
    },
    { value: "Accountancy", label: "Accountancy" },
    { value: "Psychology", label: "Psychology" },
    { value: "Biotechnology", label: "Biotechnology" },
    {
      value: "Geography Fundamentals of Human Geography",
      label: "Geography Fundamentals of Human Geography",
    },
    {
      value: "Geography Pratical Work in Geography",
      label: "Geography Pratical Work in Geography",
    },
    {
      value: "Geography India People And Economy",
      label: "Geography India People And Economy",
    },
    { value: "Hindi Antra Part 2", label: "Hindi Antra Part 2" },
    { value: "Hindi Aroh Part 2", label: "Hindi Aroh Part 2" },
    { value: "Hindi Vitan Part 2", label: "Hindi Vitan Part 2" },
    { value: "Sociology Indian Society", label: "Sociology Indian Society" },
    {
      value: "Sociology Social Change and Development in India",
      label: "Sociology Social Change and Development in India",
    },
    {
      value: "Political Science Politics in India Since Independence",
      label: "Political Science Politics in India Since Independence",
    },
    {
      value: "Political Science Contemporary World Politics",
      label: "Political Science Contemporary World Politics",
    },
    {
      value: "History Themes in Indian History Part 1",
      label: "History Themes in Indian History Part 1",
    },
    {
      value: "History Themes in Indian History Part 2",
      label: "History Themes in Indian History Part 2",
    },
    {
      value: "History Themes in Indian History Part 3",
      label: "History Themes in Indian History Part 3",
    },
    {
      value: "Economics Introductory Microeconomics",
      label: "Economics Introductory Microeconomics",
    },
    {
      value: "Economics Introductory Macroeconomics",
      label: "Economics Introductory Macroeconomics",
    },
    { value: "Business Studies Part 1", label: "Business Studies Part 1" },
    { value: "Business Studies Part 2", label: "Business Studies Part 2" },
    { value: "Urdu", label: "Urdu" },
    {
      value: "Home Science Human Ecology and Family Sciences Part 1",
      label: "Home Science Human Ecology and Family Sciences Part 1",
    },
    {
      value: "Home Science Human Ecology and Family Sciences Part 2",
      label: "Home Science Human Ecology and Family Sciences Part 2",
    },
    {
      value: "Creative Writing and Translation",
      label: "Creative Writing and Translation",
    },
    { value: "Informatics Practices", label: "Informatics Practices" },
    { value: "Computer Science", label: "Computer Science" },
  ],
  default: [],
};

const chapterCounts = new Map([
  [
    "11-Mathematics-NCERT",
    [
      "Sets",
      "Relations and Functions",
      "Trigonometric Functions",
      "Principle of Mathematical Induction",
      "Complex Numbers and Quadratic Equations",
      "Linear Inequalities",
      "Permutations and Combinations",
      "Binomial Theorem",
      "Sequences and Series",
      "Straight Lines",
      "Conic Sections",
      "Introduction to Three Dimensional Geometry",
      "Limits and Derivatives",
      "Mathematical Reasoning",
      "Statistics",
      "Probability",
    ],
  ],
  [
    "12-Mathematics Part 1-NCERT",
    [
      "Relations and Functions",
      "Inverse Trigonometric Functions",
      "Matrices",
      "Determinants",
      "Continuity and Differentiability",
      "Application of Derivatives",
    ],
  ],
  [
    "12-Mathematics Part 2-NCERT",
    [
      "Integrals",
      "Application of Integrals",
      "Differential Equations",
      "Vector Algebra",
      "Three Dimensional Geometry",
      "Linear Programming",
      "Probability",
    ],
  ],

  [
    "11-Urdu-NCERT",
    [
      "तारीख़",
      "अदब का मअनी",
      "उर्दू ज़बान की तारीख़",
      "दास्तान",
      "अफ़साना",
      "ड्रामा",
      "ग़ज़ल",
      "नज़्म",
      "मर्सिया",
      "रुबाई",
      "क़िता",
      "ख़ुत्बा",
      "मसनवी",
      "अल्लामा इक़बाल",
      "मिर्ज़ा ग़ालिब",
      "मीर अनीस",
    ],
  ],
  [
    "12-Urdu-NCERT",
    [
      "नक़्क़ाद",
      "नवाए उर्दू",
      "इल्म की रोशनी",
      "अदब की दुनिया",
      "मिर्ज़ा ग़ालिब",
      "सौदा",
      "मीर",
      "अनीस",
      "मुहसिन काकोरवी",
      "इकबाल",
      "चकबस्त",
      "जोश",
      "फैज़",
    ],
  ],

  [
    "11-Hindi Aroh-NCERT",
    [
      "कबीर",
      "मीरा",
      "राम नरेश त्रिपाठी",
      "सुमित्रानंदन पंत",
      "भवानी प्रसाद मिश्र",
      "त्रिलोचन",
      "दुष्यंत कुमार",
      "निर्मला पुतुल",
      "गजानन माधव मुक्तिबोध",
      "जाबिर हुसैन",
      "कृष्णा सोबती",
      "सत्यजीत राय",
      "बालमुकुंद गुप्त",
      "शेखर जोशी",
      "मन्नू भंडारी",
      "कृष्णनाथ",
    ],
  ],
  [
    "11-Hindi Vitan Part 1-NCERT",
    [
      "भारतीय गायिकाओं में बेजोड़ : लता मंगेशकर",
      "राजस्थान की रजत बूंदें",
      "आलो-आँधारि",
    ],
  ],
  [
    "12-Hindi Antra Part 2-NCERT",
    [
      "जयशंकर प्रसाद",
      "सूर्यकांत त्रिपाठी 'निराला'",
      "सच्चिदानंद हीरानंद वात्स्यायन 'अज्ञेय'",
      "केदारनाथ सिंह",
      "विष्णु खरे",
      "रघुवीर सहाय",
      "प्रेमघन की छाया-स्मृति",
      "सुमेधा की डायरी",
      "सूरदास की झोपड़ी",
      "अरुण कमल",
      "हजारी प्रसाद द्विवेदी",
      "रामचन्द्र शुक्ल",
      "फणीश्वर नाथ रेणु",
      "भीष्म साहनी",
      "असलम",
      "निर्मल वर्मा",
      "अज्ञेय",
    ],
  ],
  [
    "12-Hindi Aroh Part 2-NCERT",
    [
      "हरिवंश राय बच्चन",
      "आलोक धन्वा",
      "कुंवर नारायण",
      "रघुवीर सहाय",
      "गजानन माधव मुक्तिबोध",
      "शमशेर बहादुर सिंह",
      "सूर्यकांत त्रिपाठी 'निराला'",
      "तुलसीदास",
      "फिराक गोरखपुरी",
      "उमाशंकर जोशी",
      "महादेवी वर्मा",
      "जैनेन्द्र कुमार",
      "धर्मवीर भारती",
      "रामविलास शर्मा",
      "हजारी प्रसाद द्विवेदी",
    ],
  ],
  [
    "12-Hindi Vitan Part 2-NCERT",
    ["सिल्वर वैडिंग", "जूझ", "अतीत में दबे पाँव"],
  ],
  ["11-Sanskrit Bhaswati-NCERT", 11],
  ["11-Sanskrit Shashwati-NCERT", 16],
  ["12-Sanskrit-NCERT", 13],
  [
    "11-English Hornbill-NCERT",
    [
      "The Portrait of a Lady",
      "We're Not Afraid to Die... If We Can All Be Together",
      "Discovering Tut: The Saga Continues",
      "Landscape of the Soul",
      "The Ailing Planet: The Green Movement's Role",
      "The Browning Version",
      "The Adventure",
      "Silk Road",
      "A Photograph",
      "The Laburnum Top",
      "The Voice of the Rain",
      "Childhood",
      "Father to Son",
    ],
  ],
  [
    "11-English Snapshots Supplementary Reader-NCERT",
    [
      "The Summer of the Beautiful White Horse",
      "The Address",
      "Ranga's Marriage",
      "Albert Einstein at School",
      "Mother's Day",
      "The Ghat of the Only World",
      "Birth",
      "The Tale of Melon City",
    ],
  ],
  [
    "12-English Vistas-NCERT",
    [
      "The Third Level",
      "The Tiger King",
      "Journey to the End of the Earth",
      "The Enemy",
      "On the Face of It",
      "Memories of Childhood",
    ],
  ],
  [
    "11-Political Science Political Theory-NCERT",
    [
      "Political Theory: An Introduction",
      "Freedom",
      "Equality",
      "Social Justice",
      "Rights",
      "Citizenship",
      "Nationalism",
      "Secularism",
    ],
  ],
  [
    "11-Political Science India Constitution at Work-NCERT",
    [
      "Constitution: Why and How?",
      "Rights in the Indian Constitution",
      "Election and Representation",
      "Executive",
      "Legislature",
      "Judiciary",
      "Federalism",
      "Local Governments",
      "Constitution as a Living Document",
      "The Philosophy of the Constitution",
    ],
  ],
  [
    "12-Political Science Contemporary World Politics-NCERT",
    [
      "The Cold War Era",
      "The End of Bipolarity",
      "New Centres of Power",
      "Contemporary South Asia",
      "International Organisations",
      "Security in the Contemporary World",
      "Globalisation",
    ],
  ],
  [
    "12-Political Science Politics in India Since Independence-NCERT",
    [
      "Challenges of Nation Building",
      "Era of One-Party Dominance",
      "Politics of Planned Development",
      "India’s External Relations",
      "Challenges to and Restoration of the Congress System",
      "The Crisis of Democratic Order",
      "Rise of Popular Movements",
      "Regional Aspirations",
      "Recent Developments in Indian Politics",
    ],
  ],
  [
    "11-History Themes in World History-NCERT",
    [
      "From the Beginning of Time",
      "Writing and City Life",
      "An Empire Across Three Continents",
      "The Central Islamic Lands",
      "Nomadic Empires",
      "The Three Orders",
      "Changing Cultural Traditions",
      "Confrontation of Cultures",
      "The Industrial Revolution",
      "Displacing Indigenous Peoples",
      "Paths to Modernisation",
    ],
  ],
  [
    "12-History Themes in Indian History Part 1-NCERT",
    [
      "The Story of the First Cities: Harappan Archaeology",
      "Political and Economic History: How Inscriptions tell a story",
      "Social Histories: Using the Mahabharata",
      "A History of Buddhism: Sanchi Stupa",
    ],
  ],
  [
    "12-History Themes in Indian History Part 2-NCERT",
    [
      "Through the Eyes of Travellers: Perceptions of Society",
      "Bhakti-Sufi Traditions: Changes in Religious Beliefs and Devotional Texts",
      "An Imperial Capital: Vijayanagara",
      "Agrarian Relations: The Ain-i-Akbari",
    ],
  ],
  [
    "12-History Themes in Indian History Part 3-NCERT",
    [
      "Kings and Chronicles: The Mughal Courts",
      "Colonialism and the Countryside: Exploring Official Archives",
      "Rebels and the Raj: The Revolt of 1857 and its Representations",
      "Mahatma Gandhi and the Nationalist Movement: Civil Disobedience and Beyond",
    ],
  ],

  [
    "11-Geography Fundamental of Physical Geography-NCERT",
    [
      "Geography as a Discipline",
      "The Origin and Evolution of the Earth",
      "Interior of the Earth",
      "Distribution of Oceans and Continents",
      "Minerals and Rocks",
      "Geomorphic Processes",
      "Landforms and their Evolution",
      "Composition and Structure of Atmosphere",
      "Solar Radiation, Heat Balance and Temperature",
      "Atmospheric Circulation and Weather Systems",
      "Water in the Atmosphere",
      "World Climate and Climate Change",
      "Water (Oceans)",
      "Movements of Ocean Water",
    ],
  ],
  [
    "11-Geography Pratical Work in Geography-NCERT",
    [
      "Introduction to Maps",
      "Map Scale",
      "Latitude, Longitude and Time",
      "Map Projections",
      "Topographical Maps",
      "Introduction to Aerial Photographs, Remote Sensing and Geographic Information System",
    ],
  ],
  [
    "11-Geography India Physical Environment-NCERT",
    [
      "Introduction",
      "Structure and Physiography",
      "Drainage System",
      "Climate",
      "Natural Vegetation",
      "Soils",
    ],
  ],
  [
    "12-Geography Fundamentals of Human Geography-NCERT",
    [
      "Human Geography: Nature and Scope",
      "The World Population: Distribution, Density and Growth",
      "Human Development",
      "Primary Activities",
      "Secondary Activities",
      "Tertiary and Quaternary Activities",
      "Transport and Communication",
      "International Trade",
    ],
  ],
  [
    "12-Geography Pratical Work in Geography-NCERT",
    [
      "Data-Its Source and Compilation",
      "Data Processing",
      "Graphical Representation of Data",
      "Use of Computer in Data Processing and Thematic Mapping",
    ],
  ],
  [
    "12-Geography India People And Economy-NCERT",
    [
      "Population: Distribution, Density, Growth and Composition",
      "Migration: Types, Causes and Consequences",
      "Human Development",
      "Human Settlements",
      "Land Resources and Agriculture",
      "Water Resources",
      "Mineral and Energy Resources",
      "Manufacturing Industries",
      "Planning and Sustainable Development in Indian Context",
    ],
  ],

  [
    "11-Economics Indian Economic Development-NCERT",
    [
      "Indian Economy on the Eve of Independence",
      "Indian Economy (1950-1990)",
      "Liberalisation, Privatisation and Globalisation: An Appraisal",
      "Poverty",
      "Human Capital Formation in India",
      "Rural Development",
      "Employment: Growth, Informalisation and other Issues",
      "Infrastructure",
    ],
  ],
  [
    "11-Economics Statistics for Economics-NCERT",
    [
      "Introduction",
      "Collection of Data",
      "Organisation of Data",
      "Presentation of Data",
      "Measures of Central Tendency",
      "Measures of Dispersion",
      "Correlation",
      "Index Numbers",
    ],
  ],
  [
    "12-Economics Introductory Microeconomics-NCERT",
    [
      "Introduction",
      "Theory of Consumer Behaviour",
      "Production and Costs",
      "The Theory of the Firm under Perfect Competition",
      "Market Equilibrium",
    ],
  ],
  [
    "12-Economics Introductory Macroeconomics-NCERT",
    [
      "Introduction",
      "National Income Accounting",
      "Money and Banking",
      "Income and Employment Determination",
      "Government Budget and the Economy",
      "Open-Economy Macroeconomics",
    ],
  ],

  [
    "11-Business Studies-NCERT",
    [
      "Business, Trade and Commerce",
      "Forms of Business Organisations",
      "Private, Public and Global Enterprises",
      "Business Services",
      "Emerging Modes of Business",
      "Social Responsibilities of Business and Business Ethics",
      "Sources of Business Finance",
      "Small Business",
      "Internal Trade",
      "International Business",
    ],
  ],
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
    "11-Home Science Human Ecology and Family Sciences Part 1-NCERT",
    [
      "Introduction to Home Science",
      "Food, Nutrition, Health and Fitness",
      "The Family",
      "The Family Life Cycle",
      "The Family and its Resources",
      "The World of the Young Child",
      "Adolescence",
    ],
  ],
  [
    "11-Home Science Human Ecology and Family Sciences Part 2-NCERT",
    [
      "The World of Work",
      "Fabrics",
      "Clothing",
      "Care and Maintenance of Fabrics and Apparels",
    ],
  ],
  [
    "12-Home Science Human Ecology and Family Sciences Part 1-NCERT",
    [
      "Work, Livelihood and Career",
      "Clinical Nutrition and Dietetics",
      "Public Nutrition and Health",
      "Food Processing and Technology",
      "Catering and Food Service Management",
      "Hospitality Management",
      "Institutional Management",
    ],
  ],
  [
    "12-Home Science Human Ecology and Family Sciences Part 2-NCERT",
    [
      "Early Childhood Care and Education",
      "Fashion Design and Merchandising",
      "Mass Communication and Entertainment",
      "Designing, Planning and Organising Events",
    ],
  ],

  [
    "11-Informatics Practices-NCERT",
    [
      "Computer System",
      "Emerging Trends",
      "Introduction to Problem Solving",
      "Getting Started with Python",
      "Python Fundamentals",
      "Data Handling",
      "Conditional and Looping Constructs",
      "Strings in Python",
    ],
  ],
  [
    "12-Informatics Practices-NCERT",
    [
      "Python Pandas - I",
      "Python Pandas - II",
      "Introduction to Plotting",
      "SQL Commands",
      "SQL Functions",
      "Database and Management System",
      "Society, Law and Ethics",
    ],
  ],
  [
    "11-Computer Science-NCERT",
    [
      "Computer Systems",
      "Encoding Schemes and Number System",
      "Emerging Trends",
      "Introduction to Problem Solving",
      "Getting Started with Python",
      "Python Fundamentals",
      "Data Handling",
      "Conditional and Looping Constructs",
      "Strings",
      "Lists",
      "Tuples and Dictionaries",
    ],
  ],
  [
    "12-Computer Science-NCERT",
    [
      "Review of Python",
      "Functions",
      "File Handling",
      "Data Structure: Stacks and Queues",
      "Computer Networks",
      "Database Concepts",
      "Structured Query Language",
      "Society, Law and Ethics",
    ],
  ],
  [
    "11-Biotechnology-NCERT",
    [
      "Biotechnology - Principles and Processes",
      "Genetic Engineering",
      "Bioethics",
      "Bioprocessing",
      "Applications of Biotechnology",
    ],
  ],
  [
    "12-Biotechnology-NCERT",
    [
      "Introduction",
      "Recombinant DNA Technology",
      "Protein Structure and Engineering",
      "Genomics",
      "Bioethics",
      "Biosafety",
      "Intellectual Property Rights",
      "Biotechnology in Agriculture",
      "Biotechnology in Health",
      "Biotechnology in Environment",
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
    "11-Psychology-NCERT",
    [
      "What is Psychology?",
      "Methods of Enquiry in Psychology",
      "The Bases of Human Behaviour",
      "Human Development",
      "Sensory, Attentional and Perceptual Processes",
      "Learning",
      "Human Memory",
      "Motivation and Emotion",
    ],
  ],
  [
    "12-Psychology-NCERT",
    [
      "Psychological Attributes",
      "Self and Personality",
      "Meeting Life Challenges",
      "Psychological Disorders",
      "Therapeutic Approaches and Counselling",
      "Attitude and Social Cognition",
      "Social Influence and Group Processes",
    ],
  ],

  [
    "11-Sociology Introducing Sociology-NCERT",
    [
      "Sociology and Society",
      "Terms, Concepts and their Use in Sociology",
      "Understanding Social Institutions",
      "Culture and Socialisation",
      "Doing Sociology: Research Methods",
    ],
  ],
  [
    "11-Sociology Understanding Society-NCERT",
    [
      "Social Structure, Stratification and Social Processes in Society",
      "Social Change and Social Order in Rural and Urban Society",
      "Environment and Society",
      "Western Sociologists: A Theoretical Perspective",
      "Indian Sociologists: A Theoretical Perspective",
    ],
  ],
  [
    "12-Sociology Indian Society-NCERT",
    [
      "The Demographic Structure of the Indian Society",
      "Social Institutions: Continuity and Change",
      "The Market as a Social Institution",
      "The Pattern of Social Inequality and Exclusion",
      "Challenges of Cultural Diversity",
      "The Binders of a Nation",
    ],
  ],
  [
    "12-Sociology Social Change and Development in India-NCERT",
    [
      "Structural Change",
      "Cultural Change",
      "The Story of Indian Democracy at Work",
      "Change and Development in Rural Society",
      "Change and Development in Industrial Society",
      "Globalisation and Social Change",
      "Social Movements",
    ],
  ],

  [
    "11-Accountancy Part 1-NCERT",
    [
      "Introduction to Accounting",
      "Theory Base of Accounting",
      "Recording of Transactions-I",
      "Recording of Transactions-II",
      "Bank Reconciliation Statement",
    ],
  ],
  [
    "11-Accountancy Part 2-NCERT",
    [
      "Trial Balance and Errors",
      "Depreciation, Provisions and Reserves",
      "Accounting for Bills of Exchange",
      "Financial Statements-I",
    ],
  ],
  [
    "12-Computerised Accounting System-NCERT",
    [
      "Introduction to Computerised Accounting System",
      "Accounting Application of Electronic Spreadsheet",
      "Using Computerised Accounting System",
      "Database Management System for Accounting",
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
  ["11-Mathematics-CBSE", 6],
  ["12-Mathematics-CBSE", 3],

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
    
  // Use the new dynamic topic options function
  const topicOptions = getTopicOptions(currentClass);

  const chapterOptions = generateChapterOptions(
    currentClass,
    currentSubject,
    currentSyllabus
  );

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
      placeholder: "Select Topic ...",
      type: "select",
      // Dynamically set options based on currentClass
      options: topicOptions,
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-6",
      // NOTE: A getValueCallback is often required here to set the currentTopic state 
      // and reset dependent fields, but is omitted to "keep all function as it is"
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
                return true;
              }

              const numChapterFrom = parseInt(chapter_from);
              const numChapterTo = parseInt(chapter_to);

              if (!isNaN(numChapterFrom) && !isNaN(numChapterTo)) {
                return numChapterTo >= numChapterFrom;
              }

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

                if (indexFrom !== -1 && indexTo !== -1) {
                  return indexTo >= indexFrom;
                }
              }

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
