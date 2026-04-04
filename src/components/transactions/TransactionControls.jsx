import { useStore } from "../../store/useStore";

const TransactionControls = () => {
  const { setSearch, setFilter } = useStore();

  return (
    <div className="flex gap-3 mb-3">
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 border rounded"
      />

      <select
        onChange={(e) => setFilter(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="all">All</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
    </div>
  );
};

export default TransactionControls;