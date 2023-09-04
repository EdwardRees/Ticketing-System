import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';
import type { Database } from "@/lib/database.types";

import { NextRequest, NextResponse } from 'next/server';

const get_tickets = async (req: NextRequest) => {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const { data, error } = await supabase
    .from("tickets")
    .select("*");
  if(error){
    return NextResponse.error();
  }
  return NextResponse.json(data);
};

export { get_tickets };