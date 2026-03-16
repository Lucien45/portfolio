import React, { useState } from 'react';
import Icon, { type IconName } from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

type ExperienceType = 'internship' | 'freelance' | 'project';
type ExperienceStatus = 'completed' | 'active' | 'planned';

interface Impact {
  [key: string]: string;
}

interface Supervisor {
  name: string;
  position: string;
  testimonial: string;
}

interface Client {
  name: string;
  position: string;
  testimonial: string;
}

interface Recognition {
  name: string;
  achievement: string;
  testimonial: string;
}

interface Experience {
  id: number;
  type: ExperienceType;
  title: string;
  company: string;
  location: string;
  period: string;
  duration: string;
  status: ExperienceStatus;
  technologies: string[];
  description: string;
  achievements: string[];
  responsibilities: string[];
  impact: Impact;
  supervisor?: Supervisor;
  client?: Client;
  recognition?: Recognition;
}

const ExperienceTimeline: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const experiences: Experience[] = [
    {
      id: 1,
      type: "internship",
      title: "Full-Stack Developer Intern",
      company: "MESUPRES (Ministry of Higher Education)",
      location: "Antananarivo, Madagascar",
      period: "June 2024 - August 2024",
      duration: "3 months",
      status: "completed",
      technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Express.js"],
      description: `Led the development of a comprehensive student registry system for Madagascar's higher education sector. Collaborated with ministry officials to digitize traditional paper-based processes and improve data accessibility across universities.`,
      achievements: [
        "Reduced student registration processing time by 75% through automated workflows",
        "Implemented secure authentication system handling 10,000+ student records",
        "Designed responsive interface supporting both French and Malagasy languages",
        "Integrated real-time data synchronization across 15+ university campuses"
      ],
      responsibilities: [
        "Full-stack development using React and Node.js ecosystem",
        "Database design and optimization for large-scale student data",
        "API development for inter-university data exchange",
        "User interface design following government accessibility standards"
      ],
      impact: {
        users: "10,000+",
        efficiency: "75%",
        coverage: "15 universities",
        satisfaction: "94%"
      },
      supervisor: {
        name: "Dr. Rakoto Andriamampianina",
        position: "IT Director, MESUPRES",
        testimonial: `Lucien demonstrated exceptional technical skills and professional maturity during his internship. His ability to understand complex government requirements and translate them into efficient technical solutions was impressive. The student registry system he developed has become a cornerstone of our digital transformation initiative.`
      }
    },
    {
      id: 2,
      type: "freelance",
      title: "Web Developer",
      company: "FC FOUDRE Football Club",
      location: "Antananarivo, Madagascar",
      period: "March 2024 - May 2024",
      duration: "3 months",
      status: "completed",
      technologies: ["React", "JavaScript", "Tailwind CSS", "Firebase", "Vercel"],
      description: `Developed a modern, responsive website for FC FOUDRE, a prominent football club in Madagascar. Created an engaging digital presence to connect with fans, showcase team achievements, and facilitate community engagement.`,
      achievements: [
        "Increased online fan engagement by 300% within first month of launch",
        "Implemented multilingual support (French/Malagasy) for broader accessibility",
        "Optimized site performance achieving 95+ Google PageSpeed score",
        "Integrated social media feeds and real-time match updates"
      ],
      responsibilities: [
        "Complete website design and development from concept to deployment",
        "Content management system implementation for easy updates",
        "SEO optimization for local search visibility",
        "Mobile-first responsive design for diverse device usage"
      ],
      impact: {
        visitors: "5,000+",
        engagement: "300%",
        performance: "95/100",
        retention: "68%"
      },
      client: {
        name: "Jean-Claude Ramaroson",
        position: "President, FC FOUDRE",
        testimonial: `Working with Lucien was a fantastic experience. He understood our vision for connecting with our community and delivered a website that exceeded our expectations. The technical quality and attention to detail were outstanding, and the impact on our fan engagement has been remarkable.`
      }
    },
    {
      id: 3,
      type: "project",
      title: "Open Source Contributor",
      company: "Madagascar Tech Community",
      location: "Remote",
      period: "January 2024 - Present",
      duration: "Ongoing",
      status: "active",
      technologies: ["JavaScript", "TypeScript", "React", "Node.js", "Git"],
      description: `Active contributor to open source projects focused on improving web accessibility and supporting the Madagascar developer community. Mentoring junior developers and contributing to educational resources.`,
      achievements: [
        "Contributed to 12+ open source repositories with 50+ merged PRs",
        "Mentored 8 junior developers through code reviews and pair programming",
        "Created educational content reaching 500+ developers in Madagascar",
        "Organized 3 local tech meetups with 100+ total attendees"
      ],
      responsibilities: [
        "Code review and quality assurance for community projects",
        "Technical documentation and tutorial creation",
        "Mentorship and knowledge sharing with junior developers",
        "Event organization and community building initiatives"
      ],
      impact: {
        contributions: "50+ PRs",
        mentees: "8 developers",
        reach: "500+ devs",
        events: "3 meetups"
      },
      recognition: {
        name: "Madagascar Developers Community",
        achievement: "Outstanding Contributor 2024",
        testimonial: `Lucien's contributions to our community have been invaluable. His technical expertise, combined with his passion for knowledge sharing, has helped elevate the entire Madagascar tech ecosystem. His mentorship has directly contributed to the growth of several junior developers.`
      }
    }
  ];

  const toggleExpanded = (id: number) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const getStatusColor = (status: ExperienceStatus): string => {
    switch (status) {
      case 'completed': return 'bg-success text-success-foreground';
      case 'active': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeIcon = (type: ExperienceType): IconName => {
    switch (type) {
      case 'internship': return 'Briefcase';
      case 'freelance': return 'Zap';
      case 'project': return 'Code';
      default: return 'Circle';
    }
  };

  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
      <div className="space-y-8">
        {experiences?.map((exp) => (
          <div key={exp?.id} className="relative">
            {/* Timeline Node */}
            <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-soft"></div>
            
            {/* Experience Card */}
            <div className="ml-16 bg-card border border-border rounded-lg shadow-soft hover:shadow-elevation transition-brand">
              {/* Card Header */}
              <div className="p-6 border-b border-border">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={getTypeIcon(exp?.type)} size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{exp?.title}</h3>
                      <p className="text-muted-foreground">{exp?.company}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(exp?.status)}`}>
                      {exp?.status}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={14} />
                    <span>{exp?.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={14} />
                    <span>{exp?.period}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} />
                    <span>{exp?.duration}</span>
                  </div>
                </div>
                
                <p className="text-foreground mb-4">{exp?.description}</p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {exp?.technologies?.map((tech, techIndex) => (
                    <span key={techIndex} className="px-2.5 py-1 bg-muted text-muted-foreground rounded-md text-xs font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  iconName={expandedCard === exp?.id ? "ChevronUp" : "ChevronDown"}
                  iconPosition="right"
                  onClick={() => toggleExpanded(exp?.id)}
                >
                  {expandedCard === exp?.id ? "Show Less" : "View Details"}
                </Button>
              </div>
              
              {/* Expanded Content */}
              {expandedCard === exp?.id && (
                <div className="p-6 space-y-6">
                  {/* Impact Metrics */}
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center">
                      <Icon name="TrendingUp" size={16} className="mr-2" />
                      Impact & Results
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(exp?.impact)?.map(([key, value]) => (
                        <div key={key} className="text-center p-3 bg-muted/50 rounded-lg">
                          <div className="text-lg font-semibold text-primary">{value}</div>
                          <div className="text-xs text-muted-foreground capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Achievements */}
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center">
                      <Icon name="Award" size={16} className="mr-2" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {exp?.achievements?.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start space-x-2">
                          <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-foreground">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Responsibilities */}
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center">
                      <Icon name="Target" size={16} className="mr-2" />
                      Key Responsibilities
                    </h4>
                    <ul className="space-y-2">
                      {exp?.responsibilities?.map((responsibility, respIndex) => (
                        <li key={respIndex} className="flex items-start space-x-2">
                          <Icon name="ArrowRight" size={16} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-foreground">{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Testimonial */}
                  {(exp?.supervisor || exp?.client || exp?.recognition) && (
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center">
                        <Icon name="Quote" size={16} className="mr-2" />
                        Professional Reference
                      </h4>
                      <blockquote className="text-sm text-foreground italic mb-3">
                        "{(exp?.supervisor || exp?.client || exp?.recognition)?.testimonial}"
                      </blockquote>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <Icon name="User" size={16} className="text-primary" />
                        </div>
                        <div>
                            <div className="text-sm font-medium text-foreground">
                                {(exp?.supervisor || exp?.client || exp?.recognition)?.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                                {exp?.supervisor
                                ? exp.supervisor.position
                                : exp?.client
                                ? exp.client.position
                                : exp?.recognition
                                ? exp.recognition.achievement
                                : ""}
                            </div>  
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceTimeline;