/* eslint-disable react/prop-types */
import React from 'react'
import { cn } from "@/lib/utils"
import { format, getMonth, getYear } from "date-fns"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown, CalendarIcon } from 'lucide-react'

import { medicines } from '@/dummy-data/medicines'

import { Calendar } from "@/components/ui/calendar"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

export const ComboBox = ({ table }) => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[170px] justify-between text-muted-foreground"
        >
          {value
            ? medicines.find((medicine) => medicine.value === value)?.label
            : "Select medicine..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search medicine..." />
          <CommandList>
            <CommandEmpty>No medicine found.</CommandEmpty>
            <CommandGroup>
              {medicines.map((medicine) => (
                <CommandItem
                  key={medicine.value}
                  value={medicine.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    table.getColumn("medicine")?.setFilterValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === medicine.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {medicine.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

const months = Array.from({ length: 12 }, (_, i) => format(new Date(2022, i, 1), "MMMM"));
const years = Array.from({ length: 50 }, (_, i) => getYear(new Date()) - 10 + i)

export const DatePicker = ({ onSelect }) => {
  const [date, setDate] = React.useState();
  const [month, setMonth] = React.useState(getMonth(new Date()));
  const [year, setYear] = React.useState(getYear(new Date()));
 
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[170px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex gap-1">
          <Select
            onValueChange={(month) => {
              setMonth(months.indexOf(month))
            }}
            defaultValue={months[month]}
          >
            <SelectTrigger>
            <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent position="popper">
              {months.map(month => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={(year) =>
              setYear(parseInt(year))
            }
            defaultValue={year.toString()}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent position="popper">
              {years.map(year => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            setDate(selectedDate);
            onSelect(selectedDate);
          }}
          month={new Date(year, month)}
          onMonthChange={(newMonth) => {
            setMonth(getMonth(newMonth))
            setYear(getYear(newMonth))
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}