/**
 * BashHierarchy - Generates hierarchical permission rules for bash commands
 *
 * For a command like "npm install lodash", generates rules:
 * - "npm"
 * - "npm install"
 * - "npm install lodash"
 *
 * This allows users to approve at different granularity levels.
 */
export namespace BashHierarchy {
  /**
   * Add all hierarchy levels for a command to the rules set
   * @param rules - Set to add rules to
   * @param commandParts - Array of command parts (e.g., ["npm", "install", "lodash"])
   * @param fullCommandText - Original full command text for the final rule
   */
  export function addAll(
    rules: Set<string>,
    commandParts: string[],
    fullCommandText: string
  ): void {
    if (commandParts.length === 0) return;

    // Add progressive prefixes: "npm", "npm install", etc.
    let prefix = '';
    for (let i = 0; i < commandParts.length - 1; i++) {
      prefix = prefix ? `${prefix} ${commandParts[i]}` : commandParts[i];
      rules.add(`${prefix} *`);
    }

    // Add the exact full command
    rules.add(fullCommandText);
  }

  /**
   * Check if a command matches any approved hierarchy rule
   * @param command - Command to check
   * @param approvedRules - Set of approved rules
   * @returns true if command matches an approved rule
   */
  export function matches(command: string, approvedRules: Set<string>): boolean {
    // Direct match
    if (approvedRules.has(command)) return true;

    // Check wildcard patterns
    const parts = command.split(/\s+/);
    let prefix = '';
    for (const part of parts) {
      prefix = prefix ? `${prefix} ${part}` : part;
      if (approvedRules.has(`${prefix} *`)) return true;
    }

    return false;
  }
}
