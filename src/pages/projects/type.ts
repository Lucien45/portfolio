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
  | "Eye"
  | "List"
  | "RotateCcw"
  | "MessageCircle";

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