import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Zap,
  User,
  Mail,
  MapPin,
  BadgeCheck,
  GraduationCap,
  Building2,
  Calendar,
  FileText,
  UploadCloud,
  Plus,
  Trash2,
  ArrowRight,
  X,
} from "lucide-react";

const updateProfile = () => {
  const [form, setForm] = useState({
    name: "Pankaj Sinha",
    email: "pankaj@gmail.com",
    location: "Delhi, India",
    bio: "CSE Undergrad | MERN Developer | Building projects everyday.",
  });

  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([
    "react",
    "node.js",
    "mongodb",
    "tailwind",
    "cpp",
  ]);

  const [resumeFile, setResumeFile] = useState(null);

  // Education
  const [education, setEducation] = useState([
    {
      institution: "Delhi Technological University",
      degree: "B.Tech",
      fieldOfStudy: "Computer Science",
      startYear: 2022,
      endYear: "",
      isCurrent: true,
    },
  ]);

  // Experience
  const [experience, setExperience] = useState([
    {
      company: "Startup Project",
      position: "Frontend Developer Intern",
      startDate: "2025-06-01",
      endDate: "",
      isCurrent: true,
      description:
        "Built reusable UI components, improved responsiveness and optimized performance.",
    },
  ]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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

  const removeSkill = (skill) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  // Education handlers
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

  // Experience handlers
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

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setResumeFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      skills,
      education,
      experience,
    };

    console.log("✅ Update Profile Payload:", payload);
    console.log("✅ Resume File:", resumeFile);

    alert("✅ Profile Updated (connect API next)");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-slate-900 overflow-x-hidden relative">
      {/* Background Glow */}
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
            Update Profile
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="px-4 pb-20 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto bg-white border border-slate-100 rounded-3xl p-6 md:p-10 shadow-2xl shadow-blue-900/10"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-black leading-tight">
              Update Your <span className="text-blue-600">Profile</span>
            </h1>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              Keep your profile updated to get more job matches.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Basic */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-bold text-slate-700">Name</label>
                <div className="mt-2 flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
                  <User size={18} className="text-blue-600" />
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full bg-transparent outline-none font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700">
                  Email
                </label>
                <div className="mt-2 flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3">
                  <Mail size={18} className="text-blue-600" />
                  <input
                    name="email"
                    value={form.email}
                    className="w-full bg-transparent outline-none font-medium text-slate-400"
                    disabled
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-bold text-slate-700">
                  Location
                </label>
                <div className="mt-2 flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
                  <MapPin size={18} className="text-blue-600" />
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    className="w-full bg-transparent outline-none font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="text-sm font-bold text-slate-700">Bio</label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                className="mt-2 w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none font-medium focus:ring-2 focus:ring-blue-500 min-h-[120px]"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="text-sm font-bold text-slate-700">Skills</label>
              <div className="mt-2 flex flex-col md:flex-row gap-3">
                <div className="flex-1 flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
                  <BadgeCheck size={18} className="text-blue-600" />
                  <input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    placeholder="Type skill and click add"
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

            {/* Education */}
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
                        placeholder="Institution"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none font-medium focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        value={edu.degree}
                        onChange={(e) =>
                          updateEducation(index, "degree", e.target.value)
                        }
                        placeholder="Degree"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none font-medium focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        value={edu.fieldOfStudy}
                        onChange={(e) =>
                          updateEducation(index, "fieldOfStudy", e.target.value)
                        }
                        placeholder="Field of Study"
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
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
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
                        placeholder="Company"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none font-medium focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        value={exp.position}
                        onChange={(e) =>
                          updateExperience(index, "position", e.target.value)
                        }
                        placeholder="Position"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none font-medium focus:ring-2 focus:ring-blue-500"
                      />
                      <textarea
                        value={exp.description}
                        onChange={(e) =>
                          updateExperience(index, "description", e.target.value)
                        }
                        placeholder="Description"
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
                Upload Resume
              </label>

              <div className="mt-2 rounded-3xl border-2 border-dashed border-slate-300 bg-blue-50 p-7 hover:border-blue-500 transition-all">
                <div className="flex items-center gap-4 flex-col md:flex-row">
                  <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center">
                    <FileText size={26} className="text-blue-600" />
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <p className="font-bold text-slate-800">
                      Upload new resume (PDF)
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                      Replace your old resume anytime.
                    </p>
                  </div>

                  <label className="cursor-pointer inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-blue-200">
                    <UploadCloud size={18} />
                    Choose File
                    <input
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      onChange={handleResumeChange}
                    />
                  </label>
                </div>

                {resumeFile && (
                  <p className="mt-4 text-sm font-bold text-emerald-600">
                    ✅ Selected: {resumeFile.name}
                  </p>
                )}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
            >
              Save Changes <ArrowRight size={20} />
            </button>
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default updateProfile;
