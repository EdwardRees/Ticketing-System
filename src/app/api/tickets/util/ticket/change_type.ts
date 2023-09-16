import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";
import type { Database } from "@/lib/database.types";

const change_type = async (req: NextRequest, new_type: string, id: string) => {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const { data: ticket, error } = await supabase
    .from("tickets")
    .update({type: new_type})
    .eq("id", id)
    .select();
  if (error) {
    return NextResponse.error();
  }
  return NextResponse.json(ticket);
}

export { change_type };