import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Zap,
  Briefcase,
  MapPin,
  IndianRupee,
  BadgeCheck,
  Users,
  FileText,
  ClipboardList,
  CheckSquare,
  ArrowRight,
  Loader2,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { useJobs } from "../../context/JobContext";

const PostJob = () => {
  const { createJob, loading } = useJobs();

  const [form, setForm] = useState({
    title: "",
    description: "",
    requirements: "",
    responsibilities: "",
    skills: "", // ✅ comma separated string
    jobType: "Full-Time",
    location: "",
    salary: "",
    experience: "",
    openings: "",
    isActive: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: form.title,
      description: form.description,

      // ✅ send as string (backend will split into array)
      skills: form.skills,
      requirements: form.requirements,
      responsibilities: form.responsibilities,

      jobType: form.jobType,
      location: form.location,
      salary: form.salary,
      experience: form.experience,
      openings: Number(form.openings),
      isActive: form.isActive,
    };

    await createJob(payload);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden relative">
      {/* ✅ Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl" />
      </div>

      {/* ✅ Header */}
      <header className="w-full px-4 pt-10 pb-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg shadow-sm">
              <Brain size={24} className="text-white" />
            </div>
            <span className="text-2xl font-black tracking-tight">HireMind</span>
          </div>

          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-bold">
            <Zap size={16} />
            Post a Job
          </div>
        </div>
      </header>

      {/* ✅ Form */}
      <main className="px-4 pb-20 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto bg-white border border-slate-100 rounded-3xl p-6 md:p-10 shadow-2xl shadow-blue-900/10"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-black leading-tight">
              Post a <span className="text-blue-600">New Job</span>
            </h1>
            <p className="text-slate-500 mt-3 max-w-2xl mx-auto">
              Create a job post and start receiving applicants instantly.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* ✅ Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="text-sm font-bold text-slate-700">
                  Job Title
                </label>
                <div className="mt-2 flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
                  <Briefcase size={18} className="text-blue-600" />
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g. Frontend Developer (React)"
                    className="w-full bg-transparent outline-none font-medium"
                    required
                  />
                </div>
              </div>

              {/* Job Type */}
              <div>
                <label className="text-sm font-bold text-slate-700">
                  Job Type
                </label>
                <div className="mt-2 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
                  <select
                    name="jobType"
                    value={form.jobType}
                    onChange={handleChange}
                    className="w-full bg-transparent outline-none font-medium"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="text-sm font-bold text-slate-700">
                  Location
                </label>
                <div className="mt-2 flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
                  <MapPin size={18} className="text-blue-600" />
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Delhi / Remote"
                    className="w-full bg-transparent outline-none font-medium"
                    required
                  />
                </div>
              </div>

              {/* Salary */}
              <div>
                <label className="text-sm font-bold text-slate-700">
                  Salary
                </label>
                <div className="mt-2 flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
                  <IndianRupee size={18} className="text-blue-600" />
                  <input
                    type="text"
                    name="salary"
                    value={form.salary}
                    onChange={handleChange}
                    placeholder="e.g. ₹6 LPA - ₹10 LPA"
                    className="w-full bg-transparent outline-none font-medium"
                    required
                  />
                </div>
              </div>

              {/* Experience */}
              <div>
                <label className="text-sm font-bold text-slate-700">
                  Experience
                </label>
                <div className="mt-2 flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
                  <BadgeCheck size={18} className="text-blue-600" />
                  <input
                    type="text"
                    name="experience"
                    value={form.experience}
                    onChange={handleChange}
                    placeholder="e.g. 0 - 2 Years"
                    className="w-full bg-transparent outline-none font-medium"
                    required
                  />
                </div>
              </div>

              {/* Openings */}
              <div>
                <label className="text-sm font-bold text-slate-700">
                  Openings
                </label>
                <div className="mt-2 flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
                  <Users size={18} className="text-blue-600" />
                  <input
                    type="number"
                    name="openings"
                    value={form.openings}
                    onChange={handleChange}
                    placeholder="e.g. 3"
                    className="w-full bg-transparent outline-none font-medium"
                    min={1}
                    required
                  />
                </div>
              </div>

              {/* isActive Toggle */}
              <div className="md:col-span-2">
                <label className="text-sm font-bold text-slate-700">
                  Job Status
                </label>

                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({ ...prev, isActive: !prev.isActive }))
                  }
                  className={`mt-2 w-full flex items-center justify-between px-5 py-3 rounded-2xl border transition-all
                    ${
                      form.isActive
                        ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                        : "bg-slate-50 border-slate-200 text-slate-600"
                    }`}
                >
                  <span className="font-bold">
                    {form.isActive
                      ? "Active ✅ (Visible to jobseekers)"
                      : "Inactive ❌ (Hidden)"}
                  </span>

                  {form.isActive ? (
                    <ToggleRight size={26} />
                  ) : (
                    <ToggleLeft size={26} />
                  )}
                </button>
              </div>
            </div>

            {/* ✅ Skills (Comma separated) */}
            <div>
              <label className="text-sm font-bold text-slate-700">
                Skills (Comma Separated)
              </label>
              <div className="mt-2 flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
                <CheckSquare size={18} className="text-blue-600 mt-1" />
                <textarea
                  name="skills"
                  value={form.skills}
                  onChange={handleChange}
                  placeholder="Enter comma separated skills e.g. React, Node.js, MongoDB"
                  className="w-full bg-transparent outline-none font-medium min-h-[90px] resize-none"
                  required
                />
              </div>
            </div>

            {/* ✅ Description */}
            <div>
              <label className="text-sm font-bold text-slate-700">
                Job Description
              </label>
              <div className="mt-2 flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
                <FileText size={18} className="text-blue-600 mt-1" />
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Write a detailed job description..."
                  className="w-full bg-transparent outline-none font-medium min-h-[140px] resize-none"
                  required
                />
              </div>
            </div>

            {/* ✅ Responsibilities */}
            <div>
              <label className="text-sm font-bold text-slate-700">
                Responsibilities (Comma Separated)
              </label>
              <div className="mt-2 flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
                <ClipboardList size={18} className="text-blue-600 mt-1" />
                <textarea
                  name="responsibilities"
                  value={form.responsibilities}
                  onChange={handleChange}
                  placeholder="Enter comma separated responsibilities e.g. Build UI, Integrate APIs, Fix bugs"
                  className="w-full bg-transparent outline-none font-medium min-h-[140px] resize-none"
                  required
                />
              </div>
            </div>

            {/* ✅ Requirements */}
            <div>
              <label className="text-sm font-bold text-slate-700">
                Requirements (Comma Separated)
              </label>
              <div className="mt-2 flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
                <CheckSquare size={18} className="text-blue-600 mt-1" />
                <textarea
                  name="requirements"
                  value={form.requirements}
                  onChange={handleChange}
                  placeholder="Enter comma separated requirements e.g. React experience, Git knowledge, REST APIs"
                  className="w-full bg-transparent outline-none font-medium min-h-[140px] resize-none"
                  required
                />
              </div>
            </div>

            {/* ✅ Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Posting Job...
                </>
              ) : (
                <>
                  Post Job <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default PostJob;
