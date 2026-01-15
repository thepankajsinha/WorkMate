import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Zap,
  User,
  Mail,
  MapPin,
  FileText,
  Download,
  BadgeCheck,
  Eye,
  XCircle,
  CheckCircle2,
  Clock3,
} from "lucide-react";

const ViewApplicants = () => {
  // ✅ Dummy Applicants
  const [applicants, setApplicants] = useState([
    {
      id: "app_1",
      name: "Pankaj Sinha",
      email: "pankaj@gmail.com",
      location: "Delhi",
      appliedAt: "2026-01-13",
      status: "Under Review",
      resumeUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      id: "app_2",
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      location: "Noida",
      appliedAt: "2026-01-12",
      status: "Shortlisted",
      resumeUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      id: "app_3",
      name: "Aman Verma",
      email: "aman@gmail.com",
      location: "Bangalore",
      appliedAt: "2026-01-11",
      status: "Rejected",
      resumeUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  ]);

  const updateStatus = (id, status) => {
    setApplicants((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  };

  const statusBadge = (status) => {
    const base =
      "px-4 py-2 rounded-full text-sm font-bold border inline-flex items-center gap-2";

    if (status === "Under Review") {
      return (
        <span
          className={`${base} bg-yellow-50 border-yellow-100 text-yellow-700`}
        >
          <Eye size={16} />
          Under Review
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

    if (status === "Selected") {
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
        {status}
      </span>
    );
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
              Review candidates, download resumes and update statuses.
            </p>
          </div>

          {/* Applicants list */}
          <div className="space-y-4">
            {applicants.map((app) => (
              <div
                key={app.id}
                className="bg-white border border-slate-100 rounded-3xl p-5 md:p-6 shadow-xl shadow-blue-900/5 hover:shadow-2xl transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                  {/* Left */}
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700">
                      <User size={22} />
                    </div>

                    <div>
                      <h3 className="text-lg md:text-xl font-black text-slate-900">
                        {app.name}
                      </h3>

                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold flex items-center gap-2">
                          <Mail size={16} className="text-blue-600" />
                          {app.email}
                        </span>

                        <span className="px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold flex items-center gap-2">
                          <MapPin size={16} className="text-blue-600" />
                          {app.location}
                        </span>

                        <span className="px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-500 text-sm font-bold flex items-center gap-2">
                          <Clock3 size={16} className="text-blue-600" />
                          {app.appliedAt}
                        </span>

                        {/* Status badge */}
                        {statusBadge(app.status)}
                      </div>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-end">
                    {/* Download Resume */}
                    <a
                      href={app.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all"
                    >
                      <Download size={18} className="text-blue-600" />
                      Resume
                    </a>

                    {/* Status Dropdown */}
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3">
                      <select
                        value={app.status}
                        onChange={(e) => updateStatus(app.id, e.target.value)}
                        className="bg-transparent outline-none font-bold text-slate-700"
                      >
                        <option>Under Review</option>
                        <option>Shortlisted</option>
                        <option>Rejected</option>
                        <option>Selected</option>
                      </select>
                    </div>

                    {/* View Profile (dummy) */}
                    <button className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                      <FileText size={18} />
                      View
                    </button>
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

export default ViewApplicants;
