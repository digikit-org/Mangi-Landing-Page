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
    ? "h-9 w-9 sm:h-10 sm:w-10"
    : isLarge
      ? "h-14 w-14 sm:h-16 sm:w-16"
      : "h-11 w-11";

  return (
    <div
      className={`flex items-center gap-2 sm:gap-2.5 select-none cursor-pointer group ${className}`}
    >
      <img
        src="/images/mangi-logo.png"
        alt="Mangi Interiors"
        className={`${imgSizeClass} object-contain shrink-0 transition-transform duration-200 group-hover:scale-105`}
      />
      {showText && <div className="flex flex-col"></div>}
    </div>
  );
}
