# Sources and Verification

Audit date: 2026-10-11.

Primary source: https://www.canva.com/design/DAGJpyE4oe0/OQbqzlg1AIlNliLhPgT4XA/view

The research browser could not open Canva, but the Canva connector returned the full text and thumbnails for all four pages. Thumbnails are stored in `docs/sources/page-1.png` through `page-4.png`. Prices were matched visually rather than by extraction order. Each product in `src/config/catalog.json` records its source page.

| Page | Content | Catalog options |
| --- | --- | --- |
| 1 | 11 savory and 3 sweet cuscuz options | 14 |
| 2 | Lunch plates | 15 |
| 3 | 9 tapiocas, 1 sandwich, 6 side portions, 6 pastels, and 4 savory snacks | 26 |
| 4 | Pudding, cake in a jar, and 7 frozen treats | 9 |

Total: **64 options**, including flavors grouped together in the original. Editorial spelling was standardized. Ingredient descriptions follow the source; where ingredients or flavors are unspecified, the interface asks customers to contact the restaurant.

Examples showing why extraction order is unreliable: X-salada = BRL 18.00; fries and nuggets portion = BRL 50.00; Crocante tapioca = BRL 32.00; Calabresa tapioca = BRL 28.00; creamy ice pop = BRL 3.50. A residual extracted price of BRL 2.00 for beijinho does not correspond to a standalone product on the rendered page and was not published. Beijinho is a BRL 20.00 tapioca.

## Visual identity and assets

The Canva identity uses yellow, orange, cacti, northeastern Brazilian motifs, and a seal reading ?Sabor Nordestino?. The owner supplied the original logo at `public/images/logo cuscuzeira gourmet.jpg` (150 ? 150 pixels). It is used directly in the header and footer with its proportions preserved, and is the source of the favicon. The alternative SVG logo is not used as the official brand mark.

The requested refinement uses dark brown, corn yellow, green, and cream, with cordel-inspired display typography and original SVG artwork depicting the sertao. The reference https://fortalcuscuz.com.br/ was visually reviewed for its large photograph, dark/yellow contrast, and section organization. No photographs, logos, reviews, addresses, or commercial information from that reference were reused. The interactive menu appears on the home page and a dedicated page; all four original pages are also available on the website.

The owner confirmed authorization to use the logo and photographs from the supplied sources. The original logo is integrated. Menu photographs remain too small for a full-width hero, so the hero uses the visibly labeled AI illustration documented in [IMAGE-PROMPT.md](IMAGE-PROMPT.md). The catalog uses text-based cards to avoid repeating generic images for every product.

## Contact and delivery sources

Supplied Instagram: https://www.instagram.com/cuscuzgourmmet/. Access was throttled, and a public search for the handle returned no results. This source could not verify the biography, photographs, address, opening hours, or restaurant history.

WhatsApp supplied in the brief and reproduced on menu page 4: https://wa.me/5511990175768. The Instagram handle also appears on page 4.

The owner confirmed delivery through [the official iFood store](https://www.ifood.com.br/delivery/sao-paulo-sp/cuscuzeria-gourmet-sabor-nordestino-vila-teresinha/2ef57a2d-05c7-438d-8dac-9768740477d5?UTM_Medium=share). The research tool could not read the page; the link and delivery channel were supplied directly by the owner. No prices, estimates, ratings, or address were inferred from the URL. Buttons open the iFood store without automatically transferring the local cart. WhatsApp is presented as a contact and selection-inquiry channel.

## Outstanding commercial verification

- Validate current prices, availability, frozen-treat flavors, and unspecified ingredients.
- Confirm the address, opening hours, and pickup service. Delivery availability, prices, coverage, fees, and estimates are provided by iFood.
- Obtain suitable-resolution food photographs. The original logo is already in use; a larger file is optional for future print applications.
- Obtain the restaurant's actual history and approval of the copy and adapted identity.
- Confirm fine details using a high-resolution PDF before commercial use because the source thumbnails have limited resolution. All displayed prices were legible during visual verification.

## Cordel gallery artwork update

The owner supplied three images in `public/images/`: `xilografura nordestina casal.jpg`, `manifesto-1.png`, and `xilografura os violeiros.jpg`. These replace the generated SVG illustrations in the three cordel booklets. Original files, aspect ratios, lettering, and visible signatures are preserved. Paths, alternative text, and dimensions are configured in `src/config/cordel.json`.
