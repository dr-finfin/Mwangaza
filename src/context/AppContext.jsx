import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'
import { UI_STRINGS } from '../data/curriculum'

const AppContext = createContext(null)

export const AppProvider = ({ children }) => {
  const { user, profile, updateProfile } = useAuth()
  const navigate = useNavigate()

  const [language,      setLanguage]    = useState('en')
  const [darkMode,      setDarkMode]    = useState(false)
  const [progress,      setProgress]    = useState({})
  const [notification,  setNotification] = useState(null)
  const [selectedGrade, setSelectedGrade] = useState(4)

  const t = (key) => UI_STRINGS[language]?.[key] || UI_STRINGS.en[key] || key

  // Navigate to dashboard when user signs in
  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user])

  // Dark mode class toggle
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  // Load progress from Supabase
  useEffect(() => {
    if (!user) {
      setProgress({})
      return
    }

    const fetchProgress = async () => {
      const { data, error } = await supabase
        .from('lesson_progress')
        .select('*')
        .eq('user_id', user.id)

      if (!error && data) {
        const map = {}
        data.forEach(row => { map[row.lesson_id] = row })
        setProgress(map)
      }
    }

    fetchProgress()
  }, [user])

  // Save lesson progress
  const saveLessonProgress = useCallback(async (lessonId, score, passed) => {
    if (!user) return

    const existing   = progress[lessonId]
    const attempts   = (existing?.attempts || 0) + 1
    const status     = passed ? 'completed' : 'attempted'
    const best_score = Math.max(score, existing?.best_score || 0)

    const progressData = {
      user_id:    user.id,
      lesson_id:  lessonId,
      status,
      score,
      best_score,
      attempts,
      updated_at: new Date().toISOString(),
    }

    // Optimistic update
    setProgress(prev => ({ ...prev, [lessonId]: progressData }))

    const { error } = await supabase
      .from('lesson_progress')
      .upsert(progressData, { onConflict: 'user_id,lesson_id' })

    if (!error && passed) {
      const all = Object.values({ ...progress, [lessonId]: progressData })
      const completedCount = all.filter(p => p.status === 'completed').length
      const scores = all.filter(p => p.best_score).map(p => p.best_score)
      const avgMastery = scores.length
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        : 0

      await updateProfile({
        lessons_completed: completedCount,
        mastery_score:     avgMastery,
        last_active:       new Date().toISOString(),
      })

      showNotification('Lesson complete! Great work.', 'success')
    }

    return { error }
  }, [user, progress, updateProfile])

  // Notification helper
  const showNotification = (message, type = 'info') => {
    setNotification({ message, type, id: Date.now() })
    setTimeout(() => setNotification(null), 3500)
  }

  const value = {
    language,      setLanguage,
    darkMode,      setDarkMode,
    progress,
    selectedGrade, setSelectedGrade,
    saveLessonProgress,
    showNotification,
    notification,
    navigate,
    t,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}