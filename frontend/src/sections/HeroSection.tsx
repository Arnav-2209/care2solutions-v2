import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useScroll } from 'framer-motion';
import styles from './HeroSection.module.css';

/* ============================================================
   Inline SVG Icons
   ============================================================ */

const HeartPulseIcon = () => (
  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1 5h2l1.5-3L6 9l1.5-4.5L9 7h2" />
  </svg>
);

const QuoteIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 14H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2l2-2v12zM14 14h-4V6h2l2-2v10z" />
  </svg>
);

const ServicesIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="5" height="5" rx="1" />
    <rect x="9" y="2" width="5" height="5" rx="1" />
    <rect x="2" y="9" width="5" height="5" rx="1" />
    <rect x="9" y="9" width="5" height="5" rx="1" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 5.5l2.5 2.5 5-5" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 1.5L2 4v4.5c0 3 2.5 5.5 6 6.5 3.5-1 6-3.5 6-6.5V4L8 1.5z" />
    <path d="M5.5 8l2 2 3.5-4" />
  </svg>
);

const TrendUpIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 12l4-5 3 3 5-7" />
    <path d="M11 3h3v3" />
  </svg>
);

/* ============================================================
   Animated Number Counter Component (0 -> Target, 2s Ease Out)
   ============================================================ */

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  isComma?: boolean;
}

function AnimatedCounter({
  target,
  duration = 2,
  delay = 0,
  prefix = '',
  suffix = '',
  decimals = 0,
  isComma = false,
}: AnimatedCounterProps) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let startTimestamp: number | null = null;
    let timerId: ReturnType<typeof setTimeout>;

    timerId = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        // Ease out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setValue(easeOut * target);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        }
      };

      animationFrameId = requestAnimationFrame(step);
    }, delay * 1000);

    return () => {
      clearTimeout(timerId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [target, duration, delay]);

  const formatted = isComma
    ? Math.round(value).toLocaleString()
    : value.toFixed(decimals);

  return <>{prefix}{formatted}{suffix}</>;
}

/* ============================================================
   Data & Constants
   ============================================================ */

const BAR_HEIGHTS = [38, 52, 44, 65, 58, 72, 60];
const BAR_MONTHS  = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'];

const CLAIMS = [
  { initials: 'MC', name: 'Memorial Clinic',      sub: 'Cardiology · Claim #4821',  amount: '$4,280', status: 'Approved',  statusColor: { background: 'rgba(16,185,129,0.10)', color: '#059669' }, avatarBg: '#0F4C81' },
  { initials: 'RH', name: 'Riverside Hospital',   sub: 'Orthopedics · Claim #4820', amount: '$11,650', status: 'Processing', statusColor: { background: 'rgba(245,158,11,0.10)', color: '#D97706' }, avatarBg: '#2D9CDB' },
  { initials: 'SP', name: 'Summit Physicians',    sub: 'Internal Med · Claim #4819', amount: '$2,190', status: 'Verified',  statusColor: { background: 'rgba(99,102,241,0.10)', color: '#4F46E5' }, avatarBg: '#7C3AED' },
];

const TRUST_ITEMS = [
  'HIPAA Compliant & SOC 2 Certified',
  'Faster Reimbursements, Less Denials',
  'Dedicated Billing Experts',
];

const AVATAR_COLORS = ['#0F4C81', '#2D9CDB', '#059669', '#7C3AED'];

/* ============================================================
   Dashboard Illustration Component
   ============================================================ */

