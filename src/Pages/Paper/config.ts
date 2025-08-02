import * as yup from "yup";

const options = [
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 15, label: "15" },
  { value: 20, label: "20" },
];

const classoptions = [
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
  { value: 10, label: "10" },
  { value: 11, label: "11" },
  { value: 12, label: "12" },
];

// Define the dynamic subject options based on class
const dynamicSubjectOptions = {
  "6": [
    { value: "English", label: "English" },
    { value: "Hindi", label: "Hindi" },
    { value: "Mathematics", label: "Mathematics" },
    { value: "Science", label: "Science" },
    { value: "Social Science", label: "Social Science" },
    { value: "Urdu", label: "Urdu" },
    { value: "Sanskrit", label: "Sanskrit" },
  ],
  "7": [
    { value: "English", label: "English" },
    { value: "Hindi", label: "Hindi" },
    { value: "Mathematics", label: "Mathematics" },
    { value: "Science", label: "Science" },
    { value: "Social Science", label: "Social Science" },
    { value: "Urdu", label: "Urdu" },
    { value: "Sanskrit", label: "Sanskrit" },
  ],
  "8": [
    { value: "English It So Happened", label: "English It So Happened" },
    { value: "English HoneyDew", label: "English HoneyDew" },
    { value: "Hindi", label: "Hindi" },
    { value: "Mathematics", label: "Mathematics" },
    { value: "Science", label: "Science" },
    { value: "Political Science", label: "Political Science" },
    { value: "History", label: "History" },
    { value: "Geography", label: "Geography" },
    { value: "Urdu", label: "Urdu" },
    { value: "Sanskrit", label: "Sanskrit" },
  ],
  "9": [
    { value: "English Beehive", label: "English Beehive" },
    {
      value: "English Moments Supplementary Reader",
      label: "English Moments Supplementary Reader",
    },
    {
      value: "English Words and Expressions 1",
      label: "English Words and Expressions 1",
    },
    { value: "Hindi Kshitij", label: "Hindi Kshitij" },
    { value: "Hindi Sprash", label: "Hindi Sprash" },
    { value: "Hindi Kritika", label: "Hindi Kritika" },
    { value: "Hindi Sanchayan", label: "Hindi Sanchayan" },
    { value: "Mathematics", label: "Mathematics" },
    { value: "Science", label: "Science" },
    { value: "Political Science", label: "Political Science" },
    { value: "History", label: "History" },
    { value: "Geography", label: "Geography" },
    { value: "Economics", label: "Economics" },
    { value: "Urdu", label: "Urdu" },
    { value: "Sanskrit Shemushi Prathmo", label: "Sanskrit Shemushi Prathmo" },
    { value: "Sanskrit Vyakranavithi", label: "Sanskrit Vyakranavithi" },
    { value: "Sanskrit Abhyaswaan Bhav", label: "Sanskrit Abhyaswaan Bhav" },
    {
      value: "Information and Communication Technology",
      label: "Information and Communication Technology",
    },
  ],
  "10": [
    { value: "English First Flight", label: "English First Flight" },
    {
      value: "English Foot Prints Without Feet",
      label: "English Foot Prints Without Feet",
    },
    {
      value: "English Words and Expressions 2",
      label: "English Words and Expressions 2",
    },
    { value: "Hindi Kshitij", label: "Hindi Kshitij" },
    { value: "Hindi Sprash", label: "Hindi Sprash" },
    { value: "Hindi Kritika", label: "Hindi Kritika" },
    { value: "Hindi Sanchayan", label: "Hindi Sanchayan" },
    { value: "Mathematics", label: "Mathematics" },
    { value: "Science", label: "Science" },
    { value: "Political Science", label: "Political Science" },
    { value: "History", label: "History" },
    { value: "Geography", label: "Geography" },
    { value: "Economics", label: "Economics" },
    { value: "Urdu", label: "Urdu" },
    { value: "Sanskrit Shemushi Part 2", label: "Sanskrit Shemushi Prathmo" },
    { value: "Sanskrit Vyakranavithi", label: "Sanskrit Vyakranavithi" },
    { value: "Sanskrit Abhyaswaan Bhav", label: "Sanskrit Abhyaswaan Bhav" },
  ],
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
  ["6-Mathematics-NCERT", [
    "Knowing Our Numbers",
    "Whole Numbers",
    "Playing with Numbers",
    "Basic Geometrical Ideas",
    "Understanding Elementary Shapes",
    "Integers",
    "Fractions",
    "Decimals",
    "Data Handling",
    "Mensuration",
    "Algebra",
    "Ratio and Proportion",
    "Symmetry",
    "Practical Geometry"
  ]],
  ["7-Mathematics-NCERT", [
    "Integers",
    "Fractions and Decimals",
    "Data Handling",
    "Simple Equations",
    "Lines and Angles",
    "The Triangle and its Properties",
    "Congruence of Triangles",
    "Comparing Quantities",
    "Rational Numbers",
    "Practical Geometry",
    "Perimeter and Area",
    "Algebraic Expressions",
    "Exponents and Powers",
    "Symmetry",
    "Visualising Solid Shapes"
  ]],
  ["8-Mathematics-NCERT", [
    "Rational Numbers",
    "Linear Equations in One Variable",
    "Understanding Quadrilaterals",
    "Practical Geometry",
    "Data Handling",
    "Squares and Square Roots",
    "Cubes and Cube Roots",
    "Comparing Quantities",
    "Algebraic Expressions and Identities",
    "Visualising Solid Shapes",
    "Mensuration",
    "Exponents and Powers",
    "Direct and Inverse Proportions",
    "Factorisation",
    "Introduction to Graphs",
    "Playing with Numbers"
  ]],
  ["9-Mathematics-NCERT", [
    "Number Systems",
    "Polynomials",
    "Coordinate Geometry",
    "Linear Equations in Two Variables",
    "Introduction to Euclid’s Geometry",
    "Lines and Angles",
    "Triangles",
    "Quadrilaterals",
    "Areas of Parallelograms and Triangles",
    "Circles",
    "Constructions",
    "Heron’s Formula",
    "Surface Areas and Volumes",
    "Statistics",
    "Probability"
  ]],
  ["10-Mathematics-NCERT", [
    "Real Numbers",
    "Polynomials",
    "Pair of Linear Equations in Two Variables",
    "Quadratic Equations",
    "Arithmetic Progressions",
    "Triangles",
    "Coordinate Geometry",
    "Introduction to Trigonometry",
    "Some Applications of Trigonometry",
    "Circles",
    "Areas Related to Circles",
    "Surface Areas and Volumes",
    "Statistics",
    "Probability"
  ]],
  ["11-Mathematics-NCERT", [
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
    "Probability"
  ]],
  ["12-Mathematics Part 1-NCERT", [
    "Relations and Functions",
    "Inverse Trigonometric Functions",
    "Matrices",
    "Determinants",
    "Continuity and Differentiability",
    "Application of Derivatives"
  ]],
  ["12-Mathematics Part 2-NCERT", [
    "Integrals",
    "Application of Integrals",
    "Differential Equations",
    "Vector Algebra",
    "Three Dimensional Geometry",
    "Linear Programming",
    "Probability"
  ]],
  
  ["6-Urdu-NCERT", 14],
  ["7-Urdu-NCERT", 14],
  ["8-Urdu-NCERT", 22],
  ["9-Urdu-NCERT", 12],
  ["10-Urdu-NCERT", 14],
  ["11-Urdu-NCERT", 16],
  ["12-Urdu-NCERT", 13],
  ["6-Hindi-NCERT", 13],
  ["7-Hindi-NCERT", 10],
  ["8-Hindi-NCERT", 13],
  ["9-Hindi Kshitij-NCERT", 13],
  ["9-Hindi Sprash-NCERT", 10],
  ["9-Hindi Kritika-NCERT", 3],
  ["9-Hindi Sanchayan-NCERT", 4],
  ["10-Hindi Kshitij-NCERT", 12],
  ["10-Hindi Sprash-NCERT", 14],
  ["10-Hindi Kritika-NCERT", 3],
  ["10-Hindi Sanchayan-NCERT", 3],
  ["11-Hindi Antra Part 1-NCERT", 16],
  ["11-Hindi Aroh-NCERT", 16],
  ["11-Hindi Vitan Part 1-NCERT", 5],
  ["12-Hindi Antra Part 2-NCERT", 17],
  ["12-Hindi Aroh Part 2-NCERT", 15],
  ["12-Hindi Vitan Part 2-NCERT", 3],
  ["6-Sanskrit-NCERT", 16],
  ["7-Sanskrit-NCERT", 15],
  ["8-Sanskrit-NCERT", 14],
  ["9-Sanskrit Shemushi Prathmo-NCERT", 10],
  ["9-Sanskrit Vyakranavithi-NCERT", 12],
  ["9-Sanskrit Abhyaswaan Bhav-NCERT", 12],
  ["10-Sanskrit Shemushi Part 2-NCERT", 10],
  ["10-Sanskrit Vyakranavithi-NCERT", 12],
  ["10-Sanskrit Abhyaswaan Bhav-NCERT", 14],
  ["11-Sanskrit Bhaswati-NCERT", 11],
  ["11-Sanskrit Shashwati-NCERT", 16],
  ["12-Sanskrit-NCERT", 13],
  ["6-English-NCERT", [
    "Who Did Patrick’s Homework?",
    "How the Dog Found Himself a New Master!",
    "Taro’s Reward",
    "An Indian-American Woman in Space: Kalpana Chawla",
    "A Different Kind of School",
    "Who I Am",
    "Fair Play",
    "Vocation"
  ],],
  ["7-English-NCERT", [
    "Three Questions",
    "A Gift of Chappals",
    "Gopal and the Hilsa Fish",
    "The Ashes that Made Trees Bloom",
    "Quality",
    "Expert Detectives",
    "The Invention of Vita-Wonk",
    "Fire: Friend and Foe",
    "A Bicycle in Good Repair",
    "The Story of Cricket"
  ],],
  ["8-English HoneyDew-NCERT", [
    "The Best Christmas Present in the World",
    "The Tsunami",
    "Glimpses of the Past",
    "Bepin Choudhury’s Lapse of Memory",
    "The Summit Within",
    "This is Jody’s Fawn",
    "A Visit to Cambridge",
    "A Short Monsoon Diary"
  ],],
  ["8-English It So Happened-NCERT", [
    "How the Camel Got His Hump",
    "Children at Work",
    "The Selfish Giant",
    "The Treasure Within",
    "Princess September",
    "The Fight",
    "The Open Window",
    "Jalebis"
  ],],
  ["9-English Beehive-NCERT", [
    "The Fun They Had",
    "The Sound of Music",
    "The Little Girl",
    "A Truly Beautiful Mind",
    "The Snake and the Mirror",
    "My Childhood",
    "Packing",
    "Reach for the Top",
    "The Bond of Love"
  ],],
  ["9-English Moments Supplementary Reader-NCERT", [
    "The Lost Child",
    "The Adventures of Toto",
    "Iswaran the Storyteller",
    "In the Kingdom of Fools",
    "The Happy Prince",
    "Weathering the Storm in Ersama",
    "The Last Leaf",
    "A House Is Not a Home",
    "The Accidental Tourist"
  ],],
  
  ["9-English Words and Expressions 1-NCERT", 9], // This is a workbook, so a numerical count is appropriate
  
  ["10-English First Flight-NCERT", [
    "A Letter to God",
    "Nelson Mandela: Long Walk to Freedom",
    "Two Stories about Flying",
    "From the Diary of Anne Frank",
    "The Hundred Dresses–I",
    "The Hundred Dresses–II",
    "Glimpses of India",
    "Mijbil the Otter",
    "Madam Rides the Bus"
  ],],
  ["10-English Foot Prints Without Feet-NCERT", [
    "A Triumph of Surgery",
    "The Thief’s Story",
    "The Midnight Visitor",
    "A Question of Trust",
    "Footprints without Feet",
    "The Making of a Scientist",
    "The Necklace",
    "The Hack Driver",
    "Bholi"
  ],],
  ["10-English Words and Expressions 2-NCERT", 9], // This is a workbook, so a numerical count is appropriate
  ["11-English Woven Words-NCERT", [
    "The Lament",
    "A Pair of Mustachios",
    "The Rocking-horse Winner",
    "The Adventure of the Three Garridebs",
    "Pappachi's Moth",
    "The Third and Final Continent",
    "Glory at Twilight",
    "The Luncheon",
    "The Peacock",
    "Let Me Not to the Marriage of True Minds",
    "Coming",
    "Telephone Conversation",
    "The World is too Much with Us",
    "Mother Tongue",
    "Hawk Roosting",
    "For Elkana",
    "My Watch",
    "My First Steps",
    "The Story",
    "The Watcher",
    "My Mother",
    "The Road to Peace"
  ],],
  ["11-English Hornbill-NCERT", [
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
    "Father to Son"
  ],],
  ["11-English Snapshots Supplementary Reader-NCERT", [
    "The Summer of the Beautiful White Horse",
    "The Address",
    "Ranga's Marriage",
    "Albert Einstein at School",
    "Mother's Day",
    "The Ghat of the Only World",
    "Birth",
    "The Tale of Melon City"
  ],],
  ["12-English Vistas-NCERT", [
    "The Third Level",
    "The Tiger King",
    "Journey to the End of the Earth",
    "The Enemy",
    "On the Face of It",
    "Memories of Childhood"
  ],],
  ["6-Science-NCERT", [
      "Food: Where Does It Come From?",
      "Components of Food",
      "Fibre to Fabric",
      "Sorting Materials into Groups",
      "Separation of Substances",
      "Changes Around Us",
      "Getting to Know Plants",
      "Body Movements",
      "The Living Organisms and Their Surroundings",
      "Motion and Measurement of Distances",
      "Light, Shadows and Reflections",
      "Electricity and Circuits",
      "Fun with Magnets",
      "Water",
      "Air Around Us",
      "Garbage In, Garbage Out",
    ]],
  ["7-Science-NCERT", [
      "Nutrition in Plants",
      "Nutrition in Animals",
      "Fibre to Fabric",
      "Heat",
      "Acids, Bases and Salts",
      "Physical and Chemical Changes",
      "Weather, Climate and Adaptations of Animals to Climate",
      "Winds, Storms and Cyclones",
      "Soil",
      "Respiration in Organisms",
      "Transportation in Animals and Plants",
      "Reproduction in Plants",
      "Motion and Time",
      "Electric Current and Its Effects",
      "Light",
      "Water: A Precious Resource",
      "Forests: Our Lifeline",
      "Wastewater Story",
    ]],
  ["8-Science-NCERT", [
      "Crop Production and Management",
      "Microorganisms: Friend and Foe",
      "Synthetic Fibres and Plastics",
      "Materials: Metals and Non-Metals",
      "Coal and Petroleum",
      "Combustion and Flame",
      "Conservation of Plants and Animals",
      "Cell – Structure and Functions",
      "Reproduction in Animals",
      "Reaching the Age of Adolescence",
      "Force and Pressure",
      "Friction",
      "Sound",
      "Chemical Effects of Electric Current",
      "Some Natural Phenomena",
      "Light",
      "Stars and the Solar System",
      "Pollution of Air and Water",
    ]],
  ["9-Science-NCERT", [
      "Matter in Our Surroundings",
      "Is Matter Around Us Pure?",
      "Atoms and Molecules",
      "Structure of the Atom",
      "The Fundamental Unit of Life",
      "Tissues",
      "Motion",
      "Force and Laws of Motion",
      "Gravitation",
      "Work and Energy",
      "Sound",
      "Improvement in Food Resources",
    ]],
  ["10-Science-NCERT", [
      "Chemical Reactions and Equations",
      "Acids, Bases and Salts",
      "Metals and Non-metals",
      "Carbon and its Compounds",
      "Life Processes",
      "Control and Coordination",
      "How do Organisms Reproduce?",
      "Heredity",
      "Light – Reflection and Refraction",
      "Human Eye and Colourful World",
      "Electricity",
      "Magnetic Effects of Electric Current",
      "Our Environment",
    ]],
  ["6-Social Science-NCERT", 14],
  ["7-Social Science-NCERT", 12],
  ["9-Information and Communication Technology-NCERT", 8],
  ["8-Political Science-NCERT", [
    "The Indian Constitution",
    "Understanding Secularism",
    "Why Do We Need a Parliament?",
    "Understanding Laws",
    "Judiciary",
    "Understanding Our Criminal Justice System",
    "Understanding Marginalisation",
    "Confronting Marginalisation",
    "Public Facilities",
    "Law and Social Justice"
  ]],
  ["9-Political Science-NCERT", [
    "What is Democracy? Why Democracy?",
    "Constitutional Design",
    "Electoral Politics",
    "Working of Institutions",
    "Democratic Rights"
  ]],
  ["10-Political Science-NCERT", [
    "Power-sharing",
    "Federalism",
    "Gender, Religion and Caste",
    "Political Parties",
    "Outcomes of Democracy"
  ]],
  ["11-Political Science Political Theory-NCERT", [
    "Political Theory: An Introduction",
    "Freedom",
    "Equality",
    "Social Justice",
    "Rights",
    "Citizenship",
    "Nationalism",
    "Secularism"
  ]],
  ["11-Political Science India Constitution at Work-NCERT", [
    "Constitution: Why and How?",
    "Rights in the Indian Constitution",
    "Election and Representation",
    "Executive",
    "Legislature",
    "Judiciary",
    "Federalism",
    "Local Governments",
    "Constitution as a Living Document",
    "The Philosophy of the Constitution"
  ]],
  ["12-Political Science Contemporary World Politics-NCERT", [
    "The Cold War Era",
    "The End of Bipolarity",
    "New Centres of Power",
    "Contemporary South Asia",
    "International Organisations",
    "Security in the Contemporary World",
    "Globalisation"
  ]],
  ["12-Political Science Politics in India Since Independence-NCERT", [
    "Challenges of Nation Building",
    "Era of One-Party Dominance",
    "Politics of Planned Development",
    "India’s External Relations",
    "Challenges to and Restoration of the Congress System",
    "The Crisis of Democratic Order",
    "Rise of Popular Movements",
    "Regional Aspirations",
    "Recent Developments in Indian Politics"
  ]],
  ["8-History-NCERT", [
    "How, When and Where",
    "From Trade to Territory",
    "Ruling the Countryside",
    "Tribals, Dikus and the Vision of a Golden Age",
    "When People Rebel 1857 and After",
    "Weavers, Iron Smelters and Factory Owners",
    "Civilising the 'Native', Educating the Nation",
    "Women, Caste and Reform",
    "The Making of the National Movement: 1870s–1947",
    "India After Independence"
  ]],
  ["9-History-NCERT", [
    "The French Revolution",
    "Socialism in Europe and the Russian Revolution",
    "Nazism and the Rise of Hitler",
    "Forest Society and Colonialism",
    "Pastoralists in the Modern World"
  ]],
  ["10-History-NCERT", [
    "The Rise of Nationalism in Europe",
    "Nationalism in India",
    "The Making of a Global World",
    "The Age of Industrialisation",
    "Print Culture and the Modern World"
  ]],
  ["11-History Themes in World History-NCERT", [
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
    "Paths to Modernisation"
  ]],
  ["12-History Themes in Indian History Part 1-NCERT", [
    "The Story of the First Cities: Harappan Archaeology",
    "Political and Economic History: How Inscriptions tell a story",
    "Social Histories: Using the Mahabharata",
    "A History of Buddhism: Sanchi Stupa"
  ]],
  ["12-History Themes in Indian History Part 2-NCERT", [
    "Through the Eyes of Travellers: Perceptions of Society",
    "Bhakti-Sufi Traditions: Changes in Religious Beliefs and Devotional Texts",
    "An Imperial Capital: Vijayanagara",
    "Agrarian Relations: The Ain-i-Akbari"
  ]],
  ["12-History Themes in Indian History Part 3-NCERT", [
    "Kings and Chronicles: The Mughal Courts",
    "Colonialism and the Countryside: Exploring Official Archives",
    "Rebels and the Raj: The Revolt of 1857 and its Representations",
    "Mahatma Gandhi and the Nationalist Movement: Civil Disobedience and Beyond"
  ]],
  
 ["8-Geography-NCERT", [
    "Resources",
    "Land, Soil, Water, Natural Vegetation and Wildlife Resources",
    "Agriculture",
    "Industries",
    "Human Resources"
  ]],
  ["9-Geography-NCERT", [
    "India - Size and Location",
    "Physical Features of India",
    "Drainage",
    "Climate",
    "Natural Vegetation and Wildlife"
  ]],
  ["10-Geography-NCERT", [
    "Resources and Development",
    "Forest and Wildlife Resources",
    "Water Resources",
    "Agriculture",
    "Minerals and Energy Resources",
    "Manufacturing Industries",
    "Lifelines of National Economy"
  ]],
  ["11-Geography Fundamental of Physical Geography-NCERT", [
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
    "Movements of Ocean Water"
  ]],
  ["11-Geography Pratical Work in Geography-NCERT", [
    "Introduction to Maps",
    "Map Scale",
    "Latitude, Longitude and Time",
    "Map Projections",
    "Topographical Maps",
    "Introduction to Aerial Photographs, Remote Sensing and Geographic Information System"
  ]],
  ["11-Geography India Physical Environment-NCERT", [
    "Introduction",
    "Structure and Physiography",
    "Drainage System",
    "Climate",
    "Natural Vegetation",
    "Soils"
  ]],
  ["12-Geography Fundamentals of Human Geography-NCERT", [
    "Human Geography: Nature and Scope",
    "The World Population: Distribution, Density and Growth",
    "Human Development",
    "Primary Activities",
    "Secondary Activities",
    "Tertiary and Quaternary Activities",
    "Transport and Communication",
    "International Trade"
  ]],
  ["12-Geography Pratical Work in Geography-NCERT", [
    "Data-Its Source and Compilation",
    "Data Processing",
    "Graphical Representation of Data",
    "Use of Computer in Data Processing and Thematic Mapping"
  ]],
  ["12-Geography India People And Economy-NCERT", [
    "Population: Distribution, Density, Growth and Composition",
    "Migration: Types, Causes and Consequences",
    "Human Development",
    "Human Settlements",
    "Land Resources and Agriculture",
    "Water Resources",
    "Mineral and Energy Resources",
    "Manufacturing Industries",
    "Planning and Sustainable Development in Indian Context"
  ]],

  
  ["9-Economics-NCERT", [
    "The Story of Village Palampur",
    "People as Resource",
    "Poverty as a Challenge",
    "Food Security in India"
  ]],
  ["10-Economics-NCERT", [
    "Development",
    "Sectors of the Indian Economy",
    "Money and Credit",
    "Globalisation and the Indian Economy",
    "Consumer Rights"
  ]],
  ["11-Economics Indian Economic Development-NCERT", [
    "Indian Economy on the Eve of Independence",
    "Indian Economy (1950-1990)",
    "Liberalisation, Privatisation and Globalisation: An Appraisal",
    "Poverty",
    "Human Capital Formation in India",
    "Rural Development",
    "Employment: Growth, Informalisation and other Issues",
    "Infrastructure"
  ]],
  ["11-Economics Statistics for Economics-NCERT", [
    "Introduction",
    "Collection of Data",
    "Organisation of Data",
    "Presentation of Data",
    "Measures of Central Tendency",
    "Measures of Dispersion",
    "Correlation",
    "Index Numbers"
  ]],
  ["12-Economics Introductory Microeconomics-NCERT", [
    "Introduction",
    "Theory of Consumer Behaviour",
    "Production and Costs",
    "The Theory of the Firm under Perfect Competition",
    "Market Equilibrium"
  ]],
  ["12-Economics Introductory Macroeconomics-NCERT", [
    "Introduction",
    "National Income Accounting",
    "Money and Banking",
    "Income and Employment Determination",
    "Government Budget and the Economy",
    "Open-Economy Macroeconomics"
  ]],
  
  ["11-Business Studies-NCERT", [
    "Business, Trade and Commerce",
    "Forms of Business Organisations",
    "Private, Public and Global Enterprises",
    "Business Services",
    "Emerging Modes of Business",
    "Social Responsibilities of Business and Business Ethics",
    "Sources of Business Finance",
    "Small Business",
    "Internal Trade",
    "International Business"
  ]],
  ["12-Business Studies Part 1-NCERT", [
    "Nature and Significance of Management",
    "Principles of Management",
    "Business Environment",
    "Planning",
    "Organising",
    "Staffing",
    "Directing",
    "Controlling"
  ]],
  ["12-Business Studies Part 2-NCERT", [
    "Financial Management",
    "Financial Markets",
    "Marketing Management",
    "Consumer Protection"
  ]],
  ["11-Home Science Human Ecology and Family Sciences Part 1-NCERT", 7],
  ["11-Home Science Human Ecology and Family Sciences Part 2-NCERT", 4],
  ["12-Home Science Human Ecology and Family Sciences Part 1-NCERT", 7],
  ["12-Home Science Human Ecology and Family Sciences Part 2-NCERT", 4],
  ["11-Informatics Practices-NCERT", 8],
  ["12-Informatics Practices-NCERT", 7],
  ["11-Computer Science-NCERT", 11],
  ["12-Computer Science-NCERT", 13],
  ["11-Biotechnology-NCERT", 12],
  ["12-Biotechnology-NCERT", 13],
  ["11-Physics Part 1-NCERT", 7],
  ["11-Physics Part 2-NCERT", 7],
  ["12-Physics Part 1-NCERT", 8],
  ["12-Physics Part 2-NCERT", 6],
  ["11-Chemistry Part 1-NCERT", 6],
  ["11-Chemistry Part 2-NCERT", 3],
  ["12-Chemistry Part 1-NCERT", 5],
  ["12-Chemistry Part 2-NCERT", 5],
  ["11-Biology-NCERT", 19],
  ["12-Biology-NCERT", 13],
  ["11-Psychology-NCERT", 8],
  ["12-Psychology-NCERT", 7],
  ["11-Sociology Introducing Sociology-NCERT", 5],
  ["11-Sociology Understanding Society-NCERT", 5],
  ["12-Sociology Indian Society-NCERT", 7],
  ["12-Sociology Social Change and Development in India-NCERT", 8],
  ["11-Financial Accounting-NCERT", 7],
  ["11-Accountancy-NCERT", 2],
  ["12-Computerised Accounting System-NCERT", 4],
  ["12-Accountancy-NCERT", 4],
  ["6-Mathematics-CBSE", 0],
  ["7-Mathematics-CBSE", 3],
  ["8-Mathematics-CBSE", 3],
  ["9-Mathematics-CBSE", 2],
  ["10-Mathematics-CBSE", 4],
  ["11-Mathematics-CBSE", 6],
  ["12-Mathematics-CBSE", 3],
  ["7-Science-Default", 15],
  ["7-Geography-Default", 10],
  ["7-Economics-Default", 8],
  ["8-Physics-Default", 12],
  ["8-Chemistry-Default", 11],
  ["8-Biology-Default", 13],
  ["6-English-Default", 10],
  ["6-Hindi-Default", 10],
  ["6-Mathematics-Default", 10],
  ["7-Math-State Board", 15],
  ["8-English-Default", 25],
  ["9-Social Studies-Default", 12],
]);

