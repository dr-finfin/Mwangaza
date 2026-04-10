import React, { useState } from 'react';
import QuizEngine from '../quiz/QuizEngine';
import { useApp } from '../../context/AppContext';

const LessonView = ({ lesson, subject, onBack, onComplete }) => {
  const { t, progress, language } = useApp();
  const [activeTab, setActiveTab] = useState('video');

  const lessonProgress = progress[lesson.id];
  const isCompleted = lessonProgress?.status === 'completed';

  const tabs = [
    { id: 'video', label: '▶ Video', labelSw: '▶ Video' },
    { id: 'quiz', label: '✏️ Quiz', labelSw: '✏️ Mtihani' },
    { id: 'notes', label: '📝 Notes', labelSw: '📝 Maelezo' },
  ];

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 
                   font-medium text-sm mb-6 group transition-colors"
      >
        <span className="group-hover:-translate-x-1 transition-transform duration-200">
          ←
        </span>
        Back to {subject?.name || 'Curriculum'}
      </button>

      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-6 sm:p-8 text-white mb-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">
                {lesson.difficulty}
              </span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">
                ⏱ {lesson.duration}
              </span>
              {isCompleted && (
                <span className="px-3 py-1 bg-emerald-400/30 border border-emerald-300/50 rounded-full text-xs font-semibold text-emerald-100">
                  ✓ Completed
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black leading-tight mb-2">
              {language === 'en' ? lesson.name : lesson.kiswahili}
            </h1>
            <p className="text-blue-200 text-sm">{subject?.name}</p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
            <span className="text-3xl">{subject?.emoji || '📚'}</span>
          </div>
        </div>

        {/* Previous score */}
        {lessonProgress && (
          <div className="mt-4 pt-4 border-t border-white/20 flex items-center gap-4 text-sm">
            <div>
              <span className="text-blue-200">Best Score: </span>
              <span className="font-bold">
                {lessonProgress.best_score || lessonProgress.score || 0}%
              </span>
            </div>
            <div>
              <span className="text-blue-200">Attempts: </span>
              <span className="font-bold">{lessonProgress.attempts || 0}</span>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-md'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {language === 'en' ? tab.label : tab.labelSw}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div
        className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 
                      shadow-sm overflow-hidden"
      >
        {/* VIDEO TAB */}
        {activeTab === 'video' && (
          <div>
            {/* Video player */}
            <div
              className="relative w-full bg-black"
              style={{ paddingBottom: '56.25%' }}
            >
              <iframe
                className="absolute inset-0 w-full h-full"
                src={lesson.videoUrl}
                title={lesson.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* What you will learn */}
            <div className="p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                🎯 {t('whatYouWillLearn')}
              </h2>
              <ul className="space-y-3">
                {lesson.outcomes?.map((outcome, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/30 
                               rounded-xl border border-blue-100 dark:border-blue-900/50"
                  >
                    <div
                      className="w-6 h-6 bg-blue-600 text-white rounded-lg flex items-center justify-center 
                                    text-xs font-bold flex-shrink-0 mt-0.5"
                    >
                      {i + 1}
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                      {outcome}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setActiveTab('quiz')}
                className="w-full mt-6 py-4 bg-gradient-to-r from-gold-400 to-gold-500 text-white 
                           font-bold rounded-2xl shadow-lg shadow-gold-500/30 
                           hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                I'm Ready — Take the Quiz! ✏️
              </button>
            </div>
          </div>
        )}

        {/* QUIZ TAB */}
        {activeTab === 'quiz' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  {t('quiz')}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">
                  {lesson.quiz?.length || 0} questions · {t('passRequired')}
                </p>
              </div>
              <div className="w-12 h-12 bg-gold-100 dark:bg-gold-900/30 rounded-2xl flex items-center justify-center">
                <span className="text-2xl">✏️</span>
              </div>
            </div>

            <QuizEngine
              quiz={lesson.quiz || []}
              lessonId={lesson.id}
              onComplete={(result) => {
                onComplete?.(result);
                if (result.passed) {
                  setTimeout(() => setActiveTab('video'), 1500);
                }
              }}
            />
          </div>
        )}

        {/* NOTES TAB */}
        {activeTab === 'notes' && (
          <div className="p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              📝 Lesson Notes
            </h2>
            <div className="space-y-4">
              {lesson.outcomes?.map((outcome, i) => (
                <div
                  key={i}
                  className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border-l-4 border-blue-500"
                >
                  <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1 uppercase tracking-wider">
                    Key Point {i + 1}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {outcome}
                  </p>
                </div>
              ))}

              <div className="p-4 bg-gold-50 dark:bg-gold-900/20 rounded-2xl border border-gold-200 dark:border-gold-800/50">
                <div className="text-xs font-semibold text-gold-600 dark:text-gold-400 mb-1 uppercase tracking-wider">
                  💡 Remember
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Complete the quiz with at least 80% to mark this lesson as
                  complete!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonView;
