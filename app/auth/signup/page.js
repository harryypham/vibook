"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { signUp, signInWithGoogle, signInWithGithub } from "@/api/auth"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FcGoogle } from "react-icons/fc"
import { FaGithub, FaGoogle } from "react-icons/fa6"
import { useSession } from "@/providers/SupabaseProvider"

const Auth = () => {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { session } = useSession()

  if (session) {
    router.push("/")
  }

  const handleSignUp = async () => {
    try {
      const user = await signUp(email, password)
      console.log("User signed up:", user)
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleSignInWithGoogle = async () => {
    try {
      const user = await signInWithGoogle()
      console.log("User signed up:", user)
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleSignInWithGithub = async () => {
    try {
      const user = await signInWithGithub()
      console.log("User signed up:", user)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className='w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[100vh] max-h-screen'>
      <div className='hidden bg-muted lg:block max-h-screen overflow-hidden'>
        <Image
          src='/images/Fishbowl.jpeg'
          alt='Image'
          width='1920'
          height='1080'
          className='h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
        />
      </div>
      <div className='flex items-center justify-center'>
        <div className='mx-auto grid w-[350px] gap-6'>
          <div className='grid gap-2 text-center'>
            <h1 className='text-3xl font-bold'>Sign up</h1>
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
              className='w-full'
              onClick={handleSignUp}
            >
              Create Account
            </Button>
            <div className='text-center text-sm'>
              Already have an account?{" "}
              <Link
                href='/auth/login'
                className='underline'
              >
                Log In
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

export default Auth
