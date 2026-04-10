import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import ProgressRing from '../ui/ProgressRing';
import AnimatedCounter from '../ui/AnimatedCounter';

// ── Individual Bento Cards ────────────────────────────────────

const MasteryCard = ({ profile, t }) => (
  <div className="bento-card bg-gradient-to-br from-blue-600 to-blue-800 text-white col-span-2 sm:col-span-1">
    <div className="flex items-start justify-between h-full flex-col gap-4">
      <div>
        <p className="text-blue-200 text-sm font-medium">{t('masteryScore')}</p>
        <p className="text-4xl font-black mt-1">
          <AnimatedCounter target={profile?.mastery_score || 0} suffix="%" />
        </p>
      </div>
      <ProgressRing
        percentage={profile?.mastery_score || 0}
        size={70}
        strokeWidth={7}
        color="#fbbf24"
        bgColor="rgba(255,255,255,0.2)"
      >
        <span className="text-white font-bold text-sm">
          {profile?.mastery_score || 0}%
        </span>
      </ProgressRing>
      <div className="w-full">
        <div className="flex justify-between text-xs text-blue-200 mb-1.5">
          <span>Progress</span>
          <span>{profile?.mastery_score || 0}/100</span>
        </div>
        <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gold-400 rounded-full transition-all duration-1000"
            style={{ width: `${profile?.mastery_score || 0}%` }}
          />
        </div>
      </div>
    </div>
  </div>
);

