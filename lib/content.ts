export type PillTone = "neutral" | "warn" | "experimental";

export type Pill = { label: string; tone: PillTone };

export type Feature = {
  id: string;
  name: string;
  pills?: Pill[];
  what: string;
  whenToUse: string;
  whenNotToUse: string;
  smarterTip: string;
  livesAt?: string;
  example?: string;
};

export type UseCase = {
  id: string;
  title: string;
  situation: string;
  primitives: string[];
  steps: string[];
};

export type Pattern = {
  id: string;
  title: string;
  trigger: string;
  pattern: string;
  why: string;
};

export type AntiPattern = {
  id: string;
  trap: string;
  feelsProductiveBecause: string;
  reality: string;
  doInstead: string;
};

export const NAV_ENTRIES: { id: string; label: string; number: string }[] = [
  { id: "terminal-101", label: "Terminal & TUI 101", number: "01" },
  { id: "big-picture", label: "Big Picture", number: "02" },
  { id: "primitives", label: "Core Primitives", number: "03" },
  { id: "automation", label: "Automation & Long-Running", number: "04" },
  { id: "models", label: "Models & Control", number: "05" },
  { id: "decision", label: "Decision Matrix", number: "06" },
  { id: "use-cases", label: "PM Use Cases", number: "07" },
  { id: "patterns", label: "Patterns", number: "08" },
  { id: "anti-patterns", label: "Anti-patterns", number: "09" },
  { id: "cheatsheet", label: "Cheatsheet", number: "10" },
  { id: "sources", label: "Sources", number: "11" },
];

export const TERMINAL_101: {
  intro: string;
  blocks: { title: string; body: string; metaphor?: string }[];
  lexicon: { term: string; def: string }[];
} = {
  intro:
    "If you've never lived in the terminal, the rest of this guide will read like jargon. This section is the on-ramp: what a terminal is, what makes Claude Code a TUI, and why a PM might care.",
  blocks: [
    {
      title: "The terminal",
      metaphor: "Think: SMS for your computer.",
      body: "A keyboard-only window. You type a command, press enter, the computer types back. No buttons, no icons, no mouse. It looks intimidating because it's plain text on a black-or-white background, but it's the same underlying machine — just a different doorway in. Programmers leave it open all day because every action is a single short command.",
    },
    {
      title: "CLI vs TUI",
      metaphor: "Google search vs a real app — both inside the same window.",
      body: "A CLI (command-line interface) is one-shot: type `ls`, get a list of files, done. A TUI (text-based user interface) is interactive — it draws a layout in characters: menus, panels, scrollable lists, live-updating views. You move around with arrow keys, watch things change in real time, fill in forms. Vim, htop, lazygit, and Claude Code are all TUIs. Same window as a CLI, but it feels like an app.",
    },
    {
      title: "Why Claude Code lives in the TUI",
      metaphor: "Like adding an AI to the group chat your computer is already in.",
      body: "The terminal is where the things Claude Code touches already are: your files, your git repo, your test runner, your build, your logs. Putting Claude in the same window means it can read what you read, run what you'd run, and watch what you'd watch — without context-switching to a browser. Text-based is also fast, scriptable, and easy to share (you can copy-paste what just happened). The desktop and web versions of Claude exist; the TUI version is the one that meets developers and technical PMs where they already work.",
    },
    {
      title: "How you actually use it",
      metaphor: "It's a chat. With superpowers.",
      body: "You open a terminal, type `claude`, and a chat starts. You type what you want; Claude proposes actions (read this file, run this command, edit this code) and asks before doing anything risky. You stay in the loop — every tool call is something you can approve, reject, or redirect. Slash commands (`/skill`, `/agents`, `/loop`) jump to specific behaviors. That's the whole loop.",
    },
  ],
  lexicon: [
    {
      term: "Shell",
      def: "The program that reads your commands and runs them. On a Mac, usually zsh. You don't need to think about it — it's already running when the terminal opens.",
    },
    {
      term: "Prompt",
      def: "The blinking line waiting for input — usually ends with `$`, `%`, or `▎`. Two meanings here, confusingly: there's the shell prompt (waiting for a command) and the Claude prompt (waiting for what you want to ask).",
    },
    {
      term: "Command",
      def: "A single instruction, like `ls`, `git status`, or `claude`. Hit enter to run it.",
    },
    {
      term: "Slash command",
      def: "Inside Claude Code, commands that start with `/` (like `/skill` or `/effort`). These talk to Claude itself, not the shell.",
    },
    {
      term: "Tool call",
      def: "When Claude proposes to do something — read a file, run a command, edit code. You see what it wants to do and approve (or not).",
    },
    {
      term: "Context window",
      def: "Everything Claude can 'see' in the current session — your messages, files it's read, output it's seen. It's finite. The whole point of subagents is to keep yours from filling up.",
    },
  ],
};

