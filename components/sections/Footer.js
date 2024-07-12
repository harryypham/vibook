import React from "react"
import Link from "next/link"

import Wave from "react-wavify"
import { MoveRight } from "lucide-react"

export default function Footer() {
  return (
    <footer className='w-full min-h-64 h-72 relative'>
      <img
        src='images/boat.gif'
        className='absolute top-0 w-1/4 z-20 -translate-y-[45%] animate-boat'
      />

      <Wave
        fill='url(#gradient)'
        className='absolute bottom-0 h-full'
        options={{
          height: 2,
          amplitude: 25,
          speed: 0.15,
          points: 3,
        }}
      >
        <defs>
          <linearGradient
            id='gradient'
            gradientTransform='rotate(90)'
          >
            <stop
              offset='10%'
              stopColor='#0066ff'
            />
            <stop
              offset='90%'
              stopColor='#7a90f9'
            />
          </linearGradient>
        </defs>
      </Wave>

      <div className='relative z-10 w-full h-full pl-4'>
        <div className='pt-4'>
          <div className='flex text-8xl font-semibold items-center pt-8 pb-4 tracking-tight'>
            Let's C
            <img
              className='w-36 -mx-8 -mb-1 -scale-y-100'
              src='images/orca.gif'
            />
            llab
            <img
              className='w-36 -mx-8 -mb-1'
              src='images/orca.gif'
            />
            rate
          </div>
          <div className='tracking-tight'>
            <h1 className='text-5xl pb-4'>
              <a
                href='mailto:vpha0440@uni.sydney.edu.au'
                className='hover:underline'
              >
                vpha0440@uni.sydney.edu.au
                <MoveRight
                  size={48}
                  color='black'
                  className='inline-block ml-2 animate-move-right delay-1000'
                />
              </a>
            </h1>
            <p className='absolute bottom-6 uppercase'>
              Project details can be found at{" "}
              <Link
                href='https://github.com/harryypham'
                className='underline'
              >
                Github
              </Link>
            </p>
          </div>
        </div>
        <div className='absolute bottom-12 right-2 -rotate-90 -translate-y-1/2 translate-x-1/3 text-4xl font-semibold tracking-tight flex items-center'>
          © 2024
        </div>
      </div>
    </footer>
  )
}
