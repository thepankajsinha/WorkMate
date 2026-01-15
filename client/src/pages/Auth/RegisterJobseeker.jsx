import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Zap,
  User,
  Mail,
  Lock,
  FileText,
  UploadCloud,
  ArrowRight,
  BadgeCheck,
  X,
  Image as ImageIcon,
  Plus,
  Trash2,
  GraduationCap,
  Building2,
  Calendar,
} from "lucide-react";

const JobSeekerRegister = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
  });

  // ✅ Skills input
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([]);

  // ✅ Resume file
  const [resumeFile, setResumeFile] = useState(null);

  // ✅ Profile image file
  const [profilePreview, setProfilePreview] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  // ✅ Education dynamic fields
  const [education, setEducation] = useState([
    {
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startYear: "",
      endYear: "",
      isCurrent: false,
    },
  ]);

  // ✅ Experience dynamic fields
  const [experience, setExperience] = useState([
    {
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      description: "",
    },
  ]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ✅ Skills Add
  const addSkill = () => {
    const val = skillInput.trim().toLowerCase();
    if (!val) return;

    if (skills.includes(val)) {
      setSkillInput("");
      return;
    }

    setSkills((prev) => [...prev, val]);
    setSkillInput("");
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const removeSkill = (skill) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  // ✅ Resume select
  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setResumeFile(file);
  };

  // ✅ Profile image select
  const handleProfileImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProfileImage(file);
    setProfilePreview(URL.createObjectURL(file));
  };

  // ✅ Education handlers
  const addEducation = () => {
    setEducation((prev) => [
      ...prev,
      {
        institution: "",
        degree: "",
        fieldOfStudy: "",
        startYear: "",
        endYear: "",
        isCurrent: false,
      },
    ]);
  };

  const removeEducation = (index) => {
    setEducation((prev) => prev.filter((_, i) => i !== index));
  };

  const updateEducation = (index, key, value) => {
    setEducation((prev) =>
      prev.map((edu, i) =>
        i === index
          ? {
              ...edu,
              [key]: value,
              ...(key === "isCurrent" && value === true ? { endYear: "" } : {}),
            }
          : edu
      )
    );
  };

  // ✅ Experience handlers
  const addExperience = () => {
    setExperience((prev) => [
      ...prev,
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
        description: "",
      },
    ]);
  };

  const removeExperience = (index) => {
    setExperience((prev) => prev.filter((_, i) => i !== index));
  };

  const updateExperience = (index, key, value) => {
    setExperience((prev) =>
      prev.map((exp, i) =>
        i === index
          ? {
              ...exp,
              [key]: value,
              ...(key === "isCurrent" && value === true ? { endDate: "" } : {}),
            }
          : exp
      )
    );
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      role: "jobseeker",
      skills,

      education: education.map((e) => ({
        ...e,
        startYear: e.startYear ? Number(e.startYear) : null,
        endYear: e.isCurrent ? null : e.endYear ? Number(e.endYear) : null,
      })),

      experience: experience.map((x) => ({
        ...x,
        startDate: x.startDate ? new Date(x.startDate) : null,
        endDate: x.isCurrent ? null : x.endDate ? new Date(x.endDate) : null,
      })),
    };

    console.log("JobSeeker Register Payload:", payload);
    console.log("Resume File:", resumeFile);
    console.log("Profile Image:", profileImage);

    alert("✅ Jobseeker register payload ready (connect API next)");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-slate-900 overflow-x-hidden relative">
      {/* ✅ Blue Gradient Decorative Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute top-40 right-[-120px] w-[520px] h-[520px] bg-indigo-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-180px] left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-sky-400/10 rounded-full blur-3xl" />
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
            Jobseeker Register
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
              Register as <span className="text-blue-600">Jobseeker</span>
            </h1>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              Create your profile and start applying to top jobs.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Basic Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-bold text-slate-700">
                  Full Name
                </label>
                <div className="mt-2 flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
                  <User size={18} className="text-blue-600" />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full bg-transparent outline-none font-medium"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700">
                  Email
                </label>
                <div className="mt-2 flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
                  <Mail size={18} className="text-blue-600" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full bg-transparent outline-none font-medium"
                    required
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-bold text-slate-700">
                  Password
                </label>
                <div className="mt-2 flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
                  <Lock size={18} className="text-blue-600" />
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    className="w-full bg-transparent outline-none font-medium"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="text-sm font-bold text-slate-700">
                Bio (Optional)
              </label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                placeholder="Tell recruiters about yourself..."
                className="mt-2 w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none font-medium focus:ring-2 focus:ring-blue-500 min-h-[120px]"
                maxLength={500}
              />
              <p className="text-xs text-slate-400 mt-1 font-semibold">
                {form.bio.length}/500
              </p>
            </div>

            {/* Skills */}
            <div>
              <label className="text-sm font-bold text-slate-700">
                Skills (Add Multiple)
              </label>

              <div className="mt-2 flex flex-col md:flex-row gap-3">
                <div className="flex-1 flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
                  <BadgeCheck size={18} className="text-blue-600" />
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleSkillKeyDown}
                    placeholder="e.g. React, Node.js, MongoDB"
                    className="w-full bg-transparent outline-none font-medium"
                  />
                </div>

                <button
                  type="button"
                  onClick={addSkill}
                  className="px-6 py-3 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all"
                >
                  Add Skill
                </button>
              </div>

              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-bold"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="hover:text-red-500 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* ✅ Education */}
            <div>
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <GraduationCap className="text-blue-600" size={22} />
                  Education
                </h3>

                <button
                  type="button"
                  onClick={addEducation}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                >
                  <Plus size={18} /> Add Education
                </button>
              </div>

              <div className="mt-5 space-y-5">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-3xl border border-slate-100 bg-white shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-black text-slate-900">
                        Education #{index + 1}
                      </h4>

                      {education.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeEducation(index)}
                          className="text-red-500 hover:bg-red-50 px-3 py-2 rounded-xl font-bold flex items-center gap-2 transition-all"
                        >
                          <Trash2 size={16} /> Remove
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        value={edu.institution}
                        onChange={(e) =>
                          updateEducation(index, "institution", e.target.value)
                        }
                        placeholder="Institution (e.g. DTU)"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none font-medium focus:ring-2 focus:ring-blue-500"
                      />

                      <input
                        value={edu.degree}
                        onChange={(e) =>
                          updateEducation(index, "degree", e.target.value)
                        }
                        placeholder="Degree (e.g. B.Tech)"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none font-medium focus:ring-2 focus:ring-blue-500"
                      />

                      <input
                        value={edu.fieldOfStudy}
                        onChange={(e) =>
                          updateEducation(index, "fieldOfStudy", e.target.value)
                        }
                        placeholder="Field of Study (e.g. CSE)"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none font-medium focus:ring-2 focus:ring-blue-500"
                      />

                      <div className="flex items-center gap-3">
                        <Calendar className="text-blue-600" size={18} />
                        <input
                          type="number"
                          value={edu.startYear}
                          onChange={(e) =>
                            updateEducation(index, "startYear", e.target.value)
                          }
                          placeholder="Start Year"
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none font-medium focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <input
                        type="number"
                        value={edu.endYear}
                        onChange={(e) =>
                          updateEducation(index, "endYear", e.target.value)
                        }
                        placeholder="End Year"
                        disabled={edu.isCurrent}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none font-medium focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                      />

                      <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                        <input
                          type="checkbox"
                          checked={edu.isCurrent}
                          onChange={(e) =>
                            updateEducation(
                              index,
                              "isCurrent",
                              e.target.checked
                            )
                          }
                          className="w-4 h-4 accent-blue-600"
                        />
                        Currently Studying
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ✅ Experience */}
            <div>
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <Building2 className="text-blue-600" size={22} />
                  Experience
                </h3>

                <button
                  type="button"
                  onClick={addExperience}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                >
                  <Plus size={18} /> Add Experience
                </button>
              </div>

              <div className="mt-5 space-y-5">
                {experience.map((exp, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-3xl border border-slate-100 bg-white shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-black text-slate-900">
                        Experience #{index + 1}
                      </h4>

                      {experience.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeExperience(index)}
                          className="text-red-500 hover:bg-red-50 px-3 py-2 rounded-xl font-bold flex items-center gap-2 transition-all"
                        >
                          <Trash2 size={16} /> Remove
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        value={exp.company}
                        onChange={(e) =>
                          updateExperience(index, "company", e.target.value)
                        }
                        placeholder="Company (e.g. Google)"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none font-medium focus:ring-2 focus:ring-blue-500"
                      />

                      <input
                        value={exp.position}
                        onChange={(e) =>
                          updateExperience(index, "position", e.target.value)
                        }
                        placeholder="Position (e.g. Frontend Developer)"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none font-medium focus:ring-2 focus:ring-blue-500"
                      />

                      <input
                        type="date"
                        value={exp.startDate}
                        onChange={(e) =>
                          updateExperience(index, "startDate", e.target.value)
                        }
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none font-medium focus:ring-2 focus:ring-blue-500"
                      />

                      <input
                        type="date"
                        value={exp.endDate}
                        onChange={(e) =>
                          updateExperience(index, "endDate", e.target.value)
                        }
                        disabled={exp.isCurrent}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none font-medium focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                      />

                      <label className="flex items-center gap-2 text-sm font-bold text-slate-700 md:col-span-2">
                        <input
                          type="checkbox"
                          checked={exp.isCurrent}
                          onChange={(e) =>
                            updateExperience(
                              index,
                              "isCurrent",
                              e.target.checked
                            )
                          }
                          className="w-4 h-4 accent-blue-600"
                        />
                        Currently Working
                      </label>

                      <textarea
                        value={exp.description}
                        onChange={(e) =>
                          updateExperience(index, "description", e.target.value)
                        }
                        placeholder="Description (what you did, achievements...)"
                        className="w-full md:col-span-2 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none font-medium focus:ring-2 focus:ring-blue-500 min-h-[110px]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resume Upload */}
            <div>
              <label className="text-sm font-bold text-slate-700">
                Upload Resume (PDF)
              </label>

              <div className="mt-2 rounded-3xl border-2 border-dashed border-slate-300 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8 hover:border-blue-500 transition-all">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden flex items-center justify-center">
                    <FileText className="text-blue-600" size={34} />
                  </div>

                  <div className="flex-1 w-full text-center md:text-left">
                    <h4 className="text-lg font-extrabold text-slate-900">
                      Upload your resume
                    </h4>
                    <p className="text-sm text-slate-500 mt-1">
                      PDF supported. Recruiters love well-formatted resumes.
                    </p>

                    <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                      <label className="cursor-pointer inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all">
                        <UploadCloud size={18} />
                        Choose Resume
                        <input
                          type="file"
                          accept="application/pdf"
                          className="hidden"
                          onChange={handleResumeChange}
                        />
                      </label>

                      {resumeFile && (
                        <button
                          type="button"
                          onClick={() => setResumeFile(null)}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold border border-slate-200 bg-white hover:bg-slate-50 transition-all"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    {resumeFile && (
                      <p className="mt-3 text-sm font-bold text-emerald-600">
                        ✅ Selected: {resumeFile.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Image Upload */}
            <div>
              <label className="text-sm font-bold text-slate-700">
                Profile Image (Optional)
              </label>

              <div className="mt-2 rounded-3xl border-2 border-dashed border-slate-300 bg-gradient-to-br from-slate-50 via-white to-blue-50 p-8 hover:border-blue-500 transition-all">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden flex items-center justify-center">
                    {profilePreview ? (
                      <img
                        src={profilePreview}
                        alt="profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="text-blue-600" size={34} />
                    )}
                  </div>

                  <div className="flex-1 w-full text-center md:text-left">
                    <h4 className="text-lg font-extrabold text-slate-900">
                      Upload a profile photo
                    </h4>
                    <p className="text-sm text-slate-500 mt-1">
                      Optional — helps your profile look more professional.
                    </p>

                    <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                      <label className="cursor-pointer inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl font-bold transition-all">
                        <UploadCloud size={18} />
                        Choose Image
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleProfileImageChange}
                        />
                      </label>

                      {profilePreview && (
                        <button
                          type="button"
                          onClick={() => {
                            setProfileImage(null);
                            setProfilePreview(null);
                          }}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold border border-slate-200 bg-white hover:bg-slate-50 transition-all"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
            >
              Register Jobseeker <ArrowRight size={20} />
            </button>
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default JobSeekerRegister;
