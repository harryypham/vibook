"use client"
import React, { useState, useEffect, useRef } from "react"
import Combobox from "@/components/ui/combobox"
import supabase from "@/api/supabaseClient"
import { BlockPicker } from "react-color"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const ReadingView = ({ params, editorOpen, setEditorOpen }) => {
  const containerRef = useRef(null)

  const [isLoading, setIsLoading] = useState(true)

  const [book, setBook] = useState(null)
  const [title, setTitle] = useState(null)
  const [author, setAuthor] = useState(null)
  const [type, setType] = useState(null)

  const [textColorOpen, setTextColorOpen] = useState(false)
  const [fontSize, setFontSize] = useState("")
  const [colorState, setColorState] = useState({
    titleColor: "#000000",
    authorColor: "#000000",
    contentColor: "#000000",
  })
  const [backgroundColor, setBackgroundColor] = useState("#ffffff")

  const handleChangeBackgroundColor = (color) => {
    setBackgroundColor(color.hex)
  }

  const handleTextSubmit = () => {
    const titleColor = document.getElementById("title").value
    const authorColor = document.getElementById("author").value
    const contentColor = document.getElementById("content").value
    setColorState({
      titleColor: titleColor,
      authorColor: authorColor,
      contentColor: contentColor,
    })
    setTextColorOpen(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!params.id) return
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("id", params.id)
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
        <section
          ref={containerRef}
          className='border-r h-screen overflow-y-auto'
          style={{
            backgroundColor: backgroundColor,
            width: editorOpen == true ? "50%" : "100%",
          }}
        >
          <div
            className={"text-lg mx-auto px-6"}
            style={{ width: editorOpen == true ? "100%" : "75%" }}
          >
            <h1
              className='text-4xl font-semibold pt-6 pb-2'
              style={{ color: colorState.titleColor }}
            >
              {title}
            </h1>
            <h4
              className='text-base font-light'
              style={{ color: colorState.authorColor }}
            >
              Tác giả: {author}. Thể loại: {type}
            </h4>
            <div className='w-full overflow-hidden flex flex-wrap gap-4 my-6'>
              <Combobox
                fontSize={fontSize}
                changeFontSize={setFontSize}
              />
              <Popover
                open={textColorOpen}
                onOpenChange={setTextColorOpen}
              >
                <PopoverTrigger asChild>
                  <Button variant='outline'>Customize Text</Button>
                </PopoverTrigger>
                <PopoverContent className='w-72'>
                  <div className='grid gap-4'>
                    <div className='space-y-2'>
                      <h4 className='font-medium leading-none'>Màu chữ</h4>
                      <p className='text-sm text-muted-foreground'>
                        Chấp nhận tên màu (tiếng Anh), màu HEX hoặc màu RGB
                      </p>
                    </div>
                    <div className='grid gap-2'>
                      <div className='grid grid-cols-3 items-center gap-4'>
                        <Label htmlFor='title'>Tựa đề</Label>
                        <Input
                          id='title'
                          defaultValue={colorState.titleColor}
                          className='col-span-2 h-8'
                        />
                      </div>
                      <div className='grid grid-cols-3 items-center gap-4'>
                        <Label htmlFor='author'>Tác giả</Label>
                        <Input
                          id='author'
                          defaultValue={colorState.authorColor}
                          className='col-span-2 h-8'
                        />
                      </div>
                      <div className='grid grid-cols-3 items-center gap-4'>
                        <Label htmlFor='content'>Nội dung truyện</Label>
                        <Input
                          id='content'
                          defaultValue={colorState.contentColor}
                          className='col-span-2 h-8'
                        />
                      </div>
                      <Button
                        type='submit'
                        onClick={handleTextSubmit}
                      >
                        Lưu
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant='outline'>Customize Background</Button>
                </PopoverTrigger>
                <PopoverContent className='w-fit border p-0 mt-[2px] shadow-sm'>
                  <BlockPicker
                    className='!font-sans min-w-[205px] border-none outline-none shadow-none'
                    triangle='hide'
                    colors={[
                      "#FF6900",
                      "#FCB900",
                      "#7BDCB5",
                      "#00D084",
                      "#8ED1FC",
                      "#0693E3",
                      "#EB144C",
                      "#F78DA7",
                      "#9900EF",
                      "#000000",
                      "#ABB8C3",
                      "#f5f5f5",
                    ]}
                    color={backgroundColor}
                    onChangeComplete={handleChangeBackgroundColor}
                  />
                </PopoverContent>
              </Popover>

              <Button
                className='border-white'
                onClick={() => setEditorOpen(!editorOpen)}
              >
                {!editorOpen ? "Open Editor" : "Close Editor"}
              </Button>
            </div>

            {book && (
              <div
                dangerouslySetInnerHTML={{ __html: book }}
                style={{ color: colorState.contentColor }}
                className={fontSize}
              ></div>
            )}
          </div>
        </section>
      )}
    </>
  )
}

export default ReadingView
