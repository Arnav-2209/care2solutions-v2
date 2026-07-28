import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ServicesSection.module.css';

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

const ShieldIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 1.5L2 4v4.5c0 3 2.5 5.5 6 6.5 3.5-1 6-3.5 6-6.5V4L8 1.5z" />
    <path d="M5.5 8l2 2 3.5-4" />
  </svg>
);

const CodeIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 4L1 8l4 4M11 4l4 4-4 4" />
  </svg>
);

const FileTextIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 2h7l4 4v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" />
    <path d="M9 2v4h4M5 8h6M5 11h4" />
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2L7 9M14 2L9 14l-2-5-5-2 12-5z" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="8" cy="8" r="6" />
    <path d="M8 5v3l2 2" />
  </svg>
);

const DollarIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="8" cy="8" r="6" />
    <path d="M8 4v8M6 6h3a1 1 0 0 1 0 2H6.5a1 1 0 0 0 0 2H9" />
  </svg>
);

/* ============================================================
   RCM Storytelling Steps Data
   ============================================================ */

interface StepData {
  id: string;
  stepNum: string;
  title: string;
  description: string;
  benefits: string[];
  dashTitle: string;
  dashIcon: React.ReactNode;
  kpiVal: string;
  kpiLabel: string;
  rows: { label: string; sub: string; tag: string; tagBg: string; tagColor: string }[];
  progressPct: number;
}

