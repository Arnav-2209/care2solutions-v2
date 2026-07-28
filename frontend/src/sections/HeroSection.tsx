import styles from './HeroSection.module.css';

const CalendarIcon = () => (
  <svg className={styles.ctaIcon} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="3" width="12" height="11" rx="2" />
    <path d="M2 7h12M5 1v4M11 1v4" />
  </svg>
);

const ChartIcon = () => (
  <svg className={styles.ctaIcon} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 12l4-4 3 3 5-6" />
    <path d="M14 4h-4M14 4v4" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 7h8M7 3l4 4-4 4" />
  </svg>
);

interface HeroSectionProps {
  onBookConsultation: () => void;
  onGetFreeAudit: () => void;
}

export default function HeroSection({ onBookConsultation, onGetFreeAudit }: HeroSectionProps) {
  return (
    <section id="home" className={styles.section} aria-label="Hero">
      <div className={styles.inner}>

        {/* Trust badge */}
        <div className={styles.badge}>
          <span className={styles.badgeDot} aria-hidden="true" />
          Trusted by 500+ Healthcare Organizations
        </div>

        {/* Headline */}
        <h1 className={styles.headline}>
          Intelligent Revenue Cycle
          <span className={styles.headlineAccent}>Management for Modern Healthcare</span>
        </h1>

        {/* Subtext */}
        <p className={styles.subtext}>
          Care2Solutions automates medical billing, eliminates claim denials, and
          maximizes reimbursements — so your team can focus entirely on patient care.
        </p>

        {/* CTAs */}
        <div className={styles.ctaRow}>
          <button
            className={styles.ctaPrimary}
            onClick={onBookConsultation}
            id="hero-cta-book-consultation"
          >
            <CalendarIcon />
            Book Consultation
          </button>
          <button
            className={styles.ctaSecondary}
            onClick={onGetFreeAudit}
            id="hero-cta-free-audit"
          >
            <ChartIcon />
            Get Free Audit
          </button>
        </div>

        {/* Stats row */}
        <div className={styles.statsRow} role="list" aria-label="Key metrics">
          {[
            { value: '500+',  label: 'Healthcare Organizations' },
            { value: '98%',   label: 'Claim Acceptance Rate' },
            { value: '$2B+',  label: 'Revenue Processed' },
            { value: '15+',   label: 'Years of Expertise' },
          ].map((stat) => (
            <div key={stat.label} className={styles.statItem} role="listitem">
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Scroll cue */}
        <div className={styles.scrollCue} aria-hidden="true">
          <ArrowIcon />
          Explore
        </div>
      </div>
    </section>
  );
}
