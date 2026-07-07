"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="px-6 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-[36px]"
        >
          <Image
            src="/About-image.png"
            alt="Tissue paper manufacturing line"
            width={3648}
            height={2432}
            className="h-auto w-full rounded-2xl object-contain shadow-glow sm:rounded-3xl lg:rounded-[36px]"
            priority
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-primary sm:text-sm">
            About Us
          </p>
          <h2 className="text-3xl font-semibold leading-tight text-dark sm:text-4xl lg:text-5xl">
            Excellence In Hygiene Manufacturing
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
            We combine sustainable sourcing, advanced manufacturing, and enterprise-scale logistics to deliver premium tissue products worldwide.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="glass rounded-2xl p-4 sm:rounded-3xl sm:p-6"
            >
              <h3 className="text-2xl font-bold text-primary sm:text-3xl">150+</h3>
              <p className="mt-2 text-sm text-muted sm:text-base">Business Partners</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="glass rounded-2xl p-4 sm:rounded-3xl sm:p-6"
            >
              <h3 className="text-xl font-bold text-primary sm:text-3xl">International</h3>
              <p className="mt-2 text-sm text-muted sm:text-base">Transportation Routes</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
