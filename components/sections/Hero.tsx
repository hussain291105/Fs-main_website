"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Hero() {
  const videoSrc = "/nature.mp4";

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <section id="home" className="relative flex min-h-screen items-center px-6 pt-32 pb-16">
      <div className="pointer-events-none absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-white/50 z-10" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-4 text-xs uppercase tracking-[0.2em] text-shadow-primary sm:text-sm"
          >
            Premium Tissue Manufacturing
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-dark sm:text-4xl md:text-5xl lg:text-7xl"
          >
            Sustainable{" "}
            <span className="text-primary">Tissue Solutions</span> For Modern Businesses
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-shadow-green-950 sm:text-lg"
          >
            Delivering premium hygiene products with eco-conscious manufacturing and enterprise-grade supply solutions.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-8 flex flex-wrap gap-3 sm:gap-4"
          >
            <button
              onClick={() => {
                document.getElementById("products")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className="rounded-full bg-primary hover:bg-green-950 px-6 py-3 text-sm text-white shadow-glow transition hover:scale-105 cursor-pointer hover:shadow-[0_0_25px_rgba(31,107,79,0.5)] sm:px-8 sm:py-4 sm:text-base"
            >
              Explore Products
            </button>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative order-1 lg:order-2"
        >
          <div className="glass rounded-3xl p-4 shadow-glow sm:rounded-4xl sm:p-6">
            <div className="relative aspect-16/10 w-full overflow-hidden rounded-xl sm:rounded-2xl">
              <Image
                src="/hero image .png"
                alt="Tissue paper manufacturing line"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[rgba(15,26,21,0.22)] via-transparent to-transparent" />
            </div>
          </div>
          <div className="glass absolute -bottom-6 -left-6 rounded-2xl p-4 shadow-glow sm:absolute sm:-bottom-10 sm:-left-10 sm:rounded-3xl sm:p-6">
            <p className="text-2xl font-bold text-primary sm:text-4xl">2025</p>
            <p className="mt-1 text-xs text-muted sm:text-sm">Establishment Year</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
