# Plan: Alexi Code Agent — PPTX Presentation

## Goal
Create a 17-slide corporate/SAP-branded PowerPoint presentation about Alexi, the intelligent LLM orchestrator for SAP AI Core. Target audience is mixed (technical + management). Includes a demo flow section.

## Tool
PptxGenJS via the installed `pptx` skill (create from scratch workflow).

## Color Palette — SAP Corporate

| Role | Color | Hex |
|------|-------|-----|
| Primary | SAP Dark Blue | `0A1E3D` |
| Secondary | SAP Gold/Amber | `F0AB00` |
| Accent | SAP Light Blue | `0070F2` |
| Background (light slides) | Off-white | `F5F6FA` |
| Background (dark slides) | Deep Navy | `0A1E3D` |
| Body Text | Dark Gray | `2C3E50` |
| Muted/Caption Text | Medium Gray | `7F8C8D` |

## Typography

| Element | Font | Size |
|---------|------|------|
| Slide titles | Georgia | 36-40pt bold |
| Section headers | Georgia | 20-24pt bold |
| Body text | Calibri | 14-16pt |
| Captions/labels | Calibri | 10-12pt muted |

## Slide Plan (17 slides)

### Slide 1 — Title Slide
- **Layout**: Dark background (`0A1E3D`), centered
- **Content**: "Alexi" large title, subtitle "Intelligent LLM Orchestrator for SAP AI Core", version v0.2.6, author info
- **Visual**: Gold accent shape element

### Slide 2 — The Challenge
- **Layout**: Two-column (text left, icon/illustration right)
- **Content**: Problems in enterprise AI:
  - Fragmented LLM access across providers
  - No intelligent model selection
  - Missing enterprise safeguards (content filtering, PII masking)
  - Manual context management across sessions

### Slide 3 — What is Alexi?
- **Layout**: Icon + text rows (3 rows)
- **Content**:
  - CLI tool (`alexi` / `ax`) for SAP AI Core
  - Intelligent auto-routing selects the optimal model per prompt
  - Autonomous agent with 25+ tools for coding tasks

### Slide 4 — Key Capabilities
- **Layout**: 2x3 grid of capability cards
- **Cards**:
  1. Auto-Routing — Classifies prompts, scores models, picks the best
  2. Agentic Tool Loop — Autonomous multi-step task execution
  3. 25+ Built-in Tools — File ops, bash, web, search, memory
  4. Multi-Model Support — GPT, Claude, Gemini, Llama, Nova, DeepSeek, Mistral
  5. MCP Integration — Client + Server for tool extensibility
  6. Enterprise Features — Content filtering, PII masking, grounding

### Slide 5 — Supported Models
- **Layout**: Grouped columns with model family labels
- **Content**: 8 model families with specific models listed:
  - OpenAI: GPT-4o, GPT-4.1, GPT-5
  - Anthropic: Claude 4.5 Opus/Sonnet/Haiku
  - Google: Gemini
  - Amazon: Nova
  - Meta: Llama
  - DeepSeek, Mistral, SAP ABAP

### Slide 6 — Intelligent Auto-Routing
- **Layout**: Horizontal flow/process diagram
- **Content**:
  1. Prompt Input
  2. Task Classification (coding, reasoning, creative, QA)
  3. Complexity Assessment (simple/medium/complex)
  4. Model Scoring (cost, capability, task fit)
  5. Best Model Selected
- **Extra**: Mention hot-reloadable routing config, `--prefer-cheap` flag

### Slide 7 — Architecture Overview
- **Layout**: Architecture diagram (layered boxes)
- **Content** (top to bottom):
  - CLI Layer (Commander + Ink/React TUI)
  - Core Layer (Orchestrator, Router, Session Manager, Memory, Cost Tracker)
  - Agent Layer (Code, Debug, Plan, Explore, Orchestrator agents)
  - Tool Layer (25 tools + MCP tools)
  - Provider Layer (SAP Orchestration Provider)
  - SAP AI Core (Content Filter, DPI, Grounding, Translation)
  - LLM Models

### Slide 8 — Agent System
- **Layout**: Table or horizontal cards
- **Content**: 5 agents

| Agent | Role | Tool Access |
|-------|------|-------------|
| Code | General coding, all tools | Full |
| Debug | Bug fixing, error analysis | Full |
| Plan | Architecture, read-only analysis | read, glob, grep, webfetch |
| Explore | Fast codebase search | read, glob, grep |
| Orchestrator | Delegates to sub-agents | task only |

- **Extra**: @syntax switching (`@debug fix this`), aliases, temperature settings

### Slide 9 — Tool Ecosystem
- **Layout**: Category grid (5 groups)
- **Groups**:
  - File Operations: read, write, edit, multiedit, delete, glob, grep, ls
  - Execution: bash
  - Web: webfetch, websearch, browser
  - Agent/Workflow: task, question, todowrite, skill
  - Intelligence: definitions, codesearch, warpgrep, diagnostics, storeMemory, recallMemory, batch, notebookRead/Edit

