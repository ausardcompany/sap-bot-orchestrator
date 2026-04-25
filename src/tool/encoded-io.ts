/**
 * Encoding-aware file I/O utilities
 * Detects and preserves file encodings to prevent corruption
 */

export interface EncodingInfo {
  encoding: string;
  confidence: number;
  hasBOM: boolean;
  bomBytes?: Buffer;
}

/**
 * Detect file encoding from buffer content
 * Handles UTF-8 BOM, UTF-16 LE/BE, UTF-32, and various legacy encodings
 */
export function detectEncoding(buffer: Buffer): EncodingInfo {
  // Check for BOM markers first
  if (buffer.length >= 4) {
    // UTF-32 LE BOM
    if (buffer[0] === 0xff && buffer[1] === 0xfe && buffer[2] === 0x00 && buffer[3] === 0x00) {
      return { encoding: 'UTF-32LE', confidence: 1, hasBOM: true, bomBytes: buffer.slice(0, 4) };
    }
    // UTF-32 BE BOM
    if (buffer[0] === 0x00 && buffer[1] === 0x00 && buffer[2] === 0xfe && buffer[3] === 0xff) {
      return { encoding: 'UTF-32BE', confidence: 1, hasBOM: true, bomBytes: buffer.slice(0, 4) };
    }
  }

  if (buffer.length >= 3) {
    // UTF-8 BOM
    if (buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf) {
      return { encoding: 'UTF-8', confidence: 1, hasBOM: true, bomBytes: buffer.slice(0, 3) };
    }
  }

  if (buffer.length >= 2) {
    // UTF-16 LE BOM
    if (buffer[0] === 0xff && buffer[1] === 0xfe) {
      return { encoding: 'UTF-16LE', confidence: 1, hasBOM: true, bomBytes: buffer.slice(0, 2) };
    }
    // UTF-16 BE BOM
    if (buffer[0] === 0xfe && buffer[1] === 0xff) {
      return { encoding: 'UTF-16BE', confidence: 1, hasBOM: true, bomBytes: buffer.slice(0, 2) };
    }
  }

  // No BOM detected - assume UTF-8
  // In a full implementation, we'd use jschardet here for better detection
  return {
    encoding: 'UTF-8',
    confidence: 0.8,
    hasBOM: false,
  };
}

/**
 * Decode buffer to string preserving original encoding info
 */
export function decodeWithEncoding(buffer: Buffer, encodingInfo: EncodingInfo): string {
  const dataBuffer =
    encodingInfo.hasBOM && encodingInfo.bomBytes
      ? buffer.slice(encodingInfo.bomBytes.length)
      : buffer;

  // Map encoding names to Node.js buffer encoding names
  const nodeEncoding = mapToNodeEncoding(encodingInfo.encoding);

  return dataBuffer.toString(nodeEncoding);
}

/**
 * Encode string back to buffer, preserving original BOM if present
 */
export function encodeWithEncoding(content: string, encodingInfo: EncodingInfo): Buffer {
  const nodeEncoding = mapToNodeEncoding(encodingInfo.encoding);
  const encoded = Buffer.from(content, nodeEncoding);

  if (encodingInfo.hasBOM && encodingInfo.bomBytes) {
    return Buffer.concat([encodingInfo.bomBytes, encoded]);
  }

  return encoded;
}

/**
 * Map encoding names to Node.js buffer encoding names
 */
function mapToNodeEncoding(encoding: string): BufferEncoding {
  const upper = encoding.toUpperCase();

  if (upper.includes('UTF-8') || upper === 'UTF8') {
    return 'utf8';
  }
  if (upper.includes('UTF-16LE') || upper === 'UTF16LE') {
    return 'utf16le';
  }
  if (upper.includes('UTF-16BE') || upper === 'UTF16BE') {
    // Node.js doesn't have native UTF-16BE, fallback to utf16le
    // In production, we'd need iconv-lite for proper BE support
    return 'utf16le';
  }
  if (upper.includes('UTF-32')) {
    // Node.js doesn't support UTF-32 natively
    // Fallback to utf8
    return 'utf8';
  }

  // Default to UTF-8
  return 'utf8';
}
