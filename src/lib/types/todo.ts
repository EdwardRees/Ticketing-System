export type Todo = {
  id: number;
  created_at: number;
  owner_id: string;
  title: string;
  description: string;
  completed: boolean;
  due_date: Date;
}

