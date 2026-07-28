import { useContactForm } from '../hooks/useContactForm';
import styles from './FormSection.module.css';

// ── Icons ─────────────────────────────────────────────────────

const CalendarIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="3" width="12" height="11" rx="2" /><path d="M2 7h12M5 1v4M11 1v4" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2.5 3.5a1 1 0 0 1 1-1h2l1.5 3-1.5 1a8 8 0 0 0 3 3l1-1.5 3 1.5v2a1 1 0 0 1-1 1C5.3 14 2 10.7 2 6.5a4 4 0 0 1 .5-2z" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="12" height="9" rx="2" /><path d="M2 4l6 5 6-5" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="8" cy="8" r="6" /><path d="M8 5v3l2 2" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="15" cy="15" r="12" /><path d="M9 15l4 4 8-8" />
  </svg>
);

const AlertIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="8" cy="8" r="6" /><path d="M8 5v3M8 11h.01" />
  </svg>
);

// ── Component ─────────────────────────────────────────────────

export default function ContactSection() {
  const {
    fields, errors, isLoading, isSuccess, successMsg, apiError,
    handleChange, handleSubmit, reset,
  } = useContactForm();

  return (
    <section
      id="contact"
      className={styles.section}
      style={{ background: 'var(--color-bg)' }}
      aria-labelledby="contact-heading"
    >
      <div className={styles.container}>

        {/* Left info panel */}
        <div className={styles.infoPanel}>
          <div
            className={styles.eyebrow}
            style={{ background: 'rgba(15,76,129,0.06)', border: '1px solid rgba(15,76,129,0.12)', color: 'var(--color-primary)' }}
          >
            <span className={styles.eyebrowDot} style={{ background: 'var(--color-secondary)' }} aria-hidden="true" />
            Get In Touch
          </div>
          <h2 id="contact-heading" className={styles.title}>
            Let's Discuss Your{' '}
            <span className={styles.titleAccent}>Revenue Goals</span>
          </h2>
          <p className={styles.desc}>
            Fill out the form and one of our RCM specialists will reach out within
            24 hours to discuss how C2S can optimize your revenue cycle.
          </p>

          <div className={styles.infoList} role="list">
            {[
              { icon: <PhoneIcon />, text: 'Call us: +1 (800) 555-0199' },
              { icon: <MailIcon />,  text: 'info@care2solutions.com' },
              { icon: <ClockIcon />, text: 'Mon–Fri, 8 AM – 6 PM EST' },
            ].map((item) => (
              <div key={item.text} className={styles.infoItem} role="listitem">
                <div className={styles.infoIcon} aria-hidden="true">{item.icon}</div>
                {item.text}
              </div>
            ))}
          </div>
        </div>

        {/* Form card */}
        <div className={styles.formCard}>
          {isSuccess ? (
            /* ── Success state ── */
            <div className={styles.successState} role="status" aria-live="polite">
              <div className={styles.successIconWrap} aria-hidden="true"><CheckCircleIcon /></div>
              <h3 className={styles.successTitle}>Message Received!</h3>
              <p className={styles.successMsg}>{successMsg}</p>
              <button className={styles.resetBtn} onClick={reset}>Send another message</button>
            </div>
          ) : (
            /* ── Form ── */
            <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
              <h3 className={styles.formTitle}>Book a Consultation</h3>

              <div className={styles.formGrid}>

                {/* Name */}
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="contact-name">Full Name</label>
                  <input
                    className={`${styles.input} ${errors.name ? styles.hasError : ''}`}
                    id="contact-name" name="name" type="text"
                    placeholder="Dr. Jane Smith"
                    value={fields.name} onChange={handleChange}
                    autoComplete="name" aria-describedby={errors.name ? 'contact-name-err' : undefined}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <span className={styles.errorMsg} id="contact-name-err" role="alert">{errors.name}</span>}
                </div>

                {/* Email */}
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="contact-email">Email Address</label>
                  <input
                    className={`${styles.input} ${errors.email ? styles.hasError : ''}`}
                    id="contact-email" name="email" type="email"
                    placeholder="jane@practice.com"
                    value={fields.email} onChange={handleChange}
                    autoComplete="email" aria-describedby={errors.email ? 'contact-email-err' : undefined}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <span className={styles.errorMsg} id="contact-email-err" role="alert">{errors.email}</span>}
                </div>

                {/* Phone */}
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="contact-phone">Phone Number</label>
                  <input
                    className={`${styles.input} ${errors.phone ? styles.hasError : ''}`}
                    id="contact-phone" name="phone" type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={fields.phone} onChange={handleChange}
                    autoComplete="tel" aria-describedby={errors.phone ? 'contact-phone-err' : undefined}
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && <span className={styles.errorMsg} id="contact-phone-err" role="alert">{errors.phone}</span>}
                </div>

                {/* Practice Name */}
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="contact-practiceName">
                    Practice / Organization <span className={styles.labelOptional}>(optional)</span>
                  </label>
                  <input
                    className={styles.input}
                    id="contact-practiceName" name="practiceName" type="text"
                    placeholder="Sunrise Medical Group"
                    value={fields.practiceName} onChange={handleChange}
                    autoComplete="organization"
                  />
                </div>

                {/* Service */}
                <div className={`${styles.field} ${styles.fieldFull}`}>
                  <label className={styles.label} htmlFor="contact-serviceNeeded">Service Needed</label>
                  <select
                    className={`${styles.select} ${errors.serviceNeeded ? styles.hasError : ''}`}
                    id="contact-serviceNeeded" name="serviceNeeded"
                    value={fields.serviceNeeded} onChange={handleChange}
                    aria-describedby={errors.serviceNeeded ? 'contact-service-err' : undefined}
                    aria-invalid={!!errors.serviceNeeded}
                  >
                    <option value="">Select a service…</option>
                    <option value="medical-billing">Medical Billing</option>
                    <option value="transcription">Medical Transcription</option>
                    <option value="credentialing">Provider Credentialing</option>
                    <option value="rcm">Revenue Cycle Management</option>
                    <option value="other">Other / Not Sure</option>
                  </select>
                  {errors.serviceNeeded && <span className={styles.errorMsg} id="contact-service-err" role="alert">{errors.serviceNeeded}</span>}
                </div>

                {/* Message */}
                <div className={`${styles.field} ${styles.fieldFull}`}>
                  <label className={styles.label} htmlFor="contact-message">Message</label>
                  <textarea
                    className={`${styles.textarea} ${errors.message ? styles.hasError : ''}`}
                    id="contact-message" name="message"
                    placeholder="Tell us about your practice, current challenges, or questions…"
                    value={fields.message} onChange={handleChange}
                    aria-describedby={errors.message ? 'contact-message-err' : undefined}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && <span className={styles.errorMsg} id="contact-message-err" role="alert">{errors.message}</span>}
                </div>

              </div>

              {/* API-level error */}
              {apiError && (
                <div className={styles.apiError} role="alert">
                  <AlertIcon />
                  {apiError}
                </div>
              )}

              <button
                className={styles.submitBtn}
                type="submit"
                id="contact-submit-btn"
                disabled={isLoading}
                aria-busy={isLoading}
              >
                {isLoading ? (
                  <><div className={styles.spinner} aria-hidden="true" /> Sending…</>
                ) : (
                  <><CalendarIcon /> Send Message</>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
