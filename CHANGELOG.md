# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.7] - 2026-03-21

### Added

- Ink TUI rendering optimization using Static component for completed messages
  - Completed messages now render once and scroll into terminal scrollback
  - Only active streaming content and tool calls remain in dynamic viewport
  - Significantly reduces re-render overhead for long conversations
  - Improved terminal scrollback navigation and history access
- Comprehensive TUI component test coverage
  - Added tests for AttachmentBar, ChatContext, MarkdownRenderer, McpManager
  - Added tests for MessageArea, MessageBubble, SessionList, StatusBar
  - Added tests for useClipboardImage and useCommands hooks
  - Uses ink-testing-library with React context mocking
  - Validates component rendering, state management, and user interactions
- Permission system pattern matching with null sentinel support
  - Added matchesPattern and evaluatePatternRules functions
  - Supports glob patterns with wildcards for granular permission control
  - Null values in permission config act as delete sentinels for rule removal
  - Enhanced PermissionNext utilities for config parsing and serialization
- CI Auto-Fix workflow improvements
  - Deterministic quick fixes now commit independently before agent step
  - Preserves ci-failures.md across checkout operations
  - Ensures prompt files from master are available on PR branches
  - Re-verification after quick fixes skips agent step when all checks pass
  - Improved retry logic with better handling of transient failures
- Documentation workflow retry logic
  - Automatic retry on transient network errors (socket hang up, ECONNRESET, ETIMEDOUT)
  - Up to 2 attempts with 30-second delay between retries
  - Enhanced failure comment condition to catch both outcome and output failures
- Presentation generation script for Alexi project
  - Generates PowerPoint and PDF presentations with SAP corporate branding
  - 17-slide deck covering architecture, features, workflows, and roadmap
  - Includes Georgia/Calibri font pairing and professional color palette
  - Exports slide previews as JPEG images

### Changed

- TUI MessageArea component now streaming-only
  - Removed messages prop and completed message rendering logic
  - Only renders active tool calls and streaming assistant text
  - Completed messages handled by Static component in App.tsx
  - Simplified component interface and reduced rendering complexity
- TUI App.tsx split into Static and dynamic viewport sections
  - Static section renders completed messages once into terminal scrollback
  - Dynamic viewport (fixed height) contains header, streaming area, input, status bar
  - Improved layout stability with flexShrink={0} on input and status bar
  - Enhanced streaming message handling with completed tool calls transfer
- MarkdownRenderer width calculation improvements
  - Added maxWidth prop for explicit width override
  - Accounts for full padding chain (6 chars) plus 2 chars safety margin
  - Default effective width: columns - 8 for proper text wrapping
  - Prevents markdown content overflow in narrow terminals
- MessageBubble user message layout enhanced
  - User messages now display on separate lines for better readability
  - Content wrapped with proper text wrapping for long messages
  - Maintains timestamp and image attachment display
- ChatContext state management expanded
  - Added clearCompletedToolCalls action and reducer case
  - Enables proper cleanup after transferring tool calls to completed messages
  - Maintains separation between active and completed tool call state
- CI Auto-Fix workflow execution order optimized
  - Quick fixes (lint:fix, format) now commit before agent step
  - Agent step only runs if quick fixes don't resolve all failures
  - Reduced unnecessary agent invocations for simple formatting issues
- Documentation workflow comment logic improved
  - Fixed failure comment condition to trigger on both outcome and output failures
  - Enhanced error detection with retry attempt tracking

### Fixed

- TUI message rendering performance for long conversations
  - Eliminated re-rendering of all historical messages on each update
  - Terminal scrollback now accessible for reviewing conversation history
  - Resolved memory and performance issues with 100+ message conversations
- Permission pattern matching edge cases
  - Null entries in PermissionObject now correctly skipped during parsing
  - Null top-level PermissionRule values handled without errors
  - Config serialization handles null sentinels without creating invalid rules
- CI Auto-Fix workflow ci-failures.md preservation
  - File no longer lost during git checkout operations
  - Temporary backup created before checkout and restored after
- CI Auto-Fix workflow prompt file availability
  - Prompt templates from master branch now accessible on PR branches
  - Files checked out from origin/master without being committed to PR
- Documentation workflow transient failure handling
  - Network errors no longer cause immediate workflow failure
  - Retry logic distinguishes between transient and permanent failures

## [0.2.6] - 2026-03-19

### Added

- Unit tests for TUI slash commands (`/image` and `/clear-images`)
  - Tests command registration with correct names and aliases
  - Tests clipboard paste functionality when no arguments provided
  - Tests file path handling for image attachments
  - Uses ink-testing-library with React context mocking
  - Comprehensive coverage of command dispatch logic
- Support for graceful tree-sitter parser initialization failures
  - Parser functions now return null instead of throwing when Parser is unavailable
  - Enables operation in environments without native bindings

