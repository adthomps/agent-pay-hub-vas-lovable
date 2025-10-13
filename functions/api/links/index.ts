import { Hono } from 'hono';
import { getVisaToolkit } from '../../lib/visa-toolkit';

export const payLinkRoutes = new Hono();

// List all payment links
payLinkRoutes.get('/', async (c) => {
  try {
    const env = c.env as any;
    const toolkit = getVisaToolkit(env);
    
    const result = await toolkit.actions.paymentLinks.list();
    return c.json(result);
  } catch (error) {
    console.error('List payment links error:', error);
    return c.json({ error: error instanceof Error ? error.message : 'Failed to list payment links' }, 500);
  }
});

// Create new payment link
payLinkRoutes.post('/', async (c) => {
  try {
    const data = await c.req.json();
    const env = c.env as any;
    const toolkit = getVisaToolkit(env);
    
    const result = await toolkit.actions.paymentLinks.create({
      amount: data.amount,
      currency: data.currency,
      memo: data.memo,
    });
    
    return c.json(result);
  } catch (error) {
    console.error('Create payment link error:', error);
    return c.json({ error: error instanceof Error ? error.message : 'Failed to create payment link' }, 500);
  }
});
