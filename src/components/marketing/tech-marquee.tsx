"use client";

import React from "react";
import Image from "next/image";

const LOGOS = [
  {
    name: "HTML5",
    image: "https://cdn.simpleicons.org/html5/E34F26",
  },
  {
    name: "CSS3",
    image: "https://cdn.simpleicons.org/css/1572B6",
  },
  {
    name: "Tailwind CSS",
    image: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
  },
  {
    name: "JavaScript",
    image: "https://cdn.simpleicons.org/javascript/F7DF1E",
  },
  {
    name: "TypeScript",
    image: "https://cdn.simpleicons.org/typescript/3178C6",
  },
  {
    name: "Next.js",
    image: "https://cdn.simpleicons.org/nextdotjs/000000",
  },
  {
    name: "React",
    image: "https://cdn.simpleicons.org/react/61DAFB",
  },
  {
    name: "Node.js",
    image: "https://cdn.simpleicons.org/nodedotjs/339933",
  },
  {
    name: "PostgreSQL",
    image: "https://cdn.simpleicons.org/postgresql/4169E1",
  },
  {
    name: "Git",
    image: "https://cdn.simpleicons.org/git/F05032",
  },
  {
    name: "GitHub",
    image: "https://cdn.simpleicons.org/github/181717",
  },
];

// Reorder logos for each column to make them unique
const COLUMNS = [
  [...LOGOS].sort(() => Math.random() - 0.5),
  [...LOGOS].sort(() => Math.random() - 0.5),
  [...LOGOS].sort(() => Math.random() - 0.5),
  [...LOGOS].sort(() => Math.random() - 0.5),
];

const DURATIONS = ["28s", "34s", "30s", "36s"];
const DELAYS = ["-2s", "-8s", "-15s", "-5s"];

export function TechMarquee() {
  return (
    <div className="relative h-[480px] w-full overflow-hidden rounded-[40px] bg-canvas p-6 md:h-[600px] md:p-8">
      {/* Fading Edges */}
      <div className="absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-canvas to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-canvas to-transparent pointer-events-none" />

      <div className="grid h-full grid-cols-4 gap-4 md:gap-6">
        {COLUMNS.map((column, colIdx) => (
          <div key={colIdx} className="relative h-full overflow-hidden">
            <div
              className="animate-marquee-vertical flex flex-col gap-4 md:gap-6"
              style={{
                animationDuration: DURATIONS[colIdx],
                animationDelay: DELAYS[colIdx],
              }}
            >
              {/* Double the items for seamless loop */}
              {[...column, ...column].map((tech, techIdx) => (
                <div
                  key={`${colIdx}-${techIdx}`}
                  className="group relative flex aspect-square w-[88%] mx-auto items-center justify-center overflow-hidden rounded-[24px] bg-white shadow-[0_12px_40px_rgba(6,44,39,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(6,44,39,0.12)]"
                >
                  <div className="relative h-full w-full p-6 md:p-8">
                    <Image
                      src={tech.image}
                      alt={tech.name}
                      fill
                      sizes="(max-width: 768px) 20vw, 100px"
                      className="object-contain transition-transform duration-500 group-hover:scale-110"
                      unoptimized
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
