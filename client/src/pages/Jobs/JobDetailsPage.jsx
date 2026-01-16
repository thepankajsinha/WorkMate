import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import {
  Brain,
  Zap,
  ArrowLeft,
  MapPin,
  Building2,
  Briefcase,
  IndianRupee,
  Clock3,
  CalendarDays,
  BadgeCheck,
  FileText,
  Bookmark,
  BookmarkCheck,
  Send,
  Users,
  Loader2,
} from "lucide-react";

import ApplyJobModal from "../../components/ApplyJobModal";
import { useJobs } from "../../context/JobContext";
import { useBookmarks } from "../../context/BookmarkContext";

const JobDetailsPage = () => {
  const { id } = useParams();
  const { getJobById } = useJobs();

  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const [hasApplied, setHasApplied] = useState(false);


  const [openApplyModal, setOpenApplyModal] = useState(false);

  // ✅ Bookmark
  const [isSaved, setIsSaved] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  // ✅ Job state
  const [job, setJob] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);

  const timeAgo = (date) => {
    if (!date) return "—";
    const now = new Date();
    const posted = new Date(date);
    const diffMs = now - posted;

    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hours ago`;
    if (days === 1) return "1 day ago";
    return `${days} days ago`;
  };

  // ✅ Load job
  useEffect(() => {
    const fetchJob = async () => {
      try {
        setPageLoading(true);
        const res = await getJobById(id);
        setJob(res?.job || null);
      } finally {
        setPageLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  // ✅ Check bookmark status
  useEffect(() => {
    const check = async () => {
      if (!id) return;
      const bookmarked = await isBookmarked(id);
      setIsSaved(bookmarked);
    };

    check();
  }, [id]);

  // ✅ Toggle Bookmark
  const toggleSaveJob = async () => {
    if (!id) return;

    try {
      setBookmarkLoading(true);

      if (isSaved) {
        await removeBookmark(id);
        setIsSaved(false);
      } else {
        await addBookmark(id);
        setIsSaved(true);
      }
    } finally {
      setBookmarkLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center gap-2 text-slate-700 font-bold">
        <Loader2 className="animate-spin" size={18} />
        Loading job details...
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-slate-600 font-bold">Job not found ❌</p>
      </div>
    );
  }

  const companyName = job?.employer?.companyName || "Company";
  const companyLogo =
    job?.employer?.companyLogo?.url ||
    `https://ui-avatars.com/api/?name=${companyName}&background=0148D6&color=fff`;

  const companyId = job?.employer?._id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-slate-900 overflow-x-hidden relative">
      {/* Header */}
      <header className="w-full px-4 pt-10 pb-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg shadow-sm">
              <Brain size={24} className="text-white" />
            </div>
            <span className="text-2xl font-black tracking-tight">WorkMate</span>
          </div>

          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-bold">
            <Zap size={16} />
            Job Details
          </div>
        </div>
      </header>

      <main className="px-4 pb-20 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto space-y-6"
        >
          {/* Back */}
          <div>
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all"
            >
              <ArrowLeft size={18} />
              Back to Jobs
            </Link>
          </div>

          {/* Top Card */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-10 shadow-2xl shadow-blue-900/10">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              {/* Left */}
              <div className="flex items-start gap-4">
                {/* ✅ Company Logo Click */}
                <Link
                  to={companyId ? `/employer/public/${companyId}` : "#"}
                  className="w-16 h-16 rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm block hover:scale-[1.02] transition"
                >
                  <img
                    src={companyLogo}
                    alt="logo"
                    className="w-full h-full object-cover"
                  />
                </Link>

                <div>
                  <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
                    {job.title}
                  </h1>

                  {/* ✅ Company Name Click */}
                  <Link
                    to={companyId ? `/company/${companyId}` : "#"}
                    className="text-slate-700 font-bold mt-2 flex items-center gap-2 hover:text-blue-600 transition"
                  >
                    <Building2 size={18} className="text-blue-600" />
                    {companyName}
                  </Link>

                  <div className="flex flex-wrap gap-3 mt-4 text-sm font-bold text-slate-600">
                    <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200">
                      <MapPin size={16} className="text-blue-600" />
                      {job.location}
                    </span>

                    <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200">
                      <Briefcase size={16} className="text-blue-600" />
                      {job.jobType}
                    </span>

                    <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700">
                      <IndianRupee size={16} />
                      {job.salary}
                    </span>

                    <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700">
                      <Clock3 size={16} />
                      {job.experience}
                    </span>
                  </div>

                  <AnimatePresence>
                    {isSaved && (
                      <motion.p
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="mt-3 text-sm font-bold text-emerald-600"
                      >
                        ✅ Saved to your bookmarks
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Right Actions */}
              <div className="flex flex-col sm:flex-row md:flex-col gap-3">
                {/* ✅ Apply Now */}
                <button
                  onClick={() => setOpenApplyModal(true)}
                  disabled={hasApplied}
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all shadow-lg
                      ${
                        hasApplied
                          ? "bg-emerald-100 text-emerald-700 cursor-not-allowed"
                          : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200"
                      }`}
                >
                  <Send size={18} />
                  {hasApplied ? "Applied ✅" : "Apply Now"}
                </button>

                {/* ✅ Bookmark toggle */}
                <button
                  onClick={toggleSaveJob}
                  disabled={bookmarkLoading}
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all border
                    ${
                      isSaved
                        ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                    } ${
                    bookmarkLoading ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                >
                  {bookmarkLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Please wait
                    </>
                  ) : isSaved ? (
                    <>
                      <BookmarkCheck size={18} />
                      Saved
                    </>
                  ) : (
                    <>
                      <Bookmark size={18} className="text-blue-600" />
                      Save Job
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Meta Cards */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-5 rounded-3xl border border-slate-100 bg-slate-50">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Posted
                </p>
                <p className="text-slate-900 font-black mt-2 flex items-center gap-2">
                  <CalendarDays size={18} className="text-blue-600" />
                  {timeAgo(job.postedOn || job.createdAt)}
                </p>
              </div>

              <div className="p-5 rounded-3xl border border-slate-100 bg-slate-50">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Openings
                </p>
                <p className="text-slate-900 font-black mt-2 flex items-center gap-2">
                  <BadgeCheck size={18} className="text-blue-600" />
                  {job.openings ?? 0}
                </p>
              </div>

              <div className="p-5 rounded-3xl border border-slate-100 bg-slate-50">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Applicants
                </p>
                <p className="text-slate-900 font-black mt-2 flex items-center gap-2">
                  <Users size={18} className="text-blue-600" />
                  {job.applicants ?? 0}
                </p>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xl shadow-blue-900/5">
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <FileText size={20} className="text-blue-600" />
                  Job Description
                </h2>
                <p className="mt-4 text-slate-600 leading-relaxed font-medium">
                  {job.description}
                </p>
              </div>

              <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xl shadow-blue-900/5">
                <h2 className="text-lg font-black text-slate-900">
                  Responsibilities
                </h2>
                <ul className="mt-4 space-y-3">
                  {(job.responsibilities || []).map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-slate-600 font-medium"
                    >
                      <span className="mt-1 w-2.5 h-2.5 rounded-full bg-blue-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xl shadow-blue-900/5">
                <h2 className="text-lg font-black text-slate-900">
                  Requirements
                </h2>
                <ul className="mt-4 space-y-3">
                  {(job.requirements || []).map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-slate-600 font-medium"
                    >
                      <span className="mt-1 w-2.5 h-2.5 rounded-full bg-emerald-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xl shadow-blue-900/5">
                <h2 className="text-lg font-black text-slate-900">
                  Skills Needed
                </h2>

                <div className="mt-4 flex flex-wrap gap-2">
                  {(job.skills || []).map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-bold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sticky Apply */}
              <div className="bg-blue-600 text-white rounded-3xl p-6 shadow-xl shadow-blue-300/30">
                <h3 className="text-lg font-black">Ready to apply?</h3>
                <p className="text-white/90 mt-2 font-medium">
                  Upload resume + cover letter and apply instantly.
                </p>

                <button
                  onClick={() => setOpenApplyModal(true)}
                  className="mt-5 w-full bg-white text-blue-700 py-3 rounded-2xl font-black hover:bg-blue-50 transition-all"
                >
                  Apply Now
                </button>

                <button
                  onClick={toggleSaveJob}
                  disabled={bookmarkLoading}
                  className={`mt-3 w-full py-3 rounded-2xl font-black transition-all border
                    ${
                      isSaved
                        ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                        : "bg-transparent border-white/30 text-white hover:bg-white/10"
                    } ${
                    bookmarkLoading ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                >
                  {isSaved ? "Saved ✅" : "Save Job"}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* ✅ Apply modal */}
      <ApplyJobModal
        open={openApplyModal}
        onClose={() => setOpenApplyModal(false)}
        job={job}
        onSuccess={() => setHasApplied(true)}
      />
    </div>
  );
};

export default JobDetailsPage;
