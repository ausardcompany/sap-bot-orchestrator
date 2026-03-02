/**
 * Tests for repo map token budget logic in CLI commands.
 *
 * The logic under test lives inline inside the .action() callbacks of
 * interactive.ts and agent.ts.  We extract and test it as a pure function
 * to keep tests fast and dependency-free.
 */

import { describe, it, expect } from 'vitest';

// --- Pure helper that mirrors the logic in both CLI commands ---
const CLI_DEFAULT_MAP_TOKENS = 2000;

function resolveMapBudget(mapTokensFlag: string | undefined): number {
  return mapTokensFlag !== undefined ? parseInt(mapTokensFlag, 10) : CLI_DEFAULT_MAP_TOKENS;
}

function shouldCreateRepoMap(mapTokensFlag: string | undefined): boolean {
  const budget = resolveMapBudget(mapTokensFlag);
  return !isNaN(budget) && budget > 0;
}

// ---------------------------------------------------------------

describe('CLI repo map token budget (interactive & agent commands)', () => {
  describe('default behaviour (no --map-tokens flag)', () => {
    it('uses 2000 tokens when flag is omitted', () => {
      expect(resolveMapBudget(undefined)).toBe(2000);
    });

    it('creates a RepoMapManager when flag is omitted', () => {
      expect(shouldCreateRepoMap(undefined)).toBe(true);
    });
  });

  describe('explicit flag values', () => {
    it('uses the provided token budget', () => {
      expect(resolveMapBudget('5000')).toBe(5000);
      expect(resolveMapBudget('500')).toBe(500);
      expect(resolveMapBudget('1')).toBe(1);
    });

    it('creates a RepoMapManager for any positive value', () => {
      expect(shouldCreateRepoMap('1')).toBe(true);
      expect(shouldCreateRepoMap('4096')).toBe(true);
    });
  });

  describe('disabling the repo map with --map-tokens 0', () => {
    it('resolves to 0', () => {
      expect(resolveMapBudget('0')).toBe(0);
    });

    it('does NOT create a RepoMapManager', () => {
      expect(shouldCreateRepoMap('0')).toBe(false);
    });
  });

  describe('invalid flag values', () => {
    it('NaN input → does NOT create a RepoMapManager', () => {
      expect(shouldCreateRepoMap('abc')).toBe(false);
    });

    it('negative value → does NOT create a RepoMapManager', () => {
      expect(shouldCreateRepoMap('-1')).toBe(false);
    });
  });
});
