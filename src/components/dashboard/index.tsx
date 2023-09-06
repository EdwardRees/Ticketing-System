import { Button } from "@/components/ui";
import Link from "next/link";
import { Todos } from "../todos/dashboard-view";
import { DashboardSummary } from "./summary";

import { TicketForm } from "../tickets/ticket-form";
const Dashboard = async () => {
  return (
    <>
      <div className="flex flex-col items-center justify-between py-3 px-3">
        <div>
          <div className="flex flex-row justify-between">
            <p className="text-xl">Ticket Summary</p>
            <div>
              <TicketForm />
              {/* <Link href="/dashboard">
                <Button variant="link">To Dashboard</Button>
              </Link> */}
            </div>
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
