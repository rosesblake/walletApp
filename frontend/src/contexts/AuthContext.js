import { createContext, useContext, useState } from "react";
import WalletApi from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function login(credentials) {
    await WalletApi.login(credentials);
    const res = await WalletApi.getMe();
    setUser(res.user);
  }

  async function logout() {
    // clear cookie manually
    document.cookie = "token=; Max-Age=0; path=/;";
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
