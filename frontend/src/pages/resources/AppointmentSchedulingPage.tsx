import { useEffect } from 'react';
import { useSEO } from '../../utils/useSEO';
import ResourceHero from '../../components/resource/ResourceHero';
import ResourceCTA from '../../components/resource/ResourceCTA';
import RelatedResources from '../../components/resource/RelatedResources';
import FinalCTA from '../../components/resource/FinalCTA';
import styles from '../../components/resource/resource-shared.module.css';

const SCHEDULING_WORKFLOW = [
  'Appointment',
  'Patient Information',
  'Eligibility Verification',
  'Prior Authorization (if required)',
  'Visit',
  'Billing Workflow',
];

export default function AppointmentSchedulingPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  useSEO(
    'Appointment Scheduling and Practice Efficiency | Care2Solutions',
    'Explore how scheduling, rescheduling, cancellations, and organized appointment workflows support healthcare practice operations.',
  );

  return (
    <main className={styles.page}>
      <ResourceHero
        category="Practice Insight"
        title="How Better Appointment Scheduling Supports Practice Efficiency"
        intro="Appointment scheduling is more than maintaining a calendar. It touches patient access, staff workload, communication, rescheduling, cancellations, and the day-to-day rhythm of practice operations."
      />

      <article className={styles.article}>

        {/* ── Section 1: Part of the patient experience ── */}
        <section className={styles.section} aria-labelledby="sched-s1">
          <h2 id="sched-s1" className={styles.sectionHeading}>Scheduling Is Part of the Patient Experience</h2>
          <p className={styles.sectionBody}>
            For many patients, scheduling an appointment is the first direct interaction they have with a
            practice. How that process works — how easy it is to reach someone, how clearly availability is
            communicated, how quickly appointments can be confirmed — shapes the patient's early impression
            of the practice.
          </p>
          <p className={styles.sectionBody}>
            Clear and organized scheduling processes can make it easier for both patients and staff to
            understand what appointments are available, what information is needed, and what the next steps are.
            When scheduling works smoothly, it creates a better starting point for everything that follows.
          </p>
        </section>

        <hr className={styles.divider} />

        {/* ── Section 2: Managing scheduling, rescheduling, cancellations ── */}
        <section className={styles.section} aria-labelledby="sched-s2">
          <h2 id="sched-s2" className={styles.sectionHeading}>Managing Scheduling, Rescheduling, and Cancellations</h2>
          <p className={styles.sectionBody}>
            Appointment management extends beyond booking new appointments. It also includes rescheduling
            when a patient or provider availability changes, handling cancellations, and keeping the
            schedule current as changes occur throughout the day.
          </p>
          <p className={styles.sectionBody}>
            Each of these activities requires staff time and attention. An untracked cancellation can leave
            an open slot that goes unfilled. A rescheduling request that doesn't update the record accurately
            can create confusion for the patient and the practice alike. Maintaining accurate, up-to-date
            appointment information — and having a clear process for handling changes — is an ongoing part
            of practice operations.
          </p>
          <p className={styles.sectionBody}>
            When practices have a defined process for handling appointment changes, it becomes easier to
            manage schedule variations without disrupting the rest of the day's workflow.
          </p>
        </section>

        <hr className={styles.divider} />

        {/* ── Section 3: Reducing admin workload ── */}
        <section className={styles.section} aria-labelledby="sched-s3">
          <h2 id="sched-s3" className={styles.sectionHeading}>Reducing Administrative Workload</h2>
          <p className={styles.sectionBody}>
            Appointment coordination requires sustained staff attention — responding to patient inquiries,
            confirming bookings, handling changes, and managing communications around the schedule.
            For practices with a high volume of appointments, this workload can be significant.
          </p>
          <p className={styles.sectionBody}>
            Organized scheduling processes — whether supported by staff, software, or a combination of
            both — can allow practice staff to focus their time more effectively. When scheduling is handled
            consistently and accurately, it reduces the number of exceptions and corrections that staff need
            to manage, and it creates more predictability in the daily workflow.
          </p>

          <div className={styles.callout}>
            <p className={styles.calloutTitle}>A Note on Outsourced Scheduling Support</p>
            <p className={styles.calloutText}>
              Some practices choose to support their scheduling workflow with external assistance, particularly
              for patient outreach, appointment confirmation, and rescheduling coordination. This can be an
              option when internal capacity is limited or when volume makes in-house management less practical.
            </p>
          </div>
        </section>

        <hr className={styles.divider} />

        {/* ── Section 4: Patient access ── */}
        <section className={styles.section} aria-labelledby="sched-s4">
          <h2 id="sched-s4" className={styles.sectionHeading}>Supporting Patient Access</h2>
          <p className={styles.sectionBody}>
            Patient access refers to how easily patients can reach and engage with a practice — including
            scheduling appointments in a timely and straightforward way. When scheduling processes are
            organized and responsive, it can be easier to manage availability and respond to scheduling
            requests promptly.
          </p>
          <p className={styles.sectionBody}>
            Clear communication around appointment availability, wait times, and next steps helps patients
            understand what to expect. It also reduces the need for follow-up calls and repetitive
            communication on both sides.
          </p>
        </section>

        <hr className={styles.divider} />

        {/* ── Section 5: Connecting scheduling with wider workflow — diagram ── */}
        <section className={styles.workflowSection} aria-labelledby="sched-s5">
          <h2 id="sched-s5" className={styles.workflowTitle}>Connecting Scheduling With the Wider Practice Workflow</h2>
          <p className={styles.workflowIntro}>
            Appointment scheduling doesn't exist in isolation. It connects to other administrative and
            clinical workflows that happen before, during, and after the visit. Understanding how scheduling
            feeds into eligibility verification, authorization, and eventually the billing process helps
            practices see where coordination across these steps matters most.
          </p>

          <nav aria-label="Scheduling to billing workflow">
            <ol className={styles.workflow} style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {SCHEDULING_WORKFLOW.map((step, i) => (
                <li key={step} style={{ display: 'contents' }}>
                  <div className={styles.workflowStep}>
                    <span className={styles.workflowStepNum}>{i + 1}</span>
                    <span className={styles.workflowStepLabel}>{step}</span>
                  </div>
                  {i < SCHEDULING_WORKFLOW.length - 1 && (
                    <div className={styles.workflowArrow} aria-hidden="true">↓</div>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <p className={styles.sectionBody} style={{ marginTop: '28px' }}>
            When scheduling is connected to the rest of the administrative process — with accurate patient
            information collected at the time of booking, and pre-appointment verification workflows built
            into the scheduling timeline — it becomes easier to keep the wider practice workflow moving
            without unnecessary delays.
          </p>
        </section>

        <hr className={styles.divider} />

        {/* ── Service CTA ── */}
        <ResourceCTA
          title="Looking to Simplify Appointment Management?"
          text="Learn more about how Care2Solutions supports patient appointment scheduling for healthcare practices."
          buttons={[
            { label: 'Explore Scheduling Services', href: '/services', variant: 'primary' },
            { label: 'Contact Our Team', href: '/#contact', variant: 'secondary' },
          ]}
        />

        {/* ── Final CTA ── */}
        <FinalCTA />

      </article>

      {/* ── Related Resources ── */}
      <RelatedResources currentSlug="appointment-scheduling" />
    </main>
  );
}
