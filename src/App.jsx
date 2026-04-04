import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="flex bg-gradient-to-br from-indigo-100 via-white to-purple-100 min-h-screen">
      
      <Sidebar />

      <div className="flex-1 p-6">
        <Dashboard />
      </div>

    </div>
  );
}

export default App;