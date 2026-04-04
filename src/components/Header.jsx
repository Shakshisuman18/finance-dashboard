import { Bell, Mail, Menu, Search } from "lucide-react";
import { useStore } from "../store/useStore";
import RoleSwitcher from "./RoleSwitcher";

const Header = () => {
  const { toggleMobileMenu } = useStore();

  return (
    <header className="relative overflow-hidden rounded-[32px] border border-white/20 bg-white/70 px-5 py-5 shadow-xl backdrop-blur-md md:px-7 md:py-6 lg:px-8 lg:py-7">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_20%_0%,rgba(243,225,193,0.55),transparent_35%),radial-gradient(circle_at_35%_10%,rgba(202,232,222,0.35),transparent_30%)]" />

      <div className="relative flex flex-col gap-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/50 bg-white/80 text-slate-500 lg:hidden"
            >
              <Menu size={18} />
            </button>

            <div className="hidden items-center gap-3 rounded-full border border-white/40 bg-white/75 px-4 py-3 text-sm text-zinc-500 sm:flex sm:min-w-[220px] md:min-w-[280px]">
              <Search size={16} />
              <span>Search..</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            {[Bell, Mail].map((Icon, index) => (
              <button
                key={index}
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-zinc-500 shadow-sm"
              >
                <Icon size={16} />
              </button>
            ))}
            <div className="hidden items-center gap-8 px-3 text-sm font-medium text-zinc-500 md:flex">
              <button type="button">Cards</button>
              <button type="button">Invoices</button>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-white/30 bg-white/75 px-2 py-2 pl-4 shadow-sm">
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-700">Hi, Sara</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f2b36c,#ea7e6b)] text-sm font-semibold text-white">
                SR
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-5 border-t border-slate-200/70 pt-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Expected From YouTube", value: "$14,130.00", note: "Current Month" },
              { label: "Expected From ToglBid", value: "$19,351.00", note: "Current Month" },
              { label: "Salary", value: "$12,394.99", note: "Current Month" },
              { label: "Expected Monthly Income", value: "$42k", note: "14.5%" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-[24px] border border-white/20 bg-white/55 px-4 py-4 shadow-sm"
              >
                <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-500">
                  {item.label}
                </p>
                <p className="mt-2 text-[26px] font-semibold leading-none text-slate-800">
                  {item.value}
                </p>
                <p className="mt-2 text-xs text-zinc-500">{item.note}</p>
              </div>
            ))}
          </div>

          <div className="justify-self-start md:justify-self-end">
            <RoleSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
