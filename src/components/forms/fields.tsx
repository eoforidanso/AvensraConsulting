"use client";

import type { ReactNode } from "react";

const fieldBase =
  "w-full border border-ivory-200 bg-white px-4 py-3 text-[0.95rem] text-charcoal placeholder:text-charcoal/35 transition-colors focus:border-gold focus:outline-none";

export function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-[0.7rem] font-semibold uppercase tracking-[0.13em] text-navy"
    >
      {children}
      {required ? <span className="ml-1 text-gold">*</span> : null}
    </label>
  );
}

export function Field({
  id,
  label,
  required,
  hint,
  children,
  className = "",
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      {children}
      {hint ? <p className="mt-1.5 text-xs text-charcoal/55">{hint}</p> : null}
    </div>
  );
}

export function Input(props: React.ComponentProps<"input">) {
  return <input {...props} className={`${fieldBase} ${props.className ?? ""}`} />;
}

export function Textarea(props: React.ComponentProps<"textarea">) {
  return (
    <textarea
      rows={5}
      {...props}
      className={`${fieldBase} resize-y ${props.className ?? ""}`}
    />
  );
}

export function Select(props: React.ComponentProps<"select">) {
  return (
    <select
      {...props}
      className={`${fieldBase} appearance-none bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10 ${props.className ?? ""}`}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1.5L6 6.5l5-5' fill='none' stroke='%230d1b33' stroke-width='1.6' stroke-linecap='round'/%3E%3C/svg%3E\")",
      }}
    />
  );
}

export function Checkbox({
  id,
  children,
  ...props
}: React.ComponentProps<"input"> & { children: ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <input
        id={id}
        type="checkbox"
        {...props}
        className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-gold)]"
      />
      <label htmlFor={id} className="text-[0.88rem] leading-relaxed text-charcoal/80">
        {children}
      </label>
    </div>
  );
}

/** Hidden field that only automated submissions fill in. */
export function Honeypot({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor="company-website">Do not fill this in</label>
      <input
        id="company-website"
        name="company-website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export function FormStatus({
  state,
  error,
  successTitle,
  successBody,
}: {
  state: "idle" | "submitting" | "success" | "error";
  error?: string;
  successTitle: string;
  successBody: string;
}) {
  if (state === "success") {
    return (
      <div role="status" className="border-l-2 border-gold bg-white p-6 sm:p-8">
        <h3 className="font-heading text-xl text-navy">{successTitle}</h3>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-charcoal/75">
          {successBody}
        </p>
      </div>
    );
  }

  if (state === "error" && error) {
    return (
      <p
        role="alert"
        className="border-l-2 border-red-600 bg-red-50 px-4 py-3 text-sm text-red-900"
      >
        {error}
      </p>
    );
  }

  return null;
}

export type FormState = "idle" | "submitting" | "success" | "error";

/** Shared submit helper: posts JSON and normalises the response. */
export async function postForm(
  endpoint: string,
  payload: Record<string, unknown>,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      return {
        ok: false,
        error: data.error ?? "Something went wrong. Please try again.",
      };
    }
    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "We could not reach the server. Please check your connection and try again.",
    };
  }
}
