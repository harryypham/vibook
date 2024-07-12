// Auth.js
"use client"
import React, { useState } from "react"
import { signIn, signUp, signOut, signInWithGoogle } from "@/api/auth"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa6"

const Auth = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const handleSignUp = async () => {
    try {
      const user = await signUp(email, password)
      console.log("User signed up:", user)
    } catch (error) {
      setError(error.message)
    }
  }

  const handleSignIn = async () => {
    try {
      const user = await signIn(email, password)
      console.log("User signed in:", user)
    } catch (error) {
      setError(error.message)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      console.log("User signed out")
    } catch (error) {
      setError(error.message)
    }
  }

  const handleSignInWithGoogle = async () => {
    try {
      console.log("signing in...")
      const user = await signInWithGoogle()
      console.log("User signed up:", user)
    } catch (error) {
      setError(error.message)
    }
  }
  const handleSignInWithGithub = async () => {
    try {
      const user = await signInWithGithub()
      console.log("User signed up:", user)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className='w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[100vh] max-h-screen '>
      <div className='flex items-center justify-center py-12'>
        <div className='mx-auto grid w-[350px] gap-6'>
          <div className='grid gap-2 text-center'>
            <h1 className='text-3xl font-bold'>Welcome back!</h1>
            {/* <p className='text-balance text-muted-foreground'>
              Enter your email below to login to your account
            </p> */}
          </div>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='vibook@example.com'
                required
                className=''
              />
            </div>
            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Label htmlFor='password'>Password</Label>
                {/* <Link
                  href='/forgot-password'
                  className='ml-auto inline-block text-sm underline'
                >
                  Forgot your password?
                </Link> */}
              </div>
              <Input
                id='password'
                type='password'
                required
              />
            </div>
            <Button
              type='submit'
              className='w-full'
              onClick={handleSignUp}
            >
              Login
            </Button>
            <div className='mt-2 text-center text-sm'>
              Don&apos;t have an account?{" "}
              <Link
                href='/auth/signup'
                className='underline'
              >
                Sign up
              </Link>
            </div>
            <div className='flex items-center my-1'>
              <hr className='flex-grow border-t border-gray-300' />
              <span className='mx-2 text-gray-500 text-sm'>Or</span>
              <hr className='flex-grow border-t border-gray-300' />
            </div>

            <Button
              variant='outline'
              className='w-full '
              onClick={handleSignInWithGoogle}
            >
              <FcGoogle
                className='mr-[0.625rem]'
                size={20}
              />{" "}
              Continue with Google
            </Button>

            <Button
              variant='outline'
              className='w-full '
              onClick={handleSignInWithGithub}
            >
              <FaGithub
                className='mr-[0.625rem]'
                size={20}
              />{" "}
              Continue with Github
            </Button>
          </div>
        </div>
      </div>
      <div className='hidden bg-muted lg:block max-h-screen overflow-hidden'>
        <Image
          src='/images/Fishbowl.jpeg'
          alt='Image'
          width='1920'
          height='1080'
          className='h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
        />
      </div>
    </div>
  )
}

export default Auth
