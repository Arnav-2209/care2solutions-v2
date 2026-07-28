import { useAuditQuoteForm } from '../hooks/useAuditQuoteForm';
import styles from './FormSection.module.css';

// ── Icons ─────────────────────────────────────────────────────

const ChartIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 12l4-4 3 3 5-6" />
    <path d="M14 4h-4M14 4v4" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="15" cy="15" r="12" />
    <path d="M9 15l4 4 8-8" />
  </svg>
);

const AlertIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="8" cy="8" r="6" />
    <path d="M8 5v3M8 11h.01" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 1.5L2 4v4.5c0 3 2.5 5.5 6 6.5 3.5-1 6-3.5 6-6.5V4L8 1.5z" />
    <path d="M5.5 8l2 2 3.5-4" />
  </svg>
);

const SearchDocIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 2H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6L9 2z" />
    <path d="M9 2v4h4M7 9a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM10.5 12.5L9 11" />
  </svg>
);

const DollarIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="8" cy="8" r="6" />
    <path d="M8 5v6M6.5 6.5h2.5a1 1 0 0 1 0 2H7a1 1 0 0 0 0 2h2.5" />
  </svg>
);

// ── Component ─────────────────────────────────────────────────

export default function AuditQuoteSection() {
  const {
    fields,
    errors,
    isLoading,
    isSuccess,
    requestId,
    successMsg,
    apiError,
    handleChange,
    handleSubmit,
    reset,
  } = useAuditQuoteForm();

  return (
    <section
      id="audit-quote"
      className={styles.section}
      style={{ background: '#ffffff' }}
      aria-labelledby="audit-heading"
    >
      <div className={styles.container}>
        {/* Left info panel */}
        <div className={styles.infoPanel}>
          <div
            className={styles.eyebrow}
            style={{
              background: 'rgba(45,156,219,0.08)',
              border: '1px solid rgba(45,156,219,0.2)',
              color: 'var(--color-primary)',
            }}
          >
            <span
              className={styles.eyebrowDot}
              style={{ background: 'var(--color-secondary)' }}
              aria-hidden="true"
            />
            Free RCM Analysis
          </div>
          <h2 id="audit-heading" className={styles.title}>
            Get a Free Revenue Cycle <span className={styles.titleAccent}>Audit & Quote</span>
          </h2>
          <p className={styles.desc}>
            Discover hidden revenue leakage, denial patterns, and compliance gaps in your current
            billing workflow — completely free with zero obligation.
          </p>

          <div className={styles.infoList} role="list">
            {[
              {
                icon: <SearchDocIcon />,
                text: 'Comprehensive 30-day historical claim review',
              },
              {
                icon: <DollarIcon />,
                text: 'Identify uncollected reimbursements & underbillings',
              },
              {
                icon: <ShieldCheckIcon />,
                text: '100% confidential & HIPAA compliant process',
              },
            ].map((item) => (
              <div key={item.text} className={styles.infoItem} role="listitem">
                <div className={styles.infoIcon} aria-hidden="true">
                  {item.icon}
                </div>
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
              <div className={styles.successIconWrap} aria-hidden="true">
                <CheckCircleIcon />
              </div>
              <h3 className={styles.successTitle}>Audit Request Submitted!</h3>
              <p className={styles.successMsg}>{successMsg}</p>
              {requestId && <div className={styles.successId}>Request ID: {requestId}</div>}
              <button className={styles.resetBtn} onClick={reset}>
                Submit another request
              </button>
            </div>
          ) : (
            /* ── Form ── */
            <form onSubmit={handleSubmit} noValidate aria-label="Audit Quote Request form">
              <h3 className={styles.formTitle}>Request Your Free Audit</h3>

              <div className={styles.formGrid}>
                {/* Provider Name */}
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="audit-providerName">
                    Provider / Practice Name
                  </label>
                  <input
                    className={`${styles.input} ${errors.providerName ? styles.hasError : ''}`}
                    id="audit-providerName"
                    name="providerName"
                    type="text"
                    placeholder="Apex Healthcare Partners"
                    value={fields.providerName}
                    onChange={handleChange}
                    autoComplete="organization"
                    aria-describedby={errors.providerName ? 'audit-providerName-err' : undefined}
                    aria-invalid={!!errors.providerName}
                  />
                  {errors.providerName && (
                    <span className={styles.errorMsg} id="audit-providerName-err" role="alert">
                      {errors.providerName}
                    </span>
                  )}
                </div>

                {/* Specialty */}
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="audit-specialty">
                    Medical Specialty
                  </label>
                  <input
                    className={`${styles.input} ${errors.specialty ? styles.hasError : ''}`}
                    id="audit-specialty"
                    name="specialty"
                    type="text"
                    placeholder="e.g. Cardiology, Internal Medicine"
                    value={fields.specialty}
                    onChange={handleChange}
                    aria-describedby={errors.specialty ? 'audit-specialty-err' : undefined}
                    aria-invalid={!!errors.specialty}
                  />
                  {errors.specialty && (
                    <span className={styles.errorMsg} id="audit-specialty-err" role="alert">
                      {errors.specialty}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="audit-email">
                    Work Email
                  </label>
                  <input
                    className={`${styles.input} ${errors.email ? styles.hasError : ''}`}
                    id="audit-email"
                    name="email"
                    type="email"
                    placeholder="billing@apexhealth.com"
                    value={fields.email}
                    onChange={handleChange}
                    autoComplete="email"
                    aria-describedby={errors.email ? 'audit-email-err' : undefined}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <span className={styles.errorMsg} id="audit-email-err" role="alert">
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Phone */}
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="audit-phone">
                    Phone Number
                  </label>
                  <input
                    className={`${styles.input} ${errors.phone ? styles.hasError : ''}`}
                    id="audit-phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={fields.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    aria-describedby={errors.phone ? 'audit-phone-err' : undefined}
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && (
                    <span className={styles.errorMsg} id="audit-phone-err" role="alert">
                      {errors.phone}
                    </span>
                  )}
                </div>

                {/* Monthly Billing Volume */}
                <div className={`${styles.field} ${styles.fieldFull}`}>
                  <label className={styles.label} htmlFor="audit-monthlyBillingVolume">
                    Monthly Billing Volume <span className={styles.labelOptional}>(optional)</span>
                  </label>
                  <select
                    className={styles.select}
                    id="audit-monthlyBillingVolume"
                    name="monthlyBillingVolume"
                    value={fields.monthlyBillingVolume}
                    onChange={handleChange}
                  >
                    <option value="">Select billing volume…</option>
                    <option value="$10k-$50k">$10k – $50k / month</option>
                    <option value="$50k-$100k">$50k – $100k / month</option>
                    <option value="$100k+">$100k+ / month</option>
                  </select>
                </div>

                {/* Notes */}
                <div className={`${styles.field} ${styles.fieldFull}`}>
                  <label className={styles.label} htmlFor="audit-notes">
                    Additional Notes <span className={styles.labelOptional}>(optional)</span>
                  </label>
                  <textarea
                    className={styles.textarea}
                    id="audit-notes"
                    name="notes"
                    placeholder="Specific EHR/EMR system used, current denial challenges, or special requests…"
                    value={fields.notes}
                    onChange={handleChange}
                  />
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
                id="audit-submit-btn"
                disabled={isLoading}
                aria-busy={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className={styles.spinner} aria-hidden="true" /> Requesting Audit…
                  </>
                ) : (
                  <>
                    <ChartIcon /> Request Free Audit
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
