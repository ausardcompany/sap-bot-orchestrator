# Upstream Changes Report
Generated: 2026-04-22 07:50:23

## Summary
- kilocode: 64 commits, 428 files changed
- opencode: 42 commits, 165 files changed

## kilocode Changes (60a1f3c36..fb3f76b83)

### Commits

- fb3f76b83 - Merge pull request #9345 from Kilo-Org/docs/fix-preview-docsearch-links (Mark IJbema, 2026-04-22)
- 79ba90ec8 - fix(kilo-docs): keep docsearch links on previews (kiloconnect[bot], 2026-04-22)
- e9da4e3bb - Merge pull request #9326 from Kilo-Org/session/agent_2c82a4a6-c1b2-4601-bf4f-c24ff7ff753f (Mark IJbema, 2026-04-22)
- 2a963723c - Merge pull request #9280 from Kilo-Org/quilted-titanosaurus (Kirill Kalishev, 2026-04-21)
- 728b50445 - Merge pull request #9328 from Kilo-Org/fix/smoke-test-blacksmith-runner (Mark IJbema, 2026-04-21)
- 788caef5c - ci: use blacksmith for smoke tests (kiloconnect[bot], 2026-04-21)
- ed665ed96 - Merge pull request #9300 from Kilo-Org/fix/plan-in-agent-manager (Marian Alexandru Alecu, 2026-04-21)
- ba98c5c40 - release: v7.2.17 (kilo-maintainer[bot], 2026-04-21)
- 42524dbf6 - fix(cli): replace cherry-pick with rebase + retry in publish push (kiloconnect[bot], 2026-04-21)
- 835350fed - chore(publish): defer release push and implement rebase retry loop (kiloconnect[bot], 2026-04-21)
- b2968d4a2 - chore: update nix node_modules hashes (kilo-maintainer[bot], 2026-04-21)
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
- b6b6802dd - fix(cli): keep follow-up session busy during handover (Alex Alecu, 2026-04-21)
- 9ff717bc5 - Merge pull request #9241 from Kilo-Org/fix/custom-provider-variant-validation (Christiaan Arnoldus, 2026-04-21)
- ebc177e4e - Merge branch 'main' into fix/custom-provider-variant-validation (Christiaan Arnoldus, 2026-04-21)
- 8ac223167 - Merge pull request #9296 from Kilo-Org/feat/ling (Christiaan Arnoldus, 2026-04-21)
- e696fe6ea - fix(cli): inject plan message immediately, append handover in-place (Alex Alecu, 2026-04-21)
- 4146a2579 - wip (kiloconnect[bot], 2026-04-21)
- b99e7ff51 - Apply suggestion from @chrarnoldus (Christiaan Arnoldus, 2026-04-21)
- b4cb8c3c0 - chore: add changeset for autocomplete backend prewarm (kiloconnect[bot], 2026-04-21)
- e28bbd6ee - Merge remote-tracking branch 'origin/main' into feat/ling (kiloconnect[bot], 2026-04-21)
- 0a16ab6c0 - fix(vscode): reset autocomplete state on workspace change (kiloconnect[bot], 2026-04-21)
- 85dd7e091 - refactor: share isLing helper via kilocode/model-match, add multilingual exclusion (kiloconnect[bot], 2026-04-21)
- dca372581 - fix(vscode): prewarm autocomplete backend (kiloconnect[bot], 2026-04-21)
- 99ba7afdb - Merge pull request #9303 from Kilo-Org/mark/docs-screenshot-baselines (Mark IJbema, 2026-04-21)
- eb4ef7460 - refactor: replace broad ling startsWith with isLing helper excluding kling/bling/spelling (kiloconnect[bot], 2026-04-21)
- bfe44822e - fix(vscode): settle canceled autocomplete debounce (kiloconnect[bot], 2026-04-21)
- f45bab245 - chore: retain old visual baseline lfs paths (kiloconnect[bot], 2026-04-21)
- 618193283 - chore: move visual baselines into docs assets (kiloconnect[bot], 2026-04-21)
- fe34c0bfe - fix: use startsWith for ling model detection and add ling to openapi prompt enum (kiloconnect[bot], 2026-04-21)
- 79a4f3762 - Merge remote-tracking branch 'origin/main' into fix/custom-provider-variant-validation (kiloconnect[bot], 2026-04-21)
- 0d0dabe59 - fix(cli): start-new-session tab on slow plan handover (Alex Alecu, 2026-04-21)
- 5cea63d56 - Merge pull request #9264 from Kilo-Org/cleanup/autocomplete-dead-code (Mark IJbema, 2026-04-21)
- 80430d660 - Merge pull request #9120 from Kilo-Org/bash-optional-description (Christiaan Arnoldus, 2026-04-21)
- 2df50796b - chore: add kilocode_change annotations to ling model changes (kiloconnect[bot], 2026-04-21)
- 20c496254 - Merge branch 'main' into feat/ling (Christiaan Arnoldus, 2026-04-21)
- f0bc02966 - Merge branch 'main' into bash-optional-description (Christiaan Arnoldus, 2026-04-21)
- eb6f89ef3 - fix(cli): restore model descriptions in expanded model picker (kirillk, 2026-04-20)
- e7ac4d551 - Merge remote-tracking branch 'origin/main' into bash-optional-description (kiloconnect[bot], 2026-04-20)
- 89f1772c7 - refactor(vscode): drop unused supportsFim / generateResponse from AutocompleteModel (kiloconnect[bot], 2026-04-20)
- b647f151a - refactor(vscode): drop chat-completion fallback in chat textarea autocomplete (kiloconnect[bot], 2026-04-20)
- 8175daeab - refactor(vscode): drop unreachable postprocessing branches (kiloconnect[bot], 2026-04-20)
- fc2ba1ae7 - refactor(vscode): drop FIM templates for unsupported autocomplete models (kiloconnect[bot], 2026-04-20)
- 5ec01e00b - refactor(vscode): reduce validateCustomProvider complexity by extracting helpers (kiloconnect[bot], 2026-04-20)
- 8d49b48d7 - Merge branch 'main' into fix/custom-provider-variant-validation (Christiaan Arnoldus, 2026-04-20)
- 6c0439b00 - chore: add changeset for variant validation fix (kiloconnect[bot], 2026-04-20)
- d9421bac0 - fix(vscode): extract and test custom provider variant name validation (kiloconnect[bot], 2026-04-20)
- c949d672d - Merge branch 'main' into feat/ling (Tang Xinyao, 2026-04-20)
- f13b635dc - feat: use model.api.id rather than model.id as the  id (tangxinyao, 2026-04-20)
- c2e0bbbbb - Merge branch 'main' into feat/ling (Tang Xinyao, 2026-04-20)
- 76925484e - feat(cli): mark bash description as recommended (kiloconnect[bot], 2026-04-17)
- 959e619b2 - fix: add kilocode_change markers (kiloconnect[bot], 2026-04-17)
- d40fc1c71 - feat(cli): make bash tool description parameter optional (kiloconnect[bot], 2026-04-17)
- 7ea76ec10 - feat: ling (tangxinyao, 2026-04-16)

