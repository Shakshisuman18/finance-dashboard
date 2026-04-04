import { Plus, Search } from "lucide-react";
import { useStore } from "../../store/useStore";

const TransactionControls = () => {
  const {
    role,
    search,
    category,
    sortBy,
    transactions,
    setSearch,
    setCategory,
    setSortBy,
    addTransaction,
  } = useStore();

  const categories = ["all", ...new Set(transactions.map((item) => item.category))];

  return (
    <div className="mb-6 flex flex-col gap-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-700">Transaction Activity</p>
          <p className="mt-1 text-sm text-zinc-500">
            Search, sort, and filter the latest income and expense records.
          </p>
        </div>

        {role === "admin" ? (
          <button
            type="button"
            onClick={addTransaction}
            className="inline-flex items-center gap-2 rounded-full bg-[#79b7a5] px-4 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(121,183,165,0.28)]"
          >
            <Plus size={16} />
            Add Transaction
          </button>
        ) : null}
      </div>

      <div className="grid gap-3 md:grid-cols-[1.4fr_0.85fr_0.85fr]">
        <label className="flex items-center gap-3 rounded-[22px] border border-white/20 bg-white/85 px-4 py-3 text-sm text-zinc-500 shadow-sm">
          <Search size={16} />
          <input
            type="text"
            value={search}
            placeholder="Search by category, type or date"
            onChange={(event) => setSearch(event.target.value)}
            className="w-full bg-transparent text-slate-700 outline-none placeholder:text-zinc-500"
          />
        </label>

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded-[22px] border border-white/20 bg-white/85 px-4 py-3 text-sm text-zinc-600 shadow-sm outline-none"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item === "all" ? "All Categories" : item}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          className="rounded-[22px] border border-white/20 bg-white/85 px-4 py-3 text-sm text-zinc-600 shadow-sm outline-none"
        >
          <option value="latest">Latest</option>
          <option value="amount-high">Highest Amount</option>
          <option value="amount-low">Lowest Amount</option>
        </select>
      </div>
    </div>
  );
};

export default TransactionControls;
