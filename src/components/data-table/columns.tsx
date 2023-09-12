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
} from "@/components/ui/";

import { DataTableColumnHeader } from "./data-table-column";

import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

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
              <span className="flex items-center">
                <span className="h-2 w-2 bg-green-400 rounded-full mr-2" />
                Open
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span className="flex items-center">
                <span className="h-2 w-2 bg-yellow-400 rounded-full mr-2" />
                On Hold
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span className="flex items-center">
                <span className="h-2 w-2 bg-red-400 rounded-full mr-2" />
                Closed
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    // TODO Add a button to change the status
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    // TODO Add a button to change the type
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
  }, // TODO: Add a button to assign the ticket to a user
  {
    accessorKey: "due_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Due Date" />
    ),
    cell: ({ row }) => {
      let due_date = row.getValue("due_date");
      if (due_date === null || due_date === undefined) {
        return "No Due Date";
      }
      // TODO Add a button to change the due date
      return new Date(due_date as string).toLocaleDateString();
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
            <DropdownMenuItem>View Ticket details</DropdownMenuItem>
            <DropdownMenuItem>View Assigned To details</DropdownMenuItem>
            <DropdownMenuItem>Edit Ticket Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
