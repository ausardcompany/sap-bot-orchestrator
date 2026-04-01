# Upstream Changes Report
Generated: 2026-04-01 07:23:04

## Summary
- kilocode: 272 commits, 291 files changed
- opencode: 0 commits, 0 files changed

## kilocode Changes (121f6e3c..4abe3485)

### Commits

- 4abe3485 - Merge pull request #8038 from Kilo-Org/revert-7949-fix/restore-directory-tree-system-prompt (Mark IJbema, 2026-04-01)
- 664bccc9 - Revert "fix(cli): restore directory tree in system prompt" (Mark IJbema, 2026-04-01)
- 75a111e8 - fix(kilo-docs): correct Agent Manager keyboard shortcuts and claims (#7958) (Joshua Lambert, 2026-04-01)
- 1e8e07f9 - release: v7.1.12 (kilo-maintainer[bot], 2026-03-31)
- b02abce9 - Migration fix (#8032) (Imanol Maiztegui, 2026-04-01)
- bf5b13ff - Merge pull request #8021 from Kilo-Org/catrielmuller/7751 (Catriel Müller, 2026-03-31)
- 172a569f - Merge pull request #8020 from Kilo-Org/fix/chat-notifications (Kirill Kalishev, 2026-03-31)
- 9ace3493 - Merge branch 'main' into fix/chat-notifications (Kirill Kalishev, 2026-03-31)
- 44fe04b9 - refactor(vscode): remove dead actions[] field from notification schema and component (kirillk, 2026-03-31)
- 814fe9c7 - Merge branch 'main' into catrielmuller/7751 (Catriel Müller, 2026-03-31)
- b01e4534 - fix(vscode): overlay description from customModePrompts during native mode merge (Catriel Müller, 2026-03-31)
- 4e108688 - refactor(vscode): replace migration.migrate.back with common.goBack (kirillk, 2026-03-31)
- 1ff16cd8 - Merge pull request #8023 from Kilo-Org/kirillk/logo (Kirill Kalishev, 2026-03-31)
- 7caf862c - refactor(vscode): replace notifications.action.previous with common.goBack (kirillk, 2026-03-31)
- f020e47d - fix(vscode): increase horizontal padding on member badge (kirillk, 2026-03-31)
- ebab1f53 - fix(vscode): wrap legacy customInstructions with user instructions header (Catriel Müller, 2026-03-31)
- 23c9fda2 - fix(vscode): use legacy mode description as agent description field (Catriel Müller, 2026-03-31)
- 2fa0cc70 - fix(vscode): remove horizontal scroll and improve padding in chat message list (kirillk, 2026-03-31)
- c93a86ef - feat(vscode): update kilo logo icons in chat panel (kirillk, 2026-03-31)
- c701264e - feat(vscode): migrate modified native modes during legacy migration (Catriel Müller, 2026-03-31)
- d14adf45 - Merge branch 'main' into fix/chat-notifications (Kirill Kalishev, 2026-03-31)
- 47100053 - chore: update kilo-vscode visual regression baselines (github-actions[bot], 2026-03-31)
- 2b165195 - fix(vscode): improve chat notification footer layout (kirillk, 2026-03-31)
- 4f26507d - Merge pull request #7503 from Kilo-Org/mark/fix-include-subagent-costs-in-session-total (Mark IJbema, 2026-03-31)
- c419752f - test(vscode): extract cost breakdown into pure functions with unit tests (Mark IJbema, 2026-03-31)
- 6367d8ef - refactor(vscode): split costBreakdown into familyCosts and familyLabels memos (Mark IJbema, 2026-03-31)
- a1494e20 - fix(vscode): rename 'Parent session' to 'This session' in cost breakdown (Mark IJbema, 2026-03-31)
- d6eeb00b - Migration error handling (#8010) (Imanol Maiztegui, 2026-03-31)
- 24709aa7 - fix(vscode): return cost breakdown for standalone sessions too (Mark IJbema, 2026-03-31)
- 07f3d06b - Merge pull request #8012 from Kilo-Org/docs/prune-migration-plan-completed-items (Mark IJbema, 2026-03-31)
- 368aef12 - feat(i18n): add context.stats.parentSession translations across locales (kiloconnect[bot], 2026-03-31)
- 7b738b8c - refactor(vscode): remove totalCost, derive from costBreakdown at callsite (Mark IJbema, 2026-03-31)
- ce2c4ecf - fix(agent-manager): prevent model comparison popover from dismissing on interaction (#8014) (Marius, 2026-03-31)
- 67780995 - fix(vscode): wire continueInWorktreeHandler for tab panels (#8013) (Marius, 2026-03-31)
- c0cf8dfa - fix(vscode): render cost breakdown tooltip as JSX with proper line breaks (Mark IJbema, 2026-03-31)
- bcbd2b42 - docs(vscode): prune completed items from migration plan (kiloconnect[bot], 2026-03-31)
- 0628696c - feat(vscode): show per-subagent cost breakdown in tooltip (Mark IJbema, 2026-03-31)
- 39be9f9f - Merge pull request #8001 from Kilo-Org/fix/skill-directory-precedence (Mark IJbema, 2026-03-31)
- a59c59e6 - fix(vscode): use sessionFamily BFS to sum subagent costs correctly (Mark IJbema, 2026-03-31)
- 46daeceb - refactor: restrict PR to vscode changes only, revert cli/app/acp changes (Mark IJbema, 2026-03-31)
- a2789267 - Merge branch 'main' into mark/fix-include-subagent-costs-in-session-total (Mark IJbema, 2026-03-31)
- 80f187eb - feat(kilo-vscode): migrate legacy sessions into new extension (#7924) (Imanol Maiztegui, 2026-03-31)
- 0d00e41d - Merge pull request #7994 from Kilo-Org/fix/tool-call-without-tool-input-start (Christiaan Arnoldus, 2026-03-31)
- 52422a8d - Merge branch 'main' into fix/tool-call-without-tool-input-start (Christiaan Arnoldus, 2026-03-31)
- 154d1119 - Fix typo in Linux x64 download link (Filip Halaxa, 2026-03-31)
- f6e751a6 - Merge pull request #7963 from Kilo-Org/fix/cli-self-config-tips (Marian Alexandru Alecu, 2026-03-31)
- ccecf5f1 - Merge branch 'main' into fix/skill-directory-precedence (Mark IJbema, 2026-03-31)
- 512a4334 - Merge pull request #7999 from Kilo-Org/fix/source-links-apertis (Mark IJbema, 2026-03-31)
- 69bd0342 - Merge branch 'main' into fix/tool-call-without-tool-input-start (Christiaan Arnoldus, 2026-03-31)
- b0aa8acf - Clarify comment (Christiaan Arnoldus, 2026-03-31)
- df7f4840 - fix: narrow apertis lychee exclusion to exact /v1 path (kiloconnect[bot], 2026-03-31)
- b284562e - fix: exclude apertis API base URL from link checker (kiloconnect[bot], 2026-03-31)
- f318bc32 - fix(cli): fix global skills overriding project skills in skillDirectories() (kiloconnect[bot], 2026-03-31)
- 6810bdd5 - Merge pull request #7432 from Kilo-Org/mark/remove-beta-label (Mark IJbema, 2026-03-31)
- 8491f533 - fix: regenerate source-links.md after Apertis provider addition (kiloconnect[bot], 2026-03-31)
- 0578a23e - Merge pull request #7205 from theQuert/feat/apertis-opencode-provider (Mark IJbema, 2026-03-31)
- 7dcb26a7 - fix(cli): handle tool-call without prior tool-input-start event (kiloconnect[bot], 2026-03-31)
- 8dfb98ea - fix(sdk): pass duplex in fetch init to survive VS Code proxy-agent wrapper (#7942) (Marius, 2026-03-31)
- 9fd9ffd8 - release: v7.1.11 (kilo-maintainer[bot], 2026-03-31)
- ccd4574b - Merge pull request #7978 from Kilo-Org/fix/windows-session-directory-casing (Mark IJbema, 2026-03-31)
- 00e6252d - fix(cli): normalize directory path when listing sessions to fix Windows case mismatch (kiloconnect[bot], 2026-03-31)
- b12ab1c1 - Merge pull request #7976 from Kilo-Org/fix/translation-notifications-action (Mark IJbema, 2026-03-31)
- 64f6ca89 - release: v7.1.10 (kilo-maintainer[bot], 2026-03-31)
- 4f854748 - fix(i18n): translate notifications.action strings properly (kiloconnect[bot], 2026-03-31)
- 27e62282 - Merge pull request #7971 from Kilo-Org/session/agent_ab4d50f6-2609-4d1d-97fd-d24b2ba5c30d (Christiaan Arnoldus, 2026-03-31)
- eb4e5705 - Merge pull request #7941 from Kilo-Org/eshurakov/eshurakov/websocket-hearbeat-monitor (Evgeny Shurakov, 2026-03-31)
- 86207a72 - Do not remove Free (Christiaan Arnoldus, 2026-03-31)
- 85f04045 - Merge pull request #7973 from Kilo-Org/subsequent-lip (Mark IJbema, 2026-03-31)
- 227e53bc - Merge pull request #7954 from Kilo-Org/eshurakov/eshurakov/remote-config (Evgeny Shurakov, 2026-03-31)
- 2d43901d - chore: enforce LF line endings via .gitattributes (Mark IJbema, 2026-03-31)
- 3558f5e8 - fix(vscode): show friendly model name in notification "Try model" button (kiloconnect[bot], 2026-03-31)
- 9a238572 - Merge pull request #7906 from Kilo-Org/mark/fix-windows-hide-regression-7896 (Mark IJbema, 2026-03-31)
- 5da71b06 - Merge pull request #7933 from Kilo-Org/profile-max-width (Mark IJbema, 2026-03-31)
- c3a51774 - Merge pull request #7512 from Kilo-Org/docs/mcp-shell-tabs (Mark IJbema, 2026-03-31)
- 41e9d81a - Merge pull request #7964 from Kilo-Org/fix/agent-picker-labels (Mark IJbema, 2026-03-31)
- c4732a6c - fix(cli): restore agent picker labels (Alex Alecu, 2026-03-31)
- af83b19b - fix(cli): simplify self-config tips (Alex Alecu, 2026-03-31)
- 6ab706ac - Merge pull request #7888 from IamCoder18/feat/deprecate-orchestrator-agent (Marian Alexandru Alecu, 2026-03-31)
- 904b2d83 - Merge branch 'main' into feat/deprecate-orchestrator-agent (Aarav, 2026-03-30)
- 12d292ec - fix: propagate deprecated field in agent merge and show description in dialog (Aarav Sharma, 2026-03-30)
- 8c6d4481 - fix(cli): read remote_control from global config only (Evgeny Shurakov, 2026-03-30)
- 5d9ea381 - feat(cli): add remote_control config to auto-enable remote session relay (Evgeny Shurakov, 2026-03-30)
- 56e3fe0b - Merge pull request #7949 from Kilo-Org/fix/restore-directory-tree-system-prompt (Joshua Lambert, 2026-03-30)
- 76d8415f - docs(kilo-docs): fix issues flagged by kilo-code-bot review (kiloconnect[bot], 2026-03-30)
- 1d4d3f3a - chore: merge origin/main into docs/mcp-shell-tabs, resolve conflicts (kiloconnect[bot], 2026-03-30)
- 03691ebe - fix(cli): restore directory tree in system prompt (kiloconnect[bot], 2026-03-30)
- 145ce5a4 - Merge pull request #7505 from Kilo-Org/docs/code-with-ai-features-tabs (Mark IJbema, 2026-03-30)
- d9c7abd3 - docs(code-with-ai): add Playwright config snippet and CLI browser notes (kiloconnect[bot], 2026-03-30)
- 9b3f50a8 - docs(code-with-ai): remove CLI tab and its info callout in autocomplete docs (kiloconnect[bot], 2026-03-30)
- 2903027b - Merge branch 'origin/main' into docs/code-with-ai-features-tabs (kiloconnect[bot], 2026-03-30)
- 5fa6eb49 - Merge pull request #7508 from Kilo-Org/docs/customize-tabs (Mark IJbema, 2026-03-30)
- 8c646b6f - docs(kilo-docs): clarify migration skip list — these are legacy modes, not CLI agents (Josh Lambert, 2026-03-30)
- 87e2a583 - docs(kilo-docs): fix inaccuracies flagged in PR review comments (kiloconnect[bot], 2026-03-30)
- 36a6b3f3 - docs(code-with-ai): update browser-use docs to describe built-in browser automation (kiloconnect[bot], 2026-03-30)
- 3d0f8518 - wip (kiloconnect[bot], 2026-03-30)
- 0ac666b1 - docs(code-with-ai): move autocomplete note from VSCode tab to CLI tab (kiloconnect[bot], 2026-03-30)
- 2b57ce7c - chore: merge origin/main into docs/customize-tabs, resolve conflicts (kiloconnect[bot], 2026-03-30)
- 73506c4f - Merge pull request #7939 from Kilo-Org/mark/fix-leading-edge-pending-request-tracking (Mark IJbema, 2026-03-30)
- 36bc2066 - Merge pull request #7940 from Kilo-Org/docs/update-for-new-cli-extension (Mark IJbema, 2026-03-30)
- 976e3aca - Merge pull request #7513 from Kilo-Org/docs/ai-providers-tabs (Mark IJbema, 2026-03-30)
- 614d830e - docs: fix provider IDs and env vars in ai-provider pages (kiloconnect[bot], 2026-03-30)
- 455f4c23 - fix(vscode): address review comments — assign promise directly, remove stale pending requests (Mark IJbema, 2026-03-30)
- 40d3a23a - Merge pull request #7929 from Kilo-Org/feat/ask-agent-read-tools (Marian Alexandru Alecu, 2026-03-30)
- 14438b99 - fix(cli): use git branch --list instead of -l (Alex Alecu, 2026-03-30)
- afcf766c - docs: replace opencode.json with kilo.jsonc in VS Code pages; fix custom-instructions nested tabs; remove codebase search from experimental (kiloconnect[bot], 2026-03-30)
- 23c7d053 - feat(cli): add WebSocket activity watchdog with heartbeat_ack support (Evgeny Shurakov, 2026-03-30)
- f0a9742c - docs: fix custom-modes tab structure - move all legacy YAML content into Legacy tab (kiloconnect[bot], 2026-03-30)
- 01b04a3d - docs: fix tools overview and MCP page for new extension (kiloconnect[bot], 2026-03-30)
- df4a0bd9 - docs: document default tool permissions and remove Cmd+Alt+A shortcut mention (kiloconnect[bot], 2026-03-30)
- bfb80d19 - docs: update legacy-only pages with VSCode/VSCode (Legacy) tabs for new CLI extension (kiloconnect[bot], 2026-03-30)
- b1079771 - Merge pull request #7936 from Kilo-Org/docs/secondary-sidebar-tip-vscode-tab (Mark IJbema, 2026-03-30)
- 8a6cec22 - Merge pull request #7935 from Kilo-Org/docs/fix-kilo-repo-links (Mark IJbema, 2026-03-30)
- 7b26dd97 - Merge pull request #7934 from Kilo-Org/docs/remove-cline-to-kilo-migration (Mark IJbema, 2026-03-30)
- d3da9ac0 - fix(kilo-docs): fix broken kiloclaw links for pricing and version-pinning (kiloconnect[bot], 2026-03-30)
- 81222b14 - fix(vscode): enable sub-agent open-in-tab button in Agent Manager (#7937) (Marius, 2026-03-30)
- 6a6372f1 - docs: add Secondary Side Bar tip to VSCode tab in chat-interface (kiloconnect[bot], 2026-03-30)
- 598a2656 - fix(vscode): track leading-edge FIM requests as pending to enable reuse (Mark IJbema, 2026-03-30)
- af6328ae - fix: update Kilo-Org/kilo references to Kilo-Org/kilocode (kiloconnect[bot], 2026-03-30)
- 0482fd0f - docs: remove cline-to-kilo-migration page and add redirect (kiloconnect[bot], 2026-03-30)
- de0c51bf - fix(vscode): add box-sizing border-box to prevent overflow on narrow panels (kiloconnect[bot], 2026-03-30)
- a5c3a956 - feat(vscode): center profile screen with max-width (kiloconnect[bot], 2026-03-30)
- 657296a0 - fix(cli): clarify read-only wording in ask prompt (Alex Alecu, 2026-03-30)
- b007fa2d - fix(cli): restrict git branch/tag/remote to read-only flags (Alex Alecu, 2026-03-30)
- a958703a - Merge pull request #7602 from Kilo-Org/docs/kiloclaw-1password-integration (Ligia Zanchet, 2026-03-30)
- 585b198e - Merge remote-tracking branch 'origin/main' into docs/kiloclaw-1password-integration (Mark IJbema, 2026-03-30)
- ca92e63b - fix(cli): use allowlist for read-only git cmds (Alex Alecu, 2026-03-30)
- fab032cd - Merge pull request #7873 from IamCoder18/main (Kirill Kalishev, 2026-03-30)
- 5385dab2 - fix(vscode): prevent spinner from disappearing during webview recreation (#7931) (Marius, 2026-03-30)
- 7376d213 - fix: preserve separator style when migrating .kilocode to .kilo paths (#7562) (nivin karthick, 2026-03-30)
- 6fadd9de - fix(cli): user denies override MCP ask rules (Alex Alecu, 2026-03-30)
- a68cf47d - fix(cli): remove find from Ask allowlist, add git write denials (Alex Alecu, 2026-03-30)
- 19467461 - perf(agent-manager): extend slimPart to strip heavy tool metadata for faster session switching (#7927) (Marius, 2026-03-30)
- bd107221 - Merge pull request #7925 from Kilo-Org/mark/mcp-browse-marketplace-button (Mark IJbema, 2026-03-30)
- e64aba0b - test(cli): add Ask agent permission tests (Alex Alecu, 2026-03-30)
- cbef6819 - Merge pull request #7765 from Kilo-Org/hide-non-english-i18n-in-github (Mark IJbema, 2026-03-30)
- 75dacd05 - fix(agent-manager): add retries to worktree cleanup for macOS .app bundles (#7921) (Marius, 2026-03-30)
- 1d7bc418 - feat(cli): add MCP tool support to Ask agent (Alex Alecu, 2026-03-30)
- 2cdf6b61 - perf(cli): cache MCP listTools results to avoid redundant RPCs per loop step (#7922) (Marius, 2026-03-30)
- 15ac71c5 - feat(cli): add read-only bash commands to Ask agent (Alex Alecu, 2026-03-30)
- ad816eee - chore: update kilo-vscode visual regression baselines (github-actions[bot], 2026-03-30)
- ad8681e9 - feat(vscode): add Browse Marketplace button to agents and skills tabs (Mark IJbema, 2026-03-30)
- 25a8c932 - fix(vscode): preserve project directory when opening marketplace from settings (kiloconnect[bot], 2026-03-30)
- 4a6899fa - feat(vscode): add Browse Marketplace button to MCP settings (kiloconnect[bot], 2026-03-30)
- dba6fe46 - fix(vscode): fix health check permanently killing SSE connection (#7920) (Marius, 2026-03-30)
- a3c80cdd - Merge pull request #7887 from armaniacs/fix/ime-composition-enter-sends-message (Mark IJbema, 2026-03-30)
- d379f45c - Merge pull request #7917 from Kilo-Org/mark/fix-traditional-chinese-locale (Mark IJbema, 2026-03-30)
- ea32ea44 - Merge branch 'main' into mark/fix-traditional-chinese-locale (Mark IJbema, 2026-03-30)
- 356ed5df - fix(vscode): handle bare "zht" locale in normalizeLocale and resolveLocale (Mark IJbema, 2026-03-30)
- 810d3bfa - Merge pull request #7913 from Kilo-Org/fix/reset-settings-description (Mark IJbema, 2026-03-30)
- e7cb2e88 - Merge pull request #7903 from Kilo-Org/mark/fix-enhance-prompt-wrong-session (Mark IJbema, 2026-03-30)
- 2e6e9918 - fix(vscode): correctly map zh-TW/zh-HK/zh-MO to Traditional Chinese locale (kiloconnect[bot], 2026-03-30)
- e6d75b19 - fix(vscode): clarify reset settings button only affects extension-specific settings (kiloconnect[bot], 2026-03-30)
- 366ea724 - Merge branch 'main' into mark/fix-enhance-prompt-wrong-session (Mark IJbema, 2026-03-30)
- 71117cc8 - Merge pull request #7735 from cyphercodes/fix/reset-all-settings-globalstate (Mark IJbema, 2026-03-30)
- 6b7a403c - feat(vscode): add MCP server connect/disconnect toggle and status display (#7810) (Marius, 2026-03-30)
- 6e8da6ea - revert: restore desktop-electron spawn calls to upstream state (kiloconnect[bot], 2026-03-30)
- 32a2fb9d - Merge pull request #7902 from Kilo-Org/mark/fix-exa-open-url (Mark IJbema, 2026-03-30)
- 43bfeef8 - fix(ui): open Exa search result links via openUrl in VS Code webview (Mark IJbema, 2026-03-30)
- f824868a - Merge pull request #7716 from Kilo-Org/feat/screenshot-test-mcp-edit-view (Mark IJbema, 2026-03-30)
- dfb5a632 - Merge branch 'main' into feat/screenshot-test-mcp-edit-view (Mark IJbema, 2026-03-30)
- 482bf89b - fix: add windowsHide:true to remaining spawn/exec calls to prevent CMD flash on Windows (kiloconnect[bot], 2026-03-30)
- 31d18eb2 - Merge pull request #7842 from Kilo-Org/session/agent_3b8192c9-9812-4c25-8772-84571066e85b (Kirill Kalishev, 2026-03-29)
- d2a86f6f - fix: prevent Enter from sending message during IME composition (Yasuhiro ARAKI, 2026-03-30)
- e9060468 - core: deprecate orchestrator agent with visual badge across UI (Aarav Sharma, 2026-03-29)
- 100a1fdd - fix(vscode): enable scrolling in local session history list (Aarav Sharma, 2026-03-29)
- 73d9fd63 - docs(kilo-docs): fix tabs, labels, and content in customize section (Josh Lambert, 2026-03-28)
- 3e201e4f - chore: update kilo-vscode visual regression baselines (github-actions[bot], 2026-03-28)
- be1f54ec - fix(skills): prevent right-side crop in visual regression stories (kiloconnect[bot], 2026-03-28)
- 4e17db82 - fix(vscode): remove fixed width from McpEditView stories to prevent right-side crop (kiloconnect[bot], 2026-03-28)
- f4174e84 - fix(vscode): replace opencode references with kilo.jsonc in MCP empty state i18n strings (kiloconnect[bot], 2026-03-28)
- 43811bfa - release: v7.1.9 (kilo-maintainer[bot], 2026-03-28)
- eeebbd26 - Merge pull request #7825 from Kilo-Org/kirillk/fix-kilo-migration-auth (Kirill Kalishev, 2026-03-27)
- 271d8295 - Merge pull request #7823 from Kilo-Org/kirillk/migration-wizard (Kirill Kalishev, 2026-03-27)
- 8a2296ea - fix(vscode): write Kilo auth as OAuth during legacy migration (kirillk, 2026-03-27)
- 3348fc11 - Merge pull request #7504 from Kilo-Org/docs/code-with-ai-agents-tabs (Joshua Lambert, 2026-03-27)
- 60c048e9 - Merge remote-tracking branch 'origin/main' into docs/customize-tabs (Josh Lambert, 2026-03-27)
- cdd46fe7 - docs(kilo-docs): address bot review — orchestrator deprecation notes (Josh Lambert, 2026-03-27)
- 0262ab18 - fix(vscode): add onMigrationComplete to mock connectionService in test (kirillk, 2026-03-27)
- 742b2cff - merge: resolve conflict with main in setup-authentication.md (Josh Lambert, 2026-03-27)
- dc885fcc - Merge branch 'main' into kirillk/migration-wizard (Kirill Kalishev, 2026-03-27)
- b67e3918 - chore: trigger CI checks (Ligia Zanchet, 2026-03-27)
- b05c367f - fix(vscode): fix migration wizard race condition preventing sidebar display (kirillk, 2026-03-27)
- a0e1fd82 - feat(vscode): add settings export/import to About tab (#7794) (Marius, 2026-03-27)
- 57aa3396 - fix(agent-manager): align diff panel file order with file tree (#7779) (Marius, 2026-03-27)
- b38aeccf - feat(vscode): auto-detect models for custom OpenAI-compatible providers (#7793) (Marius, 2026-03-27)
- 8102d801 - fix(cli): gate Kilo API calls behind enabled_providers to prevent data leaks (#7813) (Marius, 2026-03-27)
- 9cf83d81 - fix(cli): make FreeUsageLimitError non-retryable to prevent unrecoverable backoff loop (#7809) (Marius, 2026-03-27)
- b91627e1 - feat(vscode): add always-visible diff badge to sidebar (#7795) (Marius, 2026-03-27)
- a9b16125 - fix(sdk): add duplex: half to fix fetch in Node.js/Electron environments (#7811) (Marius, 2026-03-27)
- 2e056a54 - Merge pull request #7797 from Kilo-Org/fix/agent-manager-recover-serve-restart (Marian Alexandru Alecu, 2026-03-27)
- dc00cfc4 - fix(agent-manager): isolate prompt input drafts per pending tab (#7798) (Marius, 2026-03-27)
- 7fa25e74 - fix(vscode): recover agent manager after server restarts (Alex Alecu, 2026-03-27)
- 5072e2ba - Apply suggestions from code review (Joshua Lambert, 2026-03-27)
- af2f11a2 - Apply suggestions from code review (Joshua Lambert, 2026-03-27)
- 72291dd3 - Apply suggestions from code review (Joshua Lambert, 2026-03-27)
- d4dfa985 - Merge pull request #7777 from Kilo-Org/fix/7757-stale-session-status-reconciliation (Marian Alexandru Alecu, 2026-03-27)
- e444e9cc - Apply suggestion from @lambertjosh (Joshua Lambert, 2026-03-27)
- 3bd1ac44 - Update packages/kilo-docs/pages/code-with-ai/agents/using-agents.md (Joshua Lambert, 2026-03-27)
- 2fbd5cc5 - Update packages/kilo-docs/pages/code-with-ai/agents/using-agents.md (Joshua Lambert, 2026-03-27)
- 49bb16ca - Merge pull request #7733 from Kilo-Org/eshurakov/actually-afterthought (Evgeny Shurakov, 2026-03-27)
- 8107c5e0 - Merge pull request #7786 from Kilo-Org/session/agent_ebd83d52-2a54-4aa9-a87d-51fa777821ff (Remon Oldenbeuving, 2026-03-27)
- e698c8b7 - docs: switch shield badges to raster.shields.io (kiloconnect[bot], 2026-03-27)
- 5da33a87 - Merge pull request #7772 from Kilo-Org/update-small-model-description (Mark IJbema, 2026-03-27)
- 9d8711a6 - fix(vscode): guard reconciliation on valid data (Alex Alecu, 2026-03-27)
- 7daf66a3 - fix(vscode): reconcile stale session statuses on reconnect (Alex Alecu, 2026-03-27)
- 181c97e6 - test(vscode): add failing tests for stale session status reconciliation (Alex Alecu, 2026-03-27)
- 330b3a09 - chore: hide non-English localization files in GitHub PR diffs (kiloconnect[bot], 2026-03-27)
- 3445ce86 - Merge pull request #7773 from Kilo-Org/fix/cli-empty-tool-calls-loop (Marian Alexandru Alecu, 2026-03-27)
- 05a82b37 - fix(cli): prevent infinite loop on empty tool-calls (#7756) (Alex Alecu, 2026-03-27)
- 7038bce2 - fix(i18n): update small model description to mention commit message generation and prompt enhancement (kiloconnect[bot], 2026-03-27)
- a84edc32 - test(cli): add failing test for empty tool-calls loop (#7756) (Alex Alecu, 2026-03-27)
- e4f985ed - fix(vscode): remove unnecessary TABS allowlist from Settings (#7766) (Marius, 2026-03-27)
- 536f7f9e - Merge pull request #7603 from Kilo-Org/feat/builtin-config-skill (Marian Alexandru Alecu, 2026-03-27)
- f71909c9 - Merge pull request #7573 from Kilo-Org/feat/config-permission-protection (Marian Alexandru Alecu, 2026-03-27)
- 31aef067 - fix(vscode): remove unimplemented Terminal and Prompts settings tabs (#7763) (Marius, 2026-03-27)
- 38e0621b - feat(cli): add TUI settings reference to kilo-config skill (Alex Alecu, 2026-03-27)
- d904bc7d - fix(cli): guard builtin skill removal after lookup (Alex Alecu, 2026-03-27)
- 2485dc92 - docs(cli): fix managed config paths for all platforms (Alex Alecu, 2026-03-27)
- 61170cea - fix(cli): reject removal of built-in skills (Alex Alecu, 2026-03-27)
- 726a60ce - Merge branch 'main' into feat/builtin-config-skill (Marian Alexandru Alecu, 2026-03-27)
- e4600cd8 - fix(cli): normalize paths to prevent .. bypass (Alex Alecu, 2026-03-27)
- d92ea980 - Merge branch 'main' into feat/config-permission-protection (Marian Alexandru Alecu, 2026-03-27)
- 1cf072d1 - docs(kilo-docs): fix tab order, split combined tabs, address review comments (Josh Lambert, 2026-03-27)
- 33936f30 - Merge remote-tracking branch 'origin/main' into docs/code-with-ai-features-tabs (Josh Lambert, 2026-03-27)
- a20f46eb - Merge branch 'main' into docs/code-with-ai-features-tabs (Josh Lambert, 2026-03-27)
- 97e704d9 - docs(kilo-docs): remove F2 keybind from model selection (Josh Lambert, 2026-03-26)
- f6f5c56d - docs(kilo-docs): mark orchestrator as deprecated, add CLI model precedence (Josh Lambert, 2026-03-26)
- b85fb80c - docs(kilo-docs): fix broken anchor links and redirect chain (Josh Lambert, 2026-03-26)
- 3dc4543c - fix: Reset All Settings now clears globalState items (variantSelections, recentModels, dismissedNotificationIds) (Rayan Salhab, 2026-03-26)
- 4f5466d0 - feat(cli): include parentSessionId in heartbeat session info (Evgeny Shurakov, 2026-03-26)
- c44e53d9 - docs(kilo-docs): address review feedback — rename to agents, rewrite orchestrator, fix content (Josh Lambert, 2026-03-26)
- 97bad6d8 - fix(cli): exempt plan files and protect global config dir from silent access (Alex Alecu, 2026-03-26)
- 9a458a6b - fix(vscode): enhance prompt applies to wrong session when switching sessions (kiloconnect[bot], 2026-03-26)
- e8558705 - chore: update kilo-vscode visual regression baselines (github-actions[bot], 2026-03-26)
- 59165176 - test(vscode): add screenshot stories for McpEditView (kiloconnect[bot], 2026-03-26)
- 2dba6852 - refactor(cli): extract helpers to reduce duplication (Alex Alecu, 2026-03-26)
- a2151478 - fix(cli): check movePath in apply_patch config guard (Alex Alecu, 2026-03-26)
- 6105e356 - fix(cli): detect nested config dirs in isRelative (Alex Alecu, 2026-03-26)
- ed03c647 - Merge branch 'main' into feat/config-permission-protection (Marian Alexandru Alecu, 2026-03-26)
- 560b0a13 - docs: add overview index pages for Tools, Chat Platforms, and Development Tools (Ligia Zanchet, 2026-03-26)
- 3494a56b - docs: remove old flat pages superseded by nested sub-pages (Ligia Zanchet, 2026-03-26)
- 02b5cea7 - AKG discord updates (Alex Gold, 2026-03-26)
- 8be2a522 - docs(kilo-docs): fix kiloCodeIcon tag name and orchestrator 'modes' wording (Josh Lambert, 2026-03-26)
- 9487b5fc - Update packages/kilo-docs/pages/code-with-ai/agents/chat-interface.md (Joshua Lambert, 2026-03-26)
- 3ccd762c - docs(kilo-docs): address review comments on code-with-ai/agents tabs (Josh Lambert, 2026-03-26)
- 284094a3 - docs(kilo-docs): reorder tabs to VSCode → CLI → Legacy, fix combined tabs and wording (Josh Lambert, 2026-03-25)
- e198bfed - docs: remove AgentCard beta warning and clarify Brave Search has no free tier (Ligia Zanchet, 2026-03-25)
- cd02ad41 - docs: restructure KiloClaw nav with nested sub-pages (Ligia Zanchet, 2026-03-25)
- b53105a4 - Update packages/kilo-docs/pages/kiloclaw/tools.mdx (Ligia Zanchet, 2026-03-25)
- df29396d - feat(cli): add built-in kilo-config skill for on-demand config reference (Alex Alecu, 2026-03-25)
- 61f3e8c5 - Apply suggestions from code review (Ligia Zanchet, 2026-03-25)
- 60d2a8e1 - fix(kilo-docs): move KiloClaw tools page to correct directory and add nav entry (kiloconnect[bot], 2026-03-25)
- 31a047ef - docs(kilo-docs): add Brave Search and AgentCard integration sections to KiloClaw tools (kiloconnect[bot], 2026-03-25)
- 1bb6c661 - docs(kilo-docs): add 1Password integration documentation to KiloClaw Tools (kiloconnect[bot], 2026-03-25)
- c2969d29 - fix(cli): close absolute-path bypass and extract DISABLE_ALWAYS_KEY constant (Alex Alecu, 2026-03-25)
- 21902b1d - feat(cli): hide 'Always allow' in TUI for config file edits (Alex Alecu, 2026-03-25)
- 2455a437 - feat(cli): force permission prompt for config file edits (Alex Alecu, 2026-03-25)
- 6e3d227f - feat(cli): add config path detection for permission protection (Alex Alecu, 2026-03-25)
- 6e602f4a - docs(kilo-docs): add platform tabs to AI provider pages (Josh Lambert, 2026-03-25)
- 8304cf44 - docs(kilo-docs): add platform tabs to MCP and shell integration pages (Josh Lambert, 2026-03-24)
- f1b606a2 - docs(kilo-docs): add platform tabs to customize pages (Josh Lambert, 2026-03-24)
- 064a1f0f - docs(kilo-docs): add platform tabs to code-with-ai features pages (Josh Lambert, 2026-03-24)
- 57d378e0 - docs(kilo-docs): add platform tabs to code-with-ai agents pages (Josh Lambert, 2026-03-24)
- c4b6dc5c - Merge branch 'main' into mark/remove-beta-label (Mark IJbema, 2026-03-24)
- 70633f5d - fix(cli,vscode): include subagent costs in total session cost display (kiloconnect[bot], 2026-03-24)
- 1a7b6f9f - feat: register Apertis as CLI provider with dynamic model fetching (theQuert, 2026-03-24)
- 17c7779a - Merge branch 'main' into feat/apertis-opencode-provider (Christiaan Arnoldus, 2026-03-23)
- b9fd360d - fix(vscode): remove beta label from welcome screen (Mark IJbema, 2026-03-23)
- 714e1f5a - Fix merge (Christiaan Arnoldus, 2026-03-23)
- 8e29c466 - Merge branch 'main' into feat/apertis-opencode-provider (Christiaan Arnoldus, 2026-03-23)
- 2d77bc5f - Merge branch 'main' into feat/apertis-opencode-provider (Quert, 2026-03-18)
- f59a274d - feat: add Apertis provider to VS Code legacy migration mapping (theQuert, 2026-03-18)

### Changed Files by Category

#### Tool System (packages/*/src/tool/)
- `packages/opencode/src/tool/skill.ts` (+33, -7)

#### Agent System (packages/*/src/agent/)
- `packages/opencode/src/agent/agent.ts` (+77, -0)
- `packages/opencode/src/agent/prompt/ask.txt` (+3, -1)

#### Permission System (**/permission/)
- `packages/opencode/src/kilocode/permission/config-paths.ts` (+129, -0)
- `packages/opencode/src/kilocode/permission/drain.ts` (+3, -0)
- `packages/opencode/src/permission/next.ts` (+22, -1)

#### Event Bus (**/bus/, **/event/)
(no changes)

#### Core (**/core/)
- `packages/kilo-docs/pages/code-with-ai/agents/orchestrator-mode.md` (+25, -27)

#### Other Changes
- `.gitattributes` (+13, -0)
- `.kilocode/skills/vscode-visual-regression/SKILL.md` (+3, -2)
- `.opencode/command/issues.md` (+1, -1)
- `README.md` (+6, -6)
- `bun.lock` (+16, -16)
- `package.json` (+1, -1)
- `packages/app/package.json` (+1, -1)
- `packages/desktop-electron/package.json` (+1, -1)
- `packages/desktop/package.json` (+1, -1)
- `packages/extensions/zed/extension.toml` (+6, -6)
- `packages/kilo-docs/lib/nav/automate.ts` (+3, -2)
- `packages/kilo-docs/lib/nav/code-with-ai.ts` (+3, -3)
- `packages/kilo-docs/lib/nav/contributing.ts` (+0, -4)
- `packages/kilo-docs/lib/nav/customize.ts` (+4, -1)
- `packages/kilo-docs/lib/nav/kiloclaw.ts` (+49, -6)
- `packages/kilo-docs/lychee.toml` (+2, -0)
- `packages/kilo-docs/markdoc/partials/install-jetbrains.md` (+1, -1)
- `packages/kilo-docs/markdoc/partials/install-vscode.md` (+1, -1)
- `packages/kilo-docs/package.json` (+1, -1)
- `packages/kilo-docs/pages/ai-providers/anthropic.md` (+44, -0)
- `packages/kilo-docs/pages/ai-providers/bedrock.md` (+50, -0)
- `packages/kilo-docs/pages/ai-providers/cerebras.md` (+44, -0)
- `packages/kilo-docs/pages/ai-providers/chutes-ai.md` (+44, -0)
- `packages/kilo-docs/pages/ai-providers/claude-code.md` (+49, -0)
- `packages/kilo-docs/pages/ai-providers/deepseek.md` (+44, -0)
- `packages/kilo-docs/pages/ai-providers/fireworks.md` (+44, -0)
- `packages/kilo-docs/pages/ai-providers/gemini.md` (+44, -0)
- `packages/kilo-docs/pages/ai-providers/glama.md` (+20, -0)
- `packages/kilo-docs/pages/ai-providers/groq.md` (+42, -12)
- `packages/kilo-docs/pages/ai-providers/inception.md` (+44, -0)
- `packages/kilo-docs/pages/ai-providers/index.md` (+1, -5)
- `packages/kilo-docs/pages/ai-providers/lmstudio.md` (+38, -0)
- `packages/kilo-docs/pages/ai-providers/minimax.md` (+44, -0)
- `packages/kilo-docs/pages/ai-providers/mistral.md` (+44, -0)
- `packages/kilo-docs/pages/ai-providers/moonshot.md` (+44, -0)
- `packages/kilo-docs/pages/ai-providers/ollama.md` (+38, -0)
- `packages/kilo-docs/pages/ai-providers/openai-chatgpt-plus-pro.md` (+40, -0)
- `packages/kilo-docs/pages/ai-providers/openai-compatible.md` (+45, -0)
- `packages/kilo-docs/pages/ai-providers/openai.md` (+44, -0)
- `packages/kilo-docs/pages/ai-providers/openrouter.md` (+44, -0)
- `packages/kilo-docs/pages/ai-providers/ovhcloud.md` (+44, -0)
- `packages/kilo-docs/pages/ai-providers/requesty.md` (+44, -0)
- `packages/kilo-docs/pages/ai-providers/sap-ai-core.md` (+44, -0)
- `packages/kilo-docs/pages/ai-providers/unbound.md` (+20, -0)
- `packages/kilo-docs/pages/ai-providers/v0.md` (+45, -0)
- `packages/kilo-docs/pages/ai-providers/vercel-ai-gateway.md` (+44, -0)
- `packages/kilo-docs/pages/ai-providers/vertex.md` (+47, -0)
- `packages/kilo-docs/pages/ai-providers/xai.md` (+44, -0)
- `packages/kilo-docs/pages/ai-providers/zenmux.md` (+44, -0)
- `packages/kilo-docs/pages/automate/agent-manager.md` (+108, -3)
- `packages/kilo-docs/pages/automate/extending/shell-integration.md` (+77, -0)
- `packages/kilo-docs/pages/automate/how-tools-work.md` (+112, -0)
- `packages/kilo-docs/pages/automate/index.md` (+0, -1)
- `packages/kilo-docs/pages/automate/mcp/using-in-kilo-code.md` (+429, -53)
- `packages/kilo-docs/pages/automate/tools/index.md` (+89, -0)
- `packages/kilo-docs/pages/code-with-ai/agents/auto-model.md` (+1, -1)
- `packages/kilo-docs/pages/code-with-ai/agents/chat-interface.md` (+113, -21)
- `packages/kilo-docs/pages/code-with-ai/agents/context-mentions.md` (+89, -0)
- `packages/kilo-docs/pages/code-with-ai/agents/free-and-budget-models.md` (+3, -3)
- `packages/kilo-docs/pages/code-with-ai/agents/model-selection.md` (+27, -0)
- `packages/kilo-docs/pages/code-with-ai/agents/using-agents.md` (+263, -0)
- `packages/kilo-docs/pages/code-with-ai/agents/using-modes.md` (+0, -121)
- `packages/kilo-docs/pages/code-with-ai/features/autocomplete/index.md` (+42, -0)
- `packages/kilo-docs/pages/code-with-ai/features/browser-use.md` (+84, -0)
- `packages/kilo-docs/pages/code-with-ai/features/checkpoints.md` (+99, -10)
- `packages/kilo-docs/pages/code-with-ai/features/code-actions.md` (+34, -0)
- `packages/kilo-docs/pages/code-with-ai/features/git-commit-generation.md` (+17, -0)
- `packages/kilo-docs/pages/code-with-ai/index.md` (+2, -2)
- `packages/kilo-docs/pages/code-with-ai/platforms/cli.md` (+3, -2)
- `packages/kilo-docs/pages/code-with-ai/platforms/vscode.md` (+54, -0)
- `packages/kilo-docs/pages/collaborate/teams/custom-modes-org.md` (+2, -2)
- `packages/kilo-docs/pages/contributing/cline-to-kilo-migration.md` (+0, -180)
- `packages/kilo-docs/pages/contributing/index.md` (+1, -1)
- `packages/kilo-docs/pages/customize/agents-md.md` (+62, -2)
- `packages/kilo-docs/pages/customize/context/codebase-indexing.md` (+1, -0)
- `packages/kilo-docs/pages/customize/context/context-condensing.md` (+151, -15)
- `packages/kilo-docs/pages/customize/context/kilocodeignore.md` (+183, -4)
- `packages/kilo-docs/pages/customize/context/large-projects.md` (+1, -0)
- `packages/kilo-docs/pages/customize/custom-instructions.md` (+156, -8)
- `packages/kilo-docs/pages/customize/custom-modes.md` (+751, -8)
- `packages/kilo-docs/pages/customize/custom-rules.md` (+240, -18)
- `packages/kilo-docs/pages/customize/custom-subagents.md` (+6, -5)
- `packages/kilo-docs/pages/customize/skills.md` (+322, -28)
- `packages/kilo-docs/pages/customize/workflows.md` (+92, -6)
- `packages/kilo-docs/pages/getting-started/quickstart.md` (+2, -2)
- `packages/kilo-docs/pages/getting-started/settings/index.md` (+23, -1)
- `packages/kilo-docs/pages/kiloclaw/chat-platforms.md` (+0, -155)
- `packages/kilo-docs/pages/kiloclaw/chat-platforms/discord.md` (+67, -0)
- `packages/kilo-docs/pages/kiloclaw/chat-platforms/index.md` (+21, -0)
- `packages/kilo-docs/pages/kiloclaw/chat-platforms/slack.md` (+55, -0)
- `packages/kilo-docs/pages/kiloclaw/chat-platforms/telegram.md` (+24, -0)
- `packages/kilo-docs/pages/kiloclaw/control-ui.md` (+0, -116)
- `packages/kilo-docs/pages/kiloclaw/control-ui/changing-models.md` (+22, -0)
- `packages/kilo-docs/pages/kiloclaw/control-ui/exec-approvals.md` (+64, -0)
- `packages/kilo-docs/pages/kiloclaw/control-ui/overview.md` (+32, -0)
- `packages/kilo-docs/pages/kiloclaw/{ => control-ui}/version-pinning.md` (+0, -6)
- `packages/kilo-docs/pages/kiloclaw/dashboard.md` (+2, -2)
- `packages/kilo-docs/pages/kiloclaw/development-tools/index.md` (+13, -0)
- `packages/kilo-docs/pages/kiloclaw/faq/general.md` (+27, -0)
- `packages/kilo-docs/pages/kiloclaw/{ => faq}/pricing.md` (+6, -12)
- `packages/kilo-docs/pages/kiloclaw/overview.md` (+1, -1)
- `packages/kilo-docs/pages/kiloclaw/tools/1password.md` (+37, -0)
- `packages/kilo-docs/pages/kiloclaw/tools/agentcard.md` (+44, -0)
- `packages/kilo-docs/pages/kiloclaw/tools/brave-search.md` (+28, -0)
- `packages/kilo-docs/pages/kiloclaw/tools/index.md` (+14, -0)
- `packages/kilo-docs/pages/kiloclaw/troubleshooting.md` (+0, -111)
- `packages/kilo-docs/pages/kiloclaw/troubleshooting/architecture.md` (+14, -0)
- `packages/kilo-docs/pages/kiloclaw/troubleshooting/common-questions.md` (+48, -0)
- `packages/kilo-docs/pages/kiloclaw/troubleshooting/faq.md` (+27, -0)
- `packages/kilo-docs/pages/kiloclaw/troubleshooting/gateway-process.md` (+15, -0)
- `packages/kilo-docs/previous-docs-redirects.js` (+13, -1)
- `packages/kilo-docs/source-links.md` (+4, -2)
- `packages/kilo-gateway/package.json` (+1, -1)
- `packages/kilo-i18n/package.json` (+1, -1)
- `packages/kilo-telemetry/package.json` (+1, -1)
- `packages/kilo-ui/package.json` (+1, -1)
- `packages/kilo-ui/src/components/message-part.tsx` (+10, -7)
- `packages/kilo-vscode/README.md` (+5, -5)
- `packages/kilo-vscode/assets/icons/kilo-dark.svg` (+4, -6)
- `packages/kilo-vscode/assets/icons/kilo-light.svg` (+4, -6)
- `packages/kilo-vscode/docs/agent-behaviour/mcp-server-creation.md` (+3, -5)
- `packages/kilo-vscode/docs/features/custom-openai-provider-ui.md` (+0, -15)
- `packages/kilo-vscode/docs/migration/memorybank-migration.md` (+0, -12)
- `packages/kilo-vscode/docs/migration/settings-migration.md` (+0, -30)
- `packages/kilo-vscode/docs/migration/upgrade-onboarding.md` (+0, -15)
- `packages/kilo-vscode/docs/non-agent-features/mcp-and-mcp-hub.md` (+2, -4)
- `packages/kilo-vscode/docs/non-agent-features/settings-ui.md` (+1, -2)
- `packages/kilo-vscode/docs/opencode-migration-plan.md` (+26, -35)
- `packages/kilo-vscode/package.json` (+1, -1)
- `packages/kilo-vscode/src/KiloProvider.ts` (+193, -8)
- `packages/kilo-vscode/src/SettingsEditorProvider.ts` (+2, -2)
- `packages/kilo-vscode/src/agent-manager/WorktreeManager.ts` (+5, -4)
- `packages/kilo-vscode/src/agent-manager/WorktreeStateManager.ts` (+5, -2)
- `packages/kilo-vscode/src/extension.ts` (+15, -5)
- `packages/kilo-vscode/src/kilo-provider-utils.ts` (+1, -0)
- `packages/kilo-vscode/src/kilo-provider/handlers/migration.ts` (+19, -11)
- `packages/kilo-vscode/src/kilo-provider/slim-metadata.ts` (+147, -32)
- `packages/kilo-vscode/src/legacy-migration/errors/migration-error.ts` (+83, -0)
- `packages/kilo-vscode/src/legacy-migration/legacy-types.ts` (+16, -7)
- `packages/kilo-vscode/src/legacy-migration/migration-service.ts` (+212, -18)
- `packages/kilo-vscode/src/legacy-migration/migration-types.ts` (+6, -0)
- `packages/kilo-vscode/src/legacy-migration/native-mode-defaults.ts` (+91, -0)
- `packages/kilo-vscode/src/legacy-migration/provider-mapping.ts` (+7, -1)
- `packages/kilo-vscode/src/legacy-migration/sessions/lib/ids.ts` (+29, -0)
- `packages/kilo-vscode/src/legacy-migration/sessions/lib/legacy-conversation.ts` (+17, -0)
- `packages/kilo-vscode/src/legacy-migration/sessions/lib/legacy-types.ts` (+28, -0)
- `packages/kilo-vscode/src/legacy-migration/sessions/lib/messages.ts` (+82, -0)
- `packages/kilo-vscode/src/legacy-migration/sessions/lib/parts/merge-tools.ts` (+66, -0)
- `packages/kilo-vscode/src/legacy-migration/sessions/lib/parts/parts-builder.ts` (+102, -0)
- `packages/kilo-vscode/src/legacy-migration/sessions/lib/parts/parts-util.ts` (+132, -0)
- `packages/kilo-vscode/src/legacy-migration/sessions/lib/parts/parts.ts` (+107, -0)
- `packages/kilo-vscode/src/legacy-migration/sessions/lib/project.ts` (+29, -0)
- `packages/kilo-vscode/src/legacy-migration/sessions/lib/session.ts` (+42, -0)
- `packages/kilo-vscode/src/legacy-migration/sessions/migrate.ts` (+65, -0)
- `packages/kilo-vscode/src/legacy-migration/sessions/parser.ts` (+35, -0)
- `packages/kilo-vscode/src/services/autocomplete/classic-auto-complete/AutocompleteInlineCompletionProvider.ts` (+21, -2)
- `packages/kilo-vscode/src/services/autocomplete/classic-auto-complete/__tests__/AutocompleteInlineCompletionProvider.test.ts` (+51, -0)
- `packages/kilo-vscode/src/services/cli-backend/connection-service.ts` (+23, -1)
- `packages/kilo-vscode/src/services/cli-backend/i18n/index.ts` (+6, -1)
- `packages/kilo-vscode/src/services/cli-backend/sdk-sse-adapter.ts` (+33, -1)
- `packages/kilo-vscode/src/session-status.ts` (+23, -1)
- `packages/kilo-vscode/src/shared/fetch-models.ts` (+66, -0)
- `packages/kilo-vscode/tests/unit/extension-arch.test.ts` (+99, -0)
- `packages/kilo-vscode/tests/unit/file-tree.test.ts` (+108, -12)
- `packages/kilo-vscode/tests/unit/kilo-provider-session-refresh.test.ts` (+1, -0)
- `packages/kilo-vscode/tests/unit/language-utils.test.ts` (+4, -1)
- `packages/kilo-vscode/tests/unit/legacy-migration/messages.test.ts` (+106, -0)
- `packages/kilo-vscode/tests/unit/legacy-migration/migrate.test.ts` (+212, -0)
- `packages/kilo-vscode/tests/unit/legacy-migration/native-modes.test.ts` (+322, -0)
- `packages/kilo-vscode/tests/unit/legacy-migration/parser.test.ts` (+36, -0)
- `packages/kilo-vscode/tests/unit/legacy-migration/parts.test.ts` (+224, -0)
- `packages/kilo-vscode/tests/unit/legacy-migration/project.test.ts` (+35, -0)
- `packages/kilo-vscode/tests/unit/legacy-migration/reasoning.test.ts` (+99, -0)
- `packages/kilo-vscode/tests/unit/legacy-migration/session.test.ts` (+41, -0)
- `packages/kilo-vscode/tests/unit/legacy-migration/tools.test.ts` (+134, -0)
- `packages/kilo-vscode/tests/unit/session-status.test.ts` (+218, -0)
- `packages/kilo-vscode/tests/unit/session-utils.test.ts` (+159, -1)
- `packages/kilo-vscode/tests/unit/settings-io.test.ts` (+397, -0)
- `packages/kilo-vscode/tests/unit/worktree-state-manager.test.ts` (+2, -3)
- `packages/kilo-vscode/tests/visual-regression.spec.ts-snapshots/chat/welcome-with-switcher-and-notification-chromium-linux.png` (+2, -2)
- `packages/kilo-vscode/tests/visual-regression.spec.ts-snapshots/settings/agent-behaviour-agents-chromium-linux.png` (+2, -2)
- `packages/kilo-vscode/tests/visual-regression.spec.ts-snapshots/settings/mcp-edit-view-local-chromium-linux.png` (+3, -0)
- `packages/kilo-vscode/tests/visual-regression.spec.ts-snapshots/settings/mcp-edit-view-local-with-env-chromium-linux.png` (+3, -0)
- `packages/kilo-vscode/tests/visual-regression.spec.ts-snapshots/settings/mcp-edit-view-remote-chromium-linux.png` (+3, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/DiffPanel.tsx` (+6, -1)
- `packages/kilo-vscode/webview-ui/agent-manager/FullScreenDiffView.tsx` (+6, -1)
- `packages/kilo-vscode/webview-ui/agent-manager/NewWorktreeDialog.tsx` (+2, -1)
- `packages/kilo-vscode/webview-ui/agent-manager/file-tree-utils.ts` (+29, -0)
- `packages/kilo-vscode/webview-ui/src/App.tsx` (+56, -63)
- `packages/kilo-vscode/webview-ui/src/components/chat/ChatView.tsx` (+18, -5)
- `packages/kilo-vscode/webview-ui/src/components/chat/KiloNotifications.tsx` (+23, -12)
- `packages/kilo-vscode/webview-ui/src/components/chat/PromptInput.tsx` (+6, -4)
- `packages/kilo-vscode/webview-ui/src/components/chat/TaskHeader.tsx` (+17, -6)
- `packages/kilo-vscode/webview-ui/src/components/chat/TaskToolExpanded.tsx` (+1, -5)
- `packages/kilo-vscode/webview-ui/src/components/migration/MigrationWizard.tsx` (+95, -28)
- `packages/kilo-vscode/webview-ui/src/components/migration/migration.css` (+86, -15)
- `packages/kilo-vscode/webview-ui/src/components/profile/ProfileView.tsx` (+3, -1)
- `packages/kilo-vscode/webview-ui/src/components/settings/AboutKiloCodeTab.tsx` (+117, -2)
- `packages/kilo-vscode/webview-ui/src/components/settings/AgentBehaviourTab.tsx` (+118, -27)
- `packages/kilo-vscode/webview-ui/src/components/settings/CustomProviderDialog.tsx` (+392, -20)
- `packages/kilo-vscode/webview-ui/src/components/settings/PromptsTab.tsx` (+0, -33)
- `packages/kilo-vscode/webview-ui/src/components/settings/ProvidersTab.tsx` (+22, -4)
- `packages/kilo-vscode/webview-ui/src/components/settings/Settings.tsx` (+3, -18)
- `packages/kilo-vscode/webview-ui/src/components/settings/TerminalTab.tsx` (+0, -33)
- `packages/kilo-vscode/webview-ui/src/components/settings/settings-io.ts` (+130, -0)
- `packages/kilo-vscode/webview-ui/src/components/shared/ModeSwitcher.tsx` (+18, -1)
- `packages/kilo-vscode/webview-ui/src/context/language-utils.ts` (+4, -1)
- `packages/kilo-vscode/webview-ui/src/context/session-utils.ts` (+74, -0)
- `packages/kilo-vscode/webview-ui/src/context/session.tsx` (+100, -4)
- `packages/kilo-vscode/webview-ui/src/hooks/useFileMention.ts` (+1, -0)
- `packages/kilo-vscode/webview-ui/src/hooks/useSlashCommand.ts` (+1, -0)
- `packages/kilo-vscode/webview-ui/src/i18n/ar.ts` (+44, -14)
- `packages/kilo-vscode/webview-ui/src/i18n/br.ts` (+47, -14)
- `packages/kilo-vscode/webview-ui/src/i18n/bs.ts` (+46, -14)
- `packages/kilo-vscode/webview-ui/src/i18n/da.ts` (+45, -14)
- `packages/kilo-vscode/webview-ui/src/i18n/de.ts` (+48, -15)
- `packages/kilo-vscode/webview-ui/src/i18n/en.ts` (+42, -14)
- `packages/kilo-vscode/webview-ui/src/i18n/es.ts` (+48, -14)
- `packages/kilo-vscode/webview-ui/src/i18n/fr.ts` (+47, -14)
- `packages/kilo-vscode/webview-ui/src/i18n/ja.ts` (+46, -15)
- `packages/kilo-vscode/webview-ui/src/i18n/ko.ts` (+45, -14)
- `packages/kilo-vscode/webview-ui/src/i18n/nl.ts` (+45, -16)
- `packages/kilo-vscode/webview-ui/src/i18n/no.ts` (+45, -14)
- `packages/kilo-vscode/webview-ui/src/i18n/pl.ts` (+46, -14)
- `packages/kilo-vscode/webview-ui/src/i18n/ru.ts` (+45, -14)
- `packages/kilo-vscode/webview-ui/src/i18n/th.ts` (+44, -14)
- `packages/kilo-vscode/webview-ui/src/i18n/tr.ts` (+44, -15)
- `packages/kilo-vscode/webview-ui/src/i18n/zh.ts` (+41, -15)
- `packages/kilo-vscode/webview-ui/src/i18n/zht.ts` (+41, -14)
- `packages/kilo-vscode/webview-ui/src/stories/StoryProviders.tsx` (+2, -1)
- `packages/kilo-vscode/webview-ui/src/stories/chat.stories.tsx` (+1, -1)
- `packages/kilo-vscode/webview-ui/src/stories/history.stories.tsx` (+1, -1)
- `packages/kilo-vscode/webview-ui/src/stories/settings.stories.tsx` (+68, -0)
- `packages/kilo-vscode/webview-ui/src/styles/chat.css` (+74, -18)
- `packages/kilo-vscode/webview-ui/src/types/messages.ts` (+91, -1)
- `packages/opencode/package.json` (+1, -1)
- `packages/opencode/src/acp/agent.ts` (+10, -2)
- `packages/opencode/src/cli/cmd/github.ts` (+1, -1)
- `packages/opencode/src/cli/cmd/tui/component/dialog-agent.tsx` (+2, -1)
- `packages/opencode/src/cli/cmd/tui/routes/session/permission.tsx` (+8, -1)
- `packages/opencode/src/config/config.ts` (+4, -0)
- `packages/opencode/src/kilo-sessions/kilo-sessions.ts` (+5, -1)
- `packages/opencode/src/kilo-sessions/remote-protocol.ts` (+7, -1)
- `packages/opencode/src/kilo-sessions/remote-ws.ts` (+30, -0)
- `packages/opencode/src/kilocode/components/tips.tsx` (+15, -42)
- `packages/opencode/src/kilocode/paths.ts` (+18, -17)
- `packages/opencode/src/kilocode/session-import/routes.ts` (+94, -0)
- `packages/opencode/src/kilocode/session-import/service.ts` (+98, -0)
- `packages/opencode/src/kilocode/session-import/types.ts` (+216, -0)
- `packages/opencode/src/kilocode/skills/builtin.ts` (+21, -0)
- `packages/opencode/src/kilocode/skills/kilo-config.md` (+211, -0)
- `packages/opencode/src/kilocode/ts-check.ts` (+1, -0)
- `packages/opencode/src/mcp/index.ts` (+12, -0)
- `packages/opencode/src/md.d.ts` (+4, -0)
- `packages/opencode/src/provider/model-cache.ts` (+90, -0)
- `packages/opencode/src/provider/models.ts` (+31, -2)
- `packages/opencode/src/server/routes/config.ts` (+10, -4)
- `packages/opencode/src/server/routes/kilocode.ts` (+2, -0)
- `packages/opencode/src/session/index.ts` (+7, -2)
- `packages/opencode/src/session/processor.ts` (+31, -0)
- `packages/opencode/src/session/retry.ts` (+5, -2)
- `packages/opencode/src/skill/skill.ts` (+20, -0)
- `packages/opencode/test/kilo-sessions/remote-protocol.test.ts` (+30, -0)
- `packages/opencode/test/kilo-sessions/remote-ws.test.ts` (+80, -0)
- `packages/opencode/test/kilocode/ask-agent-permissions.test.ts` (+334, -0)
- `packages/opencode/test/kilocode/session-processor-empty-tool-calls.test.ts` (+229, -0)
- `packages/opencode/test/session/retry.test.ts` (+10, -0)
- `packages/plugin/package.json` (+1, -1)
- `packages/script/package.json` (+1, -1)
- `packages/sdk/js/package.json` (+1, -1)
- `packages/sdk/js/src/client.ts` (+12, -3)
- `packages/sdk/js/src/server.ts` (+2, -0)
- `packages/sdk/js/src/v2/client.ts` (+12, -3)
- `packages/sdk/js/src/v2/gen/sdk.gen.ts` (+395, -0)
- `packages/sdk/js/src/v2/gen/types.gen.ts` (+324, -0)
- `packages/sdk/js/src/v2/server.ts` (+2, -0)
- `packages/sdk/openapi.json` (+1023, -19)
- `packages/storybook/package.json` (+1, -1)
- `packages/ui/package.json` (+1, -1)
- `packages/ui/src/components/popover.tsx` (+11, -1)
- `packages/util/package.json` (+1, -1)
- `script/upstream/package.json` (+1, -1)
- `script/upstream/transforms/transform-take-theirs.ts` (+1, -1)
- `sdks/vscode/package.json` (+1, -1)

### Key Diffs

#### packages/kilo-docs/pages/code-with-ai/agents/orchestrator-mode.md
```diff
diff --git a/packages/kilo-docs/pages/code-with-ai/agents/orchestrator-mode.md b/packages/kilo-docs/pages/code-with-ai/agents/orchestrator-mode.md
index 9fca04b8..8fb065bc 100644
--- a/packages/kilo-docs/pages/code-with-ai/agents/orchestrator-mode.md
+++ b/packages/kilo-docs/pages/code-with-ai/agents/orchestrator-mode.md
@@ -1,42 +1,40 @@
 ---
 title: "Orchestrator Mode"
-description: "Using Orchestrator mode for complex multi-step tasks"
+description: "Orchestrator mode is no longer needed — agents with full tool access now support subagents natively"
 ---
 
-# Orchestrator Mode: Coordinate Complex Workflows
+# Orchestrator Mode (Deprecated)
 
-Orchestrator Mode (formerly known as Boomerang Tasks) allows you to break down complex projects into smaller, manageable pieces. Think of it like delegating parts of your work to specialized assistants. Each subtask runs in its own context, often using a different Kilo Code mode tailored for that specific job (like [`code`](/docs/code-with-ai/agents/using-modes#code-mode-default), [`architect`](/docs/code-with-ai/agents/using-modes#architect-mode), or [`debug`](/docs/code-with-ai/agents/using-modes#debug-mode)).
+{% callout type="warning" title="Deprecated — scheduled for removal" %}
+Orchestrator mode is deprecated and will be removed in a future release. In the VSCode extension and CLI, **agents with full tool access (Code, Plan, Debug) can now delegate to subagents automatically**. You no longer need a dedicated orchestrator — just pick the agent for your task and it will coordinate subagents when helpful. (Read-only agents like Ask do not support delegation.)
+{% /callout %}
 
-{% youtube url="https://www.youtube.com/watch?v=20MmJNeOODo" caption="Orchestrator Mode explained and demonstrated" /%}
+## What Changed
 
-## Why Use Orchestrator Mode?
+Previously, orchestrator mode was the only way to break complex tasks into subtasks. You had to explicitly switch to orchestrator mode, which would then delegate work to other modes like Code or Architect.
 
-- **Tackle Complexity:** Break large, multi-step projects (e.g., building a full feature) into focused subtasks (e.g., design, implementation, documentation).
-- **Use Specialized Modes:** Automatically delegate subtasks to the mode best suited for that specific piece of work, leveraging specialized capabilities for optimal results.
-- **Maintain Focus & Efficiency:** Each subtask operates in its own isolated context with a separate conversation history. This prevents the parent (orchestrator) task from becoming cluttered with the detailed execution steps (like code diffs or file analysis results), allowing it to focus efficiently on the high-level workflow and manage the overall process based on concise summaries from completed subtasks.
-- **Streamline Workflows:** Results from one subtask can be automatically passed to the next, creating a smooth flow (e.g., architectural decisions feeding into the coding task).
+Now, **subagent support is built into agents that have full tool access** (Code, Plan, Debug). When one of these agents encounters a task that would benefit from delegation — like exploring a codebase, running a parallel search, or handling a subtask in isolation — it can launch a subagent directly using the `task` tool. There's no need to switch agents first.
 
-## How It Works
+## What You Should Do
 
-1.  Using Orchestrator Mode, Kilo can analyze a complex task and suggest breaking it down into a subtask.
-2.  The parent task pauses, and the new subtask begins in a different mode.
-3.  When the subtask's goal is achieved, Kilo signals completion.
-4.  The parent task resumes with only the summary of the subtask. The parent uses this summary to continue the main workflow.
+- **Just pick the right agent for your task.** Use Code for implementation, Plan for architecture, Debug for troubleshooting. Each will orchestrate subagents where it makes sense.
+- **Add custom subagents** if you want specialized delegation behavior. See [Custom Subagents](/docs/customize/custom-subagents) for details.
+- **Stop switching to orchestrator mode** before complex tasks. Your current agent already has that capability.
 
-## Key Considerations
+## How Subagents Work
 
-- **Approval Required:** By default, you must approve the creation and completion of each subtask. This can be automated via the [Auto-Approving Actions](/docs/getting-started/settings/auto-approving-actions#subtasks) settings if desired.
-- **Context Isolation and Transfer:** Each subtask operates in complete isolation with its own conversation history. It does not automatically inherit the parent's context. Information must be explicitly passed:
-  - **Down:** Via the initial instructions provided when the subtask is created.
-  - **Up:** Via the final summary provided when the subtask finishes. Be mindful that only this summary returns to the parent.
-- **Navigation:** Kilo's interface helps you see the hierarchy of tasks (which task is the parent, which are children). You can typically navigate between active and paused tasks.
```

#### packages/opencode/src/agent/agent.ts
```diff
diff --git a/packages/opencode/src/agent/agent.ts b/packages/opencode/src/agent/agent.ts
index 16305db1..8bfbe786 100644
--- a/packages/opencode/src/agent/agent.ts
+++ b/packages/opencode/src/agent/agent.ts
@@ -37,6 +37,7 @@ export namespace Agent {
       mode: z.enum(["subagent", "primary", "all"]),
       native: z.boolean().optional(),
       hidden: z.boolean().optional(),
+      deprecated: z.boolean().optional(),
       topP: z.number().optional(),
       temperature: z.number().optional(),
       color: z.string().optional(),
@@ -111,6 +112,77 @@ export namespace Agent {
       "gunzip *": "allow",
     }
     // kilocode_change end
+
+    // kilocode_change start — read-only bash commands for the ask agent.
+    // Unlike the default bash allowlist, unknown commands are DENIED (not "ask")
+    // because the ask agent must never modify the filesystem.
+    const readOnlyBash: Record<string, "allow" | "ask" | "deny"> = {
+      "*": "deny",
+      // read-only / informational
+      "cat *": "allow",
+      "head *": "allow",
+      "tail *": "allow",
+      "less *": "allow",
+      "ls *": "allow",
+      "tree *": "allow",
+      "pwd *": "allow",
+      "echo *": "allow",
+      "wc *": "allow",
+      "which *": "allow",
+      "type *": "allow",
+      "file *": "allow",
+      "diff *": "allow",
+      "du *": "allow",
+      "df *": "allow",
+      "date *": "allow",
+      "uname *": "allow",
+      "whoami *": "allow",
+      "printenv *": "allow",
+      "man *": "allow",
+      // text processing (stdout only, no file modification)
+      "grep *": "allow",
+      "rg *": "allow",
+      "ag *": "allow",
+      "sort *": "allow",
+      "uniq *": "allow",
+      "cut *": "allow",
```

#### packages/opencode/src/agent/prompt/ask.txt
```diff
diff --git a/packages/opencode/src/agent/prompt/ask.txt b/packages/opencode/src/agent/prompt/ask.txt
index 32f9e74e..fc96b149 100644
--- a/packages/opencode/src/agent/prompt/ask.txt
+++ b/packages/opencode/src/agent/prompt/ask.txt
@@ -4,5 +4,7 @@ Guidelines:
 - Answer questions thoroughly with clear explanations and relevant examples
 - Analyze code, explain concepts, and provide recommendations without making changes
 - Use Mermaid diagrams when they help clarify your response
-- Do not edit files or execute commands; this agent is read-only
+- You may run read-only bash commands (ls, cat, grep, git log, git diff, etc.) to gather information
+- You must NOT modify files, run write commands, or execute code — you are read-only
+- MCP tools are available if configured — each call requires user approval
 - If a question requires implementation, suggest switching to a different agent
```

#### packages/opencode/src/kilocode/permission/config-paths.ts
```diff
diff --git a/packages/opencode/src/kilocode/permission/config-paths.ts b/packages/opencode/src/kilocode/permission/config-paths.ts
new file mode 100644
index 00000000..facd7098
--- /dev/null
+++ b/packages/opencode/src/kilocode/permission/config-paths.ts
@@ -0,0 +1,129 @@
+import path from "path"
+import { Global } from "@/global"
+import { KilocodePaths } from "@/kilocode/paths"
+
+export namespace ConfigProtection {
+  /**
+   * Config directory prefixes (relative paths, forward-slash normalized).
+   * Matches .kilo/, .kilocode/, .opencode/ at any depth within the project.
+   */
+  const CONFIG_DIRS = [".kilo/", ".kilocode/", ".opencode/"]
+
+  /**
+   * Subdirectories under CONFIG_DIRS that are NOT config files (e.g. plan files).
+   * Paths under these subdirs are exempt from config protection.
+   */
+  const EXCLUDED_SUBDIRS = ["plans/"]
+
+  /**
+   * Root-level config files that must be protected.
+   * Matched only when the relative path has no directory component.
+   */
+  const CONFIG_ROOT_FILES = new Set(["kilo.json", "kilo.jsonc", "opencode.json", "opencode.jsonc", "AGENTS.md"])
+
+  /** Metadata key used to signal the UI to hide the "Allow always" option. */
+  export const DISABLE_ALWAYS_KEY = "disableAlways" as const
+
+  function normalize(p: string): string {
+    return path.posix.normalize(p.replaceAll("\\", "/"))
+  }
+
+  /** Return the remainder after the config dir prefix, or undefined if excluded. */
+  function excluded(remainder: string): boolean {
+    return EXCLUDED_SUBDIRS.some((sub) => remainder.startsWith(sub))
+  }
+
+  /** Check if a project-relative path points to a config file or directory. */
+  export function isRelative(pattern: string): boolean {
+    const normalized = normalize(pattern)
+    for (const dir of CONFIG_DIRS) {
+      const bare = dir.slice(0, -1) // e.g. ".kilo"
+      // Match at root (e.g. ".kilo/foo") or nested (e.g. "packages/sub/.kilo/foo")
+      if (normalized === bare || normalized.endsWith("/" + bare)) return true
+      if (normalized.startsWith(dir)) {
+        if (excluded(normalized.slice(dir.length))) continue
```

#### packages/opencode/src/kilocode/permission/drain.ts
```diff
diff --git a/packages/opencode/src/kilocode/permission/drain.ts b/packages/opencode/src/kilocode/permission/drain.ts
index 608932a4..cfd6949c 100644
--- a/packages/opencode/src/kilocode/permission/drain.ts
+++ b/packages/opencode/src/kilocode/permission/drain.ts
@@ -1,6 +1,7 @@
 import { Bus } from "@/bus"
 import { Wildcard } from "@/util/wildcard"
 import type { PermissionNext } from "@/permission/next"
+import { ConfigProtection } from "@/kilocode/permission/config-paths"
 
 /**
  * Auto-resolve pending permissions now fully covered by approved or denied rules.
@@ -25,6 +26,8 @@ export async function drainCovered(
 ) {
   for (const [id, entry] of Object.entries(pending)) {
     if (id === exclude) continue
+    // Never auto-resolve config file edit permissions
+    if (ConfigProtection.isRequest(entry.info)) continue
     const actions = entry.info.patterns.map((pattern) =>
       evaluate(entry.info.permission, pattern, entry.ruleset, approved),
     )
```


*... and more files (showing first 5)*

## opencode Changes (7715252..506dd75)

### Commits

(no commits)

### Changed Files by Category

#### Tool System (packages/*/src/tool/)
(no changes)

#### Agent System (packages/*/src/agent/)
(no changes)

#### Permission System (**/permission/)
(no changes)

#### Event Bus (**/bus/, **/event/)
(no changes)

#### Core (**/core/)
(no changes)

#### Other Changes
(no changes)

### Key Diffs

(no key diffs to show)

## Recommendations

Based on the changes, the following files in Alexi should be reviewed:

- `src/agent/index.ts` - incorporate new agent patterns from packages/opencode/src/agent/agent.ts
- `src/agent/index.ts` - incorporate new agent patterns from packages/opencode/src/agent/prompt/ask.txt
- `src/core/` - review core changes from packages/kilo-docs/pages/code-with-ai/agents/orchestrator-mode.md
- `src/permission/` - review permission changes from packages/opencode/src/kilocode/permission/config-paths.ts
- `src/permission/` - review permission changes from packages/opencode/src/kilocode/permission/drain.ts
- `src/permission/` - review permission changes from packages/opencode/src/permission/next.ts
- `src/tool/skill.ts` - update based on kilocode packages/opencode/src/tool/skill.ts changes