export const BIG_PICTURE = `Claude Code in late 2025 stopped being a single chat with a coder and became a composable platform: you can package workflows (Skills), delegate messy work to specialists (Subagents), connect external systems (MCP), automate lifecycle moments (Hooks), and run sustained background work (/loop, Monitor, Ultraplan). The complexity is opt-in — small projects still work small. The pattern across every new feature is the same: package, delegate, orchestrate.`;

export const PRIMITIVES: Feature[] = [
  {
    id: "skills",
    name: "Skills",
    what: "A reusable workflow packaged as a markdown file (SKILL.md) that bundles instructions and supporting code. Invoke with `/name` or let Claude trigger it from its description.",
    whenToUse: "You've typed the same 200-word prompt three or more times. Or there's a structure you want enforced consistently (PRD shape, bug-report template, code review checklist).",
    whenNotToUse: "You've used the prompt once. A skill you write and never call again is debt — keep it as a saved snippet or a Notion page until repetition proves the case.",
    smarterTip: "Encode structure, not opinions. A PRD skill should produce empty sections labeled \"problem,\" \"users,\" \"non-goals,\" \"open questions\" — not pre-filled prose. The blank page stays yours; the skill removes setup tax, not thinking tax.",
    livesAt: "~/.claude/skills/<name>/SKILL.md (personal) · .claude/skills/ (project) · or shipped via plugins",
    example: "/prd-scaffold  # invokes the skill at ~/.claude/skills/prd-scaffold/SKILL.md",
  },
  {
    id: "subagents",
    name: "Subagents",
    what: "A specialized helper that runs in its own context window with its own tools and system prompt. The main agent delegates a messy task; only the summary comes back.",
    whenToUse: "Open-ended exploration that would otherwise blow up your main context: \"find every place auth is checked,\" \"summarize the last six months of changes to billing,\" \"pull pricing on competitors.\"",
    whenNotToUse: "A two-step task you could do directly. Subagent overhead is real — for small lookups, just grep.",
    smarterTip: "Delegate the search; own the synthesis. Ask the subagent to return facts, not conclusions. The judgment call — what those facts mean for your decision — should not be in the summary.",
    livesAt: ".claude/agents/<name>.md (custom) · built-ins: Explore, Plan, general-purpose",
    example: "/agents Explore  # spawns the search subagent",
  },
  {
    id: "agent-teams",
    name: "Agent Teams",
    pills: [{ label: "experimental", tone: "experimental" }],
    what: "Multiple Claude Code sessions running in parallel, talking directly to each other instead of through a central coordinator.",
    whenToUse: "Genuinely collaborative work — one agent designs, another implements, a third reviews — where intermediate states matter and you don't want everything funneled through one summary.",
    whenNotToUse: "Anything a single agent with subagents can do. Teams add coordination cost; if the work is sequential, a pipeline beats a team.",
    smarterTip: "Treat it like hiring three contractors instead of one consultant. More throughput, more management overhead. Default to a single session with subagents until you hit the wall.",
    livesAt: "Configured via Claude Code's team configuration",
    example: "(experimental — see Anthropic docs for current invocation)",
  },
  {
    id: "plugins",
    name: "Plugins",
    what: "Installable bundles of skills, subagents, MCP servers, and hooks distributed via a registry. One command sets up an entire integration.",
    whenToUse: "You want a known integration (Vercel, Figma, Notion, GitHub) without wiring up each piece by hand.",
    whenNotToUse: "Your need is one MCP server. Don't install a 12-skill plugin to use one of them — install just the MCP.",
    smarterTip: "Install only what you'll actively use, and audit what each plugin adds before approving. Plugins can register hooks that run on every tool call — read those before saying yes.",
    livesAt: "Discoverable via `/plugin marketplace` · installed under `~/.claude/plugins/`",
    example: "/plugin install vercel-plugin",
  },
  {
    id: "hooks",
    name: "Hooks",
    what: "Shell commands the harness runs automatically at lifecycle moments (before tool calls, after edits, before commits). Configured in `settings.json`.",
    whenToUse: "Enforce a guarantee: typecheck must pass, formatter must run, secrets must not be committed. Anything you'd otherwise need to remember to do.",
    whenNotToUse: "One-off behaviors. Hooks add friction on every matching event — only the truly invariant deserves a hook.",
    smarterTip: "Hooks are how you turn \"I always meant to\" into \"the harness won't let me skip.\" Use them to lock in safety, not preference.",
    livesAt: "~/.claude/settings.json or .claude/settings.json (project)",
    example: `// settings.json
"hooks": {
  "PreToolUse": [{
    "matcher": "Bash",
    "command": "scripts/check-not-prod.sh"
  }]
}`,
  },
  {
    id: "mcp",
    name: "MCP Servers",
    what: "The standard protocol for connecting external tools and data — Notion, Slack, Linear, Postgres, Gmail, GitHub. Tool schemas now load lazily (~95% context savings on big integrations).",
    whenToUse: "Claude needs to read or act on something outside the local filesystem. \"Find the spec doc in Notion,\" \"check the Linear ticket,\" \"query the prod replica.\"",
    whenNotToUse: "The data is in the repo. MCP is for crossing the system boundary — within the repo, a normal read or grep is faster.",
    smarterTip: "Connect read access freely; gate write access carefully. An MCP that can post to Slack or close Linear tickets is a fine assistant *and* a fine way to send a message you didn't mean to send.",
    livesAt: "Configured via `claude mcp add` or in `.mcp.json` per project",
    example: "claude mcp add notion --transport http https://mcp.notion.com",
  },
  {
    id: "conductors",
    name: "Conductors",
    what: "A structured-development methodology layered on Claude Code. `/conductor:setup` scaffolds product vision, tech stack, workflow rules; `/conductor:new-track` generates feature specs; `/conductor:revert` undoes at logical-unit level.",
    whenToUse: "Multi-week side projects where you want product context to live alongside code as a managed artifact, not in a half-stale Notion doc.",
    whenNotToUse: "Anything throwaway. Conductors pay off over weeks — the upfront scaffolding is overhead for a weekend hack.",
    smarterTip: "Use it to keep your *product thinking* version-controlled. The vision doc is for you to argue with, not for Claude to follow blindly.",
    livesAt: "Project-level — generated under `.conductor/`",
    example: "/conductor:setup",
  },
];

