export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  file?: {
    name: string;
    mimeType: string;
    data?: string; // base64 representation
    size?: string;
  };
}

export type LanguageCode = 'en' | 'hi' | 'ta' | 'te' | 'kn' | 'ml' | 'mr' | 'auto';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
}

export interface AssessmentForm {
  qualification: string;
  currentClass: string;
  fieldOfInterest: string;
  favoriteSubjects: string;
  skills: string;
  location: string;
  preferredCareer: string;
  budget: string;
  higherStudiesOrJob: 'Higher Studies' | 'Job' | 'Both' | '';
}

export interface StudyPlanForm {
  goal: string;
  subjects: string;
  dailyHours: string;
  timeline: string;
  preferences: string;
}

export interface QuickCategory {
  id: string;
  label: string;
  description: string;
  prompt: string;
}

export interface InterviewQuestion {
  question: string;
  type: 'technical' | 'hr' | 'behavioral';
  tips: string;
  sampleAnswer: string;
}
