import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { FeedbackForm } from "@/components/forms/FeedbackForm";
import { Reveal } from "@/components/Reveal";
import { Section, Card, Rule } from "@/components/ui";

export const metadata: Metadata = {
  title: "Share Your Feedback",
  description:
    "Tell Avensra about your experience with our digital products, corporate experiences or consulting. Nothing is published without your explicit permission.",
  alternates: { canonical: "/feedback" },
  robots: { index: true, follow: true },
};

export default function FeedbackPage() {
  return (
    <>
      <PageHero
        eyebrow="Feedback"
        title={
          <>
            Tell us what
            <span className="block text-gold">actually happened</span>
          </>
        }
        lead="Honest feedback is more useful to us than kind feedback. If something did not work, we would rather hear it from you than not hear it at all."
      />

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <Reveal>
            <Card tone="ivory" className="p-8 sm:p-10">
              <h2 className="font-heading text-2xl text-navy">Your feedback</h2>
              <Rule className="my-5" />
              <FeedbackForm />
            </Card>
          </Reveal>

          <Reveal delay={100} className="space-y-6">
            <Card tone="ivory" className="p-7">
              <h3 className="font-heading text-lg text-navy">
                Nothing is published automatically
              </h3>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-charcoal/75">
                We only publish feedback where you have explicitly told us we may, and even
                then a person at Avensra reviews it first. You choose separately whether
                your name may be used.
              </p>
            </Card>

            <Card tone="ivory" className="p-7">
              <h3 className="font-heading text-lg text-navy">Changed your mind?</h3>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-charcoal/75">
                Permission can be withdrawn at any time. Email us and we will remove your
                feedback from anywhere it appears.
              </p>
            </Card>

            <Card tone="ivory" className="p-7">
              <h3 className="font-heading text-lg text-navy">Need help instead?</h3>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-charcoal/75">
                This form is for feedback, so it is not monitored for urgent support. If
                you have a problem accessing something you bought, use the{" "}
                <a href="/contact" className="text-gold underline underline-offset-2">
                  contact form
                </a>{" "}
                and choose Product support.
              </p>
            </Card>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
