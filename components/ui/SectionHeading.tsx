import React from "react";

interface SectionHeadingProps {
  title: string;
  subtitle: string;
  center?: boolean;
}

export default function SectionHeading({ title, subtitle, center = false }: SectionHeadingProps) {
  return (
    <div className={`mb-16 ${center ? "text-center" : ""}`}>
      <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">
        {subtitle}
      </p>
      <h2 className="text-4xl md:text-5xl font-semibold leading-tight text-dark">
        {title}
      </h2>
    </div>
  );
}
