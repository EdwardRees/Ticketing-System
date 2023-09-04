import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "@/lib/database.types";

import { NextRequest, NextResponse } from "next/server";

const get_ticket = async (req: NextRequest, id: string) => {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const { data, error } = await supabase
    .from("tickets")
    .select()
    .eq("id", id)
    .single();
  if (error) {
    return NextResponse.error();
  }
  return NextResponse.json(data);
};

export { get_ticket };
