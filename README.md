# MãoLuz - E-commerce de Dispositivo LED

Site de checkout one-page otimizado para conversão, focado na venda do MãoLuz - dispositivo LED em formato de mão com controle remoto para comunicação visual no trânsito.

## 🚀 Tecnologias

- **React 19** + **TypeScript**
- **Tailwind CSS 4** + **shadcn/ui**
- **tRPC** para API type-safe
- **Infinitepay** para pagamentos
- **Framer Motion** para animações
- **Vite** para build

## 📦 Funcionalidades

- ✅ Checkout one-page otimizado para conversão
- ✅ Integração completa com Infinitepay (PIX, cartão, boleto)
- ✅ Prova social com 35+ notificações variadas
- ✅ Contador de urgência com timer regressivo
- ✅ Seletor manual de quantidade
- ✅ Cálculo dinâmico de preços e descontos
- ✅ Galeria de imagens do produto
- ✅ Avaliações de clientes
- ✅ FAQ completo
- ✅ Responsivo (mobile-first)

## 🛠️ Instalação Local

```bash
# Instalar dependências
pnpm install

# Rodar em desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Preview do build
pnpm preview
```

## 🌐 Deploy na Vercel

### Opção 1: Via Dashboard Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Importe o repositório do GitHub
4. Configure as variáveis de ambiente (se necessário)
5. Clique em "Deploy"

### Opção 2: Via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Deploy
vercel --prod
```

## 📝 Variáveis de Ambiente

Não há variáveis de ambiente obrigatórias. O handle do Infinitepay (`$ecasanovs`) está hardcoded no código.

Para alterar o handle, edite:
- `server/infinitepay.ts` (linha com `handle: "ecasanovs"`)

## 🎨 Personalização

### Alterar Preços

Edite `client/src/pages/Home.tsx`:

```typescript
const unitPrice = 149.99;
const unitOriginalPrice = 299.99;
const discount = "50%";
```

### Alterar Handle Infinitepay

Edite `server/infinitepay.ts`:

```typescript
handle: "seu_handle_aqui"
```

## 📊 SEO

O site está otimizado para SEO com:
- Meta tags completas (title, description, keywords)
- Open Graph (Facebook/WhatsApp)
- Twitter Cards
- Canonical URL
- Structured data (JSON-LD) - pode ser adicionado

## 📄 Licença

© 2026 MãoLuz™ - Todos os direitos reservados

## 🤝 Suporte

Para dúvidas ou suporte, entre em contato através do Infinitepay.
