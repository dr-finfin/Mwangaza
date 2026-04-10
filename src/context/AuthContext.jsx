import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase, getUserProfile, upsertUserProfile } from '../lib/supabase'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user,    setUser]    = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authError, setAuthError] = useState(null)

  const loadProfile = useCallback(async (authUser) => {
    if (!authUser) {
      setProfile(null)
      return
    }

    try {
      const { data, error } = await getUserProfile(authUser.id)

      if (error || !data) {
        const newProfile = {
          id:                authUser.id,
          email:             authUser.email,
          full_name:         authUser.user_metadata?.full_name || authUser.email?.split('@')[0],
          avatar_url:        authUser.user_metadata?.avatar_url || null,
          streak_days:       1,
          last_active:       new Date().toISOString(),
          selected_grade:    4,
          lessons_completed: 0,
          mastery_score:     0,
          created_at:        new Date().toISOString(),
        }
        const res = await upsertUserProfile(newProfile)
        setProfile(res.error ? newProfile : res.data)
      } else {
        setProfile(data)
      }
    } catch (err) {
      console.error('Profile load error:', err)
    }
  }, [])

  useEffect(() => {
    // Get session and profile simultaneously
    const init = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        const authUser = session?.user ?? null
        setUser(authUser)

        // Load profile immediately — do not wait for auth state change
        if (authUser) {
          await loadProfile(authUser)
        }
      } catch (err) {
        console.error('Init error:', err)
      } finally {
        setLoading(false)
      }
    }

    init()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const authUser = session?.user ?? null
        setUser(authUser)
        if (authUser) {
          await loadProfile(authUser)
        } else {
          setProfile(null)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [loadProfile])

  const signInWithGoogle = async () => {
    setAuthError(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
        queryParams: { access_type: 'offline', prompt: 'consent' },
      },
    })
    if (error) setAuthError(error.message)
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
  }

  const updateProfile = async (updates) => {
    if (!user) return
    const { data, error } = await upsertUserProfile({ id: user.id, ...updates })
    if (!error && data) setProfile(data)
    return { data, error }
  }

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      loading,
      authError,
      signInWithGoogle,
      signOut,
      updateProfile,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}