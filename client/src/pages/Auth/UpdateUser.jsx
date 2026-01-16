import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Zap,
  User,
  Mail,
  Lock,
  Save,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UpdateUser = () => {
  const navigate = useNavigate();
  const { user, loading, updateProfile } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  const [btnLoading, setBtnLoading] = useState(false);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  // ✅ Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading]);

  // ✅ set initial values
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user?.name || "",
        email: user?.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setBtnLoading(true);

      await updateProfile({
        name: form.name,
        email: form.email,
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      });

      setForm((prev) => ({
        ...prev,
        oldPassword: "",
        newPassword: "",
      }));
    } finally {
      setBtnLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center gap-2 text-slate-700 font-bold">
        <Loader2 className="animate-spin" size={18} />
        Loading profile...
      </div>
    );
  }

  // ✅ while redirecting
  if (!user) return null;

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="w-full px-4 pt-10 pb-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg shadow-sm">
              <Brain size={24} className="text-white" />
            </div>
            <span className="text-2xl font-black tracking-tight">HireMind</span>
          </div>

          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-bold">
            <Zap size={16} />
            Update Profile
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 pb-20 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto space-y-6"
        >
          {/* Title */}
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-black leading-tight">
              Update <span className="text-blue-600">Account</span>
            </h1>
            <p className="text-slate-500 mt-3 font-medium">
              Update your name, email and password securely.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-2xl shadow-blue-900/10">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="text-sm font-black text-slate-700">
                  Full Name
                </label>
                <div className="mt-2 flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <User size={18} className="text-blue-600" />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full bg-transparent outline-none font-bold text-slate-800"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-black text-slate-700">
                  Email Address
                </label>
                <div className="mt-2 flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <Mail size={18} className="text-blue-600" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full bg-transparent outline-none font-bold text-slate-800"
                  />
                </div>
              </div>

              {/* Old Password */}
              <div>
                <label className="text-sm font-black text-slate-700">
                  Old Password (required if changing password)
                </label>
                <div className="mt-2 flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <Lock size={18} className="text-blue-600" />
                  <input
                    type={showOld ? "text" : "password"}
                    name="oldPassword"
                    value={form.oldPassword}
                    onChange={handleChange}
                    placeholder="Enter old password"
                    className="w-full bg-transparent outline-none font-bold text-slate-800"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOld((p) => !p)}
                    className="text-slate-500 hover:text-slate-800"
                  >
                    {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="text-sm font-black text-slate-700">
                  New Password (optional)
                </label>
                <div className="mt-2 flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <Lock size={18} className="text-blue-600" />
                  <input
                    type={showNew ? "text" : "password"}
                    name="newPassword"
                    value={form.newPassword}
                    onChange={handleChange}
                    placeholder="Enter new password"
                    className="w-full bg-transparent outline-none font-bold text-slate-800"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew((p) => !p)}
                    className="text-slate-500 hover:text-slate-800"
                  >
                    {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <p className="text-xs text-slate-500 font-semibold mt-2">
                  Leave password empty if you don’t want to change it.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <button
                  type="submit"
                  disabled={btnLoading}
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-black transition-all shadow-lg w-full sm:w-auto
                    ${
                      btnLoading
                        ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200"
                    }`}
                >
                  {btnLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Save Changes
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-black bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all w-full sm:w-auto"
                >
                  Cancel
                </button>
              </div>

              {/* Role Info */}
              <div className="pt-4">
                <p className="text-sm text-slate-500 font-semibold">
                  Logged in as:{" "}
                  <span className="font-black text-blue-600">{user?.role}</span>
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default UpdateUser;
