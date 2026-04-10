import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { GRADES, getSubjectsForGrade, CURRICULUM } from '../../data/curriculum';
import LessonView from './LessonView';

// ── Grade Selector ────────────────────────────────────────────
const GradeSelector = ({ selectedGrade, onSelect, t, language }) => (
  <div className="animate-fade-in">
    <div className="mb-8">
      <h1 className="text-3xl font-black text-gray-900 dark:text-white">
        {t('chooseGrade')}
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
        {language === 'en'
          ? 'Select your grade level to begin'
          : 'Chagua darasa lako kuanza'}
      </p>
    </div>

    <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {GRADES.map((grade) => (
        <button
          key={grade.id}
          onClick={() => onSelect(grade.id)}
          className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 
                      transition-all duration-200 hover:scale-105 active:scale-95 group ${
                        selectedGrade === grade.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 shadow-lg shadow-blue-500/20'
                          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 hover:bg-blue-50/50 dark:hover:border-blue-700 dark:hover:bg-blue-950/20'
                      }`}
        >
          <div
            className={`w-12 h-12 bg-gradient-to-br ${grade.color} rounded-xl flex items-center justify-center 
                           shadow-lg group-hover:scale-110 transition-transform duration-200`}
          >
            <span className="text-2xl">{grade.emoji}</span>
          </div>
          <span
            className={`font-bold text-sm ${
              selectedGrade === grade.id
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            {grade.label}
          </span>
          {selectedGrade === grade.id && (
            <div
              className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-blue-600 rounded-full 
                            flex items-center justify-center text-white text-xs"
            >
              ✓
            </div>
          )}
        </button>
      ))}
    </div>
  </div>
);

// ── Subject Selector ──────────────────────────────────────────
const SubjectSelector = ({
  grade,
  onSelect,
  onBack,
  progress,
  t,
  language,
}) => {
  const subjects = getSubjectsForGrade(grade);

  return (
    <div className="animate-fade-in">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 
                   font-medium text-sm mb-6 group transition-colors"
      >
        <span className="group-hover:-translate-x-1 transition-transform">
          ←
        </span>
        Grade {grade}
      </button>

      <div className="mb-8">
        <h2 className="text-3xl font-black text-gray-900 dark:text-white">
          {t('chooseSubject')}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
          Grade {grade} · {subjects.length} subjects
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((subject) => {
          const curriculumData = CURRICULUM[subject.id];
          const allSubStrands =
            curriculumData?.strands?.flatMap((s) => s.subStrands) || [];
          const completed = allSubStrands.filter(
            (ss) => progress[ss.id]?.status === 'completed'
          ).length;
          const total = allSubStrands.length;
          const pct = total ? Math.round((completed / total) * 100) : 0;

          return (
            <button
              key={subject.id}
              onClick={() => onSelect(subject)}
              className="relative text-left bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 
                         rounded-3xl p-5 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] 
                         transition-all duration-200 group overflow-hidden"
            >
              {/* Background gradient hint */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${subject.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl`}
              />

              <div className="relative">
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${subject.color} rounded-2xl flex items-center 
                                  justify-center text-3xl shadow-lg mb-4 group-hover:scale-110 transition-transform duration-200`}
                >
                  {subject.emoji}
                </div>

                <h3 className="font-bold text-gray-900 dark:text-white text-base mb-0.5">
                  {language === 'en' ? subject.name : subject.kiswahili}
                </h3>
                <p className="text-gray-400 dark:text-gray-500 text-xs mb-4">
                  {subject.strands} strands
                </p>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400 dark:text-gray-500">
                      {t('yourProgress')}
                    </span>
                    <span className="font-semibold text-gray-600 dark:text-gray-400">
                      {pct}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${subject.color} rounded-full transition-all duration-700`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                {/* Arrow */}
                <div
                  className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center 
                                text-gray-300 dark:text-gray-600 group-hover:text-blue-500 group-hover:translate-x-1 
                                transition-all duration-200"
                >
                  →
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ── Strand/SubStrand List ─────────────────────────────────────
const StrandList = ({
  subject,
  onSelectLesson,
  onBack,
  progress,
  t,
  language,
}) => {
  const curriculumData = CURRICULUM[subject.id];
  const [expandedStrand, setExpandedStrand] = useState(null);

  if (!curriculumData) {
    return (
      <div className="animate-fade-in text-center py-16">
        <div className="text-5xl mb-4">🚧</div>
        <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">
          Coming Soon
        </h3>
        <p className="text-gray-400 dark:text-gray-500 text-sm mb-6">
          This subject's content is being prepared by our curriculum team.
        </p>
        <button onClick={onBack} className="btn-primary">
          ← Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 
                   font-medium text-sm mb-6 group transition-colors"
      >
        <span className="group-hover:-translate-x-1 transition-transform">
          ←
        </span>
        {language === 'en' ? subject.name : subject.kiswahili}
      </button>

      {/* Subject header */}
      <div
        className={`bg-gradient-to-br ${subject.color} rounded-3xl p-6 text-white mb-8`}
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-4xl">
            {subject.emoji}
          </div>
          <div>
            <h2 className="text-2xl font-black">
              {language === 'en' ? subject.name : subject.kiswahili}
            </h2>
            <p className="text-white/70 text-sm">
              {curriculumData.strands.length} strands · KICD Aligned
            </p>
          </div>
        </div>
      </div>

      {/* Strands */}
      <div className="space-y-3">
        {curriculumData.strands.map((strand, si) => {
          const isExpanded = expandedStrand === strand.id;
          const completedInStrand = strand.subStrands.filter(
            (ss) => progress[ss.id]?.status === 'completed'
          ).length;

          return (
            <div
              key={strand.id}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm"
            >
              {/* Strand header */}
              <button
                onClick={() => setExpandedStrand(isExpanded ? null : strand.id)}
                className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 
                                  rounded-lg flex items-center justify-center text-sm font-bold"
                  >
                    {si + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                      {language === 'en' ? strand.name : strand.kiswahili}
                    </h3>
                    <p className="text-gray-400 dark:text-gray-500 text-xs">
                      {completedInStrand}/{strand.subStrands.length} lessons
                      complete
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-xs font-semibold text-gray-400">
                    {Math.round(
                      (completedInStrand / strand.subStrands.length) * 100
                    )}
                    %
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              {/* Sub-strands */}
              {isExpanded && (
                <div className="border-t border-gray-100 dark:border-gray-700 divide-y divide-gray-50 dark:divide-gray-750">
                  {strand.subStrands.map((sub, ssi) => {
                    const subProgress = progress[sub.id];
                    const isCompleted = subProgress?.status === 'completed';
                    const isAttempted = subProgress?.status === 'attempted';

                    return (
                      <button
                        key={sub.id}
                        onClick={() => onSelectLesson(sub, subject)}
                        className="w-full flex items-center gap-4 px-5 py-4 hover:bg-blue-50 dark:hover:bg-blue-950/20 
                                   transition-colors text-left group"
                      >
                        {/* Status icon */}
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            isCompleted
                              ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600'
                              : isAttempted
                              ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-500'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                          }`}
                        >
                          {isCompleted
                            ? '✓'
                            : isAttempted
                            ? '▷'
                            : String(ssi + 1)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm truncate">
                            {language === 'en' ? sub.name : sub.kiswahili}
                          </p>
                          <div className="flex items-center gap-3 mt-0.5">
                            <span className="text-gray-400 dark:text-gray-500 text-xs">
                              ⏱ {sub.duration}
                            </span>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full ${
                                sub.difficulty === 'Beginner'
                                  ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                                  : sub.difficulty === 'Intermediate'
                                  ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                                  : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                              }`}
                            >
                              {sub.difficulty}
                            </span>
                            {subProgress?.best_score && (
                              <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                                Best: {subProgress.best_score}%
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          {isCompleted && (
                            <span
                              className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 
                                             px-2 py-0.5 rounded-full font-medium"
                            >
                              ✓ Done
                            </span>
                          )}
                          <svg
                            className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200"
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
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── Main Navigator ────────────────────────────────────────────
const CurriculumNavigator = () => {
  const { t, progress, selectedGrade, setSelectedGrade, language } = useApp();
  const { profile, updateProfile } = useAuth();

  const [step, setStep] = useState('grade'); // grade | subject | strands | lesson
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const handleGradeSelect = (grade) => {
    setSelectedGrade(grade);
    updateProfile({ selected_grade: grade });
    setStep('subject');
  };

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setStep('strands');
  };

  const handleLessonSelect = (lesson, subject) => {
    setSelectedLesson({ lesson, subject });
    setStep('lesson');
  };

  const handleLessonComplete = (result) => {
    // Optionally show celebration etc.
  };

  return (
    <div className="animate-fade-in">
      {step === 'grade' && (
        <GradeSelector
          selectedGrade={selectedGrade || profile?.selected_grade || 4}
          onSelect={handleGradeSelect}
          t={t}
          language={language}
        />
      )}

      {step === 'subject' && (
        <SubjectSelector
          grade={selectedGrade}
          onSelect={handleSubjectSelect}
          onBack={() => setStep('grade')}
          progress={progress}
          t={t}
          language={language}
        />
      )}

      {step === 'strands' && selectedSubject && (
        <StrandList
          subject={selectedSubject}
          onSelectLesson={handleLessonSelect}
          onBack={() => setStep('subject')}
          progress={progress}
          t={t}
          language={language}
        />
      )}

      {step === 'lesson' && selectedLesson && (
        <LessonView
          lesson={selectedLesson.lesson}
          subject={selectedLesson.subject}
          onBack={() => setStep('strands')}
          onComplete={handleLessonComplete}
        />
      )}
    </div>
  );
};

export default CurriculumNavigator;
