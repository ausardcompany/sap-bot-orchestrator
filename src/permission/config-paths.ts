import path from 'path';
import { getGlobalPaths } from '../utils/global.js';

/**
 * Config directory prefixes (relative paths, forward-slash normalized).
 * Matches .kilo/, .kilocode/, .opencode/, .alexi/ at any depth within the project.
 */
const CONFIG_DIRS = ['.kilo/', '.kilocode/', '.opencode/', '.alexi/'];

/**
 * Subdirectories under CONFIG_DIRS that are NOT config files (e.g. plan files).
 * Paths under these subdirs are exempt from config protection.
 */
const EXCLUDED_SUBDIRS = ['plans/'];

/**
 * Root-level config files that must be protected.
 * Matched only when the relative path has no directory component.
 */
const CONFIG_ROOT_FILES = new Set([
  'kilo.json',
  'kilo.jsonc',
  'opencode.json',
  'opencode.jsonc',
  'alexi.json',
  'alexi.jsonc',
  'AGENTS.md',
]);

/** Metadata key used to signal the UI to hide the "Allow always" option. */
export const DISABLE_ALWAYS_KEY = 'disableAlways' as const;

function normalize(p: string): string {
  return path.posix.normalize(p.replaceAll('\\', '/'));
}

/** Return true if the remainder path is in an excluded subdir. */
function excluded(remainder: string): boolean {
  return EXCLUDED_SUBDIRS.some((sub) => remainder.startsWith(sub));
}

/**
 * Windows path handling: Generate all possible path variants for matching.
 * Handles MSYS-style paths (e.g., /c/Users) and Windows paths (e.g., C:\Users).
 */
function expandWindowsPaths(p: string): string[] {
  if (process.platform !== 'win32') {
    return [path.resolve(p)];
  }

  const expand = (value: string) => {
    const full = path.posix.normalize(value.replaceAll('\\', '/')).toLowerCase();
    const msys = full.replace(/^\/([a-z])(?=\/)/, '$1:');
    return [full, full.replace(/^[a-z]:/, ''), msys, msys.replace(/^[a-z]:/, '')];
  };

  return Array.from(new Set([...expand(p), ...expand(path.resolve(p))]));
}

/**
 * Check if path matches config directory patterns using Windows fallback.
 * Returns true if the path ends with or contains a config directory pattern.
 */
function matchesConfigPattern(normalized: string): boolean {
  if (process.platform !== 'win32') {
    return false;
  }

  return (
    normalized.endsWith('/config/alexi') ||
    normalized.includes('/config/alexi/') ||
    normalized.endsWith('/.config/alexi') ||
    normalized.includes('/.config/alexi/')
  );
}

/** Check if a project-relative path points to a config file or directory. */
export function isRelative(pattern: string): boolean {
  const normalized = normalize(pattern);
  for (const dir of CONFIG_DIRS) {
    const bare = dir.slice(0, -1); // e.g. ".kilo"
    // Match at root (e.g. ".kilo/foo") or nested (e.g. "packages/sub/.kilo/foo")
    if (normalized === bare || normalized.endsWith('/' + bare)) {
      return true;
    }
    if (normalized.startsWith(dir)) {
      if (excluded(normalized.slice(dir.length))) {
        continue;
      }
      return true;
    }
    const nested = '/' + dir;
    const idx = normalized.indexOf(nested);
    if (idx !== -1) {
      const remainder = normalized.slice(idx + nested.length);
      if (!excluded(remainder)) {
        return true;
      }
    }
  }
  // Check root-level config files
  if (!normalized.includes('/') && CONFIG_ROOT_FILES.has(normalized)) {
    return true;
  }
  return false;
}

/** Check if an absolute path points to a config file. */
export function isAbsolute(absolutePath: string, projectRoot: string): boolean {
  const normalized = normalize(absolutePath);
  const normalizedRoot = normalize(projectRoot);

  // Check if path is within project
  if (!normalized.startsWith(normalizedRoot)) {
    // Check global config directory
    const globalPaths = getGlobalPaths();
    const globalConfig = normalize(globalPaths.config);
    if (normalized.startsWith(globalConfig)) {
      return true;
    }
    
    // Windows fallback: check if path matches config patterns
    if (matchesConfigPattern(normalized)) {
      return true;
    }
    
    return false;
  }

  // Get relative path and check
  const relative = normalized.slice(normalizedRoot.length).replace(/^\//, '');
  return isRelative(relative);
}

/**
 * Determine if a permission request targets config files.
 * Gates `edit` permissions and bash-originated `external_directory` requests.
 * File-tool reads are not restricted.
 */
export function isRequest(request: {
  permission: string;
  patterns: string[];
  metadata?: Record<string, any>;
}): boolean {
  if (request.permission === 'external_directory') {
    // File tools include metadata.filepath. They may read global config
    // without prompting, but edits are still protected separately via `edit`.
    if (request.metadata?.filepath) {
      return false;
    }
    for (const pattern of request.patterns) {
      const dir = pattern.replace(/\/\*$/, '');
      if (path.isAbsolute(dir)) {
        return true;
      }
    }
    return false;
  }
  if (!['write', 'edit', 'patch', 'apply_patch'].includes(request.permission)) {
    return false;
  }
  return request.patterns.some((p) => isRelative(p));
}

/** Get metadata to disable "always allow" for config file edits. */
export function getMetadata(): Record<string, boolean> {
  return { [DISABLE_ALWAYS_KEY]: true };
}

export const ConfigProtection = {
  DISABLE_ALWAYS_KEY,
  isRelative,
  isAbsolute,
  isRequest,
  getMetadata,
};
