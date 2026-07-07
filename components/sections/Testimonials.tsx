"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "FreshSoft consistently delivers premium quality tissue products with exceptional reliability and sustainable manufacturing. Their commitment to quality has made them one of our most trusted suppliers.",
    name: "Aditya Verma",
    designation: "Supply Chain Manager",
  },
  {
    quote:
      "FS Enterprises has been an outstanding manufacturing partner. Their timely deliveries, excellent product quality, and professional customer support have consistently exceeded our expectations.",
    name: "Priya Sharma",
    designation: "Procurement Head",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="px-6 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-primary sm:text-sm">
            Testimonials
          </p>

          <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            Trusted By Leading Enterprises
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">

          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
              }}
              className="glass flex h-full flex-col rounded-3xl p-8 shadow-glow"
            >
              <div className="mb-6 text-5xl text-primary">“</div>

              <div className="flex-1">
                <p className="text-lg leading-relaxed text-muted">
                  {testimonial.quote}
                </p>
              </div>

              <div className="mt-8 border-t border-primary/10 pt-6">
                <h3 className="text-xl font-semibold text-dark">
                  {testimonial.name}
                </h3>

                <p className="text-muted">
                  {testimonial.designation}
                </p>
              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}