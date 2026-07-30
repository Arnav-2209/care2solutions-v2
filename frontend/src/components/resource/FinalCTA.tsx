import { Link } from 'react-router-dom';
import styles from './resource-shared.module.css';

interface FinalCTAProps {
  contactRoute?: string;
}

export default function FinalCTA({ contactRoute = '/#contact' }: FinalCTAProps) {
  return (
    <div className={styles.finalCTA}>
      <h2 className={styles.finalCTATitle}>Let's Talk About Your Practice</h2>
      <p className={styles.finalCTAText}>
        Every healthcare organization has different operational needs.
        Talk with the Care2Solutions team about the services relevant to your practice.
      </p>
      <Link to={contactRoute} className={styles.finalCTABtn}>
        Contact Our Team
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 7h8M7 3l4 4-4 4" />
        </svg>
      </Link>
    </div>
  );
}