### Changed Files by Category

#### Tool System (packages/*/src/tool/)
- `packages/opencode/src/tool/bash.ts` (+5, -2)

#### Agent System (packages/*/src/agent/)
(no changes)

#### Permission System (**/permission/)
(no changes)

#### Event Bus (**/bus/, **/event/)
(no changes)

#### Core (**/core/)
- `packages/kilo-vscode/src/services/autocomplete/continuedev/core/autocomplete/postprocessing/index.ts` (+10, -26)
- `packages/kilo-vscode/src/services/autocomplete/continuedev/core/autocomplete/templating/AutocompleteTemplate.ts` (+6, -260)

#### Other Changes
- `.changeset/add-alibaba-provider.md` (+0, -5)
- `.changeset/agent-manager-message-fork.md` (+0, -5)
- `.changeset/alibaba-provider-options.md` (+0, -5)
- `.changeset/custom-provider-delete-sticks.md` (+0, -6)
- `.changeset/fix-worktree-session-routing.md` (+0, -5)
- `.changeset/kiloclaw-chat-panel.md` (+0, -5)
- `.changeset/plan-followup-continue-click.md` (+0, -5)
- `.changeset/plan-followup-new-session-tab.md` (+5, -0)
- `.changeset/plan-followup-translations.md` (+0, -5)
- `.changeset/question-custom-answer-duplicate.md` (+0, -5)
- `.changeset/queued-messages-stay-at-bottom.md` (+0, -5)
- `.changeset/quiet-review-summary.md` (+0, -5)
- `.changeset/restore-virtual-history.md` (+0, -5)
- `.changeset/scroll-up-while-busy.md` (+0, -5)
- `.changeset/sidebar-message-forks.md` (+0, -5)
- `.changeset/suggest-tool-stuck-session.md` (+0, -5)
- `.changeset/update-anthropic-sdk-3071.md` (+0, -6)
- `.changeset/update-bedrock-vertex-providers.md` (+0, -5)
- `.changeset/vscode-subagent-spacing.md` (+0, -5)
- `.gitattributes` (+1, -0)
- `.github/workflows/smoke-test.yml` (+1, -8)
- `.github/workflows/visual-regression.yml` (+17, -24)
- `bun.lock` (+18, -17)
- `nix/hashes.json` (+4, -4)
- `package.json` (+3, -2)
- `packages/app/package.json` (+1, -1)
- `packages/desktop-electron/package.json` (+1, -1)
- `packages/desktop/package.json` (+1, -1)
- `packages/extensions/zed/extension.toml` (+6, -6)
- `packages/kilo-docs/components/TopNav.tsx` (+15, -0)
- `packages/kilo-docs/package.json` (+1, -1)
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
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/chat/task-header-with-todos-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/chat/welcome-with-switcher-and-notification-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/components-shell/shell-execution-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/composite-webview/bash-with-permission-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/composite-webview/chat-busy-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/composite-webview/chat-idle-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/composite-webview/diff-summary-collapsed-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/composite-webview/glob-with-permission-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/composite-webview/mcp-tool-cards-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/composite-webview/mcp-tool-expanded-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/composite-webview/multiple-tool-calls-chromium-linux.png` (+0, -0)
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
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/composite-webview/question-dismissed-chromium-linux.png` (+0, -0)
- `packages/{kilo-vscode/tests/visual-regression.spec.ts-snapshots => kilo-docs/public/img/screenshot-tests/kilo-vscode/visual-regression}/composite-webview/todo-write-completed-chromium-linux.png` (+0, -0)
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
- `packages/kilo-gateway/package.json` (+1, -1)
- `packages/kilo-gateway/src/api/constants.ts` (+1, -1)
- `packages/kilo-i18n/package.json` (+1, -1)
- `packages/kilo-telemetry/package.json` (+1, -1)
- `packages/kilo-ui/package.json` (+1, -1)
- `packages/kilo-ui/playwright.config.ts` (+1, -0)
- `packages/kilo-ui/tests/visual-regression.spec.ts` (+1, -1)
- `packages/kilo-vscode/CHANGELOG.md` (+40, -0)
- `packages/kilo-vscode/eslint.config.mjs` (+0, -4)
- `packages/kilo-vscode/package.json` (+1, -1)
- `packages/kilo-vscode/playwright.config.ts` (+1, -0)
- `packages/kilo-vscode/src/extension.ts` (+3, -3)
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
- `packages/kilo-vscode/tests/unit/custom-provider-dialog-validate.test.ts` (+146, -0)
- `packages/kilo-vscode/tests/visual-regression.spec.mts` (+1, -1)
- `packages/kilo-vscode/tests/visual-regression.spec.ts` (+1, -1)
- `packages/kilo-vscode/webview-ui/src/components/settings/CustomProviderDialog.tsx` (+4, -181)
- `packages/kilo-vscode/webview-ui/src/components/settings/CustomProviderValidation.ts` (+200, -0)
- `packages/opencode/CHANGELOG.md` (+20, -0)
- `packages/opencode/package.json` (+2, -1)
- `packages/opencode/src/kilocode/model-match.ts` (+6, -0)
- `packages/opencode/src/kilocode/plan-followup.ts` (+117, -35)
- `packages/opencode/src/kilocode/provider/provider.ts` (+1, -0)
- `packages/opencode/src/kilocode/session/prompt.ts` (+4, -0)
- `packages/opencode/src/provider/transform.ts` (+4, -0)
- `packages/opencode/src/session/prompt.ts` (+1, -0)
- `packages/opencode/src/session/prompt/ling.txt` (+129, -0)
- `packages/opencode/src/session/system.ts` (+5, -0)
- `packages/opencode/test/kilocode/plan-followup.test.ts` (+271, -0)
- `packages/plugin/package.json` (+1, -1)
- `packages/script/package.json` (+1, -1)
- `packages/sdk/js/package.json` (+1, -1)
- `packages/sdk/js/src/v2/gen/types.gen.ts` (+3, -3)
- `packages/sdk/openapi.json` (+1, -1)
- `packages/server/package.json` (+1, -1)
- `packages/storybook/package.json` (+1, -1)
- `packages/ui/package.json` (+1, -1)
- `packages/util/package.json` (+1, -1)
- `patches/stream-chat@9.38.0.patch` (+22, -0)
- `script/publish.ts` (+25, -5)
- `script/upstream/package.json` (+1, -1)
- `sdks/vscode/package.json` (+1, -1)

