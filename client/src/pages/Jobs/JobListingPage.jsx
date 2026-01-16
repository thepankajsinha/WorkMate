import React, { useEffect, useMemo, useState } from "react";
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
  Loader2,
} from "lucide-react";
import { useJobs } from "../../context/JobContext";

const JobsPage = () => {
  const { jobs, loading, fetchAllJobs } = useJobs();

  // ✅ Filters
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("all");

  // ✅ Fetch jobs once
  useEffect(() => {
    fetchAllJobs();
  }, []);

  // ✅ Convert date -> "2 days ago"
  const timeAgo = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const now = new Date();

    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    return `${diffDays} days ago`;
  };

  // ✅ Filtered Jobs
  const filteredJobs = useMemo(() => {
    return (jobs || []).filter((job) => {
      const q = query.toLowerCase().trim();
      const loc = location.toLowerCase().trim();

      const companyName = job?.employer?.companyName || "";
      const skills = Array.isArray(job?.skills) ? job.skills : [];

      const matchQuery =
        !q ||
        job?.title?.toLowerCase().includes(q) ||
        companyName.toLowerCase().includes(q) ||
        skills.join(" ").toLowerCase().includes(q);

      const matchLocation = !loc || job?.location?.toLowerCase().includes(loc);

      const matchType = jobType === "all" || job?.jobType === jobType;

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

          {/* ✅ Loading */}
          {loading && (
            <div className="flex items-center justify-center gap-2 text-slate-600 font-bold py-6">
              <Loader2 className="animate-spin" size={18} />
              Loading jobs...
            </div>
          )}

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
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
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

          {/* ✅ Empty State */}
          {!loading && filteredJobs.length === 0 ? (
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
              {filteredJobs.map((job) => {
                const companyName = job?.employer?.companyName || "Company";
                const companyLogo =
                  job?.employer?.companyLogo?.url ||
                  `https://ui-avatars.com/api/?name=${companyName}&background=0148D6&color=fff`;

                const tags = Array.isArray(job?.skills) ? job.skills : [];

                return (
                  <div
                    key={job._id}
                    className="bg-white border border-slate-100 rounded-3xl p-5 md:p-6 shadow-xl shadow-blue-900/5 hover:shadow-2xl transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                      {/* Left */}
                      <div className="flex items-start gap-4">
                        {/* ✅ Company Logo */}
                        <div className="w-16 h-16 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden flex items-center justify-center shrink-0">
                          <img
                            src={companyLogo}
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
                            {companyName}
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
                          {tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {tags.slice(0, 8).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-bold"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          <p className="text-xs font-bold text-slate-400 mt-3">
                            {timeAgo(job.createdAt)}
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
                );
              })}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default JobsPage;
