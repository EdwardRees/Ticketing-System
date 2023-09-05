import { TicketType } from "./ticket-type";
import { TicketStatus } from "./ticket-status";

export type Ticket = {
  id: string;
  created_at: number;
  title: string;
  description: string;
  type: TicketType;
  status: TicketStatus;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  assigned_to: string|null;
  due_date: Date;
};
