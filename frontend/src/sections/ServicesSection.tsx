import styles from './ServicesSection.module.css';

// ── Icons ─────────────────────────────────────────────────────

const BillingIcon = () => (
  <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="16" height="14" rx="2" />
    <path d="M7 8h8M7 12h5" />
    <path d="M14 15v-3a1 1 0 0 1 1-1h0a1 1 0 0 1 1 1v3" />
  </svg>
);

const TranscriptionIcon = () => (
  <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 3a3 3 0 0 1 3 3v4a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3z" />
    <path d="M5 10a6 6 0 0 0 12 0" />
    <path d="M11 16v3M8 19h6" />
  </svg>
);

const CredentialingIcon = () => (
  <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 2L3 6v5c0 4.4 3.4 8.5 8 9.5C16.6 19.5 20 15.4 20 11V6L11 2z" />
    <path d="M8 11l2 2 4-4" />
  </svg>
);

const RcmIcon = () => (
  <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 17l5-5 4 4 7-9" />
    <circle cx="17" cy="6" r="2" />
  </svg>
);

const DenialIcon = () => (
  <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <path d="M11 7v4l3 3" />
  </svg>
);

const AnalyticsIcon = () => (
  <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="12" width="4" height="7" rx="1" />
    <rect x="9" y="8" width="4" height="11" rx="1" />
    <rect x="15" y="4" width="4" height="15" rx="1" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 6.5h9M7 2.5l4 4-4 4" />
  </svg>
);

// ── Data ──────────────────────────────────────────────────────

const SERVICES = [
  {
    icon: <BillingIcon />,
    title: 'Medical Billing',
    description: 'End-to-end claim submission, follow-up, and payment posting. We minimize denials and accelerate your cash flow with proven workflows.',
    id: 'medical-billing',
  },
  {
    icon: <TranscriptionIcon />,
    title: 'Medical Transcription',
    description: 'Accurate, HIPAA-compliant transcription services with fast turnaround. Audio to structured clinical documentation at scale.',
    id: 'transcription',
  },
  {
    icon: <CredentialingIcon />,
    title: 'Provider Credentialing',
    description: 'Streamlined enrollment and credentialing with Medicare, Medicaid, and 200+ commercial payers. Avoid delays that cost revenue.',
    id: 'credentialing',
  },
  {
    icon: <RcmIcon />,
    title: 'Revenue Cycle Management',
    description: 'Full-spectrum RCM from patient registration to final payment. We optimize every step to maximize your net collection rate.',
    id: 'rcm',
  },
  {
    icon: <DenialIcon />,
    title: 'Denial Management',
    description: 'Proactive denial prevention and expert appeal management. Our team recovers revenue that would otherwise be written off.',
    id: 'denial-management',
  },
  {
    icon: <AnalyticsIcon />,
    title: 'Revenue Analytics',
    description: 'Real-time dashboards and KPI reporting that give leadership clear visibility into financial performance and trends.',
    id: 'analytics',
  },
];

// ── Component ─────────────────────────────────────────────────

export default function ServicesSection() {
  return (
    <section id="services" className={styles.section} aria-labelledby="services-heading">
      <div className={styles.container}>

        <header className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            What We Do
          </div>
          <h2 id="services-heading" className={styles.title}>
            Complete RCM Solutions,{' '}
            <span className={styles.titleAccent}>One Trusted Partner</span>
          </h2>
          <p className={styles.subtitle}>
            From billing to analytics, we handle the full revenue lifecycle — so your staff can
            focus on delivering exceptional patient care.
          </p>
        </header>

        <div className={styles.grid} role="list">
          {SERVICES.map((svc) => (
            <article key={svc.id} className={styles.card} role="listitem">
              <div className={styles.iconWrap} aria-hidden="true">
                {svc.icon}
              </div>
              <h3 className={styles.cardTitle}>{svc.title}</h3>
              <p className={styles.cardDesc}>{svc.description}</p>
              <button className={styles.cardLink} aria-label={`Learn more about ${svc.title}`}>
                Learn more <ArrowIcon />
              </button>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
