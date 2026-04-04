import Header from "../components/Header";
import SummaryCards from "../components/cards/SummaryCards";
import TransactionTable from "../components/transactions/TransactionTable";
import TransactionControls from "../components/transactions/TransactionControls";
import RoleSwitcher from "../components/RoleSwitcher";
import Charts from "../components/charts/Charts";
import Insights from "../components/Insights";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      
      
      <Header />
<Insights />
      <RoleSwitcher />

      <h2 className="text-2xl font-semibold">Dashboard Overview</h2>

      <SummaryCards />

      <Charts />

      <Insights />

      <div>
        <TransactionControls />
        <TransactionTable />
      </div>

    </div>
  );
};

export default Dashboard;