export const AUTOMATION: Feature[] = [
  {
    id: "loop",
    name: "/loop",
    what: "Run a prompt or skill on a recurring interval (`/loop 5m /check-tests`). Omit the interval and Claude self-paces.",
    whenToUse: "Genuine monitoring or polling: \"check the deploy every 5 min,\" \"watch the test suite while I work,\" \"every morning, review yesterday's commits on my side project.\"",
    whenNotToUse: "Anything that produces output you won't read. Every recurring loop is a recurring inbox — and inboxes you ignore are noise that drowns out signal everywhere else.",
    smarterTip: "Set a stop condition before you start. \"Loop until the build passes\" is real work; \"loop forever and surface anything interesting\" is a notification firehose with no off switch.",
    livesAt: "Built-in command",
    example: "/loop 10m /check-pr-status",
  },
  {
    id: "monitor",
    name: "Monitor tool",
    what: "Streams events from a long-running background process into the conversation, so Claude can tail logs and react in real time.",
    whenToUse: "You started something slow (a test run, a migration, a build) and want Claude to react when it finishes or fails — without polling.",
    whenNotToUse: "The process is fast (< 30 seconds). Just run it inline.",
    smarterTip: "Pair with `run_in_background`. Monitor for the *completion event*, not for every line of output — otherwise you're paying tokens to read your own logs.",
    livesAt: "Built-in tool",
    example: "(invoked by Claude when tailing a backgrounded Bash process)",
  },
  {
    id: "ultrareview",
    name: "Ultrareview",
    pills: [{ label: "research preview", tone: "experimental" }],
    what: "A cloud-side fleet of bug-hunting agents that scan code and surface findings back to your CLI.",
    whenToUse: "Pre-merge confidence on something risky — a refactor, a security-sensitive change, a migration.",
    whenNotToUse: "Routine commits. The compute cost and noise floor aren't worth it for boring changes.",
    smarterTip: "Treat findings like a junior reviewer's — worth reading, not worth merging on autopilot. Many will be false positives or stylistic; the goal is to surface the one real bug.",
    livesAt: "Cloud feature, surfaced via Claude Code",
    example: "(invoked from Claude Code; see Anthropic docs for current command)",
  },
  {
    id: "ultraplan",
    name: "Ultraplan",
    what: "Draft implementation plans in the cloud, review them in a web editor with comments, then execute remotely or pull results back. Separates planning from execution.",
    whenToUse: "A multi-day feature where the plan deserves more attention than \"yes, looks good.\" When you want to comment, redirect, or sit with it overnight.",
    whenNotToUse: "Anything you can plan in your head. Ultraplan is for when the planning *is* the hard part.",
    smarterTip: "The web editor is the point. Read the plan slowly; argue with it; mark the parts you're not sure about. Don't approve a plan you skimmed.",
    livesAt: "Cloud feature with web editor",
    example: "(invoked from Claude Code; see Anthropic docs for current command)",
  },
  {
    id: "computer-use",
    name: "Computer use",
    what: "Claude can drive native apps and click through UIs from the terminal — not just the desktop app.",
    whenToUse: "Verifying that a UI change actually renders, that a click flow works, or that a third-party tool you can't script is doing what you expect.",
    whenNotToUse: "Anything you can verify with a curl or a test. Computer use is slow and brittle compared to programmatic checks.",
    smarterTip: "Use it to verify, not to operate. \"Confirm the button now says 'Save'\" is a great fit; \"file my taxes\" is not.",
    livesAt: "Built-in capability in Claude Code",
    example: "(invoked when Claude needs to interact with a GUI)",
  },
  {
    id: "auto-mode",
    name: "Auto mode",
    pills: [{ label: "use carefully", tone: "warn" }],
    what: "A classifier handles permission prompts: safe actions go through, risky ones get blocked. A middle ground between approve-everything and approve-each-action.",
    whenToUse: "Long-running, low-stakes work where the overhead of clicking approve on every Read or grep ruins your flow.",
    whenNotToUse: "Anything that touches shared state — production, deploys, sends, deletes. The classifier is good, not omniscient. One bad day = one bad mass-action.",
    smarterTip: "Pair with hooks. Use auto-mode for read-only actions, and use hooks to hard-block the irreversible ones (no `git push --force`, no `rm -rf`, no production env vars). Defense in depth.",
    livesAt: "Configured via `/config` or settings.json",
    example: "/config  # toggle auto mode",
  },
];

