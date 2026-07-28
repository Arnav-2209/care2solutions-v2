import styles from './StatsSection.module.css';

const OrgIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 2L3 6v9l7 3 7-3V6L10 2z" />
    <path d="M10 2v18M3 6l7 4 7-4" />
  </svg>
);

const ClaimIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="10" cy="10" r="8" />
    <path d="M7 10l2 2 4-4" />
  </svg>
);

const RevenueIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="10" cy="10" r="8" />
    <path d="M10 6v8M8 8h3a1.5 1.5 0 0 1 0 3H8.5a1.5 1.5 0 0 0 0 3H12" />
  </svg>
);

const YearsIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="16" height="13" rx="2" />
    <path d="M2 8h16M6 2v4M14 2v4" />
  </svg>
);

const STATS = [
  { icon: <OrgIcon />,     value: '500+',  label: 'Healthcare Organizations Served' },
  { icon: <ClaimIcon />,   value: '98%',   label: 'First-Pass Claim Acceptance Rate' },
  { icon: <RevenueIcon />, value: '$2B+',  label: 'Revenue Processed Annually' },
  { icon: <YearsIcon />,   value: '15+',   label: 'Years of Industry Experience' },
];

export default function StatsSection() {
  return (
    <section id="testimonials" className={styles.section} aria-labelledby="stats-heading">
      <div className={styles.container}>
        <div className={styles.heading}>
          <span className={styles.headingLabel}>By the Numbers</span>
          <h2 id="stats-heading" className={styles.headingTitle}>
            Results That Speak for Themselves
          </h2>
        </div>

        <div className={styles.grid} role="list">
          {STATS.map((stat) => (
            <div key={stat.label} className={styles.statCard} role="listitem">
              <div className={styles.statIcon} aria-hidden="true">
                {stat.icon}
              </div>
              <span className={styles.value}>{stat.value}</span>
              <span className={styles.label}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
