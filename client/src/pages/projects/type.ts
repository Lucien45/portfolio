export type IconName =
  | "FolderOpen"
  | "Code"
  | "Filter"
  | "X"
  | "Grid3x3"
  | "Globe"
  | "Server"
  | "Package"
  | "Calendar"
  | "ExternalLink"
  | "Github"
  | "Linkedin"
  | "Eye"
  | "List"
  | "RotateCcw"
  | "MessageCircle"
  | "GraduationCap"
  | "Briefcase"
  | "Code"
  | "Award"
  | "CheckCircle"
  | "ChevronUp"
  | "ChevronDown"
  | "Lightbulb"
  | "Users"
  | "Target"
  | "MapPin"
  | "MessageCircle"
  | "FolderOpen"
  | "Mail"
  | "Phone"
  | "Download"
  | "Languages"
  | "Heart"
  | "MessageCircle"
  ;

export type StatsColor = "primary" | "secondary" | "success" | "warning" | "accent";

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  fullDescription?: string;
  image: string;
  technologies: string[];
  category: string;
  type: string;
  status: string;
  year: string;
  demoUrl?: string;
  githubUrl?: string;
  metrics?: { label: string; value: string }[];
  features?: string[];
  gallery?: string[];
  codeSnippets?: {
    title: string;
    language: string;
    code: string;
  }[];
  achievements?: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: IconName;
  count: number;
}

export interface Technology {
  name: string;
  color: string;
  count: number;
}