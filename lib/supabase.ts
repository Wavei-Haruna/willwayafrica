import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://cxbpfgqokcgcwjokgixy.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4YnBmZ3Fva2NnY3dqb2tnaXh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwODA5NTIsImV4cCI6MjA1ODY1Njk1Mn0.MTI8kg7ukoCIMj9fg8mqJnFAi4eLZc-BrnnLKo5X68o'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)