import pdf from "pdf-extraction";
import { genAI } from "../config/gemeniClient.js";

export const analyzeResumeATS = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Resume PDF is required" });
    }

    // ✅ pdf-extraction expects: { data: Buffer }
    const pdfData = await pdf({ data: req.file.buffer });
    const resumeText = pdfData.text;

    if (!resumeText || resumeText.trim().length < 50) {
      return res.status(400).json({
        success: false,
        message: "Could not extract enough text from the resume PDF",
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
You are an ATS (Applicant Tracking System) Resume Analyzer.

Analyze the following resume text and return output in STRICT JSON ONLY (no markdown, no explanation).

Resume Text:
"""
${resumeText}
"""

Your response MUST be in this JSON format:

{
  "ats_score": number (0-100),
  "strengths": [string],
  "weaknesses": [string],
  "missing_keywords": [string],
  "suggestions": [string]
}

Rules:
- ats_score must be realistic
- missing_keywords should include important ATS-friendly skill words
- suggestions must be actionable and resume-focused
- return ONLY JSON
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // ✅ handle possible ```json ``` wrapping
    const cleanText = responseText.replace(/```json|```/g, "").trim();

    let parsedResult;
    try {
      parsedResult = JSON.parse(cleanText);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Gemini returned invalid JSON",
        raw: responseText,
      });
    }

    return res.status(200).json({
      success: true,
      resumeTextPreview: resumeText.substring(0, 500),
      analysis: parsedResult,
    });
  } catch (error) {
    console.error("ATS Resume Analyzer Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};


export const analyzeJobMatch = async (req, res) => {
  try {
    const { jobDescription } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume PDF is required",
      });
    }

    if (!jobDescription || jobDescription.trim().length < 30) {
      return res.status(400).json({
        success: false,
        message: "Job description text is required",
      });
    }

    // ✅ Extract resume text from PDF
    const pdfData = await pdf({ data: req.file.buffer });
    const resumeText = pdfData.text;

    if (!resumeText || resumeText.trim().length < 50) {
      return res.status(400).json({
        success: false,
        message: "Could not extract enough text from the resume PDF",
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      You are an AI Job Matching System.

      Your task:
      Compare the RESUME with the JOB DESCRIPTION and return a job match analysis.

      Return output in STRICT JSON ONLY (no markdown, no explanation).

      Resume Text:
      """
      ${resumeText}
      """

      Job Description:
      """
      ${jobDescription}
      """

      Your response MUST follow this JSON format:

      {
        "match_score": number (0-100),
        "verdict": "Strong Match" | "Good Match" | "Average Match" | "Weak Match",
        "matched_skills": [string],
        "missing_skills": [string],
        "missing_keywords": [string],
        "experience_gap": [string],
        "resume_improvements": [string],
        "final_summary": string
      }

      Rules:
      - match_score must be realistic
      - matched_skills should include skills found in BOTH resume + job description
      - missing_skills should include important job-required skills not found in resume
      - missing_keywords should include ATS-friendly words (tools, tech, role keywords)
      - experience_gap should explain what is lacking (projects/domain/years/tools)
      - resume_improvements must be actionable for THIS job role
      - final_summary should be short and clear
      - return ONLY JSON
      `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // ✅ remove ```json wrappers if Gemini returns them
    const cleanText = responseText.replace(/```json|```/g, "").trim();

    let parsedResult;
    try {
      parsedResult = JSON.parse(cleanText);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Gemini returned invalid JSON",
        raw: responseText,
      });
    }

    return res.status(200).json({
      success: true,
      resumeTextPreview: resumeText.substring(0, 500),
      jobDescriptionPreview: jobDescription.substring(0, 500),
      analysis: parsedResult,
    });
  } catch (error) {
    console.error("AI Job Match Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

