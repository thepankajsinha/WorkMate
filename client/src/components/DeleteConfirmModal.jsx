import React from "react";
import { X, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

const DeleteConfirmModal = ({ jobTitle, onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl relative border border-gray-200"
      >
        {/* Close */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-500 hover:text-black transition"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold text-red-600 mb-4 flex items-center gap-2">
          <Trash2 size={24} />
          Delete Job
        </h2>

        <p className="text-gray-700 text-md mb-6">
          Are you sure you want to delete <strong>{jobTitle}</strong>?  
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-lg border hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DeleteConfirmModal;
