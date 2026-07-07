"use client";
import { Factory, Globe, Package, Truck } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  { title: "Premium Tissue Manufacturing", Icon: Factory },
  { title: "Industrial Supply Chain", Icon: Truck },
  { title: "Private Label Packaging", Icon: Package },
  { title: "Export Distribution", Icon: Globe },
];

export default function Services() {
  return (
    <section id="services" className="px-6 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center sm:mb-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-primary sm:text-sm">
            Services
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-dark sm:text-4xl lg:text-5xl">
            Enterprise Solutions
          </h2>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
          className="grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-4"
        >
          {services.map(({ title, Icon }) => (
            <motion.div
              key={title}
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              className="glass rounded-2xl p-6 transition duration-300 hover:-translate-y-2 hover:shadow-glow sm:rounded-3xl sm:p-8"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 sm:mb-6 sm:h-14 sm:w-14 sm:rounded-2xl">
                <Icon className="h-6 w-6 text-primary sm:h-7 sm:w-7" />
              </div>
              <h3 className="text-xl font-semibold text-dark sm:text-2xl">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">
                Premium quality manufacturing with modern sustainable processes.
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
