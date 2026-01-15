import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";

export const ApplicantContext = createContext();

export const ApplicantProvider = ({ children }) => {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🧠 Jobseeker: Apply for a job
  const applyForJob = async (jobId, coverLetter) => {
    try {
      setLoading(true);
      const res = await api.post(`/api/applicants/${jobId}`, { coverLetter });

      if (res.status === 201) {
        toast.success(res.data.message);
        navigate("/jobseeker/applied-jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to apply for job");
    } finally {
      setLoading(false);
    }
  };

  // 🧠 Jobseeker: Get my applications
  const getMyApplications = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/applicants/my");

      if (res.status === 200) {
        setApplications(res.data.applications || []);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching applications");
    } finally {
      setLoading(false);
    }
  };

  // 🧠 Jobseeker: Generate AI Cover Letter
  const generateCoverLetter = async (jobId) => {
    try {
      setLoading(true);
      const res = await api.post(`/api/applicants/generate-cover-letter/${jobId}`);

      if (res.status === 200) {
        toast.success(res.data.message);
        return res.data.coverLetter;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error generating cover letter");
    } finally {
      setLoading(false);
    }
  };

  // 🧠 Employer: Get ALL applicants for current employer
  const getApplicantsForEmployer = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/api/applicants/employer`);

      if (res.status === 200) {
        setApplicants(res.data.applicants || []);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching applicants");
    } finally {
      setLoading(false);
    }
  };

  // 🧠 Employer: Update applicant status (by jobSeekerId)
  const updateApplicantStatus = async (jobSeekerId, status) => {
    try {
      const res = await api.patch(`/api/applicants/status`, {
        jobSeekerId,
        status,
      });

      if (res.status === 200) {
        toast.success(res.data.message);

        // Update local state immediately for better UX
        setApplicants((prev) =>
          prev.map((a) =>
            a.jobSeeker?._id === jobSeekerId ? { ...a, status } : a
          )
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  const value = {
    loading,
    applications,
    applicants,
    applyForJob,
    getMyApplications,
    generateCoverLetter,
    getApplicantsForEmployer, // ✅ updated name and behavior
    updateApplicantStatus, // ✅ updated payload
  };

  return (
    <ApplicantContext.Provider value={value}>
      {children}
    </ApplicantContext.Provider>
  );
};

export const useApplicant = () => useContext(ApplicantContext);
