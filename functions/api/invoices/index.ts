import { Hono } from 'hono';
import { getVisaToolkit } from '../../lib/visa-toolkit';

export const invoiceRoutes = new Hono();

// List all invoices
invoiceRoutes.get('/', async (c) => {
  try {
    const env = c.env as any;
    const toolkit = getVisaToolkit(env);
    
    const result = await toolkit.actions.invoices.list();
    return c.json(result);
  } catch (error) {
    console.error('List invoices error:', error);
    return c.json({ error: error instanceof Error ? error.message : 'Failed to list invoices' }, 500);
  }
});

// Create new invoice
invoiceRoutes.post('/', async (c) => {
  try {
    const data = await c.req.json();
    const env = c.env as any;
    const toolkit = getVisaToolkit(env);
    
    const result = await toolkit.actions.invoices.create({
      amount: data.amount,
      currency: data.currency,
      email: data.email,
      name: data.name,
      memo: data.memo,
      dueDays: data.dueDays || 30,
    });
    
    return c.json(result);
  } catch (error) {
    console.error('Create invoice error:', error);
    return c.json({ error: error instanceof Error ? error.message : 'Failed to create invoice' }, 500);
  }
});

// Send invoice
invoiceRoutes.post('/:id/send', async (c) => {
  try {
    const id = c.req.param('id');
    const env = c.env as any;
    const toolkit = getVisaToolkit(env);
    
    const result = await toolkit.actions.invoices.send({ id });
    return c.json(result);
  } catch (error) {
    console.error('Send invoice error:', error);
    return c.json({ error: error instanceof Error ? error.message : 'Failed to send invoice' }, 500);
  }
});

// Cancel invoice
invoiceRoutes.post('/:id/cancel', async (c) => {
  try {
    const id = c.req.param('id');
    const env = c.env as any;
    const toolkit = getVisaToolkit(env);
    
    const result = await toolkit.actions.invoices.cancel({ id });
    return c.json(result);
  } catch (error) {
    console.error('Cancel invoice error:', error);
    return c.json({ error: error instanceof Error ? error.message : 'Failed to cancel invoice' }, 500);
  }
});
