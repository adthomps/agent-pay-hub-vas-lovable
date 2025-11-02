import { Activity, CheckCircle, XCircle, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { useState } from "react";

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  message: string;
  latency?: string;
}

interface HealthCheckResults {
  overall: HealthStatus;
  system: HealthStatus;
  visaToolkit: HealthStatus;
  vercelAI: HealthStatus;
  timestamp: string;
}

export function HealthCheckButton() {
  const [checking, setChecking] = useState(false);
  const [results, setResults] = useState<HealthCheckResults | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const runHealthCheck = async () => {
    setChecking(true);
    setShowDetails(true);
    
    try {
      // Simulate API health check
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock comprehensive health check results
      const healthResults: HealthCheckResults = {
        overall: {
          status: 'healthy',
          message: 'All systems operational',
        },
        system: {
          status: 'healthy',
          message: 'Server running normally',
          latency: '12ms',
        },
        visaToolkit: {
          status: 'healthy',
          message: 'Visa Acceptance API connected',
          latency: '145ms',
        },
        vercelAI: {
          status: 'healthy',
          message: 'AI SDK initialized',
          latency: '89ms',
        },
        timestamp: new Date().toISOString(),
      };

      setResults(healthResults);
    } catch (error) {
      setResults({
        overall: {
          status: 'unhealthy',
          message: 'Health check failed',
        },
        system: {
          status: 'unhealthy',
          message: 'Unable to reach server',
        },
        visaToolkit: {
          status: 'unhealthy',
          message: 'Connection failed',
        },
        vercelAI: {
          status: 'unhealthy',
          message: 'SDK unavailable',
        },
        timestamp: new Date().toISOString(),
      });
    } finally {
      setChecking(false);
    }
  };

  const getStatusIcon = (status: HealthStatus['status']) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'degraded':
        return <AlertCircle className="w-4 h-4 text-warning" />;
      case 'unhealthy':
        return <XCircle className="w-4 h-4 text-destructive" />;
    }
  };

  const getStatusBadge = (status: HealthStatus['status']) => {
    const variants = {
      healthy: 'default',
      degraded: 'secondary',
      unhealthy: 'destructive',
    } as const;
    
    return (
      <Badge variant={variants[status]} className="capitalize">
        {status}
      </Badge>
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Activity className="w-5 h-5" />
              System Diagnostics
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={runHealthCheck}
              disabled={checking}
              className="gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${checking ? "animate-spin" : ""}`} />
              {checking ? "Checking..." : "Run Health Check"}
            </Button>
          </div>
        </CardHeader>
        
        {(showDetails && results) && (
          <CardContent className="space-y-4">
            {/* Overall Status */}
            <div className="p-4 bg-muted/50 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-base">Overall Status</h3>
                {getStatusBadge(results.overall.status)}
              </div>
              <p className="text-sm text-muted-foreground">{results.overall.message}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Last checked: {new Date(results.timestamp).toLocaleString()}
              </p>
            </div>

            {/* Individual Component Checks */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Component Health</h3>
              
              {/* System Health */}
              <div className="flex items-start gap-3 p-3 bg-background border rounded-lg">
                {getStatusIcon(results.system.status)}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm">System</h4>
                    {results.system.latency && (
                      <span className="text-xs text-muted-foreground">{results.system.latency}</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{results.system.message}</p>
                </div>
              </div>

              {/* Visa Toolkit */}
              <div className="flex items-start gap-3 p-3 bg-background border rounded-lg">
                {getStatusIcon(results.visaToolkit.status)}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm">Visa Acceptance Agent Toolkit</h4>
                    {results.visaToolkit.latency && (
                      <span className="text-xs text-muted-foreground">{results.visaToolkit.latency}</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{results.visaToolkit.message}</p>
                </div>
              </div>

              {/* Vercel AI SDK */}
              <div className="flex items-start gap-3 p-3 bg-background border rounded-lg">
                {getStatusIcon(results.vercelAI.status)}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm">Vercel AI SDK</h4>
                    {results.vercelAI.latency && (
                      <span className="text-xs text-muted-foreground">{results.vercelAI.latency}</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{results.vercelAI.message}</p>
                </div>
              </div>
            </div>
          </CardContent>
        )}

        {!showDetails && (
          <CardContent className="text-center py-8">
            <Activity className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Click "Run Health Check" to view system status
            </p>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
