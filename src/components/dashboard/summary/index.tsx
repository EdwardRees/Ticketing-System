import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "@/lib/database.types";
import { Box } from "./components/Box";

const DashboardSummary = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: auth, error: auth_error } = await supabase.auth.getSession();
  const { data: overdue, error: overdue_error } = await supabase
    .from("tickets")
    .select("*")
    .not("due_date", "is", null);

  let overdue_tickets = [];

  if (overdue?.length !== undefined && overdue?.length > 0) {
    const today = new Date();
    overdue_tickets = overdue?.filter((ticket) => {
      const due_date = new Date(ticket.due_date);
      return due_date < today;
    });
  }

  const { data: open, error: open_error } = await supabase
    .from("tickets")
    .select("*")
    .eq("status", "Open");

  const { data: closed, error: closed_error } = await supabase
    .from("tickets")
    .select("*")
    .eq("status", "Closed");

  const { data: on_hold, error: on_hold_error } = await supabase
    .from("tickets")
    .select("*")
    .eq("status", "On Hold");

  const { data: unassigned, error: unassigned_error } = await supabase
    .from("tickets")
    .select("*")
    .is("assigned_to", null);

  return (
    <>
      <div className="flex flex-row items-center justify-center py-5 px-5">
        <Box
          name="Overdue"
          value={overdue_tickets.length}
          edge="left"
        />
        <Box
          name="Open"
          value={open?.length !== undefined ? open?.length : 0}
        />
        <Box
          name="Closed"
          value={closed?.length !== undefined ? closed?.length : 0}
        />
        <Box
          name="On Hold"
          value={on_hold?.length !== undefined ? on_hold?.length : 0}
        />
        <Box
          name="Unassigned"
          value={unassigned?.length !== undefined ? unassigned?.length : 0}
          edge="right"
        />
      </div>
    </>
  );
};

export { DashboardSummary };