export const MODEL_CONTROL: Feature[] = [
  {
    id: "opus-effort",
    name: "Opus 4.7 + /effort",
    what: "Opus 4.7 is the new default. `xhigh` effort is recommended for most coding. `/effort` gives you an interactive slider to trade speed for intelligence on the fly.",
    whenToUse: "Dial effort *up* when you're doing the final pass on something hard — security review, architectural choice, debugging a heisenbug. Dial *down* for exploration, where iteration speed beats per-iteration depth.",
    whenNotToUse: "Don't run xhigh on everything by default. You'll burn time on tasks that don't need it and lose the rhythm of fast back-and-forth.",
    smarterTip: "Effort is a knob, not a setting. Match it to the task at hand: high for the one decision that matters, low for the ten lookups before it.",
    livesAt: "Built-in command",
    example: "/effort xhigh",
  },
];

export const DECISION_ROWS: { goal: string; tool: string }[] = [
  { goal: "Stop retyping the same prompt", tool: "Skill" },
  { goal: "Do messy exploration without polluting your context", tool: "Subagent" },
  { goal: "Have multiple agents collaborate live", tool: "Agent Teams" },
  { goal: "Add a pre-built integration (Vercel, Figma, Notion…)", tool: "Plugin" },
  { goal: "Auto-run something at lifecycle moments", tool: "Hook" },
  { goal: "Connect Claude to an external API or DB", tool: "MCP server" },
  { goal: "Drive structured product development", tool: "Conductor" },
  { goal: "Monitor or poll something over time", tool: "/loop" },
  { goal: "Verify a UI works", tool: "Computer use" },
  { goal: "Pull facts from Notion / Linear / Slack into a session", tool: "MCP server" },
  { goal: "Make a side-project safer to push at midnight", tool: "Hook (pre-commit typecheck + tests)" },
];

export const USE_CASES: UseCase[] = [
  {
    id: "notion-search",
    title: "Find prior art in Notion before writing duplicate docs",
    situation: "You're about to write a PRD or spec. Half of it has probably been written before by someone else at Notion. You don't want to duplicate, and you don't want to dig through the wiki for an hour. The goal is to surface what exists so you can build on it — the synthesis stays yours.",
    primitives: ["MCP server (Notion)", "Subagent"],
    steps: [
      "Install the Notion MCP: `claude mcp add notion --transport http https://mcp.notion.com`",
      "Authenticate via the OAuth flow",
      "In a new session: \"Search the Notion wiki for prior PRDs or design docs on <topic>. Return links and 1-line summaries — don't synthesize a position yet.\"",
      "Skim the results yourself. Form your own take. Then, if you want, ask Claude to compare your draft against what it found.",
    ],
  },
  {
    id: "side-project-review",
    title: "Daily review of yesterday's commits on side projects",
    situation: "You write side-project code at night, fast and loose. Bugs and dead code pile up. You want a second pair of eyes — without paying for one. The review catches things you'd miss; you still write the code.",
    primitives: ["/loop", "Subagent (review-style)"],
    steps: [
      "Define a skill or prompt: \"Review the diff from yesterday on <repo>. Flag bugs, missing edge cases, dead code. Skip style nits.\"",
      "Schedule it: `/loop 24h /review-yesterday` (or run it manually each morning)",
      "Read the output as a draft, not a verdict. Some flags will be false positives; some will be real.",
      "Fix the real ones yourself. Don't have Claude apply changes unattended.",
    ],
  },
  {
    id: "prd-skill",
    title: "PRD scaffolding skill (structure, not prose)",
    situation: "Every PRD you write needs the same shape — problem, users, success metrics, non-goals, open questions. You spend 10 minutes setting that up before you've thought a single thought. The goal is to remove the setup tax, not the thinking.",
    primitives: ["Skill"],
    steps: [
      "Create `~/.claude/skills/prd-scaffold/SKILL.md`",
      "Make the skill produce an empty template — section headers, prompts in italics under each (\"What user pain are we targeting?\"), nothing else.",
      "Crucially: do NOT have the skill draft the content. The empty template is the deliverable.",
      "Invoke with `/prd-scaffold` whenever you start a new PRD. Fill it in yourself.",
    ],
  },
  {
    id: "inbox-triage",
    title: "Inbox triage: shorter inbox, not auto-reply",
    situation: "You have 200 unread emails. Most don't need you. The 5 that do are buried. The job here is triage — surfacing what needs you — not auto-reply.",
    primitives: ["MCP server (Gmail)", "Skill"],
    steps: [
      "Install a Gmail MCP server (search the plugin marketplace or use a community MCP)",
      "Define a skill: \"Group unread into categories — needs reply, FYI, newsletters, recruiters. For 'needs reply,' include sender, subject, and a one-line summary. Do NOT draft replies.\"",
      "Run `/triage-inbox` once or twice a day",
      "Reply to the surfaced ones yourself. Archive the rest in bulk.",
    ],
  },
  {
    id: "research-subagent",
    title: "Research subagent for competitive / market work",
    situation: "Mid-spec, you realize you need to know how Linear handles a similar feature, or what three competitors charge for X. You don't want that research clogging your main session, and you don't want Claude doing the synthesis for you.",
    primitives: ["Subagent (Explore or general-purpose)", "MCP server (web fetch)"],
    steps: [
      "Spawn a subagent: \"Pull pricing pages and feature lists for <competitors>. Return a short table: company, plan, price, key features. No analysis.\"",
      "Get the table back in your main session as a tool result",
      "Now do the synthesis yourself — what's the market shape, where's the gap, where do we want to land",
    ],
  },
  {
    id: "pre-commit-hook",
    title: "Pre-commit hook: typecheck + tests on side projects",
    situation: "You commit broken TypeScript at midnight. Future-you debugs it on Saturday morning. A pre-commit hook catches mechanical mistakes so your attention stays on design.",
    primitives: ["Hook"],
    steps: [
      "In your project's `.claude/settings.json`, add a `PreToolUse` hook on the Bash matcher (or specifically on git commit commands)",
      "Have it run `npm run typecheck && npm test`",
      "If it fails, the commit is blocked. Fix and retry.",
    ],
  },
];

