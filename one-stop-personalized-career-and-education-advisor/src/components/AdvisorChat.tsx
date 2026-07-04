import React, { useState, useRef, useEffect } from "react";
import { 
  Send, 
  Mic, 
  MicOff, 
  Paperclip, 
  Trash2, 
  X, 
  Bot, 
  User, 
  HelpCircle,
  FileUp,
  Sparkles,
  AlertTriangle
} from "lucide-react";
import { Message, LanguageCode, QuickCategory } from "../types";
import { LANGUAGES, QUICK_CATEGORIES } from "../data";

interface AdvisorChatProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (text: string, file?: { name: string; mimeType: string; data: string }) => void;
  onClearHistory: () => void;
  selectedLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  darkMode: boolean;
}

export default function AdvisorChat({
  messages,
  isLoading,
  onSendMessage,
  onClearHistory,
  selectedLanguage,
  onLanguageChange,
  darkMode
}: AdvisorChatProps) {
  const [inputText, setInputText] = useState("");
  const [attachedFile, setAttachedFile] = useState<{ name: string; mimeType: string; data: string } | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Speech Recognition Setup
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;

      rec.onstart = () => {
        setIsListening(true);
        setSpeechError(null);
      };

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputText((prev) => (prev ? prev + " " + transcript : transcript));
        }
      };

      rec.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        if (event.error === "no-speech") {
          setSpeechError("No speech detected. Please try again.");
        } else if (event.error === "not-allowed") {
          setSpeechError("Microphone permission denied.");
        } else {
          setSpeechError(`Voice input error: ${event.error}`);
        }
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, []);

  // Set the speech recognition language whenever selectedLanguage changes
  useEffect(() => {
    if (recognitionRef.current) {
      // Map language codes to BCP 47 locale strings
      const localeMap: Record<LanguageCode, string> = {
        auto: "en-US",
        en: "en-US",
        hi: "hi-IN",
        ta: "ta-IN",
        te: "te-IN",
        kn: "kn-IN",
        ml: "ml-IN",
        mr: "mr-IN"
      };
      recognitionRef.current.lang = localeMap[selectedLanguage] || "en-US";
    }
  }, [selectedLanguage]);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert("Web Speech API is not supported in this browser. Please use Chrome or Safari.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setSpeechError(null);
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.error("Speech recognition start failed", e);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      alert("File size exceeds 15MB limit. Please upload a smaller file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const base64Data = dataUrl.split(",")[1];
      setAttachedFile({
        name: file.name,
        mimeType: file.type || "application/octet-stream",
        data: base64Data
      });
    };
    reader.onerror = () => {
      alert("Error reading uploaded file.");
    };
    reader.readAsDataURL(file);
  };

  const removeAttachedFile = () => {
    setAttachedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSend = () => {
    if (!inputText.trim() && !attachedFile) return;
    
    onSendMessage(inputText, attachedFile || undefined);
    setInputText("");
    removeAttachedFile();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCategoryClick = (category: QuickCategory) => {
    setInputText(category.prompt);
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* Advisor Top Header Controls */}
      <div className={`p-5 border-b flex flex-wrap items-center justify-between gap-4 shrink-0 transition-colors ${
        darkMode ? "bg-slate-900/40 border-slate-800" : "bg-white border-blue-100/50"
      }`}>
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white p-2.5 rounded-2xl shadow-md shadow-blue-500/10">
            <Bot className="w-5.5 h-5.5" />
          </div>
          <div>
            <h2 className="font-display font-bold text-base leading-tight">AI Advisor Desk</h2>
            <p className={`text-[11px] ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
              Ask any career or academic question
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold hidden sm:inline ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
              Language:
            </span>
            <select
              value={selectedLanguage}
              onChange={(e) => onLanguageChange(e.target.value as LanguageCode)}
              className={`text-xs font-bold px-3 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${
                darkMode 
                  ? "bg-slate-950 border-slate-800 text-slate-200 focus:border-blue-600" 
                  : "bg-white border-blue-100 text-slate-700 focus:border-blue-500"
              }`}
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label} ({lang.nativeLabel})
                </option>
              ))}
            </select>
          </div>

          {/* New Chat Button */}
          <button
            onClick={onClearHistory}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-full border hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/20 dark:hover:text-rose-400 transition-all cursor-pointer ${
              darkMode 
                ? "bg-slate-950 border-slate-800 text-slate-400" 
                : "bg-white border-blue-100 text-slate-500 shadow-sm"
            }`}
            title="Start a fresh conversation"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>New Chat</span>
          </button>
        </div>
      </div>

      {/* Main Messages & Advisory Content */}
      <div className={`flex-1 overflow-y-auto p-5 md:p-6 space-y-6 scrollbar-thin transition-colors ${
        darkMode ? "bg-slate-950/40" : "bg-[#F0F4F8]/40"
      }`}>
        {messages.length === 0 ? (
          <div className="max-w-3xl mx-auto py-8 space-y-8">
            {/* Welcome Greeting Card styled as a beautiful bento */}
            <div className={`text-center space-y-4 p-8 rounded-[2rem] border transition-all ${
              darkMode ? "bg-slate-900/60 border-slate-800" : "bg-white border-blue-100/70 shadow-md shadow-blue-900/5"
            }`}>
              <div className="inline-flex bg-blue-600 text-white p-4 rounded-3xl shadow-xl shadow-blue-500/15 mb-2">
                <Bot className="w-8 h-8" />
              </div>
              <h3 className="font-display font-bold text-xl md:text-2xl tracking-tight text-blue-900 dark:text-blue-400">
                Your AI Career & Education Advisor
              </h3>
              <p className={`text-sm max-w-xl mx-auto leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                Welcome! Get immediate guidance on qualifications, job opportunities, college courses, government schemes, or prepare for interviews. Upload your resume or document for personalized analysis!
              </p>
            </div>

            {/* Quick Access Categories Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4.5 h-4.5 text-blue-500" />
                <h4 className={`text-xs font-bold uppercase tracking-wider ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                  Click a Quick Access Advisory Card to Start
                </h4>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {QUICK_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat)}
                    className={`p-5 rounded-3xl text-left border transition-all duration-300 group relative flex flex-col justify-between h-36 hover:scale-[1.02] cursor-pointer ${
                      darkMode 
                        ? "bg-slate-900/40 border-slate-800/80 hover:border-blue-500/40 hover:bg-slate-900" 
                        : "bg-white border-blue-100 hover:border-blue-500/40 hover:shadow-md hover:shadow-blue-900/10"
                    }`}
                  >
                    <div>
                      <h5 className="font-display font-bold text-sm text-blue-600 dark:text-blue-400 leading-tight">
                        {cat.label}
                      </h5>
                      <p className={`text-xs mt-1.5 leading-snug line-clamp-2 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                        {cat.description}
                      </p>
                    </div>
                    <span className="text-[10px] text-blue-500 font-bold uppercase tracking-wider group-hover:underline mt-2">
                      Use prompt →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-4 p-5 rounded-3xl border transition-all ${
                  msg.role === "assistant"
                    ? darkMode
                      ? "bg-slate-900/40 border-slate-800/60 shadow-md shadow-black/10"
                      : "bg-white border-blue-50/70 shadow-md shadow-blue-900/5"
                    : darkMode
                      ? "bg-blue-950/20 border-blue-900/30"
                      : "bg-blue-50/30 border-blue-100/60"
                }`}
              >
                <div className={`p-2.5 rounded-2xl h-11 w-11 shrink-0 flex items-center justify-center shadow-sm ${
                  msg.role === "assistant"
                    ? "bg-blue-600 text-white"
                    : darkMode 
                      ? "bg-slate-800 text-slate-300 border border-slate-700" 
                      : "bg-slate-100 text-slate-600 border border-slate-200"
                }`}>
                  {msg.role === "assistant" ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                </div>

                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-450 dark:text-slate-400">
                      {msg.role === "assistant" ? "AI Advisory Desk" : "You"}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {msg.timestamp}
                    </span>
                  </div>

                  {/* Render attached file if present in message */}
                  {msg.file && (
                    <div className={`inline-flex items-center gap-2 p-2.5 rounded-2xl border text-xs max-w-sm ${
                      darkMode ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-blue-100/50"
                    }`}>
                      <FileUp className="w-4 h-4 text-blue-500" />
                      <div className="truncate">
                        <p className="font-semibold truncate max-w-[200px]">{msg.file.name}</p>
                        <p className="text-[10px] text-slate-400">Uploaded Document</p>
                      </div>
                    </div>
                  )}

                  {/* Message body */}
                  <div className={`text-sm md:text-base leading-relaxed whitespace-pre-wrap ${
                    darkMode ? "text-slate-200" : "text-slate-800"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}

            {/* AI Advisor Generating Loader */}
            {isLoading && (
              <div className={`flex gap-4 p-5 rounded-3xl border ${
                darkMode ? "bg-slate-900/30 border-slate-850" : "bg-white border-blue-100"
              }`}>
                <div className="bg-blue-600 text-white p-2.5 rounded-2xl h-11 w-11 shrink-0 flex items-center justify-center animate-pulse">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="flex-1 space-y-3 py-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 animate-pulse">
                      Advisor is compiling response...
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-5/6 animate-pulse"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-1/2 animate-pulse"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Speech / Micro Errors banner */}
      {speechError && (
        <div className="absolute bottom-28 left-4 right-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 p-3 rounded-xl flex items-center justify-between text-xs text-rose-700 dark:text-rose-300 z-30 animate-slide-up">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            <span>{speechError}</span>
          </div>
          <button onClick={() => setSpeechError(null)} className="hover:text-rose-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Chat Form Area */}
      <div className={`p-5 border-t shrink-0 transition-colors ${
        darkMode ? "bg-slate-900/40 border-slate-800" : "bg-white border-blue-100/50"
      }`}>
        <div className="max-w-4xl mx-auto space-y-3">
          
          {/* File Attachment Pill */}
          {attachedFile && (
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border animate-slide-up ${
              darkMode ? "bg-slate-950 border-slate-800 text-slate-300" : "bg-slate-50 border-blue-100 text-blue-800"
            }`}>
              <FileUp className="w-4 h-4 text-blue-500" />
              <span className="font-semibold truncate max-w-[180px]">{attachedFile.name}</span>
              <button 
                onClick={removeAttachedFile}
                className="text-slate-400 hover:text-rose-500 p-0.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex items-end gap-3">
            <div className="flex items-center gap-2 self-center">
              {/* Document Upload Button */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".pdf,image/png,image/jpeg,image/jpg,.txt"
                className="hidden"
                id="advisor-file-upload"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className={`p-3 rounded-2xl border hover:scale-105 active:scale-95 transition-all cursor-pointer ${
                  darkMode 
                    ? "bg-slate-950 border-slate-800 hover:bg-slate-900 text-slate-300 hover:text-blue-400" 
                    : "bg-slate-50 border-blue-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 shadow-sm"
                }`}
                title="Upload PDF, Image, Marksheet or Certificate"
              >
                <Paperclip className="w-5 h-5" />
              </button>

              {/* Voice Input Button */}
              <button
                onClick={toggleVoiceInput}
                className={`p-3 rounded-2xl border hover:scale-105 active:scale-95 transition-all relative cursor-pointer ${
                  isListening
                    ? "bg-red-500 text-white animate-pulse border-red-500"
                    : darkMode 
                      ? "bg-slate-950 border-slate-800 hover:bg-slate-900 text-slate-300 hover:text-red-400" 
                      : "bg-slate-50 border-blue-100 hover:bg-blue-50 text-slate-600 hover:text-red-500 shadow-sm"
                }`}
                title={isListening ? "Listening... click to stop" : "Start Voice Input"}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
            </div>

            {/* Large input text box */}
            <div className="flex-1 relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={isListening ? "Listening... speak now" : "Type your career query, study question, or prompt here..."}
                rows={1}
                className={`w-full max-h-32 min-h-[50px] py-3.5 pl-4 pr-12 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm md:text-base resize-none scrollbar-thin transition-colors ${
                  darkMode 
                    ? "bg-slate-950 border-slate-800 text-slate-100 focus:border-blue-600 placeholder-slate-500" 
                    : "bg-white border-blue-100 text-slate-800 focus:border-blue-500 placeholder-slate-400"
                }`}
              />
              <button
                onClick={handleSend}
                disabled={!inputText.trim() && !attachedFile}
                className="absolute right-2.5 bottom-2.5 p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-40 disabled:hover:bg-blue-600 transition-all cursor-pointer"
                title="Send query"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400 pt-1">
            <p>
              Note: Speech voice input maps automatically to selected advisor language.
            </p>
            <p className="font-semibold text-blue-500">
              Disclaimer: Please verify official websites for admission/job timelines.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
