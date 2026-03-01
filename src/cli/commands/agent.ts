/**
 * Agent command - send message with tool execution support
 *
 * Unlike the basic 'chat' command, this command enables tools and
 * runs an agent loop: the LLM can call tools, receive results, and
 * continue until it produces a final response.
 *
 * Used for automated workflows that need to modify files.
 */

import { readFileSync } from 'node:fs';
import type { Command } from 'commander';
import { agenticChat, type AgenticProgressEvent } from '../../core/agenticChat.js';
import { SessionManager } from '../../core/sessionManager.js';

interface AgentOptions {
  message?: string;
  messageFile?: string;
  model?: string;
  autoRoute?: boolean;
  preferCheap?: boolean;
  session?: string;
  system?: string;
  maxIterations?: number;
  workdir?: string;
  tools?: string;
  verbose?: boolean;
  quiet?: boolean;
}

export function registerAgentCommand(program: Command): void {
  program
    .command('agent')
    .description('Run agentic chat with tool execution (for automated workflows)')
    .option('-m, --message <text>', 'Message to send')
    .option('-f, --message-file <path>', 'Read message from file')
    .option('--model <id>', 'Model ID override')
    .option('--auto-route', 'Enable automatic model routing based on prompt')
    .option('--prefer-cheap', 'Prefer cheaper models when auto-routing')
    .option('--session <id>', 'Continue existing session')
    .option('--system <prompt>', 'System prompt for the conversation')
    .option('--max-iterations <n>', 'Maximum tool execution iterations', '50')
    .option('--workdir <path>', 'Working directory for tool execution')
    .option('--tools <list>', 'Comma-separated list of tool names to enable (default: all)')
    .option('-v, --verbose', 'Show progress updates')
    .option('-q, --quiet', 'Only output the final response')
    .action(async (opts: AgentOptions) => {
      try {
        // Get message from either --message or --message-file
        let message: string;
        if (opts.messageFile) {
          message = readFileSync(opts.messageFile, 'utf-8');
        } else if (opts.message) {
          message = opts.message;
        } else {
          console.error('Error: Either --message or --message-file is required');
          process.exit(1);
        }

        const sessionManager = new SessionManager();

        // Load or create session
        if (opts.session) {
          const session = sessionManager.loadSession(opts.session);
          if (!session) {
            console.error(`Session ${opts.session} not found`);
            process.exit(1);
          }
          if (!opts.quiet) {
            console.log(`[Continuing session: ${session.metadata.title || opts.session}]`);
          }
        }

        // Parse enabled tools
        const enabledTools = opts.tools ? opts.tools.split(',').map((t) => t.trim()) : undefined;

        // Progress callback
        const onProgress =
          opts.verbose && !opts.quiet
            ? (event: AgenticProgressEvent) => {
                switch (event.type) {
                  case 'iteration':
                    console.error(`[Iteration ${event.iteration}]`);
                    break;
                  case 'llm_call':
                    console.error(`  → Calling LLM...`);
                    break;
                  case 'tool_start':
                    console.error(`  → Executing tool: ${event.toolName}`);
                    break;
                  case 'tool_end': {
                    const status = event.result?.success ? '✓' : '✗';
                    console.error(
                      `    ${status} ${event.toolName} ${event.result?.success ? 'succeeded' : 'failed'}`
                    );
                    if (!event.result?.success && event.result?.error) {
                      console.error(`      Error: ${event.result.error}`);
                    }
                    break;
                  }
                  case 'complete':
                    console.error(`[Complete: ${event.message}]`);
                    break;
                }
              }
            : undefined;

        const res = await agenticChat(message, {
          modelOverride: opts.model,
          autoRoute: opts.autoRoute,
          preferCheap: opts.preferCheap,
          sessionManager,
          systemPrompt: opts.system,
          maxIterations: parseInt(String(opts.maxIterations ?? '50'), 10),
          workdir: opts.workdir ?? process.cwd(),
          enabledTools,
          onProgress,
        });

        // Output result
        console.log(res.text);

        if (!opts.quiet) {
          // Show usage and stats
          console.error('');
          console.error(`[Model: ${res.modelUsed}]`);
          console.error(`[Iterations: ${res.iterations}, Tool calls: ${res.toolCallsExecuted}]`);
          console.error(
            `[Tokens: ${res.usage.prompt_tokens} in, ${res.usage.completion_tokens} out]`
          );

          // Show tool call summary if verbose
          if (opts.verbose && res.toolCallSummary.length > 0) {
            console.error('\n[Tool Call Summary]');
            for (const tc of res.toolCallSummary) {
              const status = tc.success ? '✓' : '✗';
              console.error(`  ${status} ${tc.name}${tc.error ? `: ${tc.error}` : ''}`);
            }
          }

          // Print session info
          const currentSession = sessionManager.getCurrentSession();
          if (currentSession) {
            console.error(`\n[Session: ${currentSession.metadata.id}]`);
          }
        }
      } catch (e) {
        console.error(String(e));
        process.exit(1);
      }
    });
}
