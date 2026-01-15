import React, { createContext, useContext, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

const JobSeekerContext = createContext();

export const JobSeekerProvider = ({ children }) => {
  const [jobSeeker, setJobSeeker] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchJobSeekerProfile = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/jobseekers/me", {
        withCredentials: true,
      });
      setJobSeeker(res.data.jobSeeker);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  const updateJobSeekerProfile = async ({
    bio,
    skills,
    education,
    experience,
  }) => {
    try {
      setLoading(true);

      const payload = {
        bio,
        skills: Array.isArray(skills) ? skills.join(",") : "",
        education,
        experience,
      };

      const res = await api.put("/api/jobseekers", payload, {
        withCredentials: true,
      });

      setJobSeeker(res.data.jobSeeker);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  const uploadResume = async (resumeFile) => {
    if (!resumeFile) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("resume", resumeFile);

      const res = await api.post("/api/jobseekers/resume-upload", formData, {
        withCredentials: true,
      });

      setJobSeeker((prev) => ({
        ...prev,
        resume: res.data.resume,
      }));

      toast.success(res.data.message || "Resume uploaded");
    } catch (error) {
      toast.error(error.response?.data?.message || "Resume upload failed");
    } finally {
      setLoading(false);
    }
  };

  const uploadProfileImage = async (imageFile) => {
    if (!imageFile) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("profileImage", imageFile);

      const res = await api.post(
        "/api/jobseekers/profile-image-upload",
        formData,
        { withCredentials: true }
      );

      setJobSeeker((prev) => ({
        ...prev,
        profileImage: res.data.profileImage,
      }));

      toast.success(res.data.message || "Profile image updated");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Profile image upload failed"
      );
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
        updateJobSeekerProfile,
        uploadResume,
        uploadProfileImage,
      }}
    >
      {children}
    </JobSeekerContext.Provider>
  );
};

export const useJobSeeker = () => useContext(JobSeekerContext);
