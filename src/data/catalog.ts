import type { Category, Product } from "../types";
import { restaurant } from "./restaurant";
export const categories: Category[] = [
  { id: "cuscuz", name: "Cuscuzes salgados" },
  { id: "doces-cuscuz", name: "Cuscuzes doces" },
  { id: "executivos", name: "Pratos executivos" },
  { id: "tapiocas", name: "Tapiocas" },
  { id: "lanches", name: "Lanches" },
  { id: "porcoes", name: "Porções" },
  { id: "salgados", name: "Salgados fritos" },
  { id: "sobremesas", name: "Doces e sobremesas" },
  { id: "gelados", name: "Sorvetes e açaí" },
];
const products: Product[] = [];
function add(
  categoryId: string,
  page: number,
  rows: [string, number, string][],
) {
  rows.forEach(([name, price, description]) =>
    products.push({
      id: `${categoryId}-${products.length + 1}`,
      name,
      price,
      description,
      categoryId,
      image: null,
      available: true,
      featured: [
        "Cuscuz Carne Seca e Catupiry",
        "Cuscuz Nordestino Especial",
        "Cuscuz Doce Romeu & Julieta",
      ].includes(name),
      tags: [],
      source: { url: restaurant.menu, page },
      verificationStatus: "verified",
    }),
  );
}
add("cuscuz", 1, [
  [
    "Cuscuz Original",
    14,
    "Cuscuz tradicional finalizado com leite ou manteiga.",
  ],
  [
    "Cuscuz Proteico",
    28,
    "Cuscuz tradicional recheado com queijo coalho, acompanhado de 2 ovos.",
  ],
  [
    "Cuscuz Top das Galáxias",
    40,
    "Bacon e queijo coalho na massa, recheio de carne seca e catupiry, acompanhado de vinagrete.",
  ],
  [
    "Cuscuz Nordestino Especial",
    37,
    "Carne seca, cubos de queijo coalho assado e vinagrete da casa.",
  ],
  [
    "Cuscuz Carne Seca e Catupiry",
    35,
    "Cuscuz tradicional recheado com carne seca e catupiry, acompanhado de vinagrete da casa.",
  ],
  [
    "Cuscuz à Moda da Casa",
    38,
    "Frango desfiado, bacon e catupiry, coberto com queijo coalho e acompanhado de vinagrete.",
  ],
  [
    "Cuscuz Tudo de Bom",
    37,
    "Recheado com mussarela, acompanhado de carne seca, calabresa e ovo frito.",
  ],
  [
    "Cuscuz Frango e Catupiry",
    30,
    "Frango desfiado e catupiry, acompanhado de banana e vinagrete.",
  ],
  [
    "Cuscuz Tradicional",
    23,
    "Cuscuz tradicional acompanhado de leite e 2 ovos.",
  ],
  [
    "Cuscuz Calabresa Acebolada",
    30,
    "Recheado com mussarela, acompanhado de calabresa acebolada e vinagrete da casa.",
  ],
  [
    "Cuscuz Arretado de Bom",
    37,
    "Bacon e queijo coalho na massa, recheado com calabresa e catupiry, acompanhado de vinagrete.",
  ],
]);
add("doces-cuscuz", 1, [
  [
    "Cuscuz Doce Creme de Avelã e Coco",
    26,
    "Coco na massa, coberto com creme de avelã e coco.",
  ],
  [
    "Cuscuz Doce Romeu & Julieta",
    26,
    "Recheado com queijo coalho e goiabada, coberto com creme de goiaba.",
  ],
  [
    "Cuscuz Doce Casal Perfeito",
    26,
    "Coco na massa, coberto com leite condensado e coco em lâminas.",
  ],
]);
add(
  "executivos",
  2,
  (
    [
      ["Bife", 28, "Bife"],
      ["Filé de Frango", 26, "Filé de frango"],
      ["Bisteca Suína", 26, "Bisteca suína"],
      ["Carne de Panela", 28, "Carne de panela"],
      ["Frango ao Molho", 26, "Frango ao molho"],
      ["Filé de Tilápia", 38, "Filé de tilápia frito"],
      ["Frango à Parmegiana", 35, "Parmegiana de frango"],
      ["Linguiça Toscana", 26, "Linguiça toscana"],
      ["Bife à Parmegiana", 39, "Parmegiana de carne"],
      ["Fígado Acebolado", 26, "Fígado acebolado"],
      ["Omelete", 28, "Omelete com legumes"],
      ["Calabresa", 26, "Calabresa acebolada"],
      ["Frango à Milanesa", 28, "Frango empanado"],
      ["Bife à Milanesa", 30, "Bife empanado"],
      ["Coxa com Sobrecoxa", 28, "Coxa com sobrecoxa frita"],
    ] as [string, number, string][]
  ).map(([n, p, d]) => [
    n,
    p,
    `${d}, arroz, macarrão, feijão, salada, fritas e ovo.`,
  ]),
);
add("tapiocas", 3, [
  ["Tapioca Tradicional", 9, "Tapioca tradicional com manteiga."],
  ["Tapioca Beijinho", 20, "Recheada com coco e leite condensado."],
  [
    "Tapioca Crocante",
    32,
    "Queijo coalho na massa, recheada com carne seca e catupiry.",
  ],
  [
    "Tapioca Carne Seca com Mussarela",
    26,
    "Recheada com carne seca e mussarela.",
  ],
  ["Tapioca Ovo e Queijo", 18, "Recheada com ovos e queijo."],
  [
    "Tapioca Calabresa",
    28,
    "Calabresa com mussarela ou catupiry. Informe sua escolha nas observações.",
  ],
  ["Tapioca Creme de Avelã", 27, "Recheada com creme de avelã."],
  ["Tapioca Frango", 25, "Recheada com frango e catupiry."],
  ["Tapioca Presunto e Queijo", 16, "Recheada com presunto e queijo."],
]);
add("lanches", 3, [
  [
    "X-salada",
    18,
    "Ingredientes não detalhados no cardápio; consulte o restaurante.",
  ],
]);
add("porcoes", 3, [
  ["Porção de Batata e Nuggets", 50, "Batata frita e nuggets."],
  [
    "Porção de Batata Frita Individual",
    12,
    "Porção individual de batata frita.",
  ],
  [
    "Fritas Grande, Cheddar e Calabresa",
    30,
    "Batata frita com cheddar e calabresa.",
  ],
  ["Porção Calabresa e Fritas", 50, "Calabresa e batata frita."],
  ["Mix Calabresa, Nuggets e Fritas", 70, "Calabresa, nuggets e batata frita."],
  ["Porção Calabresa e Nuggets", 50, "Calabresa e nuggets."],
]);
add("salgados", 3, [
  ...["Carne", "Frango", "Calabresa", "Presunto e Queijo"].map(
    (n) =>
      [`Pastel ${n}`, 14, "Pastel frito; sabor indicado no nome."] as [
        string,
        number,
        string,
      ],
  ),
  [
    "Pastel Carne Seca e Queijo",
    18,
    "Pastel frito recheado com carne seca e queijo.",
  ],
  ["Pastel Queijo Coalho", 18, "Pastel frito recheado com queijo coalho."],
  ...["Coxinha", "Quibe", "Risole", "Bolinho de Carne"].map(
    (n) =>
      [n, 7, "Salgado frito. Consulte os ingredientes com o restaurante."] as [
        string,
        number,
        string,
      ],
  ),
]);
add("sobremesas", 4, [
  ["Pudim 150 ml", 11, "Pudim na porção de 150 ml."],
  ["Bolo de Pote", 13, "Consulte os sabores disponíveis."],
]);
add("gelados", 4, [
  ["Açaí 1 L", 45, "Embalagem de 1 litro. Consulte acompanhamentos."],
  ["Sorvete 1 L", 27, "Embalagem de 1 litro. Consulte os sabores."],
  ["Sorvete 2 L", 40, "Embalagem de 2 litros. Consulte os sabores."],
  ["Gelinho", 8, "Consulte os sabores disponíveis."],
  ["Picolé Cremoso", 3.5, "Consulte os sabores disponíveis."],
  ["Picolé com Casquinha", 5, "Consulte os sabores disponíveis."],
  ["Copinho", 9, "Consulte os sabores disponíveis."],
]);
export { products };
