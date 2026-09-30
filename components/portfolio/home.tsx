import { ArrowDown, ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BookingCalendar } from "@/components/portfolio/booking-calendar";
import { Opening } from "@/components/portfolio/opening";
import { chapters } from "@/lib/content/chapters";
import { certifications, education } from "@/lib/content/education";
import { experience } from "@/lib/content/experience";
import { contact, profile, socials } from "@/lib/content/profile";
import { projects } from "@/lib/content/projects";
import { formatPostDate, getAllPosts } from "@/lib/posts";

const featuredCourses = new Set(["Design Principles: an Introduction", "Data Visualization"]);
const featuredLearning = certifications
  .map((group) => ({
    ...group,
    items: group.items.filter(
      (item) => group.issuer === "Insurance Institute of India" || featuredCourses.has(item.name),
    ),
  }))
  .filter((group) => group.items.length > 0);
const moreLearning = certifications
  .map((group) => ({
    ...group,
    items: group.items.filter(
      (item) => group.issuer !== "Insurance Institute of India" && !featuredCourses.has(item.name),
    ),
  }))
  .filter((group) => group.items.length > 0);

function ChapterArt({ kind }: { kind: string }) {
  return (
    <div className={`chapter-art art-${kind}`} aria-hidden="true">
      {kind === "quotes" ? (
        <span>“</span>
      ) : kind === "spark" ? (
        <span>✳</span>
      ) : (
        <>
          <i />
          <i />
          <i />
          <i />
        </>
      )}
    </div>
  );
}

function ChapterLabel({ number, name, aside }: { number: string; name: string; aside: string }) {
  return (
    <div className="chapter-label micro">
      <span>
        {number} / {name}
      </span>
      <span>{aside}</span>
    </div>
  );
}

function ExternalArrow() {
  return <ArrowUpRight className="external-arrow" size={24} strokeWidth={1.5} aria-hidden="true" />;
}

