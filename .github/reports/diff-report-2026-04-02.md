# Upstream Changes Report
Generated: 2026-04-02 07:15:15

## Summary
- kilocode: 55 commits, 82 files changed
- opencode: 55 commits, 128 files changed

## kilocode Changes (4abe34853..c27c81a2b)

### Commits

- c27c81a2b - Merge pull request #8091 from Kilo-Org/docs/kiloclaw-webhooks (Andrew Storms, 2026-04-01)
- 25358e4c2 - docs(kiloclaw): add Triggers section with webhooks documentation (St0rmz1, 2026-04-01)
- 01fe5f9bf - Merge pull request #8086 from Kilo-Org/fix/i18n-builtin-mode-banner-translations (Mark IJbema, 2026-04-01)
- ddc59419e - fix(i18n): update built-in mode banner translations to match #7720 (kiloconnect[bot], 2026-04-01)
- 8f7a5f48b - release: v7.1.17 (kilo-maintainer[bot], 2026-04-01)
- c9fcfe7b9 - Merge pull request #8061 from Kilo-Org/fix/vscode-publish-release-not-preview (Mark IJbema, 2026-04-01)
- 325a64eac - release: v7.1.16 (kilo-maintainer[bot], 2026-04-01)
- e0f9f48cc - Merge pull request #8079 from Kilo-Org/fix/windows-hide-login-8078 (Mark IJbema, 2026-04-01)
- bc4a7ce7e - fix(gateway): prevent shell injection in device auth URL opening (Mark IJbema, 2026-04-01)
- c7dd3a4f4 - fix: hide cmd.exe window when opening browser during login on Windows (kiloconnect[bot], 2026-04-01)
- 673f5cb51 - Merge pull request #8076 from Kilo-Org/docs/kiloclaw-suggested-configuration-walkthrough (Alex Gold, 2026-04-01)
- 7fe29a63a - Merge branch 'main' into docs/kiloclaw-suggested-configuration-walkthrough (Alex Gold, 2026-04-01)
- 7037d2267 - docs(kilo-docs): convert prompt/scheduling/skills bullets to h3 sections (Alex Gold, 2026-04-01)
- c796318d0 - Merge pull request #8063 from Kilo-Org/catrielmuller/7673 (Catriel Müller, 2026-04-01)
- 48bd45135 - docs(kilo-docs): clarify skills can be installed or custom-built (Alex Gold, 2026-04-01)
- f7db04856 - docs(kilo-docs): clarify skills description and add Bytes library link (Alex Gold, 2026-04-01)
- 5880e49a2 - docs(kilo-docs): convert cron job tip to callout (Alex Gold, 2026-04-01)
- 8c1926c1a - docs(kilo-docs): add blockquote styles and restore blockquote syntax for example prompts (Alex Gold, 2026-04-01)
- cde54482b - docs(kilo-docs): update auto-approval instructions to use dashboard UI (Alex Gold, 2026-04-01)
- c8a650a75 - docs(kilo-docs): exclude console.cloud.google.com from link checker (Alex Gold, 2026-04-01)
- a9a2fbdb5 - docs(kilo-docs): replace blockquotes with code blocks for example prompts (Alex Gold, 2026-04-01)
- 894dd3408 - Merge branch 'main' into docs/kiloclaw-suggested-configuration-walkthrough (Alex Gold, 2026-04-01)
- 3f89c990a - Apply suggestion from @alexkgold (Alex Gold, 2026-04-01)
- 63df2b793 - docs(kilo-docs): rewrite kiloclaw suggested-configuration as full setup walkthrough (Alex Gold, 2026-04-01)
- 18322e9ee - fix(cli): inject plan file path into non-experimental plan mode prompt (#8065) (Marius, 2026-04-01)
- a1c8e5d79 - release: v7.1.15 (kilo-maintainer[bot], 2026-04-01)
- 560ffaa92 - fix(vscode): throw on project.list() failure in drainPendingPrompts (Catriel Müller, 2026-04-01)
- 7bd470626 - fix(vscode): normalize migrated session paths (#8062) (Imanol Maiztegui, 2026-04-01)
- ec7721190 - Merge pull request #8067 from Kilo-Org/revert-8052-fix/zombie-cli-serve-processes (Mark IJbema, 2026-04-01)
- 6f7df50b4 - Revert "fix(cli): prevent zombie `kilo serve` processes on extension host crash" (Mark IJbema, 2026-04-01)
- a542db82c - fix(vscode): query project.list() to drain prompts for closed providers (Catriel Müller, 2026-04-01)
- a2fc2ad93 - fix: keep plan follow-up sessions in the same worktree (#7945) (Marius, 2026-04-01)
- ba2ecf13f - fix(vscode): address PR review — broadcast drain across all providers (Catriel Müller, 2026-04-01)
- 098b8c397 - fix(vscode): drain pending permissions and questions before config save (Catriel Müller, 2026-04-01)
- cbae0ece8 - fix(vscode): publish extension as release instead of pre-release (kiloconnect[bot], 2026-04-01)
- c9d4d1ac8 - release: v7.1.14 (kilo-maintainer[bot], 2026-04-01)
- 06b2c7a65 - Merge pull request #8060 from Kilo-Org/mark/skip-telemetry-request-logging (Mark IJbema, 2026-04-01)
- 93c7d4ab3 - Merge pull request #8052 from Kilo-Org/fix/zombie-cli-serve-processes (Mark IJbema, 2026-04-01)
- bd4b235dd - Merge branch 'main' into fix/zombie-cli-serve-processes (Mark IJbema, 2026-04-01)
- 645ad3630 - fix: skip request logging for /telemetry/capture endpoint (Mark IJbema, 2026-04-01)
- 9f0996931 - Merge pull request #8058 from Kilo-Org/feat/arabic-rtl-support (Mark IJbema, 2026-04-01)
- 64809791f - fix(vscode): use valid BCP 47 lang tags for html lang attribute (kiloconnect[bot], 2026-04-01)
- 2196893b9 - feat(vscode): set RTL direction on html element for Arabic locale (kiloconnect[bot], 2026-04-01)
- 036b9f79d - Merge pull request #8049 from Kilo-Org/feat/add-ukrainian-translation (Mark IJbema, 2026-04-01)
- df568fc8c - fix(i18n): refine ukrainian translation wording (kiloconnect[bot], 2026-04-01)
- 2de6c363e - fix(cli): prevent zombie kilo serve processes on extension host crash (kiloconnect[bot], 2026-04-01)
- a606f2eab - feat(i18n): add complete Ukrainian (uk) translation (kiloconnect[bot], 2026-04-01)
- 7faec3ee9 - feat(i18n): add uk translations across packages (kiloconnect[bot], 2026-04-01)
- 3ccf31527 - Merge pull request #8042 from Kilo-Org/mark/tab-panel-toolbar-buttons (Mark IJbema, 2026-04-01)
- 79f1bf4bf - docs(vscode): explain why tab toolbar omits agent manager and marketplace (Mark IJbema, 2026-04-01)
- 649ca688c - fix(vscode): remove agent manager and marketplace buttons from tab toolbar (Mark IJbema, 2026-04-01)
- 3cc4d38f1 - release: v7.1.13 (kilo-maintainer[bot], 2026-04-01)
- b7fc4201c - feat(vscode): add toolbar buttons to editor tab panel (kiloconnect[bot], 2026-04-01)
- 6f20b0b63 - Merge branch 'main' of github.com:Kilo-Org/kilocode (Alex Gold, 2026-03-31)
- 4dcf643fa - Merge branch 'main' of github.com:Kilo-Org/kilocode (Alex Gold, 2026-03-25)

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
- `bun.lock` (+16, -16)
- `package.json` (+1, -1)
- `packages/app/package.json` (+1, -1)
- `packages/desktop-electron/package.json` (+1, -1)
- `packages/desktop/package.json` (+1, -1)
- `packages/extensions/zed/extension.toml` (+6, -6)
- `packages/kilo-docs/lib/nav/kiloclaw.ts` (+9, -0)
- `packages/kilo-docs/lychee.toml` (+2, -0)
- `packages/kilo-docs/package.json` (+1, -1)
- `packages/kilo-docs/pages/kiloclaw/end-to-end.md` (+157, -0)
- `packages/kilo-docs/pages/kiloclaw/suggested-configuration.md` (+171, -0)
- `packages/kilo-docs/pages/kiloclaw/triggers/index.md` (+32, -0)
- `packages/kilo-docs/pages/kiloclaw/triggers/webhooks.md` (+110, -0)
- `packages/kilo-docs/public/globals.css` (+9, -0)
- `packages/kilo-gateway/package.json` (+1, -1)
- `packages/kilo-gateway/src/auth/device-auth-tui.ts` (+9, -5)
- `packages/kilo-i18n/package.json` (+1, -1)
- `packages/kilo-i18n/src/uk.ts` (+72, -0)
- `packages/kilo-telemetry/package.json` (+1, -1)
- `packages/kilo-ui/package.json` (+1, -1)
- `packages/kilo-ui/src/i18n/uk.ts` (+1, -0)
- `packages/kilo-vscode/package.json` (+25, -3)
- `packages/kilo-vscode/script/build.ts` (+2, -11)
- `packages/kilo-vscode/script/publish.ts` (+3, -5)
- `packages/kilo-vscode/src/KiloProvider.ts` (+68, -7)
- `packages/kilo-vscode/src/agent-manager/AgentManagerProvider.ts` (+2, -1)
- `packages/kilo-vscode/src/extension.ts` (+24, -3)
- `packages/kilo-vscode/src/kilo-provider/followup-session.ts` (+25, -0)
- `packages/kilo-vscode/src/kilo-provider/handlers/question.ts` (+23, -9)
- `packages/kilo-vscode/src/legacy-migration/sessions/lib/messages.ts` (+8, -3)
- `packages/kilo-vscode/src/legacy-migration/sessions/lib/path.ts` (+25, -0)
- `packages/kilo-vscode/src/legacy-migration/sessions/lib/project.ts` (+4, -3)
- `packages/kilo-vscode/src/legacy-migration/sessions/lib/session.ts` (+2, -1)
- `packages/kilo-vscode/src/legacy-migration/sessions/parser.ts` (+6, -3)
- `packages/kilo-vscode/src/services/cli-backend/connection-service.ts` (+88, -0)
- `packages/kilo-vscode/src/services/cli-backend/i18n/index.ts` (+2, -0)
- `packages/kilo-vscode/src/services/cli-backend/i18n/uk.ts` (+4, -0)
- `packages/kilo-vscode/tests/unit/followup-session.test.ts` (+38, -0)
- `packages/kilo-vscode/tests/unit/kilo-provider-followup.test.ts` (+129, -0)
- `packages/kilo-vscode/tests/unit/kilo-provider-session-refresh.test.ts` (+2, -0)
- `packages/kilo-vscode/tests/unit/legacy-migration/messages.test.ts` (+4, -3)
- `packages/kilo-vscode/tests/unit/legacy-migration/parser.test.ts` (+2, -2)
- `packages/kilo-vscode/tests/unit/legacy-migration/path.test.ts` (+48, -0)
- `packages/kilo-vscode/tests/unit/legacy-migration/session.test.ts` (+4, -3)
- `packages/kilo-vscode/tests/unit/question-handler.test.ts` (+104, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/AgentManagerApp.tsx` (+18, -12)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/uk.ts` (+173, -0)
- `packages/kilo-vscode/webview-ui/src/context/language-utils.ts` (+16, -0)
- `packages/kilo-vscode/webview-ui/src/context/language.tsx` (+14, -1)
- `packages/kilo-vscode/webview-ui/src/context/session.tsx` (+12, -0)
- `packages/kilo-vscode/webview-ui/src/i18n/ar.ts` (+2, -1)
- `packages/kilo-vscode/webview-ui/src/i18n/br.ts` (+2, -1)
- `packages/kilo-vscode/webview-ui/src/i18n/bs.ts` (+2, -1)
- `packages/kilo-vscode/webview-ui/src/i18n/da.ts` (+2, -1)
- `packages/kilo-vscode/webview-ui/src/i18n/de.ts` (+2, -1)
- `packages/kilo-vscode/webview-ui/src/i18n/es.ts` (+2, -1)
- `packages/kilo-vscode/webview-ui/src/i18n/fr.ts` (+2, -1)
- `packages/kilo-vscode/webview-ui/src/i18n/ja.ts` (+2, -1)
- `packages/kilo-vscode/webview-ui/src/i18n/ko.ts` (+2, -1)
- `packages/kilo-vscode/webview-ui/src/i18n/no.ts` (+2, -1)
- `packages/kilo-vscode/webview-ui/src/i18n/pl.ts` (+2, -1)
- `packages/kilo-vscode/webview-ui/src/i18n/ru.ts` (+2, -1)
- `packages/kilo-vscode/webview-ui/src/i18n/th.ts` (+2, -1)
- `packages/kilo-vscode/webview-ui/src/i18n/uk.ts` (+1304, -0)
- `packages/kilo-vscode/webview-ui/src/i18n/zh.ts` (+1, -1)
- `packages/kilo-vscode/webview-ui/src/i18n/zht.ts` (+1, -1)
- `packages/kilo-vscode/webview-ui/src/types/messages.ts` (+7, -0)
- `packages/opencode/package.json` (+1, -1)
- `packages/opencode/src/kilocode/plan-followup.ts` (+29, -17)
- `packages/opencode/src/server/server.ts` (+1, -1)
- `packages/opencode/src/session/prompt.ts` (+9, -1)
- `packages/opencode/src/session/prompt/plan.txt` (+4, -7)
- `packages/opencode/test/kilocode/plan-followup.test.ts` (+62, -3)
- `packages/plugin/package.json` (+1, -1)
- `packages/script/package.json` (+1, -1)
- `packages/sdk/js/package.json` (+1, -1)
- `packages/storybook/package.json` (+1, -1)
- `packages/ui/package.json` (+1, -1)
- `packages/ui/src/i18n/uk.ts` (+153, -0)
- `packages/util/package.json` (+1, -1)
- `script/upstream/package.json` (+1, -1)
- `sdks/vscode/package.json` (+1, -1)

### Key Diffs

(no key diffs to show)

## opencode Changes (506dd75..0f48899)

### Commits

- 0f48899 - fix(node): set OPENCODE_CHANNEL during build (#20616) (Brendan Allan, 2026-04-02)
- a6f524c - chore: update nix node_modules hashes (opencode-agent[bot], 2026-04-02)
- 811c7e2 - cli: update usage exceeded error (Frank, 2026-04-02)
- ebaa99a - chore: generate (opencode-agent[bot], 2026-04-02)
- d66e6dc - feat(opencode): Add Venice AI package as dependency (#20570) (dpuyosa, 2026-04-01)
- 336d28f - fix(cli): restore colored help logo (#20592) (Kit Langton, 2026-04-02)
- 916afb5 - refactor(account): share token freshness helper (#20591) (Kit Langton, 2026-04-02)
- 5daf2fa - fix(session): compaction agent responds in same language as conversation (#20581) (Aaron Zhu, 2026-04-01)
- 733a3bd - fix(core): prevent agent loop from stopping after tool calls with OpenAI-compatible providers (#14973) (Valentin Vivaldi, 2026-04-01)
- 2e8e278 - fix(cli): use simple logo in CLI (#20585) (Kit Langton, 2026-04-02)
- 0bae38c - refactor(instruction): migrate to Effect service pattern (#20542) (Kit Langton, 2026-04-01)
- a09b086 - test(app): block real llm calls in e2e prompts (#20579) (Kit Langton, 2026-04-01)
- df1c6c9 - tui: add consent dialog when sharing for the first time (#20525) (Aiden Cline, 2026-04-02)
- 789d86f - chore: generate (opencode-agent[bot], 2026-04-02)
- e148b31 - fix(build): replace require() with dynamic import() in cross-spawn-spawner (#20580) (Kit Langton, 2026-04-01)
- 0cad775 - chore: add User-Agent headers for Cloudflare providers (#20538) (MC, 2026-04-01)
- 00d6841 - fix(account): refresh console tokens before expiry (#20558) (Kit Langton, 2026-04-02)
- 8a8f7b3 - flock npm.add (#20557) (Sebastian, 2026-04-02)
- c526caa - fix: show model display name in message footer and transcript (#20539) (Kit Langton, 2026-04-02)
- b1c0748 - refactor(revert): yield SessionSummary.Service directly (#20541) (Kit Langton, 2026-04-01)
- 92f8e03 - fix(test): use effect helper in snapshot race test (#20567) (Kit Langton, 2026-04-01)
- f6fd43e - Refactor plugin/config loading, add theme-only plugin package support (#20556) (Sebastian, 2026-04-01)
- 854484b - chore: generate (opencode-agent[bot], 2026-04-01)
- e4ff1ea - refactor(bash): use Effect ChildProcess for bash tool execution (#20496) (Kit Langton, 2026-04-01)
- 26fb6b8 - refactor: add Effect-returning versions of MessageV2 functions (#20374) (Kit Langton, 2026-04-01)
- 4214ae2 - chore: generate (opencode-agent[bot], 2026-04-01)
- d9d4f89 - fix(test): auto-acknowledge tool-result follow-ups in mock LLM server (#20528) (Kit Langton, 2026-04-01)
- 48db7cf - fix(opencode): batch snapshot revert without reordering (#20564) (Kit Langton, 2026-04-01)
- 802d165 - chore(tui): clean up scroll config follow-up (#20561) (Luke Parker, 2026-04-02)
- f7f41dc - fix(tui): apply scroll configuration uniformly across all scrollboxes (#14735) (Luke Parker, 2026-04-02)
- 1fcfb69 - feat: add new provider plugin hook for resolving models and sync models from github models endpoint (falls back to models.dev) (#20533) (Aiden Cline, 2026-04-01)
- fa96cb9 - Fix selection expansion by retaining focused input selections during global key events (#20205) (Luke Parker, 2026-04-02)
- cc30bfc - resolve subpath only packages for plugins (#20555) (Sebastian, 2026-04-01)
- 880c0a7 - fix: normalize filepath in FileTime to prevent Windows path mismatch (#20367) (Joscha Götzer, 2026-04-02)
- eabf3ca - zen: sync (Frank, 2026-04-01)
- c9326fc - refactor: replace BunProc with Npm module using @npmcli/arborist (#18308) (Dax, 2026-04-01)
- d7481f4 - wip: zen (Frank, 2026-04-01)
- f3f728e - test(app): fix isolated backend follow-ups (#20513) (Kit Langton, 2026-04-01)
- c619cae - fix(account): coalesce concurrent console token refreshes (#20503) (Kit Langton, 2026-04-01)
- c559af5 - test(app): migrate more e2e suites to isolated backend (#20505) (Kit Langton, 2026-04-01)
- d1e0a46 - Update VOUCHED list (github-actions[bot], 2026-04-01)
- f9e71ec - chore: update nix node_modules hashes (opencode-agent[bot], 2026-04-01)
- ef538c9 - chore: generate (opencode-agent[bot], 2026-04-01)
- 2f405da - refactor: use Effect services instead of async facades in provider, auth, and file (#20480) (Kit Langton, 2026-04-01)
- a9c85b7 - refactor(shell): use Effect ChildProcess for shell command execution (#20494) (Kit Langton, 2026-04-01)
- 897d83c - refactor(init): tighten AGENTS guidance (#20422) (Shoubhit Dash, 2026-04-01)
- 0a125e5 - chore: generate (opencode-agent[bot], 2026-04-01)
- 38d2276 - test(e2e): isolate prompt tests with per-worker backend (#20464) (Kit Langton, 2026-04-01)
- d58004a - fall back to first agent if last used agent is not available (Dax Raad, 2026-04-01)
- 5fd833a - refactor: standardize InstanceState variable name to state (#20267) (Kit Langton, 2026-04-01)
- 44f8301 - perf(review): defer offscreen diff mounts (#20469) (Shoubhit Dash, 2026-04-01)
- 9a1c9ae - test(app): route prompt e2e through mock llm (#20383) (Kit Langton, 2026-04-01)
- a3a6cf1 - feat(comments): support file mentions (#20447) (Shoubhit Dash, 2026-04-01)
- 47a6761 - fix(session): add keyboard support to question dock (#20439) (Shoubhit Dash, 2026-04-01)
- 1df5ad4 - app: try to hide autofill popups in prompt input (#20197) (Brendan Allan, 2026-04-01)

### Changed Files by Category

#### Tool System (packages/*/src/tool/)
- `packages/opencode/src/tool/bash.ts` (+62, -66)
- `packages/opencode/src/tool/read.ts` (+2, -2)
- `packages/opencode/src/tool/registry.ts` (+9, -9)
- `packages/opencode/test/tool/bash.test.ts` (+115, -0)

#### Agent System (packages/*/src/agent/)
- `packages/opencode/src/agent/prompt/compaction.txt` (+1, -0)

#### Permission System (**/permission/)
(no changes)

#### Event Bus (**/bus/, **/event/)
- `packages/opencode/src/bus/index.ts` (+12, -12)

#### Core (**/core/)
- `packages/console/core/src/model.ts` (+4, -1)

#### Other Changes
- `.github/VOUCHED.td` (+1, -0)
- `.github/workflows/test.yml` (+0, -3)
- `bun.lock` (+626, -469)
- `nix/hashes.json` (+4, -4)
- `package.json` (+2, -2)
- `packages/app/e2e/actions.ts` (+55, -20)
- `packages/app/e2e/backend.ts` (+136, -0)
- `packages/app/e2e/fixtures.ts` (+131, -49)
- `packages/app/e2e/models/model-picker.spec.ts` (+1, -1)
- `packages/app/e2e/projects/projects-switch.spec.ts` (+5, -2)
- `packages/app/e2e/projects/workspace-new-session.spec.ts` (+5, -2)
- `packages/app/e2e/prompt/mock.ts` (+56, -0)
- `packages/app/e2e/prompt/prompt-async.spec.ts` (+31, -26)
- `packages/app/e2e/prompt/prompt-history.spec.ts` (+123, -132)
- `packages/app/e2e/prompt/prompt-shell.spec.ts` (+3, -5)
- `packages/app/e2e/prompt/prompt-slash-share.spec.ts` (+34, -31)
- `packages/app/e2e/prompt/prompt.spec.ts` (+31, -73)
- `packages/app/e2e/session/session-child-navigation.spec.ts` (+33, -22)
- `packages/app/e2e/session/session-composer-dock.spec.ts` (+373, -232)
- `packages/app/e2e/session/session-model-persistence.spec.ts` (+8, -5)
- `packages/app/e2e/session/session-review.spec.ts` (+40, -33)
- `packages/app/e2e/session/session-undo-redo.spec.ts` (+12, -9)
- `packages/app/e2e/session/session.spec.ts` (+126, -114)
- `packages/app/e2e/utils.ts` (+7, -7)
- `packages/app/src/components/prompt-input.tsx` (+3, -0)
- `packages/app/src/components/prompt-input/build-request-parts.test.ts` (+24, -0)
- `packages/app/src/components/prompt-input/build-request-parts.ts` (+26, -0)
- `packages/app/src/pages/session.tsx` (+3, -0)
- `packages/app/src/pages/session/composer/session-question-dock.tsx` (+113, -4)
- `packages/app/src/pages/session/file-tabs.tsx` (+3, -0)
- `packages/app/src/pages/session/review-tab.tsx` (+4, -0)
- `packages/app/test/e2e/mock.test.ts` (+66, -0)
- `packages/app/test/e2e/no-real-llm.test.ts` (+27, -0)
- `packages/console/app/src/routes/zen/util/handler.ts` (+1, -0)
- `packages/opencode/package.json` (+3, -0)
- `packages/opencode/script/build-node.ts` (+2, -0)
- `packages/opencode/script/seed-e2e.ts` (+0, -15)
- `packages/opencode/specs/tui-plugins.md` (+22, -3)
- `packages/opencode/src/account/index.ts` (+35, -3)
- `packages/opencode/src/bun/index.ts` (+0, -129)
- `packages/opencode/src/bun/registry.ts` (+0, -50)
- `packages/opencode/src/cli/cmd/plug.ts` (+3, -1)
- `packages/opencode/src/cli/cmd/tui/app.tsx` (+7, -1)
- `packages/opencode/src/cli/cmd/tui/component/error-component.tsx` (+2, -1)
- `packages/opencode/src/cli/cmd/tui/component/prompt/autocomplete.tsx` (+5, -0)
- `packages/opencode/src/cli/cmd/tui/context/local.tsx` (+1, -1)
- `packages/opencode/src/cli/cmd/tui/plugin/runtime.ts` (+209, -178)
- `packages/opencode/src/cli/cmd/tui/routes/session/index.tsx` (+26, -32)
- `packages/opencode/src/cli/cmd/tui/routes/session/permission.tsx` (+3, -0)
- `packages/opencode/src/cli/cmd/tui/routes/session/sidebar.tsx` (+6, -0)
- `packages/opencode/src/cli/cmd/tui/ui/dialog-select.tsx` (+6, -0)
- `packages/opencode/src/cli/cmd/tui/util/model.ts` (+23, -0)
- `packages/opencode/src/cli/cmd/tui/util/scroll.ts` (+23, -0)
- `packages/opencode/src/cli/cmd/tui/util/transcript.ts` (+20, -6)
- `packages/opencode/src/cli/ui.ts` (+17, -0)
- `packages/opencode/src/command/index.ts` (+6, -6)
- `packages/opencode/src/command/template/initialize.txt` (+63, -7)
- `packages/opencode/src/config/config.ts` (+89, -151)
- `packages/opencode/src/config/paths.ts` (+2, -9)
- `packages/opencode/src/config/{migrate-tui-config.ts => tui-migrate.ts}` (+0, -0)
- `packages/opencode/src/config/tui.ts` (+10, -61)
- `packages/opencode/src/effect/cross-spawn-spawner.ts` (+34, -11)
- `packages/opencode/src/effect/instance-state.ts` (+4, -4)
- `packages/opencode/src/file/index.ts` (+52, -59)
- `packages/opencode/src/file/time.ts` (+5, -0)
- `packages/opencode/src/format/formatter.ts` (+3, -4)
- `packages/opencode/src/index.ts` (+24, -4)
- `packages/opencode/src/lsp/server.ts` (+49, -184)
- `packages/opencode/src/mcp/index.ts` (+10, -10)
- `packages/opencode/src/npm/index.ts` (+180, -0)
- `packages/opencode/src/plugin/{ => github-copilot}/copilot.ts` (+41, -31)
- `packages/opencode/src/plugin/github-copilot/models.ts` (+143, -0)
- `packages/opencode/src/plugin/index.ts` (+52, -93)
- `packages/opencode/src/plugin/install.ts` (+30, -8)
- `packages/opencode/src/plugin/loader.ts` (+99, -62)
- `packages/opencode/src/plugin/shared.ts` (+43, -8)
- `packages/opencode/src/provider/auth.ts` (+17, -16)
- `packages/opencode/src/provider/provider.ts` (+73, -29)
- `packages/opencode/src/pty/index.ts` (+19, -19)
- `packages/opencode/src/session/compaction.ts` (+2, -1)
- `packages/opencode/src/session/index.ts` (+4, -9)
- `packages/opencode/src/session/instruction.ts` (+216, -142)
- `packages/opencode/src/session/message-v2.ts` (+78, -77)
- `packages/opencode/src/session/processor.ts` (+8, -4)
- `packages/opencode/src/session/prompt.ts` (+67, -73)
- `packages/opencode/src/session/retry.ts` (+1, -1)
- `packages/opencode/src/session/revert.ts` (+3, -1)
- `packages/opencode/src/snapshot/index.ts` (+97, -11)
- `packages/opencode/src/util/filesystem.ts` (+29, -4)
- `packages/opencode/test/account/service.test.ts` (+114, -3)
- `packages/opencode/test/bun.test.ts` (+0, -137)
- `packages/opencode/test/cli/tui/plugin-add.test.ts` (+47, -1)
- `packages/opencode/test/cli/tui/plugin-install.test.ts` (+1, -1)
- `packages/opencode/test/cli/tui/plugin-loader-entrypoint.test.ts` (+23, -23)
- `packages/opencode/test/cli/tui/plugin-loader-pure.test.ts` (+2, -2)
- `packages/opencode/test/cli/tui/plugin-loader.test.ts` (+3, -3)
- `packages/opencode/test/cli/tui/plugin-toggle.test.ts` (+4, -4)
- `packages/opencode/test/cli/tui/transcript.test.ts` (+109, -5)
- `packages/opencode/test/config/config.test.ts` (+86, -37)
- `packages/opencode/test/config/tui.test.ts` (+90, -11)
- `packages/opencode/test/file/time.test.ts` (+91, -0)
- `packages/opencode/test/fixture/tui-runtime.ts` (+3, -3)
- `packages/opencode/test/lib/llm-server.ts` (+381, -31)
- `packages/opencode/test/plugin/github-copilot-models.test.ts` (+117, -0)
- `packages/opencode/test/plugin/install.test.ts` (+39, -0)
- `packages/opencode/test/plugin/loader-shared.test.ts` (+317, -17)
- `packages/opencode/test/session/instruction.test.ts` (+129, -13)
- `packages/opencode/test/session/messages-pagination.test.ts` (+782, -12)
- `packages/opencode/test/session/processor-effect.test.ts` (+8, -8)
- `packages/opencode/test/session/prompt-effect.test.ts` (+109, -4)
- `packages/opencode/test/session/snapshot-tool-race.test.ts` (+234, -0)
- `packages/opencode/test/snapshot/snapshot.test.ts` (+77, -0)
- `packages/opencode/test/util/filesystem.test.ts` (+89, -0)
- `packages/plugin/src/index.ts` (+11, -0)
- `packages/ui/src/components/dock-prompt.tsx` (+2, -1)
- `packages/ui/src/components/line-comment-annotations.tsx` (+7, -1)
- `packages/ui/src/components/line-comment-styles.ts` (+52, -0)
- `packages/ui/src/components/line-comment.tsx` (+136, -1)
- `packages/ui/src/components/session-review.tsx` (+99, -9)
- `packages/web/src/content/docs/rules.mdx` (+10, -2)
- `packages/web/src/content/docs/tui.mdx` (+1, -1)

### Key Diffs

#### packages/console/core/src/model.ts
```diff
diff --git a/packages/console/core/src/model.ts b/packages/console/core/src/model.ts
index 0050f1c..191fdf1 100644
--- a/packages/console/core/src/model.ts
+++ b/packages/console/core/src/model.ts
@@ -54,7 +54,10 @@ export namespace ZenData {
 
   const ModelsSchema = z.object({
     models: z.record(z.string(), z.union([ModelSchema, z.array(ModelSchema.extend({ formatFilter: FormatSchema }))])),
-    liteModels: z.record(z.string(), ModelSchema),
+    liteModels: z.record(
+      z.string(),
+      z.union([ModelSchema, z.array(ModelSchema.extend({ formatFilter: FormatSchema }))]),
+    ),
     providers: z.record(z.string(), ProviderSchema),
   })
 
```

#### packages/opencode/src/agent/prompt/compaction.txt
```diff
diff --git a/packages/opencode/src/agent/prompt/compaction.txt b/packages/opencode/src/agent/prompt/compaction.txt
index 3308627..11deccb 100644
--- a/packages/opencode/src/agent/prompt/compaction.txt
+++ b/packages/opencode/src/agent/prompt/compaction.txt
@@ -12,3 +12,4 @@ Focus on information that would be helpful for continuing the conversation, incl
 Your summary should be comprehensive enough to provide context but concise enough to be quickly understood.
 
 Do not respond to any questions in the conversation, only output the summary.
+Respond in the same language the user used in the conversation.
```

#### packages/opencode/src/bus/index.ts
```diff
diff --git a/packages/opencode/src/bus/index.ts b/packages/opencode/src/bus/index.ts
index 2a84192..fe26a66 100644
--- a/packages/opencode/src/bus/index.ts
+++ b/packages/opencode/src/bus/index.ts
@@ -46,7 +46,7 @@ export namespace Bus {
   export const layer = Layer.effect(
     Service,
     Effect.gen(function* () {
-      const cache = yield* InstanceState.make<State>(
+      const state = yield* InstanceState.make<State>(
         Effect.fn("Bus.state")(function* (ctx) {
           const wildcard = yield* PubSub.unbounded<Payload>()
           const typed = new Map<string, PubSub.PubSub<Payload>>()
@@ -82,13 +82,13 @@ export namespace Bus {
 
       function publish<D extends BusEvent.Definition>(def: D, properties: z.output<D["properties"]>) {
         return Effect.gen(function* () {
-          const state = yield* InstanceState.get(cache)
+          const s = yield* InstanceState.get(state)
           const payload: Payload = { type: def.type, properties }
           log.info("publishing", { type: def.type })
 
-          const ps = state.typed.get(def.type)
+          const ps = s.typed.get(def.type)
           if (ps) yield* PubSub.publish(ps, payload)
-          yield* PubSub.publish(state.wildcard, payload)
+          yield* PubSub.publish(s.wildcard, payload)
 
           const dir = yield* InstanceState.directory
           GlobalBus.emit("event", {
@@ -102,8 +102,8 @@ export namespace Bus {
         log.info("subscribing", { type: def.type })
         return Stream.unwrap(
           Effect.gen(function* () {
-            const state = yield* InstanceState.get(cache)
-            const ps = yield* getOrCreate(state, def)
+            const s = yield* InstanceState.get(state)
+            const ps = yield* getOrCreate(s, def)
             return Stream.fromPubSub(ps)
           }),
         ).pipe(Stream.ensuring(Effect.sync(() => log.info("unsubscribing", { type: def.type }))))
@@ -113,8 +113,8 @@ export namespace Bus {
         log.info("subscribing", { type: "*" })
         return Stream.unwrap(
           Effect.gen(function* () {
-            const state = yield* InstanceState.get(cache)
-            return Stream.fromPubSub(state.wildcard)
+            const s = yield* InstanceState.get(state)
+            return Stream.fromPubSub(s.wildcard)
           }),
```

#### packages/opencode/src/tool/bash.ts
```diff
diff --git a/packages/opencode/src/tool/bash.ts b/packages/opencode/src/tool/bash.ts
index 50aa9e1..e50f09c 100644
--- a/packages/opencode/src/tool/bash.ts
+++ b/packages/opencode/src/tool/bash.ts
@@ -1,6 +1,5 @@
 import z from "zod"
 import os from "os"
-import { spawn } from "child_process"
 import { Tool } from "./tool"
 import path from "path"
 import DESCRIPTION from "./bash.txt"
@@ -18,6 +17,9 @@ import { Shell } from "@/shell/shell"
 import { BashArity } from "@/permission/arity"
 import { Truncate } from "./truncate"
 import { Plugin } from "@/plugin"
+import { Cause, Effect, Exit, Stream } from "effect"
+import { ChildProcess, ChildProcessSpawner } from "effect/unstable/process"
+import * as CrossSpawnSpawner from "@/effect/cross-spawn-spawner"
 
 const MAX_METADATA_LENGTH = 30_000
 const DEFAULT_TIMEOUT = Flag.OPENCODE_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS || 2 * 60 * 1000
@@ -293,24 +295,22 @@ async function shellEnv(ctx: Tool.Context, cwd: string) {
   }
 }
 
-function launch(shell: string, name: string, command: string, cwd: string, env: NodeJS.ProcessEnv) {
+function cmd(shell: string, name: string, command: string, cwd: string, env: NodeJS.ProcessEnv) {
   if (process.platform === "win32" && PS.has(name)) {
-    return spawn(shell, ["-NoLogo", "-NoProfile", "-NonInteractive", "-Command", command], {
+    return ChildProcess.make(shell, ["-NoLogo", "-NoProfile", "-NonInteractive", "-Command", command], {
       cwd,
       env,
-      stdio: ["ignore", "pipe", "pipe"],
+      stdin: "ignore",
       detached: false,
-      windowsHide: true,
     })
   }
 
-  return spawn(command, {
+  return ChildProcess.make(command, [], {
     shell,
     cwd,
     env,
-    stdio: ["ignore", "pipe", "pipe"],
+    stdin: "ignore",
     detached: process.platform !== "win32",
-    windowsHide: process.platform === "win32",
   })
 }
```

#### packages/opencode/src/tool/read.ts
```diff
diff --git a/packages/opencode/src/tool/read.ts b/packages/opencode/src/tool/read.ts
index e5509fd..18520c2 100644
--- a/packages/opencode/src/tool/read.ts
+++ b/packages/opencode/src/tool/read.ts
@@ -9,7 +9,7 @@ import { FileTime } from "../file/time"
 import DESCRIPTION from "./read.txt"
 import { Instance } from "../project/instance"
 import { assertExternalDirectory } from "./external-directory"
-import { InstructionPrompt } from "../session/instruction"
+import { Instruction } from "../session/instruction"
 import { Filesystem } from "../util/filesystem"
 
 const DEFAULT_READ_LIMIT = 2000
@@ -118,7 +118,7 @@ export const ReadTool = Tool.define("read", {
       }
     }
 
-    const instructions = await InstructionPrompt.resolve(ctx.messages, filepath, ctx.messageID)
+    const instructions = await Instruction.resolve(ctx.messages, filepath, ctx.messageID)
 
     // Exclude SVG (XML-based) and vnd.fastbidsheet (.fbs extension, commonly FlatBuffers schema files)
     const mime = Filesystem.mimeType(filepath)
```


*... and more files (showing first 5)*

## Recommendations

Based on the changes, the following files in Alexi should be reviewed:

- `src/agent/index.ts` - incorporate patterns from opencode packages/opencode/src/agent/prompt/compaction.txt
- `src/tool/bash.test.ts` - update based on opencode packages/opencode/test/tool/bash.test.ts changes
- `src/tool/bash.ts` - update based on opencode packages/opencode/src/tool/bash.ts changes
- `src/tool/read.ts` - update based on opencode packages/opencode/src/tool/read.ts changes
- `src/tool/registry.ts` - update based on opencode packages/opencode/src/tool/registry.ts changes
