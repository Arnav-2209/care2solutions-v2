import { motion } from 'framer-motion';
import {
  FileText,
  Sliders,
  Handshake,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Shield,
  Lock,
  FileCheck,
} from 'lucide-react';
import { useContactForm } from '../hooks/useContactForm';
import styles from './FormSection.module.css';

const JOURNEY_STEPS = [
  {
    icon: FileText,
    step: 'Step 01',
    title: 'Tell Us About Your Practice',
    description: 'Share your current workflow, challenges and goals.',
  },
  {
    icon: Sliders,
    step: 'Step 02',
    title: 'We Recommend the Right Solution',
    description: 'Our specialists evaluate your needs and suggest suitable healthcare services.',
  },
  {
    icon: Handshake,
    step: 'Step 03',
    title: 'Book a Consultation',
    description: 'Schedule a discussion with our experts to explore the next steps.',
  },
];

export default function ContactSection() {
  const {
    fields,
    errors,
    isLoading,
    isSuccess,
    apiError,
    handleChange,
    handleSubmit,
    reset,
  } = useContactForm();

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-heading">
      <div className={styles.container}>
        {/* ── 1. Centered Section Header ── */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 52 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            CONSULTATION & PARTNERSHIP
          </div>
          <h2 id="contact-heading" className={styles.title}>
            Start Your Partnership with <span className={styles.titleAccent}>Care2Solutions</span>
          </h2>
          <p className={styles.desc}>
            Whether you're looking to improve medical billing, streamline operations, or explore
            healthcare outsourcing solutions, our specialists are ready to understand your practice
            and recommend the right approach.
          </p>
        </motion.div>

        {/* ── 2. Consultation Journey (3 Connected Cards) ── */}
        <motion.div
          className={styles.journeyContainer}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.journeyLine} aria-hidden="true" />
          <div className={styles.journeyGrid}>
            {JOURNEY_STEPS.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  className={styles.journeyCard}
                  initial={{ opacity: 0, y: 36, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className={styles.stepIconBadge} aria-hidden="true">
                    <StepIcon size={24} />
                  </div>
                  <div className={styles.journeyStepNum}>{step.step}</div>
                  <h3 className={styles.journeyCardTitle}>{step.title}</h3>
                  <p className={styles.journeyCardDesc}>{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ── 3. Centered Floating Consultation Card ── */}
        <motion.div
          className={styles.floatingFormCard}
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {isSuccess ? (
            /* Success Confirmation Panel */
            <div className={styles.successPanel} role="status" aria-live="polite">
              <div className={styles.successIconWrap} aria-hidden="true">
                <CheckCircle2 size={40} />
              </div>
              <h3 className={styles.successTitle}>Thank You!</h3>
              <p className={styles.successText}>
                We've received your consultation request. Our healthcare solutions team will review
                your information and contact you shortly.
              </p>
              <button
                type="button"
                className={styles.resetBtn}
                onClick={reset}
              >
                Return to Homepage
              </button>
            </div>
          ) : (
            /* Consultation Form */
            <form onSubmit={handleSubmit} noValidate aria-label="Book a Free Consultation form">
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Book a Free Consultation</h3>
                <p className={styles.cardSubtitle}>
                  Complete the form below and our healthcare solutions team will contact you to
                  discuss your practice's needs.
                </p>
              </div>

              <div className={styles.formGrid}>
                {/* Full Name */}
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="consultation-name">
                    Full Name
                  </label>
                  <input
                    className={`${styles.input} ${errors.name ? styles.hasError : ''}`}
                    id="consultation-name"
                    name="name"
                    type="text"
                    placeholder="Dr. Jane Smith"
                    value={fields.name}
                    onChange={handleChange}
                    autoComplete="name"
                    aria-describedby={errors.name ? 'consultation-name-err' : undefined}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <span className={styles.errorMsg} id="consultation-name-err" role="alert">
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Email Address */}
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="consultation-email">
                    Email Address
                  </label>
                  <input
                    className={`${styles.input} ${errors.email ? styles.hasError : ''}`}
                    id="consultation-email"
                    name="email"
                    type="email"
                    placeholder="jane@practice.com"
                    value={fields.email}
                    onChange={handleChange}
                    autoComplete="email"
                    aria-describedby={errors.email ? 'consultation-email-err' : undefined}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <span className={styles.errorMsg} id="consultation-email-err" role="alert">
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Phone Number */}
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="consultation-phone">
                    Phone Number
                  </label>
                  <input
                    className={`${styles.input} ${errors.phone ? styles.hasError : ''}`}
                    id="consultation-phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={fields.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    aria-describedby={errors.phone ? 'consultation-phone-err' : undefined}
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && (
                    <span className={styles.errorMsg} id="consultation-phone-err" role="alert">
                      {errors.phone}
                    </span>
                  )}
                </div>

                {/* Practice / Organization Name */}
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="consultation-practiceName">
                    Practice / Organization Name <span className={styles.labelOptional}>(optional)</span>
                  </label>
                  <input
                    className={styles.input}
                    id="consultation-practiceName"
                    name="practiceName"
                    type="text"
                    placeholder="Sunrise Medical Group"
                    value={fields.practiceName}
                    onChange={handleChange}
                    autoComplete="organization"
                  />
                </div>

                {/* Service Interested In */}
                <div className={`${styles.field} ${styles.fieldFull}`}>
                  <label className={styles.label} htmlFor="consultation-serviceNeeded">
                    Service Interested In
                  </label>
                  <select
                    className={`${styles.select} ${errors.serviceNeeded ? styles.hasError : ''}`}
                    id="consultation-serviceNeeded"
                    name="serviceNeeded"
                    value={fields.serviceNeeded}
                    onChange={handleChange}
                    aria-describedby={errors.serviceNeeded ? 'consultation-service-err' : undefined}
                    aria-invalid={!!errors.serviceNeeded}
                  >
                    <option value="">Select a service…</option>
                    <option value="medical-billing">Medical Billing</option>
                    <option value="transcription">Medical Transcription</option>
                    <option value="medical-coding">Medical Coding</option>
                    <option value="eligibility-verification">Eligibility Verification</option>
                    <option value="patient-scheduling">Patient Appointment Scheduling</option>
                    <option value="prior-authorization">Prior Authorization</option>
                    <option value="debt-collections">Patient Debt Collections</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.serviceNeeded && (
                    <span className={styles.errorMsg} id="consultation-service-err" role="alert">
                      {errors.serviceNeeded}
                    </span>
                  )}
                </div>

                {/* Message */}
                <div className={`${styles.field} ${styles.fieldFull}`}>
                  <label className={styles.label} htmlFor="consultation-message">
                    Message
                  </label>
                  <textarea
                    className={`${styles.textarea} ${errors.message ? styles.hasError : ''}`}
                    id="consultation-message"
                    name="message"
                    placeholder="Tell us about your current workflow, challenges or goals."
                    value={fields.message}
                    onChange={handleChange}
                    aria-describedby={errors.message ? 'consultation-message-err' : undefined}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <span className={styles.errorMsg} id="consultation-message-err" role="alert">
                      {errors.message}
                    </span>
                  )}
                </div>
              </div>

              {/* API Error */}
              {apiError && (
                <div className={styles.apiError} role="alert">
                  <AlertCircle size={18} />
                  <span>{apiError}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className={styles.submitBtn}
                id="consultation-submit-btn"
                disabled={isLoading}
                aria-busy={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className={styles.spinner} aria-hidden="true" />
                    <span>Processing Request…</span>
                  </>
                ) : (
                  <span>Book a Consultation</span>
                )}
              </button>
            </form>
          )}
        </motion.div>

        {/* ── 4. Contact Information Row (3 Equal Cards) ── */}
        <motion.div
          className={styles.infoRow}
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Card 1: Call Us */}
          <div className={styles.infoCard}>
            <div className={styles.infoCardIcon} aria-hidden="true">
              <Phone size={24} />
            </div>
            <h4 className={styles.infoCardTitle}>Call Us</h4>
            <p className={styles.infoCardText}>
              <a href="tel:+19255977686" className={styles.infoCardLink}>
                +1 (925) 597-7686
              </a>
              <br />
              <a href="tel:+15714414218" className={styles.infoCardLink}>
                +1 (571) 441-4218
              </a>
            </p>
          </div>

          {/* Card 2: Email Us */}
          <div className={styles.infoCard}>
            <div className={styles.infoCardIcon} aria-hidden="true">
              <Mail size={24} />
            </div>
            <h4 className={styles.infoCardTitle}>Email Us</h4>
            <p className={styles.infoCardText}>
              <a href="mailto:sales@care2solution.com" className={styles.infoCardLink}>
                sales@care2solution.com
              </a>
            </p>
          </div>

          {/* Card 3: Business Support */}
          <div className={styles.infoCard}>
            <div className={styles.infoCardIcon} aria-hidden="true">
              <Clock size={24} />
            </div>
            <h4 className={styles.infoCardTitle}>Business Support</h4>
            <p className={styles.infoCardText}>
              Monday – Friday
              <br />
              8:00 AM – 6:00 PM EST
            </p>
          </div>
        </motion.div>

        {/* ── 5. HIPAA Trust Strip ── */}
        <motion.div
          className={styles.trustStrip}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.trustStripHeader}>
            <ShieldCheck size={22} className={styles.trustStripIcon} />
            <span>
              Every inquiry is handled with confidentiality and follows Care2Solutions' privacy-focused
              operational practices for protecting Protected Health Information (PHI).
            </span>
          </div>

          <div className={styles.trustBadgesRow}>
            <div className={styles.trustPill}>
              <Shield size={14} />
              <span>HIPAA-Focused Operations</span>
            </div>
            <div className={styles.trustPill}>
              <Lock size={14} />
              <span>Secure Communication</span>
            </div>
            <div className={styles.trustPill}>
              <FileCheck size={14} />
              <span>Confidential Information Handling</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
