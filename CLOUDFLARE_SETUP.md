# Cloudflare + Visa Acceptance Agent Toolkit Setup Guide

This guide will help you deploy your Visa Acceptance Agent Toolkit to Cloudflare Pages with Hono backend.

## 🎯 What's Been Done

Your project has been fully prepared for Cloudflare deployment:

- ✅ Backend structure created with Hono in `/functions/`
- ✅ API routes configured for agents, invoices, and payment links
- ✅ Frontend refactored to remove demo mode
- ✅ All dependencies installed
- ✅ Configuration files created

## 📋 Prerequisites

1. **Cloudflare Account** (free tier is sufficient)
   - Sign up at https://dash.cloudflare.com/sign-up

2. **Visa Acceptance Agent Toolkit Credentials**
   - Merchant ID
   - API Key ID
   - Secret Key
   - Get these from your Visa developer account

## 🚀 Quick Start

### Step 1: Install Wrangler CLI

```bash
npm install -g wrangler
```

### Step 2: Login to Cloudflare

```bash
wrangler login
```

This will open a browser window to authenticate.

### Step 3: Verify Your Account

```bash
wrangler whoami
```

### Step 4: Configure Local Environment Variables

Edit `.dev.vars` file with your actual Visa credentials:

```env
VISA_ACCEPTANCE_MERCHANT_ID=your_actual_merchant_id
VISA_ACCEPTANCE_API_KEY_ID=your_actual_api_key_id
VISA_ACCEPTANCE_SECRET_KEY=your_actual_secret_key
```

⚠️ **IMPORTANT**: Never commit `.dev.vars` to git. It's already in `.gitignore`.

### Step 5: Test Locally

Run the development server with Cloudflare Functions:

```bash
npm run dev:wrangler
```

This will start:
- Frontend on `http://localhost:8080`
- Backend API routes on `http://localhost:8080/api/*`

Test the following:
- ✅ Create an invoice
- ✅ Create a payment link
- ✅ Ask the agent a question
- ✅ Check the browser console for errors

### Step 6: Deploy to Cloudflare Pages

```bash
npm run deploy
```

This command will:
1. Build your React app (`npm run build`)
2. Deploy to Cloudflare Pages
3. Automatically deploy functions as Workers

### Step 7: Configure Production Environment Variables

After your first deployment, set your environment variables in the Cloudflare dashboard:

1. Go to https://dash.cloudflare.com
2. Navigate to **Workers & Pages** > Your Project
3. Click **Settings** > **Environment Variables**
4. Add the following variables:
   - `VISA_ACCEPTANCE_MERCHANT_ID`
   - `VISA_ACCEPTANCE_API_KEY_ID`
   - `VISA_ACCEPTANCE_SECRET_KEY`

5. Click **Save** and redeploy

## 🛠️ Available NPM Scripts

```bash
# Local development (Vite only)
npm run dev

# Local development with Cloudflare Functions
npm run dev:wrangler

# Build for production
npm run build

# Preview production build locally
npm run preview

# Deploy to Cloudflare Pages
npm run deploy

# Check Cloudflare login status
npm run cf:whoami
```

## 📁 Project Structure

```
/
├── functions/                  # Cloudflare Functions (Backend)
│   ├── [[path]].ts            # Catch-all handler
│   ├── api/
│   │   ├── index.ts           # Main Hono app
│   │   ├── agent/             # Agent API routes
│   │   ├── invoices/          # Invoice API routes
│   │   └── links/             # Payment link API routes
│   └── lib/
│       └── visa-toolkit.ts    # Visa toolkit singleton
├── src/                       # React Frontend
│   ├── components/
│   ├── hooks/
│   └── pages/
├── .dev.vars                  # Local env vars (gitignored)
└── wrangler.toml              # Cloudflare config
```

## 🔍 API Endpoints

Your backend exposes the following endpoints:

### Agent
- `POST /api/agent/ask` - Natural language queries

### Invoices
- `GET /api/invoices` - List all invoices
- `POST /api/invoices` - Create invoice
- `POST /api/invoices/:id/send` - Send invoice
- `POST /api/invoices/:id/cancel` - Cancel invoice

### Payment Links
- `GET /api/links` - List all payment links
- `POST /api/links` - Create payment link

## 🐛 Troubleshooting

### Local Development Issues

**Problem**: Functions not loading locally
```bash
# Solution: Make sure wrangler is running
npm run dev:wrangler
```

**Problem**: Environment variables not working
```bash
# Solution: Check .dev.vars file exists and has correct format
cat .dev.vars
```

### Deployment Issues

**Problem**: "Failed to publish"
```bash
# Solution: Check if you're logged in
wrangler whoami

# Re-login if needed
wrangler login
```

**Problem**: API returns 500 errors in production
```bash
# Solution: Check environment variables are set in Cloudflare dashboard
# Go to Workers & Pages > Your Project > Settings > Environment Variables
```

### Viewing Logs

**Local logs**: Check your terminal where `npm run dev:wrangler` is running

**Production logs**:
1. Go to https://dash.cloudflare.com
2. Navigate to **Workers & Pages** > Your Project
3. Click **View** next to your deployment
4. Check the **Logs** tab

## 💡 Tips

1. **Testing without deploying**: Use `npm run dev:wrangler` to test everything locally

2. **Faster deployments**: Cloudflare Pages deploys in ~30 seconds

3. **Free tier limits**:
   - 100,000 requests/day
   - 500 builds/month
   - Unlimited bandwidth

4. **Environment switching**: Use different projects for staging/production:
   ```bash
   wrangler pages project create my-app-staging
   wrangler pages project create my-app-production
   ```

5. **Custom domains**: Add your domain in the Cloudflare dashboard:
   - Workers & Pages > Your Project > Custom Domains

## 📚 Resources

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Hono Documentation](https://hono.dev/)
- [Visa Acceptance Agent Toolkit](https://developer.visa.com/)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)

## 🔐 Security Notes

- Never commit `.dev.vars` to version control
- Use environment variables for all sensitive data
- Rotate API keys regularly
- Monitor your Cloudflare dashboard for unusual activity

## 🎉 Next Steps

1. Test locally with `npm run dev:wrangler`
2. Verify all API calls work
3. Deploy with `npm run deploy`
4. Set production environment variables
5. Add a custom domain (optional)
6. Enable analytics in Cloudflare dashboard

---

**Need help?** Check the [Cloudflare Community](https://community.cloudflare.com/) or [Visa Developer Portal](https://developer.visa.com/)
