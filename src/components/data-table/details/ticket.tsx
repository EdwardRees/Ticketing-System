"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/";
import { Ticket as TicketType } from "@/lib/types/ticket";
import { cn } from "@/lib/utils";
const Ticket = ({ ticket }: { ticket: TicketType }) => {
  const {
    id,
    title,
    description,
    type,
    status,
    contact_name,
    contact_email,
    contact_phone,
    due_date,
  } = ticket;

  const user = ticket.assigned_to;

  const compare_due_date = () => {
    const colors = [
      "border-red-600",
      "border-orange-500",
      "border-amber-500",
      "border-yellow-500",
      "border-lime-500",
      "border-green-500",
      "border-emerald-500",
    ];
    const today = new Date();
    const due_date = new Date(ticket.due_date);
    const elapsed = due_date.getTime() - today.getTime();
    const days = Math.ceil(elapsed / (1000 * 3600 * 24));
    if (days < 0) {
      return colors[0];
    } else if (days < 3) {
      return colors[1];
    } else if (days < 6) {
      return colors[2];
    } else if (days < 9) {
      return colors[3];
    } else if (days < 12) {
      return colors[4];
    } else if (days < 15) {
      return colors[5];
    } else {
      return colors[6];
    }
  };
  return (
    <div
      className={cn(
        "px-4 py-4 flex flex-col border-2 border-solid rounded-md mx-2",
        due_date !== null ? `${compare_due_date()}` : "border-gray-500"
      )}
      key={id}
    >
      <div className="flex flex-row justify-between py-3 w-64">
        <p className="text-xl font-semibold">{title}</p>
        <p className="text-lg">{status}</p>
      </div>
      <p className="text-sm w-full py-2">{description}</p>
      <p className="text-lg">[{type}]</p>
      <br />
      <div className="px-3 py-3 border border-solid rounded-xl">
        <Accordion type="single" collapsible className="pb-2">
          <AccordionItem value="Contact Information">
            <AccordionTrigger>
              <p className="text-lg font-semibold">Contact Information</p>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm">{contact_name}</p>
              <p className="text-sm">{contact_email}</p>
              <p className="text-sm">{contact_phone}</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="Assigned To">
            <AccordionTrigger>
              <p className="text-lg font-semibold">Assigned To</p>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm">
                {/* {user} */}
                {/* {user !== null ? user : "Unassigned"} */}
                {ticket.assigned_to !== null
                  ? ticket.assigned_to
                  : "Unassigned"}
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="Due Date">
            <AccordionTrigger>
              <p className="text-lg font-semibold">Due Date</p>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm">
                {due_date !== null
                  ? new Date(due_date).toLocaleDateString()
                  : "No Due Date"}
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export { Ticket };
