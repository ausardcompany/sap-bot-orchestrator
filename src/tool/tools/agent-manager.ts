/**
 * Agent Manager Tool - Manage agent tasks and worktrees (Experimental)
 */

import { z } from 'zod';
import { defineTool, type ToolResult } from '../index.js';
import { nanoid } from 'nanoid';

const AgentManagerParamsSchema = z.object({
  action: z
    .enum(['create', 'list', 'status', 'terminate'])
    .describe('Action to perform: create, list, status, or terminate'),
  taskId: z.string().optional().describe('Task ID for status or terminate actions'),
  worktree: z.string().optional().describe('Worktree path for create action'),
  prompt: z.string().optional().describe('Task prompt for create action'),
});

interface AgentManagerResult {
  success: boolean;
  message: string;
  data?: unknown;
}

interface AgentTask {
  taskId: string;
  worktree: string;
  prompt: string;
  status: 'running' | 'completed' | 'failed';
  created: number;
  updated: number;
}

// Store for agent tasks
const agentTasks = new Map<string, AgentTask>();

export const agentManagerTool = defineTool<typeof AgentManagerParamsSchema, AgentManagerResult>({
  name: 'agent_manager',
  description: `Manage agent tasks and worktrees (EXPERIMENTAL).

Actions:
- create: Create a new agent task in a worktree
- list: List all active agent tasks
- status: Get status of a specific task
- terminate: Terminate a running task

Example usage:
- Create task: agent_manager(action="create", worktree="feature-x", prompt="Implement feature X")
- List tasks: agent_manager(action="list")
- Check status: agent_manager(action="status", taskId="abc-123")
- Stop task: agent_manager(action="terminate", taskId="abc-123")`,

  parameters: AgentManagerParamsSchema,

  async execute(params, _context): Promise<ToolResult<AgentManagerResult>> {
    const { action, taskId, worktree, prompt } = params;

    switch (action) {
      case 'create': {
        if (!worktree || !prompt) {
          return {
            success: false,
            error: 'worktree and prompt are required for create action',
          };
        }

        const newTaskId = nanoid();
        const task: AgentTask = {
          taskId: newTaskId,
          worktree,
          prompt,
          status: 'running',
          created: Date.now(),
          updated: Date.now(),
        };

        agentTasks.set(newTaskId, task);

        return {
          success: true,
          data: {
            success: true,
            message: `Task created in worktree: ${worktree}`,
            data: { taskId: newTaskId },
          },
        };
      }

      case 'list': {
        const tasks = Array.from(agentTasks.values()).map((task) => ({
          taskId: task.taskId,
          worktree: task.worktree,
          status: task.status,
          created: new Date(task.created).toISOString(),
        }));

        return {
          success: true,
          data: {
            success: true,
            message: `Found ${tasks.length} active task(s)`,
            data: tasks,
          },
        };
      }

      case 'status': {
        if (!taskId) {
          return {
            success: false,
            error: 'taskId is required for status action',
          };
        }

        const task = agentTasks.get(taskId);
        if (!task) {
          return {
            success: false,
            error: `Task not found: ${taskId}`,
          };
        }

        return {
          success: true,
          data: {
            success: true,
            message: `Status for task ${taskId}`,
            data: {
              taskId: task.taskId,
              worktree: task.worktree,
              status: task.status,
              prompt: task.prompt,
              created: new Date(task.created).toISOString(),
              updated: new Date(task.updated).toISOString(),
            },
          },
        };
      }

      case 'terminate': {
        if (!taskId) {
          return {
            success: false,
            error: 'taskId is required for terminate action',
          };
        }

        const task = agentTasks.get(taskId);
        if (!task) {
          return {
            success: false,
            error: `Task not found: ${taskId}`,
          };
        }

        task.status = 'completed';
        task.updated = Date.now();
        agentTasks.delete(taskId);

        return {
          success: true,
          data: {
            success: true,
            message: `Terminated task ${taskId}`,
          },
        };
      }

      default:
        return {
          success: false,
          error: `Unknown action: ${action}`,
        };
    }
  },
});
