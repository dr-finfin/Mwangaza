// ============================================================
// MWANGAZA CURRICULUM DATA — KICD CBE Aligned
// Grades 1–9 | All Core Subjects
// ============================================================

export const GRADES = [
  {
    id: 1,
    label: 'Grade 1',
    emoji: '🌱',
    color: 'from-emerald-400 to-emerald-600',
  },
  { id: 2, label: 'Grade 2', emoji: '🌿', color: 'from-teal-400 to-teal-600' },
  { id: 3, label: 'Grade 3', emoji: '🌳', color: 'from-cyan-400 to-cyan-600' },
  { id: 4, label: 'Grade 4', emoji: '⭐', color: 'from-blue-400 to-blue-600' },
  {
    id: 5,
    label: 'Grade 5',
    emoji: '🌟',
    color: 'from-indigo-400 to-indigo-600',
  },
  {
    id: 6,
    label: 'Grade 6',
    emoji: '🚀',
    color: 'from-violet-400 to-violet-600',
  },
  {
    id: 7,
    label: 'Grade 7',
    emoji: '💡',
    color: 'from-purple-400 to-purple-600',
  },
  {
    id: 8,
    label: 'Grade 8',
    emoji: '🔬',
    color: 'from-fuchsia-400 to-fuchsia-600',
  },
  { id: 9, label: 'Grade 9', emoji: '🏆', color: 'from-rose-400 to-rose-600' },
];

export const SUBJECTS = {
  1: [
    {
      id: 'math-1',
      name: 'Mathematics',
      kiswahili: 'Hisabati',
      emoji: '🔢',
      color: 'from-blue-500 to-blue-700',
      strands: 3,
    },
    {
      id: 'eng-1',
      name: 'English',
      kiswahili: 'Kiingereza',
      emoji: '📖',
      color: 'from-emerald-500 to-emerald-700',
      strands: 4,
    },
    {
      id: 'kis-1',
      name: 'Kiswahili',
      kiswahili: 'Kiswahili',
      emoji: '🗣️',
      color: 'from-orange-500 to-orange-700',
      strands: 3,
    },
    {
      id: 'env-1',
      name: 'Environmental Activities',
      kiswahili: 'Shughuli za Mazingira',
      emoji: '🌍',
      color: 'from-green-500 to-green-700',
      strands: 4,
    },
    {
      id: 'cre-1',
      name: 'Creative Arts',
      kiswahili: 'Sanaa za Ubunifu',
      emoji: '🎨',
      color: 'from-pink-500 to-pink-700',
      strands: 3,
    },
  ],
  4: [
    {
      id: 'math-4',
      name: 'Mathematics',
      kiswahili: 'Hisabati',
      emoji: '🔢',
      color: 'from-blue-500 to-blue-700',
      strands: 5,
    },
    {
      id: 'sci-4',
      name: 'Integrated Science',
      kiswahili: 'Sayansi Jumuishi',
      emoji: '🔬',
      color: 'from-cyan-500 to-cyan-700',
      strands: 4,
    },
    {
      id: 'eng-4',
      name: 'English',
      kiswahili: 'Kiingereza',
      emoji: '📖',
      color: 'from-emerald-500 to-emerald-700',
      strands: 5,
    },
    {
      id: 'kis-4',
      name: 'Kiswahili',
      kiswahili: 'Kiswahili',
      emoji: '🗣️',
      color: 'from-orange-500 to-orange-700',
      strands: 4,
    },
    {
      id: 'sst-4',
      name: 'Social Studies',
      kiswahili: 'Masomo ya Jamii',
      emoji: '🌍',
      color: 'from-green-500 to-green-700',
      strands: 4,
    },
    {
      id: 'cre-4',
      name: 'Creative Arts & Sports',
      kiswahili: 'Sanaa na Michezo',
      emoji: '🎨',
      color: 'from-pink-500 to-pink-700',
      strands: 3,
    },
  ],
  7: [
    {
      id: 'math-7',
      name: 'Mathematics',
      kiswahili: 'Hisabati',
      emoji: '🔢',
      color: 'from-blue-500 to-blue-700',
      strands: 6,
    },
    {
      id: 'sci-7',
      name: 'Integrated Science',
      kiswahili: 'Sayansi Jumuishi',
      emoji: '🔬',
      color: 'from-cyan-500 to-cyan-700',
      strands: 5,
    },
    {
      id: 'eng-7',
      name: 'English',
      kiswahili: 'Kiingereza',
      emoji: '📖',
      color: 'from-emerald-500 to-emerald-700',
      strands: 5,
    },
    {
      id: 'kis-7',
      name: 'Kiswahili',
      kiswahili: 'Kiswahili',
      emoji: '🗣️',
      color: 'from-orange-500 to-orange-700',
      strands: 4,
    },
    {
      id: 'sst-7',
      name: 'Social Studies',
      kiswahili: 'Masomo ya Jamii',
      emoji: '🌍',
      color: 'from-green-500 to-green-700',
      strands: 5,
    },
    {
      id: 'pre-7',
      name: 'Pre-Technical Studies',
      kiswahili: 'Masomo ya Awali ya Ufundi',
      emoji: '⚙️',
      color: 'from-gray-500 to-gray-700',
      strands: 4,
    },
    {
      id: 'bus-7',
      name: 'Business Studies',
      kiswahili: 'Masomo ya Biashara',
      emoji: '💼',
      color: 'from-amber-500 to-amber-700',
      strands: 3,
    },
  ],
};

