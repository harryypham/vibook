"use client"
import React, { useEffect, useState } from "react"
import { queryRandomBooks } from "@/api/database"
import { TypeCard, VerticalBookCard } from "./BookCard"
import { Skeleton } from "./ui/skeleton"

const BookType = ({ type, offset, id }) => {
  const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    queryRandomBooks(type).then((data) => {
      setBooks(data)
      setIsLoading(false)
    })
  }, [])
  if (isLoading) {
    return <BookTypeSkeleton />
  }
  return (
    <div className='w-screen overflow-x-auto flex flex-col overflow-y-hidden'>
      <div className='flex w-max gap-10 mx-8 py-4 scroll-smooth'>
        {books.length > 0 &&
          books.map((book, idx) =>
            idx != offset ? (
              <VerticalBookCard
                id={book.id}
                title={book.title}
                author={book.author}
                content={book.text.slice(0, 200)}
                key={idx}
              />
            ) : (
              <TypeCard
                type={type}
                key={idx}
                id={id}
              />
            )
          )}
      </div>
    </div>
  )
}

const BookTypeSkeleton = () => {
  return (
    <div className="w-screen flex gap-6">
      <div className="w-[26vw] h-[18vw]"></div>
      <div className="w-[26vw] h-[18vw]"></div>
      <div className="w-[26vw] h-[18vw]"></div>
    </div>
  )
}

export default BookType
