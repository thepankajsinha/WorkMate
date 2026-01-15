import React from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Briefcase, Users, Building2, CheckCircle2, ArrowRight, TrendingUp, Globe, Zap, ShieldCheck, Brain, Home, } from "lucide-react";

const HomePage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-bold mb-6"
          >
            <Zap size={16} />
            <span>AI-Powered Job Matching is here</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-black tracking-tight mb-6 leading-[1.1]"
          >
            Find the <span className="text-blue-600">Career</span> You{" "}
            <br className="hidden md:block" />
            Actually Deserve.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            HireMind connects the world's best talent with the most innovative
            companies. Join 50k+ professionals finding their dream roles today.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-4xl mx-auto bg-white p-2 rounded-2xl shadow-2xl shadow-blue-900/10 border border-slate-100 flex flex-col md:flex-row gap-2"
          >
            <div className="flex-1 flex items-center px-4 gap-3 border-b md:border-b-0 md:border-r border-slate-100 py-3">
              <Search className="text-blue-500" size={20} />
              <input
                type="text"
                placeholder="Job title, keywords..."
                className="w-full bg-transparent outline-none font-medium"
              />
            </div>
            <div className="flex-1 flex items-center px-4 gap-3 py-3">
              <MapPin className="text-blue-500" size={20} />
              <input
                type="text"
                placeholder="City or Remote"
                className="w-full bg-transparent outline-none font-medium"
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200">
              Find Jobs
            </button>
          </motion.div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Active Jobs", val: "12,000+", icon: Briefcase },
              { label: "Companies", val: "450+", icon: Building2 },
              { label: "Job Seekers", val: "80,000+", icon: Users },
              { label: "Success Rate", val: "94%", icon: TrendingUp },
            ].map((stat, i) => (
              <div key={i} className="text-center space-y-2">
                <div className="inline-flex p-3 bg-white rounded-2xl shadow-sm text-blue-600 mb-2">
                  <stat.icon size={24} />
                </div>
                <h3 className="text-3xl font-black text-slate-900">
                  {stat.val}
                </h3>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURE CATEGORIES --- */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl font-black mb-4">
              Browse by <span className="text-blue-600">Categories</span>
            </h2>
            <p className="text-slate-500">
              Explore thousands of job openings across top industries. We help
              you narrow down the perfect fit.
            </p>
          </div>
          <button className="flex items-center gap-2 text-blue-600 font-bold hover:gap-4 transition-all group">
            View all categories{" "}
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            {
              title: "Software Engineering",
              count: "1,204",
              color: "bg-blue-50 text-blue-600",
            },
            {
              title: "UI/UX Product Design",
              count: "450",
              color: "bg-purple-50 text-purple-600",
            },
            {
              title: "Marketing & Sales",
              count: "890",
              color: "bg-orange-50 text-orange-600",
            },
            {
              title: "Finance & Banking",
              count: "210",
              color: "bg-emerald-50 text-emerald-600",
            },
            {
              title: "Data & Analytics",
              count: "560",
              color: "bg-indigo-50 text-indigo-600",
            },
            {
              title: "Customer Support",
              count: "340",
              color: "bg-pink-50 text-pink-600",
            },
            {
              title: "Human Resources",
              count: "120",
              color: "bg-yellow-50 text-yellow-600",
            },
            {
              title: "Project Management",
              count: "305",
              color: "bg-cyan-50 text-cyan-600",
            },
          ].map((cat, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="p-6 rounded-3xl border border-slate-100 bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all cursor-pointer group"
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 font-bold ${cat.color}`}
              >
                <Zap size={20} />
              </div>
              <h4 className="font-bold text-lg text-slate-800 group-hover:text-blue-600 transition-colors">
                {cat.title}
              </h4>
              <p className="text-slate-400 text-sm font-medium mt-1">
                {cat.count} open positions
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-50 border-t border-slate-200 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Brain size={24} className="text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight">
                HireMind
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Leading the way in modern recruiting. We bridge the gap between
              global talent and industry pioneers.
            </p>
          </div>
          <div>
            <h5 className="font-bold mb-6">For Candidates</h5>
            <ul className="space-y-4 text-slate-500 text-sm font-medium">
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                Browse Jobs
              </li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                Candidate Dashboard
              </li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                Job Alerts
              </li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                Saved Jobs
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-6">For Employers</h5>
            <ul className="space-y-4 text-slate-500 text-sm font-medium">
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                Post a Job
              </li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                Browse Talent
              </li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                Recruiting Solutions
              </li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                Pricing
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-6">Newsletter</h5>
            <p className="text-slate-500 text-sm mb-4">
              Get the latest job trends and career advice delivered to your
              inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email"
                className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm w-full outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-slate-900 text-white p-2 rounded-xl">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
          <p>© 2024 HireMind Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-blue-600 cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-blue-600 cursor-pointer">
              Terms of Service
            </span>
            <span className="hover:text-blue-600 cursor-pointer">Cookies</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
