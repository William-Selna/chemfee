"use client";

import { usePathname } from "next/navigation";
import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui";
import { ArrowRight, Check } from "@/components/icons";
import { submitLead, type LeadSource } from "@/lib/forms";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-2xl border border-line-strong bg-raised px-4 py-3.5 text-sm text-ink " +
  "placeholder:text-ink-muted transition-colors focus:border-accent focus:outline-none " +
  "focus-visible:outline-none";

const labelClass = "mb-2 block text-[0.6875rem] font-semibold tracking-[0.14em] uppercase text-ink-muted";

/* ── Inline single-field capture ─────────────────────────────────────────── */

export function NewsletterForm({
  source = "newsletter",
  product,
  onDark = false,
  cta = "Join the list",
  placeholder = "you@example.com",
  note,
}: {
  source?: LeadSource;
  product?: string;
  onDark?: boolean;
  cta?: string;
  placeholder?: string;
  note?: string;
}) {
  const id = useId();
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    // Honeypot: real users never fill a hidden field.
    const trap = new FormData(e.currentTarget).get("company_website");
    if (trap) return;

    setStatus("submitting");
    const result = await submitLead({ source, email, product, path: pathname });

    if (result.ok) {
      setStatus("success");
      setMessage(
        product
          ? "You're on the list — we'll email you the moment this one is back."
          : "You're in. Expect one email a week, on Thursdays.",
      );
      setEmail("");
    } else {
      setStatus("error");
      setMessage(result.error);
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className={cn(
          "flex items-center gap-3 rounded-2xl px-5 py-4 text-sm",
          onDark ? "bg-white/10 text-espresso-ink" : "bg-amber-wash text-amber",
        )}
      >
        <Check className="h-5 w-5 shrink-0" />
        <span>{message}</span>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <label htmlFor={`${id}-email`} className="sr-only">
        Email address
      </label>

      <div
        className={cn(
          "flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-2 sm:rounded-full sm:border sm:p-1.5",
          onDark ? "sm:border-white/25 sm:bg-white/5" : "sm:border-line-strong sm:bg-raised",
        )}
      >
        <input
          id={`${id}-email`}
          type="email"
          name="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder={placeholder}
          aria-invalid={status === "error"}
          className={cn(
            inputClass,
            "sm:flex-1 sm:border-transparent sm:bg-transparent sm:px-5 sm:py-2.5",
            onDark && "text-espresso-ink placeholder:text-espresso-muted",
          )}
        />
        <Button
          type="submit"
          variant={onDark ? "onDark" : "primary"}
          disabled={status === "submitting"}
          className="shrink-0 sm:h-11"
        >
          {status === "submitting" ? "Sending…" : cta}
          {status !== "submitting" && <ArrowRight className="h-4 w-4" />}
        </Button>
      </div>

      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute h-0 w-0 overflow-hidden opacity-0"
      />

      <p
        aria-live="polite"
        className={cn(
          "mt-3 text-xs",
          status === "error" ? "text-accent-strong dark:text-accent" : onDark ? "text-espresso-muted" : "text-ink-muted",
        )}
      >
        {status === "error" ? message : note ?? "No spam, no sales emails. Unsubscribe in one click."}
      </p>
    </form>
  );
}

/* ── Multi-field enquiry form ────────────────────────────────────────────── */

type FieldConfig = {
  name: "name" | "company" | "message";
  label: string;
  placeholder?: string;
  type?: "text" | "textarea";
  required?: boolean;
};

export function EnquiryForm({
  source,
  fields,
  cta = "Send enquiry",
  successTitle = "Thanks — that's with us.",
  successBody = "We answer everything within two business days. If it's urgent, call the roastery.",
  topics,
}: {
  source: LeadSource;
  fields: FieldConfig[];
  cta?: string;
  successTitle?: string;
  successBody?: string;
  /** Optional radio group, e.g. contact reasons. */
  topics?: string[];
}) {
  const id = useId();
  const pathname = usePathname();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [topic, setTopic] = useState(topics?.[0] ?? "");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const data = new FormData(e.currentTarget);
    if (data.get("company_website")) return;

    setStatus("submitting");
    const result = await submitLead({
      source,
      email: String(data.get("email") ?? ""),
      name: String(data.get("name") ?? "") || undefined,
      company: String(data.get("company") ?? "") || undefined,
      message: [topic && `[${topic}]`, String(data.get("message") ?? "")]
        .filter(Boolean)
        .join(" ") || undefined,
      path: pathname,
    });

    if (result.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setError(result.error);
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-4xl border border-amber/40 bg-amber-wash p-8 sm:p-10">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-amber text-espresso">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="mt-6 text-2xl">{successTitle}</h3>
        <p className="mt-3 text-ink-soft">{successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      {topics ? (
        <fieldset>
          <legend className={labelClass}>What&apos;s this about?</legend>
          <div className="flex flex-wrap gap-2">
            {topics.map((t) => (
              <label
                key={t}
                className={cn(
                  "cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors",
                  topic === t
                    ? "border-accent bg-accent-wash text-accent-strong dark:text-accent"
                    : "border-line-strong text-ink-soft hover:border-accent",
                )}
              >
                <input
                  type="radio"
                  name="topic"
                  value={t}
                  checked={topic === t}
                  onChange={() => setTopic(t)}
                  className="sr-only"
                />
                {t}
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}

      {fields
        .filter((f) => f.type !== "textarea")
        .map((field) => (
          <div key={field.name}>
            <label htmlFor={`${id}-${field.name}`} className={labelClass}>
              {field.label}
              {field.required === false && <span className="normal-case"> (optional)</span>}
            </label>
            <input
              id={`${id}-${field.name}`}
              name={field.name}
              type="text"
              required={field.required !== false}
              autoComplete={field.name === "name" ? "name" : "organization"}
              placeholder={field.placeholder}
              className={inputClass}
            />
          </div>
        ))}

      <div>
        <label htmlFor={`${id}-email`} className={labelClass}>
          Email address
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={status === "error"}
          className={inputClass}
        />
      </div>

      {fields
        .filter((f) => f.type === "textarea")
        .map((field) => (
          <div key={field.name}>
            <label htmlFor={`${id}-${field.name}`} className={labelClass}>
              {field.label}
            </label>
            <textarea
              id={`${id}-${field.name}`}
              name={field.name}
              rows={5}
              required={field.required !== false}
              placeholder={field.placeholder}
              className={cn(inputClass, "resize-y")}
            />
          </div>
        ))}

      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute h-0 w-0 overflow-hidden opacity-0"
      />

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : cta}
          {status !== "submitting" && <ArrowRight className="h-4 w-4" />}
        </Button>
        <p aria-live="polite" className="text-xs text-accent-strong dark:text-accent">
          {status === "error" ? error : ""}
        </p>
      </div>
    </form>
  );
}
