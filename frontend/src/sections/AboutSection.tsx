import React from 'react';
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
  GraduationCap,
  FileText,
  KeyRound,
  CloudCheck,
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
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
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
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
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
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
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
          </motion.div>

          {/* Right Column (40%): One Premium Security & Compliance Card */}
          <motion.div
            className={styles.rightCol}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
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
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
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
