import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

export const EmployerContext = createContext();

export const EmployerProvider = ({ children }) => {
  const [employer, setEmployer] = useState(null);
  const [loading, setLoading] = useState(true);


  const fetchEmployerProfile = async () => {
    try {
      const res = await api.get("/api/employers/me");
      setEmployer(res.data.employer);
    } catch (error) {
      setEmployer(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployerProfile();
  }, []);


  const createEmployerProfile = async (formData) => {
    try {
      const res = await api.post("/api/employers/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 201) {
        toast.success(res.data.message);
        setEmployer(res.data.employer);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create profile");
    }
  };


  const updateEmployerProfile = async (formData) => {
    try {
      const res = await api.put("/api/employers/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200) {
        toast.success(res.data.message);
        setEmployer(res.data.employer);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  const value = {
    employer,
    loading,
    createEmployerProfile,
    updateEmployerProfile,
    fetchEmployerProfile,
  };

  return (
    <EmployerContext.Provider value={value}>
      {children}
    </EmployerContext.Provider>
  );
};

export const useEmployer = () => useContext(EmployerContext);
