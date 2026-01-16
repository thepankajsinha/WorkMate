import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const EmployerContext = createContext();

export const EmployerProvider = ({ children }) => {
  const [employer, setEmployer] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const registerEmployerProfile = async (formData) => {
    try {
      const res = await api.post("/api/employers/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 201) {
        toast.success(res.data.message);
        setEmployer(res.data.employer);
        navigate("/login");
      }

      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      throw error;
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

      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
      throw error;
    }
  };

  const value = {
    employer,
    loading,
    fetchEmployerProfile,
    registerEmployerProfile,
    updateEmployerProfile,
  };

  return (
    <EmployerContext.Provider value={value}>
      {children}
    </EmployerContext.Provider>
  );
};

export const useEmployer = () => useContext(EmployerContext);
