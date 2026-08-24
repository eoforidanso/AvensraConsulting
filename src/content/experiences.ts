/**
 * Corporate Experiences — enquiry-led, not sold through checkout.
 * Prices are "from" guide prices shown on the artwork; quotations,
 * participant lists and invoicing are handled manually by Avensra in Phase 1.
 */

export type Experience = {
  id: string;
  duration: string;
  name: string;
  promise: string;
  body: string;
  fromUsd: number | null;
  capacity: string;
  featured?: boolean;
};

export const experiences: Experience[] = [
  {
    id: "reset-30",
    duration: "30 minutes",
    name: "Executive Reset™ Experience",
    promise: "Quick reset. Clear focus. Immediate impact.",
    body: "A short, facilitated pause designed to drop into an existing agenda — an offsite, a leadership day or a demanding delivery week.",
    fromUsd: 35000,
    capacity: "Up to 20 participants",
  },
  {
    id: "reset-45",
    duration: "45 minutes",
    name: "Executive Reset™ Experience",
    promise: "Reset. Realign. Recommit.",
    body: "Room to move past the reset itself and into what the team has decided to carry forward together.",
    fromUsd: 50000,
    capacity: "Up to 20 participants",
    featured: true,
  },
  {
    id: "reset-60",
    duration: "60 minutes",
    name: "Executive Reset™ Leadership Experience",
    promise: "Deep reflection. Lasting leadership impact.",
    body: "The full journey, facilitated for leadership teams who need the reflection to change something after the session ends.",
    fromUsd: 75000,
    capacity: "Up to 20 participants",
  },
  {
    id: "reset-custom",
    duration: "21+ participants",
    name: "Custom Experience",
    promise: "We will design the right experience for your organisation.",
    body: "Larger groups, multi-team programmes, multi-region delivery or a format built around a specific moment in your business.",
    fromUsd: null,
    capacity: "Tailored to your organisation",
  },
];

export const licensingBenefits = [
  "Licensed materials for your own facilitators",
  "Facilitator guidance for running Executive Reset™ sessions in-house",
  "Agreed participant volumes and usage terms",
  "Renewal and expansion handled directly with Avensra",
];
