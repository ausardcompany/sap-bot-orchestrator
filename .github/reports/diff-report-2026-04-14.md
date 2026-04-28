# Upstream Changes Report
Generated: 2026-04-14 07:48:37

## Summary
- kilocode: 219 commits, 460 files changed
- opencode: 49 commits, 172 files changed

## kilocode Changes (bd494f669..ba7b123f0)

### Commits

- ba7b123f0 - chore: update nix node_modules hashes (kilo-maintainer[bot], 2026-04-14)
- 02aec080c - Merge pull request #8870 from Kilo-Org/imanolmaiztegui/kilo-opencode-v1.3.14 (Catriel Müller, 2026-04-14)
- 1606d6439 - fix: kilo models test (Catriel Müller, 2026-04-14)
- 528ec937a - refactor: fix home test config mocks (Catriel Müller, 2026-04-14)
- d7515f6ae - refactor: fix prompt / config tests (Catriel Müller, 2026-04-14)
- da2ecc1ad - Merge pull request #8880 from Kilo-Org/docs/add-gas-town-architecture (Joshua Lambert, 2026-04-14)
- a3721046b - refactor: disable filewatcher on windows (Catriel Müller, 2026-04-14)
- 52583cd86 - fix: test workflow (Catriel Müller, 2026-04-14)
- 98d60f176 - fix: test workflow concurrency (Catriel Müller, 2026-04-14)
- ac99bb5fb - fix: test workflow (Catriel Müller, 2026-04-14)
- 8983b3119 - refactor: update bun (Catriel Müller, 2026-04-14)
- a8607965b - Merge branch 'main' into imanolmaiztegui/kilo-opencode-v1.3.14 (Catriel Müller, 2026-04-13)
- da8f05ec7 - fix: core tests (Catriel Müller, 2026-04-13)
- b582097c0 - docs(architecture): add Gas Town section to architecture overview (Josh Lambert, 2026-04-13)
- dc2ad42ba - chore: update nix node_modules hashes (kilo-maintainer[bot], 2026-04-13)
- ad74e9bf8 - release: v7.2.5 (kilo-maintainer[bot], 2026-04-13)
- 9eef72a96 - fix: git identity (Catriel Müller, 2026-04-13)
- d333e5f2e - fix: turbo naming (Catriel Müller, 2026-04-13)
- 3ce74d2e7 - fix: bun lock (Catriel Müller, 2026-04-13)
- 39d25be32 - chore(source-links): exclude GitHub Copilot API from extracted URLs (Imanol Maiztegui, 2026-04-13)
- 2e62d226d - docs(kilo-docs): update source links for copilot plugin and config renames (Imanol Maiztegui, 2026-04-13)
- 17b7f6807 - style(vscode): fix indentation and formatting in legacy migration and popup selector (Imanol Maiztegui, 2026-04-13)
- 5cf58383f - feat(i18n): add session review and diff UI translation keys across all locales (Imanol Maiztegui, 2026-04-13)
- bfec6b794 - Merge branch 'main' into imanolmaiztegui/kilo-opencode-v1.3.14 (Catriel Müller, 2026-04-13)
- 615dcc743 - fix(cli): restore kilo branding in terminal wordmark (Imanol Maiztegui, 2026-04-13)
- 7fb55e45f - refactor: align kilo codebase with opencode v1.3.14 upstream (Imanol Maiztegui, 2026-04-13)
- 6d224ad39 - resolve merge conflicts (Imanol Maiztegui, 2026-04-13)
- 7ed73a1d5 - Merge pull request #8829 from Kilo-Org/mark/changeset-release-notes (Mark IJbema, 2026-04-13)
- 1a07abc77 - docs(kilo-docs): address Agent Manager PR badge review feedback (#8859) (Marius, 2026-04-13)
- e5a933d8f - feat(agent-manager): add run script feature for worktrees (#8730) (Marius, 2026-04-13)
- 57de92099 - chore(vscode): normalize CHANGELOG.md formatting for changesets (Mark IJbema, 2026-04-13)
- 136095392 - fix(vscode): hide git-only sidebar controls without vcs (#8739) (Marius, 2026-04-13)
- e17af6762 - Merge branch 'main' into mark/changeset-release-notes (Mark IJbema, 2026-04-13)
- 9a023e8db - fix: preserve changelog script (Catriel Müller, 2026-04-13)
- bff2aa955 - docs(kilo-docs): address Agent Manager PR badge review feedback (#8859) (Marius, 2026-04-13)
- 49361d056 - feat(agent-manager): add run script feature for worktrees (#8730) (Marius, 2026-04-13)
- bcb009807 - create changelog file (Mark IJbema, 2026-04-13)
- 7e6132cd2 - Merge pull request #8862 from Kilo-Org/mark/changelog-formatting (Mark IJbema, 2026-04-13)
- 59ffa08ec - chore(vscode): normalize CHANGELOG.md formatting for changesets (Mark IJbema, 2026-04-13)
- fc9595bcb - fix(vscode): hide git-only sidebar controls without vcs (#8739) (Marius, 2026-04-13)
- 26e2e3339 - feat: custom changelog generator that skips team member attribution (Mark IJbema, 2026-04-13)
- c83012a6d - chore: add @kilocode/cli to opencode changesets (Mark IJbema, 2026-04-13)
- 3dbd16f11 - chore: remove editor-name-header changeset (Mark IJbema, 2026-04-13)
- 4937759bf - chore: add changesets for recent merged PRs (Mark IJbema, 2026-04-13)
- d69200ec0 - fix: read changelog from packages/kilo-vscode/ where changesets writes it (Mark IJbema, 2026-04-13)
- c75f56ffa - fix: log changeset version failures instead of silently suppressing (Mark IJbema, 2026-04-13)
- e199c0e0f - feat: integrate changesets into existing publish.yml release flow (Mark IJbema, 2026-04-13)
- c5115afd2 - fix: update bun.lock and add lockfile refresh to changeset:version script (Mark IJbema, 2026-04-13)
- 8d09c7474 - feat: add changeset release notes workflow (kiloconnect[bot], 2026-04-13)
- aa6b4df0c - Merge pull request #8853 from Kilo-Org/mark/backfill-changelog (Mark IJbema, 2026-04-13)
- 9c8ab2302 - docs(kilo-docs): expand PR status badge documentation for Agent Manager (#8734) (Marius, 2026-04-13)
- 42ec0585a - Merge pull request #8593 from Kilo-Org/fix/commit-message-auto-connect (Mark IJbema, 2026-04-13)
- 348a42edb - Merge branch 'main' into fix/commit-message-auto-connect (Mark IJbema, 2026-04-13)
- 320cdb91e - Merge pull request #8856 from Kilo-Org/christiaan/openai-reasoning (Christiaan Arnoldus, 2026-04-13)
- 8f00bcf6b - vscode: integrate contributor credits inline and remove verbose Thank You sections (Mark IJbema, 2026-04-13)
- 3a0506403 - vscode: rewrite 7.x changelog to consolidate commit-level noise into user-facing entries (Mark IJbema, 2026-04-13)
- a92b7bb62 - Fix reasoning toggle not working for some Responses API models (Christiaan Arnoldus, 2026-04-13)
- bcafd7a24 - refactor: kilo compat for v1.3.14 (Imanol Maiztegui, 2026-04-13)
- bee4ad12e - vscode: remove internal/technical noise from 7.x changelog entries (Mark IJbema, 2026-04-13)
- f259d04ed - Merge pull request #8854 from Kilo-Org/imanolmaiztegui/kilo-opencode-v1.3.13 (Imanol Maiztegui, 2026-04-13)
- 0fa0b7f24 - Merge remote-tracking branch 'origin/main' into fix/commit-message-auto-connect (Mark IJbema, 2026-04-13)
- f635557b6 - vscode: backfill changelog with 7.x releases and legacy 5.x history (Mark IJbema, 2026-04-13)
- 747b820d6 - resolve merge conflicts (Imanol Maiztegui, 2026-04-13)
- df2908b57 - Merge pull request #8816 from Kilo-Org/docs/fix-openai-compatible-cli-config (Joshua Lambert, 2026-04-13)
- 5ca0f6d51 - Apply suggestion from @kilo-code-bot[bot] (Joshua Lambert, 2026-04-13)
- 2b583013d - refactor: kilo compat for v1.3.13 (Imanol Maiztegui, 2026-04-13)
- 9ec96a3cc - Merge pull request #8845 from Kilo-Org/imanolmaiztegui/kilo-opencode-v1.3.12 (Imanol Maiztegui, 2026-04-13)
- ade788ebc - resolve merge conflicts (Imanol Maiztegui, 2026-04-13)
- ce642ac34 - refactor(vscode): use getClientAsync in AutocompleteModel instead of manual state checks (Mark IJbema, 2026-04-13)
- 3202375a3 - refactor: kilo compat for v1.3.12 (Imanol Maiztegui, 2026-04-13)
- 40cf7ae5f - Merge pull request #8843 from Kilo-Org/imanolmaiztegui/kilo-opencode-v1.3.11 (Imanol Maiztegui, 2026-04-13)
- 16d2ebd36 - test(tool): add models-api fixture for provider testing (Imanol Maiztegui, 2026-04-13)
- 1d057a51a - chore: rebrand kimi prompt to Kilo and remove models-api fixture (Imanol Maiztegui, 2026-04-13)
- f4eaacfa5 - resolve merge conflicts (Imanol Maiztegui, 2026-04-13)
- c1e672f4b - fix: improve Azure provider config handling and GPT-5.4 reasoning variants (#8566) (Geir Mjosund, 2026-04-13)
- c0b0efa6d - Merge pull request #8835 from Kilo-Org/refactor/extract-settings-css (Mark IJbema, 2026-04-13)
- 4ff09d8c8 - refactor: kilo compat for v1.3.11 (Imanol Maiztegui, 2026-04-13)
- ab6b9ab03 - Merge pull request #8834 from Kilo-Org/johnnyamancio/kilo-opencode-v1.3.10 (Imanol Maiztegui, 2026-04-13)
- 38b8796cc - fix(provider): preserve additional model properties during merge (Imanol Maiztegui, 2026-04-13)
- 19ec5ff95 - refactor(vscode): split chat styles into component files (kiloconnect[bot], 2026-04-13)
- 1e2bb0de4 - fix(vscode): import settings.css in Storybook preview (kiloconnect[bot], 2026-04-13)
- 460dee7ff - refactor(vscode): extract settings CSS from chat.css to settings.css (kiloconnect[bot], 2026-04-13)
- b3df82a25 - Merge pull request #8830 from Kilo-Org/fix/vscode-editor-name-header (Christiaan Arnoldus, 2026-04-13)
- 2195ed5f6 - fix: Rename opencode to kilo (Johnny Amancio, 2026-04-13)
- 12a56f519 - Merge remote-tracking branch 'origin/main' into johnnyamancio/kilo-opencode-v1.3.10 (Johnny Amancio, 2026-04-13)
- 32e244bb0 - resolve merge conflicts (Johnny Amancio, 2026-04-13)
- 7c7289256 - fix(vscode): pass full editor name verbatim to avoid corrupting User-Agent version (kiloconnect[bot], 2026-04-13)
- 5ad9fcc8b - Merge pull request #8764 from Kilo-Org/docs/update-autocomplete-docs (Mark IJbema, 2026-04-13)
- f654d44cf - fix(vscode): include VS Code name and version in editor name header (kiloconnect[bot], 2026-04-13)
- c53e93588 - Merge pull request #8822 from Kilo-Org/mark/tooltip-subsession-aggregation (Mark IJbema, 2026-04-13)
- c65c56e2c - docs(cli): document how to disable built-in providers (#8702) (Joshua Lambert, 2026-04-13)
- 96daf25e5 - chore(kilo-docs): refresh source-links.md (Mark IJbema, 2026-04-13)
- 22e009c46 - fix(vscode): remove dead guard in collapseCostBreakdown (Mark IJbema, 2026-04-13)
- 097211d54 - chore(vscode): bump KiloProvider max-lines to 3350 (Mark IJbema, 2026-04-13)
- 8d423e393 - test(vscode): add snapshot tests for collapseCostBreakdown tooltip behavior (kiloconnect[bot], 2026-04-13)
- c6cab10bb - fix(vscode): reverse and aggregate subsession costs in TaskHeader tooltip (kiloconnect[bot], 2026-04-13)
- 550ff7987 - docs(kilo-docs): clarify current model limitation alongside future plans (kiloconnect[bot], 2026-04-13)
- 1a5dfe2e9 - docs(kilo-docs): soften provider/model language for autocomplete (kiloconnect[bot], 2026-04-13)
- a0f06e787 - docs(kilo-docs): fix status bar tooltip wording per review (kiloconnect[bot], 2026-04-13)
- d632c2390 - docs(kilo-docs): remove api/npm fields from reference, soften limit requirement (kiloconnect[bot], 2026-04-13)
- f0539a59e - docs(kilo-docs): fix api field description and remove incorrect example value (kiloconnect[bot], 2026-04-13)
- ac396c0af - docs(kilo-docs): fix CLI config example for OpenAI-compatible providers (kiloconnect[bot], 2026-04-13)
- 1bf073f9c - refactor: kilo compat for v1.3.10 (Johnny Amancio, 2026-04-12)
- 2607603f3 - docs(kilo-docs): update autocomplete docs for VSCode vs Legacy differences (kiloconnect[bot], 2026-04-11)
- a12ae3fa8 - fix(vscode): accept optional dir in getClientAsync, pass repo path from commit message command (kiloconnect[bot], 2026-04-08)
- 1ecd016b9 - fix(vscode): remove unused KiloClient type annotation after getClientAsync refactor (kiloconnect[bot], 2026-04-08)
- 0a35b3a9e - refactor(vscode): simplify commit message command to use getClientAsync() (kiloconnect[bot], 2026-04-08)
- bedd10297 - feat(vscode): add getClientAsync() to KiloConnectionService for lazy auto-connect (kiloconnect[bot], 2026-04-08)
- ca4cfb0c5 - test(vscode): update commit message tests for auto-connect behaviour (kiloconnect[bot], 2026-04-08)
- 1f03f6eaf - feat(kilo-vscode): auto-connect to Kilo backend when client is missing (kiloconnect[bot], 2026-04-08)
- cc50b778e - release: v1.3.14 (opencode, 2026-04-04)
- 00fa68b3a - fix(ci): create JUnit output dirs before tests (#20959) (Kit Langton, 2026-04-03)
- 288eb044c - perf(opencode): batch snapshot diffFull blob reads (#20752) (Kit Langton, 2026-04-04)
- 59ca4543d - refactor(provider): stop custom loaders using facades (#20776) (Kit Langton, 2026-04-04)
- 650d0dbe5 - chore: generate (opencode-agent[bot], 2026-04-03)
- a5ec741cf - notes on v2 (#20941) (Sebastian, 2026-04-04)
- fff98636f - chore: rm models snapshot (#20929) (Aiden Cline, 2026-04-03)
- c72642dd3 - test(ci): publish unit reports in actions (#20547) (Kit Langton, 2026-04-03)
- f2d4ced8e - refactor(effect): build todowrite tool from Todo service (#20789) (Kit Langton, 2026-04-03)
- ae7e2eb3f - chore(app): remove queued follow-ups for now (Adam, 2026-04-03)
- a32ffaba3 - fix(app): show correct submit icon when typing follow up (Adam, 2026-04-03)
- a4e75a079 - chore: generate (opencode-agent[bot], 2026-04-03)
- 35350b1d2 - feat: restore git-backed review modes (#20845) (Shoubhit Dash, 2026-04-03)
- 263dcf75b - fix: restore prompt focus after footer selection (#20841) (Shoubhit Dash, 2026-04-03)
- 7994dce0f - refactor(effect): resolve built tools through the registry (#20787) (Kit Langton, 2026-04-03)
- fbfa148e4 - fix(app): hide default session timestamps (#20892) (Shoubhit Dash, 2026-04-03)
- 9d57f21f9 - feat(ui): redesign modified files section in session turn (#20348) (Shoubhit Dash, 2026-04-03)
- 3deee3a02 - fix(session): disable todo dock auto-scroll (#20840) (Shoubhit Dash, 2026-04-03)
- 2002f08f2 - fix(prompt): unmount model controls in shell mode (#20886) (Shoubhit Dash, 2026-04-03)
- c307505f8 - fix(session): delay jump-to-bottom button (#20853) (Shoubhit Dash, 2026-04-03)
- 6359d00fb - fix(core): fix restoring earlier messages in a reverted chain (#20780) (Nate Williams, 2026-04-03)
- b969066a2 - electron: better menus (#20878) (Brendan Allan, 2026-04-03)
- 500dcfc58 - chore: update nix node_modules hashes (opencode-agent[bot], 2026-04-03)
- 7b8dc8065 - fix(sdk): handle Windows opencode spawn and shutdown (#20772) (Luke Parker, 2026-04-03)
- e89527c9f - feat: Send x-session-affinity and x-parent-session-id headers (#20744) (Kevin Flansburg, 2026-04-02)
- aa2239d5d - add automatic heap snapshots for high-memory cli processes (#20788) (Dax, 2026-04-03)
- 8daeacc98 - chore: generate (opencode-agent[bot], 2026-04-03)
- 81d3ac3bf - fix: prevent Tool.define() wrapper accumulation on object-defined tools (#16952) (Juan Pablo Carranza Hurtado, 2026-04-02)
- eb6f1dada - fix: call models.dev once instead of twice on start (#20765) (Luke Parker, 2026-04-03)
- 8e9e79d27 - refactor(share): effectify share next (#20596) (Kit Langton, 2026-04-03)
- 38014fe44 - fix: rm dynamic part from bash tool description again to restore cache hits across projects (#20771) (Aiden Cline, 2026-04-03)
- 8942fc21a - refactor(effect): prune unused facades (#20748) (Kit Langton, 2026-04-02)
- 7f45943a9 - fix(opencode): honor model limit.input overrides (#16306) (ykswang, 2026-04-03)
- 6e1400fc4 - dialog aware prompt cursor (#20753) (Sebastian, 2026-04-02)
- bf26c08d5 - chore: update nix node_modules hashes (opencode-agent[bot], 2026-04-02)
- 29f7dc073 - Adds TUI prompt traits, refs, and plugin slots (#20741) (Sebastian, 2026-04-02)
- 5e1b51352 - refactor(todo): effectify session todo (#20595) (Kit Langton, 2026-04-02)
- f549fde87 - test(app): emit junit artifacts for playwright (#20732) (Kit Langton, 2026-04-02)
- 6dfb30448 - refactor(app): unexport internal e2e helpers (#20730) (Kit Langton, 2026-04-02)
- b5b5f7e01 - test(opencode): remove temporary e2e url repro (#20729) (Kit Langton, 2026-04-02)
- ae7b49b03 - docs(effect): refresh migration status (#20665) (Kit Langton, 2026-04-02)
- f151c660b - chore: update nix node_modules hashes (opencode-agent[bot], 2026-04-02)
- c3ef69c86 - test(app): add a golden path for mocked e2e prompts (#20593) (Kit Langton, 2026-04-02)
- 363891126 - chore: generate (opencode-agent[bot], 2026-04-02)
- 1989704ab - feat(acp): Add messageID and emit user_message_chunk on prompt/command (#18625) (Noam Bressler, 2026-04-02)
- f0a9ebfed - chore: generate (opencode-agent[bot], 2026-04-02)
- 7e32f80d8 - feat: add macOS managed preferences support for enterprise MDM deployments (#19178) (Lenny Vaknine, 2026-04-02)
- 966d9cfa4 - electron: add basic context menu for inspect element (#20723) (Brendan Allan, 2026-04-02)
- 92e820fdc - go: add mimo (Frank, 2026-04-02)
- c4b397154 - app: unify auto scroll ref handling (#20716) (Brendan Allan, 2026-04-02)
- 3faabdadb - refactor(format): update formatter interface to return command from enabled() (#20703) (Dax, 2026-04-02)
- 93a139315 - Add MiMo-V2 models to Go UI and docs (#20709) (Jack, 2026-04-02)
- 10ca1ace6 - tweak: add abort signal timeout to the github copilot model fetch to prevent infinite blocking (#20705) (Aiden Cline, 2026-04-02)
- c3dfd08ba - fix(format): use biome format instead of check to prevent import removal (#20545) (Burak Yigit Kaya, 2026-04-02)
- 510a1e814 - ignore: fix typecheck in dev (#20702) (Aiden Cline, 2026-04-02)
- 159ede2d5 - chore: generate (opencode-agent[bot], 2026-04-02)
- 291a857fb - feat: add optional messageID to ShellInput (#20657) (Noam Bressler, 2026-04-02)
- 57a5236e7 - chore: generate (opencode-agent[bot], 2026-04-02)
- 23c865608 - refactor: split up models.dev and config model definitions to prevent coupling (#20605) (Aiden Cline, 2026-04-02)
- ec3ae17e4 - chore: update nix node_modules hashes (opencode-agent[bot], 2026-04-02)
- 69d047ae7 - cleanup event listeners with solid-primitives/event-listener (#20619) (Brendan Allan, 2026-04-02)
- 327f62526 - use solid-primitives/resize-observer across web code (#20613) (Brendan Allan, 2026-04-02)
- d540d363a - refactor: simplify solid reactivity across app and web (#20497) (Shoubhit Dash, 2026-04-02)
- db9389137 - zen: friendly trial ended message (Frank, 2026-04-02)
- 0f488996b - fix(node): set OPENCODE_CHANNEL during build (#20616) (Brendan Allan, 2026-04-02)
- a6f524ca0 - chore: update nix node_modules hashes (opencode-agent[bot], 2026-04-02)
- 811c7e249 - cli: update usage exceeded error (Frank, 2026-04-02)
- ebaa99aba - chore: generate (opencode-agent[bot], 2026-04-02)
- d66e6dc25 - feat(opencode): Add Venice AI package as dependency (#20570) (dpuyosa, 2026-04-01)
- 336d28f11 - fix(cli): restore colored help logo (#20592) (Kit Langton, 2026-04-02)
- 916afb522 - refactor(account): share token freshness helper (#20591) (Kit Langton, 2026-04-02)
- 5daf2fa7f - fix(session): compaction agent responds in same language as conversation (#20581) (Aaron Zhu, 2026-04-01)
- 733a3bd03 - fix(core): prevent agent loop from stopping after tool calls with OpenAI-compatible providers (#14973) (Valentin Vivaldi, 2026-04-01)
- 2e8e27844 - fix(cli): use simple logo in CLI (#20585) (Kit Langton, 2026-04-02)
- 0bae38c06 - refactor(instruction): migrate to Effect service pattern (#20542) (Kit Langton, 2026-04-01)
- a09b08672 - test(app): block real llm calls in e2e prompts (#20579) (Kit Langton, 2026-04-01)
- 6314f09c1 - release: v1.3.13 (opencode, 2026-04-01)
- 4b4b7832a - upgrade opentui to 0.1.95 (#20369) (Sebastian, 2026-04-01)
- 428030701 - chore: update nix node_modules hashes (opencode-agent[bot], 2026-03-31)
- 9b09a7e76 - chore: generate (opencode-agent[bot], 2026-03-31)
- 3fc0367b9 - refactor(session): effectify SessionRevert service (#20143) (Kit Langton, 2026-03-31)
- 954a6ca88 - refactor(session): effectify SessionSummary service (#20142) (Kit Langton, 2026-03-31)
- 0c03a3ee1 - test: migrate prompt tests to HTTP mock LLM server (#20304) (Kit Langton, 2026-03-31)
- 53330a518 - Update VOUCHED list (github-actions[bot], 2026-03-31)
- 892bdebaa - release: v1.3.12 (opencode, 2026-03-31)
- 18121300f - upgrade opentui to 0.1.94 (#20357) (Sebastian, 2026-03-31)
- d6d4446f4 - Update VOUCHED list (github-actions[bot], 2026-03-31)
- 26cc924ea - feat: enable prompt caching and cache token tracking for google-vertex-anthropic (#20266) (Major Hayden, 2026-03-31)
- 4dd866d5c - fix: rm exclusion of ai-sdk/azure in transform.ts, when we migrated to v6 the ai sdk changed the key for ai-sdk/azure so the exclusion is no longer needed (#20326) (Aiden Cline, 2026-03-31)
- beab4cc2c - release: v1.3.11 (opencode, 2026-03-31)
- 567a91191 - refactor(session): simplify LLM stream by replacing queue with fromAsyncIterable (#20324) (Dax, 2026-03-31)
- 434d82bbe - test: update model test fixture (#20182) (Aiden Cline, 2026-03-31)
- 2929774ac - chore: rm harcoded model definition from codex plugin (#20294) (Aiden Cline, 2026-03-31)
- 6e61a46a8 - chore: skip 2 tests (Adam, 2026-03-31)
- 2daf4b805 - feat: add a dedicated system prompt for Kimi models (#20259) (Yuxin Dong, 2026-03-31)
- 7342e650c - chore: update nix node_modules hashes (opencode-agent[bot], 2026-03-31)
- 8c2e2ecc9 - chore: e2e model (Adam, 2026-03-31)
- 25a2b739e - warn only and ignore plugins without entrypoints, default config via exports (#20284) (Sebastian, 2026-03-31)
- 85c16926c - chore: use paid zen model in e2e (Adam, 2026-03-31)
- 2e78fdec4 - ensure pinned plugin versions and do not run package scripts on install (#20248) (Sebastian, 2026-03-31)
- 1fcb920eb - upgrade opentui to 0.1.93 (#19950) (Sebastian, 2026-03-31)
- b1e89c344 - release: v1.3.10 (opencode, 2026-03-31)
- befbedacd - fix(session): subagents not being clickable (#20263) (Dax, 2026-03-31)
- 2cc738fb1 - wip: zen (Frank, 2026-03-31)
- 71b20698b - chore: generate (opencode-agent[bot], 2026-03-31)
- 3df18dcde - refactor(provider): effectify Provider service (#20160) (Kit Langton, 2026-03-30)
- a898c2ea3 - refactor(storage): effectify Storage service (#20132) (Kit Langton, 2026-03-31)
- bf777298c - fix(theme): darken muted text in catppuccin tui themes (#20161) (Kit Langton, 2026-03-30)
- 93fad99f7 - smarter changelog (#20138) (Luke Parker, 2026-03-31)

### Changed Files by Category

#### Tool System (packages/*/src/tool/)
- `packages/opencode/src/tool/bash.ts` (+62, -66)
- `packages/opencode/src/tool/bash.txt` (+1, -1)
- `packages/opencode/src/tool/question.ts` (+36, -23)
- `packages/opencode/src/tool/read.ts` (+2, -2)
- `packages/opencode/src/tool/registry.ts` (+183, -146)
- `packages/opencode/src/tool/todo.ts` (+40, -23)
- `packages/opencode/src/tool/tool.ts` (+56, -36)
- `packages/opencode/test/tool/bash.test.ts` (+117, -2)
- `packages/opencode/test/tool/fixtures/models-api.json` (+53554, -26788)
- `packages/opencode/test/tool/question.test.ts` (+63, -45)
- `packages/opencode/test/tool/recall.test.ts` (+6, -11)
- `packages/opencode/test/tool/tool-define.test.ts` (+101, -0)
- `packages/opencode/test/tool/truncation.test.ts` (+1, -1)

#### Agent System (packages/*/src/agent/)
- `packages/opencode/src/agent/agent.ts` (+5, -3)
- `packages/opencode/src/agent/prompt/compaction.txt` (+1, -0)

#### Permission System (**/permission/)
- `packages/opencode/src/permission/index.ts` (+10, -7)
- `packages/opencode/test/kilocode/permission/next.always-rules.test.ts` (+17, -5)
- `packages/opencode/test/permission/next.test.ts` (+15, -1)

#### Event Bus (**/bus/, **/event/)
- `packages/opencode/src/bus/index.ts` (+14, -13)
- `packages/opencode/test/bus/bus-effect.test.ts` (+5, -5)

#### Core (**/core/)
(no changes)

#### Other Changes
- `.changeset/README.md` (+25, -0)
- `.changeset/config.json` (+11, -0)
- `.changeset/opencode-1310.md` (+10, -0)
- `.changeset/opencode-136.md` (+9, -0)
- `.changeset/opencode-137.md` (+10, -0)
- `.changeset/subsession-costs.md` (+5, -0)
- `.github/workflows/publish.yml` (+5, -0)
- `.github/workflows/test.yml` (+39, -4)
- `.gitignore` (+4, -0)
- `.kilo/package-lock.json` (+31, -0)
- `.kilocode/package-lock.json` (+31, -0)
- `.opencode/command/changelog.md` (+10, -8)
- `.opencode/plugins/tui-smoke.tsx` (+53, -7)
- `bun.lock` (+474, -112)
- `nix/hashes.json` (+4, -4)
- `package.json` (+10, -4)
- `packages/app/e2e/AGENTS.md` (+7, -8)
- `packages/app/e2e/actions.ts` (+92, -165)
- `packages/app/e2e/backend.ts` (+137, -0)
- `packages/app/e2e/fixtures.ts` (+527, -77)
- `packages/app/e2e/models/model-picker.spec.ts` (+1, -3)
- `packages/app/e2e/projects/project-edit.spec.ts` (+43, -38)
- `packages/app/e2e/projects/projects-close.spec.ts` (+34, -40)
- `packages/app/e2e/projects/projects-switch.spec.ts` (+57, -80)
- `packages/app/e2e/projects/workspace-new-session.spec.ts` (+16, -33)
- `packages/app/e2e/projects/workspaces.spec.ts` (+250, -270)
- `packages/app/e2e/prompt/mock.ts` (+15, -0)
- `packages/app/e2e/prompt/prompt-async.spec.ts` (+7, -29)
- `packages/app/e2e/prompt/prompt-footer-focus.spec.ts` (+88, -0)
- `packages/app/e2e/prompt/prompt-history.spec.ts` (+93, -131)
- `packages/app/e2e/prompt/prompt-shell.spec.ts` (+36, -27)
- `packages/app/e2e/prompt/prompt-slash-share.spec.ts` (+8, -6)
- `packages/app/e2e/prompt/prompt.spec.ts` (+8, -35)
- `packages/app/e2e/selectors.ts` (+2, -13)
- `packages/app/e2e/session/session-child-navigation.spec.ts` (+25, -15)
- `packages/app/e2e/session/session-composer-dock.spec.ts` (+348, -234)
- `packages/app/e2e/session/session-model-persistence.spec.ts` (+66, -109)
- `packages/app/e2e/session/session-review.spec.ts` (+175, -161)
- `packages/app/e2e/session/session-undo-redo.spec.ts` (+141, -144)
- `packages/app/e2e/session/session.spec.ts` (+29, -23)
- `packages/app/e2e/settings/settings.spec.ts` (+13, -3)
- `packages/app/e2e/sidebar/sidebar-popover-actions.spec.ts` (+38, -47)
- `packages/app/e2e/terminal/terminal-reconnect.spec.ts` (+22, -23)
- `packages/app/e2e/terminal/terminal-tabs.spec.ts` (+122, -125)
- `packages/app/e2e/utils.ts` (+7, -7)
- `packages/app/package.json` (+4, -2)
- `packages/app/playwright.config.ts` (+6, -1)
- `packages/app/script/e2e-local.ts` (+1, -1)
- `packages/app/src/components/debug-bar.tsx` (+2, -2)
- `packages/app/src/components/dialog-select-model.tsx` (+20, -15)
- `packages/app/src/components/prompt-input.tsx` (+116, -87)
- `packages/app/src/components/prompt-input/attachments.ts` (+5, -10)
- `packages/app/src/components/prompt-input/build-request-parts.test.ts` (+24, -0)
- `packages/app/src/components/prompt-input/build-request-parts.ts` (+26, -0)
- `packages/app/src/components/prompt-input/submit.ts` (+3, -0)
- `packages/app/src/components/server/server-row.tsx` (+3, -6)
- `packages/app/src/components/settings-general.tsx` (+0, -23)
- `packages/app/src/components/settings-keybinds.tsx` (+2, -2)
- `packages/app/src/context/command.tsx` (+2, -5)
- `packages/app/src/context/global-sdk.tsx` (+10, -14)
- `packages/app/src/context/global-sync/bootstrap.ts` (+1, -1)
- `packages/app/src/context/global-sync/event-reducer.test.ts` (+6, -4)
- `packages/app/src/context/global-sync/event-reducer.ts` (+2, -2)
- `packages/app/src/context/layout.tsx` (+3, -4)
- `packages/app/src/context/settings.tsx` (+10, -2)
- `packages/app/src/i18n/de.ts` (+1, -2)
- `packages/app/src/i18n/en.ts` (+2, -0)
- `packages/app/src/i18n/fr.ts` (+2, -4)
- `packages/app/src/i18n/th.ts` (+1, -2)
- `packages/app/src/i18n/tr.ts` (+2, -4)
- `packages/app/src/i18n/zht.ts` (+1, -2)
- `packages/app/src/pages/layout.tsx` (+7, -14)
- `packages/app/src/pages/layout/sidebar-items.tsx` (+42, -39)
- `packages/app/src/pages/session.tsx` (+247, -48)
- `packages/app/src/pages/session/composer/session-composer-region.tsx` (+3, -6)
- `packages/app/src/pages/session/composer/session-composer-state.ts` (+2, -2)
- `packages/app/src/pages/session/composer/session-question-dock.tsx` (+118, -10)
- `packages/app/src/pages/session/composer/session-todo-dock.tsx` (+5, -57)
- `packages/app/src/pages/session/file-tabs.tsx` (+19, -24)
- `packages/app/src/pages/session/helpers.ts` (+4, -8)
- `packages/app/src/pages/session/message-timeline.tsx` (+12, -10)
- `packages/app/src/pages/session/review-tab.tsx` (+11, -13)
- `packages/app/src/pages/session/session-side-panel.tsx` (+22, -36)
- `packages/app/src/pages/session/terminal-panel.tsx` (+3, -6)
- `packages/app/src/pages/session/use-session-commands.tsx` (+1, -5)
- `packages/app/src/testing/prompt.ts` (+27, -0)
- `packages/app/src/testing/terminal.ts` (+1, -0)
- `packages/app/src/utils/session-title.ts` (+7, -0)
- `packages/app/test/e2e/mock.test.ts` (+66, -0)
- `packages/app/test/e2e/no-real-llm.test.ts` (+27, -0)
- `packages/desktop-electron/package.json` (+2, -1)
- `packages/desktop-electron/src/main/cli.ts` (+10, -7)
- `packages/desktop-electron/src/main/index.ts` (+3, -0)
- `packages/desktop-electron/src/main/menu.ts` (+27, -8)
- `packages/desktop-electron/src/main/shell-env.test.ts` (+43, -0)
- `packages/desktop-electron/src/main/shell-env.ts` (+88, -0)
- `packages/desktop/package.json` (+1, -1)
- `packages/extensions/zed/extension.toml` (+6, -6)
- `packages/kilo-docs/package.json` (+1, -1)
- `packages/kilo-docs/pages/ai-providers/index.md` (+22, -0)
- `packages/kilo-docs/pages/ai-providers/openai-compatible.md` (+45, -13)
- `packages/kilo-docs/pages/automate/agent-manager.md` (+46, -6)
- `packages/kilo-docs/pages/code-with-ai/features/autocomplete/index.md` (+26, -11)
- `packages/kilo-docs/pages/code-with-ai/features/autocomplete/mistral-setup.md` (+2, -2)
- `packages/kilo-docs/pages/code-with-ai/platforms/cli-reference.md` (+1, -1)
- `packages/kilo-docs/pages/contributing/architecture/index.md` (+26, -1)
- `packages/kilo-docs/source-links.md` (+6, -8)
- `packages/kilo-gateway/package.json` (+1, -1)
- `packages/kilo-gateway/src/headers.ts` (+6, -4)
- `packages/kilo-gateway/tsconfig.json` (+1, -0)
- `packages/kilo-i18n/package.json` (+1, -1)
- `packages/kilo-telemetry/package.json` (+1, -1)
- `packages/kilo-telemetry/tsconfig.json` (+1, -0)
- `packages/kilo-ui/package.json` (+1, -1)
- `packages/kilo-vscode/CHANGELOG.md` (+4254, -5)
- `packages/kilo-vscode/eslint.config.mjs` (+1, -1)
- `packages/kilo-vscode/package.json` (+13, -1)
- `packages/kilo-vscode/src/KiloProvider.ts` (+7, -3)
- `packages/kilo-vscode/src/agent-manager/AgentManagerProvider.ts` (+21, -0)
- `packages/kilo-vscode/src/agent-manager/format-keybinding.ts` (+4, -2)
- `packages/kilo-vscode/src/agent-manager/run/controller.ts` (+138, -0)
- `packages/kilo-vscode/src/agent-manager/run/manager.ts` (+138, -0)
- `packages/kilo-vscode/src/agent-manager/run/message.ts` (+18, -0)
- `packages/kilo-vscode/src/agent-manager/run/service.ts` (+170, -0)
- `packages/kilo-vscode/src/agent-manager/run/task.ts` (+73, -0)
- `packages/kilo-vscode/src/agent-manager/types.ts` (+26, -0)
- `packages/kilo-vscode/src/extension.ts` (+7, -2)
- `packages/kilo-vscode/src/kilo-provider/git-status.ts` (+8, -0)
- `packages/kilo-vscode/src/services/autocomplete/AutocompleteModel.ts` (+7, -12)
- `packages/kilo-vscode/src/services/autocomplete/__tests__/AutocompleteModel.spec.ts` (+21, -13)
- `packages/kilo-vscode/src/services/cli-backend/connection-service.ts` (+14, -0)
- `packages/kilo-vscode/src/services/cli-backend/server-manager.ts` (+1, -0)
- `packages/kilo-vscode/src/services/commit-message/__tests__/index.spec.ts` (+29, -8)
- `packages/kilo-vscode/src/services/commit-message/index.ts` (+6, -11)
- `packages/kilo-vscode/tests/unit/agent-manager-arch.test.ts` (+8, -1)
- `packages/kilo-vscode/tests/unit/run-script-manager.test.ts` (+145, -0)
- `packages/kilo-vscode/tests/unit/run-script-service.test.ts` (+97, -0)
- `packages/kilo-vscode/tests/unit/session-utils.test.ts` (+85, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/AgentManagerApp.tsx` (+118, -19)
- `packages/kilo-vscode/webview-ui/agent-manager/WorktreeItem.tsx` (+25, -1)
- `packages/kilo-vscode/webview-ui/agent-manager/agent-manager.css` (+83, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/ar.ts` (+3, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/br.ts` (+3, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/bs.ts` (+3, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/da.ts` (+3, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/de.ts` (+3, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/en.ts` (+3, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/es.ts` (+3, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/fr.ts` (+3, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/ja.ts` (+3, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/ko.ts` (+3, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/nl.ts` (+3, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/no.ts` (+3, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/pl.ts` (+3, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/ru.ts` (+3, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/th.ts` (+3, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/tr.ts` (+3, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/uk.ts` (+3, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/zh.ts` (+3, -0)
- `packages/kilo-vscode/webview-ui/agent-manager/i18n/zht.ts` (+3, -0)
- `packages/kilo-vscode/webview-ui/src/components/chat/ChatView.tsx` (+2, -2)
- `packages/kilo-vscode/webview-ui/src/components/chat/TaskHeader.tsx` (+5, -1)
- `packages/kilo-vscode/webview-ui/src/components/chat/VscodeSessionTurn.tsx` (+1, -1)
- `packages/kilo-vscode/webview-ui/src/context/server.tsx` (+11, -1)
- `packages/kilo-vscode/webview-ui/src/context/session-utils.ts` (+27, -0)
- `packages/kilo-vscode/webview-ui/src/i18n/ar.ts` (+1, -0)
- `packages/kilo-vscode/webview-ui/src/i18n/br.ts` (+1, -0)
- `packages/kilo-vscode/webview-ui/src/i18n/bs.ts` (+1, -0)
- `packages/kilo-vscode/webview-ui/src/i18n/da.ts` (+1, -0)
- `packages/kilo-vscode/webview-ui/src/i18n/de.ts` (+1, -0)
- `packages/kilo-vscode/webview-ui/src/i18n/en.ts` (+1, -0)
- `packages/kilo-vscode/webview-ui/src/i18n/es.ts` (+1, -0)
- `packages/kilo-vscode/webview-ui/src/i18n/fr.ts` (+1, -0)
- `packages/kilo-vscode/webview-ui/src/i18n/ja.ts` (+1, -0)
- `packages/kilo-vscode/webview-ui/src/i18n/ko.ts` (+1, -0)
- `packages/kilo-vscode/webview-ui/src/i18n/nl.ts` (+1, -0)
- `packages/kilo-vscode/webview-ui/src/i18n/no.ts` (+1, -0)
- `packages/kilo-vscode/webview-ui/src/i18n/pl.ts` (+1, -0)
- `packages/kilo-vscode/webview-ui/src/i18n/ru.ts` (+1, -0)
- `packages/kilo-vscode/webview-ui/src/i18n/th.ts` (+1, -0)
- `packages/kilo-vscode/webview-ui/src/i18n/tr.ts` (+1, -0)
- `packages/kilo-vscode/webview-ui/src/i18n/uk.ts` (+1, -0)
- `packages/kilo-vscode/webview-ui/src/i18n/zh.ts` (+1, -0)
- `packages/kilo-vscode/webview-ui/src/i18n/zht.ts` (+1, -0)
- `packages/kilo-vscode/webview-ui/src/styles/banners.css` (+172, -0)
- `packages/kilo-vscode/webview-ui/src/styles/chat-layout.css` (+178, -0)
- `packages/kilo-vscode/webview-ui/src/styles/chat.css` (+18, -3592)
- `packages/kilo-vscode/webview-ui/src/styles/dialogs.css` (+39, -0)
- `packages/kilo-vscode/webview-ui/src/styles/high-contrast.css` (+108, -0)
- `packages/kilo-vscode/webview-ui/src/styles/history.css` (+182, -0)
- `packages/kilo-vscode/webview-ui/src/styles/model-selector.css` (+507, -0)
- `packages/kilo-vscode/webview-ui/src/styles/notifications.css` (+165, -0)
- `packages/kilo-vscode/webview-ui/src/styles/permission-dock.css` (+392, -0)
- `packages/kilo-vscode/webview-ui/src/styles/prompt-dropdowns.css` (+138, -0)
- `packages/kilo-vscode/webview-ui/src/styles/prompt-input.css` (+533, -0)
- `packages/kilo-vscode/webview-ui/src/styles/question-dock.css` (+373, -0)
- `packages/kilo-vscode/webview-ui/src/styles/session-actions.css` (+99, -0)
- `packages/kilo-vscode/webview-ui/src/styles/settings.css` (+68, -0)
- `packages/kilo-vscode/webview-ui/src/styles/task-header.css` (+245, -0)
- `packages/kilo-vscode/webview-ui/src/styles/tool-overrides.css` (+16, -0)
- `packages/kilo-vscode/webview-ui/src/styles/welcome.css` (+362, -0)
- `packages/kilo-vscode/webview-ui/src/types/messages.ts` (+45, -2)
- `packages/opencode/CHANGELOG.md` (+1, -0)
- `packages/opencode/package.json` (+21, -17)
- `packages/opencode/script/build-node.ts` (+2, -0)
- `packages/opencode/specs/effect-migration.md` (+24, -23)
- `packages/opencode/specs/tui-plugins.md` (+55, -16)
- `packages/opencode/specs/v2.md` (+14, -0)
- `packages/opencode/src/account/index.ts` (+35, -8)
- `packages/opencode/src/acp/agent.ts` (+21, -1)
- `packages/opencode/src/bun/index.ts` (+0, -128)
- `packages/opencode/src/bun/registry.ts` (+0, -67)
- `packages/opencode/src/cli/cmd/github.ts` (+5, -5)
- `packages/opencode/src/cli/cmd/models.ts` (+1, -1)
- `packages/opencode/src/cli/cmd/plug.ts` (+4, -2)
- `packages/opencode/src/cli/cmd/pr.ts` (+4, -4)
- `packages/opencode/src/cli/cmd/providers.ts` (+1, -1)
- `packages/opencode/src/cli/cmd/run.ts` (+3, -5)
- `packages/opencode/src/cli/cmd/tui/app.tsx` (+8, -2)
- `packages/opencode/src/cli/cmd/tui/component/error-component.tsx` (+2, -1)
- `packages/opencode/src/cli/cmd/tui/component/prompt/autocomplete.tsx` (+5, -0)
- `packages/opencode/src/cli/cmd/tui/component/prompt/index.tsx` (+55, -27)
- `packages/opencode/src/cli/cmd/tui/context/theme/catppuccin-frappe.json` (+2, -2)
- `packages/opencode/src/cli/cmd/tui/context/theme/catppuccin-macchiato.json` (+2, -2)
- `packages/opencode/src/cli/cmd/tui/context/theme/catppuccin.json` (+1, -1)
- `packages/opencode/src/cli/cmd/tui/plugin/api.tsx` (+11, -1)
- `packages/opencode/src/cli/cmd/tui/plugin/runtime.ts` (+221, -173)
- `packages/opencode/src/cli/cmd/tui/plugin/slots.tsx` (+13, -14)
- `packages/opencode/src/cli/cmd/tui/routes/home.tsx` (+27, -27)
- `packages/opencode/src/cli/cmd/tui/routes/session/index.tsx` (+63, -67)
- `packages/opencode/src/cli/cmd/tui/routes/session/permission.tsx` (+7, -1)
- `packages/opencode/src/cli/cmd/tui/routes/session/question.tsx` (+1, -0)
- `packages/opencode/src/cli/cmd/tui/routes/session/sidebar.tsx` (+6, -0)
- `packages/opencode/src/cli/cmd/tui/ui/dialog-export-options.tsx` (+4, -1)
- `packages/opencode/src/cli/cmd/tui/ui/dialog-prompt.tsx` (+10, -1)
- `packages/opencode/src/cli/cmd/tui/ui/dialog-select.tsx` (+7, -0)
- `packages/opencode/src/cli/cmd/tui/util/model.ts` (+23, -0)
- `packages/opencode/src/cli/cmd/tui/util/scroll.ts` (+23, -0)
- `packages/opencode/src/cli/cmd/tui/util/transcript.ts` (+20, -6)
- `packages/opencode/src/cli/cmd/tui/worker.ts` (+3, -0)
- `packages/opencode/src/cli/heap.ts` (+59, -0)
- `packages/opencode/src/cli/ui.ts` (+19, -0)
- `packages/opencode/src/command/index.ts` (+24, -24)
- `packages/opencode/src/command/template/initialize.txt` (+63, -7)
- `packages/opencode/src/commit-message/__tests__/generate.test.ts` (+21, -1)
- `packages/opencode/src/config/config.ts` (+150, -159)
- `packages/opencode/src/config/paths.ts` (+2, -9)
- `packages/opencode/src/config/{migrate-tui-config.ts => tui-migrate.ts}` (+0, -0)
- `packages/opencode/src/config/tui.ts` (+10, -61)
- `packages/opencode/src/effect/cross-spawn-spawner.ts` (+34, -11)
- `packages/opencode/src/effect/instance-ref.ts` (+6, -0)
- `packages/opencode/src/effect/instance-state.ts` (+40, -5)
- `packages/opencode/src/effect/run-service.ts` (+19, -5)
- `packages/opencode/src/file/index.ts` (+59, -66)
- `packages/opencode/src/file/time.ts` (+5, -0)
- `packages/opencode/src/file/watcher.ts` (+2, -2)
- `packages/opencode/src/flag/flag.ts` (+16, -1)
- `packages/opencode/src/format/formatter.ts` (+78, -61)
- `packages/opencode/src/format/index.ts` (+26, -22)
- `packages/opencode/src/git/index.ts` (+303, -0)
- `packages/opencode/src/index.ts` (+27, -4)
- `packages/opencode/src/installation/index.ts` (+3, -12)
- `packages/opencode/src/installation/meta.ts` (+7, -0)
- `packages/opencode/src/kilocode/provider-options.ts` (+1, -1)
- `packages/opencode/src/kilocode/provider/provider.ts` (+249, -0)
- `packages/opencode/src/kilocode/rules-migrator.ts` (+1, -1)
- `packages/opencode/src/kilocode/skills/kilo-config.md` (+29, -0)
- `packages/opencode/src/kilocode/worktree-family.ts` (+2, -2)
- `packages/opencode/src/lsp/server.ts` (+57, -189)
- `packages/opencode/src/mcp/auth.ts` (+0, -8)
- `packages/opencode/src/mcp/index.ts` (+10, -15)
- `packages/opencode/src/npm/index.ts` (+180, -0)
- `packages/opencode/src/plugin/codex.ts` (+0, -32)
- `packages/opencode/src/plugin/{ => github-copilot}/copilot.ts` (+41, -31)
- `packages/opencode/src/plugin/github-copilot/models.ts` (+144, -0)
- `packages/opencode/src/plugin/index.ts` (+54, -87)
- `packages/opencode/src/plugin/install.ts` (+77, -22)
- `packages/opencode/src/plugin/loader.ts` (+102, -63)
- `packages/opencode/src/plugin/shared.ts` (+47, -17)
- `packages/opencode/src/project/instance.ts` (+8, -0)
- `packages/opencode/src/project/vcs.ts` (+149, -33)
- `packages/opencode/src/provider/auth.ts` (+17, -16)
- `packages/opencode/src/provider/models-snapshot.js` (+1, -66203)
- `packages/opencode/src/provider/models.ts` (+43, -13)
- `packages/opencode/src/provider/provider.ts` (+1247, -1148)
- `packages/opencode/src/provider/transform.ts` (+7, -1)
- `packages/opencode/src/pty/index.ts` (+106, -102)
- `packages/opencode/src/question/index.ts` (+7, -4)
- `packages/opencode/src/server/instance.ts` (+31, -2)
- `packages/opencode/src/server/routes/session.ts` (+2, -2)
- `packages/opencode/src/session/compaction.ts` (+18, -9)
- `packages/opencode/src/session/index.ts` (+16, -14)
- `packages/opencode/src/session/instruction.ts` (+207, -139)
- `packages/opencode/src/session/llm.ts` (+12, -18)
- `packages/opencode/src/session/message-v2.ts` (+78, -98)
- `packages/opencode/src/session/processor.ts` (+13, -11)
- `packages/opencode/src/session/prompt.ts` (+139, -127)
- `packages/opencode/src/session/prompt/kimi.txt` (+114, -0)
- `packages/opencode/src/session/revert.ts` (+159, -117)
- `packages/opencode/src/session/summary.ts` (+115, -103)
- `packages/opencode/src/session/system.ts` (+2, -0)
- `packages/opencode/src/session/todo.ts` (+63, -25)
- `packages/opencode/src/share/share-next.ts` (+299, -217)
- `packages/opencode/src/snapshot/index.ts` (+275, -38)
- `packages/opencode/src/storage/db.ts` (+7, -8)
- `packages/opencode/src/storage/storage.ts` (+269, -133)
- `packages/opencode/src/util/filesystem.ts` (+29, -4)
- `packages/opencode/src/util/git.ts` (+0, -35)
- `packages/opencode/src/util/process.ts` (+4, -0)
- `packages/opencode/src/worktree/index.ts` (+21, -47)
- `packages/opencode/test/account/repo.test.ts` (+12, -12)
- `packages/opencode/test/account/service.test.ts` (+120, -9)
- `packages/opencode/test/acp/agent-interface.test.ts` (+1, -1)
- `packages/opencode/test/bun.test.ts` (+0, -53)
- `packages/opencode/test/cli/tui/plugin-add.test.ts` (+47, -1)
- `packages/opencode/test/cli/tui/plugin-install.test.ts` (+8, -15)
- `packages/opencode/test/cli/tui/plugin-loader-entrypoint.test.ts` (+29, -23)
- `packages/opencode/test/cli/tui/plugin-loader-pure.test.ts` (+2, -2)
- `packages/opencode/test/cli/tui/plugin-loader.test.ts` (+3, -3)
- `packages/opencode/test/cli/tui/plugin-toggle.test.ts` (+4, -4)
- `packages/opencode/test/cli/tui/slot-replace.test.tsx` (+47, -0)
- `packages/opencode/test/cli/tui/theme-store.test.ts` (+5, -3)
- `packages/opencode/test/cli/tui/transcript.test.ts` (+109, -5)
- `packages/opencode/test/config/config.test.ts` (+227, -79)
- `packages/opencode/test/config/tui.test.ts` (+102, -17)
- `packages/opencode/test/effect/cross-spawn-spawner.test.ts` (+11, -1)
- `packages/opencode/test/effect/instance-state.test.ts` (+99, -1)
- `packages/opencode/test/effect/runner.test.ts` (+24, -24)
- `packages/opencode/test/fake/provider.ts` (+81, -0)
- `packages/opencode/test/file/time.test.ts` (+91, -0)
- `packages/opencode/test/fixture/fixture.ts` (+38, -7)
- `packages/opencode/test/fixture/tui-plugin.ts` (+2, -0)
- `packages/opencode/test/fixture/tui-runtime.ts` (+3, -3)
- `packages/opencode/test/format/format.test.ts` (+9, -17)
- `packages/opencode/test/git/git.test.ts` (+128, -0)
- `packages/opencode/test/kilocode/kilo-loader-auth.test.ts` (+170, -0)
- `packages/opencode/test/kilocode/local-model.test.ts` (+17, -4)
- `packages/opencode/test/kilocode/mcp-docker-rm.test.ts` (+4, -3)
- `packages/opencode/test/kilocode/model-cache-org.test.ts` (+4, -15)
- `packages/opencode/test/kilocode/paths.test.ts` (+3, -2)
- `packages/opencode/test/kilocode/rules-migrator.test.ts` (+5, -1)
- `packages/opencode/test/kilocode/session-import-service.test.ts` (+6, -13)
- `packages/opencode/test/kilocode/session-processor-empty-tool-calls.test.ts` (+3, -3)
- `packages/opencode/test/kilocode/session-processor-network-offline.test.ts` (+5, -9)
- `packages/opencode/test/kilocode/session-processor-retry-limit.test.ts` (+88, -98)
- `packages/opencode/test/{kilo-sessions => kilocode/sessions}/inflight-cache.test.ts` (+1, -1)
- `packages/opencode/test/{kilo-sessions => kilocode/sessions}/ingest-queue.test.ts` (+1, -1)
- `packages/opencode/test/{kilo-sessions/kilo-sessions-enable-remote.test.ts => kilocode/sessions/kilo-sessions-enable-remote.test.disable}` (+47, -68)
- `packages/opencode/test/{kilo-sessions => kilocode/sessions}/remote-protocol.test.ts` (+1, -1)
- `packages/opencode/test/{kilo-sessions => kilocode/sessions}/remote-sender.test.ts` (+6, -10)
- `packages/opencode/test/{kilo-sessions => kilocode/sessions}/remote-ws.test.ts` (+1, -1)
- `packages/opencode/test/kilocode/snapshot-cache.test.ts` (+3, -0)
- `packages/opencode/test/lib/effect.ts` (+25, -9)
- `packages/opencode/test/lib/llm-server.ts` (+795, -0)
- `packages/opencode/test/plugin/github-copilot-models.test.ts` (+117, -0)
- `packages/opencode/test/plugin/install-concurrency.test.ts` (+7, -1)
- `packages/opencode/test/plugin/install.test.ts` (+73, -7)
- `packages/opencode/test/plugin/loader-shared.test.ts` (+318, -18)
- `packages/opencode/test/project/vcs.test.ts` (+122, -10)
- `packages/opencode/test/provider/provider.test.ts` (+93, -0)
- `packages/opencode/test/provider/transform.test.ts` (+105, -0)
- `packages/opencode/test/server/experimental-session-list.test.ts` (+17, -17)
- `packages/opencode/test/server/global-session-list.test.ts` (+16, -16)
- `packages/opencode/test/server/session-messages.test.ts` (+88, -68)
- `packages/opencode/test/session/compaction.test.ts` (+39, -29)
- `packages/opencode/test/session/instruction.test.ts` (+129, -13)
- `packages/opencode/test/session/messages-pagination.test.ts` (+782, -12)
- `packages/opencode/test/session/processor-effect.test.ts` (+244, -362)
- `packages/opencode/test/session/prompt-concurrency.test.ts` (+0, -247)
- `packages/opencode/test/session/prompt-effect.test.ts` (+606, -570)
- `packages/opencode/test/session/prompt.test.ts` (+8, -4)
- `packages/opencode/test/session/revert-compact.test.ts` (+336, -1)
- `packages/opencode/test/session/snapshot-tool-race.test.ts` (+242, -0)
- `packages/opencode/test/share/share-next.test.ts` (+327, -70)
- `packages/opencode/test/snapshot/snapshot.test.ts` (+169, -0)
- `packages/opencode/test/storage/db.test.ts` (+11, -0)
- `packages/opencode/test/storage/storage.test.ts` (+295, -0)
- `packages/opencode/test/util/filesystem.test.ts` (+89, -0)
- `packages/plugin/package.json` (+5, -5)
- `packages/plugin/src/index.ts` (+11, -0)
- `packages/plugin/src/tui.ts` (+72, -5)
- `packages/script/package.json` (+1, -1)
- `packages/script/src/index.ts` (+1, -1)
- `packages/sdk/js/package.json` (+7, -4)
- `packages/sdk/js/src/process.ts` (+31, -0)
- `packages/sdk/js/src/server.ts` (+27, -19)
- `packages/sdk/js/src/v2/gen/sdk.gen.ts` (+35, -0)
- `packages/sdk/js/src/v2/gen/types.gen.ts` (+54, -32)
- `packages/sdk/js/src/v2/server.ts` (+25, -15)
- `packages/sdk/openapi.json` (+149, -89)
- `packages/storybook/package.json` (+1, -1)
- `packages/ui/package.json` (+2, -1)
- `packages/ui/src/components/dock-prompt.tsx` (+2, -1)
- `packages/ui/src/components/file.tsx` (+5, -11)
- `packages/ui/src/components/icon.tsx` (+1, -0)
- `packages/ui/src/components/line-comment-annotations.tsx` (+7, -6)
- `packages/ui/src/components/line-comment-styles.ts` (+52, -0)
- `packages/ui/src/components/line-comment.tsx` (+138, -10)
- `packages/ui/src/components/list.tsx` (+3, -3)
- `packages/ui/src/components/message-part.tsx` (+23, -8)
- `packages/ui/src/components/popover.tsx` (+4, -24)
- `packages/ui/src/components/scroll-view.tsx` (+3, -14)
- `packages/ui/src/components/session-review.tsx` (+116, -27)
- `packages/ui/src/components/session-turn.css` (+28, -36)
- `packages/ui/src/components/session-turn.tsx` (+103, -111)
- `packages/ui/src/components/text-strikethrough.stories.tsx` (+3, -8)
- `packages/ui/src/components/text-strikethrough.tsx` (+3, -9)
- `packages/ui/src/context/dialog.tsx` (+2, -2)
- `packages/ui/src/hooks/create-auto-scroll.tsx` (+12, -27)
- `packages/ui/src/i18n/ar.ts` (+6, -0)
- `packages/ui/src/i18n/br.ts` (+6, -0)
- `packages/ui/src/i18n/bs.ts` (+6, -0)
- `packages/ui/src/i18n/da.ts` (+6, -0)
- `packages/ui/src/i18n/de.ts` (+6, -0)
- `packages/ui/src/i18n/en.ts` (+6, -0)
- `packages/ui/src/i18n/es.ts` (+6, -0)
- `packages/ui/src/i18n/fr.ts` (+6, -0)
- `packages/ui/src/i18n/ja.ts` (+6, -0)
- `packages/ui/src/i18n/ko.ts` (+6, -0)
- `packages/ui/src/i18n/nl.ts` (+6, -0)
- `packages/ui/src/i18n/no.ts` (+6, -0)
- `packages/ui/src/i18n/pl.ts` (+6, -0)
- `packages/ui/src/i18n/ru.ts` (+6, -0)
- `packages/ui/src/i18n/th.ts` (+6, -0)
- `packages/ui/src/i18n/tr.ts` (+6, -0)
- `packages/ui/src/i18n/uk.ts` (+6, -0)
- `packages/ui/src/i18n/zh.ts` (+6, -0)
- `packages/ui/src/i18n/zht.ts` (+6, -0)
- `packages/ui/src/pierre/file-find.ts` (+14, -15)
- `packages/ui/src/theme/context.tsx` (+5, -8)
- `packages/util/package.json` (+1, -1)
- `script/changelog-github.cjs` (+59, -0)
- `script/changelog.ts` (+58, -402)
- `script/extract-source-links.ts` (+1, -0)
- `script/raw-changelog.ts` (+261, -0)
- `script/upstream/package.json` (+1, -1)
- `script/upstream/transforms/transform-package-json.ts` (+14, -0)
- `script/version.ts` (+33, -5)
- `sdks/vscode/package.json` (+1, -1)
- `turbo.json` (+11, -1)

### Key Diffs

#### packages/opencode/src/agent/agent.ts
```diff
diff --git a/packages/opencode/src/agent/agent.ts b/packages/opencode/src/agent/agent.ts
index 4fda999a2..48b87aa95 100644
--- a/packages/opencode/src/agent/agent.ts
+++ b/packages/opencode/src/agent/agent.ts
@@ -78,6 +78,7 @@ export namespace Agent {
       const config = yield* Config.Service
       const auth = yield* Auth.Service
       const skill = yield* Skill.Service
+      const provider = yield* Provider.Service
 
       const state = yield* InstanceState.make<State>(
         Effect.fn("Agent.state")(function* (ctx) {
@@ -352,9 +353,9 @@ export namespace Agent {
           model?: { providerID: ProviderID; modelID: ModelID }
         }) {
           const cfg = yield* config.get()
-          const model = input.model ?? (yield* Effect.promise(() => Provider.defaultModel()))
-          const resolved = yield* Effect.promise(() => Provider.getModel(model.providerID, model.modelID))
-          const language = yield* Effect.promise(() => Provider.getLanguage(resolved))
+          const model = input.model ?? (yield* provider.defaultModel())
+          const resolved = yield* provider.getModel(model.providerID, model.modelID)
+          const language = yield* provider.getLanguage(resolved)
 
           const system = [PROMPT_GENERATE]
           yield* Effect.promise(() =>
@@ -412,6 +413,7 @@ export namespace Agent {
   )
 
   export const defaultLayer = layer.pipe(
+    Layer.provide(Provider.defaultLayer),
     Layer.provide(Auth.defaultLayer),
     Layer.provide(Config.defaultLayer),
     Layer.provide(Skill.defaultLayer),
```

#### packages/opencode/src/agent/prompt/compaction.txt
```diff
diff --git a/packages/opencode/src/agent/prompt/compaction.txt b/packages/opencode/src/agent/prompt/compaction.txt
index 3308627e1..11deccb3a 100644
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
index db6327c82..fe26a6672 100644
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
@@ -82,16 +82,17 @@ export namespace Bus {
 
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
 
+          const dir = yield* InstanceState.directory
           GlobalBus.emit("event", {
-            directory: Instance.directory,
+            directory: dir,
             payload,
           })
         })
@@ -101,8 +102,8 @@ export namespace Bus {
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
@@ -112,8 +113,8 @@ export namespace Bus {
         log.info("subscribing", { type: "*" })
         return Stream.unwrap(
           Effect.gen(function* () {
```

#### packages/opencode/src/permission/index.ts
```diff
diff --git a/packages/opencode/src/permission/index.ts b/packages/opencode/src/permission/index.ts
index 5713230ec..7c6c5625c 100644
--- a/packages/opencode/src/permission/index.ts
+++ b/packages/opencode/src/permission/index.ts
@@ -162,6 +162,7 @@ export namespace Permission {
   export const layer = Layer.effect(
     Service,
     Effect.gen(function* () {
+      const bus = yield* Bus.Service
       const state = yield* InstanceState.make<State>(
         Effect.fn("Permission.state")(function* (ctx) {
           const row = Database.use((db) =>
@@ -198,7 +199,7 @@ export namespace Permission {
         // kilocode_change end
 
         for (const pattern of request.patterns) {
-          const rule = evaluate(request.permission, pattern, ruleset, approved)
+          const rule = evaluate(request.permission, pattern, ruleset, approved, local) // kilocode_change — include session-scoped rules
           log.info("evaluated", { permission: request.permission, pattern, action: rule })
           if (rule.action === "deny") {
             return yield* new DeniedError({
@@ -227,8 +228,8 @@ export namespace Permission {
         log.info("asking", { id, permission: info.permission, patterns: info.patterns })
 
         const deferred = yield* Deferred.make<void, RejectedError | CorrectedError>()
-        s.pending.set(id, { info, ruleset, deferred }) // kilocode_change — store ruleset
-        void Bus.publish(Event.Asked, info)
+        pending.set(id, { info, ruleset, deferred }) // kilocode_change
+        yield* bus.publish(Event.Asked, info)
         return yield* Effect.ensuring(
           Deferred.await(deferred),
           Effect.sync(() => {
@@ -243,7 +244,7 @@ export namespace Permission {
         if (!existing) return
 
         pending.delete(input.requestID)
-        void Bus.publish(Event.Replied, {
+        yield* bus.publish(Event.Replied, {
           sessionID: existing.info.sessionID,
           requestID: existing.info.id,
           reply: input.reply,
@@ -258,7 +259,7 @@ export namespace Permission {
           for (const [id, item] of pending.entries()) {
             if (item.info.sessionID !== existing.info.sessionID) continue
             pending.delete(id)
-            void Bus.publish(Event.Replied, {
+            yield* bus.publish(Event.Replied, {
               sessionID: item.info.sessionID,
               requestID: item.info.id,
               reply: "reject",
```

#### packages/opencode/src/tool/bash.ts
```diff
diff --git a/packages/opencode/src/tool/bash.ts b/packages/opencode/src/tool/bash.ts
index 2d85f0e9d..808ae92fe 100644
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
 const DEFAULT_TIMEOUT = Flag.KILO_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS || 2 * 60 * 1000
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


*... and more files (showing first 5)*

## opencode Changes (cb1a500..7cbe162)

### Commits

- 7cbe162 - chore: update nix node_modules hashes (opencode-agent[bot], 2026-04-14)
- d684086 - refactor(ripgrep): use embedded wasm backend (#21703) (Shoubhit Dash, 2026-04-14)
- 9b2648d - build(opencode): shrink single-file executable size (#22362) (Luke Parker, 2026-04-14)
- f954854 - refactor(instance): remove state helper (#22381) (Kit Langton, 2026-04-13)
- 6a99079 - kit/env instance state (#22383) (Kit Langton, 2026-04-13)
- 0a8b629 - refactor(tui): move config cache to InstanceState (#22378) (Kit Langton, 2026-04-13)
- f40209b - refactor(snapshot): remove async facade exports (#22370) (Kit Langton, 2026-04-13)
- a2cb490 - refactor(plugin): remove async facade exports (#22367) (Kit Langton, 2026-04-13)
- 7a05ba4 - refactor(session): remove compaction async facade exports (#22366) (Kit Langton, 2026-04-13)
- 36745ca - refactor(worktree): remove async facade exports (#22369) (Kit Langton, 2026-04-13)
- c2403d0 - fix(provider): guard reasoningSummary injection for @ai-sdk/openai-compatible providers (#22352) (Nazar H., 2026-04-13)
- 34e2429 - feat: add experimental.compaction.autocontinue hook to disable auto continuing after compaction (#22361) (Aiden Cline, 2026-04-13)
- 10ba68c - chore: update nix node_modules hashes (opencode-agent[bot], 2026-04-14)
- e847125 - refactor(session): move llm stream into layer (#22358) (Kit Langton, 2026-04-13)
- 43b3734 - feat: add interactive burst to the TUI logo (#22098) (Kit Langton, 2026-04-13)
- d199648 - refactor(permission): remove async facade exports (#22342) (Kit Langton, 2026-04-13)
- a06f402 - fix grep exact file path searches (#22356) (Kit Langton, 2026-04-13)
- 59c0fc2 - ignore: v2 thoughts (Dax Raad, 2026-04-13)
- b22add2 - refactor(core): publish sync events to global event stream (#22347) (James Long, 2026-04-13)
- 67aaeca - refactor(session): remove revert async facade exports (#22339) (Kit Langton, 2026-04-13)
- 29c202e - refactor(mcp): remove mcp auth async facade exports (#22338) (Kit Langton, 2026-04-13)
- dcbf11f - refactor(session): remove summary async facades (#22337) (Kit Langton, 2026-04-13)
- 14ccff4 - refactor(agent): remove async facade exports (#22341) (Kit Langton, 2026-04-13)
- 5b8b874 - update effect docs (#22340) (Kit Langton, 2026-04-13)
- 1d81c02 - chore: generate (opencode-agent[bot], 2026-04-13)
- 9131207 - session entry (Dax Raad, 2026-04-13)
- 7a6ce05 - 2.0 exploration (#22335) (Dax, 2026-04-13)
- 1dc6935 - refactor(mcp): remove async facade exports (#22324) (Kit Langton, 2026-04-13)
- 329fcb0 - chore: generate (opencode-agent[bot], 2026-04-13)
- bf50d1c - feat(core): expose workspace adaptors to plugins (#21927) (James Long, 2026-04-13)
- b8801db - refactor(file): remove async facade exports (#22322) (Kit Langton, 2026-04-13)
- f7c6943 - refactor(config): remove async facade exports (#22325) (Kit Langton, 2026-04-13)
- 91fe4db - Update VOUCHED list (github-actions[bot], 2026-04-13)
- 21d7a85 - refactor(lsp): remove async facade exports (#22321) (Kit Langton, 2026-04-13)
- 663e798 - refactor(provider): remove async facade exports (#22320) (Kit Langton, 2026-04-13)
- 5bc2d24 - test: ensure project and global instructions are loaded (#22317) (Aiden Cline, 2026-04-13)
- c22e348 - refactor(auth): remove async auth facade exports (#22306) (Kit Langton, 2026-04-13)
- 6825b0b - refactor(pty): remove async facade exports (#22305) (Kit Langton, 2026-04-13)
- 3644581 - refactor(file): stream ripgrep search parsing (#22303) (Kit Langton, 2026-04-13)
- 79cc153 - fix: dispose e2e app runtime (#22316) (Kit Langton, 2026-04-13)
- ca62001 - refactor: remove vcs async facade exports (#22304) (Kit Langton, 2026-04-13)
- 7239b38 - refactor(skill): remove async facade exports (#22308) (Kit Langton, 2026-04-13)
- 9ae8dc2 - refactor: remove ToolRegistry runtime facade (#22307) (Kit Langton, 2026-04-13)
- 7164662 - chore: generate (opencode-agent[bot], 2026-04-13)
- 94f71f5 - core: make InstanceBootstrap into an effect (#22274) (Brendan Allan, 2026-04-13)
- 3eb6508 - refactor: share TUI terminal background detection (#22297) (Kit Langton, 2026-04-13)
- 6fdb8ab - refactor(file): add ripgrep search service (#22295) (Kit Langton, 2026-04-13)
- 321bf1f - refactor: finish small effect service adoption cleanups (#22094) (Kit Langton, 2026-04-13)
- 62bd023 - app: replace parsePatchFiles with parseDiffFromFile (#22270) (Brendan Allan, 2026-04-13)

### Changed Files by Category

#### Tool System (packages/*/src/tool/)
- `packages/opencode/src/tool/external-directory.ts` (+3, -1)
- `packages/opencode/src/tool/glob.ts` (+16, -11)
- `packages/opencode/src/tool/grep.ts` (+86, -116)
- `packages/opencode/src/tool/ls.ts` (+31, -43)
- `packages/opencode/src/tool/registry.ts` (+8, -18)
- `packages/opencode/src/tool/skill.ts` (+6, -7)
- `packages/opencode/test/tool/edit.test.ts` (+46, -30)
- `packages/opencode/test/tool/glob.test.ts` (+81, -0)
- `packages/opencode/test/tool/grep.test.ts` (+83, -98)
- `packages/opencode/test/tool/registry.test.ts` (+128, -133)
- `packages/opencode/test/tool/skill.test.ts` (+117, -113)

#### Agent System (packages/*/src/agent/)
- `packages/opencode/src/agent/agent.ts` (+3, -22)
- `packages/opencode/test/agent/agent.test.ts` (+48, -41)

#### Permission System (**/permission/)
- `packages/opencode/src/permission/index.ts` (+0, -15)
- `packages/opencode/test/permission/next.test.ts` (+470, -538)

#### Event Bus (**/bus/, **/event/)
- `packages/opencode/src/bus/bus-event.ts` (+11, -18)
- `packages/opencode/test/bus/bus-effect.test.ts` (+2, -4)

#### Core (**/core/)
(no changes)

#### Other Changes
- `.github/VOUCHED.td` (+1, -0)
- `bun.lock` (+10, -0)
- `nix/hashes.json` (+4, -4)
- `packages/app/src/context/global-sdk.tsx` (+6, -1)
- `packages/opencode/AGENTS.md` (+2, -2)
- `packages/opencode/migration/20260410174513_workspace-name/migration.sql` (+16, -0)
- `packages/opencode/migration/20260410174513_workspace-name/snapshot.json` (+1271, -0)
- `packages/opencode/migration/20260413175956_chief_energizer/migration.sql` (+13, -0)
- `packages/opencode/migration/20260413175956_chief_energizer/snapshot.json` (+1399, -0)
- `packages/opencode/package.json` (+2, -0)
- `packages/opencode/script/build.ts` (+3, -0)
- `packages/opencode/script/seed-e2e.ts` (+12, -3)
- `packages/opencode/specs/effect/facades.md` (+238, -0)
- `packages/opencode/specs/effect/http-api.md` (+137, -0)
- `packages/opencode/specs/effect/loose-ends.md` (+36, -0)
- `packages/opencode/specs/{effect-migration.md => effect/migration.md}` (+20, -100)
- `packages/opencode/specs/effect/routes.md` (+66, -0)
- `packages/opencode/specs/effect/schema.md` (+99, -0)
- `packages/opencode/specs/effect/tools.md` (+96, -0)
- `packages/opencode/src/acp/agent.ts` (+4, -2)
- `packages/opencode/src/audio.d.ts` (+4, -0)
- `packages/opencode/src/auth/index.ts` (+0, -19)
- `packages/opencode/src/cli/bootstrap.ts` (+2, -1)
- `packages/opencode/src/cli/cmd/agent.ts` (+5, -2)
- `packages/opencode/src/cli/cmd/debug/agent.ts` (+21, -7)
- `packages/opencode/src/cli/cmd/debug/config.ts` (+2, -1)
- `packages/opencode/src/cli/cmd/debug/file.ts` (+22, -4)
- `packages/opencode/src/cli/cmd/debug/lsp.ts` (+14, -5)
- `packages/opencode/src/cli/cmd/debug/ripgrep.ts` (+14, -7)
- `packages/opencode/src/cli/cmd/debug/skill.ts` (+8, -1)
- `packages/opencode/src/cli/cmd/debug/snapshot.ts` (+4, -3)
- `packages/opencode/src/cli/cmd/mcp.ts` (+88, -47)
- `packages/opencode/src/cli/cmd/models.ts` (+41, -31)
- `packages/opencode/src/cli/cmd/providers.ts` (+48, -16)
- `packages/opencode/src/cli/cmd/run.ts` (+10, -8)
- `packages/opencode/src/cli/cmd/tui/app.tsx` (+2, -61)
- `packages/opencode/src/cli/cmd/tui/asset/charge.wav` (+-, --)
- `packages/opencode/src/cli/cmd/tui/asset/pulse-a.wav` (+-, --)
- `packages/opencode/src/cli/cmd/tui/asset/pulse-b.wav` (+-, --)
- `packages/opencode/src/cli/cmd/tui/asset/pulse-c.wav` (+-, --)
- `packages/opencode/src/cli/cmd/tui/component/dialog-workspace-create.tsx` (+40, -8)
- `packages/opencode/src/cli/cmd/tui/component/logo.tsx` (+600, -52)
- `packages/opencode/src/cli/cmd/tui/context/event.ts` (+4, -0)
- `packages/opencode/src/cli/cmd/tui/util/sound.ts` (+156, -0)
- `packages/opencode/src/cli/cmd/tui/util/terminal.ts` (+53, -30)
- `packages/opencode/src/cli/cmd/tui/worker.ts` (+3, -3)
- `packages/opencode/src/cli/network.ts` (+2, -1)
- `packages/opencode/src/cli/upgrade.ts` (+1, -1)
- `packages/opencode/src/config/config.ts` (+436, -439)
- `packages/opencode/src/config/tui.ts` (+68, -32)
- `packages/opencode/src/control-plane/adaptors/index.ts` (+43, -11)
- `packages/opencode/src/control-plane/adaptors/worktree.ts` (+21, -16)
- `packages/opencode/src/control-plane/types.ts` (+8, -6)
- `packages/opencode/src/control-plane/workspace.sql.ts` (+1, -1)
- `packages/opencode/src/control-plane/workspace.ts` (+5, -4)
- `packages/opencode/src/effect/app-runtime.ts` (+2, -2)
- `packages/opencode/src/effect/bootstrap-runtime.ts` (+18, -1)
- `packages/opencode/src/env/index.ts` (+41, -13)
- `packages/opencode/src/file/index.ts` (+11, -2)
- `packages/opencode/src/file/ripgrep.ts` (+445, -307)
- `packages/opencode/src/file/ripgrep.worker.ts` (+103, -0)
- `packages/opencode/src/format/formatter.ts` (+12, -24)
- `packages/opencode/src/id/id.ts` (+1, -0)
- `packages/opencode/src/lsp/index.ts` (+0, -32)
- `packages/opencode/src/mcp/auth.ts` (+0, -29)
- `packages/opencode/src/mcp/index.ts` (+2, -34)
- `packages/opencode/src/mcp/oauth-provider.ts` (+35, -29)
- `packages/opencode/src/plugin/index.ts` (+14, -19)
- `packages/opencode/src/project/bootstrap.ts` (+18, -16)
- `packages/opencode/src/project/instance.ts` (+2, -8)
- `packages/opencode/src/project/state.ts` (+0, -70)
- `packages/opencode/src/project/vcs.ts` (+0, -19)
- `packages/opencode/src/provider/provider.ts` (+84, -97)
- `packages/opencode/src/provider/transform.ts` (+10, -1)
- `packages/opencode/src/pty/index.ts` (+0, -31)
- `packages/opencode/src/server/control/index.ts` (+14, -2)
- `packages/opencode/src/server/instance/config.ts` (+10, -3)
- `packages/opencode/src/server/instance/event.ts` (+7, -1)
- `packages/opencode/src/server/instance/experimental.ts` (+29, -10)
- `packages/opencode/src/server/instance/file.ts` (+33, -20)
- `packages/opencode/src/server/instance/global.ts` (+3, -49)
- `packages/opencode/src/server/instance/index.ts` (+29, -9)
- `packages/opencode/src/server/instance/mcp.ts` (+34, -14)
- `packages/opencode/src/server/instance/middleware.ts` (+4, -3)
- `packages/opencode/src/server/instance/permission.ts` (+11, -6)
- `packages/opencode/src/server/instance/project.ts` (+2, -1)
- `packages/opencode/src/server/instance/provider.ts` (+29, -19)
- `packages/opencode/src/server/instance/pty.ts` (+56, -8)
- `packages/opencode/src/server/instance/session.ts` (+57, -34)
- `packages/opencode/src/server/instance/workspace.ts` (+28, -0)
- `packages/opencode/src/session/compaction.ts` (+45, -48)
- `packages/opencode/src/session/llm.ts` (+345, -321)
- `packages/opencode/src/session/processor.ts` (+11, -5)
- `packages/opencode/src/session/projectors.ts` (+4, -3)
- `packages/opencode/src/session/prompt.ts` (+10, -4)
- `packages/opencode/src/session/revert.ts` (+0, -15)
- `packages/opencode/src/session/session.sql.ts` (+20, -0)
- `packages/opencode/src/session/summary.ts` (+0, -10)
- `packages/opencode/src/skill/index.ts` (+0, -19)
- `packages/opencode/src/snapshot/index.ts` (+0, -31)
- `packages/opencode/src/sync/index.ts` (+29, -30)
- `packages/opencode/src/v2/message.ts` (+0, -115)
- `packages/opencode/src/v2/session-entry.ts` (+227, -0)
- `packages/opencode/src/v2/session.ts` (+4, -4)
- `packages/opencode/src/worktree/index.ts` (+2, -23)
- `packages/opencode/test/auth/auth.test.ts` (+80, -52)
- `packages/opencode/test/cli/tui/plugin-loader.test.ts` (+0, -5)
- `packages/opencode/test/config/agent-color.test.ts` (+10, -4)
- `packages/opencode/test/config/config.test.ts` (+205, -171)
- `packages/opencode/test/config/tui.test.ts` (+6, -3)
- `packages/opencode/test/control-plane/adaptors.test.ts` (+71, -0)
- `packages/opencode/test/file/fsmonitor.test.ts` (+9, -3)
- `packages/opencode/test/file/index.test.ts` (+88, -78)
- `packages/opencode/test/file/path-traversal.test.ts` (+14, -8)
- `packages/opencode/test/file/ripgrep.test.ts` (+166, -14)
- `packages/opencode/test/lsp/index.test.ts` (+47, -47)
- `packages/opencode/test/lsp/lifecycle.test.ts` (+97, -92)
- `packages/opencode/test/mcp/headers.test.ts` (+45, -20)
- `packages/opencode/test/mcp/lifecycle.test.ts` (+330, -296)
- `packages/opencode/test/mcp/oauth-auto-connect.test.ts` (+33, -8)
- `packages/opencode/test/mcp/oauth-browser.test.ts` (+22, -3)
- `packages/opencode/test/permission-task.test.ts` (+9, -6)
- `packages/opencode/test/plugin/github-copilot-models.test.ts` (+3, -0)
- `packages/opencode/test/plugin/loader-shared.test.ts` (+6, -3)
- `packages/opencode/test/plugin/trigger.test.ts` (+33, -28)
- `packages/opencode/test/plugin/workspace-adaptor.test.ts` (+102, -0)
- `packages/opencode/test/project/state.test.ts` (+0, -115)
- `packages/opencode/test/project/vcs.test.ts` (+69, -12)
- `packages/opencode/test/project/worktree-remove.test.ts` (+119, -89)
- `packages/opencode/test/project/worktree.test.ts` (+169, -128)
- `packages/opencode/test/provider/amazon-bedrock.test.ts` (+21, -10)
- `packages/opencode/test/provider/gitlab-duo.test.ts` (+18, -18)
- `packages/opencode/test/provider/provider.test.ts` (+125, -81)
- `packages/opencode/test/provider/transform.test.ts` (+10, -0)
- `packages/opencode/test/pty/pty-output-isolation.test.ts` (+115, -110)
- `packages/opencode/test/pty/pty-session.test.ts` (+54, -44)
- `packages/opencode/test/pty/pty-shell.test.ts` (+26, -16)
- `packages/opencode/test/server/project-init-git.test.ts` (+10, -8)
- `packages/opencode/test/session/compaction.test.ts` (+371, -156)
- `packages/opencode/test/session/instruction.test.ts` (+53, -0)
- `packages/opencode/test/session/llm.test.ts` (+31, -114)
- `packages/opencode/test/session/processor-effect.test.ts` (+14, -1)
- `packages/opencode/test/session/prompt-effect.test.ts` (+15, -2)
- `packages/opencode/test/session/revert-compact.test.ts` (+558, -540)
- `packages/opencode/test/session/snapshot-tool-race.test.ts` (+8, -3)
- `packages/opencode/test/session/system.test.ts` (+6, -2)
- `packages/opencode/test/skill/skill.test.ts` (+271, -272)
- `packages/opencode/test/snapshot/snapshot.test.ts` (+176, -154)
- `packages/plugin/src/example-workspace.ts` (+34, -0)
- `packages/plugin/src/index.ts` (+51, -0)
- `packages/plugin/tsconfig.json` (+1, -0)
- `packages/sdk/js/src/v2/gen/sdk.gen.ts` (+38, -20)
- `packages/sdk/js/src/v2/gen/types.gen.ts` (+274, -197)
- `packages/sdk/openapi.json` (+794, -549)
- `packages/ui/src/components/session-diff.ts` (+42, -19)

### Key Diffs

#### packages/opencode/src/agent/agent.ts
```diff
diff --git a/packages/opencode/src/agent/agent.ts b/packages/opencode/src/agent/agent.ts
index fd9ac43..562c90c 100644
--- a/packages/opencode/src/agent/agent.ts
+++ b/packages/opencode/src/agent/agent.ts
@@ -21,7 +21,6 @@ import { Plugin } from "@/plugin"
 import { Skill } from "../skill"
 import { Effect, Context, Layer } from "effect"
 import { InstanceState } from "@/effect/instance-state"
-import { makeRuntime } from "@/effect/run-service"
 
 export namespace Agent {
   export const Info = z
@@ -74,6 +73,7 @@ export namespace Agent {
     Effect.gen(function* () {
       const config = yield* Config.Service
       const auth = yield* Auth.Service
+      const plugin = yield* Plugin.Service
       const skill = yield* Skill.Service
       const provider = yield* Provider.Service
 
@@ -336,9 +336,7 @@ export namespace Agent {
           const language = yield* provider.getLanguage(resolved)
 
           const system = [PROMPT_GENERATE]
-          yield* Effect.promise(() =>
-            Plugin.trigger("experimental.chat.system.transform", { model: resolved }, { system }),
-          )
+          yield* plugin.trigger("experimental.chat.system.transform", { model: resolved }, { system })
           const existing = yield* InstanceState.useEffect(state, (s) => s.list())
 
           // TODO: clean this up so provider specific logic doesnt bleed over
@@ -399,27 +397,10 @@ export namespace Agent {
   )
 
   export const defaultLayer = layer.pipe(
+    Layer.provide(Plugin.defaultLayer),
     Layer.provide(Provider.defaultLayer),
     Layer.provide(Auth.defaultLayer),
     Layer.provide(Config.defaultLayer),
     Layer.provide(Skill.defaultLayer),
   )
-
-  const { runPromise } = makeRuntime(Service, defaultLayer)
-
-  export async function get(agent: string) {
-    return runPromise((svc) => svc.get(agent))
-  }
-
-  export async function list() {
-    return runPromise((svc) => svc.list())
```

#### packages/opencode/src/bus/bus-event.ts
```diff
diff --git a/packages/opencode/src/bus/bus-event.ts b/packages/opencode/src/bus/bus-event.ts
index d979222..aad5f39 100644
--- a/packages/opencode/src/bus/bus-event.ts
+++ b/packages/opencode/src/bus/bus-event.ts
@@ -16,25 +16,18 @@ export namespace BusEvent {
   }
 
   export function payloads() {
-    return z
-      .discriminatedUnion(
-        "type",
-        registry
-          .entries()
-          .map(([type, def]) => {
-            return z
-              .object({
-                type: z.literal(type),
-                properties: def.properties,
-              })
-              .meta({
-                ref: "Event" + "." + def.type,
-              })
+    return registry
+      .entries()
+      .map(([type, def]) => {
+        return z
+          .object({
+            type: z.literal(type),
+            properties: def.properties,
+          })
+          .meta({
+            ref: "Event" + "." + def.type,
           })
-          .toArray() as any,
-      )
-      .meta({
-        ref: "Event",
       })
+      .toArray()
   }
 }
```

#### packages/opencode/src/permission/index.ts
```diff
diff --git a/packages/opencode/src/permission/index.ts b/packages/opencode/src/permission/index.ts
index a45aaf5..dc22d32 100644
--- a/packages/opencode/src/permission/index.ts
+++ b/packages/opencode/src/permission/index.ts
@@ -2,7 +2,6 @@ import { Bus } from "@/bus"
 import { BusEvent } from "@/bus/bus-event"
 import { Config } from "@/config/config"
 import { InstanceState } from "@/effect/instance-state"
-import { makeRuntime } from "@/effect/run-service"
 import { ProjectID } from "@/project/schema"
 import { Instance } from "@/project/instance"
 import { MessageID, SessionID } from "@/session/schema"
@@ -308,18 +307,4 @@ export namespace Permission {
   }
 
   export const defaultLayer = layer.pipe(Layer.provide(Bus.layer))
-
-  export const { runPromise } = makeRuntime(Service, defaultLayer)
-
-  export async function ask(input: z.infer<typeof AskInput>) {
-    return runPromise((s) => s.ask(input))
-  }
-
-  export async function reply(input: z.infer<typeof ReplyInput>) {
-    return runPromise((s) => s.reply(input))
-  }
-
-  export async function list() {
-    return runPromise((s) => s.list())
-  }
 }
```

#### packages/opencode/src/tool/external-directory.ts
```diff
diff --git a/packages/opencode/src/tool/external-directory.ts b/packages/opencode/src/tool/external-directory.ts
index ff88546..9df3e0a 100644
--- a/packages/opencode/src/tool/external-directory.ts
+++ b/packages/opencode/src/tool/external-directory.ts
@@ -1,6 +1,7 @@
 import path from "path"
 import { Effect } from "effect"
 import { EffectLogger } from "@/effect/logger"
+import { InstanceState } from "@/effect/instance-state"
 import type { Tool } from "./tool"
 import { Instance } from "../project/instance"
 import { AppFileSystem } from "../filesystem"
@@ -21,8 +22,9 @@ export const assertExternalDirectoryEffect = Effect.fn("Tool.assertExternalDirec
 
   if (options?.bypass) return
 
+  const ins = yield* InstanceState.context
   const full = process.platform === "win32" ? AppFileSystem.normalizePath(target) : target
-  if (Instance.containsPath(full)) return
+  if (Instance.containsPath(full, ins)) return
 
   const kind = options?.kind ?? "file"
   const dir = kind === "directory" ? full : path.dirname(full)
```

#### packages/opencode/src/tool/glob.ts
```diff
diff --git a/packages/opencode/src/tool/glob.ts b/packages/opencode/src/tool/glob.ts
index a3ff5ae..c1577bc 100644
--- a/packages/opencode/src/tool/glob.ts
+++ b/packages/opencode/src/tool/glob.ts
@@ -1,13 +1,13 @@
-import z from "zod"
 import path from "path"
+import z from "zod"
 import { Effect, Option } from "effect"
 import * as Stream from "effect/Stream"
-import { Tool } from "./tool"
-import DESCRIPTION from "./glob.txt"
+import { InstanceState } from "@/effect/instance-state"
+import { AppFileSystem } from "../filesystem"
 import { Ripgrep } from "../file/ripgrep"
-import { Instance } from "../project/instance"
 import { assertExternalDirectoryEffect } from "./external-directory"
-import { AppFileSystem } from "../filesystem"
+import DESCRIPTION from "./glob.txt"
+import { Tool } from "./tool"
 
 export const GlobTool = Tool.define(
   "glob",
@@ -28,6 +28,7 @@ export const GlobTool = Tool.define(
       }),
       execute: (params: { pattern: string; path?: string }, ctx: Tool.Context) =>
         Effect.gen(function* () {
+          const ins = yield* InstanceState.context
           yield* ctx.ask({
             permission: "glob",
             patterns: [params.pattern],
@@ -38,20 +39,24 @@ export const GlobTool = Tool.define(
             },
           })
 
-          let search = params.path ?? Instance.directory
-          search = path.isAbsolute(search) ? search : path.resolve(Instance.directory, search)
+          let search = params.path ?? ins.directory
+          search = path.isAbsolute(search) ? search : path.resolve(ins.directory, search)
+          const info = yield* fs.stat(search).pipe(Effect.catch(() => Effect.succeed(undefined)))
+          if (info?.type === "File") {
+            throw new Error(`glob path must be a directory: ${search}`)
+          }
           yield* assertExternalDirectoryEffect(ctx, search, { kind: "directory" })
 
           const limit = 100
           let truncated = false
-          const files = yield* rg.files({ cwd: search, glob: [params.pattern] }).pipe(
+          const files = yield* rg.files({ cwd: search, glob: [params.pattern], signal: ctx.abort }).pipe(
             Stream.mapEffect((file) =>
```


*... and more files (showing first 5)*

## Recommendations

Based on the changes, the following files in Alexi should be reviewed:

- `src/agent/index.ts` - incorporate new agent patterns from packages/opencode/src/agent/agent.ts
- `src/agent/index.ts` - incorporate new agent patterns from packages/opencode/src/agent/prompt/compaction.txt
- `src/agent/index.ts` - incorporate patterns from opencode packages/opencode/src/agent/agent.ts
- `src/agent/index.ts` - incorporate patterns from opencode packages/opencode/test/agent/agent.test.ts
- `src/permission/` - review permission changes from packages/opencode/src/permission/index.ts
- `src/permission/` - review permission changes from packages/opencode/test/kilocode/permission/next.always-rules.test.ts
- `src/permission/` - review permission changes from packages/opencode/test/permission/next.test.ts
- `src/tool/bash.test.ts` - update based on kilocode packages/opencode/test/tool/bash.test.ts changes
- `src/tool/bash.ts` - update based on kilocode packages/opencode/src/tool/bash.ts changes
- `src/tool/bash.txt.ts` - update based on kilocode packages/opencode/src/tool/bash.txt changes
- `src/tool/edit.test.ts` - update based on opencode packages/opencode/test/tool/edit.test.ts changes
- `src/tool/external-directory.ts` - update based on opencode packages/opencode/src/tool/external-directory.ts changes
- `src/tool/glob.test.ts` - update based on opencode packages/opencode/test/tool/glob.test.ts changes
- `src/tool/glob.ts` - update based on opencode packages/opencode/src/tool/glob.ts changes
- `src/tool/grep.test.ts` - update based on opencode packages/opencode/test/tool/grep.test.ts changes
- `src/tool/grep.ts` - update based on opencode packages/opencode/src/tool/grep.ts changes
- `src/tool/ls.ts` - update based on opencode packages/opencode/src/tool/ls.ts changes
- `src/tool/models-api.json.ts` - update based on kilocode packages/opencode/test/tool/fixtures/models-api.json changes
- `src/tool/question.test.ts` - update based on kilocode packages/opencode/test/tool/question.test.ts changes
- `src/tool/question.ts` - update based on kilocode packages/opencode/src/tool/question.ts changes
- `src/tool/read.ts` - update based on kilocode packages/opencode/src/tool/read.ts changes
- `src/tool/recall.test.ts` - update based on kilocode packages/opencode/test/tool/recall.test.ts changes
- `src/tool/registry.test.ts` - update based on opencode packages/opencode/test/tool/registry.test.ts changes
- `src/tool/registry.ts` - update based on kilocode packages/opencode/src/tool/registry.ts changes
- `src/tool/registry.ts` - update based on opencode packages/opencode/src/tool/registry.ts changes
- `src/tool/skill.test.ts` - update based on opencode packages/opencode/test/tool/skill.test.ts changes
- `src/tool/skill.ts` - update based on opencode packages/opencode/src/tool/skill.ts changes
- `src/tool/todo.ts` - update based on kilocode packages/opencode/src/tool/todo.ts changes
- `src/tool/tool-define.test.ts` - update based on kilocode packages/opencode/test/tool/tool-define.test.ts changes
- `src/tool/tool.ts` - update based on kilocode packages/opencode/src/tool/tool.ts changes
- `src/tool/truncation.test.ts` - update based on kilocode packages/opencode/test/tool/truncation.test.ts changes
