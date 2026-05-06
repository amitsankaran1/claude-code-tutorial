# Claude Code Learning App

A single-page field guide to Claude Code in the TUI (Nov 2025 – May 2026): primitives, automation, and how to actually use it well.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000. Mobile-friendly — works at phone sizes.

## What's in here

A long-scroll page with a sticky sidebar (or horizontal-scroll chip nav on mobile):

1. **Terminal & TUI 101** — the on-ramp for non-developers
2. **Big Picture** — the platform shift in one paragraph
3. **Core Primitives** — Skills, Subagents, Agent Teams, Plugins, Hooks, MCP, Conductors
4. **Automation & Long-Running Work** — `/loop`, Monitor, Ultrareview, Ultraplan, Computer use, Auto mode
5. **Models & Control** — Opus 4.7, `/effort`
6. **Decision Matrix** — when to reach for what
7. **Real Use Cases for a PM at Notion** — six scenarios that earn their keep
8. **Patterns** — cross-cutting habits
9. **Anti-patterns** — workflows that feel productive and aren't
10. **Quickstart Cheatsheet** — copy-paste commands
11. **Sources**

All content lives in `lib/content.ts` — edit there, the page rebuilds.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind 3. No API routes, no LLM calls — pure static rendering.
