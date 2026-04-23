/**
 * Tests for BOM (Byte Order Mark) utilities
 */

import { describe, it, expect } from 'vitest';
import * as Bom from '../bom.js';

describe('BOM utilities', () => {
  describe('split', () => {
    it('should detect and remove UTF-8 BOM', () => {
      const content = '\ufeffHello World';
      const result = Bom.split(content);
      
      expect(result.bom).toBe(true);
      expect(result.text).toBe('Hello World');
    });

    it('should handle content without BOM', () => {
      const content = 'Hello World';
      const result = Bom.split(content);
      
      expect(result.bom).toBe(false);
      expect(result.text).toBe('Hello World');
    });

    it('should handle empty string', () => {
      const result = Bom.split('');
      
      expect(result.bom).toBe(false);
      expect(result.text).toBe('');
    });

    it('should handle BOM-only string', () => {
      const result = Bom.split('\ufeff');
      
      expect(result.bom).toBe(true);
      expect(result.text).toBe('');
    });
  });

  describe('restore', () => {
    it('should restore BOM when bom is true', () => {
      const text = 'Hello World';
      const result = Bom.restore(text, true);
      
      expect(result).toBe('\ufeffHello World');
    });

    it('should not add BOM when bom is false', () => {
      const text = 'Hello World';
      const result = Bom.restore(text, false);
      
      expect(result).toBe('Hello World');
    });

    it('should handle empty string with BOM', () => {
      const result = Bom.restore('', true);
      
      expect(result).toBe('\ufeff');
    });

    it('should handle empty string without BOM', () => {
      const result = Bom.restore('', false);
      
      expect(result).toBe('');
    });
  });

  describe('round-trip', () => {
    it('should preserve BOM through split and restore', () => {
      const original = '\ufeffconst x = 1;\n';
      const { text, bom } = Bom.split(original);
      const restored = Bom.restore(text, bom);
      
      expect(restored).toBe(original);
    });

    it('should preserve non-BOM content through split and restore', () => {
      const original = 'const x = 1;\n';
      const { text, bom } = Bom.split(original);
      const restored = Bom.restore(text, bom);
      
      expect(restored).toBe(original);
    });
  });
});
