import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useStore } from "../../store/useStore";

const Charts = () => {
  const { transactions } = useStore();
  const currency = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

  const lineData = transactions.reduce((acc, transaction) => {
    const lastBalance = acc.length ? acc[acc.length - 1].balance : 0;
    const movement =
      transaction.type === "income" ? transaction.amount : -transaction.amount;

    acc.push({
      date: new Intl.DateTimeFormat("en-IN", {
        month: "short",
        day: "numeric",
      }).format(new Date(transaction.date)),
      balance: lastBalance + movement,
    });

    return acc;
  }, []);

  const categoryData = Object.values(
    transactions.reduce((acc, t) => {
      if (t.type === "expense") {
        acc[t.category] = acc[t.category] || { name: t.category, value: 0 };
        acc[t.category].value += t.amount;
      }
      return acc;
    }, {})
  );

  const colors = ["#9ad6c9", "#f0c76b", "#f39a7d", "#8db6f8"];

  return (
    <section className="grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
      <div className="rounded-[32px] border border-white/80 bg-white/80 p-5 shadow-[0_22px_52px_rgba(148,163,184,0.14)] md:p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-400">
              Trend
            </p>
            <h3 className="mt-2 text-3xl font-semibold text-slate-900">
              Balance movement
            </h3>
          </div>
          <div className="rounded-full bg-emerald-50 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Live overview
          </div>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={lineData}>
              <defs>
                <linearGradient id="balanceFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8fd7c9" stopOpacity={0.7} />
                  <stop offset="100%" stopColor="#8fd7c9" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#eef2f2" vertical={false} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} />
              <YAxis
                tickFormatter={(value) => `Rs ${Math.round(value / 1000)}k`}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip formatter={(value) => currency.format(value)} />
              <Area
                type="monotone"
                dataKey="balance"
                stroke="#2f766d"
                fill="url(#balanceFill)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-[32px] border border-white/80 bg-white/80 p-5 shadow-[0_22px_52px_rgba(148,163,184,0.14)] md:p-6">
        <div className="mb-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-400">
            Allocation
          </p>
          <h3 className="mt-2 text-3xl font-semibold text-slate-900">
            Spending breakdown
          </h3>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr] xl:grid-cols-1 2xl:grid-cols-[1fr_0.9fr]">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={82}
                  paddingAngle={3}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={entry.name} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => currency.format(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {categoryData.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  />
                  <span className="text-sm font-medium text-slate-600">
                    {item.name}
                  </span>
                </div>
                <span className="text-sm font-semibold text-slate-800">
                  {currency.format(item.value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-[32px] border border-white/80 bg-white/80 p-5 shadow-[0_22px_52px_rgba(148,163,184,0.14)] md:p-6 xl:col-span-2">
        <div className="mb-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-400">
            Weekly view
          </p>
          <h3 className="mt-2 text-3xl font-semibold text-slate-900">
            Expense activity
          </h3>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData}>
              <CartesianGrid stroke="#eef2f2" vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis
                tickFormatter={(value) => `${Math.round(value / 1000)}k`}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip formatter={(value) => currency.format(value)} />
              <Bar dataKey="value" radius={[12, 12, 0, 0]} fill="#f0c76b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default Charts;
