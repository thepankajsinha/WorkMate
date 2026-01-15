import { genAI } from "../config/gemeniClient.js";

export const generateJobDescriptionAI = async ({
  title,
  companyName,
  industry,
  experienceLevel,
  jobType,
  workMode,
}) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
Generate a professional, well-structured job description.

Company: ${companyName}
Industry: ${industry || "General"}
Job Title: ${title}
Experience Level: ${experienceLevel || "Any"}
Job Type: ${jobType || "Full-Time"}
Work Mode: ${workMode || "Onsite"}

Write in 2–3 short paragraphs describing the company, role, responsibilities, and what makes this opportunity attractive.
Avoid repetition and use a formal but engaging tone.
`;

    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.error("Gemini description generation error:", error);
    return "Error generating job description. Please write it manually.";
  }
};


export const generateJobRequirementsAI = async ({
  title,
  companyName,
  industry,
  experienceLevel,
}) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
Generate a clear, professional list of 6–10 job requirements for the role below.

Company: ${companyName}
Industry: ${industry || "General"}
Job Title: ${title}
Experience Level: ${experienceLevel || "Any"}

Return a single formatted text block with bullet points (• or -), suitable for direct display in a job post.
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    // ✅ Return directly as a string (no array conversion)
    return text;
  } catch (error) {
    console.error("Gemini requirements generation error:", error);
    return "Error generating job requirements. Please write them manually.";
  }
};


export const generateAICoverLetter = async ({ title, description, bio, skills }) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
Write a short, personalized, and professional cover letter (under 200 words)
for the position of "${title}".

Job Description:
${description || "No description provided."}

Candidate Profile:
Bio: ${bio || "Not provided"}
Skills: ${(skills && skills.length > 0) ? skills.join(", ") : "Not provided"}

Tone: Confident, natural, and enthusiastic.
`;

    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.error("AI Cover Letter Error:", error.message);
    return "Unable to generate AI cover letter. Please write one manually.";
  }
};