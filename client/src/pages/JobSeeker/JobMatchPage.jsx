import React, { useRef, useState } from "react";
import api from "../../api/axios";
import { CloudUpload } from "lucide-react";

export default function JobMatchPage() {
  const inputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  const analysis = data?.analysis;

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.type !== "application/pdf") {
      setError("Please upload a PDF resume only.");
      setFile(null);
      return;
    }

    setFile(selected);
    setError("");
    setData(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (!droppedFile) return;

    if (droppedFile.type !== "application/pdf") {
      setError("Please upload a PDF resume only.");
      setFile(null);
      return;
    }

    setFile(droppedFile);
    setError("");
    setData(null);
  };

  const handleAnalyzeJobMatch = async () => {
    if (!file) {
      setError("Please upload your resume (PDF).");
      return;
    }

    if (!jobDescription || jobDescription.trim().length < 30) {
      setError(
        "Please paste a proper job description (minimum 30 characters).",
      );
      return;
    }

    setLoading(true);
    setError("");
    setData(null);

    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobDescription", jobDescription);

      // ✅ Backend call (change route if needed)
      const res = await api.post("/api/ai/job-match", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const result = res.data;

      if (!result?.success) {
        throw new Error(result?.message || "Job match analysis failed.");
      }

      setData(result);
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "Something went wrong!",
      );
    } finally {
      setLoading(false);
    }
  };

  const getVerdictBadge = (verdict) => {
    switch (verdict) {
      case "Strong Match":
        return "bg-green-50 text-green-700 border-green-100";
      case "Good Match":
        return "bg-blue-50 text-blue-700 border-blue-100";
      case "Average Match":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "Weak Match":
        return "bg-rose-50 text-rose-700 border-rose-100";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* TOP HEADER */}
      <div className="max-w-6xl mx-auto px-4 pt-10 pb-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-100 bg-blue-50 text-blue-600 text-sm font-semibold">
          ⚡ AI Job Match is live
        </div>

        <h1 className="mt-6 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
          Match Your <span className="text-blue-600">Resume</span> to Any Job
        </h1>

        <p className="mt-3 text-slate-500 max-w-2xl mx-auto text-base md:text-lg">
          Upload your resume and paste job description to get a{" "}
          <span className="font-semibold">match score</span>,{" "}
          <span className="font-semibold">missing skills</span>, and{" "}
          <span className="font-semibold">exact improvements</span>.
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-4 pb-14 space-y-6">
        {/* INPUT CARD */}
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 md:p-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Upload Resume + Paste Job Description
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                We will compare your resume with the JD and generate an AI match
                report.
              </p>
            </div>

            <button
              onClick={handleAnalyzeJobMatch}
              disabled={loading}
              className={`inline-flex items-center justify-center px-6 py-3 rounded-2xl font-semibold shadow-md transition
                ${
                  loading
                    ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
            >
              {loading ? "Matching..." : "Check Job Match"}
            </button>
          </div>

          {/* BIG UPLOAD AREA */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Resume Upload */}
            <div className="lg:col-span-5">
              <input
                ref={inputRef}
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />

              <div
                onClick={() => inputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="cursor-pointer rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-slate-100 transition p-8 md:p-10 h-full"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="h-14 w-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl shadow-md">
                    <CloudUpload />
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-slate-900">
                    Upload Resume (PDF)
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Click to upload or{" "}
                    <span className="font-semibold">drag & drop</span>
                  </p>

                  {file && (
                    <div className="mt-5 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 flex items-center justify-between gap-3">
                      <div className="min-w-0 text-left">
                        <p className="text-sm font-bold text-slate-900 truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {(file.size / 1024 / 1024).toFixed(2)} MB • PDF
                        </p>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setFile(null);
                          setData(null);
                          setError("");
                        }}
                        className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-7 h-full">
                <h3 className="text-lg font-bold text-slate-900">
                  Job Description
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Paste the JD text here (minimum{" "}
                  <span className="font-semibold">30 characters</span>).
                </p>

                <textarea
                  value={jobDescription}
                  onChange={(e) => {
                    setJobDescription(e.target.value);
                    setError("");
                    setData(null);
                  }}
                  placeholder="Paste job description here..."
                  className="mt-4 w-full min-h-[220px] rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-blue-200"
                />

                <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                  <span>
                    Characters:{" "}
                    <span className="font-semibold text-slate-700">
                      {jobDescription.length}
                    </span>
                  </span>
                  <span>
                    Tip: Add full responsibilities + requirements for best
                    matching.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
              {error}
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          )}
        </div>

        {/* OUTPUT SECTION */}
        {data && analysis && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* LEFT */}
            <div className="lg:col-span-4 space-y-6">
              {/* Match Score */}
              <Card>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Match Score
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Resume vs Job Description
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full border text-xs font-bold ${getVerdictBadge(
                      analysis.verdict,
                    )}`}
                  >
                    {analysis.verdict}
                  </span>
                </div>

                <div className="mt-5 flex items-center gap-4">
                  <div className="h-20 w-20 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                    <span className="text-3xl font-extrabold text-slate-900">
                      {analysis.match_score}
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="h-3 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                      <div
                        className="h-full bg-blue-600"
                        style={{
                          width: `${Math.min(100, analysis.match_score)}%`,
                        }}
                      />
                    </div>

                    <p className="text-xs text-slate-500 mt-2">
                      Improve keywords + skills to increase match.
                    </p>
                  </div>
                </div>
              </Card>

              <ChipCard
                title="Matched Skills"
                subtitle="Skills found in both Resume + JD"
                badge="MATCHED"
                chips={analysis.matched_skills || []}
                badgeClass="bg-green-50 text-green-700 border-green-100"
              />

              <ChipCard
                title="Missing Skills"
                subtitle="Important skills required by JD"
                badge="MISSING"
                chips={analysis.missing_skills || []}
                badgeClass="bg-rose-50 text-rose-700 border-rose-100"
              />

              <ChipCard
                title="Missing Keywords"
                subtitle="ATS-friendly words you should add"
                badge="KEYWORDS"
                chips={analysis.missing_keywords || []}
                badgeClass="bg-amber-50 text-amber-700 border-amber-100"
              />
            </div>

            {/* RIGHT */}
            <div className="lg:col-span-8 space-y-6">
              <ListCard
                title="Experience Gap"
                subtitle="What is lacking for this job role"
                badge="GAP"
                items={analysis.experience_gap || []}
                badgeClass="bg-slate-50 text-slate-700 border-slate-200"
                emptyText="No major experience gap found ✅"
              />

              <ListCard
                title="Resume Improvements"
                subtitle="Actionable changes for THIS job"
                badge="IMPROVE"
                items={analysis.resume_improvements || []}
                badgeClass="bg-blue-50 text-blue-700 border-blue-100"
              />

              <Card>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Final Summary
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      Short and clear conclusion
                    </p>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold">
                    SUMMARY
                  </span>
                </div>

                <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                  <p className="text-sm text-slate-800 font-semibold leading-relaxed">
                    {analysis.final_summary}
                  </p>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- UI Components ---------------- */

function Card({ children }) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6">
      {children}
    </div>
  );
}

