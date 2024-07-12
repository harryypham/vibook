import React, { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import CustomCursor from "../CustomCursor"
import Lottie from "lottie-react"
import ClickAnimation from "@/public/images/click.json"
import { brain_path_0, brain_path_1 } from "../BrainPath"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { TextPlugin } from "gsap/TextPlugin"

import supabase from "@/api/supabaseClient"

gsap.registerPlugin(TextPlugin, useGSAP)

export default function Landing() {
  const container = useRef()
  const title1Ref = useRef()
  const title2Ref = useRef()
  const title3Ref = useRef()
  const asteriskRef = useRef()
  const navRef = useRef()
  const miniRef = useRef()
  const texts = ["lớn nhất", "đa dạng nhất", "đẹp nhất"]
  const router = useRouter()

  const [currentUser, setCurrentUser] = useState(null)
  const [showInstruction, setShowInstruction] = useState(true)

  const [state, setState] = useState({
    textIdx: 0,
    first: true,
    brainGrowth: 0,
  })

  const updateState = (newState) => {
    setState((prevState) => ({
      ...prevState,
      ...newState,
    }))
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstruction(false)
    }, 5000) // Hide after 5 seconds

    return () => clearTimeout(timer) // Cleanup the timer
  }, [])

  useEffect(() => {
    const getUser = async () => {
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession()
      if (sessionError) {
        console.error("Error getting session:", sessionError)
        return
      }

      if (sessionData.session) {
        setCurrentUser(sessionData.session.user)
        console.log("User info:", sessionData.session.user)
      } else {
        console.log("No active session found.")
      }
    }

    getUser()
  }, [])

  function applyStyles(element, styles) {
    for (const property in styles) {
      if (styles.hasOwnProperty(property)) {
        element.style[property] = styles[property]
      }
    }
  }

  function spawnImage(e) {
    const cursor = document.querySelector("#custom-cursor")
    // const cursor_instruct = document.querySelector("#instruct")
    applyStyles(cursor, {
      width: "100px",
      height: "30px",
      backgroundColor: "black",
    })
    // applyStyles(cursor_instruct, {
    //   display: "none",
    // })
    setTimeout(() => {
      applyStyles(cursor, {
        width: "20px",
        height: "20px",
        backgroundColor: "#3356f4",
      })
    }, 500)

    const img = document.createElement("img")
    img.src = `/images/book_${Math.floor(Math.random() * 5) + 1}.svg` // Replace with your image path
    applyStyles(img, {
      position: "absolute",
      left: e.pageX - e.target.offsetLeft + "px",
      top: e.pageY - e.target.offsetTop + "px",
      width: "100px",
      zIndex: "-10",
      transform: `translate(-50%, -50%) rotate(${Math.floor(
        Math.random() * 30 - 5
      )}deg)`,
      pointerEvents: "none",
    })
    document.getElementById("canvas").appendChild(img)
    fadeOutAndRemoveSVG(img)
  }

  function fadeOutAndRemoveSVG(element) {
    if (element) {
      element.classList.add("fall")

      setTimeout(() => {
        element.parentNode.removeChild(element)
        updateState({ brainGrowth: state.brainGrowth + 4 })
      }, 2000)
    }
  }

  useGSAP(() => {
    const tl = gsap.timeline()
    if (!state.first) {
      tl.to(title2Ref.current, {
        text: {
          value: texts[state.textIdx],
          preserveSpaces: true,
          newClass: "px-2",
        },
        duration: 1,
        delay: 1,
        ease: "none",
        onComplete: () => {
          updateState({ textIdx: (state.textIdx + 1) % texts.length })
        },
      })
    } else {
      gsap.from(navRef.current, {
        duration: 0.7,
        ease: "none",
        y: 20,
        opacity: 0,
      })

      gsap.from(miniRef.current, {
        duration: 0.7,
        ease: "none",
        y: 20,
        opacity: 0,
        delay: 0.2,
      })
      tl.to(title1Ref.current, {
        text: "Khám phá thế giới sách điện tử ",
        duration: 1,
        ease: "none",
      })
        .to(title2Ref.current, {
          text: {
            value: texts[state.textIdx],
            preserveSpaces: true,
            newClass: "px-2",
          },
          duration: 0.5,
          ease: "none",
          onComplete: () => {
            updateState({
              textIdx: (state.textIdx + 1) % texts.length,
              first: false,
            })
          },
        })
        .to(title3Ref.current, {
          text: " Việt Nam",
          duration: 0.5,
          ease: "none",
        })
        .to(asteriskRef.current, {
          text: {
            value: "*",
          },
          duration: 0.1,
          ease: "none",
        })
    }
  }, [state.textIdx])

  return (
    <section
      className='relative w-full overflow-hidden h-screen px-4'
      ref={container}
    >
      {showInstruction && (
        <div className='absolute left-1/2 top-2/3 -translate-x-1/2 -translate-y-1/2 flex '>
          <Lottie
            animationData={ClickAnimation}
            loop={true}
            className='w-16'
          />
          <div className='text-xl w-40 whitespace-normal break-words'>
            Click anywhere to feed the brain
          </div>
        </div>
      )}

      <nav
        className='nav absolute top-4 left-0 px-8 w-full min-h-5 flex items-center justify-between z-50'
        ref={navRef}
      >
        <div className='tracking-widest text-xl text-[#0066ff] font-bold cursor-pointer'>
          ViBook
        </div>
        {currentUser ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='outline'
                size='icon'
                className='overflow-hidden rounded-full flex items-center justify-center'
              >
                <Avatar>
                  <AvatarImage
                    src='https://github.com/shadcn.png'
                    alt='@shadcn'
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className='flex gap-3'>
            <Button
              className='gradient-btn'
              onClick={() => router.push("/auth/signup")}
            >
              Sign Up
            </Button>
            <Button
              variant='outline'
              onClick={() => router.push("/auth/login")}
            >
              Login
            </Button>
          </div>
        )}
      </nav>
      <div
        className='absolute w-full h-full'
        id='canvas'
        onMouseDown={spawnImage}
      ></div>
      <CustomCursor />

      <div className='w-full h-full flex justify-center items-center p-4'>
        <h1 className='text-6xl font-[500] text-center w-8/12 mb-56 tracking-tighter leading-[1.2em] pointer-events-none'>
          <span ref={title1Ref}></span>
          <span
            ref={title2Ref}
            className='gradient-btn'
          ></span>
          <span ref={title3Ref}></span>
          <span className='relative'>
            <sup
              ref={asteriskRef}
              className='text-[2rem] absolute top-5'
            ></sup>
          </span>
          <span className='ml-4 pr-1 bg-black animate-blink opacity-1 whitespace-pre-wrap'>
            &#8203;
          </span>
        </h1>
      </div>

      <div
        className='w-full absolute bottom-4 left-0 px-8 text-sm tracking-tight flex items-end justify-between'
        ref={miniRef}
      >
        <div className='max-w-48'>
          <sup>*</sup>Not true. For details, check the footer.
        </div>
        <div className=''>created by Harry Pham</div>
      </div>

      <svg
        version='1.1'
        width='100%'
        viewBox='0 0 1024 1024'
        preserveAspectRatio='xMidYMax meet'
        style={{
          height: `${Math.min(20 + state.brainGrowth, 60)}vh`,
          bottom: `-${Math.floor(
            Math.min(20 + state.brainGrowth, 60) * 0.18
          )}vh`,
        }}
        id='svg2'
      >
        <defs>
          <linearGradient
            id='strokeGradient'
            x1='0%'
            y1='0%'
            x2='100%'
            y2='100%'
          >
            <stop
              offset='0%'
              style={{ stopColor: "#0066ff", stopOpacity: "1" }}
            />
            <stop
              offset='100%'
              style={{ stopColor: "#5046e6", stopOpacity: "1" }}
            />
          </linearGradient>
        </defs>
        <path
          fill='url(#strokeGradient)'
          opacity='1.000000'
          stroke='none'
          d={brain_path_0}
        />
        <path
          fill='url(#strokeGradient)'
          opacity='1.000000'
          stroke='none'
          d={brain_path_1}
        />
      </svg>
    </section>
  )
}
