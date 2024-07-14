"use client"
import React, { useEffect, useState } from "react"
import { queryRandomBooks } from "@/api/database"

const BookType = ({ type }) => {
  const [books, setBooks] = useState([])
  useEffect(() => {
    queryRandomBooks(type).then((data) => {
      setBooks(data)
    })
  }, [])
  return (
    <div className='w-screen overflow-x-auto flex border'>
      <div className='flex w-max'>
        {books.length > 0 &&
          books.map((book, idx) => (
            <div
              key={idx}
              className='p-4'
            >
              {book.title}
            </div>
          ))}
      </div>
    </div>
  )
}

export default BookType
