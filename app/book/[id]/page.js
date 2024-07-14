"use client"
import React, { useState } from "react"
import ReadingView from "@/components/ReadingView"
import Editor from "@/components/Editor"

const BookPage = ({ params }) => {
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
        <Editor
          editorContent={editorContent}
          setEditorContent={setEditorContent}
        />
      )}
    </div>
  )
}

export default BookPage
