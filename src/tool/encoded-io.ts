/**
 * Encoding-aware file I/O utilities
 * Handles UTF-8, UTF-16 LE/BE, UTF-32, and legacy encodings
 */

import jschardet from 'jschardet';
import iconv from 'iconv-lite';

export interface EncodingInfo {
  encoding: string;
  confidence: number;
  hasBOM: boolean;
  bomBytes?: Buffer;
}

/**
 * Detect file encoding from buffer content
 * Handles UTF-8, UTF-16 LE/BE, UTF-32, and legacy encodings via jschardet
 */
export function detectEncoding(buffer: Buffer): EncodingInfo {
  // Check for BOM markers first
  if (buffer.length >= 4) {
    // UTF-32 LE BOM
    if (buffer[0] === 0xff && buffer[1] === 0xfe && buffer[2] === 0x00 && buffer[3] === 0x00) {
      return { encoding: 'utf-32le', confidence: 1, hasBOM: true, bomBytes: buffer.slice(0, 4) };
    }
    // UTF-32 BE BOM
    if (buffer[0] === 0x00 && buffer[1] === 0x00 && buffer[2] === 0xfe && buffer[3] === 0xff) {
      return { encoding: 'utf-32be', confidence: 1, hasBOM: true, bomBytes: buffer.slice(0, 4) };
    }
  }

  if (buffer.length >= 3) {
    // UTF-8 BOM
    if (buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf) {
      return { encoding: 'utf-8', confidence: 1, hasBOM: true, bomBytes: buffer.slice(0, 3) };
    }
  }

  if (buffer.length >= 2) {
    // UTF-16 LE BOM
    if (buffer[0] === 0xff && buffer[1] === 0xfe) {
      return { encoding: 'utf-16le', confidence: 1, hasBOM: true, bomBytes: buffer.slice(0, 2) };
    }
    // UTF-16 BE BOM
    if (buffer[0] === 0xfe && buffer[1] === 0xff) {
      return { encoding: 'utf-16be', confidence: 1, hasBOM: true, bomBytes: buffer.slice(0, 2) };
    }
  }

  // Fall back to jschardet for detection
  const detected = jschardet.detect(buffer);
  return {
    encoding: detected.encoding?.toLowerCase() || 'utf-8',
    confidence: detected.confidence || 0,
    hasBOM: false,
  };
}

/**
 * Decode buffer to string preserving encoding information
 */
export function decodeWithEncoding(buffer: Buffer, encoding: EncodingInfo): string {
  const contentBuffer =
    encoding.hasBOM && encoding.bomBytes ? buffer.slice(encoding.bomBytes.length) : buffer;

  return iconv.decode(contentBuffer, encoding.encoding);
}

/**
 * Encode string back to buffer, preserving original BOM if present
 */
export function encodeWithEncoding(content: string, encoding: EncodingInfo): Buffer {
  const encoded = iconv.encode(content, encoding.encoding);

  if (encoding.hasBOM && encoding.bomBytes) {
    return Buffer.concat([encoding.bomBytes, encoded]);
  }

  return encoded;
}

/**
 * Check if buffer appears to be binary (non-text) content
 * Excludes UTF-16 BOM files from binary detection
 */
export function isBinaryFile(buffer: Buffer): boolean {
  // UTF-16 files with BOM are not binary
  if (buffer.length >= 2) {
    if (
      (buffer[0] === 0xff && buffer[1] === 0xfe) ||
      (buffer[0] === 0xfe && buffer[1] === 0xff)
    ) {
      return false;
    }
  }

  // Check for null bytes in first 8KB (common binary indicator)
  const checkLength = Math.min(buffer.length, 8192);
  for (let i = 0; i < checkLength; i++) {
    if (buffer[i] === 0) {
      return true;
    }
  }

  return false;
}
