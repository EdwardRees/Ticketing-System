"use client";
import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Calendar,
  Button,
} from "@/components/ui";

const DatePicker = ({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: Date;
  setSelectedDate: any;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">
          <span className="sr-only">Open calendar</span>
          <CalendarIcon size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export { DatePicker };
