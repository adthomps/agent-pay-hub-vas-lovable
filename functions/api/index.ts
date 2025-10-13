import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { agentRoutes } from './agent';
import { invoiceRoutes } from './invoices';
import { payLinkRoutes } from './links';

const app = new Hono();

// CORS middleware
app.use('/*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// Health check
app.get('/api/health', (c) => c.json({ status: 'ok' }));

// Mount route handlers
app.route('/api/agent', agentRoutes);
app.route('/api/invoices', invoiceRoutes);
app.route('/api/links', payLinkRoutes);

export const handle = app.fetch;
