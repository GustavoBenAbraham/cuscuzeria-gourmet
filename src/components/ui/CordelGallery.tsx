import { copy } from "../../config/content";
import entries from "../../config/cordel.json" with { type: "json" };
import { cordelSchema } from "../../config/schema";
const poems = cordelSchema.parse(entries);
export function CordelGallery() {
  return (
    <section className="cordel-gallery" aria-labelledby="cordel-title">
      <div className="wrap">
        <div className="cordel-heading">
          <span className="eyebrow">{copy.CordelGallery.eyebrow}</span>
          <h2 id="cordel-title">{copy.CordelGallery.title}<em>{copy.CordelGallery.titleAccent}</em></h2>
          <p>{copy.CordelGallery.description}</p>
        </div>
        <div className="cordel-clothesline">
          {poems.map(poem => (
            <article className={"cordel-booklet cordel-booklet-" + poem.kind} key={poem.number}>
              <div className="cordel-booklet-frame">
                <span className="cordel-edition">{copy.CordelGallery.editionLabel}{poem.number}</span>
                <h3>{poem.title}</h3>
                <div className="cordel-print"><img src={poem.image.src} alt={poem.image.alt} width={poem.image.width} height={poem.image.height} loading="lazy" decoding="async" /></div>
                <p className="cordel-verse">{poem.lines.map(line => <span key={line}>{line}</span>)}</p>
                <span className="cordel-booklet-mark" aria-hidden="true">{copy.CordelGallery.ornament}</span>
              </div>
            </article>
          ))}
        </div>
        <p className="cordel-colophon">{copy.CordelGallery.credit}</p>
      </div>
    </section>
  );
}
