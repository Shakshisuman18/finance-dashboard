import { ShieldCheck, UserRound } from "lucide-react";
import { useStore } from "../store/useStore";

const RoleSwitcher = () => {
  const { role, setRole } = useStore();

  return (
    <div className="inline-flex rounded-full border border-white/50 bg-white/75 p-1 shadow-sm">
      {[
        { value: "viewer", label: "Viewer", icon: UserRound },
        { value: "admin", label: "Admin", icon: ShieldCheck },
      ].map((item) => {
        const Icon = item.icon;
        const active = role === item.value;

        return (
          <button
            key={item.value}
            type="button"
            onClick={() => setRole(item.value)}
            className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition ${
              active
                ? "bg-[#79b7a5] text-white shadow-[0_10px_25px_rgba(121,183,165,0.32)]"
                : "text-slate-500"
            }`}
          >
            <Icon size={14} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default RoleSwitcher;
