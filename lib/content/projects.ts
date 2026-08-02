import type { Project } from "./types";

/**
 * Nine tiles, curated hard. The 2019–20 student and freelance work aggregates
 * into the archive tile rather than getting nine more cards of its own — this
 * is a founder-first page, and that back catalogue is texture, not substance.
 */
export const projects: Project[] = [
  {
    id: "vantage",
    eyebrow: "Vaatun",
    title: "Vantage",
    blurb: "The AI-powered ERP-CRM built for insurance pros.",
    detail:
      "Policy data extracted straight from insurer documents, invoice reconciliation that reconciles itself, and a copilot that answers questions about the book in plain English.",
    href: "https://www.vaatun.com/vantage",
    size: "lg",
    accent: "vaatun",
  },
  {
    id: "zomato-200-cities",
    eyebrow: "Zomato · Service design",
    title: "200 new cities",
    blurb: "The existing playbook for hiring delivery partners didn't scale to any of them.",
    detail:
      "A landing page and campaign for awareness, a WhatsApp flow to take someone from curious to enquiring — I owned that conversation design end to end — then a reworked training path through to their first delivery.",
    size: "wide",
  },
  {
    id: "advantage",
    eyebrow: "Vaatun",
    title: "Advantage",
    blurb: "The client-facing portal that wows.",
    detail:
      "White-label employee benefits: self-serve claims, digital health cards, and tracking that means nobody has to email to ask where things stand.",
    href: "https://www.vaatun.com/advantage",
    size: "wide",
    accent: "vaatun",
  },
  {
    id: "volunteering",
    eyebrow: "CRY · Make a Difference",
    title: "Weekly visits, Vellore",
    blurb: "Teaching and mentoring at shelter homes through university, 2017–19.",
    detail:
      "With CRY, weekly visits to shelter homes across the Vellore division. With MAD, a wingman to one student through class 11 and 12 — life skills, and someone in their corner.",
    size: "wide",
  },
  {
    id: "unagi",
    eyebrow: "Zomato · Comic",
    title: "Unagi",
    blurb: "A mental wellbeing comic, made with Zomato's psychologists and psychotherapists.",
    href: "https://www.behance.net/gallery/87560795/Unagi-A-Mental-Wellbeing-Comic",
    size: "sm",
  },
  {
    id: "gen-ai-ux",
    eyebrow: "Writing",
    title: "Gen AI is tearing up the UX map",
    blurb: "On what generative interfaces do to the maps designers have relied on.",
    href: "https://www.linkedin.com/posts/tannmaysgupta_activity-7348942803697049602-MPS5",
    size: "sm",
  },
  {
    id: "vaatun-suite",
    eyebrow: "Vaatun",
    title: "VUEx · EnAct · RAA",
    blurb: "Pre-sales intelligence, workflow automation, and standardised risk assessment.",
    href: "https://www.vaatun.com",
    size: "sm",
    accent: "vaatun",
  },
  {
    id: "mobile-vr-ux",
    eyebrow: "Research · 2020",
    title: "UX of Mobile VR",
    blurb:
      "How experience design can carry immersive learning despite the gaps in mobile VR hardware.",
    size: "sm",
  },
  {
    id: "design-archive",
    eyebrow: "Archive · 2019–20",
    title: "Branding, UI and illustration",
    blurb:
      "Loh Pizza, Outcampus, Kifaru Steel, GROWCASH, BEACON, Medico, Fight Against Covid, and a Women's Day illustration.",
    href: "https://www.behance.net/tannmaysgupta",
    // Wide, so the nine tiles fill a 4-column grid exactly with no orphan cell.
    size: "wide",
  },
];
