import React, { useState } from "react";
import {
  X,
  Building2,
  Globe,
  MapPin,
  FileText,
  Layers,
  CloudUpload,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";

const UpdateCompanyModal = ({ company, onClose, onUpdate }) => {
  const [companyName, setCompanyName] = useState(company.companyName || "");
  const [companyWebsite, setCompanyWebsite] = useState(company.companyWebsite || "");
  const [companyDescription, setCompanyDescription] = useState(company.companyDescription || "");
  const [location, setLocation] = useState(company.location || "");
  const [industry, setIndustry] = useState(company.industry || "");
  const [logoFile, setLogoFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Build multipart form data
      const formData = new FormData();
      formData.append("companyName", companyName);
      formData.append("companyWebsite", companyWebsite);
      formData.append("companyDescription", companyDescription);
      formData.append("location", location);
      formData.append("industry", industry);
      if (logoFile) formData.append("companyLogo", logoFile);

      // ✅ Call parent onUpdate (connected to EmployerContext)
      await onUpdate(formData);

      onClose();
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* MODAL */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="
          relative bg-white 
          w-full max-w-2xl 
          max-h-[90vh] overflow-y-auto 
          p-8 rounded-2xl 
          shadow-xl border border-gray-200
        "
      >
        {/* Close Btn */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black transition"
        >
          <X size={22} />
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-[#0148D6] mb-6 flex items-center gap-2">
          Update Company Details
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Name */}
          <div>
            <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
              <Building2 size={18} /> Company Name
            </label>
            <input
              type="text"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full mt-2 px-4 py-3 border rounded-lg outline-none focus:border-[#0148D6]"
            />
          </div>

          {/* Website */}
          <div>
            <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
              <Globe size={18} /> Website
            </label>
            <input
              type="text"
              value={companyWebsite}
              onChange={(e) => setCompanyWebsite(e.target.value)}
              className="w-full mt-2 px-4 py-3 border rounded-lg outline-none focus:border-[#0148D6]"
            />
          </div>

          {/* Location */}
          <div>
            <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
              <MapPin size={18} /> Location
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full mt-2 px-4 py-3 border rounded-lg outline-none focus:border-[#0148D6]"
            />
          </div>

          {/* Industry */}
          <div>
            <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
              <Layers size={18} /> Industry
            </label>
            <input
              type="text"
              required
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full mt-2 px-4 py-3 border rounded-lg outline-none focus:border-[#0148D6]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
              <FileText size={18} /> Company Description
            </label>
            <textarea
              rows="4"
              required
              value={companyDescription}
              onChange={(e) => setCompanyDescription(e.target.value)}
              className="w-full mt-2 px-4 py-3 border rounded-lg outline-none focus:border-[#0148D6]"
            ></textarea>
          </div>

          {/* Logo Upload */}
          <div>
            <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
              <CloudUpload size={18} /> Company Logo
            </label>

            <div className="flex items-center gap-4 mt-3">
              <img
                src={logoFile ? URL.createObjectURL(logoFile) : company.companyLogo}
                alt="preview"
                className="w-16 h-16 rounded-lg border object-cover"
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setLogoFile(e.target.files[0])}
                className="px-3 py-2 border rounded-lg text-sm cursor-pointer"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0148D6] text-white py-3 rounded-lg font-medium 
            hover:bg-[#0d3ea9] transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Updating...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdateCompanyModal;
