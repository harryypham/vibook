import React, { useState, useRef } from "react"
import Link from "next/link"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

import { Skeleton } from "@/components/ui/skeleton"
import { FaStar } from "react-icons/fa6"
import { Bookmark, Forward, Heart, MoveRight } from "lucide-react"
import ReactCurvedText from "react-curved-text"
import Image from "next/image"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const HorizontalBookCard = ({ id, title, author, type, text }) => {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef()

  useGSAP(() => {
    gsap.from(ref.current, { scrollTrigger: ref.current, y: 100, duration: 1 })
  }, [id])

  const calculateReadingTime = (text) => {
    const wordsPerMinute = 225
    const words = text.split(/\s+/).length
    const readingTimeMinutes = words / wordsPerMinute
    return Math.ceil(readingTimeMinutes)
  }

  return (
    <div
      className='relative w-full max-w-[80vw] md:h-[29vh] h-[20vh]'
      style={{ marginTop: "-4px" }}
      ref={ref}
    >
      <Link href={`/book/${id}`}>
        <div
          className='book-card-wrapper h-full relative overflow-hidden'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className='book-card w-full h-full flex overflow-hidden cursor-default border-2 border-black'>
            <div className='relative -z-40 w-[170px] m-3 overflow-hidden'>
              <img
                src={`/images/cover_${(id % 10) + 1}.jpeg`}
                alt='Book Cover'
                className={`object-contain pointer-events-none`}
              ></img>
            </div>
            <div className=' flex flex-row gap-4 w-full h-full p-3 transition-colors duration-300 cursor-pointer'>
              <div className='flex'>
                <div className='h-full flex flex-col'>
                  <p className='text-sm uppercase text-[#0066ff]'>{type}</p>
                  <div className='flex items-start'>
                    <h1 className='flex text-xl md:text-2xl my-1 mr-2 font-[600] hover:underline transition-all duration-[5000]'>
                      {title}
                    </h1>
                    <div className='hidden md:flex items-center mt-2 ml-1'>
                      {Array.from({ length: 5 }, (_, index) => (
                        <FaStar
                          key={index}
                          size={20}
                          color={"#0066ff"}
                        />
                      ))}
                    </div>
                  </div>

                  <div className='multiline-truncate'>{text.slice(0, 600)}</div>
                  <div className='italic flex text-sm mt-2 gap-1 md:gap-2 text-[#0066ff]'>
                    <p>{author}</p>
                    <span className='text-black not-italic'>•</span>
                    <p>{calculateReadingTime(text)} phút</p>
                  </div>
                  <div className='mt-2 flex gap-4'>
                    <Heart
                      size={18}
                      color={"#000"}
                      strokeWidth={3}
                    />
                    <Bookmark
                      size={18}
                      color={"#000"}
                      strokeWidth={3}
                    />
                    <Forward
                      size={18}
                      color={"#000"}
                      strokeWidth={3}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <ReactCurvedText
        width={100}
        height={100}
        cx={50}
        cy={50}
        rx={45}
        ry={45}
        startOffset={0}
        reversed={false}
        text='CLICK TO READ . CLICK TO READ .'
        textProps={{
          style: { fontSize: 16, fill: "#0066ff" },
        }}
        svgProps={{
          className: `rotating-curved-text ${
            isHovered
              ? "md:block hidden opacity-1"
              : "md:block hidden opacity-0"
          }`,
        }}
      />
    </div>
  )
}

const VerticalBookCard = ({ id, title, author, content }) => {
  return (
    <Link href={`/book/${id}`}>
      <div className='w-[26vw] h-[18vw]  flex items-center border-primary border-2 rounded-md hover:border-primary group relative z-10 hover:z-20 transform hover:scale-105 transition-all duration-300 hover:border-black hover:bg-black hover:text-white'>
        <div className='relative w-1/2 h-full overflow-hidden flex items-center justify-center'>
          <Image
            src={`/images/cover_${Math.floor(Math.random() * 10) + 1}.jpeg`}
            alt='book cover'
            layout='fill'
            objectFit='cover'
            objectPosition='center'
            className=''
          />
        </div>
        <div className='h-full w-1/2 flex flex-col items-start justify-start mx-3 mt-4'>
          <p className='text-sm text-primary group-hover:text-[#8ea2ff]'>
            {author}
          </p>
          <h1 className='uppercase font-semibold text-lg'>{title}</h1>
          <p className='multiline-truncate'>{content}</p>
          <p className='text-primary flex items-center group-hover:text-[#8ea2ff]'>
            Read{" "}
            <MoveRight className='w-4 h-4 ml-1 group-hover:animate-arrow-right' />
          </p>
        </div>
      </div>
    </Link>
  )
}

const TypeCard = ({ type, id }) => {
  return (
    <div className='relative w-[26vw] h-[18vw] pl-2 pr-4 py-3 rounded-md flex flex-col bg-black text-white border-black border-2 hover:bg-white hover:text-primary hover:border-primary hover:border-2 transition-all duration-300'>
      <div className='text-2xl font-bold uppercase '>{type}</div>
      <div className='absolute bottom-[-0.25em] text-[10rem] font-stratos font-extrabold tracking-[-0.09em] self-end'>
        {id.toString().padStart(2, "0")}
      </div>
    </div>
  )
}

export { HorizontalBookCard, VerticalBookCard, TypeCard }

export function BookCardSkeleton() {
  return (
    <div
      className='relative w-full h-[25vh] flex m-3'
      style={{ marginTop: "-4px" }}
    >
      <Skeleton className='h-full w-[170px] rounded-xl m-3' />
      <div className='flex flex-col w-full gap-3'>
        <Skeleton className='h-[20px] w-10/12 rounded-xl mt-3' />
        <Skeleton className='h-[20px] w-3/12 rounded-xl' />
        <Skeleton className='flex-grow w-10/12 rounded-xl' />
      </div>
    </div>
  )
}
