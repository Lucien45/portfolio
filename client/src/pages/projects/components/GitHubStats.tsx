/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

interface GitHubProfile {
  name: string;
  username: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  publicRepos: number;
}

interface GitHubRepository {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  updatedAt: string;
  topics: string[];
}

interface GitHubContributions {
  totalCommits: number;
  currentStreak: number;
  longestStreak: number;
  thisYear: number;
}

interface GitHubLanguage {
  name: string;
  percentage: number;
  color: string;
}

interface GitHubStatsData {
  profile: GitHubProfile;
  repositories: GitHubRepository[];
  contributions: GitHubContributions;
  languages: GitHubLanguage[];
}

const GitHubStats: React.FC = () => {
    const [stats, setStats] = useState<GitHubStatsData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Mock GitHub data - in real implementation, this would come from GitHub API
    const mockGitHubData: GitHubStatsData = {
        profile: {
        name: "Savaka Lucien",
        username: "Lucien45",
        avatar: "/photo_a_jour_resize.jpg",
        bio: "Développeur full-stack",
        followers: 127,
        following: 89,
        publicRepos: 24
        },
        repositories: [
        {
            name: "mesupres-registre",
            description: "Système d'inscription des étudiants développé avec React et Node.js pour MESUPRES Madagascar",
            language: "TypeScript",
            stars: 15,
            forks: 3,
            updatedAt: "2024-09-28",
            topics: ["react", "nodejs", "typescript", "education"]
        },
        {
            name: "fc-foudre-website",
            description: "Site web moderne pour le club de football FC FOUDRE avec calendrier des matchs et gestion des joueurs",
            language: "JavaScript",
            stars: 8,
            forks: 2,
            updatedAt: "2024-09-25",
            topics: ["react", "sports", "website", "javascript"]
        },
        {
            name: "portfolio-v2",
            description: "Site web portfolio personnel présentant des projets et des compétences techniques",
            language: "TypeScript",
            stars: 12,
            forks: 1,
            updatedAt: "2024-10-01",
            topics: ["portfolio", "react", "typescript", "vite"]
        },
        {
            name: "react-components-library",
            description: "Bibliothèque de composants React réutilisables avec TypeScript et Tailwind CSS",
            language: "TypeScript",
            stars: 6,
            forks: 1,
            updatedAt: "2024-09-20",
            topics: ["react", "components", "typescript", "tailwindcss"]
        }
        ],
        contributions: {
        totalCommits: 342,
        currentStreak: 12,
        longestStreak: 28,
        thisYear: 156
        },
        languages: [
        { name: "TypeScript", percentage: 45, color: "#3178c6" },
        { name: "JavaScript", percentage: 35, color: "#f7df1e" },
        { name: "Python", percentage: 12, color: "#3776ab" },
        { name: "Java", percentage: 8, color: "#ed8b00" }
        ]
    };

    useEffect(() => {
        // Simulate API loading
        const timer = setTimeout(() => {
            setStats(mockGitHubData);
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="animate-pulse">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-muted rounded-full" />
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-32" />
              <div className="h-3 bg-muted rounded w-24" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded" />
            <div className="h-4 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            // className="bg-card border border-border rounded-xl p-6"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground flex items-center">
                    <Icon name="Github" size={20} className="mr-2" />
                    Activité GitHub
                </h3>
                <a
                    href={`https://github.com/${stats?.profile.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    Voir le profil →
                </a>
            </div>
            {/* Profile Summary */}
            <div className="flex items-center space-x-4 mb-6 p-4 bg-muted/30 rounded-lg">
                <img
                    src={stats?.profile?.avatar}
                    alt={stats?.profile?.name}
                    className="w-16 h-16 rounded-full border-2 border-border"
                />
                <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{stats?.profile?.name}</h4>
                    <p className="text-sm text-muted-foreground">@{stats?.profile?.username}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{stats?.profile?.bio}</p>
                </div>
            </div>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-bold text-foreground">{stats?.profile?.publicRepos}</div>
                    <div className="text-xs text-muted-foreground">Repo</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-bold text-foreground">{stats?.contributions?.totalCommits}</div>
                    <div className="text-xs text-muted-foreground">Total Commits</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-bold text-foreground">{stats?.profile?.followers}</div>
                    <div className="text-xs text-muted-foreground">Followers</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-bold text-foreground">{stats?.contributions?.currentStreak}</div>
                    <div className="text-xs text-muted-foreground">Day Streak</div>
                </div>
            </div>
            {/* Language Distribution */}
            <div className="mb-6">
                <h4 className="text-sm font-medium text-foreground mb-3">Languages les plus utilisées</h4>
                <div className="space-y-2">
                    {stats?.languages?.map((lang, index) => (
                        <div key={index} className="flex items-center space-x-3">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: lang?.color }}
                            />
                            <span className="text-sm text-foreground flex-1">{lang?.name}</span>
                            <span className="text-sm text-muted-foreground">{lang?.percentage}%</span>
                        </div>
                    ))}
                </div>
            </div>
            {/* Recent Repositories */}
            <div>
                <h4 className="text-sm font-medium text-foreground mb-3">Recent Repositories</h4>
                <div className="space-y-3">
                    {stats?.repositories?.slice(0, 3)?.map((repo, index) => (
                        <div key={index} className="p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                            <h5 className="text-sm font-medium text-foreground">{repo?.name}</h5>
                            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <Icon name="Star" size={12} />
                            <span>{repo?.stars}</span>
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{repo?.description}</p>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                            <div
                                className="w-2 h-2 rounded-full"
                                style={{ 
                                backgroundColor: repo?.language === 'TypeScript' ? '#3178c6' : 
                                                repo?.language === 'JavaScript' ? '#f7df1e' : '#666'
                                }}
                            />
                            <span className="text-xs text-muted-foreground">{repo?.language}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                            Updated {new Date(repo.updatedAt)?.toLocaleDateString()}
                            </span>
                        </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    </div>
  );
};

export default GitHubStats;