import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
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
} from "lucide-react";

import ApplyJobModal from "../../components/ApplyJobModal";

const JobDetailsPage = () => {
  const [openApplyModal, setOpenApplyModal] = useState(false);

  // ✅ Save Toggle
  const [isSaved, setIsSaved] = useState(false);

  // ✅ Dummy Job Data
  const job = {
    _id: "job_123",
    id: "job_123",
    title: "Frontend Developer (React)",
    companyName: "HireMind Technologies",
    companyLogo:
      "https://ui-avatars.com/api/?name=HireMind&background=0148D6&color=fff",
    location: "Delhi / Remote",
    jobType: "Full-time",
    experience: "0 - 2 Years",
    salary: "₹6 LPA - ₹10 LPA",
    postedOn: "2026-01-12",
    openings: 3,
    applicants: 120,
    description:
      "We are looking for a passionate Frontend Developer to build modern web applications with React and TailwindCSS. You’ll work with product designers and backend engineers to ship features fast.",
    responsibilities: [
      "Develop responsive UI using React + TailwindCSS",
      "Integrate REST APIs and handle state management",
      "Write clean, reusable, maintainable components",
      "Collaborate with backend team and UI/UX designer",
      "Optimize performance and improve user experience",
    ],
    requirements: [
      "Strong understanding of HTML, CSS, JavaScript",
      "Good hands-on practice with React",
      "Basic knowledge of Git and GitHub",
      "Understanding of REST APIs",
      "Nice to have: Next.js, Redux, TypeScript",
    ],
    skills: ["React", "JavaScript", "TailwindCSS", "API", "Git"],
  };

  const toggleSaveJob = () => {
    setIsSaved((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-slate-900 overflow-x-hidden relative">
      {/* ✅ Blue Glow Background */}
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
            Job Details
          </div>
        </div>
      </header>

      {/* ✅ Content */}
      <main className="px-4 pb-20 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto space-y-6"
        >
          {/* Back Button */}
          <div>
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all"
            >
              <ArrowLeft size={18} />
              Back to Jobs
            </Link>
          </div>

          {/* ✅ Top Job Card */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-10 shadow-2xl shadow-blue-900/10">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              {/* Left */}
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                  <img
                    src={job.companyLogo}
                    alt="logo"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
                    {job.title}
                  </h1>

                  <p className="text-slate-700 font-bold mt-2 flex items-center gap-2">
                    <Building2 size={18} className="text-blue-600" />
                    {job.companyName}
                  </p>

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

                  {/* ✅ Saved feedback */}
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
                {/* Apply */}
                <button
                  onClick={() => setOpenApplyModal(true)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                >
                  <Send size={18} />
                  Apply Now
                </button>

                {/* ✅ Save toggle */}
                <button
                  onClick={toggleSaveJob}
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all border
                    ${
                      isSaved
                        ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                >
                  {isSaved ? (
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

            {/* Job meta */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-3xl border border-slate-100 bg-slate-50">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Posted On
                </p>
                <p className="text-slate-900 font-black mt-2 flex items-center gap-2">
                  <CalendarDays size={18} className="text-blue-600" />
                  {job.postedOn}
                </p>
              </div>

              <div className="p-5 rounded-3xl border border-slate-100 bg-slate-50">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Openings
                </p>
                <p className="text-slate-900 font-black mt-2 flex items-center gap-2">
                  <BadgeCheck size={18} className="text-blue-600" />
                  {job.openings}
                </p>
              </div>

              <div className="p-5 rounded-3xl border border-slate-100 bg-slate-50">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Applicants
                </p>
                <p className="text-slate-900 font-black mt-2 flex items-center gap-2">
                  <Users size={18} className="text-blue-600" />
                  {job.applicants}
                </p>
              </div>

              <div className="p-5 rounded-3xl border border-slate-100 bg-slate-50">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Job ID
                </p>
                <p className="text-slate-900 font-black mt-2">{job.id}</p>
              </div>
            </div>
          </div>

          {/* ✅ Main Section Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xl shadow-blue-900/5">
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <FileText size={20} className="text-blue-600" />
                  Job Description
                </h2>
                <p className="mt-4 text-slate-600 leading-relaxed font-medium">
                  {job.description}
                </p>
              </div>

              {/* Responsibilities */}
              <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xl shadow-blue-900/5">
                <h2 className="text-lg font-black text-slate-900">
                  Responsibilities
                </h2>

                <ul className="mt-4 space-y-3">
                  {job.responsibilities.map((item, idx) => (
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

              {/* Requirements */}
              <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xl shadow-blue-900/5">
                <h2 className="text-lg font-black text-slate-900">
                  Requirements
                </h2>

                <ul className="mt-4 space-y-3">
                  {job.requirements.map((item, idx) => (
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

            {/* Right side */}
            <div className="space-y-6">
              {/* Skills */}
              <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xl shadow-blue-900/5">
                <h2 className="text-lg font-black text-slate-900">
                  Skills Needed
                </h2>

                <div className="mt-4 flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
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

                {/* ✅ Save toggle inside sticky */}
                <button
                  onClick={toggleSaveJob}
                  className={`mt-3 w-full py-3 rounded-2xl font-black transition-all border
                    ${
                      isSaved
                        ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                        : "bg-transparent border-white/30 text-white hover:bg-white/10"
                    }`}
                >
                  {isSaved ? "Saved ✅" : "Save Job"}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* ✅ APPLY MODAL */}
      <ApplyJobModal
        open={openApplyModal}
        onClose={() => setOpenApplyModal(false)}
        job={job}
      />
    </div>
  );
};

export default JobDetailsPage;
