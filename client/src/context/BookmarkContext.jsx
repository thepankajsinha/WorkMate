import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

export const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all bookmarks for the logged-in user
  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/bookmarks");
      if (res.status === 200) {
        setBookmarks(res.data.bookmarks || []);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch bookmarks");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add a bookmark
  const addBookmark = async (jobId) => {
    try {
      const res = await api.post(`/api/bookmarks/${jobId}`);
      if (res.status === 201) {
        toast.success(res.data.message || "Job bookmarked successfully");
        setBookmarks((prev) => [...prev, res.data.bookmark]);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add bookmark");
    }
  };

  // ✅ Remove a bookmark
  const removeBookmark = async (jobId) => {
    try {
      const res = await api.delete(`/api/bookmarks/${jobId}`);
      if (res.status === 200) {
        toast.success(res.data.message || "Bookmark removed successfully");
        setBookmarks((prev) => prev.filter((b) => b.job._id !== jobId));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove bookmark");
    }
  };

  // ✅ Check if job is bookmarked
  const isBookmarked = async (jobId) => {
    try {
      const res = await api.get(`/api/bookmarks/check/${jobId}`);
      return res.data.bookmarked;
    } catch (error) {
      console.error("Error checking bookmark:", error);
      return false;
    }
  };

  // ✅ Auto-fetch bookmarks on mount (optional)
  useEffect(() => {
    fetchBookmarks();
  }, []);

  // ✅ Exported values (like AuthContext)
  const value = {
    bookmarks,
    loading,
    fetchBookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
  };

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
};

// ✅ Custom hook
export const useBookmarks = () => useContext(BookmarkContext);
