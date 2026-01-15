import React from "react";
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
  FileText,
  ExternalLink,
  Calendar,
  Edit3,
} from "lucide-react";

const JobSeekerProfile = () => {
  // ✅ Dummy data (replace with API data later)
  const profile = {
    name: "Pankaj Sinha",
    email: "pankaj@gmail.com",
    location: "Delhi, India",
    bio: "CSE Undergrad | MERN Developer | Building projects and learning everyday.",
    skills: [
      "react",
      "node.js",
      "mongodb",
      "express",
      "tailwind",
      "cpp",
      "python",
    ],
    profileImage: {
      url: "https://ui-avatars.com/api/?name=Pankaj+Sinha&background=0148D6&color=fff",
    },
    resume: {
      url: "#",
    },
    education: [
      {
        institution: "Delhi Technological University",
        degree: "B.Tech",
        fieldOfStudy: "Computer Science",
        startYear: 2022,
        endYear: 2026,
        isCurrent: true,
      },
    ],
    experience: [
      {
        company: "Startup Project",
        position: "Frontend Developer Intern",
        startDate: "2025-06-01",
        endDate: "",
        isCurrent: true,
        description:
          "Worked on React UI, built reusable components, improved UI responsiveness and performance.",
      },
    ],
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-slate-900 overflow-x-hidden relative">
      {/* ✅ Blue Background Glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute top-40 right-[-120px] w-[520px] h-[520px] bg-indigo-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-180px] left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-sky-400/10 rounded-full blur-3xl" />
      </div>

      {/* ✅ Header */}
      <header className="w-full px-4 pt-10 pb-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg shadow-sm">
              <Brain size={24} className="text-white" />
            </div>
            <span className="text-2xl font-black tracking-tight">HireMind</span>
          </div>

          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-bold">
            <Zap size={16} />
            My Profile
          </div>
        </div>
      </header>

      {/* ✅ Content */}
      <main className="px-4 pb-20 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto space-y-8"
        >
          {/* ✅ Top Profile Card */}
          <div className="bg-white border border-slate-100 rounded-3xl shadow-2xl shadow-blue-900/10 p-6 md:p-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                {/* Profile Image */}
                <div className="w-20 h-20 rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                  <img
                    src={profile.profileImage?.url}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Basic info */}
                <div>
                  <h1 className="text-2xl md:text-3xl font-black text-slate-900">
                    {profile.name}
                  </h1>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-slate-500 font-medium">
                    <span className="flex items-center gap-2">
                      <Mail size={16} className="text-blue-600" />
                      {profile.email}
                    </span>

                    <span className="hidden sm:block text-slate-300">•</span>

                    <span className="flex items-center gap-2">
                      <MapPin size={16} className="text-blue-600" />
                      {profile.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all">
                  <Edit3 size={18} />
                  Edit Profile
                </button>

                <button className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                  View Resume <ExternalLink size={18} />
                </button>
              </div>
            </div>

            {/* Bio */}
            <div className="mt-8">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <User size={18} className="text-blue-600" />
                About Me
              </h3>
              <p className="mt-3 text-slate-600 leading-relaxed font-medium">
                {profile.bio || "No bio added yet."}
              </p>
            </div>
          </div>

          {/* ✅ Skills */}
          <div className="bg-white border border-slate-100 rounded-3xl shadow-xl shadow-blue-900/5 p-6 md:p-8">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <BadgeCheck size={20} className="text-blue-600" />
              Skills
            </h3>

            {profile.skills?.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-4">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-bold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-slate-500 font-medium">
                No skills added yet.
              </p>
            )}
          </div>

          {/* ✅ Education */}
          <div className="bg-white border border-slate-100 rounded-3xl shadow-xl shadow-blue-900/5 p-6 md:p-8">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <GraduationCap size={20} className="text-blue-600" />
              Education
            </h3>

            <div className="mt-5 space-y-4">
              {profile.education?.length > 0 ? (
                profile.education.map((edu, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-3xl border border-slate-100 bg-slate-50"
                  >
                    <p className="text-base font-black text-slate-900">
                      {edu.degree} • {edu.fieldOfStudy}
                    </p>

                    <p className="text-sm text-slate-600 font-semibold mt-1">
                      {edu.institution}
                    </p>

                    <p className="text-sm text-slate-500 font-medium mt-2 flex items-center gap-2">
                      <Calendar size={16} className="text-blue-600" />
                      {edu.startYear} -{" "}
                      {edu.isCurrent ? "Present" : edu.endYear}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 font-medium">
                  No education details added yet.
                </p>
              )}
            </div>
          </div>

          {/* ✅ Experience */}
          <div className="bg-white border border-slate-100 rounded-3xl shadow-xl shadow-blue-900/5 p-6 md:p-8">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Building2 size={20} className="text-blue-600" />
              Experience
            </h3>

            <div className="mt-5 space-y-4">
              {profile.experience?.length > 0 ? (
                profile.experience.map((exp, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-3xl border border-slate-100 bg-slate-50"
                  >
                    <p className="text-base font-black text-slate-900">
                      {exp.position}
                    </p>

                    <p className="text-sm text-slate-700 font-bold mt-1">
                      {exp.company}
                    </p>

                    <p className="text-sm text-slate-500 font-medium mt-2 flex items-center gap-2">
                      <Calendar size={16} className="text-blue-600" />
                      {formatDate(exp.startDate)} -{" "}
                      {exp.isCurrent ? "Present" : formatDate(exp.endDate)}
                    </p>

                    {exp.description && (
                      <p className="text-sm text-slate-600 mt-3 font-medium leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-slate-500 font-medium">
                  No experience added yet.
                </p>
              )}
            </div>
          </div>

          {/* ✅ Resume */}
          <div className="bg-white border border-slate-100 rounded-3xl shadow-xl shadow-blue-900/5 p-6 md:p-8">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <FileText size={20} className="text-blue-600" />
              Resume
            </h3>

            <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <p className="text-slate-600 font-medium">
                {profile.resume?.url
                  ? "Resume uploaded ✅"
                  : "No resume uploaded"}
              </p>

              <button className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                View Resume <ExternalLink size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default JobSeekerProfile;
