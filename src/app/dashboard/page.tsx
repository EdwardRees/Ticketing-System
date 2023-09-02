import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import type { Database } from "@/lib/database.types";

const DashboardPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  return <></>;
}

export default DashboardPage;