### Key Diffs

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

#### packages/opencode/src/tool/bash.ts
```diff
diff --git a/packages/opencode/src/tool/bash.ts b/packages/opencode/src/tool/bash.ts
index 6f0029aba..2cb98d73e 100644
--- a/packages/opencode/src/tool/bash.ts
+++ b/packages/opencode/src/tool/bash.ts
@@ -60,8 +60,11 @@ const Parameters = z.object({
     .optional(),
   description: z
     .string()
+    .optional() // kilocode_change
     .describe(
-      "Clear, concise description of what this command does in 5-10 words. Examples:\nInput: ls\nOutput: Lists files in current directory\n\nInput: git status\nOutput: Shows working tree status\n\nInput: npm install\nOutput: Installs package dependencies\n\nInput: mkdir foo\nOutput: Creates directory 'foo'",
+      // kilocode_change start
+      "Recommended: a clear, concise description of what this command does in 5-10 words. Examples:\nInput: ls\nOutput: Lists files in current directory\n\nInput: git status\nOutput: Shows working tree status\n\nInput: npm install\nOutput: Installs package dependencies\n\nInput: mkdir foo\nOutput: Creates directory 'foo'",
+      // kilocode_change end
     ),
 })
 
@@ -500,7 +503,7 @@ export const BashTool = Tool.define(
                   cwd,
                   env: yield* shellEnv(ctx, cwd),
                   timeout,
-                  description: params.description,
+                  description: params.description ?? params.command, // kilocode_change
                 },
                 ctx,
               )
```