// Helper: get subjects for any grade (fallback logic)
export const getSubjectsForGrade = (grade) => {
  if (grade <= 3) return SUBJECTS[1];
  if (grade <= 6) return SUBJECTS[4];
  return SUBJECTS[7];
};

// ─────────────────────────────────────────
// CURRICULUM CONTENT (Lessons with Quizzes)
// ─────────────────────────────────────────
export const CURRICULUM = {
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
                explanation:
                  'In 375,246, the digit 7 is in the ten-thousands place, giving it a value of 70,000.',
              },
              {
                id: 'q2',
                question: 'Which number is the largest?',
                options: ['99,999', '100,000', '98,765', '99,876'],
                correct: 1,
                explanation:
                  '100,000 is the largest because it has 6 digits while all others have 5 digits.',
              },
              {
                id: 'q3',
                question:
                  'How do you write "Four hundred and twenty thousand, five hundred and six" in numerals?',
                options: ['420,506', '402,560', '420,560', '400,206'],
                correct: 0,
                explanation:
                  'Four hundred twenty thousand = 420,000. Five hundred and six = 506. Combined: 420,506.',
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
                explanation:
                  'When fractions have the same denominator, add the numerators: 3+2=5. Answer: 5/8.',
              },
              {
                id: 'q2',
                question: 'Which fraction is larger: 2/3 or 3/4?',
                options: ['2/3', '3/4', 'They are equal', 'Cannot compare'],
                correct: 1,
                explanation:
                  'Converting to same denominator: 2/3 = 8/12 and 3/4 = 9/12. So 3/4 is larger.',
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
                explanation:
                  '1 metre = 100 centimetres. So 3 metres = 3 × 100 = 300 centimetres.',
              },
              {
                id: 'q2',
                question: 'A road is 2.5 km long. How many metres is this?',
                options: ['25 m', '250 m', '2500 m', '25000 m'],
                correct: 2,
                explanation:
                  '1 km = 1000 m. So 2.5 km = 2.5 × 1000 = 2500 metres.',
              },
              {
                id: 'q3',
                question:
                  'Which unit would you use to measure the length of a pencil?',
                options: [
                  'Kilometre (km)',
                  'Metre (m)',
                  'Centimetre (cm)',
                  'Millimetre (mm)',
                ],
                correct: 2,
                explanation:
                  'A pencil is typically 15–20 cm long, so centimetres (cm) is the most appropriate unit.',
              },
            ],
          },
        ],
      },
    ],
  },

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
                explanation:
                  'Roots absorb water and dissolved minerals from the soil, and also anchor the plant in the ground.',
              },
              {
                id: 'q2',
                question:
                  'Which part of the plant makes food through photosynthesis?',
                options: ['Root', 'Stem', 'Leaf', 'Flower'],
                correct: 2,
                explanation:
                  'Leaves contain chlorophyll and carry out photosynthesis, converting sunlight, water, and CO₂ into glucose.',
              },
              {
                id: 'q3',
                question: 'What gas does a plant absorb during photosynthesis?',
                options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
                correct: 2,
                explanation:
                  'Plants absorb Carbon Dioxide (CO₂) from the air during photosynthesis to make glucose and oxygen.',
              },
            ],
          },
        ],
      },
    ],
  },
};

