# rules.md

# MAVI — Regras de Implementação (Landing Marketing)

## 1) Escopo
- Landing **estática** (HTML/CSS/JS) focada em conversão.
- Sem dependência de frameworks.
- Variante opcional para A/B test.

## 2) Qualidade e performance
- Priorizar Lighthouse alto (Performance/SEO/A11y).
- CSS e JS mínimos, carregamento rápido, imagens leves.
- Sem bibliotecas externas desnecessárias.

## 3) Acessibilidade
- Semântica HTML correta (header/nav/main/section/footer).
- Foco visível, navegação por teclado.
- ARIA apenas quando necessário.
- Respeitar `prefers-reduced-motion` (animações suaves e opcionais).

## 4) Brand guardrails (A + B)
- Base: clean SaaS (A).  
- “Areia” e “dourado” (B) apenas em **1–2 seções** e **microdetalhes**.
- Evitar excesso de vermelho/alertas.
- Visual “silencioso” e premium (espaçamento generoso).

## 5) Tom de voz
- Calmo, humano, objetivo.
- Não vender “IA que substitui médico”.
- Evitar promessas absolutas (“nunca mais”, “100%”, “garantido”).
- Foco: limites, organização, rastreabilidade, tranquilidade.

## 6) Conteúdo sensível (saúde)
- A landing não deve dar aconselhamento médico.
- Evitar linguagem que possa soar como prescrição/triagem clínica real.
- Sempre posicionar como organização de fluxo/atendimento e comunicação.

## 7) SEO / Social
- Incluir: `<title>`, meta description, OG tags, favicon placeholder.
- Schema.org básico (SoftwareApplication).
- Textos claros e consistentes (sem keyword stuffing).

## 8) Formulário de lead
- Validação client-side.
- Endpoint configurável via constante no JS (ex.: `LEAD_ENDPOINT`).
- Se endpoint vazio: fallback para WhatsApp (wa.me) com mensagem pronta e/ou mailto.
- Não armazenar dados sensíveis do paciente (apenas lead comercial).

## 9) Organização de código
Estrutura:
- /index.html
- /after-hours.html (opcional)
- /assets/css/styles.css
- /assets/js/main.js
- /assets/img/*

Padrões:
- CSS com variáveis e componentes simples (cards, buttons, grid).
- JS pequeno: menu mobile, smooth scroll, validação form, envio lead, animações leves.

## 10) Entregas
- Código executável localmente (abrir HTML direto ou com servidor simples).
- Instruções de deploy (Render Static Site / Vercel / Cloudflare Pages).
- Placeholders para logos e depoimentos (sem inventar marcas reais).
