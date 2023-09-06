import { NextRequest } from "next/server";
import { change_assignee_ticket } from "../../util";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  let data = await req.json();
  let { assignee_id } = data;
  return change_assignee_ticket(req, assignee_id, params.id);
}
