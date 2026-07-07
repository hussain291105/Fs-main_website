 "use client";
import Image from "next/image";
import { motion } from "framer-motion";

export const products = [
  {
    img: "/Image 01.png",
    title: "Premium Tissue Rolls",
    subtitle: "Soft, strong, and sustainable",
  },
  {
    img: "/Image 02.png",
    title: "Bulk Supply Packs",
    subtitle: "Built for enterprise demand",
  },
  {
    img: "/Image 03.png",
    title: "Private Label Range",
    subtitle: "Your brand, our manufacturing",
  },
];

export default function Products() {
  return (
    <section id="products" className="px-6 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-12 flex items-end justify-between sm:mb-16"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary sm:text-sm">
              Products
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-dark sm:text-4xl lg:text-5xl">
              Featured Collection
            </h2>
          </div>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.14 } },
          }}
          className="grid gap-6 sm:gap-8 lg:grid-cols-3"
        >
          {products.map(({ img, title, subtitle }, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              className="group relative overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-4xl"
            >
              <div className="relative h-[350px] w-full sm:h-[400px] lg:h-[500px]">
                <Image
                  src={img}
                  alt={`Product ${index + 1}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-black/50 to-black/90" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-white sm:text-2xl">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-white/80 sm:text-base">
                  {subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
