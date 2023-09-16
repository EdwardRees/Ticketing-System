import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "@/lib/database.types";

import { NextRequest, NextResponse } from "next/server";

const change_date = async (req: NextRequest, new_date: string, id: string) => {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const { data: ticket, error } = await supabase
    .from("tickets")
    .update({due_date: new_date})
    .eq("id", id)
    .select();
  if (error) {
    return NextResponse.error();
  }
  return NextResponse.json(ticket);
}

export { change_date };