import { LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";
import { useStore } from "../../store/useStore";

const Charts = () => {
  const { transactions } = useStore();

  // Line chart data
  const lineData = transactions.map((t) => ({
    date: t.date,
    amount: t.amount,
  }));

  // Pie chart data
  const categoryData = Object.values(
    transactions.reduce((acc, t) => {
      if (t.type === "expense") {
        acc[t.category] = acc[t.category] || { name: t.category, value: 0 };
        acc[t.category].value += t.amount;
      }
      return acc;
    }, {})
  );

  const COLORS = ["#4F46E5", "#22C55E", "#F97316", "#EF4444"];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      
      {/* Line Chart */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h3 className="mb-3 font-semibold">Balance Trend</h3>
        <LineChart width={300} height={200} data={lineData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="#4F46E5" />
        </LineChart>
      </div>

      {/* Pie Chart */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h3 className="mb-3 font-semibold">Spending Breakdown</h3>
        <PieChart width={300} height={200}>
          <Pie data={categoryData} dataKey="value" nameKey="name">
            {categoryData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

    </div>
  );
};

export default Charts;