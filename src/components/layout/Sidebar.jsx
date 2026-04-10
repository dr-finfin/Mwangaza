import React from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
  { id: 'dashboard', icon: '🏠', label: 'Home', labelSw: 'Nyumbani' },
  { id: 'curriculum', icon: '📚', label: 'Learn', labelSw: 'Jifunza' },
  { id: 'progress', icon: '📊', label: 'Progress', labelSw: 'Maendeleo' },
  { id: 'profile', icon: '👤', label: 'Profile', labelSw: 'Wasifu' },
];

const Sidebar = ({ mobileOpen, onClose }) => {
  const { currentView, setCurrentView, language, t } = useApp();
  const { profile, signOut } = useAuth();

  const navigate = (view) => {
    setCurrentView(view);
    onClose?.();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl 
                          flex items-center justify-center shadow-lg shadow-gold-500/30 flex-shrink-0"
          >
            <span className="text-xl">☀️</span>
          </div>
          <div className="min-w-0">
            <div className="font-black text-lg text-gray-900 dark:text-white tracking-tight leading-none">
              MWANGAZA
            </div>
            <div className="text-gold-500 text-xs font-medium">
              {language === 'en' ? 'Illuminate Learning' : 'Angaza Elimu'}
            </div>
          </div>
        </div>
      </div>

      {/* Grade badge */}
      {profile && (
        <div
          className="px-4 py-3 mx-4 mt-4 bg-gradient-to-r from-blue-50 to-gold-50 
                        dark:from-blue-950/50 dark:to-gray-800 rounded-2xl border border-blue-100 dark:border-blue-900/50"
        >
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">
            Currently studying
          </div>
          <div className="font-bold text-blue-700 dark:text-blue-300 text-sm">
            Grade {profile.selected_grade || 4}
          </div>
          <div className="flex items-center gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full flex-1 ${
                  i < Math.round((profile.mastery_score || 0) / 20)
                    ? 'bg-blue-500'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              />
            ))}
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1 flex-shrink-0">
              {profile.mastery_score || 0}%
            </span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-3 mb-3">
          {language === 'en' ? 'Navigation' : 'Urambazaji'}
        </div>

        {NAV_ITEMS.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium 
                          transition-all duration-200 group ${
                            isActive
                              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                          }`}
            >
              <span
                className={`text-lg transition-transform duration-200 ${
                  !isActive && 'group-hover:scale-110'
                }`}
              >
                {item.icon}
              </span>
              <span>{language === 'en' ? item.label : item.labelSw}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 bg-gold-400 rounded-full" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom: Streak + Sign out */}
      <div className="px-4 py-4 border-t border-gray-100 dark:border-gray-800 space-y-3">
        {/* Streak */}
        <div
          className="flex items-center gap-3 px-3 py-2.5 bg-gradient-to-r from-orange-50 to-red-50 
                        dark:from-orange-950/30 dark:to-red-950/30 rounded-xl border border-orange-100 dark:border-orange-900/30"
        >
          <span className="text-2xl flame-icon">🔥</span>
          <div>
            <div className="font-bold text-gray-800 dark:text-white text-sm">
              {profile?.streak_days || 0} {t('dailyStreak')}
            </div>
            <div className="text-orange-600 dark:text-orange-400 text-xs">
              {language === 'en' ? 'Keep it going!' : 'Endelea!'}
            </div>
          </div>
        </div>

        {/* Sign out */}
        <button
          onClick={signOut}
          className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-gray-500 dark:text-gray-400 
                     hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 
                     rounded-xl transition-all duration-200"
        >
          <span>🚪</span>
          {t('signOut')}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:block fixed left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-900 
                        border-r border-gray-200/50 dark:border-gray-700/50 z-30 overflow-y-auto"
      >
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <aside className="relative w-72 bg-white dark:bg-gray-900 h-full overflow-y-auto shadow-2xl animate-slide-up">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;
