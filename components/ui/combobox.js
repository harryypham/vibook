"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function Combobox({ fontSize, changeFontSize }) {
  const [open, setOpen] = React.useState(false)
  console.log(fontSize)

  const frameworks = [
    {
      value: "text-sm",
      label: "Small",
    },
    {
      value: "text-base",
      label: "Base",
    },
    {
      value: "text-lg",
      label: "Large",
    },
    {
      value: "text-xl",
      label: "XL",
    },
    {
      value: "text-2xl",
      label: "XXL",
    },
  ]
  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between'
        >
          {fontSize
            ? frameworks.find((framework) => framework.value === fontSize)
                ?.label
            : "Customize font size..."}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='Chọn kích cỡ chữ...' />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  changeFontSize(currentValue === fontSize ? "" : currentValue)
                  setOpen(false)
                }}
                className={framework.value}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    fontSize === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}