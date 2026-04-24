import * as jschardet from 'jschardet';
import * as iconv from 'iconv-lite';

export interface EncodingResult {
  encoding: string;
  confidence: number;
  content: string;
  hasBOM: boolean;
}

const BOM_MARKERS = {
  UTF8: Buffer.from([0xef, 0xbb, 0xbf]),
  UTF16LE: Buffer.from([0xff, 0xfe]),
  UTF16BE: Buffer.from([0xfe, 0xff]),
  UTF32LE: Buffer.from([0xff, 0xfe, 0x00, 0x00]),
  UTF32BE: Buffer.from([0x00, 0x00, 0xfe, 0xff]),
};

export function detectEncoding(buffer: Buffer): EncodingResult {
  // Check for BOM first
  if (buffer.length >= 4 && buffer.slice(0, 4).equals(BOM_MARKERS.UTF32LE)) {
    return { encoding: 'UTF-32LE', confidence: 1, content: '', hasBOM: true };
  }
  if (buffer.length >= 4 && buffer.slice(0, 4).equals(BOM_MARKERS.UTF32BE)) {
    return { encoding: 'UTF-32BE', confidence: 1, content: '', hasBOM: true };
  }
  if (buffer.length >= 3 && buffer.slice(0, 3).equals(BOM_MARKERS.UTF8)) {
    return { encoding: 'UTF-8', confidence: 1, content: '', hasBOM: true };
  }
  if (buffer.length >= 2 && buffer.slice(0, 2).equals(BOM_MARKERS.UTF16BE)) {
    return { encoding: 'UTF-16BE', confidence: 1, content: '', hasBOM: true };
  }
  if (buffer.length >= 2 && buffer.slice(0, 2).equals(BOM_MARKERS.UTF16LE)) {
    return { encoding: 'UTF-16LE', confidence: 1, content: '', hasBOM: true };
  }

  // Use jschardet for detection
  const detected = jschardet.detect(buffer);
  return {
    encoding: detected.encoding || 'UTF-8',
    confidence: detected.confidence || 0,
    content: '',
    hasBOM: false,
  };
}

export function decodeWithEncoding(buffer: Buffer, encoding: string): string {
  return iconv.decode(buffer, encoding);
}

export function encodeWithEncoding(
  content: string,
  encoding: string,
  preserveBOM: boolean = false,
): Buffer {
  const encoded = iconv.encode(content, encoding);
  if (preserveBOM && encoding.toUpperCase() === 'UTF-8') {
    return Buffer.concat([BOM_MARKERS.UTF8, encoded]);
  }
  return encoded;
}
