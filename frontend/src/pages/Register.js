import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WalletApi from "../services/api";
import AuthFormWrapper from "../components/AuthFormWrapper";
import AuthInput from "../components/AuthInput";
import ErrorAlert from "../components/ErrorAlert";
import { useAuth } from "../contexts/AuthContext";

export default function Register() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const { setIsLoading } = useAuth();

  const navigate = useNavigate();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((f) => ({ ...f, [name]: value }));
    setErrorMsg("");
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      setIsLoading(true);
      if (formData.username.length > 20 || formData.username.length < 3) {
        setErrorMsg("Username must be between 3-20 characters");
        return;
      }
      if (formData.password.length < 6) {
        setErrorMsg("Password must be at least 6 characters");
        return;
      }
      await WalletApi.register(formData);
      await WalletApi.login(formData);
      navigate("/dashboard");
    } catch (err) {
      console.error("Signup failed:", err);
      setErrorMsg("Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthFormWrapper title="Create Your Wallet">
      <form onSubmit={handleSubmit}>
        <ErrorAlert message={errorMsg} />

        <AuthInput
          id="username"
          name="username"
          type="text"
          label="Username"
          placeholder="Enter a username"
          value={formData.username}
          onChange={handleChange}
        />
        <AuthInput
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition shadow-sm mt-4"
        >
          Sign Up
        </button>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Log in
          </a>
        </p>
      </form>
    </AuthFormWrapper>
  );
}
