# Ticket System

- Create a ticket system to handle freelance work
- Should link up and use Supabase as the backend
- Users would be able to add a ticket, update their ticket based on a log-in code, remove their own ticket
- Ticket system would allow users to check tickets as "done"
- Work similar to a todo list but with tickets or todos created by other users submitting a form

- Admin panel to handle tickets
- Potentially create an app to read this, notify the admin user by email?

## Tech Stack

- [NextJS](https://www.nextjs.org)
- [Shadcn/ui](https://ui.shadcn.com/)
- [React](https://react.dev/)
- [Supabase](https://supabase.com/)
- [Tailwind](https://tailwindcss.com/)
- [Resend](https://resend.com/)

## Database Design

- Ticket
    - id: string
    - title: string
    - description: string
    - type: string (TicketType)
    - status: string (TicketStatus)
    - contact_name: string
    - contact_email: string
    - contact_phone: string
    - createdAt: string
    - assigned_to: string
    - due_date: Date
- User
    - id: string
    - name: string
    - email: string
- Team?
- Todo
    - id: string
    - title: string
    - description: string
    - completed: boolean
    - createdAt: string
    - due_date: Date

### Types

- TicketType
    - Tutoring/Teaching
    - Web Development
    - Mobile Development
    - Consulting
- TicketStatus
    - Open
    - In Progress
    - Closed
    - Overdue
    - Cancelled
    - On Hold
    - Resolved
    - Reopened
    - Waiting for Customer
    - Waiting for Third Party
    - Waiting for Change
