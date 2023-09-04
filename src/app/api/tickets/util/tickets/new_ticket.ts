import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "@/lib/database.types";

import { NextRequest, NextResponse } from "next/server";

const new_ticket = async (req: NextRequest, data: any) => {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const { data: ticket, error } = await supabase
    .from("tickets")
    .insert([data])
    .select();
  if (error) {
    return NextResponse.error();
  }
  return NextResponse.json(ticket);
};

export { new_ticket };