const StreakCard = ({ profile, t }) => (
  <div className="bento-card bg-gradient-to-br from-orange-400 to-red-500 text-white">
    <div className="flex flex-col items-center justify-center text-center gap-2 h-full py-4">
      <div className="text-5xl flame-icon">🔥</div>
      <div className="text-5xl font-black">
        <AnimatedCounter target={profile?.streak_days || 0} />
      </div>
      <div className="text-orange-100 font-medium text-sm">
        {t('dailyStreak')}
      </div>
      <div className="flex gap-1 mt-1">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className={`w-5 h-5 rounded-md text-xs flex items-center justify-center font-bold ${
              i < (profile?.streak_days || 0) % 7 ||
              (profile?.streak_days || 0) >= 7
                ? 'bg-white/30 text-white'
                : 'bg-white/10 text-orange-200'
            }`}
          >
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const LessonsCard = ({ profile, t }) => (
  <div className="bento-card bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
    <div className="flex flex-col gap-3 h-full">
      <p className="text-emerald-100 text-sm font-medium">
        {t('lessonsCompleted')}
      </p>
      <p className="text-5xl font-black">
        <AnimatedCounter target={profile?.lessons_completed || 0} />
      </p>
      <div className="mt-auto">
        <div className="text-xs text-emerald-100 mb-1">Level Progress</div>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded-full ${
                i <= Math.floor((profile?.lessons_completed || 0) / 3)
                  ? 'bg-white'
                  : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const QuoteCard = ({ language }) => {
  const quotes = {
    en: [
      '"Education is the most powerful weapon which you can use to change the world." — Nelson Mandela',
      '"The roots of education are bitter, but the fruit is sweet." — Aristotle',
      '"Live as if you were to die tomorrow. Learn as if you were to live forever." — Gandhi',
    ],
    sw: [
      '"Elimu ni silaha yenye nguvu zaidi unayoweza kutumia kubadilisha ulimwengu." — Nelson Mandela',
      '"Mizizi ya elimu ni chungu, lakini matunda yake ni tamu." — Aristotle',
    ],
  };
  const list = quotes[language] || quotes.en;
  const quote = list[Math.floor(Date.now() / 86400000) % list.length];

  return (
    <div className="bento-card bg-gradient-to-br from-violet-600 to-purple-800 text-white col-span-2">
      <div className="flex flex-col gap-3 h-full">
        <span className="text-violet-300 text-xs font-semibold uppercase tracking-wider">
          Daily Wisdom
        </span>
        <p className="text-white/90 text-sm leading-relaxed italic flex-1">
          {quote}
        </p>
        <div className="flex items-center gap-2">
          <div className="w-6 h-0.5 bg-gold-400 rounded-full" />
          <span className="text-violet-200 text-xs">Thought of the Day</span>
        </div>
      </div>
    </div>
  );
};

const GradeCard = ({ profile, t, onNavigate }) => (
  <div
    className="bento-card bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm cursor-pointer"
    onClick={() => onNavigate('curriculum')}
  >
    <div className="flex flex-col gap-3 h-full">
      <div className="flex items-center justify-between">
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
          {t('grade')}
        </p>
        <span className="text-2xl">🎓</span>
      </div>
      <div className="text-4xl font-black text-gray-900 dark:text-white">
        {profile?.selected_grade || 4}
      </div>
      <div
        className="mt-auto px-3 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl text-center 
                      hover:bg-blue-700 transition-colors"
      >
        {t('continueLeaning')} →
      </div>
    </div>
  </div>
);

const RecentCard = ({ progress, t, onNavigate }) => {
  const recentLessons = Object.entries(progress)
    .filter(([, p]) => p.status)
    .slice(0, 3);

  return (
    <div className="bento-card bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm col-span-2 sm:col-span-2">
      <div className="flex flex-col gap-3 h-full">
        <div className="flex items-center justify-between">
          <p className="text-gray-800 dark:text-white font-semibold text-sm">
            Recent Activity
          </p>
          <button
            onClick={() => onNavigate('curriculum')}
            className="text-blue-600 dark:text-blue-400 text-xs font-medium hover:underline"
          >
            View all →
          </button>
        </div>

        {recentLessons.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-4 gap-2">
            <span className="text-3xl">📚</span>
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              No lessons yet — start learning!
            </p>
            <button
              onClick={() => onNavigate('curriculum')}
              className="mt-2 px-4 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Your First Lesson
            </button>
          </div>
        ) : (
          <div className="space-y-2 flex-1">
            {recentLessons.map(([lessonId, data]) => (
              <div
                key={lessonId}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50 dark:bg-gray-700/50"
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0 ${
                    data.status === 'completed'
                      ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600'
                      : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600'
                  }`}
                >
                  {data.status === 'completed' ? '✓' : '▶'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-gray-800 dark:text-gray-200 text-xs font-medium truncate">
                    {lessonId
                      .replace(/-/g, ' ')
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </div>
                  <div className="text-gray-400 dark:text-gray-500 text-xs">
                    Score: {data.best_score || data.score || 0}%
                  </div>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    data.status === 'completed'
                      ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                      : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  }`}
                >
                  {data.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ── Main BentoGrid ────────────────────────────────────────────

const BentoGrid = () => {
  const { profile } = useAuth();
  const { t, progress, setCurrentView, language } = useApp();

  const today = new Date().toLocaleDateString('en-KE', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="animate-fade-in">
      {/* Welcome header */}
      <div className="mb-8">
        <p className="text-gray-500 dark:text-gray-400 text-sm">{today}</p>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white mt-1">
          {t('welcome')},{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-gold-500">
            {profile?.full_name?.split(' ')[0] || 'Scholar'}! 👋
          </span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          {language === 'en'
            ? "Here's your learning snapshot for today."
            : 'Hapa kuna muhtasari wako wa kujifunza leo.'}
        </p>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 auto-rows-[160px]">
        {/* Mastery — tall on mobile */}
        <div className="col-span-1 row-span-2 sm:col-span-1 sm:row-span-2">
          <MasteryCard profile={profile} t={t} />
        </div>

        {/* Streak */}
        <div className="col-span-1 sm:col-span-1">
          <StreakCard profile={profile} t={t} />
        </div>

        {/* Lessons */}
        <div className="col-span-1 sm:col-span-1">
          <LessonsCard profile={profile} t={t} />
        </div>

        {/* Grade */}
        <div className="col-span-1 sm:col-span-1">
          <GradeCard profile={profile} t={t} onNavigate={setCurrentView} />
        </div>

        {/* Quote — wide */}
        <div className="col-span-2 sm:col-span-2">
          <QuoteCard language={language} />
        </div>

        {/* Recent activity — wide */}
        <div className="col-span-2 sm:col-span-2 row-span-2">
          <RecentCard progress={progress} t={t} onNavigate={setCurrentView} />
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            icon: '📚',
            label:
              language === 'en' ? 'Continue Learning' : 'Endelea Kujifunza',
            color: 'from-blue-500 to-blue-700',
            action: 'curriculum',
          },
          {
            icon: '📊',
            label: language === 'en' ? 'View Progress' : 'Angalia Maendeleo',
            color: 'from-emerald-500 to-teal-600',
            action: 'progress',
          },
          {
            icon: '👤',
            label: language === 'en' ? 'Update Profile' : 'Sasisha Wasifu',
            color: 'from-violet-500 to-purple-700',
            action: 'profile',
          },
        ].map((btn, i) => (
          <button
            key={i}
            onClick={() => setCurrentView(btn.action)}
            className={`flex items-center gap-3 px-5 py-4 bg-gradient-to-r ${btn.color} 
                        text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl 
                        hover:scale-[1.02] active:scale-[0.98] transition-all duration-200`}
          >
            <span className="text-2xl">{btn.icon}</span>
            {btn.label}
            <span className="ml-auto">→</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BentoGrid;
