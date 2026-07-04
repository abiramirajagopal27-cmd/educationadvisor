import React, { useState } from "react";
import { 
  Award, 
  BookOpen, 
  CheckCircle, 
  HelpCircle, 
  ChevronRight, 
  Sparkles, 
  Loader2, 
  AlertTriangle,
  Search,
  CheckCircle2
} from "lucide-react";
import { EXAM_GUIDES, SCHOLARSHIP_GUIDES, ExamGuide, ScholarshipGuide } from "../data";

interface ExamScholarshipDeskProps {
  onAskDeskQuestion: (prompt: string) => Promise<string>;
  darkMode: boolean;
}

export default function ExamScholarshipDesk({ onAskDeskQuestion, darkMode }: ExamScholarshipDeskProps) {
  const [activeSubTab, setActiveSubTab] = useState<"exams" | "scholarships">("exams");
  const [selectedExam, setSelectedExam] = useState<ExamGuide | null>(EXAM_GUIDES[0]);
  const [selectedScholarship, setSelectedScholarship] = useState<ScholarshipGuide | null>(SCHOLARSHIP_GUIDES[0]);
  
  const [customQuery, setCustomQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleAskQuestion = async (topicName: string, type: string) => {
    setIsLoading(true);
    setResponse(null);

    const compiledPrompt = `You are a professional Academic Counselor and Scholarship Advisor.
Please provide deep, practical guidance regarding:
- Topic of inquiry: ${topicName} (${type})
- Custom prompt / context: ${customQuery || `Provide a detailed syllabus review, preparation strategy, and recommended study calendar for ${topicName}.`}

Please cover:
1. OVERVIEW & EXAM PATTERN (Breakdown of phases, marks, and timing)
2. ELIGIBILITY DETAILS (Age, nationality, and qualifications required)
3. PHASED STUDY STRATEGY (Month-by-month study recommendations)
4. RECOMMENDED ADVANCED TEXTBOOKS & WEB RESOURCES (Specifically mentioning official websites)

CRITICAL: Include the mandatory disclaimer at the end:
"Please verify the latest eligibility, admission, or recruitment details from the official website."`;

    try {
      const result = await onAskDeskQuestion(compiledPrompt);
      setResponse(result);
    } catch (e) {
      alert("Failed to retrieve guidance. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuery.trim()) return;
    const activeName = activeSubTab === "exams" ? selectedExam?.name : selectedScholarship?.name;
    handleAskQuestion(activeName || "Academic Goals", activeSubTab);
  };

  return (
    <div className="max-w-4xl mx-auto p-5 md:p-8 space-y-6 animate-fade-in">
      {/* Title Header */}
      <div className={`p-6 rounded-3xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
        darkMode ? "bg-slate-900/40 border-slate-800" : "bg-white border-blue-100/70 shadow-md shadow-blue-900/5"
      }`}>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Award className="w-5.5 h-5.5 text-blue-600 dark:text-blue-400" />
            <h2 className="font-display font-bold text-xl leading-tight">Exams & Scholarships Advisory Desk</h2>
          </div>
          <p className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
            Access pre-compiled exam matrices, government schemes, and merit aids, or ask the AI custom questions about any competitive exams.
          </p>
        </div>
      </div>

      {/* Selector SubTabs */}
      <div className="flex border-b dark:border-slate-800 border-slate-200">
        <button
          onClick={() => {
            setActiveSubTab("exams");
            setResponse(null);
          }}
          className={`px-5 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeSubTab === "exams"
              ? "border-blue-600 text-blue-650 dark:text-blue-400"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
          }`}
        >
          Competitive Exam Guidance
        </button>
        <button
          onClick={() => {
            setActiveSubTab("scholarships");
            setResponse(null);
          }}
          className={`px-5 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeSubTab === "scholarships"
              ? "border-blue-600 text-blue-650 dark:text-blue-400"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
          }`}
        >
          Scholarship Advisor
        </button>
      </div>

      {/* Layout Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Side Quick Menu Selection */}
        <div className="md:col-span-4 space-y-2">
          <p className={`text-[10px] font-bold uppercase tracking-wider ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
            {activeSubTab === "exams" ? "Select Exam" : "Select Scholarship"}
          </p>
          
          <div className="space-y-1.5 max-h-[380px] overflow-y-auto scrollbar-thin">
            {activeSubTab === "exams" ? (
              EXAM_GUIDES.map((exam) => (
                <button
                   key={exam.name}
                   onClick={() => {
                     setSelectedExam(exam);
                     setResponse(null);
                   }}
                   className={`w-full text-left p-3.5 rounded-2xl text-xs font-semibold flex items-center justify-between border transition-all cursor-pointer ${
                     selectedExam?.name === exam.name
                       ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/10"
                       : darkMode
                         ? "bg-slate-900/30 border-slate-800/80 hover:bg-slate-900 text-slate-300"
                         : "bg-white border-slate-100 hover:bg-blue-50/10 text-slate-750 shadow-sm"
                   }`}
                >
                  <span className="truncate pr-2">{exam.name}</span>
                  <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                </button>
              ))
            ) : (
              SCHOLARSHIP_GUIDES.map((sch) => (
                <button
                   key={sch.name}
                   onClick={() => {
                     setSelectedScholarship(sch);
                     setResponse(null);
                   }}
                   className={`w-full text-left p-3.5 rounded-2xl text-xs font-semibold flex items-center justify-between border transition-all cursor-pointer ${
                     selectedScholarship?.name === sch.name
                       ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/10"
                       : darkMode
                         ? "bg-slate-900/30 border-slate-800/80 hover:bg-slate-900 text-slate-300"
                         : "bg-white border-slate-100 hover:bg-blue-50/10 text-slate-750 shadow-sm"
                   }`}
                >
                  <span className="truncate pr-2">{sch.name}</span>
                  <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                </button>
              ))
            )}
          </div>
        </div>

        {/* Right Side Details view */}
        <div className="md:col-span-8">
          {activeSubTab === "exams" && selectedExam && (
            <div className={`p-6 rounded-[2rem] border space-y-5 ${
              darkMode ? "bg-slate-900/20 border-slate-800 text-slate-300" : "bg-white border-blue-100/70 text-slate-800 shadow-md shadow-blue-900/5"
            }`}>
              <div>
                <h3 className="font-display font-bold text-base text-blue-600 dark:text-blue-400">{selectedExam.name}</h3>
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md ${
                  darkMode ? "bg-slate-800 text-slate-400" : "bg-slate-100 text-slate-500"
                }`}>
                  Category: {selectedExam.category}
                </span>
              </div>

              <div className="space-y-4 text-xs md:text-sm">
                <div>
                  <h4 className="font-bold text-slate-950 dark:text-slate-100">Eligibility Criteria:</h4>
                  <p className="mt-0.5 leading-relaxed text-slate-500 dark:text-slate-400">{selectedExam.eligibility}</p>
                </div>
                
                <div>
                  <h4 className="font-bold text-slate-950 dark:text-slate-100">Exam Pattern Outline:</h4>
                  <p className="mt-0.5 leading-relaxed text-slate-500 dark:text-slate-400">{selectedExam.pattern}</p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-950 dark:text-slate-100">Preparation Strategy:</h4>
                  <p className="mt-0.5 leading-relaxed text-slate-500 dark:text-slate-400">{selectedExam.strategy}</p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-950 dark:text-slate-100">Recommended Reference Resources:</h4>
                  <ul className="list-disc pl-4 mt-1 space-y-1 text-slate-500 dark:text-slate-400">
                    {selectedExam.resources.map((res, i) => (
                      <li key={i}>{res}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Instant Advisory Desk Query */}
              <div className="border-t pt-4 dark:border-slate-850 space-y-3">
                <form onSubmit={handleSearchSubmit} className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    Struggling with preparation? Ask AI a custom question
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customQuery}
                      onChange={(e) => setCustomQuery(e.target.value)}
                      placeholder={`e.g. Give me a 3-month timeline study calendar for ${selectedExam.name}...`}
                      className={`flex-1 p-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 ${
                        darkMode ? "bg-slate-950 border-slate-850 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-700"
                      }`}
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer disabled:opacity-50"
                    >
                      {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                      <span>Consult Advisor</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeSubTab === "scholarships" && selectedScholarship && (
            <div className={`p-6 rounded-[2rem] border space-y-5 ${
              darkMode ? "bg-slate-900/20 border-slate-800 text-slate-300" : "bg-white border-blue-100/70 text-slate-800 shadow-md shadow-blue-900/5"
            }`}>
              <div>
                <h3 className="font-display font-bold text-base text-blue-600 dark:text-blue-400">{selectedScholarship.name}</h3>
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md ${
                  darkMode ? "bg-slate-800 text-slate-400" : "bg-slate-100 text-slate-500"
                }`}>
                  Type: {selectedScholarship.type}
                </span>
              </div>

              <div className="space-y-4 text-xs md:text-sm">
                <div>
                  <h4 className="font-bold text-slate-950 dark:text-slate-100">Target Eligibility:</h4>
                  <p className="mt-0.5 leading-relaxed text-slate-500 dark:text-slate-400">{selectedScholarship.eligibility}</p>
                </div>
                
                <div>
                  <h4 className="font-bold text-slate-950 dark:text-slate-100">Grant Benefits & Tuition Support:</h4>
                  <p className="mt-0.5 leading-relaxed text-slate-500 dark:text-slate-400">{selectedScholarship.benefit}</p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-950 dark:text-slate-100">Step-by-step Application Guide:</h4>
                  <p className="mt-0.5 leading-relaxed text-slate-500 dark:text-slate-400">{selectedScholarship.actionSteps}</p>
                </div>
              </div>

              {/* Instant Advisory Desk Query */}
              <div className="border-t pt-4 dark:border-slate-850 space-y-3">
                <form onSubmit={handleSearchSubmit} className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    Need eligibility advice? Ask AI Advisor
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customQuery}
                      onChange={(e) => setCustomQuery(e.target.value)}
                      placeholder={`e.g. What documents are needed to apply for ${selectedScholarship.name}?`}
                      className={`flex-1 p-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 ${
                        darkMode ? "bg-slate-950 border-slate-850 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-700"
                      }`}
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer disabled:opacity-50"
                    >
                      {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                      <span>Consult Advisor</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Loading desk spinner */}
      {isLoading && (
        <div className={`p-8 rounded-3xl border text-center space-y-3 ${
          darkMode ? "bg-slate-900/30 border-slate-800" : "bg-white border-blue-100/75 shadow-sm"
        }`}>
          <Loader2 className="w-6 h-6 animate-spin text-blue-600 mx-auto" />
          <p className="text-xs">Consulting academic counselor databases...</p>
        </div>
      )}

      {/* AI advisor output report */}
      {response && !isLoading && (
        <div className="space-y-4 animate-fade-in">
          <div className={`p-4 rounded-2xl border text-xs font-semibold flex items-center gap-2 ${
            darkMode ? "bg-slate-900 border-slate-800 text-slate-300" : "bg-blue-50/20 border-blue-100/50 text-blue-700 shadow-sm"
          }`}>
            <CheckCircle2 className="w-4.5 h-4.5" />
            <span>AI custom advisory report compiled successfully.</span>
          </div>
          
          <div className={`p-6 md:p-8 rounded-[2rem] border space-y-6 whitespace-pre-wrap leading-relaxed shadow-sm ${
            darkMode ? "bg-slate-900/20 border-slate-800 text-slate-200" : "bg-white border-blue-100/80 text-slate-800 shadow-blue-900/5"
          }`}>
            {response}
          </div>
        </div>
      )}

      {/* General Official reminder */}
      <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
        darkMode ? "bg-slate-900/50 border-slate-850" : "bg-amber-50/30 border-amber-100"
      }`}>
        <AlertTriangle className="w-4.5 h-4.5 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal">
          <strong>Mandatory Verification Disclaimer:</strong> All exams, schedules, syllabi, eligibility and scholarship programs depend heavily on official regulatory boards, state government policy, and academic guidelines. Always verify the latest official information and timelines directly from authorized portals before submitting applications.
        </p>
      </div>
    </div>
  );
}
