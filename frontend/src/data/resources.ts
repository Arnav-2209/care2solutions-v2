/* ============================================================
   Resource types and shared metadata
   Used by: ResourcesSection (homepage cards) + RelatedResources
   ============================================================ */

export interface Resource {
  slug: string;
  route: string;
  category: string;
  categoryColor: { background: string; color: string };
  title: string;
  description: string;
  cta: string;
}

export const RESOURCES: Resource[] = [
  {
    slug: 'efficient-revenue-cycle',
    route: '/resources/efficient-revenue-cycle',
    category: 'RCM Guide',
    categoryColor: { background: 'rgba(15, 76, 129, 0.08)', color: '#0F4C81' },
    title: 'A Practical Guide to a More Efficient Revenue Cycle',
    description:
      'Explore the key stages of an effective medical billing workflow, from charge entry and claims processing to payment posting, A/R analysis, and denial management.',
    cta: 'Explore Guide',
  },
  {
    slug: 'pre-appointment-checklist',
    route: '/resources/pre-appointment-checklist',
    category: 'Checklist',
    categoryColor: { background: 'rgba(16, 185, 129, 0.08)', color: '#059669' },
    title: 'Pre-Appointment Revenue Cycle Checklist',
    description:
      'A practical checklist covering eligibility and benefits verification, prior authorization, coverage details, deductibles, limitations, and procedure requirements before the patient visit.',
    cta: 'View Checklist',
  },
  {
    slug: 'appointment-scheduling',
    route: '/resources/appointment-scheduling',
    category: 'Practice Insight',
    categoryColor: { background: 'rgba(124, 58, 237, 0.07)', color: '#7C3AED' },
    title: 'How Better Appointment Scheduling Supports Practice Efficiency',
    description:
      'Learn how effective scheduling, rescheduling, and cancellation management can help reduce administrative workload, improve patient access, and support smoother practice operations.',
    cta: 'Read More',
  },
];
