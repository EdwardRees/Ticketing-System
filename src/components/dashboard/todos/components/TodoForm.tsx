"use client";
import { useState } from "react";
import { Input, Label, Button, Textarea } from "@/components/ui";
import axios from "axios";

const TodoForm = ({ user_id }: { user_id: string }) => {
  const [todo, setTodo] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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
      console.info(todos);
      if (todos.status === 200) {
        setTodo("");
        setDescription("");
      } else {
        setError("Failed to create todo");
      }
    } catch (err: any) {
      setError(err?.message);
    }
    setLoading(false);
  };

  return (
    <>
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
    </>
  );
};

export { TodoForm };
