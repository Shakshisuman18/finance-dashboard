import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  ArrowRight,
  BarChart3,
  CalendarRange,
  ChevronDown,
  CreditCard,
  DollarSign,
  Filter,
  LineChart,
  Moon,
  PiggyBank,
  ShieldCheck,
  Sparkles,
  SunMedium,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import styles from "./App.module.css";

const THEME_STORAGE_KEY = "sakshi-dashboard-theme";

const sections = [
  { id: "home", label: "Dashboard" },
  { id: "features", label: "Budgets" },
  { id: "gallery", label: "Reports" },
  { id: "contact", label: "Goals" },
];

const featureCards = [
  {
    title: "Track Your Income & Expenses",
    description: "Monitor every inflow and outflow in one simple view to keep your balance clear.",
    icon: Wallet,
  },
  {
    title: "Smart Budgeting Insights",
    description: "Visualize spending patterns, recurring payments, and category trends with ease.",
    icon: CreditCard,
  },
  {
    title: "Financial Goals & Savings",
    description: "Set savings targets and stay focused with clear progress toward your financial goals.",
    icon: ShieldCheck,
  },
];

const statCards = [
  {
    value: "$48.2k",
    numericValue: 48.2,
    prefix: "$",
    suffix: "k",
    decimals: 1,
    label: "Monthly income and expense flow",
  },
  {
    value: "12+",
    numericValue: 12,
    suffix: "+",
    label: "Budget and report widgets",
  },
  {
    value: "99.9%",
    numericValue: 99.9,
    suffix: "%",
    decimals: 1,
    label: "Clear view of your financial health",
  },
];

const galleryCards = [
  {
    title: "Expense Analysis",
    text: "Review category trends and understand where your money goes each month.",
  },
  {
    title: "Budget Reports",
    text: "Check reports that help you compare budgets, balances, and actual spending.",
  },
  {
    title: "Savings Progress",
    text: "Track milestones for savings goals and stay consistent with long-term plans.",
  },
];

const testimonials = [
  {
    name: "Nina Roy",
    role: "Budget Planner",
    quote: "The dashboard makes it easy to follow expenses, budgets, and savings goals in one place.",
  },
  {
    name: "Arjun Mehta",
    role: "Personal Finance User",
    quote: "Reports and insights feel simple, modern, and useful for daily money decisions.",
  },
];

const quickStats = [
  { label: "Total Balance", value: "$24,890", icon: Wallet },
  { label: "Monthly Income", value: "$8,420", icon: TrendingUp },
  { label: "Monthly Expenses", value: "$4,960", icon: TrendingDown },
  { label: "Savings %", value: "41%", icon: PiggyBank },
];

const recentTransactions = [
  { name: "Salary Credit", amount: "+$3,200", date: "Today", type: "income" },
  { name: "Groceries", amount: "-$84", date: "Apr 04", type: "expense" },
  { name: "Netflix", amount: "-$15", date: "Apr 03", type: "expense" },
  { name: "Freelance", amount: "+$640", date: "Apr 02", type: "income" },
  { name: "Cafe", amount: "-$22", date: "Apr 01", type: "expense" },
];

const budgetItems = [
  { label: "Food", used: 68, tone: "teal" },
  { label: "Travel", used: 42, tone: "purple" },
  { label: "Bills", used: 74, tone: "blue" },
  { label: "Shopping", used: 55, tone: "soft" },
];

const NavLink = ({ href, label, active }) => (
  <a className={`${styles.navLink} ${active ? styles.navLinkActive : ""}`} href={href}>
    {label}
  </a>
);

const SectionLabel = ({ children }) => (
  <p className={styles.sectionLabel}>{children}</p>
);

const FeatureCard = ({ icon, title, description }) => {
  const IconComponent = icon;

  return (
    <article className={styles.featureCard}>
      <div className={styles.iconWrap}>
        <IconComponent size={20} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
};

const StatCard = ({ value, numericValue, prefix = "", suffix = "", decimals = 0, label }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || typeof numericValue !== "number") return undefined;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      return undefined;
    }

    let frameId = 0;
    const duration = 1200;
    const start = performance.now();

    const tick = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = numericValue * eased;
      setDisplayValue(`${prefix}${next.toFixed(decimals)}${suffix}`);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [decimals, numericValue, prefix, suffix, value, visible]);

  return (
    <div ref={ref} className={styles.statCard}>
      <strong>{displayValue}</strong>
      <span>{label}</span>
    </div>
  );
};

const GalleryCard = ({ title, text, index }) => (
  <article className={styles.galleryCard}>
    <div className={styles.galleryVisual} data-variant={index}>
      <span className={styles.galleryBadge}>Preview {index + 1}</span>
    </div>
    <h3>{title}</h3>
    <p>{text}</p>
  </article>
);

