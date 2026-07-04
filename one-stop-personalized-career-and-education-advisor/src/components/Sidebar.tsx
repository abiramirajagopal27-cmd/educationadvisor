import React from "react";
import { 
  MessageSquare, 
  GraduationCap, 
  FileText, 
  Calendar, 
  Briefcase, 
  Award, 
  Sun, 
  Moon, 
  Menu, 
  X,
  Sparkles
} from "lucide-react";

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Sidebar({ 
  currentTab, 
  onTabChange, 
  darkMode, 
  toggleDarkMode 
}: SidebarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const menuItems = [
    { id: "chat", label: "AI Advisor Chat", icon: MessageSquare, desc: "Ask questions, voice chat & documents" },
    { id: "assessment", label: "Career Recommendation", icon: GraduationCap, desc: "Personalized interest matching" },
    { id: "resume", label: "Resume Analyzer", icon: FileText, desc: "ATS score & missing skills check" },
    { id: "planner", label: "Study Planner", icon: Calendar, desc: "Daily & exam schedules creator" },
    { id: "interviews", label: "Interview Lounge", icon: Briefcase, desc: "Model answers & communication tips" },
    { id: "guides", label: "Exams & Scholarships", icon: Award, desc: "UPSC, NEET, schemes & criteria" },
  ];

  return (
    <>
      {/* Mobile Header Banner */}
      <header className={`md:hidden flex items-center justify-between p-4 border-b transition-colors duration-200 ${
        darkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800"
      }`}>
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 text-white p-2 rounded-lg">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-display font-bold text-sm tracking-tight leading-none">Career Advisor</h1>
            <span className="text-[10px] text-blue-500 font-semibold uppercase tracking-wider">AI Powered</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            id="mobile-theme-toggle"
            className={`p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors`}
            title="Toggle theme"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            id="mobile-menu-toggle"
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Navigation Sidebar (Drawer on mobile, stationary on desktop) */}
      <aside className={`fixed inset-y-0 left-0 z-50 md:sticky md:z-0 w-72 flex flex-col transform md:transform-none transition-all duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      } ${
        darkMode 
          ? "bg-slate-900/60 border-slate-800 text-slate-100 md:my-5 md:ml-5 md:h-[calc(100vh-2.5rem)] md:rounded-3xl md:border md:shadow-lg md:shadow-black/20" 
          : "bg-white border-slate-200 text-slate-800 md:my-5 md:ml-5 md:h-[calc(100vh-2.5rem)] md:rounded-3xl md:border md:border-blue-100 md:shadow-md md:shadow-blue-900/5"
      }`}>
        {/* Brand Header */}
        <div className={`p-6 border-b hidden md:block ${darkMode ? "border-slate-800" : "border-blue-100/50"}`}>
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white p-2.5 rounded-xl shadow-lg shadow-blue-500/20">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-display font-bold text-base tracking-tight leading-tight">AI Advisor</h1>
              <p className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-500"}`}>Career & Education Desk</p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto scrollbar-thin">
          <div className="px-3 mb-2">
            <p className={`text-[11px] font-bold uppercase tracking-wider ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
              Modules & Tools
            </p>
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-tab-${item.id}`}
                onClick={() => {
                  onTabChange(item.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-start gap-3.5 p-3.5 rounded-xl text-left transition-all duration-200 group relative ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/10"
                    : darkMode
                      ? "hover:bg-slate-900 text-slate-400 hover:text-slate-200"
                      : "hover:bg-slate-50 text-slate-600 hover:text-slate-900"
                }`}
              >
                <div className={`p-1.5 rounded-lg transition-colors ${
                  isActive 
                    ? "bg-blue-500 text-white" 
                    : darkMode 
                      ? "bg-slate-900 text-slate-400 group-hover:bg-slate-800 group-hover:text-blue-400" 
                      : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-blue-600"
                }`}>
                  <Icon className="w-5 h-5 shrink-0" />
                </div>
                <div className="min-w-0">
                  <div className="font-medium text-sm leading-tight">{item.label}</div>
                  <div className={`text-[11px] mt-0.5 truncate leading-none ${
                    isActive ? "text-blue-100" : darkMode ? "text-slate-500" : "text-slate-400"
                  }`}>
                    {item.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer Controls */}
        <div className={`p-4 border-t flex items-center justify-between ${
          darkMode ? "border-slate-800 bg-slate-900/30" : "border-slate-100 bg-slate-50/50"
        }`}>
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse`}></div>
            <span className={`text-xs font-medium ${darkMode ? "text-slate-400" : "text-slate-500"}`}>AI Core Ready</span>
          </div>

          <button
            onClick={toggleDarkMode}
            id="sidebar-theme-toggle"
            className={`hidden md:block p-2 rounded-xl transition-all border ${
              darkMode 
                ? "bg-slate-900 border-slate-800 hover:bg-slate-800 text-amber-400" 
                : "bg-white border-slate-200 hover:bg-slate-50 text-slate-600"
            }`}
            title="Toggle Light/Dark Theme"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </aside>
    </>
  );
}
