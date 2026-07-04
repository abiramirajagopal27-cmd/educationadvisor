import React, { useState } from "react";
import { 
  Briefcase, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Loader2, 
  Smile, 
  Mic, 
  Video, 
  BookOpen, 
  Award,
  AlertCircle
} from "lucide-react";
import { STATIC_INTERVIEW_QUESTIONS } from "../data";

interface InterviewHubProps {
  onGenerateInterviewPrep: (prompt: string) => Promise<string>;
  darkMode: boolean;
}

export default function InterviewHub({ onGenerateInterviewPrep, darkMode }: InterviewHubProps) {
  const [targetRole, setTargetRole] = useState("");
  const [targetCompany, setTargetCompany] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [customQuestions, setCustomQuestions] = useState<string | null>(null);
  
  // Accordion state for static interview questions
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleGenerateCustom = async () => {
    if (!targetRole.trim()) {
      alert("Please enter a target job role or industry.");
      return;
    }

    setIsLoading(true);
    setCustomQuestions(null);

    const compiledPrompt = `You are an expert HR interviewer and technical recruitment screener.
Generate a tailored set of mock interview questions and detailed model answers for:
- Target Job Role / Sector: ${targetRole}
- Target Company / Level (if any): ${targetCompany || "Standard corporate level"}

Please provide:
1. Two Specialized Technical Questions (directly assessing skills needed for ${targetRole} with detailed code/concept answers)
2. Two Behavioral Situational Questions (structured to evaluate teamwork, adaptability, or stress management with answers mapped using the STAR framework)
3. One HR/Cultural Fit Question (assessing enthusiasm and alignment)
4. Confidence & Communication tips tailored Specifically to interviewing for this role.

Structure each question with bold headings, "Model Answer", "What the Interviewer is looking for", and "Tips". Keep formatting clean and highly readable.`;

    try {
      const result = await onGenerateInterviewPrep(compiledPrompt);
      setCustomQuestions(result);
    } catch (e) {
      alert("Failed to generate custom mock questions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-5 md:p-8 space-y-6">
      {/* Title Header */}
      <div className={`p-6 rounded-3xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
        darkMode ? "bg-slate-900/40 border-slate-800" : "bg-white border-blue-100/70 shadow-md shadow-blue-900/5"
      }`}>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5.5 h-5.5 text-blue-600 dark:text-blue-400" />
            <h2 className="font-display font-bold text-xl leading-tight">AI Interview Prep Lounge</h2>
          </div>
          <p className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
            Browse high-quality interview templates or enter a dream job role to generate custom mock questions and expert responses.
          </p>
        </div>
      </div>

      {/* Confidence & Communication boosters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Confidence tips */}
        <div className={`p-6 rounded-3xl border space-y-3 ${
          darkMode ? "bg-slate-900/20 border-slate-800" : "bg-blue-50/10 border-blue-100/30 shadow-md shadow-blue-900/5"
        }`}>
          <div className="flex items-center gap-2">
            <Smile className="w-4.5 h-4.5 text-blue-500" />
            <h4 className="font-display font-bold text-sm">Confidence & Vocal Mastery Tips</h4>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 list-disc pl-4 leading-relaxed">
            <li><strong>Speak in moderate cadence</strong>: Slowing down helps formulate logical structures and project competence.</li>
            <li><strong>Brief silent pauses</strong>: Pause for 2 seconds after a question is asked. This signals reflection, not hesitation.</li>
            <li><strong>Body language cues</strong>: Keep open palms, lean slightly forward, and smile briefly when introducing yourself.</li>
            <li><strong>Control anxiety</strong>: Use simple deep box breathing (inhale 4s, hold 4s, exhale 4s) before stepping in.</li>
          </ul>
        </div>

        {/* STAR framework guide */}
        <div className={`p-6 rounded-3xl border space-y-3 ${
          darkMode ? "bg-slate-900/20 border-slate-800" : "bg-emerald-50/10 border-emerald-100/30 shadow-md shadow-blue-900/5"
        }`}>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4.5 h-4.5 text-emerald-500" />
            <h4 className="font-display font-bold text-sm">How to use the STAR framework</h4>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 list-none pl-1 leading-relaxed">
            <li><strong>S - Situation</strong>: Briefly outline the context or project (e.g., "In my final year web project...").</li>
            <li><strong>T - Task</strong>: Define the direct challenge or role (e.g., "We needed to cut data lag by 50%...").</li>
            <li><strong>A - Action</strong>: Explain what YOU did (e.g., "I optimized SQL indexing and created caches...").</li>
            <li><strong>R - Result</strong>: Deliver the positive quantifiable result (e.g., "The loading time dropped to 1.2s!").</li>
          </ul>
        </div>
      </div>

      {/* Target Custom Simulator */}
      <div className={`p-6 md:p-8 rounded-[2rem] border space-y-5 ${
        darkMode ? "bg-slate-900/20 border-slate-800" : "bg-white border-blue-100/70 shadow-md shadow-blue-900/5"
      }`}>
        <div className="flex items-center gap-2 border-b pb-3 dark:border-slate-850">
          <Sparkles className="w-5 h-5 text-blue-500" />
          <h3 className="font-display font-bold text-sm">Custom Mock Interview Generator</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className={`text-sm font-semibold ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
              Enter Target Job Role or Industry Sector
            </label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g. Frontend Developer, Junior Accountant, HR Manager"
              className={`w-full p-3 rounded-xl border text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 ${
                darkMode ? "bg-slate-950 border-slate-850 text-slate-100" : "bg-slate-50 border-slate-200 text-slate-800"
              }`}
            />
          </div>

          <div className="space-y-2">
            <label className={`text-sm font-semibold ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
              Target Company / Scale (Optional)
            </label>
            <input
              type="text"
              value={targetCompany}
              onChange={(e) => setTargetCompany(e.target.value)}
              placeholder="e.g. Tech Start-up, Public sector bank, MNC"
              className={`w-full p-3 rounded-xl border text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 ${
                darkMode ? "bg-slate-950 border-slate-850 text-slate-100" : "bg-slate-50 border-slate-200 text-slate-800"
              }`}
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleGenerateCustom}
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-md shadow-blue-500/10 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating custom simulator...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Simulate Mock Questions</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Simulator custom results panel */}
      {isLoading && (
        <div className={`p-10 rounded-3xl border text-center space-y-4 ${
          darkMode ? "bg-slate-900/30 border-slate-800" : "bg-white border-blue-100/70 shadow-sm"
        }`}>
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
          <div>
            <h4 className="font-bold text-sm">Compiling technical & cultural screener questions...</h4>
            <p className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
              Retrieving common questions from past recruitment databases and generating model answers mapped to your target profile.
            </p>
          </div>
        </div>
      )}

      {customQuestions && !isLoading && (
        <div className="space-y-4 animate-fade-in">
          <div className={`p-4 rounded-2xl border text-xs font-semibold flex items-center gap-2 ${
            darkMode ? "bg-slate-900 border-slate-800 text-slate-300" : "bg-blue-50/20 border-blue-100/50 text-blue-700 shadow-sm"
          }`}>
            <Award className="w-4.5 h-4.5" />
            <span>Custom Mock Interview Guide generated successfully. Read the suggested solutions carefully.</span>
          </div>
          
          <div className={`p-6 md:p-8 rounded-[2rem] border space-y-6 whitespace-pre-wrap leading-relaxed shadow-sm ${
            darkMode ? "bg-slate-900/20 border-slate-800 text-slate-200" : "bg-white border-blue-100/80 text-slate-800 shadow-blue-900/5"
          }`}>
            {customQuestions}
          </div>
        </div>
      )}

      {/* Static Standard Questions Accordion */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-blue-500" />
          <h3 className="font-display font-bold text-base">Standard Interview Core Templates</h3>
        </div>

        <div className="space-y-3">
          {STATIC_INTERVIEW_QUESTIONS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                  isOpen 
                    ? darkMode 
                      ? "bg-slate-900/30 border-slate-750" 
                      : "bg-white border-blue-100 shadow-md shadow-blue-900/5"
                    : darkMode 
                      ? "bg-slate-900/10 border-slate-850 hover:border-slate-700" 
                      : "bg-white border-slate-100 hover:border-blue-100/60 shadow-sm"
                }`}
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 font-semibold text-sm cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] uppercase font-bold tracking-wider shrink-0 ${
                      item.type === "technical" 
                        ? "bg-blue-500/10 text-blue-500" 
                        : "bg-purple-500/10 text-purple-500"
                    }`}>
                      {item.type}
                    </span>
                    <span className="truncate pr-2">{item.question}</span>
                  </div>
                  {isOpen ? <ChevronUp className="w-4 h-4 shrink-0" /> : <ChevronDown className="w-4 h-4 shrink-0" />}
                </button>

                {/* Accordion Content */}
                {isOpen && (
                  <div className={`p-4 border-t text-xs md:text-sm space-y-4 leading-relaxed ${
                    darkMode ? "border-slate-800 bg-slate-950/40 text-slate-300" : "border-slate-100 bg-slate-50/50 text-slate-700"
                  }`}>
                    <div className="space-y-1.5">
                      <h5 className="font-bold text-slate-900 dark:text-slate-100 uppercase text-[10px] tracking-wider">
                        Evaluation Criteria & Tips
                      </h5>
                      <p>{item.tips}</p>
                    </div>

                    <div className="space-y-1.5 p-3.5 rounded-lg border dark:border-slate-850 dark:bg-slate-900 bg-white">
                      <h5 className="font-bold text-blue-600 dark:text-blue-400 uppercase text-[10px] tracking-wider">
                        Suggested Model Response
                      </h5>
                      <p className="italic">"{item.sampleAnswer}"</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
