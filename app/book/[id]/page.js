"use client"
import React, { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@supabase/supabase-js"

export default function BookPage({ params }) {
  const [book, setBook] = useState(null)
  const [title, setTitle] = useState(null)
  const [author, setAuthor] = useState(null)
  const [type, setType] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_KEY
  )

  useEffect(() => {
    const fetchData = async () => {
      console.log(params.id) // this is undefined
      if (!params.id) return
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("id", params.id)
      console.log(data[0])
      if (error) {
        console.log(error)
      } else {
        setBook(data[0].text.replace(/\n/g, " <br><br> "))
        setTitle(data[0].title)
        setAuthor(data[0].author)
        setType(data[0].type)
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      {!isLoading && (
        <main className='w-full'>
          <div className='text-lg w-3/4 mx-auto'>
            <h1 className='text-4xl font-semibold pt-10 pb-2'>{title}</h1>
            <h4 className='text-base font-light pb-12'>
              Tác giả: {author}. Thể loại: {type}
            </h4>

            {book && <div dangerouslySetInnerHTML={{ __html: book }}></div>}
          </div>
        </main>
      )}
    </>
  )
}
