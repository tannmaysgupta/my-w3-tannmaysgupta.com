import { WorkBento } from "@/components/bento/work-bento";
import { Hero } from "@/components/hero/hero";
import { Section } from "@/components/layout/section";
import { FadeIn } from "@/components/motion/fade-in";
import { AboutSection } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/contact";
import { EducationSection } from "@/components/sections/education";
import { WritingTeaser } from "@/components/sections/writing-teaser";
import { ExperienceTimeline } from "@/components/timeline/experience-timeline";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />

      {/* Timeline before the bento: the hero makes a claim, the timeline
          substantiates it, and the bento rewards someone already bought in. */}
      <Section
        id="experience"
        number="01"
        title="Experience"
        description="From a delivery-partner funnel at Zomato to an AI-native insurance suite."
      >
        <ExperienceTimeline />
      </Section>

      <Section
        id="work"
        number="02"
        title="Work & things I've made"
        description="Products, service design, a research paper, a comic, and a decade of branding kept in one archive."
      >
        <FadeIn>
          <WorkBento />
        </FadeIn>
      </Section>

      <Section
        id="education"
        number="03"
        title="Education & credentials"
        description="Computer science by training, insurance by examination."
      >
        <FadeIn>
          <EducationSection />
        </FadeIn>
      </Section>

      <Section id="writing" number="04" title="Writing">
        <FadeIn>
          <WritingTeaser />
        </FadeIn>
      </Section>

      <ContactSection />
    </>
  );
}
