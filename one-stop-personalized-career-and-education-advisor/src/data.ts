import { LanguageOption, QuickCategory, InterviewQuestion } from "./types";

export const LANGUAGES: LanguageOption[] = [
  { code: "auto", label: "Auto-Detect Language", nativeLabel: "தானாகக் கண்டறி" },
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी" },
  { code: "ta", label: "Tamil", nativeLabel: "தமிழ்" },
  { code: "te", label: "Telugu", nativeLabel: "తెలుగు" },
  { code: "kn", label: "Kannada", nativeLabel: "ಕನ್ನಡ" },
  { code: "ml", label: "Malayalam", nativeLabel: "മലയാളം" },
  { code: "mr", label: "Marathi", nativeLabel: "मराठी" }
];

export const QUICK_CATEGORIES: QuickCategory[] = [
  {
    id: "career_guidance",
    label: "Career Guidance",
    description: "Discover suitable paths based on skills and interest.",
    prompt: "I want to explore suitable career paths. Ask me some questions about my interests, qualification, and skills to help me decide, then recommend a roadmap."
  },
  {
    id: "course_recommendations",
    label: "Course Recommendations",
    description: "Find best certifications or degree programs.",
    prompt: "What are the most valued degrees, diplomas, or professional certifications to pursue for a career in technology and artificial intelligence today?"
  },
  {
    id: "college_finder",
    label: "College Finder",
    description: "Guide on selecting appropriate universities.",
    prompt: "How do I choose the right college for higher education? What are the factors I should consider, such as rank, fees, placement rates, and location?"
  },
  {
    id: "scholarships",
    label: "Scholarships",
    description: "Identify government & merit financial aids.",
    prompt: "What are the key government and private scholarship schemes available for school and college students? Outline their eligibility and general process."
  },
  {
    id: "competitive_exams",
    label: "Competitive Exams",
    description: "Study plans for UPSC, NEET, JEE, GATE.",
    prompt: "Provide a comprehensive guidance overview on preparing for competitive exams like UPSC and JEE. What are the common preparation strategies?"
  },
  {
    id: "resume_review",
    label: "Resume Improvement",
    description: "Learn how to optimize resume and pass ATS.",
    prompt: "Give me some high-level tips to make my resume ATS-friendly. What sections are mandatory, and what are common formatting mistakes to avoid?"
  },
  {
    id: "interview_prep",
    label: "Interview Prep",
    description: "Prepare for HR and technical interviews.",
    prompt: "I am preparing for an upcoming job interview. What are the top 5 behavioral interview questions and how should I structure my answers using the STAR method?"
  },
  {
    id: "government_schemes",
    label: "Government Schemes",
    description: "Learn about free education & training programs.",
    prompt: "What are some government education schemes and skill development initiatives (like PMKVY) that provide free vocational training?"
  },
  {
    id: "career_change",
    label: "Career Change",
    description: "Transition smoothly into a new field.",
    prompt: "I want to plan a career change. How do I transition to a new industry without losing my prior experience? Provide step-by-step guidance."
  },
  {
    id: "freelancing",
    label: "Freelancing & Gig Work",
    description: "How to start freelance consulting.",
    prompt: "How can I start my freelancing journey? What platforms should I join, and how should I build a strong portfolio to land my first client?"
  },
  {
    id: "entrepreneurship",
    label: "Entrepreneurship",
    description: "Guide on launching your own business.",
    prompt: "What are the step-by-step phases of launching a start-up? Explain how to validate an business idea, build an MVP, and seek initial funding."
  },
  {
    id: "future_careers",
    label: "Future Careers",
    description: "Explore tech & future work trends.",
    prompt: "What are the top future career trends and job roles that will be in highest demand over the next 10 years due to AI and automation?"
  }
];

export interface ExamGuide {
  name: string;
  category: string;
  eligibility: string;
  pattern: string;
  strategy: string;
  resources: string[];
}

