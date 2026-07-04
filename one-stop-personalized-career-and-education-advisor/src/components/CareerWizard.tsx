import React, { useState } from "react";
import { 
  GraduationCap, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  Loader2, 
  BookOpen, 
  Compass, 
  TrendingUp, 
  Briefcase, 
  DollarSign, 
  MapPin, 
  FileCheck
} from "lucide-react";
import { AssessmentForm } from "../types";

interface CareerWizardProps {
  onSendCustomPrompt: (prompt: string) => Promise<string>;
  darkMode: boolean;
}

export default function CareerWizard({ onSendCustomPrompt, darkMode }: CareerWizardProps) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);

  const [form, setForm] = useState<AssessmentForm>({
    qualification: "",
    currentClass: "",
    fieldOfInterest: "",
    favoriteSubjects: "",
    skills: "",
    location: "",
    preferredCareer: "",
    budget: "",
    higherStudiesOrJob: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setReport(null);

    const compiledPrompt = `Analyze my student/candidate profile below and generate a highly personalized, practical, step-by-step Career and Education Advisory Recommendation Report.

PROFILE DETAILS:
- Current Qualification: ${form.qualification || "Not specified"}
- Current Class / Current Year: ${form.currentClass || "Not specified"}
- Field of Interest: ${form.fieldOfInterest || "Not specified"}
- Favorite Subjects: ${form.favoriteSubjects || "Not specified"}
- Skills: ${form.skills || "Not specified"}
- Preferred Location: ${form.location || "Not specified"}
- Preferred Career Focus: ${form.preferredCareer || "Not specified"}
- Academic / Course Budget: ${form.budget || "Not specified"}
- Immediate Goal: ${form.higherStudiesOrJob || "Not specified"}

Based on these parameters, please generate a structured report covering:
1. SUITABLE CAREER OPTIONS (List 2 to 3 tailored career choices with justifications based on my interests and budget)
2. REQUIRED SKILLS & CERTIFICATIONS (Core technical/soft skills to acquire, plus highly valued certificates/degrees)
3. BEST COURSES & DEGREES (Identify specifically which course of study is most appropriate)
4. RECOMMENDED COLLEGES (Mention general types of premium public and affordable private universities/colleges matching my criteria)
5. FUTURE SCOPE & GENERAL SALARY EXPECTATIONS (How this career field will look in 5-10 years and entry-level salaries)
6. ROADMAP (Provide a concrete step-by-step master plan of action from my current stage to achieve this career target)

Keep advice realistic, supportive, and clear. Format each section with bold headings and structured bullet points.`;

    try {
      const resultText = await onSendCustomPrompt(compiledPrompt);
      setReport(resultText);
      setStep(4); // Move to Report step
    } catch (e) {
      alert("Failed to generate career report. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      qualification: "",
      currentClass: "",
      fieldOfInterest: "",
      favoriteSubjects: "",
      skills: "",
      location: "",
      preferredCareer: "",
      budget: "",
      higherStudiesOrJob: ""
    });
    setReport(null);
    setStep(1);
  };

  return (
    <div className="max-w-4xl mx-auto p-5 md:p-8 space-y-6">
      {/* Title section */}
      <div className={`p-6 rounded-3xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
        darkMode ? "bg-slate-900/40 border-slate-800" : "bg-white border-blue-100/70 shadow-md shadow-blue-900/5"
      }`}>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5.5 h-5.5 text-blue-600 dark:text-blue-400" />
            <h2 className="font-display font-bold text-xl leading-tight">Career Matcher & Roadmap Wizard</h2>
          </div>
          <p className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
            Provide optional details about yourself to generate a custom 5-year academic and career blueprint.
          </p>
        </div>
        {step < 4 && (
          <div className="flex items-center gap-1.5 bg-blue-600/5 px-3 py-1.5 rounded-full border border-blue-600/20 text-xs font-semibold text-blue-600 dark:text-blue-400">
            <span>Step {step} of 3</span>
          </div>
        )}
      </div>

      {/* Wizard Progress Bar */}
      {step < 4 && (
        <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-blue-600 h-1.5 rounded-full transition-all duration-300" 
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      )}

      {/* Main Wizard Form Content */}
      {step === 1 && (
        <div className={`p-6 md:p-8 rounded-[2rem] border space-y-6 animate-fade-in ${
          darkMode ? "bg-slate-900/20 border-slate-800" : "bg-white border-blue-100/70 shadow-md shadow-blue-900/5"
        }`}>
          <div className="flex items-center gap-2 border-b pb-3 dark:border-slate-850">
            <BookOpen className="w-5 h-5 text-blue-500" />
            <h3 className="font-display font-bold text-base">Step 1: Academic Profile</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className={`text-sm font-semibold ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
                Current Qualification
              </label>
              <select
                name="qualification"
                value={form.qualification}
                onChange={handleInputChange}
                className={`w-full p-3 rounded-xl border text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 ${
                  darkMode ? "bg-slate-950 border-slate-850 text-slate-100" : "bg-slate-50 border-slate-200 text-slate-800"
                }`}
              >
                <option value="">Select Qualification</option>
                <option value="10th Standard">10th Standard</option>
                <option value="12th Standard (Science)">12th Standard (Science)</option>
                <option value="12th Standard (Commerce)">12th Standard (Commerce)</option>
                <option value="12th Standard (Arts)">12th Standard (Arts)</option>
                <option value="Diploma Student">Diploma Student</option>
                <option value="Undergraduate (B.Tech/BE/B.Sc/B.Com/B.A)">Undergraduate College Student</option>
                <option value="Postgraduate (M.Tech/M.Sc/MBA/MA)">Postgraduate Student</option>
                <option value="Fresh Graduate">Fresh Graduate / Job Seeker</option>
                <option value="Working Professional">Working Professional</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className={`text-sm font-semibold ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
                Current Class / Year of Study
              </label>
              <input
                type="text"
                name="currentClass"
                value={form.currentClass}
                onChange={handleInputChange}
                placeholder="e.g. 10th standard, 2nd year B.Tech, etc."
                className={`w-full p-3 rounded-xl border text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 ${
                  darkMode ? "bg-slate-950 border-slate-850 text-slate-100" : "bg-slate-50 border-slate-200 text-slate-800"
                }`}
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all"
            >
              <span>Next: Skills & Interests</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className={`p-6 md:p-8 rounded-[2rem] border space-y-6 animate-fade-in ${
          darkMode ? "bg-slate-900/20 border-slate-800" : "bg-white border-blue-100/70 shadow-md shadow-blue-900/5"
        }`}>
          <div className="flex items-center gap-2 border-b pb-3 dark:border-slate-850">
            <Compass className="w-5 h-5 text-blue-500" />
            <h3 className="font-display font-bold text-base">Step 2: Interests & Strengths</h3>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className={`text-sm font-semibold ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
                  Field of Interest
                </label>
                <input
                  type="text"
                  name="fieldOfInterest"
                  value={form.fieldOfInterest}
                  onChange={handleInputChange}
                  placeholder="e.g. AI & Tech, Health, Arts, Public Administration"
                  className={`w-full p-3 rounded-xl border text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 ${
                    darkMode ? "bg-slate-950 border-slate-850 text-slate-100" : "bg-slate-50 border-slate-200 text-slate-800"
                  }`}
                />
              </div>

              <div className="space-y-2">
                <label className={`text-sm font-semibold ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
                  Favorite Subjects
                </label>
                <input
                  type="text"
                  name="favoriteSubjects"
                  value={form.favoriteSubjects}
                  onChange={handleInputChange}
                  placeholder="e.g. Mathematics, Biology, English literature, History"
                  className={`w-full p-3 rounded-xl border text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 ${
                    darkMode ? "bg-slate-950 border-slate-850 text-slate-100" : "bg-slate-50 border-slate-200 text-slate-800"
                  }`}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className={`text-sm font-semibold ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
                Your Skills & Strengths
              </label>
              <input
                type="text"
                name="skills"
                value={form.skills}
                onChange={handleInputChange}
                placeholder="e.g. Coding basics, Public Speaking, Creative writing, Graphic design"
                className={`w-full p-3 rounded-xl border text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 ${
                  darkMode ? "bg-slate-950 border-slate-850 text-slate-100" : "bg-slate-50 border-slate-200 text-slate-800"
                }`}
              />
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t dark:border-slate-850">
            <button
              onClick={handleBack}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-semibold ${
                darkMode ? "bg-slate-900 border-slate-800 text-slate-300" : "bg-white border-slate-200 text-slate-600"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all"
            >
              <span>Next: Goals & Preferences</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className={`p-6 md:p-8 rounded-[2rem] border space-y-6 animate-fade-in ${
          darkMode ? "bg-slate-900/20 border-slate-800" : "bg-white border-blue-100/70 shadow-md shadow-blue-900/5"
        }`}>
          <div className="flex items-center gap-2 border-b pb-3 dark:border-slate-850">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <h3 className="font-display font-bold text-base">Step 3: Goals & Budgets</h3>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className={`text-sm font-semibold ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
                  Immediate Next Stage
                </label>
                <select
                  name="higherStudiesOrJob"
                  value={form.higherStudiesOrJob}
                  onChange={handleInputChange}
                  className={`w-full p-3 rounded-xl border text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 ${
                    darkMode ? "bg-slate-950 border-slate-850 text-slate-100" : "bg-slate-50 border-slate-200 text-slate-800"
                  }`}
                >
                  <option value="">Select Preference</option>
                  <option value="Higher Studies">Higher Studies & Education</option>
                  <option value="Job">Direct Job Placement</option>
                  <option value="Both">Both (Part-time studies with job)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className={`text-sm font-semibold ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
                  Preferred Career Role / Dream Job (if any)
                </label>
                <input
                  type="text"
                  name="preferredCareer"
                  value={form.preferredCareer}
                  onChange={handleInputChange}
                  placeholder="e.g. Software Engineer, Civil Servant, Medical Doctor"
                  className={`w-full p-3 rounded-xl border text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 ${
                    darkMode ? "bg-slate-950 border-slate-850 text-slate-100" : "bg-slate-50 border-slate-200 text-slate-800"
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className={`text-sm font-semibold ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
                  Academic Budget Preference
                </label>
                <select
                  name="budget"
                  value={form.budget}
                  onChange={handleInputChange}
                  className={`w-full p-3 rounded-xl border text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 ${
                    darkMode ? "bg-slate-950 border-slate-850 text-slate-100" : "bg-slate-50 border-slate-200 text-slate-800"
                  }`}
                >
                  <option value="">Select Budget</option>
                  <option value="Affordable / Low-cost (Government Scholarships)">Affordable / Need Scholarship assistance</option>
                  <option value="Moderate (State Govt / Private College with average fees)">Moderate budget college and fees</option>
                  <option value="No tight budget limits">Premium private colleges / No strict limit</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className={`text-sm font-semibold ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
                  Preferred Study/Job Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleInputChange}
                  placeholder="e.g. Tamil Nadu, Mumbai, Bangalore, or Abroad"
                  className={`w-full p-3 rounded-xl border text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 ${
                    darkMode ? "bg-slate-950 border-slate-850 text-slate-100" : "bg-slate-50 border-slate-200 text-slate-800"
                  }`}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t dark:border-slate-850">
            <button
              onClick={handleBack}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-semibold ${
                darkMode ? "bg-slate-900 border-slate-800 text-slate-300" : "bg-white border-slate-200 text-slate-600"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-md shadow-blue-500/10 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating Report...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Career Advisory Report</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Generated Report View */}
      {step === 4 && report && (
        <div className="space-y-6 animate-fade-in">
          <div className={`p-6 rounded-3xl border ${
            darkMode ? "bg-slate-900/30 border-slate-800" : "bg-blue-50/20 border-blue-100/60"
          }`}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-500 text-white p-2.5 rounded-2xl shadow-md">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg leading-tight text-slate-800 dark:text-slate-100">Your Custom Career Report is Ready!</h3>
                  <p className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                    Generated securely by Gemini based on your personal academic profile.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={resetForm}
                  className={`px-4 py-2 text-xs font-bold rounded-full border transition-all cursor-pointer ${
                    darkMode 
                      ? "bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900" 
                      : "bg-white border-blue-100 text-slate-650 hover:bg-slate-50 shadow-sm"
                  }`}
                >
                  Start Over
                </button>
              </div>
            </div>
          </div>

          {/* Structured Output Report Cards */}
          <div className={`p-6 md:p-8 rounded-[2rem] border space-y-6 whitespace-pre-wrap leading-relaxed shadow-sm ${
            darkMode ? "bg-slate-900/20 border-slate-800 text-slate-200" : "bg-white border-blue-100/80 text-slate-800 shadow-blue-900/5"
          }`}>
            {report}
          </div>

          {/* Quick next action notes */}
          <div className={`p-5 rounded-2xl border flex items-start gap-3.5 ${
            darkMode ? "bg-slate-900/40 border-slate-850" : "bg-amber-50/30 border-amber-100"
          }`}>
            <FileCheck className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <p className="font-bold text-slate-700 dark:text-slate-200">How to use this guidance report:</p>
              <p className={darkMode ? "text-slate-400" : "text-slate-600"}>
                You can copy these details down or refer to them whenever you chat with the general AI Advisor in the main chat room. These options are highly recommended based on standard current career trajectories.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
