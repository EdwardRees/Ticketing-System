"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Button,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/";

import axios from "axios";

import { TicketType } from "@/lib/types";
import { useRouter } from "next/navigation";

const TypeCell = ({
  ticket_id,
  type,
}: {
  ticket_id: string | unknown;
  type: string | unknown;
}) => {
  const router = useRouter();
  const change_type = async (ticket_id: string, type: string) => {
    const response = await axios.patch(
      `${location.origin}/api/tickets/${ticket_id}/change_type`,
      {
        type,
      }
    );
    router.refresh();
    return response;
  };

  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  const format = (str: string) => toTitleCase(str.replace("_", " "));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="sm">
          <span className="sr-only">Open menu</span>
          {format(type as string)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Select a type</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {Object.keys(TicketType).map((type) => (
          <DropdownMenuItem key={type}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => change_type(ticket_id as string, format(type))}
            >
              {format(type)}
            </Button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { TypeCell };
