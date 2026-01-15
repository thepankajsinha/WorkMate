import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Brain,
  Zap,
  BookmarkCheck,
  MapPin,
  Building2,
  ArrowRight,
  Briefcase,
  IndianRupee,
} from "lucide-react";

const SavedJobs = () => {
  // ✅ Dummy saved jobs
  const savedJobs = [
    {
      id: "1",
      title: "Frontend Developer",
      company: "Google",
      companyLogo:
        "https://ui-avatars.com/api/?name=Google&background=0148D6&color=fff",
      location: "Remote",
      type: "Full-time",
      salary: "₹12L - ₹18L",
      experience: "0 - 2 Years",
      tags: ["React", "Tailwind", "JavaScript"],
      savedAt: "Saved 2 days ago",
    },
    {
      id: "2",
      title: "MERN Stack Developer",
      company: "Infosys",
      companyLogo:
        "https://ui-avatars.com/api/?name=Infosys&background=0148D6&color=fff",
      location: "Delhi",
      type: "Internship",
      salary: "₹25k / month",
      experience: "Fresher",
      tags: ["MongoDB", "Express", "Node.js"],
      savedAt: "Saved Yesterday",
    },
    {
      id: "3",
      title: "Backend Developer (Node.js)",
      company: "Amazon",
      companyLogo:
        "https://ui-avatars.com/api/?name=Amazon&background=0148D6&color=fff",
      location: "Bangalore",
      type: "Full-time",
      salary: "₹15L - ₹22L",
      experience: "1 - 3 Years",
      tags: ["Node.js", "API", "AWS"],
      savedAt: "Saved Today",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-slate-900 overflow-x-hidden relative">
      {/* ✅ Background Glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute top-40 right-[-120px] w-[520px] h-[520px] bg-indigo-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-180px] left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-sky-400/10 rounded-full blur-3xl" />
      </div>

      {/* ✅ Header */}
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
            Saved Jobs
          </div>
        </div>
      </header>

      {/* ✅ Content */}
      <main className="px-4 pb-20 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto space-y-8"
        >
          {/* ✅ Title */}
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-black leading-tight">
              Your <span className="text-blue-600">Saved Jobs</span>
            </h1>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              These are the jobs you bookmarked. Apply anytime.
            </p>
          </div>

          {/* ✅ Jobs List (1 job per line) */}
          <div className="space-y-4">
            {savedJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white border border-slate-100 rounded-3xl p-5 md:p-6 shadow-xl shadow-blue-900/5 hover:shadow-2xl transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                  {/* ✅ Left Side */}
                  <div className="flex items-start gap-4">
                    {/* ✅ Company Logo */}
                    <div className="w-14 h-14 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden flex items-center justify-center">
                      <img
                        src={job.companyLogo}
                        alt="logo"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <h3 className="text-lg md:text-xl font-black text-slate-900">
                        {job.title}
                      </h3>

                      <p className="text-slate-700 font-bold mt-1 flex items-center gap-2">
                        <Building2 size={18} className="text-blue-600" />
                        {job.company}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold flex items-center gap-2">
                          <MapPin size={16} className="text-blue-600" />
                          {job.location}
                        </span>

                        <span className="px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold flex items-center gap-2">
                          <Briefcase size={16} className="text-blue-600" />
                          {job.type}
                        </span>

                        <span className="px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-bold">
                          {job.experience}
                        </span>

                        <span className="px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-bold flex items-center gap-2">
                          <IndianRupee size={16} />
                          {job.salary}
                        </span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {job.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-bold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <p className="text-xs font-bold text-slate-400 mt-3">
                        {job.savedAt}
                      </p>
                    </div>
                  </div>

                  {/* ✅ Right Side */}
                  <div className="flex items-center justify-end gap-3">
                    {/* Saved Icon */}
                    <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700">
                      <BookmarkCheck size={20} />
                    </div>

                    {/* ✅ View Job */}
                    <Link
                      to={`/jobs/${job.id}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                    >
                      View Job <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default SavedJobs;
