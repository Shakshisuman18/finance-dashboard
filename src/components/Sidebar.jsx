const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-white/70 backdrop-blur-lg border-r p-5 hidden md:block">
      <h2 className="text-xl font-bold text-indigo-600 mb-6">Finance</h2>

      <nav className="space-y-3">
        {["Dashboard", "Transactions", "Insights", "Settings"].map((item) => (
          <div
            key={item}
            className="p-2 rounded-lg cursor-pointer hover:bg-indigo-100 hover:text-indigo-600 transition"
          >
            {item}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;