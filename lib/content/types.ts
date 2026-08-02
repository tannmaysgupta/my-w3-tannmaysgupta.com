export type EmploymentType = "Full-time" | "Part-time" | "Internship" | "Consultant";

export type WorkMode = "On-site" | "Remote" | "Hybrid";

export type Role = {
  title: string;
  /** "YYYY-MM" */
  start: string;
  /** "YYYY-MM", or null for present. */
  end: string | null;
  employment?: EmploymentType;
  mode?: WorkMode;
  /** Nuance the badge can't carry, e.g. "2 months on-site, then remote". */
  modeNote?: string;
  summary?: string;
  highlights?: string[];
};

export type Experience = {
  org: string;
  orgUrl?: string;
  location?: string;
  roles: Role[];
};

/**
 * Tile footprint in the bento grid. Kept to four named shapes rather than raw
 * span classes so the grid stays coherent as tiles are added or reordered.
 */
export type TileSize = "sm" | "wide" | "tall" | "lg";

export type Project = {
  id: string;
  eyebrow: string;
  title: string;
  blurb: string;
  /** Revealed on hover/focus; always visible on touch, where there is no hover. */
  detail?: string;
  href?: string;
  size: TileSize;
  /** Vaatun surfaces borrow the company's violet; everything else stays sage. */
  accent?: "sage" | "vaatun";
};

export type Education = {
  school: string;
  qualification: string;
  period: string;
  notes?: string[];
};

export type CertificationGroup = {
  issuer: string;
  items: { name: string; meta?: string }[];
};
