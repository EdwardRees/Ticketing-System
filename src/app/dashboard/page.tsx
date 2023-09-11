import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import type { Database } from "@/lib/database.types";
import { redirect } from "next/navigation";

import { Navbar } from "@/components";
import { TicketForm, Tickets } from "@/components/tickets";
import { DashboardSummary } from "@/components/dashboard";

import { OpenTickets } from "./sections";


const DashboardPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: auth, error: auth_error } = await supabase.auth.getSession();
  if (auth?.session === null || auth?.session == undefined || auth_error) {
    redirect("/login");
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center py-3 px-3 justify-between">
        <div className="flex flex-row justify-between w-screen items-center px-3 py-3">
          <p className="text-xl">Ticket Summary</p>
          <TicketForm />
        </div>
        <DashboardSummary />
        <Tickets />
        {/* <OpenTickets /> */}
        
      </div>
    </>
  );
};

export default DashboardPage;
