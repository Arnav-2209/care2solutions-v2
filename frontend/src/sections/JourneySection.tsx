import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PhoneCall,
  BarChart3,
  SlidersHorizontal,
  Rocket,
  TrendingUp,
  ArrowLeft,
  ArrowRight,
  Check,
  UserCheck,
  ShieldCheck,
  MonitorCheck,
  BarChart2,
  CalendarDays,
  Search,
  LineChart,
  Coins,
  Gauge,
  FileCheck2,
  Lock,
  Target,
  Workflow,
  Sparkles,
  Users,
  Award,
  RefreshCw,
  Clock,
  Shield,
  GraduationCap,
  FlaskConical,
  Zap,
  UserCheck2,
  FileText,
  BellRing,
  Headphones,
  TrendingUpIcon
} from 'lucide-react';
import styles from './JourneySection.module.css';

interface FeatureCard {
  icon: React.ElementType;
  title: string;
  desc: string;
}

interface GlancePill {
  emoji: string;
  label: string;
}

interface JourneyStage {
  id: string;
  sidebarTitle: string;
  cardTitle: string;
  icon: React.ElementType;
  shortDesc: string;
  atAGlancePills: GlancePill[];
  heading: string;
  subtitle: string;
  benefitPills: string[];
  paragraph1: string;
  paragraph2: string;
  primaryCtaText: string;
  primaryCtaTargetId: string;
  secondaryCtaText: string;
  secondaryCtaTargetId: string;
  features: FeatureCard[];
}

