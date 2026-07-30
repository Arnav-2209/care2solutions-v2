import { Link } from 'react-router-dom';
import { RESOURCES } from '../../data/resources';
import styles from './resource-shared.module.css';

interface RelatedResourcesProps {
  currentSlug: string;
}

const ArrowRight = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 6.5h9M7 2.5l4 4-4 4" />
  </svg>
);

export default function RelatedResources({ currentSlug }: RelatedResourcesProps) {
  const related = RESOURCES.filter((r) => r.slug !== currentSlug);

  return (
    <section className={styles.relatedSection} aria-labelledby="related-resources-heading">
      <div className={styles.relatedInner}>
        <h2 id="related-resources-heading" className={styles.relatedHeading}>
          Related Resources
        </h2>
        <div className={styles.relatedGrid}>
          {related.map((r) => (
            <Link key={r.slug} to={r.route} className={styles.relatedCard} aria-label={r.title}>
              <div className={styles.relatedCardTop}>
                <span className={styles.relatedTag} style={r.categoryColor}>
                  {r.category}
                </span>
                <p className={styles.relatedTitle}>{r.title}</p>
              </div>
              <div className={styles.relatedCardBottom}>
                <span className={styles.relatedCTA}>
                  {r.cta} <ArrowRight />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
