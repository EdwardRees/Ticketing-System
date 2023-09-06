import { Ticket as TicketType } from "@/lib/types/ticket";

const Ticket = ({
  ticket,
  user,
}: {
  ticket: TicketType;
  user: { id: string; name: string; email: string };
}) => {
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
  return (
    <div
      className="px-4 py-2 flex flex-col border border-solid border-gray-800 dark:border-gray-100"
      key={id}
    >
      <p className="text-xl font-semibold">{title}</p>
      <div className="flex flex-row justify-between p-4">
        <p className="text-lg">{type}</p>
        <p className="text-lg">{status}</p>
      </div>
      <p className="text-sm w-full p-4">{description}</p>
      <div className="px-3 py-3 border border-solid rounded-xl">
        <p className="text-lg font-semibold">Contact Information</p>
        <p className="text-sm">{contact_name}</p>
        <p className="text-sm">{contact_email}</p>
        <p className="text-sm">{contact_phone}</p>
      </div>
      <div className="px-3 py-3 border border-solid rounded-xl">
        <p className="text-lg font-semibold">Assigned To</p>
        <p className="text-sm">{user.name}</p>
      </div>
      <div className="px-3 py-3 border border-solid rounded-xl">
        <p className="text-lg font-semibold">Due Date</p>
        <p className="text-sm">{due_date.toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export { Ticket };
