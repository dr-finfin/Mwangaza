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
  const [progressLoaded, setProgressLoaded] = useState(false)

  const t = (key) => UI_STRINGS[language]?.[key] || UI_STRINGS.en[key] || key

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  // Load progress — runs as soon as user is available
  useEffect(() => {
    if (!user) {
      setProgress({})
      setProgressLoaded(false)
      return
    }

    const fetchProgress = async () => {
      try {
        const { data, error } = await supabase
          .from('lesson_progress')
          .select('*')
          .eq('user_id', user.id)

        if (!error && data) {
          const map = {}
          data.forEach(row => { map[row.lesson_id] = row })
          setProgress(map)
        }
      } catch (err) {
        console.error('Progress fetch error:', err)
      } finally {
        setProgressLoaded(true)
      }
    }

    fetchProgress()
  }, [user])

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

    // Optimistic update — UI updates instantly
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

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type, id: Date.now() })
    setTimeout(() => setNotification(null), 3500)
  }

  return (
    <AppContext.Provider value={{
      language,      setLanguage,
      darkMode,      setDarkMode,
      progress,      progressLoaded,
      selectedGrade, setSelectedGrade,
      saveLessonProgress,
      showNotification,
      notification,
      navigate,
      t,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}