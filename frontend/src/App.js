import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Spinner from "./shared/Spinner";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { isLoading } = useAuth();
  return (
    <BrowserRouter>
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-white bg-opacity-75 flex items-center justify-center">
          <Spinner />
        </div>
      )}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
