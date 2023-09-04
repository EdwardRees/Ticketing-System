import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "@/lib/database.types";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const { data, error } = await supabase.from("todos").select();
  if (error) {
    return NextResponse.error();
  }
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const { todo, description, user_id } = await req.json();
  const { data, error } = await supabase
    .from("todos")
    .insert({ title: todo, description, completed: false, owner_id: user_id })
    .select()
    .single();
  if (error) {
    return NextResponse.json({ status: 500, error });
  }
  return NextResponse.json({ status: 200, data });
}
