import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch logged-in user's profile
  const fetchProfile = async () => {
    try {
      const res = await api.get("/api/users/profile");
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

  const register = async ({ name, email, password, role }) => {
    try {
      const res = await api.post("/api/users/register", {
        name,
        email,
        password,
        role,
      });

      if (res.status == 201) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  const login = async ({ email, password }) => {
    try {
      const res = await api.post("/api/users/login", {
        email,
        password,
      });

      if (res.status === 200) {
        const user = res.data.user;
        setUser(user);
        toast.success(res.data.message);

        // Redirect based on role
        if (user.role === "employer") {
          navigate("/employer");
        } else {
          navigate("/jobseeker/profile");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  const logout = async () => {
    try {
      const res = await api.post("/api/users/logout");

      if (res.status == 200) {
        setUser(null);
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
