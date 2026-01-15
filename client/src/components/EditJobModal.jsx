import React, { useState } from "react";
import {
  X,
  Briefcase,
  MapPin,
  IndianRupee,
  Layers,
  Calendar,
  FileText,
  Plus,
  Trash,
  Loader2,
  PowerIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useJobs } from "../context/JobContext.jsx"; // ✅ Use real context

const EditJobModal = ({ job, onClose }) => {
  const { updateJob, loading } = useJobs(); // ✅ Context functions

  // Form states with safe fallbacks
  const [title, setTitle] = useState(job.title || "");
  const [location, setLocation] = useState(job.location || "");
  const [jobType, setJobType] = useState(job.jobType || "Full-Time");
  const [workMode, setWorkMode] = useState(job.workMode || "Onsite");
  const [experienceLevel, setExperienceLevel] = useState(job.experienceLevel || "Fresher");
  const [isActive, setIsActive] = useState(job.isActive ?? true);
  const [noOfOpenings, setNoOfOpenings] = useState(job.noOfOpenings || 1);
  const [salaryMin, setSalaryMin] = useState(job.salaryRange?.min || 0);
  const [salaryMax, setSalaryMax] = useState(job.salaryRange?.max || 0);
  const [deadline, setDeadline] = useState(job.deadline ? job.deadline.split("T")[0] : "");
  const [description, setDescription] = useState(job.description || "");
  const [requirements, setRequirements] = useState(job.requirements || "");

  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedJobData = {
      title,
      location,
      jobType,
      workMode,
      experienceLevel,
      isActive,
      noOfOpenings: Number(noOfOpenings),
      salaryRange: {
        min: Number(salaryMin),
        max: Number(salaryMax),
      },
      deadline,
      description,
      requirements,
    };

    await updateJob(job._id, updatedJobData);
    onClose(); // Close modal after successful update
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-start justify-center z-50 p-6 overflow-y-auto">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white w-full max-w-3xl p-8 rounded-2xl shadow-xl border border-gray-200 relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black transition"
        >
          <X size={24} />
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-[#0148D6] mb-6 flex items-center gap-2">
          <Briefcase size={22} />
          Edit Job Posting
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Job Title */}
          <div>
            <label className="font-medium text-sm flex items-center gap-2">
              <Briefcase size={18} /> Job Title
            </label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-2 px-4 py-3 border rounded-lg focus:border-[#0148D6]"
            />
          </div>

          {/* Location */}
          <div>
            <label className="font-medium text-sm flex items-center gap-2">
              <MapPin size={18} /> Location
            </label>
            <input
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full mt-2 px-4 py-3 border rounded-lg focus:border-[#0148D6]"
            />
          </div>

          {/* Job Type / Work Mode / Experience */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="font-medium text-sm">Job Type</label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="w-full mt-2 px-3 py-3 border rounded-lg"
              >
                <option>Full-Time</option>
                <option>Part-Time</option>
                <option>Internship</option>
                <option>Contract</option>
              </select>
            </div>

            <div>
              <label className="font-medium text-sm">Work Mode</label>
              <select
                value={workMode}
                onChange={(e) => setWorkMode(e.target.value)}
                className="w-full mt-2 px-3 py-3 border rounded-lg"
              >
                <option>Onsite</option>
                <option>Remote</option>
                <option>Hybrid</option>
              </select>
            </div>

            <div>
              <label className="font-medium text-sm">Experience Level</label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full mt-2 px-3 py-3 border rounded-lg"
              >
                <option>Fresher</option>
                <option>Junior</option>
                <option>Mid</option>
                <option>Senior</option>
              </select>
            </div>
          </div>

          {/* Salary Range */}
          <div>
            <label className="font-medium text-sm flex items-center gap-2">
              <IndianRupee size={18} /> Salary Range (LPA)
            </label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <input
                type="number"
                value={salaryMin}
                onChange={(e) => setSalaryMin(e.target.value)}
                placeholder="Min"
                className="px-4 py-3 border rounded-lg"
              />
              <input
                type="number"
                value={salaryMax}
                onChange={(e) => setSalaryMax(e.target.value)}
                placeholder="Max"
                className="px-4 py-3 border rounded-lg"
              />
            </div>
          </div>

          {/* Openings & Status */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="font-medium text-sm flex items-center gap-2">
                <Layers size={18} /> Number of Openings
              </label>
              <input
                type="number"
                value={noOfOpenings}
                min="1"
                onChange={(e) => setNoOfOpenings(e.target.value)}
                className="w-full mt-2 px-4 py-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="font-medium text-sm flex items-center gap-2">
                <PowerIcon size={18} /> Job Status
              </label>
              <div
                onClick={() => setIsActive(!isActive)}
                className={`w-16 h-8 rounded-full mt-3 flex items-center cursor-pointer px-1 transition ${
                  isActive ? "bg-green-500" : "bg-gray-400"
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow transform transition ${
                    isActive ? "translate-x-8" : "translate-x-0"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Deadline */}
          <div>
            <label className="font-medium text-sm flex items-center gap-2">
              <Calendar size={18} /> Application Deadline
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full mt-2 px-4 py-3 border rounded-lg"
            />
          </div>

          {/* Description */}
          <div>
            <label className="font-medium text-sm flex items-center gap-2">
              <FileText size={18} /> Job Description
            </label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-2 px-4 py-3 border rounded-lg"
            />
          </div>

          {/* Requirements */}
          <div>
            <label className="font-medium text-sm flex items-center gap-2">
              <Layers size={18} /> Requirements
            </label>
            <textarea
              rows="4"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="Enter job requirements..."
              className="w-full mt-2 px-4 py-3 border rounded-lg"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0148D6] text-white py-3 rounded-lg font-medium 
            hover:bg-[#0d3ea9] transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Updating Job...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default EditJobModal;
