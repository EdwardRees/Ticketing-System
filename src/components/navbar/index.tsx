import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "@/lib/database.types";
import Link from "next/link";
import { Button } from "@/components/ui/";
import { Icon } from "@/components/";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const Navbar = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: auth, error } = await supabase.auth.getSession();
  if (error || auth.session === null || auth.session === undefined) {
    return (
      <div className="flex flex-row justify-between w-screen px-5 py-3">
        <div className="flex flex-row items-center">
          <span className="text-xl px-3 py-3 rounded-xl border-solid border-gray-100">
            Home
          </span>
        </div>
        <div className="flex flex-row items-center"></div>
        <div className="flex flex-row items-center">
          <Link href="/login">
            <Button className="mr-3">Login</Button>
          </Link>
          <Link href="/signup">
            <Button className="mr-3">Sign Up</Button>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-row justify-between w-screen px-5 py-3">
      <div className="flex flex-row items-center">
        <Link className="text-xl px-3 py-3 rounded-xl border-solid border-gray-100" href="/">
          Home
        </Link>
      </div>
      <div className="flex flex-row items-center"></div>
      <div className="flex flex-row items-center">
        <Link href="/dashboard"><Button className="mr-3">Dashboard</Button></Link>

        <Link href="/profile">
          <Button className="mr-3" variant="ghost">
            <Icon type="user" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export { Navbar };
