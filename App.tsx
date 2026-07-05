import { useState } from "react";

// ── Types ──────────────────────────────────────────────
interface User {
  name: string;
  email: string;
  role: string;
}

export default function App() {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = sessionStorage.getItem("ai_advisor_user");
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const handleLogin = (u: User) => {
    sessionStorage.setItem("ai_advisor_user", JSON.stringify(u));
    setUser(u);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("ai_advisor_user");
    setUser(null);
  };

  if (!user) return <AuthPage onLogin={handleLogin} />;
  return <MainApp user={user} onLogout={handleLogout} />;
}

// ══════════════════════════════════════════════════════
// AUTH PAGE
// ══════════════════════════════════════════════════════
type AuthView = "signin" | "signup" | "forgot";

function AuthPage({ onLogin }: { onLogin: (u: User) => void }) {
  const [view, setView] = useState<AuthView>("signin");

  return (
    <div style={{ display:"flex", minHeight:"100vh", fontFamily:"'Inter',sans-serif", background:"#eff6ff" }}>

      {/* Left panel — hidden on mobile via inline style override in CSS */}
      <div className="auth-left" style={{
        width:"44%", minHeight:"100vh",
        background:"linear-gradient(145deg,#0f2d6e 0%,#1a4da8 60%,#2563eb 100%)",
        padding:"48px 52px", flexDirection:"column", justifyContent:"space-between",
        position:"relative", overflow:"hidden",
      }}>
        <div style={{ position:"absolute", width:380, height:380, borderRadius:"50%", background:"rgba(255,255,255,0.06)", top:-100, right:-120 }} />
        <div style={{ position:"absolute", width:280, height:280, borderRadius:"50%", background:"rgba(255,255,255,0.06)", bottom:-60, left:-80 }} />

        <div style={{ display:"flex", alignItems:"center", gap:12, position:"relative", zIndex:1 }}>
          <div style={{ width:44, height:44, background:"rgba(255,255,255,0.18)", borderRadius:12, display:"grid", placeItems:"center" }}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div>
            <div style={{ color:"#fff", fontWeight:700, fontSize:16 }}>AI Advisor</div>
            <div style={{ color:"rgba(255,255,255,0.7)", fontSize:12 }}>Career &amp; Education Desk</div>
          </div>
        </div>

        <div style={{ position:"relative", zIndex:1 }}>
          <div style={{ display:"inline-block", background:"rgba(255,255,255,0.15)", color:"#fff", fontSize:11, fontWeight:600, padding:"4px 12px", borderRadius:20, marginBottom:20, border:"1px solid rgba(255,255,255,0.2)", letterSpacing:"0.08em" }}>
            ✦ Powered by Gemini AI
          </div>
          <h1 style={{ color:"#fff", fontSize:30, fontWeight:700, lineHeight:1.25, marginBottom:16 }}>
            Your Personal Career &amp; Education Guide
          </h1>
          <p style={{ color:"rgba(255,255,255,0.75)", fontSize:14, lineHeight:1.7, maxWidth:360, marginBottom:36 }}>
            Get personalized advice on courses, colleges, scholarships, competitive exams, resume tips, and interview prep — in your preferred language.
          </p>
          <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:14 }}>
            {["Career roadmaps tailored to your goals","Resume analyzer with ATS score feedback","Study plans for NEET, JEE, UPSC & more","Supports English, Tamil, Hindi & 4 more languages","Voice input — just speak your question"].map(f => (
              <li key={f} style={{ display:"flex", alignItems:"flex-start", gap:12, color:"rgba(255,255,255,0.88)", fontSize:13.5 }}>
                <div style={{ flexShrink:0, width:22, height:22, borderRadius:"50%", background:"rgba(255,255,255,0.18)", display:"grid", placeItems:"center", marginTop:1 }}>
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ color:"rgba(255,255,255,0.45)", fontSize:11, position:"relative", zIndex:1 }}>
          © 2025 AI Advisor · All guidance is advisory in nature.
        </div>
      </div>

      {/* Right panel */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"32px 24px" }}>
        {/* Mobile brand */}
        <div className="mobile-brand" style={{ display:"flex", alignItems:"center", gap:10, marginBottom:28 }}>
          <div style={{ width:40, height:40, background:"#2563eb", borderRadius:11, display:"grid", placeItems:"center" }}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <strong style={{ fontSize:17, color:"#0f2d6e" }}>AI Advisor</strong>
        </div>

        <div style={{ background:"#fff", borderRadius:20, boxShadow:"0 8px 32px rgba(15,45,110,0.10)", padding:"40px 36px", width:"100%", maxWidth:420 }}>
          {view !== "forgot" && (
            <div style={{ display:"flex", background:"#f1f5f9", borderRadius:10, padding:4, marginBottom:28, gap:4 }}>
              {(["signin","signup"] as AuthView[]).map(v => (
                <button key={v} onClick={() => setView(v)} style={{
                  flex:1, padding:"9px 0", border:"none", borderRadius:8, fontSize:13.5, fontWeight:600,
                  cursor:"pointer", fontFamily:"inherit", transition:"all .2s",
                  background: view===v ? "#fff" : "transparent",
                  color: view===v ? "#1a4da8" : "#64748b",
                  boxShadow: view===v ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
                }}>
                  {v === "signin" ? "Sign In" : "Create Account"}
                </button>
              ))}
            </div>
          )}

          {view === "signin" && <SignInForm onLogin={onLogin} onForgot={() => setView("forgot")} onSwitch={() => setView("signup")} />}
          {view === "signup" && <SignUpForm onLogin={onLogin} onSwitch={() => setView("signin")} />}
          {view === "forgot" && <ForgotForm onBack={() => setView("signin")} />}
        </div>
      </div>
    </div>
  );
}

