import styles from './AboutSection.module.css';

const CheckIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 8l4 4 6-7" />
  </svg>
);

const ShieldIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 1.5L2 4v4.5c0 3 2.5 5.5 6 6.5 3.5-1 6-3.5 6-6.5V4L8 1.5z" />
    <path d="M5.5 8l2 2 3.5-4" />
  </svg>
);

const CertIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="8" cy="7" r="4" />
    <path d="M5.5 12.5L8 11l2.5 1.5V15l-2.5-1-2.5 1v-2.5z" />
  </svg>
);

const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 1.5l1.9 3.8 4.2.6-3 2.9.7 4.2L8 11l-3.8 2 .7-4.2-3-2.9 4.2-.6L8 1.5z" />
  </svg>
);

const FEATURES = [
  {
    title: 'Dedicated Account Management',
    desc: 'A named billing specialist who knows your practice inside out — reachable by phone, email, or chat.',
  },
  {
    title: 'Real-Time Reporting & Dashboards',
    desc: 'Live visibility into AR aging, denial rates, payer mix, and collection performance across your organization.',
  },
  {
    title: 'HIPAA-Compliant Infrastructure',
    desc: 'All data is encrypted at rest and in transit. Annual HIPAA training, signed BAAs, and audit-ready documentation.',
  },
  {
    title: 'Multi-Specialty Expertise',
    desc: 'We bill for 40+ specialties — from primary care and cardiology to orthopedics and behavioral health.',
  },
];

export default function AboutSection() {
  return (
    <section id="why-us" className={styles.section} aria-labelledby="about-heading">
      <div className={styles.container}>

        {/* Left */}
        <div className={styles.left}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            About C2S
          </div>
          <h2 id="about-heading" className={styles.title}>
            15+ Years of{' '}
            <span className={styles.titleAccent}>Revenue Cycle Excellence</span>
          </h2>
          <p className={styles.body}>
            Care2Solutions was founded with a single mission: remove the administrative burden
            from healthcare providers so they can focus on what matters most — their patients.
            We combine deep clinical billing expertise with modern technology to deliver
            measurable, consistent results.
          </p>
          <p className={styles.body} style={{ marginTop: '-20px' }}>
            From independent physician practices to large hospital systems, we serve clients
            across 35+ states with a personalized, partnership-first approach.
          </p>

          <div className={styles.badges} aria-label="Certifications">
            <span className={styles.badge}>
              <ShieldIcon className={styles.badgeIcon} />
              HIPAA Compliant
            </span>
            <span className={styles.badge}>
              <CertIcon className={styles.badgeIcon} />
              SOC 2 Type II
            </span>
            <span className={styles.badge}>
              <StarIcon className={styles.badgeIcon} />
              AAPC Certified Coders
            </span>
          </div>
        </div>

        {/* Right */}
        <div className={styles.right} role="list">
          {FEATURES.map((f) => (
            <div key={f.title} className={styles.featureItem} role="listitem">
              <div className={styles.featureCheckWrap} aria-hidden="true">
                <CheckIcon />
              </div>
              <div className={styles.featureText}>
                <div className={styles.featureTitle}>{f.title}</div>
                <div className={styles.featureDesc}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
