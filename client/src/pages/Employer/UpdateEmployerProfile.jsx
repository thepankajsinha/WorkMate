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
  CheckCircle2,
  XCircle,
  Loader2,
  FileText,
} from "lucide-react";

// ✅ Later you can connect backend like:
// import { updateEmployerProfileApi, uploadEmployerLogoApi } from "../../api/employerApi";

const UpdateEmployerProfile = () => {
  // ✅ Dummy existing employer data (replace with API GET employer later)
  const dummyEmployer = {
    companyName: "HireMind Technologies",
    companyWebsite: "https://hiremind.com",
    companyDescription:
      "We build modern hiring tools for job seekers and employers. We focus on clean UI, fast performance and AI-based matching.",
    location: "Delhi / Remote",
    industry: "IT / Software",
    companyLogo: {
      url: "https://ui-avatars.com/api/?name=HireMind&background=0148D6&color=fff",
      key: "dummy_key",
    },
  };

  const [form, setForm] = useState({
    companyName: "",
    companyWebsite: "",
    companyDescription: "",
    location: "",
    industry: "",
  });

  // ✅ Logo states
  const [logoPreview, setLogoPreview] = useState(null);
  const [uploadedLogo, setUploadedLogo] = useState(null); // { url, key }
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadError, setUploadError] = useState("");

  // ✅ Submit states
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // ✅ Prefill form on page load
  useEffect(() => {
    setForm({
      companyName: dummyEmployer.companyName || "",
      companyWebsite: dummyEmployer.companyWebsite || "",
      companyDescription: dummyEmployer.companyDescription || "",
      location: dummyEmployer.location || "",
      industry: dummyEmployer.industry || "",
    });

    setUploadedLogo(dummyEmployer.companyLogo || null);
    setLogoPreview(dummyEmployer.companyLogo?.url || null);
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetMessages = () => {
    setErrorMsg("");
    setSuccessMsg("");
  };

  // ✅ Upload logo (frontend ready)
  const handleLogoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError("");
    setUploadedLogo(null);

    // preview instantly
    setLogoPreview(URL.createObjectURL(file));

    try {
      setUploadingLogo(true);

      const token = localStorage.getItem("token");

      // ✅ If no backend yet, just simulate success
      if (!token) {
        setUploadError("Token missing ❌ (Login required to upload)");
        return;
      }

      // ✅ Later connect your real API:
      // const data = await uploadEmployerLogoApi({ file, token });
      // setUploadedLogo(data.companyLogo);

      // ✅ Fake upload success (for UI testing)
      await new Promise((r) => setTimeout(r, 900));
      setUploadedLogo({
        url: URL.createObjectURL(file),
        key: "fake_uploaded_logo_key",
      });

      setSuccessMsg("Company logo uploaded successfully ✅");
    } catch (err) {
      setUploadError(err?.response?.data?.message || "Logo upload failed");
    } finally {
      setUploadingLogo(false);
    }
  };

  // ✅ Update profile submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    resetMessages();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        setErrorMsg("Token missing ❌ Please login first.");
        return;
      }

      const payload = {
        ...form,
        companyLogo: uploadedLogo, // ✅ include uploaded logo if available
      };

      console.log("✅ UPDATE EMPLOYER PAYLOAD:", payload);

      // ✅ Later connect real API:
      // await updateEmployerProfileApi({ payload, token });

      // ✅ Fake delay
      await new Promise((r) => setTimeout(r, 900));

      setSuccessMsg("Employer profile updated successfully ✅");
    } catch (err) {
      setErrorMsg(err?.response?.data?.message || "Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden relative">
      {/* ✅ Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl" />
      </div>

      {/* ✅ Header */}
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

      {/* ✅ Form */}
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

          {/* ✅ Messages */}
          {successMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center gap-2 font-bold">
              <CheckCircle2 size={18} />
              {successMsg}
            </div>
          )}

          {errorMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 flex items-center gap-2 font-bold">
              <XCircle size={18} />
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* ✅ Grid */}
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

            {/* ✅ Logo Upload */}
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

                  {/* Upload Content */}
                  <div className="flex-1 w-full text-center md:text-left">
                    <h4 className="text-lg font-extrabold text-slate-900">
                      Change your company logo
                    </h4>
                    <p className="text-sm text-slate-500 mt-1">
                      PNG / JPG supported. Recommended: square logo.
                    </p>

                    <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                      <label className="cursor-pointer inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all">
                        {uploadingLogo ? (
                          <>
                            <Loader2 className="animate-spin" size={18} />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <UploadCloud size={18} />
                            Choose & Upload
                          </>
                        )}

                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleLogoChange}
                          disabled={uploadingLogo}
                        />
                      </label>

                      {logoPreview && (
                        <button
                          type="button"
                          onClick={() => {
                            setLogoPreview(null);
                            setUploadedLogo(null);
                            setUploadError("");
                          }}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold border border-slate-200 bg-white hover:bg-slate-50 transition-all"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    {/* Upload Status */}
                    <div className="mt-4">
                      {uploadedLogo?.url && !uploadingLogo && (
                        <p className="text-sm font-bold text-emerald-600 flex items-center gap-2">
                          <CheckCircle2 size={16} />
                          Logo ready ✅
                        </p>
                      )}

                      {uploadError && (
                        <p className="text-sm font-bold text-red-500 flex items-center gap-2">
                          <XCircle size={16} />
                          {uploadError}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ✅ Submit */}
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
