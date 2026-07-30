import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Users,
  Sliders,
  MessageSquare,
  Handshake,
  Zap,
  ShieldCheck,
  Shield,
  Lock,
  Check,
  FileCheck
} from 'lucide-react';
import styles from './AboutSection.module.css';

interface Pillar {
  icon: React.ElementType;
  title: string;
  sentence: string;
}

const TRUST_PILLARS: Pillar[] = [
  {
    icon: TrendingUp,
    title: 'Revenue Cycle Expertise',
    sentence: 'Helping improve billing efficiency while reducing administrative workload.'
  },
  {
    icon: Users,
    title: 'Dedicated Specialists',
    sentence: 'Healthcare-focused professionals supporting your operations.'
  },
  {
    icon: Sliders,
    title: 'Tailored Solutions',
    sentence: 'Customized services aligned with your practice.'
  },
  {
    icon: MessageSquare,
    title: 'Transparent Communication',
    sentence: 'Clear updates and operational visibility.'
  },
  {
    icon: Handshake,
    title: 'Long-Term Partnership',
    sentence: 'Support that continues beyond onboarding.'
  },
  {
    icon: Zap,
    title: 'Operational Efficiency',
    sentence: 'Helping simplify day-to-day healthcare workflows.'
  }
];

const FAQ_ITEMS = [
  {
    q: 'How do we get started with Care2Solutions?',
    a: 'Schedule a consultation with our team. We\'ll assess your current workflow, understand your goals, and recommend services that fit your practice.',
  },
  {
    q: 'Do you work with practices of different sizes?',
    a: 'Yes. Our services are designed to support independent practices, clinics, physician groups, and larger healthcare organizations.',
  },
  {
    q: 'How do you protect patient information?',
    a: 'Patient privacy is a core priority. Our operational practices are designed around secure handling of Protected Health Information (PHI), controlled access, employee training, and HIPAA-aware workflows.',
  },
  {
    q: 'Can your services be customized?',
    a: 'Yes. Every healthcare organization has different operational needs, and our services are tailored accordingly.',
  },
];

