import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { useAuth } from '../../context/AuthContext'

const NAV_ITEMS = [
  { path: '/dashboard',  icon: '🏠', label: 'Home',     labelSw: 'Nyumbani'   },
  { path: '/curriculum', icon: '📚', label: 'Learn',    labelSw: 'Jifunza'    },
  { path: '/progress',   icon: '📊', label: 'Progress', labelSw: 'Maendeleo'  },
  { path: '/profile',    icon: '👤', label: 'Profile',  labelSw: 'Wasifu'     },
]

const Sidebar = ({ mobileOpen, onClose }) => {
  const navigate  = useNavigate()
  const location  = useLocation()
  const { language, t } = useApp()
  const { profile, signOut } = useAuth()

  const handleNav = (path) => {
    navigate(path)
    onClose?.()
  }

  const sidebarContent = (
    <div className="flex flex-col h-full">

      {/* Logo */}
      <div className="px-4 py-5 border-b border-gray-100 dark:border-gray-800">
        <button
          onClick={() => handleNav('/dashboard')}
          className="flex items-center gap-3 w-full text-left"
        >
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center
                          justify-center flex-shrink-0 shadow-lg shadow-blue-600/20">
            <span className="text-white font-black text-lg">M</span>
          </div>
          <div className="min-w-0">
            <div className="font-black text-lg text-gray-900 dark:text-white
                            tracking-tight leading-none">
              MWANGAZA
            </div>
            <div
              className="text-xs font-medium mt-0.5"
              style={{ color: '#C9A84C' }}
            >
              {language === 'en' ? 'Illuminate Learning' : 'Angaza Elimu'}
            </div>
          </div>
        </button>
      </div>

      {/* Grade badge */}
      {profile && (
        <div className="px-4 pt-4">
          <div className="px-3 py-2.5 bg-blue-50 dark:bg-blue-950/30 rounded-xl
                          border border-blue-100 dark:border-blue-900/50">
            <div className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">
              Currently studying
            </div>
            <div className="font-bold text-blue-700 dark:text-blue-300 text-sm">
              Grade {profile.selected_grade || 4}
            </div>
            <div className="flex items-center gap-1 mt-1.5">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full flex-1 transition-all ${
                    i < Math.round((profile.mastery_score || 0) / 20)
                      ? 'bg-blue-500'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              ))}
              <span className="text-xs text-gray-400 dark:text-gray-500 ml-1 flex-shrink-0">
                {profile.mastery_score || 0}%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <div className="text-xs font-semibold text-gray-300 dark:text-gray-600
                        uppercase tracking-wider px-3 mb-3">
          {language === 'en' ? 'Navigation' : 'Urambazaji'}
        </div>

        {NAV_ITEMS.map(item => {
          const isActive = location.pathname === item.path
          return (
            <button
              key={item.path}
              onClick={() => handleNav(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                          text-sm font-medium transition-all duration-150 group ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <span className={`text-base transition-transform duration-150 ${
                !isActive && 'group-hover:scale-110'
              }`}>
                {item.icon}
              </span>
              <span>{language === 'en' ? item.label : item.labelSw}</span>
              {isActive && (
                <div
                  className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: '#C9A84C' }}
                />
              )}
            </button>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="px-4 py-4 border-t border-gray-100 dark:border-gray-800 space-y-2">

        {/* Streak */}
        <div className="flex items-center gap-3 px-3 py-2.5 bg-orange-50
                        dark:bg-orange-950/20 rounded-xl border border-orange-100
                        dark:border-orange-900/30">
          <span className="text-xl flame-icon flex-shrink-0">🔥</span>
          <div className="min-w-0">
            <div className="font-bold text-gray-800 dark:text-white text-sm">
              {profile?.streak_days || 0} {t('dailyStreak')}
            </div>
            <div className="text-orange-500 dark:text-orange-400 text-xs">
              {language === 'en' ? 'Keep it going!' : 'Endelea!'}
            </div>
          </div>
        </div>

        {/* Sign out */}
        <button
          onClick={signOut}
          className="w-full flex items-center gap-2 px-3 py-2.5 text-sm
                     text-gray-400 hover:text-red-500 hover:bg-red-50
                     dark:hover:bg-red-950/20 rounded-xl transition-all duration-150"
        >
          <span>🚪</span>
          {t('signOut')}
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:block fixed left-0 top-0 bottom-0 w-64
                        bg-white dark:bg-gray-900 border-r border-gray-100
                        dark:border-gray-800 z-30 overflow-y-auto">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <aside className="relative w-72 bg-white dark:bg-gray-900
                            h-full overflow-y-auto shadow-2xl animate-slide-up">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  )
}

export default Sidebar