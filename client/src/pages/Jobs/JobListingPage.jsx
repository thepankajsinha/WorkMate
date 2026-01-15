import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Brain,
  Zap,
  Search,
  MapPin,
  Building2,
  Briefcase,
  IndianRupee,
  ArrowRight,
  SlidersHorizontal,
  Bookmark,
} from "lucide-react";

const JobsPage = () => {
  // ✅ Dummy Jobs Data (No backend needed)
  const jobs = [
    {
      _id: "1",
      title: "Frontend Developer (React)",
      companyName: "Google",
      companyLogo:
        "https://ui-avatars.com/api/?name=Google&background=0148D6&color=fff",
      location: "Remote",
      jobType: "Full-time",
      experience: "0 - 2 Years",
      salary: "₹6L - ₹10L",
      tags: ["React", "Tailwind", "JavaScript"],
      posted: "2 days ago",
    },
    {
      _id: "2",
      title: "MERN Stack Developer",
      companyName: "Infosys",
      companyLogo:
        "https://ui-avatars.com/api/?name=Infosys&background=0148D6&color=fff",
      location: "Delhi",
      jobType: "Internship",
      experience: "Fresher",
      salary: "₹25k / month",
      tags: ["MongoDB", "Express", "Node.js"],
      posted: "1 day ago",
    },
    {
      _id: "3",
      title: "Backend Developer (Node.js)",
      companyName: "Amazon",
      companyLogo:
        "https://ui-avatars.com/api/?name=Amazon&background=0148D6&color=fff",
      location: "Bangalore",
      jobType: "Full-time",
      experience: "1 - 3 Years",
      salary: "₹10L - ₹18L",
      tags: ["Node.js", "API", "AWS"],
      posted: "5 days ago",
    },
    {
      _id: "4",
      title: "UI/UX Designer",
      companyName: "Adobe",
      companyLogo:
        "https://ui-avatars.com/api/?name=Adobe&background=0148D6&color=fff",
      location: "Remote",
      jobType: "Full-time",
      experience: "0 - 2 Years",
      salary: "₹8L - ₹14L",
      tags: ["Figma", "UI", "UX"],
      posted: "3 days ago",
    },
    {
      _id: "5",
      title: "Data Analyst",
      companyName: "TCS",
      companyLogo:
        "https://ui-avatars.com/api/?name=TCS&background=0148D6&color=fff",
      location: "Noida",
      jobType: "Full-time",
      experience: "Fresher",
      salary: "₹4L - ₹7L",
      tags: ["SQL", "Excel", "Power BI"],
      posted: "Today",
    },
  ];

  // ✅ Filters
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("all");

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const q = query.toLowerCase().trim();
      const loc = location.toLowerCase().trim();

      const matchQuery =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.companyName.toLowerCase().includes(q) ||
        job.tags.join(" ").toLowerCase().includes(q);

      const matchLocation = !loc || job.location.toLowerCase().includes(loc);

      const matchType = jobType === "all" || job.jobType === jobType;

      return matchQuery && matchLocation && matchType;
    });
  }, [jobs, query, location, jobType]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-slate-900 overflow-x-hidden relative">
      {/* ✅ Background glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute top-40 right-[-120px] w-[520px] h-[520px] bg-indigo-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-180px] left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-sky-400/10 rounded-full blur-3xl" />
      </div>

      {/* ✅ Header */}
      <header className="w-full px-4 pt-10 pb-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg shadow-sm">
              <Brain size={24} className="text-white" />
            </div>
            <span className="text-2xl font-black tracking-tight">HireMind</span>
          </div>

          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-bold">
            <Zap size={16} />
            Find Jobs
          </div>
        </div>
      </header>

      {/* ✅ Page Content */}
      <main className="px-4 pb-20 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto space-y-8"
        >
          {/* Title */}
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-black leading-tight">
              Explore <span className="text-blue-600">Jobs</span>
            </h1>
            <p className="text-slate-500 mt-3 max-w-2xl mx-auto">
              Search and find the perfect job role.
            </p>
          </div>

          {/* Search + Filters */}
          <div className="bg-white border border-slate-100 rounded-3xl p-5 md:p-6 shadow-2xl shadow-blue-900/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
                <Search size={18} className="text-blue-600" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search job, company, skill..."
                  className="w-full bg-transparent outline-none font-medium"
                />
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
                <MapPin size={18} className="text-blue-600" />
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Delhi / Remote / Bangalore"
                  className="w-full bg-transparent outline-none font-medium"
                />
              </div>

              {/* Type */}
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3">
                <SlidersHorizontal size={18} className="text-blue-600" />
                <select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  className="w-full bg-transparent outline-none font-bold text-slate-700"
                >
                  <option value="all">All Job Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
            </div>

            {/* count + reset */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-sm font-bold text-slate-500">
                Showing{" "}
                <span className="text-blue-600">{filteredJobs.length}</span>{" "}
                jobs
              </p>

              <button
                onClick={() => {
                  setQuery("");
                  setLocation("");
                  setJobType("all");
                }}
                className="px-5 py-2.5 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Jobs List (✅ 1 job per line) */}
          {filteredJobs.length === 0 ? (
            <div className="bg-white border border-slate-100 rounded-3xl p-10 text-center shadow-xl shadow-blue-900/5">
              <p className="text-slate-600 font-bold text-lg">
                No jobs found 😢
              </p>
              <p className="text-slate-500 mt-2 font-medium">
                Try different keywords or location.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white border border-slate-100 rounded-3xl p-5 md:p-6 shadow-xl shadow-blue-900/5 hover:shadow-2xl transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                    {/* Left */}
                    <div className="flex items-start gap-4">
                      {/* ✅ Company Logo */}
                      <div className="w-18 h-18 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden flex items-center justify-center">
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
                          {job.companyName}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-3">
                          <span className="px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold flex items-center gap-2">
                            <MapPin size={16} className="text-blue-600" />
                            {job.location}
                          </span>

                          <span className="px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold flex items-center gap-2">
                            <Briefcase size={16} className="text-blue-600" />
                            {job.jobType}
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
                          {job.posted}
                        </p>
                      </div>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-3 justify-end">
                      <button className="p-3 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 hover:bg-blue-100 transition-all">
                        <Bookmark size={18} />
                      </button>

                      <Link
                        to={`/jobs/${job._id}`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                      >
                        View Details <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default JobsPage;
