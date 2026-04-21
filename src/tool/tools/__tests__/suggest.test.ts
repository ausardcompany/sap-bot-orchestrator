import { describe, it, expect } from 'vitest';
import { suggestTool } from '../suggest.js';
import type { ToolContext } from '../../index.js';

describe('Suggest Tool', () => {
  const context: ToolContext = { workdir: '/test' };

  describe('Basic suggestion', () => {
    it('should create a suggestion with text only', async () => {
      const result = await suggestTool.executeUnsafe(
        {
          suggestion: 'Consider using const instead of let for immutable variables',
        },
        context
      );

      expect(result.success).toBe(true);
      expect(result.data?.type).toBe('suggestion');
      expect(result.data?.suggestion).toBe(
        'Consider using const instead of let for immutable variables'
      );
      expect(result.data?.file).toBeUndefined();
      expect(result.data?.line).toBeUndefined();
    });
  });

  describe('Suggestion with file context', () => {
    it('should create a suggestion with file path', async () => {
      const result = await suggestTool.executeUnsafe(
        {
          suggestion: 'Add error handling for this API call',
          file: 'src/api/client.ts',
        },
        context
      );

      expect(result.success).toBe(true);
      expect(result.data?.type).toBe('suggestion');
      expect(result.data?.suggestion).toBe('Add error handling for this API call');
      expect(result.data?.file).toBe('src/api/client.ts');
      expect(result.data?.line).toBeUndefined();
    });

    it('should create a suggestion with file and line number', async () => {
      const result = await suggestTool.executeUnsafe(
        {
          suggestion: 'This function could be simplified using array methods',
          file: 'src/utils/helpers.ts',
          line: 42,
        },
        context
      );

      expect(result.success).toBe(true);
      expect(result.data?.type).toBe('suggestion');
      expect(result.data?.suggestion).toBe(
        'This function could be simplified using array methods'
      );
      expect(result.data?.file).toBe('src/utils/helpers.ts');
      expect(result.data?.line).toBe(42);
    });
  });

  describe('Parameter validation', () => {
    it('should require suggestion text', async () => {
      const result = await suggestTool.executeUnsafe({} as any, context);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid parameters');
    });

    it('should accept line number as number', async () => {
      const result = await suggestTool.executeUnsafe(
        {
          suggestion: 'Test suggestion',
          line: 123,
        },
        context
      );

      expect(result.success).toBe(true);
      expect(result.data?.line).toBe(123);
    });
  });

  describe('Suggestion formatting', () => {
    it('should preserve multiline suggestions', async () => {
      const multilineSuggestion = `Consider refactoring this code:
- Extract the validation logic into a separate function
- Add type guards for better type safety
- Use early returns to reduce nesting`;

      const result = await suggestTool.executeUnsafe(
        {
          suggestion: multilineSuggestion,
          file: 'src/validators.ts',
        },
        context
      );

      expect(result.success).toBe(true);
      expect(result.data?.suggestion).toBe(multilineSuggestion);
    });

    it('should handle suggestions with code blocks', async () => {
      const suggestionWithCode = `Replace this:
\`\`\`typescript
if (x) { return true; } else { return false; }
\`\`\`
With:
\`\`\`typescript
return Boolean(x);
\`\`\``;

      const result = await suggestTool.executeUnsafe(
        {
          suggestion: suggestionWithCode,
        },
        context
      );

      expect(result.success).toBe(true);
      expect(result.data?.suggestion).toBe(suggestionWithCode);
    });
  });
});
