import { useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  ChevronDown,
  CreditCard,
  Moon,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Wallet,
} from "lucide-react";
import heroImage from "./assets/hero.png";
import styles from "./App.module.css";

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
  { value: "$48.2k", label: "Monthly income and expense flow" },
  { value: "12+", label: "Budget and report widgets" },
  { value: "99.9%", label: "Clear view of your financial health" },
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

const NavLink = ({ href, label }) => (
  <a className={styles.navLink} href={href}>
    {label}
  </a>
);

const SectionLabel = ({ children }) => (
  <p className={styles.sectionLabel}>{children}</p>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
  <article className={styles.featureCard}>
    <div className={styles.iconWrap}>
      <Icon size={20} />
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
  </article>
);

const StatCard = ({ value, label }) => (
  <div className={styles.statCard}>
    <strong>{value}</strong>
    <span>{label}</span>
  </div>
);

const GalleryCard = ({ title, text, index }) => (
  <article className={styles.galleryCard}>
    <div className={styles.galleryVisual} data-variant={index}>
      <span className={styles.galleryBadge}>Preview {index + 1}</span>
    </div>
    <h3>{title}</h3>
    <p>{text}</p>
  </article>
);

function App() {
  const [theme, setTheme] = useState("light");

  const themeLabel = useMemo(
    () => (theme === "light" ? "Switch to dark mode" : "Switch to light mode"),
    [theme]
  );

  return (
    <div className={styles.page} data-theme={theme}>
      <div className={styles.blobOne} />
      <div className={styles.blobTwo} />
      <div className={styles.gridGlow} />

      <header className={styles.topbar}>
        <a className={styles.brand} href="#home">
          <span className={styles.brandMark}>
            <Sparkles size={18} />
          </span>
          <span>
            FinAura
            <small>Personal Finance Dashboard</small>
          </span>
        </a>

        <nav className={styles.nav}>
          {sections.map((section) => (
            <NavLink key={section.id} href={`#${section.id}`} label={section.label} />
          ))}
        </nav>

        <button
          type="button"
          className={styles.themeToggle}
          aria-label={themeLabel}
          onClick={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
        >
          {theme === "light" ? <Moon size={18} /> : <SunMedium size={18} />}
        </button>
      </header>

      <main className={styles.main}>
        <section className={`${styles.section} ${styles.heroSection}`} id="home">
          <div className={styles.heroContent}>
            <SectionLabel>Welcome to Your Personal Finance Dashboard</SectionLabel>
            <h1 className={styles.heroTitle}>
              Personal Finance Dashboard for tracking income, expenses, and
              smarter money decisions.
            </h1>
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
                <StatCard key={card.label} value={card.value} label={card.label} />
              ))}
            </div>
          </div>

          <div className={styles.heroVisualWrap}>
            <div className={styles.heroVisualCard}>
              <img className={styles.heroImage} src={heroImage} alt="Finance dashboard preview" />
              <div className={styles.overlayPanel}>
                <span>Personal finance overview</span>
                <strong>Income, budgets, and spending insights</strong>
              </div>
            </div>
            <div className={styles.floatingBadge}>
              <BarChart3 size={18} />
              Smart budgeting insights
            </div>
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
