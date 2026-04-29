# Upstream Changes Report
Generated: 2026-04-29 08:21:43

## Summary
- kilocode: 125 commits, 319 files changed
- opencode: 32 commits, 113 files changed

## kilocode Changes (2a6c3e7d5..34787b484)

### Commits

- 34787b484 - Merge pull request #9634 from Kilo-Org/mark/update-translator-agent (Mark IJbema, 2026-04-29)
- 1412583ce - Merge pull request #9633 from Kilo-Org/preserve-free-in-model-names (Christiaan Arnoldus, 2026-04-29)
- d94ebcf29 - Merge pull request #9625 from Kilo-Org/fix/model-switching-v2 (Marian Alexandru Alecu, 2026-04-29)
- be0ea1990 - Merge pull request #9643 from Kilo-Org/catrielmuller/fix-kiloclaw-connection (Catriel Müller, 2026-04-28)
- 6916bf42e - test(cli): add bin/kilo syntax regression guard (#6464) (Ashwinhegde19, 2026-04-28)
- b59a14cdf - Merge pull request #9640 from Kilo-Org/fix/kilo-ui-agent-manager-icons (Kirill Kalishev, 2026-04-28)
- bf1ad63b3 - Merge branch 'main' into fix/kilo-ui-agent-manager-icons (Kirill Kalishev, 2026-04-28)
- e64fe5578 - fix: vscode kiloclaw error handler (Catriel Müller, 2026-04-28)
- f4a386335 - fix: add nix support for bun 1.3.13 (Catriel Müller, 2026-04-28)
- 77326b717 - fix(ui): move agent manager icons into kilo-ui (kirillk, 2026-04-28)
- ecc6e8374 - Merge pull request #9637 from Kilo-Org/bronzed-run (Kirill Kalishev, 2026-04-28)
- 374bb1a1d - Merge branch 'main' into bronzed-run (Kirill Kalishev, 2026-04-28)
- 6ae6a5696 - Merge pull request #9635 from Kilo-Org/mark/ghcr-rename-to-kilocode (Mark IJbema, 2026-04-28)
- 3b88d2a5c - fix(cli): include shell scripts in annotation check (kirillk, 2026-04-28)
- cf80826d5 - fix(cli): check annotations across shared upstream paths (kirillk, 2026-04-28)
- 5325fff66 - docs: move GHCR follow-up out of RELEASING.md into the PR (Mark IJbema, 2026-04-28)
- cbe55103b - fix(cli): publish docker image to ghcr.io/kilo-org/kilocode (Mark IJbema, 2026-04-28)
- 4dbe0b1e5 - cherr-pick from opencode: sync (Frank, 2026-04-28)
- 0918bb421 - fix(vscode): preserve 'Free' in model names like 'Kilo Auto Free' (kiloconnect[bot], 2026-04-28)
- 6130a3ea6 - fix: show paid Kilo models when signed out (#9628) (Marius, 2026-04-28)
- 00ac884f8 - docs: clarify issue template requirements (#7832) (Santiago Sainz, 2026-04-28)
- 6908f8ae6 - fix(agent-manager): start new tasks in selected worktree (#9614) (Marius, 2026-04-28)
- 385d7fe85 - chore(cli): annotate model validation change (Alex Alecu, 2026-04-28)
- 63940853d - fix(cli): scope model overrides (Alex Alecu, 2026-04-28)
- 6c0c33b8f - fix(cli): correct changeset package (Alex Alecu, 2026-04-28)
- 2c7a3e67a - Merge pull request #9624 from Kilo-Org/mark/upstream-mergiraf (Mark IJbema, 2026-04-28)
- 98654b289 - fix(upstream): skip mergiraf for non-textual conflicts (delete/modify, binary) (Mark IJbema, 2026-04-28)
- 80d848d3e - feat(upstream): use zdiff3 conflict markers during upstream merge (Mark IJbema, 2026-04-28)
- e6f387e2d - chore(upstream): disable mergiraf .orig backups (Mark IJbema, 2026-04-28)
- 24146a217 - fix(upstream): preserve partial mergiraf results without staging them (Mark IJbema, 2026-04-28)
- 1e01ac3ce - chore: add model default restart changeset (Alex Alecu, 2026-04-28)
- 43d3cc838 - fix(cli): prefer configured agent models on restart (Alex Alecu, 2026-04-28)
- 77d8ebb33 - test(cli): cover configured agent model restart behavior (Alex Alecu, 2026-04-28)
- 37b444060 - fix(upstream): make runMergiraf resilient to per-file failures (Mark IJbema, 2026-04-28)
- 04e33c816 - Merge pull request #9450 from Kilo-Org/fix/hanging-sessions-v2 (Marian Alexandru Alecu, 2026-04-28)
- 815e44a04 - chore(upstream): run mergiraf on conflicted files during upstream merge (kiloconnect[bot], 2026-04-28)
- f2b73dbfa - Merge pull request #9619 from Kilo-Org/mark/upstream-skip-files-fixes (Mark IJbema, 2026-04-28)
- 28a0eae4b - fix(cli): keep semantic indexing startup responsive (#9613) (Marius, 2026-04-28)
- c05d382c4 - style(review): reduce comments (Alex Alecu, 2026-04-28)
- bc5816663 - fix(cli): skip .github/VOUCHED.td and surface git rm errors in upstream merge (Mark IJbema, 2026-04-28)
- 0907c6f46 - fix(cli): isolate indexing from tool registry (#9615) (Marius, 2026-04-28)
- 5a7c83aa0 - Merge branch 'main' into fix/hanging-sessions-v2 (Marian Alexandru Alecu, 2026-04-28)
- 3a254d0d1 - Merge pull request #9603 from Kilo-Org/fix/windows-worktree-cleanup-retry (Marian Alexandru Alecu, 2026-04-28)
- 7a6fbb7d9 - Merge branch 'main' into fix/windows-worktree-cleanup-retry (Marian Alexandru Alecu, 2026-04-28)
- a63eb7481 - Merge pull request #9617 from Kilo-Org/mark/upstream-merge-chdir-repo-root (Mark IJbema, 2026-04-28)
- 85cab8764 - fix(cli): chdir to repo root in upstream merge script (Mark IJbema, 2026-04-28)
- fbee6d7ba - Merge pull request #9609 from Kilo-Org/mark/upstream-list-versions-merged-flag (Mark IJbema, 2026-04-28)
- 38cc0297a - feat(cli): show which upstream versions are already merged in list-versions (Mark IJbema, 2026-04-28)
- 398e744f7 - Merge pull request #9608 from Kilo-Org/session/agent_7a4af3d1-cd25-4ffd-aa3a-4061f0c39767 (Mark IJbema, 2026-04-28)
- 8ba9ea316 - Merge pull request #9598 from Kilo-Org/mark/md-table-padding-check (Mark IJbema, 2026-04-28)
- 99b861611 - Merge pull request #9606 from Kilo-Org/mark/upstream-script-pin-bun-types (Mark IJbema, 2026-04-28)
- 255f30f89 - chore: bump version to 7.2.26 (kiloconnect[bot], 2026-04-28)
- cdfe3b693 - fix(cli): pin @types/bun in script/upstream so bun install works standalone (Mark IJbema, 2026-04-28)
- f9ca3f72e - Merge branch 'main' into mark/md-table-padding-check (Mark IJbema, 2026-04-28)
- 8078944ad - Merge pull request #9574 from Kilo-Org/imanolmaiztegui/kilo-opencode-v1.14.23 (Mark IJbema, 2026-04-28)
- 6794b4c00 - chore(cli): annotate cleanup helper usage (Alex Alecu, 2026-04-28)
- d44f65576 - refactor(cli): isolate Windows cleanup helpers (Alex Alecu, 2026-04-28)
- 4145e48e8 - fix(cli): retry Windows worktree cleanup locks (Alex Alecu, 2026-04-28)
- e902880bd - ran ./script/generate.ts (Mark IJbema, 2026-04-28)
- 8671a5708 - Fix semantic merge with indexing code (Mark IJbema, 2026-04-28)
- dee9d86a8 - chore: exempt .opencode/glossary from md-table-padding check (kiloconnect[bot], 2026-04-28)
- c52384c87 - Merge branch 'main' into fix/hanging-sessions-v2 (Marian Alexandru Alecu, 2026-04-28)
- f1dd60249 - Merge branch 'main' into fix/hanging-sessions-v2 (Marian Alexandru Alecu, 2026-04-28)
- acfd742b0 - fix: enforce exact separator form in md-table-padding check (kiloconnect[bot], 2026-04-28)
- 06cd80d1b - chore: enforce minimal markdown table formatting (kiloconnect[bot], 2026-04-28)
- 72c19f2cf - Merge remote-tracking branch 'origin/main' into fix/hanging-sessions-v2 (Alex Alecu, 2026-04-28)
- b037746c7 - docs: keep markdown tables minimal (Mark IJbema, 2026-04-28)
- aef45c48d - Merge remote-tracking branch 'origin/main' into imanolmaiztegui/kilo-opencode-v1.14.23 (Mark IJbema, 2026-04-28)
- 5ac8a7c97 - build(opencode): replace models-snapshot inline data with stub and ignore generated files (Imanol Maiztegui, 2026-04-27)
- 2c819613f - fix(opencode): align test expectations with kilocode package rename and schema (Imanol Maiztegui, 2026-04-27)
- 057355709 - test(opencode): update tool parameter snapshots and assertions for schema changes (Imanol Maiztegui, 2026-04-27)
- bb7ee00b0 - refactor(kilo-indexing): migrate BusEvent and SemanticSearchTool schemas from zod to effect Schema (Imanol Maiztegui, 2026-04-27)
- 27a4db57e - Merge branch 'main' into imanolmaiztegui/kilo-opencode-v1.14.23 (Imanol Maiztegui, 2026-04-27)
- 85eb4fa69 - chore: regenerate SDK (Imanol Maiztegui, 2026-04-27)
- d4e44b612 - fix(kilo-sessions): apply type-erasure workaround for Bus.subscribe schema mismatches (Imanol Maiztegui, 2026-04-27)
- 24d1f693e - refactor(opencode): migrate zod schemas to effect Schema across kilo modules (Imanol Maiztegui, 2026-04-27)
- fd8818e48 - resolve merge conflicts (Imanol Maiztegui, 2026-04-27)
- 108dfe323 - refactor: kilo compat for v1.14.23 (Imanol Maiztegui, 2026-04-27)
- 659c4ac9b - Merge branch 'main' into fix/hanging-sessions-v2 (Marian Alexandru Alecu, 2026-04-27)
- bf005d25e - Merge branch 'main' into fix/hanging-sessions-v2 (Marian Alexandru Alecu, 2026-04-27)
- 167a6d2e2 - fix(vscode): prune stale permissionDirectories entries (Alex Alecu, 2026-04-27)
- 33c698205 - Merge branch 'fix/hanging-sessions-v2' of https://github.com/Kilo-Org/kilocode into fix/hanging-sessions-v2 (Alex Alecu, 2026-04-27)
- 8d17b7650 - chore: fix checks after main merge (Alex Alecu, 2026-04-27)
- 626ce93c2 - Merge remote-tracking branch 'origin/main' into fix/hanging-sessions-v2 (Alex Alecu, 2026-04-27)
- 3c6b8f67b - Merge branch 'main' into fix/hanging-sessions-v2 (Marian Alexandru Alecu, 2026-04-27)
- 9219f810e - Merge remote-tracking branch 'origin/main' into fix/hanging-sessions-v2 (Alex Alecu, 2026-04-27)
- 3d31ae28b - release: v1.14.23 (opencode, 2026-04-24)
- f8e939d96 - fix: support `max` for deepseek (#24163) (Aiden Cline, 2026-04-24)
- 923af96d2 - fix: preserve empty reasoning_content for DeepSeek V4 thinking mode (#24146) (黑墨水鱼, 2026-04-24)
- a882e958b - fix: deepseek variants (#24157) (Aiden Cline, 2026-04-24)
- 2cda629c8 - test(prompt): align shell placeholder expectation (#24147) (Simon Klee, 2026-04-24)
- f033d2d8f - fix(app): conditionally show model variant selector (#24115) (Brendan Allan, 2026-04-24)
- a4bd88ab9 - zen: deepseek v4 pro (Frank, 2026-04-24)
- f4616c826 - sync (Frank, 2026-04-24)
- 4712f0f3c - feat(prompt): add shell mode UI with cancel button, custom icon, and example placeholder (#24105) (Brendan Allan, 2026-04-24)
- 6c1268f3b - chore: generate (opencode-agent[bot], 2026-04-24)
- 2e156b899 - fix(desktop): avoid relaunching without installing updates (#23806) (Brendan Allan, 2026-04-24)
- 3bfe6a1ef - ci: add platform-specific bun install flags (#23822) (Brendan Allan, 2026-04-24)
- 2032fe4c4 - core: let stale permission prompts clear instead of leaving VS Code approvals stuck (Alex Alecu, 2026-04-24)
- 5c5069b62 - chore: generate (opencode-agent[bot], 2026-04-23)
- f8c6ddd4c - feat(truncate): allow configuring tool output truncation limits (#23770) (rahul, 2026-04-23)
- e50a688ca - feat(httpapi): bridge workspace read endpoints (#24062) (Kit Langton, 2026-04-23)
- 334ab4707 - fix: account for additional openai retry case (#24063) (Aiden Cline, 2026-04-23)
- 87321942f - chore: update copilot readme to symlink to an agents md to prevent dumbass agents from touching these files (#24057) (Aiden Cline, 2026-04-23)
- a77185936 - chore: generate (opencode-agent[bot], 2026-04-23)
- 31d01d404 - refactor(control-plane): migrate workspace DTO schemas (#24056) (Kit Langton, 2026-04-23)
- 814e83ffe - docs: update effect schema migration tracker (#24054) (Kit Langton, 2026-04-23)
- 4c3e65c87 - chore: generate (opencode-agent[bot], 2026-04-23)
- 98ea5b6e7 - feat(tui): support builtin protocol for handling context from editors (#24034) (James Long, 2026-04-23)
- 3f8c65905 - chore: generate (opencode-agent[bot], 2026-04-23)
- 3910a6e52 - refactor(tool): migrate tool framework + all 18 built-in tools to Effect Schema (#23244) (Kit Langton, 2026-04-23)
- 24892559a - chore: generate (opencode-agent[bot], 2026-04-23)
- cd93533b1 - refactor(bus): migrate BusEvent to Effect Schema (#24040) (Kit Langton, 2026-04-23)
- 059045245 - refactor(schema): use Schema.Int and consolidate PositiveInt/NonNegativeInt (#24029) (Kit Langton, 2026-04-23)
- 93940a185 - refactor(provider): migrate provider domain to Effect Schema (#24027) (Kit Langton, 2026-04-23)
- 1e439b822 - sync (Frank, 2026-04-23)
- 8b2f8355b - docs(schema): mark sync/index.ts migrated with compat-bridge note (#24024) (Kit Langton, 2026-04-23)
- aed03078f - chore: generate (opencode-agent[bot], 2026-04-23)
- c50d65b4d - refactor(sync): make session events schema-first (#24019) (Kit Langton, 2026-04-23)
- 353532b1c - chore: generate (opencode-agent[bot], 2026-04-23)
- 9df7c78eb - fix(npm): respect npmrc for version lookups (#24016) (Shoubhit Dash, 2026-04-23)
- eb7555d3c - sync release versions for v1.14.22 (opencode, 2026-04-23)
- 2cd89d64e - chore: generate (opencode-agent[bot], 2026-04-23)
- 0517ab469 - refactor(session): migrate session domain to Effect Schema (#24005) (Kit Langton, 2026-04-23)
- bbf67d0ff - fix(tui): render all non-synthetic text parts of a user message (#24009) (James Long, 2026-04-23)

### Changed Files by Category

#### Tool System (packages/*/src/tool/)
- `packages/opencode/src/kilocode/tool/registry.ts` (+48, -12)
- `packages/opencode/src/kilocode/tool/semantic-search.ts` (+13, -11)
- `packages/opencode/src/tool/apply_patch.ts` (+10, -7)
- `packages/opencode/src/tool/bash.ts` (+23, -26)
- `packages/opencode/src/tool/codesearch.ts` (+17, -18)
- `packages/opencode/src/tool/edit.ts` (+11, -8)
- `packages/opencode/src/tool/glob.ts` (+9, -11)
- `packages/opencode/src/tool/grep.ts` (+12, -6)
- `packages/opencode/src/tool/invalid.ts` (+7, -6)
- `packages/opencode/src/tool/lsp.ts` (+13, -8)
- `packages/opencode/src/tool/plan.ts` (+4, -3)
- `packages/opencode/src/tool/question.ts` (+6, -7)
- `packages/opencode/src/tool/read.ts` (+22, -9)
- `packages/opencode/src/tool/recall.ts` (+15, -8)
- `packages/opencode/src/tool/registry.ts` (+12, -2)
- `packages/opencode/src/tool/skill.ts` (+4, -5)
- `packages/opencode/src/tool/task.ts` (+16, -15)
- `packages/opencode/src/tool/todo.ts` (+18, -8)
- `packages/opencode/src/tool/tool.ts` (+46, -28)
- `packages/opencode/src/tool/truncate.ts` (+20, -4)
- `packages/opencode/src/tool/warpgrep.ts` (+6, -7)
- `packages/opencode/src/tool/webfetch.ts` (+11, -11)
- `packages/opencode/src/tool/websearch.ts` (+16, -19)
- `packages/opencode/src/tool/write.ts` (+9, -5)
- `packages/opencode/test/tool/__snapshots__/parameters.test.ts.snap` (+509, -0)
- `packages/opencode/test/tool/parameters.test.ts` (+262, -0)
- `packages/opencode/test/tool/tool-define.test.ts` (+43, -3)
- `packages/opencode/test/tool/truncation.test.ts` (+64, -0)

#### Agent System (packages/*/src/agent/)
- `.opencode/agent/translator.md` (+0, -899)

#### Permission System (**/permission/)
- `packages/opencode/src/permission/index.ts` (+16, -16)
- `packages/opencode/test/kilocode/permission/next.always-rules.test.ts` (+3, -3)
- `packages/opencode/test/kilocode/permission/next.reply-http.test.ts` (+206, -0)
- `packages/opencode/test/kilocode/permission/next.reply-routing.test.ts` (+184, -0)
- `packages/opencode/test/permission/next.test.ts` (+7, -2)

#### Event Bus (**/bus/, **/event/)
- `packages/opencode/src/bus/bus-event.ts` (+12, -8)
- `packages/opencode/src/bus/index.ts` (+10, -15)
- `packages/opencode/test/bus/bus-effect.test.ts` (+3, -4)
- `packages/opencode/test/bus/bus-integration.test.ts` (+3, -3)
- `packages/opencode/test/bus/bus.test.ts` (+3, -3)

#### Core (**/core/)
(no changes)

#### Other Changes
- `.changeset/brave-indexing-startup.md` (+5, -0)
- `.changeset/fix-agent-model-default-restart.md` (+5, -0)
- `.changeset/fix-permission-reply-hang.md` (+6, -0)
- `.changeset/ghcr-docker-image-rename.md` (+5, -0)
- `.changeset/preserve-free-in-model-names.md` (+5, -0)
- `.changeset/show-paid-models-anonymous.md` (+7, -0)
- `.changeset/tool-registry-indexing.md` (+5, -0)
- `.changeset/windows-worktree-cleanup.md` (+5, -0)
- `.changeset/worktree-new-task.md` (+5, -0)
- `.github/actions/setup-bun/action.yml` (+7, -2)
- `.github/pull_request_template.md` (+2, -2)
- `.github/workflows/check-md-table-padding.yml` (+24, -0)
- `.github/workflows/check-opencode-annotations.yml` (+14, -4)
- `.github/workflows/watch-opencode-releases.yml` (+2, -3)
- `.kilocode/skills/vscode-visual-regression/SKILL.md` (+14, -14)
- `.opencode/command/translate.md` (+14, -0)
- `.prettierignore` (+9, -0)
- `.vscode/extensions.json` (+2, -1)
- `AGENTS.md` (+38, -18)
- `CONTRIBUTING.md` (+47, -9)
- `RELEASING.md` (+11, -11)
- `SECURITY.md` (+7, -7)
- `TESTING.md` (+2, -4)
- `flake.lock` (+3, -3)
- `flake.nix` (+55, -1)
- `packages/app/src/components/prompt-input.tsx` (+46, -35)
- `packages/app/src/components/prompt-input/placeholder.test.ts` (+1, -1)
- `packages/app/src/components/prompt-input/placeholder.ts` (+1, -1)
- `packages/app/src/components/settings-general.tsx` (+18, -20)
- `packages/app/src/context/platform.tsx` (+3, -3)
- `packages/app/src/i18n/ar.ts` (+1, -1)
- `packages/app/src/i18n/br.ts` (+1, -1)
- `packages/app/src/i18n/bs.ts` (+1, -1)
- `packages/app/src/i18n/da.ts` (+1, -1)
- `packages/app/src/i18n/de.ts` (+1, -1)
- `packages/app/src/i18n/en.ts` (+1, -1)
- `packages/app/src/i18n/es.ts` (+1, -1)
- `packages/app/src/i18n/fr.ts` (+3, -5)
- `packages/app/src/i18n/ja.ts` (+1, -1)
- `packages/app/src/i18n/ko.ts` (+1, -1)
- `packages/app/src/i18n/no.ts` (+1, -1)
- `packages/app/src/i18n/pl.ts` (+1, -1)
- `packages/app/src/i18n/ru.ts` (+1, -1)
- `packages/app/src/i18n/th.ts` (+2, -3)
- `packages/app/src/i18n/tr.ts` (+1, -1)
- `packages/app/src/i18n/zh.ts` (+1, -1)
- `packages/app/src/i18n/zht.ts` (+2, -3)
- `packages/app/src/pages/error.tsx` (+2, -3)
- `packages/app/src/pages/layout.tsx` (+2, -3)
- `packages/app/src/pages/session/use-session-commands.tsx` (+1, -3)
- `packages/desktop-electron/src/main/index.ts` (+17, -4)
- `packages/desktop-electron/src/renderer/index.tsx` (+1, -1)
- `packages/desktop/src/index.tsx` (+7, -2)
- `packages/kilo-docs/AGENTS.md` (+12, -12)
- `packages/kilo-docs/docs/getting-started/devcontainer-persistence.md` (+5, -5)
- `packages/kilo-docs/docs/getting-started/switching-from-cline.md` (+9, -9)
- `packages/kilo-docs/mappingplan.md` (+134, -134)
- `packages/kilo-docs/markdoc/partials/cli-commands-table.md` (+1, -1)
- `packages/kilo-docs/pages/ai-providers/groq.md` (+7, -7)
- `packages/kilo-docs/pages/ai-providers/index.md` (+6, -6)
- `packages/kilo-docs/pages/automate/agent-manager-workflows.md` (+12, -12)
- `packages/kilo-docs/pages/automate/agent-manager.md` (+32, -32)
- `packages/kilo-docs/pages/automate/auto-triage/overview.md` (+21, -21)
- `packages/kilo-docs/pages/automate/code-reviews/github.md` (+14, -14)
- `packages/kilo-docs/pages/automate/code-reviews/gitlab.md` (+8, -8)
- `packages/kilo-docs/pages/automate/code-reviews/overview.md` (+4, -4)
- `packages/kilo-docs/pages/automate/extending/plugins.md` (+42, -42)
- `packages/kilo-docs/pages/automate/extending/shell-integration.md` (+3, -3)
- `packages/kilo-docs/pages/automate/how-tools-work.md` (+57, -57)
- `packages/kilo-docs/pages/automate/integrations.md` (+4, -4)
- `packages/kilo-docs/pages/automate/mcp/mcp-vs-api.md` (+8, -8)
- `packages/kilo-docs/pages/automate/mcp/server-transports.md` (+13, -13)
- `packages/kilo-docs/pages/automate/mcp/using-in-cli.md` (+21, -21)
- `packages/kilo-docs/pages/automate/mcp/using-in-kilo-code.md` (+37, -37)
- `packages/kilo-docs/pages/automate/tools/index.md` (+17, -17)
- `packages/kilo-docs/pages/code-with-ai/agents/auto-model.md` (+5, -5)
- `packages/kilo-docs/pages/code-with-ai/agents/chat-interface.md` (+6, -6)
- `packages/kilo-docs/pages/code-with-ai/agents/context-mentions.md` (+89, -89)
- `packages/kilo-docs/pages/code-with-ai/agents/custom-models.md` (+28, -28)
- `packages/kilo-docs/pages/code-with-ai/agents/using-agents.md` (+101, -101)
- `packages/kilo-docs/pages/code-with-ai/features/browser-use.md` (+18, -18)
- `packages/kilo-docs/pages/code-with-ai/platforms/cli-reference.md` (+1, -1)
- `packages/kilo-docs/pages/code-with-ai/platforms/cli.md` (+51, -51)
- `packages/kilo-docs/pages/code-with-ai/platforms/slack.md` (+4, -4)
- `packages/kilo-docs/pages/collaborate/adoption-dashboard/for-team-leads.md` (+18, -18)
- `packages/kilo-docs/pages/collaborate/adoption-dashboard/improving-your-score.md` (+19, -19)
- `packages/kilo-docs/pages/collaborate/adoption-dashboard/overview.md` (+12, -12)
- `packages/kilo-docs/pages/collaborate/adoption-dashboard/understanding-your-score.md` (+7, -7)
- `packages/kilo-docs/pages/collaborate/enterprise/audit-logs.md` (+10, -10)
- `packages/kilo-docs/pages/collaborate/enterprise/migration.md` (+15, -15)
- `packages/kilo-docs/pages/collaborate/enterprise/model-access-controls.md` (+11, -11)
- `packages/kilo-docs/pages/collaborate/teams/custom-modes-org.md` (+9, -9)
- `packages/kilo-docs/pages/contributing/architecture/agent-observability.md` (+5, -5)
- `packages/kilo-docs/pages/contributing/architecture/auto-model-tiers.md` (+26, -26)
- `packages/kilo-docs/pages/contributing/architecture/benchmarking.md` (+27, -27)
- `packages/kilo-docs/pages/contributing/architecture/features.md` (+12, -12)
- `packages/kilo-docs/pages/contributing/architecture/index.md` (+24, -24)
- `packages/kilo-docs/pages/customize/agents-md.md` (+21, -21)
- `packages/kilo-docs/pages/customize/context/context-condensing.md` (+26, -26)
- `packages/kilo-docs/pages/customize/custom-modes.md` (+68, -68)
- `packages/kilo-docs/pages/customize/custom-subagents.md` (+21, -21)
- `packages/kilo-docs/pages/customize/skills.md` (+12, -12)
- `packages/kilo-docs/pages/customize/workflows.md` (+6, -6)
- `packages/kilo-docs/pages/deploy-secure/managed-indexing.md` (+5, -5)
- `packages/kilo-docs/pages/deploy-secure/security-reviews.md` (+23, -23)
- `packages/kilo-docs/pages/gateway/api-reference.md` (+10, -10)
- `packages/kilo-docs/pages/gateway/authentication.md` (+23, -23)
- `packages/kilo-docs/pages/gateway/models-and-providers.md` (+34, -34)
- `packages/kilo-docs/pages/gateway/sdks-and-frameworks.md` (+6, -6)
- `packages/kilo-docs/pages/gateway/usage-and-billing.md` (+13, -13)
- `packages/kilo-docs/pages/getting-started/byok.md` (+5, -5)
- `packages/kilo-docs/pages/getting-started/migrating.md` (+21, -21)
- `packages/kilo-docs/pages/getting-started/settings/auto-approving-actions.md` (+61, -61)
- `packages/kilo-docs/pages/getting-started/settings/auto-cleanup.md` (+6, -6)
- `packages/kilo-docs/pages/getting-started/settings/system-notifications.md` (+19, -19)
- `packages/kilo-docs/pages/getting-started/setup-authentication.md` (+6, -6)
- `packages/kilo-docs/pages/kiloclaw/control-ui/changing-models.md` (+6, -6)
- `packages/kilo-docs/pages/kiloclaw/control-ui/exec-approvals.md` (+9, -9)
- `packages/kilo-docs/pages/kiloclaw/dashboard.md` (+18, -18)
- `packages/kilo-docs/pages/kiloclaw/development-tools/github.md` (+11, -11)
- `packages/kilo-docs/pages/kiloclaw/development-tools/google.md` (+21, -21)
- `packages/kilo-docs/pages/kiloclaw/end-to-end.md` (+5, -5)
- `packages/kilo-docs/pages/kiloclaw/pre-installed-software.md` (+41, -41)
- `packages/kilo-docs/pages/kiloclaw/triggers/index.md` (+4, -4)
- `packages/kilo-docs/pages/kiloclaw/triggers/scheduled.md` (+9, -9)
- `packages/kilo-docs/pages/kiloclaw/triggers/webhooks.md` (+8, -8)
- `packages/kilo-gateway/src/loader.ts` (+0, -13)
- `packages/kilo-indexing/src/detect.ts` (+5, -1)
- `packages/kilo-indexing/src/indexing/manager.ts` (+21, -1)
- `packages/kilo-indexing/test/kilocode/indexing/manager.test.ts` (+73, -0)
- `packages/kilo-jetbrains/AGENTS.md` (+112, -112)
- `packages/kilo-ui/src/components/icon.tsx` (+45, -1)
- `packages/kilo-vscode/AGENTS.md` (+33, -33)
- `packages/kilo-vscode/docs/agent-behaviour/mcp-server-creation.md` (+22, -22)
- `packages/kilo-vscode/docs/agent-behaviour/modes-subtab-parity.md` (+42, -42)
- `packages/kilo-vscode/docs/agent-behaviour/rules-workflows-subtab-parity.md` (+17, -17)
- `packages/kilo-vscode/docs/opencode-migration-plan.md` (+62, -62)
- `packages/kilo-vscode/src/KiloProvider.ts` (+19, -4)
- `packages/kilo-vscode/src/kilo-provider-utils.ts` (+1, -1)
- `packages/kilo-vscode/src/kilo-provider/handlers/permission-handler.ts` (+48, -12)
- `packages/kilo-vscode/src/kiloclaw/KiloClawProvider.ts` (+11, -27)
- `packages/kilo-vscode/src/services/cli-backend/connection-service.test.ts` (+31, -0)
- `packages/kilo-vscode/src/services/cli-backend/connection-service.ts` (+12, -1)
- `packages/kilo-vscode/tests/unit/model-selector-utils.test.ts` (+12, -16)
- `packages/kilo-vscode/tests/unit/permission-recovery.test.ts` (+23, -1)
- `packages/kilo-vscode/webview-ui/agent-manager/AgentManagerApp.tsx` (+16, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/new-task-drafts.ts` (+63, -0)
- `packages/kilo-vscode/webview-ui/kiloclaw/kiloclaw.css` (+6, -0)
- `packages/kilo-vscode/webview-ui/src/components/chat/PromptInput.tsx` (+34, -0)
- `packages/kilo-vscode/webview-ui/src/components/shared/model-selector-utils.ts` (+4, -6)
- `packages/kilo-vscode/webview-ui/src/context/session.tsx` (+6, -3)
- `packages/kilo-vscode/webview-ui/src/types/messages/extension-messages.ts` (+1, -0)
- `packages/opencode/script/publish.ts` (+1, -1)
- `packages/opencode/specs/effect/http-api.md` (+2, -2)
- `packages/opencode/specs/effect/schema.md` (+54, -40)
- `packages/opencode/src/acp/agent.ts` (+2, -2)
- `packages/opencode/src/cli/cmd/generate.ts` (+1, -1)
- `packages/opencode/src/cli/cmd/import.ts` (+5, -4)
- `packages/opencode/src/cli/cmd/tui/app.tsx` (+4, -1)
- `packages/opencode/src/cli/cmd/tui/component/dialog-session-rename.tsx` (+6, -5)
- `packages/opencode/src/cli/cmd/tui/component/prompt/autocomplete.tsx` (+77, -27)
- `packages/opencode/src/cli/cmd/tui/component/prompt/index.tsx` (+52, -4)
- `packages/opencode/src/cli/cmd/tui/context/editor.ts` (+319, -0)
- `packages/opencode/src/cli/cmd/tui/context/local.tsx` (+56, -25)
- `packages/opencode/src/cli/cmd/tui/event.ts` (+13, -13)
- `packages/opencode/src/cli/cmd/tui/feature-plugins/home/tips-view.tsx` (+1, -1)
- `packages/opencode/src/cli/cmd/tui/routes/session/index.tsx` (+12, -2)
- `packages/opencode/src/cli/cmd/tui/ui/toast.tsx` (+2, -2)
- `packages/opencode/src/command/index.ts` (+6, -6)
- `packages/opencode/src/config/agent.ts` (+1, -2)
- `packages/opencode/src/config/config.ts` (+17, -24)
- `packages/opencode/src/config/provider.ts` (+1, -3)
- `packages/opencode/src/config/server.ts` (+2, -2)
- `packages/opencode/src/control-plane/adaptors/index.ts` (+1, -7)
- `packages/opencode/src/control-plane/adaptors/worktree.ts` (+11, -9)
- `packages/opencode/src/control-plane/types.ts` (+21, -10)
- `packages/opencode/src/control-plane/workspace.ts` (+34, -32)
- `packages/opencode/src/file/index.ts` (+3, -3)
- `packages/opencode/src/file/watcher.ts` (+4, -4)
- `packages/opencode/src/flag/flag.ts` (+2, -5)
- `packages/opencode/src/ide/index.ts` (+3, -2)
- `packages/opencode/src/installation/index.ts` (+16, -13)
- `packages/opencode/src/kilo-sessions/kilo-sessions.ts` (+12, -6)
- `packages/opencode/src/kilo-sessions/remote-sender.ts` (+4, -3)
- `packages/opencode/src/kilocode/bootstrap.ts` (+7, -2)
- `packages/opencode/src/kilocode/docs/migration.md` (+64, -64)
- `packages/opencode/src/kilocode/docs/rules-migration.md` (+14, -14)
- `packages/opencode/src/kilocode/indexing.ts` (+95, -36)
- `packages/opencode/src/kilocode/provider/provider.ts` (+0, -11)
- `packages/opencode/src/kilocode/server/routes/indexing.ts` (+4, -2)
- `packages/opencode/src/kilocode/session/index.ts` (+9, -6)
- `packages/opencode/src/kilocode/skills/kilo-config.md` (+60, -60)
- `packages/opencode/src/kilocode/suggestion/index.ts` (+41, -13)
- `packages/opencode/src/kilocode/suggestion/tool.ts` (+7, -6)
- `packages/opencode/src/kilocode/worktree-cleanup.ts` (+69, -0)
- `packages/opencode/src/lsp/client.ts` (+4, -3)
- `packages/opencode/src/lsp/lsp.ts` (+1, -1)
- `packages/opencode/src/mcp/index.ts` (+6, -6)
- `packages/opencode/src/npm/index.ts` (+34, -19)
- `packages/opencode/src/project/project.ts` (+1, -1)
- `packages/opencode/src/project/vcs.ts` (+3, -3)
- `packages/opencode/src/provider/auth.ts` (+8, -15)
- `packages/opencode/src/provider/error.ts` (+10, -2)
- `packages/opencode/src/provider/models-snapshot.ts` (+1, -1)
- `packages/opencode/src/provider/models.ts` (+76, -88)
- `packages/opencode/src/provider/provider.ts` (+11, -19)
- `packages/opencode/src/provider/sdk/copilot/AGENTS.md` (+1, -0)
- `packages/opencode/src/provider/sdk/copilot/README.md` (+2, -2)
- `packages/opencode/src/provider/transform.ts` (+0, -7)
- `packages/opencode/src/pty/index.ts` (+38, -37)
- `packages/opencode/src/question/index.ts` (+4, -4)
- `packages/opencode/src/server/event.ts` (+4, -4)
- `packages/opencode/src/server/projectors.ts` (+1, -2)
- `packages/opencode/src/server/proxy.ts` (+2, -1)
- `packages/opencode/src/server/routes/control/workspace.ts` (+13, -19)
- `packages/opencode/src/server/routes/global.ts` (+2, -2)
- `packages/opencode/src/server/routes/instance/experimental.ts` (+3, -2)
- `packages/opencode/src/server/routes/instance/httpapi/permission.ts` (+44, -3)
- `packages/opencode/src/server/routes/instance/httpapi/server.ts` (+3, -0)
- `packages/opencode/src/server/routes/instance/httpapi/workspace.ts` (+82, -0)
- `packages/opencode/src/server/routes/instance/network.ts` (+4, -3)
- `packages/opencode/src/server/routes/instance/permission.ts` (+41, -25)
- `packages/opencode/src/server/routes/instance/pty.ts` (+8, -8)
- `packages/opencode/src/server/routes/instance/session.ts` (+33, -39)
- `packages/opencode/src/server/routes/instance/tui.ts` (+16, -9)
- `packages/opencode/src/server/server.ts` (+18, -7)
- `packages/opencode/src/session/compaction.ts` (+3, -3)
- `packages/opencode/src/session/message-v2.ts` (+52, -43)
- `packages/opencode/src/session/message.ts` (+185, -184)
- `packages/opencode/src/session/network.ts` (+53, -49)
- `packages/opencode/src/session/projectors.ts` (+4, -2)
- `packages/opencode/src/session/prompt.ts` (+81, -87)
- `packages/opencode/src/session/revert.ts` (+9, -8)
- `packages/opencode/src/session/session.ts` (+179, -123)
- `packages/opencode/src/session/status.ts` (+32, -31)
- `packages/opencode/src/session/summary.ts` (+8, -6)
- `packages/opencode/src/session/system.ts` (+2, -1)
- `packages/opencode/src/session/todo.ts` (+16, -12)
- `packages/opencode/src/share/share-next.ts` (+1, -1)
- `packages/opencode/src/sync/index.ts` (+41, -23)
- `packages/opencode/src/util/effect-zod.ts` (+48, -6)
- `packages/opencode/src/util/schema.ts` (+49, -8)
- `packages/opencode/src/worktree/index.ts` (+14, -14)
- `packages/opencode/test/cli/bin-kilo.test.ts` (+9, -0)
- `packages/opencode/test/fixture/fixture.ts` (+2, -6)
- `packages/opencode/test/installation/installation.test.ts` (+40, -6)
- `packages/opencode/test/kilocode/cleanup.ts` (+30, -0)
- `packages/opencode/test/kilocode/indexing-feature.test.ts` (+3, -3)
- `packages/opencode/test/kilocode/indexing-startup.test.ts` (+115, -24)
- `packages/opencode/test/kilocode/kilo-loader-auth.test.ts` (+5, -5)
- `packages/opencode/test/kilocode/local-model.test.ts` (+91, -72)
- `packages/opencode/test/kilocode/tool-registry-indexing.test.ts` (+3, -0)
- `packages/opencode/test/kilocode/worktree-remove-lock.test.ts` (+82, -0)
- `packages/opencode/test/npm.test.ts` (+88, -0)
- `packages/opencode/test/preload.ts` (+2, -16)
- `packages/opencode/test/server/global-session-list.test.ts` (+1, -1)
- `packages/opencode/test/server/httpapi-workspace.test.ts` (+55, -0)
- `packages/opencode/test/session/compaction.test.ts` (+1, -1)
- `packages/opencode/test/session/message-v2.test.ts` (+24, -0)
- `packages/opencode/test/session/network.test.ts` (+5, -4)
- `packages/opencode/test/session/prompt.test.ts` (+2, -2)
- `packages/opencode/test/session/retry.test.ts` (+22, -0)
- `packages/opencode/test/session/schema-decoding.test.ts` (+311, -0)
- `packages/opencode/test/session/session.test.ts` (+4, -1)
- `packages/opencode/test/sync/index.test.ts` (+3, -3)
- `packages/script/tests/check-opencode-annotations.test.ts` (+145, -15)
- `packages/sdk/js/src/v2/gen/types.gen.ts` (+122, -73)
- `packages/sdk/openapi.json` (+334, -265)
- `packages/shared/src/filesystem.ts` (+1, -8)
- `packages/storybook/.storybook/mocks/app/context/language.ts` (+1, -1)
- `packages/ui/src/components/icon.tsx` (+4, -8)
- `script/check-md-table-padding.ts` (+236, -0)
- `script/check-opencode-annotations.ts` (+64, -20)
- `script/upstream/README.md` (+33, -33)
- `script/upstream/list-versions.ts` (+8, -4)
- `script/upstream/merge.ts` (+116, -0)
- `script/upstream/package.json` (+1, -1)
- `script/upstream/transforms/skip-files.ts` (+18, -10)
- `script/upstream/utils/config.ts` (+4, -2)
- `script/upstream/utils/git.ts` (+16, -1)

### Key Diffs

#### .opencode/agent/translator.md
```diff
diff --git a/.opencode/agent/translator.md b/.opencode/agent/translator.md
deleted file mode 100644
index 3bea9df6b..000000000
--- a/.opencode/agent/translator.md
+++ /dev/null
@@ -1,899 +0,0 @@
----
-description: Translate content for a specified locale while preserving technical terms
-mode: subagent
-model: kilo/google/gemini-3.1-pro-preview
----
-
-You are a professional translator and localization specialist.
-
-Translate the user's content into the requested target locale (language + region, e.g. fr-FR, de-DE).
-
-Requirements:
-
-- Preserve meaning, intent, tone, and formatting (including Markdown/MDX structure).
-- Preserve all technical terms and artifacts exactly: product/company names, API names, identifiers, code, commands/flags, file paths, URLs, versions, error messages, config keys/values, and anything inside inline code or code blocks.
-- Also preserve every term listed in the Do-Not-Translate glossary below.
-- Also apply locale-specific guidance from `.opencode/glossary/<locale>.md` when available (for example, `zh-cn.md`).
-- Do not modify fenced code blocks.
-- Output ONLY the translation (no commentary).
-
-If the target locale is missing, ask the user to provide it.
-If no locale-specific glossary exists, use the global glossary only.
-
----
-
-# Locale-Specific Glossaries
-
-When a locale glossary exists, use it to:
-
-- Apply preferred wording for recurring UI/docs terms in that locale
-- Preserve locale-specific do-not-translate terms and casing decisions
-- Prefer natural phrasing over literal translation when the locale file calls it out
-- If the repo uses a locale alias slug, apply that file too (for example, `pt-BR` maps to `br.md` in this repo)
-
-Locale guidance does not override code/command preservation rules or the global Do-Not-Translate glossary below.
-
----
-
-# Do-Not-Translate Terms (OpenCode Docs)
-
-Generated from: `packages/web/src/content/docs/*.mdx` (default English docs)
-Generated on: 2026-02-10
-
-Use this as a translation QA checklist / glossary. Preserve listed terms exactly (spelling, casing, punctuation).
-
```

#### packages/opencode/src/bus/bus-event.ts
```diff
diff --git a/packages/opencode/src/bus/bus-event.ts b/packages/opencode/src/bus/bus-event.ts
index efaed9440..f27d26335 100644
--- a/packages/opencode/src/bus/bus-event.ts
+++ b/packages/opencode/src/bus/bus-event.ts
@@ -1,15 +1,19 @@
 import z from "zod"
-import type { ZodType } from "zod"
+import { Schema } from "effect"
+import { zodObject } from "@/util/effect-zod"
 
-export type Definition = ReturnType<typeof define>
+export type Definition<Type extends string = string, Properties extends Schema.Top = Schema.Top> = {
+  type: Type
+  properties: Properties
+}
 
 const registry = new Map<string, Definition>()
 
-export function define<Type extends string, Properties extends ZodType>(type: Type, properties: Properties) {
-  const result = {
-    type,
-    properties,
-  }
+export function define<Type extends string, Properties extends Schema.Top>(
+  type: Type,
+  properties: Properties,
+): Definition<Type, Properties> {
+  const result = { type, properties }
   registry.set(type, result)
   return result
 }
@@ -21,7 +25,7 @@ export function payloads() {
       return z
         .object({
           type: z.literal(type),
-          properties: def.properties,
+          properties: zodObject(def.properties),
         })
         .meta({
           ref: `Event.${def.type}`,
```

#### packages/opencode/src/bus/index.ts
```diff
diff --git a/packages/opencode/src/bus/index.ts b/packages/opencode/src/bus/index.ts
index 8a9579b59..12251f26c 100644
--- a/packages/opencode/src/bus/index.ts
+++ b/packages/opencode/src/bus/index.ts
@@ -1,5 +1,4 @@
-import z from "zod"
-import { Effect, Exit, Layer, PubSub, Scope, Context, Stream } from "effect"
+import { Effect, Exit, Layer, PubSub, Scope, Context, Stream, Schema } from "effect"
 import { EffectBridge } from "@/effect"
 import { Log } from "../util"
 import { BusEvent } from "./bus-event"
@@ -9,16 +8,18 @@ import { makeRuntime } from "@/effect/run-service"
 
 const log = Log.create({ service: "bus" })
 
+type BusProperties<D extends BusEvent.Definition<string, Schema.Top>> = Schema.Schema.Type<D["properties"]>
+
 export const InstanceDisposed = BusEvent.define(
   "server.instance.disposed",
-  z.object({
-    directory: z.string(),
+  Schema.Struct({
+    directory: Schema.String,
   }),
 )
 
 type Payload<D extends BusEvent.Definition = BusEvent.Definition> = {
   type: D["type"]
-  properties: z.infer<D["properties"]>
+  properties: BusProperties<D>
 }
 
 type State = {
@@ -27,10 +28,7 @@ type State = {
 }
 
 export interface Interface {
-  readonly publish: <D extends BusEvent.Definition>(
-    def: D,
-    properties: z.output<D["properties"]>,
-  ) => Effect.Effect<void>
+  readonly publish: <D extends BusEvent.Definition>(def: D, properties: BusProperties<D>) => Effect.Effect<void>
   readonly subscribe: <D extends BusEvent.Definition>(def: D) => Stream.Stream<Payload<D>>
   readonly subscribeAll: () => Stream.Stream<Payload>
   readonly subscribeCallback: <D extends BusEvent.Definition>(
@@ -79,7 +77,7 @@ export const layer = Layer.effect(
       })
     }
 
-    function publish<D extends BusEvent.Definition>(def: D, properties: z.output<D["properties"]>) {
```

#### packages/opencode/src/kilocode/tool/registry.ts
```diff
diff --git a/packages/opencode/src/kilocode/tool/registry.ts b/packages/opencode/src/kilocode/tool/registry.ts
index db995da29..a57dc60a6 100644
--- a/packages/opencode/src/kilocode/tool/registry.ts
+++ b/packages/opencode/src/kilocode/tool/registry.ts
@@ -4,8 +4,12 @@ import { RecallTool } from "../../tool/recall"
 import * as Tool from "../../tool/tool"
 import { Flag } from "@/flag/flag"
 import { Effect } from "effect"
-import { KiloIndexing } from "@/kilocode/indexing"
-import { SemanticSearchTool } from "@/kilocode/tool/semantic-search"
+import { Log } from "@/util"
+import { Agent } from "@/agent/agent"
+import * as Truncate from "@/tool/truncate"
+
+const log = Log.create({ service: "kilocode-tool-registry" })
+type Deps = { agent: Agent.Interface; truncate: Truncate.Interface }
 
 export namespace KiloToolRegistry {
   /** Resolve Kilo-specific tool Infos outside any InstanceState, so their Truncate/Agent deps are
@@ -13,19 +17,52 @@ export namespace KiloToolRegistry {
   export function infos() {
     return Effect.gen(function* () {
       const codebase = yield* CodebaseSearchTool
-      const semantic = yield* SemanticSearchTool
       const recall = yield* RecallTool
-      return { codebase, semantic, recall }
+      return { codebase, recall }
     })
   }
 
   /** Finalize Kilo-specific tools into Tool.Defs. Call this inside the InstanceState state Effect —
    * it has no Service deps beyond what Tool.init itself needs. */
-  export function build(tools: { codebase: Tool.Info; semantic: Tool.Info; recall: Tool.Info }) {
-    return Effect.all({
-      codebase: Tool.init(tools.codebase),
-      semantic: Tool.init(tools.semantic),
-      recall: Tool.init(tools.recall),
+  export function build(tools: { codebase: Tool.Info; recall: Tool.Info }, deps: Deps) {
+    return Effect.gen(function* () {
+      const base = yield* Effect.all({
+        codebase: Tool.init(tools.codebase),
+        recall: Tool.init(tools.recall),
+      })
+      const semantic = yield* semanticTool(deps)
+      return { ...base, semantic }
+    })
+  }
+
+  function semanticTool(deps: Deps) {
+    return Effect.gen(function* () {
```

#### packages/opencode/src/kilocode/tool/semantic-search.ts
```diff
diff --git a/packages/opencode/src/kilocode/tool/semantic-search.ts b/packages/opencode/src/kilocode/tool/semantic-search.ts
index c64527664..872f40ed9 100644
--- a/packages/opencode/src/kilocode/tool/semantic-search.ts
+++ b/packages/opencode/src/kilocode/tool/semantic-search.ts
@@ -1,5 +1,4 @@
-import z from "zod"
-import { Effect } from "effect"
+import { Effect, Schema } from "effect"
 import path from "path"
 import * as Tool from "@/tool/tool"
 import { KiloIndexing } from "@/kilocode/indexing"
@@ -7,14 +6,14 @@ import { Instance } from "@/project/instance"
 
 import DESCRIPTION from "./semantic-search.txt"
 
-const Parameters = z.object({
-  query: z.string().describe("The search query, expressed in natural language."),
-  path: z
-    .string()
-    .optional()
-    .describe(
+const Parameters = Schema.Struct({
+  query: Schema.String.annotate({
+    description: "The search query, expressed in natural language.",
+  }),
+  path: Schema.optional(Schema.String).annotate({
+    description:
       "Limit search to specific subdirectory (relative to the current workspace directory). Leave empty for entire workspace.",
-    ),
+  }),
 })
 
 type SearchResult = {
@@ -29,12 +28,15 @@ type Meta = {
   results: SearchResult[]
 }
 
-export const SemanticSearchTool = Tool.define<typeof Parameters, Meta, never, "semantic_search">(
+export const SemanticSearchTool = Tool.define(
   "semantic_search",
   Effect.succeed({
     description: DESCRIPTION,
     parameters: Parameters,
-    execute: (params, ctx) =>
+    execute: (
+      params: Schema.Schema.Type<typeof Parameters>,
+      ctx: Tool.Context,
+    ): Effect.Effect<Tool.ExecuteResult<Meta>> =>
       Effect.gen(function* () {
         if (!params.query) {
```


*... and more files (showing first 5)*

## opencode Changes (9d1f17d..65ba1f6)

### Commits

- 65ba1f6 - fix(download): update beta asset names from electron to desktop (#24908) (Brendan Allan, 2026-04-29)
- d37e5af - Disable Windows update code signature verification (#24905) (Brendan Allan, 2026-04-29)
- d71b827 - fix(session): remap compaction tail_start_id when forking (#24898) (spark4862, 2026-04-29)
- 504ca3d - feat: make it easier to toggle on/off paste summary in the tui (#24869) (Aiden Cline, 2026-04-28)
- a8c74c0 - docs: add Atomic Chat provider section (#23069) (Mike, 2026-04-28)
- f6b4f54 - refactor(app): convert getProjectAvatarSource to early returns (#24896) (Brendan Allan, 2026-04-29)
- fc0e3c6 - ignore (Dax Raad, 2026-04-28)
- 23b8ed7 - ignore (Dax Raad, 2026-04-28)
- 3bd890f - ignore: ideas (Dax Raad, 2026-04-28)
- 9fbeafb - fix: clear timeout after promise rejection (#24864) (Luke Parker, 2026-04-28)
- 91bd295 - chore: generate (opencode-agent[bot], 2026-04-28)
- d4bf70b - fix(bash): memory leak - release parsed syntax trees (#24861) (Luke Parker, 2026-04-28)
- ae8904c - chore: generate (opencode-agent[bot], 2026-04-28)
- 9209c04 - feat(core): filter sessions by path and add setting to disable (#24849) (James Long, 2026-04-28)
- 379e7f3 - test(httpapi): cover sdk effect routes (#24836) (Kit Langton, 2026-04-28)
- 366d11e - chore: generate (opencode-agent[bot], 2026-04-28)
- 58836e7 - fix(httpapi): wire global and control handlers (#24835) (Kit Langton, 2026-04-28)
- 0acac21 - fix(copilot): ensure available variants sync from api  (#24734) (Aiden Cline, 2026-04-28)
- 276d162 - sync release versions for v1.14.29 (opencode, 2026-04-28)
- 1b0ed98 - chore: generate (opencode-agent[bot], 2026-04-28)
- 2e8d690 - fix(httpapi): finish sdk openapi parity (#24827) (Kit Langton, 2026-04-28)
- 1ff8d28 - fix(tui): handle Zed selection byte offsets (#24825) (Kit Langton, 2026-04-28)
- d54ffbd - tui: ignore invalid custom themes to prevent startup crashes (#24645) (Dax, 2026-04-28)
- c00058e - fix(httpapi): align request body openapi shape (#24811) (Kit Langton, 2026-04-28)
- 2c2fc34 - feat(core): store relative path for sessions (#24704) (James Long, 2026-04-28)
- ea3c6c3 - fix(httpapi): document instance query parameters (#24809) (Kit Langton, 2026-04-28)
- 9b68b71 - chore: generate (opencode-agent[bot], 2026-04-28)
- 7739cc5 - refactor(httpapi): fork server startup by flag (#24799) (Kit Langton, 2026-04-28)
- 3fa78a8 - docs: bump GitHub stars count to 150K (#24792) (David Hill, 2026-04-28)
- e57d0c2 - fix(httpapi): document tui bad request responses (Kit Langton, 2026-04-28)
- 2a4f2bf - fix(httpapi): align sync seq validation (Kit Langton, 2026-04-28)
- aa07f38 - fix(app): preserve per-workspace icon override from localStorage (#24738) (Brendan Allan, 2026-04-28)

### Changed Files by Category

#### Tool System (packages/*/src/tool/)
- `packages/opencode/src/tool/bash.ts` (+11, -5)

#### Agent System (packages/*/src/agent/)
(no changes)

#### Permission System (**/permission/)
(no changes)

#### Event Bus (**/bus/, **/event/)
(no changes)

#### Core (**/core/)
- `packages/console/core/package.json` (+1, -1)
- `packages/core/package.json` (+1, -1)

#### Other Changes
- `bun.lock` (+16, -16)
- `packages/app/package.json` (+1, -1)
- `packages/app/src/context/layout.tsx` (+8, -1)
- `packages/app/src/pages/layout/sidebar-items.tsx` (+4, -3)
- `packages/console/app/package.json` (+1, -1)
- `packages/console/app/src/config.ts` (+2, -2)
- `packages/console/app/src/routes/download/[channel]/[platform].ts` (+6, -6)
- `packages/console/function/package.json` (+1, -1)
- `packages/console/mail/package.json` (+1, -1)
- `packages/desktop-electron/electron-builder.config.ts` (+1, -0)
- `packages/desktop-electron/package.json` (+1, -1)
- `packages/desktop/package.json` (+1, -1)
- `packages/enterprise/package.json` (+1, -1)
- `packages/extensions/zed/extension.toml` (+6, -6)
- `packages/function/package.json` (+1, -1)
- `packages/opencode/.gitignore` (+1, -0)
- `packages/opencode/migration/20260428004200_add_session_path/migration.sql` (+1, -0)
- `packages/opencode/migration/20260428004200_add_session_path/snapshot.json` (+1419, -0)
- `packages/opencode/package.json` (+1, -1)
- `packages/opencode/specs/v2/api.ts` (+67, -0)
- `packages/opencode/src/cli/cmd/generate.ts` (+15, -4)
- `packages/opencode/src/cli/cmd/tui/app.tsx` (+28, -0)
- `packages/opencode/src/cli/cmd/tui/component/dialog-session-list.tsx` (+8, -5)
- `packages/opencode/src/cli/cmd/tui/component/prompt/index.tsx` (+1, -1)
- `packages/opencode/src/cli/cmd/tui/context/editor-zed.ts` (+23, -3)
- `packages/opencode/src/cli/cmd/tui/context/sync.tsx` (+25, -9)
- `packages/opencode/src/cli/cmd/tui/context/theme.tsx` (+2, -1)
- `packages/opencode/src/plugin/github-copilot/models.ts` (+44, -2)
- `packages/opencode/src/plugin/index.ts` (+1, -1)
- `packages/opencode/src/provider/provider.ts` (+3, -1)
- `packages/opencode/src/provider/transform.ts` (+9, -8)
- `packages/opencode/src/server/adapter.bun.ts` (+33, -29)
- `packages/opencode/src/server/adapter.node.ts` (+61, -54)
- `packages/opencode/src/server/adapter.ts` (+5, -0)
- `packages/opencode/src/server/routes/instance/httpapi/config.ts` (+4, -6)
- `packages/opencode/src/server/routes/instance/httpapi/control.ts` (+30, -2)
- `packages/opencode/src/server/routes/instance/httpapi/experimental.ts` (+14, -24)
- `packages/opencode/src/server/routes/instance/httpapi/file.ts` (+10, -12)
- `packages/opencode/src/server/routes/instance/httpapi/global.ts` (+162, -4)
- `packages/opencode/src/server/routes/instance/httpapi/instance.ts` (+12, -21)
- `packages/opencode/src/server/routes/instance/httpapi/mcp.ts` (+12, -14)
- `packages/opencode/src/server/routes/instance/httpapi/permission.ts` (+4, -6)
- `packages/opencode/src/server/routes/instance/httpapi/project.ts` (+4, -6)
- `packages/opencode/src/server/routes/instance/httpapi/provider.ts` (+7, -13)
- `packages/opencode/src/server/routes/instance/httpapi/pty.ts` (+9, -12)
- `packages/opencode/src/server/routes/instance/httpapi/public.ts` (+192, -0)
- `packages/opencode/src/server/routes/instance/httpapi/question.ts` (+4, -6)
- `packages/opencode/src/server/routes/instance/httpapi/server.ts` (+72, -13)
- `packages/opencode/src/server/routes/instance/httpapi/session.ts` (+34, -38)
- `packages/opencode/src/server/routes/instance/httpapi/sync.ts` (+9, -8)
- `packages/opencode/src/server/routes/instance/httpapi/tui.ts` (+20, -19)
- `packages/opencode/src/server/routes/instance/httpapi/workspace.ts` (+9, -11)
- `packages/opencode/src/server/routes/instance/index.ts` (+1, -125)
- `packages/opencode/src/server/routes/instance/session.ts` (+7, -2)
- `packages/opencode/src/server/server.ts` (+28, -14)
- `packages/opencode/src/session/projectors.ts` (+1, -0)
- `packages/opencode/src/session/session.sql.ts` (+1, -0)
- `packages/opencode/src/session/session.ts` (+36, -7)
- `packages/opencode/src/storage/json-migration.ts` (+1, -0)
- `packages/opencode/src/util/timeout.ts` (+1, -2)
- `packages/opencode/test/cli/cmd/tui/sync.test.tsx` (+149, -0)
- `packages/opencode/test/cli/tui/editor-context.test.ts` (+112, -2)
- `packages/opencode/test/plugin/github-copilot-models.test.ts` (+98, -0)
- `packages/opencode/test/provider/transform.test.ts` (+22, -0)
- `packages/opencode/test/server/httpapi-bridge.test.ts` (+202, -89)
- `packages/opencode/test/server/httpapi-config.test.ts` (+2, -4)
- `packages/opencode/test/server/httpapi-event.test.ts` (+2, -4)
- `packages/opencode/test/server/httpapi-experimental.test.ts` (+2, -4)
- `packages/opencode/test/server/httpapi-instance.test.ts` (+2, -4)
- `packages/opencode/test/server/httpapi-json-parity.test.ts` (+7, -8)
- `packages/opencode/test/server/httpapi-mcp.test.ts` (+4, -9)
- `packages/opencode/test/server/httpapi-provider.test.ts` (+3, -5)
- `packages/opencode/test/server/httpapi-pty.test.ts` (+2, -4)
- `packages/opencode/test/server/httpapi-sdk.test.ts` (+84, -0)
- `packages/opencode/test/server/httpapi-session.test.ts` (+2, -4)
- `packages/opencode/test/server/httpapi-sync.test.ts` (+48, -6)
- `packages/opencode/test/server/httpapi-tui.test.ts` (+13, -5)
- `packages/opencode/test/server/httpapi-workspace.test.ts` (+2, -4)
- `packages/opencode/test/server/session-list.test.ts` (+129, -10)
- `packages/opencode/test/session/messages-pagination.test.ts` (+69, -0)
- `packages/opencode/test/session/schema-decoding.test.ts` (+1, -0)
- `packages/opencode/test/session/session.test.ts` (+1, -0)
- `packages/plugin/package.json` (+1, -1)
- `packages/sdk/js/package.json` (+1, -1)
- `packages/sdk/js/script/build.ts` (+8, -1)
- `packages/sdk/js/src/v2/gen/sdk.gen.ts` (+4, -0)
- `packages/sdk/js/src/v2/gen/types.gen.ts` (+12, -1)
- `packages/sdk/openapi.json` (+34, -1)
- `packages/slack/package.json` (+1, -1)
- `packages/ui/package.json` (+1, -1)
- `packages/web/package.json` (+1, -1)
- `packages/web/src/content/docs/ar/providers.mdx` (+38, -0)
- `packages/web/src/content/docs/bs/providers.mdx` (+38, -0)
- `packages/web/src/content/docs/da/providers.mdx` (+38, -0)
- `packages/web/src/content/docs/de/providers.mdx` (+38, -0)
- `packages/web/src/content/docs/es/providers.mdx` (+38, -0)
- `packages/web/src/content/docs/fr/providers.mdx` (+38, -0)
- `packages/web/src/content/docs/it/providers.mdx` (+38, -0)
- `packages/web/src/content/docs/ja/providers.mdx` (+38, -0)
- `packages/web/src/content/docs/ko/providers.mdx` (+38, -0)
- `packages/web/src/content/docs/nb/providers.mdx` (+38, -0)
- `packages/web/src/content/docs/pl/providers.mdx` (+38, -0)
- `packages/web/src/content/docs/providers.mdx` (+38, -0)
- `packages/web/src/content/docs/pt-br/providers.mdx` (+38, -0)
- `packages/web/src/content/docs/ru/providers.mdx` (+38, -0)
- `packages/web/src/content/docs/th/providers.mdx` (+38, -0)
- `packages/web/src/content/docs/tr/providers.mdx` (+38, -0)
- `packages/web/src/content/docs/zh-cn/providers.mdx` (+38, -0)
- `packages/web/src/content/docs/zh-tw/providers.mdx` (+38, -0)
- `sdks/vscode/package.json` (+1, -1)

### Key Diffs

#### packages/console/core/package.json
```diff
diff --git a/packages/console/core/package.json b/packages/console/core/package.json
index e8b73d2..8a0443b 100644
--- a/packages/console/core/package.json
+++ b/packages/console/core/package.json
@@ -1,7 +1,7 @@
 {
   "$schema": "https://json.schemastore.org/package.json",
   "name": "@opencode-ai/console-core",
-  "version": "1.14.28",
+  "version": "1.14.29",
   "private": true,
   "type": "module",
   "license": "MIT",
```

#### packages/core/package.json
```diff
diff --git a/packages/core/package.json b/packages/core/package.json
index e180df1..9a1744c 100644
--- a/packages/core/package.json
+++ b/packages/core/package.json
@@ -1,6 +1,6 @@
 {
   "$schema": "https://json.schemastore.org/package.json",
-  "version": "1.14.28",
+  "version": "1.14.29",
   "name": "@opencode-ai/core",
   "type": "module",
   "license": "MIT",
```

#### packages/opencode/src/tool/bash.ts
```diff
diff --git a/packages/opencode/src/tool/bash.ts b/packages/opencode/src/tool/bash.ts
index 8593899..82f6e5a 100644
--- a/packages/opencode/src/tool/bash.ts
+++ b/packages/opencode/src/tool/bash.ts
@@ -252,7 +252,7 @@ function tail(text: string, maxLines: number, maxBytes: number) {
 const parse = Effect.fn("BashTool.parse")(function* (command: string, ps: boolean) {
   const tree = yield* Effect.promise(() => parser().then((p) => (ps ? p.ps : p.bash).parse(command)))
   if (!tree) throw new Error("Failed to parse command")
-  return tree.rootNode
+  return tree
 })
 
 const ask = Effect.fn("BashTool.ask")(function* (ctx: Tool.Context, scan: Scan) {
@@ -596,10 +596,16 @@ export const BashTool = Tool.define(
               }
               const timeout = params.timeout ?? DEFAULT_TIMEOUT
               const ps = Shell.ps(shell)
-              const root = yield* parse(params.command, ps)
-              const scan = yield* collect(root, cwd, ps, shell)
-              if (!Instance.containsPath(cwd)) scan.dirs.add(cwd)
-              yield* ask(ctx, scan)
+              yield* Effect.scoped(
+                Effect.gen(function* () {
+                  const tree = yield* Effect.acquireRelease(parse(params.command, ps), (tree) =>
+                    Effect.sync(() => tree.delete()),
+                  )
+                  const scan = yield* collect(tree.rootNode, cwd, ps, shell)
+                  if (!Instance.containsPath(cwd)) scan.dirs.add(cwd)
+                  yield* ask(ctx, scan)
+                }),
+              )
 
               return yield* run(
                 {
```


## Recommendations

Based on the changes, the following files in Alexi should be reviewed:

- `src/agent/index.ts` - incorporate new agent patterns from .opencode/agent/translator.md
- `src/permission/` - review permission changes from packages/opencode/src/permission/index.ts
- `src/permission/` - review permission changes from packages/opencode/test/kilocode/permission/next.always-rules.test.ts
- `src/permission/` - review permission changes from packages/opencode/test/kilocode/permission/next.reply-http.test.ts
- `src/permission/` - review permission changes from packages/opencode/test/kilocode/permission/next.reply-routing.test.ts
- `src/permission/` - review permission changes from packages/opencode/test/permission/next.test.ts
- `src/tool/apply_patch.ts` - update based on kilocode packages/opencode/src/tool/apply_patch.ts changes
- `src/tool/bash.ts` - update based on kilocode packages/opencode/src/tool/bash.ts changes
- `src/tool/bash.ts` - update based on opencode packages/opencode/src/tool/bash.ts changes
- `src/tool/codesearch.ts` - update based on kilocode packages/opencode/src/tool/codesearch.ts changes
- `src/tool/edit.ts` - update based on kilocode packages/opencode/src/tool/edit.ts changes
- `src/tool/glob.ts` - update based on kilocode packages/opencode/src/tool/glob.ts changes
- `src/tool/grep.ts` - update based on kilocode packages/opencode/src/tool/grep.ts changes
- `src/tool/invalid.ts` - update based on kilocode packages/opencode/src/tool/invalid.ts changes
- `src/tool/lsp.ts` - update based on kilocode packages/opencode/src/tool/lsp.ts changes
- `src/tool/parameters.test.ts.snap.ts` - update based on kilocode packages/opencode/test/tool/__snapshots__/parameters.test.ts.snap changes
- `src/tool/parameters.test.ts` - update based on kilocode packages/opencode/test/tool/parameters.test.ts changes
- `src/tool/plan.ts` - update based on kilocode packages/opencode/src/tool/plan.ts changes
- `src/tool/question.ts` - update based on kilocode packages/opencode/src/tool/question.ts changes
- `src/tool/read.ts` - update based on kilocode packages/opencode/src/tool/read.ts changes
- `src/tool/recall.ts` - update based on kilocode packages/opencode/src/tool/recall.ts changes
- `src/tool/registry.ts` - update based on kilocode packages/opencode/src/kilocode/tool/registry.ts changes
- `src/tool/registry.ts` - update based on kilocode packages/opencode/src/tool/registry.ts changes
- `src/tool/semantic-search.ts` - update based on kilocode packages/opencode/src/kilocode/tool/semantic-search.ts changes
- `src/tool/skill.ts` - update based on kilocode packages/opencode/src/tool/skill.ts changes
- `src/tool/task.ts` - update based on kilocode packages/opencode/src/tool/task.ts changes
- `src/tool/todo.ts` - update based on kilocode packages/opencode/src/tool/todo.ts changes
- `src/tool/tool-define.test.ts` - update based on kilocode packages/opencode/test/tool/tool-define.test.ts changes
- `src/tool/tool.ts` - update based on kilocode packages/opencode/src/tool/tool.ts changes
- `src/tool/truncate.ts` - update based on kilocode packages/opencode/src/tool/truncate.ts changes
- `src/tool/truncation.test.ts` - update based on kilocode packages/opencode/test/tool/truncation.test.ts changes
- `src/tool/warpgrep.ts` - update based on kilocode packages/opencode/src/tool/warpgrep.ts changes
- `src/tool/webfetch.ts` - update based on kilocode packages/opencode/src/tool/webfetch.ts changes
- `src/tool/websearch.ts` - update based on kilocode packages/opencode/src/tool/websearch.ts changes
- `src/tool/write.ts` - update based on kilocode packages/opencode/src/tool/write.ts changes
