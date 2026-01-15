import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Zap,
  MapPin,
  IndianRupee,
  Clock3,
  Users,
  Pencil,
  Trash2,
  Eye,
  ToggleLeft,
  ToggleRight,
  X,
  CheckCircle2,
  AlertTriangle,
  Briefcase,
  Save,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";

const ManageJobs = () => {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // ✅ Dummy posted jobs (added companyLogo)
  const [jobs, setJobs] = useState([
    {
      id: "job_1",
      title: "Frontend Developer (React)",
      companyName: "HireMind Technologies",
      companyLogo:
        "https://ui-avatars.com/api/?name=HireMind&background=0148D6&color=fff",
      location: "Remote",
      jobType: "Full-Time",
      experience: "0 - 2 Years",
      salary: "₹6 LPA - ₹10 LPA",
      openings: 3,
      applicants: 12,
      isActive: true,
      postedOn: "2026-01-12",
    },
    {
      id: "job_2",
      title: "Backend Developer (Node.js)",
      companyName: "HireMind Technologies",
      companyLogo:
        "https://ui-avatars.com/api/?name=HireMind&background=0148D6&color=fff",
      location: "Delhi",
      jobType: "Full-Time",
      experience: "1 - 3 Years",
      salary: "₹8 LPA - ₹14 LPA",
      openings: 2,
      applicants: 6,
      isActive: false,
      postedOn: "2026-01-10",
    },
    {
      id: "job_3",
      title: "UI/UX Designer",
      companyName: "HireMind Technologies",
      companyLogo:
        "https://ui-avatars.com/api/?name=HireMind&background=0148D6&color=fff",
      location: "Remote",
      jobType: "Internship",
      experience: "Fresher",
      salary: "₹25k / month",
      openings: 1,
      applicants: 20,
      isActive: true,
      postedOn: "2026-01-08",
    },
  ]);

  // ✅ Delete confirmation modal
  const [confirmDelete, setConfirmDelete] = useState({
    open: false,
    jobId: null,
    jobTitle: "",
  });

  // ✅ Edit modal state
  const [editModal, setEditModal] = useState({
    open: false,
    jobId: null,
  });

  const [editForm, setEditForm] = useState({
    title: "",
    jobType: "Full-Time",
    location: "",
    salary: "",
    experience: "",
    openings: 1,
    isActive: true,
  });

  const [savingEdit, setSavingEdit] = useState(false);

  const resetMessages = () => {
    setSuccessMsg("");
    setErrorMsg("");
  };

  const toggleActive = (jobId) => {
    resetMessages();

    const job = jobs.find((j) => j.id === jobId);

    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, isActive: !j.isActive } : j))
    );

    setSuccessMsg(job?.isActive ? "Job deactivated ✅" : "Job activated ✅");
  };

  // ✅ Delete Modal
  const openDeleteModal = (job) => {
    setConfirmDelete({
      open: true,
      jobId: job.id,
      jobTitle: job.title,
    });
  };

  const closeDeleteModal = () => {
    setConfirmDelete({
      open: false,
      jobId: null,
      jobTitle: "",
    });
  };

  const handleDelete = () => {
    resetMessages();
    setJobs((prev) => prev.filter((job) => job.id !== confirmDelete.jobId));
    setSuccessMsg("Job deleted successfully ✅");
    closeDeleteModal();
  };

  // ✅ Edit Modal open
  const openEditModal = (job) => {
    resetMessages();

    setEditForm({
      title: job.title || "",
      jobType: job.jobType || "Full-Time",
      location: job.location || "",
      salary: job.salary || "",
      experience: job.experience || "",
      openings: job.openings || 1,
      isActive: job.isActive ?? true,
    });

    setEditModal({
      open: true,
      jobId: job.id,
    });
  };

  const closeEditModal = () => {
    setEditModal({
      open: false,
      jobId: null,
    });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const saveEdit = async () => {
    resetMessages();

    try {
      setSavingEdit(true);

      // ✅ UI Update (no backend now)
      setJobs((prev) =>
        prev.map((job) =>
          job.id === editModal.jobId
            ? {
                ...job,
                title: editForm.title,
                jobType: editForm.jobType,
                location: editForm.location,
                salary: editForm.salary,
                experience: editForm.experience,
                openings: Number(editForm.openings) || 1,
                isActive: editForm.isActive,
              }
            : job
        )
      );

      // ✅ Fake delay
      await new Promise((r) => setTimeout(r, 600));

      setSuccessMsg("Job updated successfully ✅");
      closeEditModal();
    } catch (err) {
      setErrorMsg("Job update failed ❌");
    } finally {
      setSavingEdit(false);
    }
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
            Manage Jobs
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
              Manage <span className="text-blue-600">Your Jobs</span>
            </h1>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              Edit, activate/deactivate, delete jobs and view applicants.
            </p>
          </div>

          {/* Messages */}
          {successMsg && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center gap-2 font-bold">
              <CheckCircle2 size={18} />
              {successMsg}
            </div>
          )}

          {errorMsg && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 flex items-center gap-2 font-bold">
              <AlertTriangle size={18} />
              {errorMsg}
            </div>
          )}

          {/* Jobs List */}
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white border border-slate-100 rounded-3xl p-5 md:p-6 shadow-xl shadow-blue-900/5 hover:shadow-2xl transition-all"
              >
                {/* ✅ Top line (Logo + Details) */}
                <div className="flex items-start gap-4">
                  {/* Company Logo */}
                  <div className="w-14 h-14 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden flex items-center justify-center shrink-0">
                    <img
                      src={job.companyLogo}
                      alt="company-logo"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="w-full">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                      <div>
                        <h3 className="text-lg md:text-xl font-black text-slate-900">
                          {job.title}
                        </h3>
                        <p className="text-slate-500 font-bold mt-1 flex items-center gap-2">
                          <Briefcase size={16} className="text-blue-600" />
                          {job.companyName}
                        </p>
                      </div>

                      {/* Status */}
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-bold border w-fit
                          ${
                            job.isActive
                              ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                              : "bg-red-50 border-red-100 text-red-700"
                          }`}
                      >
                        {job.isActive ? "Active ✅" : "Inactive ❌"}
                      </span>
                    </div>

                    {/* Chips */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold flex items-center gap-2">
                        <MapPin size={16} className="text-blue-600" />
                        {job.location}
                      </span>

                      <span className="px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold">
                        {job.jobType}
                      </span>

                      <span className="px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-bold">
                        {job.experience}
                      </span>

                      <span className="px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-bold flex items-center gap-2">
                        <IndianRupee size={16} />
                        {job.salary}
                      </span>

                      <span className="px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 text-sm font-bold flex items-center gap-2">
                        <Users size={16} className="text-blue-600" />
                        {job.applicants} applicants
                      </span>

                      <span className="px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-500 text-sm font-bold flex items-center gap-2">
                        <Clock3 size={16} className="text-blue-600" />
                        {job.postedOn}
                      </span>
                    </div>

                    {/* ✅ Second line (Actions) */}
                    <div className="mt-5 pt-5 border-t border-slate-100 flex flex-col sm:flex-row gap-3 justify-start">
                      {/* View Applicants */}
                      <Link
                        to="/employer/applicants"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                      >
                        <Eye size={18} />
                        View Applicants
                      </Link>

                      {/* Edit */}
                      <button
                        onClick={() => openEditModal(job)}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all"
                      >
                        <Pencil size={18} className="text-blue-600" />
                        Edit Job
                      </button>

                      {/* Toggle Active */}
                      <button
                        onClick={() => toggleActive(job.id)}
                        className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-bold transition-all border
                          ${
                            job.isActive
                              ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                              : "bg-slate-50 border-slate-200 text-slate-700"
                          }`}
                      >
                        {job.isActive ? (
                          <>
                            <ToggleRight size={20} />
                            Deactivate
                          </>
                        ) : (
                          <>
                            <ToggleLeft size={20} />
                            Activate
                          </>
                        )}
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => openDeleteModal(job)}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-red-50 border border-red-200 text-red-600 font-bold hover:bg-red-100 transition-all"
                      >
                        <Trash2 size={18} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>

      {/* ✅ Edit Job Modal */}
      <AnimatePresence>
        {editModal.open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-[200] backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeEditModal}
            />

            {/* Modal */}
            <motion.div
              className="fixed inset-0 z-[210] flex items-center justify-center px-4"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="w-full max-w-2xl bg-white border border-slate-100 rounded-3xl shadow-2xl shadow-blue-900/10 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-black text-slate-900">
                      Edit Job
                    </h3>
                    <p className="text-sm text-slate-500 font-medium mt-1">
                      Update details and save changes ✅
                    </p>
                  </div>

                  <button
                    onClick={closeEditModal}
                    className="p-2 rounded-xl hover:bg-slate-50 text-slate-500"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-5">
                  {/* Title */}
                  <div>
                    <label className="text-sm font-bold text-slate-700">
                      Job Title
                    </label>
                    <input
                      name="title"
                      value={editForm.title}
                      onChange={handleEditChange}
                      className="mt-2 w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none font-medium focus:ring-2 focus:ring-blue-500"
                      placeholder="Job title..."
                    />
                  </div>

                  {/* Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Job Type */}
                    <div>
                      <label className="text-sm font-bold text-slate-700">
                        Job Type
                      </label>
                      <select
                        name="jobType"
                        value={editForm.jobType}
                        onChange={handleEditChange}
                        className="mt-2 w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none font-bold text-slate-700 focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Internship">Internship</option>
                        <option value="Contract">Contract</option>
                      </select>
                    </div>

                    {/* Location */}
                    <div>
                      <label className="text-sm font-bold text-slate-700">
                        Location
                      </label>
                      <input
                        name="location"
                        value={editForm.location}
                        onChange={handleEditChange}
                        className="mt-2 w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none font-medium focus:ring-2 focus:ring-blue-500"
                        placeholder="Delhi / Remote"
                      />
                    </div>

                    {/* Salary */}
                    <div>
                      <label className="text-sm font-bold text-slate-700">
                        Salary
                      </label>
                      <input
                        name="salary"
                        value={editForm.salary}
                        onChange={handleEditChange}
                        className="mt-2 w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none font-medium focus:ring-2 focus:ring-blue-500"
                        placeholder="₹6 LPA - ₹10 LPA"
                      />
                    </div>

                    {/* Experience */}
                    <div>
                      <label className="text-sm font-bold text-slate-700">
                        Experience
                      </label>
                      <input
                        name="experience"
                        value={editForm.experience}
                        onChange={handleEditChange}
                        className="mt-2 w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none font-medium focus:ring-2 focus:ring-blue-500"
                        placeholder="0 - 2 Years"
                      />
                    </div>

                    {/* Openings */}
                    <div>
                      <label className="text-sm font-bold text-slate-700">
                        Openings
                      </label>
                      <input
                        name="openings"
                        type="number"
                        min={1}
                        value={editForm.openings}
                        onChange={handleEditChange}
                        className="mt-2 w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none font-medium focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Active */}
                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() =>
                          setEditForm((prev) => ({
                            ...prev,
                            isActive: !prev.isActive,
                          }))
                        }
                        className={`w-full mt-2 px-4 py-3 rounded-2xl border font-bold flex items-center justify-between transition-all
                          ${
                            editForm.isActive
                              ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                              : "bg-slate-50 border-slate-200 text-slate-700"
                          }`}
                      >
                        <span>
                          {editForm.isActive ? "Active ✅" : "Inactive ❌"}
                        </span>

                        {editForm.isActive ? (
                          <ToggleRight size={22} />
                        ) : (
                          <ToggleLeft size={22} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3 justify-end">
                  <button
                    onClick={closeEditModal}
                    className="px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={saveEdit}
                    disabled={savingEdit}
                    className="px-6 py-3 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 disabled:opacity-70 inline-flex items-center justify-center gap-2"
                  >
                    {savingEdit ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ✅ Delete Confirmation Modal */}
      <AnimatePresence>
        {confirmDelete.open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-[200] backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDeleteModal}
            />

            <motion.div
              className="fixed inset-0 z-[210] flex items-center justify-center px-4"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="w-full max-w-md bg-white border border-slate-100 rounded-3xl shadow-2xl shadow-blue-900/10 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-slate-100 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-black text-slate-900">
                      Delete Job?
                    </h3>
                    <p className="text-sm text-slate-500 font-medium mt-1">
                      This action cannot be undone.
                    </p>
                  </div>

                  <button
                    onClick={closeDeleteModal}
                    className="p-2 rounded-xl hover:bg-slate-50 text-slate-500"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="p-6">
                  <p className="text-slate-700 font-bold">
                    Are you sure you want to delete:
                  </p>
                  <p className="mt-2 text-blue-600 font-black">
                    {confirmDelete.jobTitle}
                  </p>

                  <div className="mt-6 flex gap-3 justify-end">
                    <button
                      onClick={closeDeleteModal}
                      className="px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={handleDelete}
                      className="px-6 py-3 rounded-2xl bg-red-600 text-white font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-200"
                    >
                      Yes, Delete
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageJobs;
