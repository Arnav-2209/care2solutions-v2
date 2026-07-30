import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styles from './ServicesPage.module.css';

/* ============================================================
   Inline SVG Icons
   ============================================================ */

const CheckIcon = () => (
  <svg viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 5.5l2.5 2.5 5-5" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 7h8M7 3l4 4-4 4" />
  </svg>
);

const DollarIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="8" cy="8" r="6" />
    <path d="M8 4v8M6 6h3a1 1 0 0 1 0 2H6.5a1 1 0 0 0 0 2H9" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 1.5L2 4v4.5c0 3 2.5 5.5 6 6.5 3.5-1 6-3.5 6-6.5V4L8 1.5z" />
    <path d="M5.5 8l2 2 4-4" />
  </svg>
);

const UserCheckIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 14c0-2.5 2.5-4 6-4s6 1.5 6 4" />
  </svg>
);

const FileCheckIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 2h7l4 4v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" />
    <path d="M5 8l2 2 4-4" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="7" cy="7" r="4" />
    <path d="M10 10l4.5 4.5" />
  </svg>
);

const RefreshIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1 2v4h4M15 14v-4h-4" />
    <path d="M3.51 9a6 6 0 0 1 9.92-3.36L15 6M1 10l1.57 1.36A6 6 0 0 0 12.49 7" />
  </svg>
);

/* ============================================================
   Core Service Showcase Data
   ============================================================ */

interface ShowcaseService {
  id: string;
  tabLabel: string;
  tabIcon: React.ReactNode;
  serviceCode: string;
  title: string;
  description: string;
  chips: string[];
  graphicTitle: string;
  graphicBadge: string;
  kpiLabel: string;
  kpiValue: string;
  rows: { label: string; sub: string; tag: string; tagBg: string; tagColor: string }[];
}

const CORE_SERVICES: ShowcaseService[] = [
  {
    id: 'rcm',
    tabLabel: 'Revenue Cycle Management',
    tabIcon: <DollarIcon />,
    serviceCode: 'CORE SOLUTION 01',
    title: 'Revenue Cycle Management',
    description: 'Optimize your healthcare revenue workflow with complete billing and financial management solutions. Our certified team manages encounter capture, code scrubbing, claim submission, and payment posting with 99.8% precision.',
    chips: [
      'Patient Registration',
      'Insurance Verification',
      'Medical Coding',
      'Claims Management',
      'Denial Management',
      'Payment Posting',
    ],
    graphicTitle: 'End-to-End RCM Dashboard',
    graphicBadge: '● Live Processing',
    kpiLabel: 'Monthly Revenue Processed',
    kpiValue: '$12.4M',
    rows: [
      { label: 'Patient Registration', sub: 'Real-Time 270/271 Lookup', tag: '✓ Verified', tagBg: 'rgba(16,185,129,0.10)', tagColor: '#059669' },
      { label: 'AAPC Medical Coding', sub: 'ICD-10 / CPT Rule Engine', tag: '99.8% Clean', tagBg: 'rgba(15,76,129,0.10)', tagColor: '#0F4C81' },
      { label: 'EDI Claims Transmission', sub: '200+ Payer Connections', tag: '98.2% 1st Pass', tagBg: 'rgba(16,185,129,0.10)', tagColor: '#059669' },
      { label: 'Payment Reconciliation', sub: '835 ERA Auto-Match', tag: 'Auto-Posted', tagBg: 'rgba(99,102,241,0.10)', tagColor: '#4F46E5' },
    ],
  },
  {
    id: 'credentialing',
    tabLabel: 'Healthcare Credentialing',
    tabIcon: <ShieldCheckIcon />,
    serviceCode: 'CORE SOLUTION 02',
    title: 'Healthcare Credentialing',
    description: 'Simplify provider enrollment and compliance processes with accurate credentialing support. We manage enrollment across Medicare, Medicaid, and 200+ commercial payer networks to eliminate revenue delays.',
    chips: [
      'Provider Enrollment',
      'Insurance Network Management',
      'Documentation Review',
      'Compliance Monitoring',
    ],
    graphicTitle: 'Payer Enrollment Engine',
    graphicBadge: '✓ Verified Active',
    kpiLabel: 'Commercial & Govt Payers',
    kpiValue: '200+ Active',
    rows: [
      { label: 'CAQH Provider Verification', sub: 'NPI & License Audited', tag: '✓ CAQH Verified', tagBg: 'rgba(16,185,129,0.10)', tagColor: '#059669' },
      { label: 'Commercial Network Contracting', sub: 'In-Network Approval Status', tag: 'Approved', tagBg: 'rgba(15,76,129,0.10)', tagColor: '#0F4C81' },
      { label: 'Documentation & Compliance', sub: 'SOC 2 & HIPAA Certified', tag: 'Audit Passed', tagBg: 'rgba(16,185,129,0.10)', tagColor: '#059669' },
      { label: 'Re-credentialing Monitor', sub: 'Automated Renewal Tracking', tag: 'Auto-Renew', tagBg: 'rgba(99,102,241,0.10)', tagColor: '#4F46E5' },
    ],
  },
  {
    id: 'virtual-assistance',
    tabLabel: 'Healthcare Virtual Assistance',
    tabIcon: <UserCheckIcon />,
    serviceCode: 'CORE SOLUTION 03',
    title: 'Healthcare Virtual Assistance',
    description: 'Reduce administrative workload with dedicated operational support for healthcare organizations, medical groups, and clinics. Our HIPAA-trained Virtual Assistants manage scheduling, data entry, and patient communication.',
    chips: [
      'Administrative Support',
      'Appointment Scheduling',
      'Patient Communication',
      'Data Management',
    ],
    graphicTitle: 'Clinical Operations Desk',
    graphicBadge: '● Dedicated Team',
    kpiLabel: 'Admin Workload Saved',
    kpiValue: '80% Savings',
    rows: [
      { label: 'Administrative Support Desk', sub: 'Dedicated Medical Specialist', tag: 'Active Support', tagBg: 'rgba(15,76,129,0.10)', tagColor: '#0F4C81' },
      { label: 'EHR Appointment Scheduling', sub: '24/7 Patient Queue Desk', tag: 'Queue Active', tagBg: 'rgba(16,185,129,0.10)', tagColor: '#059669' },
      { label: 'Clinical Data Management', sub: 'Chart & EHR Data Processing', tag: 'HIPAA Secured', tagBg: 'rgba(16,185,129,0.10)', tagColor: '#059669' },
      { label: 'Patient Outreach & Reminders', sub: 'Multi-Channel Engagement', tag: 'Dispatched', tagBg: 'rgba(99,102,241,0.10)', tagColor: '#4F46E5' },
    ],
  },
];

