import { z } from "zod";
import { handleForm } from "@/lib/forms";
import { emailShell, p, small } from "@/lib/mail";
import { esc } from "@/lib/escape";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  organisation: z.string().trim().max(160).optional().or(z.literal("")),
  role: z.string().trim().max(160).optional().or(z.literal("")),
  product: z.enum([
    "Business-to-People Alignment System™",
    "The Executive Reset™",
    "Corporate experience",
    "Consulting",
  ]),
  rating: z.coerce.number().int().min(1).max(5),
  feedback: z.string().trim().min(10, "Please tell us a little more.").max(4000),
  /** Explicit, separate consent — nothing is published without it. */
  consentToPublish: z.boolean(),
  consentToName: z.boolean().optional(),
  honeypot: z.string().optional(),
});

export async function POST(request: Request) {
  return handleForm(request, {
    collection: "feedback",
    schema,
    limit: 3,
    subject: (d) => `Feedback — ${d.product} (${d.rating}/5)`,
    summary: (d) => [
      ["Product", d.product],
      ["Rating", `${d.rating} / 5`],
      ["Name", d.name],
      ["Email", d.email],
      ["Organisation", d.organisation || "—"],
      ["Role", d.role || "—"],
      ["Feedback", d.feedback],
      ["May we publish this?", d.consentToPublish ? "YES" : "No"],
      [
        "May we use their name?",
        d.consentToPublish ? (d.consentToName ? "YES" : "Anonymous only") : "n/a",
      ],
      [
        "Action",
        d.consentToPublish
          ? "Review and, if approved, publish manually as a testimonial."
          : "Internal use only — do not publish.",
      ],
    ],
    autoReply: (d) => ({
      to: d.email,
      subject: "Thank you for your feedback — Emmanus Plus Consulting",
      html: emailShell(
        "Thank you for your feedback",
        [
          p(`Hello ${esc(d.name.split(" ")[0])},`),
          p(
            "Thank you for taking the time to tell us about your experience. Feedback like yours is what shapes what we build next.",
          ),
          d.consentToPublish
            ? small(
                "You have told us we may share your feedback publicly. Nothing is published automatically — we review every response first, and we will only use it in the form you agreed to.",
              )
            : small(
                "You have told us this is for Emmanus Plus only, so we will not publish it. If you change your mind, just reply to this email.",
              ),
        ].join(""),
      ),
    }),
  });
}
