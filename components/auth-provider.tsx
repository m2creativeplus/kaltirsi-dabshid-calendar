"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

type AuthContextType = {
  token: string | null;
  user: any | null;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check localStorage hydration only on client
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("kaltirsi_auth_token");
      if (stored) setToken(stored);
    }
  }, []);

  // Fetch the active user session securely via Convex using the token
  const user = useQuery(api.authActions.getSessionUser, token ? { token } : "skip");

  const login = (newToken: string) => {
    localStorage.setItem("kaltirsi_auth_token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("kaltirsi_auth_token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
