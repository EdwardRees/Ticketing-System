import { DashboardSummary } from "./summary";
import { Todos } from "./todos";
import { Button } from '@/components/ui';
import { TicketForm } from "./ticket-form";
const Dashboard = async () => {
  return (
    <>
      <div className="flex flex-col items-center justify-between py-3 px-3">
        <div>
          <div className="flex flex-row justify-between">
            <p className="text-xl">Ticket Summary</p>
            <TicketForm />
          </div>
          <DashboardSummary />
          <Todos />
        </div>
      </div>
    </>
  );
};

export { Dashboard };

export * from "./summary";
export * from './todos';
export * from './ticket-form';