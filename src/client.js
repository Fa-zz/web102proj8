import { createClient } from '@supabase/supabase-js'

const URL = 'https://aqzvqdjyjnkyifhwnmut.supabase.co'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxenZxZGp5am5reWlmaHdubXV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwODI1ODAsImV4cCI6MjA2OTY1ODU4MH0.msL-jUBykdYG3UV3_NHnRtAwvyg2Q1NAE0y-v3laNrc'
export const supabase = createClient(URL, API_KEY)