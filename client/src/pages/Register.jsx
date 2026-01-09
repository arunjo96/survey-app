import { useState } from "react";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff, FiUser, FiMail, FiLock } from "react-icons/fi";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await registerUser({ name, email, password });
      toast.success("Account created successfully");
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6 sm:p-7 space-y-5">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-slate-800">
            Create account
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Start managing your surveys
          </p>
        </div>

        <div className="relative">
          <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="w-full border border-slate-300 pl-10 pr-3 py-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Full name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="relative">
          <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="w-full border border-slate-300 pl-10 pr-3 py-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="relative">
          <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type={showPassword ? "text" : "password"}
            className="w-full border border-slate-300 pl-10 pr-10 py-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
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
          onClick={handleRegister}
          disabled={loading}
          className={`w-full py-2.5 rounded-md cursor-pointer font-medium transition ${
            loading
              ? "bg-slate-300 cursor-not-allowed"
              : "bg-teal-600 text-white hover:bg-teal-700"
          }`}
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>

        <p className="text-sm text-center text-slate-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-teal-600 cursor-pointer hover:underline "
          >
            Login
          </span>
        </p>

        <p className="text-xs text-center text-slate-400">© 2026 SurveyApp</p>
      </div>
    </div>
  );
};

export default Register;
