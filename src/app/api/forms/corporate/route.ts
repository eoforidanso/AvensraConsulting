import { z } from "zod";
import { handleForm } from "@/lib/forms";
import { emailShell, p, small } from "@/lib/mail";
import { esc } from "@/lib/escape";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  role: z.string().trim().max(160).optional().or(z.literal("")),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  organisation: z.string().trim().min(2, "Please enter your organisation.").max(160),
  country: z.string().trim().max(120).optional().or(z.literal("")),
  enquiryType: z.enum([
    "Facilitated experience",
    "Corporate licence",
    "Not sure yet",
  ]),
  format: z
    .enum(["30 minutes", "45 minutes", "60 minutes", "Custom / 21+ participants"])
    .optional(),
  participants: z.string().trim().max(60).optional().or(z.literal("")),
  delivery: z.enum(["In person", "Online", "Either"]).optional(),
  timing: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().max(4000).optional().or(z.literal("")),
  honeypot: z.string().optional(),
});

export async function POST(request: Request) {
  return handleForm(request, {
    collection: "corporate",
    schema,
    limit: 4,
    subject: (d) => `Corporate enquiry — ${d.organisation} (${d.enquiryType})`,
    summary: (d) => [
      ["Organisation", d.organisation],
      ["Contact", d.name],
      ["Role", d.role || "—"],
      ["Email", d.email],
      ["Country", d.country || "—"],
      ["Enquiry type", d.enquiryType],
      ["Format", d.format || "—"],
      ["Participants", d.participants || "—"],
      ["Delivery", d.delivery || "—"],
      ["Timing", d.timing || "—"],
      ["Notes", d.message || "—"],
    ],
    autoReply: (d) => ({
      to: d.email,
      subject: "Your corporate enquiry — Avensra Consulting",
      html: emailShell(
        "Thank you for your enquiry",
        [
          p(`Hello ${esc(d.name.split(" ")[0])},`),
          p(
            `Thank you for your interest in Avensra for ${esc(d.organisation)}. We have received your enquiry and will come back to you with a quotation and available dates.`,
          ),
          p(
            "If it would help to talk it through first, reply to this email and we will arrange a short call.",
          ),
          small(
            "Corporate experiences, quotations and licence administration are arranged directly with Avensra.",
          ),
        ].join(""),
      ),
    }),
  });
}
