import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import type { Database } from "@/lib/database.types";

export default function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  
  return <></>;
}

/*



Project idea:
- Create a simple ticket system app. UI serves as a dashboard for tickets.
- Main feature comes with the backend system and database connection.
- API should be accessible from anywhere, so it can be used in other projects.

API Endpoints:
- GET /api/tickets
- POST /api/tickets
- GET /api/tickets/:id
- PUT /api/tickets/:id
- DELETE /api/tickets/:id

Ticket Model:
- id: number
- title: string
- description: string
- status: string
- createdAt: string
- contact_name: string
- contact_email: string
- contact_phone: string

Main page: 
- navbar at top with Dashboard and Create Ticket
- list of tickets
- each ticket has a title, description, status, and contact name

Create Ticket page:
- navbar at top with Dashboard and Create Ticket
- form to create a ticket
- fields: title, description, status, contact name, contact email, contact phone
- calls supabase instance to create a ticket

Dashboard page:
- navbar at top with Dashboard and Create Ticket
- list of tickets
- each ticket has a title, description, status, and contact name
- each ticket has a button to delete the ticket
- each ticket has a button to edit the ticket
- each ticket has a button to change the status of the ticket
    - status options: open, in progress, in review, closed
- each ticket has a button to view the ticket; with more details in a dialog

Ticket page:
- navbar at top with Dashboard and Create Ticket
- title, description, status, and contact name
- button to delete the ticket
- button to edit the ticket
- button to change the status of the ticket
    - status options: open, in progress, in review, closed
- button to close the dialog




*/
