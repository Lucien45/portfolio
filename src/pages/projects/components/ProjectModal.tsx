import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

// Typage des icônes utilisées
type IconName = "Eye" | "Code" | "Image" | "BarChart3" | "CheckCircle" | "ExternalLink" | "Github" | "Trophy" | "Clock" | "X";

// Typage des props du projet
interface ProjectMetric {
  label: string;
  value: string | number;
}

interface ProjectCodeSnippet {
  title: string;
  language: string;
  code: string;
}

interface ProjectTimelinePhase {
  phase: string;
  duration: string;
  status: string;
}

interface Project {
  title: string;
  subtitle?: string;
  image?: string;
  gallery?: string[];
  fullDescription?: string;
  features?: string[];
  technologies?: string[];
  architecture?: string;
  codeSnippets?: ProjectCodeSnippet[];
  metrics?: ProjectMetric[];
  achievements?: string[];
  timeline?: ProjectTimelinePhase[];
  demoUrl?: string;
  githubUrl?: string;
}

interface ProjectModalProps {
  project?: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

interface Tab {
  id: string;
  name: string;
  icon: IconName;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  if (!project) return null;

  const tabs: Tab[] = [
    { id: 'overview', name: 'Overview', icon: 'Eye' },
    { id: 'technical', name: 'Technical Details', icon: 'Code' },
    { id: 'gallery', name: 'Gallery', icon: 'Image' },
    { id: 'metrics', name: 'Results', icon: 'BarChart3' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            {...{
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 },
                onClick: {onClose},
                className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            }}
          />

          {/* Modal */}
          <motion.div
            {...{
                initial: { opacity: 0, scale: 0.95, y: 20 },
                animate: { opacity: 1, scale: 1, y: 0 },
                exit: { opacity: 0, scale: 0.95, y: 20 },
                className: "fixed inset-4 md:inset-8 lg:inset-16 bg-background border border-border rounded-2xl shadow-elevation z-50 overflow-hidden"
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border bg-muted/30">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                  <Icon name="Code" size={24} color="white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">{project?.title}</h2>
                  <p className="text-sm text-muted-foreground">{project?.subtitle}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                iconName="X"
              />
            </div>

            {/* Content */}
            <div className="flex h-full">
              {/* Sidebar Navigation */}
              <div className="w-64 border-r border-border bg-muted/20 p-4">
                <nav className="space-y-2">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === tab?.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={tab?.icon} size={16} />
                      <span>{tab?.name}</span>
                    </button>
                  ))}
                </nav>

