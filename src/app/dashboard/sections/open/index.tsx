import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "@/lib/database.types";
import { Ticket } from "@/components/tickets";

const OpenTickets = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase
    .from("tickets")
    .select("*")
    .eq("status", "Open");
  const { data: users, error: users_error } = await supabase
    .from("users")
    .select();
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Loading...</div>;
  return (
    <div className="flex flex-row justify-around px-4 py-3">
      {data.map((ticket) => {
        if(ticket.assigned_to === null){
          return <Ticket key={ticket.id} ticket={ticket} user={null} />;
        }
        const user = users?.find((user) => user.user_id === ticket.assigned_to);
        return <Ticket key={ticket.id} ticket={ticket} user={user} />;
      })}
    </div>
  );
};

export { OpenTickets };