import { useState } from "react";
import { useToast } from "./use-toast";

export interface CreatePayLinkData {
  amount: number;
  currency: string;
  memo?: string;
}

export interface PayLink {
  id: string;
  url: string;
  amount: number;
  currency: string;
  memo?: string;
  createdAt: string;
}

export function usePayLinks() {
  const [creating, setCreating] = useState(false);
  const [lastCreatedLink, setLastCreatedLink] = useState<PayLink | null>(null);
  const { toast } = useToast();

  const createPayLink = async (data: CreatePayLinkData): Promise<PayLink | null> => {
    setCreating(true);
    try {
      const response = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        setLastCreatedLink(result);
        toast({
          title: "Success",
          description: "Pay-by-link created successfully",
        });
        return result;
      } else {
        throw new Error("Failed to create pay-by-link");
      }
    } catch (error) {
      // Mock response for demo
      const mockLink: PayLink = {
        id: `link_${Date.now()}`,
        url: `https://pay.example.com/link_${Date.now()}`,
        amount: data.amount,
        currency: data.currency,
        memo: data.memo,
        createdAt: new Date().toISOString(),
      };
      
      setLastCreatedLink(mockLink);
      toast({
        title: "Demo Mode",
        description: "Pay-by-link API not available, showing mock link",
      });
      
      return mockLink;
    } finally {
      setCreating(false);
    }
  };

  return {
    createPayLink,
    creating,
    lastCreatedLink,
  };
}