"use client"
import React from "react"
import { useSearchParams } from "next/navigation"

import Landing from "@/components/sections/Landing"
import Features from "@/components/sections/Features"
import Footer from "@/components/sections/Footer"
import Browse from "@/components/sections/Browse"

export default function Home() {
  const page = parseInt(useSearchParams().get("page")) || 1

  return (
    <>
      <main className='max-w-screen flex flex-col items-center scroll-smooth'>
        <Landing />
        <Features />
        <Browse page={page} />
        <Footer />
      </main>
    </>
  )
}
