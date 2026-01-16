import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Brain,
  Zap,
  User,
  Download,
  BadgeCheck,
  Eye,
  XCircle,
  CheckCircle2,
  Clock3,
  Loader2,
  Briefcase,
  FileText,
} from "lucide-react";

import { useApplicant } from "../../context/ApplicantContext";

const ViewApplicants = () => {
  const {
    loading,
    applicants,
    getApplicantsForEmployer,
    updateApplicantStatus,
  } = useApplicant();

  // ✅ Modal State
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getApplicantsForEmployer();
  }, []);

  const openModal = (app) => {
    setSelectedApplicant(app);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedApplicant(null);
    setIsModalOpen(false);
  };

  // ✅ "2 days ago" like format
  const timeAgo = (dateValue) => {
    if (!dateValue) return "";

    const date = new Date(dateValue);
    if (isNaN(date.getTime())) return "";

    const diffMs = Date.now() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return "Applied today";
    if (diffDays === 1) return "Applied yesterday";
    return `Applied ${diffDays} days ago`;
  };

  const statusBadge = (status) => {
    const base =
      "px-4 py-2 rounded-full text-sm font-bold border inline-flex items-center gap-2";

    if (status === "Applied") {
      return (
        <span
          className={`${base} bg-yellow-50 border-yellow-100 text-yellow-700`}
        >
          <Eye size={16} />
          Applied
        </span>
      );
    }

    if (status === "Shortlisted") {
      return (
        <span className={`${base} bg-blue-50 border-blue-100 text-blue-700`}>
          <BadgeCheck size={16} />
          Shortlisted
        </span>
      );
    }

    if (status === "Rejected") {
      return (
        <span className={`${base} bg-red-50 border-red-100 text-red-700`}>
          <XCircle size={16} />
          Rejected
        </span>
      );
    }

    if (status === "Hired") {
      return (
        <span
          className={`${base} bg-emerald-50 border-emerald-100 text-emerald-700`}
        >
          <CheckCircle2 size={16} />
          Selected
        </span>
      );
    }

    return (
      <span className={`${base} bg-slate-50 border-slate-200 text-slate-700`}>
        {status || "Applied"}
      </span>
    );
  };

  const handleStatusChange = async (applicationId, status) => {
    await updateApplicantStatus({ applicationId, status });
  };

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
            Applicants
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 pb-20 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto space-y-8"
        >
          {/* Title */}
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-black leading-tight">
              View <span className="text-blue-600">Applicants</span>
            </h1>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              Review candidates, open resumes and update statuses.
            </p>
          </div>

          {/* ✅ Loading */}
          {loading && (
            <div className="flex justify-center items-center gap-2 py-6 text-slate-600 font-bold">
              <Loader2 className="animate-spin" size={18} />
              Loading applicants...
            </div>
          )}

          {/* ✅ Empty */}
          {!loading && applicants.length === 0 && (
            <div className="text-center bg-white border border-slate-100 rounded-3xl p-10 shadow-xl shadow-blue-900/5">
              <p className="text-slate-700 font-black text-lg">
                No applicants yet 😅
              </p>
              <p className="text-slate-500 mt-2">
                Once jobseekers apply, you will see them here.
              </p>
            </div>
          )}

          {/* Applicants list */}
          {!loading && applicants.length > 0 && (
            <div className="space-y-4">
              {applicants.map((app) => {
                const jobTitle = app?.job?.title || "Job";

                const jobSeekerName =
                  app?.jobSeeker?.user?.name || app?.jobSeeker?.name || "User";

                const resumeUrl = app?.resume?.url || "";
                const appliedTime = timeAgo(app?.createdAt);
                const status = app?.status || "Applied";

                const jobSeekerId = app?.jobSeeker?._id || app?.jobSeeker?.id;

                return (
                  <div
                    key={app._id}
                    className="bg-white border border-slate-100 rounded-3xl p-5 md:p-6 shadow-xl shadow-blue-900/5 hover:shadow-2xl transition-all"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                      {/* Left */}
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 shrink-0">
                          <User size={22} />
                        </div>

                        <div>
                          {/* ✅ Clickable Name -> JobSeeker Public Profile */}
                          <Link
                            to={
                              jobSeekerId
                                ? `/jobseeker/public/${jobSeekerId}`
                                : "#"
                            }
                            className={`text-lg md:text-xl font-black text-slate-900 hover:text-blue-600 transition
                              ${
                                !jobSeekerId
                                  ? "pointer-events-none opacity-60"
                                  : ""
                              }`}
                          >
                            {jobSeekerName}
                          </Link>

                          <div className="flex flex-wrap gap-2 mt-3">
                            {/* ✅ Job Title */}
                            <span className="px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold flex items-center gap-2">
                              <Briefcase size={16} className="text-blue-600" />
                              {jobTitle}
                            </span>

                            {/* ✅ Applied time */}
                            <span className="px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-500 text-sm font-bold flex items-center gap-2">
                              <Clock3 size={16} className="text-blue-600" />
                              {appliedTime || "Applied"}
                            </span>

                            {/* ✅ Status */}
                            {statusBadge(status)}
                          </div>
                        </div>
                      </div>

                      {/* Right */}
                      <div className="flex flex-col sm:flex-row gap-3 justify-end">
                        {/* ✅ Resume */}
                        <a
                          href={resumeUrl || "#"}
                          target="_blank"
                          rel="noreferrer"
                          className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-bold transition-all
                            ${
                              resumeUrl
                                ? "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                                : "bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed pointer-events-none"
                            }`}
                        >
                          <Download size={18} className="text-blue-600" />
                          Resume
                        </a>

                        {/* ✅ Status Dropdown */}
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3">
                          <select
                            value={status}
                            onChange={(e) =>
                              handleStatusChange(app._id, e.target.value)
                            }
                            className="bg-transparent outline-none font-bold text-slate-700"
                          >
                            <option>Applied</option>
                            <option>Shortlisted</option>
                            <option>Rejected</option>
                            <option>Hired</option>
                          </select>
                        </div>

                        {/* ✅ View -> Open Modal (Cover Letter) */}
                        <button
                          onClick={() => openModal(app)}
                          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-bold transition-all shadow-lg
                            bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200"
                        >
                          <FileText size={18} />
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </main>

      {/* ✅ Cover Letter Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div onClick={closeModal} className="absolute inset-0 bg-black/40" />

          {/* Modal */}
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-black text-slate-900">
                  Cover Letter
                </h2>

                <p className="text-slate-500 mt-1 font-semibold">
                  {selectedApplicant?.jobSeeker?.user?.name ||
                    selectedApplicant?.jobSeeker?.name ||
                    "Applicant"}
                </p>
              </div>

              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 font-bold text-slate-700"
              >
                Close
              </button>
            </div>

            <div className="mt-5 bg-slate-50 border border-slate-200 rounded-2xl p-4 max-h-[60vh] overflow-y-auto">
              <p className="text-slate-700 font-medium whitespace-pre-line">
                {selectedApplicant?.coverLetter || "No cover letter provided."}
              </p>
            </div>

            {/* ✅ Resume Button in Modal */}
            <div className="mt-5 flex justify-end">
              <a
                href={selectedApplicant?.resume?.url || "#"}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-bold transition-all
                  ${
                    selectedApplicant?.resume?.url
                      ? "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                      : "bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed pointer-events-none"
                  }`}
              >
                <Download size={18} className="text-blue-600" />
                Resume
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewApplicants;
