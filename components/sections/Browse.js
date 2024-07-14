import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import BookCard, { BookCardSkeleton } from "@/components/BookCard"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
} from "@/components/ui/pagination"
import supabase from "@/api/supabaseClient"

export default function Browse({ page }) {
  const [books, setBooks] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const startIndex = (page - 1) * 10
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .range(startIndex, startIndex + 9)
      if (error) {
        console.log(error)
      } else {
        setBooks(data)
      }
    }
    fetchData()
  }, [page])

  return (
    <section
      id='browse-section'
      className='md:w-8/12 w-11/12 my-28 gap-8 flex flex-col items-center relative'
    >
      <h1 className='text-6xl font-semibold tracking-tight pb-10 text-primary'>
        Browse
      </h1>
      <div
        id='browse'
        className='search-container w-full flex gap-2'
      >
        <input
          type='text'
          placeholder='Search...'
          className='search-input text-sm py-2 w-full px-3 rounded-md bg-[#ebe6e1]'
        />
        <Button className='gradient-btn'>Search</Button>
      </div>
      <section className='flex flex-col w-full gap-4'>
        {books.length != 0
          ? books.map((_, idx) => (
              <BookCard
                id={books[idx].id}
                title={books[idx].title}
                author={books[idx].author}
                type={books[idx].type}
                text={books[idx].text}
                key={idx}
              ></BookCard>
            ))
          : Array.from({ length: 5 }, (_, index) => (
              <BookCardSkeleton key={index} />
            ))}
        <div className='mx-auto p-4'>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationFirst href={`/?page=1#browse-section`} />
              </PaginationItem>
              {page > 1 && (
                <PaginationItem>
                  <PaginationLink href={`/?page=${page - 1}#browse-section`}>
                    {page - 1}
                  </PaginationLink>
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink
                  href={`#browse-section`}
                  isActive
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
              {page < 1990 && (
                <PaginationItem>
                  <PaginationLink href={`/?page=${page + 1}#browse-section`}>
                    {page + 1}
                  </PaginationLink>
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href={`/?page=1990#browse-section`}>
                  1990
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLast href={`/?page=1990#browse-section`} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </section>
    </section>
  )
}
