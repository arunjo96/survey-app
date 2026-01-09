import { useState } from "react";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      const res = await loginUser({ email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Welcome back");
      navigate("/dashboard");
    } catch {
      toast.error("Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6 sm:p-7 space-y-5">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-slate-800">Sign in</h2>
          <p className="text-sm text-slate-500 mt-1">Welcome to Survey App</p>
        </div>

        <input
          className="w-full border border-slate-300 px-3 py-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-slate-300 px-3 py-2.5 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-2.5 rounded-md font-medium transition ${
            loading
              ? "bg-slate-300 cursor-not-allowed"
              : "bg-teal-600 text-white hover:bg-teal-700 cursor-pointer"
          }`}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <p className="text-sm text-center text-slate-500">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-teal-600 cursor-pointer hover:underline "
          >
            Register
          </span>
        </p>

        <p className="text-xs text-center text-slate-400">© 2026 SurveyApp</p>
      </div>
    </div>
  );
};

export default Login;
