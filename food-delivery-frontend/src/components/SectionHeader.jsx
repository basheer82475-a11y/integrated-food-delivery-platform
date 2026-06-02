import React from "react";

export default function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="space-y-3">
      {eyebrow ? (
        <div className="text-xs tracking-[0.35em] uppercase text-zinc-400">
          {eyebrow}
        </div>
      ) : null}
      <h2 className="text-2xl sm:text-3xl font-semibold text-white">
        {title}
      </h2>
      {subtitle ? (
        <p className="text-sm sm:text-base text-zinc-300 max-w-2xl">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

