import React from 'react';
import { Box } from 'ink';

import { useTheme } from '../context/ThemeContext.js';

export interface SplitPaneProps {
  /** Left pane content */
  left: React.ReactNode;
  /** Right pane content */
  right: React.ReactNode;
  /** Left pane width (percentage string or number of columns). Default: '30%' */
  leftWidth?: string | number;
  /** Whether the left pane is visible. Default: true */
  leftVisible?: boolean;
  /** Border style between panes */
  borderStyle?: 'single' | 'round' | 'bold' | 'double';
  /** Border color override */
  borderColor?: string;
}

/**
 * SplitPane — horizontal split layout with collapsible left pane.
 *
 * Uses Ink's built-in Box flexbox (per research D1). When leftVisible
 * is false, the left pane is hidden and right pane fills 100%.
 */
export function SplitPane({
  left,
  right,
  leftWidth = '30%',
  leftVisible = true,
  borderStyle: borderStyleProp,
  borderColor: borderColorProp,
}: SplitPaneProps): React.JSX.Element {
  const { theme } = useTheme();
  const resolvedBorderColor = borderColorProp ?? theme.colors.sidebarBorder;
  const resolvedBorderStyle = borderStyleProp ?? 'single';

  if (!leftVisible) {
    return (
      <Box flexDirection="row" flexGrow={1}>
        {right}
      </Box>
    );
  }

  return (
    <Box flexDirection="row" flexGrow={1}>
      {/* Left pane */}
      <Box
        width={leftWidth}
        flexShrink={0}
        borderRight
        borderStyle={resolvedBorderStyle}
        borderColor={resolvedBorderColor}
        borderTop={false}
        borderBottom={false}
        borderLeft={false}
        overflowY="hidden"
      >
        {left}
      </Box>

      {/* Right pane — fills remaining space */}
      <Box flexGrow={1} overflowY="hidden">
        {right}
      </Box>
    </Box>
  );
}
