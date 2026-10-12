# Cuscuzeria Gourmet

Aplicação demonstrativa React + TypeScript + Vite, com Tailwind CSS, React Router, Lucide, Motion, React Hook Form e Zod. Catálogo de 64 opções conferidas nas quatro páginas do cardápio oficial. Sem backend, pagamentos ou autenticação.

## Executar

Requer Node.js 22.12+ (validado com 24.19) e npm.

```sh
npm install
npm run dev
npm test
npm run build
npm run preview
```

No PowerShell, use `npm.cmd` caso a política de execução bloqueie `npm.ps1`. Abra o endereço impresso pelo Vite, normalmente http://127.0.0.1:5173. O build fica em `dist/`.

## Estrutura

```text
src/
  components/layout/   cabeçalho, menu mobile e rodapé
  components/ui/       arte ilustrativa SVG
  components/products/ cartões e controles de quantidade
  data/                catálogo e informações comerciais editáveis
  hooks/               estado e persistência do carrinho
  pages/               início, cardápio, pedido, história e contato
  services/            contrato assíncrono do catálogo
  types/               Product, Category, CartItem, RestaurantInfo, Order, OrderItem
  utils/               cálculos, sanitização e mensagem WhatsApp
  styles/              estilos responsivos e Tailwind
public/                favicon
docs/sources/          quatro páginas usadas para conferência
docs/SOURCES.md        auditoria das fontes e pendências
tests/                 verificações de navegador
```

## Comportamento

- Pesquisa sem distinção de acentos, categorias geradas a partir dos produtos, filtro de destaques e ordenação.
- Quantidades de 1 a 99, remoção, notas por item, subtotal calculado em centavos e carrinho persistido. Dados inválidos ou produtos indisponíveis são descartados na recuperação.
- Nome e observações gerais validados. Dados do formulário permanecem em memória; somente itens e notas do carrinho são salvos no navegador.
- A entrega é feita pelo iFood, no link oficial informado pelo usuário e configurado em `deliveryUrl`. Os botões abrem a loja; o cliente seleciona os itens e finaliza o pedido por lá. O carrinho local não é transferido automaticamente. Preços, disponibilidade, frete e prazo de delivery são os exibidos no iFood.
- O WhatsApp permite consultar o restaurante sobre os itens selecionados. O usuário prepara a mensagem e confirma o envio no WhatsApp; o site não presume recebimento nem limpa o carrinho automaticamente.
- `confirmedOrderModes` refere-se somente a modalidades atendidas diretamente pelo WhatsApp e permanece vazio. A entrega pelo iFood não habilita coleta de endereço ou fechamento de delivery pelo WhatsApp. Retirada ainda não foi confirmada.
- Sem frete, pagamento, prazo ou avaliação inventados. Preços representam a fonte consultada, não uma confirmação de vigência comercial.
- HTML semântico, foco por teclado, link para pular navegação, rótulos de formulário, erros anunciados, movimento reduzido, metadados básicos e Restaurant JSON-LD apenas com dados documentados.

## Atualizar catálogo e imagens

Edite `src/data/catalog.ts`. Use `verificationStatus: 'pending'`, `price: null` ou `available: false` quando um item não estiver confirmado; seu botão de pedido será desabilitado. Coloque imagens autorizadas em `public/images/` e use `/images/arquivo.webp` no campo `image`. O componente usa `loading="lazy"` e preserva proporções. O catálogo usa uma apresentação textual quando não há fotografia. A abertura usa uma imagem gerada por IA em `public/images/cuscuz-ilustrativo.jpg`, identificada como ilustrativa. Prompt e método estão em `docs/IMAGE-PROMPT.md`.

A logo original enviada pelo usuário está em `public/images/logo cuscuzeira gourmet.jpg`, usada pelo componente `BrandArtwork`. O arquivo tem 150 × 150 px e é exibido sem distorção. A direção visual nordestina está em `src/styles/nordeste.css`, com composição do sertão em `SertaoArt`. A referência Fortal Cuscuz foi usada para orientar a organização visual; nenhum conteúdo comercial ou fotografia de outro estabelecimento foi incorporado.

O cardápio aparece na home (categoria cuscuzes selecionada inicialmente) e em `/cardapio` (todas as 64 opções). Busca, categorias e controles funcionam nas duas telas. A seção expansível “Ver cardápio original” mostra as quatro páginas armazenadas em `public/images/cardapio/`.

`catalogService.getCatalog()` é o ponto de substituição para API REST. Preserve os tipos e IDs estáveis ao migrar para Spring Boot/PostgreSQL. A seleção local não representa reserva, estoque ou venda concluída.

## Verificação

`npm test` cobre cálculo monetário, recuperação de estado inválido, duplicatas, quantidades, itens pendentes e indisponíveis, número e codificação WhatsApp, conteúdo da mensagem e rejeição de modalidade não confirmada. O teste de catálogo verifica IDs, categorias, contagem e associações críticas de preços.

`npx playwright test` executa os testes de interface em Chrome instalado, com servidor Vite iniciado pelo teste. Verifica telas de 360, 768 e 1440 px, navegação, busca, persistência, quantidade e checkout. Não envia mensagens ao restaurante.

## Publicar

Hospede `dist/` em uma plataforma estática com fallback de URLs para `index.html`, necessário para React Router. Um exemplo Netlify está em `public/_redirects`. Em Nginx, use `try_files $uri $uri/ /index.html;`. Configure HTTPS e domínio; depois acrescente URL canônica e Open Graph com o domínio e uma imagem aprovada. O projeto possui manifesto Sites em `.openai/hosting.json` para publicação privada de demonstração.

Antes de uso comercial, valide todas as pendências em [docs/SOURCES.md](docs/SOURCES.md). A autorização de uso de fotos e logotipo já foi confirmada pelo usuário e a logo original está integrada. Para evolução: incorporar fotografias reais dos pratos em boa resolução, validar disponibilidade via API e criar painel de catálogo. As entregas seguem pelo iFood. Fontes Google são carregadas externamente, com fallback local para serif/sans-serif; para maior privacidade e desempenho, hospede os arquivos de fontes após obter as licenças.
