import { NextRequest } from "next/server";
import { change_type } from "../../util/ticket/change_type";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  const { type } = data;
  return change_type(req, type, params.id);
}
