import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios.js"
import { toast } from "react-toastify";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [employerJobs, setEmployerJobs] = useState([]);
  const [loading, setLoading] = useState(false);


  const createJob = async (jobData) => {
    try {
      setLoading(true);
      const res = await api.post("/api/jobs", jobData);
      if (res.status === 201) {
        toast.success(res.data.message);
        setEmployerJobs((prev) => [res.data.job, ...prev]);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create job");
    } finally {
      setLoading(false);
    }
  };

 
  const updateJob = async (jobId, jobData) => {
    try {
      setLoading(true);
      const res = await api.put(`/api/jobs/${jobId}`, jobData);
      if (res.status === 200) {
        toast.success(res.data.message);
        setEmployerJobs((prev) =>
          prev.map((j) => (j._id === jobId ? res.data.job : j))
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update job");
    } finally {
      setLoading(false);
    }
  };


  const deleteJob = async (jobId) => {
    try {
      setLoading(true);
      const res = await api.delete(`/api/jobs/${jobId}`);
      if (res.status === 200) {
        toast.success(res.data.message);
        setEmployerJobs((prev) => prev.filter((j) => j._id !== jobId));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete job");
    } finally {
      setLoading(false);
    }
  };


  const fetchAllJobs = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/jobs");
      setJobs(res.data.jobs || []);
    } catch (error) {
      toast.error("Error fetching jobs");
    } finally {
      setLoading(false);
    }
  };


  const fetchEmployerJobs = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/jobs/employer/my");
      setEmployerJobs(res.data.jobs || []);
    } catch (error) {
      toast.error("Error fetching employer jobs");
    } finally {
      setLoading(false);
    }
  };


  const toggleJobStatus = async (jobId) => {
    try {
      const res = await api.patch(`/api/jobs/${jobId}/toggle`);
      if (res.status === 200) {
        toast.success("Job status updated");
        setEmployerJobs((prev) =>
          prev.map((j) =>
            j._id === jobId ? { ...j, isActive: res.data.isActive } : j
          )
        );
      }
    } catch (error) {
      toast.error("Failed to toggle job status");
    }
  };


  const getJobById = async (jobId) => {
    try {
      const res = await api.get(`/api/jobs/${jobId}`);
      return res.data;
    } catch (error) {
      toast.error("Error fetching job details");
      return null;
    }
  };

 
  const generateJobDescription = async ({
    title,
    jobType,
    workMode,
    experienceLevel,
  }) => {
    try {
      const res = await api.post("/api/jobs/generate-description", {
        title,
        jobType,
        workMode,
        experienceLevel,
      });
      toast.success("AI description generated");
      return res.data.description;
    } catch (error) {
      toast.error("Failed to generate AI description");
      return "";
    }
  };


  const generateJobRequirements = async ({ title, experienceLevel }) => {
    try {
      const res = await api.post("/api/jobs/generate-requirements", {
        title,
        experienceLevel,
      });
      toast.success("AI requirements generated");
      return res.data.requirements;
    } catch (error) {
      toast.error("Failed to generate AI requirements");
      return "";
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
        generateJobDescription,
        generateJobRequirements,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => useContext(JobContext);
