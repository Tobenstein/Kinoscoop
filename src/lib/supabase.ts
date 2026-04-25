import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ejhwvkubmxjpmfdhaogd.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqaHd2a3VibXhqcG1mZGhhb2dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNzE0MzcsImV4cCI6MjA5MTk0NzQzN30.ryNGe7wr703vXTwCVcwV9BRWl0wJXTGwFAc--XeRdDQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const isSupabaseConfigured = () => {
  return supabaseUrl !== 'https://placeholder.supabase.co' && supabaseAnonKey !== 'placeholder-key';
};
