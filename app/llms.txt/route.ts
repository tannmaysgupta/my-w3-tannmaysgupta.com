import { certifications, education } from "@/lib/content/education";
import { experience } from "@/lib/content/experience";
import { contact, profile, socials } from "@/lib/content/profile";
import { projects } from "@/lib/content/projects";
import { formatRange } from "@/lib/dates";
import { getAllPosts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

/**
 * A machine-readable profile, in the spirit of the press kit on vaatun.com.
 * Agents and crawlers get the same facts as a human reader without having to
 * parse the layout to find them.
 */
export function GET() {
  const roles = experience.flatMap((org) =>
    org.roles.map(
      (role) =>
        `- ${role.title}, ${org.org} (${formatRange(role.start, role.end)})${
          role.mode ? ` — ${role.mode}` : ""
        }`,
    ),
  );

  const work = projects.map(
    (project) => `- ${project.title} — ${project.blurb}${project.href ? ` (${project.href})` : ""}`,
  );

  const posts = getAllPosts().map(
    (post) => `- [${post.title}](${absoluteUrl(`/writing/${post.slug}`)}) — ${post.date}`,
  );

  const certs = certifications.flatMap((group) =>
    group.items.map(
      (item) => `- ${group.issuer}: ${item.name}${item.meta ? ` (${item.meta})` : ""}`,
    ),
  );

  const body = `# ${profile.name}

> ${profile.tagline}

${profile.role} at ${profile.company} (${profile.companyUrl}). Based in ${profile.location}.
Pronouns: ${profile.pronouns}.

## About

${profile.about.join("\n\n")}

## Experience

${roles.join("\n")}

## Education

${education.map((item) => `- ${item.qualification}, ${item.school} (${item.period})`).join("\n")}

## Certifications

${certs.join("\n")}

## Selected work

${work.join("\n")}

## Writing

${posts.length > 0 ? posts.join("\n") : "- Nothing published yet."}

## Skills

${profile.skills.join(", ")}

## Contact

- Email: ${contact.email}
${socials.map((social) => `- ${social.label}: ${social.href}`).join("\n")}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
