import { describe, it, expect } from 'vitest';
import { isLingModel, supportsMultilingual } from '../../../src/tool/model-match.js';

describe('Model Match', () => {
  describe('isLingModel', () => {
    it('should identify Ling models', () => {
      expect(isLingModel('ling-1')).toBe(true);
      expect(isLingModel('ling-v2')).toBe(true);
      expect(isLingModel('Ling-Pro')).toBe(true);
      expect(isLingModel('LING-ADVANCED')).toBe(true);
    });

    it('should exclude false positives', () => {
      expect(isLingModel('kling-1')).toBe(false);
      expect(isLingModel('bling-model')).toBe(false);
      expect(isLingModel('spelling-checker')).toBe(false);
      expect(isLingModel('darling-ai')).toBe(false);
      expect(isLingModel('sterling-v1')).toBe(false);
    });

    it('should reject non-Ling models', () => {
      expect(isLingModel('gpt-4')).toBe(false);
      expect(isLingModel('claude-3')).toBe(false);
      expect(isLingModel('gemini-pro')).toBe(false);
    });
  });

  describe('supportsMultilingual', () => {
    it('should detect Ling models as multilingual', () => {
      expect(supportsMultilingual('ling-1')).toBe(true);
      expect(supportsMultilingual('Ling-Pro')).toBe(true);
    });

    it('should detect multilingual keyword', () => {
      expect(supportsMultilingual('gpt-4-multilingual')).toBe(true);
      expect(supportsMultilingual('model-multilingual-v2')).toBe(true);
    });

    it('should detect polyglot keyword', () => {
      expect(supportsMultilingual('polyglot-model')).toBe(true);
      expect(supportsMultilingual('ai-polyglot-pro')).toBe(true);
    });

    it('should reject non-multilingual models', () => {
      expect(supportsMultilingual('gpt-4')).toBe(false);
      expect(supportsMultilingual('claude-3')).toBe(false);
      expect(supportsMultilingual('kling-1')).toBe(false);
    });
  });
});