const STEPS: StepData[] = [
  {
    id: 'step-01',
    stepNum: 'STEP 01',
    title: 'Eligibility Verification',
    description: 'Verify patient insurance eligibility before treatment to reduce billing issues, prevent coverage claim rejections, and accelerate reimbursements.',
    benefits: [
      'Reduce Claim Rejections',
      'Faster Approvals',
      'Better Patient Experience',
    ],
    dashTitle: 'Insurance Eligibility Engine',
    dashIcon: <ShieldIcon />,
    kpiVal: '99.4%',
    kpiLabel: 'Verified Pre-Care',
    rows: [
      { label: 'Medicare & Commercial Payer Lookup', sub: 'Real-Time 270/271 Query', tag: '✓ Active Coverage', tagBg: 'rgba(16,185,129,0.10)', tagColor: '#059669' },
      { label: 'Copay & Deductible Verification', sub: '$25 Copay · $500 Deductible Met', tag: 'Verified', tagBg: 'rgba(15,76,129,0.10)', tagColor: '#0F4C81' },
      { label: 'Prior Authorization Check', sub: 'Procedure Pre-Approved', tag: 'Approved', tagBg: 'rgba(99,102,241,0.10)', tagColor: '#4F46E5' },
    ],
    progressPct: 100,
  },
  {
    id: 'step-02',
    stepNum: 'STEP 02',
    title: 'Medical Coding',
    description: 'Certified AAPC coders assign precise ICD-10, CPT, and HCPCS codes to maximize clean claim acceptance and minimize audit risk.',
    benefits: [
      'AAPC Certified Coders',
      'Reduced Compliance Audit Risk',
      'Specialty-Specific Coding',
    ],
    dashTitle: 'AAPC Certified Coding Desk',
    dashIcon: <CodeIcon />,
    kpiVal: '99.8%',
    kpiLabel: 'Coding Accuracy',
    rows: [
      { label: 'ICD-10 & CPT Code Scrubbing', sub: 'Automated Rule Engine Matrix', tag: 'Scrubbed Clean', tagBg: 'rgba(16,185,129,0.10)', tagColor: '#059669' },
      { label: 'Modifier Optimization', sub: 'Modifier 25 & 59 Validation', tag: 'Optimized', tagBg: 'rgba(15,76,129,0.10)', tagColor: '#0F4C81' },
      { label: 'Compliance Audit Check', sub: 'Documentation Compliant', tag: 'Audit Passed', tagBg: 'rgba(16,185,129,0.10)', tagColor: '#059669' },
    ],
    progressPct: 100,
  },
  {
    id: 'step-03',
    stepNum: 'STEP 03',
    title: 'Medical Billing',
    description: 'End-to-end charge capture and billing workflows tailored to primary care, surgical centers, and 40+ medical specialties.',
    benefits: [
      'Charge Capture Audit',
      'Multi-Specialty Billing',
      'HIPAA-Compliant Data Pipeline',
    ],
    dashTitle: 'Multi-Specialty Charge Capture',
    dashIcon: <FileTextIcon />,
    kpiVal: '$12.4M',
    kpiLabel: 'Billed Monthly',
    rows: [
      { label: 'Encounter to Claim Batching', sub: '2,480 Encounters Prepared', tag: 'Batch Processed', tagBg: 'rgba(15,76,129,0.10)', tagColor: '#0F4C81' },
      { label: 'Fee Schedule Alignment', sub: 'Optimal Reimbursement Rate', tag: 'Aligned', tagBg: 'rgba(16,185,129,0.10)', tagColor: '#059669' },
      { label: 'Unbilled Encounter Scrub', sub: 'Zero Missing Encounters', tag: '100% Captured', tagBg: 'rgba(99,102,241,0.10)', tagColor: '#4F46E5' },
    ],
    progressPct: 100,
  },
  {
    id: 'step-04',
    stepNum: 'STEP 04',
    title: 'Claims Submission',
    description: 'Electronic claim scrubbing and submission with real-time tracking across 200+ commercial and government payers.',
    benefits: [
      'Electronic Scrubbing',
      '200+ Commercial & Govt Payers',
      'Real-Time Status Tracking',
    ],
    dashTitle: 'EDI 837 Electronic Clearinghouse',
    dashIcon: <SendIcon />,
    kpiVal: '98.2%',
    kpiLabel: 'First-Pass Acceptance',
    rows: [
      { label: 'Direct Clearinghouse Transmission', sub: '200+ Payer Connections', tag: 'Transmitted', tagBg: 'rgba(15,76,129,0.10)', tagColor: '#0F4C81' },
      { label: 'EDI 277 Payer Acknowledgement', sub: 'Claim Accepted by Payer', tag: 'Payer Accepted', tagBg: 'rgba(16,185,129,0.10)', tagColor: '#059669' },
      { label: 'Rejection Queue Scrubber', sub: '0 Unresolved Rejections', tag: 'Queue Clear', tagBg: 'rgba(16,185,129,0.10)', tagColor: '#059669' },
    ],
    progressPct: 100,
  },
  {
    id: 'step-05',
    stepNum: 'STEP 05',
    title: 'Accounts Receivable Follow-up',
    description: 'Proactive denial management and energetic AR follow-up to recover lost revenue and slash average days in AR.',
    benefits: [
      'Dedicated AR Specialists',
      'Appeals & Denial Management',
      'Faster Cash Flow',
    ],
    dashTitle: 'Denial Management & AR Recovery',
    dashIcon: <ClockIcon />,
    kpiVal: '28 Days',
    kpiLabel: 'Avg AR (Industry: 45)',
    rows: [
      { label: 'Appeals & Denial Overturn', sub: 'Medical Necessity Appeal Won', tag: '+$142K Recovered', tagBg: 'rgba(16,185,129,0.10)', tagColor: '#059669' },
      { label: 'AR Aging Matrix Scrub', sub: '85% Paid Under 30 Days', tag: 'Low Aging', tagBg: 'rgba(15,76,129,0.10)', tagColor: '#0F4C81' },
      { label: 'Payer Follow-up Priority', sub: 'High-Value Claims Worked First', tag: 'Priority Active', tagBg: 'rgba(245,158,11,0.10)', tagColor: '#D97706' },
    ],
    progressPct: 100,
  },
  {
    id: 'step-06',
    stepNum: 'STEP 06',
    title: 'Payment Posting',
    description: 'Accurate ERA/EOB payment posting, ledger reconciliation, and automated patient billing statements with 100% precision.',
    benefits: [
      'Automated ERA/EOB Reconciliation',
      'Zero Balance Discrepancies',
      'Comprehensive Revenue Analytics',
    ],
    dashTitle: 'ERA / EOB Payment Reconciliation',
    dashIcon: <DollarIcon />,
    kpiVal: '99.1%',
    kpiLabel: 'Net Collection Rate',
    rows: [
      { label: '835 ERA Auto-Match', sub: 'Electronic Remittance Auto-Posted', tag: 'Auto-Matched', tagBg: 'rgba(16,185,129,0.10)', tagColor: '#059669' },
      { label: 'EFT Deposit Reconciliation', sub: 'Bank Deposit & Ledger Balanced', tag: '100% Balanced', tagBg: 'rgba(15,76,129,0.10)', tagColor: '#0F4C81' },
      { label: 'Patient Statement Dispatch', sub: 'Clear Balance Statements Sent', tag: 'Dispatched', tagBg: 'rgba(99,102,241,0.10)', tagColor: '#4F46E5' },
    ],
    progressPct: 100,
  },
];

/* ============================================================
   ServicesSection Component
   ============================================================ */

