/**
 * Global paths and configuration utilities
 */

import os from 'os';
import path from 'path';

export interface GlobalPaths {
  config: string;
  skills: string;
  cache: string;
}

/**
 * Get global configuration paths for Alexi
 */
export function getGlobalPaths(): GlobalPaths {
  const homeDir = os.homedir();
  const configDir = path.join(homeDir, '.alexi');

  return {
    config: configDir,
    skills: path.join(configDir, 'skills'),
    cache: path.join(configDir, 'cache'),
  };
}
