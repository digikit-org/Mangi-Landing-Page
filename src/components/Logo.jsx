import React from "react";

export default function Logo({
  size = "default",
  light = false,
  className = "",
}) {
  const isLarge = size === "large";
  const isSmall = size === "small";

  // Sleek, refined logo dimensions
  const logoWidth = isLarge ? 140 : isSmall ? 90 : 105;

  return (
    <div
      className={`flex items-center select-none cursor-pointer group ${className}`}
    >
      <img
        src={light ? "/images/logo_light.png" : "/images/logo_dark.png"}
        alt="Mangi Interiors"
        width={logoWidth}
        style={{ width: `${logoWidth}px`, height: "auto" }}
        className="h-auto object-contain transition-transform duration-200 group-hover:scale-102 drop-shadow-sm"
      />
    </div>
  );
}
