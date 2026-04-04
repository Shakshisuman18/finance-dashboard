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
  { id: "home", label: "Home" },
  { id: "features", label: "Features" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
];

const featureCards = [
  {
    title: "Smart Cashflow",
    description: "Track inflows, outflows, and key milestones from one elegant control layer.",
    icon: Wallet,
  },
  {
    title: "Card Insights",
    description: "Highlight payment activity and recurring trends with visual summaries.",
    icon: CreditCard,
  },
  {
    title: "Secure Growth",
    description: "Bring confidence to every decision with protected workflows and clean metrics.",
    icon: ShieldCheck,
  },
];

const statCards = [
  { value: "$48.2k", label: "Managed monthly volume" },
  { value: "12+", label: "Interactive visual modules" },
  { value: "99.9%", label: "Experience uptime target" },
];

const galleryCards = [
  {
    title: "Gradient Panels",
    text: "Soft pastel surfaces with glassmorphism and layered highlights.",
  },
  {
    title: "Motion Details",
    text: "Hover states, smooth scroll, and polished transitions across each section.",
  },
  {
    title: "Adaptive Layout",
    text: "Responsive blocks that breathe properly from mobile through desktop.",
  },
];

const testimonials = [
  {
    name: "Nina Roy",
    role: "Product Lead",
    quote: "The sections feel clear, premium, and surprisingly calm even with a lot of information.",
  },
  {
    name: "Arjun Mehta",
    role: "Startup Founder",
    quote: "Dark mode and mobile responsiveness both feel intentional instead of being afterthoughts.",
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
            <small>Responsive React Experience</small>
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
            <SectionLabel>Full-screen modern finance website</SectionLabel>
            <h1 className={styles.heroTitle}>
              A polished React experience with immersive sections, rich visuals,
              and seamless dark mode.
            </h1>
            <p className={styles.heroText}>
              Built as a responsive single-page site with CSS modules, smooth
              section scrolling, elegant gradients, motion, icons, and reusable
              components ready for a real product or portfolio.
            </p>

            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#features">
                Explore Sections
                <ArrowRight size={18} />
              </a>
              <a className={styles.secondaryButton} href="#gallery">
                View Showcase
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
                <span>Realtime analytics</span>
                <strong>Adaptive interface kit</strong>
              </div>
            </div>
            <div className={styles.floatingBadge}>
              <BarChart3 size={18} />
              Smooth dark/light transition
            </div>
          </div>

          <a className={styles.scrollCue} href="#features">
            Scroll
            <ChevronDown size={18} />
          </a>
        </section>

        <section className={`${styles.section} ${styles.featureSection}`} id="features">
          <div className={styles.sectionIntro}>
            <SectionLabel>Interactive features</SectionLabel>
            <h2>Designed to feel modern, readable, and delightfully responsive.</h2>
            <p>
              Each full-screen panel has its own visual atmosphere, while the
              entire system shares one consistent palette, motion language, and
              spacing rhythm.
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
            <SectionLabel>Visual gallery</SectionLabel>
            <h2>Distinct backgrounds, decorative shapes, and section-specific layouts.</h2>
            <p>
              The cards below act as placeholder visuals that can later be
              replaced with real product assets, mockups, screenshots, or
              photography.
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
            <SectionLabel>Launch-ready section</SectionLabel>
            <h2>Responsive, animated, and ready to drop into your React app.</h2>
            <p>
              This implementation uses functional components, CSS modules,
              Lucide icons, a Google font, adaptive layouts, hover polish, and
              theme-aware styling across the entire page.
            </p>

            <div className={styles.contactActions}>
              <button type="button" className={styles.primaryButton}>
                Get Started
                <ArrowRight size={18} />
              </button>
              <button type="button" className={styles.ghostButton}>
                Download Preview
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