/* ============================================================
   Additional Support Services Data
   ============================================================ */

const ADDITIONAL_SERVICES = [
  {
    title: 'Medical Billing Support',
    icon: <FileCheckIcon />,
    bullets: [
      'Accurate billing assistance',
      'Faster processing turnaround',
      'Reduced coding & claim errors',
    ],
  },
  {
    title: 'Insurance Verification',
    icon: <SearchIcon />,
    bullets: [
      'Patient eligibility checks',
      'Benefits verification pre-care',
      'Reduced claim rejection issues',
    ],
  },
  {
    title: 'AR Follow-up & Recovery',
    icon: <RefreshIcon />,
    bullets: [
      'Outstanding payment tracking',
      'Improved revenue recovery',
      'Better cash flow management',
    ],
  },
  {
    title: 'Compliance & Documentation Support',
    icon: <ShieldCheckIcon />,
    bullets: [
      'Organized clinical documentation',
      'Regulatory support (HIPAA & SOC 2)',
      'Reduced operational risks',
    ],
  },
];

/* ============================================================
   ServicesPage Component
   ============================================================ */

export default function ServicesPage() {
  const [activeTabId, setActiveTabId] = useState<string>('rcm');
  const navigate = useNavigate();

  // Scroll to top on page mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const activeService = CORE_SERVICES.find((s) => s.id === activeTabId) || CORE_SERVICES[0];

  const handleContactClick = () => {
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 120);
  };

  return (
    <div className={styles.page}>

      {/* ── Top Header Banner ─────────────────────────────────── */}
      <section className={styles.heroBanner} aria-label="Services header">
        <div className={styles.heroInner}>
          <motion.div
            className={styles.badge}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.badgeDot} aria-hidden="true" />
            Healthcare Business Solutions
          </motion.div>
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Complete Healthcare{' '}
            <span className={styles.titleAccent}>Business Solutions</span>
          </motion.h1>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            Integrated healthcare solutions designed to streamline operations, improve efficiency,
            and optimize revenue for healthcare organizations.
          </motion.p>
        </div>
      </section>

      {/* ── SECTION 1: Horizontal Tab Showcase (Product Showcase Layout) ─ */}
      <section className={styles.sectionShowcase} aria-label="Core solutions showcase">
        <div className={styles.container}>

          {/* 3 Horizontal Service Tabs */}
          <div className={styles.tabsContainer} role="tablist" aria-label="Core Healthcare Solutions Tabs">
            {CORE_SERVICES.map((service) => {
              const isActive = service.id === activeTabId;
              return (
                <button
                  key={service.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${service.id}`}
                  className={`${styles.tabPill} ${isActive ? styles.tabActive : ''}`}
                  onClick={() => setActiveTabId(service.id)}
                >
                  <span className={styles.tabIcon}>{service.tabIcon}</span>
                  <span>{service.tabLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Balanced 50/50 Content Showcase Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.id}
              id={`panel-${activeService.id}`}
              role="tabpanel"
              className={styles.showcasePanel}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >

              {/* LEFT SIDE (50%): Vector SVG Graphic / Dashboard Illustration */}
              <motion.div
                className={styles.leftIllustration}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.05 }}
              >
                <div className={styles.graphicCard}>
                  <div className={styles.graphicHeader}>
                    <div className={styles.graphicTitle}>
                      <span className={styles.tabIcon} style={{ color: 'var(--color-primary)' }}>
                        {activeService.tabIcon}
                      </span>
                      {activeService.graphicTitle}
                    </div>
                    <span className={styles.graphicBadge}>{activeService.graphicBadge}</span>
                  </div>

                  <div className={styles.graphicKpi}>
                    <div>
                      <div className={styles.graphicKpiLabel}>{activeService.kpiLabel}</div>
                      <div className={styles.graphicKpiVal}>{activeService.kpiValue}</div>
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#059669', background: 'rgba(16,185,129,0.10)', padding: '4px 10px', borderRadius: '100px' }}>
                      ● Active Pipeline
                    </span>
                  </div>

                  <div className={styles.graphicRows}>
                    {activeService.rows.map((row, i) => (
                      <motion.div
                        key={row.label}
                        className={styles.graphicRow}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25, delay: 0.05 * i + 0.1 }}
                      >
                        <div>
                          <div className={styles.graphicRowLabel}>{row.label}</div>
                          <div className={styles.graphicRowSub}>{row.sub}</div>
                        </div>
                        <span
                          className={styles.graphicTag}
                          style={{ background: row.tagBg, color: row.tagColor }}
                        >
                          {row.tag}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* RIGHT SIDE (50%): Text Content & Feature Chips */}
              <motion.div
                className={styles.rightContent}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.05 }}
              >
                <span className={styles.serviceCode}>{activeService.serviceCode}</span>
                <h2 className={styles.serviceHeading}>{activeService.title}</h2>
                <p className={styles.serviceDesc}>{activeService.description}</p>

                {/* Feature Chips */}
                <div className={styles.chipsWrap} aria-label={`Key features of ${activeService.title}`}>
                  {activeService.chips.map((chip, idx) => (
                    <motion.div
                      key={chip}
                      className={styles.chipItem}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: 0.04 * idx + 0.1 }}
                    >
                      <span className={styles.chipDot} aria-hidden="true" />
                      {chip}
                    </motion.div>
                  ))}
                </div>

                <button className={styles.ctaBtn} onClick={handleContactClick}>
                  Request Consultation <ArrowRightIcon />
                </button>
              </motion.div>

            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* ── SECTION 2: Additional Healthcare Support Services ───── */}
      <section className={styles.sectionAdditional} aria-label="Additional support services">
        <div className={styles.container}>
          <div className={styles.additionalHeader}>
            <div className={styles.additionalEyebrow}>Operational Excellence</div>
            <h2 className={styles.additionalTitle}>Additional Healthcare Support</h2>
            <p className={styles.additionalSubtitle}>
              Flexible solutions that support your healthcare operations beyond core workflows.
            </p>
          </div>

          <div className={styles.cardsGrid}>
            {ADDITIONAL_SERVICES.map((card, i) => (
              <motion.div
                key={card.title}
                className={styles.supportCard}
                initial={{ opacity: 0, y: 44, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={styles.supportCardHeader}>
                  <div className={styles.supportIconWrap}>
                    {card.icon}
                  </div>
                  <h3 className={styles.supportCardTitle}>{card.title}</h3>
                </div>

                <ul className={styles.supportBulletList}>
                  {card.bullets.map((b) => (
                    <li key={b} className={styles.supportBulletItem}>
                      <span className={styles.bulletCheck} aria-hidden="true">
                        <CheckIcon />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Bottom Banner */}
          <div className={styles.bottomCtaBanner}>
            <div className={styles.bottomCtaText}>
              <h3 className={styles.bottomCtaTitle}>Ready to Optimize Your Healthcare Operations?</h3>
              <p className={styles.bottomCtaSub}>
                Schedule a free consultation with our healthcare revenue cycle specialists today.
              </p>
            </div>
            <button className={styles.bottomBtn} onClick={handleContactClick}>
              Get Started Now <ArrowRightIcon />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
