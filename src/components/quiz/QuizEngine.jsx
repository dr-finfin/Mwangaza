import React, { useState, useCallback } from 'react';
import { useApp } from '../../context/AppContext';

const PASS_THRESHOLD = 80;

const QuizEngine = ({ quiz = [], lessonId, onComplete }) => {
  const { t, saveLessonProgress } = useApp();

  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState([]); // { questionId, correct }[]
  const [showResults, setShowResults] = useState(false);
  const [saving, setSaving] = useState(false);

  const question = quiz[currentQ];
  const totalQ = quiz.length;
  const isLast = currentQ === totalQ - 1;

  const handleSelect = (optionIndex) => {
    if (submitted) return;
    setSelected(optionIndex);
  };

  const handleSubmit = () => {
    if (selected === null) return;
    setSubmitted(true);
    const isCorrect = selected === question.correct;
    setAnswers((prev) => [
      ...prev,
      { questionId: question.id, correct: isCorrect, selected },
    ]);
  };

  const handleNext = () => {
    if (isLast) {
      setShowResults(true);
    } else {
      setCurrentQ((prev) => prev + 1);
      setSelected(null);
      setSubmitted(false);
    }
  };

  const score = answers.length
    ? Math.round((answers.filter((a) => a.correct).length / totalQ) * 100)
    : 0;
  const passed = score >= PASS_THRESHOLD;

  const handleFinish = useCallback(async () => {
    setSaving(true);
    await saveLessonProgress(lessonId, score, passed);
    setSaving(false);
    onComplete?.({ score, passed });
  }, [lessonId, score, passed, saveLessonProgress, onComplete]);

  const handleRetry = () => {
    setCurrentQ(0);
    setSelected(null);
    setSubmitted(false);
    setAnswers([]);
    setShowResults(false);
  };

  // ── Results Screen ─────────────────────────────────────────
  if (showResults) {
    return (
      <div className="animate-fade-in">
        <div
          className={`rounded-3xl p-8 text-center mb-6 ${
            passed
              ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white'
              : 'bg-gradient-to-br from-orange-400 to-red-500 text-white'
          }`}
        >
          <div className="text-6xl mb-4">
            {score === 100 ? '🏆' : passed ? '🎉' : '📚'}
          </div>
          <h2 className="text-3xl font-black mb-2">
            {score === 100
              ? 'Perfect Score!'
              : passed
              ? t('excellent')
              : t('keepPracticing')}
          </h2>
          <div className="text-6xl font-black my-4">{score}%</div>
          <p className="text-white/80 text-sm">
            {answers.filter((a) => a.correct).length} / {totalQ} correct
          </p>
        </div>

        {/* Answer review */}
        <div className="space-y-3 mb-6">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm">
            Review Your Answers
          </h3>
          {quiz.map((q, i) => {
            const ans = answers[i];
            const isCorrect = ans?.correct;
            return (
              <div
                key={q.id}
                className={`p-4 rounded-2xl border-2 ${
                  isCorrect
                    ? 'border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20 dark:border-emerald-800'
                    : 'border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800'
                }`}
              >
                <div className="flex items-start gap-2 mb-2">
                  <span
                    className={`text-lg flex-shrink-0 ${
                      isCorrect ? 'text-emerald-500' : 'text-red-500'
                    }`}
                  >
                    {isCorrect ? '✓' : '✗'}
                  </span>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {q.question}
                  </p>
                </div>
                {!isCorrect && (
                  <div className="ml-6 space-y-1 text-xs">
                    <p className="text-red-600 dark:text-red-400">
                      Your answer: {q.options[ans?.selected]}
                    </p>
                    <p className="text-emerald-600 dark:text-emerald-400">
                      Correct: {q.options[q.correct]}
                    </p>
                  </div>
                )}
                <div className="ml-6 mt-2 p-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-xs text-blue-700 dark:text-blue-300">
                  💡 {q.explanation}
                </div>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          {!passed && (
            <button
              onClick={handleRetry}
              className="flex-1 py-3.5 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 
                         font-semibold rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              🔄 {t('tryAgain')}
            </button>
          )}
          <button
            onClick={handleFinish}
            disabled={saving}
            className={`flex-1 py-3.5 font-bold rounded-2xl transition-all duration-200 shadow-lg ${
              passed
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-emerald-500/30'
                : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-blue-500/30'
            } ${
              saving
                ? 'opacity-70 cursor-wait'
                : 'hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            {saving
              ? 'Saving…'
              : passed
              ? `✓ ${t('lessonComplete')}`
              : 'Continue Anyway →'}
          </button>
        </div>

        {!passed && (
          <p className="text-center text-xs text-gray-400 mt-3">
            {t('passRequired')} ({PASS_THRESHOLD}% needed)
          </p>
        )}
      </div>
    );
  }

  // ── Question Screen ────────────────────────────────────────
  const isCorrect = submitted && selected === question.correct;
  const isWrong = submitted && selected !== question.correct;

  return (
    <div className="animate-fade-in">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
            Question {currentQ + 1} of {totalQ}
          </span>
          <span className="text-sm text-gray-400">
            {answers.filter((a) => a.correct).length} correct so far
          </span>
        </div>
        <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-gold-500 rounded-full transition-all duration-500"
            style={{ width: `${(currentQ / totalQ) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <div className="flex items-start gap-3 p-5 bg-blue-50 dark:bg-blue-950/30 rounded-2xl border border-blue-100 dark:border-blue-900/50">
          <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">
            {currentQ + 1}
          </div>
          <p className="text-gray-800 dark:text-gray-200 font-medium leading-relaxed">
            {question.question}
          </p>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, i) => {
          let optClass = 'quiz-option quiz-option-default';

          if (submitted) {
            if (i === question.correct)
              optClass = 'quiz-option quiz-option-correct';
            else if (i === selected) optClass = 'quiz-option quiz-option-wrong';
            else
              optClass =
                'quiz-option border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 text-gray-400 cursor-default';
          } else if (i === selected) {
            optClass = 'quiz-option quiz-option-selected';
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={submitted}
              className={optClass}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all ${
                    submitted && i === question.correct
                      ? 'border-emerald-500 bg-emerald-500 text-white'
                      : submitted && i === selected
                      ? 'border-red-400 bg-red-400 text-white'
                      : i === selected
                      ? 'border-blue-500 bg-blue-500 text-white'
                      : 'border-gray-300 dark:border-gray-600 text-gray-500'
                  }`}
                >
                  {submitted && i === question.correct
                    ? '✓'
                    : submitted && i === selected
                    ? '✗'
                    : String.fromCharCode(65 + i)}
                </div>
                <span className="text-left">{option}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {submitted && (
        <div
          className={`p-4 rounded-2xl mb-6 animate-slide-up ${
            isCorrect
              ? 'bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800'
              : 'bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{isCorrect ? '✅' : '❌'}</span>
            <span
              className={`font-semibold text-sm ${
                isCorrect
                  ? 'text-emerald-700 dark:text-emerald-400'
                  : 'text-red-700 dark:text-red-400'
              }`}
            >
              {isCorrect ? t('correct') : t('incorrect')}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            💡 <strong>{t('explanation')}:</strong> {question.explanation}
          </p>
        </div>
      )}

      {/* Action button */}
      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={selected === null}
          className={`w-full py-4 rounded-2xl font-bold text-base transition-all duration-200 ${
            selected !== null
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98]'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
          }`}
        >
          {t('submit')}
        </button>
      ) : (
        <button
          onClick={handleNext}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white 
                     font-bold text-base rounded-2xl shadow-lg shadow-blue-500/30 
                     hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          {isLast ? t('checkResults') : t('next')} →
        </button>
      )}
    </div>
  );
};

export default QuizEngine;
