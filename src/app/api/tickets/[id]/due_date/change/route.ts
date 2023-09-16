import { NextRequest } from "next/server";
import { change_date } from "../../../util";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await req.json();
  const { due_date } = data;
  return change_date(req, due_date, params.id);
}