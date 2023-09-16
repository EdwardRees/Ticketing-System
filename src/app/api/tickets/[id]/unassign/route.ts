import { NextRequest } from "next/server";

import { unassign_ticket } from "../../util";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return unassign_ticket(req, params.id);
}
