import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "@/lib/database.types";
import { redirect } from "next/navigation";
import { Navbar, Icon } from "@/components";

const ProfilePage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: auth, error } = await supabase.auth.getSession();
  if (auth.session === undefined) {
    return redirect("/login");
  }

  const { data: user, error: user_error } = await supabase
    .from("users")
    .select()
    .eq("user_id", auth?.session?.user.id)
    .single();

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold">Profile</h1>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center py-3">
            <div className="py-3">
              <Icon type="user-circle" size={"5x"} />
            </div>
            <p className="py-2 text-2xl"><span className="font-semibold">Name:</span> {user?.name}</p>
            <p className="text-2xl"><span className="font-semibold">Email:</span> {user?.email}</p>
          </div>
          </div>
      </div>
    </>
  );
};
export default ProfilePage;
