# Flight Coach – Missão 01: Voo Visual Básico ✈️

Este repositório contém a estrutura completa do **Flight Coach**, um sistema interativo de instrução de voo para simuladores, com foco em disciplina operacional, instrução por etapas e checklists realistas da aviação civil.

---

## 🎯 Objetivo

Simular um voo visual completo com acompanhamento passo a passo pelo painel, seguindo 27 etapas padronizadas com:

- Áudio do instrutor virtual (TTS)
- Checklists manuais e automáticos
- Validações por parâmetros do simulador
- Avaliação de desempenho final com exportação de log

---

## 🧱 Estrutura do Projeto

```
src/
├── data/
│   └── etapas.ts          # 27 etapas completas da Missão 01
├── components/            # (reservado para os componentes futuros)
└── App.tsx                # Painel de visualização simples
```

---

## ▶️ Como rodar localmente

```bash
npm install
npm run dev
```

Ou com Vite, Next.js, ou React puro, conforme preferir. O conteúdo atual é compatível com qualquer estrutura moderna em React.

---

## 📦 Etapas da Missão

- Do briefing inicial até o corte do motor
- Checklist híbrido (manual + automático)
- Feedback e log de cada ação
- Exportação como `.txt` e `.json`

---

## 🚀 Em breve

- Painel interativo com botões, feedback e timers
- Integração real com SimConnect (MSFS)
- Deploy em produção (GitHub Pages ou Vercel)

---

## 📁 Licença

Uso educacional, pessoal ou institucional autorizado sob permissão do mantenedor.

---
