 "use client";
 import { motion } from "framer-motion";

export default function Stats() {
  return (
    <section className="px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl">
       <div className="mb-10 text-center md:mb-14">
             <p className="text-xs uppercase tracking-[0.25em] text-primary sm:text-sm">
              At a glance
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-dark sm:text-4xl md:text-5xl lg:text-6xl">
              Trusted at Enterprise Scale
            </h2>
         <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-muted sm:text-lg lg:text-xl">
            Measurable performance across manufacturing quality, delivery reliability, and long-term partnerships.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
          className="glass grid gap-4 rounded-2xl p-6 sm:gap-6 sm:rounded-3xl sm:p-8 md:grid-cols-4 md:gap-0 md:rounded-[3rem] md:p-10"
        >
          {[
            ["2025", "Establishment Year", "Proven operational excellence"],
            ["150+", "Global Clients", "Long-term procurement partnerships"],
            ["International", "Countries Served", "Export-ready logistics network"],
            ["100%", "Quality Focus", "Multi-stage checks per batch"],
          ].map(([value, label, meta], index) => (
            <motion.div
              key={label}
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              className={`rounded-2xl bg-white/40 p-6 text-left backdrop-blur sm:rounded-3xl sm:p-8 md:rounded-none md:bg-transparent md:p-8 ${
                index !== 3 ? "md:border-r md:border-border" : ""
              }`}
            >
              <p className="text-2xl font-semibold tracking-tight text-dark sm:text-3xl md:text-4xl">
                <span className="text-primary">{value}</span>
              </p>
               <p className="mt-2 text-xs font-semibold text-dark sm:mt-3 sm:text-sm">
                {label}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted sm:mt-2 sm:text-sm">
                {meta}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
