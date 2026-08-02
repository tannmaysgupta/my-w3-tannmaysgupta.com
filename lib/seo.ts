import type { Metadata } from "next";
import { profile, SITE_URL, socials } from "./content/profile";

export function absoluteUrl(pathname = "/"): string {
  return new URL(pathname, SITE_URL).toString();
}

export function buildMetadata({
  title,
  description = profile.tagline,
  pathname = "/",
}: {
  title?: string;
  description?: string;
  pathname?: string;
}): Metadata {
  const url = absoluteUrl(pathname);
  const fullTitle = title ? `${title} — ${profile.name}` : `${profile.name} — ${profile.role}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: profile.name,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      creator: "@tannmaysgupta",
    },
  };
}

/** schema.org Person — also what agents and search engines read first. */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: SITE_URL,
    jobTitle: profile.role,
    description: profile.tagline,
    worksFor: {
      "@type": "Organization",
      name: profile.company,
      url: profile.companyUrl,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Gurgaon",
      addressRegion: "Haryana",
      addressCountry: "IN",
    },
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Vellore Institute of Technology",
      },
      { "@type": "HighSchool", name: "Amity International School, Saket" },
    ],
    knowsAbout: [...profile.skills],
    sameAs: socials.map((social) => social.href),
  };
}
