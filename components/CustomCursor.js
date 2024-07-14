import React, { useState, useEffect, useRef } from "react"

const CustomCursor = ({ parent }) => {
  const [cursorXY, setCursorXY] = useState({ x: -100, y: -100 })
  const cursorRef = useRef(null)

  const handleClick = () => {
    cursorRef.current.style.backgroundColor = "black"
  }

  const detectBrowser = () => {
    const userAgent = navigator.userAgent
    if (userAgent.indexOf("Chrome") > -1) {
      return "Chrome"
    } else if (userAgent.indexOf("Firefox") > -1) {
      return "Firefox"
    } else if (userAgent.indexOf("Safari") > -1) {
      return "Safari"
    } else if (userAgent.indexOf("MSIE") > -1 || !!document.documentMode) {
      return "IE"
    } else {
      return "Other"
    }
  }

  const throttle = (func, limit) => {
    let inThrottle
    return function () {
      const args = arguments
      const context = this
      if (!inThrottle) {
        func.apply(context, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  }

  useEffect(() => {
    const browser = detectBrowser()
    let throttleSpeed

    switch (browser) {
      case "Chrome":
        throttleSpeed = 18
        break
      case "Firefox":
        throttleSpeed = 20
        break
      case "Safari":
        throttleSpeed = 15
        break
      case "IE":
        throttleSpeed = 30
        break
      default:
        throttleSpeed = 18
    }
    const moveCursor = (e) => {
      setCursorXY({ x: e.clientX, y: e.clientY })
    }
    const throttledMoveCursor = throttle(moveCursor, throttleSpeed) // Throttle function calls to once every 100ms
    if (parent.current) {
      parent.current.addEventListener("mousemove", throttledMoveCursor)
    } else {
      console.error("Parent element not found")
    }

    return () => {
      if (parent.current) {
        parent.current.addEventListener("mousemove", throttledMoveCursor)
      }
    }
  }, [])

  useEffect(() => {
    let animationFrameId
    const followCursor = () => {
      if (cursorRef.current) {
        const lerp = (start, end, factor) => start + (end - start) * factor
        const speed = 0.11 // Lower speed for smoother following; adjust as needed

        // Directly use cursorXY for positioning, applying LERP for smoothness
        let nextX = lerp(
          cursorRef.current.style.left
            ? parseInt(cursorRef.current.style.left, 10)
            : 0,
          cursorXY.x + window.scrollX,
          speed
        )
        let nextY = lerp(
          cursorRef.current.style.top
            ? parseInt(cursorRef.current.style.top, 10)
            : 0,
          cursorXY.y + window.scrollY,
          speed
        )

        if (
          Math.abs(nextX - (cursorXY.x + window.scrollX)) < 10 &&
          Math.abs(nextY - (cursorXY.y + window.scrollY)) < 10
        ) {
          nextX = cursorXY.x + window.scrollX
          nextY = cursorXY.y + window.scrollY
        }

        cursorRef.current.style.left = `${nextX}px`
        cursorRef.current.style.top = `${nextY}px`
        cursorRef.current.style.transform = "translate(-50%, -50%)" // Keep centered on cursor

        animationFrameId = requestAnimationFrame(followCursor)
      }
    }

    followCursor()

    return () => {
      cancelAnimationFrame(animationFrameId) // Cancel the animation frame request when the component unmounts
    }
  }, [cursorXY])

  return (
    <>
      <div
        id='custom-cursor'
        ref={cursorRef}
        className='flex flex-col justify-center will-change-auto'
        style={{
          position: "absolute",
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          backgroundColor: "#3356f4",
          pointerEvents: "none",
          transform: `translate(-50%, -50%)`,
          zIndex: 999, // Ensure cursor is above other elements
          transition: "all 0.1s ease",
        }}
        onClick={handleClick}
      ></div>
    </>
  )
}

export default CustomCursor
