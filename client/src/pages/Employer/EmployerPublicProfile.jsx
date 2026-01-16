import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import {
  Brain,
  Zap,
  ArrowLeft,
  Building2,
  Globe,
  MapPin,
  Briefcase,
  Users,
  ArrowRight,
  Loader2,
} from "lucide-react";

import { useEmployer } from "../../context/EmployerContext";
import api from "../../api/axios";

const EmployerPublicProfile = () => {
  const { employerId } = useParams();

  const { loading, publicEmployer, fetchPublicEmployerProfile } = useEmployer();

  const [jobsLoading, setJobsLoading] = useState(false);
  const [jobs, setJobs] = useState([]);

  // ✅ Fetch employer public profile
  useEffect(() => {
    if (employerId) {
      fetchPublicEmployerProfile(employerId);
    }
  }, [employerId]);

  // ✅ Fetch employer jobs from DB
  const fetchEmployerJobs = async () => {
    try {
      setJobsLoading(true);
      const res = await api.get(`/api/jobs/employer/${employerId}`);
      setJobs(res.data.jobs || []);
    } catch (error) {
      setJobs([]);
    } finally {
      setJobsLoading(false);
    }
  };

  useEffect(() => {
    if (employerId) {
      fetchEmployerJobs();
    }
  }, [employerId]);

  const company = publicEmployer;

  const companyName = company?.companyName || "Company";
  const companyLogo =
    company?.companyLogo?.url ||
    `https://ui-avatars.com/api/?name=${companyName}&background=0148D6&color=fff`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-slate-900 overflow-x-hidden relative">
      {/* ✅ Blue Glow Background */}
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
            Company Profile
          </div>
        </div>
      </header>

      {/* ✅ Content */}
      <main className="px-4 pb-20 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto space-y-6"
        >
          {/* ✅ Back */}
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all"
          >
            <ArrowLeft size={18} />
            Back to Jobs
          </Link>

          {/* ✅ Loading employer profile */}
          {loading && (
            <div className="flex justify-center items-center gap-2 py-8 text-slate-600 font-bold">
              <Loader2 className="animate-spin" size={18} />
              Loading company profile...
            </div>
          )}

          {/* ✅ Not Found */}
          {!loading && !company && (
            <div className="bg-white border border-slate-100 rounded-3xl shadow-xl shadow-blue-900/5 p-8 text-center">
              <p className="text-lg font-black text-slate-900">
                Company profile not found 😅
              </p>
              <p className="text-slate-500 mt-2 font-medium">
                This employer profile does not exist or is not public.
              </p>
            </div>
          )}

          {/* ✅ Employer Profile */}
          {!loading && company && (
            <>
              {/* ✅ Company Header Card */}
              <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-10 shadow-2xl shadow-blue-900/10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Left */}
                  <div className="flex items-start gap-4">
                    {/* Logo */}
                    <div className="w-20 h-20 rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                      <img
                        src={companyLogo}
                        alt="logo"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
                        {company?.companyName}
                      </h1>

                      <div className="flex flex-wrap gap-3 mt-4 text-sm font-bold text-slate-600">
                        {company?.industry && (
                          <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200">
                            <Building2 size={16} className="text-blue-600" />
                            {company?.industry}
                          </span>
                        )}

                        {company?.location && (
                          <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200">
                            <MapPin size={16} className="text-blue-600" />
                            {company?.location}
                          </span>
                        )}

                        <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700">
                          <Users size={16} />
                          Verified Company
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    {company?.companyWebsite ? (
                      <a
                        href={company.companyWebsite}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                      >
                        <Globe size={18} />
                        Visit Website
                      </a>
                    ) : (
                      <button
                        disabled
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-slate-100 border border-slate-200 text-slate-400 font-bold cursor-not-allowed"
                      >
                        <Globe size={18} />
                        No Website
                      </button>
                    )}

                    <button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all">
                      <Briefcase size={18} className="text-blue-600" />
                      Follow Company
                    </button>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-8">
                  <h2 className="text-lg font-black text-slate-900">
                    About Company
                  </h2>
                  <p className="mt-3 text-slate-600 font-medium leading-relaxed">
                    {company?.companyDescription || "No description available."}
                  </p>
                </div>
              </div>

              {/* ✅ Active Jobs (DB) */}
              <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-10 shadow-2xl shadow-blue-900/5">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-xl font-black text-slate-900">
                    Active Jobs ({jobs.length})
                  </h2>

                  <span className="text-sm font-bold text-slate-500">
                    Updated recently
                  </span>
                </div>

                {/* ✅ Loading jobs */}
                {jobsLoading && (
                  <div className="flex justify-center items-center gap-2 py-6 text-slate-600 font-bold">
                    <Loader2 className="animate-spin" size={18} />
                    Loading jobs...
                  </div>
                )}

                {/* ✅ Empty jobs */}
                {!jobsLoading && jobs.length === 0 && (
                  <div className="mt-6 p-6 rounded-3xl bg-slate-50 border border-slate-200 text-center">
                    <p className="text-slate-800 font-black">
                      No jobs posted yet 😅
                    </p>
                    <p className="text-slate-500 font-medium mt-1">
                      This company has not posted any active jobs.
                    </p>
                  </div>
                )}

                {/* ✅ Jobs list */}
                {!jobsLoading && jobs.length > 0 && (
                  <div className="mt-6 space-y-4">
                    {jobs.map((job) => (
                      <div
                        key={job._id}
                        className="p-5 rounded-3xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-lg transition-all"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-black text-slate-900">
                              {job?.title}
                            </h3>

                            <div className="flex flex-wrap gap-2 mt-3">
                              {job?.location && (
                                <span className="px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 text-sm font-bold flex items-center gap-2">
                                  <MapPin size={16} className="text-blue-600" />
                                  {job.location}
                                </span>
                              )}

                              {job?.jobType && (
                                <span className="px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 text-sm font-bold flex items-center gap-2">
                                  <Briefcase
                                    size={16}
                                    className="text-blue-600"
                                  />
                                  {job.jobType}
                                </span>
                              )}
                            </div>
                          </div>

                          <Link
                            to={`/jobs/${job._id}`}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                          >
                            View Job <ArrowRight size={18} />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default EmployerPublicProfile;
