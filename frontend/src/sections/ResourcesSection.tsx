import styles from './ResourcesSection.module.css';

const ArrowIcon = () => (
  <svg viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 6.5h9M7 2.5l4 4-4 4" />
  </svg>
);

const RESOURCES = [
  {
    tag: 'Guide',
    tagColor: { background: 'rgba(15, 76, 129, 0.08)', color: '#0F4C81' },
    title: '2025 RCM Best Practices: Maximizing First-Pass Claim Rates',
    desc: 'A practical playbook covering payer-specific coding tips, prior authorization workflows, and technology levers that reduce denials before submission.',
    readTime: '8 min read',
    date: 'July 2025',
  },
  {
    tag: 'Checklist',
    tagColor: { background: 'rgba(16, 185, 129, 0.08)', color: '#059669' },
    title: 'Denial Management Checklist: 12 Steps to Recover Lost Revenue',
    desc: 'Step-by-step denial prevention and appeals framework used by top-performing practices. Covers root-cause analysis, payer trends, and escalation paths.',
    readTime: '5 min read',
    date: 'June 2025',
  },
  {
    tag: 'Whitepaper',
    tagColor: { background: 'rgba(124, 58, 237, 0.07)', color: '#7C3AED' },
    title: 'HIPAA Billing Compliance in 2025: What Every Practice Must Know',
    desc: 'Updated for 2025 regulations — covers PHI handling in billing workflows, BAA requirements, breach response protocols, and audit preparation.',
    readTime: '12 min read',
    date: 'May 2025',
  },
];

export default function ResourcesSection() {
  return (
    <section id="resources" className={styles.section} aria-labelledby="resources-heading">
      <div className={styles.container}>

        <header className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            Resources
          </div>
          <h2 id="resources-heading" className={styles.title}>
            Insights for Healthcare Leaders
          </h2>
          <p className={styles.subtitle}>
            Practical guides, checklists, and whitepapers from our revenue cycle experts.
          </p>
        </header>

        <div className={styles.grid}>
          {RESOURCES.map((r) => (
            <article key={r.title} className={styles.card} tabIndex={0} role="button" aria-label={`Read: ${r.title}`}>
              <div className={styles.cardTop}>
                <span className={styles.cardTag} style={r.tagColor}>
                  {r.tag}
                </span>
                <h3 className={styles.cardTitle}>{r.title}</h3>
                <p className={styles.cardDesc}>{r.desc}</p>
              </div>
              <div className={styles.cardBottom}>
                <span className={styles.cardMeta}>{r.date} · {r.readTime}</span>
                <span className={styles.cardReadMore}>
                  Read <ArrowIcon />
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
