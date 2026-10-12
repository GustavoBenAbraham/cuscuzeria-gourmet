export function SertaoArt({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`sertao-art ${className}`}
      viewBox="0 0 480 350"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="306" cy="112" r="44" />
        <circle cx="306" cy="112" r="36" strokeWidth="1" />
        {Array.from({ length: 16 }, (_, i) => (
          <path
            key={i}
            d="M306 49v-19m-5 19 3-11"
            transform={`rotate(${i * 22.5} 306 112)`}
          />
        ))}
        <path d="M21 265q68-28 121-7t124-13 191 8M21 280q84-30 145-8t117-10 174 7M21 300q115-29 199-5t237-6M33 312l67-8m26 0 26 3m63 3 52-3m38-4 99 1m18 1 22 3M38 329l119-11m13 0 18 3m70 0 106-6m17 3 55 1" />
        <path
          d="M117 255V116q0-23 15-23t15 23v139M117 190H89q-18 0-18-21v-30q0-14 10-14t10 14v24h26M147 217h29q22 0 22-23v-42q0-14-10-14t-10 14v37h-31"
          fill="currentColor"
        />
        <path
          d="M127 119v130m10-135v133M81 137v32l8 8m100-24v45l-8 9"
          stroke="#fff1c8"
          strokeWidth="1.4"
        />
        <path d="M365 255v-55q0-13 8-13t8 13v55m-16-26h-17v-27m33 32h18v-33" />
        <path d="M221 229q16-44 35-3m-35 4 36-4M204 260l5-20m77 19 5-19m137 25-8-12M43 225q16-12 31 0m-16-3v8M210 81q12-9 25 0m-12-2v7M385 143q13-10 28 0m-14-2v7" />
        <path
          d="M35 56l12 5 5 12 5-12 12-5-12-5-5-12-5 12zM426 86l7 4 4 7 4-7 7-4-7-4-4-7-4 7z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
