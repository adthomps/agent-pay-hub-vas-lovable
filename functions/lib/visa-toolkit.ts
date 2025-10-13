import { VisaAcceptanceAgentToolkit } from '@visaacceptance/agent-toolkit/ai-sdk';

// Singleton instance cache
let toolkitInstance: VisaAcceptanceAgentToolkit | null = null;

export function getVisaToolkit(env: any): VisaAcceptanceAgentToolkit {
  if (!toolkitInstance) {
    const merchantId = env.VISA_ACCEPTANCE_MERCHANT_ID;
    const apiKeyId = env.VISA_ACCEPTANCE_API_KEY_ID;
    const secretKey = env.VISA_ACCEPTANCE_SECRET_KEY;

    if (!merchantId || !apiKeyId || !secretKey) {
      throw new Error('Missing required Visa credentials. Please set VISA_ACCEPTANCE_MERCHANT_ID, VISA_ACCEPTANCE_API_KEY_ID, and VISA_ACCEPTANCE_SECRET_KEY in your Cloudflare environment variables.');
    }

    toolkitInstance = new VisaAcceptanceAgentToolkit({
      merchantId,
      apiKeyId,
      secretKey,
      configuration: {
        context: {
          environment: "SANDBOX",
        },
        actions: {
          invoices: {
            create: true,
            update: true,
            list: true,
            get: true,
            send: true,
            cancel: true,
          },
          paymentLinks: {
            create: true,
            update: true,
            list: true,
            get: true,
          },
        },
      },
    });
  }

  return toolkitInstance;
}
