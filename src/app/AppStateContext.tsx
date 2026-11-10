import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

/**
 * Minimal placeholder shared-client-state shape. Later work orders
 * (location/weather features) extend this; no real fields are defined yet.
 */
interface AppState {
  placeholder: null;
}

interface AppStateContextValue {
  state: AppState;
}

const AppStateContext = createContext<AppStateContextValue | undefined>(undefined);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state] = useState<AppState>({ placeholder: null });
  const value = useMemo(() => ({ state }), [state]);

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState(): AppStateContextValue {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
}
