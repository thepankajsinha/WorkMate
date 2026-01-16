import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Zap,
  MapPin,
  IndianRupee,
  Clock3,
  Pencil,
  Trash2,
  Eye,
  ToggleLeft,
  ToggleRight,
  X,
  Briefcase,
  Save,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useJobs } from "../../context/JobContext";

const ManageJobs = () => {
  const {
    employerJobs,
    loading,
    fetchEmployerJobs,
    deleteJob,
    toggleJobStatus,
    updateJob,
  } = useJobs();

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

  // ✅ Edit Form (✅ includes all required backend fields)
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    skills: "", // ✅ comma separated string
    requirements: "", // ✅ comma separated string
    responsibilities: "", // ✅ comma separated string
    jobType: "Full-Time",
    location: "",
    salary: "",
    experience: "",
    openings: 1,
    isActive: true,
  });

  const [savingEdit, setSavingEdit] = useState(false);

  // ✅ Fetch jobs on mount
  useEffect(() => {
    fetchEmployerJobs();
  }, []);

  // ✅ Delete Modal
  const openDeleteModal = (job) => {
    setConfirmDelete({
      open: true,
      jobId: job._id,
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

  const handleDelete = async () => {
    await deleteJob(confirmDelete.jobId);
    closeDeleteModal();
  };

  // ✅ Edit Modal (✅ Prefill ALL fields)
  const openEditModal = (job) => {
    setEditForm({
      title: job?.title || "",
      description: job?.description || "",

      // ✅ array -> comma string
      skills: Array.isArray(job?.skills) ? job.skills.join(", ") : "",
      requirements: Array.isArray(job?.requirements)
        ? job.requirements.join(", ")
        : "",
      responsibilities: Array.isArray(job?.responsibilities)
        ? job.responsibilities.join(", ")
        : "",

      jobType: job?.jobType || "Full-Time",
      location: job?.location || "",
      salary: job?.salary || "",
      experience: job?.experience || "",
      openings: job?.openings || 1,
      isActive: job?.isActive ?? true,
    });

    setEditModal({
      open: true,
      jobId: job._id,
    });
  };

  const closeEditModal = () => {
    setEditModal({
      open: false,
      jobId: null,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveEdit = async () => {
    try {
      setSavingEdit(true);

      // ✅ Your backend requires ALL fields
      const payload = {
        title: editForm.title,
        description: editForm.description,

        // ✅ send comma string (backend will convert into array)
        skills: editForm.skills,
        requirements: editForm.requirements,
        responsibilities: editForm.responsibilities,

        jobType: editForm.jobType,
        location: editForm.location,
        salary: editForm.salary,
        experience: editForm.experience,
        openings: Number(editForm.openings),
        isActive: editForm.isActive,
      };

      await updateJob(editModal.jobId, payload);
      closeEditModal();
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
      <main className="px-4 pb-20 pt-28">
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

          {/* Loading */}
          {loading && (
            <div className="flex justify-center items-center gap-2 py-6 text-slate-600 font-bold">
              <Loader2 className="animate-spin" size={18} />
              Loading jobs...
            </div>
          )}

          {/* Empty State */}
          {!loading && employerJobs.length === 0 && (
            <div className="text-center bg-white border border-slate-100 rounded-3xl p-8 shadow-xl shadow-blue-900/5">
              <p className="text-slate-700 font-black text-lg">
                No jobs posted yet 😅
              </p>
              <p className="text-slate-500 mt-2">
                Post your first job to start receiving applicants.
              </p>
            </div>
          )}

          {/* Jobs List */}
          <div className="space-y-4">
            {employerJobs.map((job) => {
              const companyName = job?.employer?.companyName || "Company";

              const companyLogo =
                job?.employer?.companyLogo?.url ||
                `https://ui-avatars.com/api/?name=${companyName}&background=0148D6&color=fff`;

              return (
                <div
                  key={job._id}
                  className="bg-white border border-slate-100 rounded-3xl p-5 md:p-6 shadow-xl shadow-blue-900/5 hover:shadow-2xl transition-all"
                >
                  <div className="flex items-start gap-4">
                    {/* Company Logo */}
                    <div className="w-14 h-14 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden flex items-center justify-center shrink-0">
                      <img
                        src={companyLogo}
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
                            {companyName}
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

                        <span className="px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-500 text-sm font-bold flex items-center gap-2">
                          <Clock3 size={16} className="text-blue-600" />
                          {job.createdAt
                            ? new Date(job.createdAt).toLocaleDateString()
                            : "—"}
                        </span>
                      </div>

                      {/* Actions */}
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
                          onClick={() => toggleJobStatus(job._id)}
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
              );
            })}
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

            {/* ✅ Modal Wrapper (scroll fix) */}
            <motion.div
              className="fixed inset-0 z-[210] flex items-start justify-center px-4 py-10 overflow-y-auto"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              {/* ✅ Modal Container */}
              <div
                className="w-full max-w-2xl bg-white border border-slate-100 rounded-3xl shadow-2xl shadow-blue-900/10 overflow-hidden max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex items-start justify-between shrink-0">
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

                {/* ✅ Body (scroll inside modal) */}
                <div className="p-6 space-y-5 overflow-y-auto">
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

                  {/* Description */}
                  <div>
                    <label className="text-sm font-bold text-slate-700">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={editForm.description}
                      onChange={handleEditChange}
                      className="mt-2 w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none font-medium focus:ring-2 focus:ring-blue-500 min-h-[110px] resize-none"
                      placeholder="Write job description..."
                    />
                  </div>

                  {/* Skills */}
                  <div>
                    <label className="text-sm font-bold text-slate-700">
                      Skills (comma separated)
                    </label>
                    <input
                      name="skills"
                      value={editForm.skills}
                      onChange={handleEditChange}
                      className="mt-2 w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none font-medium focus:ring-2 focus:ring-blue-500"
                      placeholder="React, Node.js, MongoDB"
                    />
                  </div>

                  {/* Requirements */}
                  <div>
                    <label className="text-sm font-bold text-slate-700">
                      Requirements (comma separated)
                    </label>
                    <textarea
                      name="requirements"
                      value={editForm.requirements}
                      onChange={handleEditChange}
                      className="mt-2 w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none font-medium focus:ring-2 focus:ring-blue-500 min-h-[90px] resize-none"
                      placeholder="React basics, Git, REST APIs"
                    />
                  </div>

                  {/* Responsibilities */}
                  <div>
                    <label className="text-sm font-bold text-slate-700">
                      Responsibilities (comma separated)
                    </label>
                    <textarea
                      name="responsibilities"
                      value={editForm.responsibilities}
                      onChange={handleEditChange}
                      className="mt-2 w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none font-medium focus:ring-2 focus:ring-blue-500 min-h-[90px] resize-none"
                      placeholder="Build UI, Integrate APIs, Fix bugs"
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

                    {/* Active Toggle */}
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
                <div className="p-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3 justify-end shrink-0">
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
