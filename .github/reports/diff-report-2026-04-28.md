# Upstream Changes Report
Generated: 2026-04-28 08:27:13

## Summary
- kilocode: 228 commits, 528 files changed
- opencode: 38 commits, 366 files changed

## kilocode Changes (ede13b7ec..2a6c3e7d5)

### Commits

- 2a6c3e7d5 - Merge pull request #9434 from Kilo-Org/fix/infinite-compact-upload-limit (Marian Alexandru Alecu, 2026-04-28)
- b1713a653 - Merge pull request #9600 from Kilo-Org/fix/provider-plugin-ci-upstream-24416 (Marian Alexandru Alecu, 2026-04-28)
- 7d9a4f331 - test(cli): adapt upstream plugin fixture for Kilo (Alex Alecu, 2026-04-28)
- fb9dc874d - test(provider): avoid plugin dependency install timeout (Kit Langton, 2026-04-28)
- 9e67b52e7 - fix(cli): mark context synthetic (Alex Alecu, 2026-04-28)
- 37b54fced - test(cli): cover compaction media safety (Alex Alecu, 2026-04-28)
- 49a0d7815 - Merge branch 'main' into fix/infinite-compact-upload-limit (Marian Alexandru Alecu, 2026-04-28)
- c3ad40b3b - Merge pull request #9409 from Kilo-Org/feat/cli-local-run (Marian Alexandru Alecu, 2026-04-28)
- 5bd891cea - Merge branch 'main' into feat/cli-local-run (Marian Alexandru Alecu, 2026-04-28)
- 64e18abc5 - Merge pull request #9435 from Kilo-Org/flint-zenith (Joshua Lambert, 2026-04-27)
- dda7ec8a6 - Merge branch 'main' into flint-zenith (Joshua Lambert, 2026-04-27)
- f0bdc5a8e - Merge pull request #9531 from Kilo-Org/docs/custom-model-modalities (Joshua Lambert, 2026-04-27)
- 4e96ed8ce - fix(vscode): use --text-base to match other settings tabs (Josh Lambert, 2026-04-27)
- 9186cb440 - fix(vscode): make Auto-Approve section titles respect VS Code theme (Josh Lambert, 2026-04-27)
- 11f2e2afb - fix: default edit-tool diff to side-by-side (split) view (Johnny Amancio, 2026-04-27)
- 87a8cdd07 - Merge pull request #9481 from Kilo-Org/charmed-saver (Kirill Kalishev, 2026-04-27)
- e22d79b96 - test(vscode): fix provider wiring architecture test (kirillk, 2026-04-27)
- f380f5d36 - Merge pull request #9575 from Kilo-Org/session/agent_2642ef3e-70fd-4b3a-b82b-fab4dca6f519 (Mark IJbema, 2026-04-27)
- ce8d7adef - fix(vscode): wire tab worktree actions (kirillk, 2026-04-27)
- 078a5592d - fix(vscode): fall back to codestral for empty or invalid autocomplete model (Mark IJbema, 2026-04-27)
- 5b26cfe5f - refactor(vscode): remove default autocomplete model from package.json (kiloconnect[bot], 2026-04-27)
- b6ee1e471 - Merge branch 'main' into charmed-saver (Kirill Kalishev, 2026-04-27)
- a76ab9510 - fix(vscode): improve chat toolbar changes button (kirillk, 2026-04-27)
- f57e2e91f - Merge branch 'main' into docs/custom-model-modalities (Joshua Lambert, 2026-04-27)
- 5bc384fc8 - chore: update nix node_modules hashes (kilo-maintainer[bot], 2026-04-27)
- f74d54c43 - feat: implement codebase indexing (#6966) (Josh Holmer, 2026-04-27)
- 7fc0d9f1f - Merge branch 'main' into docs/custom-model-modalities (Joshua Lambert, 2026-04-27)
- 552706bec - docs: clarify modalities is optional but requires input/output when specified (Josh Lambert, 2026-04-27)
- ff9e2810a - fix(cli): run dev setup via bun (Alex Alecu, 2026-04-27)
- 040e2c5db - Merge branch 'main' into charmed-saver (Kirill Kalishev, 2026-04-27)
- 13df76ac0 - docs: clarify required modalities fields (Josh Lambert, 2026-04-27)
- 1ec388509 - Merge pull request #9567 from Kilo-Org/fix/rerere-training-grep-case-sensitivity (Mark IJbema, 2026-04-27)
- 18a1f289f - fix: include lowercase 'resolve merge conflicts' in rerere training grep (kiloconnect[bot], 2026-04-27)
- e3476be3b - feat: Add diff view for edit tool (Johnny Amancio, 2026-04-27)
- 1eaf60feb - Merge branch 'main' into charmed-saver (Kirill Kalishev, 2026-04-27)
- 034f4d4e8 - Merge remote-tracking branch 'origin/main' into feat/cli-local-run (Alex Alecu, 2026-04-27)
- 83b153d6b - release: v7.2.26 (kilo-maintainer[bot], 2026-04-27)
- 94f9ddbfe - Merge pull request #9427 from Kilo-Org/docs/autocomplete-mercury-model (Mark IJbema, 2026-04-27)
- d17d4cae8 - docs(kilo-docs): restore list tool docs (Alex Alecu, 2026-04-27)
- 50c4a179f - chore: update nix node_modules hashes (kilo-maintainer[bot], 2026-04-27)
- 566b4507c - Merge pull request #9477 from Kilo-Org/imanolmaiztegui/kilo-opencode-v1.14.22 (Imanol Maiztegui, 2026-04-27)
- 4de329877 - Merge branch 'main' into imanolmaiztegui/kilo-opencode-v1.14.22 (Imanol Maiztegui, 2026-04-27)
- 93044b183 - test(session): add explicit variant field to subtask cost propagation test (Imanol Maiztegui, 2026-04-27)
- 76b53c640 - fix(opencode): resolve merge conflict in session prompt test (Imanol Maiztegui, 2026-04-27)
- 4267cd319 - test(session): add test for handleSubtask propagating child session cost to wrapper (Imanol Maiztegui, 2026-04-27)
- 438316b09 - fix(cli): stop hardcoding opencode in kilo pr (#6824) (hdcode.dev, 2026-04-27)
- f7bea4f52 - docs: add @git-changes to VS Code context mentions (#9505) (Scuttle Bot, 2026-04-27)
- 2704656e3 - refactor(cli): simplify stats cost (Alex Alecu, 2026-04-27)
- 12e92fa24 - chore(cli): mark stats cost line (Alex Alecu, 2026-04-27)
- 9e419b3e8 - fix(cli): count subagent stats (Alex Alecu, 2026-04-27)
- 2a94a0cc1 - fix(cli): ignore deleted cost sync (Alex Alecu, 2026-04-27)
- af0227b1a - fix(cli): exclude subagent sessions from stats aggregate (Alex Alecu, 2026-04-27)
- d9bed85e7 - fix(cli): sync processor cost after subagent propagation (Alex Alecu, 2026-04-27)
- f57479c65 - fix(cli): serialize concurrent subagent cost propagation (Alex Alecu, 2026-04-27)
- aaaa191b7 - fix(cli): include subagent costs in session total (#6321) (Alex Alecu, 2026-04-27)
- baf4bae91 - fix(cli): stop hardcoding opencode in kilo pr (#6824) (hdcode.dev, 2026-04-27)
- 99ffef184 - Merge branch 'main' into feat/cli-local-run (Marian Alexandru Alecu, 2026-04-27)
- 2d8fd28fd - docs: clarify Mercury Edit BYOK is temporary (kiloconnect[bot], 2026-04-27)
- a38393af9 - Merge branch 'main' into docs/autocomplete-mercury-model (Mark IJbema, 2026-04-27)
- 87d1d9648 - docs: add @git-changes to VS Code context mentions (#9505) (Scuttle Bot, 2026-04-27)
- 5be897cec - Merge pull request #9448 from Kilo-Org/fix/costs-of-subagents (Marian Alexandru Alecu, 2026-04-27)
- 6d5f686b8 - Merge branch 'main' into imanolmaiztegui/kilo-opencode-v1.14.22 (Imanol Maiztegui, 2026-04-27)
- 6b31ddd16 - Merge branch 'main' into feat/cli-local-run (Marian Alexandru Alecu, 2026-04-27)
- b344ac97c - fix(vscode): restore disabled provider management (#9551) (Marius, 2026-04-27)
- dfcb3f4e5 - Merge branch 'feat/cli-local-run' of https://github.com/Kilo-Org/kilocode into feat/cli-local-run (Alex Alecu, 2026-04-27)
- 41e63f6d6 - chore: fix annotation markers after main merge (Alex Alecu, 2026-04-27)
- fc9cf245a - Merge pull request #9310 from Kilo-Org/mark/mercury-autocomplete-integration (Mark IJbema, 2026-04-27)
- e101781bf - Merge branch 'fix/costs-of-subagents' of https://github.com/Kilo-Org/kilocode into fix/costs-of-subagents (Alex Alecu, 2026-04-27)
- 16abe9679 - chore(cli): fix type error after main merge (Alex Alecu, 2026-04-27)
- 60e8aafe8 - Merge pull request #9552 from Kilo-Org/mark/9527-clear-agent-model-override (Mark IJbema, 2026-04-27)
- b938e7d04 - Merge branch 'main' into imanolmaiztegui/kilo-opencode-v1.14.22 (Imanol Maiztegui, 2026-04-27)
- a42dd7ea1 - Merge remote-tracking branch 'origin/main' into fix/infinite-compact-upload-limit (Alex Alecu, 2026-04-27)
- bb81bca90 - Merge remote-tracking branch 'origin/main' into feat/cli-local-run (Alex Alecu, 2026-04-27)
- 67993d094 - Merge remote-tracking branch 'origin/main' into fix/costs-of-subagents (Alex Alecu, 2026-04-27)
- c5614cc54 - feat(vscode): open config files from settings (#9548) (Marius, 2026-04-27)
- 99493f42a - test(vscode): ensure autocomplete model enum and registry stay in sync (Mark IJbema, 2026-04-27)
- dddc92a01 - Merge pull request #9426 from Kilo-Org/fix/statusbar-kilo-logo (Mark IJbema, 2026-04-27)
- a63a27a36 - Merge branch 'main' into imanolmaiztegui/kilo-opencode-v1.14.22 (Imanol Maiztegui, 2026-04-27)
- 3f0bf322c - fix(vscode): allow clearing agent model override by sending null (kiloconnect[bot], 2026-04-27)
- a5bca011a - Allow ChatGPT login over OpenAI provider config (#9549) (Marius, 2026-04-27)
- dbf113524 - fix(cli): guard external directory boundaries (#9484) (Marius, 2026-04-27)
- 6965d5691 - release: v7.2.25 (kilo-maintainer[bot], 2026-04-27)
- f067a908a - docs: add mercury autocomplete changeset (kiloconnect[bot], 2026-04-27)
- f60cbb9e9 - Merge pull request #9546 from Kilo-Org/fix/queued-messages-test (Marian Alexandru Alecu, 2026-04-27)
- db1227da2 - fix(vscode): validate autocomplete model settings (kiloconnect[bot], 2026-04-27)
- 7ac2a0106 - test(vscode): cover autocomplete model selection (kiloconnect[bot], 2026-04-27)
- 1f8d9aac6 - Merge branch 'main' into mark/mercury-autocomplete-integration (kiloconnect[bot], 2026-04-27)
- a2b72044e - Merge branch 'main' into fix/queued-messages-test (Marian Alexandru Alecu, 2026-04-27)
- 87ba16c2b - Merge branch 'main' into fix/costs-of-subagents (Marian Alexandru Alecu, 2026-04-27)
- 778c5a84e - test(cli): guard queued prompt request tail (#9492) (Alex Alecu, 2026-04-27)
- 1eaf40914 - refactor(cli): simplify stats cost (Alex Alecu, 2026-04-27)
- a0d415f26 - Revert "fix(cli): preserve cwd for preferred shell commands" (kirillk, 2026-04-26)
- fd8a14ad9 - Revert "fix(cli): capture cwd before sourcing login shell config" (kirillk, 2026-04-26)
- edae6e2aa - fix(cli): capture cwd before sourcing login shell config (kirillk, 2026-04-26)
- a32f24b3c - docs: document custom model modalities (Josh Lambert, 2026-04-26)
- 623c84a5e - fix(cli): preserve cwd for preferred shell commands (kirillk, 2026-04-26)
- 0e49756c5 - Merge branch 'main' into charmed-saver (Kirill Kalishev, 2026-04-26)
- 42bc5e332 - fix(vscode): trim blank lines in AgentManagerApp to satisfy max-lines lint cap (kirillk, 2026-04-26)
- e9b75ecb4 - fix(vscode): align agent manager worktree menu (kirillk, 2026-04-26)
- 49fe1a350 - fix(vscode): tighten sidebar worktree actions (kirillk, 2026-04-26)
- a0a046e4c - fix(vscode): update agent manager icon (kirillk, 2026-04-26)
- c91bf18af - fix(vscode): refine sidebar action hover styles (kirillk, 2026-04-26)
- 44f463fdb - test: skip ripgrep-dependent tests on windows (Imanol Maiztegui, 2026-04-25)
- 09513e09a - fix(prompt): clean up shell invocation comments and simplify cwd handling (Imanol Maiztegui, 2026-04-25)
- b21778dec - refactor(session): pass cwd as positional arg to login shells instead of capturing it (Imanol Maiztegui, 2026-04-25)
- 7672adb18 - fix(opencode): use `pwd -P` in shell spawns to resolve stale PWD on CI (Imanol Maiztegui, 2026-04-25)
- 2fb805264 - Merge branch 'main' into imanolmaiztegui/kilo-opencode-v1.14.22 (Imanol Maiztegui, 2026-04-25)
- 9fb07cac6 - test(opencode): skip flaky prompt tests and update agent reference (Imanol Maiztegui, 2026-04-25)
- f1409354c - fix(vscode): resolve lint caps in sidebar worktree flow (kirillk, 2026-04-24)
- 26987f04d - Merge branch 'main' into charmed-saver (Kirill Kalishev, 2026-04-24)
- 236d09f33 - fix(vscode): address sidebar worktree review feedback (kirillk, 2026-04-24)
- 04474986a - fix(vscode): localize sidebar worktree actions (kirillk, 2026-04-24)
- 2a6c4294e - fix(opencode): remove mistral from reasoning model check and rebrand cache paths (Imanol Maiztegui, 2026-04-24)
- 4821038e4 - chore: update kilo-vscode visual regression baselines (github-actions[bot], 2026-04-24)
- 0a88997ab - fix(vscode): resolve sidebar chat typecheck (kirillk, 2026-04-24)
- 696ed061e - fix(vscode): polish sidebar worktree actions (kirillk, 2026-04-24)
- 7631e1394 - docs(kilo-docs): add Mistral reasoning documentation URL to source links (Imanol Maiztegui, 2026-04-24)
- 0a9b293a4 - Merge branch 'main' into imanolmaiztegui/kilo-opencode-v1.14.22 (Imanol Maiztegui, 2026-04-24)
- 6e0e2783e - build(sdk): regenerate SDK types and sort package.json dependencies (Imanol Maiztegui, 2026-04-24)
- 1da22b9ef - fix(vscode): refine sidebar worktree controls (kirillk, 2026-04-24)
- 3cec1ffa8 - refactor(snapshot): introduce SummaryFileDiff schema and tighten Kilo type annotations (Imanol Maiztegui, 2026-04-24)
- 18468b8e2 - feat(vscode): expose sidebar worktree actions (kirillk, 2026-04-24)
- b220c37dc - Merge branch 'main' into feat/cli-local-run (Marian Alexandru Alecu, 2026-04-24)
- f72664477 - fix(cli): hide dev-setup from public docs and release notes (Alex Alecu, 2026-04-24)
- 7a9da3fd6 - chore(cli): mark stats cost line (Alex Alecu, 2026-04-24)
- bc90a5059 - fix(cli): count subagent stats (Alex Alecu, 2026-04-24)
- 1230a3af8 - fix(cli): ignore deleted cost sync (Alex Alecu, 2026-04-24)
- 195ef4e54 - fix(cli): exclude subagent sessions from stats aggregate (Alex Alecu, 2026-04-24)
- e04dd779e - fix(cli): make dev-setup work from local builds and hide it in releases (Alex Alecu, 2026-04-24)
- eea72116b - fix(kilocode): update schema references to use .zod accessor after effect migration (Imanol Maiztegui, 2026-04-24)
- 418fe78f5 - fix(cli): sync processor cost after subagent propagation (Alex Alecu, 2026-04-24)
- 5e519256d - resolve merge conflicts (Imanol Maiztegui, 2026-04-24)
- 8f3d89989 - fix(cli): polish kilodev help output (Alex Alecu, 2026-04-24)
- 291d38701 - Merge branch 'main' into feat/cli-local-run (Marian Alexandru Alecu, 2026-04-24)
- 5bd50c6fe - refactor: kilo compat for v1.14.22 (Imanol Maiztegui, 2026-04-24)
- e9e71a37b - Merge remote-tracking branch 'origin/main' into fix/infinite-compact-upload-limit (Alex Alecu, 2026-04-24)
- 0329f8610 - Merge remote-tracking branch 'origin/main' into feat/cli-local-run (Alex Alecu, 2026-04-24)
- d71368554 - fix(cli): detect powershell host via psmodulepath (Alex Alecu, 2026-04-24)
- bec3ae9c9 - chore(plans): remove kilodev design record (Alex Alecu, 2026-04-24)
- ae0c43779 - fix(cli): serialize concurrent subagent cost propagation (Alex Alecu, 2026-04-24)
- d4886e2b0 - fix(cli): pick correct powershell profile path (Alex Alecu, 2026-04-24)
- 9aa490d56 - fix(cli): create rc parent dir before write (Alex Alecu, 2026-04-24)
- 73ab363f9 - fix(cli): include subagent costs in session total (#6321) (Alex Alecu, 2026-04-24)
- 1203b7c4b - docs(plans): record shipped kilodev launcher + dev-setup design (Alex Alecu, 2026-04-24)
- dd7475f68 - feat(cli): add interactive kilodev dev-setup command (Alex Alecu, 2026-04-24)
- cc91a77f9 - fix(cli): anchor strip cutoff to real user (Alex Alecu, 2026-04-24)
- a995b94d3 - fix(cli): keep sessions usable after summary with large images (Alex Alecu, 2026-04-23)
- 596145a71 - release: v1.14.22 (opencode, 2026-04-23)
- 54e76368d - docs(kilo-docs): document Mercury Edit autocomplete model (BYOK only) (kiloconnect[bot], 2026-04-23)
- 876290eab - refactor(vscode): centralize autocomplete model definitions (Mark IJbema, 2026-04-23)
- 1858b93cb - fix(vscode): add Kilo logo icon to status bar (kiloconnect[bot], 2026-04-23)
- e5d2d8556 - refactor(vscode): read autocomplete model from config at request time (Mark IJbema, 2026-04-23)
- 646fa39b3 - fix(vscode): sync autocomplete model config in ChatTextAreaAutocomplete (Mark IJbema, 2026-04-23)
- 38deb0f3e - fix(npm): respect npmrc config (#24001) (Shoubhit Dash, 2026-04-23)
- 6928c4590 - fix(vscode): use zero temperature for mercury autocomplete (kiloconnect[bot], 2026-04-23)
- 7904cf20c - refactor(vscode): remove dead autocomplete handlers from KiloProvider (Mark IJbema, 2026-04-23)
- 92df556e7 - fix(vscode): add model to autocomplete settings persistence (Mark IJbema, 2026-04-23)
- dbab23d09 - Merge remote-tracking branch 'origin/main' into mark/mercury-autocomplete-integration (Mark IJbema, 2026-04-23)
- 9b6db08d2 - chore: add to TEAM_MEMBERS (#23975) (Simon Klee, 2026-04-23)
- 3ae74cb04 - chore: generate (opencode-agent[bot], 2026-04-23)
- 6002500bc - feat(project): add icon_url_override field to projects (#23955) (Brendan Allan, 2026-04-23)
- 59d54806f - feat(cli): add kilodev launcher + dev-alias helper (Alex Alecu, 2026-04-23)
- 785f3589a - fix: add keyed prop to Show components for proper reactivity (#23935) (Brendan Allan, 2026-04-23)
- a419f1c50 - zen: hy3 preview (Frank, 2026-04-23)
- 871789ce6 - sync release versions for v1.14.21 (opencode, 2026-04-23)
- df27baa00 - refactor: remove redundant pending check from working memo (#23929) (Brendan Allan, 2026-04-23)
- 973000854 - tweak: codex model logic (#23925) (Aiden Cline, 2026-04-23)
- ac26394fc - fix(beta): PR resolvers/smoke check should typecheck all pacakges (#23913) (Luke Parker, 2026-04-23)
- 6387b35a2 - log session sdk errors (#23652) (Luke Parker, 2026-04-23)
- 1cd4c9224 - chore: generate (opencode-agent[bot], 2026-04-23)
- e383df4b1 - feat: support pull diagnostics in the LSP client (C#, Kotlin, etc) (#23771) (Luke Parker, 2026-04-23)
- 58db41b4b - chore: update nix bun version (#23881) (Caleb Norton, 2026-04-23)
- 5d133f278 - chore: generate (opencode-agent[bot], 2026-04-23)
- e9b1d3b94 - docs: add MiMo V2.5 to Go pages (#23876) (Jack, 2026-04-23)
- 3a082a0ef - fix(project): use git common dir for bare repo project cache (#19054) (Steven T. Cramer, 2026-04-23)
- 504fd1b37 - chore: generate (opencode-agent[bot], 2026-04-23)
- 574b2c217 - fix(session): improve session compaction (#23870) (Shoubhit Dash, 2026-04-23)
- fa8b7bc4d - chore: generate (opencode-agent[bot], 2026-04-23)
- 6196b81e0 - fix(tui): fail fast on invalid session startup (#23837) (Shoubhit Dash, 2026-04-23)
- d884ab73d - fix: consolidate project avatar source logic (#23819) (Brendan Allan, 2026-04-23)
- 71d196d3c - chore: generate (opencode-agent[bot], 2026-04-23)
- 20756e0ee - test: fix cross-spawn stderr race on Windows CI (#23808) (Luke Parker, 2026-04-23)
- 894e63891 - chore: generate (opencode-agent[bot], 2026-04-23)
- 8113a4360 - fix: preserve BOM in text tool round-trips (#23797) (Luke Parker, 2026-04-23)
- c81980463 - chore: update nix node_modules hashes (opencode-agent[bot], 2026-04-23)
- 06066dbb7 - fix(app): improve icon override handling in project edit dialog (#23768) (Brendan Allan, 2026-04-23)
- 69b8ea0d6 - chore: bump Bun to 1.3.13 (#23791) (Luke Parker, 2026-04-23)
- b0455583a - chore: generate (opencode-agent[bot], 2026-04-22)
- ed802fd12 - refactor(core): migrate MessageV2 errors to Schema-backed named errors (#23764) (Kit Langton, 2026-04-21)
- 1593c3ed1 - refactor(core): migrate MessageV2 internal Cursor to Effect Schema (#23763) (Kit Langton, 2026-04-21)
- e89543811 - refactor(core): migrate MessageV2 message DTOs (User/Assistant/Part/Info/WithParts) to Effect Schema (#23757) (Kit Langton, 2026-04-21)
- 1a76799fd - chore: generate (opencode-agent[bot], 2026-04-22)
- fa623964a - refactor(core): migrate MessageV2 part leaves + ToolPart to Effect Schema (#23756) (Kit Langton, 2026-04-21)
- 628102ad0 - zen: handle alibaba format (Frank, 2026-04-21)
- ad7ae7353 - refactor(core): derive all schema.ts leaves' .zod via effect-zod walker (#23754) (Kit Langton, 2026-04-21)
- 8043cfa68 - fix(desktop): update desktop file and MetaInfo file (#14933) (NN708, 2026-04-22)
- d2181e927 - chore: generate (opencode-agent[bot], 2026-04-21)
- 5e9fb3cc9 - feat: replace csharp-ls with roslyn-language-server (#14463) (Mathews Bryan, 2026-04-21)
- 2da6d860e - refactor(core): derive provider schema .zod via effect-zod walker (#23753) (Kit Langton, 2026-04-21)
- df0c1f649 - refactor(core): migrate MessageV2 tool state schemas to Effect Schema (#23752) (Kit Langton, 2026-04-21)
- d6dea3f3e - chore(core): clean up after ConfigPermission Effect Schema migration (#23749) (Kit Langton, 2026-04-21)
- 0bcf734a6 - migrate Snapshot schemas to Effect Schema (#23747) (Kit Langton, 2026-04-21)
- b1c3095ed - chore: generate (opencode-agent[bot], 2026-04-21)
- b0f565b74 - refactor(core): migrate ConfigPermission.Info to Effect Schema canonical (#23740) (Kit Langton, 2026-04-21)
- 2ae64f426 - refactor(core): migrate MessageV2.Format to Effect Schema (#23744) (Kit Langton, 2026-04-21)
- 793365713 - migrate LSP data schemas to Effect Schema (#23745) (Kit Langton, 2026-04-21)
- caaddf096 - zen: ling 2.6 free (Frank, 2026-04-21)
- 1a2070346 - feat: add Mistral Small reasoning variant support (issue #19479) (#23735) (Ruben De Smet, 2026-04-21)
- 8751f48a7 - Update VOUCHED list (github-actions[bot], 2026-04-21)
- 58232d896 - fix: dont show variants for kimi models that dont support them (#23696) (Aiden Cline, 2026-04-21)
- cd6415f33 - fix(tui): don't check for version upgrades if it's disabled by the user (#20089) (Rahul Iyer, 2026-04-21)
- c9fb8d0ce - sync release versions for v1.14.20 (opencode, 2026-04-21)
- 1e1a50060 - chore: generate (opencode-agent[bot], 2026-04-21)
- ecc06a3d8 - refactor(core): make Config.Info canonical Effect Schema (#23716) (Kit Langton, 2026-04-21)
- 3205f122e - chore: update nix node_modules hashes (opencode-agent[bot], 2026-04-21)
- e95474df0 - fix: revert parts of a824064c4 which caused system theme regression (#23714) (Aiden Cline, 2026-04-21)
- 96a534d8c - feat(core): bridge GET /config through experimental HttpApi (#23712) (Kit Langton, 2026-04-21)
- 9964ffd89 - fix(vscode): keep provider within lint limit (kiloconnect[bot], 2026-04-21)
- 7b67e14f0 - fix: resolve autocomplete model check failures (kiloconnect[bot], 2026-04-21)
- d0e75a36c - merge: resolve conflict in SDK types keeping kilo-specific types (Mark IJbema, 2026-04-21)
- a7193d4ff - Merge branch 'main' into feat/mercury-autocomplete-integration (Christiaan Arnoldus, 2026-04-07)
- 4233eccc4 - Update packages/kilo-vscode/src/services/autocomplete/AutocompleteModel.ts (Christiaan Arnoldus, 2026-04-07)
- ab7c1686c - fix(settings): use settings trigger style for autocomplete model dropdown (Apoorv Saxena, 2026-04-01)
- c9416aa09 - fix(settings): match autocomplete model dropdown size to other model selectors (Apoorv Saxena, 2026-04-01)
- 9c9e372cb - feat(settings): move autocomplete model selector to Models tab (Apoorv Saxena, 2026-04-01)
- ae3b6f884 - refactor(autocomplete): route Mercury via Kilo gateway instead of direct Inception API (Apoorv Saxena, 2026-04-01)
- dda92403c - fix: rename "Inception Labs" to "Inception" in display strings (Apoorv Saxena, 2026-03-31)
- 6d783b3e2 - feat(autocomplete): add Mercury Edit by Inception Labs as autocomplete model option (Apoorv Saxena, 2026-03-31)

### Changed Files by Category

#### Tool System (packages/*/src/tool/)
- `packages/opencode/src/kilocode/tool/registry.ts` (+14, -6)
- `packages/opencode/src/kilocode/tool/semantic-search.ts` (+126, -0)
- `packages/opencode/src/kilocode/tool/semantic-search.txt` (+12, -0)
- `packages/opencode/src/tool/apply_patch.ts` (+22, -10)
- `packages/opencode/src/tool/edit.ts` (+93, -69)
- `packages/opencode/src/tool/external-directory.ts` (+13, -2)
- `packages/opencode/src/tool/grep.txt` (+2, -1)
- `packages/opencode/src/tool/lsp.ts` (+1, -1)
- `packages/opencode/src/tool/multiedit.ts` (+0, -61)
- `packages/opencode/src/tool/multiedit.txt` (+0, -41)
- `packages/opencode/src/tool/read.ts` (+1, -1)
- `packages/opencode/src/tool/registry.ts` (+7, -3)
- `packages/opencode/src/tool/schema.ts` (+2, -3)
- `packages/opencode/src/tool/task.ts` (+11, -3)
- `packages/opencode/src/tool/write.ts` (+15, -8)
- `packages/opencode/test/tool/apply_patch.test.ts` (+29, -0)
- `packages/opencode/test/tool/edit.test.ts` (+88, -16)
- `packages/opencode/test/tool/glob.test.ts` (+5, -2)
- `packages/opencode/test/tool/skill.test.ts` (+4, -1)
- `packages/opencode/test/tool/task.test.ts` (+226, -4)
- `packages/opencode/test/tool/write.test.ts` (+48, -0)

#### Agent System (packages/*/src/agent/)
- `packages/opencode/src/agent/prompt/compaction.txt` (+6, -12)
- `packages/opencode/src/kilocode/agent/index.ts` (+10, -1)
- `packages/opencode/test/agent/agent.test.ts` (+1, -1)

#### Permission System (**/permission/)
- `packages/opencode/src/permission/index.ts` (+12, -2)
- `packages/opencode/src/permission/schema.ts` (+2, -3)
- `packages/opencode/test/permission/next.test.ts` (+63, -3)

#### Event Bus (**/bus/, **/event/)
(no changes)

#### Core (**/core/)
- `packages/kilo-indexing/src/indexing/orchestrator.ts` (+396, -0)
- `packages/kilo-indexing/test/kilocode/indexing/orchestrator.test.ts` (+261, -0)

#### Other Changes
- `.changeset/auto-approve-header-light-theme.md` (+5, -0)
- `.changeset/autocomplete-model-switch-back.md` (+5, -0)
- `.changeset/chat-toolbar-changes.md` (+5, -0)
- `.changeset/edit-tool-diff-split-view.md` (+5, -0)
- `.changeset/fix-compaction-history-trim.md` (+5, -0)
- `.changeset/openrouter-deepseek-reasoning.md` (+0, -6)
- `.changeset/sidebar-worktree-actions.md` (+5, -0)
- `.kilo/package-lock.json` (+8, -8)
- `.kilocode/package-lock.json` (+8, -8)
- `AGENTS.md` (+1, -0)
- `CONTRIBUTING.md` (+34, -0)
- `bin/kilodev` (+20, -0)
- `bin/kilodev.cmd` (+21, -0)
- `bun.lock` (+173, -32)
- `flake.lock` (+3, -3)
- `nix/hashes.json` (+4, -4)
- `nix/kilo.nix` (+19, -18)
- `package.json` (+6, -4)
- `packages/app/package.json` (+1, -1)
- `packages/app/public/assets/JetBrainsMonoNerdFontMono-Regular.woff2` (+-, --)
- `packages/app/src/app.tsx` (+21, -21)
- `packages/app/src/components/dialog-edit-project.tsx` (+31, -21)
- `packages/app/src/components/dialog-select-server.tsx` (+3, -3)
- `packages/app/src/components/prompt-input.tsx` (+33, -19)
- `packages/app/src/components/settings-general.tsx` (+39, -0)
- `packages/app/src/components/terminal.tsx` (+3, -3)
- `packages/app/src/context/global-sync.tsx` (+29, -50)
- `packages/app/src/context/global-sync/bootstrap.ts` (+79, -65)
- `packages/app/src/context/global-sync/child-store.ts` (+10, -8)
- `packages/app/src/context/global-sync/event-reducer.ts` (+11, -7)
- `packages/app/src/context/layout.tsx` (+2, -32)
- `packages/app/src/context/prompt.tsx` (+3, -3)
- `packages/app/src/context/settings.tsx` (+27, -0)
- `packages/app/src/i18n/ar.ts` (+5, -1)
- `packages/app/src/i18n/br.ts` (+6, -1)
- `packages/app/src/i18n/bs.ts` (+6, -1)
- `packages/app/src/i18n/da.ts` (+6, -1)
- `packages/app/src/i18n/de.ts` (+6, -1)
- `packages/app/src/i18n/en.ts` (+6, -1)
- `packages/app/src/i18n/es.ts` (+6, -1)
- `packages/app/src/i18n/fr.ts` (+6, -1)
- `packages/app/src/i18n/ja.ts` (+6, -1)
- `packages/app/src/i18n/ko.ts` (+6, -1)
- `packages/app/src/i18n/no.ts` (+6, -1)
- `packages/app/src/i18n/pl.ts` (+6, -1)
- `packages/app/src/i18n/ru.ts` (+6, -1)
- `packages/app/src/i18n/th.ts` (+6, -1)
- `packages/app/src/i18n/tr.ts` (+7, -1)
- `packages/app/src/i18n/zh.ts` (+5, -1)
- `packages/app/src/i18n/zht.ts` (+5, -1)
- `packages/app/src/index.css` (+16, -0)
- `packages/app/src/pages/directory-layout.tsx` (+5, -6)
- `packages/app/src/pages/layout/helpers.ts` (+1, -1)
- `packages/app/src/pages/layout/sidebar-items.tsx` (+9, -5)
- `packages/app/src/pages/layout/sidebar-workspace.tsx` (+1, -1)
- `packages/app/src/pages/session/message-timeline.tsx` (+5, -5)
- `packages/containers/bun-node/Dockerfile` (+1, -1)
- `packages/desktop-electron/electron.vite.config.ts` (+4, -0)
- `packages/desktop-electron/package.json` (+3, -2)
- `packages/desktop-electron/src/main/index.ts` (+38, -18)
- `packages/desktop-electron/src/main/ipc.ts` (+12, -1)
- `packages/desktop-electron/src/main/menu.ts` (+1, -1)
- `packages/desktop-electron/src/main/migrate.ts` (+4, -4)
- `packages/desktop-electron/src/main/server.ts` (+7, -6)
- `packages/desktop-electron/src/main/store.ts` (+4, -2)
- `packages/desktop-electron/src/main/windows.ts` (+74, -31)
- `packages/desktop-electron/src/preload/index.ts` (+2, -0)
- `packages/desktop-electron/src/preload/types.ts` (+6, -0)
- `packages/desktop-electron/src/renderer/env.d.ts` (+0, -2)
- `packages/desktop-electron/src/renderer/html.test.ts` (+3, -3)
- `packages/desktop-electron/src/renderer/index.tsx` (+27, -14)
- `packages/desktop-electron/src/renderer/updater.ts` (+0, -2)
- `packages/desktop/package.json` (+1, -1)
- `packages/desktop/src-tauri/release/appstream.metainfo.xml` (+3, -0)
- `packages/desktop/src-tauri/tauri.conf.json` (+1, -0)
- `packages/extensions/zed/extension.toml` (+6, -6)
- `packages/kilo-docs/lib/nav/tools.ts` (+1, -1)
- `packages/kilo-docs/lychee.toml` (+6, -2)
- `packages/kilo-docs/markdoc/partials/cli-commands-table.md` (+25, -25)
- `packages/kilo-docs/package.json` (+1, -1)
- `packages/kilo-docs/pages/automate/tools/{codebase-search.md => semantic-search.md}` (+28, -28)
- `packages/kilo-docs/pages/code-with-ai/agents/context-mentions.md` (+6, -5)
- `packages/kilo-docs/pages/code-with-ai/agents/custom-models.md` (+21, -0)
- `packages/kilo-docs/pages/code-with-ai/features/autocomplete/index.md` (+13, -3)
- `packages/kilo-docs/pages/customize/context/codebase-indexing.md` (+2, -2)
- `packages/kilo-docs/previous-docs-redirects.js` (+6, -0)
- `packages/kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression/chat/chat-view-idle-chromium-linux.png` (+2, -2)
- `packages/kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression/chat/welcome-with-switcher-and-notification-chromium-linux.png` (+2, -2)
- `packages/kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression/settings/indexing-provider-blur-race-chromium-linux.png` (+3, -0)
- `packages/kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression/settings/providers-configure-chromium-linux.png` (+2, -2)
- `packages/kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression/settings/settings-panel-chromium-linux.png` (+2, -2)
- `packages/kilo-docs/source-links.md` (+4, -1)
- `packages/kilo-gateway/package.json` (+1, -1)
- `packages/kilo-gateway/src/server/routes.ts` (+1, -0)
- `packages/kilo-i18n/package.json` (+1, -1)
- `packages/kilo-indexing/package.json` (+60, -0)
- `packages/kilo-indexing/src/config.ts` (+150, -0)
- `packages/kilo-indexing/src/detect.ts` (+98, -0)
- `packages/kilo-indexing/src/file/ignore.ts` (+76, -0)
- `packages/kilo-indexing/src/headers.ts` (+6, -0)
- `packages/kilo-indexing/src/index.ts` (+13, -0)
- `packages/kilo-indexing/src/indexing/cache-manager.ts` (+80, -0)
- `packages/kilo-indexing/src/indexing/config-bridge.ts` (+2, -0)
- `packages/kilo-indexing/src/indexing/config-manager.ts` (+312, -0)
- `packages/kilo-indexing/src/indexing/constants/index.ts` (+69, -0)
- `packages/kilo-indexing/src/indexing/embedders/bedrock.ts` (+306, -0)
- `packages/kilo-indexing/src/indexing/embedders/gemini.ts` (+90, -0)
- `packages/kilo-indexing/src/indexing/embedders/mistral.ts` (+90, -0)
- `packages/kilo-indexing/src/indexing/embedders/ollama.ts` (+270, -0)
- `packages/kilo-indexing/src/indexing/embedders/openai-compatible.ts` (+484, -0)
- `packages/kilo-indexing/src/indexing/embedders/openai.ts` (+204, -0)
- `packages/kilo-indexing/src/indexing/embedders/openrouter.ts` (+427, -0)
- `packages/kilo-indexing/src/indexing/embedders/vercel-ai-gateway.ts` (+98, -0)
- `packages/kilo-indexing/src/indexing/embedders/voyage.ts` (+265, -0)
- `packages/kilo-indexing/src/indexing/embedding-profile.ts` (+35, -0)
- `packages/kilo-indexing/src/indexing/index.ts` (+35, -0)
- `packages/kilo-indexing/src/indexing/interfaces/cache.ts` (+6, -0)
- `packages/kilo-indexing/src/indexing/interfaces/config.ts` (+56, -0)
- `packages/kilo-indexing/src/indexing/interfaces/embedder.ts` (+44, -0)
- `packages/kilo-indexing/src/indexing/interfaces/file-processor.ts` (+74, -0)
- `packages/kilo-indexing/src/indexing/interfaces/index.ts` (+7, -0)
- `packages/kilo-indexing/src/indexing/interfaces/manager.ts` (+55, -0)
- `packages/kilo-indexing/src/indexing/interfaces/telemetry.ts` (+58, -0)
- `packages/kilo-indexing/src/indexing/interfaces/vector-store.ts` (+97, -0)
- `packages/kilo-indexing/src/indexing/manager.ts` (+517, -0)
- `packages/kilo-indexing/src/indexing/model-registry.ts` (+88, -0)
- `packages/kilo-indexing/src/indexing/processors/file-watcher.ts` (+694, -0)
- `packages/kilo-indexing/src/indexing/processors/index.ts` (+3, -0)
- `packages/kilo-indexing/src/indexing/processors/parser.ts` (+557, -0)
- `packages/kilo-indexing/src/indexing/processors/scanner.ts` (+662, -0)
- `packages/kilo-indexing/src/indexing/runtime.ts` (+33, -0)
- `packages/kilo-indexing/src/indexing/search-service.ts` (+46, -0)
- `packages/kilo-indexing/src/indexing/service-factory.ts` (+273, -0)
- `packages/kilo-indexing/src/indexing/shared/get-relative-path.ts` (+46, -0)
- `packages/kilo-indexing/src/indexing/shared/load-ignore.ts` (+37, -0)
- `packages/kilo-indexing/src/indexing/shared/supported-extensions.ts` (+56, -0)
- `packages/kilo-indexing/src/indexing/shared/validation-helpers.ts` (+215, -0)
- `packages/kilo-indexing/src/indexing/state-manager.ts` (+104, -0)
- `packages/kilo-indexing/src/indexing/vector-store/lancedb-loader.ts` (+9, -0)
- `packages/kilo-indexing/src/indexing/vector-store/lancedb-vector-store.ts` (+636, -0)
- `packages/kilo-indexing/src/indexing/vector-store/qdrant-client.ts` (+759, -0)
- `packages/kilo-indexing/src/plugin.ts` (+8, -0)
- `packages/kilo-indexing/src/server/routes.ts` (+27, -0)
- `packages/kilo-indexing/src/status.ts` (+92, -0)
- `packages/kilo-indexing/src/tree-sitter/index.ts` (+263, -0)
- `packages/kilo-indexing/src/tree-sitter/languageParser.ts` (+299, -0)
- `packages/kilo-indexing/src/tree-sitter/markdownParser.ts` (+180, -0)
- `packages/kilo-indexing/src/tree-sitter/queries/c-sharp.ts` (+65, -0)
- `packages/kilo-indexing/src/tree-sitter/queries/c.ts` (+85, -0)
- `packages/kilo-indexing/src/tree-sitter/queries/cpp.ts` (+96, -0)
- `packages/kilo-indexing/src/tree-sitter/queries/css.ts` (+71, -0)
- `packages/kilo-indexing/src/tree-sitter/queries/elisp.ts` (+40, -0)
- `packages/kilo-indexing/src/tree-sitter/queries/elixir.ts` (+70, -0)
- `packages/kilo-indexing/src/tree-sitter/queries/embedded_template.ts` (+19, -0)
- `packages/kilo-indexing/src/tree-sitter/queries/go.ts` (+26, -0)
- `packages/kilo-indexing/src/tree-sitter/queries/html.ts` (+51, -0)
- `packages/kilo-indexing/src/tree-sitter/queries/index.ts` (+28, -0)
- `packages/kilo-indexing/src/tree-sitter/queries/java.ts` (+74, -0)
- `packages/kilo-indexing/src/tree-sitter/queries/javascript.ts` (+123, -0)
- `packages/kilo-indexing/src/tree-sitter/queries/kotlin.ts` (+110, -0)
- `packages/kilo-indexing/src/tree-sitter/queries/lua.ts` (+37, -0)
- `packages/kilo-indexing/src/tree-sitter/queries/ocaml.ts` (+31, -0)
- `packages/kilo-indexing/src/tree-sitter/queries/php.ts` (+172, -0)
- `packages/kilo-indexing/src/tree-sitter/queries/python.ts` (+73, -0)
- `packages/kilo-indexing/src/tree-sitter/queries/ruby.ts` (+204, -0)
- `packages/kilo-indexing/src/tree-sitter/queries/rust.ts` (+80, -0)
- `packages/kilo-indexing/src/tree-sitter/queries/scala.ts` (+44, -0)
- `packages/kilo-indexing/src/tree-sitter/queries/solidity.ts` (+44, -0)
- `packages/kilo-indexing/src/tree-sitter/queries/swift.ts` (+74, -0)
- `packages/kilo-indexing/src/tree-sitter/queries/systemrdl.ts` (+33, -0)
- `packages/kilo-indexing/src/tree-sitter/queries/tlaplus.ts` (+32, -0)
- `packages/kilo-indexing/src/tree-sitter/queries/toml.ts` (+24, -0)
- `packages/kilo-indexing/src/tree-sitter/queries/tsx.ts` (+87, -0)
- `packages/kilo-indexing/src/tree-sitter/queries/typescript.ts` (+123, -0)
- `packages/kilo-indexing/src/tree-sitter/queries/vue.ts` (+29, -0)
- `packages/kilo-indexing/src/tree-sitter/queries/zig.ts` (+21, -0)
- `packages/kilo-indexing/src/util/log.ts` (+74, -0)
- `packages/kilo-indexing/test/kilocode/indexing/config-manager.test.ts` (+66, -0)
- `packages/kilo-indexing/test/kilocode/indexing/detect.test.ts` (+60, -0)
- `packages/kilo-indexing/test/kilocode/indexing/embedders/__helpers__/openai-mock.ts` (+33, -0)
- `packages/kilo-indexing/test/kilocode/indexing/embedders/bedrock.test.ts` (+579, -0)
- `packages/kilo-indexing/test/kilocode/indexing/embedders/gemini.test.ts` (+134, -0)
- `packages/kilo-indexing/test/kilocode/indexing/embedders/mistral.test.ts` (+134, -0)
- `packages/kilo-indexing/test/kilocode/indexing/embedders/ollama.test.ts` (+256, -0)
- `packages/kilo-indexing/test/kilocode/indexing/embedders/openai-compatible-rate-limit.test.ts` (+153, -0)
- `packages/kilo-indexing/test/kilocode/indexing/embedders/openai-compatible.test.ts` (+912, -0)
- `packages/kilo-indexing/test/kilocode/indexing/embedders/openai.test.ts` (+466, -0)
- `packages/kilo-indexing/test/kilocode/indexing/embedders/openrouter.test.ts` (+425, -0)
- `packages/kilo-indexing/test/kilocode/indexing/embedders/vercel-ai-gateway.test.ts` (+126, -0)
- `packages/kilo-indexing/test/kilocode/indexing/manager.test.ts` (+381, -0)
- `packages/kilo-indexing/test/kilocode/indexing/processors/file-watcher.test.ts` (+235, -0)
- `packages/kilo-indexing/test/kilocode/indexing/processors/parser-vb.test.ts` (+339, -0)
- `packages/kilo-indexing/test/kilocode/indexing/processors/parser.test.ts` (+1060, -0)
- `packages/kilo-indexing/test/kilocode/indexing/processors/scanner.test.ts` (+314, -0)
- `packages/kilo-indexing/test/kilocode/indexing/service-factory.test.ts` (+155, -0)
- `packages/kilo-indexing/test/kilocode/indexing/shared/get-relative-path.test.ts` (+91, -0)
- `packages/kilo-indexing/test/kilocode/indexing/shared/load-ignore.test.ts` (+50, -0)
- `packages/kilo-indexing/test/kilocode/indexing/shared/validation-helpers.test.ts` (+93, -0)
- `packages/kilo-indexing/test/kilocode/indexing/state-manager.test.ts` (+46, -0)
- `packages/kilo-indexing/test/kilocode/indexing/vector-store/lancedb-loader.test.ts` (+29, -0)
- `packages/kilo-indexing/test/kilocode/indexing/vector-store/lancedb-vector-store.test.ts` (+708, -0)
- `packages/kilo-indexing/test/kilocode/indexing/vector-store/qdrant-client.test.ts` (+1797, -0)
- `packages/kilo-indexing/test/kilocode/tree-sitter/index.test.ts` (+35, -0)
- `packages/kilo-indexing/tsconfig.json` (+15, -0)
- `packages/kilo-telemetry/package.json` (+1, -1)
- `packages/kilo-telemetry/src/__tests__/telemetry.test.ts` (+19, -0)
- `packages/kilo-telemetry/src/events.ts` (+7, -0)
- `packages/kilo-telemetry/src/telemetry.ts` (+59, -0)
- `packages/kilo-ui/package.json` (+1, -1)
- `packages/kilo-ui/src/components/message-part.tsx` (+24, -7)
- `packages/kilo-vscode/CHANGELOG.md` (+16, -0)
- `packages/kilo-vscode/assets/icons/kilo-icon-font.woff2` (+-, --)
- `packages/kilo-vscode/eslint.config.mjs` (+3, -3)
- `packages/kilo-vscode/package.json` (+24, -2)
- `packages/kilo-vscode/src/DiffVirtualProvider.ts` (+2, -1)
- `packages/kilo-vscode/src/KiloProvider.ts` (+104, -25)
- `packages/kilo-vscode/src/SettingsEditorProvider.ts` (+4, -1)
- `packages/kilo-vscode/src/agent-manager/AgentManagerProvider.ts` (+19, -0)
- `packages/kilo-vscode/src/agent-manager/host.ts` (+6, -0)
- `packages/kilo-vscode/src/agent-manager/vscode-host.ts` (+13, -0)
- `packages/kilo-vscode/src/extension.ts` (+15, -3)
- `packages/kilo-vscode/src/features.ts` (+18, -0)
- `packages/kilo-vscode/src/kilo-provider-utils.ts` (+10, -1)
- `packages/kilo-vscode/src/kilo-provider/config-file.ts` (+117, -0)
- `packages/kilo-vscode/src/kilo-provider/open-config.ts` (+72, -0)
- `packages/kilo-vscode/src/kilo-provider/sidebar-worktree.ts` (+67, -0)
- `packages/kilo-vscode/src/provider-actions.ts` (+24, -3)
- `packages/kilo-vscode/src/services/autocomplete/AutocompleteModel.ts` (+15, -8)
- `packages/kilo-vscode/src/services/autocomplete/AutocompleteServiceManager.ts` (+6, -0)
- `packages/kilo-vscode/src/services/autocomplete/__tests__/AutocompleteModel.spec.ts` (+45, -2)
- `packages/kilo-vscode/src/services/autocomplete/__tests__/settings.spec.ts` (+79, -0)
- `packages/kilo-vscode/src/services/autocomplete/chat-autocomplete/ChatTextAreaAutocomplete.ts` (+3, -0)
- `packages/kilo-vscode/src/services/autocomplete/settings.ts` (+13, -1)
- `packages/kilo-vscode/src/services/cli-backend/connection-service.ts` (+13, -22)
- `packages/kilo-vscode/src/services/cli-backend/index.ts` (+0, -2)
- `packages/kilo-vscode/src/services/cli-backend/sdk-sse-adapter.ts` (+4, -4)
- `packages/kilo-vscode/src/services/cli-backend/types.ts` (+4, -15)
- `packages/kilo-vscode/src/shared/autocomplete-models.ts` (+44, -0)
- `packages/kilo-vscode/tests/indexing-provider-blur-race.spec.ts` (+63, -0)
- `packages/kilo-vscode/tests/unit/autocomplete-models-sync.test.ts` (+22, -0)
- `packages/kilo-vscode/tests/unit/config-utils.test.ts` (+49, -0)
- `packages/kilo-vscode/tests/unit/custom-provider-dialog-validate.test.ts` (+12, -0)
- `packages/kilo-vscode/tests/unit/databridge-shape.test.ts` (+18, -3)
- `packages/kilo-vscode/tests/unit/extension-arch.test.ts` (+20, -2)
- `packages/kilo-vscode/tests/unit/indexing-utils.test.ts` (+122, -0)
- `packages/kilo-vscode/tests/unit/kilo-provider-followup.test.ts` (+1, -0)
- `packages/kilo-vscode/tests/unit/kilo-provider-indexing-refresh.test.ts` (+141, -0)
- `packages/kilo-vscode/tests/unit/kilo-provider-session-refresh.test.ts` (+5, -0)
- `packages/kilo-vscode/tests/unit/kilo-ui-contract.test.ts` (+22, -0)
- `packages/kilo-vscode/tests/unit/provider-actions-save.test.ts` (+83, -1)
- `packages/kilo-vscode/tests/unit/provider-visibility.test.ts` (+57, -1)
- `packages/kilo-vscode/webview-ui/agent-manager/AgentManagerApp.tsx` (+19, -19)
- `packages/kilo-vscode/webview-ui/agent-manager/NewWorktreeDialog.tsx` (+14, -1)
- `packages/kilo-vscode/webview-ui/agent-manager/agent-manager.css` (+24, -3)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/ar.ts` (+2, -1)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/br.ts` (+2, -1)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/bs.ts` (+2, -1)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/da.ts` (+2, -1)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/de.ts` (+2, -1)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/en.ts` (+2, -1)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/es.ts` (+2, -1)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/fr.ts` (+2, -1)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/ja.ts` (+2, -1)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/ko.ts` (+2, -1)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/nl.ts` (+2, -1)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/no.ts` (+2, -1)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/pl.ts` (+2, -1)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/ru.ts` (+2, -1)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/th.ts` (+2, -1)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/tr.ts` (+2, -1)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/uk.ts` (+2, -1)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/zh.ts` (+2, -1)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/zht.ts` (+2, -1)
- `packages/kilo-vscode/webview-ui/diff-virtual/DiffVirtualApp.tsx` (+2, -1)
- `packages/kilo-vscode/webview-ui/src/App.tsx` (+16, -7)
- `packages/kilo-vscode/webview-ui/src/components/chat/ChatView.tsx` (+183, -72)
- `packages/kilo-vscode/webview-ui/src/components/chat/MessageList.tsx` (+3, -1)
- `packages/kilo-vscode/webview-ui/src/components/chat/PermissionDiff.tsx` (+1, -0)
- `packages/kilo-vscode/webview-ui/src/components/chat/PromptInput.tsx` (+35, -1)
- `packages/kilo-vscode/webview-ui/src/components/settings/AutoApproveTab.tsx` (+6, -2)
- `packages/kilo-vscode/webview-ui/src/components/settings/ExperimentalTab.tsx` (+13, -0)
- `packages/kilo-vscode/webview-ui/src/components/settings/IndexingTab.tsx` (+340, -0)
- `packages/kilo-vscode/webview-ui/src/components/settings/ModeEditView.tsx` (+1, -1)
- `packages/kilo-vscode/webview-ui/src/components/settings/ModelsTab.tsx` (+35, -2)
- `packages/kilo-vscode/webview-ui/src/components/settings/ProviderConnectDialog.tsx` (+5, -1)
- `packages/kilo-vscode/webview-ui/src/components/settings/ProvidersTab.tsx` (+164, -38)
- `packages/kilo-vscode/webview-ui/src/components/settings/Settings.tsx` (+60, -2)
- `packages/kilo-vscode/webview-ui/src/components/settings/provider-visibility.ts` (+15, -1)
- `packages/kilo-vscode/webview-ui/src/components/settings/settings-io.ts` (+1, -0)
- `packages/kilo-vscode/webview-ui/src/context/config.tsx` (+7, -1)
- `packages/kilo-vscode/webview-ui/src/context/indexing-utils.ts` (+26, -0)
- `packages/kilo-vscode/webview-ui/src/context/indexing.tsx` (+84, -0)
- `packages/kilo-vscode/webview-ui/src/i18n/ar.ts` (+84, -2)
- `packages/kilo-vscode/webview-ui/src/i18n/br.ts` (+90, -1)
- `packages/kilo-vscode/webview-ui/src/i18n/bs.ts` (+91, -1)
- `packages/kilo-vscode/webview-ui/src/i18n/da.ts` (+93, -5)
- `packages/kilo-vscode/webview-ui/src/i18n/de.ts` (+93, -1)
- `packages/kilo-vscode/webview-ui/src/i18n/en.ts` (+85, -2)
- `packages/kilo-vscode/webview-ui/src/i18n/es.ts` (+92, -1)
- `packages/kilo-vscode/webview-ui/src/i18n/fr.ts` (+94, -1)
- `packages/kilo-vscode/webview-ui/src/i18n/ja.ts` (+89, -1)
- `packages/kilo-vscode/webview-ui/src/i18n/ko.ts` (+86, -1)
- `packages/kilo-vscode/webview-ui/src/i18n/nl.ts` (+90, -1)
- `packages/kilo-vscode/webview-ui/src/i18n/no.ts` (+86, -1)
- `packages/kilo-vscode/webview-ui/src/i18n/pl.ts` (+87, -1)
- `packages/kilo-vscode/webview-ui/src/i18n/ru.ts` (+90, -1)
- `packages/kilo-vscode/webview-ui/src/i18n/th.ts` (+87, -1)
- `packages/kilo-vscode/webview-ui/src/i18n/tr.ts` (+88, -1)
- `packages/kilo-vscode/webview-ui/src/i18n/uk.ts` (+87, -1)
- `packages/kilo-vscode/webview-ui/src/i18n/zh.ts` (+84, -1)
- `packages/kilo-vscode/webview-ui/src/i18n/zht.ts` (+86, -1)
- `packages/kilo-vscode/webview-ui/src/stories/StoryProviders.tsx` (+64, -21)
- `packages/kilo-vscode/webview-ui/src/stories/settings.stories.tsx` (+33, -2)
- `packages/kilo-vscode/webview-ui/src/styles/prompt-input.css` (+24, -0)
- `packages/kilo-vscode/webview-ui/src/styles/session-actions.css` (+297, -25)
- `packages/kilo-vscode/webview-ui/src/types/messages/config.ts` (+44, -0)
- `packages/kilo-vscode/webview-ui/src/types/messages/extension-messages.ts` (+10, -1)
- `packages/kilo-vscode/webview-ui/src/types/messages/webview-messages.ts` (+52, -2)
- `packages/opencode/CHANGELOG.md` (+20, -0)
- `packages/opencode/migration/20260423070820_add_icon_url_override/migration.sql` (+2, -0)
- `packages/opencode/migration/20260423070820_add_icon_url_override/snapshot.json` (+1409, -0)
- `packages/opencode/package.json` (+6, -3)
- `packages/opencode/script/build.ts` (+29, -18)
- `packages/opencode/script/publish.ts` (+1, -1)
- `packages/opencode/script/run-workspace-server` (+106, -0)
- `packages/opencode/script/schema.ts` (+1, -1)
- `packages/opencode/specs/effect/http-api.md` (+7, -9)
- `packages/opencode/specs/effect/instance-context.md` (+0, -1)
- `packages/opencode/specs/effect/schema.md` (+85, -24)
- `packages/opencode/specs/effect/tools.md` (+0, -2)
- `packages/opencode/src/cli/cmd/debug/lsp.ts` (+1, -2)
- `packages/opencode/src/cli/cmd/github.ts` (+4, -2)
- `packages/opencode/src/cli/cmd/import.ts` (+2, -2)
- `packages/opencode/src/cli/cmd/pr.ts` (+28, -9)
- `packages/opencode/src/cli/cmd/providers.ts` (+5, -2)
- `packages/opencode/src/cli/cmd/stats.ts` (+6, -2)
- `packages/opencode/src/cli/cmd/tui/app.tsx` (+2, -2)
- `packages/opencode/src/cli/cmd/tui/attach.ts` (+16, -0)
- `packages/opencode/src/cli/cmd/tui/component/dialog-provider.tsx` (+1, -1)
- `packages/opencode/src/cli/cmd/tui/config/tui.ts` (+5, -0)
- `packages/opencode/src/cli/cmd/tui/context/kv.tsx` (+28, -4)
- `packages/opencode/src/cli/cmd/tui/context/sync.tsx` (+9, -0)
- `packages/opencode/src/cli/cmd/tui/context/theme.tsx` (+8, -4)
- `packages/opencode/src/cli/cmd/tui/routes/session/footer.tsx` (+23, -0)
- `packages/opencode/src/cli/cmd/tui/routes/session/index.tsx` (+61, -21)
- `packages/opencode/src/cli/cmd/tui/routes/session/permission.tsx` (+6, -0)
- `packages/opencode/src/cli/cmd/tui/thread.ts` (+14, -0)
- `packages/opencode/src/cli/cmd/tui/util/terminal.ts` (+3, -3)
- `packages/opencode/src/cli/cmd/tui/validate-session.ts` (+24, -0)
- `packages/opencode/src/cli/upgrade.ts` (+1, -1)
- `packages/opencode/src/config/agent.ts` (+5, -10)
- `packages/opencode/src/config/config.ts` (+49, -18)
- `packages/opencode/src/config/mcp.ts` (+15, -12)
- `packages/opencode/src/config/permission.ts` (+38, -35)
- `packages/opencode/src/config/provider.ts` (+7, -5)
- `packages/opencode/src/config/server.ts` (+6, -4)
- `packages/opencode/src/control-plane/dev/debug-workspace-plugin.ts` (+73, -0)
- `packages/opencode/src/control-plane/schema.ts` (+2, -3)
- `packages/opencode/src/file/ripgrep.ts` (+283, -377)
- `packages/opencode/src/file/ripgrep.worker.ts` (+0, -102)
- `packages/opencode/src/format/index.ts` (+11, -6)
- `packages/opencode/src/index.ts` (+11, -3)
- `packages/opencode/src/installation/version.ts` (+5, -0)
- `packages/opencode/src/kilo-sessions/remote-sender.ts` (+1, -1)
- `packages/opencode/src/kilocode/bootstrap.ts` (+8, -0)
- `packages/opencode/src/kilocode/cli/cmd/tui/component/dialog-provider.tsx` (+5, -1)
- `packages/opencode/src/kilocode/cli/dev-setup.ts` (+317, -0)
- `packages/opencode/src/kilocode/commands.ts` (+9, -0)
- `packages/opencode/src/kilocode/components/dialog-indexing.tsx` (+479, -0)
- `packages/opencode/src/kilocode/components/session-indexing.tsx` (+31, -0)
- `packages/opencode/src/kilocode/config-injector.ts` (+4, -1)
- `packages/opencode/src/kilocode/config-validation.ts` (+1, -1)
- `packages/opencode/src/kilocode/config/default-plugins.ts` (+29, -0)
- `packages/opencode/src/kilocode/generate-cli-docs.ts` (+15, -2)
- `packages/opencode/src/kilocode/ignore-migrator.ts` (+4, -1)
- `packages/opencode/src/kilocode/indexing-feature.ts` (+43, -0)
- `packages/opencode/src/kilocode/indexing-label.ts` (+18, -0)
- `packages/opencode/src/kilocode/indexing.ts` (+302, -0)
- `packages/opencode/src/kilocode/kilo-commands.tsx` (+18, -0)
- `packages/opencode/src/kilocode/kilo-ripgrep-stream.ts` (+0, -23)
- `packages/opencode/src/kilocode/lancedb.ts` (+40, -0)
- `packages/opencode/src/kilocode/plugins/home-footer.tsx` (+19, -1)
- `packages/opencode/src/kilocode/review/worktree-diff.ts` (+14, -11)
- `packages/opencode/src/kilocode/server/instance.ts` (+2, -0)
- `packages/opencode/src/kilocode/server/routes/indexing.ts` (+9, -0)
- `packages/opencode/src/kilocode/session/cost-propagation.ts` (+69, -0)
- `packages/opencode/src/kilocode/session/prompt.ts` (+90, -0)
- `packages/opencode/src/kilocode/skills/kilo-config.md` (+1, -1)
- `packages/opencode/src/kilocode/ts-client.ts` (+2, -1)
- `packages/opencode/src/lsp/client.ts` (+514, -69)
- `packages/opencode/src/lsp/lsp.ts` (+60, -59)
- `packages/opencode/src/lsp/server.ts` (+9, -9)
- `packages/opencode/src/npm/config.ts` (+0, -0)
- `packages/opencode/src/npm/index.ts` (+45, -8)
- `packages/opencode/src/npmcli-config.d.ts` (+43, -0)
- `packages/opencode/src/patch/index.ts` (+13, -8)
- `packages/opencode/src/plugin/codex.ts` (+2, -0)
- `packages/opencode/src/plugin/loader.ts` (+2, -1)
- `packages/opencode/src/project/bootstrap.ts` (+2, -2)
- `packages/opencode/src/project/project.sql.ts` (+1, -0)
- `packages/opencode/src/project/project.ts` (+19, -12)
- `packages/opencode/src/project/schema.ts` (+2, -2)
- `packages/opencode/src/provider/provider.ts` (+31, -3)
- `packages/opencode/src/provider/schema.ts` (+4, -4)
- `packages/opencode/src/provider/transform.ts` (+11, -5)
- `packages/opencode/src/pty/schema.ts` (+2, -3)
- `packages/opencode/src/question/schema.ts` (+2, -3)
- `packages/opencode/src/server/routes/global.ts` (+3, -3)
- `packages/opencode/src/server/routes/instance/config.ts` (+3, -3)
- `packages/opencode/src/server/routes/instance/experimental.ts` (+3, -3)
- `packages/opencode/src/server/routes/instance/file.ts` (+1, -1)
- `packages/opencode/src/server/routes/instance/httpapi/config.ts` (+19, -3)
- `packages/opencode/src/server/routes/instance/index.ts` (+2, -1)
- `packages/opencode/src/server/routes/instance/session.ts` (+17, -13)
- `packages/opencode/src/session/compaction.ts` (+265, -47)
- `packages/opencode/src/session/message-v2.ts` (+554, -412)
- `packages/opencode/src/session/overflow.ts` (+13, -9)
- `packages/opencode/src/session/processor.ts` (+23, -0)
- `packages/opencode/src/session/prompt.ts` (+55, -55)
- `packages/opencode/src/session/revert.ts` (+2, -2)
- `packages/opencode/src/session/schema.ts` (+4, -5)
- `packages/opencode/src/session/session.sql.ts` (+1, -5)
- `packages/opencode/src/session/session.ts` (+6, -15)
- `packages/opencode/src/snapshot/index.ts` (+26, -19)
- `packages/opencode/src/storage/json-migration.ts` (+1, -0)
- `packages/opencode/src/storage/storage.ts` (+1, -1)
- `packages/opencode/src/sync/schema.ts` (+2, -3)
- `packages/opencode/src/util/bom.ts` (+31, -0)
- `packages/opencode/src/util/effect-zod.ts` (+1, -40)
- `packages/opencode/src/util/error.ts` (+4, -0)
- `packages/opencode/src/util/filesystem.ts` (+7, -2)
- `packages/opencode/src/util/named-schema-error.ts` (+54, -0)
- `packages/opencode/src/worktree/index.ts` (+3, -1)
- `packages/opencode/test/cli/pr.test.ts` (+60, -0)
- `packages/opencode/test/config/config.test.ts` (+23, -42)
- `packages/opencode/test/effect/cross-spawn-spawner.test.ts` (+3, -1)
- `packages/opencode/test/file/index.test.ts` (+4, -2)
- `packages/opencode/test/file/ripgrep.test.ts` (+2, -1)
- `packages/opencode/test/fixture/lsp/fake-lsp-server.js` (+197, -23)
- `packages/opencode/test/format/format.test.ts` (+31, -3)
- `packages/opencode/test/kilocode/ask-agent-permissions.test.ts` (+1, -1)
- `packages/opencode/test/kilocode/cli/dev-setup.test.ts` (+74, -0)
- `packages/opencode/test/kilocode/config/indexing-default-plugin.test.ts` (+83, -0)
- `packages/opencode/test/kilocode/config/opentelemetry-default.test.ts` (+5, -5)
- `packages/opencode/test/kilocode/cost-propagation.test.ts` (+94, -0)
- `packages/opencode/test/kilocode/custom-provider-delete.test.ts` (+2, -2)
- `packages/opencode/test/kilocode/external-directory-boundary.test.ts` (+95, -0)
- `packages/opencode/test/kilocode/indexing-feature.test.ts` (+44, -0)
- `packages/opencode/test/kilocode/indexing-label.test.ts` (+70, -0)
- `packages/opencode/test/kilocode/indexing-startup.test.ts` (+157, -0)
- `packages/opencode/test/kilocode/indexing-worktree.test.ts` (+74, -0)
- `packages/opencode/test/kilocode/kilo-ripgrep-stream.test.ts` (+0, -18)
- `packages/opencode/test/kilocode/lancedb-runtime.test.ts` (+116, -0)
- `packages/opencode/test/kilocode/patch.test.ts` (+172, -0)
- `packages/opencode/test/kilocode/semantic-search.test.ts` (+178, -0)
- `packages/opencode/test/kilocode/session-compaction-safety.test.ts` (+481, -0)
- `packages/opencode/test/kilocode/session-processor-empty-tool-calls.test.ts` (+71, -0)
- `packages/opencode/test/kilocode/session-prompt-compaction-safety.test.ts` (+390, -0)
- `packages/opencode/test/kilocode/session-prompt-queue.test.ts` (+33, -3)
- `packages/opencode/test/kilocode/stats-subagent-cost.test.ts` (+123, -0)
- `packages/opencode/test/kilocode/summary-file-diff.test.ts` (+28, -0)
- `packages/opencode/test/kilocode/tool-registry-indexing.test.ts` (+56, -0)
- `packages/opencode/test/lsp/client.test.ts` (+394, -10)
- `packages/opencode/test/npm.test.ts` (+37, -0)
- `packages/opencode/test/plugin/meta.test.ts` (+5, -2)
- `packages/opencode/test/project/project.test.ts` (+130, -1)
- `packages/opencode/test/provider/provider.test.ts` (+67, -2)
- `packages/opencode/test/provider/transform.test.ts` (+34, -1)
- `packages/opencode/test/session/compaction.test.ts` (+725, -75)
- `packages/opencode/test/session/message-v2.test.ts` (+70, -0)
- `packages/opencode/test/session/messages-pagination.test.ts` (+199, -1)
- `packages/opencode/test/session/prompt-effect.test.ts` (+0, -1561)
- `packages/opencode/test/session/prompt.test.ts` (+1860, -615)
- `packages/opencode/test/session/structured-output.test.ts` (+10, -10)
- `packages/opencode/test/util/effect-zod.test.ts` (+1, -116)
- `packages/plugin/package.json` (+3, -3)
- `packages/plugin/src/index.ts` (+1, -1)
- `packages/script/package.json` (+1, -1)
- `packages/sdk/js/package.json` (+1, -1)
- `packages/sdk/js/src/v2/gen/types.gen.ts` (+167, -21)
- `packages/sdk/openapi.json` (+1634, -1077)
- `packages/shared/package.json` (+1, -1)
- `packages/shared/src/filesystem.ts` (+12, -2)
- `packages/shared/src/types.d.ts` (+2, -0)
- `packages/shared/sst-env.d.ts` (+1, -1)
- `packages/shared/test/kilocode/filesystem-containment.test.ts` (+13, -0)
- `packages/storybook/package.json` (+1, -1)
- `packages/ui/package.json` (+1, -1)
- `packages/ui/src/components/icon.tsx` (+7, -2)
- `packages/ui/src/components/session-review.tsx` (+1, -1)
- `packages/ui/src/components/session-turn.tsx` (+2, -4)
- `packages/ui/src/components/timeline-playground.stories.tsx` (+1, -1)
- `packages/ui/src/context/data.tsx` (+14, -2)
- `patches/@npmcli%2Fagent@4.0.0.patch` (+13, -0)
- `script/beta.ts` (+4, -7)
- `script/extract-source-links.ts` (+1, -0)
- `script/upstream/merge.ts` (+5, -1)
- `script/upstream/package.json` (+1, -1)
- `sdks/vscode/package.json` (+1, -1)

### Key Diffs

#### packages/kilo-indexing/src/indexing/orchestrator.ts
```diff
diff --git a/packages/kilo-indexing/src/indexing/orchestrator.ts b/packages/kilo-indexing/src/indexing/orchestrator.ts
new file mode 100644
index 000000000..f20805bfc
--- /dev/null
+++ b/packages/kilo-indexing/src/indexing/orchestrator.ts
@@ -0,0 +1,396 @@
+import path from "path"
+import type { CodeIndexConfigManager } from "./config-manager"
+import { CodeIndexStateManager, type IndexingState } from "./state-manager"
+import type { IFileWatcher, BatchProcessingSummary } from "./interfaces"
+import type {
+  IndexingTelemetryEvent,
+  IndexingTelemetryMeta,
+  IndexingTelemetryMode,
+  IndexingTelemetryReporter,
+  IndexingTelemetrySource,
+  IndexingTelemetryTrigger,
+} from "./interfaces/telemetry"
+import type { IVectorStore } from "./interfaces/vector-store"
+import { DirectoryScanner } from "./processors"
+import type { CacheManager } from "./cache-manager"
+import type { Disposable } from "./runtime"
+import { Log } from "../util/log"
+import { sanitizeErrorMessage } from "./shared/validation-helpers"
+
+const log = Log.create({ service: "indexing-orchestrator" })
+
+export class CodeIndexOrchestrator {
+  private _fileWatcherSubscriptions: Disposable[] = []
+  private _isProcessing = false
+  private _cancelRequested = false
+
+  constructor(
+    private readonly configManager: CodeIndexConfigManager,
+    private readonly stateManager: CodeIndexStateManager,
+    private readonly workspacePath: string,
+    private readonly cacheManager: CacheManager,
+    private readonly vectorStore: IVectorStore,
+    private readonly scanner: DirectoryScanner,
+    private readonly fileWatcher: IFileWatcher,
+    private readonly onTelemetry?: IndexingTelemetryReporter,
+  ) {}
+
+  private getTelemetryMeta(): IndexingTelemetryMeta {
+    const cfg = this.configManager.getConfig()
+    return {
+      provider: cfg.embedderProvider,
+      vectorStore: cfg.vectorStoreProvider ?? "qdrant",
+      modelId: cfg.modelId,
+    }
```

#### packages/kilo-indexing/test/kilocode/indexing/orchestrator.test.ts
```diff
diff --git a/packages/kilo-indexing/test/kilocode/indexing/orchestrator.test.ts b/packages/kilo-indexing/test/kilocode/indexing/orchestrator.test.ts
new file mode 100644
index 000000000..7ce180ff5
--- /dev/null
+++ b/packages/kilo-indexing/test/kilocode/indexing/orchestrator.test.ts
@@ -0,0 +1,261 @@
+import { describe, expect, test } from "bun:test"
+import { CodeIndexConfigManager } from "../../../src/indexing/config-manager"
+import { CodeIndexOrchestrator } from "../../../src/indexing/orchestrator"
+import { CodeIndexStateManager } from "../../../src/indexing/state-manager"
+import type { CacheManager } from "../../../src/indexing/cache-manager"
+import type { DirectoryScanner } from "../../../src/indexing/processors/scanner"
+import type {
+  BatchProcessingSummary,
+  FileProcessingResult,
+  IFileWatcher,
+  IndexingTelemetryEvent,
+  IVectorStore,
+  PointStruct,
+  VectorStoreSearchResult,
+} from "../../../src/indexing/interfaces"
+import { Emitter } from "../../../src/indexing/runtime"
+
+class Store {
+  public clearCount = 0
+  public deleteCount = 0
+
+  constructor(
+    private readonly existing: boolean,
+    private readonly created = false,
+  ) {}
+
+  async initialize(): Promise<boolean> {
+    return this.created
+  }
+
+  async upsertPoints(_points: PointStruct[]): Promise<void> {}
+
+  async search(
+    _queryVector: number[],
+    _directoryPrefix?: string,
+    _minScore?: number,
+    _maxResults?: number,
+  ): Promise<VectorStoreSearchResult[]> {
+    return []
+  }
+
+  async deletePointsByFilePath(_filePath: string): Promise<void> {}
+  async deletePointsByMultipleFilePaths(_filePaths: string[]): Promise<void> {}
+  async clearCollection(): Promise<void> {
```

#### packages/opencode/src/agent/prompt/compaction.txt
```diff
diff --git a/packages/opencode/src/agent/prompt/compaction.txt b/packages/opencode/src/agent/prompt/compaction.txt
index 11deccb3a..c7cb838bb 100644
--- a/packages/opencode/src/agent/prompt/compaction.txt
+++ b/packages/opencode/src/agent/prompt/compaction.txt
@@ -1,15 +1,9 @@
-You are a helpful AI assistant tasked with summarizing conversations.
+You are an anchored context summarization assistant for coding sessions.
 
-When asked to summarize, provide a detailed but concise summary of the conversation.
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

#### packages/opencode/src/kilocode/agent/index.ts
```diff
diff --git a/packages/opencode/src/kilocode/agent/index.ts b/packages/opencode/src/kilocode/agent/index.ts
index 9cc4d4aaa..c5a4894d6 100644
--- a/packages/opencode/src/kilocode/agent/index.ts
+++ b/packages/opencode/src/kilocode/agent/index.ts
@@ -189,6 +189,7 @@ export function telemetryOptions(cfg: Config.Info) {
 // - Rename build → code
 // - Patch plan with readOnlyBash, mcpRules, .kilo paths
 // - Patch explore with codebase_search and conditional prompt
+// - Patch appropriate agents with semantic_search
 // - Add debug, orchestrator, ask agents
 export function patchAgents(
   agents: Record<
@@ -219,7 +220,11 @@ export function patchAgents(
 ) {
   // Rename "build" → "code" for backward compatibility
   if (agents.build) {
-    agents.code = { ...agents.build, name: "code" }
+    agents.code = {
+      ...agents.build,
+      name: "code",
+      permission: Permission.merge(defaults, Permission.fromConfig({ semantic_search: "allow" }), user),
+    }
     delete agents.build
   }
 
@@ -245,6 +250,7 @@ export function patchAgents(
             [path.join(".opencode", "plans", "*.md")]: "allow",
             [path.relative(Instance.worktree, path.join(Global.Path.data, path.join("plans", "*.md")))]: "allow",
           },
+          semantic_search: "allow",
         }),
         user,
       ),
@@ -267,6 +273,7 @@ export function patchAgents(
           websearch: "allow",
           codesearch: "allow",
           codebase_search: "allow",
+          semantic_search: "allow",
           read: "allow",
           external_directory: {
             "*": "ask",
@@ -293,6 +300,7 @@ export function patchAgents(
         question: "allow",
         suggest: "allow", // kilocode_change
         plan_enter: "allow",
+        semantic_search: "allow",
       }),
       user,
     ),
@@ -364,6 +372,7 @@ export function patchAgents(
```

#### packages/opencode/src/kilocode/tool/registry.ts
```diff
diff --git a/packages/opencode/src/kilocode/tool/registry.ts b/packages/opencode/src/kilocode/tool/registry.ts
index a59b642c3..db995da29 100644
--- a/packages/opencode/src/kilocode/tool/registry.ts
+++ b/packages/opencode/src/kilocode/tool/registry.ts
@@ -1,10 +1,11 @@
 // kilocode_change - new file
 import { CodebaseSearchTool } from "../../tool/warpgrep"
 import { RecallTool } from "../../tool/recall"
-import { Tool } from "../../tool"
+import * as Tool from "../../tool/tool"
 import { Flag } from "@/flag/flag"
-import { ProviderID } from "../../provider/schema"
 import { Effect } from "effect"
+import { KiloIndexing } from "@/kilocode/indexing"
+import { SemanticSearchTool } from "@/kilocode/tool/semantic-search"
 
 export namespace KiloToolRegistry {
   /** Resolve Kilo-specific tool Infos outside any InstanceState, so their Truncate/Agent deps are
@@ -12,16 +13,18 @@ export namespace KiloToolRegistry {
   export function infos() {
     return Effect.gen(function* () {
       const codebase = yield* CodebaseSearchTool
+      const semantic = yield* SemanticSearchTool
       const recall = yield* RecallTool
-      return { codebase, recall }
+      return { codebase, semantic, recall }
     })
   }
 
   /** Finalize Kilo-specific tools into Tool.Defs. Call this inside the InstanceState state Effect —
    * it has no Service deps beyond what Tool.init itself needs. */
-  export function build(tools: { codebase: Tool.Info; recall: Tool.Info }) {
+  export function build(tools: { codebase: Tool.Info; semantic: Tool.Info; recall: Tool.Info }) {
     return Effect.all({
       codebase: Tool.init(tools.codebase),
+      semantic: Tool.init(tools.semantic),
       recall: Tool.init(tools.recall),
     })
   }
@@ -43,10 +46,15 @@ export namespace KiloToolRegistry {
 
   /** Kilo-specific tools to append to the builtin list */
   export function extra(
-    tools: { codebase: Tool.Def; recall: Tool.Def },
+    tools: { codebase: Tool.Def; semantic: Tool.Def; recall: Tool.Def },
     cfg: { experimental?: { codebase_search?: boolean } },
   ): Tool.Def[] {
-    return [...(cfg.experimental?.codebase_search === true ? [tools.codebase] : []), tools.recall]
+    const ready = KiloIndexing.ready()
+    return [
```


*... and more files (showing first 5)*

## opencode Changes (2789b77..9d1f17d)

### Commits

- 9d1f17d - fix(ui): remove redundant flex overrides in tool components (#24749) (Brendan Allan, 2026-04-28)
- b420952 - Update VOUCHED list (github-actions[bot], 2026-04-28)
- bb9e445 - chore: generate (opencode-agent[bot], 2026-04-28)
- 528fb1d - fix: sanitize tools for moonshot (#24730) (Aiden Cline, 2026-04-27)
- c8d9f7a - refactor(app): load sync state through TanStack Query (#23792) (Brendan Allan, 2026-04-28)
- cd7ec93 - chore: generate (opencode-agent[bot], 2026-04-28)
- 796b652 - fix(httpapi): preserve mcp oauth error parity (#24706) (Kit Langton, 2026-04-27)
- 4d74849 - fix(tui): keep Zed context polling responsive (#24711) (Kit Langton, 2026-04-27)
- 937a7c4 - chore: update nix node_modules hashes (opencode-agent[bot], 2026-04-28)
- 704eb00 - chore: bump effect beta (#24705) (Kit Langton, 2026-04-27)
- bad4599 - chore: generate (opencode-agent[bot], 2026-04-28)
- 892fd85 - fix(httpapi): preserve provider oauth authorize parity (#24703) (Kit Langton, 2026-04-27)
- 0eaa47d - chore: generate (opencode-agent[bot], 2026-04-28)
- faca24d - fix(httpapi): align session boolean query parsing (#24693) (Kit Langton, 2026-04-27)
- c103202 - test(httpapi): cover session json parity (#24682) (Kit Langton, 2026-04-27)
- ce78a42 - fix(session): remove compaction summary dividers (#24677) (Kit Langton, 2026-04-27)
- c4a2353 - fix(session): omit undefined optional fields (#24676) (Kit Langton, 2026-04-27)
- 576efed - fix(httpapi): preserve optional session fields (#24671) (Kit Langton, 2026-04-27)
- dfc0075 - chore: generate (opencode-agent[bot], 2026-04-27)
- acd15dc - test(httpapi): cover full OpenAPI route inventory (#24667) (Kit Langton, 2026-04-27)
- 139c4fd - fix(session): harden shell cancellation (#24553) (Kit Langton, 2026-04-27)
- e0f3df8 - fix(tui): consume Enter in dialog useKeyboard handlers (#23390) (Cas, 2026-04-27)
- 9cd2e3a - chore: generate (opencode-agent[bot], 2026-04-27)
- f584f80 - test(httpapi): verify reflected route mounts (#24663) (Kit Langton, 2026-04-27)
- 45eac58 - fix(tui): preserve Zed context on terminal focus (#24662) (Kit Langton, 2026-04-27)
- fab1768 - feat(core): file context improvements and option to disable (#24661) (James Long, 2026-04-27)
- 51fc10e - fix(httpapi): enforce instance route parity (#24660) (Kit Langton, 2026-04-27)
- 7a1c846 - chore: generate (opencode-agent[bot], 2026-04-27)
- 5290e9c - fix(tui): stabilize Zed editor context polling (#24656) (Kit Langton, 2026-04-27)
- c361c29 - fix: ensure toolStreaming is set to off by default when using non anthropic models with anthropic sdk (#24642) (Aiden Cline, 2026-04-27)
- ccb7669 - chore: generate (opencode-agent[bot], 2026-04-27)
- f25f148 - refactor: remove module barrels (#24554) (Dax, 2026-04-27)
- 55ecb06 - fix(httpapi): accept empty session create body (#24640) (Kit Langton, 2026-04-27)
- dc6991e - fix(httpapi): mount workspace bridge routes (#24626) (Kit Langton, 2026-04-27)
- 738b306 - tweak: make interleaved reasoning_content default to true for openai compat deepseek setups (#24630) (Aiden Cline, 2026-04-27)
- 26cc537 - chore: generate (opencode-agent[bot], 2026-04-27)
- ede354b - docs: fix duplicated word in CLI env var table (#24614) (Seashore Shi, 2026-04-27)
- 61eabfc - update Go DeepSeek flash limits for cache pricing drop (#24592) (Jack, 2026-04-27)

### Changed Files by Category

#### Tool System (packages/*/src/tool/)
- `packages/opencode/src/tool/apply_patch.ts` (+1, -1)
- `packages/opencode/src/tool/bash.ts` (+3, -3)
- `packages/opencode/src/tool/edit.ts` (+1, -1)
- `packages/opencode/src/tool/external-directory.ts` (+2, -2)
- `packages/opencode/src/tool/glob.ts` (+1, -1)
- `packages/opencode/src/tool/grep.ts` (+1, -1)
- `packages/opencode/src/tool/index.ts` (+0, -3)
- `packages/opencode/src/tool/lsp.ts` (+1, -1)
- `packages/opencode/src/tool/plan.ts` (+2, -2)
- `packages/opencode/src/tool/read.ts` (+1, -1)
- `packages/opencode/src/tool/registry.ts` (+8, -6)
- `packages/opencode/src/tool/task.ts` (+2, -2)
- `packages/opencode/src/tool/tool.ts` (+2, -0)
- `packages/opencode/src/tool/truncate.ts` (+4, -2)
- `packages/opencode/src/tool/write.ts` (+1, -1)
- `packages/opencode/test/tool/apply_patch.test.ts` (+2, -2)
- `packages/opencode/test/tool/bash.test.ts` (+3, -3)
- `packages/opencode/test/tool/edit.test.ts` (+2, -2)
- `packages/opencode/test/tool/external-directory.test.ts` (+2, -2)
- `packages/opencode/test/tool/glob.test.ts` (+1, -1)
- `packages/opencode/test/tool/grep.test.ts` (+1, -1)
- `packages/opencode/test/tool/lsp.test.ts` (+3, -2)
- `packages/opencode/test/tool/question.test.ts` (+1, -1)
- `packages/opencode/test/tool/read.test.ts` (+4, -4)
- `packages/opencode/test/tool/registry.test.ts` (+1, -1)
- `packages/opencode/test/tool/skill.test.ts` (+2, -2)
- `packages/opencode/test/tool/task.test.ts` (+4, -4)
- `packages/opencode/test/tool/tool-define.test.ts` (+2, -2)
- `packages/opencode/test/tool/truncation.test.ts` (+4, -4)
- `packages/opencode/test/tool/webfetch.test.ts` (+1, -1)
- `packages/opencode/test/tool/write.test.ts` (+3, -3)

#### Agent System (packages/*/src/agent/)
- `packages/opencode/src/agent/agent.ts` (+5, -5)
- `packages/opencode/test/agent/agent.test.ts` (+4, -4)

#### Permission System (**/permission/)
- `packages/opencode/src/permission/evaluate.ts` (+1, -1)
- `packages/opencode/src/permission/index.ts` (+5, -4)

#### Event Bus (**/bus/, **/event/)
- `packages/opencode/src/bus/index.ts` (+3, -3)

#### Core (**/core/)
(no changes)

#### Other Changes
- `.github/VOUCHED.td` (+1, -0)
- `bun.lock` (+16, -20)
- `nix/hashes.json` (+4, -4)
- `package.json` (+3, -3)
- `packages/app/src/app.tsx` (+9, -1)
- `packages/app/src/components/dialog-select-mcp.tsx` (+7, -55)
- `packages/app/src/components/status-popover-body.tsx` (+4, -45)
- `packages/app/src/context/global-sync.tsx` (+84, -75)
- `packages/app/src/context/global-sync/bootstrap.ts` (+94, -100)
- `packages/app/src/context/global-sync/child-store.test.ts` (+1, -0)
- `packages/app/src/context/global-sync/child-store.ts` (+38, -10)
- `packages/console/app/src/routes/go/index.tsx` (+2, -2)
- `packages/opencode/script/schema.ts` (+1, -1)
- `packages/opencode/src/account/repo.ts` (+1, -1)
- `packages/opencode/src/acp/agent.ts` (+4, -4)
- `packages/opencode/src/acp/session.ts` (+1, -1)
- `packages/opencode/src/cli/cmd/acp.ts` (+1, -1)
- `packages/opencode/src/cli/cmd/agent.ts` (+2, -2)
- `packages/opencode/src/cli/cmd/db.ts` (+2, -2)
- `packages/opencode/src/cli/cmd/debug/agent.ts` (+3, -3)
- `packages/opencode/src/cli/cmd/debug/config.ts` (+1, -1)
- `packages/opencode/src/cli/cmd/debug/lsp.ts` (+2, -2)
- `packages/opencode/src/cli/cmd/debug/scrap.ts` (+2, -2)
- `packages/opencode/src/cli/cmd/export.ts` (+1, -1)
- `packages/opencode/src/cli/cmd/github.ts` (+6, -6)
- `packages/opencode/src/cli/cmd/import.ts` (+4, -4)
- `packages/opencode/src/cli/cmd/mcp.ts` (+2, -2)
- `packages/opencode/src/cli/cmd/models.ts` (+2, -2)
- `packages/opencode/src/cli/cmd/plug.ts` (+3, -3)
- `packages/opencode/src/cli/cmd/pr.ts` (+1, -1)
- `packages/opencode/src/cli/cmd/providers.ts` (+3, -3)
- `packages/opencode/src/cli/cmd/run.ts` (+4, -4)
- `packages/opencode/src/cli/cmd/session.ts` (+4, -4)
- `packages/opencode/src/cli/cmd/stats.ts` (+3, -3)
- `packages/opencode/src/cli/cmd/tui/app.tsx` (+14, -3)
- `packages/opencode/src/cli/cmd/tui/component/dialog-go-upsell.tsx` (+2, -0)
- `packages/opencode/src/cli/cmd/tui/component/dialog-mcp.tsx` (+1, -1)
- `packages/opencode/src/cli/cmd/tui/component/dialog-session-delete-failed.tsx` (+2, -0)
- `packages/opencode/src/cli/cmd/tui/component/dialog-session-list.tsx` (+2, -2)
- `packages/opencode/src/cli/cmd/tui/component/dialog-stash.tsx` (+1, -1)
- `packages/opencode/src/cli/cmd/tui/component/prompt/autocomplete.tsx` (+1, -1)
- `packages/opencode/src/cli/cmd/tui/component/prompt/frecency.tsx` (+1, -1)
- `packages/opencode/src/cli/cmd/tui/component/prompt/history.tsx` (+1, -1)
- `packages/opencode/src/cli/cmd/tui/component/prompt/index.tsx` (+22, -10)
- `packages/opencode/src/cli/cmd/tui/component/prompt/stash.tsx` (+1, -1)
- `packages/opencode/src/cli/cmd/tui/component/textarea-keybindings.ts` (+1, -1)
- `packages/opencode/src/cli/cmd/tui/config/tui-migrate.ts` (+2, -1)
- `packages/opencode/src/cli/cmd/tui/config/tui.ts` (+2, -1)
- `packages/opencode/src/cli/cmd/tui/context/editor-zed.ts` (+59, -26)
- `packages/opencode/src/cli/cmd/tui/context/editor.ts` (+22, -11)
- `packages/opencode/src/cli/cmd/tui/context/keybind.tsx` (+1, -1)
- `packages/opencode/src/cli/cmd/tui/context/kv.tsx` (+1, -1)
- `packages/opencode/src/cli/cmd/tui/context/local.tsx` (+1, -1)
- `packages/opencode/src/cli/cmd/tui/context/sync.tsx` (+1, -1)
- `packages/opencode/src/cli/cmd/tui/context/theme.tsx` (+1, -1)
- `packages/opencode/src/cli/cmd/tui/feature-plugins/system/plugins.tsx` (+1, -1)
- `packages/opencode/src/cli/cmd/tui/plugin/index.ts` (+0, -3)
- `packages/opencode/src/cli/cmd/tui/plugin/runtime.ts` (+3, -3)
- `packages/opencode/src/cli/cmd/tui/routes/home.tsx` (+1, -1)
- `packages/opencode/src/cli/cmd/tui/routes/session/dialog-fork-from-timeline.tsx` (+1, -1)
- `packages/opencode/src/cli/cmd/tui/routes/session/dialog-timeline.tsx` (+1, -1)
- `packages/opencode/src/cli/cmd/tui/routes/session/index.tsx` (+4, -4)
- `packages/opencode/src/cli/cmd/tui/routes/session/permission.tsx` (+2, -2)
- `packages/opencode/src/cli/cmd/tui/routes/session/sidebar.tsx` (+1, -1)
- `packages/opencode/src/cli/cmd/tui/routes/session/subagent-footer.tsx` (+1, -1)
- `packages/opencode/src/cli/cmd/tui/thread.ts` (+3, -3)
- `packages/opencode/src/cli/cmd/tui/ui/dialog-alert.tsx` (+2, -0)
- `packages/opencode/src/cli/cmd/tui/ui/dialog-confirm.tsx` (+3, -1)
- `packages/opencode/src/cli/cmd/tui/ui/dialog-export-options.tsx` (+2, -0)
- `packages/opencode/src/cli/cmd/tui/ui/dialog-help.tsx` (+2, -0)
- `packages/opencode/src/cli/cmd/tui/ui/dialog-prompt.tsx` (+2, -0)
- `packages/opencode/src/cli/cmd/tui/ui/dialog-select.tsx` (+2, -2)
- `packages/opencode/src/cli/cmd/tui/util/clipboard.ts` (+2, -0)
- `packages/opencode/src/cli/cmd/tui/util/editor.ts` (+4, -2)
- `packages/opencode/src/cli/cmd/tui/util/index.ts` (+0, -4)
- `packages/opencode/src/cli/cmd/tui/util/selection.ts` (+2, -0)
- `packages/opencode/src/cli/cmd/tui/util/sound.ts` (+3, -1)
- `packages/opencode/src/cli/cmd/tui/util/transcript.ts` (+1, -1)
- `packages/opencode/src/cli/cmd/tui/worker.ts` (+3, -3)
- `packages/opencode/src/cli/cmd/uninstall.ts` (+2, -2)
- `packages/opencode/src/cli/heap.ts` (+1, -1)
- `packages/opencode/src/cli/network.ts` (+1, -1)
- `packages/opencode/src/cli/upgrade.ts` (+1, -1)
- `packages/opencode/src/command/index.ts` (+3, -3)
- `packages/opencode/src/config/agent.ts` (+3, -3)
- `packages/opencode/src/config/command.ts` (+2, -2)
- `packages/opencode/src/config/config.ts` (+4, -2)
- `packages/opencode/src/config/index.ts` (+0, -16)
- `packages/opencode/src/config/managed.ts` (+2, -1)
- `packages/opencode/src/config/markdown.ts` (+3, -1)
- `packages/opencode/src/config/paths.ts` (+1, -1)
- `packages/opencode/src/config/variable.ts` (+1, -1)
- `packages/opencode/src/control-plane/workspace-context.ts` (+1, -1)
- `packages/opencode/src/control-plane/workspace.ts` (+8, -5)
- `packages/opencode/src/effect/app-runtime.ts` (+12, -12)
- `packages/opencode/src/effect/bootstrap-runtime.ts` (+4, -4)
- `packages/opencode/src/effect/bridge.ts` (+3, -1)
- `packages/opencode/src/effect/index.ts` (+0, -5)
- `packages/opencode/src/effect/instance-state.ts` (+3, -1)
- `packages/opencode/src/effect/run-service.ts` (+1, -1)
- `packages/opencode/src/effect/runner.ts` (+34, -18)
- `packages/opencode/src/env/index.ts` (+1, -1)
- `packages/opencode/src/file/index.ts` (+2, -2)
- `packages/opencode/src/file/ripgrep.ts` (+1, -1)
- `packages/opencode/src/file/watcher.ts` (+3, -3)
- `packages/opencode/src/format/formatter.ts` (+2, -2)
- `packages/opencode/src/format/index.ts` (+3, -3)
- `packages/opencode/src/ide/index.ts` (+2, -2)
- `packages/opencode/src/index.ts` (+4, -4)
- `packages/opencode/src/installation/index.ts` (+1, -1)
- `packages/opencode/src/lsp/client.ts` (+5, -3)
- `packages/opencode/src/lsp/index.ts` (+0, -3)
- `packages/opencode/src/lsp/launch.ts` (+1, -1)
- `packages/opencode/src/lsp/lsp.ts` (+6, -4)
- `packages/opencode/src/lsp/server.ts` (+4, -4)
- `packages/opencode/src/mcp/index.ts` (+4, -4)
- `packages/opencode/src/mcp/oauth-callback.ts` (+1, -1)
- `packages/opencode/src/mcp/oauth-provider.ts` (+1, -1)
- `packages/opencode/src/node.ts` (+4, -4)
- `packages/opencode/src/patch/index.ts` (+1, -1)
- `packages/opencode/src/plugin/codex.ts` (+1, -1)
- `packages/opencode/src/plugin/github-copilot/copilot.ts` (+1, -1)
- `packages/opencode/src/plugin/index.ts` (+5, -5)
- `packages/opencode/src/plugin/install.ts` (+1, -1)
- `packages/opencode/src/plugin/meta.ts` (+1, -1)
- `packages/opencode/src/plugin/shared.ts` (+1, -1)
- `packages/opencode/src/project/bootstrap.ts` (+4, -4)
- `packages/opencode/src/project/index.ts` (+0, -2)
- `packages/opencode/src/project/instance.ts` (+2, -2)
- `packages/opencode/src/project/project.ts` (+6, -2)
- `packages/opencode/src/project/vcs.ts` (+4, -2)
- `packages/opencode/src/provider/auth.ts` (+3, -1)
- `packages/opencode/src/provider/error.ts` (+2, -0)
- `packages/opencode/src/provider/index.ts` (+0, -5)
- `packages/opencode/src/provider/models.ts` (+4, -2)
- `packages/opencode/src/provider/provider.ts` (+22, -13)
- `packages/opencode/src/provider/sdk/copilot/index.ts` (+0, -2)
- `packages/opencode/src/provider/transform.ts` (+21, -1)
- `packages/opencode/src/pty/index.ts` (+4, -3)
- `packages/opencode/src/question/index.ts` (+2, -2)
- `packages/opencode/src/server/error.ts` (+1, -1)
- `packages/opencode/src/server/fence.ts` (+3, -2)
- `packages/opencode/src/server/mdns.ts` (+1, -1)
- `packages/opencode/src/server/middleware.ts` (+4, -4)
- `packages/opencode/src/server/projectors.ts` (+3, -2)
- `packages/opencode/src/server/proxy.ts` (+1, -1)
- `packages/opencode/src/server/routes/control/index.ts` (+1, -1)
- `packages/opencode/src/server/routes/control/workspace.ts` (+1, -1)
- `packages/opencode/src/server/routes/global.ts` (+2, -2)
- `packages/opencode/src/server/routes/instance/config.ts` (+2, -2)
- `packages/opencode/src/server/routes/instance/event.ts` (+1, -1)
- `packages/opencode/src/server/routes/instance/experimental.ts` (+18, -8)
- `packages/opencode/src/server/routes/instance/file.ts` (+1, -1)
- `packages/opencode/src/server/routes/instance/httpapi/config.ts` (+4, -5)
- `packages/opencode/src/server/routes/instance/httpapi/control.ts` (+71, -0)
- `packages/opencode/src/server/routes/instance/httpapi/event.ts` (+19, -2)
- `packages/opencode/src/server/routes/instance/httpapi/experimental.ts` (+17, -10)
- `packages/opencode/src/server/routes/instance/httpapi/file.ts` (+1, -1)
- `packages/opencode/src/server/routes/instance/httpapi/global.ts` (+101, -0)
- `packages/opencode/src/server/routes/instance/httpapi/instance.ts` (+2, -2)
- `packages/opencode/src/server/routes/instance/httpapi/mcp.ts` (+13, -2)
- `packages/opencode/src/server/routes/instance/httpapi/project.ts` (+2, -2)
- `packages/opencode/src/server/routes/instance/httpapi/provider.ts` (+26, -7)
- `packages/opencode/src/server/routes/instance/httpapi/pty.ts` (+41, -1)
- `packages/opencode/src/server/routes/instance/httpapi/public.ts` (+45, -0)
- `packages/opencode/src/server/routes/instance/httpapi/server.ts` (+3, -3)
- `packages/opencode/src/server/routes/instance/httpapi/session.ts` (+35, -11)
- `packages/opencode/src/server/routes/instance/httpapi/sync.ts` (+7, -1)
- `packages/opencode/src/server/routes/instance/httpapi/tui.ts` (+9, -5)
- `packages/opencode/src/server/routes/instance/index.ts` (+10, -2)
- `packages/opencode/src/server/routes/instance/mcp.ts` (+19, -2)
- `packages/opencode/src/server/routes/instance/project.ts` (+1, -1)
- `packages/opencode/src/server/routes/instance/provider.ts` (+4, -4)
- `packages/opencode/src/server/routes/instance/pty.ts` (+1, -1)
- `packages/opencode/src/server/routes/instance/session.ts` (+15, -5)
- `packages/opencode/src/server/routes/instance/sync.ts` (+8, -2)
- `packages/opencode/src/server/routes/instance/tui.ts` (+1, -1)
- `packages/opencode/src/server/server.ts` (+1, -1)
- `packages/opencode/src/server/workspace.ts` (+2, -2)
- `packages/opencode/src/session/compaction.ts` (+9, -9)
- `packages/opencode/src/session/index.ts` (+0, -1)
- `packages/opencode/src/session/instruction.ts` (+3, -3)
- `packages/opencode/src/session/llm.ts` (+6, -6)
- `packages/opencode/src/session/message-v2.ts` (+12, -5)
- `packages/opencode/src/session/overflow.ts` (+3, -3)
- `packages/opencode/src/session/processor.ts` (+3, -3)
- `packages/opencode/src/session/projectors.ts` (+4, -2)
- `packages/opencode/src/session/prompt.ts` (+147, -143)
- `packages/opencode/src/session/revert.ts` (+2, -2)
- `packages/opencode/src/session/run-state.ts` (+6, -4)
- `packages/opencode/src/session/session.ts` (+31, -20)
- `packages/opencode/src/session/status.ts` (+1, -1)
- `packages/opencode/src/session/summary.ts` (+1, -1)
- `packages/opencode/src/session/system.ts` (+1, -1)
- `packages/opencode/src/session/todo.ts` (+3, -1)
- `packages/opencode/src/share/index.ts` (+0, -2)
- `packages/opencode/src/share/session.ts` (+4, -2)
- `packages/opencode/src/share/share-next.ts` (+9, -6)
- `packages/opencode/src/shell/shell.ts` (+1, -1)
- `packages/opencode/src/skill/discovery.ts` (+1, -1)
- `packages/opencode/src/skill/index.ts` (+5, -5)
- `packages/opencode/src/snapshot/index.ts` (+3, -3)
- `packages/opencode/src/storage/db.ts` (+5, -3)
- `packages/opencode/src/storage/index.ts` (+0, -26)
- `packages/opencode/src/storage/json-migration.ts` (+4, -2)
- `packages/opencode/src/storage/storage.ts` (+3, -1)
- `packages/opencode/src/sync/index.ts` (+2, -1)
- `packages/opencode/src/util/archive.ts` (+2, -0)
- `packages/opencode/src/util/color.ts` (+2, -0)
- `packages/opencode/src/util/filesystem.ts` (+2, -0)
- `packages/opencode/src/util/index.ts` (+0, -12)
- `packages/opencode/src/util/keybind.ts` (+2, -0)
- `packages/opencode/src/util/local-context.ts` (+2, -0)
- `packages/opencode/src/util/locale.ts` (+2, -0)
- `packages/opencode/src/util/lock.ts` (+2, -0)
- `packages/opencode/src/util/process.ts` (+2, -0)
- `packages/opencode/src/util/rpc.ts` (+2, -0)
- `packages/opencode/src/util/schema.ts` (+15, -1)
- `packages/opencode/src/util/token.ts` (+2, -0)
- `packages/opencode/src/util/wildcard.ts` (+2, -0)
- `packages/opencode/src/v2/session.ts` (+1, -1)
- `packages/opencode/src/worktree/index.ts` (+5, -4)
- `packages/opencode/test/account/repo.test.ts` (+1, -1)
- `packages/opencode/test/account/service.test.ts` (+1, -1)
- `packages/opencode/test/cli/tui/editor-context.test.ts` (+85, -1)
- `packages/opencode/test/cli/tui/plugin-loader.test.ts` (+1, -1)
- `packages/opencode/test/cli/tui/thread.test.ts` (+1, -1)
- `packages/opencode/test/config/agent-color.test.ts` (+2, -2)
- `packages/opencode/test/config/config.test.ts` (+3, -2)
- `packages/opencode/test/config/markdown.test.ts` (+1, -1)
- `packages/opencode/test/config/tui.test.ts` (+2, -2)
- `packages/opencode/test/effect/app-runtime-logger.test.ts` (+2, -2)
- `packages/opencode/test/effect/instance-state.test.ts` (+1, -1)
- `packages/opencode/test/effect/runner.test.ts` (+17, -1)
- `packages/opencode/test/fake/provider.ts` (+1, -1)
- `packages/opencode/test/file/index.test.ts` (+1, -1)
- `packages/opencode/test/file/path-traversal.test.ts` (+1, -1)
- `packages/opencode/test/file/watcher.test.ts` (+1, -1)
- `packages/opencode/test/fixture/db.ts` (+1, -1)
- `packages/opencode/test/fixture/fixture.ts` (+1, -1)
- `packages/opencode/test/fixture/plug-worker.ts` (+1, -1)
- `packages/opencode/test/keybind.test.ts` (+1, -1)
- `packages/opencode/test/lsp/client.test.ts` (+3, -3)
- `packages/opencode/test/lsp/index.test.ts` (+2, -2)
- `packages/opencode/test/lsp/lifecycle.test.ts` (+2, -2)
- `packages/opencode/test/permission-task.test.ts` (+1, -1)
- `packages/opencode/test/plugin/auth-override.test.ts` (+1, -1)
- `packages/opencode/test/plugin/install-concurrency.test.ts` (+2, -2)
- `packages/opencode/test/plugin/install.test.ts` (+1, -1)
- `packages/opencode/test/plugin/loader-shared.test.ts` (+1, -1)
- `packages/opencode/test/plugin/meta.test.ts` (+2, -2)
- `packages/opencode/test/preload.ts` (+2, -2)
- `packages/opencode/test/project/migrate-global.test.ts` (+4, -3)
- `packages/opencode/test/project/project.test.ts` (+2, -2)
- `packages/opencode/test/project/vcs.test.ts` (+1, -1)
- `packages/opencode/test/provider/amazon-bedrock.test.ts` (+2, -2)
- `packages/opencode/test/provider/gitlab-duo.test.ts` (+1, -1)
- `packages/opencode/test/provider/provider.test.ts` (+64, -3)
- `packages/opencode/test/provider/transform.test.ts` (+145, -1)
- `packages/opencode/test/server/global-session-list.test.ts` (+3, -3)
- `packages/opencode/test/server/httpapi-bridge.test.ts` (+104, -2)
- `packages/opencode/test/server/httpapi-config.test.ts` (+1, -1)
- `packages/opencode/test/server/httpapi-event.test.ts` (+1, -1)
- `packages/opencode/test/server/httpapi-experimental.test.ts` (+3, -3)
- `packages/opencode/test/server/httpapi-file.test.ts` (+1, -1)
- `packages/opencode/test/server/httpapi-instance.test.ts` (+1, -1)
- `packages/opencode/test/server/httpapi-json-parity.test.ts` (+167, -0)
- `packages/opencode/test/server/httpapi-mcp.test.ts` (+84, -3)
- `packages/opencode/test/server/httpapi-provider.test.ts` (+152, -0)
- `packages/opencode/test/server/httpapi-pty.test.ts` (+17, -1)
- `packages/opencode/test/server/httpapi-session.test.ts` (+241, -217)
- `packages/opencode/test/server/httpapi-sync.test.ts` (+2, -2)
- `packages/opencode/test/server/httpapi-tui.test.ts` (+1, -1)
- `packages/opencode/test/server/httpapi-workspace.test.ts` (+10, -12)
- `packages/opencode/test/server/project-init-git.test.ts` (+2, -2)
- `packages/opencode/test/server/session-actions.test.ts` (+2, -2)
- `packages/opencode/test/server/session-list.test.ts` (+2, -2)
- `packages/opencode/test/server/session-messages.test.ts` (+2, -2)
- `packages/opencode/test/server/session-select.test.ts` (+2, -2)
- `packages/opencode/test/session/compaction.test.ts` (+5, -5)
- `packages/opencode/test/session/llm.test.ts` (+4, -4)
- `packages/opencode/test/session/message-v2.test.ts` (+2, -2)
- `packages/opencode/test/session/messages-pagination.test.ts` (+2, -2)
- `packages/opencode/test/session/processor-effect.test.ts` (+4, -4)
- `packages/opencode/test/session/prompt.test.ts` (+11, -7)
- `packages/opencode/test/session/revert-compact.test.ts` (+2, -2)
- `packages/opencode/test/session/schema-decoding.test.ts` (+1, -1)
- `packages/opencode/test/session/session-schema.test.ts` (+76, -0)
- `packages/opencode/test/session/session.test.ts` (+2, -2)
- `packages/opencode/test/session/snapshot-tool-race.test.ts` (+7, -7)
- `packages/opencode/test/session/structured-output-integration.test.ts` (+2, -2)
- `packages/opencode/test/share/share-next.test.ts` (+6, -5)
- `packages/opencode/test/shell/shell.test.ts` (+1, -1)
- `packages/opencode/test/skill/discovery.test.ts` (+1, -1)
- `packages/opencode/test/snapshot/snapshot.test.ts` (+1, -1)
- `packages/opencode/test/storage/db.test.ts` (+1, -1)
- `packages/opencode/test/storage/json-migration.test.ts` (+1, -1)
- `packages/opencode/test/storage/storage.test.ts` (+1, -1)
- `packages/opencode/test/sync/index.test.ts` (+1, -1)
- `packages/opencode/test/util/filesystem.test.ts` (+1, -1)
- `packages/opencode/test/util/lock.test.ts` (+1, -1)
- `packages/opencode/test/util/log.test.ts` (+1, -1)
- `packages/opencode/test/util/module.test.ts` (+1, -1)
- `packages/opencode/test/util/process.test.ts` (+1, -1)
- `packages/opencode/test/util/wildcard.test.ts` (+1, -1)
- `packages/opencode/test/workspace/workspace-restore.test.ts` (+5, -3)
- `packages/sdk/js/src/v2/gen/sdk.gen.ts` (+3, -3)
- `packages/sdk/js/src/v2/gen/types.gen.ts` (+29, -25)
- `packages/sdk/openapi.json` (+90, -57)
- `packages/ui/src/components/basic-tool.css` (+0, -11)
- `packages/ui/src/components/message-part.css` (+0, -1)
- `packages/web/src/content/docs/ar/go.mdx` (+1, -1)
- `packages/web/src/content/docs/bs/go.mdx` (+1, -1)
- `packages/web/src/content/docs/da/go.mdx` (+1, -1)
- `packages/web/src/content/docs/de/go.mdx` (+1, -1)
- `packages/web/src/content/docs/es/go.mdx` (+1, -1)
- `packages/web/src/content/docs/fr/go.mdx` (+1, -1)
- `packages/web/src/content/docs/go.mdx` (+1, -1)
- `packages/web/src/content/docs/it/cli.mdx` (+1, -1)
- `packages/web/src/content/docs/it/go.mdx` (+1, -1)
- `packages/web/src/content/docs/ja/go.mdx` (+1, -1)
- `packages/web/src/content/docs/ko/go.mdx` (+1, -1)
- `packages/web/src/content/docs/nb/go.mdx` (+1, -1)
- `packages/web/src/content/docs/pl/go.mdx` (+1, -1)
- `packages/web/src/content/docs/pt-br/go.mdx` (+1, -1)
- `packages/web/src/content/docs/ru/go.mdx` (+1, -1)
- `packages/web/src/content/docs/th/go.mdx` (+1, -1)
- `packages/web/src/content/docs/tr/go.mdx` (+1, -1)
- `packages/web/src/content/docs/zh-cn/go.mdx` (+1, -1)
- `packages/web/src/content/docs/zh-tw/go.mdx` (+1, -1)

### Key Diffs

#### packages/opencode/src/agent/agent.ts
```diff
diff --git a/packages/opencode/src/agent/agent.ts b/packages/opencode/src/agent/agent.ts
index 231e174..5e839ea 100644
--- a/packages/opencode/src/agent/agent.ts
+++ b/packages/opencode/src/agent/agent.ts
@@ -1,11 +1,11 @@
-import { Config } from "../config"
+import { Config } from "@/config/config"
 import z from "zod"
-import { Provider } from "../provider"
+import { Provider } from "@/provider/provider"
 import { ModelID, ProviderID } from "../provider/schema"
 import { generateObject, streamObject, type ModelMessage } from "ai"
-import { Truncate } from "../tool"
+import { Truncate } from "@/tool/truncate"
 import { Auth } from "../auth"
-import { ProviderTransform } from "../provider"
+import { ProviderTransform } from "@/provider/transform"
 
 import PROMPT_GENERATE from "./generate.txt"
 import PROMPT_COMPACTION from "./prompt/compaction.txt"
@@ -19,7 +19,7 @@ import path from "path"
 import { Plugin } from "@/plugin"
 import { Skill } from "../skill"
 import { Effect, Context, Layer, Schema } from "effect"
-import { InstanceState } from "@/effect"
+import { InstanceState } from "@/effect/instance-state"
 import * as Option from "effect/Option"
 import * as OtelTracer from "@effect/opentelemetry/Tracer"
 import { zod } from "@/util/effect-zod"
```

#### packages/opencode/src/bus/index.ts
```diff
diff --git a/packages/opencode/src/bus/index.ts b/packages/opencode/src/bus/index.ts
index 12251f2..9ee8e6f 100644
--- a/packages/opencode/src/bus/index.ts
+++ b/packages/opencode/src/bus/index.ts
@@ -1,9 +1,9 @@
 import { Effect, Exit, Layer, PubSub, Scope, Context, Stream, Schema } from "effect"
-import { EffectBridge } from "@/effect"
-import { Log } from "../util"
+import { EffectBridge } from "@/effect/bridge"
+import * as Log from "@opencode-ai/core/util/log"
 import { BusEvent } from "./bus-event"
 import { GlobalBus } from "./global"
-import { InstanceState } from "@/effect"
+import { InstanceState } from "@/effect/instance-state"
 import { makeRuntime } from "@/effect/run-service"
 
 const log = Log.create({ service: "bus" })
```

#### packages/opencode/src/permission/evaluate.ts
```diff
diff --git a/packages/opencode/src/permission/evaluate.ts b/packages/opencode/src/permission/evaluate.ts
index bcc4e58..2b0604f 100644
--- a/packages/opencode/src/permission/evaluate.ts
+++ b/packages/opencode/src/permission/evaluate.ts
@@ -1,4 +1,4 @@
-import { Wildcard } from "@/util"
+import { Wildcard } from "@/util/wildcard"
 
 type Rule = {
   permission: string
```

#### packages/opencode/src/permission/index.ts
```diff
diff --git a/packages/opencode/src/permission/index.ts b/packages/opencode/src/permission/index.ts
index 2dfa8e9..3fedd41 100644
--- a/packages/opencode/src/permission/index.ts
+++ b/packages/opencode/src/permission/index.ts
@@ -1,15 +1,16 @@
 import { Bus } from "@/bus"
 import { BusEvent } from "@/bus/bus-event"
 import { ConfigPermission } from "@/config/permission"
-import { InstanceState } from "@/effect"
+import { InstanceState } from "@/effect/instance-state"
 import { ProjectID } from "@/project/schema"
 import { MessageID, SessionID } from "@/session/schema"
 import { PermissionTable } from "@/session/session.sql"
-import { Database, eq } from "@/storage"
+import { Database } from "@/storage/db"
+import { eq } from "drizzle-orm"
 import { zod } from "@/util/effect-zod"
-import { Log } from "@/util"
+import * as Log from "@opencode-ai/core/util/log"
 import { withStatics } from "@/util/schema"
-import { Wildcard } from "@/util"
+import { Wildcard } from "@/util/wildcard"
 import { Deferred, Effect, Layer, Schema, Context } from "effect"
 import os from "os"
 import { evaluate as evalRule } from "./evaluate"
```

#### packages/opencode/src/tool/apply_patch.ts
```diff
diff --git a/packages/opencode/src/tool/apply_patch.ts b/packages/opencode/src/tool/apply_patch.ts
index 9a00918..2de18ad 100644
--- a/packages/opencode/src/tool/apply_patch.ts
+++ b/packages/opencode/src/tool/apply_patch.ts
@@ -8,7 +8,7 @@ import { Patch } from "../patch"
 import { createTwoFilesPatch, diffLines } from "diff"
 import { assertExternalDirectoryEffect } from "./external-directory"
 import { trimDiff } from "./edit"
-import { LSP } from "../lsp"
+import { LSP } from "@/lsp/lsp"
 import { AppFileSystem } from "@opencode-ai/core/filesystem"
 import DESCRIPTION from "./apply_patch.txt"
 import { File } from "../file"
```


*... and more files (showing first 5)*

## Recommendations

Based on the changes, the following files in Alexi should be reviewed:

- `src/agent/index.ts` - incorporate new agent patterns from packages/opencode/src/agent/prompt/compaction.txt
- `src/agent/index.ts` - incorporate new agent patterns from packages/opencode/src/kilocode/agent/index.ts
- `src/agent/index.ts` - incorporate new agent patterns from packages/opencode/test/agent/agent.test.ts
- `src/agent/index.ts` - incorporate patterns from opencode packages/opencode/src/agent/agent.ts
- `src/agent/index.ts` - incorporate patterns from opencode packages/opencode/test/agent/agent.test.ts
- `src/core/` - review core changes from packages/kilo-indexing/src/indexing/orchestrator.ts
- `src/core/` - review core changes from packages/kilo-indexing/test/kilocode/indexing/orchestrator.test.ts
- `src/permission/` - review permission changes from packages/opencode/src/permission/index.ts
- `src/permission/` - review permission changes from packages/opencode/src/permission/schema.ts
- `src/permission/` - review permission changes from packages/opencode/test/permission/next.test.ts
- `src/tool/apply_patch.test.ts` - update based on kilocode packages/opencode/test/tool/apply_patch.test.ts changes
- `src/tool/apply_patch.test.ts` - update based on opencode packages/opencode/test/tool/apply_patch.test.ts changes
- `src/tool/apply_patch.ts` - update based on kilocode packages/opencode/src/tool/apply_patch.ts changes
- `src/tool/apply_patch.ts` - update based on opencode packages/opencode/src/tool/apply_patch.ts changes
- `src/tool/bash.test.ts` - update based on opencode packages/opencode/test/tool/bash.test.ts changes
- `src/tool/bash.ts` - update based on opencode packages/opencode/src/tool/bash.ts changes
- `src/tool/edit.test.ts` - update based on kilocode packages/opencode/test/tool/edit.test.ts changes
- `src/tool/edit.test.ts` - update based on opencode packages/opencode/test/tool/edit.test.ts changes
- `src/tool/edit.ts` - update based on kilocode packages/opencode/src/tool/edit.ts changes
- `src/tool/edit.ts` - update based on opencode packages/opencode/src/tool/edit.ts changes
- `src/tool/external-directory.test.ts` - update based on opencode packages/opencode/test/tool/external-directory.test.ts changes
- `src/tool/external-directory.ts` - update based on kilocode packages/opencode/src/tool/external-directory.ts changes
- `src/tool/external-directory.ts` - update based on opencode packages/opencode/src/tool/external-directory.ts changes
- `src/tool/glob.test.ts` - update based on kilocode packages/opencode/test/tool/glob.test.ts changes
- `src/tool/glob.test.ts` - update based on opencode packages/opencode/test/tool/glob.test.ts changes
- `src/tool/glob.ts` - update based on opencode packages/opencode/src/tool/glob.ts changes
- `src/tool/grep.test.ts` - update based on opencode packages/opencode/test/tool/grep.test.ts changes
- `src/tool/grep.ts` - update based on opencode packages/opencode/src/tool/grep.ts changes
- `src/tool/grep.txt.ts` - update based on kilocode packages/opencode/src/tool/grep.txt changes
- `src/tool/index.ts` - update based on opencode packages/opencode/src/tool/index.ts changes
- `src/tool/lsp.test.ts` - update based on opencode packages/opencode/test/tool/lsp.test.ts changes
- `src/tool/lsp.ts` - update based on kilocode packages/opencode/src/tool/lsp.ts changes
- `src/tool/lsp.ts` - update based on opencode packages/opencode/src/tool/lsp.ts changes
- `src/tool/multiedit.ts` - update based on kilocode packages/opencode/src/tool/multiedit.ts changes
- `src/tool/multiedit.txt.ts` - update based on kilocode packages/opencode/src/tool/multiedit.txt changes
- `src/tool/plan.ts` - update based on opencode packages/opencode/src/tool/plan.ts changes
- `src/tool/question.test.ts` - update based on opencode packages/opencode/test/tool/question.test.ts changes
- `src/tool/read.test.ts` - update based on opencode packages/opencode/test/tool/read.test.ts changes
- `src/tool/read.ts` - update based on kilocode packages/opencode/src/tool/read.ts changes
- `src/tool/read.ts` - update based on opencode packages/opencode/src/tool/read.ts changes
- `src/tool/registry.test.ts` - update based on opencode packages/opencode/test/tool/registry.test.ts changes
- `src/tool/registry.ts` - update based on kilocode packages/opencode/src/kilocode/tool/registry.ts changes
- `src/tool/registry.ts` - update based on kilocode packages/opencode/src/tool/registry.ts changes
- `src/tool/registry.ts` - update based on opencode packages/opencode/src/tool/registry.ts changes
- `src/tool/schema.ts` - update based on kilocode packages/opencode/src/tool/schema.ts changes
- `src/tool/semantic-search.ts` - update based on kilocode packages/opencode/src/kilocode/tool/semantic-search.ts changes
- `src/tool/semantic-search.txt.ts` - update based on kilocode packages/opencode/src/kilocode/tool/semantic-search.txt changes
- `src/tool/skill.test.ts` - update based on kilocode packages/opencode/test/tool/skill.test.ts changes
- `src/tool/skill.test.ts` - update based on opencode packages/opencode/test/tool/skill.test.ts changes
- `src/tool/task.test.ts` - update based on kilocode packages/opencode/test/tool/task.test.ts changes
- `src/tool/task.test.ts` - update based on opencode packages/opencode/test/tool/task.test.ts changes
- `src/tool/task.ts` - update based on kilocode packages/opencode/src/tool/task.ts changes
- `src/tool/task.ts` - update based on opencode packages/opencode/src/tool/task.ts changes
- `src/tool/tool-define.test.ts` - update based on opencode packages/opencode/test/tool/tool-define.test.ts changes
- `src/tool/tool.ts` - update based on opencode packages/opencode/src/tool/tool.ts changes
- `src/tool/truncate.ts` - update based on opencode packages/opencode/src/tool/truncate.ts changes
- `src/tool/truncation.test.ts` - update based on opencode packages/opencode/test/tool/truncation.test.ts changes
- `src/tool/webfetch.test.ts` - update based on opencode packages/opencode/test/tool/webfetch.test.ts changes
- `src/tool/write.test.ts` - update based on kilocode packages/opencode/test/tool/write.test.ts changes
- `src/tool/write.test.ts` - update based on opencode packages/opencode/test/tool/write.test.ts changes
- `src/tool/write.ts` - update based on kilocode packages/opencode/src/tool/write.ts changes
- `src/tool/write.ts` - update based on opencode packages/opencode/src/tool/write.ts changes
