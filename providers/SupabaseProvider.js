"use client"
import React, { createContext, useState, useContext, useEffect } from "react"
import supabase from "@/api/supabaseClient"

const SessionContext = createContext(null)

// Custom hook to use the SessionContext
export const useSession = () => useContext(SessionContext)

// Provider component
export const SupabaseProvider = ({ children }) => {
  const [session, setSession] = useState(null)
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setSession(null)
      } else if (session) {
        setSession(session)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signIn = () => setIsSignedIn(true)
  const signOut = () => setIsSignedIn(false)

  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  )
}
