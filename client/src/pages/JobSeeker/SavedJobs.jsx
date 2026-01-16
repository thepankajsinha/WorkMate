import React, { useEffect } from "react";
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
  Trash2,
  Loader2,
} from "lucide-react";

import { useBookmarks } from "../../context/BookmarkContext";

const SavedJobs = () => {
  const { bookmarks, loading, fetchBookmarks, removeBookmark } = useBookmarks();

  useEffect(() => {
    fetchBookmarks();
  }, []);

  // ✅ Extract job object safely
  const getJobFromBookmark = (b) => {
    if (!b) return null;
    if (typeof b.job === "object") return b.job; // populated
    return null; // if not populated, can't show job details
  };

  // ✅ UI date like "Saved 2 days ago"
  const timeAgo = (dateValue) => {
    if (!dateValue) return "";
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) return "";

    const diffMs = Date.now() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return "Saved today";
    if (diffDays === 1) return "Saved yesterday";
    return `Saved ${diffDays} days ago`;
  };

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

          {/* ✅ Loading */}
          {loading && (
            <div className="flex justify-center items-center gap-2 py-8 text-slate-600 font-bold">
              <Loader2 className="animate-spin" size={18} />
              Loading saved jobs...
            </div>
          )}

          {/* ✅ Empty state */}
          {!loading && bookmarks.length === 0 && (
            <div className="bg-white border border-slate-100 rounded-3xl p-10 text-center shadow-xl shadow-blue-900/5">
              <p className="text-slate-700 font-black text-lg">
                No saved jobs yet 😅
              </p>
              <p className="text-slate-500 mt-2 font-medium">
                Go to Jobs page and bookmark jobs you like.
              </p>

              <Link
                to="/jobs"
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
              >
                Explore Jobs <ArrowRight size={18} />
              </Link>
            </div>
          )}

          {/* ✅ Bookmarks List */}
          {!loading && bookmarks.length > 0 && (
            <div className="space-y-4">
              {bookmarks.map((b) => {
                const job = getJobFromBookmark(b);

                // ✅ If backend didn't populate job, fallback minimal UI
                if (!job) {
                  return (
                    <div
                      key={b._id}
                      className="bg-white border border-slate-100 rounded-3xl p-5 shadow-xl shadow-blue-900/5"
                    >
                      <p className="font-bold text-slate-700">
                        Job details not available (job not populated)
                      </p>
                      <p className="text-sm text-slate-500 mt-2">
                        Bookmark ID: {b._id}
                      </p>
                    </div>
                  );
                }

                const companyName = job?.employer?.companyName || "Company";
                const companyLogo =
                  job?.employer?.companyLogo?.url ||
                  `https://ui-avatars.com/api/?name=${companyName}&background=0148D6&color=fff`;

                return (
                  <div
                    key={b._id}
                    className="bg-white border border-slate-100 rounded-3xl p-5 md:p-6 shadow-xl shadow-blue-900/5 hover:shadow-2xl transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                      {/* ✅ Left Side */}
                      <div className="flex items-start gap-4">
                        {/* ✅ Company Logo */}
                        <Link
                          to={`/company/${job?.employer?._id}`}
                          className="w-14 h-14 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden flex items-center justify-center shrink-0"
                          title="View Company"
                        >
                          <img
                            src={companyLogo}
                            alt="logo"
                            className="w-full h-full object-cover"
                          />
                        </Link>

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

                            <span className="px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-bold flex items-center gap-2">
                              <IndianRupee size={16} />
                              {job.salary}
                            </span>
                          </div>

                          {/* ✅ Skills / Tags (optional) */}
                          {job.skills?.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {job.skills.slice(0, 6).map((tag) => (
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
                            {timeAgo(b?.createdAt)}
                          </p>
                        </div>
                      </div>

                      {/* ✅ Right Side */}
                      <div className="flex items-center justify-end gap-3">
                        {/* ✅ Saved Icon */}
                        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700">
                          <BookmarkCheck size={20} />
                        </div>

                        {/* ✅ Remove Bookmark */}
                        <button
                          onClick={() => removeBookmark(job._id)}
                          className="p-3 rounded-2xl bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 transition-all"
                          title="Remove Bookmark"
                        >
                          <Trash2 size={18} />
                        </button>

                        {/* ✅ View Job */}
                        <Link
                          to={`/jobs/${job._id}`}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                        >
                          View Job <ArrowRight size={18} />
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

export default SavedJobs;
