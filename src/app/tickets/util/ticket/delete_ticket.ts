import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';
import type { Database } from "@/lib/database.types";

import { NextRequest, NextResponse } from 'next/server';

const delete_ticket = async (req: NextRequest, id: string) => {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const { data, error } = await supabase
    .from("tickets")
    .delete()
    .eq("id", id);
  if(error){
    return NextResponse.error();
  }
  return NextResponse.json(data);
};

export { delete_ticket };