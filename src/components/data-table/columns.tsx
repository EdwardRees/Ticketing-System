"use client";
import type { Ticket } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";

import {
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
} from "@/components/ui/";
import { AssignedToCell, DueDateCell, TypeCell } from "./cells/";
import { Ticket as TicketDetails } from "./details";

import axios from "axios";

import { DataTableColumnHeader } from "./data-table-column";

import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";

const change_status = async (ticket_id: string, status: string) => {
  const response = await axios.patch(
    `${location.origin}/api/tickets/${ticket_id}/change_status`,
    {
      status,
    }
  );
  location.reload();
  return response;
};

export const columns: ColumnDef<Ticket>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status");

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <span className="sr-only">Open menu</span>
              <span
                className={cn(
                  status === "Open"
                    ? "border-green-500"
                    : status === "On Hold"
                    ? "border-yellow-500"
                    : status === "Closed"
                    ? "border-gray-500"
                    : "border-red-500",
                  "border border-solid rounded px-3 py-2"
                )}
              >
                {status as string}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Change Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button
                className="flex items-center"
                onClick={() => change_status(row.getValue("id"), "Open")}
              >
                <span className="h-2 w-2 bg-green-400 rounded-full mr-2" />
                Open
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                className="flex items-center"
                onClick={() => change_status(row.getValue("id"), "On Hold")}
              >
                <span className="h-2 w-2 bg-yellow-400 rounded-full mr-2" />
                On Hold
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                className="flex items-center"
                onClick={() => change_status(row.getValue("id"), "Closed")}
              >
                <span className="h-2 w-2 bg-red-400 rounded-full mr-2" />
                Closed
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      const type = row.getValue("type");

      return <TypeCell ticket_id={row.getValue("id")} type={type} />;
    },
  },
  {
    accessorKey: "contact_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact Name" />
    ),
  },
  {
    accessorKey: "contact_email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact Email" />
    ),
  },
  {
    accessorKey: "contact_phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact Phone" />
    ),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const created_at = new Date(row.getValue("created_at"));
      return created_at.toLocaleString();
    },
  },
  {
    accessorKey: "assigned_to",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assigned To" />
    ),
    cell: ({ row }) => {
      const assigned_to = row.getValue("assigned_to");
      return (
        <AssignedToCell
          assigned_to={assigned_to}
          ticket_id={row.getValue("id")}
        />
      );
    },
  },
  {
    accessorKey: "due_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Due Date" />
    ),
    cell: ({ row }) => {
      const due_date = row.getValue("due_date");
      const ticket_id = row.getValue("id");
      return <DueDateCell due_date={due_date} ticket_id={ticket_id} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const ticket = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(ticket.id)}
            >
              Copy Ticket ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Dialog>
                <DialogTrigger>
                  {/* <Button variant="ghost" size="sm"> */}
                  View Ticket details
                  {/* </Button> */}
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <h2 className="text-lg font-medium text-gray-900">
                      Ticket Details
                    </h2>
                  </DialogHeader>
                  <TicketDetails ticket={ticket} />
                </DialogContent>
              </Dialog>
            </DropdownMenuItem>
            <DropdownMenuItem>View Assigned To details</DropdownMenuItem>
            <DropdownMenuItem>Edit Ticket Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