// ── Sign In ─────────────────────────────────────────────
function SignInForm({ onLogin, onForgot, onSwitch }: { onLogin:(u:User)=>void; onForgot:()=>void; onSwitch:()=>void }) {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = () => {
    if (!email || !pwd) return setError("Please enter your email and password.");
    if (!email.includes("@")) return setError("Please enter a valid email address.");
    setError(""); setLoading(true);
    setTimeout(() => { setLoading(false); onLogin({ name: email.split("@")[0], email, role:"User" }); }, 1600);
  };

  return (
    <div>
      <h2 style={{ fontSize:21, fontWeight:700, color:"#0f2d6e", marginBottom:4 }}>Welcome back 👋</h2>
      <p style={{ fontSize:13, color:"#64748b", marginBottom:22 }}>Sign in to continue your career journey.</p>
      {error && <AlertBox type="error" msg={error} />}
      <SocialRow />
      <Divider />
      <Fld label="Email address"><input style={inp} type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} /></Fld>
      <Fld label="Password">
        <div style={{ position:"relative" }}>
          <input style={inp} type={showPwd?"text":"password"} placeholder="Enter your password" value={pwd} onChange={e=>setPwd(e.target.value)} />
          <button style={eyeBtn} onClick={()=>setShowPwd(!showPwd)} type="button"><EyeIco /></button>
        </div>
      </Fld>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20, marginTop:-4 }}>
        <label style={{ display:"flex", alignItems:"center", gap:7, fontSize:12.5, color:"#64748b", cursor:"pointer" }}>
          <input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)} style={{ accentColor:"#2563eb" }} /> Remember me
        </label>
        <button style={lnk} onClick={onForgot} type="button">Forgot password?</button>
      </div>
      <PrimaryBtn loading={loading} onClick={handle}>Sign In to AI Advisor</PrimaryBtn>
      <p style={{ textAlign:"center", marginTop:18, fontSize:13, color:"#64748b" }}>
        Don't have an account? <button style={lnk} onClick={onSwitch} type="button">Create one free</button>
      </p>
    </div>
  );
}