function ListCard({
  title,
  subtitle,
  badge,
  items,
  badgeClass,
  emptyText = "No data found.",
}) {
  const hasItems = items && items.length > 0;

  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">{title}</h2>
          <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
        </div>

        <span
          className={`px-3 py-1 rounded-full border text-xs font-bold ${badgeClass}`}
        >
          {badge}
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {hasItems ? (
          items.map((text, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
            >
              <p className="text-sm text-slate-800">
                <span className="font-bold text-blue-600 mr-2">{idx + 1}.</span>
                <span className="font-semibold">{text}</span>
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500 font-semibold">{emptyText}</p>
        )}
      </div>
    </Card>
  );
}

function ChipCard({ title, subtitle, badge, chips, badgeClass }) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">{title}</h2>
          <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
        </div>

        <span
          className={`px-3 py-1 rounded-full border text-xs font-bold ${badgeClass}`}
        >
          {badge}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {chips?.length ? (
          chips.map((chip, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-700 text-xs font-semibold"
            >
              {chip}
            </span>
          ))
        ) : (
          <p className="text-sm text-slate-500 font-semibold">
            No items found.
          </p>
        )}
      </div>
    </Card>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 animate-pulse">
      <div className="h-5 w-36 bg-slate-200 rounded-md" />
      <div className="h-4 w-52 bg-slate-100 rounded-md mt-3" />
      <div className="h-3 w-full bg-slate-100 rounded-md mt-6" />
      <div className="h-3 w-5/6 bg-slate-100 rounded-md mt-2" />
      <div className="h-3 w-4/6 bg-slate-100 rounded-md mt-2" />
    </div>
  );
}
