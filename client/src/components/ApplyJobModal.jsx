import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  UploadCloud,
  FileText,
  Sparkles,
  Send,
  Loader2,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import { useApplicant } from "../context/ApplicantContext"; // ✅ import

const ApplyJobModal = ({ open, onClose, job }) => {
  const { applyForJob, loading } = useApplicant(); // ✅ context

  const [resumeFile, setResumeFile] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  // ✅ success animation state
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!open) return;
    setResumeFile(null);
    setCoverLetter("");
    setAiLoading(false);
    setSuccess(false);
  }, [open]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const jobTitle = job?.title || "Job Role";
  const companyName = job?.employer?.companyName || "Company";

  const resumeLabel = useMemo(() => {
    if (!resumeFile) return "Upload Resume (PDF)";
    return resumeFile.name;
  }, [resumeFile]);

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload PDF resume only ✅");
      return;
    }

    const maxSize = 5 * 1024 * 1024; // ✅ 5MB
    if (file.size > maxSize) {
      alert("Resume file too large (Max 5MB) ❌");
      return;
    }

    setResumeFile(file);
  };

  // ✅ Demo AI generator
  const handleGenerateAI = async () => {
    setAiLoading(true);

    await new Promise((r) => setTimeout(r, 1000));

    const aiText = `Dear Hiring Manager,

I am excited to apply for the ${jobTitle} position at ${companyName}.
I have strong skills in React, JavaScript and modern UI development.

Sincerely,
[Your Name]`;

    setCoverLetter(aiText);
    setAiLoading(false);
  };

  // ✅ Submit Application (REAL API CALL)
  const handleSubmitApplication = async () => {
    if (!job?._id) {
      alert("Invalid job id ❌");
      return;
    }

    if (!resumeFile) {
      alert("Please upload your resume first ✅");
      return;
    }

    if (!coverLetter.trim()) {
      alert("Please write cover letter or generate using AI ✅");
      return;
    }

    try {
      await applyForJob({
        jobId: job._id,
        coverLetter,
        resumeFile,
      });

      // ✅ show success animation
      setSuccess(true);

      // ✅ auto close modal
      setTimeout(() => {
        onClose?.();
      }, 1600);
    } catch (error) {
      // toast already handled in context
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-[200] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[210] flex items-center justify-center px-4 py-8"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="w-full max-w-2xl bg-white border border-slate-100 rounded-3xl shadow-2xl shadow-blue-900/15 overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ✅ Success Screen */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    className="absolute inset-0 z-20 bg-white flex items-center justify-center p-8"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="text-center max-w-md">
                      <div className="mx-auto w-20 h-20 rounded-3xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                        <CheckCircle2 size={38} className="text-emerald-600" />
                      </div>

                      <h3 className="mt-5 text-2xl font-black text-slate-900">
                        Applied Successfully ✅
                      </h3>
                      <p className="mt-2 text-slate-500 font-medium">
                        Your resume & cover letter were submitted.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Header */}
              <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-900">
                    Apply for Job
                  </h2>
                  <p className="text-sm text-slate-500 font-bold mt-1">
                    {jobTitle} • {companyName}
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-slate-50 transition-all text-slate-500"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6">
                {/* Resume */}
                <div>
                  <label className="text-sm font-bold text-slate-700">
                    Resume (PDF)
                  </label>

                  <div className="mt-2 rounded-3xl border-2 border-dashed border-slate-300 bg-blue-50 p-6 hover:border-blue-500 transition-all">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                        <FileText className="text-blue-600" size={26} />
                      </div>

                      <div className="flex-1">
                        <p className="text-slate-900 font-black">
                          {resumeFile
                            ? "Resume selected ✅"
                            : "Upload your resume"}
                        </p>
                        <p className="text-sm text-slate-500 font-medium mt-1 truncate">
                          {resumeLabel}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <label className="cursor-pointer inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all">
                          <UploadCloud size={18} />
                          Choose
                          <input
                            type="file"
                            accept="application/pdf"
                            className="hidden"
                            onChange={handleResumeChange}
                          />
                        </label>

                        {resumeFile && (
                          <button
                            type="button"
                            onClick={() => setResumeFile(null)}
                            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-bold border border-slate-200 bg-white hover:bg-slate-50 transition-all text-red-500"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cover Letter */}
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <label className="text-sm font-bold text-slate-700">
                      Cover Letter
                    </label>

                    <button
                      type="button"
                      onClick={handleGenerateAI}
                      disabled={aiLoading}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl font-bold transition-all
                        ${
                          aiLoading
                            ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                            : "bg-slate-900 text-white hover:bg-slate-800"
                        }`}
                    >
                      {aiLoading ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles size={18} />
                          Generate with AI
                        </>
                      )}
                    </button>
                  </div>

                  <textarea
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="Write a short cover letter..."
                    className="mt-2 w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none font-medium focus:ring-2 focus:ring-blue-500 min-h-[160px]"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3 justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSubmitApplication}
                  disabled={loading}
                  className={`px-6 py-3 rounded-2xl font-bold transition-all shadow-lg flex items-center justify-center gap-2
                    ${
                      loading
                        ? "bg-blue-300 text-white cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200"
                    }`}
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Submit Application
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ApplyJobModal;
