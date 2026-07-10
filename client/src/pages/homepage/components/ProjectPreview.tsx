import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import AppImage from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectPreview = () => {
  // Hover state not needed; using CSS group-hover

  type Project = {
    id: number;
    title: string;
    category: string;
    description: string;
    image: string;
    technologies: string[];
    features: string[];
    status: 'Production' | 'Live' | 'Development';
    impact: string;
    github: string;
    live: string | null;
    color: string;
  };

  const featuredProjects: Project[] = [
    {
      id: 1,
      title: 'School Management',
      category: 'Full-Stack Web Application',
      description: 'School-Management SAAS est une plateforme web moderne conçue pour aider les établissements scolaires à gérer efficacement leurs opérations quotidiennes. Construit avec React, Nest.js et PostgreSQL.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      technologies: ['React', 'TypeScript', 'Nest.js', 'PostgreSQL', 'Docker'],
      features: ['Student Registration', 'Document Management', 'Real-time Analytics', 'Multi-language Support'],
      status: 'Development',
      impact: '10,000+ students registered',
      github: 'https://github.com/Lucien45/School-Management',
      live: '',
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 2,
      title: 'FC FOUDRE Club Website',
      category: 'Sports Club Platform',
      description: 'Site Web réactif moderne pour club de football comprenant la gestion d\'équipe, les calendriers des matchs et les outils d\'engagement des fans.',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop',
      technologies: ['React', 'TypeScript', 'CSS', 'Nest.js', 'PostgreSQL', 'Docker'],
      features: ['Team Roster', 'Match Calendar', 'News & Updates', 'Fan Gallery'],
      status: 'Live',
      impact: '2,000+ active users',
      github: 'https://github.com/Lucien45',
      live: 'https://fcfoudre.com',
      color: 'from-green-500 to-blue-500'
    },
    {
      id: 3,
      title: 'Plateforme de Gestion d\'Article',
      category: 'Full-Stack Application',
      description: 'Gestion-Article est une plateforme complète de gestion et publication d\'articles développée avec NestJS. Le projet comprend un back-office pour la gestion administrative, un front-office pour la consultation publique, et une API robuste basée sur PostgreSQL.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      technologies: ['Next.js', 'TypeScript', 'React', 'PostgresQL', 'Tailwind CSS', 'Docker', 'Render'],
      features: ['Article Catalog', 'Order Tracking', 'Admin Dashboard'],
      status: 'Production',
      impact: 'Launching Q1 2025',
      github: 'https://github.com/Lucien45/Gestion-Article',
      live: 'https://gestion-article.demonstartion.co.uk/',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          {...{
            initial:{ opacity: 0, y: 20 },
            whileInView:{ opacity: 1, y: 0 },
            transition:{ duration: 0.6 },
            viewport:{ once: true },
            className:"text-center mb-16"
          }}
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Icon name="FolderOpen" size={24} className="text-primary" />
            <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
              Œuvre en vedette
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Vitrine du projet
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Des applications concrètes qui démontrent mon expertise en développement full-stack, du concept au déploiement.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {featuredProjects?.map((project, index) => (
            <motion.div
              {...{
                key:project?.id,
                initial:{ opacity: 0, y: 30 },
                whileInView:{ opacity: 1, y: 0 },
                transition:{ duration: 0.6, delay: index * 0.1 },
                viewport:{ once: true },
                className:"group bg-card border border-border rounded-xl overflow-hidden shadow-soft hover:shadow-elevation transition-all duration-300"
              }}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <AppImage
                  src={project?.image}
                  alt={project?.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project?.status === 'Production' ?'bg-green-500/20 text-green-600 border border-green-500/30'
                      : project?.status === 'Live' ?'bg-blue-500/20 text-blue-600 border border-blue-500/30' :'bg-orange-500/20 text-orange-600 border border-orange-500/30'
                  }`}>
                    {project?.status}
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${project?.color} opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center`}>
                  <div className="flex space-x-4">
                    {project?.github && (
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Github"
                        iconPosition="left"
                        className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                        onClick={() => {
                          const url = project.github;
                          if (url) window.open(url, '_blank');
                        }}
                      >
                        Code
                      </Button>
                    )}
                    {project?.live && (
                      <Button
                        variant="default"
                        size="sm"
                        iconName="ExternalLink"
                        iconPosition="left"
                        className="bg-white text-gray-900 hover:bg-white/90"
                        onClick={() => {
                          const url = project.live;
                          if (url) window.open(url, '_blank');
                        }}
                      >
                        Live Demo
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="mb-3">
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    {project?.category}
                  </span>
                  <h3 className="text-xl font-semibold text-foreground mt-1 group-hover:text-primary transition-colors">
                    {project?.title}
                  </h3>
                </div>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {project?.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project?.technologies?.slice(0, 3)?.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                  {project?.technologies?.length > 3 && (
                    <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md font-mono">
                      +{project?.technologies?.length - 3}
                    </span>
                  )}
                </div>

                {/* Key Features */}
                <div className="space-y-2 mb-4">
                  {project?.features?.slice(0, 2)?.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Icon name="Check" size={14} className="text-green-500" />
                      <span className="text-xs text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Impact */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-2">
                    <Icon name="TrendingUp" size={16} className="text-secondary" />
                    <span className="text-sm font-medium text-foreground">{project?.impact}</span>
                  </div>
                  <Icon 
                    name="ArrowUpRight" 
                    size={16} 
                    className="text-muted-foreground group-hover:text-primary transition-colors" 
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Projects CTA */}
        <motion.div
          {...{
            initial:{ opacity: 0, y: 20 },
            whileInView:{ opacity: 1, y: 0 },
            transition:{ duration: 0.6, delay: 0.4 },
            viewport:{ once: true },
            className:"text-center"
          }}
        >
          <Link to="/projects">
            <Button
              variant="outline"
              size="lg"
              iconName="ArrowRight"
              iconPosition="right"
              className="group"
            >
              Voir tous les projets
              <Icon 
                name="ArrowRight" 
                size={16} 
                className="ml-2 group-hover:translate-x-1 transition-transform" 
              />
            </Button>
          </Link>
        </motion.div>

        {/* GitHub Activity */}
        <motion.div
          {...{
            initial:{ opacity: 0, y: 20 },
            whileInView:{ opacity: 1, y: 0 },
            transition:{ duration: 0.6, delay: 0.6 },
            viewport:{ once: true },
            className:"mt-20 bg-card border border-border rounded-xl p-8"
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Icon name="Github" size={24} className="text-foreground" />
              <h3 className="text-xl font-semibold text-foreground">Activité GitHub</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="ExternalLink"
              iconPosition="right"
              onClick={() => window.open('https://github.com/Lucien45', '_blank')}
            >
              Voir le profil
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">34</div>
              <div className="text-sm text-muted-foreground">Repositories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary mb-1">1.2k</div>
              <div className="text-sm text-muted-foreground">Commits</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-1">45</div>
              <div className="text-sm text-muted-foreground">Pull Requests</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-github-green mb-1">4+</div>
              <div className="text-sm text-muted-foreground">Contributors</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectPreview;