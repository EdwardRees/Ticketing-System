import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "@/lib/database.types";
import { TodoForm } from "./components/TodoForm";
import { Sheet, SheetContent, SheetTrigger, Button } from "@/components/ui";
import { redirect } from "next/navigation";

const Todos = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: auth, error: auth_error } = await supabase.auth.getSession();
  if(auth?.session === null || auth?.session == undefined){
    redirect("/login");
  }
  const { data: todos, error: todos_error } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", auth?.session?.user.id);

  return (
    <>
      <p className="text-xl">Todos</p>
      {todos?.length === undefined || todos?.length === 0 ? (
        <p>You have 0 todos. </p>
      ) : (
        <div className="flex flex-col items-center justify-between py-3 px-3">
          {todos?.map((todo) => {
            return (
              <div
                key={todo.id}
                className="flex flex-row items-center justify-between py-3 px-3"
              >
                <p className="text-xl">{todo.title}</p>
                <p className="text-xl">{todo.description}</p>
              </div>
            );
          })}
        </div>
      )}
      <br />
      <Sheet>
        <SheetTrigger>
          <Button className="w-full">Create Todo</Button>
        </SheetTrigger>
        <SheetContent>
          <TodoForm user_id={auth?.session?.user.id} />
        </SheetContent>
      </Sheet>
    </>
  );
};

export { Todos };
