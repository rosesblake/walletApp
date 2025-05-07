import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthFormWrapper from "../components/AuthFormWrapper";
import AuthInput from "../components/AuthInput";
import ErrorAlert from "../components/ErrorAlert";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");

  const { login, setIsLoading } = useAuth();

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
      await login(formData);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
      setErrorMsg("Incorrect username/password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthFormWrapper
      title="Welcome Back"
      subtitle="Log in to access your wallet."
    >
      <form onSubmit={handleSubmit}>
        <ErrorAlert message={errorMsg} />

        <AuthInput
          id="username"
          name="username"
          type="text"
          label="Username"
          placeholder="Your wallet ID"
          value={formData.username}
          onChange={handleChange}
        />
        <AuthInput
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="Your password"
          value={formData.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition shadow-sm mt-4"
        >
          Log In
        </button>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Sign up
          </a>
        </p>
      </form>
    </AuthFormWrapper>
  );
}
