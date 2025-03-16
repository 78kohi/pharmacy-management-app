/* eslint-disable react/prop-types */
"use client";

import * as React from "react";
import { CalendarIcon, SquarePen } from "lucide-react";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "./ui/calendar";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function DatePicker({ date, onDateSelect, className, ...props }) {
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const initialDate = date instanceof Date ? date : new Date(date);
  const [selectedMonth, setSelectedMonth] = React.useState(initialDate);
  const [selectedYear, setSelectedYear] = React.useState(
    initialDate.getFullYear()
  );

  const today = new Date();
  const years = Array.from(
    { length: 11 },
    (_, i) => today.getFullYear() - 5 + i
  );

  const handleMonthChange = (monthName) => {
    const monthIndex = months.indexOf(monthName);
    if (selectedYear) {
      const newDate = new Date(selectedYear, monthIndex, 1);
      setSelectedMonth(newDate);
    }
  };

  const handleYearChange = (year) => {
    const numYear = Number(year);
    if (selectedMonth) {
      const newDate = new Date(numYear, selectedMonth.getMonth(), 1);
      setSelectedMonth(newDate);
      setSelectedYear(numYear);
    }
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-2 group transition select-none">
          <SquarePen className="h-4 w-4 text-muted-foreground group-hover:text-black" />
          <p className="text-muted-foreground group-hover:text-black">{`${format(date, "PPPp")}`}</p>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex flex-col gap-4 p-3">
          <div className="flex gap-2">
            <Select
              onValueChange={handleMonthChange}
              value={
                selectedMonth ? months[selectedMonth.getMonth()] : undefined
              }
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month, idx) => (
                  <SelectItem key={idx} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              onValueChange={handleYearChange}
              value={selectedYear?.toString()}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
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
            onSelect={(newDate) => {
              onDateSelect(newDate);
              setIsPopoverOpen(false);
            }}
            month={selectedMonth}
            onMonthChange={setSelectedMonth}
            initialFocus
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

DatePicker.displayName = "DatePicker";
