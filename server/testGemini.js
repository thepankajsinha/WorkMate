import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const run = async () => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(
      "Say Hello from Gemini 2.0 Flash!"
    );
    console.log(result.response.text());
  } catch (err) {
    console.error("Gemini error:", err.message || err);
  }
};


run();
