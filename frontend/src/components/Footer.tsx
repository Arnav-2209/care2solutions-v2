import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useContactForm } from '../hooks/useContactForm';
import styles from './Footer.module.css';

/* ──────────────────────────────────────────────
   Official Care2Solutions Logo (Light Text for Dark BG)
   ────────────────────────────────────────────── */
const OfficialLogoLightText = () => (
  <svg
    viewBox="0 0 240 54"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ height: '48px', width: 'auto', display: 'block' }}
    aria-hidden="true"
  >
    <g transform="translate(0, 3)">
      <rect x="0" y="0" width="48" height="48" rx="14" fill="url(#c2s_footer_logo_grad)" />
      <path d="M24 12v24M12 24h24" stroke="white" strokeWidth="4" strokeLinecap="round" />
      <path d="M14 32c3.5 3.5 9 4.5 13.5 1 4.5-3.5 8.5-2.5 10.5 1" stroke="rgba(255,255,255,0.75)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="36" cy="13" r="3.5" fill="#60A5FA" />
    </g>
    <text x="58" y="30" fontFamily="var(--font-display, 'Manrope', sans-serif)" fontWeight="800" fontSize="22" fill="#FFFFFF" letterSpacing="-0.4">
      Care<tspan fill="#38BDF8">2</tspan>Solutions
    </text>
    <text x="58.5" y="44" fontFamily="var(--font-sans, 'Inter', sans-serif)" fontWeight="700" fontSize="8.5" fill="#94A3B8" letterSpacing="1.2">
      HEALTHCARE RCM PLATFORM
    </text>
    <defs>
      <linearGradient id="c2s_footer_logo_grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0F4C81" />
        <stop offset="1" stopColor="#2D9CDB" />
      </linearGradient>
    </defs>
  </svg>
);

/* ──────────────────────────────────────────────
   Social Media SVG Icon (LinkedIn)
   ────────────────────────────────────────────── */
const LinkedInIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" width="15" height="15" aria-hidden="true">
    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
  </svg>
);

