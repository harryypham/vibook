// supabaseClient.js
import supabase from "./supabaseClient"

export const signUp = async (email, password) => {
  const { user, error } = await supabase.auth.signUp({ email, password })
  const default_avatar = "https://github.com/shadcn.png"
  const { data, err } = await supabase.auth.updateUser({
    user_metadata: { avatar_url: default_avatar },
  })

  if (error) {
    throw error
  }
  return data
}

export const signIn = async (email, password) => {
  const { user, error } = await supabase.auth.signIn({ email, password })
  if (error) {
    throw error
  }
  return user
}

export const signInWithGoogle = async () => {
  const { user, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    // options: {
    //   redirectTo: "http://localhost:3000/dashboard/"
    // }
  })
  if (error) {
    throw error
  }
  return user
}

export const signInWithGithub = async () => {
  const { user, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  })
  if (error) {
    throw error
  }
  return user
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    throw error
  }
}
