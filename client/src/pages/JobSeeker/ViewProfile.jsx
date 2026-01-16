import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Zap,
  Mail,
  MapPin,
  BadgeCheck,
  GraduationCap,
  Building2,
  FileText,
  ExternalLink,
  Calendar,
  Loader2,
  User,
} from "lucide-react";
import { useJobSeeker } from "../../context/JobSeekerContext";
import { useNavigate } from "react-router-dom";

const JobSeekerProfile = () => {
  const navigate = useNavigate();
  const { jobSeeker, loading, fetchJobSeekerProfile } = useJobSeeker();

  useEffect(() => {
    fetchJobSeekerProfile();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
  };

  const companyName = jobSeeker?.user?.name || "Job Seeker";
  const profileImage =
    jobSeeker?.profileImage?.url ||
    `https://ui-avatars.com/api/?name=${companyName}&background=0148D6&color=fff`;

  const skills = jobSeeker?.skills || [];
  const education = jobSeeker?.education || [];
  const experience = jobSeeker?.experience || [];
  const resumeUrl = jobSeeker?.resume?.url;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-slate-900 overflow-x-hidden relative">
      {/* ✅ Background */}
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
          {/* ✅ Loading */}
          {loading && (
            <div className="flex justify-center items-center gap-2 py-8 text-slate-600 font-bold">
              <Loader2 className="animate-spin" size={18} />
              Loading profile...
            </div>
          )}

          {/* ✅ Empty Profile */}
          {!loading && !jobSeeker && (
            <div className="bg-white border border-slate-100 rounded-3xl shadow-xl shadow-blue-900/5 p-8 text-center">
              <p className="text-lg font-black text-slate-900">
                Profile not found 😅
              </p>
              <p className="text-slate-500 mt-2 font-medium">
                Please register your jobseeker profile.
              </p>

              <button
                onClick={() => navigate("/jobseeker/register")}
                className="mt-5 px-6 py-3 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
              >
                Register Now
              </button>
            </div>
          )}

          {/* ✅ Profile UI */}
          {!loading && jobSeeker && (
            <>
              {/* ✅ Top Profile Card */}
              <div className="bg-white border border-slate-100 rounded-3xl shadow-2xl shadow-blue-900/10 p-6 md:p-10">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="flex items-center gap-5">
                    {/* Profile Image */}
                    <div className="w-20 h-20 rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                      <img
                        src={profileImage}
                        alt="profile"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Basic info */}
                    <div>
                      <h1 className="text-2xl md:text-3xl font-black text-slate-900">
                        {jobSeeker?.user?.name}
                      </h1>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-slate-500 font-medium">
                        <span className="flex items-center gap-2">
                          <Mail size={16} className="text-blue-600" />
                          {jobSeeker?.user?.email}
                        </span>

                        {jobSeeker?.location && (
                          <>
                            <span className="hidden sm:block text-slate-300">
                              •
                            </span>
                            <span className="flex items-center gap-2">
                              <MapPin size={16} className="text-blue-600" />
                              {jobSeeker?.location}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Resume button */}
                  <div className="flex items-center gap-3">
                    {resumeUrl ? (
                      <a
                        href={resumeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                      >
                        View Resume <ExternalLink size={18} />
                      </a>
                    ) : (
                      <div className="px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 font-bold">
                        Resume not uploaded
                      </div>
                    )}
                  </div>
                </div>

                {/* Bio */}
                <div className="mt-8">
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <User size={18} className="text-blue-600" />
                    About Me
                  </h3>
                  <p className="mt-3 text-slate-600 leading-relaxed font-medium">
                    {jobSeeker?.bio || "No bio added yet."}
                  </p>
                </div>
              </div>

              {/* ✅ Skills */}
              <div className="bg-white border border-slate-100 rounded-3xl shadow-xl shadow-blue-900/5 p-6 md:p-8">
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <BadgeCheck size={20} className="text-blue-600" />
                  Skills
                </h3>

                {skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {skills.map((skill) => (
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
                  {education.length > 0 ? (
                    education.map((edu, index) => (
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
                  {experience.length > 0 ? (
                    experience.map((exp, index) => (
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
                    {resumeUrl ? "Resume uploaded ✅" : "No resume uploaded"}
                  </p>

                  {resumeUrl && (
                    <a
                      href={resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                    >
                      View Resume <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>
            </>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default JobSeekerProfile;
