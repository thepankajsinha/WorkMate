import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const LoginPage = () => {
  const { login } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("hm_email");
    const savedPass  = localStorage.getItem("hm_password");

    if (savedEmail && savedPass) {
      setEmail(savedEmail);
      setPassword(savedPass);
      setRemember(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (remember) {
      localStorage.setItem("hm_email", email);
      localStorage.setItem("hm_password", password);
    } else {
      localStorage.removeItem("hm_email");
      localStorage.removeItem("hm_password");
    }


    await login({
      email,
      password
    });

    setLoading(false);
  };

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-[#e9f1ff] via-white to-gray-100 px-4 pt-24 overflow-hidden"
    >
      {/* Soft Glow Shapes */}
      <div className="absolute top-[-50px] left-[-50px] w-[250px] h-[250px] rounded-full bg-[#0148D6]/20 blur-3xl"></div>
      <div className="absolute bottom-[-70px] right-[-70px] w-[280px] h-[280px] rounded-full bg-[#202020]/10 blur-2xl"></div>

      {/* Pattern Overlay */}
      <svg className="absolute inset-0 opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
        <pattern id="patternLogin" width="120" height="120" patternUnits="userSpaceOnUse">
          <path d="M 0 0 L 120 0 120 120" fill="none" stroke="#0148D6" strokeWidth="1" opacity="0.3" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#patternLogin)" />
      </svg>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-md bg-white border border-gray-200 rounded-xl p-8 shadow-sm"
      >
        <h2 className="text-3xl font-bold text-center text-[#0148D6]">Login</h2>
        <p className="text-center text-gray-600 mt-2">Welcome back to HireMind</p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">

          {/* Email */}
          <div>
            <label className="text-sm text-gray-700">Email</label>
            <div className="relative mt-2">
              <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-lg outline-none 
                focus:border-[#0148D6] transition"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-700">Password</label>
            <div className="relative mt-2">
              <Lock size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-lg outline-none 
                focus:border-[#0148D6] transition"
                required
              />
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between mt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="w-4 h-4 cursor-pointer"
              />
              <span className="text-sm text-gray-700">Remember me</span>
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0148D6] text-white py-3 rounded-lg font-medium 
            flex justify-center items-center gap-2 hover:bg-[#0d3ea9] transition"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Logging in...
              </>
            ) : (
              <>
                <LogIn size={18} />
                Login
              </>
            )}
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-gray-600 mt-6 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#0148D6] font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </section>
  );
};

export default LoginPage;
