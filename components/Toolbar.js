"use client"
import { useState } from "react"

import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Underline,
  Highlighter,
  Code,
  Heading,
  Link,
  Image,
  Download,
  Copy,
} from "lucide-react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Toggle } from "@/components/ui/toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import SyntaxHighlighter from "react-syntax-highlighter"
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs"

import "./Tiptap.css"

const Toolbar = ({ editor, setEditorContent }) => {
  const [headingLevel, setHeadingLevel] = useState(1)
  const [headingOpen, setHeadingOpen] = useState(false)

  const [linkOpen, setLinkOpen] = useState(false)
  const [link, setLink] = useState("")

  const [imageLinkOpen, setImageLinkOpen] = useState(false)
  const [imageLink, setImageLink] = useState("")

  const [exportOpen, setExportOpen] = useState(false)
  const [htmlExportDialogOpen, setHtmlExportDialogOpen] = useState(false)
  const [formattedHtml, setFormattedHtml] = useState("")
  const [textExportDialogOpen, setTextExportDialogOpen] = useState(false)

  const addLink = () => {
    if (link === null) {
      return
    }

    if (link === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run()

      return
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: link }).run()
    setLinkOpen(false)
  }

  const addImage = () => {
    const url = imageLink
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
    setImageLinkOpen(false)
  }

  const exportNote = (format) => {
    if (format == "html") {
      const formatted = formatHtml(editor.getHTML())
      setFormattedHtml(formatted)
      setHtmlExportDialogOpen(true)
    } else if (format == "text") {
      setTextExportDialogOpen(true)
    }
    setExportOpen(false)
  }

  const formatHtml = (html) => {
    const formatted = html
      .replace(/></g, ">\n<") // Add line breaks between tags
      .replace(/(>)(<)(\/*)/g, "$1\n$2$3") // Add line breaks between tags
      .replace(/\n\s*\n/g, "\n") // Remove multiple empty lines
      .replace(/^\s+|\s+$/g, "") // Trim leading and trailing whitespace

    return formatted
  }

  const saveContent = () => {
    const content = formatHtml(editor.getHTML())
    setEditorContent(content)
  }

  if (!editor) return null

  return (
    <div className='border-b border-input '>
      <Toggle
        size='sm'
        className='border-r rounded-none'
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold size={16} />
      </Toggle>
      <Toggle
        size='sm'
        className='border-r rounded-none'
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic size={16} />
      </Toggle>
      <Toggle
        size='sm'
        className='border-r rounded-none'
        pressed={editor.isActive("underline")}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
      >
        <Underline size={16} />
      </Toggle>
      <Toggle
        size='sm'
        className='border-r rounded-none'
        pressed={editor.isActive("highlight")}
        onPressedChange={() =>
          editor.chain().focus().toggleHighlight({ color: "#f8b6a8" }).run()
        }
      >
        <Highlighter size={16} />
      </Toggle>
      <Toggle
        size='sm'
        className='border-r rounded-none'
        pressed={editor.isActive("code")}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
      >
        <Code size={16} />
      </Toggle>
      <Toggle
        size='sm'
        className='border-r rounded-none'
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List size={16} />
      </Toggle>
      <Toggle
        size='sm'
        className='border-r rounded-none'
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered size={16} />
      </Toggle>
      <Popover
        className='shadow-none'
        open={headingOpen}
        onOpenChange={setHeadingOpen}
      >
        <PopoverTrigger>
          <Toggle
            size='sm'
            className='border-r rounded-none'
            pressed={editor.isActive("heading", { level: headingLevel })}
          >
            <Heading size={16} />
          </Toggle>
        </PopoverTrigger>
        <PopoverContent className='border-none shadow-none p-0'>
          <Select
            onValueChange={(e) => {
              setHeadingLevel(parseInt(e))

              editor
                .chain()
                .focus()
                .toggleHeading({ level: parseInt(e) })
                .run()
              setHeadingOpen(false)
            }}
          >
            <SelectTrigger className='w-full focus:ring-0'>
              <SelectValue placeholder='Select heading level' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Heading Level</SelectLabel>
                <SelectItem value='1'>H1</SelectItem>
                <SelectItem value='2'>H2</SelectItem>
                <SelectItem value='3'>H3</SelectItem>
                <SelectItem value='4'>H4</SelectItem>
                <SelectItem value='5'>H5</SelectItem>
                <SelectItem value='6'>H6</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </PopoverContent>
      </Popover>
      <Popover
        className='shadow-none'
        open={linkOpen}
        onOpenChange={setLinkOpen}
      >
        <PopoverTrigger>
          <Toggle
            size='sm'
            className='border-r rounded-none'
            pressed={editor.isActive("link")}
          >
            <Link size={16} />
          </Toggle>
        </PopoverTrigger>
        <PopoverContent className='w-48  gap-1 flex flex-col'>
          <Label htmlFor='url'>URL:</Label>
          <Input
            type='url'
            id='url'
            placeholder='https://vibook.com'
            onChange={(e) => {
              setLink(e.target.value)
            }}
          ></Input>
          <Button
            onClick={addLink}
            className={editor.isActive("link") ? "is-active" : ""}
            variant='outline'
          >
            Set Link
          </Button>
          <Separator className='my-2' />

          <Button
            onClick={() => editor.chain().focus().unsetLink().run()}
            disabled={!editor.isActive("link")}
            variant='outline'
          >
            Unset link
          </Button>
        </PopoverContent>
      </Popover>
      <Popover
        className='shadow-none'
        open={imageLinkOpen}
        onOpenChange={setImageLinkOpen}
      >
        <PopoverTrigger>
          <Toggle
            size='sm'
            className='border-r rounded-none'
            pressed={imageLinkOpen ? "is-active" : ""}
          >
            <Image size={16} />
          </Toggle>
        </PopoverTrigger>
        <PopoverContent className='w-48  gap-1 flex flex-col'>
          <Label htmlFor='image-url'>URL:</Label>
          <Input
            type='url'
            id='image-url'
            placeholder='https://vibook.com/llama.png'
            onChange={(e) => {
              setImageLink(e.target.value)
            }}
          ></Input>
          <Button
            onClick={addImage}
            variant='outline'
          >
            Add Image
          </Button>
        </PopoverContent>
      </Popover>
      <Popover
        className='shadow-none'
        open={exportOpen}
        onOpenChange={setExportOpen}
      >
        <PopoverTrigger>
          <Toggle
            size='sm'
            className='border-r rounded-none'
            isActive={exportOpen ? "is-active" : ""}
          >
            <Download size={16} />
          </Toggle>
        </PopoverTrigger>
        <PopoverContent className='w-48  gap-1 flex flex-col'>
          <Button
            onClick={() => {
              exportNote("html")
            }}
            variant='outline'
          >
            Export HTML
          </Button>
          <Button
            onClick={() => {
              exportNote("text")
            }}
            variant='outline'
          >
            Export Text
          </Button>
        </PopoverContent>
      </Popover>
      <Dialog
        open={htmlExportDialogOpen}
        onOpenChange={setHtmlExportDialogOpen}
      >
        <DialogTrigger className='hidden'>Open</DialogTrigger>
        <DialogContent className='max-w-[50vw]'>
          <DialogHeader className='w-full'>
            <DialogTitle className='mb-2'>HTML</DialogTitle>
            <DialogDescription>
              {htmlExportDialogOpen && (
                <div>
                  <Button
                    className='absolute right-6 rounded-none'
                    variant='outline'
                    onClick={() => {
                      navigator.clipboard.writeText(formattedHtml)
                      alert("Copied to clipboard!")
                    }}
                  >
                    <Copy className='w-4 h-4'></Copy>
                  </Button>
                  <SyntaxHighlighter
                    className='w-full'
                    language='html'
                    style={docco}
                    lineProps={{
                      style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
                    }}
                    wrapLines={true}
                    customStyle={{
                      maxHeight: "400px",
                      overflowY: "auto",
                      border: "1px solid #ddd",
                      padding: "10px",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                    }}
                  >
                    {formattedHtml}
                  </SyntaxHighlighter>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog
        open={textExportDialogOpen}
        onOpenChange={setTextExportDialogOpen}
      >
        <DialogTrigger className='hidden'>Open</DialogTrigger>
        <DialogContent className='max-w-[50vw]'>
          <DialogHeader className='w-full'>
            <DialogTitle className='mb-2'>Text</DialogTitle>
            <DialogDescription>
              {textExportDialogOpen && (
                <div className='border p-3 rounded-md'>{editor.getText()}</div>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Button
        className='rounded-none border-none'
        onClick={saveContent}
      >
        Save
      </Button>
    </div>
  )
}

export default Toolbar