const STAGES: JourneyStage[] = [
  {
    id: 'discovery-call',
    sidebarTitle: 'Discovery Call',
    cardTitle: 'Discovery Call',
    icon: PhoneCall,
    shortDesc: 'Understand your practice goals, workflows, and administrative challenges.',
    atAGlancePills: [
      { emoji: '📞', label: '30-Min Consultation' },
      { emoji: '👤', label: 'Dedicated Expert' },
      { emoji: '🛡️', label: 'HIPAA Secure' },
      { emoji: '💻', label: 'EHR Compatible' },
      { emoji: '📅', label: 'Flexible Scheduling' }
    ],
    heading: "Let's Understand Your Practice",
    subtitle: 'A focused 30-minute consultation to learn about your practice goals and billing challenges.',
    benefitPills: ['Identify Challenges', 'Define Goals', 'Revenue Opportunities'],
    paragraph1:
      "We begin every partnership with a focused dialogue to understand your practice's clinical workflow, patient volume, and revenue objectives.",
    paragraph2:
      'Our specialists analyze your administrative bottlenecks to align our strategy with your long-term operational vision.',
    primaryCtaText: 'Schedule a Free Consultation',
    primaryCtaTargetId: 'contact',
    secondaryCtaText: 'Talk to Our Team',
    secondaryCtaTargetId: 'contact',
    features: [
      {
        icon: PhoneCall,
        title: 'Strategy Session',
        desc: '30-minute consultation with an RCM specialist.'
      },
      {
        icon: UserCheck,
        title: 'Dedicated Specialist',
        desc: 'One point of contact throughout onboarding.'
      },
      {
        icon: ShieldCheck,
        title: 'HIPAA Compliance',
        desc: 'Secure patient data handling.'
      },
      {
        icon: MonitorCheck,
        title: 'EHR Compatibility',
        desc: 'Epic, Athena, eClinicalWorks and more.'
      },
      {
        icon: BarChart2,
        title: 'Revenue Planning',
        desc: 'Measurable financial goals.'
      },
      {
        icon: CalendarDays,
        title: 'Flexible Scheduling',
        desc: 'Choose a convenient time.'
      }
    ]
  },
  {
    id: 'practice-assessment',
    sidebarTitle: 'Practice Assessment',
    cardTitle: 'Practice Assessment',
    icon: BarChart3,
    shortDesc: 'In-depth analysis of your current billing processes and revenue opportunities.',
    atAGlancePills: [
      { emoji: '📊', label: 'Workflow Audit' },
      { emoji: '📈', label: 'Revenue Review' },
      { emoji: '⚠️', label: 'Risk Analysis' },
      { emoji: '📄', label: 'Action Plan' },
      { emoji: '🔍', label: 'Process Insights' }
    ],
    heading: 'In-Depth Revenue & Workflow Audit',
    subtitle: 'A thorough diagnostic of your claim submission pipelines and uncollected revenue.',
    benefitPills: ['Workflow Analysis', 'Revenue Insights', 'Process Review'],
    paragraph1:
      'Our clinical auditors conduct a deep diagnostic of your historical claim submissions, denial codes, and payer reimbursement trends.',
    paragraph2:
      'We deliver a clear audit report that quantifies revenue recovery potential and highlights immediate workflow improvements.',
    primaryCtaText: 'Request Practice Assessment',
    primaryCtaTargetId: 'contact',
    secondaryCtaText: 'Explore Our Services',
    secondaryCtaTargetId: 'services',
    features: [
      {
        icon: Search,
        title: 'Workflow Audit',
        desc: 'Comprehensive review of front-desk and billing pipelines.'
      },
      {
        icon: LineChart,
        title: 'Denial Analysis',
        desc: 'Identify systemic claim rejections and payer trends.'
      },
      {
        icon: Coins,
        title: 'Revenue Diagnostic',
        desc: 'Pinpoint uncollected claims and filing recovery targets.'
      },
      {
        icon: Gauge,
        title: 'Clean Claim Gauge',
        desc: 'Benchmark your clean claim rate against national standards.'
      },
      {
        icon: FileCheck2,
        title: 'Action Plan',
        desc: 'Receive a prioritized roadmap to boost collections.'
      },
      {
        icon: Lock,
        title: 'Encrypted Review',
        desc: 'All practice data is reviewed in a secure environment.'
      }
    ]
  },
  {
    id: 'tailored-solution',
    sidebarTitle: 'Tailored Solution',
    cardTitle: 'Tailored Solution',
    icon: SlidersHorizontal,
    shortDesc: 'A customized operational strategy engineered specifically for your practice.',
    atAGlancePills: [
      { emoji: '⚙️', label: 'Custom Strategy' },
      { emoji: '🧩', label: 'Flexible Services' },
      { emoji: '👥', label: 'Dedicated Team' },
      { emoji: '📈', label: 'Scalable Growth' },
      { emoji: '📝', label: 'Implementation Plan' }
    ],
    heading: 'Custom Strategy Built For Your Specialty',
    subtitle: 'A bespoke operational blueprint designed for your clinical specialty and EHR software.',
    benefitPills: ['Custom Strategy', 'Flexible Services', 'Dedicated Team'],
    paragraph1:
      'Every practice operates differently. We engineer custom billing protocols tailored specifically to your clinical field and software requirements.',
    paragraph2:
      'From automated claim scrubbing rules to dedicated billing specialists, our solution integrates directly into your daily routine.',
    primaryCtaText: 'Get Your Custom Blueprint',
    primaryCtaTargetId: 'contact',
    secondaryCtaText: 'Talk to Our Team',
    secondaryCtaTargetId: 'contact',
    features: [
      {
        icon: Target,
        title: 'Specialty Focus',
        desc: 'Billing rules tailored to your clinical field.'
      },
      {
        icon: Workflow,
        title: 'Direct EHR Bridge',
        desc: 'Seamless data bridge connecting your EHR software.'
      },
      {
        icon: Sparkles,
        title: 'Scrubbing Engine',
        desc: 'Pre-submission claim checks to prevent rejections.'
      },
      {
        icon: Users,
        title: 'Account Team',
        desc: 'Certified coders dedicated exclusively to your practice.'
      },
      {
        icon: Award,
        title: 'Service Guarantees',
        desc: 'SLA commitments for turnaround time and accuracy.'
      },
      {
        icon: RefreshCw,
        title: 'Workflow Fit',
        desc: 'We adapt to your routine without forcing new software.'
      }
    ]
  },
  {
    id: 'seamless-onboarding',
    sidebarTitle: 'Seamless Onboarding',
    cardTitle: 'Seamless Onboarding',
    icon: Rocket,
    shortDesc: 'Fast, secure implementation with zero interruption to patient care.',
    atAGlancePills: [
      { emoji: '🚀', label: 'Secure Migration' },
      { emoji: '🔒', label: 'HIPAA Ready' },
      { emoji: '💻', label: 'System Integration' },
      { emoji: '👨‍💼', label: 'Staff Training' },
      { emoji: '⏱️', label: 'Minimal Downtime' }
    ],
    heading: 'Rapid Implementation With Zero Downtime',
    subtitle: 'Fast, secure onboarding managed behind the scenes without patient care interruption.',
    benefitPills: ['Secure Migration', 'HIPAA Ready', 'Minimal Downtime'],
    paragraph1:
      'Switching billing partners should never disrupt patient care. Our transition team executes every technical step behind the scenes.',
    paragraph2:
      'We manage encrypted data migration, system testing, and staff orientation to ensure a smooth, worry-free launch.',
    primaryCtaText: 'Start Seamless Onboarding',
    primaryCtaTargetId: 'contact',
    secondaryCtaText: 'Explore Our Services',
    secondaryCtaTargetId: 'services',
    features: [
      {
        icon: Zap,
        title: 'Zero Downtime',
        desc: 'Launch smoothly without interrupting daily operations.'
      },
      {
        icon: Shield,
        title: 'Data Migration',
        desc: 'Encrypted transfer of historical files and patient rosters.'
      },
      {
        icon: GraduationCap,
        title: 'Staff Training',
        desc: 'Hands-on guidance for seamless daily coordination.'
      },
      {
        icon: FlaskConical,
        title: 'Validation Check',
        desc: 'End-to-end test claims to confirm clean submission.'
      },
      {
        icon: Clock,
        title: 'Fast Launch',
        desc: 'Go live in as little as 14 days with milestone tracking.'
      },
      {
        icon: UserCheck2,
        title: 'Onboard Lead',
        desc: 'Personal specialist guiding your team through launch.'
      }
    ]
  },
  {
    id: 'ongoing-partnership',
    sidebarTitle: 'Ongoing Partnership',
    cardTitle: 'Ongoing Partnership',
    icon: TrendingUp,
    shortDesc: 'Continuous performance monitoring, reporting, and revenue optimization.',
    atAGlancePills: [
      { emoji: '📊', label: 'Monthly Reports' },
      { emoji: '📈', label: 'Revenue Growth' },
      { emoji: '🤝', label: 'Expert Support' },
      { emoji: '📉', label: 'KPI Tracking' },
      { emoji: '♾️', label: 'Continuous Improvement' }
    ],
    heading: 'Continuous Monitoring & Optimization',
    subtitle: 'Real-time analytics, regular reviews, and proactive rules to consistently maximize revenue.',
    benefitPills: ['Monthly Reports', 'Continuous Support', 'Revenue Growth'],
    paragraph1:
      'Our engagement continues long after launch. We provide 24/7 visibility into your financial performance through intuitive real-time dashboards.',
    paragraph2:
      'Our team performs monthly reviews, adjusts scrubbing rules for payer policy updates, and actively appeals denials to maximize collections.',
    primaryCtaText: 'Schedule Performance Review',
    primaryCtaTargetId: 'contact',
    secondaryCtaText: 'Talk to Our Team',
    secondaryCtaTargetId: 'contact',
    features: [
      {
        icon: BarChart2,
        title: 'Live Dashboards',
        desc: '24/7 visibility into AR aging and collection metrics.'
      },
      {
        icon: FileText,
        title: 'Monthly Reports',
        desc: 'Executive summaries tracking financial growth trends.'
      },
      {
        icon: Zap,
        title: 'Denial Appeals',
        desc: 'Rapid automated and manual appeal of denied claims.'
      },
      {
        icon: BellRing,
        title: 'Rule Updates',
        desc: 'Stay ahead of payer policy changes with auto updates.'
      },
      {
        icon: Headphones,
        title: 'Strategy Calls',
        desc: 'Regular reviews with your dedicated revenue manager.'
      },
      {
        icon: TrendingUpIcon,
        title: 'ROI Optimization',
        desc: 'Continuous tuning to increase net collections year-over-year.'
      }
    ]
  }
];

