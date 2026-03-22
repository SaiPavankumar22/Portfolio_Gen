export interface UserPersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  professionalTitle: string;
  summary: string;
  profilePicture?: string;
  resume?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  achievements?: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  images?: string[];
  achievements?: string[];
}

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
  portfolio?: string;
}

export interface UserProfile {
  personalInfo: UserPersonalInfo;
  skills: string[];
  experience: WorkExperience[];
  education: Education[];
  projects: Project[];
  socialLinks: SocialLinks;
  interests: string[];
  selectedTemplate: string;
  customizations: TemplateCustomization;
}

export interface TemplateCustomization {
  colorPalette: string;
  fontSize: string;
  layout: string;
  accentColor: string;
}

export interface ColorPalette {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  textLight: string;
}

export interface PortfolioTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  colorPalette: ColorPalette;
  preview: string;
  features: string[];
}

export interface QuestionnaireAnswer {
  questionId: string;
  answer: string;
  category: string;
}

export interface UserPersonality {
  answers: QuestionnaireAnswer[];
  profileSummary: string;
  workStyle: string;
  communicationStyle: string;
  leadershipStyle: string;
  problemSolvingApproach: string;
  careerGoals: string;
  values: string[];
}

export interface WizardStep {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<any>;
  completed: boolean;
  required: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'recruiter' | 'candidate';
  message: string;
  timestamp: Date;
  context?: string;
}