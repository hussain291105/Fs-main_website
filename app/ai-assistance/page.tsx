"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  Bot,
  Sparkles,
  ArrowRight,
  Package,
  ReceiptText,
  Factory,
  Headset,
  Send,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";

export default function AIAssistancePage() {
    const [showChat, setShowChat] = useState(false);
    const chatRef = useRef<HTMLElement | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f7faf9] via-white to-[#edf7f3]">

      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pt-32 pb-14 sm:pt-36 sm:pb-18 lg:pt-40 lg:pb-20">

        {/* Background Blur */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute right-10 bottom-10 h-96 w-96 rounded-full bg-green-200/20 blur-[150px]" />
        </div>

        <div className="mx-auto max-w-7xl grid items-center gap-8 sm:gap-12 lg:gap-16 lg:grid-cols-[1.1fr_0.9fr]">

          {/* Left Content */}

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .8 }}
          >

            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-2.5 py-1 shadow-sm sm:px-4 sm:py-2">

              <Bot className="h-4 w-4 text-primary sm:h-5 sm:w-5" />

              <span className="text-xs font-medium text-primary sm:text-sm">
                AI Powered Support
              </span>

            </div>

            <h1 className="mt-6 text-3xl font-bold leading-tight text-dark sm:mt-8 sm:text-5xl lg:text-5xl xl:text-6xl">

              Smart
              <span className="text-primary"> AI Assistance </span>

              For Every Customer

            </h1>

            <p className="mt-6 max-w-xl text-sm leading-6 text-muted sm:mt-8 sm:text-lg sm:leading-8">

              Get instant answers about our tissue products,
              manufacturing capabilities, pricing, export services,
              and bulk orders.

              Our AI Assistant is available 24/7 to help your business.

            </p>

            <div className="mt-8 flex flex-wrap gap-3 sm:mt-10 sm:gap-4">

              <Link 
                href="/ai-assistance/chat"
                className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:scale-105 hover:bg-green-900 shadow-glow hover:shadow-[0_0_25px_rgba(31,107,79,0.5)] sm:px-7 sm:py-3.5 sm:text-base"
              >

                Start AI Chat

              </Link>

              <Link
                href="/quote"
                className="flex items-center gap-2 rounded-full border border-primary/20 bg-transparent px-5 py-2.5 text-sm font-medium transition hover:bg-gray-100 hover:text-primary shadow-glow hover:shadow-[0_0_25px_rgba(107,114,128,0.35)] sm:px-7 sm:py-3.5 sm:text-base"
              >

                Request Quote

                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />

              </Link>

            </div>

          </motion.div>

          {/* Right Card */}

          <motion.div
            initial={{ opacity: 0, scale: .9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: .8 }}
          >

            <div className="rounded-2xl border border-white/40 bg-white/70 p-3 shadow-2xl backdrop-blur-xl sm:rounded-3xl sm:p-6 lg:p-7">

              <div className="flex items-center gap-3 sm:gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white sm:h-14 sm:w-14 lg:h-16 lg:w-16">

                  <Bot className="h-5 w-5 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />

                </div>

                <div>

                  <h3 className="text-base font-bold text-dark sm:text-2xl">

                    FS AI Assistant

                  </h3>

                  <p className="text-xs text-muted sm:text-sm">

                    Online • Ready to help

                  </p>

                </div>

              </div>

              <div className="mt-6 rounded-2xl bg-[#f5faf7] p-3 sm:mt-6 lg:mt-8 sm:rounded-3xl sm:p-6 lg:p-8">

                <div className="flex gap-3 sm:gap-4">

                  <div className="mt-1">

                    <Sparkles
                      className="h-5 w-5 text-primary sm:h-8 sm:w-8"
                    />

                  </div>

                  <div>

                    <p className="text-sm font-medium text-dark sm:text-base">

                      Hello 👋

                    </p>

                    <p className="mt-2 text-xs leading-6 text-muted sm:text-sm sm:leading-7">

                      I'm your intelligent assistant.

                      Ask me anything about products,
                      quotations, manufacturing,
                      delivery, exports or tissue quality.

                    </p>

                  </div>

                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </section>

      {/* AI Features Section */}
      <section className="px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mx-auto mb-12 max-w-3xl text-center sm:mb-16"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:text-sm">
              AI Features
            </p>
      
            <h2 className="mt-4 text-xl font-bold text-dark sm:text-3xl lg:text-5xl">
              What Can AI Help You With?
            </h2>
      
            <p className="mt-4 text-base leading-7 text-muted sm:mt-6 sm:text-lg sm:leading-8">
              Our intelligent assistant helps customers, wholesalers and
              distributors get information instantly without waiting for
              customer support.
            </p>
          </motion.div>

          <div className="mx-auto max-w-6xl grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">

            {/* Card 1 */}

            <motion.div
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .6 }}
              className="glass rounded-2xl p-4 shadow-xl sm:rounded-3xl sm:p-6 lg:p-7"
            >

              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white sm:mb-6 sm:h-14 sm:w-14 lg:h-16 lg:w-16 sm:rounded-2xl">

                <Package className="h-5 w-5 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />

              </div>

              <h3 className="text-base font-semibold text-dark sm:text-xl lg:text-2xl">
                Product Guidance
              </h3>

              <p className="mt-3 text-xs leading-5 text-muted sm:mt-4 sm:text-base sm:leading-7">
                Discover the perfect tissue products for homes,
                offices, restaurants, hospitals and commercial use.
              </p>

            </motion.div>

            {/* Card 2 */}

            <motion.div
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .6, delay: .1 }}
              className="glass rounded-2xl p-4 shadow-xl sm:rounded-3xl sm:p-6 lg:p-7"
            >

              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white sm:mb-6 sm:h-14 sm:w-14 lg:h-16 lg:w-16 sm:rounded-2xl">

                <ReceiptText className="h-5 w-5 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />

              </div>

              <h3 className="text-base font-semibold text-dark sm:text-xl lg:text-2xl">
                Instant Quotations
              </h3>

              <p className="mt-3 text-xs leading-5 text-muted sm:mt-4 sm:text-base sm:leading-7">
                Receive pricing estimates and quotation guidance for
                wholesale and bulk purchases instantly.
              </p>

            </motion.div>

            {/* Card 3 */}

            <motion.div
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .6, delay: .2 }}
              className="glass rounded-2xl p-4 shadow-xl sm:rounded-3xl sm:p-6 lg:p-7"
            >

              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white sm:mb-6 sm:h-14 sm:w-14 lg:h-16 lg:w-16 sm:rounded-2xl">

                <Factory className="h-5 w-5 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />

              </div>

              <h3 className="text-base font-semibold text-dark sm:text-xl lg:text-2xl">
                Manufacturing
              </h3>

              <p className="mt-3 text-xs leading-5 text-muted sm:mt-4 sm:text-base sm:leading-7">
                Learn about our manufacturing process,
                production capacity and quality standards.
              </p>

            </motion.div>

            {/* Card 4 */}

            <motion.div
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .6, delay: .3 }}
              className="glass rounded-2xl p-4 shadow-xl sm:rounded-3xl sm:p-6 lg:p-7"
            >

              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white sm:mb-6 sm:h-14 sm:w-14 lg:h-16 lg:w-16 sm:rounded-2xl">

                <Headset className="h-5 w-5 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />

              </div>

              <h3 className="text-base font-semibold text-dark sm:text-xl lg:text-2xl">
                Customer Support
              </h3>

              <p className="mt-3 text-xs leading-5 text-muted sm:mt-4 sm:text-base sm:leading-7">
                Get answers about delivery,
                exports, product availability,
                orders and business inquiries 24/7.
              </p>

            </motion.div>

          </div>
        </div>
      </section>

    </main>
  );
}