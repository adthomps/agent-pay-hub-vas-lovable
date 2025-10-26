import { useState, useEffect } from "react";
import { useToast } from "./use-toast";

// Mock data generator
const generateMockInvoices = (): Invoice[] => {
  const statuses: Invoice["status"][] = ["draft", "sent", "paid", "cancelled"];
  const emails = ["customer@example.com", "client@business.com", "user@test.com", "buyer@company.com"];
  const names = ["John Doe", "Jane Smith", "Acme Corp", "Tech Solutions"];
  
  return Array.from({ length: 12 }, (_, i) => ({
    id: `INV-${String(i + 1).padStart(4, "0")}`,
    amount: Math.floor(Math.random() * 5000) + 100,
    currency: "USD",
    email: emails[i % emails.length],
    name: i % 2 === 0 ? names[i % names.length] : undefined,
    memo: i % 3 === 0 ? `Invoice for services #${1000 + i}` : undefined,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    dueDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString(),
  }));
};

export interface Invoice {
  id: string;
  amount: number;
  currency: string;
  email: string;
  name?: string;
  memo?: string;
  status: "draft" | "sent" | "paid" | "cancelled";
  dueDate: string;
  createdAt: string;
}

export interface CreateInvoiceData {
  amount: number;
  currency: string;
  email: string;
  name?: string;
  memo?: string;
  dueDays?: number;
}

export function useInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchInvoices = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setInvoices(generateMockInvoices());
    setLoading(false);
  };

  const createInvoice = async (data: CreateInvoiceData) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      const newInvoice: Invoice = {
        id: `INV-${String(invoices.length + 1).padStart(4, "0")}`,
        amount: data.amount,
        currency: data.currency,
        email: data.email,
        name: data.name,
        memo: data.memo,
        status: "draft",
        dueDate: new Date(Date.now() + (data.dueDays || 30) * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date().toISOString(),
      };
      
      setInvoices([newInvoice, ...invoices]);
      toast({
        title: "Success",
        description: "Invoice created successfully",
      });
      setLoading(false);
      return newInvoice;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to create invoice";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      setLoading(false);
      throw error;
    }
  };

  const sendInvoice = async (id: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      setInvoices(prev =>
        prev.map(inv => inv.id === id ? { ...inv, status: "sent" as const } : inv)
      );
      toast({
        title: "Success",
        description: "Invoice sent successfully",
      });
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send invoice",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const cancelInvoice = async (id: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      setInvoices(prev =>
        prev.map(inv => inv.id === id ? { ...inv, status: "cancelled" as const } : inv)
      );
      toast({
        title: "Success",
        description: "Invoice cancelled successfully",
      });
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel invoice",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return {
    invoices,
    loading,
    createInvoice,
    sendInvoice,
    cancelInvoice,
    refreshInvoices: fetchInvoices,
  };
}