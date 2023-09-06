import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "@/lib/database.types";

import { NextRequest, NextResponse } from "next/server";

const change_assignee_ticket = async (req: NextRequest, new_assignee_id: string, id: string) => {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const { data: ticket, error } = await supabase
    .from("tickets")
    .update({assigned_to: new_assignee_id})
    .eq("id", id)
    .select();
  if (error) {
    return NextResponse.error();
  }
  return NextResponse.json(ticket);
};

export { change_assignee_ticket };