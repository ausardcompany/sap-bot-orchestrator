# Contributing to Alexi

Thank you for your interest in contributing to Alexi! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Documentation](#documentation)
- [Autonomous Sync System](#autonomous-sync-system)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and collaborative environment. We expect all contributors to:

- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what is best for the project
- Show empathy towards other contributors

## Getting Started

### Prerequisites

- Node.js 22 or higher
- npm or yarn package manager
- Git
- SAP AI Core credentials (for testing)
- Basic understanding of TypeScript and LLM concepts

### Initial Setup

1. **Fork the repository**

```bash
# Fork via GitHub UI, then clone your fork
git clone git@github.com:YOUR_USERNAME/sap-bot-orchestrator.git
cd sap-bot-orchestrator
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment**

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
# Edit .env with your SAP AI Core credentials
```

4. **Build the project**

```bash
npm run build
```

5. **Verify installation**

```bash
node dist/cli/program.js --help
```

### Development Environment

Recommended tools:

- **Editor**: VSCode with TypeScript and ESLint extensions
- **Terminal**: Modern terminal with color support
- **Git Client**: Command line git or GitHub Desktop

## Development Workflow

### 1. Create a Feature Branch

```bash
# Update main branch
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/your-feature-name
```

Branch naming conventions:

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions or updates

### 2. Make Changes

Follow the coding standards outlined below. Make small, focused commits:

```bash
# Stage changes
git add src/path/to/file.ts

# Commit with descriptive message
git commit -m "feat: add centralized logger utility"
```

### 3. Test Your Changes

```bash
# Run type checking
npm run typecheck

# Run linter
npm run lint

# Run tests
npm test

# Build the project
npm run build

# Test CLI commands
node dist/cli/program.js chat -m "test message"
```

### 4. Push and Create Pull Request

```bash
# Push to your fork
git push origin feature/your-feature-name
```

Then create a pull request via GitHub UI.

## Coding Standards

### TypeScript Guidelines

#### Type Safety

Always use explicit types where possible:

```typescript
// ✅ Good - explicit types
function processMessage(message: string): Promise<CompletionResult> {
  // Implementation
}

// ❌ Avoid - implicit any
function processMessage(message) {
  // Implementation
}
```

#### Type Assertions

Use proper type assertions with explicit casting:

```typescript
// ✅ Good - explicit type assertion
const enabled = (model as ModelCapability & { enabled?: boolean }).enabled;

// ❌ Avoid - any cast
const enabled = (model as any).enabled;
```

#### Interface Definitions

Define clear interfaces for all data structures:

```typescript
// ✅ Good - well-defined interface
interface ToolContext {
  workdir: string;
  signal?: AbortSignal;
  sessionId?: string;
}

// Use the interface
function executeTool(context: ToolContext): Promise<ToolResult> {
  // Implementation
}
```

### Logging Standards

Use the centralized logger instead of direct console calls:

```typescript
// ✅ Good - use centralized logger
import { logger } from './utils/logger.js';

function processData(data: string): void {
  logger.info('Processing data');
  logger.debug('Data details:', { length: data.length });
}

// ❌ Avoid - direct console usage
function processData(data: string): void {
  console.log('Processing data');
  console.debug('Data details:', { length: data.length });
}
```

Exception: The logger utility itself (`src/utils/logger.ts`) is allowed to use console.

### ESLint Compliance

The project uses ESLint with TypeScript support. Key rules:

```typescript
// ✅ Use const for variables that don't change
const maxRetries = 3;

// ✅ Use let for variables that do change
let attempts = 0;

// ❌ Never use var
var retries = 3; // Don't do this

// ✅ Always use === instead of ==
if (value === 'expected') {
  // Implementation
}

// ✅ Always use curly braces
if (condition) {
  doSomething();
}

// ❌ Don't omit curly braces
if (condition) doSomething(); // Don't do this
```

### Naming Conventions

```typescript
// Classes: PascalCase
class SessionManager { }

// Interfaces: PascalCase
interface ToolResult { }

// Functions: camelCase
function processRequest() { }

// Constants: UPPER_SNAKE_CASE
const MAX_RETRIES = 3;

// Private properties: camelCase with underscore prefix
class Example {
  private _internalState: string;
}
```

### File Organization

```typescript
// 1. Imports (external first, then internal)
import { z } from 'zod';
import * as fs from 'fs/promises';
import { defineTool } from '../index.js';

// 2. Type definitions
interface MyInterface { }
type MyType = string | number;

// 3. Constants
const DEFAULT_VALUE = 'default';

// 4. Implementation
export function myFunction() { }

// 5. Exports (if not inline)
export { myFunction };
```

### Documentation Comments

Use JSDoc for public APIs:

```typescript
/**
 * Execute a tool with permission checking
 * 
 * @param params - Tool parameters validated by Zod schema
 * @param context - Execution context with workdir and signal
 * @returns Promise resolving to tool execution result
 * @throws {Error} If permission is denied or execution fails
 */
async function execute(
  params: z.infer<TParams>,
  context: ToolContext
): Promise<ToolResult<TResult>> {
  // Implementation
}
```

## Testing Guidelines

### Unit Tests

Write unit tests for all new functionality:

```typescript
import { describe, it, expect } from 'vitest';
import { myFunction } from './myModule.js';

describe('myFunction', () => {
  it('should handle valid input', () => {
    const result = myFunction('valid');
    expect(result).toBe('expected');
  });

  it('should throw on invalid input', () => {
    expect(() => myFunction('')).toThrow();
  });
});
```

### Integration Tests

Test integration points between modules:

```typescript
describe('Tool System Integration', () => {
  it('should execute tool with permission check', async () => {
    const tool = defineTool({
      name: 'test-tool',
      // Tool definition
    });
    
    const result = await tool.execute(params, context);
    expect(result.success).toBe(true);
  });
});
```

### Testing Tools

The project uses:

- **Vitest**: Test runner and assertion library
- **TypeScript**: Type checking in tests
- **Mock Functions**: For testing isolated units

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

## Pull Request Process

### Before Submitting

1. **Update documentation**: If you've changed APIs or added features
2. **Add tests**: Ensure new code is covered by tests
3. **Run linter**: Fix all linting errors
4. **Run type check**: Ensure TypeScript compiles without errors
5. **Test locally**: Verify changes work as expected

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Changes Made
- List specific changes
- Include file paths if relevant

## Testing
Describe testing performed

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] All tests pass
- [ ] No new warnings
```

### Review Process

1. **Automated checks**: GitHub Actions will run tests and linting
2. **Documentation update**: Workflow will generate/update docs automatically
3. **Code review**: Maintainers will review your changes
4. **Feedback**: Address any requested changes
5. **Approval**: Once approved, PR will be merged

### Merge Strategy

- **Squash merge**: Multiple commits are squashed into one
- **Commit message**: Should follow conventional commit format
- **Branch deletion**: Feature branches are deleted after merge

## Documentation

### Documentation Standards

When updating documentation:

1. **Use clear language**: Write for developers of varying experience levels
2. **Include examples**: Show actual code from the repository
3. **Add diagrams**: Use Mermaid for architecture and flow diagrams
4. **Keep it current**: Update docs when changing related code
5. **No emojis**: Use professional technical language

### Documentation Structure

```
docs/
├── ARCHITECTURE.md    # System architecture and design decisions
├── API.md            # API reference and TypeScript interfaces
├── AUTOMATION.md     # CI/CD and automation workflows
├── CONTRIBUTING.md   # This file
├── ROUTING.md        # Model routing documentation
├── PROVIDERS.md      # Provider integration docs
├── CONFIGURATION.md  # Configuration options
└── TESTING.md        # Testing guide
```

### Mermaid Diagrams

Use Mermaid for diagrams in documentation:

```markdown
\`\`\`mermaid
flowchart TB
    Start([Start]) --> Process[Process Step]
    Process --> End([End])
\`\`\`
```

### Automatic Documentation Updates

The project uses an automated documentation workflow:

- Triggers on pull requests
- Analyzes code changes
- Updates relevant documentation files
- Commits changes back to the PR

See [AUTOMATION.md](AUTOMATION.md) for details.

## Autonomous Sync System

Alexi automatically syncs with upstream repositories:

- **kilocode**: Kilo AI coding assistant
- **opencode**: OpenCode AI terminal assistant  
- **claude-code**: Anthropic's Claude Code CLI

### How It Works

1. **Daily sync**: Runs at 06:00 UTC
2. **Change detection**: Compares with last synced commits
3. **AI analysis**: Kilo AI analyzes upstream changes
4. **Auto-merge**: Creates and merges PRs automatically

### Contributing to Sync Process

If you're working on features that might conflict with upstream syncs:

1. **Review sync PRs**: Check recent sync pull requests
2. **Coordinate changes**: Discuss significant changes with maintainers
3. **Test compatibility**: Ensure your changes work with upstream features
4. **Document differences**: Note any intentional divergence from upstream

### Sync State

The sync state is tracked in `.github/last-sync-commits.json`. Do not manually edit this file unless you're a maintainer.

## Getting Help

### Resources

- **Documentation**: Read the docs in the `docs/` directory
- **Issues**: Check existing GitHub issues
- **Discussions**: Use GitHub Discussions for questions

### Asking Questions

When asking for help:

1. **Search first**: Check if your question has been answered
2. **Be specific**: Provide details about your issue
3. **Include context**: Share relevant code, error messages, and environment info
4. **Be patient**: Maintainers are volunteers

### Reporting Bugs

Use the bug report template:

```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Step one
2. Step two
3. Step three

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g., macOS 14.0]
- Node.js: [e.g., 22.0.0]
- Alexi version: [e.g., 0.1.3]

## Additional Context
Any other relevant information
```

## Recognition

Contributors are recognized in:

- GitHub contributors list
- Release notes
- Project README (for significant contributions)

Thank you for contributing to Alexi!
