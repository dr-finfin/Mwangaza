// ============================================================
// MWANGAZA CURRICULUM DATA — KICD CBE Aligned
// Grades 1–9 | All Core Subjects
// ============================================================

export const GRADES = [
  { id: 1, label: 'Grade 1', emoji: '🌱', color: 'from-emerald-400 to-emerald-600' },
  { id: 2, label: 'Grade 2', emoji: '🌿', color: 'from-teal-400 to-teal-600' },
  { id: 3, label: 'Grade 3', emoji: '🌳', color: 'from-cyan-400 to-cyan-600' },
  { id: 4, label: 'Grade 4', emoji: '⭐', color: 'from-blue-400 to-blue-600' },
  { id: 5, label: 'Grade 5', emoji: '🌟', color: 'from-indigo-400 to-indigo-600' },
  { id: 6, label: 'Grade 6', emoji: '🚀', color: 'from-violet-400 to-violet-600' },
  { id: 7, label: 'Grade 7', emoji: '💡', color: 'from-purple-400 to-purple-600' },
  { id: 8, label: 'Grade 8', emoji: '🔬', color: 'from-fuchsia-400 to-fuchsia-600' },
  { id: 9, label: 'Grade 9', emoji: '🏆', color: 'from-rose-400 to-rose-600' },
]

export const SUBJECTS = {
  1: [
    { id: 'math-1', name: 'Mathematics',              kiswahili: 'Hisabati',               emoji: '🔢', color: 'from-blue-500 to-blue-700',      strands: 3 },
    { id: 'eng-1',  name: 'English',                  kiswahili: 'Kiingereza',              emoji: '📖', color: 'from-emerald-500 to-emerald-700', strands: 4 },
    { id: 'kis-1',  name: 'Kiswahili',                kiswahili: 'Kiswahili',               emoji: '🗣️', color: 'from-orange-500 to-orange-700',   strands: 3 },
    { id: 'env-1',  name: 'Environmental Activities', kiswahili: 'Shughuli za Mazingira',   emoji: '🌍', color: 'from-green-500 to-green-700',     strands: 4 },
    { id: 'cre-1',  name: 'Creative Arts',            kiswahili: 'Sanaa za Ubunifu',        emoji: '🎨', color: 'from-pink-500 to-pink-700',       strands: 3 },
  ],
  4: [
    { id: 'math-4', name: 'Mathematics',              kiswahili: 'Hisabati',               emoji: '🔢', color: 'from-blue-500 to-blue-700',      strands: 5 },
    { id: 'sci-4',  name: 'Integrated Science',       kiswahili: 'Sayansi Jumuishi',        emoji: '🔬', color: 'from-cyan-500 to-cyan-700',      strands: 4 },
    { id: 'eng-4',  name: 'English',                  kiswahili: 'Kiingereza',              emoji: '📖', color: 'from-emerald-500 to-emerald-700', strands: 5 },
    { id: 'kis-4',  name: 'Kiswahili',                kiswahili: 'Kiswahili',               emoji: '🗣️', color: 'from-orange-500 to-orange-700',   strands: 4 },
    { id: 'sst-4',  name: 'Social Studies',           kiswahili: 'Masomo ya Jamii',         emoji: '🌍', color: 'from-green-500 to-green-700',     strands: 4 },
    { id: 'cre-4',  name: 'Creative Arts & Sports',   kiswahili: 'Sanaa na Michezo',        emoji: '🎨', color: 'from-pink-500 to-pink-700',       strands: 3 },
  ],
  7: [
    { id: 'math-7', name: 'Mathematics',              kiswahili: 'Hisabati',                emoji: '🔢', color: 'from-blue-500 to-blue-700',      strands: 6 },
    { id: 'sci-7',  name: 'Integrated Science',       kiswahili: 'Sayansi Jumuishi',        emoji: '🔬', color: 'from-cyan-500 to-cyan-700',      strands: 9 },
    { id: 'eng-7',  name: 'English',                  kiswahili: 'Kiingereza',              emoji: '📖', color: 'from-emerald-500 to-emerald-700', strands: 5 },
    { id: 'kis-7',  name: 'Kiswahili',                kiswahili: 'Kiswahili',               emoji: '🗣️', color: 'from-orange-500 to-orange-700',   strands: 4 },
    { id: 'sst-7',  name: 'Social Studies',           kiswahili: 'Masomo ya Jamii',         emoji: '🌍', color: 'from-green-500 to-green-700',     strands: 5 },
    { id: 'pre-7',  name: 'Pre-Technical Studies',    kiswahili: 'Masomo ya Awali ya Ufundi', emoji: '⚙️', color: 'from-gray-500 to-gray-700',    strands: 4 },
    { id: 'bus-7',  name: 'Business Studies',         kiswahili: 'Masomo ya Biashara',      emoji: '💼', color: 'from-amber-500 to-amber-700',    strands: 3 },
  ],
}

