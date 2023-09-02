import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import type { Database } from "@/lib/database.types";

const IndividualTicketPage = async ({ params }: { params: { id: string } }) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  return <></>;
};


export default IndividualTicketPage;