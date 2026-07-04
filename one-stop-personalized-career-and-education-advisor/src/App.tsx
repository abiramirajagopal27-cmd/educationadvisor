import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import AdvisorChat from "./components/AdvisorChat";
import CareerWizard from "./components/CareerWizard";
import ResumeAnalyzer from "./components/ResumeAnalyzer";
import StudyPlanner from "./components/StudyPlanner";
import InterviewHub from "./components/InterviewHub";
import ExamScholarshipDesk from "./components/ExamScholarshipDesk";
import { Message, LanguageCode } from "./types";
import { Sparkles, Bot, AlertCircle } from "lucide-react";

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("chat");
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>("auto");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Load theme from localStorage
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("advisor_theme");
    return saved === "dark" ? true : false;
  });

  // Load chat messages from localStorage (persistent within browser session)
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem("advisor_chat_messages");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Save messages to localStorage on change
  useEffect(() => {
    localStorage.setItem("advisor_chat_messages", JSON.stringify(messages));
  }, [messages]);

  // Save theme to localStorage on change
  useEffect(() => {
    localStorage.setItem("advisor_theme", darkMode ? "dark" : "light");
    // Apply class to html/body for full coverage
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Centralized standard API call helper to fetch Gemini replies
  const callAdvisorAPI = async (
    promptText: string,
    historyList?: Message[],
    fileData?: { name: string; mimeType: string; data: string }
  ): Promise<string> => {
    setApiError(null);
    try {
      const response = await fetch("/api/advisor/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: promptText,
          history: historyList ? historyList.map(m => ({ role: m.role, content: m.content })) : [],
          language: selectedLanguage,
          file: fileData
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to communicate with the Gemini advisor service.");
      }
      return data.text || "I was unable to compile an advisory recommendation. Please try re-phrasing your question.";
    } catch (error: any) {
      console.error("Advisor API interaction failed", error);
      setApiError(error.message || "Network issue connecting to Advisor.");
      throw error;
    }
  };

  // Standard Chat Send Action
  const handleSendMessage = async (
    text: string,
    file?: { name: string; mimeType: string; data: string }
  ) => {
    const userMsgId = Date.now().toString();
    const formattedTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const userMessage: Message = {
      id: userMsgId,
      role: "user",
      content: text || (file ? `Analyze uploaded document: ${file.name}` : ""),
      timestamp: formattedTime,
      file: file ? { name: file.name, mimeType: file.mimeType } : undefined
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // Send message, history (excluding the current one we are sending), and optional file
      const reply = await callAdvisorAPI(text, messages, file);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (e: any) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `⚠️ Advisor Error: ${e.message || "Failed to generate response. Please check your Gemini API key configuration under Settings > Secrets."}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset conversation history
  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear your current conversation?")) {
      setMessages([]);
      localStorage.removeItem("advisor_chat_messages");
    }
  };

  // Helper used by Career Recommendation Form Wizard to directly call the advisor
  const handleWizardQuery = async (compiledPrompt: string): Promise<string> => {
    return await callAdvisorAPI(compiledPrompt, []);
  };

  // Helper used by Resume Analyzer
  const handleResumeAnalysis = async (file: { name: string; mimeType: string; data: string }): Promise<string> => {
    const prompt = `Perform an expert ATS and Skills Optimization check on this uploaded resume/certificate document.
Identify:
1. ATS compliance rating (Provide a numerical rating like: "ATS Score: 78/100" at the top of your reply)
2. Structural Layout and Formatting strength
3. Key Professional & Technical Skills detected
4. Vital Skills Missing for modern roles matching their expertise
5. Concrete action-oriented bullet point improvements
6. Match suitable target job roles and next steps.

Format everything in a highly encouraging, polished, and structured format.`;
    return await callAdvisorAPI(prompt, [], file);
  };

  return (
    <div className={`min-h-screen flex flex-col md:flex-row font-sans transition-colors duration-200 ${
      darkMode ? "bg-[#080B13] text-slate-100 dark" : "bg-[#F0F4F8] text-slate-900"
    }`}>
      {/* Responsive Sidebar Menu */}
      <Sidebar 
        currentTab={currentTab} 
        onTabChange={setCurrentTab} 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
      />

      {/* Main Panel Content Area styled as a pristine Bento Card */}
      <main className={`flex-1 flex flex-col min-w-0 overflow-hidden h-screen md:my-5 md:mr-5 md:rounded-3xl md:border transition-all duration-300 ${
        darkMode 
          ? "bg-slate-900/60 border-slate-800 shadow-lg shadow-black/25" 
          : "bg-white border-blue-100 shadow-md shadow-blue-900/5"
      }`}>
        {/* Global Alert Notification Banner */}
        {apiError && (
          <div className="bg-rose-500 text-white px-4 py-2 text-xs font-semibold flex items-center justify-between z-10 shrink-0">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>{apiError}. Make sure your GEMINI_API_KEY is configured in AI Studio.</span>
            </div>
            <button onClick={() => setApiError(null)} className="underline hover:text-rose-100">Dismiss</button>
          </div>
        )}

        {/* Tab Module Switching */}
        <div className="flex-1 overflow-y-auto">
          {currentTab === "chat" && (
            <AdvisorChat
              messages={messages}
              isLoading={isLoading}
              onSendMessage={handleSendMessage}
              onClearHistory={handleClearHistory}
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
              darkMode={darkMode}
            />
          )}

          {currentTab === "assessment" && (
            <CareerWizard 
              onSendCustomPrompt={handleWizardQuery} 
              darkMode={darkMode} 
            />
          )}

          {currentTab === "resume" && (
            <ResumeAnalyzer 
              onAnalyzeResume={handleResumeAnalysis} 
              darkMode={darkMode} 
            />
          )}

          {currentTab === "planner" && (
            <StudyPlanner 
              onGeneratePlanner={handleWizardQuery} 
              darkMode={darkMode} 
            />
          )}

          {currentTab === "interviews" && (
            <InterviewHub 
              onGenerateInterviewPrep={handleWizardQuery} 
              darkMode={darkMode} 
            />
          )}

          {currentTab === "guides" && (
            <ExamScholarshipDesk 
              onAskDeskQuestion={handleWizardQuery} 
              darkMode={darkMode} 
            />
          )}
        </div>
      </main>
    </div>
  );
}
