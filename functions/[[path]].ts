// Cloudflare Pages Function catch-all
// Routes all /api/* requests to the Hono app
import { handle } from './api';

export const onRequest = handle;
