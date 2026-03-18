# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.4] - 2026-03-18

### Added

- Autocomplete engine for slash commands, models, and file paths
  - Framework-agnostic completer module supporting both readline REPL and Ink TUI
  - Fuzzy matching for slash commands with support for aliases
  - Model name completion for `/model` command using SAP Orchestration models
  - File path completion for commands like `/export`, `/import`, and `@file` references
  - Keyboard navigation (Up/Down/Tab) for autocomplete suggestions
  - Registered 52 slash commands across 5 categories (general, model, session, config, git)
- User configuration persistence system
  - New `src/config/userConfig.ts` module for centralized config management
  - Default model persistence to `~/.alexi/config.json`
  - `/model` command now saves selected model as default for future sessions
  - Key-level accessors for reading/writing individual config values
- Instruction file management system
  - `/memory` command for listing and editing instruction files
  - Support for project-level AGENTS.md (workdir/AGENTS.md)
  - Support for user-level ALEXI.md (~/.alexi/ALEXI.md)
  - Support for project-level rule files (workdir/.alexi/rules/*.md)
  - `/memory edit [project|user]` opens files in $EDITOR
  - `/memory init` creates AGENTS.md from template
  - All instruction files loaded into system prompt automatically
- WarpGrep codebase search tool
  - AI-powered semantic code search via `codebase_search` tool
  - Integration with @morphllm/morphsdk for intelligent code discovery
  - Returns relevant code spans with file paths and line numbers
  - Free tier proxy support via Kilo API gateway
- Bash command hierarchy system
  - Progressive permission rules for bash commands
  - Hierarchical approval levels (e.g., "npm", "npm install", "npm install lodash")
  - Allows users to approve commands at different granularity levels
- CI Auto-Fix workflow
  - Automated CI failure detection and repair for auto/* branches
  - Collects failed job logs and error messages
  - Runs Alexi agent with targeted fix prompts
  - Verifies fixes by re-running failed checks
  - Automatic commit and push of fixes
  - Retry limit (2 per day per branch) to prevent infinite loops
  - Support for manual workflow dispatch with run ID and branch inputs

### Changed

- Enhanced system prompt assembly with multi-source instruction loading
  - `buildAssembledSystemPrompt` now loads AGENTS.md, ALEXI.md, and .alexi/rules/*.md
  - Instruction files loaded in priority order with proper XML tagging
  - User-level instructions persist across all projects
  - Project-level rules override user-level instructions
- Default model resolution order updated
  - Order: AICORE_MODEL env var, ~/.alexi/config.json, fallback to 'gpt-4o'
  - `getDefaultModel()` now reads from persistent user config
  - `/model` command persists selection for future sessions
- Readline REPL completer integration
  - Completer now returns real completions for slash commands, models, and paths
  - Tab key triggers autocomplete instead of agent cycling when completions exist
  - Agent cycling preserved when no completions match
- Interactive REPL command handling
  - `/memory` command repurposed for instruction file management
  - `/mem` command now handles memories (search, stats, export)
  - `/config` command now uses centralized config module
  - Improved `/model` command with default persistence feedback
- Sound notification system
  - Refactored to use centralized `userConfig` module
  - Removed inline config.json I/O in favor of shared API

### Fixed

- Clipboard image paste on macOS now uses osascript fallback when pngpaste unavailable
- Slash commands properly intercepted in TUI before sending to LLM
- Command Palette displays all registered slash commands correctly

## [0.2.2] - 2026-03-15

### Fixed

- `Ctrl+V` screenshot paste on macOS now works without installing `pngpaste` — added native `osascript` fallback that uses AppleScript to read clipboard images

## [0.2.1] - 2026-03-15

### Fixed

- Slash commands (`/help`, `/model`, `/exit`, etc.) were leaking directly to the LLM in the TUI instead of being intercepted by the command handler
- Command Palette (`Ctrl+K`) was opening with an empty command list

### Added

- Inline autocomplete for slash commands in the TUI input box — shows filtered suggestions when typing `/`
- Keyboard navigation (Up/Down/Tab) and acceptance (Enter/Tab) for autocomplete suggestions
- Command Palette now displays all 11 registered slash commands

## [0.2.0] - 2026-03-14

### Added

- Comprehensive unit tests for file operation tools
  - Added tests for read tool (20+ test cases covering file/directory reading, offsets, limits)
  - Added tests for write tool (18+ test cases covering file creation, overwriting, directory creation)
  - Added tests for glob tool (16+ test cases covering pattern matching, recursive search)
  - Added tests for grep tool (20+ test cases covering regex patterns, file filtering, line matching)
  - All tests use temporary directories with proper cleanup
  - Tests verify actual file system changes, not just return values
  - Mock permission system to bypass checks during testing
- Enhanced models command with SAP AI Core deployment listing functionality
  - Query deployments directly from SAP AI Core using DeploymentApi
  - Filter deployments by status (RUNNING, PENDING, STOPPED, etc.)
  - Filter deployments by scenario ID
  - Specify custom resource group with `-g, --resource-group` option
  - JSON output support with `-j, --json` flag
  - Color-coded status display with formatted table output
  - Fallback to proxy endpoint with `--proxy` flag
  - Display deployment URLs for running deployments
- New dependency: `@sap-ai-sdk/ai-api` version 2.7.0 for direct AI Core API access
- Agentic file write capabilities with autonomous permission management
  - Automatic permission rules for write operations in workdir
  - Automatic permission rules for execute operations
  - Priority-based permission system (priority 200) to override default ask prompts
  - External directory support for full agentic capability
- Documentation for testing strategy and automation workflows
  - Added docs/TESTING.md with comprehensive testing guide
  - Added docs/AUTOMATION.md with workflow documentation
  - Includes testing best practices and CI/CD pipeline details

### Changed

- Enhanced tool system with context-aware path resolution
  - Tool permission system now receives ToolContext in getResource function
  - Write and edit tools resolve relative paths using workdir context
  - Enables proper permission checks for both absolute and relative paths
  - Maintains compatibility with CI/CD workflows
- Updated documentation-update.yml workflow with improved file path handling
  - File paths in scope.md now include full relative paths (e.g., docs/ARCHITECTURE.md)
  - Clarified CHANGELOG.md location in repository root (not docs/)
  - Removed zero-width space characters from workflow expressions
  - Enhanced documentation scope comments for bot guidance
- Updated agenticChat module with permission configuration
  - Project root set to workdir for permission checks
  - External directories enabled for agentic operations
  - High-priority allow rules for write and execute actions
- Updated env.ts to export env function with proper return type handling

### Fixed

- Resolved relative path handling in write/edit tools for CI permission checks
- Fixed zero-width space characters in GitHub workflow expressions
- Corrected file path specifications in documentation workflow scope
- Removed .env file from git tracking to prevent accidental credential exposure

### Removed

- .env file removed from version control (use .env.example as template)

## [0.1.3] - 2024-01-XX

### Added

- Initial release with multi-provider support
- Intelligent auto-routing based on prompt analysis
- Session management with persistence
- Rule-based configuration system
- Autonomous self-updating from upstream repositories

[Unreleased]: https://github.com/ausardcompany/alexi/compare/v0.2.4...HEAD
[0.2.4]: https://github.com/ausardcompany/alexi/compare/v0.2.2...v0.2.4
[0.2.2]: https://github.com/ausardcompany/alexi/compare/v0.2.1...v0.2.2
[0.2.1]: https://github.com/ausardcompany/alexi/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/ausardcompany/alexi/compare/v0.1.3...v0.2.0
[0.1.3]: https://github.com/ausardcompany/alexi/releases/tag/v0.1.3
