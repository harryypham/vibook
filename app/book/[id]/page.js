"use client"
import React, { useState, useEffect, useRef } from "react"
import ReadingView from "@/components/ReadingView"
import Tiptap from "@/components/Tiptap"
// import dynamic from "next/dynamic"
// import { Suspense } from "react"
// import "@mdxeditor/editor/style.css"

// const Editor = dynamic(() => import("@/components/MarkdownEditor"), {
//   // Make sure we turn SSR off
//   ssr: false,
// })

export default function BookPage({ params }) {
  const [editorOpen, setEditorOpen] = useState(false)
  const [editorContent, setEditorContent] = useState("<p>Hello World! 🌎️</p>")
  return (
    <div className='flex w-screen min-h-screen'>
      <ReadingView
        params={params}
        editorOpen={editorOpen}
        setEditorOpen={setEditorOpen}
      />
      {editorOpen && (
        // <Suspense fallback={null}>
        //   <Editor markdown={markdown} />
        // </Suspense>
        <Tiptap
          editorContent={editorContent}
          setEditorContent={setEditorContent}
        />
        // <div>Editor</div>
      )}
    </div>
  )
}
