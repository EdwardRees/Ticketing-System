# Ticket System

- Create a ticket system to handle freelance work
- Should link up and use Supabase as the backend
- Users would be able to add a ticket, update their ticket based on a log-in code, remove their own ticket
- Ticket system would allow users to check tickets as "done"
- Work similar to a todo list but with tickets or todos created by other users submitting a form

- Admin panel to handle tickets
- Potentially create an app to read this, notify the admin user by email?

## Tech Stack

- NextJS
- Shadcn/ui
- React
- Supabase
- Tailwind

## Database Design

- Ticket
    - Contact name
    - Contact email
    - Ticket number
    - Ticket type
    - Ticket details
        - How one can help?

- Contact User
    - Code to access and update their ticket

- Costs (simply to look up costs of types)
    - name
    - cost

## Ticket Types

- Tutoring/Teaching
- Web Development
- Mobile Development
- Consulting
