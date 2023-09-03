import { NextRequest } from "next/server";

import { get_ticket, update_ticket, delete_ticket } from "../util/ticket";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return get_ticket(req, params.id);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  let data = await req.json();
  return update_ticket(req, data, params.id);
}

export async function DELETE(req:NextRequest, {params}: {params: {id: string}}){
  return delete_ticket(req, params.id)
}