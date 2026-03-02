# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

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
- Security scanning workflow with CodeQL and npm audit
  - Weekly scheduled security scans
  - CodeQL analysis for TypeScript code
  - NPM audit for dependency vulnerabilities
  - Runs on pull requests and pushes to master branch
- Dependabot configuration for automated dependency updates
  - Weekly dependency update checks
  - Automatic grouping of dev dependencies
  - Limited to 10 open pull requests at a time
  - Covers TypeScript, ESLint, Vitest, and type definitions
- CI workflow enhancements
  - Coverage threshold enforcement at 40 percent
  - Automatic PR comments with coverage reports
  - JSON summary reporter for coverage data
  - Resilient coverage comment handling with continue-on-error

### Changed

- Updated documentation-update.yml workflow with improved file path handling
  - File paths in scope.md now include full relative paths (e.g., docs/ARCHITECTURE.md)
  - Clarified CHANGELOG.md location in repository root (not docs/)
  - Removed zero-width space characters from workflow expressions
  - Enhanced documentation scope comments for bot guidance
- Enhanced write and edit tools with relative path resolution
  - Tools now resolve relative paths using workdir context for permission checks
  - Permission getResource functions receive ToolContext for path resolution
  - Context parameter added to getResource signature in ToolDefinition interface
- Updated agenticChat module with permission configuration
  - Project root set to workdir for permission checks
  - External directories enabled for agentic operations
  - High-priority allow rules for write and execute actions
- Updated env.ts to export env function with proper return type handling
- Vitest configuration updated with json-summary reporter
  - Added json-summary to coverage reporters for CI integration
  - Coverage thresholds adjusted to match current coverage levels

### Fixed

- Resolved relative path handling in write/edit tools for CI permission checks
- Fixed zero-width space characters in GitHub workflow expressions
- Corrected file path specifications in documentation workflow scope
- Coverage threshold check now properly reads from coverage-summary.json
- Coverage PR comments now handle missing coverage files gracefully

## [0.1.3] - 2024-01-XX

### Added

- Initial release with multi-provider support
- Intelligent auto-routing based on prompt analysis
- Session management with persistence
- Rule-based configuration system
- Autonomous self-updating from upstream repositories

[Unreleased]: https://github.com/ausardcompany/sap-bot-orchestrator/compare/v0.1.3...HEAD
[0.1.3]: https://github.com/ausardcompany/sap-bot-orchestrator/releases/tag/v0.1.3
