import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Link2, Trash2 } from "lucide-react";
import { useStore } from "../../store/useStore";

const chartData = [
  { month: "March", value: 22000 },
  { month: "April", value: 20500 },
  { month: "May", value: 24800 },
  { month: "June", value: 21800 },
  { month: "July", value: 23600 },
  { month: "August", value: 53136.49 },
  { month: "September", value: 27400 },
  { month: "October", value: 25950 },
  { month: "November", value: 19800 },
  { month: "December", value: 18200 },
];

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const ContactAvatar = ({ contact }) => (
  <div
    className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${contact.tint} text-sm font-semibold text-slate-700 shadow-sm`}
  >
    {contact.avatar}
  </div>
);

const MainChart = () => {
  const { contacts } = useStore();

  return (
    <section className="grid gap-6 lg:gap-8 xl:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)]">
      <div className="rounded-[32px] border border-white/20 bg-white/70 p-6 shadow-xl backdrop-blur-md md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-700">Recently Added Contacts</h2>
          </div>
          <button type="button" className="text-xs font-medium text-zinc-500">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {contacts.map((contact, index) => (
            <div
              key={contact.id}
              className={`flex items-center justify-between gap-3 rounded-[24px] border border-white/20 px-4 py-4 shadow-sm ${
                index === 1
                  ? "bg-[linear-gradient(135deg,#ffffff,#78b3a5)]"
                  : "bg-white/80"
              }`}
            >
              <div className="flex items-center gap-3">
                <ContactAvatar contact={contact} />
                <div>
                  <p
                    className={`text-sm font-semibold ${
                      index === 1 ? "text-white" : "text-slate-700"
                    }`}
                  >
                    {contact.name}
                  </p>
                    <p className={`text-xs ${index === 1 ? "text-white/70" : "text-zinc-500"}`}>
                      {contact.note}
                    </p>
                  </div>
              </div>

              {index === 1 ? (
                <div className="flex items-center gap-2">
                  {[Trash2, Link2].map((Icon, iconIndex) => (
                    <button
                      key={iconIndex}
                      type="button"
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white"
                    >
                      <Icon size={14} />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[32px] border border-white/20 bg-white/70 p-6 shadow-xl backdrop-blur-md md:p-8">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-700">Last 30 Days Activity</h2>
            <p className="mt-4 text-4xl font-semibold leading-none text-slate-900">$53,136.49</p>
            <p className="mt-2 text-sm text-zinc-500">August 2022</p>
          </div>
          <button type="button" className="text-xs font-medium text-zinc-500">
            View Full Activity
          </button>
        </div>

        <div className="rounded-[28px] border border-white/20 bg-white/55 p-4">
          <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ left: -18, right: 10, top: 12, bottom: 0 }}>
              <defs>
                <linearGradient id="activityFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#cde8e3" stopOpacity={0.95} />
                  <stop offset="100%" stopColor="#f7fbfb" stopOpacity={0.5} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#e9eef0" vertical={true} strokeDasharray="0" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "#b0b8bf" }}
              />
              <YAxis hide domain={["dataMin - 3000", "dataMax + 3000"]} />
              <Tooltip
                contentStyle={{
                  borderRadius: 20,
                  border: "1px solid rgba(255,255,255,0.6)",
                  background: "rgba(255,255,255,0.9)",
                }}
                formatter={(value) => currency.format(value)}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#8abbb3"
                strokeWidth={3}
                fill="url(#activityFill)"
                activeDot={{ r: 7, fill: "#79b7a5", stroke: "#ffffff", strokeWidth: 3 }}
              />
            </AreaChart>
          </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainChart;
