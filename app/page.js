"use client"
import React from "react"
import { useSearchParams, useRouter } from "next/navigation"

import Landing from "@/components/sections/Landing"
import Features from "@/components/sections/Features"
import Footer from "@/components/sections/Footer"
import Browse from "@/components/sections/Browse"

const Home = () => {
  const router = useRouter()
  const page = parseInt(useSearchParams().get("page")) || 1
  if (page > 1990) {
    router.push("/?page=1990#browse-section")
  }

  return (
    <main className='max-w-screen flex flex-col items-center scroll-smooth'>
      <Landing />
      <Features />
      <Browse page={page} />
      <Footer />
    </main>
  )
}

export default Home