export const EXAM_GUIDES: ExamGuide[] = [
  {
    name: "UPSC (Union Public Service Commission)",
    category: "Civil Services",
    eligibility: "Any Graduate, age 21 to 32 (relaxations apply).",
    pattern: "Three stages: 1. Preliminary Exam (Objective), 2. Mains Exam (Written Descriptive), 3. Personality Test (Interview).",
    strategy: "Read standard NCERT books (6th to 12th) for basics. Follow daily national newspapers (e.g., The Hindu) for current affairs. Practice writing concise, structured answers regularly.",
    resources: ["NCERT Textbooks", "Laxmikanth Indian Polity", "Ramesh Singh Indian Economy", "Mrunal Patel lectures"]
  },
  {
    name: "JEE (Joint Entrance Examination)",
    category: "Engineering",
    eligibility: "12th standard completed or appearing with Physics, Chemistry, and Mathematics.",
    pattern: "JEE Main (Computer Based, MCQ + Numerical) and JEE Advanced for IIT admissions.",
    strategy: "Focus deeply on conceptual clarity in Physics and Chemistry. Solve past 10-year question papers. Practice rigorous speed and accuracy drills for Mathematics.",
    resources: ["NCERT Physics & Chemistry", "HC Verma Physics", "RD Sharma Mathematics", "Official Mock Tests"]
  },
  {
    name: "NEET (National Eligibility cum Entrance Test)",
    category: "Medical",
    eligibility: "12th standard completed or appearing with Physics, Chemistry, and Biology/Biotechnology.",
    pattern: "Single-stage paper-pencil test. 180 questions (90 Biology, 45 Physics, 45 Chemistry).",
    strategy: "Biology NCERT is the ultimate holy book (95%+ questions are directly from it). Create short notes for organic chemistry reactions and physics formulas.",
    resources: ["NCERT Biology (Class 11 & 12)", "Dinesh Biology", "Concepts of Physics by HC Verma"]
  },
  {
    name: "GATE (Graduate Aptitude Test in Engineering)",
    category: "Higher Education / PSU Jobs",
    eligibility: "Final year or completed Bachelor's degree in Engineering/Technology/Science.",
    pattern: "Computer Based Test. Multiple Choice (MCQ), Multiple Select (MSQ), and Numerical Answer Type (NAT).",
    strategy: "Strengthen core engineering subjects. Allocate 15% focus to General Aptitude and Engineering Mathematics, which are high-scoring sections.",
    resources: ["Standard University Textbooks", "GATE PYQ Books", "NPTEL Video Lectures"]
  },
  {
    name: "CAT (Common Admission Test)",
    category: "Management / MBA",
    eligibility: "Any Graduate with minimum 50% marks (45% for reserved categories).",
    pattern: "Computer Based Test containing three sections: VARC (Verbal), DILR (Data/Logic), and QA (Quantitative Ability).",
    strategy: "Focus heavily on mental mathematics and logical parsing. Practice sectional mock tests under strict timed conditions to build test-taking stamina.",
    resources: ["Arun Sharma Quantitative Aptitude", "Word Power Made Easy", "Weekly full-length mock tests"]
  },
  {
    name: "GRE / TOEFL / IELTS",
    category: "Study Abroad",
    eligibility: "Anyone planning to apply for foreign universities (Graduate or Undergraduate level).",
    pattern: "GRE tests Verbal, Quantitative, and Analytical Writing. TOEFL/IELTS tests Reading, Listening, Speaking, and Writing.",
    strategy: "For English tests, speak regularly in English and practice listening to different accents. For GRE, build a high-frequency vocabulary list and master math basics.",
    resources: ["Official ETS GRE Guide", "Barron's Wordlist", "Cambridge IELTS Practice books", "Duolingo English practice"]
  },
  {
    name: "Bank Exams (IBPS PO / SBI PO)",
    category: "Banking",
    eligibility: "Any Graduate from a recognized university.",
    pattern: "Prelims (English, Quant, Reasoning) followed by Mains and Personal Interview.",
    strategy: "Speed is the deciding factor in Prelims. Learn Vedic math techniques for rapid calculations and practice analytical reasoning puzzles daily.",
    resources: ["RS Aggarwal Quantitative Aptitude", "Fast Track Objective Arithmetic", "Banking Awareness magazines"]
  }
];

export interface ScholarshipGuide {
  name: string;
  type: string;
  eligibility: string;
  benefit: string;
  actionSteps: string;
}

