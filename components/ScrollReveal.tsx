"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import WelcomeScreen from "./WelcomeScreen";

export default function ScrollReveal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hideWelcome, setHideWelcome] = useState(false);

  useEffect(() => {
    document.body.style.overflow = hideWelcome ? "auto" : "hidden";
  }, [hideWelcome]);

  useEffect(() => {
    let accumulatedDelta = 0;
    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      console.log("deltaY:", e.deltaY);

      // If swipe UP gives negative values on your laptop
      if (e.deltaY > 0) {
        setHideWelcome(true);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      
      if (deltaY > 60) {
        setHideWelcome(true);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      console.log('Key event:', { key: e.key });

      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'w' || e.key === 'W') {
        setHideWelcome(true);
      }
    };

    window.addEventListener("wheel", handleWheel, {
      passive: true,
      capture: true,
    });
    
    window.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    window.addEventListener("touchend", handleTouchEnd, {
      passive: true,
    });

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel, true);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <>
      <WelcomeScreen hide={hideWelcome} />

      <motion.main
        animate={{
          opacity: hideWelcome ? 1 : 0,
          scale: hideWelcome ? 1 : 0.96,
        }}
        transition={{
          duration: 1,
        }}
        className="min-h-screen"
      >
        {children}
      </motion.main>
    </>
  );
}