import React, { useState } from "react";
import { 
  Calendar, 
  Clock, 
  BookOpen, 
  CheckCircle, 
  Loader2, 
  Sparkles, 
  Compass, 
  Smile,
  Copy,
  Plus
} from "lucide-react";
import { StudyPlanForm } from "../types";

interface StudyPlannerProps {
  onGeneratePlanner: (prompt: string) => Promise<string>;
  darkMode: boolean;
}

export default function StudyPlanner({ onGeneratePlanner, darkMode }: StudyPlannerProps) {
  const [form, setForm] = useState<StudyPlanForm>({
    goal: "",
    subjects: "",
    dailyHours: "4",
    timeline: "4 Weeks",
    preferences: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async () => {
    if (!form.goal.trim()) {
      alert("Please enter your study goal or target exam.");
      return;
    }

    setIsLoading(true);
    setPlan(null);

    const compiledPrompt = `Generate a highly personalized Daily and Weekly Study Plan, Exam Preparation Timetable, Revision Schedule, and Productivity tips.

PARAMETERS:
- Target Exam / Goal: ${form.goal}
- Subjects to cover: ${form.subjects || "Core curriculum subjects"}
- Available Daily Study Hours: ${form.dailyHours} Hours/Day
- Timeline / Days left: ${form.timeline}
- Custom Focus preferences: ${form.preferences || "None specified"}

Based on this, generate a structured, easy-to-follow timetable.
Format your response using bold headings, numbered time-slots, and clean lists:
1. DAILY TIMETABLE (Example hourly splits for a ${form.dailyHours}-hour session, including focus breaks using Pomodoro)
2. WEEKLY TOPIC MAP (A systematic distribution of core subjects over a typical week)
3. REVISION SCHEDULE & MILESTONES (Specific guidelines on when and how to do active recall reviews)
4. PRODUCTIVITY & MINDSET TIPS (Specifically optimized for intense test prep)

Ensure all tips are practical. Include the standard disclaimer to verify exact syllabus/patterns on official websites.`;

    try {
      const result = await onGeneratePlanner(compiledPrompt);
      setPlan(result);
    } catch (e) {
      alert("Failed to generate plan. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!plan) return;
    navigator.clipboard.writeText(plan);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-5 md:p-8 space-y-6">
      {/* Title Header */}
      <div className={`p-6 rounded-3xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
        darkMode ? "bg-slate-900/40 border-slate-800" : "bg-white border-blue-100/70 shadow-md shadow-blue-900/5"
      }`}>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Calendar className="w-5.5 h-5.5 text-blue-600 dark:text-blue-400" />
            <h2 className="font-display font-bold text-xl leading-tight">AI Personalized Study Planner</h2>
          </div>
          <p className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
            Input your upcoming exam, available hours, and timeline to receive a custom visual routine.
          </p>
        </div>
      </div>

      {/* Grid Inputs Form */}
      <div className={`p-6 md:p-8 rounded-[2rem] border space-y-5 ${
        darkMode ? "bg-slate-900/20 border-slate-800" : "bg-white border-blue-100/70 shadow-md shadow-blue-900/5"
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Goal Input */}
          <div className="space-y-2">
            <label className={`text-sm font-semibold ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
              What is your Target Exam or Learning Goal?
            </label>
            <input
              type="text"
              name="goal"
              value={form.goal}
              onChange={handleInputChange}
              placeholder="e.g. UPSC Prelims, Board Exams, NEET, Python Basics"
              className={`w-full p-3 rounded-xl border text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 ${
                darkMode ? "bg-slate-950 border-slate-850 text-slate-100" : "bg-slate-50 border-slate-200 text-slate-800"
              }`}
            />
          </div>

          {/* Subjects */}
          <div className="space-y-2">
            <label className={`text-sm font-semibold ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
              What specific subjects or topics do you need to cover?
            </label>
            <input
              type="text"
              name="subjects"
              value={form.subjects}
              onChange={handleInputChange}
              placeholder="e.g. History & Polity, Physics & Organic Chemistry, Quant"
              className={`w-full p-3 rounded-xl border text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 ${
                darkMode ? "bg-slate-950 border-slate-850 text-slate-100" : "bg-slate-50 border-slate-200 text-slate-800"
              }`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Daily Study Hours */}
          <div className="space-y-2">
            <label className={`text-sm font-semibold ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
              How many hours can you study per day?
            </label>
            <select
              name="dailyHours"
              value={form.dailyHours}
              onChange={handleInputChange}
              className={`w-full p-3 rounded-xl border text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 ${
                darkMode ? "bg-slate-950 border-slate-850 text-slate-100" : "bg-slate-50 border-slate-200 text-slate-800"
              }`}
            >
              <option value="2">2 Hours / Day (Light schedule)</option>
              <option value="4">4 Hours / Day (Moderate balance)</option>
              <option value="6">6 Hours / Day (Standard study routine)</option>
              <option value="8">8 Hours / Day (Intense exam mode)</option>
              <option value="10">10+ Hours / Day (Full-time civil service/medical)</option>
            </select>
          </div>

          {/* Timeline remaining */}
          <div className="space-y-2">
            <label className={`text-sm font-semibold ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
              How much prep time is left?
            </label>
            <input
              type="text"
              name="timeline"
              value={form.timeline}
              onChange={handleInputChange}
              placeholder="e.g. 2 Weeks, 30 Days, 6 Months"
              className={`w-full p-3 rounded-xl border text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 ${
                darkMode ? "bg-slate-950 border-slate-850 text-slate-100" : "bg-slate-50 border-slate-200 text-slate-800"
              }`}
            />
          </div>
        </div>

        {/* Extra Preferences */}
        <div className="space-y-2">
          <label className={`text-sm font-semibold ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
            Any custom preference or study styles? (Optional)
          </label>
          <textarea
            name="preferences"
            value={form.preferences}
            onChange={handleInputChange}
            placeholder="e.g. Prefer early morning sessions, struggling with history dates, need extra time for solving math equations..."
            rows={2}
            className={`w-full p-3 rounded-xl border text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 resize-none ${
              darkMode ? "bg-slate-950 border-slate-850 text-slate-100" : "bg-slate-50 border-slate-200 text-slate-800"
            }`}
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-md shadow-blue-500/10 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Assembling Study Timetable...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Study Timetable</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Plan Loader Panel */}
      {isLoading && (
        <div className={`p-10 rounded-3xl border text-center space-y-4 ${
          darkMode ? "bg-slate-900/30 border-slate-800" : "bg-white border-blue-100/70 shadow-sm"
        }`}>
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
          <div>
            <h4 className="font-bold text-sm">Personalizing your academic routine...</h4>
            <p className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
              Structuring hourly splits, active-recall sessions, weekly calendar allocations, and psychological concentration tips.
            </p>
          </div>
        </div>
      )}

      {/* Generated Plan Section */}
      {plan && !isLoading && (
        <div className="space-y-6 animate-fade-in">
          {/* Header Action Bar */}
          <div className={`p-5 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
            darkMode ? "bg-slate-900/30 border-slate-800" : "bg-blue-50/20 border-blue-100/60"
          }`}>
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 text-white p-2.5 rounded-2xl shadow-md">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base leading-tight">Your Custom Study Plan is Ready</h3>
                <p className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                  Make sure to copy or follow this block schedule consistently.
                </p>
              </div>
            </div>

            <button
              onClick={copyToClipboard}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                copied 
                  ? "bg-emerald-500 text-white border-emerald-500"
                  : darkMode 
                    ? "bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-900" 
                    : "bg-white border-blue-100 text-slate-605 hover:bg-slate-50 shadow-sm"
              }`}
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? "Copied Routine!" : "Copy Study Plan"}</span>
            </button>
          </div>

          {/* Formatted Report */}
          <div className={`p-6 md:p-8 rounded-[2rem] border space-y-6 whitespace-pre-wrap leading-relaxed shadow-sm ${
            darkMode ? "bg-slate-900/20 border-slate-800 text-slate-200" : "bg-white border-blue-100/80 text-slate-800 shadow-blue-900/5"
          }`}>
            {plan}
          </div>
        </div>
      )}
    </div>
  );
}
