import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CodePlayground: React.FC = () => {
    const [activeExample, setActiveExample] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);

    const codeExamples = [
        {
            title: "React Component with TypeScript",
            language: "typescript",
            description: "A reusable card component with proper TypeScript interfaces and modern React patterns",
            code:`interface ProjectCardProps {
                    project: {
                        id: string;
                        title: string;
                        description: string;
                        technologies: string[];
                        status: 'completed' | 'in-progress' | 'planning';
                    };
                    onViewDetails: (project: Project) => void;
                }

                const ProjectCard: React.FC<ProjectCardProps> = ({ 
                    project, 
                    onViewDetails 
                }) => {
                    const [isHovered, setIsHovered] = useState(false);

                    const getStatusColor = (status: string) => {
                        switch (status) {
                        case 'completed': return 'bg-green-500';
                        case 'in-progress': return 'bg-yellow-500';
                        default: return 'bg-gray-500';
                        }
                    };

                    return (
                        <motion.div
                        whileHover={{ y: -5 }}
                        onHoverStart={() => setIsHovered(true)}
                        onHoverEnd={() => setIsHovered(false)}
                        className="bg-white rounded-xl shadow-lg p-6"
                        >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold">{project.title}</h3>
                            <span className={\`px-2 py-1 rounded-full text-xs \${getStatusColor(project.status)}\`}>
                            {project.status}
                            </span>
                        </div>
                        
                        <p className="text-gray-600 mb-4">{project.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.map((tech, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                                {tech}
                            </span>
                            ))}
                        </div>
                        
                        <Button 
                            onClick={() => onViewDetails(project)}
                            className="w-full"
                        >
                            View Details
                        </Button>
                        </motion.div>
                    );
                };
            `
        },
        {
            title: "Custom React Hook",
            language: "typescript",
            description: "A custom hook for managing API calls with loading states and error handling",
            code: `import { useState, useEffect, useCallback } from 'react';

                interface UseApiOptions<T> {
                    initialData?: T;
                    dependencies?: any[];
                }

                interface UseApiReturn<T> {
                    data: T | null;
                    loading: boolean;
                    error: string | null;
                    refetch: () => Promise<void>;
                }

                function useApi<T>(
                    apiCall: () => Promise<T>,
                    options: UseApiOptions<T> = {}
                ): UseApiReturn<T> {
                    const [data, setData] = useState<T | null>(options.initialData || null);
                    const [loading, setLoading] = useState(true);
                    const [error, setError] = useState<string | null>(null);

                const fetchData = useCallback(async () => {
                    try {
                        setLoading(true);
                        setError(null);
                        const result = await apiCall();
                        setData(result);
                    } catch (err) {
                        setError(err instanceof Error ? err.message : 'An error occurred');
                    } finally {
                        setLoading(false);
                    }
                }, [apiCall]);

                useEffect(() => {
                    fetchData();
                }, options.dependencies || [fetchData]);

                return { data, loading, error, refetch: fetchData };
                }

                // Usage example:
                const ProjectList: React.FC = () => {
                const { data: projects, loading, error, refetch } = useApi(
                    () => fetch('/api/projects').then(res => res.json()),
                    { dependencies: [] }
                );

                if (loading) return <div>Loading projects...</div>;
                if (error) return <div>Error: {error}</div>;

                return (
                    <div>
                    {projects?.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                    </div>
                );
                };`
        },
        {
            title: "Node.js API Endpoint",
            language: "javascript",
            description: "Express.js API endpoint with validation, error handling, and database integration",
            code: `const express = require('express');
                const { body, validationResult } = require('express-validator');
                const Project = require('../models/Project');
                const auth = require('../middleware/auth');

                const router = express.Router();

                // GET /api/projects - Fetch all projects with filtering
                router.get('/projects', async (req, res) => {
                    try {
                        const { category, technology, status } = req.query;
                        
                        let filter = {};
                        if (category) filter.category = category;
                        if (technology) filter.technologies = { $in: [technology] };
                        if (status) filter.status = status;

                        const projects = await Project.find(filter)
                        .sort({ createdAt: -1 })
                        .populate('author', 'name email')
                        .lean();

                        res.json({
                            success: true,
                            data: projects,
                            count: projects.length
                        });
                    } catch (error) {
                        console.error('Error fetching projects:', error);
                        res.status(500).json({
                            success: false,
                            message: 'Server error while fetching projects'
                        });
                    }
                });

                // POST /api/projects - Create new project
                router.post('/projects', [
                    auth,
                    body('title').trim().isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
                    body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
                    body('technologies').isArray().withMessage('Technologies must be an array'),
                    body('category').isIn(['web', 'mobile', 'desktop', 'api']).withMessage('Invalid category')
                ], async (req, res) => {
                    try {
                        const errors = validationResult(req);
                        if (!errors.isEmpty()) {
                        return res.status(400).json({
                            success: false,
                            message: 'Validation failed',
                            errors: errors.array()
                        });
                        }

                        const projectData = {
                            ...req.body,
                            author: req.user.id,
                            createdAt: new Date()
                        };

                        const project = new Project(projectData);
                        await project.save();

                        res.status(201).json({
                            success: true,
                            message: 'Project created successfully',
                            data: project
                        });
                    } catch (error) {
                        console.error('Error creating project:', error);
                        res.status(500).json({
                            success: false,
                            message: 'Server error while creating project'
                        });
                    }
                });
                module.exports = router;`
        },
        {
            title: "Python Data Processing",
            language: "python",
            description: "Python script for processing and analyzing project data with pandas and visualization",
            code: `import pandas as pd
                import matplotlib.pyplot as plt
                import seaborn as sns
                from datetime import datetime, timedelta
                import json

                class ProjectAnalyzer:
                    def __init__(self, data_file):
                        self.data_file = data_file
                        self.projects_df = None
                        self.load_data()
                    
                    def load_data(self):
                        """Load project data from JSON file"""
                        try:
                            with open(self.data_file, 'r') as f:
                                data = json.load(f)
                            
                            self.projects_df = pd.DataFrame(data)
                            self.projects_df['created_date'] = pd.to_datetime(self.projects_df['created_date'])
                            self.projects_df['completion_date'] = pd.to_datetime(self.projects_df['completion_date'])
                            
                            print(f"Loaded {len(self.projects_df)} projects")
                        except Exception as e:
                            print(f"Error loading data: {e}")
                    
                    def analyze_project_trends(self):
                        """Analyze project creation and completion trends"""
                        # Projects by month
                        monthly_projects = self.projects_df.groupby(
                            self.projects_df['created_date'].dt.to_period('M')
                        ).size()
                        
                        # Technology usage
                        tech_usage = {}
                        for _, project in self.projects_df.iterrows():
                            for tech in project['technologies']:
                                tech_usage[tech] = tech_usage.get(tech, 0) + 1
                        
                        return {
                            'monthly_trends': monthly_projects.to_dict(),
                            'technology_usage': tech_usage,
                            'completion_rate': self.calculate_completion_rate()
                        }
                    
                    def calculate_completion_rate(self):
                        """Calculate project completion rate"""
                        completed = len(self.projects_df[self.projects_df['status'] == 'completed'])
                        total = len(self.projects_df)
                        return (completed / total) * 100 if total > 0 else 0
                    
                    def generate_report(self):
                        """Generate comprehensive project report"""
                        analysis = self.analyze_project_trends()
                        
                        report = f"""
                        PROJECT ANALYSIS REPORT
                        =====================
                        
                        Total Projects: {len(self.projects_df)}
                        Completion Rate: {analysis['completion_rate']:.1f}%
                        
                        Top Technologies:
                        """
                        
                        sorted_tech = sorted(analysis['technology_usage'].items(), 
                                        key=lambda x: x[1], reverse=True)
                        
                        for tech, count in sorted_tech[:5]:
                            report += f"  - {tech}: {count} projects\\n"
                        
                        return report

                # Usage example
                if __name__ == "__main__":
                    analyzer = ProjectAnalyzer('projects_data.json')
                    report = analyzer.generate_report()
                    print(report)`
        }
    ];

  const currentExample = codeExamples?.[activeExample];

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
        <div className="flex items-center space-x-3">
          <Icon name="Code" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Code Playground</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "Minimize2" : "Maximize2"}
          />
        </div>
      </div>
      {/* Example Tabs */}
      <div className="flex overflow-x-auto border-b border-border bg-muted/20">
        {codeExamples?.map((example, index) => (
          <button
            key={index}
            onClick={() => setActiveExample(index)}
            className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeExample === index
                ? 'border-primary text-primary bg-background' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            {example?.title}
          </button>
        ))}
      </div>
      {/* Code Content */}
      <AnimatePresence mode="wait">
        <div className={`${isExpanded ? 'h-96' : 'h-64'} transition-all duration-300`}>
            <motion.div
                key={activeExample}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                //   className={`${isExpanded ? 'h-96' : 'h-64'} transition-all duration-300`}
            >
            {/* Description */}
            <div className="p-4 border-b border-border bg-muted/10">
                <p className="text-sm text-muted-foreground">{currentExample?.description}</p>
            </div>

            {/* Code Block */}
            <div className="relative h-full bg-gray-900 overflow-hidden">
                <div className="absolute top-0 right-0 p-2 z-10">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigator.clipboard?.writeText(currentExample?.code)}
                    iconName="Copy"
                    className="text-gray-400 hover:text-white"
                />
                </div>
                
                <div className="h-full overflow-auto p-4">
                <pre className="text-sm text-gray-100 font-mono leading-relaxed">
                    <code className={`language-${currentExample?.language}`}>
                    {currentExample?.code}
                    </code>
                </pre>
                </div>
            </div>
            </motion.div>
        </div>
      </AnimatePresence>
      {/* Footer */}
      <div className="flex items-center justify-between p-4 border-t border-border bg-muted/20">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ 
              backgroundColor: currentExample?.language === 'typescript' ? '#3178c6' : 
                             currentExample?.language === 'javascript' ? '#f7df1e' : 
                             currentExample?.language === 'python' ? '#3776ab' : '#666'
            }}
          />
          <span className="capitalize">{currentExample?.language}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Github"
            iconPosition="left"
            onClick={() => window.open('https://github.com/lucienrazafy', '_blank')}
          >
            View on GitHub
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="Play"
            iconPosition="left"
          >
            Run Code
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CodePlayground;