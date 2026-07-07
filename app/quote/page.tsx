"use client";

import Link from "next/link";
import { useForm, ValidationError } from "@formspree/react";

export default function QuotePage() {
  const [state, handleSubmit] = useForm("mykqpjro");

  if (state.succeeded) {
    return (
      <main className="gradient-bg min-h-screen flex items-center justify-center">
        <div className="glass rounded-3xl p-10 text-center">
          <h2 className="text-4xl font-bold text-primary">
            Thank you for your quotation request!
          </h2>

          <p className="mt-4 text-muted">
            Your quotation request has been submitted successfully.
          </p>

          <Link
            href="/"
            className="mt-8 inline-block rounded-full bg-primary px-8 py-3 text-white shadow-glow hover:shadow-[0_0_25px_rgba(31,107,79,0.5)]"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="gradient-bg min-h-screen px-6 pt-32 pb-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">
            Get Quotation
          </p>
          <h1 className="mt-4 text-5xl font-semibold text-dark">
            Request a Quotation
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Share your requirements and our team will get back to you with pricing,
            lead times, and available packaging options.
          </p>
        </div>

        <form
         onSubmit={handleSubmit}
         className="glass rounded-4xl p-8 shadow-glow"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-dark">Full Name</label>
              <input
                className="mt-2 w-full rounded-2xl border border-border bg-white px-4 py-3 text-dark outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                name="name"
                placeholder="Your name"
                autoComplete="name"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-dark">Company</label>
              <input
                className="mt-2 w-full rounded-2xl border border-border bg-white px-4 py-3 text-dark outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                name="company"
                placeholder="Company name"
                autoComplete="organization"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-dark">Email</label>
              <input
                className="mt-2 w-full rounded-2xl border border-border bg-white px-4 py-3 text-dark outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                type="email"
                name="email"
                placeholder="you@company.com"
                autoComplete="email"
                required
              />

              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-dark">Phone</label>
              <input
                className="mt-2 w-full rounded-2xl border border-border bg-white px-4 py-3 text-dark outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                name="phone"
                placeholder="Phone number"
                autoComplete="tel"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="text-sm font-medium text-dark">
              Product Requirements
            </label>
            <textarea
              className="mt-2 min-h-[140px] w-full rounded-2xl border border-border bg-white px-4 py-3 text-dark outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
              name="requirements"
              placeholder="Tell us the product type (rolls, facial tissue, napkins), destination country, etc."
              required
            />

            <ValidationError
              prefix="Requirements"
              field="requirements"
              errors={state.errors}
            />
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              type="submit"
              disabled={state.submitting}
              className="rounded-full bg-primary px-8 py-4 text-white shadow-glow transition hover:brightness-95 hover:shadow-[0_0_25px_rgba(31,107,79,0.5)] focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {state.submitting ? "Submitting..." : "Submit Request"}
            </button>
            <Link
              href="/"
              className="rounded-full border border-border bg-white px-8 py-4 text-dark transition hover:bg-gray-100 shadow-glow hover:shadow-[0_0_25px_rgba(107,114,128,0.35)] focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              Back to Home
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