export default function Footer() {
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
    <footer id="contact" className={styles.footer} aria-labelledby="footer-heading">
      <div className={styles.footerGlow} aria-hidden="true" />

      <div className={styles.container}>
        {/* ── 1. Centered Header ── */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 id="footer-heading" className={styles.title}>
            Start Your Partnership with Care2Solutions
          </h2>
          <p className={styles.subtitle}>
            Have questions or ready to explore our healthcare solutions? Let's connect.
          </p>
        </motion.div>

        {/* ── 2. Responsive 40/60 Main Grid ── */}
        <div className={styles.mainGrid}>
          {/* ── LEFT COLUMN (40%): Info & HIPAA ── */}
          <motion.div
            className={styles.leftCol}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className={styles.logoWrap}>
              <OfficialLogoLightText />
            </div>

            <p className={styles.companyDesc}>
              Helping healthcare providers improve operational efficiency through secure, reliable
              revenue cycle management solutions.
            </p>

            {/* Four Compact Information Blocks */}
            <div className={styles.infoBlocks}>
              {/* Call Us */}
              <div className={styles.infoBlock}>
                <div className={styles.infoIconBadge} aria-hidden="true">
                  <Phone size={18} />
                </div>
                <div className={styles.infoContent}>
                  <span className={styles.infoLabel}>Call Us</span>
                  <div className={styles.phoneList}>
                    <a href="tel:+19255977686" className={styles.infoLink}>
                      +1 (925) 597-7686
                    </a>
                    <a href="tel:+15714414218" className={styles.infoLink}>
                      +1 (571) 441-4218
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className={styles.infoBlock}>
                <div className={styles.infoIconBadge} aria-hidden="true">
                  <Mail size={18} />
                </div>
                <div className={styles.infoContent}>
                  <span className={styles.infoLabel}>Email</span>
                  <p className={styles.infoText}>
                    <a href="mailto:sales@care2solution.com" className={styles.infoLink}>
                      sales@care2solution.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Office */}
              <div className={styles.infoBlock}>
                <div className={styles.infoIconBadge} aria-hidden="true">
                  <MapPin size={18} />
                </div>
                <div className={styles.infoContent}>
                  <span className={styles.infoLabel}>Office</span>
                  <address className={styles.officeAddress}>
                    91springboard<br />
                    Sector 18<br />
                    Gurugram, Haryana 122015
                  </address>
                </div>
              </div>

              {/* Business Support */}
              <div className={styles.infoBlock}>
                <div className={styles.infoIconBadge} aria-hidden="true">
                  <Clock size={18} />
                </div>
                <div className={styles.infoContent}>
                  <span className={styles.infoLabel}>Business Support</span>
                  <p className={styles.infoText}>
                    Monday – Friday · Responsive Assistance
                  </p>
                </div>
              </div>
            </div>

            {/* Compact HIPAA Notice */}
            <div className={styles.hipaaNotice}>
              <div className={styles.hipaaIconBadge} aria-hidden="true">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className={styles.hipaaTitle}>HIPAA-Focused Operations</h4>
                <p className={styles.hipaaText}>
                  Every inquiry is handled confidentially using privacy-focused operational practices
                  designed to protect Protected Health Information (PHI).
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN (60%): Floating Consultation Card ── */}
          <motion.div
            className={styles.rightCol}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className={styles.floatingCard}>
              {isSuccess ? (
                /* Success Confirmation Panel */
                <div className={styles.successPanel} role="status" aria-live="polite">
                  <div className={styles.successIconWrap} aria-hidden="true">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className={styles.successTitle}>Thank You!</h3>
                  <p className={styles.successText}>
                    We've received your consultation request. Our healthcare solutions team will review
                    your information and contact you shortly.
                  </p>
                  <button type="button" className={styles.resetBtn} onClick={reset}>
                    Submit Another Request
                  </button>
                </div>
              ) : (
                /* Consultation Form */
                <form onSubmit={handleSubmit} noValidate aria-label="Book a Free Consultation form">
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>Book a Free Consultation</h3>
                    <p className={styles.cardSubtitle}>
                      Tell us about your practice and we'll get back to you shortly.
                    </p>
                  </div>

                  <div className={styles.formGrid}>
                    {/* Full Name */}
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="footer-name">
                        Full Name
                      </label>
                      <input
                        className={`${styles.input} ${errors.name ? styles.hasError : ''}`}
                        id="footer-name"
                        name="name"
                        type="text"
                        placeholder="Dr. Jane Smith"
                        value={fields.name}
                        onChange={handleChange}
                        autoComplete="name"
                        aria-describedby={errors.name ? 'footer-name-err' : undefined}
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && (
                        <span className={styles.errorMsg} id="footer-name-err" role="alert">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    {/* Email Address */}
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="footer-email">
                        Email Address
                      </label>
                      <input
                        className={`${styles.input} ${errors.email ? styles.hasError : ''}`}
                        id="footer-email"
                        name="email"
                        type="email"
                        placeholder="jane@practice.com"
                        value={fields.email}
                        onChange={handleChange}
                        autoComplete="email"
                        aria-describedby={errors.email ? 'footer-email-err' : undefined}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <span className={styles.errorMsg} id="footer-email-err" role="alert">
                          {errors.email}
                        </span>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="footer-phone">
                        Phone Number
                      </label>
                      <input
                        className={`${styles.input} ${errors.phone ? styles.hasError : ''}`}
                        id="footer-phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={fields.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                        aria-describedby={errors.phone ? 'footer-phone-err' : undefined}
                        aria-invalid={!!errors.phone}
                      />
                      {errors.phone && (
                        <span className={styles.errorMsg} id="footer-phone-err" role="alert">
                          {errors.phone}
                        </span>
                      )}
                    </div>

                    {/* Practice / Organization */}
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="footer-practiceName">
                        Practice / Organization
                      </label>
                      <input
                        className={styles.input}
                        id="footer-practiceName"
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
                      <label className={styles.label} htmlFor="footer-serviceNeeded">
                        Service Interested In
                      </label>
                      <select
                        className={`${styles.select} ${errors.serviceNeeded ? styles.hasError : ''}`}
                        id="footer-serviceNeeded"
                        name="serviceNeeded"
                        value={fields.serviceNeeded}
                        onChange={handleChange}
                        aria-describedby={errors.serviceNeeded ? 'footer-service-err' : undefined}
                        aria-invalid={!!errors.serviceNeeded}
                      >
                        <option value="">Select a service…</option>
                        <option value="medical-billing">Medical Billing</option>
                        <option value="medical-coding">Medical Coding</option>
                        <option value="transcription">Medical Transcription</option>
                        <option value="eligibility-verification">Eligibility Verification</option>
                        <option value="patient-scheduling">Patient Appointment Scheduling</option>
                        <option value="debt-collections">Patient Debt Collections</option>
                        <option value="prior-authorization">Prior Authorization</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.serviceNeeded && (
                        <span className={styles.errorMsg} id="footer-service-err" role="alert">
                          {errors.serviceNeeded}
                        </span>
                      )}
                    </div>

                    {/* Message */}
                    <div className={`${styles.field} ${styles.fieldFull}`}>
                      <label className={styles.label} htmlFor="footer-message">
                        Message
                      </label>
                      <textarea
                        className={`${styles.textarea} ${errors.message ? styles.hasError : ''}`}
                        id="footer-message"
                        name="message"
                        placeholder="Tell us about your current workflow, challenges or goals."
                        value={fields.message}
                        onChange={handleChange}
                        aria-describedby={errors.message ? 'footer-message-err' : undefined}
                        aria-invalid={!!errors.message}
                      />
                      {errors.message && (
                        <span className={styles.errorMsg} id="footer-message-err" role="alert">
                          {errors.message}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* API Error */}
                  {apiError && (
                    <div className={styles.apiError} role="alert">
                      <AlertCircle size={16} />
                      <span>{apiError}</span>
                    </div>
                  )}

                  {/* Primary Button */}
                  <button
                    type="submit"
                    className={styles.submitBtn}
                    id="footer-submit-btn"
                    disabled={isLoading}
                    aria-busy={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className={styles.spinner} aria-hidden="true" />
                        <span>Sending Request…</span>
                      </>
                    ) : (
                      <span>Book a Consultation</span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* ── 3. Bottom Footer Strip ── */}
        <div className={styles.bottomStrip}>
          <p className={styles.copyright}>
            © 2026 Care2Solutions. All Rights Reserved.
          </p>

          <div className={styles.socialRow} aria-label="Social media links">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className={styles.socialIconBtn}
              aria-label="Care2Solutions on LinkedIn"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
