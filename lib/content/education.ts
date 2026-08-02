import type { CertificationGroup, Education } from "./types";

export const education: Education[] = [
  {
    school: "Vellore Institute of Technology",
    qualification: "B.Tech, Computer Science Engineering",
    period: "2016 – 2020",
    notes: [
      "Graduated with a CGPA of 8.30.",
      "Led the Microsoft Student Technical Community as community lead.",
      "Volunteered with CRY and Make a Difference for underprivileged children in Vellore.",
    ],
  },
  {
    school: "Amity International School, Saket",
    qualification: "Class XII",
    period: "2016",
    notes: ["Passed with 86.4%.", "Took part in interschool science debate competitions."],
  },
];

/**
 * Paper titles use the Insurance Institute of India's official catalogue
 * wording. IC-57 and IC-86 are Associateship-level papers, not Licentiate, so
 * they are listed separately — filing them under Licentiate would read as an
 * error to anyone in the industry.
 */
export const certifications: CertificationGroup[] = [
  {
    issuer: "Insurance Institute of India",
    items: [
      { name: "Licentiate", meta: "IC-01 Principles of Insurance" },
      { name: "Licentiate", meta: "IC-02 Practice of Life Insurance" },
      { name: "Licentiate", meta: "IC-11 Practice of General Insurance" },
      {
        name: "Associateship paper",
        meta: "IC-57 Fire and Consequential Loss Insurance",
      },
      { name: "Associateship paper", meta: "IC-86 Risk Management" },
    ],
  },
  {
    issuer: "National Insurance Academy",
    items: [{ name: "Qualified as PO / BQP", meta: "June 2023" }],
  },
  {
    issuer: "Coursera",
    items: [
      { name: "Design Principles: an Introduction", meta: "July 2020" },
      { name: "Introduction to Cyber Attacks", meta: "November 2019" },
      { name: "Data Visualization", meta: "April 2019" },
      { name: "Object Oriented Programming in Java", meta: "April 2019" },
      { name: "Fundamentals of Network Communication", meta: "March 2018" },
    ],
  },
  {
    issuer: "School of Innovation, Facebook",
    items: [{ name: "SparkAR Program", meta: "July 2019" }],
  },
  {
    issuer: "Goethe-Institut",
    items: [
      { name: "FIT in Deutsch 1", meta: "July 2013" },
      { name: "FIT in Deutsch 2", meta: "November 2014" },
    ],
  },
];
