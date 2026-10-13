import { SertaoArt } from "./SertaoArt";

function Woodcut({ kind }: { kind: "corn" | "music" }) {
  return (
    <svg viewBox="0 0 280 180" fill="none" aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {kind === "corn" ? <>
          <path d="M140 158C105 131 89 81 116 37Q140 10 159 37C185 79 174 126 140 158Z" fill="currentColor" />
          {Array.from({ length: 8 }, (_, i) => <path key={i} d={"M115 " + (44+i*12) + "q25 8 49-1"} stroke="var(--cordel-paper)" strokeWidth="2" />)}
          <path d="M134 34q-12 53 5 105m9-106q14 52-6 109" stroke="var(--cordel-paper)" strokeWidth="2" />
          <path d="M140 160Q77 150 65 77q50 8 75 83ZM142 158q58-15 76-89-54 14-76 89Z" fill="var(--cordel-paper)" />
          <path d="M80 96q38 31 58 60m62-68q-30 33-56 66M44 44l9 9m-1-20-7 7m179 84 10 5m-8-20 7-5" />
        </> : <>
          <path d="m53 55 39-8 14 92-39 8zM186 43l39 10-12 94-39-10z" fill="currentColor" />
          <path d="m94 52 90-3-10 83-70 4z" />
          {Array.from({ length: 8 }, (_, i) => <path key={i} d={"m"+(102+i*10)+" 53-5 78"} />)}
          {Array.from({ length: 6 }, (_, i) => <path key={i} d={"m61 "+(65+i*12)+" 27-4"} stroke="var(--cordel-paper)" />)}
          <path d="m202 68 6 1m-8 15 6 1m-8 15 6 1m-8 15 6 1" stroke="var(--cordel-paper)" strokeWidth="5" />
          <path d="M50 39V19l17-4v20m-17-4-8 3m25-8-7 3M234 37V20l12 3m-12 7-7 3M87 162q48-16 103 0" />
        </>}
      </g>
    </svg>
  );
}

const poems = [
  { title: "Do milho nasce o encontro", number: "01", kind: "corn", lines: ["Quando o milho vira massa,", "vai subindo um cheiro bom.", "A conversa ganha espaço,", "a cozinha ganha um tom.", "E o cuscuz chega à mesa", "feito verso de um baião."] },
  { title: "Um sertão de poesia", number: "02", kind: "landscape", lines: ["Tem o sol por testemunha,", "tem o verso no papel.", "Tem desenho feito em traço,", "tem história no cordel.", "Cada folha abre uma porta,", "cada rima, um carrossel."] },
  { title: "Sabor que vira cantiga", number: "03", kind: "music", lines: ["A sanfona puxa o fole,", "vem chegando o cantador.", "Entre um verso e uma prosa,", "vai passando o bom sabor.", "Nossa mesa fica cheia", "de conversa e de calor."] },
] as const;

export function CordelGallery() {
  return (
    <section className="cordel-gallery" aria-labelledby="cordel-title">
      <div className="wrap">
        <div className="cordel-heading">
          <span className="eyebrow">CULTURA QUE A GENTE LEVA À MESA</span>
          <h2 id="cordel-title">Nosso varal de <em>cordel.</em></h2>
          <p>Um pouco de verso, um tanto de prosa e muito Nordeste.</p>
        </div>
        <div className="cordel-clothesline">
          {poems.map(poem => (
            <article className={"cordel-booklet cordel-booklet-" + poem.kind} key={poem.number}>
              <div className="cordel-booklet-frame">
                <span className="cordel-edition">CUSCUZERIA GOURMET · Nº {poem.number}</span>
                <h3>{poem.title}</h3>
                <div className="cordel-print">{poem.kind === "landscape" ? <SertaoArt /> : <Woodcut kind={poem.kind} />}</div>
                <p className="cordel-verse">{poem.lines.map(line => <span key={line}>{line}</span>)}</p>
                <span className="cordel-booklet-mark" aria-hidden="true">✦ ━ ✦ ━ ✦</span>
              </div>
            </article>
          ))}
        </div>
        <p className="cordel-colophon">Versos originais da casa · Ilustrações inspiradas na xilogravura</p>
      </div>
    </section>
  );
}
