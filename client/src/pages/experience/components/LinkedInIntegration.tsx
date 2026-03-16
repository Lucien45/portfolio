import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LinkedInIntegration: React.FC = () => {
  const [activeTab, setActiveTab] = useState('recommendations');

  const recommendations = [
    {
      id: 1,
      author: {
        name: "Dr. Rakoto Andriamampianina",
        title: "IT Director at MESUPRES",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        connection: "Former Supervisor"
      },
      relationship: "Lucien reported directly to Dr. Rakoto at MESUPRES",
      date: "August 15, 2024",
      recommendation: `I had the pleasure of supervising Lucien during his internship at MESUPRES, where he worked on our critical student registry system. His technical expertise in React and Node.js, combined with his ability to understand complex government requirements, made him an invaluable team member.\n\nLucien consistently delivered high-quality code and showed remarkable problem-solving skills when dealing with large-scale data management challenges. His work directly contributed to improving our digital infrastructure and will benefit thousands of students across Madagascar.\n\nI highly recommend Lucien for any full-stack development role. His professionalism, technical skills, and dedication make him an asset to any organization.`,
      skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "System Design"]
    },
    {
      id: 2,
      author: {
        name: "Jean-Claude Ramaroson",
        title: "President at FC FOUDRE",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        connection: "Client"
      },
      relationship: "Jean-Claude hired Lucien for web development services",
      date: "May 22, 2024",
      recommendation: `Lucien developed our club's website from scratch, and the results exceeded all our expectations. His understanding of our community needs and ability to translate them into a functional, beautiful website was impressive.\n\nThe website has significantly improved our fan engagement and online presence. Lucien's attention to detail, responsiveness to feedback, and professional approach throughout the project made the collaboration seamless.\n\nI would not hesitate to work with Lucien again and recommend him to anyone looking for a skilled web developer who truly cares about delivering quality results.`,
      skills: ["React", "JavaScript", "Web Design", "Client Communication", "Project Management"]
    },
    {
      id: 3,
      author: {
        name: "Marie Razafy",
        title: "Senior Developer at TechMada",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        connection: "Colleague"
      },
      relationship: "Marie collaborated with Lucien on open source projects",
      date: "September 10, 2024",
      recommendation: `I've had the opportunity to collaborate with Lucien on several open source projects, and his contributions have been consistently excellent. His code quality, attention to best practices, and willingness to help other developers stand out.\n\nLucien brings a fresh perspective to problem-solving and isn't afraid to suggest innovative solutions. His mentorship of junior developers in our community has been particularly valuable.\n\nHe's the kind of developer who elevates the entire team's performance through his technical skills and collaborative spirit.`,
      skills: ["Open Source", "Code Review", "Mentoring", "JavaScript", "TypeScript"]
    }
  ];

  const endorsements = [
    { skill: "React", count: 12, recent: ["Dr. Rakoto A.", "Jean-Claude R.", "Marie R."] },
    { skill: "TypeScript", count: 8, recent: ["Marie R.", "Prof. Andry R.", "Hery R."] },
    { skill: "Node.js", count: 10, recent: ["Dr. Rakoto A.", "Marie R.", "David M."] },
    { skill: "JavaScript", count: 15, recent: ["Jean-Claude R.", "Marie R.", "Sarah L."] },
    { skill: "Web Development", count: 14, recent: ["Jean-Claude R.", "Dr. Rakoto A.", "Marie R."] },
    { skill: "Full-Stack Development", count: 9, recent: ["Dr. Rakoto A.", "Marie R.", "Prof. Andry R."] },
    { skill: "Database Design", count: 7, recent: ["Dr. Rakoto A.", "Prof. Andry R.", "Marie R."] },
    { skill: "Problem Solving", count: 11, recent: ["Dr. Rakoto A.", "Jean-Claude R.", "Marie R."] },
    { skill: "Mentoring", count: 6, recent: ["Marie R.", "Hery R.", "Sarah L."] },
    { skill: "Project Management", count: 5, recent: ["Jean-Claude R.", "Dr. Rakoto A.", "Marie R."] }
  ];

  const connections = [
    {
      name: "Dr. Rakoto Andriamampianina",
      title: "IT Director at MESUPRES",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      mutualConnections: 5,
      relationship: "Former Supervisor"
    },
    {
      name: "Jean-Claude Ramaroson",
      title: "President at FC FOUDRE",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      mutualConnections: 3,
      relationship: "Client"
    },
    {
      name: "Marie Razafy",
      title: "Senior Developer at TechMada",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
      mutualConnections: 8,
      relationship: "Colleague"
    },
    {
      name: "Prof. Andry Rasolofomanana",
      title: "Academic Supervisor at ESMIA",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face",
      mutualConnections: 12,
      relationship: "Professor"
    }
  ];

  return (
    <div className="bg-card border border-border rounded-xl shadow-soft overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Icon name="Linkedin" size={20} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">LinkedIn Professional Network</h3>
              <p className="text-sm text-muted-foreground">
                Verified recommendations and professional endorsements
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="ExternalLink"
            iconPosition="right"
            onClick={() => window.open('https://linkedin.com/in/lucien-portfolio', '_blank')}
          >
            View Profile
          </Button>
        </div>
      </div>
      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 px-6">
          {[
            { id: 'recommendations', label: 'Recommendations', count: recommendations?.length },
            { id: 'endorsements', label: 'Skill Endorsements', count: endorsements?.length },
            { id: 'connections', label: 'Professional Network', count: connections?.length }
          ]?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-brand ${
                activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
              }`}
            >
              {tab?.label}
              <span className="ml-2 px-2 py-0.5 bg-muted text-muted-foreground rounded-full text-xs">
                {tab?.count}
              </span>
            </button>
          ))}
        </nav>
      </div>
      {/* Content */}
      <div className="p-6">
        {activeTab === 'recommendations' && (
          <div className="space-y-6">
            {recommendations?.map((rec) => (
              <div key={rec?.id} className="border border-border rounded-lg p-6">
                {/* Author Info */}
                <div className="flex items-start space-x-4 mb-4">
                  <img
                    src={rec?.author?.avatar}
                    alt={rec?.author?.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-border"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{rec?.author?.name}</h4>
                    <p className="text-sm text-muted-foreground">{rec?.author?.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{rec?.relationship}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-muted-foreground">{rec?.date}</span>
                    <div className="flex items-center space-x-1 mt-1">
                      <Icon name="Linkedin" size={12} className="text-blue-600" />
                      <span className="text-xs text-muted-foreground">{rec?.author?.connection}</span>
                    </div>
                  </div>
                </div>

                {/* Recommendation Text */}
                <div className="mb-4">
                  <blockquote className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                    {rec?.recommendation}
                  </blockquote>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {rec?.skills?.map((skill, index) => (
                    <span key={index} className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'endorsements' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {endorsements?.map((endorsement, index) => (
                <div key={index} className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-foreground">{endorsement?.skill}</h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold text-primary">{endorsement?.count}</span>
                      <Icon name="Users" size={14} className="text-muted-foreground" />
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Recent endorsements from: {endorsement?.recent?.join(', ')}
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div 
                        className="bg-primary h-1.5 rounded-full transition-all duration-1000"
                        style={{ width: `${Math.min((endorsement?.count / 15) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'connections' && (
          <div className="space-y-4">
            {connections?.map((connection, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 border border-border rounded-lg hover:bg-muted/30 transition-brand">
                <img
                  src={connection?.avatar}
                  alt={connection?.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-border"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{connection?.name}</h4>
                  <p className="text-sm text-muted-foreground">{connection?.title}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-xs text-muted-foreground">{connection?.relationship}</span>
                    <span className="text-xs text-muted-foreground">
                      {connection?.mutualConnections} mutual connections
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" iconName="MessageCircle">
                  Message
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkedInIntegration;