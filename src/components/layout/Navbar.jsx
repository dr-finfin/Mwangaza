import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

const Navbar = ({ onMenuToggle }) => {
  const { profile, signOut } = useAuth();
  const {
    t,
    language,
    setLanguage,
    darkMode,
    setDarkMode,
    currentView,
    setCurrentView,
  } = useApp();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const initials = profile?.full_name
    ? profile.full_name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '??';

  return (
    <header
      className="fixed top-0 right-0 left-0 lg:left-64 z-40 bg-white/80 dark:bg-gray-900/80 
                       backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50"
    >
      <div className="flex items-center justify-between px-4 sm:px-6 h-16">
        {/* Left: Menu (mobile) + Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 
                       text-gray-500 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Breadcrumb */}
          <div className="hidden sm:flex items-center gap-2 text-sm">
            <span className="text-gray-400 dark:text-gray-500">
              {t('home')}
            </span>
            {currentView !== 'dashboard' && (
              <>
                <span className="text-gray-300">/</span>
                <span className="text-gray-700 dark:text-gray-300 font-medium capitalize">
                  {currentView}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Right: Search + Controls + Avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search */}
          {showSearch ? (
            <div className="relative flex items-center">
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => {
                  setShowSearch(false);
                  setSearchQuery('');
                }}
                placeholder={t('search')}
                className="w-48 sm:w-64 px-4 py-2 pr-8 bg-gray-100 dark:bg-gray-800 
                           border border-gray-200 dark:border-gray-700 rounded-xl text-sm 
                           text-gray-700 dark:text-gray-300 placeholder-gray-400 
                           focus:outline-none focus:border-blue-500 transition-all"
              />
              <button
                onMouseDown={() => {
                  setShowSearch(false);
                  setSearchQuery('');
                }}
                className="absolute right-2 text-gray-400 hover:text-gray-600 text-lg"
              >
                ×
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 
                         text-gray-500 dark:text-gray-400 transition-colors"
              title={t('search')}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          )}

          {/* Language toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'sw' : 'en')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl 
                       hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 
                       text-sm font-medium transition-all border border-gray-200/50 dark:border-gray-700/50"
          >
            <span>{language === 'en' ? '🇬🇧' : '🇰🇪'}</span>
            <span>{language.toUpperCase()}</span>
          </button>

          {/* Dark mode */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 
                       text-gray-500 dark:text-gray-400 transition-colors"
            title={t('darkMode')}
          >
            <span className="text-lg">{darkMode ? '☀️' : '🌙'}</span>
          </button>

          {/* Avatar / Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-2xl 
                         hover:bg-gray-100 dark:hover:bg-gray-800 transition-all group"
            >
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt="avatar"
                  className="w-8 h-8 rounded-xl object-cover ring-2 ring-blue-500/20"
                />
              ) : (
                <div
                  className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 
                                rounded-xl flex items-center justify-center text-white text-xs font-bold 
                                ring-2 ring-blue-500/20"
                >
                  {initials}
                </div>
              )}
              <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300 max-w-[100px] truncate">
                {profile?.full_name?.split(' ')[0] || 'Student'}
              </span>
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                  showDropdown ? 'rotate-180' : ''
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
            </button>

            {/* Dropdown menu */}
            {showDropdown && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowDropdown(false)}
                />
                <div
                  className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-900 
                                rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 
                                overflow-hidden z-50 animate-slide-up"
                >
                  {/* Profile header */}
                  <div className="px-4 py-3 bg-gradient-to-br from-blue-50 to-gold-50 dark:from-blue-950 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800">
                    <div className="font-semibold text-gray-800 dark:text-white text-sm truncate">
                      {profile?.full_name || 'Student'}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs truncate">
                      {profile?.email}
                    </div>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <span
                        className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 
                                       px-2 py-0.5 rounded-full font-medium"
                      >
                        Grade {profile?.selected_grade || 4}
                      </span>
                      <span
                        className="text-xs bg-gold-100 dark:bg-gold-900/30 text-gold-600 dark:text-gold-400 
                                       px-2 py-0.5 rounded-full font-medium flex items-center gap-1"
                      >
                        🔥 {profile?.streak_days || 0} days
                      </span>
                    </div>
                  </div>

                  {/* Menu items */}
                  <div className="py-1">
                    {[
                      {
                        icon: '👤',
                        label: t('profile'),
                        action: () => {
                          setCurrentView('profile');
                          setShowDropdown(false);
                        },
                      },
                      {
                        icon: language === 'en' ? '🇰🇪' : '🇬🇧',
                        label: `${t('language')}: ${
                          language === 'en' ? 'Kiswahili' : 'English'
                        }`,
                        action: () => {
                          setLanguage(language === 'en' ? 'sw' : 'en');
                          setShowDropdown(false);
                        },
                      },
                      {
                        icon: darkMode ? '☀️' : '🌙',
                        label: t('darkMode'),
                        action: () => {
                          setDarkMode(!darkMode);
                          setShowDropdown(false);
                        },
                      },
                    ].map((item, i) => (
                      <button
                        key={i}
                        onClick={item.action}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 
                                   hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
                      >
                        <span>{item.icon}</span>
                        {item.label}
                      </button>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 dark:border-gray-800 py-1">
                    <button
                      onClick={() => {
                        signOut();
                        setShowDropdown(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 
                                 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-left"
                    >
                      <span>🚪</span>
                      {t('signOut')}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
