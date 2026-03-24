# Upstream Changes Report
Generated: 2026-03-24 07:06:11

## Summary
- kilocode: 231 commits, 274 files changed
- opencode: 0 commits, 0 files changed

## kilocode Changes (4bef41a2..c3fcc989)

### Commits

- c3fcc989 - Merge branch 'Kilo-Org:main' into main (Aleksei Sabetski, 2026-03-24)
- e475f715 - Merge pull request #7460 from Kilo-Org/docs/provider-ttfb-timeout (Emilie Lima Schario, 2026-03-23)
- 7bbfa691 - fix(agent-manager): inherit parent worktree directory for subagent permission responses (#7491) (Imanol Maiztegui, 2026-03-24)
- 9dca628f - Merge pull request #7051 from Kilo-Org/docs/fix-agents-md-callout (Alex Gold, 2026-03-23)
- e946b526 - fix(vscode): stabilize flaky WorktreeManager.removeWorktree tests for CI (#7493) (Imanol Maiztegui, 2026-03-23)
- 7b20c7b1 - Merge branch 'main' into docs/fix-agents-md-callout (Alex Gold, 2026-03-23)
- 9cd7bb32 - Merge pull request #7444 from Kilo-Org/feat/cli-config-awareness (Marian Alexandru Alecu, 2026-03-23)
- 147c73bc - Merge pull request #7480 from Kilo-Org/docs/expand-slack-setup-guide (Alex Gold, 2026-03-23)
- 90d6ba01 - Revise chat platform connection instructions (Alex Gold, 2026-03-23)
- 1e1f39a3 - docs(kilo-docs): expand Slack setup guide with comprehensive step-by-step instructions (kiloconnect[bot], 2026-03-23)
- ad21c68f - Merge pull request #7467 from Kilo-Org/fix/dev-snapshot-win32-install (Mark IJbema, 2026-03-23)
- bb20679c - release: v7.1.2 (kilo-maintainer[bot], 2026-03-23)
- bb9d3790 - Merge pull request #7475 from Kilo-Org/mark/fix-channel-db-path (Mark IJbema, 2026-03-23)
- 9f807905 - fix(cli): always use kilo.db regardless of channel (Mark IJbema, 2026-03-23)
- 2ffd8c1a - Merge pull request #7465 from Kilo-Org/kirillk/model-pricing (Kirill Kalishev, 2026-03-23)
- 0b6c5c68 - fix(vscode): limit Windows CLI path resolution to win32 only (Mark IJbema, 2026-03-23)
- ebdb9e1f - Merge branch 'main' into kirillk/model-pricing (Kirill Kalishev, 2026-03-23)
- 4c19e873 - fix(vscode): preserve sub-cent model price precision in display (kirillk, 2026-03-23)
- 3990ea51 - fix(agent-manager): compact worktree stats into two-column layout (#7451) (Marius, 2026-03-23)
- 9a51117b - fix(vscode): fix agent list scroll in settings and mode selector (#7468) (Marius, 2026-03-23)
- dbf8e66f - Merge pull request #7417 from mvanhorn/fix/snapshot-cleanup-windows-git-config (Marian Alexandru Alecu, 2026-03-23)
- 26f207e8 - fix(cli): clarify config paths (Alex Alecu, 2026-03-23)
- 31e170cf - fix(vscode): correct model pricing display from per-billion to per-million tokens (kirillk, 2026-03-23)
- 6888ff15 - release: v7.1.1 (kilo-maintainer[bot], 2026-03-23)
- 2847ec4a - fix(cli): use strict .kilo/ directive in config hint (Alex Alecu, 2026-03-23)
- bfe17bf4 - fix(vscode): resolve code CLI path on Windows for dev-snapshot install (Mark IJbema, 2026-03-23)
- bbe14014 - Merge pull request #6783 from Kilo-Org/mark/fix-autocomplete-activation (Mark IJbema, 2026-03-23)
- c0cc6982 - Apply suggestion from @chrarnoldus (Christiaan Arnoldus, 2026-03-23)
- 891e259b - Merge pull request #7380 from Kilo-Org/catrielmuller/turkish (Catriel Müller, 2026-03-23)
- 77fe4ae9 - fix: merge (Catriel Müller, 2026-03-23)
- 8a4db4b3 - Merge branch 'main' into catrielmuller/turkish (Catriel Müller, 2026-03-23)
- 5d543368 - fix(cli): remove .opencode/ from config dir hint (Alex Alecu, 2026-03-23)
- d5dc89dc - Merge pull request #7315 from Kilo-Org/session/agent_b8e49e6d-80cd-4931-9f62-3a8e43fc1030 (Mark IJbema, 2026-03-23)
- 6a144697 - docs: document five-minute time-to-first-byte timeout for all providers (kiloconnect[bot], 2026-03-23)
- 43391276 - fix(cli): prefer existing config dir over creating .kilo/ (Alex Alecu, 2026-03-23)
- 985e852b - refactor(vscode): extract ensureBackendForAutocomplete into standalone utility (Mark IJbema, 2026-03-23)
- b7f66e1f - docs(vscode): document why the extension uses onStartupFinished activation (Mark IJbema, 2026-03-23)
- 786baa79 - fix(vscode): skip eager CLI backend startup when no workspace folders exist (Mark IJbema, 2026-03-23)
- e65ab41c - fix(vscode): start CLI backend when autocomplete is enabled after startup (Mark IJbema, 2026-03-23)
- 7d4fdffc - fix: make inline provider registration idempotent to prevent startup race (Mark IJbema, 2026-03-23)
- 021f4171 - fix: activate extension on startup so eager connect() actually runs (Mark IJbema, 2026-03-23)
- af2b9000 - fix: start CLI backend at extension activation so autocomplete works without opening a tab (kiloconnect[bot], 2026-03-23)
- 6d5a2259 - feat(agent-manager): add drag-and-drop reordering for sidebar worktrees (#7454) (Marius, 2026-03-23)
- 80509b24 - Merge pull request #7448 from Kilo-Org/feat/notification-suggest-model-id (Christiaan Arnoldus, 2026-03-23)
- 9559ac7e - fix(agent-manager): suppress native browser context menu in agent manager (#7457) (Marius, 2026-03-23)
- fa83fc60 - fix(vscode): use TelemetryEventName constant for notification telemetry event (kiloconnect[bot], 2026-03-23)
- 8fbe5ae8 - fix(vscode): only resolve suggestModelId against the kilo provider (kiloconnect[bot], 2026-03-23)
- ce3d288c - feat(agent-manager): style delete confirmation hint as button (#7449) (Marius, 2026-03-23)
- ecfdd336 - i18n(vscode): add profile.switchingAccount translations for all 16 locales (Mark IJbema, 2026-03-23)
- 13960077 - fix(vscode): skip tool reveal animations on session switch to prevent flickering (#7447) (Marius, 2026-03-23)
- 177b76ed - feat(vscode): show spinner and disable account switcher during org switch (Mark IJbema, 2026-03-23)
- c0a1a7e4 - feat(vscode): add suggestModelId support to notifications (kiloconnect[bot], 2026-03-23)
- 1b1150b0 - fix(vscode): fix sdkClient reference in disposeGlobal and add missing onProfileChanged mock (Mark IJbema, 2026-03-23)
- d198a7d4 - fix(vscode): position account switcher in top-right of container, not inside centered content (Mark IJbema, 2026-03-23)
- bd0142ac - chore: update kilo-vscode visual regression baselines (github-actions[bot], 2026-03-23)
- ca5db411 - fix(vscode): fix account switcher layout and cross-webview profile sync (Mark IJbema, 2026-03-23)
- a0e97537 - chore: update kilo-vscode visual regression baselines (github-actions[bot], 2026-03-23)
- cb846613 - fix(vscode): move account switcher from prompt input to welcome screen header (Mark IJbema, 2026-03-23)
- 32250fb3 - feat(vscode): add team/org account switcher to chat prompt area (kiloconnect[bot], 2026-03-23)
- 5d0fad38 - Merge pull request #7439 from Kilo-Org/mark/bash-default-ask (Mark IJbema, 2026-03-23)
- 672431e2 - feat(agent-manager): show spinner on sidebar items when agent is actively working (#7443) (Marius, 2026-03-23)
- ba436a78 - feat(cli): add tip about saving repetitive tasks as commands (Alex Alecu, 2026-03-23)
- 57e36c7e - feat(cli): add config location awareness to system prompt (Alex Alecu, 2026-03-23)
- cd260ccb - Merge pull request #7433 from Kilo-Org/session/agent_04739240-0ddb-4869-9616-f355e4257028 (Christiaan Arnoldus, 2026-03-23)
- 85bc2910 - feat(vscode): auto-send review comments when input is empty (#7442) (Marius, 2026-03-23)
- 4e2da1f3 - More targeted change, identical to upstream now (Christiaan Arnoldus, 2026-03-23)
- f5976773 - Merge pull request #7440 from Kilo-Org/mark/fix-codespan-html-escape (Mark IJbema, 2026-03-23)
- 18824710 - fix(ui): escape HTML in codespan renderer to prevent tag injection (Mark IJbema, 2026-03-23)
- dac229fe - feat(cli,vscode): change default bash auto-approve rule to ask (Mark IJbema, 2026-03-23)
- 194de463 - fix: fix onLanguageChanged mock (Catriel Müller, 2026-03-23)
- 5bee2538 - Update packages/kilo-vscode/package.json (Catriel Müller, 2026-03-23)
- b35f9fcc - Update packages/kilo-vscode/package.json (Catriel Müller, 2026-03-23)
- 854966ea - Merge branch 'main' into catrielmuller/turkish (Catriel Müller, 2026-03-23)
- e1b67fe5 - fix(cli): remove context-1m-2025-08-07 anthropic-beta header (kiloconnect[bot], 2026-03-23)
- feced2b9 - Merge pull request #7431 from Kilo-Org/mark/add-bun-install-to-f5-compile (Mark IJbema, 2026-03-23)
- 0ebd9aa0 - chore(vscode): use --frozen-lockfile for install task (Mark IJbema, 2026-03-23)
- 239bb41c - chore(vscode): run bun install before F5 compile task (Mark IJbema, 2026-03-23)
- 63a9e9f6 - Merge pull request #7425 from Kilo-Org/mark/fix-ghost-text-under-placeholder (Mark IJbema, 2026-03-23)
- 3fb9d5aa - Merge pull request #7422 from Kilo-Org/mark/source-link-checker (Mark IJbema, 2026-03-23)
- eb30dc21 - refactor(vscode): simplify ghost text fix — rely on state invalidation only (Mark IJbema, 2026-03-23)
- 8a2ba1bc - fix(vscode): prevent ghost text from showing over placeholder in empty input (Mark IJbema, 2026-03-23)
- 0d6df963 - Merge pull request #7424 from Kilo-Org/mark/fix-ghost-text-line-breaking (Mark IJbema, 2026-03-23)
- 54e14d7f - fix: remove dead docs link from github setup wizard output (Mark IJbema, 2026-03-23)
- 1461b579 - fix: replace dead docs/github link, exclude vercel.link from lychee (Mark IJbema, 2026-03-23)
- 891067a7 - fix(vscode): prevent ghost text from re-wrapping preceding visible text (Mark IJbema, 2026-03-23)
- c9f30d3a - fix(docs): correct kilocode-docs path reference in contributing guide (#7390) (Darkatek7, 2026-03-23)
- 6d994786 - fix: exclude dev.kilo.ai from source link extraction (Mark IJbema, 2026-03-23)
- 9ea84978 - fix: remove unnecessary path triggers from docs-check-links.yml (Mark IJbema, 2026-03-23)
- 3e1cb003 - Merge pull request #7410 from Githubguy132010/feat/add-dutch-language (Mark IJbema, 2026-03-23)
- 35a84e1c - fix: extract external URLs instead of excluding them from source link checker (Mark IJbema, 2026-03-23)
- 80494d33 - Merge branch 'main' into feat/add-dutch-language (Thomas Brugman, 2026-03-23)
- c3e820d9 - fix: revert snoozed translation to gepauzeerd per Mark's feedback (kiloconnect[bot], 2026-03-23)
- 0bb072ea - Merge pull request #7302 from Kilo-Org/mark/chat-autocomplete-improvement-plan (Mark IJbema, 2026-03-23)
- 927e5f53 - fix(vscode): align textarea word-wrapping with ghost text overlay (Mark IJbema, 2026-03-23)
- 9628faab - fix(vscode): avoid disposing ignore controller while in-flight requests use it (Mark IJbema, 2026-03-23)
- 33f73067 - fix(vscode): invalidate cached ignore rules when ignore files change (Mark IJbema, 2026-03-23)
- 3d787346 - fix(vscode): dispose chatAutocomplete in KiloProvider.dispose() (Mark IJbema, 2026-03-23)
- 9af65d91 - fix(vscode): sync highlight scroll after accepting autocomplete suggestion (Mark IJbema, 2026-03-23)
- 9c69621d - ci: rework source link checker into PR gate with committed file (kiloconnect[bot], 2026-03-23)
- f1d43995 - ci: add link checker for extension and CLI source code URLs (kiloconnect[bot], 2026-03-23)
- 5a64a874 - fix(snapshot): add missing git config flags to cleanup() for Windows (Matt Van Horn, 2026-03-23)
- 97eda63b - Merge branch 'Kilo-Org:main' into main (Aleksei Sabetski, 2026-03-23)
- a2ae35e1 - Merge pull request #7413 from Kilo-Org/kirillk/min-version-cursor (Kirill Kalishev, 2026-03-22)
- 79a87aee - feat(vscode): lower minimum VS Code version to 1.105.1 for Cursor compatibility (kirillk, 2026-03-22)
- ae40ce13 - chore: format nl.ts (Thomas Brugman, 2026-03-22)
- 7b2bcae5 - fix: complete Dutch language registrations (Thomas Brugman, 2026-03-22)
- b8bb0e50 - fix: add nl to desktop i18n index files (Thomas Brugman, 2026-03-22)
- ad0fa2b4 - feat: add Dutch language support (Thomas Brugman, 2026-03-22)
- 81edeee6 - Merge branch 'Kilo-Org:main' into main (Aleksei Sabetski, 2026-03-21)
- 430a2dc1 - feat: add turkish lang into the extension definition (Catriel Müller, 2026-03-20)
- a7e4952c - feat: refresh lang on all instances (Catriel Müller, 2026-03-20)
- 6d4d7328 - Merge pull request #7379 from Kilo-Org/catrielmuller/refresh-vscode-panels-on-update (Catriel Müller, 2026-03-20)
- 15263695 - feat: add turkish lang (Catriel Müller, 2026-03-20)
- 52426b47 - chore: update nix node_modules hashes (kilo-maintainer[bot], 2026-03-20)
- 05d606ad - fix(vscode): restore webview panels on extension restart/update (Catriel Müller, 2026-03-20)
- 82f47b51 - fix(nix): remove stale TEAM_MEMBERS reference from node_modules fileset (#7378) (Marius, 2026-03-20)
- ef16ae7f - release: v7.1.0 (kilo-maintainer[bot], 2026-03-20)
- bcac6ac7 - fix(kilo-ui): fix reasoning display regression — ordering, collapse, and animation (#7376) (Marius, 2026-03-20)
- 17ddf84d - Merge pull request #7283 from Kilo-Org/kirillk/model-picker (Kirill Kalishev, 2026-03-20)
- dd86b02b - Merge branch 'main' into kirillk/model-picker (Kirill Kalishev, 2026-03-20)
- a9e8d197 - feat(i18n): add dialog.model.select translation key for model picker select button (kirillk, 2026-03-20)
- 93e45fb6 - fix(vscode): improve question dock visual design (#7375) (Marius, 2026-03-20)
- 3af7b465 - docs(kilo-docs): add VS Code rollback install guidance (#7372) (Thomas Brugman, 2026-03-20)
- 296f5271 - feat(vscode): add agent cycling keyboard shortcuts (Ctrl+./Ctrl+Shift+.) (#7374) (Marius, 2026-03-20)
- 64442519 - Improved subagent permissions handling (#7348) (Imanol Maiztegui, 2026-03-20)
- 4999d5f8 - style(vscode): fix prettier formatting in PopupSelector (kirillk, 2026-03-20)
- 43af9a2c - Merge branch 'main' into kirillk/model-picker (Kirill Kalishev, 2026-03-20)
- f15897f3 - Update packages/kilo-vscode/webview-ui/src/components/shared/ModelSelector.tsx (Kirill Kalishev, 2026-03-20)
- 9fbfef15 - fix(vscode): remove empty state text from model preview panel (kirillk, 2026-03-20)
- 0299d8d9 - fix(vscode): account for picker chrome in splitter max height calculation (kirillk, 2026-03-20)
- 8194c30c - feat(vscode): add keyboard focus outline to model and mode pickers (kirillk, 2026-03-20)
- a87055a1 - feat(vscode): increase expanded model picker width to 450px (kirillk, 2026-03-20)
- a34fc214 - perf(agent-manager): debounce resize handlers and state persistence (#7369) (Marius, 2026-03-20)
- da83c177 - fix(vscode): prevent model picker height flash on reopen after window resize (kirillk, 2026-03-20)
- c9a3e6fa - feat(vscode): constrain model picker height to available space above trigger (kirillk, 2026-03-20)
- bb12ca21 - perf(vscode): fix model picker keyboard nav triggering redundant mouseenter updates (marius-kilocode, 2026-03-20)
- 595064f6 - Merge pull request #7370 from Kilo-Org/docs/kiloclaw-troubleshooting-config-files (Alex Gold, 2026-03-20)
- ce9e3ad7 - Update packages/kilo-docs/pages/kiloclaw/troubleshooting.md (Alex Gold, 2026-03-20)
- 6a5ddd66 - Update packages/kilo-docs/pages/kiloclaw/troubleshooting.md (Alex Gold, 2026-03-20)
- ca471716 - docs(kilo-docs): add config file access tip to KiloClaw troubleshooting (kiloconnect[bot], 2026-03-20)
- 68c9b418 - Merge pull request #7361 from Kilo-Org/docs/update-auto-model-tiers-architecture (Joshua Lambert, 2026-03-20)
- bd492fb0 - Apply suggestions from code review (Joshua Lambert, 2026-03-20)
- 482389fd - Merge branch 'main' into kirillk/model-picker (kirillk, 2026-03-20)
- 9af41a06 - Merge pull request #7368 from Kilo-Org/catrielmuller/editor-tool-title (Catriel Müller, 2026-03-20)
- 0fcc9257 - fix(ui): truncate long file names and paths in tool triggers with front-ellipsis (Catriel Müller, 2026-03-20)
- da41fe69 - fix(ui): defer popover dismiss listeners to prevent premature close in modals (#7367) (Marius, 2026-03-20)
- 8769079a - refactor(vscode): extract handler modules from KiloProvider god class (#7362) (Marius, 2026-03-20)
- 1ee95316 - fix(kilo-ui): remove unstyled user-message-inner wrapper causing button overlay (#7364) (Marius, 2026-03-20)
- 1a74242b - feat(vscode): add keyboard shortcuts to permission prompt (#7363) (Marius, 2026-03-20)
- 069cdd20 - fix(vscode): fix typecheck error in AgentManagerProvider.getSessionDirectories (#7366) (Marius, 2026-03-20)
- 7f348474 - Merge branch 'main' into kirillk/model-picker (Kirill Kalishev, 2026-03-20)
- 6056b67c - feat(vscode): add toggle auto-approve shortcut (Ctrl+Alt+A) (#7347) (Marius, 2026-03-20)
- 567d25ed - refactor(agent-manager): isolate vscode API behind Host interface (#7360) (Marius, 2026-03-20)
- 7f95dc34 - docs(kilo-docs): update auto model tiers architecture to match implementation (Josh Lambert, 2026-03-20)
- 64d5163e - Merge pull request #7359 from Kilo-Org/catrielmuller/migrate-x-headers (Catriel Müller, 2026-03-20)
- d7b9f519 - refactor: replace x-opencode-* headers with x-kilo-* across codebase and upstream scripts (Catriel Müller, 2026-03-20)
- 50e8d22f - OpenCode v1.2.24 (Catriel Müller, 2026-03-20)
- 0adcc0f9 - Update .github/workflows/storybook.yml (Catriel Müller, 2026-03-20)
- acf3dd51 - feat(vscode): add `bun run extension` to build and launch dev VS Code (#7351) (Marius, 2026-03-20)
- 871bbec9 - chore: update visual regression baselines (github-actions[bot], 2026-03-20)
- 6e4c57f3 - fix: Adjust missing merge conflicts not caught before (Johnny Amancio, 2026-03-20)
- a4982019 - resolve merge conflicts (Johnny Amancio, 2026-03-20)
- f3a327d2 - refactor: kilo compat for v1.2.24 (Johnny Amancio, 2026-03-20)
- 9a3d8019 - Merge pull request #7328 from Kilo-Org/catrielmuller/model-dont-exist-error (Catriel Müller, 2026-03-20)
- 4c8358da - feat(vscode): add generate terminal command shortcut and SCM input menu entry (#7346) (Marius, 2026-03-20)
- a083a5b4 - feat(vscode): add autocomplete keyboard shortcuts (Escape cancel, Ctrl+L generate) (#7344) (Marius, 2026-03-20)
- 1f6eb2bd - fix(vscode): display error and validate model before sending when configured model is unavailable (Catriel Müller, 2026-03-20)
- 01e45e38 - feat(vscode): display a confirmation toast when installing marketplace elements (#7336) (Imanol Maiztegui, 2026-03-20)
- 42bb938c - feat(vscode): multi-provider selection with connect/disconnect/OAuth flows (#7295) (Marius, 2026-03-20)
- eaeb8dc6 - perf(agent-manager): make worktree deletion instant (#7230) (Marius, 2026-03-20)
- 633ab4c9 - fix(vscode): show reasoning in reasoning component during streaming (#7231) (Marius, 2026-03-20)
- 59351e4b - fix(vscode): show disabled revert button while agent is busy (#7309) (Marius, 2026-03-20)
- dcdf0e97 - fix(vscode): add upper bounds check in mode switcher keyboard navigation (#7335) (marius-kiloclaw, 2026-03-20)
- 7a3c9759 - style(vscode): fix prettier formatting in PopupSelector (kirillk, 2026-03-19)
- c015e21f - Merge branch 'main' into kirillk/model-picker (Kirill Kalishev, 2026-03-19)
- a43ef452 - feat(vscode): add ModeSwitcher to PopupSelector, support content-sized popups (kirillk, 2026-03-19)
- 6c06c9a2 - refactor(vscode): extract PopupSelector and consolidate sizing into explicit props (kirillk, 2026-03-19)
- f3e26da0 - refactor(vscode): consolidate model picker size constants into ModelSelector (kirillk, 2026-03-19)
- 9deaa0e2 - fix(vscode): reduce model picker edge padding to 8px on both sides (kirillk, 2026-03-19)
- 8501f0d4 - fix(vscode): add right-side padding and fix squeeze padding for model picker (kirillk, 2026-03-19)
- 56ccb856 - feat(vscode): fit model picker to panel width with dynamic sizing (kirillk, 2026-03-19)
- 2102af2b - fix(vscode): increase default preview height to 320px, group label panel style (kirillk, 2026-03-19)
- 17ecdd2b - Merge branch 'main' into kirillk/model-picker (Kirill Kalishev, 2026-03-19)
- e0b49cb2 - fix(vscode): remove unused connection param and bail on empty request (Mark IJbema, 2026-03-19)
- 671c0df1 - chore(vscode): revert whitespace change in messages.ts (Mark IJbema, 2026-03-19)
- 4a55d86d - refactor(vscode): remove unnecessary sessionKey effect and dead code (Mark IJbema, 2026-03-19)
- 01c91df7 - refactor(vscode): remove explicit ghost.invalidate() calls (Mark IJbema, 2026-03-19)
- f0cb9b5b - refactor(vscode): auto-invalidate ghost text on session switch (Mark IJbema, 2026-03-19)
- d4fd9694 - Merge branch 'main' into kirillk/model-picker (Kirill Kalishev, 2026-03-19)
- b689981e - revert(vscode): remove @-mention fixes from this PR (Mark IJbema, 2026-03-19)
- 4ff91ec6 - refactor(vscode): merge ChatAutocompleteService into ChatTextAreaAutocomplete (Mark IJbema, 2026-03-19)
- fcdfee34 - refactor(vscode): remove AbortSignal from chat autocomplete pipeline (Mark IJbema, 2026-03-19)
- 00fd9e14 - refactor(vscode): make ghost text reactive to text signal changes (Mark IJbema, 2026-03-19)
- fbe356cd - chore(vscode): remove chat autocomplete improvement plan documents (Mark IJbema, 2026-03-19)
- e921ea70 - fix(vscode): fix @-mention edge cases and dedup selectMentionFile (Mark IJbema, 2026-03-19)
- 1184746c - refactor(vscode): cache chat autocomplete objects in ChatAutocompleteService (Mark IJbema, 2026-03-19)
- 0696b90f - fix(vscode): cancel in-flight chat autocomplete LLM requests (Mark IJbema, 2026-03-19)
- 7a502a6f - refactor(vscode): extract ghost text logic into useGhostText hook (Mark IJbema, 2026-03-19)
- 204c6767 - docs(vscode): update chat autocomplete improvement plan with detailed comparison (Mark IJbema, 2026-03-19)
- 8e9411e3 - docs(vscode): add chat autocomplete improvement plan (Mark IJbema, 2026-03-19)
- d6ec6345 - Merge branch 'main' into kirillk/model-picker (Kirill Kalishev, 2026-03-18)
- dd4973fb - fix(vscode): reduce FREE badge size and padding in model picker list (kirillk, 2026-03-18)
- b2c29028 - feat(vscode): model picker — expanded mode, preview, pre-active state, splitter, keyboard nav (kirillk, 2026-03-18)
- df527b3e - feat(vscode): show model properties in picker preview panel on hover (kirillk, 2026-03-18)
- 86690a31 - feat(vscode): extend ProviderModel with input capabilities and options (kirillk, 2026-03-18)
- ff8aa0b4 - feat(vscode): add model picker preview panel with animated expand/collapse (kirillk, 2026-03-18)
- 5571adcd - feat(vscode): add expand/collapse toggle to model picker popup (kirillk, 2026-03-18)
- 81aad841 - Merge branch 'main' of github.com:Kilo-Org/kilocode (Alex Gold, 2026-03-14)
- bceae8f8 - Fix callout on agents.md page (Alex Gold, 2026-03-14)
- c6262f9d - release: v1.2.24 (opencode, 2026-03-09)
- b749fa90 - fix(app): scroll jitter/loop (Adam, 2026-03-09)
- 8a51cbd2 - core: prevent accidental edits to migration files by restricting agent access (Dax Raad, 2026-03-09)
- 399b8f07 - fix(app): session title turn spinner (#16764) (David Hill, 2026-03-09)
- 3742e42f - fix(app): dismiss toast notifications when questions or permissions a… (#16758) (Filip, 2026-03-09)
- 0388ec68 - fix(storybook): add ci build workflow (#16760) (Karan Handa, 2026-03-09)
- 366b8a80 - feat(tui): add initial support for workspaces into the tui (#16230) (James Long, 2026-03-09)
- ef9bc4ec - feat(gitlab): send context-1m-2025-08-07 beta header to enable 1M context window (#16153) (Armin Pašalić, 2026-03-09)
- 5838b589 - add copilot gpt-5.4 xhigh support (#16294) (Jack, 2026-03-09)
- 2712244a - release: v1.2.23 (opencode, 2026-03-09)
- 6388cbaf - fix(app): remove oc-1 theme (Adam, 2026-03-09)
- 5cc61e1b - tui: fix sidebar workspace container sizing by adding box-border class to prevent content overflow issues (David Hill, 2026-03-09)
- 0243be86 - fix(app): don't animate review panel in/out (Adam, 2026-03-09)
- 9154cd64 - chore: update nix node_modules hashes (opencode-agent[bot], 2026-03-09)
- c71d1bde - revert(app): "STUPID SEXY TIMELINE (#16420)" (#16745) (Adam, 2026-03-09)
- f27ef595 - fix(app): sanitize workspace store filenames on Windows (#16703) (Luke Parker, 2026-03-09)
- 34328828 - fix(app): fix issue with scroll jumping when pressing escape in comment text area (#15374) (Yihui Khuu, 2026-03-09)
- 18fb19da - fix(opencode): pass missing auth headers in `run --attach` (#16097) (Eric Clemmons, 2026-03-09)
- 849e1ac5 - docs(i18n): sync locale docs from english changes (opencode-agent[bot], 2026-03-09)
- 656a8d8f - docs: add session_child_first keybinding to documentation (#16631) (Ariane Emory, 2026-03-08)
- b976f339 - feat(app): generate color palettes (#16232) (Adam, 2026-03-08)
- 7d7837e5 - disable fallback to free nano for small model (Dax Raad, 2026-03-08)

### Changed Files by Category

#### Tool System (packages/*/src/tool/)
(no changes)

#### Agent System (packages/*/src/agent/)
- `packages/opencode/src/agent/agent.ts` (+1, -0)

#### Permission System (**/permission/)
- `packages/opencode/src/kilocode/permission/drain.ts` (+51, -0)
- `packages/opencode/src/permission/next.ts` (+7, -1)
- `packages/opencode/test/{ => kilocode}/permission/next.always-rules.test.ts` (+295, -4)

#### Event Bus (**/bus/, **/event/)
(no changes)

#### Core (**/core/)
(no changes)

#### Other Changes
- `.github/workflows/source-check-links.yml` (+24, -0)
- `.github/workflows/storybook.yml` (+39, -0)
- `.opencode/opencode.jsonc` (+5, -0)
- `.vscode/tasks.json` (+15, -0)
- `AGENTS.md` (+1, -0)
- `CONTRIBUTING.md` (+10, -0)
- `bun.lock` (+17, -17)
- `nix/hashes.json` (+4, -4)
- `nix/node_modules.nix` (+0, -1)
- `package.json` (+3, -2)
- `packages/app/package.json` (+1, -1)
- `packages/app/src/context/language.tsx` (+12, -0)
- `packages/app/src/i18n/en.ts` (+1, -0)
- `packages/app/src/i18n/nl.ts` (+855, -0)
- `packages/app/src/pages/layout.tsx` (+11, -0)
- `packages/app/src/pages/session.tsx` (+44, -34)
- `packages/app/src/pages/session/message-timeline.tsx` (+93, -44)
- `packages/app/src/pages/session/scroll-spy.test.ts` (+0, -127)
- `packages/app/src/pages/session/scroll-spy.ts` (+0, -275)
- `packages/app/src/pages/session/use-session-hash-scroll.ts` (+50, -36)
- `packages/desktop-electron/package.json` (+1, -1)
- `packages/desktop-electron/src/renderer/i18n/index.ts` (+6, -0)
- `packages/desktop-electron/src/renderer/i18n/nl.ts` (+28, -0)
- `packages/desktop/package.json` (+1, -1)
- `packages/desktop/src/i18n/index.ts` (+6, -0)
- `packages/desktop/src/i18n/nl.ts` (+62, -0)
- `packages/extensions/zed/extension.toml` (+6, -6)
- `packages/kilo-docs/lychee.toml` (+2, -0)
- `packages/kilo-docs/package.json` (+1, -1)
- `packages/kilo-docs/pages/ai-providers/index.md` (+4, -0)
- `packages/kilo-docs/pages/contributing/architecture/auto-model-tiers.md` (+95, -80)
- `packages/kilo-docs/pages/contributing/index.md` (+2, -2)
- `packages/kilo-docs/pages/customize/agents-md.md` (+1, -1)
- `packages/kilo-docs/pages/getting-started/installing.md` (+9, -0)
- `packages/kilo-docs/pages/kiloclaw/chat-platforms.md` (+47, -24)
- `packages/kilo-docs/pages/kiloclaw/troubleshooting.md` (+5, -1)
- `packages/kilo-docs/source-links.md` (+161, -0)
- `packages/kilo-gateway/package.json` (+1, -1)
- `packages/kilo-gateway/src/api/notifications.ts` (+1, -0)
- `packages/kilo-i18n/package.json` (+1, -1)
- `packages/kilo-i18n/src/ar.ts` (+4, -0)
- `packages/kilo-i18n/src/br.ts` (+4, -0)
- `packages/kilo-i18n/src/bs.ts` (+4, -0)
- `packages/kilo-i18n/src/da.ts` (+4, -0)
- `packages/kilo-i18n/src/de.ts` (+4, -0)
- `packages/kilo-i18n/src/en.ts` (+4, -0)
- `packages/kilo-i18n/src/es.ts` (+4, -0)
- `packages/kilo-i18n/src/fr.ts` (+4, -0)
- `packages/kilo-i18n/src/ja.ts` (+4, -0)
- `packages/kilo-i18n/src/ko.ts` (+4, -0)
- `packages/kilo-i18n/src/nl.ts` (+74, -0)
- `packages/kilo-i18n/src/no.ts` (+4, -0)
- `packages/kilo-i18n/src/pl.ts` (+4, -0)
- `packages/kilo-i18n/src/ru.ts` (+4, -0)
- `packages/kilo-i18n/src/th.ts` (+4, -0)
- `packages/kilo-i18n/src/tr.ts` (+4, -0)
- `packages/kilo-i18n/src/zh.ts` (+4, -0)
- `packages/kilo-i18n/src/zht.ts` (+4, -0)
- `packages/kilo-telemetry/package.json` (+1, -1)
- `packages/kilo-ui/package.json` (+1, -1)
- `packages/kilo-ui/src/components/basic-tool.css` (+57, -0)
- `packages/kilo-ui/src/components/message-part.css` (+101, -1)
- `packages/kilo-ui/src/components/message-part.tsx` (+182, -110)
- `packages/kilo-ui/src/i18n/nl.ts` (+1, -0)
- `packages/kilo-ui/src/i18n/tr.ts` (+1, -0)
- `packages/kilo-ui/tests/visual-regression.spec.ts-snapshots/components-messagepart/full-conversation-turn-chromium-linux.png` (+2, -2)
- `packages/kilo-ui/tests/visual-regression.spec.ts-snapshots/components-messagepart/user-message-story-chromium-linux.png` (+2, -2)
- `packages/kilo-ui/tests/visual-regression.spec.ts-snapshots/components-messagepart/with-reasoning-expanded-chromium-linux.png` (+2, -2)
- `packages/kilo-ui/tests/visual-regression.spec.ts-snapshots/components-spinner/colored-chromium-linux.png` (+2, -2)
- `packages/kilo-ui/tests/visual-regression.spec.ts-snapshots/components-spinner/default-chromium-linux.png` (+2, -2)
- `packages/kilo-ui/tests/visual-regression.spec.ts-snapshots/components-spinner/large-chromium-linux.png` (+2, -2)
- `packages/kilo-ui/tests/visual-regression.spec.ts-snapshots/components-spinner/small-chromium-linux.png` (+2, -2)
- `packages/kilo-vscode/AGENTS.md` (+3, -0)
- `packages/kilo-vscode/eslint.config.mjs` (+6, -0)
- `packages/kilo-vscode/package.json` (+81, -19)
- `packages/kilo-vscode/script/dev-snapshot.ts` (+5, -2)
- `packages/kilo-vscode/script/launch.ts` (+338, -0)
- `packages/kilo-vscode/src/DiffViewerProvider.ts` (+20, -9)
- `packages/kilo-vscode/src/KiloProvider.ts` (+332, -704)
- `packages/kilo-vscode/src/SettingsEditorProvider.ts` (+33, -6)
- `packages/kilo-vscode/src/agent-manager/AgentManagerProvider.ts` (+91, -127)
- `packages/kilo-vscode/src/agent-manager/GitStatsPoller.ts` (+10, -1)
- `packages/kilo-vscode/src/agent-manager/WorktreeManager.ts` (+73, -30)
- `packages/kilo-vscode/src/agent-manager/WorktreeStateManager.ts` (+26, -0)
- `packages/kilo-vscode/src/agent-manager/__tests__/AgentManagerProvider.spec.ts` (+31, -32)
- `packages/kilo-vscode/src/agent-manager/delete-worktree.ts` (+20, -0)
- `packages/kilo-vscode/src/agent-manager/format-keybinding.ts` (+2, -0)
- `packages/kilo-vscode/src/agent-manager/host.ts` (+109, -0)
- `packages/kilo-vscode/src/agent-manager/types.ts` (+7, -0)
- `packages/kilo-vscode/src/agent-manager/vscode-host.ts` (+160, -0)
- `packages/kilo-vscode/src/commands/toggle-auto-approve.ts` (+87, -0)
- `packages/kilo-vscode/src/extension.ts` (+114, -8)
- `packages/kilo-vscode/src/kilo-provider-utils.ts` (+29, -1)
- `packages/kilo-vscode/src/kilo-provider/handlers/auth.ts` (+143, -0)
- `packages/kilo-vscode/src/kilo-provider/handlers/cloud-session.ts` (+222, -0)
- `packages/kilo-vscode/src/kilo-provider/handlers/migration.ts` (+155, -0)
- `packages/kilo-vscode/src/kilo-provider/handlers/permission-handler.ts` (+117, -0)
- `packages/kilo-vscode/src/kilo-provider/handlers/question.ts` (+51, -0)
- `packages/kilo-vscode/src/kilo-provider/slim-metadata.ts` (+57, -0)
- `packages/kilo-vscode/src/provider-actions.ts` (+301, -0)
- `packages/kilo-vscode/src/review-utils.ts` (+1, -1)
- `packages/kilo-vscode/src/services/autocomplete/AutocompleteServiceManager.ts` (+13, -6)
- `packages/kilo-vscode/src/services/autocomplete/__tests__/AutocompleteServiceManager.spec.ts` (+4, -4)
- `packages/kilo-vscode/src/services/autocomplete/chat-autocomplete/ChatTextAreaAutocomplete.ts` (+59, -3)
- `packages/kilo-vscode/src/services/autocomplete/classic-auto-complete/AutocompleteInlineCompletionProvider.ts` (+8, -3)
- `packages/kilo-vscode/src/services/autocomplete/ensure-backend.ts` (+16, -0)
- `packages/kilo-vscode/src/services/autocomplete/i18n/nl.ts` (+16, -15)
- `packages/kilo-vscode/src/services/autocomplete/index.ts` (+10, -1)
- `packages/kilo-vscode/src/services/cli-backend/connection-service.ts` (+43, -0)
- `packages/kilo-vscode/src/services/cli-backend/connection-utils.ts` (+1, -0)
- `packages/kilo-vscode/src/services/cli-backend/i18n/index.ts` (+4, -0)
- `packages/kilo-vscode/src/services/cli-backend/i18n/nl.ts` (+4, -0)
- `packages/kilo-vscode/src/services/cli-backend/i18n/tr.ts` (+4, -0)
- `packages/kilo-vscode/src/services/cli-backend/types.ts` (+1, -0)
- `packages/kilo-vscode/src/shared/custom-provider.ts` (+114, -0)
- `packages/kilo-vscode/src/shared/provider-model.ts` (+36, -0)
- `packages/kilo-vscode/tests/permission-dock-dropdown.spec.ts` (+2, -1)
- `packages/kilo-vscode/tests/unit/agent-manager-arch.test.ts` (+25, -9)
- `packages/kilo-vscode/tests/unit/custom-provider.test.ts` (+83, -0)
- `packages/kilo-vscode/tests/unit/kilo-provider-session-refresh.test.ts` (+2, -0)
- `packages/kilo-vscode/tests/unit/model-selection.test.ts` (+106, -0)
- `packages/kilo-vscode/tests/unit/model-selector-utils.test.ts` (+63, -19)
- `packages/kilo-vscode/tests/unit/permission-recovery.test.ts` (+179, -0)
- `packages/kilo-vscode/tests/unit/provider-action.test.ts` (+143, -0)
- `packages/kilo-vscode/tests/unit/provider-utils.test.ts` (+24, -1)
- `packages/kilo-vscode/tests/unit/provider-visibility.test.ts` (+23, -0)
- `packages/kilo-vscode/tests/unit/worktree-manager.test.ts` (+141, -0)
- `packages/kilo-vscode/tests/visual-regression.spec.mts` (+5, -1)
- `packages/kilo-vscode/tests/visual-regression.spec.ts` (+5, -1)
- `packages/kilo-vscode/tests/visual-regression.spec.ts-snapshots/agentmanager/worktree-item-active-chromium-linux.png` (+2, -2)
- `packages/kilo-vscode/tests/visual-regression.spec.ts-snapshots/agentmanager/worktree-item-default-chromium-linux.png` (+2, -2)
- `packages/kilo-vscode/tests/visual-regression.spec.ts-snapshots/agentmanager/worktree-item-grouped-chromium-linux.png` (+2, -2)
- `packages/kilo-vscode/tests/visual-regression.spec.ts-snapshots/agentmanager/worktree-item-pending-delete-chromium-linux.png` (+2, -2)
- `packages/kilo-vscode/tests/visual-regression.spec.ts-snapshots/agentmanager/worktree-item-stale-chromium-linux.png` (+2, -2)
- `packages/kilo-vscode/tests/visual-regression.spec.ts-snapshots/agentmanager/worktree-item-with-stats-chromium-linux.png` (+2, -2)
- `packages/kilo-vscode/tests/visual-regression.spec.ts-snapshots/chat/question-dock-many-options-chromium-linux.png` (+2, -2)
- `packages/kilo-vscode/tests/visual-regression.spec.ts-snapshots/chat/question-dock-multi-chromium-linux.png` (+2, -2)
- `packages/kilo-vscode/tests/visual-regression.spec.ts-snapshots/chat/question-dock-single-chromium-linux.png` (+2, -2)
- `packages/kilo-vscode/tests/visual-regression.spec.ts-snapshots/composite-webview/question-above-chatbox-chromium-linux.png` (+2, -2)
- `packages/kilo-vscode/tests/visual-regression.spec.ts-snapshots/settings/providers-configure-chromium-linux.png` (+2, -2)
- `packages/kilo-vscode/tests/visual-regression.spec.ts-snapshots/settings/settings-panel-chromium-linux.png` (+2, -2)
- `packages/kilo-vscode/webview-ui/agent-manager/AgentManagerApp.tsx` (+288, -97)
- `packages/kilo-vscode/webview-ui/agent-manager/DiffPanel.tsx` (+3, -1)
- `packages/kilo-vscode/webview-ui/agent-manager/FullScreenDiffView.tsx` (+3, -1)
- `packages/kilo-vscode/webview-ui/agent-manager/WorktreeItem.tsx` (+28, -12)
- `packages/kilo-vscode/webview-ui/agent-manager/agent-manager.css` (+79, -14)
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
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/nl.ts` (+167, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/no.ts` (+2, -1)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/pl.ts` (+2, -1)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/ru.ts` (+2, -1)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/th.ts` (+2, -1)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/tr.ts` (+168, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/zh.ts` (+2, -1)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/zht.ts` (+2, -1)
- `packages/kilo-vscode/webview-ui/agent-manager/review-annotations.ts` (+5, -1)
- `packages/kilo-vscode/webview-ui/diff-viewer/DiffViewerApp.tsx` (+1, -1)
- `packages/kilo-vscode/webview-ui/src/App.tsx` (+17, -0)
- `packages/kilo-vscode/webview-ui/src/components/chat/AssistantMessage.tsx` (+6, -0)
- `packages/kilo-vscode/webview-ui/src/components/chat/KiloNotifications.tsx` (+43, -0)
- `packages/kilo-vscode/webview-ui/src/components/chat/MessageList.tsx` (+4, -0)
- `packages/kilo-vscode/webview-ui/src/components/chat/PermissionDock.tsx` (+154, -112)
- `packages/kilo-vscode/webview-ui/src/components/chat/PromptInput.tsx` (+33, -85)
- `packages/kilo-vscode/webview-ui/src/components/chat/VscodeSessionTurn.tsx` (+18, -3)
- `packages/kilo-vscode/webview-ui/src/components/marketplace/InstallModal.tsx` (+22, -1)
- `packages/kilo-vscode/webview-ui/src/components/profile/DeviceAuthCard.tsx` (+94, -4)
- `packages/kilo-vscode/webview-ui/src/components/settings/AutoApproveTab.tsx` (+1, -0)
- `packages/kilo-vscode/webview-ui/src/components/settings/CustomProviderDialog.tsx` (+458, -0)
- `packages/kilo-vscode/webview-ui/src/components/settings/ModelsTab.tsx` (+90, -0)
- `packages/kilo-vscode/webview-ui/src/components/settings/ProviderConnectDialog.tsx` (+406, -0)
- `packages/kilo-vscode/webview-ui/src/components/settings/ProviderSelectDialog.tsx` (+134, -0)
- `packages/kilo-vscode/webview-ui/src/components/settings/ProvidersTab.tsx` (+264, -167)
- `packages/kilo-vscode/webview-ui/src/components/settings/Settings.tsx` (+10, -1)
- `packages/kilo-vscode/webview-ui/src/components/settings/provider-catalog.ts` (+51, -0)
- `packages/kilo-vscode/webview-ui/src/components/settings/provider-visibility.ts` (+6, -0)
- `packages/kilo-vscode/webview-ui/src/components/shared/AccountSwitcher.tsx` (+148, -0)
- `packages/kilo-vscode/webview-ui/src/components/shared/ModeSwitcher.tsx` (+36, -24)
- `packages/kilo-vscode/webview-ui/src/components/shared/ModelPreview.tsx` (+112, -0)
- `packages/kilo-vscode/webview-ui/src/components/shared/ModelSelector.tsx` (+226, -65)
- `packages/kilo-vscode/webview-ui/src/components/shared/PopupSelector.tsx` (+123, -0)
- `packages/kilo-vscode/webview-ui/src/components/shared/model-selector-utils.ts` (+24, -7)
- `packages/kilo-vscode/webview-ui/src/context/language-utils.ts` (+7, -0)
- `packages/kilo-vscode/webview-ui/src/context/language.tsx` (+12, -0)
- `packages/kilo-vscode/webview-ui/src/context/model-selection.ts` (+43, -0)
- `packages/kilo-vscode/webview-ui/src/context/provider-utils.ts` (+16, -0)
- `packages/kilo-vscode/webview-ui/src/context/provider.tsx` (+18, -4)
- `packages/kilo-vscode/webview-ui/src/context/server.tsx` (+8, -0)
- `packages/kilo-vscode/webview-ui/src/context/session.tsx` (+77, -33)
- `packages/kilo-vscode/webview-ui/src/hooks/useGhostText.ts` (+217, -0)
- `packages/kilo-vscode/webview-ui/src/i18n/ar.ts` (+55, -0)
- `packages/kilo-vscode/webview-ui/src/i18n/br.ts` (+55, -0)
- `packages/kilo-vscode/webview-ui/src/i18n/bs.ts` (+56, -0)
- `packages/kilo-vscode/webview-ui/src/i18n/da.ts` (+55, -0)
- `packages/kilo-vscode/webview-ui/src/i18n/de.ts` (+56, -0)
- `packages/kilo-vscode/webview-ui/src/i18n/en.ts` (+56, -0)
- `packages/kilo-vscode/webview-ui/src/i18n/es.ts` (+55, -0)
- `packages/kilo-vscode/webview-ui/src/i18n/fr.ts` (+57, -0)
- `packages/kilo-vscode/webview-ui/src/i18n/ja.ts` (+55, -0)
- `packages/kilo-vscode/webview-ui/src/i18n/ko.ts` (+55, -0)
- `packages/kilo-vscode/webview-ui/src/i18n/nl.ts` (+1235, -0)
- `packages/kilo-vscode/webview-ui/src/i18n/no.ts` (+55, -0)
- `packages/kilo-vscode/webview-ui/src/i18n/pl.ts` (+56, -0)
- `packages/kilo-vscode/webview-ui/src/i18n/ru.ts` (+56, -0)
- `packages/kilo-vscode/webview-ui/src/i18n/th.ts` (+55, -0)
- `packages/kilo-vscode/webview-ui/src/i18n/tr.ts` (+1229, -0)
- `packages/kilo-vscode/webview-ui/src/i18n/zh.ts` (+55, -0)
- `packages/kilo-vscode/webview-ui/src/i18n/zht.ts` (+55, -0)
- `packages/kilo-vscode/webview-ui/src/stories/StoryProviders.tsx` (+3, -0)
- `packages/kilo-vscode/webview-ui/src/stories/agent-manager.stories.tsx` (+1, -0)
- `packages/kilo-vscode/webview-ui/src/styles/chat.css` (+452, -36)
- `packages/kilo-vscode/webview-ui/src/types/messages.ts` (+129, -1)
- `packages/kilo-vscode/webview-ui/src/utils/provider-action.ts` (+91, -0)
- `packages/opencode/package.json` (+7, -7)
- `packages/opencode/src/cli/cmd/github.ts` (+0, -2)
- `packages/opencode/src/cli/cmd/tui/app.tsx` (+17, -0)
- `packages/opencode/src/cli/cmd/tui/component/dialog-workspace-list.tsx` (+326, -0)
- `packages/opencode/src/cli/cmd/tui/component/workspace/dialog-session-list.tsx` (+151, -0)
- `packages/opencode/src/cli/cmd/tui/context/sdk.tsx` (+55, -31)
- `packages/opencode/src/cli/cmd/tui/context/sync.tsx` (+16, -0)
- `packages/opencode/src/cli/cmd/tui/routes/session/header.tsx` (+41, -4)
- `packages/opencode/src/cli/cmd/tui/routes/session/index.tsx` (+6, -0)
- `packages/opencode/src/cli/cmd/tui/thread.ts` (+3, -0)
- `packages/opencode/src/cli/cmd/tui/worker.ts` (+7, -3)
- `packages/opencode/src/control-plane/adaptors/worktree.ts` (+1, -1)
- `packages/opencode/src/control-plane/workspace-server/server.ts` (+2, -2)
- `packages/opencode/src/flag/flag.ts` (+1, -1)
- `packages/opencode/src/kilocode/components/tips.tsx` (+1, -0)
- `packages/opencode/src/provider/provider.ts` (+2, -1)
- `packages/opencode/src/provider/transform.ts` (+3, -1)
- `packages/opencode/src/server/server.ts` (+2, -2)
- `packages/opencode/src/session/llm.ts` (+3, -3)
- `packages/opencode/src/session/system.ts` (+3, -0)
- `packages/opencode/src/snapshot/index.ts` (+1, -1)
- `packages/opencode/src/storage/db.ts` (+2, -11)
- `packages/opencode/test/control-plane/workspace-server-sse.test.ts` (+2, -2)
- `packages/opencode/test/provider/gitlab-duo.test.ts` (+24, -0)
- `packages/opencode/test/provider/transform.test.ts` (+29, -0)
- `packages/opencode/test/server/project-init-git.test.ts` (+4, -4)
- `packages/opencode/test/storage/db.test.ts` (+3, -8)
- `packages/plugin/package.json` (+1, -1)
- `packages/script/package.json` (+1, -1)
- `packages/sdk/js/package.json` (+1, -1)
- `packages/sdk/js/src/client.ts` (+1, -1)
- `packages/sdk/js/src/v2/client.ts` (+9, -2)
- `packages/sdk/js/src/v2/gen/types.gen.ts` (+1, -0)
- `packages/storybook/package.json` (+1, -1)
- `packages/ui/package.json` (+1, -1)
- `packages/ui/src/components/message-part.css` (+12, -6)
- `packages/ui/src/components/popover.tsx` (+12, -2)
- `packages/ui/src/components/scroll-view.test.ts` (+19, -0)
- `packages/ui/src/components/scroll-view.tsx` (+29, -7)
- `packages/ui/src/components/spinner.tsx` (+1, -0)
- `packages/ui/src/context/marked.tsx` (+8, -2)
- `packages/ui/src/i18n/nl.ts` (+148, -0)
- `packages/ui/src/styles/animations.css` (+2, -2)
- `packages/util/package.json` (+1, -1)
- `script/extract-source-links.ts` (+174, -0)
- `script/upstream/codemods/transform-strings.ts` (+3, -0)
- `script/upstream/package.json` (+1, -1)
- `script/upstream/transforms/transform-take-theirs.ts` (+3, -3)
- `sdks/vscode/package.json` (+1, -1)

### Key Diffs

#### packages/opencode/src/agent/agent.ts
```diff
diff --git a/packages/opencode/src/agent/agent.ts b/packages/opencode/src/agent/agent.ts
index ceb52d37..a7a8a490 100644
--- a/packages/opencode/src/agent/agent.ts
+++ b/packages/opencode/src/agent/agent.ts
@@ -63,6 +63,7 @@ export namespace Agent {
     const whitelistedDirs = [Truncate.GLOB, ...skillDirs.map((dir) => path.join(dir, "*"))]
     const defaults = PermissionNext.fromConfig({
       "*": "allow",
+      bash: "ask",
       doom_loop: "ask",
       external_directory: {
         "*": "ask",
```

#### packages/opencode/src/kilocode/permission/drain.ts
```diff
diff --git a/packages/opencode/src/kilocode/permission/drain.ts b/packages/opencode/src/kilocode/permission/drain.ts
new file mode 100644
index 00000000..608932a4
--- /dev/null
+++ b/packages/opencode/src/kilocode/permission/drain.ts
@@ -0,0 +1,51 @@
+import { Bus } from "@/bus"
+import { Wildcard } from "@/util/wildcard"
+import type { PermissionNext } from "@/permission/next"
+
+/**
+ * Auto-resolve pending permissions now fully covered by approved or denied rules.
+ * When the user approves/denies a rule on subagent A, sibling subagent B's
+ * pending permission for the same pattern resolves or rejects automatically.
+ */
+export async function drainCovered(
+  pending: Record<
+    string,
+    {
+      info: PermissionNext.Request
+      ruleset: PermissionNext.Ruleset
+      resolve: () => void
+      reject: (e: any) => void
+    }
+  >,
+  approved: PermissionNext.Ruleset,
+  evaluate: typeof PermissionNext.evaluate,
+  events: typeof PermissionNext.Event,
+  DeniedError: typeof PermissionNext.DeniedError,
+  exclude?: string,
+) {
+  for (const [id, entry] of Object.entries(pending)) {
+    if (id === exclude) continue
+    const actions = entry.info.patterns.map((pattern) =>
+      evaluate(entry.info.permission, pattern, entry.ruleset, approved),
+    )
+    const denied = actions.some((r) => r.action === "deny")
+    const allowed = !denied && actions.every((r) => r.action === "allow")
+    if (!denied && !allowed) continue
+    delete pending[id]
+    if (denied) {
+      Bus.publish(events.Replied, {
+        sessionID: entry.info.sessionID,
+        requestID: entry.info.id,
+        reply: "reject",
+      })
+      entry.reject(new DeniedError(approved.filter((r) => Wildcard.match(entry.info.permission, r.permission))))
+    } else {
+      Bus.publish(events.Replied, {
+        sessionID: entry.info.sessionID,
```

#### packages/opencode/src/permission/next.ts
```diff
diff --git a/packages/opencode/src/permission/next.ts b/packages/opencode/src/permission/next.ts
index e267a966..5534572d 100644
--- a/packages/opencode/src/permission/next.ts
+++ b/packages/opencode/src/permission/next.ts
@@ -8,6 +8,7 @@ import { PermissionTable } from "@/session/session.sql"
 import { fn } from "@/util/fn"
 import { Log } from "@/util/log"
 import { Wildcard } from "@/util/wildcard"
+import { drainCovered } from "@/kilocode/permission/drain" // kilocode_change
 import os from "os"
 import z from "zod"
 
@@ -168,6 +169,7 @@ export namespace PermissionNext {
       string,
       {
         info: Request
+        ruleset: Ruleset // kilocode_change
         resolve: () => void
         reject: (e: any) => void
       }
@@ -200,6 +202,7 @@ export namespace PermissionNext {
             }
             s.pending[id] = {
               info,
+              ruleset, // kilocode_change
               resolve,
               reject,
             }
@@ -212,6 +215,7 @@ export namespace PermissionNext {
   )
 
   // kilocode_change start
+
   export const saveAlwaysRules = fn(
     z.object({
       requestID: Identifier.schema("permission"),
@@ -240,6 +244,8 @@ export namespace PermissionNext {
       if (newRules.length > 0) {
         await Config.updateGlobal({ permission: toConfig(newRules) }, { dispose: false })
       }
+
+      await drainCovered(s.pending, s.approved, evaluate, Event, DeniedError, input.requestID) // kilocode_change
     },
   )
   // kilocode_change end
@@ -297,7 +303,7 @@ export namespace PermissionNext {
         for (const [id, pending] of Object.entries(s.pending)) {
           if (pending.info.sessionID !== sessionID) continue
           const ok = pending.info.patterns.every(
-            (pattern) => evaluate(pending.info.permission, pattern, s.approved).action === "allow",
```

#### packages/opencode/test/{ => kilocode}/permission/next.always-rules.test.ts
```diff
```


## opencode Changes (2a20822..2a20822)

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
- `src/permission/` - review permission changes from packages/opencode/src/kilocode/permission/drain.ts
- `src/permission/` - review permission changes from packages/opencode/src/permission/next.ts
- `src/permission/` - review permission changes from packages/opencode/test/{ => kilocode}/permission/next.always-rules.test.ts