                {/* Quick Actions */}
                <div className="mt-8 space-y-2">
                  {project?.demoUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      onClick={() => window.open(project?.demoUrl, '_blank')}
                      iconName="ExternalLink"
                      iconPosition="left"
                    >
                      Live Demo
                    </Button>
                  )}
                  {project?.githubUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      onClick={() => window.open(project?.githubUrl, '_blank')}
                      iconName="Github"
                      iconPosition="left"
                    >
                      View Code
                    </Button>
                  )}
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6">
                  {/* Overview Tab */}
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      {/* Project Image */}
                      <div className="relative h-64 rounded-xl overflow-hidden">
                        <Image
                            src={project?.image ?? ""}
                            alt={project?.title ?? ""}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      </div>

                      {/* Description */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Project Description</h3>
                        <p className="text-muted-foreground leading-relaxed">{project?.fullDescription}</p>
                      </div>

                      {/* Key Features */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Key Features</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {project?.features?.map((feature, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                              <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
                              <span className="text-sm text-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Technologies Used */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Technologies Used</h3>
                        <div className="flex flex-wrap gap-2">
                          {project?.technologies?.map((tech, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Technical Details Tab */}
                  {activeTab === 'technical' && (
                    <div className="space-y-6">
                      {/* Architecture */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Architecture Overview</h3>
                        <div className="bg-muted/50 rounded-lg p-4">
                          <pre className="text-sm text-foreground font-mono overflow-x-auto">
                            {project?.architecture || `Frontend: React + TypeScript
                            Backend: Node.js + Express
                            Database: PostgreSQL
                            Deployment: Vercel + Railway
                            Authentication: JWT + bcrypt
                            State Management: Redux Toolkit`}
                          </pre>
                        </div>
                      </div>

                      {/* Code Snippets */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Code Highlights</h3>
                        <div className="space-y-4">
                          {project?.codeSnippets?.map((snippet, index) => (
                            <div key={index} className="bg-gray-900 rounded-lg overflow-hidden">
                              <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
                                <span className="text-sm text-gray-300">{snippet?.title}</span>
                                <span className="text-xs text-gray-400">{snippet?.language}</span>
                              </div>
                              <pre className="p-4 text-sm text-gray-100 overflow-x-auto">
                                <code>{snippet?.code}</code>
                              </pre>
                            </div>
                          )) || (
                            <div className="bg-gray-900 rounded-lg overflow-hidden">
                              <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
                                <span className="text-sm text-gray-300">React Component Example</span>
                                <span className="text-xs text-gray-400">TypeScript</span>
                              </div>
                              <pre className="p-4 text-sm text-gray-100 overflow-x-auto">
                                <code>{`const ProjectCard: React.FC<ProjectProps> = ({ project }) => {
                                    const [isLoading, setIsLoading] = useState(false);
                                    
                                    const handleViewProject = async () => {
                                        setIsLoading(true);
                                        try {
                                        await fetchProjectDetails(project.id);
                                        } catch (error) {
                                        console.error('Error loading project:', error);
                                        } finally {
                                        setIsLoading(false);
                                        }
                                    };

                                    return (
                                        <div className="project-card">
                                        <h3>{project.title}</h3>
                                        <Button onClick={handleViewProject} loading={isLoading}>
                                            View Details
                                        </Button>
                                        </div>
                                    );
                                    };`}
                                </code>
                              </pre>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Gallery Tab */}
                  {activeTab === 'gallery' && (
                    <div className="space-y-6">
                      {/* Main Image */}
                      <div className="relative h-96 rounded-xl overflow-hidden">
                        <Image
                            src={project?.gallery?.[activeImageIndex] ?? project?.image ?? ""}
                            alt={`${project?.title ?? ""} screenshot ${activeImageIndex + 1}`}
                            className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Thumbnail Gallery */}
                      <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                        {(project?.gallery || [project?.image])?.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setActiveImageIndex(index)}
                            className={`relative h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                              activeImageIndex === index
                                ? 'border-primary' :'border-transparent hover:border-border'
                            }`}
                          >
                            <Image
                                src={image ?? ""}
                                alt={`${project?.title ?? ""} thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Metrics Tab */}
                  {activeTab === 'metrics' && (
                    <div className="space-y-6">
                      {/* Key Metrics */}
                      {project?.metrics && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {project?.metrics?.map((metric, index) => (
                            <div key={index} className="text-center p-6 bg-muted/50 rounded-xl">
                              <div className="text-3xl font-bold text-primary mb-2">{metric?.value}</div>
                              <div className="text-sm text-muted-foreground">{metric?.label}</div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Achievements */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Project Achievements</h3>
                        <div className="space-y-3">
                          {(project?.achievements || [
                            "Successfully delivered on time and within budget",
                            "Implemented responsive design for all screen sizes",
                            "Achieved 95+ Lighthouse performance score",
                            "Integrated with modern development practices"
                          ])?.map((achievement, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 bg-success/10 rounded-lg">
                              <Icon name="Trophy" size={16} className="text-success mt-0.5" />
                              <span className="text-sm text-foreground">{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Timeline */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Development Timeline</h3>
                        <div className="space-y-4">
                          {(project?.timeline || [
                            { phase: "Planning & Design", duration: "2 weeks", status: "completed" },
                            { phase: "Frontend Development", duration: "4 weeks", status: "completed" },
                            { phase: "Backend Integration", duration: "3 weeks", status: "completed" },
                            { phase: "Testing & Deployment", duration: "1 week", status: "completed" }
                          ])?.map((phase, index) => (
                            <div key={index} className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg">
                              <div className={`w-3 h-3 rounded-full ${
                                phase?.status === 'completed' ? 'bg-success' : 'bg-warning'
                              }`} />
                              <div className="flex-1">
                                <div className="font-medium text-foreground">{phase?.phase}</div>
                                <div className="text-sm text-muted-foreground">{phase?.duration}</div>
                              </div>
                              <Icon 
                                name={phase?.status === 'completed' ? 'CheckCircle' : 'Clock'} 
                                size={16} 
                                className={phase?.status === 'completed' ? 'text-success' : 'text-warning'} 
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;