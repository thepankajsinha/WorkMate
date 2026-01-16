import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

export const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ GET: /api/bookmarks/
  const fetchBookmarks = async () => {
    try {
      setLoading(true);

      const res = await api.get("/api/bookmarks");

      if (res.status === 200) {
        setBookmarks(res.data.bookmarks || []);
      }

      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch bookmarks");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ POST: /api/bookmarks/:jobId
  const addBookmark = async (jobId) => {
    try {
      const res = await api.post(`/api/bookmarks/${jobId}`);

      if (res.status === 201) {
        toast.success(res.data.message || "Job bookmarked successfully ✅");

        // ✅ IMPORTANT:
        // backend returns bookmark without populate(job)
        // so we refetch full bookmarks list to get populated job + employer data
        await fetchBookmarks();
      }

      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add bookmark");
      throw error;
    }
  };

  // ✅ DELETE: /api/bookmarks/:jobId
  const removeBookmark = async (jobId) => {
    try {
      const res = await api.delete(`/api/bookmarks/${jobId}`);

      if (res.status === 200) {
        toast.success(res.data.message || "Bookmark removed ✅");

        // ✅ Fix: bookmark.job might be object OR string id
        setBookmarks((prev) =>
          prev.filter((b) => {
            const savedJobId = typeof b.job === "object" ? b.job?._id : b.job;
            return savedJobId !== jobId;
          })
        );
      }

      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove bookmark");
      throw error;
    }
  };

  // ✅ GET: /api/bookmarks/check/:jobId
  const isBookmarked = async (jobId) => {
    try {
      const res = await api.get(`/api/bookmarks/check/${jobId}`);
      return res.data.bookmarked;
    } catch (error) {
      return false;
    }
  };

  // ✅ Auto-fetch bookmarks on mount
  useEffect(() => {
    fetchBookmarks();
  }, []);

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

export const useBookmarks = () => useContext(BookmarkContext);
