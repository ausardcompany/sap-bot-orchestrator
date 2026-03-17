# Upstream Changes Report
Generated: 2026-03-17 07:08:35

## Summary
- kilocode: 96 commits, 217 files changed
- opencode: 0 commits, 0 files changed

## kilocode Changes (a3eecbbf..8120073a)

### Commits

- 8120073a - Merge branch 'Kilo-Org:main' into main (Aleksei Sabetski, 2026-03-17)
- ecb27fd5 - Merge pull request #7127 from Kilo-Org/change-default-model-to-balanced (Christiaan Arnoldus, 2026-03-16)
- 8077d65b - Merge pull request #7122 from Kilo-Org/mark/marketplace-skills-only (Mark IJbema, 2026-03-16)
- e1509cb1 - fix(marketplace): use correct kilo-ui CSS variables for modal background (Mark IJbema, 2026-03-16)
- 03d90ed5 - feat(gateway): change default model from kilo-auto/frontier to kilo-auto/balanced (kiloconnect[bot], 2026-03-16)
- ea4f5ebd - feat(i18n): add marketplace translations for all 16 languages (Mark IJbema, 2026-03-16)
- 2559229a - feat(marketplace): implement skills tab with MCP/modes placeholders (Mark IJbema, 2026-03-16)
- 5aa13051 - docs: add commit conventions section to AGENTS.md (#7125) (Marius, 2026-03-16)
- 7d7133c3 - Merge pull request #7121 from Kilo-Org/remove-new-label-and-feature-toggle (Mark IJbema, 2026-03-16)
- ab097286 - Remove (NEW) labels and feature toggle from VS Code extension (kiloconnect[bot], 2026-03-16)
- 3a76e569 - fix(vscode): add inert to collapsed question dock body for keyboard accessibility (#7118) (Marius, 2026-03-16)
- 04843181 - Granular bash permission rules (#7091) (Imanol Maiztegui, 2026-03-16)
- 4c5bd136 - fix: use correct config.json schema URL (app.kilo.ai) (#7086) (John Brick, 2026-03-16)
- 80d69046 - Merge pull request #7111 from Kilo-Org/mark/fix-config-update-spam (Mark IJbema, 2026-03-16)
- 88a55980 - fix: guard temperature and prevent prompt injection in enhance-prompt (#7103) (Marius, 2026-03-16)
- d38b9e6c - feat(vscode): collapsible question dock with compact single-box layout (#7112) (Marius, 2026-03-16)
- 457ff179 - Merge pull request #7100 from Kilo-Org/mark/remove-available-modes (Mark IJbema, 2026-03-16)
- 10748172 - Guard config fetch/update against disconnected backend (Mark IJbema, 2026-03-16)
- a5618aba - fix: clear stale agent selection when removing a custom mode (Mark IJbema, 2026-03-16)
- f7d89837 - fix: format zh.ts and zht.ts with prettier (Mark IJbema, 2026-03-16)
- 1e5f9a6f - chore: update kilo-vscode visual regression baselines (github-actions[bot], 2026-03-16)
- 3c362320 - Merge pull request #7105 from Kilo-Org/cleanup/migration-plan-remaining-work (Mark IJbema, 2026-03-16)
- a4067417 - fix: delay optimistic removal until after dialog close animation (Mark IJbema, 2026-03-16)
- 57d20ce4 - remove editor-context-menus-and-code-actions.md (feature complete) (Mark IJbema, 2026-03-16)
- 9d8289a2 - restore kilocode-legacy anchor sections (Mark IJbema, 2026-03-16)
- 25b6aa36 - remove sessions-migration.md and update references (not migrating sessions) (Mark IJbema, 2026-03-16)
- b3edc7c5 - revert architect-mode-plan-files.md to original (Mark IJbema, 2026-03-16)
- b98d92c9 - docs: prune migration plan to remaining work only (kiloconnect[bot], 2026-03-16)
- be29e83f - Merge pull request #7097 from Kilo-Org/fix/terminal-add-to-context (Mark IJbema, 2026-03-16)
- a80d4953 - fix: prevent dialog from reopening on first mode removal (Mark IJbema, 2026-03-16)
- b8e196d1 - fix: also remove mode from legacy .kilocodemodes files used by ModesMigrator (Mark IJbema, 2026-03-16)
- b90a2237 - fix: remove unrelated formatting changes from i18n files (Mark IJbema, 2026-03-16)
- 0b702ea1 - feat: add backend route to delete custom mode files from disk (Mark IJbema, 2026-03-16)
- bcf609a5 - fix: rename 'Available Modes' to 'Available Custom Modes' in all locales (Mark IJbema, 2026-03-16)
- 7494ce6b - feat: add ability to remove custom modes from Agent Behaviour settings (Mark IJbema, 2026-03-16)
- 91aa29ba - fix: use direct generateText for prompt enhancement instead of LLM.stream (#7101) (Marius, 2026-03-16)
- ee0f3bb6 - perf(ui): defer markdown syntax highlighting to prevent main thread blocking (#7102) (Marius, 2026-03-16)
- a108d8b3 - Merge pull request #7089 from Kilo-Org/LigiaZ-patch-1 (Ligia Zanchet, 2026-03-16)
- eed5f903 - fix: restore register-code-actions.ts to origin/main version (Mark IJbema, 2026-03-16)
- 72e32477 - fix: remove unrelated register-code-actions.ts changes and conflict markers (Mark IJbema, 2026-03-16)
- ebbbaa40 - fix: use args.selection and clipboard fallback for terminal actions (Mark IJbema, 2026-03-16)
- b5766361 - fix(vscode): implement terminal Add to Context using clipboard-based selection (kiloconnect[bot], 2026-03-16)
- 7e69e22a - Merge pull request #7071 from Kilo-Org/revert-6629-fix/remove-duplicate-reasoning-hack (Christiaan Arnoldus, 2026-03-16)
- 0ba73504 - fix: copy buttons overlaying text and misaligned in chat UI (#7098) (Marius, 2026-03-16)
- 2a5808f8 - Merge pull request #7070 from Kilo-Org/mark/add-skill-removal (Mark IJbema, 2026-03-16)
- 23c8e5c7 - Update webhook trigger for feat PRs (Ligia Zanchet, 2026-03-16)
- 7073d379 - Merge pull request #7094 from Kilo-Org/fix/add-to-context-appends-instead-of-replaces (Mark IJbema, 2026-03-16)
- 6321252c - Merge pull request #7028 from Kilo-Org/kirillk/dogfood (Kirill Kalishev, 2026-03-16)
- f575587b - fix(vscode): append to prompt instead of replacing on Add to Context (kiloconnect[bot], 2026-03-16)
- 0d72df35 - fix(vscode): return focus to textarea after selector popover closes (#7078) (Marius, 2026-03-16)
- bce8c6e6 - fix: validate skill location against registry before deletion and re-sync webview on failure (Mark IJbema, 2026-03-16)
- 054589a2 - Merge pull request #7088 from Kilo-Org/mark/fix-local-bin-force (Mark IJbema, 2026-03-16)
- 269fd052 - Adjust for OpenRouter, some improvements (Christiaan Arnoldus, 2026-03-16)
- fa54205c - Merge pull request #7032 from Kilo-Org/docs/android-studio-known-issues (Ligia Zanchet, 2026-03-16)
- a17a5de9 - Add auto-docs workflow for merged feat PRs (Ligia Zanchet, 2026-03-16)
- 8b49ad78 - fix: local-bin --force now correctly removes dist directory (Mark IJbema, 2026-03-16)
- 531ae443 - Merge pull request #7084 from Kilo-Org/mark/i18n-settings-command-interpolation (Mark IJbema, 2026-03-16)
- cfe4e8c4 - fix: switch skill removal to POST with JSON body instead of DELETE with query params (Mark IJbema, 2026-03-16)
- 9507b01c - fix: rely on optimistic removal instead of stale backend response (Mark IJbema, 2026-03-16)
- f998ee32 - fix: return updated skills list from DELETE endpoint to fix stale UI (Mark IJbema, 2026-03-16)
- 2d9e4473 - refactor: rename to KilocodeRoutes at /kilocode prefix (Mark IJbema, 2026-03-16)
- 07d16dff - refactor: move DELETE /skill to dedicated route file (Mark IJbema, 2026-03-16)
- 5618b810 - i18n: add skill removal translations for all 15 languages (Mark IJbema, 2026-03-16)
- ec544e82 - feat: add DELETE /skill endpoint and use CLI backend for skill removal (Mark IJbema, 2026-03-16)
- 3da18dee - refactor: move skills state to session context with refreshSkills/removeSkill (Mark IJbema, 2026-03-16)
- 2e4070d4 - feat: add ability to remove discovered skills from Agent Behaviour settings (Mark IJbema, 2026-03-16)
- cc12e8d9 - Merge pull request #7081 from Kilo-Org/mark/fix-settings-panel-reload (Mark IJbema, 2026-03-16)
- 0b42d8ae - feat: open autocomplete tab directly from status bar settings link (Mark IJbema, 2026-03-16)
- 91c3c668 - refactor: pass settings command URI as i18n interpolation variable instead of hardcoding in locale files (kiloconnect[bot], 2026-03-16)
- 95221c99 - feat(vscode): persist active settings tab across webview reloads (Mark IJbema, 2026-03-16)
- 775a87e8 - fix(vscode): restore settings view after webview reload (Mark IJbema, 2026-03-16)
- 488f7266 - feat(vscode): replace message queuing with promptAsync and queued UI indicator (#7029) (Marius, 2026-03-16)
- 20edbff4 - Merge pull request #7073 from Kilo-Org/fix/login-popup-persistence (Mark IJbema, 2026-03-16)
- ada05c75 - Merge pull request #7072 from Kilo-Org/ci/check-kilocode-change-markers (Mark IJbema, 2026-03-16)
- f1f94984 - fix: consistent icon button sizing in prompt input actions (#7076) (Marius, 2026-03-16)
- 1dd8a45e - Exclude node_modules and dist from kilocode_change check, allow backtick-quoted references (Mark IJbema, 2026-03-16)
- c69b2107 - fix(vscode): align filename next to directory path in diff headers (#7075) (Marius, 2026-03-16)
- 971935f2 - Revert "fix: remove duplicate reasoning hack for kilo provider" (Christiaan Arnoldus, 2026-03-16)
- f5ac4ca5 - Move kilocode_change check to package.json script following knip pattern (kiloconnect[bot], 2026-03-16)
- 8875fc70 - Move kilocode_change check into existing test-vscode workflow instead of separate workflow (kiloconnect[bot], 2026-03-16)
- 3751bc34 - Add CI check to prevent kilocode_change markers in kilo packages (kiloconnect[bot], 2026-03-16)
- a594cb89 - Merge pull request #7066 from Kilo-Org/mark/fix-mcp-command-display (Mark IJbema, 2026-03-16)
- fdf95032 - fix: handle array-format MCP command in settings display (Mark IJbema, 2026-03-16)
- 75e2ac93 - docs: add Android Studio known issues to JetBrains troubleshooting section (kiloconnect[bot], 2026-03-13)
- 38c3543f - chore(vscode): use green checkmark for install success message (kirillk, 2026-03-13)
- 2742355c - chore(vscode): add DevSnapshot Build and Install tasks (kirillk, 2026-03-13)
- 84ffca26 - chore(vscode): replace install-dev-extension with snapshot:install task (kirillk, 2026-03-13)
- 2488f261 - Update packages/kilo-vscode/script/dev-snapshot.ts (Kirill Kalishev, 2026-03-13)
- c98c93a7 - Merge branch 'main' into kirillk/dogfood (Kirill Kalishev, 2026-03-13)
- bd083e2d - fix(vscode): run full typecheck (extension + webview) in snapshot build (kirillk, 2026-03-13)
- d434c42e - fix(vscode): semver-safe sanitization of git user.name in snapshot version (kirillk, 2026-03-13)
- e47e6efd - chore(vscode): move snapshot scripts to bottom of package.json (kirillk, 2026-03-13)
- 79970cd9 - fix(vscode): include username in vsix filename, deduplicate path output (kirillk, 2026-03-13)
- 2144bedf - docs(vscode): update snapshot build docs with directory and version info (kirillk, 2026-03-13)
- b535131c - feat(vscode): add dev-snapshot build script with username in version (kirillk, 2026-03-13)
- 876959f8 - fix: remove redundant vscode.env.openExternal call during login flow (kiloconnect[bot], 2026-03-13)

### Changed Files by Category

#### Tool System (packages/*/src/tool/)
- `packages/opencode/src/tool/bash.ts` (+4, -1)
- `packages/opencode/test/tool/bash.test.ts` (+4, -2)

#### Agent System (packages/*/src/agent/)
- `packages/opencode/src/agent/agent.ts` (+76, -0)

#### Permission System (**/permission/)
- `packages/opencode/src/permission/next.ts` (+8, -8)
- `packages/opencode/test/permission/next.always-rules.test.ts` (+169, -0)
- `packages/opencode/test/permission/next.pattern-rules.test.ts` (+0, -317)

#### Event Bus (**/bus/, **/event/)
(no changes)

#### Core (**/core/)
(no changes)

#### Other Changes
- `.github/workflows/auto-docs.yml` (+35, -0)
- `.github/workflows/test-vscode.yml` (+4, -0)
- `.vscode/tasks.json` (+20, -2)
- `AGENTS.md` (+5, -0)
- `bun.lock` (+3, -1)
- `packages/kilo-docs/pages/code-with-ai/platforms/cli.md` (+4, -4)
- `packages/kilo-docs/pages/customize/custom-subagents.md` (+1, -1)
- `packages/kilo-docs/pages/getting-started/faq/known-issues.md` (+21, -0)
- `packages/kilo-gateway/src/api/constants.ts` (+1, -1)
- `packages/kilo-i18n/src/ar.ts` (+29, -0)
- `packages/kilo-i18n/src/br.ts` (+29, -0)
- `packages/kilo-i18n/src/bs.ts` (+29, -0)
- `packages/kilo-i18n/src/da.ts` (+29, -0)
- `packages/kilo-i18n/src/de.ts` (+29, -0)
- `packages/kilo-i18n/src/en.ts` (+28, -2)
- `packages/kilo-i18n/src/es.ts` (+29, -0)
- `packages/kilo-i18n/src/fr.ts` (+29, -0)
- `packages/kilo-i18n/src/ja.ts` (+28, -0)
- `packages/kilo-i18n/src/ko.ts` (+28, -0)
- `packages/kilo-i18n/src/no.ts` (+29, -0)
- `packages/kilo-i18n/src/pl.ts` (+29, -0)
- `packages/kilo-i18n/src/ru.ts` (+29, -0)
- `packages/kilo-i18n/src/th.ts` (+29, -0)
- `packages/kilo-i18n/src/zh.ts` (+28, -0)
- `packages/kilo-i18n/src/zht.ts` (+28, -0)
- `packages/kilo-ui/src/components/message-part.css` (+23, -15)
- `packages/kilo-ui/src/hooks/create-auto-scroll.tsx` (+0, -1)
- `packages/kilo-ui/tests/visual-regression.spec.ts-snapshots/components-messagepart/full-conversation-turn-chromium-linux.png` (+2, -2)
- `packages/kilo-ui/tests/visual-regression.spec.ts-snapshots/components-messagepart/message-switch-chromium-linux.png` (+2, -2)
- `packages/kilo-ui/tests/visual-regression.spec.ts-snapshots/components-messagepart/user-message-story-chromium-linux.png` (+2, -2)
- `packages/kilo-ui/tests/visual-regression.spec.ts-snapshots/components-sessionturn/default-chromium-linux.png` (+2, -2)
- `packages/kilo-ui/tests/visual-regression.spec.ts-snapshots/components-sessionturn/with-steps-expanded-chromium-linux.png` (+2, -2)
- `packages/kilo-ui/tests/visual-regression.spec.ts-snapshots/components-sessionturn/working-chromium-linux.png` (+2, -2)
- `packages/kilo-vscode/AGENTS.md` (+0, -4)
- `packages/kilo-vscode/README.md` (+16, -0)
- `packages/kilo-vscode/docs/chat-ui-features/browser-session-controls.md` (+0, -5)
- `packages/kilo-vscode/docs/chat-ui-features/checkpoint-task-management.md` (+3, -14)
- `packages/kilo-vscode/docs/chat-ui-features/connection-state-ui.md` (+0, -39)
- `packages/kilo-vscode/docs/chat-ui-features/mermaid-diagram-features.md` (+7, -15)
- `packages/kilo-vscode/docs/chat-ui-features/message-editing-management.md` (+1, -2)
- `packages/kilo-vscode/docs/chat-ui-features/special-content-types.md` (+0, -8)
- `packages/kilo-vscode/docs/cli-side/ask-mode-no-edits.md` (+0, -24)
- `packages/kilo-vscode/docs/cli-side/init-secret-check.md` (+3, -14)
- `packages/kilo-vscode/docs/cli-side/plan-mode-over-prompting.md` (+5, -15)
- `packages/kilo-vscode/docs/error-handling/autocomplete-settings-link.md` (+4, -16)
- `packages/kilo-vscode/docs/error-handling/cli-startup-errors.md` (+6, -25)
- `packages/kilo-vscode/docs/error-handling/extension-refresh-on-update.md` (+3, -15)
- `packages/kilo-vscode/docs/error-handling/pre-release-switch-crash.md` (+6, -17)
- `packages/kilo-vscode/docs/error-handling/propagate-cli-errors-to-ui.md` (+5, -20)
- `packages/kilo-vscode/docs/features/anonymous-signin-prompts.md` (+0, -29)
- `packages/kilo-vscode/docs/features/custom-openai-provider-ui.md` (+7, -24)
- `packages/kilo-vscode/docs/features/expandable-mcp-tools.md` (+4, -16)
- `packages/kilo-vscode/docs/features/file-attachments.md` (+5, -15)
- `packages/kilo-vscode/docs/features/remember-last-model.md` (+4, -15)
- `packages/kilo-vscode/docs/features/session-preview-improvements.md` (+4, -17)
- `packages/kilo-vscode/docs/features/subagent-visibility.md` (+0, -25)
- `packages/kilo-vscode/docs/features/task-completion-notification.md` (+5, -20)
- `packages/kilo-vscode/docs/features/terminal-output-visibility.md` (+0, -29)
- `packages/kilo-vscode/docs/infrastructure/changelog-on-update.md` (+5, -16)
- `packages/kilo-vscode/docs/infrastructure/dedicated-output-channel.md` (+4, -31)
- `packages/kilo-vscode/docs/infrastructure/http-request-timeouts.md` (+3, -22)
- `packages/kilo-vscode/docs/infrastructure/openvsx-publish.md` (+4, -18)
- `packages/kilo-vscode/docs/infrastructure/sdk-over-http.md` (+0, -27)
- `packages/kilo-vscode/docs/infrastructure/session-turn.md` (+0, -26)
- `packages/kilo-vscode/docs/infrastructure/sse-auto-reconnect.md` (+0, -40)
- `packages/kilo-vscode/docs/infrastructure/vscode-error-notifications.md` (+3, -24)
- `packages/kilo-vscode/docs/migration/memorybank-migration.md` (+5, -20)
- `packages/kilo-vscode/docs/migration/sessions-migration.md` (+0, -25)
- `packages/kilo-vscode/docs/migration/settings-migration.md` (+6, -17)
- `packages/kilo-vscode/docs/migration/upgrade-onboarding.md` (+7, -20)
- `packages/kilo-vscode/docs/non-agent-features/authentication-organization-enterprise-enforcement.md` (+0, -7)
- `packages/kilo-vscode/docs/non-agent-features/auto-purge.md` (+0, -1)
- `packages/kilo-vscode/docs/non-agent-features/cloud-task-support.md` (+0, -9)
- `packages/kilo-vscode/docs/non-agent-features/code-reviews.md` (+0, -1)
- `packages/kilo-vscode/docs/non-agent-features/codebase-indexing-semantic-search.md` (+0, -1)
- `packages/kilo-vscode/docs/non-agent-features/contribution-tracking.md` (+0, -1)
- `packages/kilo-vscode/docs/non-agent-features/custom-command-system.md` (+0, -5)
- `packages/kilo-vscode/docs/non-agent-features/editor-context-menus-and-code-actions.md` (+0, -24)
- `packages/kilo-vscode/docs/non-agent-features/marketplace.md` (+1, -5)
- `packages/kilo-vscode/docs/non-agent-features/mcp-and-mcp-hub.md` (+1, -6)
- `packages/kilo-vscode/docs/non-agent-features/repository-initialization.md` (+0, -1)
- `packages/kilo-vscode/docs/non-agent-features/rules-and-workflows.md` (+1, -5)
- `packages/kilo-vscode/docs/non-agent-features/settings-sync-integration.md` (+0, -1)
- `packages/kilo-vscode/docs/non-agent-features/settings-ui.md` (+1, -4)
- `packages/kilo-vscode/docs/non-agent-features/skills-system.md` (+1, -5)
- `packages/kilo-vscode/docs/non-agent-features/speech-to-text.md` (+0, -1)
- `packages/kilo-vscode/docs/opencode-migration-plan.md` (+64, -97)
- `packages/kilo-vscode/docs/performance/markdown-syntax-highlighting.md` (+0, -34)
- `packages/kilo-vscode/docs/ui-polish/approval-box-full-path.md` (+4, -14)
- `packages/kilo-vscode/docs/ui-polish/chat-background-color.md` (+0, -20)
- `packages/kilo-vscode/docs/ui-polish/chat-input-cursor-misplacement.md` (+0, -22)
- `packages/kilo-vscode/docs/ui-polish/chat-input-narrow-sidebar-overflow.md` (+3, -14)
- `packages/kilo-vscode/docs/ui-polish/clickable-cursor-styles.md` (+0, -21)
- `packages/kilo-vscode/docs/ui-polish/context-compression-icon.md` (+0, -21)
- `packages/kilo-vscode/docs/ui-polish/copy-button-extra-fields.md` (+0, -21)
- `packages/kilo-vscode/docs/ui-polish/diff-jump-to-changed-lines.md` (+0, -22)
- `packages/kilo-vscode/docs/ui-polish/markdown-rendering-improvements.md` (+5, -16)
- `packages/kilo-vscode/docs/ui-polish/new-task-discoverability.md` (+0, -28)
- `packages/kilo-vscode/docs/ui-polish/profile-view-back-button.md` (+3, -15)
- `packages/kilo-vscode/docs/ui-polish/reasoning-block-styling.md` (+0, -24)
- `packages/kilo-vscode/package.json` (+9, -5)
- `packages/kilo-vscode/script/dev-snapshot.ts` (+69, -0)
- `packages/kilo-vscode/script/install-dev-extension.ts` (+0, -35)
- `packages/kilo-vscode/script/local-bin.ts` (+2, -3)
- `packages/kilo-vscode/src/KiloProvider.ts` (+215, -26)
- `packages/kilo-vscode/src/SettingsEditorProvider.ts` (+46, -9)
- `packages/kilo-vscode/src/constants.ts` (+1, -17)
- `packages/kilo-vscode/src/extension.ts` (+4, -4)
- `packages/kilo-vscode/src/project-directory.ts` (+69, -0)
- `packages/kilo-vscode/src/services/autocomplete/AutocompleteStatusBar.ts` (+8, -2)
- `packages/kilo-vscode/src/services/autocomplete/i18n/ar.ts` (+2, -2)
- `packages/kilo-vscode/src/services/autocomplete/i18n/ca.ts` (+2, -2)
- `packages/kilo-vscode/src/services/autocomplete/i18n/cs.ts` (+2, -2)
- `packages/kilo-vscode/src/services/autocomplete/i18n/de.ts` (+2, -2)
- `packages/kilo-vscode/src/services/autocomplete/i18n/en.ts` (+2, -2)
- `packages/kilo-vscode/src/services/autocomplete/i18n/es.ts` (+2, -2)
- `packages/kilo-vscode/src/services/autocomplete/i18n/fr.ts` (+2, -2)
- `packages/kilo-vscode/src/services/autocomplete/i18n/hi.ts` (+2, -2)
- `packages/kilo-vscode/src/services/autocomplete/i18n/id.ts` (+2, -2)
- `packages/kilo-vscode/src/services/autocomplete/i18n/it.ts` (+2, -2)
- `packages/kilo-vscode/src/services/autocomplete/i18n/ja.ts` (+2, -2)
- `packages/kilo-vscode/src/services/autocomplete/i18n/ko.ts` (+2, -2)
- `packages/kilo-vscode/src/services/autocomplete/i18n/nl.ts` (+2, -2)
- `packages/kilo-vscode/src/services/autocomplete/i18n/pl.ts` (+2, -2)
- `packages/kilo-vscode/src/services/autocomplete/i18n/pt-BR.ts` (+2, -2)
- `packages/kilo-vscode/src/services/autocomplete/i18n/ru.ts` (+2, -2)
- `packages/kilo-vscode/src/services/autocomplete/i18n/sk.ts` (+2, -2)
- `packages/kilo-vscode/src/services/autocomplete/i18n/th.ts` (+2, -2)
- `packages/kilo-vscode/src/services/autocomplete/i18n/tr.ts` (+2, -2)
- `packages/kilo-vscode/src/services/autocomplete/i18n/uk.ts` (+2, -2)
- `packages/kilo-vscode/src/services/autocomplete/i18n/vi.ts` (+2, -2)
- `packages/kilo-vscode/src/services/autocomplete/i18n/zh-CN.ts` (+2, -2)
- `packages/kilo-vscode/src/services/autocomplete/i18n/zh-TW.ts` (+2, -2)
- `packages/kilo-vscode/src/services/code-actions/register-code-actions.ts` (+1, -2)
- `packages/kilo-vscode/src/services/code-actions/register-terminal-actions.ts` (+71, -19)
- `packages/kilo-vscode/src/services/marketplace/api.ts` (+146, -0)
- `packages/kilo-vscode/src/services/marketplace/detection.ts` (+82, -0)
- `packages/kilo-vscode/src/services/marketplace/index.ts` (+72, -0)
- `packages/kilo-vscode/src/services/marketplace/installer.ts` (+175, -0)
- `packages/kilo-vscode/src/services/marketplace/paths.ts` (+25, -0)
- `packages/kilo-vscode/src/services/marketplace/types.ts` (+84, -0)
- `packages/kilo-vscode/tests/unit/i18n-shim.test.ts` (+1, -0)
- `packages/kilo-vscode/tests/unit/kilo-ui-contract.test.ts` (+1, -1)
- `packages/kilo-vscode/tests/visual-regression.spec.ts-snapshots/chat/question-dock-many-options-chromium-linux.png` (+3, -0)
- `packages/kilo-vscode/tests/visual-regression.spec.ts-snapshots/chat/question-dock-multi-chromium-linux.png` (+2, -2)
- `packages/kilo-vscode/tests/visual-regression.spec.ts-snapshots/chat/question-dock-single-chromium-linux.png` (+2, -2)
- `packages/kilo-vscode/tests/visual-regression.spec.ts-snapshots/composite-webview/question-above-chatbox-chromium-linux.png` (+2, -2)
- `packages/kilo-vscode/tests/visual-regression.spec.ts-snapshots/prompt-input/default-420-chromium-linux.png` (+2, -2)
- `packages/kilo-vscode/tests/visual-regression.spec.ts-snapshots/settings/agent-behaviour-agents-chromium-linux.png` (+2, -2)
- `packages/kilo-vscode/webview-ui/agent-manager/agent-manager.css` (+1, -1)
- `packages/kilo-vscode/webview-ui/src/App.tsx` (+7, -20)
- `packages/kilo-vscode/webview-ui/src/components/chat/ChatView.tsx` (+2, -2)
- `packages/kilo-vscode/webview-ui/src/components/chat/MessageList.tsx` (+23, -8)
- `packages/kilo-vscode/webview-ui/src/components/chat/PermissionDock.tsx` (+57, -53)
- `packages/kilo-vscode/webview-ui/src/components/chat/PromptInput.tsx` (+34, -8)
- `packages/kilo-vscode/webview-ui/src/components/chat/QuestionDock.tsx` (+172, -150)
- `packages/kilo-vscode/webview-ui/src/components/chat/VscodeSessionTurn.tsx` (+2, -1)
- `packages/kilo-vscode/webview-ui/src/components/marketplace/InstallModal.tsx` (+118, -0)
- `packages/kilo-vscode/webview-ui/src/components/marketplace/ItemCard.tsx` (+76, -0)
- `packages/kilo-vscode/webview-ui/src/components/marketplace/MarketplaceView.tsx` (+168, -0)
- `packages/kilo-vscode/webview-ui/src/components/marketplace/RemoveDialog.tsx` (+34, -0)
- `packages/kilo-vscode/webview-ui/src/components/marketplace/SkillsMarketplace.tsx` (+86, -0)
- `packages/kilo-vscode/webview-ui/src/components/marketplace/index.ts` (+1, -0)
- `packages/kilo-vscode/webview-ui/src/components/marketplace/marketplace.css` (+231, -0)
- `packages/kilo-vscode/webview-ui/src/components/marketplace/utils.ts` (+12, -0)
- `packages/kilo-vscode/webview-ui/src/components/settings/AgentBehaviourTab.tsx` (+128, -32)
- `packages/kilo-vscode/webview-ui/src/components/settings/Settings.tsx` (+29, -2)
- `packages/kilo-vscode/webview-ui/src/components/shared/ModeSwitcher.tsx` (+10, -1)
- `packages/kilo-vscode/webview-ui/src/components/shared/ModelSelector.tsx` (+4, -1)
- `packages/kilo-vscode/webview-ui/src/components/shared/ThinkingSelector.tsx` (+1, -0)
- `packages/kilo-vscode/webview-ui/src/context/session-queue.ts` (+25, -0)
- `packages/kilo-vscode/webview-ui/src/context/session.tsx` (+157, -35)
- `packages/kilo-vscode/webview-ui/src/hooks/useImageAttachments.ts` (+3, -0)
- `packages/kilo-vscode/webview-ui/src/i18n/ar.ts` (+14, -4)
- `packages/kilo-vscode/webview-ui/src/i18n/br.ts` (+14, -4)
- `packages/kilo-vscode/webview-ui/src/i18n/bs.ts` (+14, -4)
- `packages/kilo-vscode/webview-ui/src/i18n/da.ts` (+14, -4)
- `packages/kilo-vscode/webview-ui/src/i18n/de.ts` (+14, -4)
- `packages/kilo-vscode/webview-ui/src/i18n/en.ts` (+13, -4)
- `packages/kilo-vscode/webview-ui/src/i18n/es.ts` (+14, -4)
- `packages/kilo-vscode/webview-ui/src/i18n/fr.ts` (+14, -4)
- `packages/kilo-vscode/webview-ui/src/i18n/ja.ts` (+14, -4)
- `packages/kilo-vscode/webview-ui/src/i18n/ko.ts` (+14, -4)
- `packages/kilo-vscode/webview-ui/src/i18n/no.ts` (+14, -4)
- `packages/kilo-vscode/webview-ui/src/i18n/pl.ts` (+14, -4)
- `packages/kilo-vscode/webview-ui/src/i18n/ru.ts` (+14, -4)
- `packages/kilo-vscode/webview-ui/src/i18n/th.ts` (+14, -4)
- `packages/kilo-vscode/webview-ui/src/i18n/zh.ts` (+12, -4)
- `packages/kilo-vscode/webview-ui/src/i18n/zht.ts` (+12, -4)
- `packages/kilo-vscode/webview-ui/src/stories/chat.stories.tsx` (+32, -0)
- `packages/kilo-vscode/webview-ui/src/stories/composite.stories.tsx` (+4, -4)
- `packages/kilo-vscode/webview-ui/src/styles/chat.css` (+302, -45)
- `packages/kilo-vscode/webview-ui/src/types/marketplace.ts` (+48, -0)
- `packages/kilo-vscode/webview-ui/src/types/messages.ts` (+107, -5)
- `packages/kilo-vscode/webview-ui/src/utils/id.ts` (+60, -0)
- `packages/opencode/src/config/config.ts` (+4, -4)
- `packages/opencode/src/kilocode/bash-hierarchy.ts` (+29, -0)
- `packages/opencode/src/kilocode/enhance-prompt.ts` (+24, -38)
- `packages/opencode/src/provider/transform.ts` (+45, -0)
- `packages/opencode/src/server/routes/kilocode.ts` (+74, -0)
- `packages/opencode/src/server/routes/permission.ts` (+10, -10)
- `packages/opencode/src/server/server.ts` (+2, -0)
- `packages/opencode/src/skill/skill.ts` (+24, -0)
- `packages/opencode/test/kilocode/bash-hierarchy.test.ts` (+64, -0)
- `packages/sdk/js/src/v2/gen/sdk.gen.ts` (+101, -12)
- `packages/sdk/js/src/v2/gen/types.gen.ts` (+70, -10)
- `packages/sdk/openapi.json` (+140, -8)
- `packages/ui/package.json` (+0, -1)
- `packages/ui/src/components/markdown.tsx` (+59, -13)
- `packages/ui/src/components/message-part.tsx` (+2, -2)
- `packages/ui/src/context/marked.tsx` (+172, -19)

### Key Diffs

#### packages/opencode/src/agent/agent.ts
```diff
diff --git a/packages/opencode/src/agent/agent.ts b/packages/opencode/src/agent/agent.ts
index 509568b3..e8137eff 100644
--- a/packages/opencode/src/agent/agent.ts
+++ b/packages/opencode/src/agent/agent.ts
@@ -17,6 +17,8 @@ import PROMPT_ORCHESTRATOR from "./prompt/orchestrator.txt"
 import PROMPT_SUMMARY from "./prompt/summary.txt"
 import PROMPT_TITLE from "./prompt/title.txt"
 import { PermissionNext } from "@/permission/next"
+import { NamedError } from "@opencode-ai/util/error" // kilocode_change
+import { Glob } from "../util/glob" // kilocode_change
 import { mergeDeep, pipe, sortBy, values } from "remeda"
 import { Global } from "@/global"
 import path from "path"
@@ -438,4 +440,78 @@ export namespace Agent {
     const result = await generateObject(params)
     return result.object
   }
+
+  // kilocode_change start
+  export const RemoveError = NamedError.create(
+    "AgentRemoveError",
+    z.object({
+      name: z.string(),
+      message: z.string(),
+    }),
+  )
+
+  /**
+   * Remove a custom agent by deleting its markdown source file and/or
+   * removing it from legacy .kilocodemodes YAML files.
+   * Scans all config directories for agent/mode .md files matching the name,
+   * then also checks the .kilocodemodes files the ModesMigrator reads.
+   */
+  export async function remove(name: string) {
+    const agents = await state()
+    const agent = agents[name]
+    if (!agent) throw new RemoveError({ name, message: "agent not found" })
+    if (agent.native) throw new RemoveError({ name, message: "cannot remove native agent" })
+
+    const { unlink, readFile, writeFile } = await import("fs/promises")
+    let found = false
+
+    // 1. Delete .md files from config directories
+    const dirs = await Config.directories()
+    const patterns = ["{agent,agents}/**/" + name + ".md", "{mode,modes}/" + name + ".md"]
+    for (const dir of dirs) {
+      for (const pattern of patterns) {
+        const matches = await Glob.scan(pattern, { cwd: dir, absolute: true, dot: true })
+        for (const file of matches) {
+          if (await Bun.file(file).exists()) {
```

#### packages/opencode/src/permission/next.ts
```diff
diff --git a/packages/opencode/src/permission/next.ts b/packages/opencode/src/permission/next.ts
index 7f848474..86de010d 100644
--- a/packages/opencode/src/permission/next.ts
+++ b/packages/opencode/src/permission/next.ts
@@ -161,25 +161,25 @@ export namespace PermissionNext {
   )
 
   // kilocode_change start
-  export const savePatternRules = fn(
+  export const saveAlwaysRules = fn(
     z.object({
       requestID: Identifier.schema("permission"),
-      approvedPatterns: z.string().array().optional(),
-      deniedPatterns: z.string().array().optional(),
+      approvedAlways: z.string().array().optional(),
+      deniedAlways: z.string().array().optional(),
     }),
     async (input) => {
       const s = await state()
       const existing = s.pending[input.requestID]
       if (!existing) throw new NotFoundError({ message: `Permission request ${input.requestID} not found` })
 
-      const validPatterns = new Set(existing.info.patterns)
+      const validRules = new Set(existing.info.metadata?.rules ?? [])
       const permission = existing.info.permission
 
-      for (const pattern of input.approvedPatterns ?? []) {
-        if (validPatterns.has(pattern)) s.approved.push({ permission, pattern, action: "allow" })
+      for (const pattern of input.approvedAlways ?? []) {
+        if (validRules.has(pattern)) s.approved.push({ permission, pattern, action: "allow" })
       }
-      for (const pattern of input.deniedPatterns ?? []) {
-        if (validPatterns.has(pattern)) s.approved.push({ permission, pattern, action: "deny" })
+      for (const pattern of input.deniedAlways ?? []) {
+        if (validRules.has(pattern)) s.approved.push({ permission, pattern, action: "deny" })
       }
     },
   )
```

#### packages/opencode/src/tool/bash.ts
```diff
diff --git a/packages/opencode/src/tool/bash.ts b/packages/opencode/src/tool/bash.ts
index 0e55225b..9871d307 100644
--- a/packages/opencode/src/tool/bash.ts
+++ b/packages/opencode/src/tool/bash.ts
@@ -16,6 +16,7 @@ import { Flag } from "@/flag/flag.ts"
 import { Shell } from "@/shell/shell"
 
 import { BashArity } from "@/permission/arity"
+import { BashHierarchy } from "@/kilocode/bash-hierarchy" // kilocode_change
 import { Truncate } from "./truncation"
 import { Plugin } from "@/plugin"
 
@@ -90,6 +91,7 @@ export const BashTool = Tool.define("bash", async () => {
       if (!Instance.containsPath(cwd)) directories.add(cwd)
       const patterns = new Set<string>()
       const always = new Set<string>()
+      const rules = new Set<string>() // kilocode_change — hierarchy rules for permissions "npm", "npm install", "npm install lodash"
 
       for (const node of tree.rootNode.descendantsOfType("command")) {
         if (!node) continue
@@ -139,6 +141,7 @@ export const BashTool = Tool.define("bash", async () => {
         if (command.length && command[0] !== "cd") {
           patterns.add(commandText)
           always.add(BashArity.prefix(command).join(" ") + " *")
+          BashHierarchy.addAll(rules, command, commandText) // kilocode_change
         }
       }
 
@@ -161,7 +164,7 @@ export const BashTool = Tool.define("bash", async () => {
           permission: "bash",
           patterns: Array.from(patterns),
           always: Array.from(always),
-          metadata: { command: params.command }, // kilocode_change
+          metadata: { command: params.command, rules: Array.from(rules) }, // kilocode_change
         })
       }
 
```

#### packages/opencode/test/permission/next.always-rules.test.ts
```diff
diff --git a/packages/opencode/test/permission/next.always-rules.test.ts b/packages/opencode/test/permission/next.always-rules.test.ts
new file mode 100644
index 00000000..f6a3d8e4
--- /dev/null
+++ b/packages/opencode/test/permission/next.always-rules.test.ts
@@ -0,0 +1,169 @@
+import { test, expect, describe } from "bun:test"
+import { PermissionNext } from "../../src/permission/next"
+import { Instance } from "../../src/project/instance"
+import { NotFoundError } from "../../src/storage/db"
+import { tmpdir } from "../fixture/fixture"
+
+describe("saveAlwaysRules", () => {
+  test("approved rules auto-allow future requests", async () => {
+    await using tmp = await tmpdir({ git: true })
+    await Instance.provide({
+      directory: tmp.path,
+      fn: async () => {
+        const askPromise = PermissionNext.ask({
+          id: "permission_1",
+          sessionID: "session_test",
+          permission: "bash",
+          patterns: ["npm install"],
+          metadata: { rules: ["npm *", "npm install"] },
+          always: ["npm install *"],
+          ruleset: [],
+        })
+
+        await PermissionNext.saveAlwaysRules({ requestID: "permission_1", approvedAlways: ["npm install"] })
+        await PermissionNext.reply({ requestID: "permission_1", reply: "once" })
+        await expect(askPromise).resolves.toBeUndefined()
+
+        const result = await PermissionNext.ask({
+          sessionID: "session_test",
+          permission: "bash",
+          patterns: ["npm install"],
+          metadata: {},
+          always: [],
+          ruleset: [],
+        })
+        expect(result).toBeUndefined()
+      },
+    })
+  })
+
+  test("denied rules auto-deny future requests", async () => {
+    await using tmp = await tmpdir({ git: true })
+    await Instance.provide({
+      directory: tmp.path,
+      fn: async () => {
```

#### packages/opencode/test/permission/next.pattern-rules.test.ts
```diff
diff --git a/packages/opencode/test/permission/next.pattern-rules.test.ts b/packages/opencode/test/permission/next.pattern-rules.test.ts
deleted file mode 100644
index f47c00a1..00000000
--- a/packages/opencode/test/permission/next.pattern-rules.test.ts
+++ /dev/null
@@ -1,317 +0,0 @@
-import { test, expect } from "bun:test"
-import { PermissionNext } from "../../src/permission/next"
-import { Instance } from "../../src/project/instance"
-import { NotFoundError } from "../../src/storage/db"
-import { tmpdir } from "../fixture/fixture"
-
-test("savePatternRules - approvedPatterns saves allow rules for future requests", async () => {
-  await using tmp = await tmpdir({ git: true })
-  await Instance.provide({
-    directory: tmp.path,
-    fn: async () => {
-      const askPromise = PermissionNext.ask({
-        id: "permission_approved1",
-        sessionID: "session_test",
-        permission: "bash",
-        patterns: ["npm install"],
-        metadata: {},
-        always: [],
-        ruleset: [],
-      })
-
-      // Save pattern rules before replying
-      await PermissionNext.savePatternRules({
-        requestID: "permission_approved1",
-        approvedPatterns: ["npm install"],
-      })
-
-      await PermissionNext.reply({
-        requestID: "permission_approved1",
-        reply: "once",
-      })
-
-      await expect(askPromise).resolves.toBeUndefined()
-
-      // The approved pattern should now auto-allow future requests
-      const result = await PermissionNext.ask({
-        sessionID: "session_test",
-        permission: "bash",
-        patterns: ["npm install"],
-        metadata: {},
-        always: [],
-        ruleset: [],
-      })
-      expect(result).toBeUndefined()
```


*... and more files (showing first 5)*

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
- `src/permission/` - review permission changes from packages/opencode/src/permission/next.ts
- `src/permission/` - review permission changes from packages/opencode/test/permission/next.always-rules.test.ts
- `src/permission/` - review permission changes from packages/opencode/test/permission/next.pattern-rules.test.ts
- `src/tool/bash.test.ts` - update based on kilocode packages/opencode/test/tool/bash.test.ts changes
- `src/tool/bash.ts` - update based on kilocode packages/opencode/src/tool/bash.ts changes
