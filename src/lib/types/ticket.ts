import { TicketType } from "./ticket-type";

export type Ticket = {
  id: string;
  title: string;
  description: string;
  type: TicketType;
  status: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  createdAt: string;
  assigned_to: string;
};
