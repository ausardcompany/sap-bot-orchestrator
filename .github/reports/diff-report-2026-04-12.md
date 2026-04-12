# Upstream Changes Report
Generated: 2026-04-12 07:16:27

## Summary
- kilocode: 113 commits, 419 files changed
- opencode: 27 commits, 89 files changed

## kilocode Changes (6fc863f4e..7ea50aac1)

### Commits

- 7ea50aac1 - OpenCode v1.3.3 (#8790) (Johnny Eric Amancio, 2026-04-12)
- e77b4ac6e - Merge pull request #8776 from Kilo-Org/emilieschario-patch-1 (Emilie Lima Schario, 2026-04-11)
- c0a67b812 - OpenCode v1.3.2 (#8780) (Catriel Müller, 2026-04-11)
- f24251d05 - chore: update nix node_modules hashes (kilo-maintainer[bot], 2026-04-11)
- fe1a49270 - Merge pull request #8778 from Kilo-Org/catrielmuller/kilo-opencode-v1.3.1 (Catriel Müller, 2026-04-11)
- 781cb368c - fix: fix mononerd fonts (Catriel Müller, 2026-04-11)
- 731b5967e - fix: vscode prettier (Catriel Müller, 2026-04-11)
- 54c25a6d4 - refactor: perserve extension action (Catriel Müller, 2026-04-11)
- d54e1a890 - refactor: format (Catriel Müller, 2026-04-11)
- 1cb144212 - fix: main package name (Catriel Müller, 2026-04-11)
- 3c7b07bc2 - refactor: update flake (Catriel Müller, 2026-04-11)
- 61fa5e617 - refactor: fix typechecks (Catriel Müller, 2026-04-11)
- f23e2818b - refactor: wip (Catriel Müller, 2026-04-11)
- 6dcd87bf0 - Update packages/kilo-docs/pages/kiloclaw/chat-platforms/slack.md (Emilie Lima Schario, 2026-04-11)
- d9b2fc7ff - resolve merge conflicts (Catriel Müller, 2026-04-11)
- 498eae16a - Add Slack pairing fyi to docs (Emilie Lima Schario, 2026-04-11)
- 92468913f - chore: update nix node_modules hashes (kilo-maintainer[bot], 2026-04-11)
- 47a2dd0c4 - refactor: kilo compat for v1.3.1 (Catriel Müller, 2026-04-11)
- 7393bceb8 - Merge pull request #8772 from Kilo-Org/johnnyamancio/kilo-opencode-v1.3.0 (Catriel Müller, 2026-04-11)
- fd22b4370 - refactor: fix version (Catriel Müller, 2026-04-11)
- 0fffab9b8 - Merge pull request #8767 from Kilo-Org/catrielmuller/fix-upstream-merge-checkout-icons (Catriel Müller, 2026-04-11)
- b35dd146d - chore: Update server and add markers to missing parts (Johnny Amancio, 2026-04-11)
- ceb4348df - chore: Remove merge report and add to .gitignore (Johnny Amancio, 2026-04-11)
- 1e0a813c0 - fix: Rename opencode -> kilo that was missing (Johnny Amancio, 2026-04-11)
- 497076468 - chore: Regenerate sdk and types (Johnny Amancio, 2026-04-11)
- 49cb356d2 - refactor: fix type errors after v1.3.0 merge (Johnny Amancio, 2026-04-11)
- b1811147e - merge: upstream v1.3.0 (Johnny Amancio, 2026-04-11)
- 83fd7f6cc - fix: ui merge icons (Catriel Müller, 2026-04-10)
- ec64ceabe - release: v1.3.1 (opencode, 2026-03-24)
- 56644be95 - fix(core): restore SIGHUP exit handler (#16057) (#18527) (Dax, 2026-03-24)
- 00d3b831f - feat: add Poe OAuth auth plugin (#18477) (Kamil Jopek, 2026-03-24)
- b848b7eba - fix(app): session timeline jumping on scroll (#18993) (Adam, 2026-03-24)
- e837dcc1c - chore: generate (opencode-agent[bot], 2026-03-24)
- 024979f3f - feat(bedrock): Add token caching for any amazon-bedrock provider (#18959) (Nicholas Hansen, 2026-03-24)
- bc608fb08 - chore: update nix node_modules hashes (opencode-agent[bot], 2026-03-24)
- 9838f56a6 - fix(app): sidebar ux (Adam, 2026-03-24)
- 98b3340ce - fix(app): more startup efficiency (#18985) (Adam, 2026-03-24)
- 5e684c6e8 - chore: effectify agent.ts (#18971) (Aiden Cline, 2026-03-24)
- 2c1d8a90d - fix: nix hash update parsing... again (#18989) (Caleb Norton, 2026-03-24)
- 8994cbfc0 - chore: generate (opencode-agent[bot], 2026-03-24)
- 42a773481 - fix(app): sidebar truncation (Adam, 2026-03-24)
- 539b01f20 - effectify Project service (#18808) (Kit Langton, 2026-03-24)
- 814a515a8 - fix: improve plugin system robustness — agent/command resolution, async errors, hook timing, two-phase init (#18280) (Ryan Skidmore, 2026-03-24)
- 235a82aea - chore: update flake.lock (#18976) (Caleb Norton, 2026-03-24)
- 9330bc533 - fix: route GitLab Duo Workflow system prompt via flowConfig (#18928) (Vladimir Glafirov, 2026-03-24)
- 1238d1f61 - fix: nix hash update parsing (#18979) (Caleb Norton, 2026-03-24)
- 1d3232b38 - chore: generate (opencode-agent[bot], 2026-03-24)
- 5c1bb5de8 - fix: remove flaky cross-spawn spawner tests (#18977) (Kit Langton, 2026-03-24)
- 7c5ed771c - fix: update Feishu community links for zh locales (#18975) (Jack, 2026-03-25)
- 31c4a4fb4 - chore: update nix node_modules hashes (opencode-agent[bot], 2026-03-24)
- 037077285 - fix: better nix hash detection (#18957) (Caleb Norton, 2026-03-24)
- 41c77ccb3 - fix: restore cross-spawn behavior for effect child processes (#18798) (Kit Langton, 2026-03-24)
- 546748a46 - fix(app): startup efficiency (#18854) (Adam, 2026-03-24)
- c9c93eac0 - fix(ui): eliminate N+1 reactive subscriptions in SessionTurn (#18924) (Burak Yigit Kaya, 2026-03-24)
- 3f1a4abe6 - fix(app): use optional chaining for model.current() in ProviderIcon (#18927) (Burak Yigit Kaya, 2026-03-24)
- 431e0586a - fix(app): filter non-renderable part types from browser store (#18926) (Burak Yigit Kaya, 2026-03-24)
- fde201c28 - fix(app): stop terminal autofocus on shortcuts (#18931) (Shoubhit Dash, 2026-03-24)
- d3debc191 - manually lock/unlock theme mode (#18905) (Sebastian, 2026-03-24)
- 34f43fff8 - sync (Frank, 2026-03-24)
- 49623aa51 - chore: update nix node_modules hashes (opencode-agent[bot], 2026-03-24)
- f1340472e - chore: bump gitlab-ai-provider to 5.3.1 for GPT-5.4 model support (#18849) (Vladimir Glafirov, 2026-03-23)
- a8b28826a - wip: zen (Frank, 2026-03-23)
- a03a2b6ea - Zen: adjust cache tokens (Frank, 2026-03-23)
- ad78b79b8 - use renderer theme mode to switch dark/light mode (#18851) (Sebastian, 2026-03-24)
- 9a006d870 - chore: generate (opencode-agent[bot], 2026-03-23)
- 3a0bf2f39 - fix console account URL handling (#18809) (Kit Langton, 2026-03-23)
- b55697963 - ci: fix (Frank, 2026-03-23)
- 691644eee - tweak: add back setting user agent in requests (#18795) (Aiden Cline, 2026-03-23)
- 4aebaaf06 - feat(tui): add syntax highlighting for kotlin, hcl, lua, toml (#18198) (Abhishek Keshri, 2026-03-23)
- 77b3b4678 - tui: keep file tree open at its minimum resized width (#18777) (David Hill, 2026-03-23)
- 36dfe1646 - fix(app): only navigate prompt history when input is empty (#18775) (Brendan Allan, 2026-03-23)
- 6926dc26d - chore: update nix node_modules hashes (opencode-agent[bot], 2026-03-23)
- eb74e4a6d - chore: update nix node_modules hashes (opencode-agent[bot], 2026-03-23)
- 85d8e143b - chore: generate (opencode-agent[bot], 2026-03-23)
- 8e1b53b32 - fix(app): handle session busy state better (#18758) (Brendan Allan, 2026-03-23)
- 0a7dfc03e - fix(app): lift up project hover state to layout (#18732) (Brendan Allan, 2026-03-23)
- 4c27e7fc6 - electron: more robust sidecar kill handling (#18742) (Brendan Allan, 2026-03-23)
- 0f5626d2e - fix(app): prefer cmd+k for command palette (#18731) (Shoubhit Dash, 2026-03-23)
- 5ea95451d - fix(app): prevent stale session hover preview on refocus (#18727) (Shoubhit Dash, 2026-03-23)
- 9239d877b - fix(app): batch multi-file prompt attachments (#18722) (Shoubhit Dash, 2026-03-23)
- fc68c2443 - Update VOUCHED list (github-actions[bot], 2026-03-23)
- db9619dad - Add 'write' role to vouch manage action (#18718) (Luke Parker, 2026-03-23)
- 84d9b3887 - fix(core): fix file watcher test (#18698) (James Long, 2026-03-23)
- 8035c3435 - chore: update nix node_modules hashes (opencode-agent[bot], 2026-03-23)
- 71e7603d7 - Upgrade opentui to 0.1.90 (#18551) (Sebastian, 2026-03-23)
- 40e49c5b4 - tui: keep patch tool counts visible with long filenames (#18678) (David Hill, 2026-03-23)
- afe9b9727 - fix(app): restore keyboard project switching in open sidebar (#18682) (Luke Parker, 2026-03-23)
- 3b3549902 - chore: update nix node_modules hashes (opencode-agent[bot], 2026-03-23)
- e9a9c75c1 - tweak(ui): fix padding bottom on the context tab (#18680) (David Hill, 2026-03-23)
- 2b171828b - tui: prevent project avatar popover flicker when switching projects (#18660) (David Hill, 2026-03-23)
- 8dd817023 - chore: bump Bun to 1.3.11 (#18144) (Luke Parker, 2026-03-23)
- 0d6c60136 - changelog slash command (Dax Raad, 2026-03-22)
- 5460bf998 - chore: generate (opencode-agent[bot], 2026-03-22)
- eb3bfffad - release: v1.3.0 (opencode, 2026-03-22)
- e2d03ce38 - feat: interactive update flow for non-patch releases (#18662) (Dax, 2026-03-22)
- 32f9dc638 - fix(ui): stop auto close of sidebar on resize (#18647) (David Hill, 2026-03-23)
- c529529f8 - fix(app): terminal rename from context menu (#18263) (Filip, 2026-03-22)
- 13bac9c91 - effectify Pty service (#18572) (Kit Langton, 2026-03-22)
- fe53af481 - effectify ToolRegistry service (#18571) (Kit Langton, 2026-03-22)
- e82c5a9a2 - chore: generate (opencode-agent[bot], 2026-03-22)
- 3236f228f - effectify Plugin service (#18570) (Kit Langton, 2026-03-22)
- 0e0e7a4a4 - effectify Command service (#18568) (Kit Langton, 2026-03-22)
- 10a3d6c54 - effectify SessionStatus service (#18565) (Kit Langton, 2026-03-21)
- 832b8e252 - chore: update nix node_modules hashes (opencode-agent[bot], 2026-03-21)
- 040f551c5 - Upgrade opentui to 0.1.88 (#18079) (Sebastian, 2026-03-21)
- cc818f803 - fix(provider): only set thinkingConfig for models with reasoning capability (#18283) (Protocol Zero, 2026-03-21)
- d5337b41f - chore: update nix node_modules hashes (opencode-agent[bot], 2026-03-21)
- 9f7a76d6c - chore: generate (opencode-agent[bot], 2026-03-21)
- 6a16db4b9 - app: manage mutation loading states with tanstack query (#18501) (Brendan Allan, 2026-03-21)
- 9ad6588f3 - app: allow navigating projects with keybinds (#18502) (Brendan Allan, 2026-03-21)
- fb6bf0b35 - chore: generate (opencode-agent[bot], 2026-03-21)
- f80343b87 - fix annotation (Dax Raad, 2026-03-21)
- 9b805e1cc - wip: zen (Frank, 2026-03-21)

### Changed Files by Category

#### Tool System (packages/*/src/tool/)
- `.opencode/tool/github-pr-search.ts` (+10, -2)
- `.opencode/tool/github-pr-search.txt` (+0, -10)
- `.opencode/tool/github-triage.ts` (+20, -3)
- `.opencode/tool/github-triage.txt` (+0, -6)
- `packages/opencode/src/tool/apply_patch.ts` (+3, -3)
- `packages/opencode/src/tool/bash.ts` (+1, -1)
- `packages/opencode/src/tool/edit.ts` (+7, -8)
- `packages/opencode/src/tool/read.ts` (+1, -1)
- `packages/opencode/src/tool/registry.ts` (+175, -128)
- `packages/opencode/src/tool/task.ts` (+27, -5)
- `packages/opencode/src/tool/todo.ts` (+1, -23)
- `packages/opencode/src/tool/todoread.txt` (+0, -14)
- `packages/opencode/src/tool/tool.ts` (+3, -3)
- `packages/opencode/src/tool/truncate.ts` (+143, -0)
- `packages/opencode/src/tool/truncation-dir.ts` (+4, -0)
- `packages/opencode/src/tool/truncation.ts` (+0, -108)
- `packages/opencode/src/tool/write.ts` (+4, -4)
- `packages/opencode/test/tool/bash.test.ts` (+22, -22)
- `packages/opencode/test/tool/edit.test.ts` (+25, -24)
- `packages/opencode/test/tool/external-directory.test.ts` (+6, -6)
- `packages/opencode/test/tool/fixtures/models-api.json` (+1, -1)
- `packages/opencode/test/tool/read.test.ts` (+17, -13)
- `packages/opencode/test/tool/registry.test.ts` (+5, -1)
- `packages/opencode/test/tool/skill.test.ts` (+107, -3)
- `packages/opencode/test/tool/task.test.ts` (+49, -0)
- `packages/opencode/test/tool/truncation.test.ts` (+30, -29)
- `packages/opencode/test/tool/write.test.ts` (+8, -4)

#### Agent System (packages/*/src/agent/)
- `packages/opencode/src/agent/agent.ts` (+350, -585)
- `packages/opencode/src/kilocode/agent/index.ts` (+449, -0)
- `packages/opencode/test/agent/agent.test.ts` (+60, -30)

#### Permission System (**/permission/)
- `packages/opencode/src/kilocode/permission/drain.ts` (+13, -17)
- `packages/opencode/src/kilocode/permission/routes.ts` (+6, -6)
- `packages/opencode/src/permission/evaluate.ts` (+15, -0)
- `packages/opencode/src/permission/index.ts` (+516, -0)
- `packages/opencode/src/permission/next.ts` (+0, -123)
- `packages/opencode/src/permission/service.ts` (+0, -445)
- `packages/opencode/test/kilocode/permission/next.always-rules.test.ts` (+77, -77)
- `packages/opencode/test/permission/next.test.ts` (+261, -151)
- `packages/opencode/test/permission/next.toConfig.test.ts` (+17, -17)

#### Event Bus (**/bus/, **/event/)
- `packages/opencode/src/bus/bus-event.ts` (+0, -3)
- `packages/opencode/src/bus/index.ts` (+154, -75)
- `packages/opencode/test/bus/bus-effect.test.ts` (+164, -0)
- `packages/opencode/test/bus/bus-integration.test.ts` (+87, -0)
- `packages/opencode/test/bus/bus.test.ts` (+219, -0)

#### Core (**/core/)
(no changes)

#### Other Changes
- `.github/actions/setup-bun/action.yml` (+9, -1)
- `.github/workflows/close-issues.yml` (+24, -0)
- `.github/workflows/nix-hashes.yml` (+1, -1)
- `.github/workflows/stale-issues.yml` (+0, -34)
- `.github/workflows/test.yml` (+21, -5)
- `.gitignore` (+1, -1)
- `.opencode/.gitignore` (+5, -3)
- `.opencode/command/changelog.md` (+21, -0)
- `bun.lock` (+437, -598)
- `flake.lock` (+3, -3)
- `flake.nix` (+1, -1)
- `nix/hashes.json` (+4, -4)
- `package.json` (+13, -7)
- `packages/app/e2e/AGENTS.md` (+10, -0)
- `packages/app/e2e/actions.ts` (+242, -9)
- `packages/app/e2e/app/home.spec.ts` (+3, -0)
- `packages/app/e2e/app/palette.spec.ts` (+10, -1)
- `packages/app/e2e/fixtures.ts` (+42, -5)
- `packages/app/e2e/projects/projects-switch.spec.ts` (+18, -45)
- `packages/app/e2e/projects/workspace-new-session.spec.ts` (+50, -65)
- `packages/app/e2e/projects/workspaces.spec.ts` (+16, -14)
- `packages/app/e2e/prompt/prompt-history.spec.ts` (+5, -2)
- `packages/app/e2e/prompt/prompt-multiline.spec.ts` (+12, -6)
- `packages/app/e2e/prompt/prompt-slash-terminal.spec.ts` (+4, -21)
- `packages/app/e2e/session/session-model-persistence.spec.ts` (+38, -30)
- `packages/app/e2e/session/session-review.spec.ts` (+209, -0)
- `packages/app/e2e/settings/settings-keybinds.spec.ts` (+3, -3)
- `packages/app/e2e/sidebar/sidebar-popover-actions.spec.ts` (+80, -1)
- `packages/app/e2e/terminal/terminal-init.spec.ts` (+2, -2)
- `packages/app/e2e/terminal/terminal-tabs.spec.ts` (+37, -1)
- `packages/app/package.json` (+3, -1)
- `packages/app/src/app.tsx` (+48, -35)
- `packages/app/src/components/debug-bar.tsx` (+2, -6)
- `packages/app/src/components/dialog-connect-provider.tsx` (+172, -29)
- `packages/app/src/components/dialog-custom-provider-form.ts` (+0, -1)
- `packages/app/src/components/dialog-custom-provider.test.ts` (+0, -2)
- `packages/app/src/components/dialog-custom-provider.tsx` (+42, -35)
- `packages/app/src/components/dialog-edit-project.tsx` (+29, -30)
- `packages/app/src/components/dialog-select-mcp.tsx` (+17, -13)
- `packages/app/src/components/dialog-select-server.tsx` (+86, -89)
- `packages/app/src/components/prompt-input.tsx` (+56, -26)
- `packages/app/src/components/prompt-input/attachments.ts` (+21, -17)
- `packages/app/src/components/prompt-input/build-request-parts.test.ts` (+26, -0)
- `packages/app/src/components/prompt-input/files.ts` (+3, -56)
- `packages/app/src/components/prompt-input/history.test.ts` (+5, -2)
- `packages/app/src/components/prompt-input/history.ts` (+1, -1)
- `packages/app/src/components/session/session-context-tab.tsx` (+2, -2)
- `packages/app/src/components/session/session-header.tsx` (+2, -3)
- `packages/app/src/components/session/session-sortable-terminal-tab.tsx` (+8, -1)
- `packages/app/src/components/settings-general.tsx` (+38, -12)
- `packages/app/src/components/status-popover.tsx` (+47, -36)
- `packages/app/src/components/terminal.tsx` (+24, -18)
- `packages/app/src/components/titlebar.tsx` (+34, -31)
- `packages/app/src/constants/file-picker.ts` (+89, -0)
- `packages/app/src/context/command-keybind.test.ts` (+26, -0)
- `packages/app/src/context/command.tsx` (+19, -15)
- `packages/app/src/context/global-sync.tsx` (+29, -30)
- `packages/app/src/context/global-sync/bootstrap.ts` (+207, -132)
- `packages/app/src/context/global-sync/child-store.ts` (+10, -0)
- `packages/app/src/context/global-sync/event-reducer.ts` (+3, -0)
- `packages/app/src/context/global-sync/utils.test.ts` (+35, -0)
- `packages/app/src/context/global-sync/utils.ts` (+15, -1)
- `packages/app/src/context/language.tsx` (+68, -100)
- `packages/app/src/context/local.tsx` (+3, -2)
- `packages/app/src/context/notification.tsx` (+3, -3)
- `packages/app/src/context/platform.tsx` (+1, -1)
- `packages/app/src/context/prompt.tsx` (+11, -7)
- `packages/app/src/context/settings.tsx` (+12, -1)
- `packages/app/src/context/sync.tsx` (+8, -4)
- `packages/app/src/context/terminal-title.ts` (+12, -39)
- `packages/app/src/context/terminal.tsx` (+73, -49)
- `packages/app/src/entry.tsx` (+1, -14)
- `packages/app/src/hooks/use-providers.ts` (+1, -1)
- `packages/app/src/i18n/ar.ts` (+1, -2)
- `packages/app/src/i18n/br.ts` (+1, -2)
- `packages/app/src/i18n/bs.ts` (+1, -2)
- `packages/app/src/i18n/da.ts` (+1, -2)
- `packages/app/src/i18n/de.ts` (+1, -2)
- `packages/app/src/i18n/en.ts` (+6, -3)
- `packages/app/src/i18n/es.ts` (+1, -2)
- `packages/app/src/i18n/fr.ts` (+1, -2)
- `packages/app/src/i18n/ja.ts` (+1, -2)
- `packages/app/src/i18n/ko.ts` (+1, -2)
- `packages/app/src/i18n/no.ts` (+1, -2)
- `packages/app/src/i18n/pl.ts` (+1, -2)
- `packages/app/src/i18n/ru.ts` (+1, -2)
- `packages/app/src/i18n/th.ts` (+1, -2)
- `packages/app/src/i18n/tr.ts` (+1, -2)
- `packages/app/src/i18n/zh.ts` (+1, -2)
- `packages/app/src/i18n/zht.ts` (+1, -2)
- `packages/app/src/index.ts` (+2, -0)
- `packages/app/src/pages/directory-layout.tsx` (+35, -52)
- `packages/app/src/pages/error.tsx` (+9, -1)
- `packages/app/src/pages/home.tsx` (+8, -0)
- `packages/app/src/pages/layout.tsx` (+236, -127)
- `packages/app/src/pages/layout/helpers.test.ts` (+3, -3)
- `packages/app/src/pages/layout/helpers.ts` (+20, -14)
- `packages/app/src/pages/layout/sidebar-items.tsx` (+129, -113)
- `packages/app/src/pages/layout/sidebar-project.tsx` (+17, -28)
- `packages/app/src/pages/layout/sidebar-workspace.tsx` (+9, -7)
- `packages/app/src/pages/session.tsx` (+151, -131)
- `packages/app/src/pages/session/composer/session-question-dock.tsx` (+44, -40)
- `packages/app/src/pages/session/file-tabs.tsx` (+0, -12)
- `packages/app/src/pages/session/helpers.test.ts` (+21, -0)
- `packages/app/src/pages/session/helpers.ts` (+7, -0)
- `packages/app/src/pages/session/message-timeline.tsx` (+91, -103)
- `packages/app/src/pages/session/session-side-panel.tsx` (+0, -2)
- `packages/app/src/pages/session/terminal-panel.tsx` (+26, -16)
- `packages/app/src/pages/session/use-session-commands.tsx` (+3, -3)
- `packages/app/src/pages/session/use-session-hash-scroll.ts` (+18, -0)
- `packages/app/src/testing/prompt.ts` (+56, -0)
- `packages/app/src/testing/terminal.ts` (+15, -0)
- `packages/app/src/utils/persist.ts` (+14, -2)
- `packages/app/src/utils/prompt.test.ts` (+44, -0)
- `packages/app/src/utils/server-health.ts` (+23, -1)
- `packages/app/src/utils/server.ts` (+1, -1)
- `packages/app/src/utils/sound.ts` (+81, -96)
- `packages/app/vite.js` (+12, -0)
- `packages/containers/bun-node/Dockerfile` (+1, -1)
- `packages/desktop-electron/package.json` (+1, -1)
- `packages/desktop-electron/src/main/cli.ts` (+2, -1)
- `packages/desktop-electron/src/main/index.ts` (+19, -1)
- `packages/desktop-electron/src/main/ipc.ts` (+11, -2)
- `packages/desktop-electron/src/main/store.ts` (+1, -1)
- `packages/desktop-electron/src/preload/types.ts` (+2, -0)
- `packages/desktop-electron/src/renderer/index.tsx` (+23, -5)
- `packages/desktop-electron/src/renderer/updater.ts` (+1, -1)
- `packages/desktop/src/i18n/de.ts` (+2, -1)
- `packages/desktop/src/index.tsx` (+20, -2)
- `packages/extensions/zed/extension.toml` (+6, -6)
- `packages/kilo-docs/components/ThemeToggle.tsx` (+3, -1)
- `packages/kilo-docs/components/TopNav.tsx` (+2, -2)
- `packages/kilo-docs/markdoc/partials/cli-commands-table.md` (+24, -24)
- `packages/kilo-docs/markdoc/tags/index.ts` (+0, -1)
- `packages/kilo-docs/pages/ai-providers/lmstudio.md` (+1, -1)
- `packages/kilo-docs/pages/code-with-ai/agents/auto-model.md` (+1, -2)
- `packages/kilo-docs/pages/kiloclaw/chat-platforms/slack.md` (+1, -1)
- `packages/kilo-docs/pages/kiloclaw/faq/general.md` (+1, -1)
- `packages/kilo-docs/pages/kiloclaw/triggers/index.md` (+4, -4)
- `packages/kilo-docs/pages/kiloclaw/triggers/scheduled.md` (+9, -9)
- `packages/kilo-docs/pages/kiloclaw/triggers/webhooks.md` (+8, -8)
- `packages/kilo-docs/source-links.md` (+366, -1)
- `packages/kilo-vscode/docs/opencode-migration-plan.md` (+1, -1)
- `packages/opencode/git` (+0, -0)
- `packages/opencode/migration/20260323234822_events/migration.sql` (+13, -0)
- `packages/opencode/migration/20260323234822_events/snapshot.json` (+1271, -0)
- `packages/opencode/package.json` (+30, -16)
- `packages/opencode/parsers-config.ts` (+36, -0)
- `packages/opencode/script/build-node.ts` (+54, -0)
- `packages/opencode/script/build.ts` (+44, -4)
- `packages/opencode/script/seed-e2e.ts` (+37, -33)
- `packages/opencode/specs/effect-migration.md` (+190, -0)
- `packages/opencode/src/account/index.ts` (+376, -20)
- `packages/opencode/src/account/repo.ts` (+9, -6)
- `packages/opencode/src/account/schema.ts` (+1, -1)
- `packages/opencode/src/account/service.ts` (+0, -359)
- `packages/opencode/src/acp/agent.ts` (+1, -1)
- `packages/opencode/src/auth/index.ts` (+94, -36)
- `packages/opencode/src/auth/service.ts` (+0, -101)
- `packages/opencode/src/bun/registry.ts` (+6, -0)
- `packages/opencode/src/cli/cmd/account.ts` (+62, -24)
- `packages/opencode/src/cli/cmd/agent.ts` (+1, -13)
- `packages/opencode/src/cli/cmd/debug/agent.ts` (+6, -6)
- `packages/opencode/src/cli/cmd/github.ts` (+1, -2)
- `packages/opencode/src/cli/cmd/models.ts` (+1, -1)
- `packages/opencode/src/cli/cmd/pr.ts` (+8, -14)
- `packages/opencode/src/cli/cmd/providers.ts` (+6, -3)
- `packages/opencode/src/cli/cmd/run.ts` (+2, -2)
- `packages/opencode/src/cli/cmd/tui/app.tsx` (+66, -15)
- `packages/opencode/src/cli/cmd/tui/component/dialog-provider.tsx` (+71, -1)
- `packages/opencode/src/cli/cmd/tui/component/dialog-workspace-list.tsx` (+2, -1)
- `packages/opencode/src/cli/cmd/tui/component/prompt/index.tsx` (+25, -11)
- `packages/opencode/src/cli/cmd/tui/component/prompt/part.ts` (+16, -0)
- `packages/opencode/src/cli/cmd/tui/context/exit.tsx` (+1, -0)
- `packages/opencode/src/cli/cmd/tui/context/sync.tsx` (+1, -1)
- `packages/opencode/src/cli/cmd/tui/context/theme.tsx` (+55, -14)
- `packages/opencode/src/cli/cmd/tui/routes/session/dialog-fork-from-timeline.tsx` (+2, -1)
- `packages/opencode/src/cli/cmd/tui/routes/session/dialog-message.tsx` (+2, -1)
- `packages/opencode/src/cli/cmd/tui/routes/session/index.tsx` (+5, -2)
- `packages/opencode/src/cli/cmd/tui/thread.ts` (+6, -0)
- `packages/opencode/src/cli/cmd/tui/ui/dialog-confirm.tsx` (+9, -5)
- `packages/opencode/src/cli/cmd/tui/ui/dialog.tsx` (+1, -1)
- `packages/opencode/src/cli/cmd/tui/util/clipboard.ts` (+10, -0)
- `packages/opencode/src/cli/cmd/tui/util/editor.ts` (+16, -12)
- `packages/opencode/src/cli/cmd/tui/worker.ts` (+61, -36)
- `packages/opencode/src/cli/cmd/upgrade.ts` (+9, -1)
- `packages/opencode/src/cli/upgrade.ts` (+9, -3)
- `packages/opencode/src/command/index.ts` (+126, -90)
- `packages/opencode/src/config/config.ts` (+9, -4)
- `packages/opencode/src/control-plane/adaptors/worktree.ts` (+1, -2)
- `packages/opencode/src/control-plane/workspace-router-middleware.ts` (+2, -1)
- `packages/opencode/src/control-plane/workspace.ts` (+3, -2)
- `packages/opencode/src/effect/cross-spawn-spawner.ts` (+476, -0)
- `packages/opencode/src/effect/instance-registry.ts` (+12, -0)
- `packages/opencode/src/effect/instance-state.ts` (+47, -0)
- `packages/opencode/src/effect/run-service.ts` (+17, -0)
- `packages/opencode/src/effect/runtime.ts` (+0, -9)
- `packages/opencode/src/file/index.ts` (+410, -367)
- `packages/opencode/src/file/time.ts` (+110, -53)
- `packages/opencode/src/file/watcher.ts` (+128, -87)
- `packages/opencode/src/filesystem/index.ts` (+197, -0)
- `packages/opencode/src/flag/flag.ts` (+14, -4)
- `packages/opencode/src/format/index.ts` (+153, -110)
- `packages/opencode/src/global/index.ts` (+1, -1)
- `packages/opencode/src/id/id.ts` (+1, -0)
- `packages/opencode/src/ide/index.ts` (+6, -8)
- `packages/opencode/src/installation/index.ts` (+309, -216)
- `packages/opencode/src/kilo-sessions/kilo-sessions.ts` (+8, -4)
- `packages/opencode/src/kilo-sessions/remote-sender.ts` (+3, -3)
- `packages/opencode/src/kilocode/session-import/service.ts` (+24, -4)
- `packages/opencode/src/kilocode/session-import/types.ts` (+6, -1)
- `packages/opencode/src/lsp/client.ts` (+2, -1)
- `packages/opencode/src/lsp/index.ts` (+12, -7)
- `packages/opencode/src/lsp/launch.ts` (+21, -0)
- `packages/opencode/src/lsp/server.ts` (+3, -12)
- `packages/opencode/src/mcp/auth.ts` (+147, -96)
- `packages/opencode/src/mcp/index.ts` (+545, -631)
- `packages/opencode/src/mcp/oauth-callback.ts` (+26, -3)
- `packages/opencode/src/node.ts` (+1, -0)
- `packages/opencode/src/plugin/codex.ts` (+3, -2)
- `packages/opencode/src/plugin/copilot.ts` (+2, -5)
- `packages/opencode/src/plugin/index.ts` (+181, -115)
- `packages/opencode/src/project/bootstrap.ts` (+6, -7)
- `packages/opencode/src/project/instance.ts` (+26, -24)
- `packages/opencode/src/project/project.ts` (+394, -327)
- `packages/opencode/src/project/vcs.ts` (+80, -45)
- `packages/opencode/src/provider/auth-service.ts` (+0, -168)
- `packages/opencode/src/provider/auth.ts` (+247, -60)
- `packages/opencode/src/provider/error.ts` (+5, -2)
- `packages/opencode/src/provider/models-snapshot.d.ts` (+2, -0)
- `packages/opencode/src/provider/models-snapshot.js` (+3, -0)
- `packages/opencode/src/provider/models.ts` (+1, -1)
- `packages/opencode/src/provider/provider.ts` (+124, -69)
- `packages/opencode/src/provider/schema.ts` (+1, -1)
- `packages/opencode/src/provider/transform.ts` (+11, -6)
- `packages/opencode/src/pty/index.ts` (+280, -200)
- `packages/opencode/src/question/index.ts` (+205, -28)
- `packages/opencode/src/question/service.ts` (+0, -181)
- `packages/opencode/src/scheduler/index.ts` (+0, -61)
- `packages/opencode/src/server/projectors.ts` (+28, -0)
- `packages/opencode/src/server/routes/config.ts` (+4, -4)
- `packages/opencode/src/server/routes/event.ts` (+84, -0)
- `packages/opencode/src/server/routes/experimental.ts` (+3, -3)
- `packages/opencode/src/server/routes/global.ts` (+155, -30)
- `packages/opencode/src/server/routes/kilocode.ts` (+1, -1)
- `packages/opencode/src/server/routes/permission.ts` (+6, -12)
- `packages/opencode/src/server/routes/project.ts` (+2, -2)
- `packages/opencode/src/server/routes/provider.ts` (+6, -1)
- `packages/opencode/src/server/routes/pty.ts` (+17, -7)
- `packages/opencode/src/server/routes/session.ts` (+17, -9)
- `packages/opencode/src/server/server.ts` (+23, -78)
- `packages/opencode/src/session/compaction.ts` (+9, -2)
- `packages/opencode/src/session/index.ts` (+113, -208)
- `packages/opencode/src/session/llm.ts` (+64, -21)
- `packages/opencode/src/session/message-v2.ts` (+60, -24)
- `packages/opencode/src/session/network.ts` (+15, -3)
- `packages/opencode/src/session/processor.ts` (+7, -7)
- `packages/opencode/src/session/projectors.ts` (+135, -0)
- `packages/opencode/src/session/prompt.ts` (+105, -26)
- `packages/opencode/src/session/prompt/anthropic-20250930.txt` (+0, -166)
- `packages/opencode/src/session/prompt/{codex_header.txt => codex.txt}` (+0, -0)
- `packages/opencode/src/session/prompt/{qwen.txt => default.txt}` (+1, -5)
- `packages/opencode/src/session/revert.ts` (+6, -6)
- `packages/opencode/src/session/session.sql.ts` (+3, -3)
- `packages/opencode/src/session/status.ts` (+52, -27)
- `packages/opencode/src/session/summary.ts` (+12, -7)
- `packages/opencode/src/session/system.ts` (+8, -26)
- `packages/opencode/src/share/share-next.ts` (+10, -11)
- `packages/opencode/src/skill/discovery.ts` (+104, -86)
- `packages/opencode/src/skill/index.ts` (+253, -1)
- `packages/opencode/src/skill/skill.ts` (+0, -294)
- `packages/opencode/src/snapshot/index.ts` (+588, -415)
- `packages/opencode/src/storage/db.bun.ts` (+8, -0)
- `packages/opencode/src/storage/db.node.ts` (+8, -0)
- `packages/opencode/src/storage/db.ts` (+40, -31)
- `packages/opencode/src/sync/README.md` (+179, -0)
- `packages/opencode/src/sync/event.sql.ts` (+16, -0)
- `packages/opencode/src/sync/index.ts` (+263, -0)
- `packages/opencode/src/sync/schema.ts` (+14, -0)
- `packages/opencode/src/util/effect-zod.ts` (+6, -0)
- `packages/opencode/src/util/eventloop.ts` (+0, -20)
- `packages/opencode/src/util/fn.ts` (+3, -0)
- `packages/opencode/src/util/instance-state.ts` (+0, -63)
- `packages/opencode/src/util/process.ts` (+21, -1)
- `packages/opencode/src/util/update-schema.ts` (+13, -0)
- `packages/opencode/src/util/which.ts` (+5, -1)
- `packages/opencode/src/worktree/index.ts` (+431, -472)
- `packages/opencode/test/account/repo.test.ts` (+13, -25)
- `packages/opencode/test/account/service.test.ts` (+95, -37)
- `packages/opencode/test/acp/event-subscription.test.ts` (+2, -0)
- `packages/opencode/test/bun/registry.test.ts` (+1, -1)
- `packages/opencode/test/cli/account.test.ts` (+26, -0)
- `packages/opencode/test/cli/cmd/tui/prompt-part.test.ts` (+47, -0)
- `packages/opencode/test/config/config.test.ts` (+1, -3)
- `packages/opencode/test/effect/cross-spawn-spawner.test.ts` (+402, -0)
- `packages/opencode/test/effect/instance-state.test.ts` (+384, -0)
- `packages/opencode/test/effect/run-service.test.ts` (+46, -0)
- `packages/opencode/test/file/index.test.ts` (+553, -1)
- `packages/opencode/test/file/time.test.ts` (+83, -90)
- `packages/opencode/test/file/watcher.test.ts` (+245, -0)
- `packages/opencode/test/filesystem/filesystem.test.ts` (+319, -0)
- `packages/opencode/test/fixture/effect.ts` (+0, -7)
- `packages/opencode/test/fixture/fixture.ts` (+68, -0)
- `packages/opencode/test/format/format.test.ts` (+182, -0)
- `packages/opencode/test/installation/installation.test.ts` (+148, -15)
- `packages/opencode/test/kilo-sessions/remote-sender.test.ts` (+4, -4)
- `packages/opencode/test/kilocode/ask-agent-permissions.test.ts` (+55, -60)
- `packages/opencode/test/kilocode/plan-exit-detection.test.ts` (+2, -1)
- `packages/opencode/test/kilocode/plan-followup.test.ts` (+6, -3)
- `packages/opencode/test/lib/effect.ts` (+37, -0)
- `packages/opencode/test/lib/filesystem.ts` (+10, -0)
- `packages/opencode/test/lsp/index.test.ts` (+55, -0)
- `packages/opencode/test/lsp/launch.test.ts` (+22, -0)
- `packages/opencode/test/mcp/lifecycle.test.ts` (+660, -0)
- `packages/opencode/test/permission-task.test.ts` (+59, -55)
- `packages/opencode/test/plugin/auth-override.test.ts` (+34, -6)
- `packages/opencode/test/preload.ts` (+7, -0)
- `packages/opencode/test/project/project.test.ts` (+184, -120)
- `packages/opencode/test/project/vcs.test.ts` (+116, -0)
- `packages/opencode/test/project/worktree.test.ts` (+173, -0)
- `packages/opencode/test/provider/amazon-bedrock.test.ts` (+21, -20)
- `packages/opencode/test/provider/auth.test.ts` (+0, -20)
- `packages/opencode/test/provider/gitlab-duo.test.ts` (+140, -18)
- `packages/opencode/test/provider/provider.test.ts` (+80, -80)
- `packages/opencode/test/provider/transform.test.ts` (+103, -0)
- `packages/opencode/test/pty/pty-session.test.ts` (+7, -3)
- `packages/opencode/test/question/question.test.ts` (+136, -1)
- `packages/opencode/test/scheduler.test.ts` (+0, -73)
- `packages/opencode/test/server/permission-allow-everything.test.ts` (+8, -8)
- `packages/opencode/test/server/project-init-git.test.ts` (+2, -0)
- `packages/opencode/test/server/session-messages.test.ts` (+13, -0)
- `packages/opencode/test/session/llm.test.ts` (+91, -1)
- `packages/opencode/test/session/message-v2.test.ts` (+59, -0)
- `packages/opencode/test/session/prompt.test.ts` (+76, -0)
- `packages/opencode/test/session/retry.test.ts` (+7, -5)
- `packages/opencode/test/session/session.test.ts` (+8, -8)
- `packages/opencode/test/session/system.test.ts` (+59, -0)
- `packages/opencode/test/share/share-next.test.ts` (+3, -3)
- `packages/opencode/test/skill/discovery.test.ts` (+17, -11)
- `packages/opencode/test/skill/skill.test.ts` (+5, -1)
- `packages/opencode/test/snapshot/snapshot.test.ts` (+43, -324)
- `packages/opencode/test/storage/db.test.ts` (+7, -4)
- `packages/opencode/test/sync/index.test.ts` (+191, -0)
- `packages/opencode/test/util/instance-state.test.ts` (+0, -261)
- `packages/opencode/test/util/process.test.ts` (+51, -0)
- `packages/plugin/src/index.ts` (+16, -0)
- `packages/script/src/index.ts` (+1, -1)
- `packages/sdk/js/src/v2/gen/sdk.gen.ts` (+87, -37)
- `packages/sdk/js/src/v2/gen/types.gen.ts` (+656, -457)
- `packages/sdk/openapi.json` (+357, -166)
- `packages/storybook/.storybook/main.ts` (+2, -1)
- `packages/storybook/.storybook/mocks/app/context/language.ts` (+1, -1)
- `packages/storybook/.storybook/playground-css-plugin.ts` (+136, -0)
- `packages/ui/package.json` (+1, -0)
- `packages/ui/src/components/basic-tool.css` (+14, -1)
- `packages/ui/src/components/basic-tool.tsx` (+3, -1)
- `packages/ui/src/components/font.tsx` (+81, -114)
- `packages/ui/src/components/hover-card.tsx` (+1, -1)
- `packages/ui/src/components/line-comment-styles.ts` (+22, -5)
- `packages/ui/src/components/line-comment.tsx` (+14, -2)
- `packages/ui/src/components/message-part.css` (+17, -9)
- `packages/ui/src/components/message-part.tsx` (+2, -7)
- `packages/ui/src/components/session-turn.css` (+4, -4)
- `packages/ui/src/components/session-turn.tsx` (+25, -26)
- `packages/ui/src/components/timeline-playground.stories.tsx` (+1973, -0)
- `packages/ui/src/font-loader.ts` (+133, -0)
- `packages/ui/src/theme/context.tsx` (+215, -71)
- `packages/ui/src/theme/themes/oc-2.json` (+29, -0)
- `patches/@ai-sdk%2Fxai@2.0.51.patch` (+108, -0)
- `patches/solid-js@1.9.10.patch` (+58, -0)
- `script/beta.ts` (+134, -7)
- `script/github/close-issues.ts` (+97, -0)
- `script/upstream/merge.ts` (+1, -1)
- `script/upstream/transforms/transform-package-json.ts` (+15, -2)
- `script/version.ts` (+8, -7)

### Key Diffs

#### .opencode/tool/github-pr-search.ts
```diff
diff --git a/.opencode/tool/github-pr-search.ts b/.opencode/tool/github-pr-search.ts
index 1173e7f8b..c2fad2402 100644
--- a/.opencode/tool/github-pr-search.ts
+++ b/.opencode/tool/github-pr-search.ts
@@ -1,6 +1,5 @@
 /// <reference path="../env.d.ts" />
 import { tool } from "@kilocode/plugin"
-import DESCRIPTION from "./github-pr-search.txt"
 
 async function githubFetch(endpoint: string, options: RequestInit = {}) {
   const response = await fetch(`https://api.github.com${endpoint}`, {
@@ -24,7 +23,16 @@ interface PR {
 }
 
 export default tool({
-  description: DESCRIPTION,
+  description: `Use this tool to search GitHub pull requests by title and description.
+
+This tool searches PRs in the anomalyco/opencode repository and returns LLM-friendly results including:
+- PR number and title
+- Author
+- State (open/closed/merged)
+- Labels
+- Description snippet
+
+Use the query parameter to search for keywords that might appear in PR titles or descriptions.`,
   args: {
     query: tool.schema.string().describe("Search query for PR titles and descriptions"),
     limit: tool.schema.number().describe("Maximum number of results to return").default(10),
```

#### .opencode/tool/github-pr-search.txt
```diff
diff --git a/.opencode/tool/github-pr-search.txt b/.opencode/tool/github-pr-search.txt
deleted file mode 100644
index 1b658e71c..000000000
--- a/.opencode/tool/github-pr-search.txt
+++ /dev/null
@@ -1,10 +0,0 @@
-Use this tool to search GitHub pull requests by title and description.
-
-This tool searches PRs in the anomalyco/opencode repository and returns LLM-friendly results including:
-- PR number and title
-- Author
-- State (open/closed/merged)
-- Labels
-- Description snippet
-
-Use the query parameter to search for keywords that might appear in PR titles or descriptions.
```

#### .opencode/tool/github-triage.ts
```diff
diff --git a/.opencode/tool/github-triage.ts b/.opencode/tool/github-triage.ts
index 43e3f1495..1471ec332 100644
--- a/.opencode/tool/github-triage.ts
+++ b/.opencode/tool/github-triage.ts
@@ -1,7 +1,19 @@
 /// <reference path="../env.d.ts" />
-// import { Octokit } from "@octokit/rest"
 import { tool } from "@kilocode/plugin"
-import DESCRIPTION from "./github-triage.txt"
+const TEAM = {
+  desktop: ["adamdotdevin", "iamdavidhill", "Brendonovich", "nexxeln"],
+  zen: ["fwang", "MrMushrooooom"],
+  tui: ["thdxr", "kommander", "rekram1-node"],
+  core: ["thdxr", "rekram1-node", "jlongster"],
+  docs: ["R44VC0RP"],
+  windows: ["Hona"],
+} as const
+
+const ASSIGNEES = [...new Set(Object.values(TEAM).flat())]
+
+function pick<T>(items: readonly T[]) {
+  return items[Math.floor(Math.random() * items.length)]!
+}
 
 function getIssueNumber(): number {
   const issue = parseInt(process.env.ISSUE_NUMBER ?? "", 10)
@@ -26,7 +38,12 @@ async function githubFetch(endpoint: string, options: RequestInit = {}) {
 }
 
 export default tool({
-  description: DESCRIPTION,
+  description: `Use this tool to assign and/or label a GitHub issue.
+
+Choose labels and assignee using the current triage policy and ownership rules.
+Pick the most fitting labels for the issue and assign one owner.
+
+If unsure, choose the team/section with the most overlap with the issue and assign a member from that team at random.`,
   args: {
     assignee: tool.schema
       .enum(["thdxr", "adamdotdevin", "rekram1-node", "fwang", "jayair", "kommander"])
```

#### .opencode/tool/github-triage.txt
```diff
diff --git a/.opencode/tool/github-triage.txt b/.opencode/tool/github-triage.txt
deleted file mode 100644
index 4369ed235..000000000
--- a/.opencode/tool/github-triage.txt
+++ /dev/null
@@ -1,6 +0,0 @@
-Use this tool to assign and/or label a GitHub issue.
-
-Choose labels and assignee using the current triage policy and ownership rules.
-Pick the most fitting labels for the issue and assign one owner.
-
-If unsure, choose the team/section with the most overlap with the issue and assign a member from that team at random.
```

#### packages/opencode/src/agent/agent.ts
```diff
diff --git a/packages/opencode/src/agent/agent.ts b/packages/opencode/src/agent/agent.ts
index f42707cbf..300f0ab0d 100644
--- a/packages/opencode/src/agent/agent.ts
+++ b/packages/opencode/src/agent/agent.ts
@@ -3,31 +3,26 @@ import z from "zod"
 import { Provider } from "../provider/provider"
 import { ModelID, ProviderID } from "../provider/schema"
 import { generateObject, streamObject, type ModelMessage } from "ai"
-import { SystemPrompt } from "../session/system"
 import { Instance } from "../project/instance"
-import { Truncate } from "../tool/truncation"
+import { Truncate } from "../tool/truncate"
 import { Auth } from "../auth"
 import { ProviderTransform } from "../provider/transform"
 
 import PROMPT_GENERATE from "./generate.txt"
 import PROMPT_COMPACTION from "./prompt/compaction.txt"
-import PROMPT_DEBUG from "./prompt/debug.txt"
 import PROMPT_EXPLORE from "./prompt/explore.txt"
-import PROMPT_ASK from "./prompt/ask.txt"
-import PROMPT_ORCHESTRATOR from "./prompt/orchestrator.txt"
 import PROMPT_SUMMARY from "./prompt/summary.txt"
 import PROMPT_TITLE from "./prompt/title.txt"
-
-import { PermissionNext } from "@/permission/next"
-import { NamedError } from "@opencode-ai/util/error" // kilocode_change
-import { Glob } from "../util/glob" // kilocode_change
+import { Permission } from "@/permission"
 import { mergeDeep, pipe, sortBy, values } from "remeda"
 import { Global } from "@/global"
 import path from "path"
 import { Plugin } from "@/plugin"
 import { Skill } from "../skill"
-
-import { Telemetry } from "@kilocode/kilo-telemetry" // kilocode_change
+import { Effect, ServiceMap, Layer } from "effect"
+import { InstanceState } from "@/effect/instance-state"
+import { makeRuntime } from "@/effect/run-service"
+import * as KiloAgent from "@/kilocode/agent" // kilocode_change
 
 export namespace Agent {
   export const Info = z
@@ -35,14 +30,14 @@ export namespace Agent {
       name: z.string(),
       displayName: z.string().optional(), // kilocode_change - human-readable name for org modes
       description: z.string().optional(),
+      deprecated: z.boolean().optional(), // kilocode_change
       mode: z.enum(["subagent", "primary", "all"]),
       native: z.boolean().optional(),
       hidden: z.boolean().optional(),
```


*... and more files (showing first 5)*

## opencode Changes (2719063..74b14a2)

### Commits

- 74b14a2 - chore: refactor log.ts, go back to glob but add sort (#22107) (Aiden Cline, 2026-04-11)
- cdb951e - feat: make gh copilot use msgs api when available (#22106) (Aiden Cline, 2026-04-11)
- fc01cad - fix: ensure logger cleanup properly orders list before deleting files (#22101) (Aiden Cline, 2026-04-11)
- c1ddc0e - chore: generate (opencode-agent[bot], 2026-04-12)
- 319b765 - refactor(tool): destroy Truncate facade, effectify Tool.define (#22093) (Kit Langton, 2026-04-11)
- 824c12c - refactor(file): destroy FileWatcher facade (#22091) (Kit Langton, 2026-04-11)
- 17b2900 - chore: generate (opencode-agent[bot], 2026-04-12)
- 003010b - refactor(question): destroy Question facade (#22092) (Kit Langton, 2026-04-11)
- 82a4292 - refactor(file): destroy FileTime facade (#22090) (Kit Langton, 2026-04-11)
- eea4253 - refactor(session): destroy Instruction facade (#22089) (Kit Langton, 2026-04-11)
- 1eacc3c - chore: generate (opencode-agent[bot], 2026-04-12)
- 1a509d6 - refactor(session): destroy SessionRunState facade (#22064) (Kit Langton, 2026-04-11)
- 4c4eef4 - chore: generate (opencode-agent[bot], 2026-04-11)
- d62ec77 - feat: allow session permission updates (#22070) (Tommy D. Rossi, 2026-04-11)
- cb1e5d9 - chore: generate (opencode-agent[bot], 2026-04-11)
- ca5f086 - refactor(server): simplify router middleware with next() (#21720) (Dax, 2026-04-11)
- 57c40eb - chore: generate (opencode-agent[bot], 2026-04-11)
- 63035f9 - fix: enable thinking for zhipuai-coding-plan & prevent Korean IME truncation (#22041) (ryan.h.park, 2026-04-11)
- 514d2a3 - chore: update nix node_modules hashes (opencode-agent[bot], 2026-04-11)
- 0b6fd5f - chore: bump ai sdk deps (#22005) (Aiden Cline, 2026-04-11)
- 029e713 - hide download button (Dax Raad, 2026-04-11)
- c43591f - chore: generate (opencode-agent[bot], 2026-04-11)
- a2c2271 - ignore: exploration (Dax Raad, 2026-04-11)
- 312f10f - refactor(account): destroy Account facade (#22068) (Kit Langton, 2026-04-11)
- d1f05b0 - chore: generate (opencode-agent[bot], 2026-04-11)
- ccb0b32 - refactor(session): make SystemPrompt a proper Effect Service (#21992) (Kit Langton, 2026-04-11)
- 5ee7eda - refactor(tool): make Tool.Info init effectful (#21989) (Kit Langton, 2026-04-11)

### Changed Files by Category

#### Tool System (packages/*/src/tool/)
- `packages/opencode/src/tool/bash.ts` (+48, -47)
- `packages/opencode/src/tool/multiedit.ts` (+1, -1)
- `packages/opencode/src/tool/skill.ts` (+72, -72)
- `packages/opencode/src/tool/tool.ts` (+53, -41)
- `packages/opencode/src/tool/truncate.ts` (+0, -7)
- `packages/opencode/test/tool/apply_patch.test.ts` (+11, -2)
- `packages/opencode/test/tool/bash.test.ts` (+9, -2)
- `packages/opencode/test/tool/edit.test.ts` (+12, -2)
- `packages/opencode/test/tool/grep.test.ts` (+6, -2)
- `packages/opencode/test/tool/question.test.ts` (+7, -3)
- `packages/opencode/test/tool/read.test.ts` (+3, -1)
- `packages/opencode/test/tool/skill.test.ts` (+6, -2)
- `packages/opencode/test/tool/task.test.ts` (+6, -4)
- `packages/opencode/test/tool/tool-define.test.ts` (+17, -13)
- `packages/opencode/test/tool/truncation.test.ts` (+129, -94)
- `packages/opencode/test/tool/webfetch.test.ts` (+10, -16)
- `packages/opencode/test/tool/write.test.ts` (+5, -1)

#### Agent System (packages/*/src/agent/)
- `packages/opencode/src/agent/agent.ts` (+5, -7)

#### Permission System (**/permission/)
(no changes)

#### Event Bus (**/bus/, **/event/)
(no changes)

#### Core (**/core/)
(no changes)

#### Other Changes
- `bun.lock` (+21, -18)
- `nix/hashes.json` (+4, -4)
- `package.json` (+1, -1)
- `packages/console/app/src/routes/download/index.css` (+2, -1)
- `packages/opencode/package.json` (+8, -4)
- `packages/opencode/specs/effect-migration.md` (+52, -7)
- `packages/opencode/src/account/index.ts` (+0, -15)
- `packages/opencode/src/cli/cmd/account.ts` (+6, -5)
- `packages/opencode/src/cli/cmd/tui/component/prompt/index.tsx` (+12, -1)
- `packages/opencode/src/cli/cmd/tui/thread.ts` (+8, -2)
- `packages/opencode/src/config/config.ts` (+0, -1)
- `packages/opencode/src/effect/bootstrap-runtime.ts` (+2, -1)
- `packages/opencode/src/file/time.ts` (+0, -19)
- `packages/opencode/src/file/watcher.ts` (+0, -7)
- `packages/opencode/src/plugin/github-copilot/copilot.ts` (+10, -8)
- `packages/opencode/src/plugin/github-copilot/models.ts` (+4, -2)
- `packages/opencode/src/plugin/index.ts` (+10, -8)
- `packages/opencode/src/project/bootstrap.ts` (+2, -2)
- `packages/opencode/src/provider/models-snapshot.js` (+48164, -43422)
- `packages/opencode/src/provider/transform.ts` (+4, -1)
- `packages/opencode/src/question/index.ts` (+0, -23)
- `packages/opencode/src/server/adapter.bun.ts` (+40, -0)
- `packages/opencode/src/server/adapter.node.ts` (+66, -0)
- `packages/opencode/src/server/adapter.ts` (+21, -0)
- `packages/opencode/src/server/control/index.ts` (+150, -0)
- `packages/opencode/src/server/{routes => instance}/config.ts` (+0, -0)
- `packages/opencode/src/server/{routes => instance}/event.ts` (+0, -0)
- `packages/opencode/src/server/{routes => instance}/experimental.ts` (+40, -17)
- `packages/opencode/src/server/{routes => instance}/file.ts` (+0, -0)
- `packages/opencode/src/server/{routes => instance}/global.ts` (+0, -0)
- `packages/opencode/src/server/{instance.ts => instance/index.ts}` (+24, -80)
- `packages/opencode/src/server/{routes => instance}/mcp.ts` (+0, -0)
- `packages/opencode/src/server/{router.ts => instance/middleware.ts}` (+6, -10)
- `packages/opencode/src/server/{routes => instance}/permission.ts` (+0, -0)
- `packages/opencode/src/server/{routes => instance}/project.ts` (+0, -0)
- `packages/opencode/src/server/{routes => instance}/provider.ts` (+0, -0)
- `packages/opencode/src/server/{routes => instance}/pty.ts` (+0, -0)
- `packages/opencode/src/server/{routes => instance}/question.ts` (+11, -6)
- `packages/opencode/src/server/{routes => instance}/session.ts` (+20, -5)
- `packages/opencode/src/server/{routes => instance}/tui.ts` (+0, -0)
- `packages/opencode/src/server/{routes => instance}/workspace.ts` (+0, -0)
- `packages/opencode/src/server/middleware.ts` (+82, -23)
- `packages/opencode/src/server/server.ts` (+28, -275)
- `packages/opencode/src/server/ui/index.ts` (+55, -0)
- `packages/opencode/src/session/index.ts` (+4, -0)
- `packages/opencode/src/session/instruction.ts` (+0, -15)
- `packages/opencode/src/session/prompt.ts` (+21, -10)
- `packages/opencode/src/session/run-state.ts` (+0, -6)
- `packages/opencode/src/session/system.ts` (+45, -37)
- `packages/opencode/src/util/log.ts` (+14, -9)
- `packages/opencode/src/v2/message.ts` (+68, -0)
- `packages/opencode/test/AGENTS.md` (+52, -0)
- `packages/opencode/test/file/time.test.ts` (+371, -394)
- `packages/opencode/test/memory/abort-leak-webfetch.ts` (+49, -0)
- `packages/opencode/test/memory/abort-leak.test.ts` (+127, -0)
- `packages/opencode/test/plugin/github-copilot-models.test.ts` (+43, -0)
- `packages/opencode/test/plugin/loader-shared.test.ts` (+90, -60)
- `packages/opencode/test/project/vcs.test.ts` (+2, -1)
- `packages/opencode/test/provider/transform.test.ts` (+52, -0)
- `packages/opencode/test/question/question.test.ts` (+63, -52)
- `packages/opencode/test/server/session-actions.test.ts` (+2, -49)
- `packages/opencode/test/server/session-messages.test.ts` (+1, -1)
- `packages/opencode/test/session/instruction.test.ts` (+117, -69)
- `packages/opencode/test/session/prompt-effect.test.ts` (+2, -0)
- `packages/opencode/test/session/snapshot-tool-race.test.ts` (+2, -0)
- `packages/opencode/test/session/system.test.ts` (+8, -2)
- `packages/opencode/test/util/log.test.ts` (+44, -0)
- `packages/sdk/js/src/v2/gen/sdk.gen.ts` (+2, -0)
- `packages/sdk/js/src/v2/gen/types.gen.ts` (+51, -50)
- `packages/sdk/openapi.json` (+124, -121)
- `patches/install-korean-ime-fix.sh` (+120, -0)

### Key Diffs

#### packages/opencode/src/agent/agent.ts
```diff
diff --git a/packages/opencode/src/agent/agent.ts b/packages/opencode/src/agent/agent.ts
index 93b393f..fd9ac43 100644
--- a/packages/opencode/src/agent/agent.ts
+++ b/packages/opencode/src/agent/agent.ts
@@ -398,13 +398,11 @@ export namespace Agent {
     }),
   )
 
-  export const defaultLayer = Layer.suspend(() =>
-    layer.pipe(
-      Layer.provide(Provider.defaultLayer),
-      Layer.provide(Auth.defaultLayer),
-      Layer.provide(Config.defaultLayer),
-      Layer.provide(Skill.defaultLayer),
-    ),
+  export const defaultLayer = layer.pipe(
+    Layer.provide(Provider.defaultLayer),
+    Layer.provide(Auth.defaultLayer),
+    Layer.provide(Config.defaultLayer),
+    Layer.provide(Skill.defaultLayer),
   )
 
   const { runPromise } = makeRuntime(Service, defaultLayer)
```

#### packages/opencode/src/tool/bash.ts
```diff
diff --git a/packages/opencode/src/tool/bash.ts b/packages/opencode/src/tool/bash.ts
index eb49159..150cafb 100644
--- a/packages/opencode/src/tool/bash.ts
+++ b/packages/opencode/src/tool/bash.ts
@@ -454,52 +454,53 @@ export const BashTool = Tool.define(
       }
     })
 
-    return async () => {
-      const shell = Shell.acceptable()
-      const name = Shell.name(shell)
-      const chain =
-        name === "powershell"
-          ? "If the commands depend on each other and must run sequentially, avoid '&&' in this shell because Windows PowerShell 5.1 does not support it. Use PowerShell conditionals such as `cmd1; if ($?) { cmd2 }` when later commands must depend on earlier success."
-          : "If the commands depend on each other and must run sequentially, use a single Bash call with '&&' to chain them together (e.g., `git add . && git commit -m \"message\" && git push`). For instance, if one operation must complete before another starts (like mkdir before cp, Write before Bash for git operations, or git add before git commit), run these operations sequentially instead."
-      log.info("bash tool using shell", { shell })
-
-      return {
-        description: DESCRIPTION.replaceAll("${directory}", Instance.directory)
-          .replaceAll("${os}", process.platform)
-          .replaceAll("${shell}", name)
-          .replaceAll("${chaining}", chain)
-          .replaceAll("${maxLines}", String(Truncate.MAX_LINES))
-          .replaceAll("${maxBytes}", String(Truncate.MAX_BYTES)),
-        parameters: Parameters,
-        execute: (params: z.infer<typeof Parameters>, ctx: Tool.Context) =>
-          Effect.gen(function* () {
-            const cwd = params.workdir
-              ? yield* resolvePath(params.workdir, Instance.directory, shell)
-              : Instance.directory
-            if (params.timeout !== undefined && params.timeout < 0) {
-              throw new Error(`Invalid timeout value: ${params.timeout}. Timeout must be a positive number.`)
-            }
-            const timeout = params.timeout ?? DEFAULT_TIMEOUT
-            const ps = PS.has(name)
-            const root = yield* parse(params.command, ps)
-            const scan = yield* collect(root, cwd, ps, shell)
-            if (!Instance.containsPath(cwd)) scan.dirs.add(cwd)
-            yield* ask(ctx, scan)
-
-            return yield* run(
-              {
-                shell,
-                name,
-                command: params.command,
-                cwd,
-                env: yield* shellEnv(ctx, cwd),
-                timeout,
-                description: params.description,
-              },
```

#### packages/opencode/src/tool/multiedit.ts
```diff
diff --git a/packages/opencode/src/tool/multiedit.ts b/packages/opencode/src/tool/multiedit.ts
index 82d6988..449df33 100644
--- a/packages/opencode/src/tool/multiedit.ts
+++ b/packages/opencode/src/tool/multiedit.ts
@@ -10,7 +10,7 @@ export const MultiEditTool = Tool.define(
   "multiedit",
   Effect.gen(function* () {
     const editInfo = yield* EditTool
-    const edit = yield* Effect.promise(() => editInfo.init())
+    const edit = yield* editInfo.init()
 
     return {
       description: DESCRIPTION,
```

#### packages/opencode/src/tool/skill.ts
```diff
diff --git a/packages/opencode/src/tool/skill.ts b/packages/opencode/src/tool/skill.ts
index f9f06b9..14adaf2 100644
--- a/packages/opencode/src/tool/skill.ts
+++ b/packages/opencode/src/tool/skill.ts
@@ -17,84 +17,84 @@ export const SkillTool = Tool.define(
   Effect.gen(function* () {
     const skill = yield* Skill.Service
     const rg = yield* Ripgrep.Service
+    return () =>
+      Effect.gen(function* () {
+        const list = yield* skill.available().pipe(Effect.provide(EffectLogger.layer))
 
-    return async () => {
-      const list = await Effect.runPromise(skill.available().pipe(Effect.provide(EffectLogger.layer)))
-
-      const description =
-        list.length === 0
-          ? "Load a specialized skill that provides domain-specific instructions and workflows. No skills are currently available."
-          : [
-              "Load a specialized skill that provides domain-specific instructions and workflows.",
-              "",
-              "When you recognize that a task matches one of the available skills listed below, use this tool to load the full skill instructions.",
-              "",
-              "The skill will inject detailed instructions, workflows, and access to bundled resources (scripts, references, templates) into the conversation context.",
-              "",
-              'Tool output includes a `<skill_content name="...">` block with the loaded content.',
-              "",
-              "The following skills provide specialized sets of instructions for particular tasks",
-              "Invoke this tool to load a skill when a task matches one of the available skills listed below:",
-              "",
-              Skill.fmt(list, { verbose: false }),
-            ].join("\n")
+        const description =
+          list.length === 0
+            ? "Load a specialized skill that provides domain-specific instructions and workflows. No skills are currently available."
+            : [
+                "Load a specialized skill that provides domain-specific instructions and workflows.",
+                "",
+                "When you recognize that a task matches one of the available skills listed below, use this tool to load the full skill instructions.",
+                "",
+                "The skill will inject detailed instructions, workflows, and access to bundled resources (scripts, references, templates) into the conversation context.",
+                "",
+                'Tool output includes a `<skill_content name="...">` block with the loaded content.',
+                "",
+                "The following skills provide specialized sets of instructions for particular tasks",
+                "Invoke this tool to load a skill when a task matches one of the available skills listed below:",
+                "",
+                Skill.fmt(list, { verbose: false }),
+              ].join("\n")
 
```

#### packages/opencode/src/tool/tool.ts
```diff
diff --git a/packages/opencode/src/tool/tool.ts b/packages/opencode/src/tool/tool.ts
index 4cd3ba6..49dd2b0 100644
--- a/packages/opencode/src/tool/tool.ts
+++ b/packages/opencode/src/tool/tool.ts
@@ -47,9 +47,13 @@ export namespace Tool {
 
   export interface Info<Parameters extends z.ZodType = z.ZodType, M extends Metadata = Metadata> {
     id: string
-    init: () => Promise<DefWithoutID<Parameters, M>>
+    init: () => Effect.Effect<DefWithoutID<Parameters, M>>
   }
 
+  type Init<Parameters extends z.ZodType, M extends Metadata> =
+    | DefWithoutID<Parameters, M>
+    | (() => Effect.Effect<DefWithoutID<Parameters, M>>)
+
   export type InferParameters<T> =
     T extends Info<infer P, any>
       ? z.infer<P>
@@ -68,58 +72,66 @@ export namespace Tool {
 
   function wrap<Parameters extends z.ZodType, Result extends Metadata>(
     id: string,
-    init: (() => Promise<DefWithoutID<Parameters, Result>>) | DefWithoutID<Parameters, Result>,
+    init: Init<Parameters, Result>,
+    truncate: Truncate.Interface,
+    agents: Agent.Interface,
   ) {
-    return async () => {
-      const toolInfo = init instanceof Function ? await init() : { ...init }
-      const execute = toolInfo.execute
-      toolInfo.execute = (args, ctx) =>
-        Effect.gen(function* () {
-          yield* Effect.try({
-            try: () => toolInfo.parameters.parse(args),
-            catch: (error) => {
-              if (error instanceof z.ZodError && toolInfo.formatValidationError) {
-                return new Error(toolInfo.formatValidationError(error), { cause: error })
-              }
-              return new Error(
-                `The ${id} tool was called with invalid arguments: ${error}.\nPlease rewrite the input so it satisfies the expected schema.`,
-                { cause: error },
-              )
-            },
-          })
-          const result = yield* execute(args, ctx)
-          if (result.metadata.truncated !== undefined) {
-            return result
-          }
-          const agent = yield* Effect.promise(() => Agent.get(ctx.agent))
```


*... and more files (showing first 5)*

## Recommendations

Based on the changes, the following files in Alexi should be reviewed:

- `src/agent/index.ts` - incorporate new agent patterns from packages/opencode/src/agent/agent.ts
- `src/agent/index.ts` - incorporate new agent patterns from packages/opencode/src/kilocode/agent/index.ts
- `src/agent/index.ts` - incorporate new agent patterns from packages/opencode/test/agent/agent.test.ts
- `src/agent/index.ts` - incorporate patterns from opencode packages/opencode/src/agent/agent.ts
- `src/permission/` - review permission changes from packages/opencode/src/kilocode/permission/drain.ts
- `src/permission/` - review permission changes from packages/opencode/src/kilocode/permission/routes.ts
- `src/permission/` - review permission changes from packages/opencode/src/permission/evaluate.ts
- `src/permission/` - review permission changes from packages/opencode/src/permission/index.ts
- `src/permission/` - review permission changes from packages/opencode/src/permission/next.ts
- `src/permission/` - review permission changes from packages/opencode/src/permission/service.ts
- `src/permission/` - review permission changes from packages/opencode/test/kilocode/permission/next.always-rules.test.ts
- `src/permission/` - review permission changes from packages/opencode/test/permission/next.test.ts
- `src/permission/` - review permission changes from packages/opencode/test/permission/next.toConfig.test.ts
- `src/tool/apply_patch.test.ts` - update based on opencode packages/opencode/test/tool/apply_patch.test.ts changes
- `src/tool/apply_patch.ts` - update based on kilocode packages/opencode/src/tool/apply_patch.ts changes
- `src/tool/bash.test.ts` - update based on kilocode packages/opencode/test/tool/bash.test.ts changes
- `src/tool/bash.test.ts` - update based on opencode packages/opencode/test/tool/bash.test.ts changes
- `src/tool/bash.ts` - update based on kilocode packages/opencode/src/tool/bash.ts changes
- `src/tool/bash.ts` - update based on opencode packages/opencode/src/tool/bash.ts changes
- `src/tool/edit.test.ts` - update based on kilocode packages/opencode/test/tool/edit.test.ts changes
- `src/tool/edit.test.ts` - update based on opencode packages/opencode/test/tool/edit.test.ts changes
- `src/tool/edit.ts` - update based on kilocode packages/opencode/src/tool/edit.ts changes
- `src/tool/external-directory.test.ts` - update based on kilocode packages/opencode/test/tool/external-directory.test.ts changes
- `src/tool/github-pr-search.ts` - update based on kilocode .opencode/tool/github-pr-search.ts changes
- `src/tool/github-pr-search.txt.ts` - update based on kilocode .opencode/tool/github-pr-search.txt changes
- `src/tool/github-triage.ts` - update based on kilocode .opencode/tool/github-triage.ts changes
- `src/tool/github-triage.txt.ts` - update based on kilocode .opencode/tool/github-triage.txt changes
- `src/tool/grep.test.ts` - update based on opencode packages/opencode/test/tool/grep.test.ts changes
- `src/tool/models-api.json.ts` - update based on kilocode packages/opencode/test/tool/fixtures/models-api.json changes
- `src/tool/multiedit.ts` - update based on opencode packages/opencode/src/tool/multiedit.ts changes
- `src/tool/question.test.ts` - update based on opencode packages/opencode/test/tool/question.test.ts changes
- `src/tool/read.test.ts` - update based on kilocode packages/opencode/test/tool/read.test.ts changes
- `src/tool/read.test.ts` - update based on opencode packages/opencode/test/tool/read.test.ts changes
- `src/tool/read.ts` - update based on kilocode packages/opencode/src/tool/read.ts changes
- `src/tool/registry.test.ts` - update based on kilocode packages/opencode/test/tool/registry.test.ts changes
- `src/tool/registry.ts` - update based on kilocode packages/opencode/src/tool/registry.ts changes
- `src/tool/skill.test.ts` - update based on kilocode packages/opencode/test/tool/skill.test.ts changes
- `src/tool/skill.test.ts` - update based on opencode packages/opencode/test/tool/skill.test.ts changes
- `src/tool/skill.ts` - update based on opencode packages/opencode/src/tool/skill.ts changes
- `src/tool/task.test.ts` - update based on kilocode packages/opencode/test/tool/task.test.ts changes
- `src/tool/task.test.ts` - update based on opencode packages/opencode/test/tool/task.test.ts changes
- `src/tool/task.ts` - update based on kilocode packages/opencode/src/tool/task.ts changes
- `src/tool/todo.ts` - update based on kilocode packages/opencode/src/tool/todo.ts changes
- `src/tool/todoread.txt.ts` - update based on kilocode packages/opencode/src/tool/todoread.txt changes
- `src/tool/tool-define.test.ts` - update based on opencode packages/opencode/test/tool/tool-define.test.ts changes
- `src/tool/tool.ts` - update based on kilocode packages/opencode/src/tool/tool.ts changes
- `src/tool/tool.ts` - update based on opencode packages/opencode/src/tool/tool.ts changes
- `src/tool/truncate.ts` - update based on kilocode packages/opencode/src/tool/truncate.ts changes
- `src/tool/truncate.ts` - update based on opencode packages/opencode/src/tool/truncate.ts changes
- `src/tool/truncation-dir.ts` - update based on kilocode packages/opencode/src/tool/truncation-dir.ts changes
- `src/tool/truncation.test.ts` - update based on kilocode packages/opencode/test/tool/truncation.test.ts changes
- `src/tool/truncation.test.ts` - update based on opencode packages/opencode/test/tool/truncation.test.ts changes
- `src/tool/truncation.ts` - update based on kilocode packages/opencode/src/tool/truncation.ts changes
- `src/tool/webfetch.test.ts` - update based on opencode packages/opencode/test/tool/webfetch.test.ts changes
- `src/tool/write.test.ts` - update based on kilocode packages/opencode/test/tool/write.test.ts changes
- `src/tool/write.test.ts` - update based on opencode packages/opencode/test/tool/write.test.ts changes
- `src/tool/write.ts` - update based on kilocode packages/opencode/src/tool/write.ts changes
