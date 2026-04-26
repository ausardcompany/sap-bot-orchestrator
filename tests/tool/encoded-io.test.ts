import { describe, it, expect } from 'vitest';
import {
  detectEncoding,
  decodeWithEncoding,
  encodeWithEncoding,
  isBinaryFile,
  type EncodingInfo,
} from '../../../src/tool/encoded-io.js';

describe('Encoded I/O', () => {
  describe('detectEncoding', () => {
    it('should detect UTF-8 BOM', () => {
      const buffer = Buffer.from([0xef, 0xbb, 0xbf, 0x48, 0x65, 0x6c, 0x6c, 0x6f]);
      const result = detectEncoding(buffer);

      expect(result.encoding).toBe('utf-8');
      expect(result.hasBOM).toBe(true);
      expect(result.confidence).toBe(1);
      expect(result.bomBytes).toEqual(Buffer.from([0xef, 0xbb, 0xbf]));
    });

    it('should detect UTF-16 LE BOM', () => {
      const buffer = Buffer.from([0xff, 0xfe, 0x48, 0x00, 0x65, 0x00]);
      const result = detectEncoding(buffer);

      expect(result.encoding).toBe('utf-16le');
      expect(result.hasBOM).toBe(true);
      expect(result.confidence).toBe(1);
    });

    it('should detect UTF-16 BE BOM', () => {
      const buffer = Buffer.from([0xfe, 0xff, 0x00, 0x48, 0x00, 0x65]);
      const result = detectEncoding(buffer);

      expect(result.encoding).toBe('utf-16be');
      expect(result.hasBOM).toBe(true);
      expect(result.confidence).toBe(1);
    });

    it('should detect UTF-32 LE BOM', () => {
      const buffer = Buffer.from([0xff, 0xfe, 0x00, 0x00, 0x48, 0x00, 0x00, 0x00]);
      const result = detectEncoding(buffer);

      expect(result.encoding).toBe('utf-32le');
      expect(result.hasBOM).toBe(true);
      expect(result.confidence).toBe(1);
    });

    it('should detect UTF-32 BE BOM', () => {
      const buffer = Buffer.from([0x00, 0x00, 0xfe, 0xff, 0x00, 0x00, 0x00, 0x48]);
      const result = detectEncoding(buffer);

      expect(result.encoding).toBe('utf-32be');
      expect(result.hasBOM).toBe(true);
      expect(result.confidence).toBe(1);
    });

    it('should fall back to jschardet for plain UTF-8', () => {
      const buffer = Buffer.from('Hello World', 'utf-8');
      const result = detectEncoding(buffer);

      expect(result.hasBOM).toBe(false);
      expect(result.encoding).toBeTruthy();
    });
  });

  describe('decodeWithEncoding', () => {
    it('should decode UTF-8 with BOM', () => {
      const buffer = Buffer.from([0xef, 0xbb, 0xbf, 0x48, 0x65, 0x6c, 0x6c, 0x6f]);
      const encoding: EncodingInfo = {
        encoding: 'utf-8',
        hasBOM: true,
        confidence: 1,
        bomBytes: Buffer.from([0xef, 0xbb, 0xbf]),
      };

      const result = decodeWithEncoding(buffer, encoding);
      expect(result).toBe('Hello');
    });

    it('should decode UTF-8 without BOM', () => {
      const buffer = Buffer.from('Hello', 'utf-8');
      const encoding: EncodingInfo = {
        encoding: 'utf-8',
        hasBOM: false,
        confidence: 1,
      };

      const result = decodeWithEncoding(buffer, encoding);
      expect(result).toBe('Hello');
    });
  });

  describe('encodeWithEncoding', () => {
    it('should encode UTF-8 with BOM', () => {
      const content = 'Hello';
      const encoding: EncodingInfo = {
        encoding: 'utf-8',
        hasBOM: true,
        confidence: 1,
        bomBytes: Buffer.from([0xef, 0xbb, 0xbf]),
      };

      const result = encodeWithEncoding(content, encoding);
      expect(result[0]).toBe(0xef);
      expect(result[1]).toBe(0xbb);
      expect(result[2]).toBe(0xbf);
      expect(result.slice(3).toString('utf-8')).toBe('Hello');
    });

    it('should encode UTF-8 without BOM', () => {
      const content = 'Hello';
      const encoding: EncodingInfo = {
        encoding: 'utf-8',
        hasBOM: false,
        confidence: 1,
      };

      const result = encodeWithEncoding(content, encoding);
      expect(result.toString('utf-8')).toBe('Hello');
    });

    it('should preserve BOM on round-trip', () => {
      const originalBuffer = Buffer.from([0xef, 0xbb, 0xbf, 0x48, 0x65, 0x6c, 0x6c, 0x6f]);
      const encoding = detectEncoding(originalBuffer);
      const decoded = decodeWithEncoding(originalBuffer, encoding);
      const reencoded = encodeWithEncoding(decoded, encoding);

      expect(reencoded).toEqual(originalBuffer);
    });
  });

  describe('isBinaryFile', () => {
    it('should detect binary files with null bytes', () => {
      const buffer = Buffer.from([0x48, 0x65, 0x00, 0x6c, 0x6f]);
      expect(isBinaryFile(buffer)).toBe(true);
    });

    it('should not detect text files as binary', () => {
      const buffer = Buffer.from('Hello World', 'utf-8');
      expect(isBinaryFile(buffer)).toBe(false);
    });

    it('should not detect UTF-16 LE BOM files as binary', () => {
      const buffer = Buffer.from([0xff, 0xfe, 0x48, 0x00, 0x65, 0x00]);
      expect(isBinaryFile(buffer)).toBe(false);
    });

    it('should not detect UTF-16 BE BOM files as binary', () => {
      const buffer = Buffer.from([0xfe, 0xff, 0x00, 0x48, 0x00, 0x65]);
      expect(isBinaryFile(buffer)).toBe(false);
    });
  });
});
