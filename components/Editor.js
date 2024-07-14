"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Highlight from "@tiptap/extension-highlight"
import Underline from "@tiptap/extension-underline"
import Code from "@tiptap/extension-code"
import BulletList from "@tiptap/extension-bullet-list"
import ListItem from "@tiptap/extension-list-item"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"

import Toolbar from "./Toolbar"

import "./Tiptap.css"

const Editor = ({ editorContent, setEditorContent }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Code,
      BulletList,
      ListItem,
      Highlight.configure({ multicolor: true }),
      Image,
      Link.configure({
        openOnClick: true,
        autolink: true,
        protocols: ["ftp", "mailto"],
        defaultProtocol: "https",
      }),
    ],
    content: editorContent,
    editorProps: {
      attributes: {
        class: "h-full w-[50vw] p-4 mx-auto focus:outline-none",
      },
    },
    parseOptions: {
      preserveWhitespace: "full",
    },
    onUpdate({ editor }) {
      console.log(editor.getHTML())
    },
  })

  return (
    <div>
      <Toolbar
        editor={editor}
        setEditorContent={setEditorContent}
      />
      <EditorContent editor={editor} />
    </div>
  )
}

export default Editor
