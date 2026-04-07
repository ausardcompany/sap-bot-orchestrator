/**
 * Global Feature Flags
 * Provides runtime flags for controlling application behavior
 */

const flags: Record<string, boolean> = {};

export namespace Flag {
  /**
   * Set a flag value
   */
  export function set(name: string, value: boolean): void {
    flags[name] = value;
  }

  /**
   * Get a flag value
   */
  export function get(name: string): boolean {
    return flags[name] ?? false;
  }

  /**
   * Clear all flags
   */
  export function clear(): void {
    Object.keys(flags).forEach((key) => delete flags[key]);
  }

  /**
   * Check if dangerously-skip-permissions flag is set
   * This flag bypasses all permission checks - use with extreme caution
   */
  export function dangerouslySkipPermissions(): boolean {
    return get('dangerouslySkipPermissions');
  }
}
