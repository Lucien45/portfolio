import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import type { Project } from '../type';

// interface ProjectMetric {
//   label: string;
//   value: string | number;
// }

// interface Project {
//   id?: string;
//   title: string;
//   subtitle?: string;
//   description: string;
//   image: string;
//   type?: string;
//   year?: string | number;
//   status?: "completed" | "in-progress" | "planning";
//   technologies?: string[];
//   metrics?: ProjectMetric[];
//   githubUrl?: string;
//   demoUrl?: string;
// }

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
  onViewCode: (project: Project) => void;
  onViewDemo: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onViewDetails, onViewCode, onViewDemo }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-soft hover:shadow-elevation transition-all duration-300">
            <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                // className="bg-card border border-border rounded-xl overflow-hidden shadow-soft hover:shadow-elevation transition-all duration-300"
                {...{
                    onMouseEnter: () => setIsHovered(true),
                    onMouseLeave: () => setIsHovered(false),
                }}
            >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                    <Image
                        src={project?.image}
                        alt={project?.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            project?.status === 'completed' 
                            ? 'bg-success text-success-foreground' 
                            : project?.status === 'in-progress' ?'bg-warning text-warning-foreground' :'bg-muted text-muted-foreground'
                        }`}>
                            {project?.status === 'completed' ? 'Completed' : 
                            project?.status === 'in-progress' ? 'In Progress' : 'Planning'}
                        </span>
                    </div>

                    {/* Quick Actions */}
                    <div className={`absolute top-4 right-4 flex space-x-2 transition-all duration-300 ${
                        isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    }`}>
                        {project?.demoUrl && (
                            <button
                            onClick={() => onViewDemo(project)}
                            className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                            title="View Demo"
                            >
                            <Icon name="ExternalLink" size={16} color="white" />
                            </button>
                        )}
                        {project?.githubUrl && (
                            <button
                            onClick={() => onViewCode(project)}
                            className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                            title="View Code"
                            >
                            <Icon name="Github" size={16} color="white" />
                            </button>
                        )}
                    </div>

                    {/* Project Type */}
                    <div className="absolute bottom-4 left-4">
                        <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-white text-xs font-medium">
                            {project?.type}
                        </span>
                    </div>
                </div>
                {/* Project Content */}
                <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                        <div>
                            <h3 className="text-lg font-semibold text-foreground mb-1">{project?.title}</h3>
                            <p className="text-sm text-muted-foreground">{project?.subtitle}</p>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <Icon name="Calendar" size={12} />
                            <span>{project?.year}</span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {project?.description}
                    </p>

                    {/* Technologies */}
                    {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 4).map((tech, index) => (
                            <span
                            key={index}
                            className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs font-medium"
                            >
                            {tech}
                            </span>
                        ))}
                        {project.technologies.length > 4 && (
                            <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs font-medium">
                            +{project.technologies.length - 4} more
                            </span>
                        )}
                        </div>
                    )}

                    {/* Metrics */}
                    {project?.metrics && (
                    <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-muted/50 rounded-lg">
                        {project?.metrics?.map((metric, index) => (
                            <div key={index} className="text-center">
                                <div className="text-sm font-semibold text-foreground">{metric?.value}</div>
                                <div className="text-xs text-muted-foreground">{metric?.label}</div>
                            </div>
                        ))}
                    </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onViewDetails(project)}
                            iconName="Eye"
                            iconPosition="left"
                        >
                            View Details
                        </Button>
                    
                        <div className="flex items-center space-x-2">
                            {project?.githubUrl && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onViewCode(project)}
                                iconName="Github"
                                iconPosition="left"
                            >
                                Code
                            </Button>
                            )}
                            {project?.demoUrl && (
                            <Button
                                variant="default"
                                size="sm"
                                onClick={() => onViewDemo(project)}
                                iconName="ExternalLink"
                                iconPosition="left"
                            >
                                Demo
                            </Button>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ProjectCard;