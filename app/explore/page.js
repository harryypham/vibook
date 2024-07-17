"use client"

import Link from "next/link"
import React, { useState, useEffect } from "react"

import { getAllTypes, queryRandomBooks } from "@/api/database"
import BookType from "@/components/BookType"

const Dashboard = () => {
  const pattern = [0, 1, 2, 1]
  const [isLoading, setIsLoading] = useState(true)

  const calculateOffset = (idx) => {
    return pattern[idx % 4]
  }

  const [types, setTypes] = useState([])
  useEffect(() => {
    getAllTypes().then((data) => {
      setTypes(data)
      setIsLoading(false)
    })
  }, [])
  if (isLoading) {
    return 
  }

  return (
    <div className='p-4 my-8'>
      <h1 className='text-3xl font-bold ml-8 text-primary mb-8'>Explore</h1>
      <div className='flex flex-col gap-4'>
        {types.length > 0 &&
          types.map((type, idx) => (
            <BookType
              type={type}
              key={idx}
              id={idx+1}
              offset={calculateOffset(idx)}
            />
          ))}
      </div>
      
    </div>
  )
}

export default Dashboard
