/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProjectCard from './components/ProjectCard';
import ProjectFilter from './components/ProjectFilter';
import ProjectModal from './components/ProjectModal';
import GitHubStats from './components/GitHubStats';
import CodePlayground from './components/CodePlayground';
import type { Category } from './type';

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


interface Technology {
  name: string;
  color: string;
  count: number;
}


const Projects = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  // Mock project data
  const projects: Project[] = [
    {
      id: 1,
      title: "MESUPRES Registry System",
      subtitle: "Student Management Platform",
      description: "Comprehensive student registry system for MESUPRES Madagascar with enrollment management, academic tracking, and administrative tools.",
      fullDescription: `The MESUPRES Registry System is a comprehensive web application designed to streamline student management processes at MESUPRES Madagascar. This system handles student enrollment, academic record tracking, course management, and administrative workflows.\n\nBuilt with modern web technologies, the platform provides a seamless experience for administrators, faculty, and students. The system includes features for student registration, grade management, attendance tracking, and report generation.\n\nThe application was developed using React with TypeScript for the frontend, Node.js with Express for the backend, and PostgreSQL for data storage. The system implements role-based access control, ensuring data security and appropriate access levels for different user types.`,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
      technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Express", "Tailwind CSS"],
      category: "web",
      type: "Full-Stack Application",
      status: "completed",
      year: "2024",
      demoUrl: "https://mesupres-demo.vercel.app",
      githubUrl: "https://github.com/lucienrazafy/mesupres-registry",
      metrics: [
        { label: "Active Users", value: "500+" },
        { label: "Student Records", value: "2,000+" },
        { label: "Performance Score", value: "95%" }
      ],
      features: [
        "Student enrollment and registration management",
        "Academic record tracking and grade management",
        "Course scheduling and management system",
        "Administrative dashboard with analytics",
        "Role-based access control for security",
        "Report generation and data export",
        "Responsive design for all devices",
        "Real-time notifications and updates"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop"
      ],
      codeSnippets: [
        {
          title: "Student Registration Component",
          language: "TypeScript",
          code: `interface StudentFormData {
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  program: string;
}

const StudentRegistration: React.FC = () => {
  const [formData, setFormData] = useState<StudentFormData>({
    firstName: '',
    lastName: '',
    email: '',
    studentId: '',
    program: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/students', formData);
      toast.success('Student registered successfully');
    } catch (error) {
      toast.error('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="First Name"
        value={formData.firstName}
        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
        required
      />
      {/* Additional form fields */}
    </form>
  );
};`
        }
      ],
      achievements: [
        "Successfully deployed and serving 500+ active users",
        "Reduced administrative workload by 60%",
        "Achieved 99.9% uptime since deployment",
        "Implemented comprehensive security measures"
      ]
    },
    {
      id: 2,
      title: "FC FOUDRE Website",
      subtitle: "Football Club Management",
      description: "Modern website for FC FOUDRE football club featuring match scheduling, player profiles, news updates, and fan engagement tools.",
      fullDescription: `The FC FOUDRE website is a comprehensive digital platform designed for the football club to manage their online presence and engage with fans. The website includes features for match scheduling, player management, news publication, and fan interaction.\n\nThe platform provides administrators with tools to manage team rosters, schedule matches, publish news articles, and track statistics. Fans can view upcoming matches, player profiles, team news, and interact with the community through comments and social features.\n\nBuilt with React and modern web technologies, the website is fully responsive and optimized for performance. The design reflects the club's brand identity while providing an intuitive user experience for both administrators and visitors.`,
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop",
      technologies: ["React", "JavaScript", "Firebase", "Tailwind CSS", "Framer Motion"],
      category: "web",
      type: "Website",
      status: "completed",
      year: "2024",
      demoUrl: "https://fc-foudre.netlify.app",
      githubUrl: "https://github.com/lucienrazafy/fc-foudre-website",
      metrics: [
        { label: "Monthly Visitors", value: "1,200+" },
        { label: "Match Records", value: "150+" },
        { label: "Load Time", value: "1.2s" }
      ],
      features: [
        "Match scheduling and results tracking",
        "Player profiles and statistics",
        "News and announcements system",
        "Photo gallery and media management",
        "Fan engagement and comments",
        "Mobile-responsive design",
        "Social media integration",
        "SEO optimization for better visibility"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop",
        "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=400&fit=crop",
        "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&h=400&fit=crop"
      ]
    },
    {
      id: 3,
      title: "Portfolio Website v2",
      subtitle: "Personal Brand Platform",
      description: "Modern portfolio website showcasing technical skills, projects, and professional experience with interactive elements and animations.",
      fullDescription: `This portfolio website represents the evolution of my personal brand and professional presence online. Built with cutting-edge web technologies, it showcases my technical skills, project portfolio, and professional journey in an engaging and interactive manner.\n\nThe website features a modern design with smooth animations, interactive elements, and comprehensive project showcases. It includes detailed case studies, code samples, and technical demonstrations that highlight my expertise in full-stack development.\n\nThe platform is built with React, TypeScript, and modern development practices, demonstrating proficiency in current web technologies while maintaining excellent performance and accessibility standards.`,
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=400&fit=crop",
      technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
      category: "web",
      type: "Portfolio",
      status: "completed",
      year: "2024",
      demoUrl: "https://lucienrazafy.dev",
      githubUrl: "https://github.com/lucienrazafy/portfolio-v2",
      metrics: [
        { label: "Performance Score", value: "98%" },
        { label: "Accessibility", value: "100%" },
        { label: "SEO Score", value: "95%" }
      ],
      features: [
        "Interactive project showcases with live demos",
        "Animated skill visualizations",
        "Professional timeline and experience",
        "Contact form with email integration",
        "Blog section for technical articles",
        "Dark/light theme support",
        "Mobile-first responsive design",
        "SEO optimized for professional discovery"
      ]
    },
    {
      id: 4,
      title: "React Components Library",
      subtitle: "Reusable UI Components",
      description: "Comprehensive library of reusable React components built with TypeScript and Tailwind CSS for rapid application development.",
      fullDescription: `A comprehensive library of reusable React components designed to accelerate development workflows and maintain consistency across projects. This library includes a wide range of UI components, from basic elements to complex interactive components.\n\nEach component is built with TypeScript for type safety, Tailwind CSS for styling, and follows modern React patterns and best practices. The library includes comprehensive documentation, usage examples, and testing coverage.\n\nThe components are designed to be highly customizable while maintaining a consistent design system. They support theming, accessibility standards, and are optimized for performance.`,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Storybook", "Jest"],
      category: "library",
      type: "Component Library",
      status: "in-progress",
      year: "2024",
      githubUrl: "https://github.com/lucienrazafy/react-components-library",
      metrics: [
        { label: "Components", value: "45+" },
        { label: "Test Coverage", value: "92%" },
        { label: "Bundle Size", value: "12KB" }
      ],
      features: [
        "45+ reusable React components",
        "TypeScript support with full type definitions",
        "Tailwind CSS integration",
        "Comprehensive Storybook documentation",
        "Jest testing with high coverage",
        "Accessibility compliance (WCAG 2.1)",
        "Theme customization support",
        "Tree-shaking for optimal bundle size"
      ]
    },
    {
      id: 5,
      title: "Task Management API",
      subtitle: "RESTful Backend Service",
      description: "Robust REST API for task management applications with authentication, real-time updates, and comprehensive project organization.",
      fullDescription: `A comprehensive REST API designed to power task management applications with enterprise-level features and scalability. The API provides endpoints for user management, project organization, task tracking, and team collaboration.\n\nBuilt with Node.js and Express, the API implements JWT authentication, role-based access control, and real-time updates through WebSocket connections. It includes comprehensive validation, error handling, and logging for production reliability.\n\nThe API is designed with scalability in mind, featuring database optimization, caching strategies, and rate limiting to handle high-traffic scenarios while maintaining performance.`,
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
      technologies: ["Node.js", "Express", "MongoDB", "JWT", "Socket.io", "Redis"],
      category: "api",
      type: "Backend API",
      status: "completed",
      year: "2024",
      githubUrl: "https://github.com/lucienrazafy/task-management-api",
      metrics: [
        { label: "API Endpoints", value: "25+" },
        { label: "Response Time", value: "<100ms" },
        { label: "Uptime", value: "99.9%" }
      ],
      features: [
        "JWT-based authentication and authorization",
        "Role-based access control (RBAC)",
        "Real-time updates with WebSocket",
        "Comprehensive API documentation",
        "Rate limiting and security middleware",
        "Database optimization and indexing",
        "Automated testing with Jest",
        "Docker containerization for deployment"
      ]
    },
    {
      id: 6,
      title: "Data Visualization Dashboard",
      subtitle: "Analytics Platform",
      description: "Interactive dashboard for data visualization and analytics with real-time charts, filtering capabilities, and export functionality.",
      fullDescription: `An interactive data visualization dashboard designed to transform complex datasets into actionable insights through intuitive charts, graphs, and analytics tools. The platform supports multiple data sources and provides real-time visualization capabilities.\n\nBuilt with React and D3.js, the dashboard offers a wide range of chart types, interactive filtering, and customizable layouts. Users can create custom dashboards, set up alerts, and export data in various formats.\n\nThe platform is designed for scalability and performance, handling large datasets efficiently while maintaining smooth user interactions and real-time updates.`,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
      technologies: ["React", "D3.js", "Python", "FastAPI", "PostgreSQL", "Redis"],
      category: "web",
      type: "Dashboard",
      status: "in-progress",
      year: "2024",
      githubUrl: "https://github.com/lucienrazafy/data-viz-dashboard",
      metrics: [
        { label: "Data Points", value: "1M+" },
        { label: "Chart Types", value: "15+" },
        { label: "Load Time", value: "2.1s" }
      ],
      features: [
        "Interactive charts with D3.js",
        "Real-time data updates",
        "Custom dashboard builder",
        "Advanced filtering and search",
        "Data export in multiple formats",
        "Responsive design for all devices",
        "User authentication and permissions",
        "API integration for external data sources"
      ]
    }
  ];

  // Categories for filtering
  const categories: Category[] = [
    { id: 'all', name: 'All Projects', icon: 'Grid3x3', count: projects?.length },
    { id: 'web', name: 'Web Applications', icon: 'Globe', count: projects?.filter(p => p?.category === 'web')?.length },
    { id: 'api', name: 'Backend APIs', icon: 'Server', count: projects?.filter(p => p?.category === 'api')?.length },
    { id: 'library', name: 'Libraries', icon: 'Package', count: projects?.filter(p => p?.category === 'library')?.length }
  ];

  // Technologies for filtering
  const technologies: Technology[] = [
    { name: 'React', color: '#61DAFB', count: projects?.filter(p => p?.technologies?.includes('React'))?.length },
    { name: 'TypeScript', color: '#3178C6', count: projects?.filter(p => p?.technologies?.includes('TypeScript'))?.length },
    { name: 'Node.js', color: '#339933', count: projects?.filter(p => p?.technologies?.includes('Node.js'))?.length },
    { name: 'Python', color: '#3776AB', count: projects?.filter(p => p?.technologies?.includes('Python'))?.length },
    { name: 'JavaScript', color: '#F7DF1E', count: projects?.filter(p => p?.technologies?.includes('JavaScript'))?.length },
    { name: 'Tailwind CSS', color: '#06B6D4', count: projects?.filter(p => p?.technologies?.includes('Tailwind CSS'))?.length }
  ];

  // Filter projects based on selected criteria
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const categoryMatch = selectedCategory === 'all' || project.category === selectedCategory;
      const technologyMatch = selectedTechnologies.length === 0 || 
        selectedTechnologies.some(tech => project.technologies.includes(tech));
      
      return categoryMatch && technologyMatch;
    });
  }, [projects, selectedCategory, selectedTechnologies]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleTechnologyToggle = (technology: string) => {
    setSelectedTechnologies(prev => 
      prev?.includes(technology)
        ? prev?.filter(t => t !== technology)
        : [...prev, technology]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSelectedTechnologies([]);
  };

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleViewCode = (project: Project) => {
    if (project?.githubUrl) {
      window.open(project?.githubUrl, '_blank');
    }
  };

  const handleViewDemo = (project: Project) => {
    if (project?.demoUrl) {
      window.open(project?.demoUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Projects - Lucien Razafy | Full-Stack Developer Portfolio</title>
        <meta name="description" content="Explore my technical projects including MESUPRES registry system, FC FOUDRE website, and other full-stack applications built with React, TypeScript, and modern web technologies." />
        <meta name="keywords" content="React projects, TypeScript, full-stack development, web applications, Madagascar developer, portfolio projects" />
      </Helmet>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                // className="text-center mb-12"
              >
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  Technical Projects
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  Interactive showcase of full-stack applications, featuring live demos, code samples, 
                  and detailed case studies of real-world projects built with modern technologies.
                </p>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{projects?.length}</div>
                    <div className="text-sm text-muted-foreground">Total Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary">{projects?.filter(p => p?.status === 'completed')?.length}</div>
                    <div className="text-sm text-muted-foreground">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">15+</div>
                    <div className="text-sm text-muted-foreground">Technologies</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">3K+</div>
                    <div className="text-sm text-muted-foreground">Lines of Code</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* GitHub Stats */}
                <GitHubStats />

                {/* View Mode Toggle */}
                <div className="bg-card border border-border rounded-xl p-4">
                  <h3 className="text-sm font-medium text-foreground mb-3">View Mode</h3>
                  <div className="flex space-x-2">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      iconName="Grid3x3"
                    />
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      iconName="List"
                    />
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3 space-y-8">
                {/* Project Filter */}
                <ProjectFilter
                  categories={categories}
                  technologies={technologies}
                  selectedCategory={selectedCategory}
                  selectedTechnologies={selectedTechnologies}
                  onCategoryChange={handleCategoryChange}
                  onTechnologyToggle={handleTechnologyToggle}
                  onClearFilters={handleClearFilters}
                  projectCount={filteredProjects?.length}
                />

                {/* Projects Grid */}
                <div className={`grid gap-6 ${
                  viewMode === 'grid' ?'grid-cols-1 md:grid-cols-2' :'grid-cols-1'
                }`}>
                  <AnimatePresence>
                    {filteredProjects?.map((project) => (
                      <ProjectCard
                        key={project?.id}
                        project={project}
                        onViewDetails={handleViewDetails}
                        onViewCode={handleViewCode}
                        onViewDemo={handleViewDemo}
                      />
                    ))}
                  </AnimatePresence>
                </div>

                {/* No Results */}
                {filteredProjects?.length === 0 && (
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            // className="text-center py-12"
                        >
                            <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-foreground mb-2">No projects found</h3>
                            <p className="text-muted-foreground mb-4">
                            Try adjusting your filters to see more projects.
                            </p>
                            <Button
                            variant="outline"
                            onClick={handleClearFilters}
                            iconName="RotateCcw"
                            iconPosition="left"
                            >
                            Clear Filters
                            </Button>
                        </motion.div>
                    </div>
                )}

                {/* Code Playground */}
                <CodePlayground />
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Ready to Start Your Project?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Let's collaborate on your next web application or discuss how these technologies 
                can solve your business challenges.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="default"
                  size="lg"
                  iconName="MessageCircle"
                  iconPosition="left"
                  onClick={() => window.location.href = '/contact'}
                >
                  Start a Conversation
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  iconName="Github"
                  iconPosition="left"
                  onClick={() => window.open('https://github.com/lucienrazafy', '_blank')}
                >
                  View All Code
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Projects;