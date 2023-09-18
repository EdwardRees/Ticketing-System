"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  Button,
} from "@/components/ui";

import { useRouter } from "next/navigation";

import { useUserStore } from "@/lib/state";
import axios from "axios";

const AssignedToCell = ({
  assigned_to,
  ticket_id,
}: {
  assigned_to: string | undefined | unknown;
  ticket_id: string | unknown;
}) => {
  const users = useUserStore((state: any) => state.users);

  const router = useRouter();
  const change_assign_to = async (ticket_id: string, assignee_id: string) => {
    if (assignee_id === "") {
      const response = await axios.patch(
        `${location.origin}/api/tickets/${ticket_id}/unassign`
      );
      router.refresh();
      return response;
    }
    const response = await axios.patch(
      `${location.origin}/api/tickets/${ticket_id}/change_assign_to`,
      {
        assignee_id,
      }
    );
    router.refresh();
    return response;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <span className="sr-only">Open menu</span>
          <span>
            {(assigned_to as string) === undefined
              ? "Unassigned"
              : (assigned_to as string)}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Change Assigned To</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {users?.map((user: any) => {
          return (
            <DropdownMenuItem key={user.user_id}>
              <Button
                className="flex items-center"
                onClick={() =>
                  change_assign_to(ticket_id as string, user.user_id)
                }
              >
                {user.name}
              </Button>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { AssignedToCell };
