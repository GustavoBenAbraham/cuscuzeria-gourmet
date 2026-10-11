export function FoodArt({
  variant = "cuscuz",
  hero = false,
}: {
  variant?: string;
  hero?: boolean;
}) {
  const sweet = variant === "doces-cuscuz";
  return (
    <svg
      className={hero ? "food-art hero-art" : "food-art"}
      viewBox="0 0 600 500"
      role="img"
      aria-label="Ilustração de prato nordestino; não representa fotografia do restaurante"
    >
      <defs>
        <radialGradient id={`corn-${variant}`}>
          <stop stopColor="#ffd867" />
          <stop offset="1" stopColor="#d89b2e" />
        </radialGradient>
        <pattern
          id={`grain-${variant}`}
          width="15"
          height="13"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="3" cy="3" r="1.5" fill="#fff0a0" />
          <path d="M9 8l3 1" stroke="#a87124" opacity=".3" />
        </pattern>
      </defs>
      <ellipse
        cx="300"
        cy="410"
        rx="236"
        ry="43"
        fill="#442e1b"
        opacity=".12"
      />
      <ellipse cx="300" cy="330" rx="254" ry="128" fill="#68704a" />
      <ellipse
        cx="300"
        cy="316"
        rx="237"
        ry="111"
        fill="#fff5dc"
        stroke="#dfd1af"
        strokeWidth="5"
      />
      <ellipse cx="296" cy="320" rx="194" ry="85" fill="#e9ddbf" />
      <path
        d="M175 318l18-147c4-70 204-70 212 0l22 147c-1 64-253 66-252 0"
        fill={`url(#corn-${variant})`}
      />
      <path
        d="M175 318l18-147c4-70 204-70 212 0l22 147c-1 64-253 66-252 0"
        fill={`url(#grain-${variant})`}
      />
      <ellipse cx="299" cy="166" rx="105" ry="38" fill="#f6c34d" />
      <path
        d="M210 190q26-27 58-12t71-8q30-15 46 8"
        fill="none"
        stroke={sweet ? "#a53939" : "#955033"}
        strokeWidth="24"
        strokeLinecap="round"
      />
      <g fill={sweet ? "#bb4141" : "#a75a37"}>
        <ellipse cx="226" cy="165" rx="23" ry="13" />
        <ellipse cx="280" cy="153" rx="25" ry="13" />
        <ellipse cx="337" cy="165" rx="23" ry="14" />
      </g>
      <g fill="#fff0b8">
        <rect
          x="242"
          y="140"
          width="31"
          height="25"
          rx="4"
          transform="rotate(18 242 140)"
        />
        <rect
          x="306"
          y="149"
          width="31"
          height="24"
          rx="4"
          transform="rotate(-16 306 149)"
        />
        <rect x="353" y="141" width="27" height="24" rx="4" />
      </g>
      <g fill="#4f683c">
        <path d="M300 164q-35-52-43-25t43 25q31-54 44-28t-44 28" />
        <path d="M162 340q-55-44-67-9t67 9q-16 61-39 33t39-33" />
        <path d="M444 337q26-49 43-26t-43 26q64 1 36 25t-36-25" />
      </g>
      <g fill="#c65538">
        <circle cx="125" cy="302" r="12" />
        <circle cx="475" cy="338" r="11" />
        <circle cx="452" cy="363" r="10" />
      </g>
      <g fill="#f8de85">
        <path d="M153 377l32-13 9 18-33 10z" />
        <path d="M382 382l26-19 13 18-28 19z" />
      </g>
    </svg>
  );
}
