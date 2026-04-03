import { useEffect } from 'react';

import { ToolExecutionCompleted } from '../../../bus/index.js';
import { useSidebar } from '../context/SidebarContext.js';
import type { FileChange } from '../types/props.js';

/**
 * Subscribes to the event bus for ToolExecutionCompleted events
 * and tracks file modifications (write, edit tools) in SidebarContext.
 */
export function useFileChanges(): void {
  const { trackFileChange } = useSidebar();

  useEffect(() => {
    const unsub = ToolExecutionCompleted.subscribe((payload) => {
      const toolName = payload.toolName;

      // Only track file-modifying tools
      if (toolName !== 'write' && toolName !== 'edit') {
        return;
      }

      // Extract file path from the result
      const result = payload.result as Record<string, unknown> | undefined;
      if (!result) {
        return;
      }

      const filePath =
        (result.filePath as string) ?? (result.path as string) ?? (result.file as string);

      if (!filePath) {
        return;
      }

      const change: FileChange = {
        path: filePath,
        status: toolName === 'write' ? 'added' : 'modified',
        additions: 0,
        deletions: 0,
        timestamp: payload.timestamp,
      };

      trackFileChange(change);
    });

    return unsub;
  }, [trackFileChange]);
}
