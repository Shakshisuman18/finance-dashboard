import { useStore } from "../../store/useStore";

const SummaryCards = () => {
  const { transactions } = useStore();

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expense;

  const data = [
    { title: "Total Balance", value: balance },
    { title: "Income", value: income },
    { title: "Expenses", value: expense },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-5">
      {data.map((item, index) => (
        <div
          key={index}
          className="p-5 rounded-2xl shadow-md bg-gradient-to-br from-indigo-500 to-purple-500 text-white hover:scale-105 transition duration-300"
        >
          <p className="text-gray-500">{item.title}</p>
          <h2 className="text-2xl font-bold mt-2">₹{item.value}</h2>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;