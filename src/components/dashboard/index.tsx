import { DashboardSummary } from "./summary";
import { Todos } from "./todos";
const Dashboard = async () => {
  return (
    <>
      <div className="flex flex-col items-center justify-between py-3 px-3">
        <div>
          <p className="text-xl">Ticket Summary</p>
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