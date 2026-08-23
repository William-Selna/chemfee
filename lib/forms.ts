/**
 * ─────────────────────────────────────────────────────────────────────────
 *  THE ONE PLACE TO WIRE UP EMAIL COLLECTION
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Every form on the site (newsletter, "notify me" on a coffee, wholesale
 * enquiry, contact) funnels through `submitLead`. Right now it simulates a
 * network call and logs the payload — nothing leaves the browser.
 *
 * To go live, replace the body of `submitLead` with a call to your provider.
 * Two common options:
 *
 *   // Formspree / Basin / Web3Forms — no backend needed
 *   const res = await fetch("https://formspree.io/f/XXXXXXX", {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json", Accept: "application/json" },
 *     body: JSON.stringify(payload),
 *   });
 *   if (!res.ok) throw new Error("Submission failed");
 *
 *   // Your own Next.js route handler at app/api/lead/route.ts
 *   const res = await fetch("/api/lead", { method: "POST", body: JSON.stringify(payload) });
 *
 * Nothing else in the codebase needs to change.
 */

export type LeadSource =
  | "newsletter"
  | "product-interest"
  | "wholesale"
  | "contact";

export type LeadPayload = {
  source: LeadSource;
  email: string;
  /** Present on wholesale and contact forms. */
  name?: string;
  company?: string;
  message?: string;
  /** Slug of the coffee, when the source is "product-interest". */
  product?: string;
  /** Where the form was submitted from — handy for attribution. */
  path?: string;
};

export type SubmitResult = { ok: true } | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(value: string) {
  return EMAIL_RE.test(value.trim());
}

export async function submitLead(payload: LeadPayload): Promise<SubmitResult> {
  if (!isValidEmail(payload.email)) {
    return { ok: false, error: "That email address doesn't look right." };
  }

  // ── Replace everything below this line with your provider call ──────────
  await new Promise((resolve) => setTimeout(resolve, 700));

  if (process.env.NODE_ENV === "development") {
    console.info("[lead captured — not sent anywhere]", payload);
  }

  return { ok: true };
}
