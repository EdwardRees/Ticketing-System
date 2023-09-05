"use client";
import { useState } from "react";
import {
  Input,
  Label,
  Button,
  Textarea,
  Sheet,
  SheetTrigger,
  SheetContent,
} from "@/components/ui";
import axios from "axios";
import { useRouter } from "next/navigation";

const TodoForm = ({ user_id }: { user_id: string }) => {
  const router = useRouter();
  const [todo, setTodo] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showSheet, setShowSheet] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const todos = await axios.post(`${location.origin}/api/todos`, {
        todo,
        description,
        user_id,
      });
      if (todos.status === 200) {
        setTodo("");
        setDescription("");
        router.refresh();
      } else {
        setError("Failed to create todo");
      }
    } catch (err: any) {
      setError(err?.message);
    }
    setLoading(false);
    setShowSheet(false);
  };

  return (
    <>
      <Sheet open={showSheet} onOpenChange={() => setShowSheet(!showSheet)}>
        <SheetTrigger>
          <Button className="w-full">Create Todo</Button>
        </SheetTrigger>
        <SheetContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center justify-between py-3 px-3">
              <div>
                <p className="text-xl">Create Todo</p>
                <div className="flex flex-row items-center justify-between py-3 px-3">
                  <Label htmlFor="todo" className="pr-3">
                    Todo
                  </Label>
                  <Input
                    id="todo"
                    type="text"
                    placeholder="Todo"
                    value={todo}
                    onChange={(e: any) => setTodo(e.target.value)}
                  />
                </div>
                <div className="flex flex-row items-center justify-between py-3 px-3">
                  <Label htmlFor="description" className="pr-3">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Description"
                    value={description}
                    onChange={(e: any) => setDescription(e.target.value)}
                  />
                </div>
                <div className="flex flex-row items-center justify-between py-3 px-3">
                  <Button type="submit" disabled={loading}>
                    Create Todo
                  </Button>
                </div>
                {error && <p>{error}</p>}
              </div>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export { TodoForm };