export default function ServicesSection() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  // IntersectionObserver to set active step at 55% viewport height
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-80px 0px -45% 0px',
      threshold: 0.55,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = stepRefs.current.findIndex((ref) => ref === entry.target);
          if (index !== -1) {
            setActiveStepIndex(index);
          }
        }
      });
    }, observerOptions);

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const activeStep = STEPS[activeStepIndex];
  const progressHeightPct = ((activeStepIndex + 1) / STEPS.length) * 100;

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className={styles.section} aria-labelledby="services-heading">
      <div className={styles.container}>

        {/* ── Section Header ───────────────────────────────────── */}
        <header className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            Revenue Cycle Lifecycle
          </div>
          <h2 id="services-heading" className={styles.title}>
            Complete Revenue Cycle{' '}
            <span className={styles.titleAccent}>Management</span>
          </h2>
          <p className={styles.subtitle}>
            From patient registration to final reimbursement, Care2Solutions manages every step of
            your healthcare revenue cycle with accuracy, security, and efficiency.
          </p>
        </header>

        {/* ── Sticky Storytelling Layout ───────────────────────── */}
        <div className={styles.storyLayout}>

          {/* ── LEFT: Sticky Panel (Desktop Sticky 42%) ────────── */}
          <div className={styles.leftStickyCol}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.id}
                className={styles.dashCard}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Header */}
                <div className={styles.dashHeader}>
                  <div className={styles.dashHeaderTitle}>
                    <div className={styles.dashHeaderIcon}>
                      {activeStep.dashIcon}
                    </div>
                    {activeStep.dashTitle}
                  </div>
                  <span className={styles.dashStepBadge}>
                    {activeStep.stepNum} OF 06
                  </span>
                </div>

                {/* KPI Card */}
                <div className={styles.kpiCard}>
                  <div>
                    <div className={styles.kpiLabel}>{activeStep.kpiLabel}</div>
                    <div className={styles.kpiVal}>{activeStep.kpiVal}</div>
                  </div>
                  <span className={styles.kpiStatus}>
                    ✓ System Active
                  </span>
                </div>

                {/* Workflow Graphic Body */}
                <div className={styles.graphicBody}>
                  {activeStep.rows.map((r, i) => (
                    <motion.div
                      key={r.label}
                      className={styles.graphicRow}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: 0.08 * i }}
                    >
                      <div>
                        <div className={styles.graphicRowLabel}>{r.label}</div>
                        <div className={styles.graphicRowSub}>{r.sub}</div>
                      </div>
                      <span
                        className={styles.graphicTag}
                        style={{ background: r.tagBg, color: r.tagColor }}
                      >
                        {r.tag}
                      </span>
                    </motion.div>
                  ))}

                  {/* Step Progress Line */}
                  <div style={{ marginTop: '4px' }}>
                    <div className={styles.progressBarTrack}>
                      <motion.div
                        className={styles.progressBarFill}
                        initial={{ width: '0%' }}
                        animate={{ width: `${activeStep.progressPct}%` }}
                        transition={{ duration: 0.6 }}
                      />
                    </div>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── RIGHT: Scroll Column (58%) ──────────────────────── */}
          <div className={styles.rightScrollCol}>

            {/* Vertical Timeline Track */}
            <div className={styles.timelineTrack}>
              <div
                className={styles.timelineProgress}
                style={{ height: `${progressHeightPct}%` }}
              />
            </div>

            {/* 6 Step Blocks */}
            {STEPS.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              return (
                <div
                  key={step.id}
                  ref={(el) => { stepRefs.current[idx] = el; }}
                  className={`${styles.stepBlock} ${isActive ? styles.active : ''}`}
                >
                  {/* Timeline node */}
                  <div className={styles.stepNode} aria-hidden="true" />

                  {/* Step tag */}
                  <div className={styles.stepNumber}>{step.stepNum}</div>

                  {/* Large Heading */}
                  <h3 className={styles.stepTitle}>{step.title}</h3>

                  {/* Short Description */}
                  <p className={styles.stepDesc}>{step.description}</p>

                  {/* Mobile Graphic (visible on mobile only) */}
                  <div className={styles.mobileGraphic}>
                    <div className={styles.kpiCard} style={{ marginBottom: '12px' }}>
                      <div>
                        <div className={styles.kpiLabel}>{step.kpiLabel}</div>
                        <div className={styles.kpiVal}>{step.kpiVal}</div>
                      </div>
                      <span className={styles.kpiStatus}>✓ Active</span>
                    </div>
                  </div>

                  {/* Key Benefits */}
                  <ul className={styles.benefitsList} aria-label={`Key benefits for ${step.title}`}>
                    {step.benefits.map((b) => (
                      <li key={b} className={styles.benefitItem}>
                        <span className={styles.benefitCheck} aria-hidden="true">
                          <CheckIcon />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    className={styles.stepCta}
                    onClick={scrollToContact}
                    aria-label={`Learn more about ${step.title}`}
                  >
                    Learn More <ArrowRightIcon />
                  </button>

                </div>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
}
