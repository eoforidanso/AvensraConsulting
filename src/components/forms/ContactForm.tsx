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

const topics = [
  "Digital products",
  "Product support",
  "Corporate experiences",
  "Corporate licensing",
  "Consulting",
  "Something else",
] as const;

export function ContactForm({ defaultTopic }: { defaultTopic?: string }) {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string>();
  const [honeypot, setHoneypot] = useState("");
  const [topic, setTopic] = useState<string>(defaultTopic ?? topics[0]);

  const supportSelected = topic === "Product support";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setError(undefined);

    const form = new FormData(event.currentTarget);
    const result = await postForm("/api/forms/contact", {
      name: form.get("name"),
      email: form.get("email"),
      organisation: form.get("organisation") ?? "",
      topic: form.get("topic"),
      orderReference: form.get("orderReference") ?? "",
      message: form.get("message"),
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
        successTitle="Thank you — your message is with us"
        successBody="We have sent a confirmation to your email address. Someone from Avensra will come back to you within one business day, and within two at the latest."
      />
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative space-y-6" noValidate>
      <Honeypot value={honeypot} onChange={setHoneypot} />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Your name" required>
          <Input id="name" name="name" autoComplete="name" required maxLength={120} />
        </Field>
        <Field id="email" label="Email address" required>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={200}
          />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="organisation" label="Organisation">
          <Input
            id="organisation"
            name="organisation"
            autoComplete="organization"
            maxLength={160}
          />
        </Field>
        <Field id="topic" label="What is this about?" required>
          <Select
            id="topic"
            name="topic"
            required
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          >
            {topics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      {supportSelected ? (
        <Field
          id="orderReference"
          label="Order reference"
          hint="From your confirmation email. It helps us find your purchase straight away."
        >
          <Input id="orderReference" name="orderReference" maxLength={120} />
        </Field>
      ) : null}

      <Field id="message" label="Your message" required>
        <Textarea id="message" name="message" required minLength={10} maxLength={4000} />
      </Field>

      <FormStatus state={state} error={error} successTitle="" successBody="" />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" disabled={state === "submitting"} aria-busy={state === "submitting"}>
          {state === "submitting" ? "Sending…" : "Send message"}
          {state === "submitting" ? null : <Arrow />}
        </Button>
        <p className="text-xs leading-relaxed text-charcoal/55">
          We use your details only to answer your enquiry. See our{" "}
          <a href="/privacy-policy" className="text-gold underline underline-offset-2">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </form>
  );
}
