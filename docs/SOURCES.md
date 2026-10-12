# Fontes e conferência — 11 de outubro de 2026

Fonte de verdade: https://www.canva.com/design/DAGJpyE4oe0/OQbqzlg1AIlNliLhPgT4XA/view

O navegador de pesquisa não conseguiu abrir o Canva, mas o conector Canva retornou o texto integral e as miniaturas de todas as quatro páginas. As miniaturas estão em `docs/sources/page-1.png` até `page-4.png`. Os valores foram associados visualmente, não pela ordem de extração. Cada produto em `src/data/catalog.ts` registra a página de origem.

| Página | Conteúdo | Opções no catálogo |
| --- | --- | --- |
| 1 | 11 cuscuzes salgados e 3 doces | 14 |
| 2 | Pratos executivos | 15 |
| 3 | 9 tapiocas, 1 lanche, 6 porções, 6 pastéis e 4 salgados | 26 |
| 4 | Pudim, bolo de pote e 7 gelados | 9 |

Total: **64 opções**, incluindo os sabores que aparecem agrupados no original. Mantida a grafia editorial padronizada. Descrições de ingredientes seguem o original; quando a fonte não detalha ingredientes ou sabores, a interface solicita consulta ao restaurante.

Associações que demonstram por que a ordem de texto não deve ser usada: X-salada = R$ 18,00; porção de batata e nuggets = R$ 50,00; tapioca Crocante = R$ 32,00; tapioca Calabresa = R$ 28,00; picolé cremoso = R$ 3,50. O preço de beijinho R$ 2,00 aparece como texto residual na extração, mas não existe como produto independente na página renderizada; não foi publicado. Beijinho é uma tapioca de R$ 20,00.

A identidade observada no Canva usa amarelo, laranja, cactos, elementos nordestinos e um selo com a frase “Sabor Nordestino”. O usuário forneceu a logo original em `public/images/logo cuscuzeira gourmet.jpg` (150 × 150 px), agora usada diretamente no cabeçalho e no rodapé, preservando suas proporções. A versão SVG alternativa não é usada como marca oficial.

O refinamento solicitado usa marrom escuro, amarelo-milho, verde e creme, tipografia de destaque inspirada em cordel e uma composição SVG original do sertão. A referência https://fortalcuscuz.com.br/ foi analisada visualmente no navegador: foto ampla, contraste escuro/amarelo e organização de seções. Nenhuma foto, logotipo, avaliação, endereço ou informação comercial dessa referência foi reaproveitada. O cardápio interativo aparece na home e na página dedicada; as quatro páginas originais também podem ser consultadas no próprio site.

Instagram informado: https://www.instagram.com/cuscuzgourmmet/ — acesso limitado por throttling. Busca pública pelo identificador não retornou resultados. Não foi possível confirmar biografia, fotografias, endereço, horários ou história por essa fonte.

WhatsApp informado no briefing e telefone reproduzido na página 4: https://wa.me/5511990175768. O perfil @cuscuzgourmmet também aparece na página 4.

O usuário confirmou nesta conversa que já possui autorização. O uso do logotipo e das fotografias das fontes fornecidas não depende de uma nova autorização. A logo fornecida já está integrada. As fotografias disponíveis no cardápio ainda têm resolução muito pequena; a abertura usa a imagem ilustrativa por IA documentada em `IMAGE-PROMPT.md`, com indicação visível. O catálogo adota apresentação textual para evitar repetir imagens genéricas em cada produto.

## Pendências para aprovação comercial

Entrega confirmada pelo usuário via iFood: https://www.ifood.com.br/delivery/sao-paulo-sp/cuscuzeria-gourmet-sabor-nordestino-vila-teresinha/2ef57a2d-05c7-438d-8dac-9768740477d5?UTM_Medium=share . A página não pôde ser lida pela ferramenta de pesquisa; o vínculo e o canal de entrega foram fornecidos diretamente pelo usuário. Nenhum preço, prazo, avaliação ou endereço foi deduzido da URL. Os botões abrem a loja no iFood, sem transferência automática do carrinho. O WhatsApp é apresentado como contato e consulta sobre a seleção.

- Validar preços atuais, disponibilidade, sabores de gelados e ingredientes não detalhados.
- Confirmar endereço, horários e atendimento para retirada. Para delivery, disponibilidade, preços, área de atendimento, frete e prazo são consultados no iFood.
- Obter fotografias dos pratos em resolução adequada. A logo original fornecida já está em uso; um arquivo maior é opcional para futuras aplicações impressas.
- Receber a história verdadeira do restaurante e aprovar os textos e a identidade adaptada.
- O original tem resolução limitada nas miniaturas; confirmar detalhes finos com PDF de alta resolução antes de uso comercial. Todos os valores exibidos foram legíveis na conferência visual.
