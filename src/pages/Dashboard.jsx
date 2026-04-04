import Header from "../components/Header";
import SummaryCards from "../components/cards/SummaryCards";
import TransactionTable from "../components/transactions/TransactionTable";
import TransactionControls from "../components/transactions/TransactionControls";
import MainChart from "../components/charts/MainChart";
import Insights from "../components/Insights";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-12 gap-6 lg:gap-8">
      <div className="col-span-12 mb-2">
        <Header />
      </div>

      <div className="col-span-12 mb-2">
        <SummaryCards />
      </div>

      <div className="col-span-12 mb-2">
        <MainChart />
      </div>

      <div className="col-span-12 grid gap-6 lg:gap-8 xl:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)]">
        <Insights />
        <section className="rounded-[32px] border border-white/20 bg-white/70 p-6 shadow-xl backdrop-blur-md md:p-8">
          <TransactionControls />
          <TransactionTable />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
