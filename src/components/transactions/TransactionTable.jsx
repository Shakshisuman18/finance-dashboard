import { Pencil, Trash2 } from "lucide-react";
import { useStore } from "../../store/useStore";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const TransactionTable = () => {
  const { role, editTransaction, deleteTransaction, getFilteredTransactions } = useStore();
  const filteredTransactions = getFilteredTransactions();

  return (
    <div className="overflow-hidden rounded-[28px] border border-white/20 bg-white/85 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 text-sm text-zinc-500">
        <p>{filteredTransactions.length} records available</p>
        <p>{role === "admin" ? "Admin controls enabled" : "Viewer mode"}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="bg-[#f8fafb] text-left text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              <th className="px-5 py-4">Date</th>
              <th className="px-5 py-4">Category</th>
              <th className="px-5 py-4">Type</th>
              <th className="px-5 py-4">Amount</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length ? (
              filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-t border-slate-100 text-zinc-600 transition hover:bg-white">
                  <td className="px-5 py-4">{transaction.date}</td>
                  <td className="px-5 py-4 font-medium text-slate-700">{transaction.category}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                        transaction.type === "income"
                          ? "bg-[#e6f6f2] text-[#6fa89f]"
                          : "bg-[#fff0e7] text-[#e99b78]"
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-semibold text-slate-900">
                    {transaction.type === "income" ? "+" : "-"}
                    {currency.format(transaction.amount)}
                  </td>
                  <td className="px-5 py-4">
                    {role === "admin" ? (
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => editTransaction(transaction.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eef7f4] text-[#72ab9f]"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteTransaction(transaction.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fff1ea] text-[#e89a78]"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="text-right text-xs text-zinc-400">Read only</div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center">
                  <div className="mx-auto max-w-sm rounded-[24px] border border-white/20 bg-[#f7fafb] px-6 py-8 shadow-sm">
                    <p className="text-lg font-semibold text-slate-700">No transactions found</p>
                    <p className="mt-2 text-sm text-zinc-500">
                      Try changing the search text, category filter, or sort order.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
