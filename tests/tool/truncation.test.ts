/**
 * Tests for Configurable Tool Output Truncation
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { getTruncationLimits, truncateOutput, type TruncationConfig } from '../src/tool/index.js';

describe('Configurable Truncation', () => {
  describe('getTruncationLimits', () => {
    it('should return default limits when no config provided', () => {
      const limits = getTruncationLimits();
      expect(limits.maxLines).toBe(2000);
      expect(limits.maxBytes).toBe(51200);
    });

    it('should use global config limits', () => {
      const config: TruncationConfig = {
        maxLines: 3000,
        maxBytes: 100000,
      };
      const limits = getTruncationLimits(undefined, config);
      expect(limits.maxLines).toBe(3000);
      expect(limits.maxBytes).toBe(100000);
    });

    it('should apply tool-specific overrides', () => {
      const config: TruncationConfig = {
        maxLines: 1000,
        maxBytes: 50000,
        toolSpecific: {
          grep: {
            maxLines: 5000,
            maxBytes: 150000,
          },
        },
      };
      const limits = getTruncationLimits('grep', config);
      expect(limits.maxLines).toBe(5000);
      expect(limits.maxBytes).toBe(150000);
    });

    it('should partially override with tool-specific config', () => {
      const config: TruncationConfig = {
        maxLines: 1000,
        maxBytes: 50000,
        toolSpecific: {
          read: {
            maxBytes: 25000,
            // maxLines not specified, should use global
          },
        },
      };
      const limits = getTruncationLimits('read', config);
      expect(limits.maxLines).toBe(1000); // from global
      expect(limits.maxBytes).toBe(25000); // from tool-specific
    });

    it('should fall back to defaults for unknown tool', () => {
      const config: TruncationConfig = {
        maxLines: 3000,
        toolSpecific: {
          grep: { maxLines: 5000 },
        },
      };
      const limits = getTruncationLimits('unknown-tool', config);
      expect(limits.maxLines).toBe(3000); // uses global, not grep's
    });
  });

  describe('truncateOutput', () => {
    it('should not truncate small output', () => {
      const output = 'Hello, world!';
      const result = truncateOutput(output);
      expect(result.truncated).toBe(false);
      expect(result.content).toBe(output);
    });

    it('should truncate by line count', () => {
      const config: TruncationConfig = { maxLines: 5 };
      const lines = Array.from({ length: 10 }, (_, i) => `Line ${i + 1}`);
      const output = lines.join('\n');

      const result = truncateOutput(output, undefined, config);
      expect(result.truncated).toBe(true);
      expect(result.content.split('\n').length).toBe(5);
    });

    it('should truncate by byte count', () => {
      const config: TruncationConfig = { maxBytes: 100 };
      const output = 'x'.repeat(200);

      const result = truncateOutput(output, undefined, config);
      expect(result.truncated).toBe(true);
      expect(Buffer.byteLength(result.content, 'utf-8')).toBeLessThanOrEqual(100);
    });

    it('should use tool-specific limits for truncation', () => {
      const config: TruncationConfig = {
        maxLines: 5,
        toolSpecific: {
          grep: { maxLines: 10 },
        },
      };
      const lines = Array.from({ length: 15 }, (_, i) => `Line ${i + 1}`);
      const output = lines.join('\n');

      // Default tool: 5 lines
      const result1 = truncateOutput(output, 'read', config);
      expect(result1.content.split('\n').length).toBe(5);

      // grep tool: 10 lines
      const result2 = truncateOutput(output, 'grep', config);
      expect(result2.content.split('\n').length).toBe(10);
    });

    it('should handle unicode correctly', () => {
      const config: TruncationConfig = { maxBytes: 50 };
      // Each emoji is 4 bytes
      const output = '😀'.repeat(20); // 80 bytes

      const result = truncateOutput(output, undefined, config);
      expect(result.truncated).toBe(true);
      expect(Buffer.byteLength(result.content, 'utf-8')).toBeLessThanOrEqual(50);
    });

    it('should truncate by lines first, then bytes', () => {
      const config: TruncationConfig = {
        maxLines: 10,
        maxBytes: 100,
      };
      // Create 5 lines of 50 bytes each = 250 bytes total
      const lines = Array.from({ length: 5 }, () => 'x'.repeat(50));
      const output = lines.join('\n');

      const result = truncateOutput(output, undefined, config);
      expect(result.truncated).toBe(true);
      // Should keep all 5 lines (under 10 limit) but truncate bytes
      expect(Buffer.byteLength(result.content, 'utf-8')).toBeLessThanOrEqual(100);
    });
  });
});