// ── Sign Up ─────────────────────────────────────────────
function SignUpForm({ onLogin, onSwitch }: { onLogin:(u:User)=>void; onSwitch:()=>void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [pwd, setPwd] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const strength = [pwd.length>=8, /[A-Z]/.test(pwd), /[0-9]/.test(pwd), /[^A-Za-z0-9]/.test(pwd)].filter(Boolean).length;
  const sColors = ["","#ef4444","#f97316","#eab308","#22c55e"];
  const sLabels = ["","Weak","Fair","Good","Strong"];

  const handle = () => {
    if (!name||!email||!role||!pwd) return setError("Please fill in all required fields.");
    if (!email.includes("@")) return setError("Please enter a valid email address.");
    if (pwd.length<8) return setError("Password must be at least 8 characters.");
    if (!terms) return setError("Please accept the Terms & Privacy Policy.");
    setError(""); setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); setTimeout(()=>onLogin({name,email,role}),1200); }, 1600);
  };

  return (
    <div>
      <h2 style={{ fontSize:21, fontWeight:700, color:"#0f2d6e", marginBottom:4 }}>Get started free 🚀</h2>
      <p style={{ fontSize:13, color:"#64748b", marginBottom:22 }}>Create your account and begin your journey.</p>
      {error && <AlertBox type="error" msg={error} />}
      {success && <AlertBox type="success" msg="Account created! Welcome to AI Advisor ✅" />}
      <SocialRow />
      <Divider />
      <Fld label="Full name"><input style={inp} type="text" placeholder="Your full name" value={name} onChange={e=>setName(e.target.value)} /></Fld>
      <Fld label="Email address"><input style={inp} type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} /></Fld>
      <Fld label="I am a…">
        <select style={{ ...inp, paddingLeft:12 }} value={role} onChange={e=>setRole(e.target.value)}>
          <option value="">Select your profile</option>
          {["School Student (Class 9–12)","Diploma / ITI Student","College Student (UG)","College Student (PG)","Fresh Graduate / Job Seeker","Working Professional","Parent seeking guidance"].map(r=><option key={r}>{r}</option>)}
        </select>
      </Fld>
      <Fld label="Password">
        <div style={{ position:"relative" }}>
          <input style={inp} type={showPwd?"text":"password"} placeholder="Create a strong password" value={pwd} onChange={e=>setPwd(e.target.value)} />
          <button style={eyeBtn} onClick={()=>setShowPwd(!showPwd)} type="button"><EyeIco /></button>
        </div>
        {pwd && (
          <div style={{ marginTop:6 }}>
            <div style={{ display:"flex", gap:4, marginBottom:3 }}>
              {[1,2,3,4].map(i=><div key={i} style={{ flex:1, height:4, borderRadius:99, background:i<=strength?sColors[strength]:"#e2e8f0", transition:"background .3s" }} />)}
            </div>
            <div style={{ fontSize:11, color:sColors[strength] }}>{sLabels[strength]}</div>
          </div>
        )}
      </Fld>
      <label style={{ display:"flex", alignItems:"flex-start", gap:8, marginBottom:18, cursor:"pointer" }}>
        <input type="checkbox" checked={terms} onChange={e=>setTerms(e.target.checked)} style={{ accentColor:"#2563eb", marginTop:2, flexShrink:0 }} />
        <span style={{ fontSize:12, color:"#64748b", lineHeight:1.5 }}>I agree to the Terms &amp; Privacy Policy. All advice is for guidance only and not a guarantee of admission, scholarship, or employment.</span>
      </label>
      <PrimaryBtn loading={loading} onClick={handle}>Create Free Account</PrimaryBtn>
      <p style={{ textAlign:"center", marginTop:18, fontSize:13, color:"#64748b" }}>
        Already have an account? <button style={lnk} onClick={onSwitch} type="button">Sign in</button>
      </p>
    </div>
  );
}

// ── Forgot Password ─────────────────────────────────────
function ForgotForm({ onBack }: { onBack:()=>void }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <div>
      <div style={{ textAlign:"center", marginBottom:20 }}>
        <div style={{ width:56, height:56, borderRadius:"50%", background:"#eff6ff", display:"grid", placeItems:"center", margin:"0 auto 16px" }}>
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </div>
        <h2 style={{ fontSize:21, fontWeight:700, color:"#0f2d6e", marginBottom:4 }}>Reset password 🔑</h2>
        <p style={{ fontSize:13, color:"#64748b", marginBottom:22 }}>Enter your email and we'll send a reset link.</p>
      </div>
      {sent && <AlertBox type="success" msg="Reset link sent! Check your inbox." />}
      <Fld label="Registered email"><input style={inp} type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} /></Fld>
      <PrimaryBtn loading={false} onClick={()=>{ if(email.includes("@")) setSent(true); }}>Send Reset Link</PrimaryBtn>
      <p style={{ textAlign:"center", marginTop:14, fontSize:13, color:"#64748b" }}>
        <button style={lnk} onClick={onBack} type="button">← Back to Sign In</button>
      </p>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// MAIN APP SHELL
