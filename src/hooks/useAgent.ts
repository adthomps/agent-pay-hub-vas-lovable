import { useState } from "react";
import { useToast } from "./use-toast";

export interface AgentRequest {
  tool?: string;
  args?: Record<string, any>;
  query: string;
}

export interface AgentResponse {
  tool: string;
  result: any;
  success: boolean;
  error?: string;
}

export function useAgent() {
  const [loading, setLoading] = useState(false);
  const [lastResponse, setLastResponse] = useState<AgentResponse | null>(null);
  const { toast } = useToast();

  const askAgent = async (request: AgentRequest): Promise<AgentResponse | null> => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      // Mock response based on query
      const mockResponse: AgentResponse = {
        tool: request.tool || "auto-detect",
        success: true,
        result: {
          message: "Demo mode: This is a simulated AI response",
          query: request.query,
          action: "Successfully processed your request",
          data: {
            invoicesCreated: Math.floor(Math.random() * 3),
            linksGenerated: Math.floor(Math.random() * 2),
            timestamp: new Date().toISOString(),
          }
        }
      };

      setLastResponse(mockResponse);
      toast({
        title: "Agent Response",
        description: `Successfully executed ${mockResponse.tool}`,
      });
      return mockResponse;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      toast({
        title: "Demo Error",
        description: errorMessage,
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    askAgent,
    loading,
    lastResponse,
  };
}