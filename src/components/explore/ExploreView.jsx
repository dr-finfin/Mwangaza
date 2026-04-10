import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { GRADES, getSubjectsForGrade, CURRICULUM } from '../../data/curriculum';
import { motion } from 'framer-motion';
import QuizEngine from '../quiz/QuizEngine';

const ExploreView = () => {
  const { t, language, setCurrentView } = useApp();
  const { user, signInWithGoogle } = useAuth();

  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [activeTab, setActiveTab] = useState('video');
  const [showSignInBanner, setShowSignInBanner] = useState(false);

  const handleQuizAttempt = () => {
    if (!user) {
      setShowSignInBanner(true);
    }
  };

  // ── Lesson View ──────────────────────────────────────────────
  if (selectedLesson) {
    const { lesson, subject } = selectedLesson;
    return (
      <div className="animate-fade-in max-w-4xl mx-auto">
        {/* Sign in banner */}
        {showSignInBanner && !user && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center justify-between gap-4 px-5 py-4 
                       bg-blue-50 border border-blue-200 rounded-xl"
          >
            <div>
              <p className="font-semibold text-blue-900 text-sm">
                Sign in to save your progress
              </p>
              <p className="text-blue-600 text-xs mt-0.5">
                Your quiz scores and lesson completion sync to the cloud
              </p>
            </div>
            <button
              onClick={signInWithGoogle}
              className="flex-shrink-0 px-4 py-2 bg-blue-600 text-white text-sm 
                         font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign in with Google
            </button>
          </motion.div>
        )}

        {/* Back */}
        <button
          onClick={() => setSelectedLesson(null)}
          className="flex items-center gap-2 text-gray-400 hover:text-gray-700 
                     text-sm font-medium mb-6 transition-colors group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          Back to {subject?.name}
        </button>

        {/* Lesson header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {subject?.name}
            </span>
            <span className="text-gray-200">·</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                lesson.difficulty === 'Beginner'
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'bg-amber-50 text-amber-600'
              }`}
            >
              {lesson.difficulty}
            </span>
            <span className="text-gray-200">·</span>
            <span className="text-xs text-gray-400">{lesson.duration}</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900">{lesson.name}</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-gray-200 mb-8">
          {[
            { id: 'video', label: 'Video Lesson' },
            { id: 'quiz', label: 'Quick Check' },
            { id: 'notes', label: 'Key Notes' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id === 'quiz') handleQuizAttempt();
              }}
              className={`px-4 py-3 text-sm font-semibold border-b-2 transition-all -mb-px ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Video tab */}
        {activeTab === 'video' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div
              className="relative w-full bg-gray-900 rounded-2xl overflow-hidden mb-8"
              style={{ paddingBottom: '56.25%' }}
            >
              <iframe
                className="absolute inset-0 w-full h-full"
                src={lesson.videoUrl}
                title={lesson.name}
                frameBorder="0"
                allowFullScreen
              />
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                What you will learn
              </h2>
              <ul className="space-y-2">
                {lesson.outcomes?.map((outcome, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full 
                                    flex items-center justify-center text-xs font-bold 
                                    flex-shrink-0 mt-0.5"
                    >
                      {i + 1}
                    </div>
                    <span className="text-gray-600 text-sm leading-relaxed">
                      {outcome}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => {
                setActiveTab('quiz');
                handleQuizAttempt();
              }}
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl 
                         hover:bg-blue-700 active:scale-95 transition-all"
            >
              Take the Quiz →
            </button>
          </motion.div>
        )}

        {/* Quiz tab */}
        {activeTab === 'quiz' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {!user ? (
              <div className="text-center py-16">
                <div
                  className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center 
                                text-3xl mx-auto mb-4"
                >
                  🔒
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Sign in to take quizzes
                </h3>
                <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
                  Create a free account to take quizzes, track your progress and
                  earn lesson completions.
                </p>
                <button
                  onClick={signInWithGoogle}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 
                             text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Continue with Google — it's free
                </button>
              </div>
            ) : (
              <QuizEngine
                quiz={lesson.quiz || []}
                lessonId={lesson.id}
                onComplete={() => {}}
              />
            )}
          </motion.div>
        )}

        {/* Notes tab */}
        {activeTab === 'notes' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            {lesson.outcomes?.map((outcome, i) => (
              <div
                key={i}
                className="flex gap-4 p-4 bg-gray-50 rounded-xl border-l-4 border-blue-500"
              >
                <span className="text-xs font-black text-blue-500 font-mono mt-0.5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {outcome}
                </p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    );
  }

  // ── Strand/Lesson List ───────────────────────────────────────
  if (selectedSubject) {
    const curriculumData = CURRICULUM[selectedSubject.id];

    return (
      <div className="animate-fade-in">
        <button
          onClick={() => setSelectedSubject(null)}
          className="flex items-center gap-2 text-gray-400 hover:text-gray-700 
                     text-sm font-medium mb-6 transition-colors group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          Grade {selectedGrade} Subjects
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div
            className={`w-12 h-12 bg-gradient-to-br ${selectedSubject.color} 
                          rounded-xl flex items-center justify-center text-2xl`}
          >
            {selectedSubject.emoji}
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900">
              {selectedSubject.name}
            </h1>
            <p className="text-gray-400 text-sm">
              Grade {selectedGrade} · KICD Aligned
            </p>
          </div>
        </div>

        {!curriculumData ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">🚧</div>
            <h3 className="text-lg font-bold text-gray-700 mb-2">
              Content Coming Soon
            </h3>
            <p className="text-gray-400 text-sm">
              Our curriculum team is preparing this subject.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {curriculumData.strands.map((strand, si) => (
              <div key={strand.id}>
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Strand {si + 1} · {strand.name}
                </h2>
                <div className="space-y-2">
                  {strand.subStrands.map((sub, ssi) => (
                    <motion.button
                      key={sub.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: ssi * 0.05 }}
                      onClick={() =>
                        setSelectedLesson({
                          lesson: sub,
                          subject: selectedSubject,
                        })
                      }
                      className="w-full flex items-center gap-4 p-4 bg-white border border-gray-100 
                                 rounded-xl hover:border-blue-200 hover:bg-blue-50 
                                 transition-all group text-left"
                    >
                      <div
                        className="w-9 h-9 bg-gray-100 group-hover:bg-blue-100 
                                      rounded-lg flex items-center justify-center 
                                      text-sm font-bold text-gray-400 group-hover:text-blue-600 
                                      flex-shrink-0 transition-colors"
                      >
                        {ssi + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800 text-sm">
                          {sub.name}
                        </p>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="text-xs text-gray-400">
                            {sub.duration}
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              sub.difficulty === 'Beginner'
                                ? 'bg-emerald-50 text-emerald-600'
                                : 'bg-amber-50 text-amber-600'
                            }`}
                          >
                            {sub.difficulty}
                          </span>
                        </div>
                      </div>
                      <svg
                        className="w-4 h-4 text-gray-300 group-hover:text-blue-500 
                                   group-hover:translate-x-1 transition-all flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ── Subject Grid ─────────────────────────────────────────────
  if (selectedGrade) {
    const subjects = getSubjectsForGrade(selectedGrade);
    return (
      <div className="animate-fade-in">
        <button
          onClick={() => setSelectedGrade(null)}
          className="flex items-center gap-2 text-gray-400 hover:text-gray-700 
                     text-sm font-medium mb-6 transition-colors group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          All Grades
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">
            Grade {selectedGrade}
          </h1>
          <p className="text-gray-400 mt-1 text-sm">
            {subjects.length} subjects · Select one to explore
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((subject, i) => (
            <motion.button
              key={subject.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => setSelectedSubject(subject)}
              className="text-left p-5 bg-white border border-gray-100 rounded-2xl 
                         hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 
                         transition-all group"
            >
              <div
                className={`w-12 h-12 bg-gradient-to-br ${subject.color} rounded-xl 
                              flex items-center justify-center text-2xl mb-4 
                              group-hover:scale-110 transition-transform`}
              >
                {subject.emoji}
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">
                {subject.name}
              </h3>
              <p className="text-gray-400 text-xs">{subject.strands} strands</p>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  // ── Grade Selection ──────────────────────────────────────────
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900">
              Explore the Curriculum
            </h1>
            <p className="text-gray-400 mt-1 text-sm">
              Browse all KICD-aligned lessons · No sign in required
            </p>
          </div>
          {!user && (
            <button
              onClick={signInWithGoogle}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-600 
                         text-white text-sm font-semibold rounded-lg 
                         hover:bg-blue-700 transition-colors"
            >
              Sign in to track progress →
            </button>
          )}
        </div>

        {/* What they can do without signing in */}
        {!user && (
          <div
            className="flex items-center gap-6 text-sm text-gray-400 
                          p-4 bg-gray-50 rounded-xl border border-gray-100"
          >
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Browse all lessons</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Watch videos</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Read notes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-300">○</span>
              <span className="text-gray-300">Take quizzes (sign in)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-300">○</span>
              <span className="text-gray-300">Save progress (sign in)</span>
            </div>
          </div>
        )}
      </div>

      {/* Grade grid */}
      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
        {GRADES.map((grade, i) => (
          <motion.button
            key={grade.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04 }}
            whileHover={{ y: -4 }}
            onClick={() => setSelectedGrade(grade.id)}
            className="flex flex-col items-center gap-2 p-4 bg-white border border-gray-100 
                       rounded-2xl hover:border-blue-200 hover:shadow-lg 
                       hover:shadow-blue-500/10 transition-all group"
          >
            <div
              className={`w-10 h-10 bg-gradient-to-br ${grade.color} rounded-xl 
                            flex items-center justify-center text-xl shadow-sm`}
            >
              {grade.emoji}
            </div>
            <span className="text-xs font-bold text-gray-600 group-hover:text-blue-600 transition-colors">
              G{grade.id}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Subject preview */}
      <div className="mt-16">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">
          Featured Lessons
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              grade: 4,
              subject: 'Mathematics',
              lesson: 'Whole Numbers up to 999,999',
              duration: '12 min',
              emoji: '🔢',
            },
            {
              grade: 4,
              subject: 'Integrated Science',
              lesson: 'Parts of a Plant',
              duration: '14 min',
              emoji: '🔬',
            },
            {
              grade: 7,
              subject: 'Mathematics',
              lesson: 'Linear Equations',
              duration: '18 min',
              emoji: '🔢',
            },
            {
              grade: 4,
              subject: 'Mathematics',
              lesson: 'Length',
              duration: '10 min',
              emoji: '📏',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setSelectedGrade(item.grade)}
              className="flex items-center gap-4 p-4 bg-white border border-gray-100 
                         rounded-xl hover:border-blue-200 hover:bg-blue-50 
                         transition-all cursor-pointer group"
            >
              <div
                className="w-10 h-10 bg-blue-50 group-hover:bg-blue-100 rounded-xl 
                              flex items-center justify-center text-xl flex-shrink-0 transition-colors"
              >
                {item.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 text-sm">
                  {item.lesson}
                </p>
                <p className="text-gray-400 text-xs mt-0.5">
                  Grade {item.grade} · {item.subject} · {item.duration}
                </p>
              </div>
              <span
                className="text-xs font-semibold text-blue-600 bg-blue-50 
                               group-hover:bg-white px-2 py-1 rounded-lg transition-colors"
              >
                G{item.grade}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreView;
