import { NextRequest } from "next/server";
import { reset_date } from "../../../util";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return reset_date(req, params.id);
}
