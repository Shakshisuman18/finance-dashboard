import { useStore } from "../../store/useStore";

const TransactionTable = () => {
  const { transactions, search, filter, role } = useStore();

  // 🔍 Search filter
  let filtered = transactions.filter((t) =>
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  // 🎯 Type filter
  if (filter !== "all") {
    filtered = filtered.filter((t) => t.type === filter);
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Transactions</h2>

        {/* 🔐 Role-based button */}
        {role === "admin" && (
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            + Add Transaction
          </button>
        )}
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-500 text-left">
            <th className="py-2">Date</th>
            <th className="py-2">Amount</th>
            <th className="py-2">Category</th>
            <th className="py-2">Type</th>
          </tr>
        </thead>

        <tbody>
          {filtered.length > 0 ? (
            filtered.map((t) => (
              <tr
                key={t.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="py-2">{t.date}</td>
                <td className="py-2 font-medium">₹{t.amount}</td>
                <td className="py-2">{t.category}</td>
                <td
                  className={`py-2 ${
                    t.type === "income"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {t.type}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-400">
                No transactions found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;