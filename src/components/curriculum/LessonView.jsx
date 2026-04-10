import React, { useState } from 'react'
import QuizEngine from '../quiz/QuizEngine'
import { useApp } from '../../context/AppContext'

const LessonView = ({ lesson, subject, onBack, onComplete }) => {
  const { t, progress, language } = useApp()
  const [activeTab, setActiveTab] = useState('video')

  const lessonProgress = progress[lesson.id]
  const isCompleted    = lessonProgress?.status === 'completed'
  const hasQuiz        = lesson.quiz && lesson.quiz.length > 0
  const hasVideo       = !!lesson.videoUrl

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">

      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-gray-700
                   dark:hover:text-gray-200 font-medium text-sm mb-6
                   transition-colors group"
      >
        <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
        Back to {language === 'en' ? subject?.name : subject?.kiswahili}
      </button>

      {/* Lesson header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            {language === 'en' ? subject?.name : subject?.kiswahili}
          </span>
          <span className="text-gray-200 dark:text-gray-700">·</span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            lesson.difficulty === 'Beginner'
              ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
              : lesson.difficulty === 'Intermediate'
                ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                : 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400'
          }`}>
            {lesson.difficulty}
          </span>
          <span className="text-gray-200 dark:text-gray-700">·</span>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {lesson.duration}
          </span>
          {isCompleted && (
            <>
              <span className="text-gray-200 dark:text-gray-700">·</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-medium
                               bg-emerald-50 text-emerald-600
                               dark:bg-emerald-900/30 dark:text-emerald-400">
                ✓ Completed
              </span>
            </>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white leading-tight">
          {language === 'en' ? lesson.name : lesson.kiswahili}
        </h1>

        {/* Previous attempt info */}
        {lessonProgress && (
          <div className="flex items-center gap-4 mt-3 text-sm text-gray-400 dark:text-gray-500">
            <span>Best score: <strong className="text-gray-700 dark:text-gray-300">{lessonProgress.best_score || lessonProgress.score || 0}%</strong></span>
            <span>·</span>
            <span>Attempts: <strong className="text-gray-700 dark:text-gray-300">{lessonProgress.attempts || 0}</strong></span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-gray-200 dark:border-gray-700 mb-8">
        {/* Video tab — always shown */}
        <button
          onClick={() => setActiveTab('video')}
          className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all duration-150 -mb-px ${
            activeTab === 'video'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Video Lesson
        </button>

        {/* Quiz tab — only shown if quiz exists */}
        {hasQuiz && (
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all duration-150 -mb-px ${
              activeTab === 'quiz'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Quick Check
            {isCompleted && (
              <span className="ml-2 text-xs bg-emerald-100 dark:bg-emerald-900/30
                               text-emerald-600 dark:text-emerald-400
                               px-1.5 py-0.5 rounded-full">
                ✓
              </span>
            )}
          </button>
        )}

        {/* Notes tab — always shown */}
        <button
          onClick={() => setActiveTab('notes')}
          className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all duration-150 -mb-px ${
            activeTab === 'notes'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Key Notes
        </button>
      </div>

      {/* ── VIDEO TAB ──────────────────────────────────────────── */}
      {activeTab === 'video' && (
        <div className="animate-fade-in">

          {/* Video player or coming soon */}
          {hasVideo ? (
            <div
              className="relative w-full bg-gray-900 rounded-2xl overflow-hidden mb-8"
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
          ) : (
            <div className="w-full bg-gray-50 dark:bg-gray-800/50 border-2 border-dashed
                            border-gray-200 dark:border-gray-700 rounded-2xl
                            flex flex-col items-center justify-center py-24 mb-8">
              <p className="text-4xl mb-4">🚧</p>
              <p className="font-bold text-gray-700 dark:text-gray-300 text-lg">
                Video Coming Soon
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-2 text-center max-w-xs">
                Our team is preparing this lesson. Check back soon.
              </p>
            </div>
          )}

          {/* What you will learn */}
          <div className="mb-8">
            <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4">
              {t('whatYouWillLearn')}
            </h2>
            <ul className="space-y-3">
              {lesson.outcomes?.map((outcome, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-blue-100 dark:bg-blue-900/30 text-blue-600
                                  dark:text-blue-400 rounded-full flex items-center
                                  justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <span className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {outcome}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA — only show if quiz exists */}
          {hasQuiz && (
            <button
              onClick={() => setActiveTab('quiz')}
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl
                         hover:bg-blue-700 active:scale-95 transition-all duration-150
                         shadow-lg shadow-blue-600/20"
            >
              {isCompleted ? 'Retake the Quiz →' : 'Take the Quiz →'}
            </button>
          )}

          {/* If no quiz, show coming soon note */}
          {!hasQuiz && (
            <div className="w-full py-4 bg-gray-50 dark:bg-gray-800 border border-gray-200
                            dark:border-gray-700 rounded-xl text-center">
              <p className="text-gray-400 dark:text-gray-500 text-sm">
                Quiz coming soon for this lesson
              </p>
            </div>
          )}
        </div>
      )}

      {/* ── QUIZ TAB ───────────────────────────────────────────── */}
      {activeTab === 'quiz' && hasQuiz && (
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">
                {t('quiz')}
              </h2>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-0.5">
                {lesson.quiz.length} questions · {t('passRequired')}
              </p>
            </div>
            {isCompleted && (
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400
                               bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-xl">
                ✓ Best: {lessonProgress?.best_score || 0}%
              </span>
            )}
          </div>

          <QuizEngine
            quiz={lesson.quiz}
            lessonId={lesson.id}
            onComplete={(result) => {
              onComplete?.(result)
              if (result.passed) {
                setTimeout(() => setActiveTab('video'), 2000)
              }
            }}
          />
        </div>
      )}

      {/* ── NOTES TAB ──────────────────────────────────────────── */}
      {activeTab === 'notes' && (
        <div className="animate-fade-in space-y-3">
          <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">
            Key points from this lesson to help you study and revise.
          </p>

          {lesson.outcomes?.map((outcome, i) => (
            <div
              key={i}
              className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl
                         border-l-4 border-blue-500"
            >
              <span className="text-xs font-black text-blue-500 font-mono mt-0.5 flex-shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {outcome}
              </p>
            </div>
          ))}

          {/* Reminder box */}
          {hasQuiz && !isCompleted && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-100
                            dark:border-blue-900/50 rounded-xl flex items-start gap-3">
              <span className="text-blue-500 text-lg flex-shrink-0">💡</span>
              <div>
                <p className="text-blue-800 dark:text-blue-300 font-semibold text-sm">
                  Ready to test yourself?
                </p>
                <p className="text-blue-600 dark:text-blue-400 text-xs mt-0.5">
                  Score 80% or above on the quiz to mark this lesson as complete.
                </p>
                <button
                  onClick={() => setActiveTab('quiz')}
                  className="mt-3 text-xs font-bold text-blue-600 dark:text-blue-400
                             hover:underline"
                >
                  Take the quiz →
                </button>
              </div>
            </div>
          )}

          {isCompleted && (
            <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-950/30 border
                            border-emerald-100 dark:border-emerald-900/50 rounded-xl
                            flex items-center gap-3">
              <span className="text-2xl">🏆</span>
              <div>
                <p className="text-emerald-800 dark:text-emerald-300 font-semibold text-sm">
                  Lesson Complete
                </p>
                <p className="text-emerald-600 dark:text-emerald-400 text-xs mt-0.5">
                  You scored {lessonProgress?.best_score || 0}% on your best attempt.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default LessonView