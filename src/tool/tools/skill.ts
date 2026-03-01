/**
 * Skill Tool - Invoke registered skills as tools
 */

import { z } from 'zod';
import { defineTool, type ToolResult } from '../index.js';
import { getSkillRegistry } from '../../skill/index.js';

const SkillParamsSchema = z.object({
  name: z.string().describe('Skill name or alias to invoke'),
  arguments: z
    .record(z.string(), z.string())
    .optional()
    .describe('Arguments to pass to the skill (key-value pairs)'),
});

export interface SkillInvokeResult {
  skillName: string;
  prompt: string; // The rendered prompt from the skill
  description: string; // Skill description
  tools?: string[]; // Constrained tools if any
}

/**
 * Substitute arguments in a skill prompt
 * Replaces $ARGUMENTS with all args joined, and $1, $2, etc. with numbered args
 */
export function substituteArguments(prompt: string, args: Record<string, string>): string {
  let result = prompt;

  // Replace $ARGUMENTS with all args joined
  result = result.replace(/\$ARGUMENTS/g, Object.values(args).join(' '));

  // Replace numbered args $1, $2, etc.
  for (const [key, value] of Object.entries(args)) {
    result = result.replace(new RegExp(`\\$${key}`, 'g'), value);
  }

  return result;
}

/**
 * Get list of available skill names for error messages
 */
function getAvailableSkillNames(): string[] {
  const registry = getSkillRegistry();
  return registry.list().map((skill) => skill.name);
}

export const skillTool = defineTool<typeof SkillParamsSchema, SkillInvokeResult>({
  name: 'skill',
  description: `Invoke a registered skill by name or alias.

Usage:
- Skills are reusable AI prompts/behaviors that can be activated during conversations.
- Look up a skill by its name or alias.
- Pass arguments to customize the skill prompt.
- Returns the rendered prompt and metadata about the skill.

Arguments:
- Arguments can be passed as key-value pairs.
- Use numbered keys (1, 2, 3...) for positional arguments.
- The prompt will have $1, $2, etc. replaced with the corresponding argument values.
- $ARGUMENTS is replaced with all argument values joined by spaces.`,

  parameters: SkillParamsSchema,

  // No permission needed - read-only operation

  async execute(params, _context): Promise<ToolResult<SkillInvokeResult>> {
    const { name, arguments: args = {} } = params;

    const registry = getSkillRegistry();
    const skill = registry.get(name);

    if (!skill) {
      const availableSkills = getAvailableSkillNames();
      const availableList = availableSkills.length > 0 ? availableSkills.join(', ') : '(none)';

      return {
        success: false,
        error: `Skill '${name}' not found. Available skills: ${availableList}`,
      };
    }

    // Substitute arguments in the prompt
    const renderedPrompt = substituteArguments(skill.prompt, args as Record<string, string>);

    return {
      success: true,
      data: {
        skillName: skill.name,
        prompt: renderedPrompt,
        description: skill.description,
        tools: skill.tools,
      },
    };
  },
});
