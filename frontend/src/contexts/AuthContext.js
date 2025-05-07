import { createContext, useContext, useState, useEffect } from "react";
import WalletApi from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchMe() {
      try {
        const res = await WalletApi.getMe();
        setUser(res.user);
      } catch (err) {
        console.log("Not logged in or token expired");
      }
    }
    fetchMe();
  }, []);

  async function login(credentials) {
    setIsLoading(true);
    try {
      await WalletApi.login(credentials);
      const res = await WalletApi.getMe();
      setUser(res.user);
    } finally {
      setIsLoading(false);
    }
  }

  //clear cookies on logout
  async function logout() {
    try {
      setIsLoading(true);
      await WalletApi.logout();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setIsLoading(false);
    }
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
