import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware - set a higher payload limit for file uploads (PDF/Images)
  app.use(express.json({ limit: "25mb" }));

  // Initialize Gemini API client
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({
    apiKey: apiKey || "MOCK_KEY", // handle case if key is missing during startup build
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API endpoint for general career advisory chat
  app.post("/api/advisor/chat", async (req, res) => {
    try {
      if (!process.env.GEMINI_API_KEY) {
        return res.status(400).json({ 
          error: "GEMINI_API_KEY is not configured. Please set it in the Secrets panel in AI Studio." 
        });
      }

      const { message, history, language, file } = req.body;
      
      // Build conversation contents array
      const contents: any[] = [];
      
      // Map history to the Gemini API structure
      if (history && Array.isArray(history)) {
        for (const msg of history) {
          contents.push({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.content }]
          });
        }
      }

      // Add the current user query along with an optional uploaded document
      const currentParts: any[] = [];
      
      if (file && file.data && file.mimeType) {
        currentParts.push({
          inlineData: {
            mimeType: file.mimeType,
            data: file.data // Base64 string without data:mimePrefix
          }
        });
      }
      
      currentParts.push({ text: message || "Analyze the uploaded document and guide me." });
      
      contents.push({
        role: "user",
        parts: currentParts
      });

      // Language configuration instruction
      let langInstruction = "";
      if (language && language !== "auto") {
        langInstruction = ` Respond ALWAYS and entirely in the language: ${language}.`;
      } else {
        langInstruction = ` Automatically detect the user's language and respond entirely in that same language.`;
      }

      // Call the Gemini API
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: `You are an expert Career and Education Advisor.${langInstruction}
Provide practical, personalized, easy-to-understand advice. Use simple language.
Recommend suitable careers based on the user's interests, education, skills, and goals.
Explain every recommendation step-by-step.
Keep answers short, highly readable, structured, and use numbered or bulleted points where appropriate.
Include actionable next steps.
If information depends on country, university, employer, or government policy, clearly mention that users should verify the latest official information.
If unsure, say so honestly instead of guessing.

CRITICAL formatting and content rules:
1. Treat every recommendation as guidance, not a guaranteed admission, scholarship, or job offer.
2. When recommending colleges, degrees, jobs, certifications, scholarships, or exams, you MUST ALWAYS include this disclaimer at the end of your response:
"Please verify the latest eligibility, admission, or recruitment details from the official website."`,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API error:", error);
      res.status(500).json({ error: error.message || "An error occurred during advisor processing." });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