export default function JourneySection() {
  const [viewMode, setViewMode] = useState<'overview' | 'detail'>('overview');
  const [activeStageId, setActiveStageId] = useState<string>('discovery-call');

  const currentStage = STAGES.find((s) => s.id === activeStageId) || STAGES[0];

  const handleCardClick = (stageId: string) => {
    setActiveStageId(stageId);
    setViewMode('detail');
  };

  const handleCtaClick = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="journey" className={styles.section} aria-labelledby="journey-heading">
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 52 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            PARTNERING WITH CARE2SOLUTIONS
          </div>
          <h2 id="journey-heading" className={styles.heading}>
            Your Journey with <span className={styles.headingAccent}>Care2Solutions</span>
          </h2>
          <p className={styles.subtitle}>
            From your first conversation to long-term optimization, we make partnering with
            Care2Solutions simple, transparent, and focused on your success.
          </p>
        </motion.div>

        {/* View Switcher via AnimatePresence */}
        <AnimatePresence mode="wait">
          {viewMode === 'overview' ? (
            /* OVERVIEW STATE: 5 INTERACTIVE CARDS */
            <motion.div
              key="overview-mode"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className={styles.overviewGridWrapper}
            >
              {/* Row 1: Cards 1, 2, 3 */}
              <div className={styles.topRowGrid}>
                {STAGES.slice(0, 3).map((stage, idx) => {
                  const Icon = stage.icon;

                  return (
                    <motion.div
                      key={stage.id}
                      initial={{ opacity: 0, y: 40, scale: 0.9 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: false, amount: 0.1 }}
                      transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      style={{ height: '100%' }}
                    >
                      <button
                        type="button"
                        className={styles.overviewCard}
                        onClick={() => handleCardClick(stage.id)}
                      >
                        <div className={styles.cardIconBox}>
                          <Icon size={26} />
                        </div>
                        <h3 className={styles.cardTitle}>{stage.cardTitle}</h3>
                        <p className={styles.cardDesc}>{stage.shortDesc}</p>
                        <div className={styles.cardArrowHint}>
                          <span>Explore Experience</span>
                          <ArrowRight size={14} />
                        </div>
                      </button>
                    </motion.div>
                  );
                })}
              </div>

              {/* Row 2: Cards 4, 5 (Centered) */}
              <div className={styles.bottomRowFlex}>
                {STAGES.slice(3, 5).map((stage, idx) => {
                  const Icon = stage.icon;

                  return (
                    <motion.div
                      key={stage.id}
                      className={styles.bottomRowCard}
                      initial={{ opacity: 0, y: 40, scale: 0.9 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: false, amount: 0.1 }}
                      transition={{ duration: 0.55, delay: (idx + 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <button
                        type="button"
                        className={styles.overviewCard}
                        onClick={() => handleCardClick(stage.id)}
                      >
                        <div className={styles.cardIconBox}>
                          <Icon size={26} />
                        </div>
                        <h3 className={styles.cardTitle}>{stage.cardTitle}</h3>
                        <p className={styles.cardDesc}>{stage.shortDesc}</p>
                        <div className={styles.cardArrowHint}>
                          <span>Explore Experience</span>
                          <ArrowRight size={14} />
                        </div>
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            /* DETAIL PAGE VIEW MODE */
            <motion.div
              key="detail-mode"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className={styles.detailViewContainer}
            >
              {/* Back Button */}
              <button
                type="button"
                className={styles.backButton}
                onClick={() => setViewMode('overview')}
              >
                <ArrowLeft size={16} />
                <span>Back to Journey Overview</span>
              </button>

              {/* Detail Grid Layout (Sidebar 22% Width, 56px Gap, Main Content) */}
              <div className={styles.detailGrid}>
                {/* Left Sidebar (22% Width - Vertically Centered Connected Nodes) */}
                <div className={styles.sidebar} role="tablist" aria-label="Journey stages">
                  <div className={styles.sidebarTrackLine} aria-hidden="true" />
                  <div className={styles.sidebarList}>
                    {STAGES.map((stage) => {
                      const isActive = activeStageId === stage.id;

                      return (
                        <button
                          key={stage.id}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          className={styles.sidebarItem}
                          onClick={() => setActiveStageId(stage.id)}
                        >
                          <div
                            className={`${styles.nodeCircle} ${
                              isActive ? styles.nodeCircleActive : ''
                            }`}
                          >
                            {isActive && <div className={styles.nodeInnerDot} />}
                          </div>

                          <div
                            className={`${styles.nodeRectangle} ${
                              isActive ? styles.nodeRectangleActive : ''
                            }`}
                          >
                            <span
                              className={`${styles.nodeTitle} ${
                                isActive ? styles.nodeTitleActive : ''
                              }`}
                            >
                              {stage.sidebarTitle}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right Content Area */}
                <div className={styles.rightContentArea}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStage.id}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="w-full"
                    >
                      {/* 1. AT A GLANCE (MOVED ABOVE PAGE HEADING) */}
                      <div className={styles.atAGlanceSection}>
                        <div className={styles.atAGlanceLabel}>
                          <span className={styles.atAGlanceDot} aria-hidden="true" />
                          At a Glance
                        </div>
                        <div className={styles.atAGlancePillsRow}>
                          {currentStage.atAGlancePills.map((pill, i) => (
                            <div key={i} className={styles.atAGlancePill}>
                              <span className={styles.pillEmoji}>{pill.emoji}</span>
                              <span>{pill.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 2. HEADING, SUBTITLE, BENEFIT PILLS, BODY & FEATURE PANEL GRID */}
                      <div className={styles.contentSplitGrid}>
                        {/* LEFT COLUMN (60% Width) */}
                        <div className={styles.leftMainCol}>
                          <h3 className={styles.detailHeading}>{currentStage.heading}</h3>
                          <p className={styles.detailSubtitle}>{currentStage.subtitle}</p>

                          {/* Compact Benefit Pills Row */}
                          <div className={styles.benefitPillsRow}>
                            {currentStage.benefitPills.map((bPill, i) => (
                              <motion.span
                                key={i}
                                whileHover={{ scale: 1.03 }}
                                transition={{ duration: 0.2 }}
                                className={styles.benefitPill}
                              >
                                <span className={styles.checkPillIcon} aria-hidden="true">
                                  <Check size={11} strokeWidth={3} />
                                </span>
                                <span>{bPill}</span>
                              </motion.span>
                            ))}
                          </div>

                          {/* Concise Body Paragraphs */}
                          <div className={styles.bodyParagraphs}>
                            <p className={styles.bodyText}>{currentStage.paragraph1}</p>
                            <p className={styles.bodyText}>{currentStage.paragraph2}</p>
                          </div>

                          {/* Dual CTA Button Group */}
                          <div className={styles.ctaGroup}>
                            <button
                              type="button"
                              className={styles.primaryBtn}
                              onClick={() => handleCtaClick(currentStage.primaryCtaTargetId)}
                            >
                              <span>{currentStage.primaryCtaText}</span>
                              <ArrowRight size={18} className={styles.ctaIcon} />
                            </button>

                            <button
                              type="button"
                              className={styles.secondaryBtn}
                              onClick={() => handleCtaClick(currentStage.secondaryCtaTargetId)}
                            >
                              <span>{currentStage.secondaryCtaText}</span>
                            </button>
                          </div>
                        </div>

                        {/* RIGHT COLUMN (40% Width): PREMIUM FEATURE PANEL */}
                        <div className={styles.featurePanel}>
                          {/* 6 Compact Feature Cards (3 rows x 2 columns) */}
                          <div className={styles.featureGrid}>
                            {currentStage.features.map((feat, idx) => {
                              const FeatIcon = feat.icon;

                              return (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, y: 8 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.25, delay: idx * 0.05 }}
                                  className={styles.featureCard}
                                >
                                  <div className={styles.featureCardHeader}>
                                    <div className={styles.featureIconBox}>
                                      <FeatIcon size={18} />
                                    </div>
                                    <h4 className={styles.featureTitle}>{feat.title}</h4>
                                  </div>
                                  <p className={styles.featureDesc}>{feat.desc}</p>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
