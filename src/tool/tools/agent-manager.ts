/**
 * Agent Manager Tool - Experimental
 * Manages sub-agents for parallel task execution
 */

import { z } from 'zod';
import { defineTool, type ToolResult, type ToolContext } from '../index.js';

export const AgentManagerParametersSchema = z.object({
  action: z.enum(['start', 'stop', 'list', 'status']).describe('Action to perform'),
  agentId: z.string().optional().describe('Agent ID for stop/status actions'),
  worktree: z.string().optional().describe('Git worktree path for agent isolation'),
  task: z.string().optional().describe('Task description for agent to execute'),
});

export type AgentManagerParameters = z.infer<typeof AgentManagerParametersSchema>;

interface AgentInfo {
  id: string;
  task: string;
  worktree?: string;
  status: 'idle' | 'running' | 'completed' | 'failed';
  startedAt: number;
}

// In-memory agent registry (placeholder for actual implementation)
const activeAgents = new Map<string, AgentInfo>();

/**
 * Start a new agent with a task
 */
async function startAgent(
  task: string,
  worktree?: string,
  _context?: ToolContext
): Promise<ToolResult> {
  // Generate agent ID
  const agentId = `agent-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

  const agentInfo: AgentInfo = {
    id: agentId,
    task,
    worktree,
    status: 'idle',
    startedAt: Date.now(),
  };

  activeAgents.set(agentId, agentInfo);

  return {
    success: true,
    data: {
      agentId,
      message: `Started agent ${agentId} for task: ${task}${worktree ? ` in worktree: ${worktree}` : ''}`,
    },
  };
}

/**
 * Stop a running agent
 */
async function stopAgent(agentId: string): Promise<ToolResult> {
  const agent = activeAgents.get(agentId);

  if (!agent) {
    return {
      success: false,
      error: `Agent not found: ${agentId}`,
    };
  }

  activeAgents.delete(agentId);

  return {
    success: true,
    data: {
      agentId,
      message: `Stopped agent: ${agentId}`,
    },
  };
}

/**
 * List all active agents
 */
async function listAgents(): Promise<ToolResult> {
  const agents = Array.from(activeAgents.values());

  if (agents.length === 0) {
    return {
      success: true,
      data: {
        agents: [],
        message: 'No agents running',
      },
    };
  }

  return {
    success: true,
    data: {
      agents: agents.map((a) => ({
        id: a.id,
        task: a.task,
        worktree: a.worktree,
        status: a.status,
        uptime: Date.now() - a.startedAt,
      })),
      message: `${agents.length} agent(s) running`,
    },
  };
}

/**
 * Get status of a specific agent
 */
async function getAgentStatus(agentId: string): Promise<ToolResult> {
  const agent = activeAgents.get(agentId);

  if (!agent) {
    return {
      success: false,
      error: `Agent not found: ${agentId}`,
    };
  }

  return {
    success: true,
    data: {
      id: agent.id,
      task: agent.task,
      worktree: agent.worktree,
      status: agent.status,
      uptime: Date.now() - agent.startedAt,
    },
  };
}

/**
 * Agent Manager Tool Definition
 */
export const agentManagerTool = defineTool({
  name: 'agent_manager',
  description: `Manage sub-agents for parallel task execution (EXPERIMENTAL).
  
Actions:
- start: Start a new agent with a task in an optional worktree
- stop: Stop a running agent by ID
- list: List all running agents
- status: Get status of a specific agent

Note: This is an experimental feature for managing multiple agents working on different tasks simultaneously.`,

  parameters: AgentManagerParametersSchema,

  async execute(params, context): Promise<ToolResult> {
    switch (params.action) {
      case 'start':
        if (!params.task) {
          return { success: false, error: 'Task is required for start action' };
        }
        return startAgent(params.task, params.worktree, context);

      case 'stop':
        if (!params.agentId) {
          return { success: false, error: 'Agent ID is required for stop action' };
        }
        return stopAgent(params.agentId);

      case 'list':
        return listAgents();

      case 'status':
        if (!params.agentId) {
          return { success: false, error: 'Agent ID is required for status action' };
        }
        return getAgentStatus(params.agentId);

      default:
        return { success: false, error: `Unknown action: ${params.action}` };
    }
  },
});
