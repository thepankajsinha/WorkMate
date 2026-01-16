import React, { createContext, useContext, useState } from "react";
import api from "../api/axios.js";
import { toast } from "react-toastify";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [employerJobs, setEmployerJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ POST: /api/jobs/create
  const createJob = async (jobData) => {
    try {
      setLoading(true);

      const res = await api.post("/api/jobs/create", jobData);

      if (res.status === 201) {
        toast.success(res.data.message);
        setEmployerJobs((prev) => [res.data.job, ...prev]);
      }

      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create job");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ PUT: /api/jobs/update/:jobId
  const updateJob = async (jobId, jobData) => {
    try {
      setLoading(true);

      const res = await api.put(`/api/jobs/update/${jobId}`, jobData);

      if (res.status === 200) {
        toast.success(res.data.message);

        setEmployerJobs((prev) =>
          prev.map((j) => (j._id === jobId ? res.data.job : j))
        );
      }

      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update job");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE: /api/jobs/delete/:jobId
  const deleteJob = async (jobId) => {
    try {
      setLoading(true);

      const res = await api.delete(`/api/jobs/delete/${jobId}`);

      if (res.status === 200) {
        toast.success(res.data.message);
        setEmployerJobs((prev) => prev.filter((j) => j._id !== jobId));
      }

      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete job");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ GET: /api/jobs (Public)
  const fetchAllJobs = async () => {
    try {
      setLoading(true);

      const res = await api.get("/api/jobs");
      setJobs(res.data.jobs || []);

      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching jobs");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ GET: /api/jobs/employer/my-jobs (Employer Protected)
  const fetchEmployerJobs = async () => {
    try {
      setLoading(true);

      const res = await api.get("/api/jobs/employer/my-jobs");
      setEmployerJobs(res.data.jobs || []);

      return res.data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error fetching employer jobs"
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ PATCH: /api/jobs/toggle/:jobId
  const toggleJobStatus = async (jobId) => {
    try {
      const res = await api.patch(`/api/jobs/toggle/${jobId}`);

      if (res.status === 200) {
        toast.success(res.data.message);

        // backend returns: { job }
        setEmployerJobs((prev) =>
          prev.map((j) => (j._id === jobId ? res.data.job : j))
        );
      }

      return res.data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to toggle job status"
      );
      throw error;
    }
  };

  // ✅ GET: /api/jobs/:jobId (Public)
  const getJobById = async (jobId) => {
    try {
      const res = await api.get(`/api/jobs/${jobId}`);
      return res.data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error fetching job details"
      );
      return null;
    }
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        employerJobs,
        loading,
        createJob,
        updateJob,
        deleteJob,
        fetchAllJobs,
        fetchEmployerJobs,
        toggleJobStatus,
        getJobById,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => useContext(JobContext);