### Slide 10 — SAP Enterprise Features
- **Layout**: 2x2 grid of feature blocks
- **Blocks**:
  1. Content Filtering — Azure Content Safety + Llama Guard 3 (input/output)
  2. Data Masking (DPI) — Anonymize 25+ PII entity types (email, phone, SSN, credit cards)
  3. Document Grounding — Vector repos + help.sap.com knowledge bases
  4. Translation — Input/output language translation

### Slide 11 — System Prompt Pipeline
- **Layout**: Numbered vertical steps (6 layers)
- **Content**:
  1. Soul — Core identity and behavior
  2. Model-Specific — Tailored for Anthropic/OpenAI/Gemini
  3. Environment — Working dir, git status, platform, date
  4. Agent Role — Code/Debug/Plan/Explore/Orchestrator prompt
  5. Instruction Files — AGENTS.md, user rules, project rules
  6. Custom Rules — User-provided via `--system` flag
- **Note**: "Cache-friendly ordering: stable content first for LLM prompt caching"

### Slide 12 — MCP Integration
- **Layout**: Split layout (left/right)
- **Left**: MCP Server — Exposes all 25+ tools via stdio transport for external AI clients
- **Right**: MCP Client — Connects to external MCP servers (filesystem, GitHub, Brave Search), aggregates tools
- **Config**: `~/.alexi/mcp-servers.json`

### Slide 13 — Terminal UI
- **Layout**: Half-bleed visual area with description
- **Content**: Rich terminal UI built with Ink v6 + React 19
  - Message bubbles with markdown rendering
  - Diff view for code changes
  - Tool call visualization blocks
  - Command palette with slash commands
  - Spinner animations, syntax highlighting

### Slide 14 — Cost & Session Management
- **Layout**: Two-column with stat callouts
- **Left — Cost Tracking**:
  - Per-model pricing tables
  - Per-session / per-day / per-month summaries
  - CSV export capability
- **Right — Session Management**:
  - Persistent multi-turn conversations
  - Context compaction at 90% window capacity
  - Typed memory system (episodic, semantic, procedural, working)

### Slide 15 — Demo Flow
- **Layout**: Numbered process steps
- **Steps**:
  1. Launch: `alexi -i` (interactive mode)
  2. Auto-route: Send a prompt, watch model selection
  3. Agent execution: Multi-step coding task with tool calls
  4. Tool visualization: See file reads, edits, bash execution
  5. Cost summary: Review session costs and model usage
- **Note**: This slide outlines what to demo live

### Slide 16 — Tech Stack
- **Layout**: Icon-style grid (3x3)
- **Items**:
  - TypeScript 5.9 (strict mode)
  - Node.js 22+ (ES Modules)
  - SAP AI SDK (orchestration + ai-api)
  - Ink v6 + React 19 (TUI)
  - Zod v4 (runtime validation)
  - Commander 14 (CLI)
  - Hono v4 (HTTP server)
  - Tree-sitter (code parsing)
  - Vitest 4 (testing)

### Slide 17 — Thank You / Q&A
- **Layout**: Dark background, centered
- **Content**: "Thank You", "Questions?", repo link, contact info
- **Visual**: Gold accent matching slide 1

## Implementation Steps

1. **Install dependencies**
   ```bash
   npm install pptxgenjs
   pip install "markitdown[pptx]"
   ```

2. **Create generator script** — `scripts/generate-alexi-presentation.js`
   - Single Node.js file using PptxGenJS
   - All 17 slides with proper styling, varied layouts
   - SAP color palette throughout
   - Georgia/Calibri font pairing

3. **Generate the PPTX**
   ```bash
   node scripts/generate-alexi-presentation.js
   ```
   Output: `alexi-presentation.pptx`

4. **QA — Content**
   ```bash
   python -m markitdown alexi-presentation.pptx
   ```
   Verify all text content, no typos, correct ordering.

5. **QA — Visual** (convert to images, inspect with subagent)
   ```bash
   soffice --headless --convert-to pdf alexi-presentation.pptx
   pdftoppm -jpeg -r 150 alexi-presentation.pdf slide
   ```
   Inspect each slide image for overlaps, alignment, contrast issues.

6. **Fix & re-verify** — Address any issues, re-render, confirm.

## Design Rules (from pptx skill)
- Every slide needs a visual element — no text-only slides
- Vary layouts across slides — no two consecutive slides same layout
- 0.5" minimum margins, 0.3-0.5" between content blocks
- Left-align body text, center only titles
- NEVER use accent lines under titles
- Dark backgrounds for title + conclusion slides (sandwich structure)
- Strong contrast for all text and icons
- Set `margin: 0` on text boxes when aligning with shapes
