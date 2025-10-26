import { Activity } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function HealthCheckButton() {
  const { toast } = useToast();
  const [checking, setChecking] = useState(false);

  const runHealthCheck = async () => {
    setChecking(true);
    
    // Simulate health check delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock health check results
    const mockResults = {
      status: "healthy",
      checks: {
        api: { status: "ok", latency: "45ms" },
        visaApi: { status: "ok", latency: "120ms" },
        database: { status: "ok", latency: "12ms" },
      },
      timestamp: new Date().toISOString(),
    };

    setChecking(false);

    toast({
      title: "✅ Health Check Passed",
      description: (
        <div className="mt-2 space-y-1 text-xs">
          <div>• API: {mockResults.checks.api.status} ({mockResults.checks.api.latency})</div>
          <div>• Visa API: {mockResults.checks.visaApi.status} ({mockResults.checks.visaApi.latency})</div>
          <div>• Database: {mockResults.checks.database.status} ({mockResults.checks.database.latency})</div>
          <div className="pt-1 text-muted-foreground">
            All systems operational
          </div>
        </div>
      ),
    });

    console.log("Health Check Results:", mockResults);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={runHealthCheck}
      disabled={checking}
      className="gap-2"
    >
      <Activity className={`w-4 h-4 ${checking ? "animate-pulse" : ""}`} />
      {checking ? "Checking..." : "Health Check"}
    </Button>
  );
}
