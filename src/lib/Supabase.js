import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)



export const signInWithEmail = async (email, password) => {
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) console.error(error)
}