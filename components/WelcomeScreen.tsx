"use client";

import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import Image from "next/image";

export default function WelcomeScreen({ hide }: { hide: boolean }) {
  if (hide) return null;

  return (
    <section
      className="relative h-screen overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #f0f7ff 25%, #e8f4fc 50%, #dff0f8 75%, #d6ebf5 100%)",
      }}
    >

      {/* Premium Background */}
      <div className="absolute inset-0 overflow-hidden">

        {/* Soft Blue Glow */}
        <div
          className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(21,101,176,0.10) 0%, rgba(47,141,255,0.05) 35%, transparent 70%)",
          }}
        />

        {/* Secondary Glow */}
        <div
          className="absolute -top-40 -left-40 h-[450px] w-[450px] rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(21,101,176,0.08), transparent 70%)",
          }}
        />

        {/* Bottom Right Glow */}
        <div
          className="absolute -bottom-48 -right-48 h-[500px] w-[500px] rounded-full blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, rgba(47,141,255,0.08), transparent 70%)",
          }}
        />

        {/* Animated Floating Gradient Orbs */}
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 18,
            ease: "easeInOut",
          }}
          className="absolute left-20 top-32 h-72 w-72 rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(21,101,176,.08), transparent 70%)",
          }}
        />

        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 35, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 22,
            ease: "easeInOut",
          }}
          className="absolute right-24 bottom-20 h-80 w-80 rounded-full blur-[150px]"
          style={{
            background:
              "radial-gradient(circle, rgba(0,188,212,.06), transparent 70%)",
          }}
        />

        {/* Hexagon Pattern */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, rgba(11,61,117,.08) 2px, transparent 2px)
            `,
            backgroundSize: "70px 70px",
          }}
        />

        {/* Soft Noise */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(0,0,0,.35) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />

      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <div className="relative">

            {/* Logo Glow */}
            <div
              className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px]"
              style={{
                background:
                  "radial-gradient(circle, rgba(21,101,176,.14), transparent 70%)",
              }}
            />

            {/* Soft Glow */}
            <div
              className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]"
              style={{
                background: "radial-gradient(circle at center, rgba(33,150,243,0.12), transparent 55%)",
              }}
            />

            <motion.div
              initial={{ opacity: 0, scale: .9, y: 15 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -5, 0],
              }}
              transition={{
                opacity: { duration: 1.2 },
                scale: { duration: 1.2 },
                y: {
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                },
              }}
            >
              <Image
                src="/logo.png"
                alt="Fresh Soft Logo"
                width={600}
                height={600}
                priority
                className="relative z-10 mx-auto h-auto w-52 object-contain sm:w-64 md:w-72 lg:w-80 xl:w-96"
              />
            </motion.div>

          </div>

          {/* Company Name */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .4 }}
            className="mt-6 text-2xl font-bold tracking-[0.18em] text-[#0B3D75] sm:text-4xl"
          >
            Fresh Soft Tissue Enterprises
          </motion.h2>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .7 }}
            className="mt-2 text-sm font-normal tracking-[0.28em] text-slate-500"
          >
            Elegant • Trusted • Exceptional
          </motion.p>

          {/* Welcome Line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .9 }}
            className="mt-4 text-xs text-slate-400"
          >
            Premium Tissue Manufacturing
          </motion.p>

          {/* Loading Line */}
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, delay: 1 }}
            className="mx-auto mt-6 h-px w-32 bg-gradient-to-r from-transparent via-[#1565B0]/60 to-transparent"
          />

          {/* Elegant Scroll Indicator */}
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
            className="mt-12 flex flex-col items-center"
          >
            <span className="mb-2 text-xs tracking-[0.2em] text-slate-500">
              Explore
            </span>

            <div className="text-2xl text-primary">
              <ChevronUp />
            </div>

            <span className="mt-2 text-sm text-slate-500">
              Scroll Up
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}