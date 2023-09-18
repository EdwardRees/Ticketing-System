"use client";
import { useState } from "react";
import { DatePicker } from "@/components/date-picker";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

const DueDateCell = ({
  due_date,
  ticket_id,
}: {
  due_date: Date | string | undefined | unknown;
  ticket_id: string | unknown;
}) => {
  const [date, setDate] = useState<Date>(
    new Date(due_date !== undefined ? (due_date as string) : "")
  );
  const [containsDate, setContainsDate] = useState<boolean>(
    due_date !== undefined && due_date !== null
  );
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const router = useRouter();

  const change_due_date = async (ticket_id: string, due_date: Date) => {
    const response = await axios.patch(
      `${location.origin}/api/tickets/${ticket_id}/due_date/change`,
      {
        due_date,
      }
    );
    setContainsDate(true);
    router.refresh();

    return response.data;
  };

  const reset_due_date = async (ticket_id: string) => {
    const response = await axios.patch(
      `${location.origin}/api/tickets/${ticket_id}/due_date/reset`
    );
    setContainsDate(false);
    router.refresh();

    return response.data;
  };

  return (
    <div className="flex flex-row">
      <div className="flex items-center">
        <button
          className="text-left text-sm font-medium text-gray-900 dark:text-gray-100"
          onClick={() => setShowDatePicker(!showDatePicker)}
        >
          {containsDate ? date.toLocaleDateString() : "No Due Date"}
        </button>
        <button
          className="ml-2 text-sm font-medium text-gray-900"
          onClick={() => setShowDatePicker(!showDatePicker)}
        >
          <span className="sr-only">Open calendar</span>
        </button>
      </div>
      {showDatePicker && (
        <>
          <DatePicker
            selectedDate={date}
            setSelectedDate={(date: Date) => {
              setDate(date);
              change_due_date(ticket_id as string, date);
            }}
          />
          {containsDate && (
            <Button
              onClick={() => reset_due_date(ticket_id as string)}
              variant="ghost"
            >
              <FontAwesomeIcon icon={faXmarkCircle} color={"red"} />
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export { DueDateCell };
