import React, { createContext, useContext, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const JobSeekerContext = createContext();

export const JobSeekerProvider = ({ children }) => {
  const [jobSeeker, setJobSeeker] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchJobSeekerProfile = async () => {
    try {
      setLoading(true);

      const res = await api.get("/api/jobseekers/me");
      setJobSeeker(res.data.jobSeeker);

      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch profile");
      setJobSeeker(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const registerJobSeekerProfile = async (formData) => {
    try {
      setLoading(true);

      const res = await api.post("/api/jobseekers/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 201) {
        toast.success(res.data.message);
        setJobSeeker(res.data.jobSeeker);
        navigate("/");
      }

      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateJobSeekerProfile = async (formData) => {
    try {
      setLoading(true);

      const res = await api.put("/api/jobseekers/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200) {
        toast.success(res.data.message);
        setJobSeeker(res.data.jobSeeker);
      }

      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Profile update failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <JobSeekerContext.Provider
      value={{
        jobSeeker,
        loading,
        fetchJobSeekerProfile,
        registerJobSeekerProfile,
        updateJobSeekerProfile,
      }}
    >
      {children}
    </JobSeekerContext.Provider>
  );
};

export const useJobSeeker = () => useContext(JobSeekerContext);
