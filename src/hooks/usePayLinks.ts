import { useState, useEffect } from "react";
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
  const [loading, setLoading] = useState(false);
  const [payLinks, setPayLinks] = useState<PayLink[]>([]);
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
      const errorMessage = error instanceof Error ? error.message : "Failed to create pay-by-link";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return null;
    } finally {
      setCreating(false);
    }
  };

  const fetchPayLinks = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/links");
      if (response.ok) {
        const result = await response.json();
        setPayLinks(result);
      } else {
        throw new Error("Failed to fetch pay links");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch pay links";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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