// Helper: get subjects for any grade (fallback logic)
export const getSubjectsForGrade = (grade) => {
  if (grade <= 3) return SUBJECTS[1]
  if (grade <= 6) return SUBJECTS[4]
  return SUBJECTS[7]
}

// ─────────────────────────────────────────
// CURRICULUM CONTENT
// ─────────────────────────────────────────
export const CURRICULUM = {

  // ── Grade 4 Mathematics ──────────────────────────────────────
  'math-4': {
    subjectName: 'Mathematics',
    strands: [
      {
        id: 'strand-numbers',
        name: 'Numbers',
        kiswahili: 'Nambari',
        subStrands: [
          {
            id: 'whole-numbers',
            name: 'Whole Numbers up to 999,999',
            kiswahili: 'Nambari Kamili hadi 999,999',
            duration: '12 min',
            difficulty: 'Beginner',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            outcomes: [
              'Count and write whole numbers up to 999,999',
              'Order numbers from smallest to largest',
              'Identify the place value of each digit',
            ],
            quiz: [
              {
                id: 'q1',
                question: 'What is the place value of 7 in the number 375,246?',
                options: ['Thousands', 'Ten Thousands', 'Hundreds', 'Millions'],
                correct: 0,
                explanation: 'In 375,246, the digit 7 is in the ten-thousands place, giving it a value of 70,000.',
              },
              {
                id: 'q2',
                question: 'Which number is the largest?',
                options: ['99,999', '100,000', '98,765', '99,876'],
                correct: 1,
                explanation: '100,000 is the largest because it has 6 digits while all others have 5 digits.',
              },
              {
                id: 'q3',
                question: 'How do you write "Four hundred and twenty thousand, five hundred and six" in numerals?',
                options: ['420,506', '402,560', '420,560', '400,206'],
                correct: 0,
                explanation: 'Four hundred twenty thousand = 420,000. Five hundred and six = 506. Combined: 420,506.',
              },
            ],
          },
          {
            id: 'fractions',
            name: 'Fractions',
            kiswahili: 'Sehemu',
            duration: '15 min',
            difficulty: 'Intermediate',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            outcomes: [
              'Identify and compare proper and improper fractions',
              'Add and subtract fractions with like denominators',
              'Convert between mixed numbers and improper fractions',
            ],
            quiz: [
              {
                id: 'q1',
                question: 'What is 3/8 + 2/8?',
                options: ['5/8', '5/16', '6/8', '1/2'],
                correct: 0,
                explanation: 'When fractions have the same denominator, add the numerators: 3+2=5. Answer: 5/8.',
              },
              {
                id: 'q2',
                question: 'Which fraction is larger: 2/3 or 3/4?',
                options: ['2/3', '3/4', 'They are equal', 'Cannot compare'],
                correct: 1,
                explanation: 'Converting to same denominator: 2/3 = 8/12 and 3/4 = 9/12. So 3/4 is larger.',
              },
              {
                id: 'q3',
                question: 'Convert 2¾ to an improper fraction.',
                options: ['9/4', '11/4', '8/4', '7/4'],
                correct: 1,
                explanation: '2¾ = (2×4 + 3)/4 = (8+3)/4 = 11/4.',
              },
            ],
          },
        ],
      },
      {
        id: 'strand-measurement',
        name: 'Measurement',
        kiswahili: 'Upimaji',
        subStrands: [
          {
            id: 'length',
            name: 'Length',
            kiswahili: 'Urefu',
            duration: '10 min',
            difficulty: 'Beginner',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            outcomes: [
              'Measure length using standard units (mm, cm, m, km)',
              'Convert between units of length',
              'Solve problems involving length',
            ],
            quiz: [
              {
                id: 'q1',
                question: 'How many centimetres are in 3 metres?',
                options: ['30 cm', '300 cm', '3000 cm', '3 cm'],
                correct: 1,
                explanation: '1 metre = 100 centimetres. So 3 metres = 3 × 100 = 300 centimetres.',
              },
              {
                id: 'q2',
                question: 'A road is 2.5 km long. How many metres is this?',
                options: ['25 m', '250 m', '2500 m', '25000 m'],
                correct: 2,
                explanation: '1 km = 1000 m. So 2.5 km = 2.5 × 1000 = 2500 metres.',
              },
              {
                id: 'q3',
                question: 'Which unit would you use to measure the length of a pencil?',
                options: ['Kilometre (km)', 'Metre (m)', 'Centimetre (cm)', 'Millimetre (mm)'],
                correct: 2,
                explanation: 'A pencil is typically 15–20 cm long, so centimetres (cm) is the most appropriate unit.',
              },
            ],
          },
        ],
      },
    ],
  },

  // ── Grade 4 Integrated Science ────────────────────────────────
  'sci-4': {
    subjectName: 'Integrated Science',
    strands: [
      {
        id: 'strand-living-things',
        name: 'Living Things and Their Environment',
        kiswahili: 'Viumbe na Mazingira Yao',
        subStrands: [
          {
            id: 'plants',
            name: 'Parts of a Plant and Their Functions',
            kiswahili: 'Sehemu za Mmea na Kazi Zake',
            duration: '14 min',
            difficulty: 'Beginner',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            outcomes: [
              'Identify the main parts of a plant',
              'Describe the function of each plant part',
              'Understand the process of photosynthesis',
            ],
            quiz: [
              {
                id: 'q1',
                question: 'What is the main function of roots in a plant?',
                options: [
                  'Making food for the plant',
                  'Absorbing water and minerals from the soil',
                  'Producing seeds',
                  'Carrying out photosynthesis',
                ],
                correct: 1,
                explanation: 'Roots absorb water and dissolved minerals from the soil, and also anchor the plant in the ground.',
              },
              {
                id: 'q2',
                question: 'Which part of the plant makes food through photosynthesis?',
                options: ['Root', 'Stem', 'Leaf', 'Flower'],
                correct: 2,
                explanation: 'Leaves contain chlorophyll and carry out photosynthesis, converting sunlight, water, and CO₂ into glucose.',
              },
              {
                id: 'q3',
                question: 'What gas does a plant absorb during photosynthesis?',
                options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
                correct: 2,
                explanation: 'Plants absorb Carbon Dioxide (CO₂) from the air during photosynthesis to make glucose and oxygen.',
              },
            ],
          },
        ],
      },
    ],
  },

  // ── Grade 7 Integrated Science ────────────────────────────────
  'sci-7': {
    subjectName: 'Integrated Science',
    strands: [
      {
        id: 'strand-sci7-intro',
        name: 'Introduction to Integrated Science',
        kiswahili: 'Utangulizi wa Sayansi Jumuishi',
        subStrands: [
          {
            id: 'sci7-intro',
            name: 'Introduction to Integrated Science',
            kiswahili: 'Utangulizi wa Sayansi Jumuishi',
            duration: 'Watch',
            difficulty: 'Beginner',
            videoUrl: 'https://www.youtube.com/embed/CYbvkHr5g',
            outcomes: [
              'Understand what Integrated Science means',
              'Identify the branches of science covered in Grade 7',
              'Appreciate the role of science in everyday Kenyan life',
            ],
            quiz: [
              {
                id: 'q1',
                question: 'What does "Integrated Science" mean?',
                options: [
                  'The study of only Biology',
                  'The combination of Biology, Chemistry and Physics',
                  'The study of Mathematics and Science',
                  'The study of the environment only',
                ],
                correct: 1,
                explanation: 'Integrated Science combines Biology, Chemistry and Physics into one subject, showing how they relate to each other.',
              },
              {
                id: 'q2',
                question: 'Which of the following is a branch of Integrated Science?',
                options: ['Geography', 'Physics', 'History', 'Mathematics'],
                correct: 1,
                explanation: 'Physics is one of the three branches covered in Integrated Science alongside Biology and Chemistry.',
              },
              {
                id: 'q3',
                question: 'Why is science important in everyday life?',
                options: [
                  'It is only useful in laboratories',
                  'It helps us understand and solve problems in the world around us',
                  'It is only important for doctors',
                  'It has no use outside school',
                ],
                correct: 1,
                explanation: 'Science helps us understand natural phenomena and solve real-world problems in health, agriculture, technology and more.',
              },
            ],
          },
        ],
      },

      {
        id: 'strand-sci7-safety',
        name: 'Laboratory Safety',
        kiswahili: 'Usalama wa Maabara',
        subStrands: [
          {
            id: 'sci7-lab-safety',
            name: 'Laboratory Safety',
            kiswahili: 'Usalama wa Maabara',
            duration: 'Watch',
            difficulty: 'Beginner',
            videoUrl: 'https://www.youtube.com/embed/wQO-CfNKY',
            outcomes: [
              'Identify safety rules in a science laboratory',
              'Recognise hazard symbols and what they mean',
              'Know the correct procedure in case of a laboratory accident',
            ],
            quiz: [
              {
                id: 'q1',
                question: 'What should you do before starting any experiment in the lab?',
                options: [
                  'Start immediately without reading instructions',
                  'Read and understand all safety instructions',
                  'Remove your safety goggles to see better',
                  'Eat or drink to stay energised',
                ],
                correct: 1,
                explanation: 'Always read and understand all safety instructions before beginning any experiment to prevent accidents.',
              },
              {
                id: 'q2',
                question: 'What does a skull and crossbones hazard symbol mean?',
                options: [
                  'The substance is safe to drink',
                  'The substance is flammable',
                  'The substance is toxic or poisonous',
                  'The substance is radioactive',
                ],
                correct: 2,
                explanation: 'The skull and crossbones symbol indicates that a substance is toxic or poisonous and must be handled with extreme care.',
              },
              {
                id: 'q3',
                question: 'What should you do if a chemical spills on your skin?',
                options: [
                  'Wipe it off with a cloth and continue working',
                  'Ignore it if it does not burn',
                  'Immediately rinse with large amounts of water and tell the teacher',
                  'Apply more chemicals to neutralise it yourself',
                ],
                correct: 2,
                explanation: 'Immediately rinse with large amounts of water to dilute the chemical and always inform your teacher of any accident.',
              },
            ],
          },
        ],
      },

      {
        id: 'strand-sci7-apparatus',
        name: 'Laboratory Apparatus and Equipment',
        kiswahili: 'Vifaa vya Maabara',
        subStrands: [
          {
            id: 'sci7-lab-apparatus',
            name: 'Laboratory Apparatus and Equipment',
            kiswahili: 'Vifaa vya Maabara',
            duration: 'Watch',
            difficulty: 'Beginner',
            videoUrl: 'https://www.youtube.com/embed/GkD5NCTL5KQ',
            outcomes: [
              'Identify common laboratory apparatus and their uses',
              'Handle laboratory equipment correctly and safely',
              'Match each piece of apparatus to its correct function',
            ],
            quiz: [
              {
                id: 'q1',
                question: 'What is a beaker used for in the laboratory?',
                options: [
                  'Measuring exact volumes of liquid',
                  'Holding and heating liquids',
                  'Mixing dry chemicals only',
                  'Viewing specimens under magnification',
                ],
                correct: 1,
                explanation: 'A beaker is used for holding and heating liquids. It is not suitable for measuring exact volumes — a measuring cylinder is used for that.',
              },
              {
                id: 'q2',
                question: 'Which apparatus would you use to measure exactly 25ml of water?',
                options: ['Beaker', 'Test tube', 'Measuring cylinder', 'Conical flask'],
                correct: 2,
                explanation: 'A measuring cylinder is designed for accurate measurement of liquid volumes.',
              },
              {
                id: 'q3',
                question: 'What is the function of a Bunsen burner?',
                options: [
                  'To cool substances',
                  'To provide a controlled flame for heating',
                  'To measure temperature',
                  'To filter mixtures',
                ],
                correct: 1,
                explanation: 'A Bunsen burner provides a controlled gas flame used for heating substances during experiments.',
              },
            ],
          },
        ],
      },

      {
        id: 'strand-sci7-mixtures',
        name: 'Mixtures',
        kiswahili: 'Michanganyiko',
        subStrands: [
          {
            id: 'sci7-mixtures',
            name: 'Mixtures',
            kiswahili: 'Michanganyiko',
            duration: 'Watch',
            difficulty: 'Intermediate',
            videoUrl: 'https://www.youtube.com/embed/CtuF1cvyzQI',
            outcomes: [
              'Define a mixture and give examples from everyday life',
              'Distinguish between homogeneous and heterogeneous mixtures',
              'Describe methods used to separate mixtures',
            ],
            quiz: [
              {
                id: 'q1',
                question: 'Which of the following is an example of a homogeneous mixture?',
                options: [
                  'Sand and water',
                  'Salt and water',
                  'Oil and water',
                  'Soil and gravel',
                ],
                correct: 1,
                explanation: 'Salt dissolved in water is a homogeneous mixture because it has a uniform composition throughout.',
              },
              {
                id: 'q2',
                question: 'Which method would you use to separate sand from water?',
                options: ['Distillation', 'Evaporation', 'Filtration', 'Magnetic separation'],
                correct: 2,
                explanation: 'Filtration is used to separate an insoluble solid like sand from a liquid like water using filter paper.',
              },
              {
                id: 'q3',
                question: 'What method is used to separate iron filings from sand?',
                options: ['Filtration', 'Evaporation', 'Distillation', 'Magnetic separation'],
                correct: 3,
                explanation: 'Iron filings are magnetic. A magnet can be used to attract and separate them from non-magnetic sand.',
              },
            ],
          },
        ],
      },

      {
        id: 'strand-sci7-acids',
        name: 'Acids, Bases and Indicators',
        kiswahili: 'Asidi, Besi na Viashiria',
        subStrands: [
          {
            id: 'sci7-acids-bases',
            name: 'Acids, Bases and Indicators',
            kiswahili: 'Asidi, Besi na Viashiria',
            duration: 'Watch',
            difficulty: 'Intermediate',
            videoUrl: 'https://www.youtube.com/embed/wb7N6TxCUkk',
            outcomes: [
              'Define acids and bases and give everyday examples',
              'Explain what an indicator is and how it works',
              'Use the pH scale to classify substances as acidic, neutral or basic',
            ],
            quiz: [
              {
                id: 'q1',
                question: 'What colour does litmus paper turn in an acidic solution?',
                options: ['Blue', 'Green', 'Red', 'Yellow'],
                correct: 2,
                explanation: 'Litmus paper turns red in an acidic solution and blue in a basic solution.',
              },
              {
                id: 'q2',
                question: 'Which of the following is an example of an acid found at home?',
                options: ['Baking soda', 'Lemon juice', 'Soap', 'Bleach'],
                correct: 1,
                explanation: 'Lemon juice contains citric acid and is a common household acid. Baking soda and soap are bases.',
              },
              {
                id: 'q3',
                question: 'A substance with a pH of 7 is classified as?',
                options: ['Acidic', 'Basic', 'Neutral', 'Corrosive'],
                correct: 2,
                explanation: 'A pH of 7 is neutral. Below 7 is acidic and above 7 is basic. Pure water has a pH of 7.',
              },
            ],
          },
        ],
      },

      {
        id: 'strand-sci7-reproduction',
        name: 'Human Reproductive System',
        kiswahili: 'Mfumo wa Uzazi wa Binadamu',
        subStrands: [
          {
            id: 'sci7-reproduction',
            name: 'Human Reproductive System',
            kiswahili: 'Mfumo wa Uzazi wa Binadamu',
            duration: 'Watch',
            difficulty: 'Intermediate',
            videoUrl: 'https://www.youtube.com/embed/Vzc5x5NagAo',
            outcomes: [
              'Identify the organs of the male and female reproductive systems',
              'Describe the function of each reproductive organ',
              'Explain the process of fertilisation in humans',
            ],
            quiz: [
              {
                id: 'q1',
                question: 'Where does fertilisation take place in the female body?',
                options: ['Uterus', 'Ovary', 'Fallopian tube', 'Cervix'],
                correct: 2,
                explanation: 'Fertilisation — the joining of the egg and sperm — takes place in the fallopian tube.',
              },
              {
                id: 'q2',
                question: 'What is the function of the testes in the male reproductive system?',
                options: [
                  'To produce eggs',
                  'To produce sperm and testosterone',
                  'To carry urine out of the body',
                  'To store mature eggs',
                ],
                correct: 1,
                explanation: 'The testes produce sperm cells and the hormone testosterone which controls male characteristics.',
              },
              {
                id: 'q3',
                question: 'Where does a fertilised egg implant and develop into a baby?',
                options: ['Ovary', 'Fallopian tube', 'Uterus', 'Cervix'],
                correct: 2,
                explanation: 'After fertilisation the egg travels to the uterus where it implants and develops into a baby over nine months.',
              },
            ],
          },
        ],
      },

      {
        id: 'strand-sci7-excretion',
        name: 'Human Excretory System',
        kiswahili: 'Mfumo wa Uondoaji Taka wa Binadamu',
        subStrands: [
          {
            id: 'sci7-excretion',
            name: 'Human Excretory System',
            kiswahili: 'Mfumo wa Uondoaji Taka wa Binadamu',
            duration: 'Watch',
            difficulty: 'Intermediate',
            videoUrl: 'https://www.youtube.com/embed/lSaajXH7zn4',
            outcomes: [
              'Define excretion and explain why it is important',
              'Identify the organs of the human excretory system',
              'Describe the role of the kidneys in filtering blood',
            ],
            quiz: [
              {
                id: 'q1',
                question: 'What is excretion?',
                options: [
                  'The process of taking in food',
                  'The removal of waste products produced by the body\'s chemical reactions',
                  'The process of breathing in oxygen',
                  'The digestion of food in the stomach',
                ],
                correct: 1,
                explanation: 'Excretion is the removal of metabolic waste products that would be harmful if they accumulated in the body.',
              },
              {
                id: 'q2',
                question: 'Which organ is the main excretory organ for filtering blood?',
                options: ['Liver', 'Lungs', 'Skin', 'Kidneys'],
                correct: 3,
                explanation: 'The kidneys are the main excretory organs. They filter waste products from the blood and produce urine.',
              },
              {
                id: 'q3',
                question: 'What waste product do the lungs excrete?',
                options: ['Urea', 'Carbon dioxide and water vapour', 'Bile', 'Sweat'],
                correct: 1,
                explanation: 'The lungs excrete carbon dioxide and water vapour as waste products of cellular respiration.',
              },
            ],
          },
        ],
      },

      {
        id: 'strand-sci7-electrical',
        name: 'Electrical Energy',
        kiswahili: 'Nishati ya Umeme',
        subStrands: [
          {
            id: 'sci7-electrical',
            name: 'Electrical Energy',
            kiswahili: 'Nishati ya Umeme',
            duration: 'Coming Soon',
            difficulty: 'Intermediate',
            videoUrl: null,
            outcomes: [
              'Understand the concept of electrical energy',
              'Identify sources of electrical energy',
              'Describe how electrical circuits work',
            ],
            quiz: [],
          },
        ],
      },

      {
        id: 'strand-sci7-magnetism',
        name: 'Magnetism',
        kiswahili: 'Sumaku',
        subStrands: [
          {
            id: 'sci7-magnetism',
            name: 'Magnetism',
            kiswahili: 'Sumaku',
            duration: 'Coming Soon',
            difficulty: 'Intermediate',
            videoUrl: null,
            outcomes: [
              'Define magnetism and identify magnetic materials',
              'Describe the properties of magnets',
              'Explain the concept of magnetic fields',
            ],
            quiz: [],
          },
        ],
      },
    ],
  },
}