const generateChapterOptions = (selectedClass, subject, syllabus) => {
  let key;

  if (syllabus) {
    key = `${selectedClass}-${subject}-${syllabus}`;
  } else {
    key = `${selectedClass}-${subject || "Default"}-Default`;
  }

  const chapterData = chapterCounts.get(key);

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
  childrenListData
) => {
  const subjectOptionsForClass =
    dynamicSubjectOptions[currentClass] || dynamicSubjectOptions["default"];

  const chapterOptions = generateChapterOptions(
    currentClass,
    currentSubject,
    currentSyllabus
  );

  const classOptions =
    childrenListData?.map((item) => {
      const numericGrade = item?.grade?.match(/\d+/)?.[0] || "";
      return {
        value: numericGrade,
        label: numericGrade,
      };
    }) || [];

  return [
    {
      name: "class",
      label: "Class",
      placeholder: "Class ...",
      type: "select",
      options: classOptions,
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
      name: "subject",
      label: "Subject",
      placeholder: "Select Subject ...",
      type: "select",
      autoFocus: true,
      options: subjectOptionsForClass,
      wrapperClassName: "mb-6",
      fieldWrapperClassName: "col-span-12",
      className: "mobile-select-no-keyboard",
      getValueCallback: (value) => setCurrentSubject(value),
      disabled: !currentClass || subjectOptionsForClass.length === 0,
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
    language: yup.string().required("this_field_required"),
    chapter_from: yup.string().required("this_field_required"),
    chapter_to: yup.string().when('chapter_from', {
      is: (chapter_from) => chapter_from,
      then: (schema) =>
        schema
          .required("this_field_required")
          .test(
            "is-greater-or-equal",
            "Chapter to cannot be less than Chapter from",
            function (chapter_to) {
              const { chapter_from, subject, class: classValue, syllabus } = this.parent;
              
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
      otherwise: (schema) => schema.required("this_field_required"),
    }),
    syllabus: yup.string().required("this_field_required"),
    subject: yup.string().required("this_field_required"),
    no_of_question: yup.string().required("this_field_required"),
    class: yup.string().required("this_field_required"),
  })
  .required();
