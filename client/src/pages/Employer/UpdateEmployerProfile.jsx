import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Zap,
  Building2,
  Globe,
  MapPin,
  Briefcase,
  UploadCloud,
  ArrowRight,
  Loader2,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { useEmployer } from "../../context/EmployerContext";

const UpdateEmployerProfile = () => {
  const { employer, loading, fetchEmployerProfile, updateEmployerProfile } =
    useEmployer();

  const [form, setForm] = useState({
    companyName: "",
    companyWebsite: "",
    companyDescription: "",
    location: "",
    industry: "",
  });

  // ✅ only for UI preview + file upload
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);

  // ✅ Load employer profile if not available
  useEffect(() => {
    if (!employer) fetchEmployerProfile();
  }, []);

  // ✅ Prefill form when employer is available
  useEffect(() => {
    if (!employer) return;

    setForm({
      companyName: employer.companyName || "",
      companyWebsite: employer.companyWebsite || "",
      companyDescription: employer.companyDescription || "",
      location: employer.location || "",
      industry: employer.industry || "",
    });

    setLogoPreview(employer.companyLogo?.url || null);
  }, [employer]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("companyName", form.companyName);
    formData.append("companyWebsite", form.companyWebsite);
    formData.append("companyDescription", form.companyDescription);
    formData.append("location", form.location);
    formData.append("industry", form.industry);

    // ✅ must match multer field name: upload.single("companyLogo")
    if (logoFile) {
      formData.append("companyLogo", logoFile);
    }

    await updateEmployerProfile(formData);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="w-full px-4 pt-10 pb-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg shadow-sm">
              <Brain size={24} className="text-white" />
            </div>
            <span className="text-2xl font-black tracking-tight">HireMind</span>
          </div>

          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-bold">
            <Zap size={16} />
            Update Employer
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="px-4 pb-20 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto bg-white border border-slate-100 rounded-3xl p-6 md:p-10 shadow-2xl shadow-blue-900/10"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-black leading-tight">
              Update Your{" "}
              <span className="text-blue-600">Employer Profile</span>
            </h1>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              Keep your company profile updated to attract top candidates.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Company Name */}
              <div>
                <label className="text-sm font-bold text-slate-700">
                  Company Name
                </label>
                <div className="mt-2 flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
                  <Building2 size={18} className="text-blue-600" />
                  <input
                    type="text"
                    name="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                    placeholder="e.g. Infosys"
                    className="w-full bg-transparent outline-none font-medium"
                    required
                  />
                </div>
              </div>

              {/* Company Website */}
              <div>
                <label className="text-sm font-bold text-slate-700">
                  Company Website
                </label>
                <div className="mt-2 flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
                  <Globe size={18} className="text-blue-600" />
                  <input
                    type="url"
                    name="companyWebsite"
                    value={form.companyWebsite}
                    onChange={handleChange}
                    placeholder="https://company.com"
                    className="w-full bg-transparent outline-none font-medium"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="text-sm font-bold text-slate-700">
                  Location
                </label>
                <div className="mt-2 flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
                  <MapPin size={18} className="text-blue-600" />
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Delhi / Remote"
                    className="w-full bg-transparent outline-none font-medium"
                  />
                </div>
              </div>

              {/* Industry */}
              <div>
                <label className="text-sm font-bold text-slate-700">
                  Industry
                </label>
                <div className="mt-2 flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
                  <Briefcase size={18} className="text-blue-600" />
                  <input
                    type="text"
                    name="industry"
                    value={form.industry}
                    onChange={handleChange}
                    placeholder="IT / Finance"
                    className="w-full bg-transparent outline-none font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Company Description */}
            <div>
              <label className="text-sm font-bold text-slate-700">
                Company Description
              </label>
              <div className="mt-2 flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
                <FileText size={18} className="text-blue-600 mt-1" />
                <textarea
                  name="companyDescription"
                  value={form.companyDescription}
                  onChange={handleChange}
                  placeholder="Write something about your company..."
                  className="w-full bg-transparent outline-none font-medium min-h-[120px] resize-none"
                />
              </div>
            </div>

            {/* Logo Upload */}
            <div>
              <label className="text-sm font-bold text-slate-700">
                Company Logo
              </label>

              <div className="mt-2 rounded-3xl border-2 border-dashed border-slate-300 bg-blue-50 p-8 hover:border-blue-500 transition-all">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  {/* Preview */}
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden flex items-center justify-center">
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="company-logo"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UploadCloud className="text-blue-600" size={34} />
                    )}
                  </div>

                  <div className="flex-1 w-full text-center md:text-left">
                    <h4 className="text-lg font-extrabold text-slate-900">
                      Change your company logo
                    </h4>
                    <p className="text-sm text-slate-500 mt-1">
                      PNG / JPG supported. Recommended: square logo.
                    </p>

                    <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                      <label className="cursor-pointer inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all">
                        <UploadCloud size={18} />
                        Choose Logo
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleLogoChange}
                        />
                      </label>

                      {logoPreview && (
                        <button
                          type="button"
                          onClick={() => {
                            setLogoPreview(employer?.companyLogo?.url || null);
                            setLogoFile(null);
                          }}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold border border-slate-200 bg-white hover:bg-slate-50 transition-all"
                        >
                          Reset
                        </button>
                      )}
                    </div>

                    {logoFile && (
                      <p className="text-sm font-bold text-emerald-600 flex items-center gap-2 mt-4">
                        <CheckCircle2 size={16} />
                        New logo selected
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Saving Changes...
                </>
              ) : (
                <>
                  Update Employer Profile <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default UpdateEmployerProfile;
