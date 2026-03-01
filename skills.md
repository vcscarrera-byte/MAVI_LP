# skills.md

# MAVI — Skills (O que este projeto precisa que o assistente faça)

## Produto & Marketing
- Refinar posicionamento: dor (invasão de horário + desorganização) → promessa → prova.
- Escrever copy PT-BR premium (hero, benefícios, FAQ, CTAs).
- Criar variação de copy para A/B test (after-hours vs geral).
- Estruturar planos (Starter/Clinic/Pro) e diferenciação por suporte/onboarding.

## Brand & Design System (A + B)
- Definir tokens: cores, tipografia, espaçamentos, radius, sombras.
- Guardrails de uso do dourado/areia (microdetalhes).
- Propor estilo de ícones e componentes (cards, badges, chips).

## Frontend (HTML/CSS/JS)
- Implementar landing responsiva, acessível e rápida.
- Criar componentes reutilizáveis via HTML + CSS (sem frameworks).
- JS leve: menu mobile, scroll suave, validação e envio do formulário, animações discretas.
- Respeitar `prefers-reduced-motion`.

## SEO & Analytics
- Implementar meta tags, OpenGraph, schema.org (SoftwareApplication).
- Preparar eventos simples (ex.: `data-track`) para integrar GA4/Pixel depois.
- Boas práticas de performance (assets pequenos, fontes otimizadas).

## Lead Capture
- Implementar formulário com:
  - Nome, Email, WhatsApp, Perfil (solo/clínica), Mensagem (opcional)
- Envio para webhook configurável (Make/Zapier/n8n/Sheets).
- Fallback WhatsApp/mailto se sem endpoint.

## Deploy
- Instruções claras para publicar como site estático:
  - Render Static Site
  - Vercel
  - Cloudflare Pages
- Checklist final: links, responsividade, validações, SEO básico.

## Não fazer
- Não inventar depoimentos com nomes reais ou marcas reais sem autorização.
- Não afirmar compliance legal/segurança “garantida”; usar linguagem responsável.
- Não coletar/armazenar dados sensíveis de pacientes na landing.
