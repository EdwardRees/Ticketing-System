import { NextRequest } from "next/server";
import { change_ticket_status } from "../../util";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  let data = await req.json();
  let { status } = data;
  return change_ticket_status(req, status, params.id);
}