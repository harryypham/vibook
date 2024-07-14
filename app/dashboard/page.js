"use client"

import Link from "next/link"
import React, { useState, useEffect } from "react"

import { getAllTypes, queryRandomBooks } from "@/api/database"
import BookType from "@/components/BookType"

const Dashboard = () => {
  const [types, setTypes] = useState([])
  useEffect(() => {
    getAllTypes().then((data) => {
      setTypes(data)
    })
  }, [])

  return (
    <div className='p-4'>
      <h1 className='text-2xl'>Dashboard</h1>
      <div className=''>
        {types.length > 0 &&
          types.map((type, idx) => (
            <BookType
              type={type}
              key={idx}
            />
          ))}
      </div>
      <p>
        Nothing yet. Return to{" "}
        <Link
          href='/'
          className='underline'
        >
          Homepage
        </Link>
      </p>
    </div>
  )
}

export default Dashboard