export const PATTERNS: Pattern[] = [
  {
    id: "delegate-explore-own-synth",
    title: "Delegate exploration, own synthesis",
    trigger: "You catch yourself writing a prompt that ends with \"and tell me what we should do.\"",
    pattern: "Split it. Ask the subagent for *facts* (what exists, what's documented, what each option does). Do the synthesis (which to pick, why) yourself, in the main session.",
    why: "Synthesis is the part that's worth your judgment. Outsourcing it means you skip the thinking and inherit Claude's defaults — which are competent and average.",
  },
  {
    id: "package-what-you-repeat",
    title: "Package what you repeat — not what you might",
    trigger: "You're tempted to write a Skill for a workflow you've done once or twice.",
    pattern: "Wait for the third time. If a prompt has earned three uses, it's a Skill candidate. Until then, save it as a snippet or paste from a Notion page.",
    why: "Skill sprawl is real overhead — every skill is a thing to maintain, debug, and remember exists. Most never earn their keep. Repetition is the test.",
  },
  {
    id: "make-claude-argue-back",
    title: "Make Claude argue back",
    trigger: "Before acting on any non-trivial recommendation Claude gave you.",
    pattern: "Ask: \"What's the strongest case against this? What would have to be true for this to be wrong?\" — and read the answer slowly.",
    why: "Claude is built to be helpful, which trends toward agreement. The cheap way to get a better answer is to explicitly request the disagreement.",
  },
  {
    id: "front-load-constraints",
    title: "Front-load constraints, not solutions",
    trigger: "You're about to type a prompt that names the answer you want.",
    pattern: "Instead, list the constraints — what's true, what's forbidden, what's already been tried, what success looks like. Let Claude propose the path.",
    why: "Solving-by-prompt collapses to a known answer. Constraint-first prompts let the model search the space — which is what it's actually good at.",
  },
  {
    id: "friction-audit",
    title: "Friction audit before automating",
    trigger: "You're about to wrap a workflow in a Skill, hook, or /loop.",
    pattern: "Ask: is this friction load-bearing? If removing it removes the moment where you actually decide something, leave it. If it's purely mechanical, automate freely.",
    why: "Some friction is the work. Automating PRD writing removes the moment you decide what the product *is*. Automating PRD formatting removes nothing important. The distinction matters.",
  },
  {
    id: "cap-auto-mode",
    title: "Cap auto-mode at reversible actions",
    trigger: "You're about to flip auto-mode on for a long session.",
    pattern: "Auto-approve only read-only and locally-reversible actions. Hard-gate anything that touches production, sends a message, deletes data, or pushes to a remote.",
    why: "Auto-mode is a productivity multiplier *and* a blast-radius multiplier. Capping it at the safe set keeps the multiplier and removes the foot-gun.",
  },
  {
    id: "one-window-one-purpose",
    title: "One window, one purpose",
    trigger: "You're about to ask Claude something off-topic in the middle of a coding session.",
    pattern: "Open a separate session for it. Keep the coding session for code, the research session for research, the planning session for planning.",
    why: "Context contamination is the silent killer of model quality. A single clean session reasons better than a long mixed one.",
  },
  {
    id: "24-hour-rule",
    title: "The 24-hour rule for generated content",
    trigger: "Claude just wrote you a doc, PRD, or plan.",
    pattern: "Edit it within 24 hours, or delete it. If you won't read and edit it, you wouldn't have written it yourself either — and shipping it as-is is shipping noise.",
    why: "The bad version isn't \"AI-generated text.\" It's text nobody actually thought about. Editing forces thought; deletion prevents pollution. One or the other.",
  },
];

