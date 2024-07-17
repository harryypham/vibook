"use client"
import React, { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Toggle } from "@/components/ui/toggle"
import { HorizontalBookCard, BookCardSkeleton } from "@/components/BookCard"

import supabase from "@/api/supabaseClient"
import { searchTitle, searchAuthor, searchContent } from "@/api/database"

const Search = () => {
  const [books, setBooks] = useState([])
  const [query, setQuery] = useState("")

  const handleSearchByTitle = async () => {
    const data = await searchTitle(query)
    setBooks(data.slice(0, 10))
  }
  const handleSearchByAuthor = async () => {
    const data = await searchAuthor(query)
    setBooks(data.slice(0, 10))
  }
  const handleSearchByContent = async () => {
    const data = await searchContent(query)
    setBooks(data.slice(0, 10))
  }

  

  return (
    <section className='w-full flex justify-center flex-col relative ml-8 p-4 my-8'>
      <h1 className='text-3xl font-bold text-primary mb-8'>Search</h1>
      <div className='w-full flex gap-2'>
        <Input
          type='text'
          placeholder='Search...'
          className='search-input text-sm py-2 w-[350px] px-3 rounded-md bg-[#ebe6e1]'
          onChange={(e) => setQuery(e.target.value)}
        ></Input>
        <Button
          className='border-black border-2 hover:bg-black hover:text-white'
          variant='outline'
          onClick={handleSearchByTitle}
        >
          Search by title
        </Button>
        <Button
          className='border-black border-2 hover:bg-black hover:text-white'
          variant='outline'
          onClick={handleSearchByAuthor}
        >
          Search by author
        </Button>
        <Button
          className='border-black border-2 hover:bg-black hover:text-white'
          variant='outline'
          onClick={handleSearchByContent}
        >
          Search by content
        </Button>
      </div>
      <section className='flex flex-col w-full gap-4 mt-8'>
        {books.length != 0
          ? books.map((_, idx) => (
              <HorizontalBookCard
                id={books[idx].id}
                title={books[idx].title}
                author={books[idx].author}
                type={books[idx].type}
                text={books[idx].text}
                key={idx}
              ></HorizontalBookCard>
            ))
          : Array.from({ length: 5 }, (_, index) => (
              <BookCardSkeleton key={index} />
            ))}
        
      </section>
    </section>
  )
}

export default Search
