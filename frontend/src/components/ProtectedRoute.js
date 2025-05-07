import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import WalletApi from "../services/api";

export default function ProtectedRoute({ children }) {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await WalletApi.getMe();
        setUser(res.user);
      } catch {
        setUser(null);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [setUser]);

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
