/**
 * Byte Order Mark utilities for preserving file encoding markers
 */

const UTF8_BOM = '\ufeff';

export interface BomResult {
  text: string;
  bom: boolean;
}

/**
 * Split BOM from text content
 */
export function split(content: string): BomResult {
  if (content.startsWith(UTF8_BOM)) {
    return {
      text: content.slice(1),
      bom: true,
    };
  }
  return {
    text: content,
    bom: false,
  };
}

/**
 * Restore BOM to text content if it was present
 */
export function restore(text: string, bom: boolean): string {
  return bom ? UTF8_BOM + text : text;
}
