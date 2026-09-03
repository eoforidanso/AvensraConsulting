"use client";

import { useState } from "react";
import { Button, Arrow } from "@/components/ui";
import {
  Field,
  Input,
  Textarea,
  Select,
  Checkbox,
  Honeypot,
  FormStatus,
  postForm,
  type FormState,
} from "./fields";

const productOptions = [
  "Business-to-People Alignment System™",
  "The Executive Reset™",
  "Corporate experience",
  "Consulting",
] as const;

function Stars({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 block text-[0.7rem] font-semibold uppercase tracking-[0.13em] text-navy">
        Overall rating <span className="ml-1 text-goldink">*</span>
      </legend>
      <div className="flex items-center gap-1.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            aria-pressed={value === star}
            aria-label={`${star} out of 5`}
            className="p-1 transition-transform hover:scale-110"
          >
            <svg
              viewBox="0 0 24 24"
              className={`h-7 w-7 ${star <= value ? "text-goldink" : "text-navy/20"}`}
              fill={star <= value ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="1.3"
            >
              <path d="M12 2.6l2.9 5.9 6.5.95-4.7 4.6 1.1 6.45L12 17.45 6.2 20.5l1.1-6.45-4.7-4.6 6.5-.95L12 2.6z" />
            </svg>
          </button>
        ))}
        <span className="ml-3 text-sm text-charcoal/60">{value} / 5</span>
      </div>
    </fieldset>
  );
}

export function FeedbackForm() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string>();
  const [honeypot, setHoneypot] = useState("");
  const [rating, setRating] = useState(5);
  const [consentToPublish, setConsentToPublish] = useState(false);
  const [consentToName, setConsentToName] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setError(undefined);

    const f = new FormData(event.currentTarget);
    const result = await postForm("/api/forms/feedback", {
      name: f.get("name"),
      email: f.get("email"),
      organisation: f.get("organisation") ?? "",
      role: f.get("role") ?? "",
      product: f.get("product"),
      rating,
      feedback: f.get("feedback"),
      consentToPublish,
      consentToName: consentToPublish ? consentToName : false,
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
        successTitle="Thank you for your feedback"
        successBody="We read every response. Nothing is published automatically — if you gave us permission to share your words, we will review them first and only use them in the form you agreed to."
      />
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative space-y-6" noValidate>
      <Honeypot value={honeypot} onChange={setHoneypot} />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="f-name" label="Your name" required>
          <Input id="f-name" name="name" autoComplete="name" required maxLength={120} />
        </Field>
        <Field id="f-email" label="Email address" required hint="So we can follow up if needed.">
          <Input
            id="f-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={200}
          />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="f-org" label="Organisation">
          <Input id="f-org" name="organisation" autoComplete="organization" maxLength={160} />
        </Field>
        <Field id="f-role" label="Your role">
          <Input id="f-role" name="role" maxLength={160} />
        </Field>
      </div>

      <Field id="f-product" label="What is your feedback about?" required>
        <Select id="f-product" name="product" required defaultValue={productOptions[0]}>
          {productOptions.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </Select>
      </Field>

      <Stars value={rating} onChange={setRating} />

      <Field
        id="f-feedback"
        label="Your feedback"
        required
        hint="What worked, what did not, and what you would tell a colleague considering it."
      >
        <Textarea id="f-feedback" name="feedback" required minLength={10} maxLength={4000} />
      </Field>

      <div className="space-y-4 border-l-2 border-gold/40 bg-white px-5 py-5">
        <Checkbox
          id="f-publish"
          checked={consentToPublish}
          onChange={(e) => setConsentToPublish(e.target.checked)}
        >
          Emmanus Plus may share my feedback publicly as a testimonial. I understand nothing is
          published automatically and Emmanus Plus will review it first.
        </Checkbox>

        {consentToPublish ? (
          <div className="pl-7">
            <Checkbox
              id="f-name-consent"
              checked={consentToName}
              onChange={(e) => setConsentToName(e.target.checked)}
            >
              You may use my name, role and organisation. Leave unticked to stay anonymous.
            </Checkbox>
          </div>
        ) : null}
      </div>

      <FormStatus state={state} error={error} successTitle="" successBody="" />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" disabled={state === "submitting"} aria-busy={state === "submitting"}>
          {state === "submitting" ? "Sending…" : "Submit feedback"}
          {state === "submitting" ? null : <Arrow />}
        </Button>
        <p className="text-xs leading-relaxed text-charcoal/55">
          Your feedback is stored securely and handled per our{" "}
          <a href="/privacy-policy" className="text-goldink underline underline-offset-2">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </form>
  );
}
