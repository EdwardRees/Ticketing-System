import type { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { TodoForm } from "./components/TodoForm";

const Todos = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: auth, error: auth_error } = await supabase.auth.getSession();
  if (auth?.session === null || auth?.session == undefined) {
    redirect("/login");
  }
  const { data: todos, error: todos_error } = await supabase
    .from("todos")
    .select()
    .eq("owner_id", auth?.session?.user.id);

  return (
    <>
      <p className="text-xl">Todos</p>
      {todos?.length === undefined || todos?.length === 0 ? (
        <p>You have 0 todos. </p>
      ) : (
        <div className="flex flex-col justify-between py-3 px-3 mx-3">
          <ol className="list-decimal">
            {todos?.map((todo) => {
              return (
                <li key={todo.id}>
                  Task: {todo.title}
                  <br />
                  Description: {todo.description}
                </li>
              );
            })}
          </ol>
        </div>
      )}
      <br />

      <TodoForm user_id={auth?.session?.user.id} />
    </>
  );
};

export { Todos };