export const ANTI_PATTERNS: AntiPattern[] = [
  {
    id: "ai-journaling",
    trap: "AI-assisted journaling and reflection prompts",
    feelsProductiveBecause: "It looks like therapy + productivity in one. You answer thoughtful prompts, the model offers insights, you feel \"processed.\"",
    reality: "You've outsourced the part of journaling that does the work — the slow, awkward act of figuring out what you actually think. The model gives you a clean summary of feelings you didn't quite have.",
    doInstead: "Journal in a plain text file. If you want a prompt, use a static one (\"what's the hardest thing on my plate this week?\") and answer it before Claude sees it.",
  },
  {
    id: "auto-summarize",
    trap: "Auto-summarizing things you should be reading",
    feelsProductiveBecause: "Three articles in five minutes. Three meetings recapped before you sit down. \"Caught up.\"",
    reality: "Summaries are lossy. The thing that matters is usually the specific phrase, the buried qualifier, the throwaway example — and that's the first thing summarization drops.",
    doInstead: "Summarize ruthlessly to *decide what to read*. Then read the things that matter, in full. Use the model as a triage layer, not a substitute for the read.",
  },
  {
    id: "end-to-end-prd",
    trap: "Generating PRDs and design docs end-to-end",
    feelsProductiveBecause: "1500-word PRD in three minutes. Looks polished. Has all the right sections.",
    reality: "The PRD's value is in the thinking it forced you to do. If the document wrote itself, you didn't think those thoughts. The output is a coherent-sounding artifact attached to no actual decision.",
    doInstead: "Have Claude scaffold the *structure*. Fill in the substance yourself. If a section feels easy to fill in, that's the section that needed your attention most.",
  },
  {
    id: "skill-sprawl",
    trap: "Skill sprawl",
    feelsProductiveBecause: "You keep \"investing in your stack\" by writing more skills. Tooling feels powerful.",
    reality: "Most of those skills are used once, forgotten, and become invisible debt — they show up in autocomplete, conflict with each other, and nobody including you can remember what they do.",
    doInstead: "Periodically delete every skill you haven't used in 30 days. If you needed it, you'll write a better one.",
  },
  {
    id: "subagent-stacking",
    trap: "Stacking subagents on trivial tasks",
    feelsProductiveBecause: "It feels architecturally sophisticated. Lots of agents, lots of activity.",
    reality: "Subagent overhead is real — context handoff, summary loss, latency. For small tasks, the overhead is bigger than the task. You've replaced grep with a meeting.",
    doInstead: "Default to inline. Reach for subagents when context pollution would actually hurt — open-ended exploration, multi-file investigation. Not for two-line lookups.",
  },
  {
    id: "validate-ideas",
    trap: "Asking Claude to validate ideas",
    feelsProductiveBecause: "You get a thoughtful, structured response that says \"yes, here's why your idea is great.\" You feel sharp.",
    reality: "The model is built to be helpful and trends toward agreement. If you ask \"is X a good idea?\" you'll usually hear yes. You'll feel right and you may be wrong.",
    doInstead: "Ask for the case against. Ask what would make this idea fail. Ask for three reasons it's worse than the alternative. Then judge.",
  },
  {
    id: "blanket-auto-mode",
    trap: "Auto-mode on for everything",
    feelsProductiveBecause: "No more permission prompts breaking your flow.",
    reality: "One classifier mistake on a destructive command and you've lost work, sent a wrong message, or pushed to the wrong branch. The savings on every approve-click do not pay back the one bad action.",
    doInstead: "Use auto-mode for read-only and reversible actions. Hard-gate the rest with hooks. The friction on dangerous actions is the feature, not the bug.",
  },
];

export const CHEATSHEET: { command: string; useWhen: string }[] = [
  { command: "/agents", useWhen: "Pick a subagent to delegate exploration / planning to." },
  { command: "/skill", useWhen: "Invoke a skill by name (or list available)." },
  { command: "/plugin install <name>", useWhen: "Pull in a pre-built integration (Vercel, Figma, Notion)." },
  { command: "/plugin marketplace", useWhen: "Browse the plugin registry." },
  { command: "claude mcp add <name> --transport http <url>", useWhen: "Connect a new external service." },
  { command: "/loop 5m /<skill>", useWhen: "Run something on an interval (monitoring, polling)." },
  { command: "/effort xhigh", useWhen: "Dial the model up before a hard decision." },
  { command: "/config", useWhen: "Toggle auto-mode, model, theme, etc." },
  { command: "/conductor:setup", useWhen: "Bootstrap a structured product project." },
  { command: "/init", useWhen: "Generate a CLAUDE.md for a new repo." },
];