const DashboardIllustration = () => {
  return (
    <div className={styles.dashCard} role="img" aria-label="Healthcare billing analytics dashboard">
      {/* Header bar */}
      <div className={styles.dashHeader}>
        <div className={styles.dashHeaderLeft}>
          <div className={styles.dashDots}>
            <span className={styles.dashDot} style={{ background: '#FF5F57' }} />
            <span className={styles.dashDot} style={{ background: '#FEBC2E' }} />
            <span className={styles.dashDot} style={{ background: '#28C840' }} />
          </div>
          <span className={styles.dashTitle}>C2S Revenue Dashboard</span>
        </div>
        <div className={styles.dashHeaderRight}>
          <span className={styles.dashBadge} style={{ background: 'rgba(16,185,129,0.10)', color: '#059669' }}>
            ● Live
          </span>
          <span className={styles.dashBadge} style={{ background: '#f1f5f9', color: '#64748b' }}>
            Q1 2025
          </span>
        </div>
      </div>

      {/* Body */}
      <div className={styles.dashBody}>

        {/* ── KPI Row (Staggered Widget 1, 2, 3: 1.10s, 1.20s, 1.30s) ── */}
        <div className={styles.kpiRow}>
          {/* Revenue KPI (1.10s) */}
          <motion.div
            className={styles.kpiCard}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.10, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.kpiLabel}>Total Revenue</span>
            <span className={styles.kpiValue}>
              <AnimatedCounter target={2.4} prefix="$" suffix="M" decimals={1} delay={1.10} />
            </span>
            <span className={styles.kpiDelta} style={{ color: '#059669' }}>
              ↑ +12.4%
            </span>
          </motion.div>

          {/* Claims KPI (1.20s) */}
          <motion.div
            className={styles.kpiCard}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.20, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.kpiLabel}>Claims Filed</span>
            <span className={styles.kpiValue}>
              <AnimatedCounter target={1847} isComma delay={1.20} />
            </span>
            <span className={styles.kpiDelta} style={{ color: '#059669' }}>
              ↑ +8.1%
            </span>
          </motion.div>

          {/* Approval Rate KPI (1.30s) */}
          <motion.div
            className={styles.kpiCard}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.30, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.kpiLabel}>Approval Rate</span>
            <span className={styles.kpiValue}>
              <AnimatedCounter target={98.2} suffix="%" decimals={1} delay={1.30} />
            </span>
            <span className={styles.kpiDelta} style={{ color: '#059669' }}>
              ↑ +0.6%
            </span>
          </motion.div>
        </div>

        {/* ── Charts Row (Donut: 1.40s, Bar: 1.50s) ── */}
        <div className={styles.chartsRow}>

          {/* Donut Chart (Widget 4: 1.40s) */}
          <motion.div
            className={styles.donutSection}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.40, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.donutLabel}>Claims Status</span>
            <div className={styles.donutWrap}>
              <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true">
                {/* Background track */}
                <circle cx="32" cy="32" r="24" fill="none" stroke="#f1f5f9" strokeWidth="9" />

                {/* Animated Donut Stroke — 98% (1.5s Ease Out) */}
                <motion.circle
                  cx="32" cy="32" r="24"
                  fill="none"
                  stroke="#0F4C81"
                  strokeWidth="9"
                  strokeDasharray={150.8}
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: 150.8 }}
                  animate={{ strokeDashoffset: 3.01 }}
                  transition={{ duration: 1.5, delay: 1.40, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.circle
                  cx="32" cy="32" r="24"
                  fill="none"
                  stroke="#2D9CDB"
                  strokeWidth="9"
                  strokeDasharray={`${18 * 1.508} ${(100 - 18) * 1.508}`}
                  strokeDashoffset={`${-(72 * 1.508) + 37.7}`}
                  strokeLinecap="round"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 2.0 }}
                />
                <text x="32" y="36" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="800" fontFamily="Manrope, sans-serif">98%</text>
              </svg>

              <div className={styles.donutLegend}>
                {[
                  { label: 'Approved',   pct: '72%', color: '#0F4C81' },
                  { label: 'Processing', pct: '18%', color: '#2D9CDB' },
                  { label: 'Denied',     pct: '10%', color: '#f87171' },
                ].map((l) => (
                  <div key={l.label} className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ background: l.color }} />
                    <span>{l.label}</span>
                    <span style={{ marginLeft: 'auto', fontWeight: 700, color: '#0f172a', fontSize: '10px' }}>{l.pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bar Chart (Widget 5: 1.50s, Bars grow upward staggered 80ms) */}
          <motion.div
            className={styles.barSection}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.50, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.barLabel}>Monthly Revenue ($K)</span>
            <div className={styles.barChart} role="img" aria-label="Monthly revenue bar chart">
              {BAR_HEIGHTS.map((h, i) => (
                <div key={BAR_MONTHS[i]} className={styles.barItem}>
                  <motion.div
                    className={styles.barFill}
                    style={{
                      background: i === BAR_HEIGHTS.length - 1
                        ? 'var(--color-primary)'
                        : `rgba(15, 76, 129, ${0.3 + (h / 100) * 0.4})`,
                    }}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}px` }}
                    transition={{
                      duration: 0.8,
                      delay: 1.50 + i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                  <span className={styles.barTick}>{BAR_MONTHS[i]}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Recent Claims (Widget 6: 1.60s, Staggered Cards 80ms) ── */}
        <motion.div
          className={styles.claimsSection}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.60, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.claimsHeader}>
            <span className={styles.claimsSectionLabel}>Recent Claims</span>
            <span className={styles.viewAll}>View all →</span>
          </div>
          {CLAIMS.map((c, i) => (
            <motion.div
              key={c.name}
              className={styles.claimRow}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.60 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.claimLeft}>
                <div className={styles.claimAvatar} style={{ background: c.avatarBg }}>
                  {c.initials}
                </div>
                <div className={styles.claimInfo}>
                  <div className={styles.claimName}>{c.name}</div>
                  <div className={styles.claimSub}>{c.sub}</div>
                </div>
              </div>
              <div className={styles.claimRight}>
                <span className={styles.claimAmount}>{c.amount}</span>
                <motion.span
                  className={styles.claimStatus}
                  style={c.statusColor}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 1.80 + i * 0.08 }}
                >
                  {c.status}
                </motion.span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

/* ============================================================
   HeroSection Component
   ============================================================ */

interface HeroSectionProps {
  onBookConsultation: () => void;
  onGetFreeAudit: () => void;
}

export default function HeroSection({ onBookConsultation, onGetFreeAudit }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isSecondaryHovered, setIsSecondaryHovered] = useState(false);

  // Mouse tilt for dashboard (max rotateX: 2deg, rotateY: 3deg)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [2, -2]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-3, 3]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Scroll animations: content fades upward, dashboard scales down slightly
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.3]);
  const contentY = useTransform(scrollYProgress, [0, 0.7], [0, -30]);
  const dashScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.95]);

  return (
    <section ref={sectionRef} id="home" className={styles.section} aria-label="Hero — Care2Solutions">

      {/* Background blobs (20s slow movement) */}
      <div className={styles.blob1} aria-hidden="true" />
      <div className={styles.blob2} aria-hidden="true" />
      <div className={styles.blob3} aria-hidden="true" />

      <div className={styles.inner}>

        {/* ── LEFT: Content (Sequential Page Load Animations) ── */}
        <motion.div
          className={styles.left}
          style={{ opacity: contentOpacity, y: contentY }}
        >

          {/* 150ms: Badge */}
          <motion.div
            className={styles.badge}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.badgeIconWrap} aria-hidden="true">
              <HeartPulseIcon />
            </div>
            Healthcare Revenue Cycle Management
          </motion.div>

          {/* 300ms: Main Heading */}
          <motion.h1
            className={styles.headline}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.30, ease: [0.22, 1, 0.36, 1] }}
          >
            Medical Billing That{' '}
            <span className={styles.headlineAccent}>Maximizes Revenue.</span>
          </motion.h1>

          {/* 450ms: Paragraph Subtext */}
          <motion.p
            className={styles.subtext}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            Helping hospitals, clinics, and physician practices reduce claim denials,
            improve cash flow, and simplify billing through secure, HIPAA-compliant
            revenue cycle management.
          </motion.p>

          {/* 600ms: Trust Points Staggered (80ms each) */}
          <ul className={styles.trustList} aria-label="Key benefits">
            {TRUST_ITEMS.map((item, index) => (
              <motion.li
                key={item}
                className={styles.trustItem}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.60 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className={styles.trustCheck} aria-hidden="true">
                  <CheckIcon />
                </span>
                {item}
              </motion.li>
            ))}
          </ul>

          {/* 750ms: CTA Buttons */}
          <motion.div
            className={styles.ctaRow}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Primary Button */}
            <motion.button
              className={styles.ctaPrimary}
              onClick={onBookConsultation}
              id="hero-cta-get-free-quote"
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <QuoteIcon />
              Get a Free Quote
            </motion.button>

            {/* Secondary Button */}
            <motion.button
              className={styles.ctaSecondary}
              onClick={onGetFreeAudit}
              id="hero-cta-explore-services"
              onMouseEnter={() => setIsSecondaryHovered(true)}
              onMouseLeave={() => setIsSecondaryHovered(false)}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span
                animate={{ x: isSecondaryHovered ? 4 : 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: 'inline-flex', alignItems: 'center' }}
              >
                <ServicesIcon />
              </motion.span>
              Explore Services
            </motion.button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            className={styles.socialProof}
            aria-label="Social proof"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.85 }}
          >
            <div className={styles.avatarStack} aria-hidden="true">
              {AVATAR_COLORS.map((color, i) => (
                <div
                  key={i}
                  className={styles.avatarBubble}
                  style={{ background: color, zIndex: AVATAR_COLORS.length - i }}
                />
              ))}
            </div>
            <p className={styles.socialProofText}>
              Trusted by <strong>500+ healthcare organizations</strong> across 35 states
            </p>
          </motion.div>

        </motion.div>

        {/* ── RIGHT: Dashboard Illustration (900ms Load, 7s Float, Mouse Tilt) ── */}
        <motion.div
          className={styles.right}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.90, ease: [0.22, 1, 0.36, 1] }}
          style={{ scale: dashScale }}
        >
          {/* Gentle 7s Floating Container with Mouse Tilt */}
          <motion.div
            className={styles.dashboardWrap}
            style={{ rotateX, rotateY }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 7, ease: 'easeInOut', repeat: Infinity }}
          >

            {/* Insurance Verified Card (Slides top-right with bounce + gentle float) */}
            <motion.div
              className={`${styles.floatCard} ${styles.floatCardRight}`}
              initial={{ opacity: 0, x: 30, y: -20 }}
              animate={{ opacity: 1, x: 0, y: [0, -5, 0] }}
              transition={{
                opacity: { duration: 0.6, delay: 1.70 },
                x: { duration: 0.6, delay: 1.70, ease: [0.34, 1.56, 0.64, 1] },
                y: { duration: 5, ease: 'easeInOut', repeat: Infinity, delay: 2.30 },
              }}
            >
              <div className={styles.floatIconWrap} style={{ background: 'rgba(16,185,129,0.10)' }}>
                <ShieldIcon />
              </div>
              <div className={styles.floatText}>
                <span className={styles.floatTitle}>Insurance Verified</span>
                <span className={styles.floatSub} style={{ color: '#059669', fontWeight: 600 }}>✓ Active Coverage · BlueCross</span>
              </div>
            </motion.div>

            {/* Main Dashboard */}
            <DashboardIllustration />

            {/* Revenue Growth Card (Slides upward + gentle float) */}
            <motion.div
              className={`${styles.floatCard} ${styles.floatCardLeft}`}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: [0, -6, 0] }}
              transition={{
                opacity: { duration: 0.6, delay: 1.85 },
                y: { duration: 6, ease: 'easeInOut', repeat: Infinity, delay: 2.45 },
              }}
            >
              <div className={styles.floatIconWrap} style={{ background: 'rgba(15,76,129,0.10)' }}>
                <TrendUpIcon />
              </div>
              <div className={styles.floatText}>
                <span className={styles.floatTitle}>+$124K This Month</span>
                <span className={styles.floatSub}>Revenue up from last month</span>
              </div>
            </motion.div>

          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
