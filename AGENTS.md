# AGENTS.md - AI Agent Guidelines for Alexi

This document provides essential information for AI coding agents working in this repository.

## Project Overview

Alexi is a TypeScript/Node.js CLI application - an intelligent LLM orchestrator for SAP AI Core.
It uses ES Modules (`"type": "module"`) and requires Node.js >= 22.12.0.

## Build, Lint, and Test Commands

```bash
# Building
npm run build          # Compile TypeScript to dist/
npm run typecheck      # Type-check without emitting files
npm run dev            # Run in development mode with tsx

# Linting & Formatting
npm run lint           # Run ESLint on src/ and tests/
npm run lint:fix       # Auto-fix ESLint issues
npm run format         # Format code with Prettier
npm run format:check   # Check formatting without changes

# Testing (Vitest)
npm test                              # Run all tests once
npm run test:watch                    # Run tests in watch mode
npm run test:coverage                 # Run tests with coverage report

# Run a single test file
npm test -- tests/orchestrator.test.ts
npm test -- tests/tool/tools/write.test.ts

# Run tests matching a pattern
npm test -- --grep "write tool"

# Run tests in a directory
npm test -- tests/tool/tools/
```

## Code Style Guidelines

### TypeScript & Formatting
- **Target**: ES2022, **Module**: NodeNext, **Strict mode**: Enabled
- 2 spaces indentation, single quotes, semicolons required
- 100 character line width, trailing commas (es5 style), LF line endings

### Import Conventions
```typescript
// Always use .js extension for local imports (required for ES Modules)
import { routePrompt } from './router.js';
import { SessionManager } from '../core/sessionManager.js';

// External imports first, then internal imports
import { z } from 'zod';
import * as fs from 'fs/promises';

import { defineTool } from '../index.js';
import type { ToolContext } from '../tool/index.js';
```

### Naming Conventions
| Element | Convention | Example |
|---------|------------|---------|
| Files | camelCase | `orchestrator.ts`, `sessionManager.ts` |
| Functions | camelCase | `sendChat()`, `routePrompt()` |
| Classes | PascalCase | `SessionManager`, `OrchestrationClient` |
| Interfaces/Types | PascalCase | `ToolContext`, `PermissionAction` |
| Constants | UPPER_SNAKE_CASE | `MAX_LINES`, `MAX_BYTES` |
| Unused params | Prefix with `_` | `_context`, `_unused` |

### Type Guidelines
```typescript
// Prefer interfaces for object shapes
interface ToolContext {
  workdir: string;
  signal?: AbortSignal;
}

// Use type for unions/intersections
type PermissionAction = 'read' | 'write' | 'execute';

// Use Zod for runtime validation
const ReadParamsSchema = z.object({
  filePath: z.string().describe('Absolute path to the file'),
  offset: z.number().optional(),
});

// Avoid `any` - use `unknown` and narrow types
// Prefix unused variables with underscore to avoid lint errors
```

### Error Handling Pattern
```typescript
// Standard result pattern used throughout codebase
interface ToolResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

// Error handling in async functions
try {
  const result = await riskyOperation();
  return { success: true, data: result };
} catch (err) {
  const message = err instanceof Error ? err.message : String(err);
  return { success: false, error: message };
}
```

### Async/Await
```typescript
// Always use async/await over raw promises
async function fetchData(): Promise<Data> {
  const response = await fetch(url);
  return await response.json();
}

// Use optional chaining and nullish coalescing
const value = context?.workdir ?? process.cwd();
```

## Testing Conventions

```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('Component Name', () => {
  let tempDir: string;
  let context: ToolContext;

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'test-'));
    context = { workdir: tempDir };
  });

  afterEach(async () => {
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  describe('feature', () => {
    it('should do something specific', async () => {
      // Arrange, Act, Assert
    });
  });
});
```

### Mocking Dependencies
```typescript
// Mock modules before importing
vi.mock('../src/providers/index.js', () => ({
  getProviderForModel: vi.fn(),
  getDefaultModel: vi.fn(),
}));

// Import after mocking
import { sendChat } from '../src/core/orchestrator.js';
```

## Commit Message Format

Uses conventional commits: `type(scope): description`

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`, `revert`
**Scopes**: `cli`, `core`, `providers`, `config`, `server`, `agent`, `tools`, `ci`, `deps`, `tests`

## Project Structure

```
src/
├── cli/          # CLI commands and program entry
├── core/         # Orchestrator, router, session management
├── providers/    # SAP Orchestration provider
├── agent/        # Agent system with specialized prompts
├── tool/         # Tool implementations (read, write, edit, glob, grep, etc.)
├── permission/   # Permission management
├── config/       # Environment and routing configuration
├── bus/          # Event bus for tool execution events
├── mcp/          # Model Context Protocol integration
└── utils/        # Shared utilities and logger
```

## ESLint Rules to Note
- `no-console`: warn (use logger utilities instead)
- `eqeqeq`: always use `===` and `!==`
- `curly`: always use braces for control statements
- `no-throw-literal`: throw Error objects, not strings
- `prefer-const`: use `const` when variable is not reassigned
