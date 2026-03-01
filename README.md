# MAVI — Marketing Landing (Docs Pack)

Este pacote contém arquivos de contexto e regras para guiar a criação de uma **landing page de marketing** do SaaS **MAVI (Meu Assistente Virtual)**.

A tese do produto:
- **WhatsApp virou “consultório paralelo”** → invade horários pessoais (vira “plantão”).
- **Desorganização e esquecimento** → mensagens/exames/pedidos se perdem no ruído.

> Lore opcional: “**mavi**” em turco significa **azul** (serenidade/tranquilidade).

---

## Arquivos

- **context.md**  
  Contexto do produto, público-alvo, tese, mensagem central, estrutura da landing, copy base, features e planos.

- **rules.md**  
  Guardrails de implementação: escopo, performance, acessibilidade, tom de voz, SEO e regras para formulário de lead.

- **skills.md**  
  Lista do que o assistente/dev deve saber/fazer para entregar a landing com qualidade.

---

## Como usar (fluxo recomendado)

### 1) Defina o objetivo da página
- Conversão principal: **Agendar demo** (formulário ou WhatsApp)
- Conversão secundária: **Ver como funciona** (scroll para “Como funciona”)

### 2) Escolha a stack
Para marketing puro (MVP), recomenda-se:
- **HTML/CSS/JS puro** (site estático)

> Frameworks (Next/React) só se você já quiser um site maior (blog, docs, CMS, etc.).

### 3) Gere a landing com Claude Code
- Cole o prompt (o “script”) no Claude Code
- Garanta que ele:
  - crie **index.html**
  - crie **after-hours.html** (variante opcional A/B focada em invasão de horário)
  - crie **assets/css/styles.css**
  - crie **assets/js/main.js**
  - inclua SEO (title, meta description, OG)
  - inclua formulário de lead com **endpoint configurável** + fallback WhatsApp/mailto

---

## Estrutura sugerida do projeto (site estático)

```
/index.html
/after-hours.html
/assets/
  /css/styles.css
  /js/main.js
  /img/
    logo.svg
    og-image.png
    favicon.png
```

---

## Formulário de lead (recomendação)

### Opção A — Webhook (rápido)
Envie o lead para:
- Make / Zapier / n8n / Google Sheets via webhook

No JS:
- defina `LEAD_ENDPOINT = "https://seu-webhook..."`

### Opção B — Sem endpoint (fallback)
Se `LEAD_ENDPOINT` estiver vazio:
- abrir WhatsApp com mensagem pré-preenchida (wa.me)
- ou `mailto:` com assunto padrão

**Importante:** não coletar/armazenar dados sensíveis de pacientes na landing.

---

## Planos (sem preço, “teaser”)

- **Starter (Solo)**: limites de horário + fila + templates + lembretes básicos  
- **Clinic (Equipe)**: permissões + atribuição + triagem avançada + histórico + relatórios básicos  
- **Pro (Governança)**: múltiplos canais + SLA por categoria + auditoria/exportação + integrações + dashboards

---

## Deploy (opções)
- Render (Static Site)
- Vercel
- Cloudflare Pages

Checklist antes de publicar:
- [ ] Mobile OK
- [ ] CTAs funcionam
- [ ] Form envia (ou fallback abre)
- [ ] SEO básico (title/description/OG)
- [ ] Acessibilidade (tab/foco)
- [ ] Performance (assets leves)

---

## Próximos passos recomendados
1) Criar 2 variantes (index vs after-hours) e medir conversão.
2) Trocar placeholders por:
   - screenshot real do produto (ou mock)
   - depoimentos reais (com permissão)
3) Integrar tracking (GA4/Pixel) quando for rodar tráfego.
