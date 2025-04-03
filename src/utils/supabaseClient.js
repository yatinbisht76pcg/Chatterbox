import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dlenutttepqdlyawlxyp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsZW51dHR0ZXBxZGx5YXdseHlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2NjAwMjcsImV4cCI6MjA1OTIzNjAyN30.p25c9KAqb03wXSCOAk2MT1YP5VS3QjOGMwk5sFiPD8A'

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 