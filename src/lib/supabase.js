import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://ozxcjiutjnjmfcyvodol.supabase.co';
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96eGNqaXV0am5qbWZjeXZvZG9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3MjA4MzIsImV4cCI6MjA5MTI5NjgzMn0.C7hx6Xd9yyZ48HiBm8-0D5Q28eKPcIxT1PSfr-OvdtI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  return { user, error };
};

export const getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return { data, error };
};

export const upsertUserProfile = async (profile) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .upsert(profile, { onConflict: 'id' })
    .select()
    .single();
  return { data, error };
};

export const getUserProgress = async (userId) => {
  const { data, error } = await supabase
    .from('lesson_progress')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });
  return { data, error };
};

export const upsertLessonProgress = async (progressData) => {
  const { data, error } = await supabase
    .from('lesson_progress')
    .upsert(progressData, { onConflict: 'user_id,lesson_id' })
    .select()
    .single();
  return { data, error };
};

export const updateStreak = async (userId, streak) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .update({ streak_days: streak, last_active: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single();
  return { data, error };
};