export const SCHOLARSHIP_GUIDES: ScholarshipGuide[] = [
  {
    name: "National Scholarship Portal (NSP) schemes",
    type: "Government / Need-based",
    eligibility: "Belonging to minority, SC/ST, or low-income backgrounds studying in school/college.",
    benefit: "Full or partial tuition fee waivers, maintenance allowance, and academic support.",
    actionSteps: "Apply online at the official NSP website. Prepare Income Certificate, Caste Certificate, and previous year academic transcripts."
  },
  {
    name: "AICTE Pragati Scholarship for Girls",
    type: "Government / Girl Child",
    eligibility: "Girl students admitted to 1st year of Degree/Diploma program in AICTE approved institutions with family income under ₹8 LPA.",
    benefit: "₹50,000 per annum for tuition fees, purchase of books, equipment, or laptops.",
    actionSteps: "Apply through the National Scholarship Portal. Ensure college admission letters and fee receipts are uploaded correctly."
  },
  {
    name: "Kishore Vaigyanik Protsahan Yojana (KVPY) / INSPIRE",
    type: "National / Merit-based",
    eligibility: "Students pursuing basic sciences (B.Sc., BS-MS) with top-tier marks in board exams.",
    benefit: "Monthly fellowship of ₹5,000 to ₹7,000 plus an annual contingency grant.",
    actionSteps: "Qualify through competitive scientific screening or rank high in board exams. Check DST-INSPIRE web portal for timelines."
  },
  {
    name: "Aditya Birla Capital Scholarship Scheme",
    type: "Private / Merit & Need",
    eligibility: "School students (Class 9-12) and undergraduates with minimum 60% marks and household income under ₹6 LPA.",
    benefit: "One-time financial assistance ranging from ₹24,000 to ₹60,000.",
    actionSteps: "Apply on corporate CSR partner sites like Buddy4Study. Gather marksheets, proof of income, and reference letters."
  }
];

export const STATIC_INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    question: "Tell me about yourself.",
    type: "hr",
    tips: "Keep it under 2 minutes. Focus on your recent achievements, skills relevant to the job, and why you are excited about this role. Avoid reciting your entire resume.",
    sampleAnswer: "I am a fresh Computer Science graduate with a strong passion for software engineering. During my studies, I focused on full-stack web development and completed an internship where I built an automated reporting tool that saved the team 5 hours of manual work weekly. I love solving complex algorithms, and I'm eager to bring my developer skillset and proactive mindset to your engineering team."
  },
  {
    question: "What is your greatest weakness?",
    type: "hr",
    tips: "Choose a real but non-critical skill. Explain how you have recognized it and the active, concrete steps you are taking to improve.",
    sampleAnswer: "In the past, I sometimes found it hard to delegate tasks because I wanted to ensure everything was done perfectly. However, during my final year group project, I realized that this led to unnecessary stress. I started using project boards to delegate tasks clearly according to team members' strengths. This not only improved the project outcome but helped me trust others and manage my time much better."
  },
  {
    question: "Why should we hire you?",
    type: "hr",
    tips: "Align your unique skills and project achievements with the specific requirements listed in the job description.",
    sampleAnswer: "You should hire me because I have both the technical proficiency in modern web stacks and a proven track record of self-driven learning. Your job posting mentions a need for someone who can adapt quickly to new frameworks; in college, I learned React and Node.js independently in three weeks to build our campus event portal. I'm excited to apply this adaptability to deliver value here."
  },
  {
    question: "Can you describe a challenging technical problem you solved?",
    type: "technical",
    tips: "Use the STAR method: Situation, Task, Action, Result. Highlight your problem-solving logic and technical choices.",
    sampleAnswer: "Situation: In our college project, the image gallery was loading very slowly, taking over 6 seconds on mobile devices. Task: I was tasked with reducing the page load time below 2 seconds. Action: I optimized the pipeline by implementing lazy loading, compressing user uploads on the client side using Canvas, and setting up image caching. Result: The average page load time dropped to 1.4 seconds, reducing bandwidth usage by 40%."
  },
  {
    question: "What is the difference between REST APIs and GraphQL?",
    type: "technical",
    tips: "Explain conceptually first, then mention key trade-offs like over-fetching/under-fetching, endpoints, and flexible schemas.",
    sampleAnswer: "REST APIs use standard HTTP verbs and return a fixed structure of data from predefined endpoints, which can sometimes lead to 'over-fetching' (getting more data than needed) or 'under-fetching' (making multiple requests). GraphQL, on the other hand, is a query language that allows clients to request the exact fields they need from a single endpoint, significantly reducing network payload size at the cost of some server-side complexity."
  },
  {
    question: "Describe a time when you had a disagreement with a team member. How did you handle it?",
    type: "behavioral",
    tips: "Focus on communication, active listening, compromise, and achieving a successful, objective team outcome.",
    sampleAnswer: "During a hackathon, a teammate and I disagreed on whether to use SQL or NoSQL. Instead of arguing, I suggested we list the data requirements. We realized our app required heavy relational joins, making SQL the objective choice. My teammate agreed, and we ended up finishing our project on time. This taught me to always ground discussions in project requirements rather than personal opinions."
  }
];
