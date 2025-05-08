"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker() {

  const [dateFrom, setDateFrom] = React.useState(new Date());
  const [dateTo, setDateTo] = React.useState(new Date());

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[150px] justify-start text-left font-normal",
            !dateFrom && "text-muted-foreground"
          )}
        >
          {dateFrom ? format(dateFrom, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={dateFrom}
          onSelect={setDateFrom}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
