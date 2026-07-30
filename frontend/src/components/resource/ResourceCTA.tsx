import { Link } from 'react-router-dom';
import styles from './resource-shared.module.css';

interface CTAButton {
  label: string;
  href: string;
  variant: 'primary' | 'secondary';
}

interface ResourceCTAProps {
  title: string;
  text: string;
  buttons: CTAButton[];
}

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 7h8M7 3l4 4-4 4" />
  </svg>
);

export default function ResourceCTA({ title, text, buttons }: ResourceCTAProps) {
  return (
    <div className={styles.ctaBlock}>
      <h2 className={styles.ctaTitle}>{title}</h2>
      <p className={styles.ctaText}>{text}</p>
      <div className={styles.ctaButtons}>
        {buttons.map((btn) => (
          <Link
            key={btn.label}
            to={btn.href}
            className={btn.variant === 'primary' ? styles.ctaBtnPrimary : styles.ctaBtnSecondary}
          >
            {btn.label} <ArrowRight />
          </Link>
        ))}
      </div>
    </div>
  );
}
