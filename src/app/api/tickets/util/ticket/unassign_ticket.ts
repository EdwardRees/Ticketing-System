import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "@/lib/database.types";

import { NextRequest, NextResponse } from 'next/server';

const unassign_ticket = async (req: NextRequest, id: string) => {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const { data: ticket, error } = await supabase
    .from("tickets")
    .update({assigned_to: null})
    .eq("id", id)
    .select();
  if (error) {
    return NextResponse.error();
  }
  return NextResponse.json(ticket);
}

export { unassign_ticket };