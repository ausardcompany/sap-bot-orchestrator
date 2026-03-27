# sap-bot-orchestrator Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-03-24

## Active Technologies
- Bash (shell steps in composite action) + Node.js >= 22 (for LLM agent) + GitHub Actions composite action (`runs: composite`), `actions/checkout@v4`, `actions/setup-node@v4`, `actions/upload-artifact@v4`, `actions/github-script@v7`, `markdownlint-cli2` (via npx), Alexi CLI (pre-built npm package or built from source) (007-external-doc-action)
- N/A (git repository files only) (007-external-doc-action)

- TypeScript 5.9 / Node.js >= 22.12.0 / ES Modules + Ink v6.8.0 (already installed), React v19.2.4 (001-tui-clone)

## Project Structure

```text
src/
tests/
```

## Commands

npm test && npm run lint

## Code Style

TypeScript 5.9 / Node.js >= 22.12.0 / ES Modules: Follow standard conventions

## Recent Changes
- 007-external-doc-action: Added Bash (shell steps in composite action) + Node.js >= 22 (for LLM agent) + GitHub Actions composite action (`runs: composite`), `actions/checkout@v4`, `actions/setup-node@v4`, `actions/upload-artifact@v4`, `actions/github-script@v7`, `markdownlint-cli2` (via npx), Alexi CLI (pre-built npm package or built from source)

- 001-tui-clone: Added TypeScript 5.9 / Node.js >= 22.12.0 / ES Modules + Ink v6.8.0 (already installed), React v19.2.4

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
