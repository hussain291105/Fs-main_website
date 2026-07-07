import React from "react";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlowCard({ children, className = "" }: GlowCardProps) {
  return (
    <div className={`glass rounded-4xl p-8 transition duration-300 hover:-translate-y-2 hover:shadow-glow ${className}`}>
      {children}
    </div>
  );
}
