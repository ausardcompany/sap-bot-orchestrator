/**
 * Terminal image rendering utility.
 * Wraps `terminal-image` for inline image display with protocol auto-detection.
 */

export interface RenderImageOptions {
  width?: string;
  height?: string;
}

/**
 * Check if the current terminal supports native image rendering protocols.
 */
export function isImageRenderingSupported(): boolean {
  const term = process.env.TERM_PROGRAM ?? '';
  const kitty = process.env.KITTY_WINDOW_ID;

  return term === 'iTerm.app' || term === 'WezTerm' || kitty !== undefined;
}

/**
 * Render an image file to an ANSI string for terminal display.
 * Returns the ANSI string or a text fallback.
 */
export async function renderImage(filePath: string, options?: RenderImageOptions): Promise<string> {
  try {
    // Dynamic import to avoid loading terminal-image at startup
    const terminalImage = await import('terminal-image');
    const result = await terminalImage.default.file(filePath, {
      width: options?.width ?? '50%',
      height: options?.height,
    });
    return result;
  } catch {
    return `[Image: ${filePath}]`;
  }
}