export type QuizType = "knowledge" | "skills";

export type QuizQuestion = {
  type: QuizType;
  q: string;
  a: string;
};

export const QUIZZES: Record<string, QuizQuestion[]> = {
  "terminal-101": [
    {
      type: "knowledge",
      q: "A colleague's terminal shows `▎ what's in this file?` — what kind of prompt is that, and how do you know?",
      a: "A Claude prompt — they're inside a Claude Code session asking a question. The shell prompt would end in `$` or `%`. The `▎` glyph is Claude's input marker, distinct from the shell.",
    },
    {
      type: "knowledge",
      q: "Someone says \"vim is a TUI but `git status` is a CLI.\" What's the practical difference?",
      a: "A CLI runs once: prints output, exits. A TUI takes over the terminal — it draws an interactive layout, lets you navigate with arrow keys, updates live, and only exits when you quit it. Same window; different mode of use.",
    },
    {
      type: "skills",
      q: "You're in a fresh terminal and want to start a Claude Code session scoped to your project. What two commands?",
      a: "`cd ~/path/to/project` then `claude`. Starting from the project directory scopes Claude to that repo's `.claude/` config and gives it the right working directory.",
    },
  ],
  "big-picture": [
    {
      type: "knowledge",
      q: "Map each verb to the primitive(s) it embodies: package, delegate, orchestrate.",
      a: "Package → Skills, Plugins, Conductors. Delegate → Subagents, Agent Teams. Orchestrate → Hooks, /loop, Monitor, MCP servers. The whole feature surface is one of those three moves.",
    },
  ],
  primitives: [
    {
      type: "skills",
      q: "Connect Claude Code to a Linear MCP server at `https://mcp.linear.app`. Write the exact command.",
      a: "`claude mcp add linear --transport http https://mcp.linear.app`",
    },
    {
      type: "skills",
      q: "You've typed the same code-review-checklist prompt for the fourth time. Where on disk does a personal Skill called `review-checklist` live?",
      a: "`~/.claude/skills/review-checklist/SKILL.md`. Project-scoped would be `.claude/skills/review-checklist/SKILL.md` inside the repo — same shape, different home.",
    },
    {
      type: "knowledge",
      q: "Your project's `.claude/settings.json` runs typecheck before every commit. What changes if you move that config to `~/.claude/settings.json` instead?",
      a: "It applies to every project on your machine, not just this one. Project-level settings are scoped to the repo; home-level settings are global. Typecheck commands rarely match across projects, so this kind of config almost always wants the project-level home — the global version silently fails on repos without that script.",
    },
    {
      type: "knowledge",
      q: "When does reaching for a Subagent make the situation worse, not better?",
      a: "When the task is small. Subagent overhead — context handoff, summary loss, latency — exceeds the value of preserving main-session context for trivial lookups. For a two-line grep, just grep. Save subagents for messy, open-ended exploration.",
    },
  ],
  automation: [
    {
      type: "skills",
      q: "Run `/check-deploy` every five minutes. Write the command.",
      a: "`/loop 5m /check-deploy`. Set a stop condition before you start it — \"loop forever and surface anything interesting\" is a notification firehose with no off switch.",
    },
    {
      type: "knowledge",
      q: "Three weeks ago you set up `/loop 1h /summarize-pr-comments`. You haven't actually read any of the outputs. What's the right move?",
      a: "Stop the loop. Every recurring loop is a recurring inbox; an inbox you ignore becomes noise that drowns out signal everywhere else. A loop whose output you don't read isn't tracking work — it's generating slop.",
    },
    {
      type: "knowledge",
      q: "Which is safer to run with auto-mode on: `gh pr list` or `git push`? Why?",
      a: "`gh pr list` — read-only, no state change. `git push` touches shared state; once pushed, undoing affects collaborators. The cap-auto-mode rule auto-approves only the read-only and locally-reversible.",
    },
  ],
  models: [
    {
      type: "skills",
      q: "You're about to do a security review on a payments migration. Write the command to dial Claude up before you start.",
      a: "`/effort xhigh`. When you're back to exploration, run `/effort` again and pick a lower tier — high-effort exploration burns iteration speed for depth you don't need yet.",
    },
    {
      type: "knowledge",
      q: "Why is `xhigh` usually the wrong tier for the *exploration* phase of a problem?",
      a: "Exploration is iterative — you want fast back-and-forth to test hypotheses cheaply. xhigh trades speed for depth, which is the wrong trade before you know which path matters. Save it for the one decision that earns the wait.",
    },
  ],
  decision: [
    {
      type: "knowledge",
      q: "You want to type `/triage-inbox` once a morning to categorize unread email. Which two primitives are you composing — and what would a third one add?",
      a: "A Skill (the `/triage-inbox` invocation) plus an MCP server (Gmail). A `/loop 24h /triage-inbox` would make it scheduled rather than manual — though if you'd rather decide each morning whether to triage, you don't need it.",
    },
    {
      type: "knowledge",
      q: "You've been hired to ship a feature in a codebase you've never seen. What's the first primitive to reach for, before you write any code?",
      a: "A Subagent — specifically `Explore`. It does the messy initial reading without polluting your main session and returns a structured summary you can act on. Skipping this usually means a session that runs out of context room halfway through the work.",
    },
  ],
  "use-cases": [
    {
      type: "skills",
      q: "Sketch the SKILL.md for a `weekly-status` skill that respects the structure-not-prose rule. What sections would it produce empty?",
      a: "Headers like `## Shipped this week`, `## In flight`, `## Blocked / risks`, `## Asks of others` — with italicized prompts beneath each (\"What's at risk and why?\"). Nothing pre-filled. The skill saves you 10 minutes of formatting and ensures you don't skip the awkward sections; the substance stays yours.",
    },
    {
      type: "knowledge",
      q: "You're tempted to add a step to your inbox-triage skill that drafts replies. What's the case against?",
      a: "Drafting collapses triage into auto-reply — and the decision of *what to say* is most of the email work. Outsourcing it sends text you didn't think. Triage stays useful only if it stops at \"these need you\" and hands you a shorter inbox.",
    },
  ],
  patterns: [
    {
      type: "knowledge",
      q: "Claude just recommended a refactoring approach. The make-Claude-argue-back pattern says you ask… what, exactly?",
      a: "Something like: \"What's the strongest case against this? What would have to be true for this to be wrong?\" — and read the answer slowly. The point is forcing past the helpfulness bias; Claude trends toward agreement when you ask if your idea is good.",
    },
    {
      type: "knowledge",
      q: "Why does the friction-audit pattern argue against automating PRD *writing* but in favor of automating PRD *formatting*?",
      a: "Writing the substance is the moment you decide what the product is — that friction is load-bearing thinking. Formatting (headers, structure) is mechanical; removing it removes nothing important. Automate the second; preserve the first.",
    },
    {
      type: "knowledge",
      q: "You have three Claude sessions open today: code, research, PRD planning. Mid-afternoon you want to ask a quick research question while in the code session. What does one-window-one-purpose say to do?",
      a: "Ask in the research session, not the code session. Mixing pollutes context — the model is already \"thinking in code\" and you'll get worse answers, plus you'll degrade the code session's clarity for the rest of the day. The context switch costs less than the cleanup.",
    },
  ],
  "anti-patterns": [
    {
      type: "knowledge",
      q: "A teammate uses Claude to summarize every Slack thread before reading it. Which anti-pattern is this, and what's the failure mode?",
      a: "Auto-summarizing things you should be reading. Summaries drop the specific phrase, the buried qualifier, the throwaway example — usually the bit that actually matters. Use summaries to *triage* what to read; don't substitute them for reading.",
    },
    {
      type: "knowledge",
      q: "You've written 25 skills in two months. Six get regular use; 19 you've used once. What should you do, and why?",
      a: "Delete the 19. Skill sprawl is invisible debt — autocomplete clutter, naming collisions, dead code paths. If you needed any of those skills, you'll write better ones the next time you hit the case. Repetition is the test, and they failed it.",
    },
    {
      type: "knowledge",
      q: "Why is asking Claude \"is this a good idea?\" worse than asking \"what's the case against this idea?\"",
      a: "The first triggers the helpfulness bias — Claude will usually find the steelman of your position and you'll feel right. The second forces dissent: you get the actual failure modes. You're not paying for praise; you're paying for the disagreement you can't easily generate yourself.",
    },
  ],
  cheatsheet: [
    {
      type: "skills",
      q: "You forget which subagents are available right now. Which command lists them?",
      a: "`/agents`. It also lets you pick one to delegate to in the same step.",
    },
    {
      type: "skills",
      q: "Brand-new repo, no Claude config yet. Which command bootstraps a `CLAUDE.md` describing the codebase?",
      a: "`/init` — generates a starter `CLAUDE.md`. Edit it after; the auto-generated version is a draft, not the deliverable. The skill is in the editing.",
    },
  ],
};

export const SOURCES: { label: string; href: string }[] = [
  { label: "Claude Code changelog", href: "https://code.claude.com/docs/en/changelog.md" },
  { label: "Skills docs", href: "https://code.claude.com/docs/en/skills" },
  { label: "Subagents docs", href: "https://code.claude.com/docs/en/sub-agents" },
  { label: "Plugins announcement", href: "https://www.anthropic.com/news/claude-code-plugins" },
];
