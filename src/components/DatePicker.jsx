import * as React from "react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({ onChange }) {
  const [date, setDate] = React.useState(null); // Start with no date selected

  const handleDateSelect = (selectedDate) => {
    if (selectedDate && selectedDate.getTime() === date?.getTime()) {
      // If the same date is selected again, deselect it
      setDate(null);
      onChange(null); // Notify parent with null
    } else {
      // Otherwise, select the new date
      setDate(selectedDate || new Date()); // Ensure a valid date is always set
      onChange(selectedDate || new Date()); // Pass the selected date
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[150px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