// ─────────────────────────────────────────
// UI COPY — Bilingual Strings
// ─────────────────────────────────────────
export const UI_STRINGS = {
  en: {
    welcome:           'Welcome back',
    yourProgress:      'Your Progress',
    dailyStreak:       'Day Streak',
    lessonsCompleted:  'Lessons Completed',
    masteryScore:      'Mastery Score',
    continueLeaning:   'Continue Learning',
    curriculum:        'Curriculum',
    chooseGrade:       'Choose Your Grade',
    chooseSubject:     'Choose a Subject',
    strands:           'Strands',
    startLesson:       'Start Lesson',
    whatYouWillLearn:  'What You Will Learn',
    quiz:              'Quick Check Quiz',
    submit:            'Submit Answer',
    next:              'Next Question',
    checkResults:      'View Results',
    excellent:         'Excellent Work! 🎉',
    goodJob:           'Good Job! 💪',
    keepPracticing:    'Keep Practicing! 📚',
    tryAgain:          'Try Again',
    lessonComplete:    'Lesson Complete!',
    signIn:            'Sign In to Learn',
    signInGoogle:      'Continue with Google',
    tagline:           'Every child deserves world-class education — free, forever.',
    signOut:           'Sign Out',
    profile:           'My Profile',
    settings:          'Settings',
    darkMode:          'Dark Mode',
    language:          'Language',
    home:              'Home',
    search:            'Search lessons...',
    grade:             'Grade',
    duration:          'Duration',
    difficulty:        'Difficulty',
    passRequired:      '80% required to complete',
    yourScore:         'Your Score',
    correct:           'Correct!',
    incorrect:         'Incorrect',
    explanation:       'Explanation',
  },
  sw: {
    welcome:           'Karibu tena',
    yourProgress:      'Maendeleo Yako',
    dailyStreak:       'Siku Mfululizo',
    lessonsCompleted:  'Masomo Yaliyokamilika',
    masteryScore:      'Alama ya Ujuzi',
    continueLeaning:   'Endelea Kujifunza',
    curriculum:        'Mtaala',
    chooseGrade:       'Chagua Darasa Lako',
    chooseSubject:     'Chagua Somo',
    strands:           'Nyuzi',
    startLesson:       'Anza Somo',
    whatYouWillLearn:  'Utakachojifunza',
    quiz:              'Maswali ya Haraka',
    submit:            'Wasilisha Jibu',
    next:              'Swali Lijalo',
    checkResults:      'Angalia Matokeo',
    excellent:         'Kazi Nzuri Sana! 🎉',
    goodJob:           'Hongera! 💪',
    keepPracticing:    'Endelea Kufanya Mazoezi! 📚',
    tryAgain:          'Jaribu Tena',
    lessonComplete:    'Somo Limekamilika!',
    signIn:            'Ingia Kujifunza',
    signInGoogle:      'Endelea na Google',
    tagline:           'Kila mtoto anastahili elimu ya daraja la kwanza — bure, milele.',
    signOut:           'Ondoka',
    profile:           'Wasifu Wangu',
    settings:          'Mipangilio',
    darkMode:          'Hali ya Usiku',
    language:          'Lugha',
    home:              'Nyumbani',
    search:            'Tafuta masomo...',
    grade:             'Darasa',
    duration:          'Muda',
    difficulty:        'Ugumu',
    passRequired:      '80% inahitajika kukamilika',
    yourScore:         'Alama Yako',
    correct:           'Sahihi!',
    incorrect:         'Kosa',
    explanation:       'Maelezo',
  },
}