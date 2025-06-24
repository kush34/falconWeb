import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/Supabase'

const UserContext = createContext(null)

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.error('Sign out error:', error)
  }

  useEffect(() => {
    const getSessionAndProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      const currentUser = session?.user || null
      setUser(currentUser)

      if (currentUser) {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', currentUser.id)
          .single()

        if (error) console.error('Role fetch error:', error)
        else setRole(data?.role || null)
      }

      setLoading(false)
    }

    getSessionAndProfile()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user || null
      setUser(currentUser)

      if (currentUser) {
        supabase
          .from('profiles')
          .select('role')
          .eq('id', currentUser.id)
          .single()
          .then(({ data, error }) => {
            if (error) console.error('Role fetch error:', error)
            else setRole(data?.role || null)
          })
      } else {
        setRole(null)
      }
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  return (
    <UserContext.Provider value={{ user, role, loading, signOut }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
