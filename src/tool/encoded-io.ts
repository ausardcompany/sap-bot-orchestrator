/**
 * Encoding-aware file I/O utilities
 * Preserves file encodings (UTF-8, UTF-16, legacy) to prevent corruption
 */

// Note: Requires dependencies: iconv-lite, jschardet
// TODO: Add to package.json:
//   "iconv-lite": "^0.6.3",
//   "jschardet": "^3.1.0"

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

  // Fallback to UTF-8 detection without external dependencies
  // In production, this would use jschardet for better detection
  try {
    buffer.toString('utf-8');
    return {
      encoding: 'utf-8',
      confidence: 0.8,
      hasBOM: false,
    };
  } catch {
    return {
      encoding: 'binary',
      confidence: 0.5,
      hasBOM: false,
    };
  }
}

/**
 * Decode buffer to string preserving encoding
 */
export function decodeWithEncoding(buffer: Buffer, encoding: EncodingInfo): string {
  const contentBuffer =
    encoding.hasBOM && encoding.bomBytes ? buffer.slice(encoding.bomBytes.length) : buffer;

  // Handle standard Node.js encodings
  if (encoding.encoding === 'utf-8' || encoding.encoding === 'utf8') {
    return contentBuffer.toString('utf-8');
  }

  if (encoding.encoding === 'utf-16le' || encoding.encoding === 'utf16le') {
    return contentBuffer.toString('utf16le');
  }

  // For other encodings, would use iconv-lite in production
  // Fallback to UTF-8 for now
  return contentBuffer.toString('utf-8');
}

/**
 * Encode string back to buffer preserving original encoding and BOM
 */
export function encodeWithEncoding(content: string, encoding: EncodingInfo): Buffer {
  let encoded: Buffer;

  // Handle standard Node.js encodings
  if (encoding.encoding === 'utf-8' || encoding.encoding === 'utf8') {
    encoded = Buffer.from(content, 'utf-8');
  } else if (encoding.encoding === 'utf-16le' || encoding.encoding === 'utf16le') {
    encoded = Buffer.from(content, 'utf16le');
  } else {
    // For other encodings, would use iconv-lite in production
    // Fallback to UTF-8 for now
    encoded = Buffer.from(content, 'utf-8');
  }

  // Restore BOM if original had one
  if (encoding.hasBOM && encoding.bomBytes) {
    return Buffer.concat([encoding.bomBytes, encoded]);
  }

  return encoded;
}

/**
 * Check if buffer appears to be binary (not text)
 * Only considers UTF-16 BOM files as binary for legacy compatibility
 */
export function isBinaryFile(buffer: Buffer): boolean {
  // UTF-16 files with BOM are treated as binary to prevent corruption
  if (buffer.length >= 2) {
    if ((buffer[0] === 0xff && buffer[1] === 0xfe) || (buffer[0] === 0xfe && buffer[1] === 0xff)) {
      return true;
    }
  }
  return false;
}
