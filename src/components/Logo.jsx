import React from "react";

export default function Logo({
  size = "default",
  light = false,
  className = "",
  showText = true,
}) {
  const isLarge = size === "large";
  const isSmall = size === "small";

  const imgSizeClass = isSmall
    ? "h-14 sm:h-16 w-auto max-h-16"
    : isLarge
      ? "h-16 sm:h-20 w-auto max-h-20"
      : "h-14 sm:h-16 w-auto";

  return (
    <div
      className={`inline-flex items-center select-none cursor-pointer group ${className}`}
    >
      <img
        src="/images/new-logo.png?v=2"
        alt="Mangi Interiors"
        className={`${imgSizeClass} object-contain shrink-0 transition-transform duration-200 group-hover:scale-105`}
        loading="eager"
        decoding="sync"
      />
    </div>
  );
}