// ══════════════════════════════════════════════════════
function MainApp({ user, onLogout }: { user:User; onLogout:()=>void }) {
  return (
    <div style={{ minHeight:"100vh", background:"#f8fafc", display:"flex", flexDirection:"column" }}>
      <div style={{ background:"#fff", borderBottom:"1px solid #e2e8f0", padding:"12px 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:36, height:36, background:"#1a4da8", borderRadius:10, display:"grid", placeItems:"center" }}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
          </div>
          <div>
            <div style={{ fontWeight:700, fontSize:15, color:"#0f2d6e" }}>AI Advisor</div>
            <div style={{ fontSize:11, color:"#64748b" }}>Career &amp; Education Desk</div>
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <span style={{ fontSize:13, color:"#64748b" }}>Hello, <strong style={{ color:"#0f2d6e" }}>{user.name}</strong></span>
          <button style={{ padding:"7px 14px", border:"1.5px solid #e2e8f0", borderRadius:8, background:"#fff", fontSize:13, color:"#64748b", cursor:"pointer", fontFamily:"inherit" }} onClick={onLogout}>Sign Out</button>
        </div>
      </div>
      {/* ↓↓ உங்கள் existing app content இங்க render ஆகும் ↓↓ */}
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:12 }}>
        <div style={{ fontSize:48 }}>🎓</div>
        <h2 style={{ color:"#0f2d6e", fontSize:22 }}>Welcome, {user.name}!</h2>
        <p style={{ color:"#64748b", fontSize:14 }}>Your career &amp; education journey starts here.</p>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// SHARED MINI COMPONENTS
// ══════════════════════════════════════════════════════
function AlertBox({ type, msg }: { type:"error"|"success"; msg:string }) {
  const e = type==="error";
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 14px", borderRadius:9, marginBottom:14, fontSize:13, fontWeight:500, background:e?"#fef2f2":"#f0fdf4", color:e?"#dc2626":"#16a34a", border:`1px solid ${e?"#fecaca":"#bbf7d0"}` }}>
      {e?"⚠️":"✅"} {msg}
    </div>
  );
}

function Fld({ label, children }: { label:string; children:React.ReactNode }) {
  return (
    <div style={{ marginBottom:14 }}>
      <label style={{ display:"block", fontSize:12.5, fontWeight:600, color:"#334155", marginBottom:5 }}>{label}</label>
      {children}
    </div>
  );
}

function Divider() {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, margin:"14px 0 18px", color:"#94a3b8", fontSize:12 }}>
      <div style={{ flex:1, height:1, background:"#e2e8f0" }} /> OR <div style={{ flex:1, height:1, background:"#e2e8f0" }} />
    </div>
  );
}

function SocialRow() {
  const btn = (label:string, icon:React.ReactNode) => (
    <button key={label} style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:7, padding:"10px 0", border:"1.5px solid #cbd5e1", borderRadius:10, background:"#fff", fontSize:12.5, fontWeight:600, color:"#334155", cursor:"pointer", fontFamily:"inherit" }} onClick={()=>alert(`${label} — coming soon!`)}>
      {icon} {label}
    </button>
  );
  return (
    <div style={{ display:"flex", gap:10, marginBottom:18 }}>
      {btn("Google", <svg viewBox="0 0 24 24" width="18" height="18"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>)}
      {btn("Microsoft", <svg viewBox="0 0 24 24" width="18" height="18"><path d="M11.4 2H2v9.4h9.4V2z" fill="#f25022"/><path d="M22 2h-9.4v9.4H22V2z" fill="#7fba00"/><path d="M11.4 12.6H2V22h9.4v-9.4z" fill="#00a4ef"/><path d="M22 12.6h-9.4V22H22v-9.4z" fill="#ffb900"/></svg>)}
    </div>
  );
}

function PrimaryBtn({ loading, onClick, children }: { loading:boolean; onClick:()=>void; children:React.ReactNode }) {
  return (
    <button style={{ width:"100%", padding:13, background:"#2563eb", color:"#fff", border:"none", borderRadius:10, fontSize:14.5, fontWeight:700, cursor:loading?"not-allowed":"pointer", fontFamily:"inherit", opacity:loading?0.8:1, display:"flex", alignItems:"center", justifyContent:"center", gap:8, boxShadow:"0 4px 14px rgba(37,99,235,0.30)" }} onClick={onClick} disabled={loading}>
      {loading ? <div style={{ width:18, height:18, border:"2.5px solid rgba(255,255,255,0.4)", borderTop:"2.5px solid #fff", borderRadius:"50%", animation:"spin .7s linear infinite" }} /> : children}
    </button>
  );
}

function EyeIco() {
  return <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
}

// Shared styles
const inp: React.CSSProperties = { width:"100%", padding:"11px 40px 11px 12px", border:"1.5px solid #cbd5e1", borderRadius:10, fontSize:14, color:"#334155", background:"#fff", outline:"none", fontFamily:"inherit", boxSizing:"border-box" };
const lnk: React.CSSProperties = { fontSize:12.5, color:"#2563eb", fontWeight:600, background:"none", border:"none", cursor:"pointer", fontFamily:"inherit", padding:0, textDecoration:"none" };
const eyeBtn: React.CSSProperties = { position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", padding:2, display:"grid", placeItems:"center" };

// Global CSS injection
if (typeof document !== "undefined") {
  const existing = document.getElementById("ai-advisor-styles");
  if (!existing) {
    const st = document.createElement("style");
    st.id = "ai-advisor-styles";
    st.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: 'Inter', sans-serif; }
      @keyframes spin { to { transform: rotate(360deg); } }
      .auth-left { display: none !important; }
      .mobile-brand { display: flex !important; }
      @media (min-width: 900px) {
        .auth-left { display: flex !important; }
        .mobile-brand { display: none !important; }
      }
    `;
    document.head.appendChild(st);
  }
}