export function PortfolioHome() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <div className="portfolio">
      <Opening />
      <section id="index" className="chapter-index" aria-labelledby="index-title">
        <div className="index-heading">
          <h2 id="index-title">A few sides of the same person.</h2>
          <span className="micro">Six chapters. One curious mind.</span>
        </div>
        <div className="chapter-grid">
          {chapters.map((chapter) => (
            <a
              className={`chapter-tile palette-${chapter.id}`}
              href={`#${chapter.id}`}
              key={chapter.id}
            >
              <div className="tile-top">
                <span>{chapter.label}</span>
                <span className="micro">{chapter.number}</span>
              </div>
              <ChapterArt kind={chapter.art} />
              <div className="tile-bottom">
                <span>{chapter.note}</span>
                <ArrowUpRight size={25} strokeWidth={1.5} aria-hidden="true" />
              </div>
            </a>
          ))}
          <div className="index-center" aria-hidden="true">
            &amp;
          </div>
        </div>
        <div className="index-foot micro">
          <span>Product &amp; design &amp; insurance &amp; everything in between.</span>
          <ArrowDown size={18} aria-hidden="true" />
        </div>
      </section>

      <section id="about" className="chapter palette-about" aria-labelledby="about-title">
        <ChapterLabel number="01" name="About" aside="Gurgaon, India · Building at Vaatun" />
        <div className="about-headline">
          <h2 id="about-title">
            Serious about
            <br />
            making things
            <br />
            <em>feel simple.</em>
          </h2>
          <div className="intersection-art">
            <span>Product</span>
            <span>Design</span>
            <span>Insurance</span>
            <b aria-hidden="true">&amp;</b>
          </div>
        </div>
        <div className="about-story">
          <p className="section-aside">
            A little context.
            <br />A lot of curiosity.
          </p>
          <div>
            {profile.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <ul className="about-skills" aria-label="Areas of focus">
              {profile.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="principle-row">
          <span>01 / Start with people.</span>
          <span>02 / Question the obvious.</span>
          <span>03 / Care about the details.</span>
        </div>
      </section>

      <section
        id="experience"
        className="chapter palette-experience"
        aria-labelledby="experience-title"
      >
        <ChapterLabel number="02" name="Experience" aside="2018 — The story so far" />
        <div className="chapter-heading">
          <h2 id="experience-title">
            Every chapter
            <br />
            <em>adds something.</em>
          </h2>
          <p>
            From designing the details
            <br />
            to taking responsibility for the whole.
          </p>
        </div>
        <div className="experience-list">
          {experience.map((job, i) => {
            const first = job.roles[0];
            const last = job.roles[job.roles.length - 1];
            return (
              <details className="experience-entry" key={job.org} open={i === 0}>
                <summary>
                  <span className="experience-years">
                    {last.start.slice(0, 4)} — {first.end?.slice(0, 4) ?? "Now"}
                  </span>
                  <span className="experience-company">
                    {job.orgLogo && (
                      <Image
                        className="experience-logo"
                        src={job.orgLogo}
                        alt=""
                        width={56}
                        height={56}
                        sizes="(max-width: 600px) 40px, 56px"
                      />
                    )}
                    <span>{job.org}</span>
                  </span>
                  <span className="experience-title">
                    {first.title}
                    {job.roles.length > 1 && <small>Previously {last.title}</small>}
                  </span>
                  <Plus size={22} strokeWidth={1.4} className="details-plus" aria-hidden="true" />
                </summary>
                <div className="experience-detail">
                  {job.roles.map((role) => (
                    <div key={role.title}>
                      {job.roles.length > 1 && (
                        <h3>
                          {role.title}{" "}
                          <small>
                            {role.start} — {role.end ?? "Present"}
                          </small>
                        </h3>
                      )}
                      {role.summary && <p>{role.summary}</p>}
                      {role.highlights && (
                        <ul>
                          {role.highlights.map((highlight) => (
                            <li key={highlight}>{highlight}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                  {job.orgUrl && (
                    <a
                      href={job.orgUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link"
                    >
                      Visit {job.org}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </details>
            );
          })}
        </div>
        <Link href="/resume" className="chapter-cta">
          The full résumé <ArrowUpRight size={20} aria-hidden="true" />
        </Link>
      </section>

      <section id="work" className="chapter palette-work" aria-labelledby="work-title">
        <ChapterLabel number="03" name="Work" aside="A selection of things put into the world" />
        <div className="chapter-heading">
          <h2 id="work-title">
            Complexity,
            <br />
            <em>made useful.</em>
          </h2>
          <p>
            Products and experiences.
            <br />
            Built with intent.
          </p>
        </div>
        <div className="featured-work">
          <a
            className="work-feature work-vantage"
            href="https://www.vaatun.com/vantage"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="work-caption micro">
              <span>Vaatun / Product</span>
              <ExternalArrow />
            </div>
            <div className="product-art product-art-vantage" aria-hidden="true">
              <div className="document-lines">
                <i />
                <i />
                <i />
              </div>
              <span className="product-connector" />
              <div className="product-core">V</div>
              <span className="product-connector" />
              <div className="result-lines">
                <i />
                <i />
                <i />
              </div>
            </div>
            <h3>Vantage</h3>
            <p>
              The operating system for
              <br />
              people who know insurance.
            </p>
            <span className="work-description">
              AI-powered ERP-CRM. From policy documents to a clearer picture of the business.
            </span>
          </a>
          <a
            className="work-feature work-advantage"
            href="https://www.vaatun.com/advantage"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="work-caption micro">
              <span>Vaatun / Experience</span>
              <ExternalArrow />
            </div>
            <div className="product-art product-art-advantage" aria-hidden="true">
              <div className="portal-ring" />
              <div className="portal-card">
                <span>Covered.</span>
                <i />
                <i />
                <b>✓</b>
              </div>
            </div>
            <h3>Advantage</h3>
            <p>
              Less chasing.
              <br />
              More peace of mind.
            </p>
            <span className="work-description">
              A client portal for benefits, health cards, and claims. Clarity on the other side of
              the policy.
            </span>
          </a>
        </div>
        <div className="work-row-list">
          {projects
            .filter((project) => !["vantage", "advantage"].includes(project.id))
            .map((project) => (
              <div className="work-row" key={project.id}>
                <span className="micro">{project.eyebrow}</span>
                <div>
                  <h3>
                    {project.href ? (
                      <a href={project.href} target="_blank" rel="noopener noreferrer">
                        {project.title}
                        <ArrowUpRight size={20} aria-hidden="true" />
                      </a>
                    ) : (
                      project.title
                    )}
                  </h3>
                  <p>{project.detail ?? project.blurb}</p>
                </div>
              </div>
            ))}
        </div>
      </section>

      <section
        id="education"
        className="chapter palette-education"
        aria-labelledby="education-title"
      >
        <ChapterLabel number="04" name="Education" aside="A foundation, never a finish line" />
        <div className="education-intro">
          <h2 id="education-title">
            Forever
            <br />
            <em>a student.</em>
          </h2>
          <div>
            <p className="chapter-lead">
              Computer science by training.
              <br />
              Insurance by examination.
              <br />
              Curiosity by default.
            </p>
            <ChapterArt kind="pages" />
          </div>
        </div>
        <div className="education-grid">
          <div>
            <h3 className="micro column-label">Formal foundations</h3>
            {education.map((item) => (
              <article className="education-item" key={item.school}>
                <span className="micro">{item.period}</span>
                <h4>{item.school}</h4>
                <p>{item.qualification}</p>
                <p className="education-note">{item.notes?.[0]}</p>
              </article>
            ))}
          </div>
          <div>
            <h3 className="micro column-label">Industry & design</h3>
            {featuredLearning.map((group) => (
              <article className="education-item" key={group.issuer}>
                <h4>{group.issuer}</h4>
                <ul>
                  {group.items.map((item) => (
                    <li key={`${item.name}-${item.meta}`}>
                      <span>{item.name}</span>
                      <small>{item.meta}</small>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
        <details className="more-learning">
          <summary>
            <span>And a few other things I’ve learned along the way</span>
            <Plus size={20} className="details-plus" aria-hidden="true" />
          </summary>
          <div>
            {moreLearning.map((group) => (
              <article key={group.issuer}>
                <h4>{group.issuer}</h4>
                {group.items.map((item) => (
                  <p key={item.name}>
                    {item.name} <small>{item.meta}</small>
                  </p>
                ))}
              </article>
            ))}
          </div>
        </details>
      </section>

      <section id="writing" className="chapter palette-writing" aria-labelledby="writing-title">
        <ChapterLabel number="05" name="Writing" aside="Notes from the intersection" />
        <div className="chapter-heading">
          <h2 id="writing-title">
            Thinking,
            <br />
            <em>out loud.</em>
          </h2>
          <p>
            Product, design, insurance, AI.
            <br />
            And the interesting space between.
          </p>
        </div>
        <a
          className="published-note"
          href="https://www.linkedin.com/posts/tannmaysgupta_activity-7348942803697049602-MPS5"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="micro">Published on LinkedIn / AI &amp; UX</span>
          <h3>
            Gen AI is tearing
            <br />
            up the UX map.
          </h3>
          <div>
            <p>What happens when the interface stops following the paths we drew?</p>
            <span className="round-arrow">
              <ExternalArrow />
            </span>
          </div>
          <span className="note-quote" aria-hidden="true">
            “
          </span>
        </a>
        {posts.length > 0 && (
          <div className="writing-list">
            {posts.map((post) => (
              <Link href={`/writing/${post.slug}`} className="writing-row" key={post.slug}>
                <div>
                  <span className="micro">
                    {post.draft ? "Draft / Preview" : formatPostDate(post.date)}
                  </span>
                  <h3>{post.title}</h3>
                </div>
                <ExternalArrow />
              </Link>
            ))}
          </div>
        )}
        <Link href="/writing" className="chapter-cta">
          Visit the notebook <ArrowRight size={20} aria-hidden="true" />
        </Link>
      </section>

      <section id="contact" className="chapter palette-contact" aria-labelledby="contact-title">
        <ChapterLabel number="06" name="Contact" aside="An open invitation" />
        <div className="contact-heading">
          <h2 id="contact-title">
            The next good
            <br />
            thing starts with
            <br />
            <em>a conversation.</em>
          </h2>
          <span className="contact-asterisk" aria-hidden="true">
            ✳
          </span>
        </div>
        <div className="contact-bottom">
          <div>
            <p>
              Building something meaningful?
              <br />
              Have a complicated problem, a good idea,
              <br />
              or a different point of view?
            </p>
            <a className="contact-email" href="#book-a-conversation">
              Let’s talk <ArrowDown size={38} strokeWidth={1.3} aria-hidden="true" />
            </a>
            <a className="email-address" href={contact.mailto}>
              {contact.email}
            </a>
          </div>
          <ul className="contact-socials">
            {socials.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  {social.label}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <BookingCalendar />
        <footer className="portfolio-footer micro">
          <span>Tannmay S Gupta · Gurgaon, India</span>
          <span>Thoughtfully made. Always becoming.</span>
          <a href="#main">Back to the top ↑</a>
        </footer>
      </section>
    </div>
  );
}
