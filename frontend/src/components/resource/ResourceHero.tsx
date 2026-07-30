import { Link } from 'react-router-dom';
import styles from './resource-shared.module.css';

interface ResourceHeroProps {
  category: string;
  title: string;
  intro: string;
}

export default function ResourceHero({ category, title, intro }: ResourceHeroProps) {
  return (
    <div className={styles.hero}>
      <div className={styles.heroInner}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link to="/" className={styles.breadcrumbLink}>Home</Link>
          <span className={styles.breadcrumbSep} aria-hidden="true">/</span>
          <span className={styles.breadcrumbCurrent}>Resources</span>
        </nav>
        <span className={styles.heroBadge}>{category}</span>
        <h1 className={styles.heroTitle}>{title}</h1>
        <p className={styles.heroIntro}>{intro}</p>
      </div>
    </div>
  );
}
