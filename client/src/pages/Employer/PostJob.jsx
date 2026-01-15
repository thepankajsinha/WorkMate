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
  Plus,
  X,
  Loader2,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

const PostJob = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    requirements: "",
    responsibilities: "",
    jobType: "Full-Time",
    location: "",
    salary: "",
    experience: "",
    openings: "",
    isActive: true,
  });

  // ✅ Skills
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([]);

  // ✅ Submit states
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addSkill = () => {
    const val = skillInput.trim().toLowerCase();
    if (!val) return;

    if (skills.includes(val)) {
      setSkillInput("");
      return;
    }

    setSkills((prev) => [...prev, val]);
    setSkillInput("");
  };

  const removeSkill = (skill) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const resetMessages = () => {
    setSuccessMsg("");
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetMessages();

    try {
      setLoading(true);

      // ✅ Payload (match your Job schema)
      const payload = {
        title: form.title,
        description: form.description,
        requirements: form.requirements,
        responsibilities: form.responsibilities,
        skills,
        jobType: form.jobType,
        location: form.location,
        salary: form.salary,
        experience: form.experience,
        openings: form.openings ? Number(form.openings) : 1,
        isActive: form.isActive,
        postedOn: new Date(),
      };

      console.log("✅ POST JOB PAYLOAD:", payload);

      // ✅ Later you will call backend api here
      await new Promise((r) => setTimeout(r, 900));

      setSuccessMsg("Job posted successfully ✅");
    } catch (err) {
      setErrorMsg("Job post failed ❌");
    } finally {
      setLoading(false);
    }
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
          {/* Title */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-black leading-tight">
              Post a <span className="text-blue-600">New Job</span>
            </h1>
            <p className="text-slate-500 mt-3 max-w-2xl mx-auto">
              Create a job post and start receiving applicants instantly.
            </p>
          </div>

          {/* Messages */}
          {successMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold">
              ✅ {successMsg}
            </div>
          )}
          {errorMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 font-bold">
              ❌ {errorMsg}
            </div>
          )}

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

            {/* ✅ Skills */}
            <div>
              <label className="text-sm font-bold text-slate-700">
                Skills (Add Multiple)
              </label>

              <div className="mt-2 flex flex-col md:flex-row gap-3">
                <div className="flex-1 flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
                  <Plus size={18} className="text-blue-600" />
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleSkillKeyDown}
                    placeholder="e.g. React, Node.js, MongoDB"
                    className="w-full bg-transparent outline-none font-medium"
                  />
                </div>

                <button
                  type="button"
                  onClick={addSkill}
                  className="px-6 py-3 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all"
                >
                  Add Skill
                </button>
              </div>

              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-bold"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="hover:text-red-500 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
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
                Responsibilities
              </label>
              <div className="mt-2 flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
                <ClipboardList size={18} className="text-blue-600 mt-1" />
                <textarea
                  name="responsibilities"
                  value={form.responsibilities}
                  onChange={handleChange}
                  placeholder="Write responsibilities (example: build UI, integrate APIs...)"
                  className="w-full bg-transparent outline-none font-medium min-h-[140px] resize-none"
                  required
                />
              </div>
            </div>

            {/* ✅ Requirements */}
            <div>
              <label className="text-sm font-bold text-slate-700">
                Requirements
              </label>
              <div className="mt-2 flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
                <CheckSquare size={18} className="text-blue-600 mt-1" />
                <textarea
                  name="requirements"
                  value={form.requirements}
                  onChange={handleChange}
                  placeholder="Write requirements (example: React, Git, APIs...)"
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
