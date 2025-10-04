export type IconName =
  | "Atom" | "FileType" | "Server" | "Code2" | "Coffee" | "Database"
  | "Leaf" | "Container" | "GitBranch" | "Palette" | "Zap" | "Cloud";

export interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | string;
  experience: string;
  projects: number;
  icon: IconName;
  bgColor: string;
  description: string;
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  status: string; // <-- Obligatoire pour éviter le conflit
  issuedDate: string;
  expiryDate?: string;
  credentialId: string;
  skills: string[];
  certificateUrl?: string;
  badgeUrl?: string;
}