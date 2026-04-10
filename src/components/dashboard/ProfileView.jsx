import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useApp } from '../../context/AppContext'
import { GRADES } from '../../data/curriculum'

const ProfileView = () => {
  const { profile, updateProfile } = useAuth()
  const { t, language, showNotification } = useApp()

  const [editing, setEditing] = useState(false)
  const [saving,  setSaving]  = useState(false)
  const [form, setForm] = useState({
    full_name:      profile?.full_name || '',
    selected_grade: profile?.selected_grade || 4,
  })

  const handleSave = async () => {
    setSaving(true)
    const { error } = await updateProfile(form)
    setSaving(false)
    if (!error) {
      setEditing(false)
      showNotification('✅ Profile updated successfully!', 'success')
    } else {
      showNotification('❌ Failed to update profile', 'error')
    }
  }

  const handleCancel = () => {
    setForm({
      full_name:      profile?.full_name || '',
      selected_grade: profile?.selected_grade || 4,
    })
    setEditing(false)
  }

  const initials = profile?.full_name
    ? profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '??'

  return (
    <div className="animate-fade-in max-w-2xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white">
          {t('profile')} 👤
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
          {language === 'en'
            ? 'Manage your account and learning preferences'
            : 'Simamia akaunti yako na mapendeleo ya kujifunza'}
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 
                      dark:border-gray-700 shadow-sm overflow-hidden mb-6">

        {/* Cover banner */}
        <div className="h-28 bg-gradient-to-r from-blue-600 via-blue-500 to-gold-400 relative">
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }}
          />
        </div>

        <div className="px-6 pb-6">
          {/* Avatar row */}
          <div className="-mt-12 mb-6 flex items-end justify-between">
            <div className="relative">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt="avatar"
                  className="w-20 h-20 rounded-2xl object-cover border-4 
                             border-white dark:border-gray-800 shadow-xl"
                />
              ) : (
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 
                                rounded-2xl flex items-center justify-center text-white 
                                text-2xl font-black border-4 border-white dark:border-gray-800 shadow-xl">
                  {initials}
                </div>
              )}
              {/* Online dot */}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 
                              rounded-full border-2 border-white dark:border-gray-800" />
            </div>

            {/* Edit / Save button */}
            <div className="flex gap-2">
              {editing && (
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 rounded-xl text-sm font-semibold border border-gray-200 
                             dark:border-gray-600 text-gray-600 dark:text-gray-400 
                             hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={editing ? handleSave : () => setEditing(true)}
                disabled={saving}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  editing
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30'
                    : 'border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                } ${saving ? 'opacity-60 cursor-wait' : ''}`}
              >
                {saving ? 'Saving…' : editing ? '✓ Save Changes' : '✏️ Edit Profile'}
              </button>
            </div>
          </div>

          {/* Form or Display */}
          {editing ? (
            <div className="space-y-5">

              {/* Name field */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 
                                  mb-1.5 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  value={form.full_name}
                  onChange={e => setForm(prev => ({ ...prev, full_name: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 
                             dark:border-gray-600 rounded-xl text-gray-800 dark:text-gray-200 
                             font-medium focus:outline-none focus:border-blue-500 
                             focus:ring-2 focus:ring-blue-500/20 transition-all"
                  placeholder="Your full name"
                />
              </div>

              {/* Grade selector */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 
                                  mb-1.5 uppercase tracking-wider">
                  Current Grade
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {GRADES.map(g => (
                    <button
                      key={g.id}
                      onClick={() => setForm(prev => ({ ...prev, selected_grade: g.id }))}
                      className={`py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                        form.selected_grade === g.id
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:text-blue-600'
                      }`}
                    >
                      {g.id}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-black text-gray-900 dark:text-white">
                {profile?.full_name || 'Student'}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">
                {profile?.email}
              </p>
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 
                                 dark:text-blue-400 text-xs font-semibold rounded-full">
                  🎓 Grade {profile?.selected_grade || 4}
                </span>
                <span className="px-3 py-1 bg-gold-100 dark:bg-gold-900/20 text-gold-600 
                                 dark:text-gold-400 text-xs font-semibold rounded-full">
                  🔥 {profile?.streak_days || 0} day streak
                </span>
                <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 
                                 dark:text-emerald-400 text-xs font-semibold rounded-full">
                  ✓ {profile?.lessons_completed || 0} lessons done
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Lessons Done', value: profile?.lessons_completed || 0, icon: '📚', color: 'text-blue-600 dark:text-blue-400' },
          { label: 'Mastery',      value: `${profile?.mastery_score || 0}%`, icon: '🎯', color: 'text-gold-600 dark:text-gold-400' },
          { label: 'Streak',       value: `${profile?.streak_days || 0}d`,  icon: '🔥', color: 'text-orange-500' },
        ].map((s, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 
                       dark:border-gray-700 p-4 text-center shadow-sm"
          >
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className={`text-xl font-black ${s.color}`}>{s.value}</div>
            <div className="text-gray-400 dark:text-gray-500 text-xs mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Account Information */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 
                      dark:border-gray-700 shadow-sm overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h3 className="font-bold text-gray-900 dark:text-white">Account Information</h3>
        </div>
        <div className="divide-y divide-gray-50 dark:divide-gray-700">
          {[
            { label: 'Email Address', value: profile?.email,           icon: '📧' },
            { label: 'Sign-in Method', value: 'Google Account',        icon: '🔐' },
            { label: 'Member Since',   value: profile?.created_at
                ? new Date(profile.created_at).toLocaleDateString('en-KE', {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })
                : 'Recently',                                           icon: '📅' },
            { label: 'Last Active',    value: profile?.last_active
                ? new Date(profile.last_active).toLocaleDateString('en-KE', {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })
                : 'Today',                                              icon: '⏰' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-4">
              <div className="w-9 h-9 bg-gray-100 dark:bg-gray-700 rounded-xl 
                              flex items-center justify-center text-lg flex-shrink-0">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-gray-400 dark:text-gray-500">{item.label}</div>
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 truncate">
                  {item.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl border border-red-100 
                      dark:border-red-900/30 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-red-100 dark:border-red-900/30">
          <h3 className="font-bold text-red-600 dark:text-red-400">Danger Zone</h3>
        </div>
        <div className="px-6 py-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Signing out will end your session. Your progress is safely saved to the cloud.
          </p>
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to sign out?')) {
                // signOut called from navbar
              }
            }}
            className="px-5 py-2.5 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 
                       border border-red-200 dark:border-red-800 rounded-xl text-sm font-semibold 
                       hover:bg-red-100 dark:hover:bg-red-950/50 transition-all duration-200"
          >
            🚪 Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileView