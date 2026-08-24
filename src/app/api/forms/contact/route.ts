import { z } from "zod";
import { handleForm } from "@/lib/forms";
import { emailShell, p, small } from "@/lib/mail";
import { esc } from "@/lib/escape";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  organisation: z.string().trim().max(160).optional().or(z.literal("")),
  topic: z.enum([
    "Digital products",
    "Product support",
    "Corporate experiences",
    "Corporate licensing",
    "Consulting",
    "Something else",
  ]),
  orderReference: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Please tell us a little more.").max(4000),
  honeypot: z.string().max(0).optional().or(z.string()),
});

export async function POST(request: Request) {
  return handleForm(request, {
    collection: "contact",
    schema,
    subject: (d) => `Contact enquiry — ${d.topic} (${d.name})`,
    summary: (d) => [
      ["Name", d.name],
      ["Email", d.email],
      ["Organisation", d.organisation || "—"],
      ["Topic", d.topic],
      ["Order reference", d.orderReference || "—"],
      ["Message", d.message],
    ],
    autoReply: (d) => ({
      to: d.email,
      subject: "We have received your message — Avensra Consulting",
      html: emailShell(
        "Thank you for getting in touch",
        [
          p(`Hello ${esc(d.name.split(" ")[0])},`),
          p(
            "We have received your message and someone from Avensra will come back to you. We aim to respond within one business day, and within two at the latest.",
          ),
          small(
            `For reference, this is what you sent us:<br><em>${esc(d.message).replace(/\n/g, "<br>")}</em>`,
          ),
          small(
            `If your message is about access to a product you have purchased, please reply with your order reference so we can find it quickly. You can also reach us at ${esc(site.supportEmail)}.`,
          ),
        ].join(""),
      ),
    }),
  });
}
