export function CategoryArt({ category }: { category: string }) {
  const gelato = category === "gelados",
    dessert = category === "sobremesas";
  return (
    <svg
      className="food-art"
      viewBox="0 0 600 500"
      role="img"
      aria-label="Composição ilustrativa da categoria; não representa fotografia de produto"
    >
      <ellipse
        cx="300"
        cy="415"
        rx="210"
        ry="25"
        fill="#493724"
        opacity=".12"
      />
      {gelato ? (
        <>
          <path d="M208 257h184l-35 151H243z" fill="#7c3d76" />
          <path d="M216 270h168" stroke="#f4d4aa" strokeWidth="9" />
          <circle cx="260" cy="235" r="52" fill="#e5c798" />
          <circle cx="340" cy="233" r="55" fill="#714c34" />
          <circle cx="300" cy="170" r="58" fill="#d7999c" />
          <path
            d="M271 130q31-20 55 9"
            stroke="#f9d8d3"
            fill="none"
            strokeWidth="7"
          />
          <path d="M245 313h110" stroke="#d1a059" strokeWidth="4" />
          <path d="M260 340h80" stroke="#d1a059" strokeWidth="4" />
        </>
      ) : dessert ? (
        <>
          <ellipse
            cx="300"
            cy="369"
            rx="175"
            ry="54"
            fill="#fff9e8"
            stroke="#d8c6a4"
            strokeWidth="5"
          />
          <path d="M192 337l34-144h145l39 144q-80 62-218 0" fill="#e7ba64" />
          <ellipse cx="299" cy="194" rx="74" ry="29" fill="#995332" />
          <path
            d="M227 205q50 26 146-2l5 22q-5 18-12 7l-4-9q-10-11-14 14l-7 22q-15 10-15-12v-9q-3-8-13 2v27q-14 20-19-4l-2-16q-9-15-18 0l-2 4q-10 12-13-7v-15q-7-14-19-3z"
            fill="#ae6237"
          />
        </>
      ) : (
        <>
          <ellipse cx="300" cy="321" rx="235" ry="124" fill="#68704a" />
          <ellipse
            cx="300"
            cy="305"
            rx="216"
            ry="108"
            fill="#fff5dc"
            stroke="#dfd1af"
            strokeWidth="5"
          />
          {category === "tapiocas" ? (
            <>
              <path
                d="M150 323q135-237 305-37-118 139-305 37"
                fill="#f7e9c8"
                stroke="#d3bc86"
                strokeWidth="5"
              />
              <path
                d="M157 327q142-51 282-42"
                stroke="#d59c4c"
                strokeWidth="18"
              />
              <path
                d="M167 330q104-39 198-28"
                stroke="#a55937"
                strokeWidth="9"
              />
              <path
                d="M183 254q100-92 177-39"
                stroke="#fff7df"
                strokeWidth="12"
                fill="none"
              />
            </>
          ) : category === "lanches" ? (
            <>
              <path d="M170 257q10-108 132-104t132 104z" fill="#dba04c" />
              <path d="M177 264h251" stroke="#6c843b" strokeWidth="19" />
              <path d="M183 281h239" stroke="#c25637" strokeWidth="17" />
              <path d="M186 299h234" stroke="#62412b" strokeWidth="26" />
              <path d="M180 323h249q-5 40-126 37t-123-37" fill="#dba04c" />
              <g stroke="#fff0c7" strokeWidth="6">
                <path d="M229 201l10 5m43-24 8 7m56 7 8-6m22 42 10 5" />
              </g>
            </>
          ) : category === "executivos" ? (
            <>
              <ellipse cx="241" cy="289" rx="86" ry="57" fill="#f0e3bc" />
              <path
                d="M313 221q57-22 98 31l-20 76q-53 28-104-12z"
                fill="#995633"
              />
              <g stroke="#663b27" strokeWidth="5">
                <path d="M324 233l62 70m-75-54 58 69m-36-98 64 64" />
              </g>
              <ellipse cx="240" cy="323" rx="58" ry="38" fill="#fff9e2" />
              <circle cx="238" cy="321" r="22" fill="#f6b73b" />
              <g fill="#6f8c43">
                <ellipse
                  cx="178"
                  cy="225"
                  rx="35"
                  ry="14"
                  transform="rotate(-25 178 225)"
                />
                <ellipse cx="212" cy="204" rx="30" ry="15" />
              </g>
            </>
          ) : category === "porcoes" ? (
            <>
              <g fill="#efbe58" stroke="#d89b39" strokeWidth="3">
                <path d="M171 264l129-48 9 17-131 50z" />
                <path d="M210 305l139-83 10 16-137 84z" />
                <path d="M191 313l139 32-6 17-138-31z" />
                <path d="M245 261l-32 103 20 6 33-104z" />
                <path d="M276 309l112-38 6 20-113 38z" />
              </g>
              <g fill="#a96636" stroke="#8c502b" strokeWidth="3">
                <rect
                  x="328"
                  y="300"
                  width="57"
                  height="41"
                  rx="16"
                  transform="rotate(18 328 300)"
                />
                <rect x="368" y="220" width="60" height="45" rx="15" />
              </g>
            </>
          ) : (
            <>
              <path
                d="M166 322q-17-35 27-91l44-54 30 87q35 65-14 92-59 26-87-34"
                fill="#c38b42"
                stroke="#a46c2d"
                strokeWidth="4"
              />
              <path
                d="M312 229l112 56-101 63-52-68z"
                fill="#deb66a"
                stroke="#ae7d34"
                strokeWidth="5"
              />
              <path
                d="M318 246l85 41-80 47"
                fill="none"
                stroke="#ecca85"
                strokeWidth="4"
              />
              <g fill="#f0cc83">
                <circle cx="203" cy="270" r="3" />
                <circle cx="225" cy="290" r="3" />
                <circle cx="202" cy="308" r="3" />
              </g>
            </>
          )}
        </>
      )}
    </svg>
  );
}
