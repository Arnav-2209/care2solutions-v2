import { Link } from 'react-router-dom';
import { RESOURCES } from '../data/resources';
import styles from './ResourcesSection.module.css';

const ArrowIcon = () => (
  <svg
    viewBox="0 0 13 13"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M2 6.5h9M7 2.5l4 4-4 4" />
  </svg>
);

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
            Insights for Healthcare Practices
          </h2>
          <p className={styles.subtitle}>
            Practical resources covering revenue cycle management,
            insurance workflows, and practice operations.
          </p>
        </header>

        <div className={styles.grid}>
          {RESOURCES.map((r) => (
            <Link
              key={r.slug}
              to={r.route}
              className={styles.card}
              aria-label={r.title}
            >
              <div className={styles.cardTop}>
                <span className={styles.cardTag} style={r.categoryColor}>
                  {r.category}
                </span>
                <h3 className={styles.cardTitle}>{r.title}</h3>
                <p className={styles.cardDesc}>{r.description}</p>
              </div>
              <div className={styles.cardBottom}>
                <span className={styles.cardReadMore}>
                  {r.cta} <ArrowIcon />
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
