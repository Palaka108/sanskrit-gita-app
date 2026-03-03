import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { supabase } from './supabaseClient'
import type { User, Session } from '@supabase/supabase-js'

interface Profile {
  first_name: string
  email: string | null
}

interface AuthContextType {
  user: User | null
  profile: Profile | null
  loading: boolean
  needsFirstName: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
  saveFirstName: (name: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [needsFirstName, setNeedsFirstName] = useState(false)

  async function fetchProfile(u: User) {
    const { data } = await supabase
      .from('gita_profiles')
      .select('first_name, email')
      .eq('id', u.id)
      .single()

    if (data) {
      setProfile(data)
      setNeedsFirstName(false)
    } else {
      setProfile(null)
      setNeedsFirstName(true)
    }
  }

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }: { data: { session: Session | null } }) => {
      const u = session?.user ?? null
      setUser(u)
      if (u) {
        fetchProfile(u).finally(() => setLoading(false))
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null
      setUser(u)
      if (u) {
        fetchProfile(u)
      } else {
        setProfile(null)
        setNeedsFirstName(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function signIn() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    })
  }

  async function signOut() {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
    setNeedsFirstName(false)
  }

  async function saveFirstName(name: string) {
    if (!user) return
    const { error } = await supabase.from('gita_profiles').insert({
      id: user.id,
      first_name: name.trim(),
      email: user.email ?? null,
    })
    if (!error) {
      setProfile({ first_name: name.trim(), email: user.email ?? null })
      setNeedsFirstName(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, needsFirstName, signIn, signOut, saveFirstName }}>
      {children}
    </AuthContext.Provider>
  )
}
