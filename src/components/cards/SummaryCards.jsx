import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ArrowUpRight } from "lucide-react";
import { useStore } from "../../store/useStore";

const sparklineSets = {
  teal: [
    { value: 4 },
    { value: 6 },
    { value: 5 },
    { value: 9 },
    { value: 8 },
    { value: 10 },
    { value: 7 },
  ],
  yellow: [
    { value: 5 },
    { value: 3 },
    { value: 4 },
    { value: 7 },
    { value: 9 },
    { value: 8 },
    { value: 6 },
  ],
  orange: [
    { value: 3 },
    { value: 4 },
    { value: 5 },
    { value: 8 },
    { value: 4 },
    { value: 9 },
    { value: 6 },
    { value: 10 },
    { value: 5 },
  ],
};

const overviewCards = [
  {
    title: "$14k",
    subtitle: "Social Media",
    theme: "teal",
    wrapper:
      "bg-[linear-gradient(180deg,rgba(203,245,244,0.88),rgba(242,255,255,0.95))]",
    chartType: "area",
  },
  {
    title: "$19k",
    subtitle: "Freelancing",
    theme: "yellow",
    wrapper:
      "bg-[linear-gradient(180deg,rgba(250,255,187,0.92),rgba(255,255,243,0.96))]",
    chartType: "line",
  },
  {
    title: "$12k",
    subtitle: "Salary",
    theme: "orange",
    wrapper:
      "bg-[linear-gradient(180deg,rgba(251,232,222,0.92),rgba(255,248,245,0.96))]",
    chartType: "bar",
  },
];

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const MiniChart = ({ theme, chartType }) => {
  const data = sparklineSets[theme];

  if (chartType === "bar") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <Bar dataKey="value" fill="#d28b49" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  const colors = {
    teal: { stroke: "#6da9a3", fill: "#7db7b0" },
    yellow: { stroke: "#222222", fill: "#edf19a" },
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id={`${theme}-mini`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colors[theme].fill} stopOpacity={0.8} />
            <stop offset="100%" stopColor={colors[theme].fill} stopOpacity={0.18} />
          </linearGradient>
        </defs>
        <Tooltip
          contentStyle={{ borderRadius: 16, border: "none", background: "#ffffff" }}
          formatter={(value) => currency.format(value * 1000)}
        />
        <Area
          type={chartType === "line" ? "monotone" : "natural"}
          dataKey="value"
          stroke={colors[theme].stroke}
          strokeWidth={chartType === "line" ? 3 : 0}
          fill={`url(#${theme}-mini)`}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const BalanceCard = () => (
  <div className="relative h-full overflow-hidden rounded-[32px] border border-white/20 bg-[linear-gradient(135deg,#71a7a2,#7cb5ae)] p-6 text-white shadow-xl md:p-8">
    <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
    <div className="absolute left-0 bottom-0 h-32 w-32 rounded-full bg-[#5c9791]/50 blur-2xl" />
    <div className="relative">
      <div className="mb-12 flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold">My Balance</p>
        </div>
        <button type="button" className="text-sm text-white/80">
          Next
        </button>
      </div>

      <div className="mb-10 flex items-center gap-2">
        <span className="h-8 w-8 rounded-full border border-white/40 bg-white/95" />
        <span className="h-8 w-8 rounded-full border border-white/20 bg-white/15" />
      </div>

      <p className="text-[10px] uppercase tracking-[0.3em] text-white/60">Card Number</p>
      <p className="mt-3 text-[30px] font-semibold tracking-[0.16em]">3829 4820 4629 5025</p>

      <div className="mt-10 flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-white/60">Card Holder Name</p>
          <p className="mt-2 text-sm font-semibold">AR Shakir</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-[0.28em] text-white/60">Valid Date</p>
          <p className="mt-2 text-sm font-semibold">09 / 17</p>
        </div>
      </div>
    </div>
  </div>
);

const SummaryCards = () => {
  const { transactions } = useStore();

  const totalIncome = transactions
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <section className="space-y-8">
      <div className="grid gap-6 lg:gap-8 xl:grid-cols-[minmax(0,1.5fr)_360px]">
        <div className="rounded-[32px] border border-white/20 bg-white/70 p-6 shadow-xl backdrop-blur-md md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-700">Quick Overview</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {overviewCards.map((card) => (
              <article
                key={card.subtitle}
                className={`rounded-[28px] border border-white/20 p-6 shadow-xl ${card.wrapper}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[40px] font-semibold leading-none text-slate-700">
                      {card.title}
                    </p>
                    <p className="mt-3 text-lg font-medium text-zinc-500">{card.subtitle}</p>
                  </div>
                  <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/70 text-slate-500"
                  >
                    <ArrowUpRight size={16} />
                  </button>
                </div>
                <div className="mt-6 h-28">
                  <MiniChart theme={card.theme} chartType={card.chartType} />
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-white/20 bg-white/70 p-3 shadow-xl backdrop-blur-md">
          <BalanceCard />
        </div>
      </div>

      <div className="grid gap-6 lg:gap-8 md:grid-cols-2 xl:grid-cols-3">
        {[
          { label: "Expected Monthly Income", value: currency.format(totalIncome), tint: "from-[#d8f1ec] to-[#f8fffd]" },
          { label: "Expected Monthly Expense", value: currency.format(17410), tint: "from-[#fff4c8] to-[#fffdfa]" },
          { label: "Monthly Reserve", value: currency.format(totalIncome - 17410), tint: "from-[#fde3d8] to-[#fff7f3]" },
        ].map((item) => (
          <div
            key={item.label}
            className={`rounded-[32px] border border-white/20 bg-gradient-to-br ${item.tint} p-6 shadow-xl`}
          >
            <p className="text-sm text-zinc-500">{item.label}</p>
            <p className="mt-4 text-3xl font-semibold text-slate-800">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SummaryCards;
