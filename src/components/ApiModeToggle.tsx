import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useApiMode } from "@/hooks/useApiMode";
import { Settings, Globe, TestTube } from "lucide-react";

export function ApiModeToggle() {
  const { mode, setMode, isDemoMode } = useApiMode();

  return (
    <div className="flex items-center gap-2">
      <Badge variant={isDemoMode ? "secondary" : "default"} className="px-2 py-1">
        <div className="flex items-center gap-1.5">
          {isDemoMode ? <TestTube className="h-3 w-3" /> : <Globe className="h-3 w-3" />}
          <span className="text-xs font-medium">
            {isDemoMode ? "Demo" : "Live"}
          </span>
        </div>
      </Badge>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => setMode(isDemoMode ? "live" : "demo")}
        className="h-8 px-2"
      >
        <Settings className="h-3 w-3 mr-1.5" />
        Switch to {isDemoMode ? "Live" : "Demo"}
      </Button>
    </div>
  );
}