### Changed

- Enhanced user configuration API with batch update support
  - Added `updateGlobal()` function for atomic multi-key updates
  - Added `UpdateGlobalOptions` interface with disposal control
  - Maintains backward compatibility with default dispose behavior
- Edit tool now preserves line endings during replacements
  - Automatically detects CRLF vs LF line endings in target files
  - Normalizes oldString and newString parameters to match file format
  - Ensures consistent line ending style throughout edited files

### Fixed

- Tree-sitter parser initialization no longer fails in environments without native support
- Edit tool correctly handles multiline replacements with different line ending styles

## [0.2.5] - 2026-03-19

### Added

- Persistent default model configuration saved to user config file
- Autocomplete engine for slash commands, model names, and file paths in interactive mode
- Instruction file management system with multi-layer prompt assembly
  - Project-level AGENTS.md support
  - User-level ~/.alexi/ALEXI.md for global instructions
  - Project-level .alexi/rules/*.md for scoped rules
- /memory command for managing instruction files (list, edit, init)
- /mem command for memory management (list, search, delete, clear, stats, export)
- CI Auto-Fix workflow that automatically fixes failing CI checks on auto/* branches
  - Collects failed job logs and error messages
  - Uses Alexi agent mode to apply targeted fixes
  - Verifies fixes and commits changes automatically
  - Rate-limited to prevent infinite loops (max 2 runs per branch per day)
- New tools:
  - bash-hierarchy: Hierarchical permission rules for bash commands
  - warpgrep: AI-powered semantic code search using WarpGrep/Morph SDK
- Tab completion in readline REPL for commands, models, and file paths

### Changed

- Model switching now persists selection to ~/.alexi/config.json as default
- System prompt assembly now loads instruction files in layered order
- Autocomplete system unified between readline REPL and Ink TUI
- Documentation workflow improved with better file path handling
- Enhanced clipboard utilities with osascript fallback for macOS
- Updated dependencies:
  - @inquirer/prompts from 8.3.0 to 8.3.2
  - @commitlint/config-conventional from 20.4.3 to 20.5.0
  - @typescript-eslint/parser from 8.34.1 to 8.57.0
  - @vitejs/plugin-react from 5.2.0 to 6.0.1
  - @vitest/coverage-v8 from 4.0.0 to 4.1.0
  - hono from 4.12.5 to 4.12.8
  - nanoid from 5.1.6 to 5.1.7
  - puppeteer from 24.38.0 to 24.39.1
  - simple-git from 3.32.3 to 3.33.0
  - vitest from 4.0.0 to 4.1.0

### Fixed

- Slash commands now properly intercepted in TUI instead of leaking to LLM
- Command Palette no longer shows empty command list
- Edit tool now handles multiline strings correctly in exact replacements

## [0.2.4] - 2026-03-18

### Added

- Upstream sync improvements with better analysis and conflict resolution

## [0.2.3] - 2026-03-16

### Added

- Enhanced sync workflow with improved upstream tracking

## [0.2.2] - 2026-03-15

### Fixed

- Ctrl+V screenshot paste on macOS now works without installing pngpaste — added native osascript fallback that uses AppleScript to read clipboard images

## [0.2.1] - 2026-03-15

### Fixed

- Slash commands (/help, /model, /exit, etc.) were leaking directly to the LLM in the TUI instead of being intercepted by the command handler
- Command Palette (Ctrl+K) was opening with an empty command list

### Added

- Inline autocomplete for slash commands in the TUI input box — shows filtered suggestions when typing /
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
  - Specify custom resource group with -g, --resource-group option
  - JSON output support with -j, --json flag
  - Color-coded status display with formatted table output
  - Fallback to proxy endpoint with --proxy flag
  - Display deployment URLs for running deployments
- New dependency: @sap-ai-sdk/ai-api version 2.7.0 for direct AI Core API access
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

[Unreleased]: https://github.com/ausardcompany/alexi/compare/v0.2.7...HEAD
[0.2.7]: https://github.com/ausardcompany/alexi/compare/v0.2.6...v0.2.7
[0.2.6]: https://github.com/ausardcompany/alexi/compare/v0.2.5...v0.2.6
[0.2.5]: https://github.com/ausardcompany/alexi/compare/v0.2.4...v0.2.5
[0.2.4]: https://github.com/ausardcompany/alexi/compare/v0.2.3...v0.2.4
[0.2.3]: https://github.com/ausardcompany/alexi/compare/v0.2.2...v0.2.3
[0.2.2]: https://github.com/ausardcompany/alexi/compare/v0.2.1...v0.2.2
[0.2.1]: https://github.com/ausardcompany/alexi/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/ausardcompany/alexi/compare/v0.1.3...v0.2.0
[0.1.3]: https://github.com/ausardcompany/alexi/releases/tag/v0.1.3
