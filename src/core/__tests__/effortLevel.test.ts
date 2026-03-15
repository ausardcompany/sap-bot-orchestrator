import { describe, it, expect } from 'vitest';
import {
  type EffortLevel,
  EFFORT_CONFIGS,
  DEFAULT_EFFORT,
  EFFORT_LEVELS,
  parseEffortLevel,
  getEffortConfig,
} from '../effortLevel.js';

describe('effortLevel', () => {
  describe('EFFORT_CONFIGS', () => {
    it('should define configs for all three levels', () => {
      expect(Object.keys(EFFORT_CONFIGS)).toEqual(['low', 'medium', 'high']);
    });

    it('low should be fast & cheap', () => {
      const cfg = EFFORT_CONFIGS.low;
      expect(cfg.label).toBe('Low (fast & cheap)');
      expect(cfg.maxIterations).toBe(15);
      expect(cfg.preferCheap).toBe(true);
      expect(cfg.maxTokens).toBe(2048);
      expect(cfg.thinkingBudget).toBe(0);
      expect(cfg.compactionThreshold).toBe(0.5);
    });

    it('medium should match current defaults (50 iterations, 16384 tokens, no preferCheap)', () => {
      const cfg = EFFORT_CONFIGS.medium;
      expect(cfg.label).toBe('Medium (balanced)');
      expect(cfg.maxIterations).toBe(50);
      expect(cfg.preferCheap).toBe(false);
      expect(cfg.maxTokens).toBe(16384);
      expect(cfg.thinkingBudget).toBe(0);
      expect(cfg.compactionThreshold).toBe(0.75);
    });

    it('high should be thorough', () => {
      const cfg = EFFORT_CONFIGS.high;
      expect(cfg.label).toBe('High (thorough)');
      expect(cfg.maxIterations).toBe(100);
      expect(cfg.preferCheap).toBe(false);
      expect(cfg.maxTokens).toBe(32768);
      expect(cfg.thinkingBudget).toBe(10000);
      expect(cfg.compactionThreshold).toBe(0.9);
    });

    it('maxIterations should increase with effort level', () => {
      expect(EFFORT_CONFIGS.low.maxIterations).toBeLessThan(EFFORT_CONFIGS.medium.maxIterations);
      expect(EFFORT_CONFIGS.medium.maxIterations).toBeLessThan(EFFORT_CONFIGS.high.maxIterations);
    });

    it('maxTokens should increase with effort level', () => {
      expect(EFFORT_CONFIGS.low.maxTokens).toBeLessThan(EFFORT_CONFIGS.medium.maxTokens);
      expect(EFFORT_CONFIGS.medium.maxTokens).toBeLessThan(EFFORT_CONFIGS.high.maxTokens);
    });
  });

  describe('DEFAULT_EFFORT', () => {
    it('should be medium', () => {
      expect(DEFAULT_EFFORT).toBe('medium');
    });
  });

  describe('EFFORT_LEVELS', () => {
    it('should contain all three levels in order', () => {
      expect(EFFORT_LEVELS).toEqual(['low', 'medium', 'high']);
    });
  });

  describe('parseEffortLevel', () => {
    it('should parse valid effort levels', () => {
      expect(parseEffortLevel('low')).toBe('low');
      expect(parseEffortLevel('medium')).toBe('medium');
      expect(parseEffortLevel('high')).toBe('high');
    });

    it('should be case-insensitive', () => {
      expect(parseEffortLevel('LOW')).toBe('low');
      expect(parseEffortLevel('Medium')).toBe('medium');
      expect(parseEffortLevel('HIGH')).toBe('high');
    });

    it('should trim whitespace', () => {
      expect(parseEffortLevel('  low  ')).toBe('low');
      expect(parseEffortLevel(' medium ')).toBe('medium');
    });

    it('should return undefined for invalid values', () => {
      expect(parseEffortLevel('invalid')).toBeUndefined();
      expect(parseEffortLevel('')).toBeUndefined();
      expect(parseEffortLevel('max')).toBeUndefined();
      expect(parseEffortLevel('1')).toBeUndefined();
    });
  });

  describe('getEffortConfig', () => {
    it('should return correct config for each level', () => {
      const levels: EffortLevel[] = ['low', 'medium', 'high'];
      for (const level of levels) {
        expect(getEffortConfig(level)).toBe(EFFORT_CONFIGS[level]);
      }
    });
  });
});