const Reveal = ({ children, className = "" }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.revealCard} ${visible ? styles.revealCardVisible : ""} ${className}`.trim()}
    >
      {children}
    </div>
  );
};

const QuickStatItem = ({ icon, label, value }) => {
  const IconComponent = icon;

  return (
    <div className={styles.quickStatItem}>
      <div className={styles.quickStatIcon}>
        <IconComponent size={16} />
      </div>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
};

const TransactionRow = ({ name, amount, date, type }) => (
  <div className={styles.transactionRow}>
    <div className={styles.transactionMeta}>
      <div className={styles.transactionIcon} data-type={type}>
        {type === "income" ? <ArrowDownLeft size={15} /> : <ArrowUpRight size={15} />}
      </div>
      <div>
        <strong>{name}</strong>
        <span>{date}</span>
      </div>
    </div>
    <p data-type={type}>{amount}</p>
  </div>
);

const BudgetItem = ({ label, used, tone }) => (
  <div className={styles.budgetItem}>
    <div className={styles.budgetHeader}>
      <span>{label}</span>
      <strong>{used}%</strong>
    </div>
    <div className={styles.budgetTrack}>
      <div className={styles.budgetFill} data-tone={tone} style={{ width: `${used}%` }} />
    </div>
  </div>
);

const heroTitleLines = [
  "Personal Finance Dashboard",
  "for tracking income, expenses,",
  "and smarter money decisions.",
];

const HeroGrowthGraphic = () => (
  <div className={styles.heroGraphicShell}>
    <div className={styles.heroGraphicOrb} />
    <div className={styles.heroGraphicGrid} />
    <div className={styles.heroDonutWidget}>
      <div className={styles.heroDonutRing}>
        <div className={styles.heroDonutInner}>
          <span>Budget</span>
          <strong>74%</strong>
        </div>
      </div>
    </div>

    <div className={styles.heroMetricCard}>
      <span>Net Growth</span>
      <strong>+18.4%</strong>
    </div>

    <svg
      className={styles.heroSvg}
      viewBox="0 0 520 420"
      role="img"
      aria-label="Animated financial growth graphic"
    >
      <defs>
        <linearGradient id="heroBar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c7b8ff" />
          <stop offset="100%" stopColor="#79d7ca" />
        </linearGradient>
        <linearGradient id="heroLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#8fe6d7" />
        </linearGradient>
      </defs>

      {[80, 150, 220, 290, 360].map((x, index) => (
        <rect
          key={x}
          x={x}
          y={300 - index * 24}
          width="34"
          height={120 + index * 22}
          rx="18"
          fill="url(#heroBar)"
          opacity="0.9"
          className={styles.heroBar}
          style={{ animationDelay: `${index * 0.12}s` }}
        />
      ))}

      <path
        d="M58 272 C118 250, 142 286, 188 210 S286 144, 334 182 S428 154, 468 84"
        fill="none"
        stroke="url(#heroLine)"
        strokeWidth="8"
        strokeLinecap="round"
        className={styles.heroLine}
      />

      {[58, 188, 334, 468].map((cx, index) => (
        <circle
          key={cx}
          cx={cx}
          cy={[272, 210, 182, 84][index]}
          r="11"
          fill="#ffffff"
          className={styles.heroDot}
          style={{ animationDelay: `${index * 0.18}s` }}
        />
      ))}
    </svg>

    <div className={styles.heroFloatingChip}>
      <LineChart size={18} />
      Spending trend
    </div>

    <div className={styles.heroFloatingChipAlt}>
      <DollarSign size={18} />
      Cash flow
    </div>
  </div>
);

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";

    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  const [activeSection, setActiveSection] = useState("home");

  const activeSectionLabel = useMemo(
    () => sections.find((section) => section.id === activeSection)?.label ?? "Dashboard",
    [activeSection]
  );

  const themeLabel = useMemo(
    () => (theme === "light" ? "Switch to dark mode" : "Switch to light mode"),
    [theme]
  );

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const nodes = sections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean);

    if (!nodes.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (visibleEntry?.target?.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-20% 0px -35% 0px",
        threshold: [0.2, 0.45, 0.65],
      }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.page} data-theme={theme}>
      <a className={styles.skipLink} href="#home">
        Skip to dashboard
      </a>
      <div className={styles.blobOne} />
      <div className={styles.blobTwo} />
      <div className={styles.gridGlow} />

      <header className={styles.topbar}>
        <a className={styles.brand} href="#home">
          <span className={styles.brandMark}>
            <Sparkles size={18} />
          </span>
          <span>
            Sakshi
            <small>Personal Finance Dashboard</small>
          </span>
        </a>

        <nav className={styles.nav}>
          {sections.map((section) => (
            <NavLink
              key={section.id}
              href={`#${section.id}`}
              label={section.label}
              active={activeSection === section.id}
            />
          ))}
        </nav>

        <div className={styles.topbarActions}>
          <div className={styles.activeSectionPill}>
            <span>Live Section</span>
            <strong>{activeSectionLabel}</strong>
          </div>
          <button
            type="button"
            className={styles.themeToggle}
            aria-label={themeLabel}
            onClick={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
          >
            {theme === "light" ? <Moon size={18} /> : <SunMedium size={18} />}
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <section className={`${styles.section} ${styles.heroSection}`} id="home">
          <div className={styles.heroContent}>
            <SectionLabel>Welcome to Your Personal Finance Dashboard</SectionLabel>
            <div className={styles.heroTitleFrame}>
              <h1 className={styles.heroTitle}>
                {heroTitleLines.map((line, index) => (
                  <span
                    key={line}
                    className={styles.heroTitleLine}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {line}
                  </span>
                ))}
              </h1>
            </div>
            <p className={styles.heroText}>
              Stay on top of your balance, analyze your spending habits, manage
              budgets, and keep your financial goals moving forward with clear
              visual insights.
            </p>

            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#features">
                Explore Dashboard
                <ArrowRight size={18} />
              </a>
              <a className={styles.secondaryButton} href="#gallery">
                View Insights
              </a>
            </div>

            <div className={styles.statGrid}>
              {statCards.map((card) => (
                <StatCard key={card.label} {...card} />
              ))}
            </div>
          </div>

          <div className={styles.heroVisualWrap}>
            <Reveal className={styles.heroSideCard}>
              <div className={styles.sideCardHeader}>
                <div>
                  <p>Financial Snapshot</p>
                  <strong>Quick Stats</strong>
                </div>
                <div className={styles.sideCardControls}>
                  <button type="button" className={styles.controlChip}>
                    <Filter size={14} />
                    Filter
                  </button>
                  <button type="button" className={styles.controlChip}>
                    <CalendarRange size={14} />
                    Monthly
                  </button>
                </div>
              </div>

              <div className={styles.quickStatsGrid}>
                {quickStats.map((item) => (
                  <QuickStatItem key={item.label} {...item} />
                ))}
              </div>

              <div className={styles.sideCardActions}>
                <button type="button" className={styles.actionGhost}>
                  Add Expense
                </button>
                <button type="button" className={styles.actionPrimary}>
                  Add Income
                </button>
              </div>
            </Reveal>

            <div className={styles.heroVisualCard}>
              <HeroGrowthGraphic />
              <div className={styles.overlayPanel}>
                <span>Personal finance overview</span>
                <strong>Income, budgets, and spending insights</strong>
              </div>
            </div>
            <div className={styles.floatingBadge}>
              <BarChart3 size={18} />
              Smart budgeting insights
            </div>

            <Reveal className={styles.heroSideCard}>
              <div className={styles.sideCardHeader}>
                <div>
                  <p>Activity Feed</p>
                  <strong>Recent Transactions</strong>
                </div>
              </div>

              <div className={styles.transactionsList}>
                {recentTransactions.map((transaction) => (
                  <TransactionRow key={`${transaction.name}-${transaction.date}`} {...transaction} />
                ))}
              </div>
            </Reveal>
          </div>

          <a className={styles.scrollCue} href="#features">
            Scroll
            <ChevronDown size={18} />
          </a>
        </section>

        <section className={`${styles.section} ${styles.featureSection}`} id="features">
          <div className={styles.sectionIntro}>
            <SectionLabel>Budget tracking</SectionLabel>
            <h2>Track your income, expenses, and balance with clarity.</h2>
            <p>
              Follow spending patterns, manage monthly budgets, and review the
              numbers that matter most for your everyday financial planning.
            </p>
          </div>

          <div className={styles.featureGrid}>
            {featureCards.map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.gallerySection}`} id="gallery">
          <div className={styles.sectionIntro}>
            <SectionLabel>Financial reports</SectionLabel>
            <h2>Analyze your spending habits and financial trends.</h2>
            <p>
              Use reports to understand expenses, compare budgets, and make
              better decisions for savings, goals, and long-term stability.
            </p>
          </div>

          <div className={styles.galleryGrid}>
            {galleryCards.map((card, index) => (
              <GalleryCard key={card.title} index={index} {...card} />
            ))}
          </div>

          <div className={styles.galleryLowerGrid}>
            <div className={styles.testimonialRow}>
              {testimonials.map((item) => (
                <article key={item.name} className={styles.testimonialCard}>
                  <p>{item.quote}</p>
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.role}</span>
                  </div>
                </article>
              ))}
            </div>

            <Reveal className={styles.budgetProgressCard}>
              <div className={styles.sideCardHeader}>
                <div>
                  <p>Spending Breakdown</p>
                  <strong>Budget Progress</strong>
                </div>
                <button type="button" className={styles.controlChip}>
                  Weekly
                </button>
              </div>

              <div className={styles.budgetList}>
                {budgetItems.map((item) => (
                  <BudgetItem key={item.label} {...item} />
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className={`${styles.section} ${styles.contactSection}`} id="contact">
          <div className={styles.contactCard}>
            <SectionLabel>Financial goals</SectionLabel>
            <h2>Set and track your financial goals with confidence.</h2>
            <p>
              Keep your savings goals visible, review progress often, and build
              better habits with a modern dashboard experience that stays easy
              to use.
            </p>

            <div className={styles.contactActions}>
              <button type="button" className={styles.primaryButton}>
                Check Reports
                <ArrowRight size={18} />
              </button>
              <button type="button" className={styles.ghostButton}>
                View Insights
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
