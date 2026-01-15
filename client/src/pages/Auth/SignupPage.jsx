import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  UserCircle,
  UserPlus,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getPasswordStrength } from "../../utils/passwordStrength.js";
import { useAuth } from "../../context/AuthContext";

const SignupPage = () => {
  const { register } = useAuth();

  //store states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  // Show / Hide Password
  const [showPassword, setShowPassword] = useState(false);

  const passwordStrength = getPasswordStrength(password);

  const handleSignup = async (e) => {
    e.preventDefault();

    setLoading(true);

    await register({
      name,
      email,
      password,
      role,
    });

    setLoading(false);
  };

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-[#e9f1ff] via-white to-gray-100 px-4 pt-24 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md bg-white border border-gray-200 rounded-xl p-8 shadow-sm"
      >
        <h2 className="text-3xl font-bold text-center text-[#0148D6]">
          Create Account
        </h2>
        <p className="text-center text-gray-600 mt-2">
          Join HireMind to explore new opportunities
        </p>

        <form onSubmit={handleSignup} className="mt-8 space-y-5">
          {/* FULL NAME */}
          <div>
            <label className="text-sm text-gray-700">Full Name</label>
            <div className="relative mt-2">
              <User size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                required
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-lg outline-none 
                focus:border-[#0148D6] transition"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-700">Email</label>
            <div className="relative mt-2">
              <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-lg outline-none 
                focus:border-[#0148D6] transition"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-gray-700">Password</label>

            <div className="relative mt-2">
              <Lock size={18} className="absolute left-3 top-3 text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border rounded-lg outline-none 
                focus:border-[#0148D6] transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {password && (
              <p
                className={`text-sm mt-1 ${
                  passwordStrength === "Weak"
                    ? "text-red-500"
                    : passwordStrength === "Medium"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                Strength: {passwordStrength}
              </p>
            )}
          </div>

          {/* ROLE */}
          <div>
            <label className="text-sm text-gray-700">Role</label>
            <div className="relative mt-2">
              <UserCircle
                size={18}
                className="absolute left-3 top-3 text-gray-400"
              />
              <select
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-lg outline-none 
                focus:border-[#0148D6] transition"
              >
                <option value="">Select your role</option>
                <option value="jobseeker">JobSeeker</option>
                <option value="employer">Employer</option>
              </select>
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0148D6] text-white py-3 rounded-lg font-medium 
            flex justify-center items-center gap-2 hover:bg-[#0d3ea9] transition"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Creating account...
              </>
            ) : (
              <>
                <UserPlus size={18} />
                Create Account
              </>
            )}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#0148D6] font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </section>
  );
};

export default SignupPage;
