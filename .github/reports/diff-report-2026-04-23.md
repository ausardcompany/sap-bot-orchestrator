# Upstream Changes Report
Generated: 2026-04-23 07:56:26

## Summary
- kilocode: 237 commits, 1248 files changed
- opencode: 62 commits, 233 files changed

## kilocode Changes (60a1f3c36..74df86852)

### Commits

- 74df86852 - Merge pull request #9395 from Kilo-Org/docs/update-kilo-auto-model-routing (Joshua Lambert, 2026-04-22)
- 066a56529 - docs: remove claw mode from kilo-auto frontier documentation (kiloconnect[bot], 2026-04-22)
- b2c9467a8 - docs: update kilo-auto model routing documentation (kiloconnect[bot], 2026-04-22)
- 6804c71a9 - feat: Add workflow to watch for new Opencode Releases and notify Slack/Vercel (for dashboard) webhooks. (Johnny Amancio, 2026-04-22)
- ffd7bbb70 - chore: update nix node_modules hashes (kilo-maintainer[bot], 2026-04-22)
- 48c0553bb - feat(vscode): xterm.js terminal tabs in agent manager (#9268) (Marius, 2026-04-22)
- 1c1c4b3a4 - Merge pull request #9298 from Kilo-Org/cli-suggest-non-blocking (Marian Alexandru Alecu, 2026-04-22)
- 310343e7c - chore(cli): mark blockingSuggestion as kilocode change (Alex Alecu, 2026-04-22)
- 2899208bc - Merge branch 'cli-suggest-non-blocking' of https://github.com/Kilo-Org/kilocode into cli-suggest-non-blocking (Alex Alecu, 2026-04-22)
- 6f5dbe050 - Merge remote-tracking branch 'origin/main' into cli-suggest-non-blocking (Alex Alecu, 2026-04-22)
- 0d8d83ad9 - chore: update nix node_modules hashes (kilo-maintainer[bot], 2026-04-22)
- 1d0f1f7aa - Merge pull request #9357 from Kilo-Org/update-tagline-remove-openrouter-claim (Mark IJbema, 2026-04-22)
- e0a618c3f - docs: remove #1 on OpenRouter claim from taglines (kiloconnect[bot], 2026-04-22)
- 57630eaf1 - Merge pull request #9346 from Kilo-Org/imanolmaiztegui/kilo-opencode-v1.4.7 (Imanol Maiztegui, 2026-04-22)
- 0c2f99587 - chore: update kilo-vscode visual regression baselines (github-actions[bot], 2026-04-22)
- e17c053fc - style(imports): consolidate deep imports to use barrel re-exports (Imanol Maiztegui, 2026-04-22)
- 5b162ebc2 - Merge pull request #9336 from Kilo-Org/small-taleggio (Kirill Kalishev, 2026-04-22)
- 5149d3edc - Merge branch 'main' into imanolmaiztegui/kilo-opencode-v1.4.7 (Imanol Maiztegui, 2026-04-22)
- 92f1c1dab - refactor(tui,provider): raise paste-summary thresholds, improve copilot auth error, and clean up comments (Imanol Maiztegui, 2026-04-22)
- cad39b92b - Merge remote-tracking branch 'origin/main' into small-taleggio (kirillk, 2026-04-22)
- fb0072a13 - fix(jetbrains): use shared root logger in FileLog to prevent duplicate handlers (kirillk, 2026-04-22)
- 3bbe667c8 - Merge pull request #9119 from Kilo-Org/fix/snapshot-diff-freeze (Marian Alexandru Alecu, 2026-04-22)
- 740c2b4e8 - Merge pull request #9344 from Kilo-Org/fix/infinite-compact (Marian Alexandru Alecu, 2026-04-22)
- d147f782f - Merge pull request #9335 from Kilo-Org/productive-move (Kirill Kalishev, 2026-04-22)
- c850041b8 - Merge branch 'main' into cli-suggest-non-blocking (Marian Alexandru Alecu, 2026-04-22)
- 03a2eb9d9 - Merge pull request #9353 from Kilo-Org/fix/ovsx-publish-retry (Mark IJbema, 2026-04-22)
- df0c93c41 - Merge branch 'main' into cli-suggest-non-blocking (Marian Alexandru Alecu, 2026-04-22)
- eb7bd75d6 - release: v7.2.20 (kilo-maintainer[bot], 2026-04-22)
- cdd5dc095 - Merge remote-tracking branch 'origin/main' into cli-suggest-non-blocking (Alex Alecu, 2026-04-22)
- 188d71e0e - chore(cli): annotate kilocode sdk import (Alex Alecu, 2026-04-22)
- 0cc0cf2aa - fix(vscode): retry Open VSX publish on transient failures (kiloconnect[bot], 2026-04-22)
- 475f83690 - release: v7.2.19 (kilo-maintainer[bot], 2026-04-22)
- 40cb8889f - tui(cli): redesign inline suggest bar to match VS Code single-row layout (Alex Alecu, 2026-04-22)
- fe76dffa5 - release: v7.2.18 (kilo-maintainer[bot], 2026-04-22)
- 45b9923fc - Merge pull request #9319 from Kilo-Org/mark/fix-fim-upstream-timeout (Mark IJbema, 2026-04-22)
- e7bcc93eb - tui(cli): make suggest renderer reactive so the inline bar actually appears (Alex Alecu, 2026-04-22)
- 728404009 - refactor(gateway): simplify FIM timeout using AbortSignal.any (kiloconnect[bot], 2026-04-22)
- f373e0d06 - fix(cli): handle EADDRINUSE race in mcp oauth callback server (Imanol Maiztegui, 2026-04-22)
- 27028fe29 - fix(provider): update adaptive efforts, gateway support, and test corrections (Imanol Maiztegui, 2026-04-22)
- 23167b8b6 - refactor(test): replace direct Config.get assignment with spyOn mocking (Imanol Maiztegui, 2026-04-22)
- d8294f4b8 - Merge pull request #9331 from Kilo-Org/docs/generated-screenshot-refs (Mark IJbema, 2026-04-22)
- 5791061ab - fix(proxy): await async isSyncing check in server proxy (Imanol Maiztegui, 2026-04-22)
- cda900568 - docs(source-links): update file path references for model-id and tui-migrate modules (Imanol Maiztegui, 2026-04-22)
- f11702021 - fix(test): correct config module import to namespace import (Imanol Maiztegui, 2026-04-22)
- 87c2b560d - Merge branch 'main' into imanolmaiztegui/kilo-opencode-v1.4.7 (Imanol Maiztegui, 2026-04-22)
- fb3f76b83 - Merge pull request #9345 from Kilo-Org/docs/fix-preview-docsearch-links (Mark IJbema, 2026-04-22)
- ea09e7604 - refactor(sdk): reorder generated types and fix route chaining in instance handler (Imanol Maiztegui, 2026-04-22)
- 8d06a083b - tui(cli): render non-blocking suggestions inline in the conversation (Alex Alecu, 2026-04-22)
- c032fc202 - fix(cli): cap per-turn compaction attempts to stop infinite busy loop (Alex Alecu, 2026-04-22)
- 79ba90ec8 - fix(kilo-docs): keep docsearch links on previews (kiloconnect[bot], 2026-04-22)
- 324ee79f3 - build(deps): upgrade OpenTelemetry packages to v2 and sort dependencies (Imanol Maiztegui, 2026-04-22)
- e9da4e3bb - Merge pull request #9326 from Kilo-Org/session/agent_2c82a4a6-c1b2-4601-bf4f-c24ff7ff753f (Mark IJbema, 2026-04-22)
- 1739c430f - docs: document generated screenshot guidance (kiloconnect[bot], 2026-04-22)
- a31458952 - fix(opencode): replace direct Env access with effect-based resolution and update test infrastructure (Imanol Maiztegui, 2026-04-22)
- 1b3c23734 - chore: update kilo-vscode visual regression baselines (github-actions[bot], 2026-04-22)
- 9fca7a7d9 - docs: align task header screenshot story (kiloconnect[bot], 2026-04-22)
- 0e4821d80 - fix: restore settings story lifecycle import (kiloconnect[bot], 2026-04-22)
- 48d33890c - docs: restore custom provider screenshots (kiloconnect[bot], 2026-04-22)
- 251ed6734 - refactor(opencode): update internal import paths to use barrel re-exports (Imanol Maiztegui, 2026-04-22)
- 4a29528de - fix(jetbrains): harden question and markdown views (kirillk, 2026-04-21)
- 2a963723c - Merge pull request #9280 from Kilo-Org/quilted-titanosaurus (Kirill Kalishev, 2026-04-21)
- bc4ad3612 - docs(jetbrains): fix split mode template link (kirillk, 2026-04-21)
- 85c578ed8 - feat(jetbrains): improve session logging and sandbox diagnostics (kirillk, 2026-04-21)
- 38e1e76ad - fix(vscode): restore agent on question dismiss (kirillk, 2026-04-21)
- 6015ac6e7 - fix(vscode): restore explicit submit for question dock (kirillk, 2026-04-21)
- c7aa24d10 - logging (kirillk, 2026-04-21)
- 094ebe7e7 - build(deps): consolidate @opencode-ai/util and @opencode-ai/server into @opencode-ai/shared (Imanol Maiztegui, 2026-04-21)
- 1ca0683cf - chore: Delete plan (Alex Alecu, 2026-04-21)
- d5357f396 - resolve merge conflicts (Imanol Maiztegui, 2026-04-21)
- 728b50445 - Merge pull request #9328 from Kilo-Org/fix/smoke-test-blacksmith-runner (Mark IJbema, 2026-04-21)
- 788caef5c - ci: use blacksmith for smoke tests (kiloconnect[bot], 2026-04-21)
- ed665ed96 - Merge pull request #9300 from Kilo-Org/fix/plan-in-agent-manager (Marian Alexandru Alecu, 2026-04-21)
- ba98c5c40 - release: v7.2.17 (kilo-maintainer[bot], 2026-04-21)
- 42524dbf6 - fix(cli): replace cherry-pick with rebase + retry in publish push (kiloconnect[bot], 2026-04-21)
- 835350fed - chore(publish): defer release push and implement rebase retry loop (kiloconnect[bot], 2026-04-21)
- b2968d4a2 - chore: update nix node_modules hashes (kilo-maintainer[bot], 2026-04-21)
- 5bc0a4ad9 - Merge branch 'main' into mark/fix-fim-upstream-timeout (Mark IJbema, 2026-04-21)
- 2b3f3a582 - Merge pull request #9324 from Kilo-Org/fix/vscode-patch-stream-chat-types (Mark IJbema, 2026-04-21)
- 925606ce5 - fix(cli): clear pending on errors (Alex Alecu, 2026-04-21)
- 5f72c0baa - fix(vscode): patch stream-chat@9.38.0 to fix broken ws type declarations (kiloconnect[bot], 2026-04-21)
- 2f6109a5a - fix(cli): guard follow-up loop start (Alex Alecu, 2026-04-21)
- 230eceb9b - Merge pull request #9316 from Kilo-Org/mark/fix-autocomplete-ignore-cache (Mark IJbema, 2026-04-21)
- 4f9c99ea0 - chore: update nix node_modules hashes (kilo-maintainer[bot], 2026-04-21)
- b4dfbfcb7 - Merge pull request #9318 from Kilo-Org/mark/fix-autocomplete-debounce-promise-leak (Mark IJbema, 2026-04-21)
- c0e9ab46b - Merge pull request #9313 from Kilo-Org/eshurakov/cli-dev-local-script (Evgeny Shurakov, 2026-04-21)
- 06c5dc0a9 - Merge pull request #9305 from Kilo-Org/mark/autocomplete-backend-prewarm (Mark IJbema, 2026-04-21)
- bf98bbe34 - fix(vscode): bound autocomplete ignore cache (kiloconnect[bot], 2026-04-21)
- a8803476f - feat(cli): add dev:local script with isolated XDG dirs and local endpoints (Evgeny Shurakov, 2026-04-21)
- 882362a93 - fix: clean up docs dialog story (kiloconnect[bot], 2026-04-21)
- b6b6802dd - fix(cli): keep follow-up session busy during handover (Alex Alecu, 2026-04-21)
- c5a83b3cc - fix(cli): align non-blocking suggest picker behavior (Alex Alecu, 2026-04-21)
- 9ff717bc5 - Merge pull request #9241 from Kilo-Org/fix/custom-provider-variant-validation (Christiaan Arnoldus, 2026-04-21)
- ebc177e4e - Merge branch 'main' into fix/custom-provider-variant-validation (Christiaan Arnoldus, 2026-04-21)
- 8ac223167 - Merge pull request #9296 from Kilo-Org/feat/ling (Christiaan Arnoldus, 2026-04-21)
- e696fe6ea - fix(cli): inject plan message immediately, append handover in-place (Alex Alecu, 2026-04-21)
- 4146a2579 - wip (kiloconnect[bot], 2026-04-21)
- b99e7ff51 - Apply suggestion from @chrarnoldus (Christiaan Arnoldus, 2026-04-21)
- 786088e95 - chore: update kilo-vscode visual regression baselines (github-actions[bot], 2026-04-21)
- ce50f5cc6 - core: preserve upstream Myers diff code to keep upstream merges clean (Alex Alecu, 2026-04-21)
- b413855ed - fix: keep visual screenshot suffixes (kiloconnect[bot], 2026-04-21)
- b4cb8c3c0 - chore: add changeset for autocomplete backend prewarm (kiloconnect[bot], 2026-04-21)
- e1311679d - docs: reference generated screenshots (kiloconnect[bot], 2026-04-21)
- 88065874a - fix(gateway): keep fim guard active for errors (kiloconnect[bot], 2026-04-21)
- e28bbd6ee - Merge remote-tracking branch 'origin/main' into feat/ling (kiloconnect[bot], 2026-04-21)
- 0a16ab6c0 - fix(vscode): reset autocomplete state on workspace change (kiloconnect[bot], 2026-04-21)
- 3b73cf474 - fix(gateway): timeout autocomplete fim streams (kiloconnect[bot], 2026-04-21)
- 85dd7e091 - refactor: share isLing helper via kilocode/model-match, add multilingual exclusion (kiloconnect[bot], 2026-04-21)
- dca372581 - fix(vscode): prewarm autocomplete backend (kiloconnect[bot], 2026-04-21)
- 99ba7afdb - Merge pull request #9303 from Kilo-Org/mark/docs-screenshot-baselines (Mark IJbema, 2026-04-21)
- eb4ef7460 - refactor: replace broad ling startsWith with isLing helper excluding kling/bling/spelling (kiloconnect[bot], 2026-04-21)
- bfe44822e - fix(vscode): settle canceled autocomplete debounce (kiloconnect[bot], 2026-04-21)
- f45bab245 - chore: retain old visual baseline lfs paths (kiloconnect[bot], 2026-04-21)
- 618193283 - chore: move visual baselines into docs assets (kiloconnect[bot], 2026-04-21)
- a5946abe3 - core: drop the JavaScript diff fallback that's no longer needed (Alex Alecu, 2026-04-21)
- fe34c0bfe - fix: use startsWith for ling model detection and add ling to openapi prompt enum (kiloconnect[bot], 2026-04-21)
- 79a4f3762 - Merge remote-tracking branch 'origin/main' into fix/custom-provider-variant-validation (kiloconnect[bot], 2026-04-21)
- 0d0dabe59 - fix(cli): start-new-session tab on slow plan handover (Alex Alecu, 2026-04-21)
- 5cea63d56 - Merge pull request #9264 from Kilo-Org/cleanup/autocomplete-dead-code (Mark IJbema, 2026-04-21)
- 80430d660 - Merge pull request #9120 from Kilo-Org/bash-optional-description (Christiaan Arnoldus, 2026-04-21)
- 2ba203b6b - fix(cli): render suggest above an active input prompt (Alex Alecu, 2026-04-21)
- 94e8c788e - core: stop TUI freeze when viewing diffs of huge files (Alex Alecu, 2026-04-21)
- 2df50796b - chore: add kilocode_change annotations to ling model changes (kiloconnect[bot], 2026-04-21)
- 20c496254 - Merge branch 'main' into feat/ling (Christiaan Arnoldus, 2026-04-21)
- f0bc02966 - Merge branch 'main' into bash-optional-description (Christiaan Arnoldus, 2026-04-21)
- e2e89aeb8 - Merge branch 'main' into fix/snapshot-diff-freeze (Marian Alexandru Alecu, 2026-04-21)
- 9d67013d9 - feat(jetbrains): add progress indicator and suppress step-start/step-finish parts (kirillk, 2026-04-20)
- 64596bfa4 - feat(jetbrains): add debug logging for session events and state changes (kirillk, 2026-04-20)
- eb6f89ef3 - fix(cli): restore model descriptions in expanded model picker (kirillk, 2026-04-20)
- de6dd0675 - feat(jetbrains): add SessionUi with turn-aware transcript, renderers, and DSL docks (kirillk, 2026-04-20)
- d363480ac - Merge branch 'detailed-sweater' into kirillk/session-view (kirillk, 2026-04-20)
- e7ac4d551 - Merge remote-tracking branch 'origin/main' into bash-optional-description (kiloconnect[bot], 2026-04-20)
- 89f1772c7 - refactor(vscode): drop unused supportsFim / generateResponse from AutocompleteModel (kiloconnect[bot], 2026-04-20)
- b647f151a - refactor(vscode): drop chat-completion fallback in chat textarea autocomplete (kiloconnect[bot], 2026-04-20)
- 8175daeab - refactor(vscode): drop unreachable postprocessing branches (kiloconnect[bot], 2026-04-20)
- fc2ba1ae7 - refactor(vscode): drop FIM templates for unsupported autocomplete models (kiloconnect[bot], 2026-04-20)
- 5ec01e00b - refactor(vscode): reduce validateCustomProvider complexity by extracting helpers (kiloconnect[bot], 2026-04-20)
- 8d49b48d7 - Merge branch 'main' into fix/custom-provider-variant-validation (Christiaan Arnoldus, 2026-04-20)
- 6c0439b00 - chore: add changeset for variant validation fix (kiloconnect[bot], 2026-04-20)
- d9421bac0 - fix(vscode): extract and test custom provider variant name validation (kiloconnect[bot], 2026-04-20)
- eca1cc7d4 - Merge remote-tracking branch 'origin/main' into fix/snapshot-diff-freeze (Alex Alecu, 2026-04-20)
- bf6f499b2 - refactor: kilo compat for v1.4.7 (Imanol Maiztegui, 2026-04-20)
- a7e06d660 - refactor(cli): narrow snapshot-diff freeze fix to caps-only (Alex Alecu, 2026-04-20)
- 0f932abe0 - resolve merge conflicts with main (Alex Alecu, 2026-04-20)
- c949d672d - Merge branch 'main' into feat/ling (Tang Xinyao, 2026-04-20)
- f13b635dc - feat: use model.api.id rather than model.id as the  id (tangxinyao, 2026-04-20)
- c2e0bbbbb - Merge branch 'main' into feat/ling (Tang Xinyao, 2026-04-20)
- 2b071e44c - Merge branch 'main' into fix/snapshot-diff-freeze (Marian Alexandru Alecu, 2026-04-17)
- c567f304d - refactor(cli): drop session.warning toast and warning bus event (Alex Alecu, 2026-04-17)
- cceb3d6c6 - test(cli): drop tests that reach into private summary state (Alex Alecu, 2026-04-17)
- 01edbfa03 - fix(ci): use block annotation for diffFull delegation (Alex Alecu, 2026-04-17)
- 83739c332 - fix(session): skip warning on superseded summary (Alex Alecu, 2026-04-17)
- 76925484e - feat(cli): mark bash description as recommended (kiloconnect[bot], 2026-04-17)
- d04da0eb5 - gate pool init with shared promise (Alex Alecu, 2026-04-17)
- 4ed4ae34c - scope terminate to owning pool (Alex Alecu, 2026-04-17)
- 7ca9c2f7c - remove skip_slow_tests opt-out (Alex Alecu, 2026-04-17)
- 871e65528 - extract diff loop to kilo helper (Alex Alecu, 2026-04-17)
- d49aadd65 - move summary dispatcher to kilo helper (Alex Alecu, 2026-04-17)
- 449f62971 - log errors instead of swallowing them (Alex Alecu, 2026-04-17)
- 95671406c - Merge remote-tracking branch 'origin/main' into fix/snapshot-diff-freeze (Alex Alecu, 2026-04-17)
- 959e619b2 - fix: add kilocode_change markers (kiloconnect[bot], 2026-04-17)
- d40fc1c71 - feat(cli): make bash tool description parameter optional (kiloconnect[bot], 2026-04-17)
- 8e750846d - fix(cli): prevent freeze on huge-file diffs (Alex Alecu, 2026-04-17)
- 9f201d637 - release: v1.4.7 (opencode, 2026-04-16)
- 0e86466f9 - refactor: unwrap Discovery namespace to flat exports + self-reexport (#22878) (Kit Langton, 2026-04-16)
- 32548bcb4 - refactor: unwrap ConfigPlugin namespace to flat exports + self-reexport (#22876) (Kit Langton, 2026-04-16)
- 86c54c5ac - fix(tui): minor logging cleanup (#22924) (James Long, 2026-04-16)
- ae584332b - fix: uncomment import (#22923) (Aiden Cline, 2026-04-16)
- 1694c5bfe - refactor: collapse file barrel into file/index.ts (#22901) (Kit Langton, 2026-04-16)
- cdfbb26c0 - refactor: collapse bus barrel into bus/index.ts (#22902) (Kit Langton, 2026-04-16)
- 610c036ef - fix(opencode): use low reasoning effort for GitHub Copilot gpt-5 models (#22824) (thakrarsagar, 2026-04-16)
- 2638e2acf - refactor: collapse plugin barrel into plugin/index.ts (#22914) (Kit Langton, 2026-04-16)
- 49bbea5ae - refactor: collapse snapshot barrel into snapshot/index.ts (#22916) (Kit Langton, 2026-04-16)
- 5fccdc9fc - refactor: collapse mcp barrel into mcp/index.ts (#22913) (Kit Langton, 2026-04-16)
- 664b2c36e - refactor: collapse git barrel into git/index.ts (#22909) (Kit Langton, 2026-04-16)
- 964474a1b - refactor: collapse permission barrel into permission/index.ts (#22915) (Kit Langton, 2026-04-16)
- ab15fc157 - refactor: collapse npm barrel into npm/index.ts (#22911) (Kit Langton, 2026-04-16)
- 99d392a4f - refactor: collapse skill barrel into skill/index.ts (#22912) (Kit Langton, 2026-04-16)
- ae9a69660 - refactor: collapse installation barrel into installation/index.ts (#22910) (Kit Langton, 2026-04-16)
- bd51a0d35 - refactor: collapse worktree barrel into worktree/index.ts (#22906) (Kit Langton, 2026-04-16)
- 8c191b10c - refactor: collapse ide barrel into ide/index.ts (#22904) (Kit Langton, 2026-04-16)
- cb6a9253f - refactor: collapse sync barrel into sync/index.ts (#22907) (Kit Langton, 2026-04-16)
- 23f97ac49 - refactor: collapse global barrel into global/index.ts (#22905) (Kit Langton, 2026-04-16)
- 021ab50fb - chore: generate (opencode-agent[bot], 2026-04-16)
- 3fe906f51 - refactor: collapse command barrel into command/index.ts (#22903) (Kit Langton, 2026-04-16)
- a8d8a35cd - feat(core): pass auth data to workspace (#22897) (James Long, 2026-04-16)
- 9b77430d0 - refactor: collapse env barrel into env/index.ts (#22900) (Kit Langton, 2026-04-16)
- 1045a4360 - refactor: collapse format barrel into format/index.ts (#22898) (Kit Langton, 2026-04-16)
- 26af77cd1 - fix(core): fix detection of local installation channel (#22899) (James Long, 2026-04-16)
- 25a9de301 - core: eager load config on startup for better traces and refactor npm install for improved error reporting (Dax Raad, 2026-04-16)
- e0d71f124 - tooling: add collapse-barrel.ts for single-namespace barrel migration (#22887) (Kit Langton, 2026-04-16)
- 1c33b866b - fix: remove 10 more unnecessary `as any` casts in opencode core (#22882) (Kit Langton, 2026-04-16)
- 5e650fd9e - fix(opencode): drop max_tokens for OpenAI reasoning models on Cloudflare AI Gateway (#22864) (Kobi Hudson, 2026-04-16)
- 76275fc3a - refactor: move Pty into pty/index.ts with self-reexport (#22881) (Kit Langton, 2026-04-16)
- 6c3b28db6 - fix: ensure that double pasting doesnt happen after tui perf commit was merged (#22880) (Aiden Cline, 2026-04-16)
- 2fe9d9447 - fix: remove 8 more unnecessary `as any` casts in opencode core (#22877) (Kit Langton, 2026-04-16)
- 219b473e6 - refactor: unwrap BashArity namespace to flat exports + self-reexport (#22874) (Kit Langton, 2026-04-16)
- 7c1b30291 - chore: update nix node_modules hashes (opencode-agent[bot], 2026-04-16)
- 47e0e2342 - tweak: set display 'summarized' by default for opus 4.7 thorugh messages api (#22873) (Aiden Cline, 2026-04-16)
- bf4c10782 - fix: remove 7 unnecessary `as any` casts in opencode core (#22840) (Kit Langton, 2026-04-16)
- 9afbdc102 - fix(test): make plugin loader theme source path separator-safe (#22870) (Dax, 2026-04-16)
- 370770122 - chore: generate (opencode-agent[bot], 2026-04-16)
- 143817d44 - chore: bump ai sdk deps for opus 4.7 (#22869) (Aiden Cline, 2026-04-16)
- c60862fc9 - fix: add missing glob dependency  (#22851) (Thomas Butler, 2026-04-16)
- bee5f919f - core: reorganize ConfigPaths module export for cleaner dependency management (Dax Raad, 2026-04-16)
- cefa7f04c - core: reorganize ConfigPaths module export for cleaner dependency management (Dax Raad, 2026-04-16)
- 03e20e6ac - core: modularize config parsing to improve maintainability (Dax Raad, 2026-04-16)
- c5deeee8c - fix: ensure azure has store = true by default (#22764) (Aiden Cline, 2026-04-16)
- 8b1f0e2d9 - core: add documentation comments to plugin configuration merge logic (Dax Raad, 2026-04-16)
- 9bf2dfea3 - core: refactor config schemas into separate modules for better maintainability (Dax Raad, 2026-04-16)
- 33bb847a1 - config: refactor (Dax Raad, 2026-04-16)
- bfffc3c2c - tui: ensure TUI plugins load with proper project context when multiple directories are open (Dax Raad, 2026-04-16)
- b28956f0d - fix(core): better global sync event structure (#22858) (James Long, 2026-04-16)
- d82bc3a42 - chore: generate (opencode-agent[bot], 2026-04-16)
- 06afd3329 - refactor(tui): improve workspace management (#22691) (James Long, 2026-04-16)
- 305460b25 - fix: add a few more tests for sync and session restore (#22837) (James Long, 2026-04-16)
- 8c0205a84 - fix: align stale bot message with actual 60-day threshold (#22842) (Nacai, 2026-04-16)
- 378c05f20 - feat: Add support for claude opus 4.7 xhigh adaptive reasoning effort (#22833) (Graham Campbell, 2026-04-16)
- cc7acd90a - fix(nix): add shared package to bun install filters (#22665) (Jérôme Benoit, 2026-04-16)
- a200f6fb8 - zen: opus 4.7 (Frank, 2026-04-16)
- 2b1696f1d - Revert "tui: fix path comparison in theme installer to handle different path formats" (Dax Raad, 2026-04-16)
- 8ab17f5ce - tui: fix path comparison in theme installer to handle different path formats (Dax Raad, 2026-04-16)
- 6ce481e95 - move useful scripts to script folder (Dax Raad, 2026-04-16)
- 7ea76ec10 - feat: ling (tangxinyao, 2026-04-16)
- 7341718f9 - chore: generate (opencode-agent[bot], 2026-04-16)
- ef90b9320 - fix: restore .gitignore logic for config dirs and migrate to shared Npm service (#22772) (Dax, 2026-04-16)
- 3f7df08be - perf: make vcs init non-blocking by forking git branch resolution (#22771) (Dax, 2026-04-16)
- ef6c26c73 - chore: update nix node_modules hashes (opencode-agent[bot], 2026-04-16)
- 8b3b608ba - chore: generate (opencode-agent[bot], 2026-04-16)
- 97918500d - app: start migrating bootstrap data fetching to TanStack Query (#22756) (Brendan Allan, 2026-04-16)
- e2c080396 - Fix desktop download asset names for beta channel (#22766) (Brendan Allan, 2026-04-16)
- f418fd563 - beta badge for desktop app (#14471) (Adam, 2026-04-16)
- 675a46e23 - CLI perf: reduce deps (#22652) (Dax, 2026-04-16)
- 150ab07a8 - chore: generate (opencode-agent[bot], 2026-04-16)
- 6b2083898 - feat: unwrap provider namespaces to flat exports + barrel (#22760) (Kit Langton, 2026-04-16)
- c8af8f96c - chore: generate (opencode-agent[bot], 2026-04-16)
- 5011465c8 - feat: unwrap tool namespaces to flat exports + barrel (#22762) (Kit Langton, 2026-04-16)
- f6cc22868 - feat: unwrap cli-tui namespaces to flat exports + barrel (#22759) (Kit Langton, 2026-04-16)

### Changed Files by Category

#### Tool System (packages/*/src/tool/)
- `.opencode/tool/github-pr-search.ts` (+1, -1)
- `.opencode/tool/github-triage.ts` (+1, -1)
- `packages/opencode/src/kilocode/tool/read-directory.ts` (+1, -1)
- `packages/opencode/src/kilocode/tool/registry.ts` (+2, -3)
- `packages/opencode/src/kilocode/tool/task.ts` (+1, -1)
- `packages/opencode/src/tool/apply_patch.ts` (+11, -3)
- `packages/opencode/src/tool/bash.ts` (+126, -12)
- `packages/opencode/src/tool/codesearch.ts` (+1, -1)
- `packages/opencode/src/tool/diagnostics.ts` (+1, -1)
- `packages/opencode/src/tool/edit.ts` (+4, -5)
- `packages/opencode/src/tool/external-directory.ts` (+4, -4)
- `packages/opencode/src/tool/glob.ts` (+3, -3)
- `packages/opencode/src/tool/grep.ts` (+3, -3)
- `packages/opencode/src/tool/index.ts` (+3, -0)
- `packages/opencode/src/tool/invalid.ts` (+1, -1)
- `packages/opencode/src/tool/ls.ts` (+0, -122)
- `packages/opencode/src/tool/ls.txt` (+0, -1)
- `packages/opencode/src/tool/lsp.ts` (+2, -2)
- `packages/opencode/src/tool/multiedit.ts` (+1, -1)
- `packages/opencode/src/tool/plan.ts` (+1, -1)
- `packages/opencode/src/tool/question.ts` (+1, -1)
- `packages/opencode/src/tool/read.ts` (+3, -3)
- `packages/opencode/src/tool/recall.ts` (+3, -3)
- `packages/opencode/src/tool/registry.ts` (+278, -285)
- `packages/opencode/src/tool/schema.ts` (+2, -1)
- `packages/opencode/src/tool/skill.ts` (+2, -2)
- `packages/opencode/src/tool/task.ts` (+2, -2)
- `packages/opencode/src/tool/todo.ts` (+1, -1)
- `packages/opencode/src/tool/tool.ts` (+122, -121)
- `packages/opencode/src/tool/truncate.ts` (+127, -124)
- `packages/opencode/src/tool/warpgrep.ts` (+1, -1)
- `packages/opencode/src/tool/webfetch.ts` (+2, -2)
- `packages/opencode/src/tool/websearch.ts` (+1, -1)
- `packages/opencode/src/tool/write.ts` (+2, -2)
- `packages/opencode/test/tool/apply_patch.test.ts` (+2, -2)
- `packages/opencode/test/tool/bash.test.ts` (+7, -7)
- `packages/opencode/test/tool/diagnostics-filter.test.ts` (+1, -1)
- `packages/opencode/test/tool/edit.test.ts` (+2, -2)
- `packages/opencode/test/tool/external-directory.test.ts` (+2, -2)
- `packages/opencode/test/tool/glob.test.ts` (+2, -2)
- `packages/opencode/test/tool/grep.test.ts` (+2, -2)
- `packages/opencode/test/tool/question.test.ts` (+1, -2)
- `packages/opencode/test/tool/read.test.ts` (+5, -4)
- `packages/opencode/test/tool/recall.test.ts` (+12, -11)
- `packages/opencode/test/tool/registry.test.ts` (+2, -2)
- `packages/opencode/test/tool/skill.test.ts` (+3, -3)
- `packages/opencode/test/tool/task.test.ts` (+3, -3)
- `packages/opencode/test/tool/tool-define.test.ts` (+2, -2)
- `packages/opencode/test/tool/truncation.test.ts` (+3, -3)
- `packages/opencode/test/tool/webfetch.test.ts` (+1, -1)
- `packages/opencode/test/tool/write.test.ts` (+3, -3)

#### Agent System (packages/*/src/agent/)
- `packages/opencode/src/agent/agent.ts` (+8, -8)
- `packages/opencode/src/kilocode/agent/index.ts` (+5, -5)
- `packages/opencode/test/agent/agent.test.ts` (+4, -4)

#### Permission System (**/permission/)
- `packages/opencode/src/kilocode/permission/config-paths.ts` (+1, -1)
- `packages/opencode/src/kilocode/permission/routes.ts` (+1, -1)
- `packages/opencode/src/permission/arity.ts` (+148, -148)
- `packages/opencode/src/permission/evaluate.ts` (+1, -1)
- `packages/opencode/src/permission/index.ts` (+441, -420)
- `packages/opencode/src/permission/schema.ts` (+5, -1)
- `packages/opencode/test/kilocode/permission/next.always-rules.test.ts` (+1, -1)
- `packages/opencode/test/permission/next.test.ts` (+3, -3)

#### Event Bus (**/bus/, **/event/)
- `packages/opencode/src/bus/bus-event.ts` (+1, -1)
- `packages/opencode/src/bus/global.ts` (+8, -8)
- `packages/opencode/src/bus/index.ts` (+167, -167)

#### Core (**/core/)
- `packages/kilo-vscode/src/services/autocomplete/continuedev/core/autocomplete/postprocessing/index.ts` (+10, -26)
- `packages/kilo-vscode/src/services/autocomplete/continuedev/core/autocomplete/templating/AutocompleteTemplate.ts` (+6, -260)
- `packages/sdk/js/src/gen/core/serverSentEvents.gen.ts` (+1, -1)

#### Other Changes
- `.changeset/add-alibaba-provider.md` (+0, -5)
- `.changeset/agent-manager-message-fork.md` (+0, -5)
- `.changeset/agent-manager-terminal-tabs.md` (+5, -0)
- `.changeset/alibaba-provider-options.md` (+0, -5)
- `.changeset/cli-suggest-inline.md` (+5, -0)
- `.changeset/cli-suggest-non-blocking.md` (+5, -0)
- `.changeset/custom-provider-delete-sticks.md` (+0, -6)
- `.changeset/fix-worktree-session-routing.md` (+0, -5)
- `.changeset/infinite-compaction-loop-cap.md` (+5, -0)
- `.changeset/jetbrains-session-logging.md` (+5, -0)
- `.changeset/kiloclaw-chat-panel.md` (+0, -5)
- `.changeset/plan-followup-continue-click.md` (+0, -5)
- `.changeset/plan-followup-translations.md` (+0, -5)
- `.changeset/question-custom-answer-duplicate.md` (+0, -5)
- `.changeset/question-dock-explicit-submit.md` (+5, -0)
- `.changeset/queued-messages-stay-at-bottom.md` (+0, -5)
- `.changeset/quiet-review-summary.md` (+0, -5)
- `.changeset/restore-virtual-history.md` (+0, -5)
- `.changeset/scroll-up-while-busy.md` (+0, -5)
- `.changeset/sidebar-message-forks.md` (+0, -5)
- `.changeset/snapshot-diff-freeze.md` (+5, -0)
- `.changeset/suggest-tool-stuck-session.md` (+0, -5)
- `.changeset/update-anthropic-sdk-3071.md` (+0, -6)
- `.changeset/update-bedrock-vertex-providers.md` (+0, -5)
- `.changeset/vscode-subagent-spacing.md` (+0, -5)
- `.gitattributes` (+1, -0)
- `.github/workflows/smoke-test.yml` (+1, -8)
- `.github/workflows/visual-regression.yml` (+17, -24)
- `.github/workflows/watch-opencode-releases.yml` (+69, -0)
- `.kilo/package-lock.json` (+115, -0)
- `.kilocode/package-lock.json` (+115, -0)
- `.oxlintrc.json` (+51, -0)
- `README.md` (+0, -1)
- `bun.lock` (+125, -111)
- `nix/hashes.json` (+4, -4)
- `nix/node_modules.nix` (+1, -0)
- `package.json` (+8, -2)
- `packages/app/package.json` (+2, -2)
- `packages/app/src/addons/serialize.test.ts` (+2, -2)
- `packages/app/src/addons/serialize.ts` (+2, -2)
- `packages/app/src/app.tsx` (+19, -15)
- `packages/app/src/components/dialog-connect-provider.tsx` (+2, -2)
- `packages/app/src/components/dialog-edit-project.tsx` (+1, -1)
- `packages/app/src/components/dialog-fork.tsx` (+1, -1)
- `packages/app/src/components/dialog-select-directory.tsx` (+1, -1)
- `packages/app/src/components/dialog-select-file.tsx` (+4, -4)
- `packages/app/src/components/dialog-select-server.tsx` (+3, -3)
- `packages/app/src/components/file-tree.tsx` (+1, -2)
- `packages/app/src/components/prompt-input.tsx` (+114, -99)
- `packages/app/src/components/prompt-input/build-request-parts.ts` (+1, -1)
- `packages/app/src/components/prompt-input/context-items.tsx` (+1, -1)
- `packages/app/src/components/prompt-input/slash-popover.tsx` (+1, -1)
- `packages/app/src/components/prompt-input/submit.test.ts` (+1, -1)
- `packages/app/src/components/prompt-input/submit.ts` (+3, -3)
- `packages/app/src/components/session-context-usage.tsx` (+1, -1)
- `packages/app/src/components/session/session-context-tab.tsx` (+2, -2)
- `packages/app/src/components/session/session-header.tsx` (+2, -2)
- `packages/app/src/components/session/session-new-view.tsx` (+1, -1)
- `packages/app/src/components/session/session-sortable-tab.tsx` (+1, -1)
- `packages/app/src/components/session/session-sortable-terminal-tab.tsx` (+1, -1)
- `packages/app/src/components/terminal.tsx` (+4, -4)
- `packages/app/src/components/titlebar.tsx` (+41, -34)
- `packages/app/src/context/file.tsx` (+1, -1)
- `packages/app/src/context/global-sdk.tsx` (+1, -0)
- `packages/app/src/context/global-sync.tsx` (+59, -44)
- `packages/app/src/context/global-sync/bootstrap.ts` (+150, -139)
- `packages/app/src/context/global-sync/child-store.ts` (+3, -2)
- `packages/app/src/context/global-sync/event-reducer.ts` (+1, -1)
- `packages/app/src/context/global-sync/queue.ts` (+1, -0)
- `packages/app/src/context/global-sync/types.ts` (+1, -1)
- `packages/app/src/context/layout.tsx` (+3, -3)
- `packages/app/src/context/local.tsx` (+1, -1)
- `packages/app/src/context/notification.tsx` (+2, -2)
- `packages/app/src/context/permission-auto-respond.test.ts` (+1, -1)
- `packages/app/src/context/permission-auto-respond.ts` (+1, -1)
- `packages/app/src/context/prompt.tsx` (+1, -1)
- `packages/app/src/context/sync.tsx` (+2, -2)
- `packages/app/src/context/terminal.tsx` (+2, -2)
- `packages/app/src/env.d.ts` (+1, -0)
- `packages/app/src/i18n/ko.ts` (+0, -4)
- `packages/app/src/pages/directory-layout.tsx` (+1, -1)
- `packages/app/src/pages/home.tsx` (+1, -1)
- `packages/app/src/pages/layout.tsx` (+24, -16)
- `packages/app/src/pages/layout/helpers.ts` (+1, -1)
- `packages/app/src/pages/layout/sidebar-items.tsx` (+1, -1)
- `packages/app/src/pages/layout/sidebar-project.tsx` (+1, -1)
- `packages/app/src/pages/layout/sidebar-workspace.tsx` (+8, -6)
- `packages/app/src/pages/session.tsx` (+11, -13)
- `packages/app/src/pages/session/file-tabs.tsx` (+1, -7)
- `packages/app/src/pages/session/helpers.ts` (+1, -1)
- `packages/app/src/pages/session/message-timeline.tsx` (+2, -2)
- `packages/app/src/pages/session/review-tab.tsx` (+1, -1)
- `packages/app/src/pages/session/use-session-commands.tsx` (+1, -1)
- `packages/app/src/utils/base64.ts` (+1, -1)
- `packages/app/src/utils/persist.ts` (+1, -1)
- `packages/app/src/utils/runtime-adapters.test.ts` (+2, -0)
- `packages/app/src/utils/server.ts` (+4, -1)
- `packages/desktop-electron/electron.vite.config.ts` (+3, -0)
- `packages/desktop-electron/package.json` (+1, -1)
- `packages/desktop-electron/src/main/apps.ts` (+2, -2)
- `packages/desktop-electron/src/main/shell-env.ts` (+1, -1)
- `packages/desktop-electron/src/main/store.ts` (+1, -1)
- `packages/desktop/package.json` (+1, -1)
- `packages/desktop/src/entry.tsx` (+2, -2)
- `packages/desktop/src/index.tsx` (+1, -1)
- `packages/desktop/src/loading.tsx` (+1, -1)
- `packages/desktop/src/menu.ts` (+1, -1)
- `packages/desktop/src/webview-zoom.ts` (+1, -1)
- `packages/extensions/zed/extension.toml` (+11, -11)
- `packages/kilo-docs/AGENTS.md` (+6, -0)
- `packages/kilo-docs/components/TopNav.tsx` (+15, -0)
- `packages/kilo-docs/package.json` (+1, -1)
- `packages/kilo-docs/pages/code-with-ai/agents/auto-model.md` (+1, -1)
- `packages/kilo-docs/pages/code-with-ai/features/task-todo-list.md` (+2, -2)
- `packages/kilo-docs/pages/contributing/architecture/auto-model-tiers.md` (+2, -2)
- `packages/kilo-docs/pages/customize/workflows.md` (+1, -1)
- `packages/kilo-docs/pages/gateway/models-and-providers.md` (+7, -10)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-accordion/default-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-accordion/multiple-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-appicon/all-icons-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-appicon/cursor-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-appicon/vs-code-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-appicon/zed-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-avatar/all-sizes-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-avatar/default-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-avatar/large-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-avatar/normal-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-avatar/small-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-avatar/with-custom-colors-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-avatar/with-image-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-basictool/all-variants-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-basictool/default-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-basictool/default-open-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-basictool/generic-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-basictool/locked-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-basictool/no-children-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-basictool/with-args-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-button/all-variants-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-button/disabled-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-button/ghost-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-button/large-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-button/normal-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-button/primary-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-button/secondary-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-button/small-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-button/with-icon-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-card/all-variants-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-card/error-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-card/info-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-card/normal-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-card/success-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-card/warning-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-checkbox/all-variants-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-checkbox/checked-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-checkbox/disabled-checked-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-checkbox/disabled-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-checkbox/indeterminate-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-checkbox/unchecked-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-checkbox/with-description-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-code/default-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-code/no-line-numbers-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-code/python-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-code/short-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-code/split-overflow-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-code/type-script-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-collapsible/all-variants-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-collapsible/collapsed-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-collapsible/ghost-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-collapsible/normal-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-contextmenu/default-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-contextmenu/with-groups-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-dialog/all-variants-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-dialog/large-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-dialog/no-title-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-dialog/normal-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-dialog/x-large-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-diff/added-file-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-diff/config-change-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-diff/default-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-diff/deleted-file-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-diff/split-view-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-diffchanges/all-variants-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-diffchanges/bars-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-diffchanges/default-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-diffssr/default-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-diffssr/with-split-style-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-dropdownmenu/default-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-dropdownmenu/with-checkbox-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-dropdownmenu/with-groups-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-dropdownmenu/with-sub-menu-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-errordetails/collapsed-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-errordetails/expanded-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-fileicon/all-variants-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-fileicon/folder-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-fileicon/folder-expanded-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-fileicon/java-script-file-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-fileicon/markdown-file-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-fileicon/type-script-file-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-hovercard/default-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-hovercard/with-user-card-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-icon/all-icons-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-icon/default-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-icon/large-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-icon/medium-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-icon/small-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-iconbutton/all-variants-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-iconbutton/ghost-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-iconbutton/large-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-iconbutton/primary-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-iconbutton/secondary-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-iconbutton/small-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-imagepreview/default-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-imagepreview/with-landscape-image-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-imagepreview/with-portrait-image-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-inlineinput/controlled-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-inlineinput/default-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-inlineinput/disabled-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-inlineinput/with-width-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-keybind/combination-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-keybind/default-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-linecomment/anchor-closed-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-linecomment/anchor-open-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-linecomment/comment-closed-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-linecomment/comment-default-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-linecomment/editor-default-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-linecomment/editor-with-value-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-linecomment/interactive-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-list/default-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-list/empty-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-list/with-current-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-list/with-search-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-logo/all-variants-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-logo/full-logo-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-logo/mark-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-logo/splash-mark-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-markdown/code-block-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-markdown/default-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-markdown/lists-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-markdown/short-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-messagenav/all-variants-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-messagenav/compact-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-messagenav/normal-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-messagepart/assistant-message-story-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-messagepart/full-conversation-turn-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-messagepart/tool-hint-errors-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-messagepart/user-message-story-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-messagepart/with-bash-tool-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-messagepart/with-bash-tool-expanded-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-messagepart/with-context-group-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-messagepart/with-error-tool-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-messagepart/with-reasoning-collapsed-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-messagepart/with-reasoning-expanded-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-messagepart/with-running-tool-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-popover/default-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-popover/no-title-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-popover/with-description-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-progress/all-variants-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-progress/custom-range-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-progress/default-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-progress/empty-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-progress/full-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-progress/hidden-label-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-progress/with-label-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-progress/with-value-label-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-progresscircle/all-variants-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-progresscircle/complete-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-progresscircle/empty-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-progresscircle/half-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-progresscircle/large-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-progresscircle/quarter-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-progresscircle/three-quarters-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-providericon/all-icons-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-providericon/anthropic-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-providericon/default-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-providericon/gallery-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-providericon/google-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-providericon/large-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-providericon/small-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-radiogroup/all-variants-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-radiogroup/medium-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-radiogroup/small-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-radiogroup/with-custom-labels-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-resizehandle/horizontal-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-resizehandle/vertical-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-select/default-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-select/disabled-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-select/settings-variant-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-select/with-current-value-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-select/with-group-by-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-sessionreview/default-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-sessionreview/empty-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-sessionreview/single-file-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-sessionreview/split-view-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-sessionturn/default-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-sessionturn/with-steps-expanded-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-sessionturn/working-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-spinner/colored-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-spinner/default-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-spinner/large-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-spinner/small-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-stickyaccordionheader/default-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-stickyaccordionheader/in-scroll-container-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-switch/all-variants-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-switch/disabled-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-switch/disabled-on-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-switch/off-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-switch/on-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-switch/with-description-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-tabs/all-variants-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-tabs/alt-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-tabs/normal-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-tabs/pill-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-tabs/settings-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-tabs/vertical-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-tag/all-variants-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-tag/large-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-tag/normal-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-textfield/all-variants-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-textfield/copyable-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-textfield/copyable-link-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-textfield/disabled-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-textfield/ghost-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-textfield/multiline-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-textfield/normal-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-textfield/with-description-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-textfield/with-error-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-textfield/with-label-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-toast/all-variants-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-toast/default-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-toast/error-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-toast/loading-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-toast/success-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-toast/with-actions-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-toast/with-icon-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-tooltip/default-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-tooltip/force-open-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-tooltip/placement-chromium-linux.png` (+0, -0)
- `packages/{kilo-ui/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-ui/visual-regression}/components-tooltip/with-keybind-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/permission-dock-dropdown.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode}/permission-dock-dropdown/bash-expanded-pending-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/permission-dock-dropdown.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode}/permission-dock-dropdown/bash-rule-approved-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/permission-dock-dropdown.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode}/permission-dock-dropdown/bash-rule-denied-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/permission-dock-dropdown.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode}/permission-dock-dropdown/bash-rules-mixed-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/permission-dock-dropdown.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode}/permission-dock-dropdown/config-preloaded-expanded-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/permission-dock-dropdown.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode}/permission-dock-dropdown/edit-expanded-pending-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/permission-dock-dropdown.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode}/permission-dock-dropdown/external-dir-expanded-pending-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/permission-dock-dropdown.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode}/permission-dock-dropdown/glob-expanded-pending-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/permission-dock-dropdown.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode}/permission-dock-dropdown/glob-rule-approved-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/permission-dock-dropdown.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode}/permission-dock-dropdown/many-rules-expanded-pending-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/permission-dock-dropdown.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode}/permission-dock-dropdown/many-rules-mixed-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/permission-dock-dropdown.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode}/permission-dock-dropdown/subagent-expanded-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/permission-dock-dropdown.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode}/permission-dock-dropdown/websearch-expanded-pending-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/permission-dock-dropdown.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode}/permission-dock-dropdown/write-expanded-pending-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/agentmanager-sections/all-colors-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/agentmanager-sections/collapsed-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/agentmanager-sections/default-color-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/agentmanager-sections/dense-sidebar-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/agentmanager-sections/empty-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/agentmanager-sections/expanded-with-items-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/agentmanager-sections/first-and-last-section-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/agentmanager-sections/long-section-name-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/agentmanager-sections/multiple-sections-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/agentmanager-sections/with-active-worktree-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/agentmanager-sections/with-busy-worktree-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/agentmanager-sections/with-pr-badges-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/agentmanager-sections/with-stale-worktree-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/agentmanager-sections/with-versions-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/agentmanager/diff-panel-with-diffs-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/agentmanager/file-tree-empty-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/agentmanager/file-tree-with-changes-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/agentmanager/full-screen-diff-with-changes-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/agentmanager/pr-badge-approved-checks-failing-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/agentmanager/pr-badge-approved-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/agentmanager/pr-badge-changes-requested-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/agentmanager/pr-badge-checks-failing-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/agentmanager/pr-badge-closed-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/agentmanager/pr-badge-draft-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/agentmanager/pr-badge-merged-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/agentmanager/pr-badge-no-review-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/agentmanager/pr-badge-pending-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/agentmanager/tab-bar-multiple-tabs-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/agentmanager/tab-bar-single-tab-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/agentmanager/tab-bar-with-review-tab-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/agentmanager/worktree-item-active-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/agentmanager/worktree-item-busy-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/agentmanager/worktree-item-default-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/agentmanager/worktree-item-grouped-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/agentmanager/worktree-item-pending-delete-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/agentmanager/worktree-item-stale-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/agentmanager/worktree-item-with-stats-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/chat/chat-view-idle-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/chat/chat-view-with-messages-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/chat/chat-view-with-pending-question-empty-input-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/chat/message-list-subagent-to-queued-user-spacing-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/chat/message-list-tool-to-queued-user-spacing-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/chat/question-dock-many-options-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/chat/question-dock-multi-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/chat/question-dock-single-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/chat/suggest-bar-review-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/chat/task-header-with-todos-all-done-chromium-linux.png` (+0, -0)
- `packages/kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression/chat/task-header-with-todos-chromium-linux.png` (+3, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/chat/welcome-with-switcher-and-notification-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/components-shell/shell-execution-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/composite-webview/bash-with-permission-chromium-linux.png` (+0, -0)
- `packages/kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression/composite-webview/chat-busy-chromium-linux.png` (+3, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/composite-webview/chat-idle-chromium-linux.png` (+0, -0)
- `packages/kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression/composite-webview/diff-summary-collapsed-chromium-linux.png` (+3, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/composite-webview/glob-with-permission-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/composite-webview/mcp-tool-cards-chromium-linux.png` (+0, -0)
- `packages/kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression/composite-webview/mcp-tool-expanded-chromium-linux.png` (+3, -0)
- `packages/kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression/composite-webview/multiple-tool-calls-chromium-linux.png` (+3, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/composite-webview/permission-dock-bash-many-rules-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/composite-webview/permission-dock-config-preloaded-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/composite-webview/permission-dock-edit-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/composite-webview/permission-dock-external-dir-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/composite-webview/permission-dock-heredoc-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/composite-webview/permission-dock-subagent-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/composite-webview/permission-dock-todo-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/composite-webview/permission-dock-websearch-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/composite-webview/permission-dock-write-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/composite-webview/question-above-chatbox-chromium-linux.png` (+0, -0)
- `packages/kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression/composite-webview/question-dismissed-chromium-linux.png` (+3, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/composite-webview/todo-write-completed-chromium-linux.png` (+0, -0)
- `packages/kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression/composite-webview/todo-write-docs-overview-chromium-linux.png` (+3, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/composite-webview/todo-write-with-permission-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/composite-webview/tool-cards-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/history-sessionlist/with-items-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/marketplace/installed-mcp-card-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/marketplace/installed-mode-card-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/marketplace/installed-skill-card-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/marketplace/mcp-tab-empty-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/marketplace/mcp-tab-with-installed-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/marketplace/mcp-tab-with-items-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/marketplace/modes-tab-empty-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/marketplace/modes-tab-with-installed-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/marketplace/modes-tab-with-items-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/marketplace/single-mcp-card-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/marketplace/single-mode-card-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/marketplace/single-skill-card-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/marketplace/skills-tab-empty-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/marketplace/skills-tab-with-installed-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/marketplace/skills-tab-with-items-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/profile/logged-in-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/profile/logged-in-personal-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/profile/not-logged-in-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/prompt-input/default-200-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/prompt-input/default-420-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/prompt-input/with-model-override-200-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/prompt-input/with-model-override-420-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/prompt-input/with-thinking-200-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/prompt-input/with-thinking-420-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/settings/agent-behaviour-agents-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/settings/agent-behaviour-edit-custom-mode-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/settings/agent-behaviour-workflows-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/settings/agent-behaviour-workflows-empty-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/settings/mcp-edit-view-local-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/settings/mcp-edit-view-local-with-env-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/settings/mcp-edit-view-remote-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/settings/mode-edit-export-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/settings/providers-configure-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/settings/settings-panel-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/shared/model-selector-no-providers-chromium-linux.png` (+0, -0)
- `packages/kilo-docs/source-links.md` (+2, -2)
- `packages/kilo-gateway/package.json` (+1, -1)
- `packages/kilo-gateway/src/api/constants.ts` (+1, -1)
- `packages/kilo-gateway/src/server/routes.ts` (+27, -15)
- `packages/kilo-i18n/package.json` (+1, -1)
- `packages/kilo-jetbrains/.run/Run IDE (Backend).run.xml` (+2, -1)
- `packages/kilo-jetbrains/.run/Run IDE (Frontend).run.xml` (+2, -1)
- `packages/kilo-jetbrains/AGENTS.md` (+1, -1)
- `packages/kilo-jetbrains/README.md` (+45, -0)
- `packages/kilo-jetbrains/backend/src/main/kotlin/ai/kilocode/backend/app/KiloBackendAppService.kt` (+2, -3)
- `packages/kilo-jetbrains/backend/src/main/kotlin/ai/kilocode/backend/app/KiloBackendChatManager.kt` (+39, -15)
- `packages/kilo-jetbrains/backend/src/main/kotlin/ai/kilocode/backend/app/KiloBackendConnectionService.kt` (+5, -4)
- `packages/kilo-jetbrains/backend/src/main/kotlin/ai/kilocode/backend/app/KiloBackendSessionManager.kt` (+10, -5)
- `packages/kilo-jetbrains/backend/src/main/kotlin/ai/kilocode/backend/cli/KiloBackendCliManager.kt` (+2, -3)
- `packages/kilo-jetbrains/backend/src/main/kotlin/ai/kilocode/backend/rpc/KiloSessionRpcApiImpl.kt` (+7, -3)
- `packages/kilo-jetbrains/backend/src/main/kotlin/ai/kilocode/backend/util/KiloLog.kt` (+0, -22)
- `packages/kilo-jetbrains/backend/src/main/kotlin/ai/kilocode/backend/workspace/KiloBackendWorkspace.kt` (+1, -1)
- `packages/kilo-jetbrains/backend/src/main/kotlin/ai/kilocode/backend/workspace/KiloBackendWorkspaceManager.kt` (+1, -1)
- `packages/kilo-jetbrains/backend/src/test/kotlin/ai/kilocode/backend/cli/ChatLogSummaryTest.kt` (+177, -0)
- `packages/kilo-jetbrains/backend/src/test/kotlin/ai/kilocode/backend/testing/TestLog.kt` (+5, -2)
- `packages/kilo-jetbrains/build.gradle.kts` (+10, -1)
- `packages/kilo-jetbrains/frontend/src/main/kotlin/ai/kilocode/client/KiloToolWindowFactory.kt` (+2, -2)
- `packages/kilo-jetbrains/frontend/src/main/kotlin/ai/kilocode/client/app/KiloAppService.kt` (+2, -2)
- `packages/kilo-jetbrains/frontend/src/main/kotlin/ai/kilocode/client/app/KiloSessionService.kt` (+24, -9)
- `packages/kilo-jetbrains/frontend/src/main/kotlin/ai/kilocode/client/app/KiloWorkspaceService.kt` (+2, -2)
- `packages/kilo-jetbrains/frontend/src/main/kotlin/ai/kilocode/client/session/SessionController.kt` (+56, -15)
- `packages/kilo-jetbrains/frontend/src/main/kotlin/ai/kilocode/client/session/SessionUi.kt` (+109, -28)
- `packages/kilo-jetbrains/frontend/src/main/kotlin/ai/kilocode/client/session/model/SessionModel.kt` (+139, -0)
- `packages/kilo-jetbrains/frontend/src/main/kotlin/ai/kilocode/client/session/model/SessionModelEvent.kt` (+36, -0)
- `packages/kilo-jetbrains/frontend/src/main/kotlin/ai/kilocode/client/session/model/Turn.kt` (+36, -0)
- `packages/kilo-jetbrains/frontend/src/main/kotlin/ai/kilocode/client/session/ui/MessageListUi.kt` (+4, -1)
- `packages/kilo-jetbrains/frontend/src/main/kotlin/ai/kilocode/client/session/ui/PermissionPanel.kt` (+88, -0)
- `packages/kilo-jetbrains/frontend/src/main/kotlin/ai/kilocode/client/session/ui/ProgressPanel.kt` (+62, -0)
- `packages/kilo-jetbrains/frontend/src/main/kotlin/ai/kilocode/client/session/ui/PromptPanel.kt` (+16, -9)
- `packages/kilo-jetbrains/frontend/src/main/kotlin/ai/kilocode/client/session/ui/QuestionPanel.kt` (+95, -0)
- `packages/kilo-jetbrains/frontend/src/main/kotlin/ai/kilocode/client/session/ui/SessionLayout.kt` (+90, -0)
- `packages/kilo-jetbrains/frontend/src/main/kotlin/ai/kilocode/client/session/ui/SessionPanel.kt` (+233, -0)
- `packages/kilo-jetbrains/frontend/src/main/kotlin/ai/kilocode/client/session/views/CompactionView.kt` (+69, -0)
- `packages/kilo-jetbrains/frontend/src/main/kotlin/ai/kilocode/client/session/views/GenericView.kt` (+39, -0)
- `packages/kilo-jetbrains/frontend/src/main/kotlin/ai/kilocode/client/session/views/MessageView.kt` (+86, -0)
- `packages/kilo-jetbrains/frontend/src/main/kotlin/ai/kilocode/client/session/views/PartView.kt` (+35, -0)
- `packages/kilo-jetbrains/frontend/src/main/kotlin/ai/kilocode/client/session/views/ReasoningView.kt` (+51, -0)
- `packages/kilo-jetbrains/frontend/src/main/kotlin/ai/kilocode/client/session/views/TextView.kt` (+39, -0)
- `packages/kilo-jetbrains/frontend/src/main/kotlin/ai/kilocode/client/session/views/ToolView.kt` (+62, -0)
- `packages/kilo-jetbrains/frontend/src/main/kotlin/ai/kilocode/client/session/views/TurnView.kt` (+46, -0)
- `packages/kilo-jetbrains/frontend/src/main/kotlin/ai/kilocode/client/session/views/ViewFactory.kt` (+26, -0)
- `packages/kilo-jetbrains/frontend/src/main/kotlin/ai/kilocode/client/ui/md/MdView.kt` (+19, -7)
- `packages/kilo-jetbrains/frontend/src/test/kotlin/ai/kilocode/client/session/ChatLoggingFlowTest.kt` (+69, -0)
- `packages/kilo-jetbrains/frontend/src/test/kotlin/ai/kilocode/client/session/MessageListTest.kt` (+7, -2)
- `packages/kilo-jetbrains/frontend/src/test/kotlin/ai/kilocode/client/session/ProgressPanelTest.kt` (+88, -0)
- `packages/kilo-jetbrains/frontend/src/test/kotlin/ai/kilocode/client/session/ProgressTrackingTest.kt` (+160, -0)
- `packages/kilo-jetbrains/frontend/src/test/kotlin/ai/kilocode/client/session/SessionUiUpdateTest.kt` (+204, -0)
- `packages/kilo-jetbrains/frontend/src/test/kotlin/ai/kilocode/client/session/StatusComputationTest.kt` (+1, -0)
- `packages/kilo-jetbrains/frontend/src/test/kotlin/ai/kilocode/client/session/model/SessionModelTest.kt` (+46, -8)
- `packages/kilo-jetbrains/frontend/src/test/kotlin/ai/kilocode/client/session/model/TurnGroupingTest.kt` (+364, -0)
- `packages/kilo-jetbrains/frontend/src/test/kotlin/ai/kilocode/client/session/ui/QuestionPanelTest.kt` (+85, -0)
- `packages/kilo-jetbrains/frontend/src/test/kotlin/ai/kilocode/client/session/ui/SessionLayoutTest.kt` (+129, -0)
- `packages/kilo-jetbrains/frontend/src/test/kotlin/ai/kilocode/client/session/ui/SessionPanelTest.kt` (+237, -0)
- `packages/kilo-jetbrains/frontend/src/test/kotlin/ai/kilocode/client/session/views/TextViewTest.kt` (+93, -0)
- `packages/kilo-jetbrains/frontend/src/test/kotlin/ai/kilocode/client/session/views/ToolViewTest.kt` (+91, -0)
- `packages/kilo-jetbrains/frontend/src/test/kotlin/ai/kilocode/client/session/views/TurnViewTest.kt` (+161, -0)
- `packages/kilo-jetbrains/frontend/src/test/kotlin/ai/kilocode/client/testing/FakeSessionRpcApi.kt` (+4, -1)
- `packages/kilo-jetbrains/frontend/src/test/kotlin/ai/kilocode/client/ui/md/MdViewLoggingTest.kt` (+17, -0)
- `packages/kilo-jetbrains/shared/src/main/kotlin/ai/kilocode/log/ChatLogSummary.kt` (+325, -0)
- `packages/kilo-jetbrains/shared/src/main/kotlin/ai/kilocode/log/KiloLog.kt` (+191, -0)
- `packages/kilo-telemetry/package.json` (+6, -6)
- `packages/kilo-telemetry/src/__tests__/telemetry.test.ts` (+2, -2)
- `packages/kilo-telemetry/src/otel-exporter.ts` (+3, -2)
- `packages/kilo-telemetry/src/tracer.ts` (+2, -2)
- `packages/kilo-ui/package.json` (+2, -2)
- `packages/kilo-ui/playwright.config.ts` (+1, -0)
- `packages/kilo-ui/src/components/context-tool-results.tsx` (+1, -1)
- `packages/kilo-ui/src/components/diff.tsx` (+1, -1)
- `packages/kilo-ui/src/components/message-part.tsx` (+2, -2)
- `packages/kilo-ui/tests/visual-regression.spec.ts` (+1, -1)
- `packages/kilo-vscode/AGENTS.md` (+6, -0)
- `packages/kilo-vscode/CHANGELOG.md` (+44, -0)
- `packages/kilo-vscode/README.md` (+0, -1)
- `packages/kilo-vscode/eslint.config.mjs` (+9, -6)
- `packages/kilo-vscode/package.json` (+17, -1)
- `packages/kilo-vscode/playwright.config.ts` (+1, -0)
- `packages/kilo-vscode/script/publish.ts` (+18, -1)
- `packages/kilo-vscode/src/agent-manager/AgentManagerProvider.ts` (+12, -8)
- `packages/kilo-vscode/src/agent-manager/terminal-manager.ts` (+211, -0)
- `packages/kilo-vscode/src/agent-manager/terminal-routing.ts` (+157, -0)
- `packages/kilo-vscode/src/agent-manager/types.ts` (+52, -0)
- `packages/kilo-vscode/src/extension.ts` (+9, -4)
- `packages/kilo-vscode/src/services/autocomplete/AutocompleteModel.ts` (+0, -30)
- `packages/kilo-vscode/src/services/autocomplete/__tests__/AutocompleteModel.spec.ts` (+0, -16)
- `packages/kilo-vscode/src/services/autocomplete/chat-autocomplete/ChatTextAreaAutocomplete.ts` (+3, -45)
- `packages/kilo-vscode/src/services/autocomplete/chat-autocomplete/__tests__/ChatTextAreaAutocomplete.spec.ts` (+0, -84)
- `packages/kilo-vscode/src/services/autocomplete/classic-auto-complete/AutocompleteInlineCompletionProvider.ts` (+19, -9)
- `packages/kilo-vscode/src/services/autocomplete/classic-auto-complete/__tests__/AutocompleteInlineCompletionProvider.test.ts` (+20, -3)
- `packages/kilo-vscode/src/services/autocomplete/classic-auto-complete/__tests__/uselessSuggestionFilter.test.ts` (+2, -12)
- `packages/kilo-vscode/src/services/autocomplete/classic-auto-complete/uselessSuggestionFilter.ts` (+1, -1)
- `packages/kilo-vscode/src/services/autocomplete/shims/FileIgnoreController.ts` (+12, -1)
- `packages/kilo-vscode/src/services/autocomplete/types.ts` (+1, -0)
- `packages/kilo-vscode/src/services/cli-backend/retry.ts` (+1, -1)
- `packages/kilo-vscode/tests/unit/agent-manager-arch.test.ts` (+10, -1)
- `packages/kilo-vscode/tests/unit/custom-provider-dialog-validate.test.ts` (+146, -0)
- `packages/kilo-vscode/tests/unit/question-dock-contract.test.ts` (+61, -0)
- `packages/kilo-vscode/tests/unit/question-dock-utils.test.ts` (+2, -2)
- `packages/kilo-vscode/tests/visual-regression.spec.mts` (+26, -1)
- `packages/kilo-vscode/tests/visual-regression.spec.ts` (+26, -1)
- `packages/kilo-vscode/tests/visual-regression.spec.ts-snapshots/chat/task-header-with-todos-chromium-linux.png` (+0, -3)
- `packages/kilo-vscode/tests/visual-regression.spec.ts-snapshots/composite-webview/chat-busy-chromium-linux.png` (+0, -3)
- `packages/kilo-vscode/tests/visual-regression.spec.ts-snapshots/composite-webview/diff-summary-collapsed-chromium-linux.png` (+0, -3)
- `packages/kilo-vscode/tests/visual-regression.spec.ts-snapshots/composite-webview/mcp-tool-expanded-chromium-linux.png` (+0, -3)
- `packages/kilo-vscode/tests/visual-regression.spec.ts-snapshots/composite-webview/multiple-tool-calls-chromium-linux.png` (+0, -3)
- `packages/kilo-vscode/tests/visual-regression.spec.ts-snapshots/composite-webview/question-dismissed-chromium-linux.png` (+0, -3)
- `packages/kilo-vscode/webview-ui/agent-manager/AgentManagerApp.tsx` (+306, -241)
- `packages/kilo-vscode/webview-ui/agent-manager/agent-manager.css` (+101, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/ar.ts` (+6, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/br.ts` (+6, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/bs.ts` (+6, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/da.ts` (+6, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/de.ts` (+6, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/en.ts` (+6, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/es.ts` (+6, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/fr.ts` (+6, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/ja.ts` (+6, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/ko.ts` (+6, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/nl.ts` (+6, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/no.ts` (+6, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/pl.ts` (+6, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/ru.ts` (+6, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/th.ts` (+6, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/tr.ts` (+6, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/uk.ts` (+6, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/zh.ts` (+6, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/zht.ts` (+6, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/tab-rendering.tsx` (+214, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/terminal/SortableTerminalTab.tsx` (+94, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/terminal/TerminalTab.tsx` (+342, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/terminal/index.ts` (+25, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/terminal/render.tsx` (+96, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/terminal/state.ts` (+356, -0)
- `packages/kilo-vscode/webview-ui/src/components/chat/QuestionDock.tsx` (+4, -11)
- `packages/kilo-vscode/webview-ui/src/components/chat/question-dock-utils.ts` (+2, -3)
- `packages/kilo-vscode/webview-ui/src/components/settings/CustomProviderDialog.tsx` (+4, -181)
- `packages/kilo-vscode/webview-ui/src/components/settings/CustomProviderValidation.ts` (+200, -0)
- `packages/kilo-vscode/webview-ui/src/stories/StoryProviders.tsx` (+1, -0)
- `packages/kilo-vscode/webview-ui/src/stories/chat.stories.tsx` (+144, -10)
- `packages/kilo-vscode/webview-ui/src/stories/composite.stories.tsx` (+58, -0)
- `packages/kilo-vscode/webview-ui/src/types/messages.ts` (+50, -0)
- `packages/opencode/.gitignore` (+3, -0)
- `packages/opencode/CHANGELOG.md` (+34, -0)
- `packages/opencode/package.json` (+7, -4)
- `packages/opencode/script/build.ts` (+1, -3)
- `packages/opencode/script/collapse-barrel.ts` (+161, -0)
- `packages/opencode/script/postinstall.mjs` (+1, -1)
- `packages/opencode/script/publish.ts` (+1, -1)
- `packages/opencode/script/schema.ts` (+3, -3)
- `packages/opencode/script/time.ts` (+6, -0)
- `packages/opencode/script/trace-imports.ts` (+153, -0)
- `packages/opencode/script/unwrap-namespace.ts` (+305, -0)
- `packages/opencode/specs/effect/http-api.md` (+94, -66)
- `packages/opencode/specs/effect/instance-context.md` (+310, -0)
- `packages/opencode/specs/effect/migration.md` (+4, -0)
- `packages/opencode/specs/effect/namespace-treeshake.md` (+256, -0)
- `packages/opencode/src/account/account.ts` (+454, -0)
- `packages/opencode/src/account/index.ts` (+3, -435)
- `packages/opencode/src/account/repo.ts` (+1, -1)
- `packages/opencode/src/acp/agent.ts` (+12, -13)
- `packages/opencode/src/acp/session.ts` (+1, -1)
- `packages/opencode/src/auth/auth.ts` (+112, -0)
- `packages/opencode/src/auth/index.ts` (+2, -108)
- `packages/opencode/src/cli/cmd/acp.ts` (+1, -1)
- `packages/opencode/src/cli/cmd/agent.ts` (+3, -3)
- `packages/opencode/src/cli/cmd/config.ts` (+1, -1)
- `packages/opencode/src/cli/cmd/db.ts` (+2, -2)
- `packages/opencode/src/cli/cmd/debug/agent.ts` (+3, -2)
- `packages/opencode/src/cli/cmd/debug/config.ts` (+1, -1)
- `packages/opencode/src/cli/cmd/debug/file.ts` (+9, -24)
- `packages/opencode/src/cli/cmd/debug/lsp.ts` (+1, -2)
- `packages/opencode/src/cli/cmd/debug/ripgrep.ts` (+20, -9)
- `packages/opencode/src/cli/cmd/debug/scrap.ts` (+2, -2)
- `packages/opencode/src/cli/cmd/export.ts` (+1, -1)
- `packages/opencode/src/cli/cmd/github.ts` (+9, -8)
- `packages/opencode/src/cli/cmd/import.ts` (+3, -3)
- `packages/opencode/src/cli/cmd/mcp.ts` (+10, -8)
- `packages/opencode/src/cli/cmd/models.ts` (+2, -2)
- `packages/opencode/src/cli/cmd/plug.ts` (+3, -3)
- `packages/opencode/src/cli/cmd/pr.ts` (+1, -1)
- `packages/opencode/src/cli/cmd/providers.ts` (+10, -10)
- `packages/opencode/src/cli/cmd/run.ts` (+4, -14)
- `packages/opencode/src/cli/cmd/session.ts` (+3, -3)
- `packages/opencode/src/cli/cmd/stats.ts` (+2, -2)
- `packages/opencode/src/cli/cmd/tui/app.tsx` (+16, -12)
- `packages/opencode/src/cli/cmd/tui/attach.ts` (+2, -7)
- `packages/opencode/src/cli/cmd/tui/component/dialog-mcp.tsx` (+2, -2)
- `packages/opencode/src/cli/cmd/tui/component/dialog-provider.tsx` (+1, -1)
- `packages/opencode/src/cli/cmd/tui/component/dialog-session-delete-failed.tsx` (+101, -0)
- `packages/opencode/src/cli/cmd/tui/component/dialog-session-list.tsx` (+93, -9)
- `packages/opencode/src/cli/cmd/tui/component/dialog-session-rename.tsx` (+5, -8)
- `packages/opencode/src/cli/cmd/tui/component/dialog-stash.tsx` (+1, -1)
- `packages/opencode/src/cli/cmd/tui/component/dialog-status.tsx` (+2, -2)
- `packages/opencode/src/cli/cmd/tui/component/dialog-theme-list.tsx` (+1, -1)
- `packages/opencode/src/cli/cmd/tui/component/dialog-workspace-create.tsx` (+130, -4)
- `packages/opencode/src/cli/cmd/tui/component/error-component.tsx` (+5, -5)
- `packages/opencode/src/cli/cmd/tui/component/logo.tsx` (+2, -2)
- `packages/opencode/src/cli/cmd/tui/component/prompt/autocomplete.tsx` (+2, -2)
- `packages/opencode/src/cli/cmd/tui/component/prompt/cwd.ts` (+0, -0)
- `packages/opencode/src/cli/cmd/tui/component/prompt/frecency.tsx` (+1, -1)
- `packages/opencode/src/cli/cmd/tui/component/prompt/history.tsx` (+1, -1)
- `packages/opencode/src/cli/cmd/tui/component/prompt/index.tsx` (+64, -48)
- `packages/opencode/src/cli/cmd/tui/component/prompt/stash.tsx` (+1, -1)
- `packages/opencode/src/cli/cmd/tui/component/textarea-keybindings.ts` (+1, -1)
- `packages/opencode/src/cli/cmd/tui/config/cwd.ts` (+5, -0)
- `packages/opencode/src/{ => cli/cmd/tui}/config/tui-migrate.ts` (+6, -11)
- `packages/opencode/src/{ => cli/cmd/tui}/config/tui-schema.ts` (+4, -3)
- `packages/opencode/src/{ => cli/cmd/tui}/config/tui.ts` (+73, -75)
- `packages/opencode/src/cli/cmd/tui/context/keybind.tsx` (+2, -2)
- `packages/opencode/src/cli/cmd/tui/context/kv.tsx` (+2, -2)
- `packages/opencode/src/cli/cmd/tui/context/local.tsx` (+40, -40)
- `packages/opencode/src/cli/cmd/tui/context/sdk.tsx` (+1, -1)
- `packages/opencode/src/cli/cmd/tui/context/sync.tsx` (+24, -18)
- `packages/opencode/src/cli/cmd/tui/context/theme.tsx` (+4, -4)
- `packages/opencode/src/cli/cmd/tui/context/tui-config.tsx` (+1, -1)
- `packages/opencode/src/cli/cmd/tui/event.ts` (+0, -1)
- `packages/opencode/src/cli/cmd/tui/feature-plugins/system/plugins.tsx` (+3, -3)
- `packages/opencode/src/cli/cmd/tui/layer.ts` (+6, -0)
- `packages/opencode/src/cli/cmd/tui/plugin/api.tsx` (+3, -4)
- `packages/opencode/src/cli/cmd/tui/plugin/runtime.ts` (+55, -56)
- `packages/opencode/src/cli/cmd/tui/routes/session/dialog-fork-from-timeline.tsx` (+1, -1)
- `packages/opencode/src/cli/cmd/tui/routes/session/dialog-message.tsx` (+2, -2)
- `packages/opencode/src/cli/cmd/tui/routes/session/dialog-timeline.tsx` (+1, -1)
- `packages/opencode/src/cli/cmd/tui/routes/session/index.tsx` (+57, -71)
- `packages/opencode/src/cli/cmd/tui/routes/session/permission.tsx` (+7, -7)
- `packages/opencode/src/cli/cmd/tui/routes/session/question.tsx` (+3, -3)
- `packages/opencode/src/cli/cmd/tui/routes/session/sidebar.tsx` (+2, -2)
- `packages/opencode/src/cli/cmd/tui/routes/session/subagent-footer.tsx` (+2, -2)
- `packages/opencode/src/cli/cmd/tui/thread.ts` (+9, -12)
- `packages/opencode/src/cli/cmd/tui/ui/dialog-confirm.tsx` (+2, -2)
- `packages/opencode/src/cli/cmd/tui/ui/dialog-export-options.tsx` (+1, -1)
- `packages/opencode/src/cli/cmd/tui/ui/dialog-select.tsx` (+3, -3)
- `packages/opencode/src/cli/cmd/tui/ui/dialog.tsx` (+1, -1)
- `packages/opencode/src/cli/cmd/tui/ui/toast.tsx` (+2, -3)
- `packages/opencode/src/cli/cmd/tui/util/clipboard.ts` (+154, -143)
- `packages/opencode/src/cli/cmd/tui/util/editor.ts` (+24, -26)
- `packages/opencode/src/cli/cmd/tui/util/index.ts` (+5, -0)
- `packages/opencode/src/cli/cmd/tui/util/scroll.ts` (+1, -1)
- `packages/opencode/src/cli/cmd/tui/util/selection.ts` (+9, -11)
- `packages/opencode/src/cli/cmd/tui/util/sound.ts` (+97, -99)
- `packages/opencode/src/cli/cmd/tui/util/terminal.ts` (+114, -116)
- `packages/opencode/src/cli/cmd/tui/util/transcript.ts` (+1, -1)
- `packages/opencode/src/cli/cmd/tui/win32.ts` (+3, -2)
- `packages/opencode/src/cli/cmd/tui/worker.ts` (+3, -3)
- `packages/opencode/src/cli/cmd/uninstall.ts` (+2, -2)
- `packages/opencode/src/cli/cmd/upgrade.ts` (+3, -2)
- `packages/opencode/src/cli/cmd/web.ts` (+1, -1)
- `packages/opencode/src/cli/effect/runtime.ts` (+20, -0)
- `packages/opencode/src/cli/error.ts` (+60, -28)
- `packages/opencode/src/cli/heap.ts` (+1, -1)
- `packages/opencode/src/cli/network.ts` (+5, -4)
- `packages/opencode/src/cli/ui.ts` (+1, -1)
- `packages/opencode/src/cli/upgrade.ts` (+4, -3)
- `packages/opencode/src/command/index.ts` (+171, -174)
- `packages/opencode/src/config/agent.ts` (+209, -0)
- `packages/opencode/src/config/command.ts` (+85, -0)
- `packages/opencode/src/config/config.ts` (+888, -1810)
- `packages/opencode/src/config/entry-name.ts` (+16, -0)
- `packages/opencode/src/config/error.ts` (+21, -0)
- `packages/opencode/src/config/index.ts` (+14, -0)
- `packages/opencode/src/config/keybinds.ts` (+157, -0)
- `packages/opencode/src/config/managed.ts` (+70, -0)
- `packages/opencode/src/config/markdown.ts` (+80, -82)
- `packages/opencode/src/config/mcp.ts` (+70, -0)
- `packages/opencode/src/config/model-id.ts` (+3, -0)
- `packages/opencode/src/config/parse.ts` (+80, -0)
- `packages/opencode/src/config/paths.ts` (+39, -159)
- `packages/opencode/src/config/permission.ts` (+69, -0)
- `packages/opencode/src/config/plugin.ts` (+84, -0)
- `packages/opencode/src/config/provider.ts` (+125, -0)
- `packages/opencode/src/config/skills.ts` (+13, -0)
- `packages/opencode/src/config/variable.ts` (+84, -0)
- `packages/opencode/src/control-plane/schema.ts` (+5, -2)
- `packages/opencode/src/control-plane/types.ts` (+1, -1)
- `packages/opencode/src/control-plane/util.ts` (+37, -0)
- `packages/opencode/src/control-plane/workspace-context.ts` (+8, -4)
- `packages/opencode/src/control-plane/workspace.ts` (+333, -33)
- `packages/opencode/src/effect/app-runtime.ts` (+15, -14)
- `packages/opencode/src/effect/bootstrap-runtime.ts` (+5, -3)
- `packages/opencode/src/effect/bridge.ts` (+48, -0)
- `packages/opencode/src/effect/index.ts` (+5, -0)
- `packages/opencode/src/effect/instance-ref.ts` (+2, -1)
- `packages/opencode/src/effect/instance-state.ts` (+56, -59)
- `packages/opencode/src/effect/logger.ts` (+56, -56)
- `packages/opencode/src/effect/observability.ts` (+68, -56)
- `packages/opencode/src/effect/run-service.ts` (+23, -6)
- `packages/opencode/src/effect/runner.ts` (+184, -186)
- `packages/opencode/src/env/index.ts` (+35, -54)
- `packages/opencode/src/file/ignore.ts` (+1, -2)
- `packages/opencode/src/file/index.ts` (+596, -610)
- `packages/opencode/src/file/ripgrep.ts` (+2, -17)
- `packages/opencode/src/file/time.ts` (+7, -8)
- `packages/opencode/src/file/watcher.ts` (+7, -7)
- `packages/opencode/src/flag/flag.ts` (+12, -15)
- `packages/opencode/src/format/formatter.ts` (+3, -3)
- `packages/opencode/src/format/index.ts` (+167, -168)
- `packages/opencode/src/git/index.ts` (+239, -239)
- `packages/opencode/src/global/index.ts` (+44, -29)
- `packages/opencode/src/ide/index.ts` (+32, -55)
- `packages/opencode/src/index.ts` (+12, -10)
- `packages/opencode/src/installation/index.ts` (+304, -306)
- `packages/opencode/src/installation/meta.ts` (+0, -7)
- `packages/opencode/src/installation/version.ts` (+8, -0)
- `packages/opencode/src/kilo-sessions/kilo-sessions.ts` (+5, -5)
- `packages/opencode/src/kilo-sessions/remote-sender.ts` (+1, -1)
- `packages/opencode/src/kilocode/claw/client.ts` (+1, -1)
- `packages/opencode/src/kilocode/claw/hooks.ts` (+1, -1)
- `packages/opencode/src/kilocode/cli/cmd/tui/app.tsx` (+1, -1)
- `packages/opencode/src/kilocode/commit-message/generate.ts` (+2, -2)
- `packages/opencode/src/kilocode/components/dialog-kilo-auto-method.tsx` (+1, -1)
- `packages/opencode/src/kilocode/config-injector.ts` (+6, -5)
- `packages/opencode/src/kilocode/config-validation.ts` (+5, -3)
- `packages/opencode/src/kilocode/config/config.ts` (+10, -9)
- `packages/opencode/src/kilocode/const.ts` (+2, -2)
- `packages/opencode/src/kilocode/enhance-prompt.ts` (+3, -3)
- `packages/opencode/src/kilocode/help.ts` (+1, -1)
- `packages/opencode/src/kilocode/ignore-migrator.ts` (+8, -7)
- `packages/opencode/src/kilocode/kilo-errors.ts` (+1, -1)
- `packages/opencode/src/kilocode/mcp-migrator.ts` (+10, -9)
- `packages/opencode/src/kilocode/model-match.ts` (+6, -0)
- `packages/opencode/src/kilocode/modes-migrator.ts` (+10, -9)
- `packages/opencode/src/kilocode/paste-summary.ts` (+0, -13)
- `packages/opencode/src/kilocode/paths.ts` (+1, -1)
- `packages/opencode/src/kilocode/plan-followup.ts` (+119, -37)
- `packages/opencode/src/kilocode/project-id.ts` (+1, -1)
- `packages/opencode/src/kilocode/provider/provider.ts` (+13, -7)
- `packages/opencode/src/kilocode/review/review.ts` (+1, -1)
- `packages/opencode/src/kilocode/review/worktree-diff.ts` (+1, -1)
- `packages/opencode/src/kilocode/server/instance.ts` (+1, -1)
- `packages/opencode/src/kilocode/server/routes/commit-message.ts` (+1, -1)
- `packages/opencode/src/kilocode/session-import/service.ts` (+2, -2)
- `packages/opencode/src/kilocode/session/fork.ts` (+1, -1)
- `packages/opencode/src/kilocode/session/index.ts` (+4, -4)
- `packages/opencode/src/kilocode/session/processor.ts` (+1, -1)
- `packages/opencode/src/kilocode/session/prompt.ts` (+38, -1)
- `packages/opencode/src/kilocode/snapshot/diff-full.ts` (+151, -0)
- `packages/opencode/src/kilocode/suggestion/index.ts` (+7, -2)
- `packages/opencode/src/kilocode/suggestion/tool.ts` (+3, -2)
- `packages/opencode/src/kilocode/suggestion/tui/bar.tsx` (+77, -0)
- `packages/opencode/src/kilocode/suggestion/tui/prompt.tsx` (+15, -19)
- `packages/opencode/src/kilocode/suggestion/tui/render.tsx` (+42, -27)
- `packages/opencode/src/kilocode/suggestion/tui/sync.ts` (+1, -1)
- `packages/opencode/src/kilocode/ts-check.ts` (+2, -2)
- `packages/opencode/src/kilocode/ts-client.ts` (+2, -2)
- `packages/opencode/src/kilocode/workflows-migrator.ts` (+6, -5)
- `packages/opencode/src/kilocode/worktree-family.ts` (+2, -2)
- `packages/opencode/src/lsp/client.ts` (+199, -201)
- `packages/opencode/src/lsp/index.ts` (+3, -553)
- `packages/opencode/src/lsp/launch.ts` (+2, -2)
- `packages/opencode/src/lsp/lsp.ts` (+552, -0)
- `packages/opencode/src/lsp/server.ts` (+1689, -1691)
- `packages/opencode/src/mcp/auth.ts` (+1, -1)
- `packages/opencode/src/mcp/index.ts` (+820, -816)
- `packages/opencode/src/mcp/oauth-callback.ts` (+19, -3)
- `packages/opencode/src/mcp/oauth-provider.ts` (+1, -1)
- `packages/opencode/src/node.ts` (+4, -4)
- `packages/opencode/src/npm/index.ts` (+154, -153)
- `packages/opencode/src/patch/index.ts` (+1, -680)
- `packages/opencode/src/patch/patch.ts` (+678, -0)
- `packages/opencode/src/plugin/cloudflare.ts` (+21, -12)
- `packages/opencode/src/plugin/codex.ts` (+6, -7)
- `packages/opencode/src/plugin/github-copilot/copilot.ts` (+16, -7)
- `packages/opencode/src/plugin/index.ts` (+242, -245)
- `packages/opencode/src/plugin/install.ts` (+3, -3)
- `packages/opencode/src/plugin/loader.ts` (+13, -13)
- `packages/opencode/src/plugin/meta.ts` (+3, -3)
- `packages/opencode/src/plugin/shared.ts` (+2, -2)
- `packages/opencode/src/project/bootstrap.ts` (+18, -8)
- `packages/opencode/src/project/index.ts` (+2, -0)
- `packages/opencode/src/project/instance.ts` (+8, -8)
- `packages/opencode/src/project/project.ts` (+421, -426)
- `packages/opencode/src/project/vcs.ts` (+216, -217)
- `packages/opencode/src/provider/auth.ts` (+220, -227)
- `packages/opencode/src/provider/error.ts` (+163, -170)
- `packages/opencode/src/provider/index.ts` (+5, -0)
- `packages/opencode/src/provider/model-cache.ts` (+5, -6)
- `packages/opencode/src/provider/models.ts` (+227, -227)
- `packages/opencode/src/provider/provider.ts` (+1511, -1539)
- `packages/opencode/src/provider/schema.ts` (+1, -1)
- `packages/opencode/src/provider/sdk/copilot/responses/openai-responses-language-model.ts` (+3, -2)
- `packages/opencode/src/provider/transform.ts` (+940, -902)
- `packages/opencode/src/pty/index.ts` (+331, -320)
- `packages/opencode/src/pty/schema.ts` (+2, -1)
- `packages/opencode/src/question/index.ts` (+2, -2)
- `packages/opencode/src/question/schema.ts` (+5, -1)
- `packages/opencode/src/server/control/index.ts` (+1, -1)
- `packages/opencode/src/server/error.ts` (+1, -1)
- `packages/opencode/src/server/fence.ts` (+81, -0)
- `packages/opencode/src/server/instance/config.ts` (+36, -42)
- `packages/opencode/src/server/instance/event.ts` (+1, -2)
- `packages/opencode/src/server/instance/experimental.ts` (+6, -10)
- `packages/opencode/src/server/instance/global.ts` (+4, -3)
- `packages/opencode/src/server/instance/httpapi/index.ts` (+0, -7)
- `packages/opencode/src/server/instance/httpapi/permission.ts` (+72, -0)
- `packages/opencode/src/server/instance/httpapi/provider.ts` (+46, -0)
- `packages/opencode/src/server/instance/httpapi/question.ts` (+78, -36)
- `packages/opencode/src/server/instance/httpapi/server.ts` (+130, -0)
- `packages/opencode/src/server/instance/index.ts` (+18, -2)
- `packages/opencode/src/server/instance/mcp.ts` (+3, -2)
- `packages/opencode/src/server/instance/middleware.ts` (+43, -26)
- `packages/opencode/src/server/instance/permission.ts` (+2, -2)
- `packages/opencode/src/server/instance/project.ts` (+1, -1)
- `packages/opencode/src/server/instance/provider.ts` (+6, -9)
- `packages/opencode/src/server/instance/pty.ts` (+2, -2)
- `packages/opencode/src/server/instance/session.ts` (+34, -24)
- `packages/opencode/src/server/instance/sync.ts` (+119, -0)
- `packages/opencode/src/server/instance/trace.ts` (+33, -0)
- `packages/opencode/src/server/instance/tui.ts` (+1, -1)
- `packages/opencode/src/server/instance/workspace.ts` (+65, -6)
- `packages/opencode/src/server/mdns.ts` (+1, -1)
- `packages/opencode/src/server/middleware.ts` (+5, -5)
- `packages/opencode/src/server/projectors.ts` (+1, -1)
- `packages/opencode/src/server/proxy.ts` (+62, -12)
- `packages/opencode/src/server/server.ts` (+19, -1)
- `packages/opencode/src/session/compaction.ts` (+11, -8)
- `packages/opencode/src/session/index.ts` (+1, -872)
- `packages/opencode/src/session/instruction.ts` (+4, -4)
- `packages/opencode/src/session/llm.ts` (+371, -362)
- `packages/opencode/src/session/message-v2.ts` (+5, -5)
- `packages/opencode/src/session/message.ts` (+1, -1)
- `packages/opencode/src/session/network.ts` (+2, -2)
- `packages/opencode/src/session/overflow.ts` (+3, -3)
- `packages/opencode/src/session/processor.ts` (+6, -4)
- `packages/opencode/src/session/projectors.ts` (+4, -6)
- `packages/opencode/src/session/prompt.ts` (+59, -25)
- `packages/opencode/src/session/prompt/ling.txt` (+129, -0)
- `packages/opencode/src/session/retry.ts` (+7, -2)
- `packages/opencode/src/session/revert.ts` (+3, -4)
- `packages/opencode/src/session/run-state.ts` (+4, -4)
- `packages/opencode/src/session/schema.ts` (+4, -3)
- `packages/opencode/src/session/session.ts` (+868, -0)
- `packages/opencode/src/session/status.ts` (+1, -1)
- `packages/opencode/src/session/summary.ts` (+2, -2)
- `packages/opencode/src/session/system.ts` (+6, -1)
- `packages/opencode/src/session/todo.ts` (+1, -1)
- `packages/opencode/src/share/index.ts` (+2, -0)
- `packages/opencode/src/share/session.ts` (+51, -53)
- `packages/opencode/src/share/share-next.ts` (+305, -307)
- `packages/opencode/src/shell/shell.ts` (+1, -1)
- `packages/opencode/src/skill/discovery.ts` (+106, -106)
- `packages/opencode/src/skill/index.ts` (+251, -250)
- `packages/opencode/src/snapshot/index.ts` (+760, -738)
- `packages/opencode/src/storage/db.ts` (+130, -132)
- `packages/opencode/src/storage/index.ts` (+26, -0)
- `packages/opencode/src/storage/json-migration.ts` (+366, -364)
- `packages/opencode/src/storage/storage.ts` (+296, -298)
- `packages/opencode/src/sync/index.ts` (+223, -209)
- `packages/opencode/src/sync/schema.ts` (+2, -1)
- `packages/opencode/src/temporary.ts` (+33, -0)
- `packages/opencode/src/util/archive.ts` (+11, -13)
- `packages/opencode/src/util/color.ts` (+14, -16)
- `packages/opencode/src/util/defer.ts` (+3, -5)
- `packages/opencode/src/util/effect-zod.ts` (+18, -2)
- `packages/opencode/src/util/error.ts` (+1, -0)
- `packages/opencode/src/util/filesystem.ts` (+195, -197)
- `packages/opencode/src/util/index.ts` (+12, -0)
- `packages/opencode/src/util/keybind.ts` (+84, -86)
- `packages/opencode/src/util/lazy.ts` (+3, -8)
- `packages/opencode/src/util/local-context.ts` (+17, -19)
- `packages/opencode/src/util/locale.ts` (+63, -65)
- `packages/opencode/src/util/lock.ts` (+70, -72)
- `packages/opencode/src/util/log.ts` (+167, -169)
- `packages/opencode/src/util/process.ts` (+140, -142)
- `packages/opencode/src/util/rpc.ts` (+53, -55)
- `packages/opencode/src/util/token.ts` (+3, -5)
- `packages/opencode/src/util/wildcard.ts` (+43, -45)
- `packages/opencode/src/v2/session-entry.ts` (+1, -0)
- `packages/opencode/src/v2/session-event.ts` (+5, -1)
- `packages/opencode/src/v2/session.ts` (+2, -4)
- `packages/opencode/src/worktree/index.ts` (+499, -502)
- `packages/opencode/test/account/repo.test.ts` (+1, -1)
- `packages/opencode/test/account/service.test.ts` (+1, -1)
- `packages/opencode/test/acp/event-subscription.test.ts` (+2, -2)
- `packages/opencode/test/cli/tui/plugin-add.test.ts` (+13, -9)
- `packages/opencode/test/cli/tui/plugin-install.test.ts` (+3, -5)
- `packages/opencode/test/cli/tui/plugin-lifecycle.test.ts` (+9, -10)
- `packages/opencode/test/cli/tui/plugin-loader-entrypoint.test.ts` (+25, -33)
- `packages/opencode/test/cli/tui/plugin-loader-pure.test.ts` (+4, -5)
- `packages/opencode/test/cli/tui/plugin-loader.test.ts` (+82, -13)
- `packages/opencode/test/cli/tui/plugin-toggle.test.ts` (+7, -9)
- `packages/opencode/test/cli/tui/sync-provider.test.tsx` (+2, -14)
- `packages/opencode/test/cli/tui/theme-store.test.ts` (+2, -2)
- `packages/opencode/test/cli/tui/thread.test.ts` (+2, -11)
- `packages/opencode/test/config/agent-color.test.ts` (+2, -2)
- `packages/opencode/test/config/config.test.ts` (+116, -210)
- `packages/opencode/test/config/markdown.test.ts` (+1, -1)
- `packages/opencode/test/config/plugin.test.ts` (+0, -0)
- `packages/opencode/test/config/tui.test.ts` (+160, -337)
- `packages/opencode/test/effect/app-runtime-logger.test.ts` (+32, -1)
- `packages/opencode/test/effect/cross-spawn-spawner.test.ts` (+1, -2)
- `packages/opencode/test/effect/instance-state.test.ts` (+3, -3)
- `packages/opencode/test/effect/runner.test.ts` (+1, -2)
- `packages/opencode/test/fake/provider.ts` (+1, -1)
- `packages/opencode/test/file/index.test.ts` (+4, -4)
- `packages/opencode/test/file/path-traversal.test.ts` (+1, -1)
- `packages/opencode/test/file/ripgrep.test.ts` (+100, -143)
- `packages/opencode/test/file/time.test.ts` (+1, -1)
- `packages/opencode/test/file/watcher.test.ts` (+1, -1)
- `packages/opencode/test/filesystem/filesystem.test.ts` (+1, -1)
- `packages/opencode/test/fixture/db.ts` (+1, -1)
- `packages/opencode/test/fixture/fixture.ts` (+1, -1)
- `packages/opencode/test/fixture/flock-worker.ts` (+1, -1)
- `packages/opencode/test/fixture/lsp/fake-lsp-server.js` (+0, -2)
- `packages/opencode/test/fixture/plug-worker.ts` (+1, -1)
- `packages/opencode/test/fixture/plugin-meta-worker.ts` (+0, -7)
- `packages/opencode/test/fixture/tui-runtime.ts` (+15, -11)
- `packages/opencode/test/keybind.test.ts` (+1, -1)
- `packages/opencode/test/kilocode/bash-permission-metadata.test.ts` (+2, -2)
- `packages/opencode/test/kilocode/bedrock-claude-empty-content.test.ts` (+1, -1)
- `packages/opencode/test/kilocode/commit-message/generate.test.ts` (+4, -4)
- `packages/opencode/test/kilocode/config-gitignore.test.ts` (+60, -30)
- `packages/opencode/test/kilocode/config-resilience.test.ts` (+2, -2)
- `packages/opencode/test/kilocode/config-validation.test.ts` (+2, -2)
- `packages/opencode/test/kilocode/custom-provider-delete.test.ts` (+1, -1)
- `packages/opencode/test/kilocode/diff-full.test.ts` (+226, -0)
- `packages/opencode/test/kilocode/kilo-errors.test.ts` (+1, -1)
- `packages/opencode/test/kilocode/kilo-loader-auth.test.ts` (+3, -3)
- `packages/opencode/test/kilocode/lsp-typescript-lightweight.test.ts` (+3, -3)
- `packages/opencode/test/kilocode/model-cache-org.test.ts` (+1, -1)
- `packages/opencode/test/kilocode/paste-summary.test.ts` (+0, -48)
- `packages/opencode/test/kilocode/plan-exit-detection.test.ts` (+1, -1)
- `packages/opencode/test/kilocode/plan-followup.test.ts` (+273, -2)
- `packages/opencode/test/kilocode/read-directory.test.ts` (+3, -3)
- `packages/opencode/test/kilocode/session-compaction-cap.test.ts` (+407, -0)
- `packages/opencode/test/kilocode/session-fork-remap.test.ts` (+1, -1)
- `packages/opencode/test/kilocode/session-import-service.test.ts` (+1, -1)
- `packages/opencode/test/kilocode/session-list.test.ts` (+2, -2)
- `packages/opencode/test/kilocode/session-processor-empty-tool-calls.test.ts` (+3, -3)
- `packages/opencode/test/kilocode/session-processor-network-offline.test.ts` (+3, -3)
- `packages/opencode/test/kilocode/session-processor-retry-limit.test.ts` (+3, -3)
- `packages/opencode/test/kilocode/session-prompt-queue.test.ts` (+1, -1)
- `packages/opencode/test/kilocode/snapshot-cache.test.ts` (+2, -2)
- `packages/opencode/test/kilocode/snapshot-freeze-repro.test.ts` (+100, -0)
- `packages/opencode/test/kilocode/suggestion/tool.test.ts` (+27, -2)
- `packages/opencode/test/kilocode/transform-opus-4.7.test.ts` (+2, -2)
- `packages/opencode/test/lib/llm-server.ts` (+0, -24)
- `packages/opencode/test/lsp/client.test.ts` (+3, -3)
- `packages/opencode/test/lsp/index.test.ts` (+2, -3)
- `packages/opencode/test/lsp/lifecycle.test.ts` (+1, -1)
- `packages/opencode/test/mcp/headers.test.ts` (+2, -2)
- `packages/opencode/test/mcp/lifecycle.test.ts` (+9, -7)
- `packages/opencode/test/mcp/oauth-auto-connect.test.ts` (+4, -5)
- `packages/opencode/test/mcp/oauth-browser.test.ts` (+5, -5)
- `packages/opencode/test/memory/abort-leak-webfetch.ts` (+1, -1)
- `packages/opencode/test/permission-task.test.ts` (+1, -1)
- `packages/opencode/test/plugin/auth-override.test.ts` (+1, -1)
- `packages/opencode/test/plugin/cloudflare.test.ts` (+68, -0)
- `packages/opencode/test/plugin/install-concurrency.test.ts` (+2, -2)
- `packages/opencode/test/plugin/install.test.ts` (+1, -1)
- `packages/opencode/test/plugin/loader-shared.test.ts` (+6, -6)
- `packages/opencode/test/plugin/meta.test.ts` (+2, -2)
- `packages/opencode/test/plugin/workspace-adaptor.test.ts` (+12, -3)
- `packages/opencode/test/preload.ts` (+3, -3)
- `packages/opencode/test/project/migrate-global.test.ts` (+3, -3)
- `packages/opencode/test/project/project.test.ts` (+4, -4)
- `packages/opencode/test/project/vcs.test.ts` (+1, -1)
- `packages/opencode/test/provider/amazon-bedrock.test.ts` (+24, -20)
- `packages/opencode/test/provider/gitlab-duo.test.ts` (+2, -1)
- `packages/opencode/test/provider/provider.test.ts` (+66, -62)
- `packages/opencode/test/provider/transform.test.ts` (+217, -3)
- `packages/opencode/test/server/experimental-session-list.test.ts` (+10, -8)
- `packages/opencode/test/server/global-session-list.test.ts` (+3, -3)
- `packages/opencode/test/server/project-init-git.test.ts` (+3, -4)
- `packages/opencode/test/server/question-httpapi.test.ts` (+0, -78)
- `packages/opencode/test/server/session-actions.test.ts` (+2, -2)
- `packages/opencode/test/server/session-list.test.ts` (+3, -3)
- `packages/opencode/test/server/session-messages.test.ts` (+2, -2)
- `packages/opencode/test/server/session-select.test.ts` (+2, -2)
- `packages/opencode/test/session/compaction.test.ts` (+6, -25)
- `packages/opencode/test/session/llm.test.ts` (+269, -7)
- `packages/opencode/test/session/message-v2.test.ts` (+1, -1)
- `packages/opencode/test/session/messages-pagination.test.ts` (+6, -6)
- `packages/opencode/test/session/processor-effect.test.ts` (+4, -4)
- `packages/opencode/test/session/prompt-effect.test.ts` (+19, -21)
- `packages/opencode/test/session/prompt.test.ts` (+10, -11)
- `packages/opencode/test/session/retry.test.ts` (+43, -2)
- `packages/opencode/test/session/revert-compact.test.ts` (+2, -2)
- `packages/opencode/test/session/session.test.ts` (+2, -2)
- `packages/opencode/test/session/snapshot-tool-race.test.ts` (+7, -8)
- `packages/opencode/test/session/structured-output-integration.test.ts` (+2, -2)
- `packages/opencode/test/session/structured-output.test.ts` (+0, -10)
- `packages/opencode/test/share/share-next.test.ts` (+4, -5)
- `packages/opencode/test/shell/shell.test.ts` (+1, -1)
- `packages/opencode/test/skill/discovery.test.ts` (+2, -2)
- `packages/opencode/test/snapshot/snapshot.test.ts` (+1, -1)
- `packages/opencode/test/storage/db.test.ts` (+5, -5)
- `packages/opencode/test/storage/json-migration.test.ts` (+1, -1)
- `packages/opencode/test/storage/storage.test.ts` (+2, -2)
- `packages/opencode/test/sync/index.test.ts` (+49, -1)
- `packages/opencode/test/util/effect-zod.test.ts` (+129, -1)
- `packages/opencode/test/util/filesystem.test.ts` (+14, -14)
- `packages/opencode/test/util/glob.test.ts` (+1, -1)
- `packages/opencode/test/util/lock.test.ts` (+1, -1)
- `packages/opencode/test/util/log.test.ts` (+1, -1)
- `packages/opencode/test/util/module.test.ts` (+2, -2)
- `packages/opencode/test/util/process.test.ts` (+1, -1)
- `packages/opencode/test/util/wildcard.test.ts` (+1, -1)
- `packages/opencode/test/workspace/workspace-restore.test.ts` (+280, -0)
- `packages/opencode/tsconfig.json` (+2, -1)
- `packages/plugin/package.json` (+1, -1)
- `packages/plugin/src/example.ts` (+1, -1)
- `packages/plugin/src/tui.ts` (+0, -1)
- `packages/script/package.json` (+1, -1)
- `packages/sdk/js/package.json` (+1, -1)
- `packages/sdk/js/src/v2/data.ts` (+1, -1)
- `packages/sdk/js/src/v2/gen/sdk.gen.ts` (+157, -0)
- `packages/sdk/js/src/v2/gen/types.gen.ts` (+237, -110)
- `packages/sdk/openapi.json` (+2, -2)
- `packages/server/package.json` (+0, -30)
- `packages/server/src/api/index.ts` (+0, -2)
- `packages/server/src/api/question.ts` (+0, -37)
- `packages/server/src/definition/api.ts` (+0, -12)
- `packages/server/src/definition/index.ts` (+0, -2)
- `packages/server/src/definition/question.ts` (+0, -94)
- `packages/server/src/index.ts` (+0, -6)
- `packages/server/src/openapi.ts` (+0, -5)
- `packages/server/src/types.ts` (+0, -5)
- `packages/server/sst-env.d.ts` (+0, -10)
- `packages/server/tsconfig.json` (+0, -15)
- `packages/shared/package.json` (+39, -0)
- `packages/{opencode/src/filesystem/index.ts => shared/src/filesystem.ts}` (+1, -1)
- `packages/shared/src/global.ts` (+42, -0)
- `packages/shared/src/npm.ts` (+249, -0)
- `packages/shared/src/types.d.ts` (+44, -0)
- `packages/{util/src => shared/src/util}/array.ts` (+0, -0)
- `packages/{util/src => shared/src/util}/binary.ts` (+0, -0)
- `packages/shared/src/util/effect-flock.ts` (+278, -0)
- `packages/{util/src => shared/src/util}/encode.ts` (+0, -0)
- `packages/{util/src => shared/src/util}/error.ts` (+6, -0)
- `packages/{opencode => shared}/src/util/flock.ts` (+29, -4)
- `packages/{util/src => shared/src/util}/fn.ts` (+0, -0)
- `packages/{opencode => shared}/src/util/glob.ts` (+0, -0)
- `packages/{opencode => shared}/src/util/hash.ts` (+0, -0)
- `packages/{util/src => shared/src/util}/identifier.ts` (+0, -0)
- `packages/{util/src => shared/src/util}/iife.ts` (+0, -0)
- `packages/{util/src => shared/src/util}/lazy.ts` (+0, -0)
- `packages/{util/src => shared/src/util}/module.ts` (+0, -0)
- `packages/{util/src => shared/src/util}/path.ts` (+4, -4)
- `packages/{util/src => shared/src/util}/retry.ts` (+1, -0)
- `packages/{util/src => shared/src/util}/slug.ts` (+0, -0)
- `packages/shared/test/filesystem/filesystem.test.ts` (+338, -0)
- `packages/shared/test/fixture/effect-flock-worker.ts` (+63, -0)
- `packages/shared/test/fixture/flock-worker.ts` (+72, -0)
- `packages/shared/test/lib/effect.ts` (+53, -0)
- `packages/shared/test/npm.test.ts` (+18, -0)
- `packages/shared/test/util/effect-flock.test.ts` (+389, -0)
- `packages/{opencode => shared}/test/util/flock.test.ts` (+67, -24)
- `packages/shared/tsconfig.json` (+15, -0)
- `packages/storybook/.storybook/mocks/app/context/language.ts` (+1, -0)
- `packages/storybook/package.json` (+1, -1)
- `packages/ui/package.json` (+2, -2)
- `packages/ui/src/components/accordion.css` (+2, -2)
- `packages/ui/src/components/accordion.tsx` (+5, -5)
- `packages/ui/src/components/app-icon.tsx` (+1, -1)
- `packages/ui/src/components/avatar.tsx` (+1, -1)
- `packages/ui/src/components/basic-tool.tsx` (+1, -1)
- `packages/ui/src/components/button.tsx` (+1, -1)
- `packages/ui/src/components/card.tsx` (+4, -4)
- `packages/ui/src/components/collapsible.css` (+1, -1)
- `packages/ui/src/components/collapsible.tsx` (+1, -1)
- `packages/ui/src/components/context-menu.tsx` (+16, -16)
- `packages/ui/src/components/dialog.tsx` (+1, -1)
- `packages/ui/src/components/dock-surface.tsx` (+3, -3)
- `packages/ui/src/components/dropdown-menu.tsx` (+16, -16)
- `packages/ui/src/components/file-icon.tsx` (+1, -1)
- `packages/ui/src/components/file-ssr.tsx` (+2, -2)
- `packages/ui/src/components/file.tsx` (+5, -2)
- `packages/ui/src/components/hover-card.tsx` (+1, -1)
- `packages/ui/src/components/icon-button.tsx` (+1, -1)
- `packages/ui/src/components/icon.tsx` (+1, -1)
- `packages/ui/src/components/keybind.tsx` (+1, -1)
- `packages/ui/src/components/line-comment.tsx` (+1, -1)
- `packages/ui/src/components/list.tsx` (+1, -1)
- `packages/ui/src/components/markdown.css` (+15, -15)
- `packages/ui/src/components/markdown.tsx` (+3, -3)
- `packages/ui/src/components/message-part.css` (+12, -7)
- `packages/ui/src/components/message-part.tsx` (+3, -4)
- `packages/ui/src/components/popover.tsx` (+1, -1)
- `packages/ui/src/components/progress-circle.tsx` (+1, -1)
- `packages/ui/src/components/progress.tsx` (+1, -1)
- `packages/ui/src/components/provider-icon.tsx` (+1, -1)
- `packages/ui/src/components/radio-group.tsx` (+1, -1)
- `packages/ui/src/components/resize-handle.tsx` (+1, -1)
- `packages/ui/src/components/select.tsx` (+3, -3)
- `packages/ui/src/components/session-diff.ts` (+0, -14)
- `packages/ui/src/components/session-review.tsx` (+13, -10)
- `packages/ui/src/components/session-turn.css` (+3, -2)
- `packages/ui/src/components/session-turn.tsx` (+4, -3)
- `packages/ui/src/components/spinner.tsx` (+1, -1)
- `packages/ui/src/components/sticky-accordion-header.tsx` (+1, -1)
- `packages/ui/src/components/tabs.tsx` (+4, -4)
- `packages/ui/src/components/tag.tsx` (+1, -1)
- `packages/ui/src/components/text-field.tsx` (+1, -1)
- `packages/ui/src/components/text-reveal.tsx` (+1, -1)
- `packages/ui/src/components/thinking-heading.stories.tsx` (+1, -1)
- `packages/ui/src/components/timeline-playground.stories.tsx` (+36, -12)
- `packages/ui/src/components/toast.tsx` (+1, -1)
- `packages/ui/src/components/tool-error-card.tsx` (+1, -1)
- `packages/ui/src/components/tool-status-title.tsx` (+1, -1)
- `packages/ui/src/pierre/commented-lines.ts` (+1, -1)
- `packages/ui/src/pierre/worker.ts` (+1, -1)
- `packages/ui/src/styles/base.css` (+1, -1)
- `packages/ui/vite.config.ts` (+2, -2)
- `packages/util/package.json` (+0, -21)
- `packages/util/sst-env.d.ts` (+0, -10)
- `packages/util/tsconfig.json` (+0, -14)
- `patches/stream-chat@9.38.0.patch` (+22, -0)
- `script/duplicate-pr.ts` (+1, -1)
- `script/github/close-issues.ts` (+1, -2)
- `script/publish.ts` (+25, -33)
- `script/stats.ts` (+1, -1)
- `script/upstream/package.json` (+1, -1)
- `sdks/vscode/package.json` (+1, -1)
- `sdks/vscode/src/extension.ts` (+4, -4)
- `session.json` (+0, -0)

### Key Diffs

#### .opencode/tool/github-pr-search.ts
```diff
diff --git a/.opencode/tool/github-pr-search.ts b/.opencode/tool/github-pr-search.ts
index c2fad2402..3e5365892 100644
--- a/.opencode/tool/github-pr-search.ts
+++ b/.opencode/tool/github-pr-search.ts
@@ -8,7 +8,7 @@ async function githubFetch(endpoint: string, options: RequestInit = {}) {
       Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
       Accept: "application/vnd.github+json",
       "Content-Type": "application/json",
-      ...options.headers,
+      ...(options.headers instanceof Headers ? Object.fromEntries(options.headers.entries()) : options.headers),
     },
   })
   if (!response.ok) {
```

#### .opencode/tool/github-triage.ts
```diff
diff --git a/.opencode/tool/github-triage.ts b/.opencode/tool/github-triage.ts
index 1471ec332..2f8635826 100644
--- a/.opencode/tool/github-triage.ts
+++ b/.opencode/tool/github-triage.ts
@@ -28,7 +28,7 @@ async function githubFetch(endpoint: string, options: RequestInit = {}) {
       Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
       Accept: "application/vnd.github+json",
       "Content-Type": "application/json",
-      ...options.headers,
+      ...(options.headers instanceof Headers ? Object.fromEntries(options.headers.entries()) : options.headers),
     },
   })
   if (!response.ok) {
```

#### packages/kilo-vscode/src/services/autocomplete/continuedev/core/autocomplete/postprocessing/index.ts
```diff
diff --git a/packages/kilo-vscode/src/services/autocomplete/continuedev/core/autocomplete/postprocessing/index.ts b/packages/kilo-vscode/src/services/autocomplete/continuedev/core/autocomplete/postprocessing/index.ts
index 0e67bdf79..7f384b09a 100644
--- a/packages/kilo-vscode/src/services/autocomplete/continuedev/core/autocomplete/postprocessing/index.ts
+++ b/packages/kilo-vscode/src/services/autocomplete/continuedev/core/autocomplete/postprocessing/index.ts
@@ -133,34 +133,18 @@ export function postprocessCompletion({
     }
   }
 
-  if (llm.model.includes("qwen3")) {
-    // Qwen3 always starts from special thinking markers, and we don't want them to output these contents
-    // Remove all content from "
-    completion = completion.replace(/<think>.*?<\/think>/s, "")
-    completion = completion.replace(/<\/think>/, "")
-
-    // Remove any number of newline characters at the beginning and end
-    completion = completion.replace(/^\n+|\n+$/g, "")
-  }
-
-  if (llm.model.includes("mercury") || llm.model.includes("granite")) {
+  if (llm.model.includes("mercury")) {
     completion = removePrefixOverlap(completion, prefix)
-  }
 
-  // // If completion starts with multiple whitespaces, but the cursor is at the end of the line
-  // // then it should probably be on a new line
-  if (
-    llm.model.includes("mercury") &&
-    (completion.startsWith("  ") || completion.startsWith("\t")) &&
-    !prefix.endsWith("\n") &&
-    (suffix.startsWith("\n") || suffix.trim().length === 0)
-  ) {
-    completion = "\n" + completion
-  }
-
-  if ((llm.model.includes("gemini") || llm.model.includes("gemma")) && completion.endsWith("<|file_separator|>")) {
-    // "<|file_separator|>" is 18 characters long
-    completion = completion.slice(0, -18)
+    // If completion starts with multiple whitespaces, but the cursor is at the
+    // end of the line then it should probably be on a new line
+    if (
+      (completion.startsWith("  ") || completion.startsWith("\t")) &&
+      !prefix.endsWith("\n") &&
+      (suffix.startsWith("\n") || suffix.trim().length === 0)
+    ) {
+      completion = "\n" + completion
+    }
   }
 
   // If prefix ends with space and so does completion, then remove the space from completion
```

#### packages/kilo-vscode/src/services/autocomplete/continuedev/core/autocomplete/templating/AutocompleteTemplate.ts
```diff
diff --git a/packages/kilo-vscode/src/services/autocomplete/continuedev/core/autocomplete/templating/AutocompleteTemplate.ts b/packages/kilo-vscode/src/services/autocomplete/continuedev/core/autocomplete/templating/AutocompleteTemplate.ts
index 6cff0486d..93c4de15e 100644
--- a/packages/kilo-vscode/src/services/autocomplete/continuedev/core/autocomplete/templating/AutocompleteTemplate.ts
+++ b/packages/kilo-vscode/src/services/autocomplete/continuedev/core/autocomplete/templating/AutocompleteTemplate.ts
@@ -1,8 +1,11 @@
 // Fill in the middle prompts
+//
+// We only expose Codestral and Mercury Edit as autocomplete models — every
+// other FIM template in the upstream continuedev list is unreachable.
 
 import { CompletionOptions } from "../../index.js"
 import { getLastNUriRelativePathParts, getShortestUniqueRelativeUriPaths } from "../../util/uri.js"
-import { AutocompleteCodeSnippet, AutocompleteSnippet, AutocompleteSnippetType } from "../types.js"
+import { AutocompleteSnippet, AutocompleteSnippetType } from "../types.js"
 
 type TemplateRenderer = (
   prefix: string,
@@ -27,55 +30,6 @@ export interface AutocompleteTemplate {
   completionOptions?: Partial<CompletionOptions>
 }
 
-// https://huggingface.co/stabilityai/stable-code-3b
-const stableCodeFimTemplate: AutocompleteTemplate = {
-  template: (prefix: string, suffix: string): string => {
-    return `<fim_prefix>${prefix}<fim_suffix>${suffix}<fim_middle>`
-  },
-  completionOptions: {
-    stop: ["<fim_prefix>", "<fim_suffix>", "<fim_middle>", "<file_sep>", "<|endoftext|>", "</fim_middle>", "</code>"],
-  },
-}
-
-// https://github.com/QwenLM/Qwen2.5-Coder?tab=readme-ov-file#3-file-level-code-completion-fill-in-the-middle
-// This issue asks about the use of <|repo_name|> and <|file_sep|> together with <|fim_prefix|>, <|fim_suffix|> and <|fim_middle|>
-// https://github.com/QwenLM/Qwen2.5-Coder/issues/343
-const qwenCoderFimTemplate: AutocompleteTemplate = {
-  template: (prefix: string, suffix: string): string => {
-    return `<|fim_prefix|>${prefix}<|fim_suffix|>${suffix}<|fim_middle|>`
-  },
-  completionOptions: {
-    stop: [
-      "<|endoftext|>",
-      "<|fim_prefix|>",
-      "<|fim_middle|>",
-      "<|fim_suffix|>",
-      "<|fim_pad|>",
-      "<|repo_name|>",
-      "<|file_sep|>",
-      "<|im_start|>",
-      "<|im_end|>",
-    ],
```

#### packages/opencode/src/agent/agent.ts
```diff
diff --git a/packages/opencode/src/agent/agent.ts b/packages/opencode/src/agent/agent.ts
index bef34fc5c..d906b1853 100644
--- a/packages/opencode/src/agent/agent.ts
+++ b/packages/opencode/src/agent/agent.ts
@@ -1,12 +1,12 @@
-import { Config } from "../config/config"
+import { Config } from "../config"
 import z from "zod"
-import { Provider } from "../provider/provider"
+import { Provider } from "../provider"
 import { ModelID, ProviderID } from "../provider/schema"
 import { generateObject, streamObject, type ModelMessage } from "ai"
 import { Instance } from "../project/instance"
-import { Truncate } from "../tool/truncate"
+import { Truncate } from "../tool"
 import { Auth } from "../auth"
-import { ProviderTransform } from "../provider/transform"
+import { ProviderTransform } from "../provider"
 
 import PROMPT_GENERATE from "./generate.txt"
 import { makeRuntime } from "@/effect/run-service" // kilocode_change
@@ -22,7 +22,7 @@ import path from "path" // kilocode_change
 import { Plugin } from "@/plugin"
 import { Skill } from "../skill"
 import { Effect, Context, Layer } from "effect"
-import { InstanceState } from "@/effect/instance-state"
+import { InstanceState } from "@/effect"
 import * as KiloAgent from "@/kilocode/agent" // kilocode_change
 
 export namespace Agent {
@@ -38,7 +38,7 @@ export namespace Agent {
       topP: z.number().optional(),
       temperature: z.number().optional(),
       color: z.string().optional(),
-      permission: Permission.Ruleset,
+      permission: Permission.Ruleset.zod,
       model: z
         .object({
           modelID: ModelID.zod,
@@ -83,7 +83,7 @@ export namespace Agent {
       const provider = yield* Provider.Service
 
       const state = yield* InstanceState.make<State>(
-        Effect.fn("Agent.state")(function* (ctx) {
+        Effect.fn("Agent.state")(function* (_ctx) {
           const cfg = yield* config.get()
           const skillDirs = yield* skill.dirs()
           // kilocode_change start - include global config dirs so agents can read them without prompting
@@ -392,7 +392,7 @@ export namespace Agent {
                   )),
```


*... and more files (showing first 5)*

## opencode Changes (224548d..a419f1c)

### Commits

- a419f1c - zen: hy3 preview (Frank, 2026-04-23)
- 871789c - sync release versions for v1.14.21 (opencode, 2026-04-23)
- df27baa - refactor: remove redundant pending check from working memo (#23929) (Brendan Allan, 2026-04-23)
- 9730008 - tweak: codex model logic (#23925) (Aiden Cline, 2026-04-23)
- ac26394 - fix(beta): PR resolvers/smoke check should typecheck all pacakges (#23913) (Luke Parker, 2026-04-23)
- 6387b35 - log session sdk errors (#23652) (Luke Parker, 2026-04-23)
- 1cd4c92 - chore: generate (opencode-agent[bot], 2026-04-23)
- e383df4 - feat: support pull diagnostics in the LSP client (C#, Kotlin, etc) (#23771) (Luke Parker, 2026-04-23)
- 58db41b - chore: update nix bun version (#23881) (Caleb Norton, 2026-04-23)
- 5d133f2 - chore: generate (opencode-agent[bot], 2026-04-23)
- e9b1d3b - docs: add MiMo V2.5 to Go pages (#23876) (Jack, 2026-04-23)
- 3a082a0 - fix(project): use git common dir for bare repo project cache (#19054) (Steven T. Cramer, 2026-04-23)
- 504fd1b - chore: generate (opencode-agent[bot], 2026-04-23)
- 574b2c2 - fix(session): improve session compaction (#23870) (Shoubhit Dash, 2026-04-23)
- fa8b7bc - chore: generate (opencode-agent[bot], 2026-04-23)
- 6196b81 - fix(tui): fail fast on invalid session startup (#23837) (Shoubhit Dash, 2026-04-23)
- d884ab7 - fix: consolidate project avatar source logic (#23819) (Brendan Allan, 2026-04-23)
- 71d196d - chore: generate (opencode-agent[bot], 2026-04-23)
- 20756e0 - test: fix cross-spawn stderr race on Windows CI (#23808) (Luke Parker, 2026-04-23)
- 894e638 - chore: generate (opencode-agent[bot], 2026-04-23)
- 8113a43 - fix: preserve BOM in text tool round-trips (#23797) (Luke Parker, 2026-04-23)
- c819804 - chore: update nix node_modules hashes (opencode-agent[bot], 2026-04-23)
- 06066db - fix(app): improve icon override handling in project edit dialog (#23768) (Brendan Allan, 2026-04-23)
- 69b8ea0 - chore: bump Bun to 1.3.13 (#23791) (Luke Parker, 2026-04-23)
- b045558 - chore: generate (opencode-agent[bot], 2026-04-22)
- ed802fd - refactor(core): migrate MessageV2 errors to Schema-backed named errors (#23764) (Kit Langton, 2026-04-21)
- 1593c3e - refactor(core): migrate MessageV2 internal Cursor to Effect Schema (#23763) (Kit Langton, 2026-04-21)
- e895438 - refactor(core): migrate MessageV2 message DTOs (User/Assistant/Part/Info/WithParts) to Effect Schema (#23757) (Kit Langton, 2026-04-21)
- 1a76799 - chore: generate (opencode-agent[bot], 2026-04-22)
- fa62396 - refactor(core): migrate MessageV2 part leaves + ToolPart to Effect Schema (#23756) (Kit Langton, 2026-04-21)
- 628102a - zen: handle alibaba format (Frank, 2026-04-21)
- ad7ae73 - refactor(core): derive all schema.ts leaves' .zod via effect-zod walker (#23754) (Kit Langton, 2026-04-21)
- 8043cfa - fix(desktop): update desktop file and MetaInfo file (#14933) (NN708, 2026-04-22)
- d2181e9 - chore: generate (opencode-agent[bot], 2026-04-21)
- 5e9fb3c - feat: replace csharp-ls with roslyn-language-server (#14463) (Mathews Bryan, 2026-04-21)
- 2da6d86 - refactor(core): derive provider schema .zod via effect-zod walker (#23753) (Kit Langton, 2026-04-21)
- df0c1f6 - refactor(core): migrate MessageV2 tool state schemas to Effect Schema (#23752) (Kit Langton, 2026-04-21)
- d6dea3f - chore(core): clean up after ConfigPermission Effect Schema migration (#23749) (Kit Langton, 2026-04-21)
- 0bcf734 - migrate Snapshot schemas to Effect Schema (#23747) (Kit Langton, 2026-04-21)
- b1c3095 - chore: generate (opencode-agent[bot], 2026-04-21)
- b0f565b - refactor(core): migrate ConfigPermission.Info to Effect Schema canonical (#23740) (Kit Langton, 2026-04-21)
- 2ae64f4 - refactor(core): migrate MessageV2.Format to Effect Schema (#23744) (Kit Langton, 2026-04-21)
- 7933657 - migrate LSP data schemas to Effect Schema (#23745) (Kit Langton, 2026-04-21)
- caaddf0 - zen: ling 2.6 free (Frank, 2026-04-21)
- 1a20703 - feat: add Mistral Small reasoning variant support (issue #19479) (#23735) (Ruben De Smet, 2026-04-21)
- 8751f48 - Update VOUCHED list (github-actions[bot], 2026-04-21)
- 58232d8 - fix: dont show variants for kimi models that dont support them (#23696) (Aiden Cline, 2026-04-21)
- cd6415f - fix(tui): don't check for version upgrades if it's disabled by the user (#20089) (Rahul Iyer, 2026-04-21)
- c9fb8d0 - sync release versions for v1.14.20 (opencode, 2026-04-21)
- 1e1a500 - chore: generate (opencode-agent[bot], 2026-04-21)
- ecc06a3 - refactor(core): make Config.Info canonical Effect Schema (#23716) (Kit Langton, 2026-04-21)
- 3205f12 - chore: update nix node_modules hashes (opencode-agent[bot], 2026-04-21)
- e95474d - fix: revert parts of a824064c4 which caused system theme regression (#23714) (Aiden Cline, 2026-04-21)
- 96a534d - feat(core): bridge GET /config through experimental HttpApi (#23712) (Kit Langton, 2026-04-21)
- 9579429 - test(opencode): consolidate session prompt tests into Effect style (#23710) (Kit Langton, 2026-04-21)
- 2486621 - chore: kill unused tool (#23701) (Aiden Cline, 2026-04-21)
- b5acc22 - fix(core): fix permissions routing when using remote workspace (#23593) (James Long, 2026-04-21)
- 8cc2c81 - fix(app): prevent prompt input animations from rerunning on every render (#23676) (Brendan Allan, 2026-04-21)
- 8d2d12d - chore: generate (opencode-agent[bot], 2026-04-21)
- 811a7e9 - feat(app): allow disabling progress bar in settings (#23674) (Brendan Allan, 2026-04-21)
- febadc5 - fix(ui): correct diff render condition logic (#23670) (Brendan Allan, 2026-04-21)
- 92c0058 - fix(core): use file:// URLs for local dynamic import() on Windows+Node (#23639) (Luke Parker, 2026-04-21)

### Changed Files by Category

#### Tool System (packages/*/src/tool/)
- `packages/opencode/src/tool/apply_patch.ts` (+28, -18)
- `packages/opencode/src/tool/edit.ts` (+29, -16)
- `packages/opencode/src/tool/lsp.ts` (+1, -1)
- `packages/opencode/src/tool/multiedit.ts` (+0, -61)
- `packages/opencode/src/tool/multiedit.txt` (+0, -41)
- `packages/opencode/src/tool/read.ts` (+1, -1)
- `packages/opencode/src/tool/registry.ts` (+3, -3)
- `packages/opencode/src/tool/schema.ts` (+2, -3)
- `packages/opencode/src/tool/write.ts` (+12, -5)
- `packages/opencode/test/tool/apply_patch.test.ts` (+29, -0)
- `packages/opencode/test/tool/edit.test.ts` (+63, -0)
- `packages/opencode/test/tool/write.test.ts` (+48, -0)

#### Agent System (packages/*/src/agent/)
- `packages/opencode/src/agent/prompt/compaction.txt` (+6, -13)
- `packages/opencode/test/agent/agent.test.ts` (+1, -1)

#### Permission System (**/permission/)
- `packages/opencode/src/permission/index.ts` (+12, -2)
- `packages/opencode/src/permission/schema.ts` (+2, -3)
- `packages/opencode/test/permission/next.test.ts` (+63, -3)

#### Event Bus (**/bus/, **/event/)
(no changes)

#### Core (**/core/)
- `packages/console/core/package.json` (+1, -1)

#### Other Changes
- `.github/VOUCHED.td` (+1, -0)
- `bun.lock` (+33, -33)
- `flake.lock` (+3, -3)
- `nix/hashes.json` (+4, -4)
- `package.json` (+2, -2)
- `packages/app/package.json` (+1, -1)
- `packages/app/src/components/dialog-edit-project.tsx` (+31, -21)
- `packages/app/src/components/prompt-input.tsx` (+15, -4)
- `packages/app/src/components/settings-general.tsx` (+12, -0)
- `packages/app/src/context/global-sync.tsx` (+13, -0)
- `packages/app/src/context/layout.tsx` (+1, -1)
- `packages/app/src/context/settings.tsx` (+9, -0)
- `packages/app/src/i18n/ar.ts` (+2, -0)
- `packages/app/src/i18n/br.ts` (+3, -0)
- `packages/app/src/i18n/bs.ts` (+3, -0)
- `packages/app/src/i18n/da.ts` (+3, -0)
- `packages/app/src/i18n/de.ts` (+3, -0)
- `packages/app/src/i18n/en.ts` (+3, -0)
- `packages/app/src/i18n/es.ts` (+3, -0)
- `packages/app/src/i18n/fr.ts` (+3, -0)
- `packages/app/src/i18n/ja.ts` (+3, -0)
- `packages/app/src/i18n/ko.ts` (+3, -0)
- `packages/app/src/i18n/no.ts` (+3, -0)
- `packages/app/src/i18n/pl.ts` (+3, -0)
- `packages/app/src/i18n/ru.ts` (+3, -0)
- `packages/app/src/i18n/th.ts` (+3, -0)
- `packages/app/src/i18n/tr.ts` (+4, -0)
- `packages/app/src/i18n/zh.ts` (+2, -0)
- `packages/app/src/i18n/zht.ts` (+2, -0)
- `packages/app/src/pages/layout/sidebar-items.tsx` (+9, -5)
- `packages/app/src/pages/session/message-timeline.tsx` (+2, -2)
- `packages/console/app/package.json` (+1, -1)
- `packages/console/app/src/i18n/ar.ts` (+4, -4)
- `packages/console/app/src/i18n/br.ts` (+4, -4)
- `packages/console/app/src/i18n/da.ts` (+4, -4)
- `packages/console/app/src/i18n/de.ts` (+4, -4)
- `packages/console/app/src/i18n/en.ts` (+4, -4)
- `packages/console/app/src/i18n/es.ts` (+4, -4)
- `packages/console/app/src/i18n/fr.ts` (+4, -4)
- `packages/console/app/src/i18n/it.ts` (+4, -4)
- `packages/console/app/src/i18n/ja.ts` (+4, -4)
- `packages/console/app/src/i18n/ko.ts` (+4, -4)
- `packages/console/app/src/i18n/no.ts` (+4, -4)
- `packages/console/app/src/i18n/pl.ts` (+4, -4)
- `packages/console/app/src/i18n/ru.ts` (+4, -4)
- `packages/console/app/src/i18n/th.ts` (+4, -4)
- `packages/console/app/src/i18n/tr.ts` (+4, -4)
- `packages/console/app/src/i18n/zh.ts` (+4, -4)
- `packages/console/app/src/i18n/zht.ts` (+4, -4)
- `packages/console/app/src/routes/go/index.tsx` (+3, -1)
- `packages/console/app/src/routes/workspace/[id]/go/lite-section.tsx` (+4, -2)
- `packages/console/app/src/routes/zen/util/provider/anthropic.ts` (+4, -2)
- `packages/console/function/package.json` (+1, -1)
- `packages/console/mail/package.json` (+1, -1)
- `packages/containers/bun-node/Dockerfile` (+1, -1)
- `packages/desktop-electron/package.json` (+1, -1)
- `packages/desktop/package.json` (+1, -1)
- `packages/desktop/src-tauri/release/appstream.metainfo.xml` (+4, -1)
- `packages/desktop/src-tauri/tauri.conf.json` (+1, -0)
- `packages/enterprise/package.json` (+1, -1)
- `packages/extensions/zed/extension.toml` (+6, -6)
- `packages/function/package.json` (+1, -1)
- `packages/opencode/package.json` (+3, -3)
- `packages/opencode/script/schema.ts` (+1, -1)
- `packages/opencode/specs/effect/http-api.md` (+7, -9)
- `packages/opencode/specs/effect/instance-context.md` (+0, -1)
- `packages/opencode/specs/effect/schema.md` (+85, -24)
- `packages/opencode/specs/effect/tools.md` (+0, -2)
- `packages/opencode/src/cli/cmd/debug/lsp.ts` (+1, -2)
- `packages/opencode/src/cli/cmd/github.ts` (+4, -2)
- `packages/opencode/src/cli/cmd/import.ts` (+2, -2)
- `packages/opencode/src/cli/cmd/tui/app.tsx` (+7, -1)
- `packages/opencode/src/cli/cmd/tui/attach.ts` (+16, -0)
- `packages/opencode/src/cli/cmd/tui/routes/session/index.tsx` (+34, -21)
- `packages/opencode/src/cli/cmd/tui/routes/session/permission.tsx` (+6, -0)
- `packages/opencode/src/cli/cmd/tui/thread.ts` (+14, -0)
- `packages/opencode/src/cli/cmd/tui/util/terminal.ts` (+39, -0)
- `packages/opencode/src/cli/cmd/tui/validate-session.ts` (+24, -0)
- `packages/opencode/src/cli/upgrade.ts` (+1, -1)
- `packages/opencode/src/config/agent.ts` (+5, -10)
- `packages/opencode/src/config/config.ts` (+24, -16)
- `packages/opencode/src/config/mcp.ts` (+15, -12)
- `packages/opencode/src/config/permission.ts` (+38, -35)
- `packages/opencode/src/config/provider.ts` (+5, -4)
- `packages/opencode/src/config/server.ts` (+6, -4)
- `packages/opencode/src/control-plane/schema.ts` (+2, -3)
- `packages/opencode/src/format/index.ts` (+11, -6)
- `packages/opencode/src/lsp/client.ts` (+514, -69)
- `packages/opencode/src/lsp/lsp.ts` (+60, -59)
- `packages/opencode/src/lsp/server.ts` (+9, -9)
- `packages/opencode/src/npm/index.ts` (+9, -6)
- `packages/opencode/src/patch/index.ts` (+11, -7)
- `packages/opencode/src/plugin/codex.ts` (+2, -0)
- `packages/opencode/src/project/project.ts` (+6, -6)
- `packages/opencode/src/project/schema.ts` (+2, -2)
- `packages/opencode/src/provider/provider.ts` (+5, -1)
- `packages/opencode/src/provider/schema.ts` (+4, -4)
- `packages/opencode/src/provider/transform.ts` (+11, -5)
- `packages/opencode/src/pty/schema.ts` (+2, -3)
- `packages/opencode/src/question/schema.ts` (+2, -3)
- `packages/opencode/src/server/routes/global.ts` (+3, -3)
- `packages/opencode/src/server/routes/instance/config.ts` (+3, -3)
- `packages/opencode/src/server/routes/instance/file.ts` (+1, -1)
- `packages/opencode/src/server/routes/instance/httpapi/config.ts` (+19, -3)
- `packages/opencode/src/server/routes/instance/index.ts` (+2, -1)
- `packages/opencode/src/server/routes/instance/session.ts` (+17, -13)
- `packages/opencode/src/session/compaction.ts` (+151, -47)
- `packages/opencode/src/session/message-v2.ts` (+524, -396)
- `packages/opencode/src/session/prompt.ts` (+29, -49)
- `packages/opencode/src/session/schema.ts` (+4, -5)
- `packages/opencode/src/session/session.ts` (+3, -3)
- `packages/opencode/src/snapshot/index.ts` (+19, -19)
- `packages/opencode/src/sync/schema.ts` (+2, -3)
- `packages/opencode/src/util/bom.ts` (+31, -0)
- `packages/opencode/src/util/effect-zod.ts` (+1, -40)
- `packages/opencode/src/util/error.ts` (+4, -0)
- `packages/opencode/src/util/named-schema-error.ts` (+54, -0)
- `packages/opencode/test/config/config.test.ts` (+21, -38)
- `packages/opencode/test/effect/cross-spawn-spawner.test.ts` (+3, -1)
- `packages/opencode/test/fixture/lsp/fake-lsp-server.js` (+197, -23)
- `packages/opencode/test/format/format.test.ts` (+31, -3)
- `packages/opencode/test/lsp/client.test.ts` (+394, -10)
- `packages/opencode/test/project/project.test.ts` (+84, -0)
- `packages/opencode/test/provider/transform.test.ts` (+34, -1)
- `packages/opencode/test/session/compaction.test.ts` (+262, -21)
- `packages/opencode/test/session/message-v2.test.ts` (+70, -0)
- `packages/opencode/test/session/messages-pagination.test.ts` (+64, -0)
- `packages/opencode/test/session/prompt-effect.test.ts` (+0, -1522)
- `packages/opencode/test/session/prompt.test.ts` (+1797, -501)
- `packages/opencode/test/session/structured-output.test.ts` (+10, -10)
- `packages/opencode/test/util/effect-zod.test.ts` (+1, -116)
- `packages/plugin/package.json` (+5, -5)
- `packages/sdk/js/package.json` (+1, -1)
- `packages/sdk/js/src/v2/gen/types.gen.ts` (+2, -3)
- `packages/sdk/openapi.json` (+3, -9)
- `packages/shared/package.json` (+1, -1)
- `packages/slack/package.json` (+1, -1)
- `packages/ui/package.json` (+1, -1)
- `packages/ui/src/components/session-review.tsx` (+1, -1)
- `packages/ui/src/components/timeline-playground.stories.tsx` (+1, -1)
- `packages/web/package.json` (+1, -1)
- `packages/web/src/content/docs/ar/go.mdx` (+32, -24)
- `packages/web/src/content/docs/ar/permissions.mdx` (+1, -1)
- `packages/web/src/content/docs/ar/tools.mdx` (+2, -2)
- `packages/web/src/content/docs/ar/zen.mdx` (+12, -4)
- `packages/web/src/content/docs/bs/go.mdx` (+32, -24)
- `packages/web/src/content/docs/bs/permissions.mdx` (+1, -1)
- `packages/web/src/content/docs/bs/tools.mdx` (+2, -2)
- `packages/web/src/content/docs/bs/zen.mdx` (+13, -5)
- `packages/web/src/content/docs/da/go.mdx` (+32, -24)
- `packages/web/src/content/docs/da/permissions.mdx` (+1, -1)
- `packages/web/src/content/docs/da/tools.mdx` (+2, -2)
- `packages/web/src/content/docs/da/zen.mdx` (+13, -5)
- `packages/web/src/content/docs/de/go.mdx` (+32, -24)
- `packages/web/src/content/docs/de/permissions.mdx` (+1, -1)
- `packages/web/src/content/docs/de/tools.mdx` (+2, -2)
- `packages/web/src/content/docs/de/zen.mdx` (+12, -4)
- `packages/web/src/content/docs/es/go.mdx` (+32, -24)
- `packages/web/src/content/docs/es/permissions.mdx` (+1, -1)
- `packages/web/src/content/docs/es/tools.mdx` (+2, -2)
- `packages/web/src/content/docs/es/zen.mdx` (+13, -5)
- `packages/web/src/content/docs/fr/go.mdx` (+32, -24)
- `packages/web/src/content/docs/fr/permissions.mdx` (+1, -1)
- `packages/web/src/content/docs/fr/tools.mdx` (+2, -2)
- `packages/web/src/content/docs/fr/zen.mdx` (+12, -4)
- `packages/web/src/content/docs/go.mdx` (+32, -24)
- `packages/web/src/content/docs/it/go.mdx` (+32, -24)
- `packages/web/src/content/docs/it/permissions.mdx` (+1, -1)
- `packages/web/src/content/docs/it/tools.mdx` (+2, -2)
- `packages/web/src/content/docs/it/zen.mdx` (+13, -5)
- `packages/web/src/content/docs/ja/go.mdx` (+32, -24)
- `packages/web/src/content/docs/ja/permissions.mdx` (+1, -1)
- `packages/web/src/content/docs/ja/tools.mdx` (+2, -2)
- `packages/web/src/content/docs/ja/zen.mdx` (+12, -4)
- `packages/web/src/content/docs/ko/go.mdx` (+32, -24)
- `packages/web/src/content/docs/ko/permissions.mdx` (+1, -1)
- `packages/web/src/content/docs/ko/tools.mdx` (+2, -2)
- `packages/web/src/content/docs/ko/zen.mdx` (+12, -4)
- `packages/web/src/content/docs/nb/go.mdx` (+32, -24)
- `packages/web/src/content/docs/nb/permissions.mdx` (+1, -1)
- `packages/web/src/content/docs/nb/tools.mdx` (+2, -2)
- `packages/web/src/content/docs/nb/zen.mdx` (+13, -5)
- `packages/web/src/content/docs/permissions.mdx` (+1, -1)
- `packages/web/src/content/docs/pl/go.mdx` (+32, -24)
- `packages/web/src/content/docs/pl/permissions.mdx` (+1, -1)
- `packages/web/src/content/docs/pl/tools.mdx` (+2, -2)
- `packages/web/src/content/docs/pl/zen.mdx` (+13, -5)
- `packages/web/src/content/docs/pt-br/go.mdx` (+32, -24)
- `packages/web/src/content/docs/pt-br/permissions.mdx` (+1, -1)
- `packages/web/src/content/docs/pt-br/tools.mdx` (+2, -2)
- `packages/web/src/content/docs/pt-br/zen.mdx` (+12, -4)
- `packages/web/src/content/docs/ru/go.mdx` (+32, -24)
- `packages/web/src/content/docs/ru/permissions.mdx` (+1, -1)
- `packages/web/src/content/docs/ru/tools.mdx` (+2, -2)
- `packages/web/src/content/docs/ru/zen.mdx` (+13, -5)
- `packages/web/src/content/docs/th/go.mdx` (+32, -24)
- `packages/web/src/content/docs/th/permissions.mdx` (+1, -1)
- `packages/web/src/content/docs/th/tools.mdx` (+2, -2)
- `packages/web/src/content/docs/th/zen.mdx` (+12, -4)
- `packages/web/src/content/docs/tools.mdx` (+2, -2)
- `packages/web/src/content/docs/tr/go.mdx` (+32, -24)
- `packages/web/src/content/docs/tr/permissions.mdx` (+1, -1)
- `packages/web/src/content/docs/tr/tools.mdx` (+2, -2)
- `packages/web/src/content/docs/tr/zen.mdx` (+12, -4)
- `packages/web/src/content/docs/zen.mdx` (+13, -5)
- `packages/web/src/content/docs/zh-cn/go.mdx` (+32, -24)
- `packages/web/src/content/docs/zh-cn/permissions.mdx` (+1, -1)
- `packages/web/src/content/docs/zh-cn/tools.mdx` (+2, -2)
- `packages/web/src/content/docs/zh-cn/zen.mdx` (+12, -4)
- `packages/web/src/content/docs/zh-tw/go.mdx` (+32, -24)
- `packages/web/src/content/docs/zh-tw/permissions.mdx` (+1, -1)
- `packages/web/src/content/docs/zh-tw/tools.mdx` (+2, -2)
- `packages/web/src/content/docs/zh-tw/zen.mdx` (+12, -4)
- `script/beta.ts` (+3, -3)
- `sdks/vscode/package.json` (+1, -1)

### Key Diffs

#### packages/console/core/package.json
```diff
diff --git a/packages/console/core/package.json b/packages/console/core/package.json
index 3605cfb..f79ef3e 100644
--- a/packages/console/core/package.json
+++ b/packages/console/core/package.json
@@ -1,7 +1,7 @@
 {
   "$schema": "https://json.schemastore.org/package.json",
   "name": "@opencode-ai/console-core",
-  "version": "1.14.19",
+  "version": "1.14.21",
   "private": true,
   "type": "module",
   "license": "MIT",
```

#### packages/opencode/src/agent/prompt/compaction.txt
```diff
diff --git a/packages/opencode/src/agent/prompt/compaction.txt b/packages/opencode/src/agent/prompt/compaction.txt
index c5831bb..c7cb838 100644
--- a/packages/opencode/src/agent/prompt/compaction.txt
+++ b/packages/opencode/src/agent/prompt/compaction.txt
@@ -1,16 +1,9 @@
-You are a helpful AI assistant tasked with summarizing conversations.
+You are an anchored context summarization assistant for coding sessions.
 
-When asked to summarize, provide a detailed but concise summary of the older conversation history.
-The most recent turns may be preserved verbatim outside your summary, so focus on information that would still be needed to continue the work with that recent context available.
-Focus on information that would be helpful for continuing the conversation, including:
-- What was done
-- What is currently being worked on
-- Which files are being modified
-- What needs to be done next
-- Key user requests, constraints, or preferences that should persist
-- Important technical decisions and why they were made
+Summarize only the conversation history you are given. The newest turns may be kept verbatim outside your summary, so focus on the older context that still matters for continuing the work.
 
-Your summary should be comprehensive enough to provide context but concise enough to be quickly understood.
+If the prompt includes a <previous-summary> block, treat it as the current anchored summary. Update it with the new history by preserving still-true details, removing stale details, and merging in new facts.
 
-Do not respond to any questions in the conversation, only output the summary.
-Respond in the same language the user used in the conversation.
+Always follow the exact output structure requested by the user prompt. Keep every section, preserve exact file paths and identifiers when known, and prefer terse bullets over paragraphs.
+
+Do not answer the conversation itself. Do not mention that you are summarizing, compacting, or merging context. Respond in the same language as the conversation.
```

#### packages/opencode/src/permission/index.ts
```diff
diff --git a/packages/opencode/src/permission/index.ts b/packages/opencode/src/permission/index.ts
index b9a2211..6943b3d 100644
--- a/packages/opencode/src/permission/index.ts
+++ b/packages/opencode/src/permission/index.ts
@@ -290,8 +290,18 @@ function expand(pattern: string): string {
 }
 
 export function fromConfig(permission: ConfigPermission.Info) {
+  // Sort top-level keys so wildcard permissions (`*`, `mcp_*`) come before
+  // specific ones. Combined with `findLast` in evaluate(), this gives the
+  // intuitive semantic "specific tool rules override the `*` fallback"
+  // regardless of the user's JSON key order. Sub-pattern order inside a
+  // single permission key is preserved — only top-level keys are sorted.
+  const entries = Object.entries(permission).sort(([a], [b]) => {
+    const aWild = a.includes("*")
+    const bWild = b.includes("*")
+    return aWild === bWild ? 0 : aWild ? -1 : 1
+  })
   const ruleset: Ruleset = []
-  for (const [key, value] of Object.entries(permission)) {
+  for (const [key, value] of entries) {
     if (typeof value === "string") {
       ruleset.push({ permission: key, action: value, pattern: "*" })
       continue
@@ -307,7 +317,7 @@ export function merge(...rulesets: Ruleset[]): Ruleset {
   return rulesets.flat()
 }
 
-const EDIT_TOOLS = ["edit", "write", "apply_patch", "multiedit"]
+const EDIT_TOOLS = ["edit", "write", "apply_patch"]
 
 export function disabled(tools: string[], ruleset: Ruleset): Set<string> {
   const result = new Set<string>()
```

#### packages/opencode/src/permission/schema.ts
```diff
diff --git a/packages/opencode/src/permission/schema.ts b/packages/opencode/src/permission/schema.ts
index 6ac9389..4eddc6a 100644
--- a/packages/opencode/src/permission/schema.ts
+++ b/packages/opencode/src/permission/schema.ts
@@ -1,8 +1,7 @@
 import { Schema } from "effect"
-import z from "zod"
 
 import { Identifier } from "@/id/id"
-import { ZodOverride } from "@/util/effect-zod"
+import { zod, ZodOverride } from "@/util/effect-zod"
 import { Newtype } from "@/util/schema"
 
 export class PermissionID extends Newtype<PermissionID>()(
@@ -13,5 +12,5 @@ export class PermissionID extends Newtype<PermissionID>()(
     return this.make(Identifier.ascending("permission", id))
   }
 
-  static readonly zod = Identifier.schema("permission") as unknown as z.ZodType<PermissionID>
+  static readonly zod = zod(this)
 }
```

#### packages/opencode/src/tool/apply_patch.ts
```diff
diff --git a/packages/opencode/src/tool/apply_patch.ts b/packages/opencode/src/tool/apply_patch.ts
index 7da7dd2..33112c4 100644
--- a/packages/opencode/src/tool/apply_patch.ts
+++ b/packages/opencode/src/tool/apply_patch.ts
@@ -14,6 +14,7 @@ import { AppFileSystem } from "@opencode-ai/shared/filesystem"
 import DESCRIPTION from "./apply_patch.txt"
 import { File } from "../file"
 import { Format } from "../format"
+import * as Bom from "@/util/bom"
 
 const PatchParams = z.object({
   patchText: z.string().describe("The full patch text that describes all changes to be made"),
@@ -59,6 +60,7 @@ export const ApplyPatchTool = Tool.define(
         diff: string
         additions: number
         deletions: number
+        bom: boolean
       }> = []
 
       let totalDiff = ""
@@ -72,11 +74,12 @@ export const ApplyPatchTool = Tool.define(
             const oldContent = ""
             const newContent =
               hunk.contents.length === 0 || hunk.contents.endsWith("\n") ? hunk.contents : `${hunk.contents}\n`
-            const diff = trimDiff(createTwoFilesPatch(filePath, filePath, oldContent, newContent))
+            const next = Bom.split(newContent)
+            const diff = trimDiff(createTwoFilesPatch(filePath, filePath, oldContent, next.text))
 
             let additions = 0
             let deletions = 0
-            for (const change of diffLines(oldContent, newContent)) {
+            for (const change of diffLines(oldContent, next.text)) {
               if (change.added) additions += change.count || 0
               if (change.removed) deletions += change.count || 0
             }
@@ -84,11 +87,12 @@ export const ApplyPatchTool = Tool.define(
             fileChanges.push({
               filePath,
               oldContent,
-              newContent,
+              newContent: next.text,
               type: "add",
               diff,
               additions,
               deletions,
+              bom: next.bom,
             })
 
             totalDiff += diff + "\n"
@@ -104,13 +108,16 @@ export const ApplyPatchTool = Tool.define(
```


*... and more files (showing first 5)*

## Recommendations

Based on the changes, the following files in Alexi should be reviewed:

- `src/agent/index.ts` - incorporate new agent patterns from packages/opencode/src/agent/agent.ts
- `src/agent/index.ts` - incorporate new agent patterns from packages/opencode/src/kilocode/agent/index.ts
- `src/agent/index.ts` - incorporate new agent patterns from packages/opencode/test/agent/agent.test.ts
- `src/agent/index.ts` - incorporate patterns from opencode packages/opencode/src/agent/prompt/compaction.txt
- `src/agent/index.ts` - incorporate patterns from opencode packages/opencode/test/agent/agent.test.ts
- `src/core/` - review core changes from packages/kilo-vscode/src/services/autocomplete/continuedev/core/autocomplete/postprocessing/index.ts
- `src/core/` - review core changes from packages/kilo-vscode/src/services/autocomplete/continuedev/core/autocomplete/templating/AutocompleteTemplate.ts
- `src/core/` - review core changes from packages/sdk/js/src/gen/core/serverSentEvents.gen.ts
- `src/permission/` - review permission changes from packages/opencode/src/kilocode/permission/config-paths.ts
- `src/permission/` - review permission changes from packages/opencode/src/kilocode/permission/routes.ts
- `src/permission/` - review permission changes from packages/opencode/src/permission/arity.ts
- `src/permission/` - review permission changes from packages/opencode/src/permission/evaluate.ts
- `src/permission/` - review permission changes from packages/opencode/src/permission/index.ts
- `src/permission/` - review permission changes from packages/opencode/src/permission/schema.ts
- `src/permission/` - review permission changes from packages/opencode/test/kilocode/permission/next.always-rules.test.ts
- `src/permission/` - review permission changes from packages/opencode/test/permission/next.test.ts
- `src/tool/apply_patch.test.ts` - update based on kilocode packages/opencode/test/tool/apply_patch.test.ts changes
- `src/tool/apply_patch.test.ts` - update based on opencode packages/opencode/test/tool/apply_patch.test.ts changes
- `src/tool/apply_patch.ts` - update based on kilocode packages/opencode/src/tool/apply_patch.ts changes
- `src/tool/apply_patch.ts` - update based on opencode packages/opencode/src/tool/apply_patch.ts changes
- `src/tool/bash.test.ts` - update based on kilocode packages/opencode/test/tool/bash.test.ts changes
- `src/tool/bash.ts` - update based on kilocode packages/opencode/src/tool/bash.ts changes
- `src/tool/codesearch.ts` - update based on kilocode packages/opencode/src/tool/codesearch.ts changes
- `src/tool/diagnostics-filter.test.ts` - update based on kilocode packages/opencode/test/tool/diagnostics-filter.test.ts changes
- `src/tool/diagnostics.ts` - update based on kilocode packages/opencode/src/tool/diagnostics.ts changes
- `src/tool/edit.test.ts` - update based on kilocode packages/opencode/test/tool/edit.test.ts changes
- `src/tool/edit.test.ts` - update based on opencode packages/opencode/test/tool/edit.test.ts changes
- `src/tool/edit.ts` - update based on kilocode packages/opencode/src/tool/edit.ts changes
- `src/tool/edit.ts` - update based on opencode packages/opencode/src/tool/edit.ts changes
- `src/tool/external-directory.test.ts` - update based on kilocode packages/opencode/test/tool/external-directory.test.ts changes
- `src/tool/external-directory.ts` - update based on kilocode packages/opencode/src/tool/external-directory.ts changes
- `src/tool/github-pr-search.ts` - update based on kilocode .opencode/tool/github-pr-search.ts changes
- `src/tool/github-triage.ts` - update based on kilocode .opencode/tool/github-triage.ts changes
- `src/tool/glob.test.ts` - update based on kilocode packages/opencode/test/tool/glob.test.ts changes
- `src/tool/glob.ts` - update based on kilocode packages/opencode/src/tool/glob.ts changes
- `src/tool/grep.test.ts` - update based on kilocode packages/opencode/test/tool/grep.test.ts changes
- `src/tool/grep.ts` - update based on kilocode packages/opencode/src/tool/grep.ts changes
- `src/tool/index.ts` - update based on kilocode packages/opencode/src/tool/index.ts changes
- `src/tool/invalid.ts` - update based on kilocode packages/opencode/src/tool/invalid.ts changes
- `src/tool/ls.ts` - update based on kilocode packages/opencode/src/tool/ls.ts changes
- `src/tool/ls.txt.ts` - update based on kilocode packages/opencode/src/tool/ls.txt changes
- `src/tool/lsp.ts` - update based on kilocode packages/opencode/src/tool/lsp.ts changes
- `src/tool/lsp.ts` - update based on opencode packages/opencode/src/tool/lsp.ts changes
- `src/tool/multiedit.ts` - update based on kilocode packages/opencode/src/tool/multiedit.ts changes
- `src/tool/multiedit.ts` - update based on opencode packages/opencode/src/tool/multiedit.ts changes
- `src/tool/multiedit.txt.ts` - update based on opencode packages/opencode/src/tool/multiedit.txt changes
- `src/tool/plan.ts` - update based on kilocode packages/opencode/src/tool/plan.ts changes
- `src/tool/question.test.ts` - update based on kilocode packages/opencode/test/tool/question.test.ts changes
- `src/tool/question.ts` - update based on kilocode packages/opencode/src/tool/question.ts changes
- `src/tool/read-directory.ts` - update based on kilocode packages/opencode/src/kilocode/tool/read-directory.ts changes
- `src/tool/read.test.ts` - update based on kilocode packages/opencode/test/tool/read.test.ts changes
- `src/tool/read.ts` - update based on kilocode packages/opencode/src/tool/read.ts changes
- `src/tool/read.ts` - update based on opencode packages/opencode/src/tool/read.ts changes
- `src/tool/recall.test.ts` - update based on kilocode packages/opencode/test/tool/recall.test.ts changes
- `src/tool/recall.ts` - update based on kilocode packages/opencode/src/tool/recall.ts changes
- `src/tool/registry.test.ts` - update based on kilocode packages/opencode/test/tool/registry.test.ts changes
- `src/tool/registry.ts` - update based on kilocode packages/opencode/src/kilocode/tool/registry.ts changes
- `src/tool/registry.ts` - update based on kilocode packages/opencode/src/tool/registry.ts changes
- `src/tool/registry.ts` - update based on opencode packages/opencode/src/tool/registry.ts changes
- `src/tool/schema.ts` - update based on kilocode packages/opencode/src/tool/schema.ts changes
- `src/tool/schema.ts` - update based on opencode packages/opencode/src/tool/schema.ts changes
- `src/tool/skill.test.ts` - update based on kilocode packages/opencode/test/tool/skill.test.ts changes
- `src/tool/skill.ts` - update based on kilocode packages/opencode/src/tool/skill.ts changes
- `src/tool/task.test.ts` - update based on kilocode packages/opencode/test/tool/task.test.ts changes
- `src/tool/task.ts` - update based on kilocode packages/opencode/src/kilocode/tool/task.ts changes
- `src/tool/task.ts` - update based on kilocode packages/opencode/src/tool/task.ts changes
- `src/tool/todo.ts` - update based on kilocode packages/opencode/src/tool/todo.ts changes
- `src/tool/tool-define.test.ts` - update based on kilocode packages/opencode/test/tool/tool-define.test.ts changes
- `src/tool/tool.ts` - update based on kilocode packages/opencode/src/tool/tool.ts changes
- `src/tool/truncate.ts` - update based on kilocode packages/opencode/src/tool/truncate.ts changes
- `src/tool/truncation.test.ts` - update based on kilocode packages/opencode/test/tool/truncation.test.ts changes
- `src/tool/warpgrep.ts` - update based on kilocode packages/opencode/src/tool/warpgrep.ts changes
- `src/tool/webfetch.test.ts` - update based on kilocode packages/opencode/test/tool/webfetch.test.ts changes
- `src/tool/webfetch.ts` - update based on kilocode packages/opencode/src/tool/webfetch.ts changes
- `src/tool/websearch.ts` - update based on kilocode packages/opencode/src/tool/websearch.ts changes
- `src/tool/write.test.ts` - update based on kilocode packages/opencode/test/tool/write.test.ts changes
- `src/tool/write.test.ts` - update based on opencode packages/opencode/test/tool/write.test.ts changes
- `src/tool/write.ts` - update based on kilocode packages/opencode/src/tool/write.ts changes
- `src/tool/write.ts` - update based on opencode packages/opencode/src/tool/write.ts changes
