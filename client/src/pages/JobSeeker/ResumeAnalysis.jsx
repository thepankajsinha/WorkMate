import React, { useRef, useState } from "react";
import api from "../../api/axios";
import { CloudUpload } from "lucide-react";

export default function ResumeAnalyzerPage() {
  const inputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.type !== "application/pdf") {
      setError("Please upload a PDF file only.");
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
      setError("Please upload a PDF file only.");
      setFile(null);
      return;
    }

    setFile(droppedFile);
    setError("");
    setData(null);
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please upload your resume (PDF) first.");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      // ✅ Backend call using your axios instance
      const res = await api.post("/api/ai/resume-analysis", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const result = res.data;

      if (!result?.success) {
        throw new Error(result?.message || "Resume analysis failed.");
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

  const analysis = data?.analysis;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* TOP HEADER */}
      <div className="max-w-6xl mx-auto px-4 pt-10 pb-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-100 bg-blue-50 text-blue-600 text-sm font-semibold">
          ⚡ AI Resume Analyzer is live
        </div>

        <h1 className="mt-6 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
          Analyze Your <span className="text-blue-600">Resume</span> Instantly
        </h1>

        <p className="mt-3 text-slate-500 max-w-2xl mx-auto text-base md:text-lg">
          Upload your resume and get an{" "}
          <span className="font-semibold">ATS score</span>,{" "}
          <span className="font-semibold">missing keywords</span>, and{" "}
          <span className="font-semibold">improvements</span>.
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-4 pb-14">
        {/* UPLOAD CARD */}
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 md:p-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            {/* LEFT TEXT */}
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Upload Resume (PDF)
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Drag & drop your resume or click the upload area below.
              </p>
            </div>

            {/* RIGHT BUTTON */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className={`inline-flex items-center justify-center px-6 py-3 rounded-2xl font-semibold shadow-md transition
                  ${
                    loading
                      ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
              >
                {loading ? "Analyzing..." : "Analyze Resume"}
              </button>
            </div>
          </div>

          {/* ✅ BIG UPLOAD AREA */}
          <div className="mt-6">
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
              className="cursor-pointer rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-slate-100 transition p-8 md:p-10"
            >
              <div className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl shadow-md">
                  <CloudUpload />
                </div>

                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  Click to upload or drag & drop
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Only <span className="font-semibold">PDF</span> supported •
                  Max recommended size{" "}
                  <span className="font-semibold">10MB</span>
                </p>

                {file && (
                  <div className="mt-5 w-full max-w-xl rounded-2xl border border-slate-200 bg-white px-4 py-3 flex items-center justify-between gap-3">
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

          {/* Error */}
          {error && (
            <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
              {error}
            </div>
          )}

          {/* Loading Skeleton */}
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
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* LEFT */}
            <div className="lg:col-span-4 space-y-6">
              {/* ATS Score */}
              <Card>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      ATS Score
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Your resume compatibility score
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-xs font-bold">
                    SCORE
                  </span>
                </div>

                <div className="mt-5 flex items-center gap-4">
                  <div className="h-20 w-20 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                    <span className="text-3xl font-extrabold text-slate-900">
                      {analysis.ats_score}
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="h-3 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                      <div
                        className="h-full bg-blue-600"
                        style={{
                          width: `${Math.min(100, analysis.ats_score)}%`,
                        }}
                      />
                    </div>

                    <p className="text-xs text-slate-500 mt-2">
                      Tip: Add{" "}
                      <span className="font-semibold">missing keywords</span> to
                      boost score.
                    </p>
                  </div>
                </div>
              </Card>

              <ListCard
                title="Missing Keywords"
                subtitle="Important terms missing in your resume"
                badge="KEYWORDS"
                items={analysis.missing_keywords}
                badgeClass="bg-amber-50 text-amber-700 border-amber-100"
              />

              <ListCard
                title="Suggestions"
                subtitle="Recommended improvements"
                badge="IMPROVE"
                items={analysis.suggestions}
                badgeClass="bg-blue-50 text-blue-700 border-blue-100"
              />
            </div>

            {/* RIGHT */}
            <div className="lg:col-span-8 space-y-6">
              <ListCard
                title="Strengths"
                subtitle="Your resume is strong in these areas"
                badge="GOOD"
                items={analysis.strengths}
                badgeClass="bg-green-50 text-green-700 border-green-100"
              />

              <ListCard
                title="Weaknesses"
                subtitle="Fix these points to improve ATS score"
                badge="FIX"
                items={analysis.weaknesses}
                badgeClass="bg-rose-50 text-rose-700 border-rose-100"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------ UI COMPONENTS ------------------ */

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
  badgeClass = "bg-slate-50 text-slate-700 border-slate-200",
}) {
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
        {items?.length ? (
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
          <p className="text-sm text-slate-500 font-semibold">
            No results found.
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
