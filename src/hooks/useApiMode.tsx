import { useState, useEffect, createContext, useContext } from "react";

type ApiMode = "demo" | "live";

interface ApiModeContextType {
  mode: ApiMode;
  setMode: (mode: ApiMode) => void;
  isDemoMode: boolean;
}

const ApiModeContext = createContext<ApiModeContextType | undefined>(undefined);

export function useApiMode() {
  const context = useContext(ApiModeContext);
  if (!context) {
    throw new Error("useApiMode must be used within an ApiModeProvider");
  }
  return context;
}

export function ApiModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ApiMode>(() => {
    const stored = localStorage.getItem("api-mode");
    return (stored as ApiMode) || "demo";
  });

  useEffect(() => {
    localStorage.setItem("api-mode", mode);
  }, [mode]);

  const isDemoMode = mode === "demo";

  return (
    <ApiModeContext.Provider value={{ mode, setMode, isDemoMode }}>
      {children}
    </ApiModeContext.Provider>
  );
}