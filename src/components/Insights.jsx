import { useStore } from "../store/useStore";

const Insights = () => {
  const { transactions } = useStore();

  const expenses = transactions.filter((t) => t.type === "expense");

  const highest = expenses.reduce((max, curr) =>
    curr.amount > max.amount ? curr : max,
    expenses[0] || {}
  );

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h3 className="font-semibold mb-2">Insights</h3>

      {highest ? (
        <p>
          Highest spending:{" "}
          <span className="font-bold">{highest.category}</span> (₹
          {highest.amount})
        </p>
      ) : (
        <p>No data</p>
      )}
    </div>
  );
};

export default Insights;