## opencode Changes (224548d..ed3d364)

### Commits

- ed3d364 - chore: update nix node_modules hashes (opencode-agent[bot], 2026-04-22)
- a45d9a9 - fix(app): improve icon override handling in project edit dialog (#23768) (Brendan Allan, 2026-04-22)
- 69e2f3b - chore: bump Bun to 1.3.13 (#23791) (Luke Parker, 2026-04-22)
- 97f3c74 - feat: update codex plugin to support 5.5 (#23789) (Aiden Cline, 2026-04-22)
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
- `packages/opencode/src/tool/edit.ts` (+8, -6)
- `packages/opencode/src/tool/multiedit.ts` (+0, -61)
- `packages/opencode/src/tool/multiedit.txt` (+0, -41)
- `packages/opencode/src/tool/registry.ts` (+3, -3)
- `packages/opencode/src/tool/schema.ts` (+2, -3)

#### Agent System (packages/*/src/agent/)
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
- `nix/hashes.json` (+4, -4)
- `package.json` (+2, -2)
- `packages/app/package.json` (+1, -1)
- `packages/app/src/components/dialog-edit-project.tsx` (+19, -17)
- `packages/app/src/components/prompt-input.tsx` (+15, -4)
- `packages/app/src/components/settings-general.tsx` (+12, -0)
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
- `packages/app/src/pages/layout/sidebar-items.tsx` (+3, -1)
- `packages/app/src/pages/session/message-timeline.tsx` (+1, -1)
- `packages/console/app/package.json` (+1, -1)
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
- `packages/opencode/src/cli/cmd/github.ts` (+4, -2)
- `packages/opencode/src/cli/cmd/import.ts` (+2, -2)
- `packages/opencode/src/cli/cmd/tui/app.tsx` (+7, -1)
- `packages/opencode/src/cli/cmd/tui/routes/session/permission.tsx` (+6, -0)
- `packages/opencode/src/cli/cmd/tui/util/terminal.ts` (+39, -0)
- `packages/opencode/src/cli/upgrade.ts` (+1, -1)
- `packages/opencode/src/config/agent.ts` (+5, -10)
- `packages/opencode/src/config/config.ts` (+24, -16)
- `packages/opencode/src/config/mcp.ts` (+15, -12)
- `packages/opencode/src/config/permission.ts` (+38, -35)
- `packages/opencode/src/config/provider.ts` (+5, -4)
- `packages/opencode/src/config/server.ts` (+6, -4)
- `packages/opencode/src/control-plane/schema.ts` (+2, -3)
- `packages/opencode/src/lsp/lsp.ts` (+49, -54)
- `packages/opencode/src/lsp/server.ts` (+8, -8)
- `packages/opencode/src/plugin/codex.ts` (+1, -0)
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
- `packages/opencode/src/session/message-v2.ts` (+513, -393)
- `packages/opencode/src/session/prompt.ts` (+29, -49)
- `packages/opencode/src/session/schema.ts` (+4, -5)
- `packages/opencode/src/session/session.ts` (+3, -3)
- `packages/opencode/src/snapshot/index.ts` (+19, -19)
- `packages/opencode/src/sync/schema.ts` (+2, -3)
- `packages/opencode/src/util/effect-zod.ts` (+1, -40)
- `packages/opencode/src/util/named-schema-error.ts` (+54, -0)
- `packages/opencode/test/config/config.test.ts` (+21, -38)
- `packages/opencode/test/provider/transform.test.ts` (+34, -1)
- `packages/opencode/test/session/compaction.test.ts` (+1, -1)
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
- `packages/web/src/content/docs/ar/permissions.mdx` (+1, -1)
- `packages/web/src/content/docs/ar/tools.mdx` (+2, -2)
- `packages/web/src/content/docs/ar/zen.mdx` (+6, -2)
- `packages/web/src/content/docs/bs/permissions.mdx` (+1, -1)
- `packages/web/src/content/docs/bs/tools.mdx` (+2, -2)
- `packages/web/src/content/docs/bs/zen.mdx` (+7, -3)
- `packages/web/src/content/docs/da/permissions.mdx` (+1, -1)
- `packages/web/src/content/docs/da/tools.mdx` (+2, -2)
- `packages/web/src/content/docs/da/zen.mdx` (+7, -3)
- `packages/web/src/content/docs/de/permissions.mdx` (+1, -1)
- `packages/web/src/content/docs/de/tools.mdx` (+2, -2)
- `packages/web/src/content/docs/de/zen.mdx` (+6, -2)
- `packages/web/src/content/docs/es/permissions.mdx` (+1, -1)
- `packages/web/src/content/docs/es/tools.mdx` (+2, -2)
- `packages/web/src/content/docs/es/zen.mdx` (+7, -3)
- `packages/web/src/content/docs/fr/permissions.mdx` (+1, -1)
- `packages/web/src/content/docs/fr/tools.mdx` (+2, -2)
- `packages/web/src/content/docs/fr/zen.mdx` (+6, -2)
- `packages/web/src/content/docs/it/permissions.mdx` (+1, -1)
- `packages/web/src/content/docs/it/tools.mdx` (+2, -2)
- `packages/web/src/content/docs/it/zen.mdx` (+7, -3)
- `packages/web/src/content/docs/ja/permissions.mdx` (+1, -1)
- `packages/web/src/content/docs/ja/tools.mdx` (+2, -2)
- `packages/web/src/content/docs/ja/zen.mdx` (+6, -2)
- `packages/web/src/content/docs/ko/permissions.mdx` (+1, -1)
- `packages/web/src/content/docs/ko/tools.mdx` (+2, -2)
- `packages/web/src/content/docs/ko/zen.mdx` (+6, -2)
- `packages/web/src/content/docs/nb/permissions.mdx` (+1, -1)
- `packages/web/src/content/docs/nb/tools.mdx` (+2, -2)
- `packages/web/src/content/docs/nb/zen.mdx` (+7, -3)
- `packages/web/src/content/docs/permissions.mdx` (+1, -1)
- `packages/web/src/content/docs/pl/permissions.mdx` (+1, -1)
- `packages/web/src/content/docs/pl/tools.mdx` (+2, -2)
- `packages/web/src/content/docs/pl/zen.mdx` (+7, -3)
- `packages/web/src/content/docs/pt-br/permissions.mdx` (+1, -1)
- `packages/web/src/content/docs/pt-br/tools.mdx` (+2, -2)
- `packages/web/src/content/docs/pt-br/zen.mdx` (+6, -2)
- `packages/web/src/content/docs/ru/permissions.mdx` (+1, -1)
- `packages/web/src/content/docs/ru/tools.mdx` (+2, -2)
- `packages/web/src/content/docs/ru/zen.mdx` (+7, -3)
- `packages/web/src/content/docs/th/permissions.mdx` (+1, -1)
- `packages/web/src/content/docs/th/tools.mdx` (+2, -2)
- `packages/web/src/content/docs/th/zen.mdx` (+6, -2)
- `packages/web/src/content/docs/tools.mdx` (+2, -2)
- `packages/web/src/content/docs/tr/permissions.mdx` (+1, -1)
- `packages/web/src/content/docs/tr/tools.mdx` (+2, -2)
- `packages/web/src/content/docs/tr/zen.mdx` (+6, -2)
- `packages/web/src/content/docs/zen.mdx` (+7, -3)
- `packages/web/src/content/docs/zh-cn/permissions.mdx` (+1, -1)
- `packages/web/src/content/docs/zh-cn/tools.mdx` (+2, -2)
- `packages/web/src/content/docs/zh-cn/zen.mdx` (+6, -2)
- `packages/web/src/content/docs/zh-tw/permissions.mdx` (+1, -1)
- `packages/web/src/content/docs/zh-tw/tools.mdx` (+2, -2)
- `packages/web/src/content/docs/zh-tw/zen.mdx` (+6, -2)
- `sdks/vscode/package.json` (+1, -1)

### Key Diffs

#### packages/console/core/package.json
```diff
diff --git a/packages/console/core/package.json b/packages/console/core/package.json
index 3605cfb..090e5c5 100644
--- a/packages/console/core/package.json
+++ b/packages/console/core/package.json
@@ -1,7 +1,7 @@
 {
   "$schema": "https://json.schemastore.org/package.json",
   "name": "@opencode-ai/console-core",
-  "version": "1.14.19",
+  "version": "1.14.20",
   "private": true,
   "type": "module",
   "license": "MIT",
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

#### packages/opencode/src/tool/edit.ts
```diff
diff --git a/packages/opencode/src/tool/edit.ts b/packages/opencode/src/tool/edit.ts
index 2f53cd1..2c6c2c1 100644
--- a/packages/opencode/src/tool/edit.ts
+++ b/packages/opencode/src/tool/edit.ts
@@ -153,15 +153,17 @@ export const EditTool = Tool.define(
             }).pipe(Effect.orDie),
           )
 
+          let additions = 0
+          let deletions = 0
+          for (const change of diffLines(contentOld, contentNew)) {
+            if (change.added) additions += change.count || 0
+            if (change.removed) deletions += change.count || 0
+          }
           const filediff: Snapshot.FileDiff = {
             file: filePath,
             patch: diff,
-            additions: 0,
-            deletions: 0,
-          }
-          for (const change of diffLines(contentOld, contentNew)) {
-            if (change.added) filediff.additions += change.count || 0
-            if (change.removed) filediff.deletions += change.count || 0
+            additions,
+            deletions,
           }
 
           yield* ctx.metadata({
```

#### packages/opencode/src/tool/multiedit.ts
```diff
diff --git a/packages/opencode/src/tool/multiedit.ts b/packages/opencode/src/tool/multiedit.ts
deleted file mode 100644
index 004d3c8..0000000
--- a/packages/opencode/src/tool/multiedit.ts
+++ /dev/null
@@ -1,61 +0,0 @@
-import z from "zod"
-import { Effect } from "effect"
-import * as Tool from "./tool"
-import { EditTool } from "./edit"
-import DESCRIPTION from "./multiedit.txt"
-import path from "path"
-import { Instance } from "../project/instance"
-
-export const MultiEditTool = Tool.define(
-  "multiedit",
-  Effect.gen(function* () {
-    const editInfo = yield* EditTool
-    const edit = yield* editInfo.init()
-
-    return {
-      description: DESCRIPTION,
-      parameters: z.object({
-        filePath: z.string().describe("The absolute path to the file to modify"),
-        edits: z
-          .array(
-            z.object({
-              filePath: z.string().describe("The absolute path to the file to modify"),
-              oldString: z.string().describe("The text to replace"),
-              newString: z.string().describe("The text to replace it with (must be different from oldString)"),
-              replaceAll: z.boolean().optional().describe("Replace all occurrences of oldString (default false)"),
-            }),
-          )
-          .describe("Array of edit operations to perform sequentially on the file"),
-      }),
-      execute: (
-        params: {
-          filePath: string
-          edits: Array<{ filePath: string; oldString: string; newString: string; replaceAll?: boolean }>
-        },
-        ctx: Tool.Context,
-      ) =>
-        Effect.gen(function* () {
-          const results = []
-          for (const [, entry] of params.edits.entries()) {
-            const result = yield* edit.execute(
-              {
-                filePath: params.filePath,
-                oldString: entry.oldString,
-                newString: entry.newString,
```


*... and more files (showing first 5)*

## Recommendations

Based on the changes, the following files in Alexi should be reviewed:

- `src/agent/index.ts` - incorporate patterns from opencode packages/opencode/test/agent/agent.test.ts
- `src/core/` - review core changes from packages/kilo-vscode/src/services/autocomplete/continuedev/core/autocomplete/postprocessing/index.ts
- `src/core/` - review core changes from packages/kilo-vscode/src/services/autocomplete/continuedev/core/autocomplete/templating/AutocompleteTemplate.ts
- `src/tool/bash.ts` - update based on kilocode packages/opencode/src/tool/bash.ts changes
- `src/tool/edit.ts` - update based on opencode packages/opencode/src/tool/edit.ts changes
- `src/tool/multiedit.ts` - update based on opencode packages/opencode/src/tool/multiedit.ts changes
- `src/tool/multiedit.txt.ts` - update based on opencode packages/opencode/src/tool/multiedit.txt changes
- `src/tool/registry.ts` - update based on opencode packages/opencode/src/tool/registry.ts changes
- `src/tool/schema.ts` - update based on opencode packages/opencode/src/tool/schema.ts changes
