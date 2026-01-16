import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogIn,
  UserPlus,
  LogOut,
  User,
  Bookmark,
  Briefcase,
  Brain,
  ChevronDown,
  Home,
  Search,
  Settings,
  Users,
  Building2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  // Profile dropdown (when user logged in)
  const [open, setOpen] = useState(false);

  // Signup dropdown (when user not logged in)
  const [signupOpen, setSignupOpen] = useState(false);

  const dropdownRef = useRef(null);
  const location = useLocation();

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
        setSignupOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Helper to check active route
  const isActive = (path) => location.pathname === path;

  const navLinkStyle = (path) => `
    flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200
    ${
      isActive(path)
        ? "bg-blue-50 text-blue-600"
        : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
    }
  `;

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 z-[100]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="bg-blue-600 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
            <Brain size={24} className="text-white" />
          </div>
          <span className="text-2xl font-black text-slate-900 tracking-tight">
            Work<span className="text-blue-600">Mate</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          <Link to="/" className={navLinkStyle("/")}>
            <Home size={18} />
            Home
          </Link>

          <Link to="/jobs" className={navLinkStyle("/jobs")}>
            <Search size={18} />
            Find Jobs
          </Link>
        </div>

        {/* --- AUTH / PROFILE SECTION --- */}
        <div className="relative flex items-center gap-4" ref={dropdownRef}>
          {user ? (
            <div className="flex items-center gap-4">
              {/* Profile Trigger */}
              <button
                onClick={() => {
                  setOpen(!open);
                  setSignupOpen(false);
                }}
                className={`flex items-center gap-2 p-1.5 pr-3 rounded-full border transition-all duration-200 
                  ${
                    open
                      ? "bg-slate-50 border-blue-200 ring-4 ring-blue-50"
                      : "bg-white border-slate-200 hover:border-blue-300"
                  }`}
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${user.name}&background=0148D6&color=fff`}
                  alt="profile"
                  className="w-8 h-8 rounded-full border border-white object-cover shadow-sm"
                />
                <span className="hidden sm:block text-sm font-bold text-slate-700">
                  {user.name}
                </span>
                <ChevronDown
                  size={14}
                  className={`text-slate-400 transition-transform duration-300 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-[calc(100%+12px)] w-64 bg-white border border-slate-100 shadow-2xl shadow-blue-900/10 rounded-2xl py-2 overflow-hidden"
                  >
                    {/* User Header Info */}
                    <div className="px-4 py-3 bg-slate-50/50 border-b border-slate-50 mb-1">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Account
                      </p>
                      <p className="text-sm font-bold text-slate-800 truncate">
                        {user.email}
                      </p>
                    </div>

                    {/* ✅ Common for BOTH roles */}
                    <Link
                      to="/user-update"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <Settings size={18} className="opacity-70" />
                      Update Account
                    </Link>

                    <div className="my-1 border-t border-slate-50" />

                    {/* ✅ Jobseeker links */}
                    {user.role === "jobseeker" && (
                      <>
                        <Link
                          to="/jobseeker/profile"
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <User size={18} className="opacity-70" /> My Profile
                        </Link>

                        <Link
                          to="/jobseeker/update-profile"
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <Settings size={18} className="opacity-70" /> Update
                          JobSeeker Profile
                        </Link>

                        <Link
                          to="/jobseeker/saved-jobs"
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <Bookmark size={18} className="opacity-70" /> Bookmarked
                          Jobs
                        </Link>

                        <Link
                          to="/jobseeker/applied-jobs"
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <Briefcase size={18} className="opacity-70" /> Applied
                          Jobs
                        </Link>
                      </>
                    )}

                    {/* ✅ Employer links */}
                    {user.role === "employer" && (
                      <>
                        <Link
                          to="/employer/update-profile"
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <Settings size={18} className="opacity-70" /> Update
                          Employer Profile
                        </Link>

                        <Link
                          to="/employer/post-job"
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <Briefcase size={18} className="opacity-70" /> Post a Job
                        </Link>

                        <Link
                          to="/employer/manage-jobs"
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <Building2 size={18} className="opacity-70" /> Manage
                          Jobs
                        </Link>

                        <Link
                          to="/employer/applicants"
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <Users size={18} className="opacity-70" /> View Applicants
                        </Link>
                      </>
                    )}

                    <div className="my-1 border-t border-slate-50" />

                    <button
                      onClick={logout}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {/* Login */}
              <Link
                to="/login"
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-blue-600 bg-blue-100 transition-all hover:bg-gray-100 hover:text-black active:scale-[0.98]"
              >
                <LogIn size={18} />
                Login
              </Link>

              {/* ✅ Register Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setSignupOpen(!signupOpen);
                    setOpen(false);
                  }}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold transition-all active:scale-[0.98]
                    ${
                      signupOpen
                        ? "bg-blue-700 shadow-lg shadow-blue-200"
                        : "hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200"
                    }`}
                >
                  <UserPlus size={18} />
                  Register
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${
                      signupOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {signupOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 top-[calc(100%+12px)] w-72 bg-white border border-slate-100 shadow-2xl shadow-blue-900/10 rounded-2xl overflow-hidden"
                    >
                      <div className="px-4 py-3 bg-slate-50/60 border-b border-slate-100">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          Choose Account Type
                        </p>
                      </div>

                      {/* Jobseeker */}
                      <Link
                        to="/register-jobseeker"
                        onClick={() => setSignupOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                          <Users size={18} />
                        </div>

                        <div className="flex flex-col">
                          <span>Register as Jobseeker</span>
                          <span className="text-xs text-slate-400 font-semibold">
                            Apply & save jobs
                          </span>
                        </div>
                      </Link>

                      {/* Employer */}
                      <Link
                        to="/register-employer"
                        onClick={() => setSignupOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                          <Building2 size={18} />
                        </div>

                        <div className="flex flex-col">
                          <span>Register as Employer</span>
                          <span className="text-xs text-slate-400 font-semibold">
                            Post jobs & hire
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
