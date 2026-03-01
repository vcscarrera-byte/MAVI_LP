# context.md

# MAVI — Contexto do Projeto (Marketing Landing)

## O que é
**MAVI** é um SaaS (“Meu Assistente Virtual”) para **organizar o atendimento via WhatsApp** no consultório/clínica, transformando mensagens em **fluxo** (triagem → tarefa → registro → retorno), com foco em:
- **reduzir invasão de horário** (WhatsApp virando “plantão”)
- **evitar esquecimentos/desorganização** (mensagens/exames perdidos no ruído)

> Lore opcional (brand story): “**mavi**” em turco significa **azul**, associado a tranquilidade/serenidade — alinhado à promessa da MAVI (devolver paz ao dia a dia do médico).

---

## Público-alvo
- Médicos (solo) e clínicas com equipe (secretária/enfermagem)
- Alto volume de mensagens e demandas “paralelas” ao consultório
- Dor emocional + operacional: **alerta constante**, culpa por “mensagem perdida”, perda de foco e vida pessoal invadida

---

## Tese / Mensagem central
**“Seu WhatsApp não pode ser seu plantão.”**  
A MAVI **cria um inbox do consultório** com regras, prioridades, responsáveis e histórico — **sem perder o toque humano**.

---

## Objetivo da landing
**Marketing puro**: converter para **Agendar demo** / **capturar lead** (nome, email, WhatsApp, perfil).

Sem backend obrigatório (pode usar webhook). Se não tiver endpoint, fallback:
- WhatsApp (wa.me) com mensagem pré-preenchida
- mailto

---

## Brand direction (A + B combinados)
**A (Calma + Segurança)** = base do produto/visual
- deep navy + azul MAVI, clean SaaS, muito espaço em branco

**B (Concierge Premium)** = camada de marketing/vendas
- seções com fundo areia e acento dourado **bem sutil** (microdetalhes)

### Tokens de cor (CSS vars)
--mavi-navy: #0B1220  
--mavi-blue: #2563EB  
--mavi-teal: #14B8A6  
--mavi-bg: #F8FAFC  
--mavi-border: #E2E8F0  
--mavi-text: #0F172A  
--mavi-muted: #64748B  
--mavi-sand: #E7E2D8  
--mavi-gold: #C8A96A  
--mavi-graphite: #111827  

### Tipografia
- Inter (padrão). Opcional headings: Sora.

---

## Páginas desejadas
1) **index.html** (principal)
2) **after-hours.html** (variante opcional focada em invasão de horário / A/B test)

---

## Estrutura de seções (index)
1) Navbar sticky + CTA
2) Hero: headline + subheadline + 2 CTAs
3) Prova social (placeholders)
4) Problema (dor real)
5) Como funciona (4 passos)
6) Features (6 cards com ícones)
7) Depoimentos (2–3)
8) Planos (Starter/Clinic/Pro) sem preços
9) FAQ (5)
10) CTA final + Footer (com lore “mavi = azul”)

---

## Copy base (PT-BR)
### Headline (escolher 1 para index; usar outra na variante)
- “Seu WhatsApp não pode ser seu plantão.”
- “Recupere seus horários. Sem perder seus pacientes.”

### Subheadline
“A MAVI cria um inbox do consultório com triagem, prioridades e histórico — para você não viver em alerta e não esquecer ninguém.”

### Bullets do problema
- Mensagens fora do horário viram rotina
- Exames e pedidos se perdem no meio do chat
- Delegação vira bagunça (sem dono, sem status)

### Proposta
“MAVI transforma conversa em fluxo: triagem → tarefa → registro → retorno.”

---

## Features (6)
1) Horários e regras de atendimento (resposta humana com prazo)
2) Triagem e prioridades (urgência sobe, rotina entra na fila)
3) Tarefas com responsável (secretária/enfermagem/médico)
4) Modelos de resposta (empatia + padrão)
5) Histórico e rastreabilidade (o que foi decidido e quando)
6) Follow-up e lembretes (aguardando exame, retorno, pendências)

---

## Planos (sem preço)
### Starter (Solo)
- Inbox + regras de horário + etiquetas/prioridade + templates + lembretes básicos + 1 canal
- Suporte: horário comercial + onboarding self-serve

### Clinic (Equipe) — “Mais popular”
- Tudo do Starter + multiusuários/permissões + atribuição + triagem avançada + histórico + relatórios básicos
- Suporte: prioritário + onboarding assistido

### Pro (Multiunidade/Governança)
- Tudo do Clinic + múltiplos canais + SLA por categoria + auditoria/exportação + integrações + dashboards avançados
- Suporte: CS dedicado + onboarding premium

---

## FAQ (5)
- A MAVI substitui meu WhatsApp?
- Como fica privacidade/LGPD?
- Funciona com minha equipe?
- E urgências?
- Tempo de implantação?

---

## Conversão / CTA
Primário: “Agendar demo”  
Secundário: “Ver como funciona” / “Falar no WhatsApp”

Form de lead: Nome, Email, WhatsApp, Perfil (solo/clínica), Mensagem (opcional).
