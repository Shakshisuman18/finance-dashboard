import {
  Archive,
  BriefcaseBusiness,
  CalendarDays,
  CreditCard,
  FileBox,
  LayoutDashboard,
  PiggyBank,
  ReceiptText,
  Wallet,
  X,
} from "lucide-react";
import { useStore } from "../store/useStore";

const navigationItems = [
  { name: "Savings", icon: PiggyBank },
  { name: "My Balances", icon: Wallet },
  { name: "Recurring", icon: CalendarDays },
  { name: "Statements", icon: CreditCard },
  { name: "My Box", icon: FileBox },
  { name: "Archives", icon: Archive },
];

const expenseGroups = ["Family", "Vacation Planning", "Buy a new car", "Festival ideas"];
const incomeSources = ["Work", "Onboarding Plan", "Invoice Review", "Presentation Work"];

const SidebarPanel = ({ onClose }) => (
  <div className="flex h-full flex-col border-r border-[#e6e9ee] bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(250,251,253,0.76))] px-6 py-8 backdrop-blur-md">
    <div className="mb-10 flex items-center justify-between lg:justify-start">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/80 text-[#6da9a3] shadow-sm">
          <LayoutDashboard size={18} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
            Navigation
          </p>
        </div>
      </div>
      {onClose ? (
        <button
          type="button"
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-slate-500 lg:hidden"
        >
          <X size={18} />
        </button>
      ) : null}
    </div>

    <nav className="space-y-2">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.name}
            type="button"
            className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-medium text-zinc-500 transition hover:bg-white/80 hover:text-slate-900"
          >
            <Icon size={16} className="text-slate-400" />
            <span>{item.name}</span>
          </button>
        );
      })}
    </nav>

    <div className="mt-12 space-y-10">
      <section>
        <h3 className="mb-4 text-sm font-semibold text-slate-700">Expenses Groups</h3>
        <div className="space-y-3">
          {expenseGroups.map((item, index) => (
            <label key={item} className="flex items-center gap-3 text-sm text-zinc-500">
              <span className="h-3.5 w-3.5 rounded border border-slate-200 bg-white/70" />
              <span className={index === 0 ? "text-[#f3a28c]" : ""}>{item}</span>
            </label>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-4 text-sm font-semibold text-slate-700">Income Sources</h3>
        <div className="space-y-3">
          {incomeSources.map((item, index) => (
            <label key={item} className="flex items-center gap-3 text-sm text-zinc-500">
              <span className="h-3.5 w-3.5 rounded border border-slate-200 bg-white/70" />
              <span className={index === 0 ? "text-[#79b7a5]" : ""}>{item}</span>
            </label>
          ))}
        </div>
      </section>
    </div>

    <div className="mt-auto flex items-center gap-3 rounded-[28px] border border-white/20 bg-[linear-gradient(135deg,rgba(116,183,173,0.18),rgba(255,211,174,0.18))] px-4 py-4 shadow-xl">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/80 text-[#78a7a0]">
        <BriefcaseBusiness size={18} />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-700">Portfolio Ready</p>
        <p className="text-xs text-slate-400">Soft layout aligned to the mockup</p>
      </div>
    </div>
  </div>
);

const Sidebar = () => {
  const { mobileMenuOpen, setMobileMenuOpen } = useStore();

  return (
    <>
      <aside className="hidden h-full min-h-full shrink-0 lg:block">
        <SidebarPanel />
      </aside>

      {mobileMenuOpen ? (
        <div className="fixed inset-0 z-50 bg-slate-900/20 backdrop-blur-sm lg:hidden">
          <div className="h-full w-[280px] max-w-[85vw]">
            <SidebarPanel onClose={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Sidebar;
