"use client";

import { useState } from "react";
import { Button, Arrow } from "@/components/ui";
import {
  Field,
  Input,
  Textarea,
  Select,
  Honeypot,
  FormStatus,
  postForm,
  type FormState,
} from "./fields";

const enquiryTypes = [
  "Facilitated experience",
  "Corporate licence",
  "Not sure yet",
] as const;
const formats = [
  "30 minutes",
  "45 minutes",
  "60 minutes",
  "Custom / 21+ participants",
] as const;
const deliveries = ["In person", "Online", "Either"] as const;

export function CorporateForm({ defaultFormat }: { defaultFormat?: string }) {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string>();
  const [honeypot, setHoneypot] = useState("");
  const [enquiryType, setEnquiryType] = useState<string>(enquiryTypes[0]);

  const showFormat = enquiryType !== "Corporate licence";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setError(undefined);

    const f = new FormData(event.currentTarget);
    const result = await postForm("/api/forms/corporate", {
      name: f.get("name"),
      role: f.get("role") ?? "",
      email: f.get("email"),
      organisation: f.get("organisation"),
      country: f.get("country") ?? "",
      enquiryType: f.get("enquiryType"),
      format: showFormat ? (f.get("format") ?? undefined) : undefined,
      participants: f.get("participants") ?? "",
      delivery: f.get("delivery") ?? undefined,
      timing: f.get("timing") ?? "",
      message: f.get("message") ?? "",
      honeypot,
    });

    if (result.ok) {
      setState("success");
    } else {
      setError(result.error);
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <FormStatus
        state="success"
        successTitle="Thank you — we have your enquiry"
        successBody="A confirmation is on its way to your inbox. We will come back to you with a quotation and available dates, usually within one business day."
      />
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative space-y-6" noValidate>
      <Honeypot value={honeypot} onChange={setHoneypot} />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="c-name" label="Your name" required>
          <Input id="c-name" name="name" autoComplete="name" required maxLength={120} />
        </Field>
        <Field id="c-role" label="Your role">
          <Input id="c-role" name="role" autoComplete="organization-title" maxLength={160} />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="c-email" label="Work email" required>
          <Input
            id="c-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={200}
          />
        </Field>
        <Field id="c-org" label="Organisation" required>
          <Input
            id="c-org"
            name="organisation"
            autoComplete="organization"
            required
            maxLength={160}
          />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="c-type" label="What are you interested in?" required>
          <Select
            id="c-type"
            name="enquiryType"
            required
            value={enquiryType}
            onChange={(e) => setEnquiryType(e.target.value)}
          >
            {enquiryTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </Field>
        <Field id="c-country" label="Country / region">
          <Input id="c-country" name="country" autoComplete="country-name" maxLength={120} />
        </Field>
      </div>

      {showFormat ? (
        <div className="grid gap-6 sm:grid-cols-2">
          <Field id="c-format" label="Preferred format">
            <Select id="c-format" name="format" defaultValue={defaultFormat ?? formats[1]}>
              {formats.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>
          </Field>
          <Field id="c-delivery" label="Delivery">
            <Select id="c-delivery" name="delivery" defaultValue="Either">
              {deliveries.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>
          </Field>
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id="c-participants"
          label="Approximate participants"
          hint="A rough number is fine."
        >
          <Input id="c-participants" name="participants" maxLength={60} />
        </Field>
        <Field id="c-timing" label="Timing" hint="Dates you have in mind, or a rough window.">
          <Input id="c-timing" name="timing" maxLength={200} />
        </Field>
      </div>

      <Field id="c-message" label="Anything else we should know?">
        <Textarea id="c-message" name="message" rows={4} maxLength={4000} />
      </Field>

      <FormStatus state={state} error={error} successTitle="" successBody="" />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" disabled={state === "submitting"} aria-busy={state === "submitting"}>
          {state === "submitting" ? "Sending…" : "Send enquiry"}
          {state === "submitting" ? null : <Arrow />}
        </Button>
        <p className="text-xs leading-relaxed text-charcoal/55">
          Quotations, invoicing and licence administration are handled directly by Emmanus Plus.
        </p>
      </div>
    </form>
  );
}
