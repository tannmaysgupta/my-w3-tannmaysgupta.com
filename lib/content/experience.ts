import type { Experience } from "./types";

/**
 * Dates follow LinkedIn, with Tannmay's corrections applied on top.
 *
 * Deliberately omitted: the part-time PrishaPolicy "Design & Technology
 * Consultant" role (Sep 2020 – Apr 2022) shown on LinkedIn. Dropping it gives
 * PrishaPolicy a clean three-year full-time arc and keeps the timeline strictly
 * linear. The remaining Zuddl/ICICI overlap is a short internship tail.
 */
export const experience: Experience[] = [
  {
    org: "Vaatun",
    orgUrl: "https://www.vaatun.com",
    location: "India",
    roles: [
      {
        title: "Co-Founder & CEO",
        start: "2025-03",
        end: null,
        employment: "Full-time",
        mode: "Hybrid",
        summary:
          "Building AI-native software for insurance intermediaries — blending advanced AI with intuitive UX so brokers, agents and corporate clients can streamline workflows and unlock new growth.",
        highlights: [
          "Vantage — the AI-powered ERP-CRM built for insurance pros.",
          "Advantage — the client-facing portal that wows.",
          "VUEx, EnAct and RAA round out the suite across pre-sales, workflow automation and risk assessment.",
        ],
      },
    ],
  },
  {
    org: "PrishaPolicy",
    location: "Gurugram, Haryana",
    roles: [
      {
        title: "Head of Product & Strategy",
        start: "2024-04",
        end: "2025-04",
        employment: "Full-time",
        mode: "On-site",
        highlights: [
          "Led new initiatives for strategic tie-ups and event marketing.",
          "Oversaw compliance enhancements in the ERM system.",
          "Directed development of the client portal for EB policies and POSPs.",
        ],
      },
      {
        title: "Product Manager",
        start: "2022-04",
        end: "2024-03",
        employment: "Full-time",
        highlights: [
          "Initiated and led development of an in-house ERM tool.",
          "Collaborated with insurers to integrate their APIs.",
          "Built a policy management tool that streamlined day-to-day operations.",
        ],
      },
    ],
  },
  {
    org: "Zuddl",
    location: "Remote — Hyderabad",
    roles: [
      {
        title: "Product Designer",
        start: "2021-01",
        end: "2022-05",
        employment: "Full-time",
        mode: "Remote",
        highlights: [
          "Built Zuddl's design system from scratch and kept it coherent as the platform grew.",
          "Owned the design and user experience of the events admin portal.",
          "Worked with customer success and sales to make setting up an event feel effortless.",
        ],
      },
    ],
  },
  {
    org: "ICICI Lombard",
    location: "Remote — Mumbai",
    roles: [
      {
        title: "Project Management Intern",
        start: "2020-11",
        end: "2021-03",
        employment: "Internship",
        mode: "Remote",
        highlights: [
          "Analysis and strategy for growing the SME line of business.",
          "Designed and shipped pages enabling direct SME insurance transactions.",
          "Built the 'Become an Agent' onboarding workflow for the SME site.",
        ],
      },
    ],
  },
  {
    org: "Outcampus",
    location: "Remote — Gurgaon",
    roles: [
      {
        title: "Product Design & Growth Consultant",
        start: "2020-05",
        end: "2020-10",
        employment: "Consultant",
        mode: "Remote",
        summary:
          "Designed the core application's interface and interaction model, wrote the branding guidelines, and worked with marketing through launch.",
      },
    ],
  },
  {
    org: "Zomato",
    location: "Gurgaon",
    roles: [
      {
        title: "Product Design Intern",
        start: "2019-05",
        end: "2019-10",
        employment: "Internship",
        mode: "Hybrid",
        modeNote: "2 months on-site, then remote",
        summary:
          "Service design for delivery-partner acquisition as Zomato expanded into 200 new cities, plus a mental wellbeing report made with the in-house psychologists.",
      },
    ],
  },
  {
    org: "Amazon India",
    roles: [
      {
        title: "Alexa Student Influencer",
        start: "2018-12",
        end: "2019-12",
        mode: "Remote",
        summary:
          "Grew a community of Alexa skill developers across my university and nearby campuses, and ran skill-building workshops.",
      },
    ],
  },
  {
    org: "Student Technical Community, VIT",
    location: "Vellore",
    roles: [
      {
        title: "President",
        start: "2018-11",
        end: "2019-10",
        summary:
          "Mentored 30+ students across interdisciplinary projects and grew a community that ran its own sessions and conferences.",
      },
    ],
  },
  {
    org: "InsightPLM",
    location: "Gurgaon",
    roles: [
      {
        title: "Web Development Intern",
        start: "2018-06",
        end: "2018-07",
        employment: "Internship",
        mode: "On-site",
        summary:
          "Built pages of PLM Cloud with the Oracle JET toolkit and fixed bugs across the site.",
      },
    ],
  },
];
