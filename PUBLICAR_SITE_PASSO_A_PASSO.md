# Passo a passo para publicar o site da Cuscuzeria Gourmet

Este guia mostra o que falta para levar o site para o ar, considerando que o projeto já está funcionando localmente e visualmente pronto.

## 1) Verificar se o projeto está pronto

Antes de publicar, confirme:

- o site roda localmente sem erros
- os testes passaram
- o build de produção funciona
- os links de WhatsApp, iFood, Instagram e telefone estão corretos
- as imagens e textos finais foram revisados

Comando para validar:

```bash
npm run build
```

## 2) Subir o projeto para o GitHub

Se ainda não estiver em um repositório GitHub:

1. Crie um repositório no GitHub
2. Conecte o projeto local ao repositório
3. Faça o primeiro push

Exemplo:

```bash
git init
git add .
git commit -m "Primeiro deploy"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
git push -u origin main
```

## 3) Escolher a hospedagem

Recomendação: Vercel

Por quê:
- funciona muito bem com React + Vite
- deploy simples
- SSL automático
- domínio customizado fácil de configurar

## 4) Fazer deploy no Vercel

1. Acesse https://vercel.com
2. Faça login com GitHub
3. Clique em "Add New Project"
4. Selecione o repositório do projeto
5. Configure:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Clique em "Deploy"

Se tudo estiver correto, o Vercel gera um link de preview.

## 5) Validar o site em produção

Após o deploy, abra o link gerado e teste:

- página inicial
- botão do WhatsApp
- botão do iFood
- redes sociais
- menu e navegação
- versão mobile
- formulário / checkout, se houver

## 6) Configurar o domínio

Quando o site estiver no ar, o próximo passo é adicionar o domínio personalizado.

### Opção A: comprar um domínio novo

Escolha um registrador como:
- GoDaddy
- Hostinger
- Registro.br
- Cloudflare Registrar

### Opção B: usar um domínio já existente

Se você já tiver domínio, basta usar esse mesmo.

## 7) Configurar DNS

No painel do seu domínio, configure os registros conforme indicado pelo Vercel.

Em geral, o Vercel indica algo como:

- `A` ou `ALIAS`: apontando para o IP do Vercel
- `CNAME`: apontando para o domínio do Vercel

Se for usar `www`, normalmente a configuração é:

- `www` -> `CNAME` -> `seu-projeto.vercel.app`

Se for domínio raiz:

- `@` -> `A` / `ALIAS` -> apontar para a infraestrutura do Vercel

## 8) Ativar HTTPS

O Vercel normalmente ativa o SSL automaticamente assim que o domínio estiver apontando corretamente.

Pode levar alguns minutos para ficar ativo.

## 9) Revisar antes de publicar oficialmente

Antes de divulgar o site, confirme:

- nome do restaurante está correto
- endereço está certo
- WhatsApp está correto
- Instagram está correto
- iFood está correto
- telefone está correto
- horários de funcionamento estão corretos
- textos estão finalizados
- o site abre bem em celular
- o botão de compra/WhatsApp está funcionando

## 10) Checklist final antes de "ir ao ar"

- [ ] Projeto no GitHub
- [ ] Deploy no Vercel realizado
- [ ] Link de preview validado
- [ ] Domínio escolhido
- [ ] DNS configurado
- [ ] SSL/HTTPS ativado
- [ ] Links de contato testados
- [ ] SEO básico ajustado
- [ ] Favicon e imagem de compartilhamento configurados
- [ ] Mobile validado
- [ ] Conteúdo final revisado

## 11) Dicas de SEO básico

Para melhorar a apresentação do site em busca e redes sociais:

- título da página: "Cuscuzeria Gourmet | Sabor Nordestino"
- meta description: "Cuscuzeria Gourmet: sabores nordestinos, cuscuz, tapioca, pratos executivos e sobremesas."
- favicon
- imagem social (Open Graph)

## 12) O que normalmente fica para depois

Depois da publicação inicial, você pode fazer:

- adicionar Google Analytics
- adicionar pixel de redes sociais
- melhorar conteúdo do blog/empresa
- adicionar mapa do endereço
- criar campanhas de WhatsApp ou iFood
- acrescentar mais fotos do restaurante

## 13) Resumo prático

O que falta para o site ir ao ar não é código, e sim:

1. GitHub
2. Deploy na hospedagem
3. Domínio
4. DNS
5. HTTPS
6. Teste final

O site já está quase pronto para esse processo.

## 14) Recomendação final

Para esse projeto, a melhor rota é:

- GitHub
- Vercel
- domínio comprado ou existente
- SSL automático
- testar tudo em produção

Se você seguir esses passos, o projeto estará pronto para ficar online.