function FAQCard() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className={styles.faqCard}>
      <div className={styles.faqCardHeader}>
        <h3 className={styles.faqTitle}>Frequently Asked Questions</h3>
        <p className={styles.faqSubtitle}>Quick answers to common questions about working with Care2Solutions.</p>
      </div>
      <div className={styles.faqList}>
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ''}`}>
              <button
                className={styles.faqQuestion}
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${idx}`}
                id={`faq-question-${idx}`}
              >
                <span className={styles.faqQuestionText}>{item.q}</span>
                <span className={`${styles.faqChevron} ${isOpen ? styles.faqChevronOpen : ''}`} aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 6l4 4 4-4" />
                  </svg>
                </span>
              </button>
              <div
                id={`faq-answer-${idx}`}
                role="region"
                aria-labelledby={`faq-question-${idx}`}
                className={`${styles.faqAnswer} ${isOpen ? styles.faqAnswerOpen : ''}`}
              >
                <p className={styles.faqAnswerText}>{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface Commitment {
  title: string;
  sentence: string;
}

const HIPAA_COMMITMENTS: Commitment[] = [
  {
    title: 'Secure PHI Handling',
    sentence: 'Protecting oral, written, and electronic Protected Health Information.'
  },
  {
    title: 'Privacy-First Operations',
    sentence: 'Processes designed to reduce unauthorized access and disclosure.'
  },
  {
    title: 'Employee Training',
    sentence: 'Regular privacy and security awareness for employees handling sensitive information.'
  },
  {
    title: 'Policies & Procedures',
    sentence: 'Established internal procedures for safeguarding healthcare information.'
  },
  {
    title: 'Restricted Data Access',
    sentence: 'Access to sensitive doctor and patient information is controlled.'
  },
  {
    title: 'Secure Data Transfer',
    sentence: 'Confidential information is handled using secure transfer methods and protected cloud storage where applicable.'
  }
];

export default function AboutSection() {
  return (
    <section id="why-us" className={styles.section} aria-labelledby="why-us-heading">
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={styles.container}>
        {/* Section Header (Centered) */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            WHY PARTNER WITH CARE2SOLUTIONS
          </div>
          <h2 id="why-us-heading" className={styles.heading}>
            Why Healthcare Providers Choose <span className={styles.headingAccent}>Care2Solutions</span>
          </h2>
          <p className={styles.subtitle}>
            Helping healthcare providers simplify operations, improve revenue performance, and
            protect patient data through secure, tailored healthcare solutions.
          </p>
        </motion.div>

        {/* 60/40 Two-Column Layout */}
        <div className={styles.mainGrid}>
          {/* Left Column (60%): Why Choose Care2Solutions */}
          <motion.div
            className={styles.leftCol}
            initial={{ opacity: 0, x: -56 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className={styles.leftHeading}>A Partner You Can Depend On</h3>

            <div className={styles.bodyParagraphs}>
              <p className={styles.bodyText}>
                Helping healthcare providers simplify operations, improve revenue performance, and
                protect patient data through secure, tailored healthcare solutions.
              </p>
              <p className={styles.bodyText}>
                Our experienced specialists combine healthcare expertise with transparent communication
                and dedicated support to deliver reliable results throughout every stage of your
                partnership.
              </p>
            </div>

            {/* 6 Compact Trust Pillars in 2 Columns */}
            <div className={styles.pillarsGrid}>
              {TRUST_PILLARS.map((p, idx) => {
                const Icon = p.icon;

                return (
                  <motion.div
                    key={p.title}
                    initial={{ opacity: 0, y: 30, scale: 0.92 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{ duration: 0.5, delay: idx * 0.09, ease: [0.22, 1, 0.36, 1] }}
                    className={styles.pillarCard}
                  >
                    <div className={styles.pillarHeader}>
                      <div className={styles.pillarIconBox}>
                        <Icon size={20} />
                      </div>
                      <h4 className={styles.pillarTitle}>{p.title}</h4>
                    </div>
                    <p className={styles.pillarDesc}>{p.sentence}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* FAQ Card — below trust pillars */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className={styles.faqCardWrapper}
            >
              <FAQCard />
            </motion.div>
          </motion.div>

          {/* Right Column (40%): One Premium Security & Compliance Card */}
          <motion.div
            className={styles.rightCol}
            initial={{ opacity: 0, x: 56 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.securityCard}>
              <div className={styles.securityHeader}>
                <div className={styles.shieldIconBadge}>
                  <ShieldCheck size={26} />
                </div>
                <h3 className={styles.securityTitle}>HIPAA Commitment</h3>
              </div>

              <p className={styles.securityDesc}>
                Protecting patient information is fundamental to how Care2Solutions operates. Our
                workflows are designed to support secure handling of Protected Health Information
                (PHI) while maintaining privacy, confidentiality, and operational integrity.
              </p>

              {/* 6 Operational Commitments */}
              <div className={styles.commitmentsList}>
                {HIPAA_COMMITMENTS.map((c, idx) => (
                  <motion.div
                    key={c.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className={styles.commitmentRow}
                  >
                    <div className={styles.checkIconCircle} aria-hidden="true">
                      <Check size={13} strokeWidth={3} />
                    </div>
                    <div className={styles.commitmentText}>
                      <h4 className={styles.commitmentTitle}>{c.title}</h4>
                      <p className={styles.commitmentSentence}>{c.sentence}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Highlighted Strip at Bottom */}
              <div className={styles.highlightStrip}>
                <div className={styles.stripLabel}>Built on Secure Healthcare Practices</div>
                <div className={styles.badgesRow}>
                  <div className={styles.trustBadgePill}>
                    <Shield size={14} />
                    <span>HIPAA-Focused Operations</span>
                  </div>
                  <div className={styles.trustBadgePill}>
                    <Lock size={14} />
                    <span>Protected Health Information</span>
                  </div>
                  <div className={styles.trustBadgePill}>
                    <FileCheck size={14} />
                    <span>Confidential Data Handling</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
