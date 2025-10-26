import { useState, useEffect } from "react";
import { useToast } from "./use-toast";

// Mock data generator
const generateMockPayLinks = (): PayLink[] => {
  return Array.from({ length: 8 }, (_, i) => ({
    id: `PL-${String(i + 1).padStart(4, "0")}`,
    url: `https://pay.example.com/pl-${String(i + 1).padStart(4, "0")}`,
    amount: Math.floor(Math.random() * 2000) + 50,
    currency: "USD",
    memo: i % 3 === 0 ? `Payment for order #${1000 + i}` : undefined,
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  }));
};

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
  const [loading, setLoading] = useState(false);
  const [payLinks, setPayLinks] = useState<PayLink[]>([]);
  const [lastCreatedLink, setLastCreatedLink] = useState<PayLink | null>(null);
  const { toast } = useToast();

  const createPayLink = async (data: CreatePayLinkData): Promise<PayLink | null> => {
    setCreating(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      const newLink: PayLink = {
        id: `PL-${String(payLinks.length + 1).padStart(4, "0")}`,
        url: `https://pay.example.com/pl-${String(payLinks.length + 1).padStart(4, "0")}`,
        amount: data.amount,
        currency: data.currency,
        memo: data.memo,
        createdAt: new Date().toISOString(),
      };
      
      setPayLinks([newLink, ...payLinks]);
      setLastCreatedLink(newLink);
      toast({
        title: "Success",
        description: "Pay-by-link created successfully",
      });
      setCreating(false);
      return newLink;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to create pay-by-link";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      setCreating(false);
      return null;
    }
  };

  const fetchPayLinks = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setPayLinks(generateMockPayLinks());
    setLoading(false);
  };

  const refreshPayLinks = () => {
    fetchPayLinks();
  };

  useEffect(() => {
    fetchPayLinks();
  }, []);

  return {
    createPayLink,
    creating,
    loading,
    payLinks,
    lastCreatedLink,
    refreshPayLinks,
  };
}