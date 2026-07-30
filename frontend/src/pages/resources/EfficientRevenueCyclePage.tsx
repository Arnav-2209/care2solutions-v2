import { useSEO } from '../../utils/useSEO';
import ResourceHero from '../../components/resource/ResourceHero';
import ResourceCTA from '../../components/resource/ResourceCTA';
import RelatedResources from '../../components/resource/RelatedResources';
import FinalCTA from '../../components/resource/FinalCTA';
import styles from '../../components/resource/resource-shared.module.css';

/* ── Inline workflow diagram ── */
const WORKFLOW_STEPS = [
  'Patient Information',
  'Eligibility Verification',
  'Prior Authorization',
  'Charge Entry',
  'Claims Submission',
  'Payment Posting',
  'Accounts Receivable',
  'Denial Management',
];

export default function EfficientRevenueCyclePage() {
  useSEO(
    'A Practical Guide to a More Efficient Revenue Cycle | Care2Solutions',
    'Learn about key revenue cycle stages including eligibility, authorization, claims processing, payment posting, A/R follow-up, and denial management.',
  );

  return (
    <main className={styles.page}>
      <ResourceHero
        category="RCM Guide"
        title="A Practical Guide to a More Efficient Revenue Cycle"
        intro="A practical overview of the key stages that help healthcare practices move from patient information and claims processing through payment posting, A/R follow-up, and denial management."
      />

      <article className={styles.article}>

        {/* ── Section 1: Understanding the Revenue Cycle ── */}
        <section className={styles.section} aria-labelledby="rcm-s1">
          <h2 id="rcm-s1" className={styles.sectionHeading}>Understanding the Revenue Cycle</h2>
          <p className={styles.sectionBody}>
            Revenue cycle management refers to the financial workflow that surrounds the delivery of
            healthcare services — from the moment patient and insurance information is collected, through
            billing and claims submission, to the receipt of payment and the resolution of any outstanding balances.
          </p>
          <p className={styles.sectionBody}>
            An efficient revenue cycle depends on accurate information flowing across multiple stages.
            When any stage encounters incomplete data or unresolved issues, the downstream steps can require
            additional time and effort to correct. Understanding how the stages connect is a useful starting
            point for identifying where workflow improvements may be possible.
          </p>
        </section>

        <hr className={styles.divider} />

        {/* ── Section 2: Patient and Insurance Information ── */}
        <section className={styles.section} aria-labelledby="rcm-s2">
          <h2 id="rcm-s2" className={styles.sectionHeading}>1. Accurate Patient and Insurance Information</h2>
          <p className={styles.sectionBody}>
            Before billing activity progresses, it helps to have accurate demographic information and
            correct insurance details for the patient. This includes the payer, plan details, member
            identifiers, and any other information relevant to the upcoming claim.
          </p>
          <p className={styles.sectionBody}>
            Errors introduced at this stage — a misspelled name, an incorrect member ID, or an outdated
            insurance record — can create additional work later in the workflow. Reviewing this information
            early can reduce the likelihood of issues that surface only after a claim has been submitted.
          </p>
        </section>

        <hr className={styles.divider} />

        {/* ── Section 3: Eligibility and Benefits Verification ── */}
        <section className={styles.section} aria-labelledby="rcm-s3">
          <h2 id="rcm-s3" className={styles.sectionHeading}>2. Eligibility and Benefits Verification</h2>
          <p className={styles.sectionBody}>
            Verifying a patient's insurance eligibility involves confirming that coverage is active for
            the relevant date of service. Beyond active status, it is useful to understand the applicable
            benefits, any deductible information where available, coverage limitations, and what patient
            financial responsibility may apply.
          </p>
          <p className={styles.sectionBody}>
            Eligibility verification is most effective when it is performed before services are delivered.
            It gives practices an opportunity to identify coverage questions — such as whether a planned
            service is covered under the patient's plan — before those questions affect billing and claims.
          </p>

          <div className={styles.callout}>
            <p className={styles.calloutTitle}>Eligibility Verification Support</p>
            <p className={styles.calloutText}>
              Care2Solutions supports healthcare practices with insurance eligibility verification as part of
              a broader revenue cycle workflow. Learn more about how this service fits into the overall billing process.
            </p>
          </div>
        </section>

        <hr className={styles.divider} />

        {/* ── Section 4: Prior Authorization ── */}
        <section className={styles.section} aria-labelledby="rcm-s4">
          <h2 id="rcm-s4" className={styles.sectionHeading}>3. Prior Authorization</h2>
          <p className={styles.sectionBody}>
            Some payers require authorization or precertification before certain services or procedures
            are performed. Determining whether authorization is needed — and obtaining it where required —
            is an important part of the pre-service workflow.
          </p>
          <p className={styles.sectionBody}>
            The prior authorization process typically involves submitting the required clinical and
            administrative information to the payer and tracking the authorization status. Maintaining
            organized records of authorizations, including reference numbers and approval details, helps
            avoid unnecessary delays later in the billing process.
          </p>
          <p className={styles.sectionBody}>
            It is worth noting that authorization does not guarantee payment — it confirms that the payer
            has reviewed the request. Understanding payer-specific authorization requirements for the
            services a practice provides is an ongoing part of revenue cycle management.
          </p>
        </section>

        <hr className={styles.divider} />

        {/* ── Section 5: Charge Entry and Claims Processing ── */}
        <section className={styles.section} aria-labelledby="rcm-s5">
          <h2 id="rcm-s5" className={styles.sectionHeading}>4. Charge Entry and Claims Processing</h2>
          <p className={styles.sectionBody}>
            Charge entry involves capturing the services delivered and translating them into billable
            information — including procedure codes, diagnosis codes, and other details that the claim
            will require. Accuracy at this stage is important because claims that contain coding errors,
            missing information, or mismatched details are more likely to require rework before or after submission.
          </p>
          <p className={styles.sectionBody}>
            Once charge information has been entered and reviewed, the claim can be prepared for submission.
            A timely and organized claims workflow helps ensure that claims are submitted within payer-required
            filing deadlines and that they contain the information needed for processing.
          </p>
        </section>

        <hr className={styles.divider} />

        {/* ── Section 6: Payment Posting ── */}
        <section className={styles.section} aria-labelledby="rcm-s6">
          <h2 id="rcm-s6" className={styles.sectionHeading}>5. Payment Posting</h2>
          <p className={styles.sectionBody}>
            Payment posting is the process of recording payments received from payers and patients and
            applying them to the appropriate accounts and claims. When payers remit payment, they typically
            include a remittance advice or explanation of benefits that details how the payment was applied,
            any adjustments, and any balances that remain.
          </p>
          <p className={styles.sectionBody}>
            Organized and timely payment posting helps practices maintain an accurate view of their revenue
            cycle. It makes it easier to identify which claims have been resolved, which have outstanding
            balances, and whether any payments or adjustments require further review.
          </p>
        </section>

        <hr className={styles.divider} />

        {/* ── Section 7: Accounts Receivable ── */}
        <section className={styles.section} aria-labelledby="rcm-s7">
          <h2 id="rcm-s7" className={styles.sectionHeading}>6. Accounts Receivable Follow-Up</h2>
          <p className={styles.sectionBody}>
            Accounts receivable (A/R) refers to the balances owed to a practice from payers and patients
            for services that have been delivered. Monitoring and following up on outstanding A/R is an
            ongoing part of revenue cycle management.
          </p>
          <p className={styles.sectionBody}>
            A/R follow-up involves identifying claims or balances that remain unresolved and taking appropriate
            steps to understand why. A claim may be pending review by the payer, may have been underpaid,
            or may require additional information before it can be finalized. Regular A/R review helps
            practices stay informed about the status of their outstanding balances and take timely action
            where necessary.
          </p>
        </section>

        <hr className={styles.divider} />

        {/* ── Section 8: Denial Management ── */}
        <section className={styles.section} aria-labelledby="rcm-s8">
          <h2 id="rcm-s8" className={styles.sectionHeading}>7. Denial Management</h2>
          <p className={styles.sectionBody}>
            When a payer denies a claim, the practice receives a denial notice that typically includes a
            reason code explaining why the claim was not paid. Denial management involves identifying denied
            claims, understanding the denial reason, and determining whether corrective action is possible.
          </p>
          <p className={styles.sectionBody}>
            Where appropriate, denied claims can be corrected and resubmitted, or appealed through the
            payer's appeal process. Following payer-specific processes and deadlines is important when
            pursuing reconsideration.
          </p>
          <p className={styles.sectionBody}>
            Beyond resolving individual denials, reviewing recurring denial patterns can help practices
            identify upstream workflow issues — such as common coding errors or authorization gaps — that
            may be contributing to preventable denials.
          </p>
        </section>

        <hr className={styles.divider} />

        {/* ── Section 9: Connected Workflow Diagram ── */}
        <section className={styles.workflowSection} aria-labelledby="rcm-s9">
          <h2 id="rcm-s9" className={styles.workflowTitle}>Building a More Connected Revenue Cycle</h2>
          <p className={styles.workflowIntro}>
            The stages of the revenue cycle are not independent — each step provides information and
            context that affects what comes next. Errors or delays at one stage tend to create additional
            work downstream. Understanding this interconnected nature helps practices identify where
            coordination and accuracy have the greatest impact on overall workflow efficiency.
          </p>

          <nav aria-label="Revenue cycle workflow stages">
            <ol className={styles.workflow} style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {WORKFLOW_STEPS.map((step, i) => (
                <li key={step} style={{ display: 'contents' }}>
                  <div className={styles.workflowStep}>
                    <span className={styles.workflowStepNum}>{i + 1}</span>
                    <span className={styles.workflowStepLabel}>{step}</span>
                  </div>
                  {i < WORKFLOW_STEPS.length - 1 && (
                    <div className={styles.workflowArrow} aria-hidden="true">↓</div>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </section>

        <hr className={styles.divider} />

        {/* ── Service CTA ── */}
        <ResourceCTA
          title="Need Support With Your Revenue Cycle?"
          text="Learn how Care2Solutions supports healthcare practices across medical billing and revenue cycle workflows."
          buttons={[
            { label: 'Explore Medical Billing', href: '/services', variant: 'primary' },
            { label: 'Contact Our Team', href: '/#contact', variant: 'secondary' },
          ]}
        />

        {/* ── Final CTA ── */}
        <FinalCTA />

      </article>

      {/* ── Related Resources ── */}
      <RelatedResources currentSlug="efficient-revenue-cycle" />
    </main>
  );
}
