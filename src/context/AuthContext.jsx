import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { supabase, getUserProfile, upsertUserProfile } from '../lib/supabase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // ── Fetch / create profile ────────────────────────────────
  const loadProfile = useCallback(async (authUser) => {
    if (!authUser) {
      setProfile(null);
      return;
    }

    try {
      let { data, error } = await getUserProfile(authUser.id);

      // First login → create profile
      if (error || !data) {
        const newProfile = {
          id: authUser.id,
          email: authUser.email,
          full_name:
            authUser.user_metadata?.full_name || authUser.email?.split('@')[0],
          avatar_url: authUser.user_metadata?.avatar_url || null,
          streak_days: 1,
          last_active: new Date().toISOString(),
          selected_grade: 4,
          lessons_completed: 0,
          mastery_score: 0,
          created_at: new Date().toISOString(),
        };
        const res = await upsertUserProfile(newProfile);
        if (!res.error) setProfile(res.data);
        else setProfile(newProfile);
      } else {
        setProfile(data);
      }
    } catch (err) {
      console.error('Profile load error:', err);
    }
  }, []);

  // ── Supabase auth listener ────────────────────────────────
  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      loadProfile(session?.user ?? null).finally(() => setLoading(false));
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      await loadProfile(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [loadProfile]);

  // ── Sign in with Google ───────────────────────────────────
  const signInWithGoogle = async () => {
    setAuthError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
        queryParams: { access_type: 'offline', prompt: 'consent' },
      },
    });
    if (error) setAuthError(error.message);
  };

  // ── Sign out ──────────────────────────────────────────────
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  // ── Update profile ────────────────────────────────────────
  const updateProfile = async (updates) => {
    if (!user) return;
    const { data, error } = await upsertUserProfile({
      id: user.id,
      ...updates,
    });
    if (!error && data) setProfile(data);
    return { data, error };
  };

  const value = {
    user,
    profile,
    loading,
    authError,
    signInWithGoogle,
    signOut,
    updateProfile,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
