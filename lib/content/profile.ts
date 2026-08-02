/**
 * Single source of truth for who this site is about.
 * Consumed by the hero, footer, resume, contact section, OG images, JSON-LD
 * and /llms.txt — change it here and it changes everywhere.
 *
 * Deliberately absent: home address, date of birth and phone number. They
 * appear on the PDF resume handed to employers; they do not belong on a public
 * website or in a public git repo, where they cannot be recalled once indexed.
 */

export const SITE_URL = "https://www.tannmaysgupta.com";

export const profile = {
  name: "Tannmay S Gupta",
  shortName: "Tannmay",
  role: "Co-Founder & CEO",
  company: "Vaatun",
  companyUrl: "https://www.vaatun.com",
  location: "Gurgaon, India",
  pronouns: "he/him",

  /** The one claim the whole page rests on. */
  headline: "I build software for the people who move insurance.",
  subline: "…all while on my own journey to becoming an insurance aficionado.",

  /** Used for meta description and OG cards — one sentence, no line breaks. */
  tagline:
    "Co-Founder & CEO at Vaatun, building AI-native software for insurance intermediaries. Previously PrishaPolicy, Zuddl, ICICI Lombard and Zomato.",

  about: [
    "In a nutshell, I'm still just an enthusiast on a journey to become an insurance aficionado — on a mission to transform the global insurance landscape by leveraging cutting-edge AI and intuitive UX design. At Vaatun, we build the systems that empower intermediaries and redefine how insurance is experienced: Vantage, the AI-powered ERP-CRM built for insurance pros, and Advantage, the client-facing portal that wows.",
    "Before this, across three years at PrishaPolicy, I grew from Product Manager to Head of Product & Strategy — learning the processes and intricacies behind insurance broking in India from the inside out.",
    "In my earlier roles I navigated product design and development as a Product Designer at Zuddl and across projects at ICICI Lombard. My design internships at Zomato and Outcampus honed my expertise at the intersection of technology, design, and user-centric innovation.",
    "Passionate about creating solutions that exceed expectations, I thrive on turning complex processes into seamless experiences.",
  ],

  skills: [
    "Creative Problem Solving",
    "Product Innovation",
    "Insurance",
    "Experience Design",
    "Strategic Leadership",
  ],
} as const;

export const contact = {
  /** Personal inbox, with the work address cc'd. */
  email: "tannmaysgupta@gmail.com",
  cc: "tannmaysgupta@vaatun.com",
  get mailto() {
    return `mailto:${this.email}?cc=${this.cc}`;
  },
} as const;

export const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tannmaysgupta/",
    handle: "tannmaysgupta",
  },
  {
    label: "GitHub",
    href: "https://github.com/tannmaysgupta",
    handle: "tannmaysgupta",
  },
  {
    label: "Behance",
    href: "https://www.behance.net/tannmaysgupta",
    handle: "tannmaysgupta",
  },
  {
    label: "Dribbble",
    href: "https://dribbble.com/tannmaysgupta",
    handle: "tannmaysgupta",
  },
  { label: "X", href: "https://x.com/tannmaysgupta", handle: "tannmaysgupta" },
] as const;
