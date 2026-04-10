import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export const useProgress = (userId) => {
  const [progress, setProgress] = useState({})
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)

  // ── Fetch all progress for user ───────────────────────────
  const fetchProgress = useCallback(async () => {
    if (!userId) { setProgress({}); setLoading(false); return }

    setLoading(true)
    const { data, error: err } = await supabase
      .from('lesson_progress')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })

    if (err) {
      setError(err.message)
    } else {
      const map = {}
      data?.forEach(row => { map[row.lesson_id] = row })
      setProgress(map)
    }
    setLoading(false)
  }, [userId])

  useEffect(() => { fetchProgress() }, [fetchProgress])

  // ── Save a lesson result ───────────────────────────────────
  const saveProgress = useCallback(async ({
    lessonId,
    score,
    passed,
  }) => {
    if (!userId) return { error: 'Not authenticated' }

    const existing   = progress[lessonId]
    const attempts   = (existing?.attempts || 0) + 1
    const best_score = Math.max(score, existing?.best_score || 0)
    const status     = passed ? 'completed' : 'attempted'

    const payload = {
      user_id:    userId,
      lesson_id:  lessonId,
      status,
      score,
      best_score,
      attempts,
      updated_at: new Date().toISOString(),
    }

    // Optimistic update
    setProgress(prev => ({ ...prev, [lessonId]: payload }))

    const { data, error: err } = await supabase
      .from('lesson_progress')
      .upsert(payload, { onConflict: 'user_id,lesson_id' })
      .select()
      .single()

    if (err) {
      // Rollback on error
      setProgress(prev => ({ ...prev, [lessonId]: existing }))
      return { error: err.message }
    }

    setProgress(prev => ({ ...prev, [lessonId]: data }))
    return { data, error: null }
  }, [userId, progress])

  // ── Computed stats ─────────────────────────────────────────
  const stats = {
    total:     Object.keys(progress).length,
    completed: Object.values(progress).filter(p => p.status === 'completed').length,
    attempted: Object.values(progress).filter(p => p.status === 'attempted').length,
    avgScore:  Object.values(progress).length
      ? Math.round(
          Object.values(progress)
            .filter(p => p.best_score)
            .reduce((sum, p) => sum + p.best_score, 0) /
          Math.max(Object.values(progress).filter(p => p.best_score).length, 1)
        )
      : 0,
  }

  return {
    progress,
    loading,
    error,
    stats,
    saveProgress,
    refetch: fetchProgress,
  }
}