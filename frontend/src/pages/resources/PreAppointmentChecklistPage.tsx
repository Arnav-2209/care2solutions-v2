import { useSEO } from '../../utils/useSEO';
import ResourceHero from '../../components/resource/ResourceHero';
import ResourceCTA from '../../components/resource/ResourceCTA';
import RelatedResources from '../../components/resource/RelatedResources';
import FinalCTA from '../../components/resource/FinalCTA';
import styles from '../../components/resource/resource-shared.module.css';

/* ── Check icon for checklist items ── */
const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M2.5 8l4 4 7-7" />
  </svg>
);

interface ChecklistItemData {
  num: number;
  title: string;
  desc: string;
}

const CHECKLIST_ITEMS: ChecklistItemData[] = [
  {
    num: 1,
    title: 'Confirm Patient Information',
    desc: 'Ensure the necessary demographic and contact information is available and current. Accurate information at this stage helps avoid issues later in the billing process.',
  },
  {
    num: 2,
    title: 'Verify Insurance Coverage',
    desc: 'Confirm whether coverage is active for the relevant date of service. An inactive policy or coverage gap identified before the visit provides more time to address the situation.',
  },
  {
    num: 3,
    title: 'Review Eligibility and Benefits',
    desc: 'Review available coverage information and relevant benefits for the planned service. Understanding what the plan covers helps set appropriate expectations for the upcoming billing cycle.',
  },
  {
    num: 4,
    title: 'Check Deductible Information',
    desc: 'Identify deductible information where available and relevant. Knowing the patient\'s deductible status can be useful for patient communication and billing preparation.',
  },
  {
    num: 5,
    title: 'Review Coverage Limitations',
    desc: 'Look for exclusions, limitations, or other coverage considerations that may affect the planned service. Some plans limit visit frequency, procedure types, or specific service categories.',
  },
  {
    num: 6,
    title: 'Determine Whether Prior Authorization Is Required',
    desc: 'Identify whether the payer requires authorization or precertification for the planned service or procedure. Requirements vary by payer and procedure type.',
  },
  {
    num: 7,
    title: 'Confirm Authorization Status',
    desc: 'If authorization is required, confirm that its status has been established and that the necessary information has been obtained and documented before the appointment.',
  },
  {
    num: 8,
    title: 'Review Procedure Information',
    desc: 'Make sure the available procedure or service information is consistent with what is being verified or authorized. Discrepancies at this stage are easier to address before the visit.',
  },
  {
    num: 9,
    title: 'Identify Patient Financial Responsibility',
    desc: 'Where information is available, understand relevant patient financial responsibility — such as copayments, coinsurance, or deductible balances — before the visit.',
  },
  {
    num: 10,
    title: 'Document Relevant Verification Information',
    desc: 'Maintain the information gathered during the verification process in a format accessible to the practice\'s billing and clinical workflow staff.',
  },
];

export default function PreAppointmentChecklistPage() {
  useSEO(
    'Pre-Appointment Revenue Cycle Checklist | Care2Solutions',
    'A practical checklist covering eligibility verification, benefits, prior authorization, coverage considerations, and other pre-appointment workflows.',
  );

  return (
    <main className={styles.page}>
      <ResourceHero
        category="Checklist"
        title="Pre-Appointment Revenue Cycle Checklist"
        intro="Important revenue cycle work often begins before the appointment. This checklist outlines the key verification and authorization steps that can help practices be better prepared before services are delivered."
      />

      <article className={styles.article}>

        {/* ── Introduction ── */}
        <section className={styles.section} aria-labelledby="checklist-intro">
          <h2 id="checklist-intro" className={styles.sectionHeading}>Before the Patient Visit</h2>
          <p className={styles.sectionBody}>
            Pre-appointment workflow covers the administrative steps a practice completes before a patient
            visit takes place. Addressing eligibility, benefits, and authorization requirements before the
            appointment gives staff more time to identify and resolve potential issues — before they affect
            the billing process.
          </p>
          <p className={styles.sectionBody}>
            The items below represent a practical set of pre-appointment checks relevant to revenue cycle
            management. Not every item will apply to every visit or every practice's workflow.
          </p>
        </section>

        {/* ── Checklist ── */}
        <section aria-labelledby="checklist-items-heading">
          <h2 id="checklist-items-heading" className={styles.sectionHeading}>
            Pre-Appointment Checklist
          </h2>
          <ul className={styles.checklistGrid} aria-label="Pre-appointment revenue cycle checklist">
            {CHECKLIST_ITEMS.map((item) => (
              <li key={item.num} className={styles.checklistItem}>
                <div className={styles.checklistIconWrap} aria-hidden="true">
                  <CheckIcon />
                </div>
                <div className={styles.checklistContent}>
                  <p className={styles.checklistTitle}>{item.num}. {item.title}</p>
                  <p className={styles.checklistDesc}>{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <hr className={styles.divider} />

        {/* ── Callout ── */}
        <div className={styles.callout} role="note">
          <p className={styles.calloutTitle}>Why Do This Before the Appointment?</p>
          <p className={styles.calloutText}>
            Pre-appointment verification can help practices identify coverage questions and authorization
            requirements earlier in the workflow. Addressing these questions before services are delivered
            gives staff more time to resolve issues and communicate relevant information — rather than
            discovering them during or after billing.
          </p>
        </div>

        <hr className={styles.divider} />

        {/* ── Additional guidance ── */}
        <section className={styles.section} aria-labelledby="checklist-guidance">
          <h2 id="checklist-guidance" className={styles.sectionHeading}>Using This Checklist in Your Practice</h2>
          <p className={styles.sectionBody}>
            Each practice has a different workflow, payer mix, and operational structure. This checklist
            is intended as a general reference, not a prescription. Some practices may already have
            detailed internal processes for each of these steps. Others may find it useful as a starting
            point when reviewing or refining their pre-appointment workflow.
          </p>
          <p className={styles.sectionBody}>
            Pre-appointment processes also connect to downstream billing workflows. When eligibility and
            authorization information is verified and documented early, it becomes easier to support
            accurate charge entry and claims submission after the visit.
          </p>
        </section>

        <hr className={styles.divider} />

        {/* ── Service CTA ── */}
        <ResourceCTA
          title="Need Help With Pre-Appointment Workflows?"
          text="Explore Care2Solutions services for eligibility verification and prior authorization support for healthcare practices."
          buttons={[
            { label: 'Eligibility Verification', href: '/services', variant: 'primary' },
            { label: 'Prior Authorization', href: '/services', variant: 'secondary' },
          ]}
        />

        {/* ── Final CTA ── */}
        <FinalCTA />

      </article>

      {/* ── Related Resources ── */}
      <RelatedResources currentSlug="pre-appointment-checklist" />
    </main>
  );
}
