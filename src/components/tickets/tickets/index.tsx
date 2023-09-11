/*
  Create a table for the tickets
  Should be organized by status
  Should have a button to create a ticket
  Each ticket should have the option to update and delete the ticket
  Each ticket should have a button to change the status of the ticket
  Each ticket should have a button to view the ticket; with more details in a dialog
  Each ticket should have a button to assign the ticket to a user
  Each ticket should have a button to view the user assigned to the ticket

  At the top, a filter to filter by status

  Add a search bar at the top that filters down the tickets,
    Include different keywords to filter by
      Status, Due Date, Assigned To, Contact Name, Contact Email, Contact Phone
    Include a button to clear the search bar

*/

import { Ticket } from "@/lib/types";
import { columns } from "@/components/data-table/columns";
import { DataTable } from "@/components/data-table";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "@/lib/database.types";

const Tickets = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: tickets , error: tickets_error } = await supabase.from("tickets").select("*");
  const { data: users, error: user_errors } = await supabase.from("users").select("*");
  tickets?.map((ticket: Ticket) => {
    if(ticket.assigned_to === null) return ticket.assigned_to = "Unassigned";
    ticket.assigned_to = users?.find((user) => user.user_id === ticket.assigned_to)?.name;
    return ticket;
  })

  
  if (tickets === undefined || tickets_error) {
    return <div>Error</div>;
  }

  return (
    <div className="flex flex-col w-full h-full">
      <DataTable columns={columns} data={tickets} />
    </div>
  );
};

export { Tickets };
