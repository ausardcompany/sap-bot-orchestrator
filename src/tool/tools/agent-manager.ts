/**
 * Agent Manager Tool - Manage agent worktrees and tasks
 * Experimental feature for delegating tasks to sub-agents
 */

import { z } from 'zod';
import { defineTool, type ToolResult } from '../index.js';

const AgentManagerParamsSchema = z.object({
  action: z
    .enum(['create', 'list', 'status', 'terminate'])
    .describe('Action to perform: create, list, status, or terminate'),
  taskId: z.string().optional().describe('Task ID for status or terminate actions'),
  worktree: z.string().optional().describe('Worktree path for create action'),
  prompt: z.string().optional().describe('Task prompt for create action'),
});

interface AgentTask {
  taskId: string;
  worktree?: string;
  prompt?: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  createdAt: number;
  completedAt?: number;
}

// In-memory task storage (would be persisted in production)
const tasks: Map<string, AgentTask> = new Map();

async function createAgentTask(
  worktree?: string,
  prompt?: string
): Promise<ToolResult<{ taskId: string }>> {
  const taskId = `task-${Date.now()}-${Math.random().toString(36).substring(7)}`;
  const task: AgentTask = {
    taskId,
    worktree,
    prompt,
    status: 'pending',
    createdAt: Date.now(),
  };

  tasks.set(taskId, task);

  return {
    success: true,
    data: { taskId },
  };
}

async function listAgentTasks(): Promise<ToolResult<{ tasks: AgentTask[] }>> {
  return {
    success: true,
    data: { tasks: Array.from(tasks.values()) },
  };
}

async function getTaskStatus(taskId: string): Promise<ToolResult<AgentTask>> {
  const task = tasks.get(taskId);
  if (!task) {
    return {
      success: false,
      error: `Task ${taskId} not found`,
    };
  }

  return {
    success: true,
    data: task,
  };
}

async function terminateTask(taskId: string): Promise<ToolResult<{ terminated: boolean }>> {
  const task = tasks.get(taskId);
  if (!task) {
    return {
      success: false,
      error: `Task ${taskId} not found`,
    };
  }

  if (task.status === 'completed' || task.status === 'failed') {
    return {
      success: false,
      error: `Task ${taskId} is already ${task.status}`,
    };
  }

  task.status = 'failed';
  task.completedAt = Date.now();

  return {
    success: true,
    data: { terminated: true },
  };
}

export const agentManagerTool = defineTool({
  name: 'agent_manager',
  description: `Manage agent worktrees and tasks. Actions:
- create: Create a new agent task in a worktree
- list: List all active agent tasks
- status: Get status of a specific task
- terminate: Stop a running task

This is an experimental feature for delegating complex tasks to sub-agents.`,

  parameters: AgentManagerParamsSchema,

  async execute(params): Promise<ToolResult> {
    switch (params.action) {
      case 'create':
        return await createAgentTask(params.worktree, params.prompt);
      case 'list':
        return await listAgentTasks();
      case 'status':
        if (!params.taskId) {
          return { success: false, error: 'taskId is required for status action' };
        }
        return await getTaskStatus(params.taskId);
      case 'terminate':
        if (!params.taskId) {
          return { success: false, error: 'taskId is required for terminate action' };
        }
        return await terminateTask(params.taskId);
      default:
        return { success: false, error: 'Unknown action' };
    }
  },
});
