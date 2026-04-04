import { ArrowDownRight, ArrowUpRight, Sparkles } from "lucide-react";
import { useStore } from "../store/useStore";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const Insights = () => {
  const { transactions } = useStore();
  const expenses = transactions.filter((item) => item.type === "expense");

  const groupedExpenses = expenses.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount;
    return acc;
  }, {});

  const highestSpendingCategory = Object.entries(groupedExpenses).sort(
    (left, right) => right[1] - left[1]
  )[0];

  const monthlyTotals = transactions.reduce((acc, item) => {
    const monthKey = item.date.slice(0, 7);
    acc[monthKey] = (acc[monthKey] || 0) + (item.type === "income" ? item.amount : -item.amount);
    return acc;
  }, {});

  const sortedMonths = Object.entries(monthlyTotals).sort((left, right) =>
    left[0].localeCompare(right[0])
  );
  const currentMonth = sortedMonths.at(-1);
  const previousMonth = sortedMonths.at(-2);
  const monthlyDifference = (currentMonth?.[1] || 0) - (previousMonth?.[1] || 0);
  const comparisonDirection = monthlyDifference >= 0 ? "up" : "down";

  return (
    <section className="rounded-[32px] border border-white/20 bg-white/70 p-6 shadow-xl backdrop-blur-md md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-700">Insights</p>
          <p className="mt-1 text-sm text-zinc-500">Programmatic snapshot from the current data</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#e7f6f2,#fff2dc)] text-[#7bb3a7]">
          <Sparkles size={18} />
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        <div className="rounded-[26px] border border-white/20 bg-[linear-gradient(135deg,rgba(210,241,235,0.9),rgba(255,255,255,0.95))] p-6 shadow-sm">
          <p className="text-sm text-zinc-500">Highest Spending Category</p>
          <p className="mt-3 text-2xl font-semibold text-slate-800">
            {highestSpendingCategory?.[0] || "No data"}
          </p>
          <p className="mt-2 text-sm text-zinc-500">
            {highestSpendingCategory ? currency.format(highestSpendingCategory[1]) : "No expenses yet"}
          </p>
        </div>

        <div className="rounded-[26px] border border-white/20 bg-[linear-gradient(135deg,rgba(255,240,201,0.88),rgba(255,255,255,0.94))] p-6 shadow-sm">
          <p className="text-sm text-zinc-500">Monthly Comparison</p>
          <div className="mt-3 flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                comparisonDirection === "up" ? "bg-[#7db7a7] text-white" : "bg-[#f0b18f] text-white"
              }`}
            >
              {comparisonDirection === "up" ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
            </div>
            <div>
              <p className="text-2xl font-semibold text-slate-800">{currency.format(Math.abs(monthlyDifference))}</p>
              <p className="text-sm text-zinc-500">
                {comparisonDirection === "up" ? "Higher than last month" : "Lower than last month"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Insights;
