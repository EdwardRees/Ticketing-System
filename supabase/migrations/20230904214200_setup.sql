create table
  public.tickets (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone null default now(),
    title text null,
    description text null,
    type text null,
    status text null,
    assigned_to uuid null,
    contact_name text null,
    contact_email text null,
    contact_phone text null,
    due_date date null,
    constraint ticket_pkey primary key (id),
    constraint tickets_assigned_to_fkey foreign key (assigned_to) references auth.users (id) on delete set null
  ) tablespace pg_default;



  create table
  public.todos (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone null default now(),
    owner_id uuid null,
    title text null,
    description text null,
    completed boolean null,
    due_date date null,
    constraint todo_pkey primary key (id),
    constraint todos_owner_id_fkey foreign key (owner_id) references auth.users (id) on delete cascade
  ) tablespace pg_default;

  create table
  public.users (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone null default now(),
    name text null,
    email text null,
    user_id uuid null,
    constraint user_pkey primary key (id),
    constraint users_user_id_fkey foreign key (user_id) references auth.users (id) on delete cascade
  ) tablespace pg_default;