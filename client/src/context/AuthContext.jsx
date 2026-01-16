import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/api/auth/me");
      setUser(res.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const login = async ({ email, password }) => {
    try {
      const res = await api.post("/api/auth/login", { email, password });

      if (res.status === 200) {
        setUser(res.data.user);
        toast.success(res.data.message || "Login successful ✅");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      throw error;
    }
  };

  const logout = async () => {
    try {
      const res = await api.post("/api/auth/logout");

      if (res.status === 200) {
        setUser(null);
        toast.success(res.data.message || "Logout successful ✅");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
      throw error;
    }
  };

  const updateProfile = async ({ name, email, oldPassword, newPassword }) => {
    try {
      const res = await api.put("/api/auth/update", {
        name,
        email,
        oldPassword,
        newPassword,
      });

      if (res.status === 200) {
        setUser(res.data.user);
        toast.success(res.data.message || "Profile updated ✅");
      }

      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Profile update failed");
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    fetchProfile,
    updateProfile,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
