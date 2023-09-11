"use client";
import type { Ticket } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Checkbox
} from "@/components/ui/";

import { DataTableColumnHeader } from "./data-table-column";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";

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
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />
  },
  {
    accessorKey: "title",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />
  },
  {
    accessorKey: "description",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />
    // TODO Add a button to change the status
  },
  {
    accessorKey: "type",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />
    // TODO Add a button to change the type
  },
  {
    accessorKey: "contact_name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Contact Name" />
  },
  {
    accessorKey: "contact_email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Contact Email" />
  },
  {
    accessorKey: "contact_phone",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Contact Phone" />
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
    cell: ({ row }) => {
      const created_at = new Date(row.getValue("created_at"));
      return created_at.toLocaleString();
    },
  },
  {
    accessorKey: "assigned_to",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Assigned To" />
  }, // TODO: Add a button to assign the ticket to a user
  {
    accessorKey: "due_date",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Due Date" />,
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
