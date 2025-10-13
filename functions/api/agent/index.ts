import { Hono } from 'hono';
import { VisaAcceptanceAgentToolkit } from '@visaacceptance/agent-toolkit/ai-sdk';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { getVisaToolkit } from '../../lib/visa-toolkit';

export const agentRoutes = new Hono();

agentRoutes.post('/ask', async (c) => {
  try {
    const { query, tool, args } = await c.req.json();

    if (!query) {
      return c.json({ error: 'Query is required' }, 400);
    }

    const env = c.env as any;
    const toolkit = getVisaToolkit(env);

    // Use AI to process natural language query
    const result = await generateText({
      model: openai('gpt-4-turbo'),
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant for the Visa Acceptance Agent Toolkit. Help users manage invoices and payment links using natural language.',
        },
        {
          role: 'user',
          content: query,
        },
      ],
      tools: {
        ...toolkit.tools,
      },
      maxSteps: 5,
    });

    return c.json({
      tool: tool || 'auto',
      result: {
        message: result.text,
        toolCalls: result.steps?.map(step => ({
          tool: step.toolName,
          args: step.toolCallResults,
        })),
      },
      success: true,
    });
  } catch (error) {
    console.error('Agent error:', error);
    return c.json({
      tool: 'error',
      result: null,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, 500);
  }
});
