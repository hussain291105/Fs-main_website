 "use client";
import { motion } from "framer-motion";
import { Phone, Mail, X, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function CTA() {
  const [open, setOpen] = useState(false);
  const whatsappNumber = "918446504238";
  const phoneNumber = "+918446504238";
  const email = "fsenterprises5253@gmail.com";
  const instagramUrl = "https://instagram.com/freshsoft21";

  return (
    <section id="contact" className="px-6 py-16 sm:py-24 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-7xl rounded-2xl bg-primary p-8 text-center text-white sm:rounded-3xl sm:p-12 lg:rounded-[3rem] lg:p-20"
      >
        <h2 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
          Ready To Partner With Us?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-white/80 sm:mt-6 sm:text-lg">
          Contact our team to discover premium enterprise hygiene solutions.
        </p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-8 rounded-full bg-white px-6 py-3 text-sm text-primary transition hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.6)] sm:mt-10 sm:px-8 sm:py-4 sm:text-base"
        >
          Contact Us
        </button>
      </motion.div>

      {open ? (
        <div className="fixed inset-0 z-60">
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/55"
          />
          <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-6 sm:px-6 sm:py-10">
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="glass w-full max-w-lg overflow-hidden rounded-2xl p-4 shadow-glow sm:rounded-4xl sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-primary sm:text-sm">
                    Contact
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-dark sm:mt-3 sm:text-2xl">
                    Choose a channel
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted sm:mt-2 sm:text-sm">
                    Reach our team via WhatsApp, email, or a direct call.
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setOpen(false)}
                  className="rounded-full p-2 text-muted transition hover:bg-black/5 hover:text-dark"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4 grid gap-2 sm:mt-6 sm:gap-3">
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-white/60 p-3 transition hover:bg-white sm:rounded-3xl sm:p-4"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 sm:h-10 sm:w-10 sm:rounded-2xl">
                      <MessageCircle className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
                    </span>
                    <div className="flex flex-col justify-center">
                      <p className="text-xs font-semibold text-dark sm:text-sm">WhatsApp</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-primary sm:text-sm">Open</span>
                </a>

                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                    email,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-white/60 p-3 transition hover:bg-white sm:rounded-3xl sm:p-4"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 sm:h-10 sm:w-10 sm:rounded-2xl">
                      <Mail className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
                    </span>
                    <div className="flex flex-col justify-center">
                      <p className="text-xs font-semibold text-dark sm:text-sm">Email</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-primary sm:text-sm">Compose</span>
                </a>

                <a
                  href={`tel:${phoneNumber}`}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-white/60 p-3 transition hover:bg-white sm:rounded-3xl sm:p-4"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 sm:h-10 sm:w-10 sm:rounded-2xl">
                      <Phone className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
                    </span>
                    <div className="flex flex-col justify-center">
                      <p className="text-xs font-semibold text-dark sm:text-sm">Phone Call</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-primary sm:text-sm">Call</span>
                </a>

                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-white/60 p-3 transition hover:bg-white sm:rounded-3xl sm:p-4"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 sm:h-10 sm:w-10 sm:rounded-2xl">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                      </svg>
                    </span>
                    <div className="flex flex-col justify-center">
                      <p className="text-xs font-semibold text-dark sm:text-sm">Instagram</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-primary sm:text-sm">Follow</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
