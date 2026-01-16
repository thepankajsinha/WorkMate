import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";

export const ApplicantContext = createContext();

export const ApplicantProvider = ({ children }) => {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]); // ✅ jobseeker my applications
  const [applicants, setApplicants] = useState([]); // ✅ employer applicants list
  const [loading, setLoading] = useState(false);

  // ✅ Jobseeker: Apply for job (multipart - resume required)
  // Route: POST /api/applicants/apply/:jobId
  const applyForJob = async ({ jobId, coverLetter, resumeFile }) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("coverLetter", coverLetter || "");

      // ✅ backend requires req.file (resume)
      if (resumeFile) {
        formData.append("resume", resumeFile); // must match resumeUpload field name
      }

      const res = await api.post(`/api/applicants/apply/${jobId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 201) {
        toast.success(res.data.message || "Job applied successfully ✅");
        navigate("/jobseeker/applied-jobs");
      }

      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to apply for job");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Jobseeker: My applications
  // Route: GET /api/applicants/my-applications
  const getMyApplications = async () => {
    try {
      setLoading(true);

      const res = await api.get("/api/applicants/my-applications");

      if (res.status === 200) {
        setApplications(res.data.applications || []);
      }

      return res.data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error fetching applications"
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Employer: Get all applicants for current employer jobs
  // Route: GET /api/applicants/employer/applicants
  const getApplicantsForEmployer = async () => {
    try {
      setLoading(true);

      const res = await api.get("/api/applicants/employer/applicants");

      if (res.status === 200) {
        setApplicants(res.data.applicants || []);
      }

      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching applicants");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Employer: Update applicant status
  // Route: PATCH /api/applicants/status/:applicationId
  const updateApplicantStatus = async ({ applicationId, status }) => {
    try {
      const res = await api.patch(`/api/applicants/status/${applicationId}`, {
        status,
      });

      if (res.status === 200) {
        toast.success(res.data.message || "Status updated ✅");

        // ✅ backend returns: { application: updatedApplication }
        setApplicants((prev) =>
          prev.map((a) => (a._id === applicationId ? res.data.application : a))
        );
      }

      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
      throw error;
    }
  };

  const value = {
    loading,
    applications,
    applicants,
    applyForJob,
    getMyApplications,
    getApplicantsForEmployer,
    updateApplicantStatus,
  };

  return (
    <ApplicantContext.Provider value={value}>
      {children}
    </ApplicantContext.Provider>
  );
};

export const useApplicant = () => useContext(ApplicantContext);
