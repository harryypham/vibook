// Auth.js
"use client"
import React, { useState } from "react"
import { signIn, signInWithGoogle, signInWithGithub } from "@/api/auth"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FcGoogle } from "react-icons/fc"
import { FaGithub, FaGoogle } from "react-icons/fa6"
import { useSession } from "@/providers/SupabaseProvider"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { session } = useSession()

  if (session) {
    router.push("/")
  }

  const handleSignIn = async () => {
    try {
      const user = await signIn(email, password)
    } catch (error) {
      setError(error.message)
    }
  }

  const handleSignInWithGoogle = async () => {
    try {
      const user = await signInWithGoogle()
    } catch (error) {
      setError(error.message)
    }
  }
  const handleSignInWithGithub = async () => {
    try {
      const user = await signInWithGithub()
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className='w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[100vh] max-h-screen '>
      <div className=' bg-muted lg:block max-h-screen overflow-hidden hidden relative'>
        <Image
          src='/images/shark.jpg'
          alt='Image'
          width='1920'
          height='1080'
          className=' w-full object-contain dark:brightness-[0.2] dark:grayscale'
        />
      </div>
      <div className='flex items-center justify-center py-12'>
        <div className='mx-auto grid w-[350px] gap-6'>
          <div className='grid gap-2 text-center'>
            <h1 className='text-3xl font-bold'>Welcome back!</h1>
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
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Label htmlFor='password'>Password</Label>
                <Link
                  href='/forgot-password'
                  className='ml-auto inline-block text-sm underline'
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id='password'
                type='password'
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              type='submit'
              className='w-full bg-[#0066ff]'
              onClick={handleSignIn}
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
              className='w-full group hover:bg-primary hover:text-white'
              onClick={handleSignInWithGoogle}
            >
              <FcGoogle
                className='group-hover:hidden mr-[0.625rem]'
                size={21}
              />{" "}
              <FaGoogle
                className='hidden group-hover:block mr-[0.625rem]'
                size={18}
              />{" "}
              Continue with Google
            </Button>

            <Button
              variant='outline'
              className='w-full hover:bg-primary hover:text-white'
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
    </div>
  )
}

export default Login
