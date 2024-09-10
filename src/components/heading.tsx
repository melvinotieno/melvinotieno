"use client";

import { useEffect, useState } from "react";

export default function Heading({
  animate,
  inanimate,
  className = "mb-12",
}: Readonly<{ animate?: string; inanimate?: string; className?: string }>) {
  const [animated, setAnimated] = useState(
    inanimate ? "" : (animate?.charAt(0) ?? ""),
  );

  useEffect(() => {
    if (!animate) return;

    let currentIndex = inanimate ? 0 : 1;

    const interval = setInterval(() => {
      // Display a new character from the text to animate.
      const char = animate.charAt(currentIndex);
      setAnimated((prev) => prev + char);

      currentIndex++;

      // Clear interval when we've displayed the entire animated text.
      if (currentIndex === animate.length) clearInterval(interval);
    }, 150);

    // We must clear the interval when the component unmounts.
    return () => clearInterval(interval);
  }, [animate, inanimate]);

  return (
    <h1 className={`font-mono text-3xl font-bold ${className}`}>
      {inanimate} {animated}
    </h1>
  );
}