// ─────────────────────────────────────────
// UI COPY — Bilingual Strings
// ─────────────────────────────────────────
export const UI_STRINGS = {
  en: {
    welcome: 'Welcome back',
    yourProgress: 'Your Progress',
    dailyStreak: 'Day Streak',
    lessonsCompleted: 'Lessons Completed',
    masteryScore: 'Mastery Score',
    continueLeaning: 'Continue Learning',
    curriculum: 'Curriculum',
    chooseGrade: 'Choose Your Grade',
    chooseSubject: 'Choose a Subject',
    strands: 'Strands',
    startLesson: 'Start Lesson',
    whatYouWillLearn: 'What You Will Learn',
    quiz: 'Quick Check Quiz',
    submit: 'Submit Answer',
    next: 'Next Question',
    checkResults: 'View Results',
    excellent: 'Excellent Work! 🎉',
    goodJob: 'Good Job! 💪',
    keepPracticing: 'Keep Practicing! 📚',
    tryAgain: 'Try Again',
    lessonComplete: 'Lesson Complete!',
    signIn: 'Sign In to Learn',
    signInGoogle: 'Continue with Google',
    tagline: 'Every child deserves world-class education — free, forever.',
    signOut: 'Sign Out',
    profile: 'My Profile',
    settings: 'Settings',
    darkMode: 'Dark Mode',
    language: 'Language',
    home: 'Home',
    search: 'Search lessons...',
    grade: 'Grade',
    duration: 'Duration',
    difficulty: 'Difficulty',
    passRequired: '80% required to complete',
    yourScore: 'Your Score',
    correct: 'Correct!',
    incorrect: 'Incorrect',
    explanation: 'Explanation',
  },
  sw: {
    welcome: 'Karibu tena',
    yourProgress: 'Maendeleo Yako',
    dailyStreak: 'Siku Mfululizo',
    lessonsCompleted: 'Masomo Yaliyokamilika',
    masteryScore: 'Alama ya Ujuzi',
    continueLeaning: 'Endelea Kujifunza',
    curriculum: 'Mtaala',
    chooseGrade: 'Chagua Darasa Lako',
    chooseSubject: 'Chagua Somo',
    strands: 'Nyuzi',
    startLesson: 'Anza Somo',
    whatYouWillLearn: 'Utakachojifunza',
    quiz: 'Maswali ya Haraka',
    submit: 'Wasilisha Jibu',
    next: 'Swali Lijalo',
    checkResults: 'Angalia Matokeo',
    excellent: 'Kazi Nzuri Sana! 🎉',
    goodJob: 'Hongera! 💪',
    keepPracticing: 'Endelea Kufanya Mazoezi! 📚',
    tryAgain: 'Jaribu Tena',
    lessonComplete: 'Somo Limekamilika!',
    signIn: 'Ingia Kujifunza',
    signInGoogle: 'Endelea na Google',
    tagline: 'Kila mtoto anastahili elimu ya daraja la kwanza — bure, milele.',
    signOut: 'Ondoka',
    profile: 'Wasifu Wangu',
    settings: 'Mipangilio',
    darkMode: 'Hali ya Usiku',
    language: 'Lugha',
    home: 'Nyumbani',
    search: 'Tafuta masomo...',
    grade: 'Darasa',
    duration: 'Muda',
    difficulty: 'Ugumu',
    passRequired: '80% inahitajika kukamilika',
    yourScore: 'Alama Yako',
    correct: 'Sahihi!',
    incorrect: 'Kosa',
    explanation: 'Maelezo',
  },
};
