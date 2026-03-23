import { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SkillCard from './components/SkillCard';
import SkillsMatrix from './components/SkillsMatrix';
import CodeSandbox from './components/CodeSandbox';
import CertificationBadge from './components/CertificationBadge';
import TechnologyTimeline from './components/TechnologyTimeline';
import StickySkillsBar from './components/StickySkillsBar';
import type { TimelineItem } from './components/TechnologyTimeline';
import type { Skill, Certification } from './types';
import Footer from '../../components/ui/Footer';


const Skills: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<Skill | null>(null);

  const skills: Skill[] = [
    {
      id: 1,
      name: "React",
      category: "Frontend",
      proficiency: "Expert",
      experience: "3+ years",
      projects: 12,
      icon: "Atom",
      bgColor: "bg-blue-600",
      description: "Building modern, interactive user interfaces with React 18, hooks, context API, and performance optimization techniques."
    },
    {
      id: 2,
      name: "TypeScript",
      category: "Language",
      proficiency: "Advanced",
      experience: "2+ years",
      projects: 8,
      icon: "FileType",
      bgColor: "bg-blue-700",
      description: "Type-safe JavaScript development with advanced TypeScript features, generics, and strict type checking."
    },
    {
      id: 3,
      name: "Node.js",
      category: "Backend",
      proficiency: "Advanced",
      experience: "2+ years",
      projects: 10,
      icon: "Server",
      bgColor: "bg-green-600",
      description: "Server-side JavaScript development with Express.js, REST APIs, authentication, and database integration."
    },
    {
      id: 4,
      name: "Python",
      category: "Language",
      proficiency: "Advanced",
      experience: "4+ years",
      projects: 15,
      icon: "Code2",
      bgColor: "bg-yellow-600",
      description: "Full-stack Python development with Django, Flask, data analysis, and automation scripting."
    },
    {
      id: 5,
      name: "Java",
      category: "Language",
      proficiency: "Advanced",
      experience: "3+ years",
      projects: 6,
      icon: "Coffee",
      bgColor: "bg-red-600",
      description: "Enterprise Java development with Spring Boot, JPA, microservices architecture, and design patterns."
    },
    {
      id: 6,
      name: "PostgreSQL",
      category: "Database",
      proficiency: "Advanced",
      experience: "2+ years",
      projects: 9,
      icon: "Database",
      bgColor: "bg-blue-800",
      description: "Advanced database design, query optimization, stored procedures, and performance tuning."
    },
    {
      id: 7,
      name: "MongoDB",
      category: "Database",
      proficiency: "Intermediate",
      experience: "1+ years",
      projects: 5,
      icon: "Leaf",
      bgColor: "bg-green-700",
      description: "NoSQL database design, aggregation pipelines, indexing strategies, and document modeling."
    },
    {
      id: 8,
      name: "Docker",
      category: "DevOps",
      proficiency: "Intermediate",
      experience: "1+ years",
      projects: 7,
      icon: "Container",
      bgColor: "bg-blue-500",
      description: "Containerization, multi-stage builds, Docker Compose, and container orchestration basics."
    },
    {
      id: 9,
      name: "Git",
      category: "Tools",
      proficiency: "Expert",
      experience: "4+ years",
      projects: 20,
      icon: "GitBranch",
      bgColor: "bg-orange-600",
      description: "Advanced version control, branching strategies, merge conflict resolution, and collaborative workflows."
    },
    {
      id: 10,
      name: "Tailwind CSS",
      category: "Frontend",
      proficiency: "Expert",
      experience: "2+ years",
      projects: 14,
      icon: "Palette",
      bgColor: "bg-teal-600",
      description: "Utility-first CSS framework mastery with custom configurations, responsive design, and component styling."
    },
    {
      id: 11,
      name: "Next.js",
      category: "Frontend",
      proficiency: "Advanced",
      experience: "1+ years",
      projects: 6,
      icon: "Zap",
      bgColor: "bg-black",
      description: "Full-stack React framework with SSR, SSG, API routes, and performance optimization."
    },
    {
      id: 12,
      name: "AWS",
      category: "Cloud",
      proficiency: "Intermediate",
      experience: "1+ years",
      projects: 4,
      icon: "Cloud",
      bgColor: "bg-orange-500",
      description: "Cloud infrastructure with EC2, S3, Lambda, RDS, and basic DevOps practices."
    }
  ];

  const certifications: Certification[] = [
    {
      id: 1,
      name: "TECHLAB-JS Certification",
      issuer: "TECHLAB Madagascar",
      status: "Active",
      issuedDate: "March 2024",
      expiryDate: "March 2027",
      credentialId: "TLJ-2024-LUC-001",
      skills: ["JavaScript", "React", "Node.js", "MongoDB"],
      certificateUrl: "https://techlab.mg/certificates/TLJ-2024-LUC-001",
      badgeUrl: "https://techlab.mg/badges/TLJ-2024-LUC-001"
    },
    {
      id: 2,
      name: "React Developer Certification",
      issuer: "Meta",
      status: "Active",
      issuedDate: "January 2024",
      expiryDate: "January 2026",
      credentialId: "META-REACT-2024-456",
      skills: ["React", "JSX", "Hooks", "State Management"],
      certificateUrl: "https://coursera.org/verify/META-REACT-2024-456"
    },
    {
      id: 3,
      name: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      status: "Pending",
      issuedDate: "Expected April 2024",
      credentialId: "AWS-CP-PENDING",
      skills: ["Cloud Computing", "AWS Services", "Security", "Pricing"]
    }
  ];

  const timelineData: TimelineItem[] = [
    {
      year: 2024,
      month: "March",
      technology: "TECHLAB-JS Certification",
      type: "certification",
      description: "Completed comprehensive JavaScript certification covering modern web development practices.",
      context: "TECHLAB Madagascar",
      level: "Expert"
    },
    {
      year: 2024,
      month: "February",
      technology: "Next.js",
      type: "learned",
      description: "Started learning Next.js for full-stack React development with SSR and API routes.",
      context: "Personal Project",
      level: "Intermediate"
    },
    {
      year: 2024,
      month: "January",
      technology: "TypeScript",
      type: "mastered",
      description: "Achieved advanced proficiency in TypeScript with complex type definitions and generics.",
      context: "MESUPRES Project",
      level: "Advanced"
    },
    {
      year: 2023,
      month: "December",
      technology: "React",
      type: "project",
      description: "Built FC FOUDRE club website with advanced React patterns and state management.",
      context: "Freelance Project",
      level: "Expert"
    },
    {
      year: 2023,
      month: "October",
      technology: "PostgreSQL",
      type: "learned",
      description: "Deep dive into PostgreSQL for the MESUPRES registry system database design.",
      context: "Internship Project",
      level: "Advanced"
    },
    {
      year: 2023,
      month: "August",
      technology: "Node.js",
      type: "mastered",
      description: "Mastered Node.js backend development with Express.js and RESTful API design.",
      context: "MESUPRES Internship",
      level: "Advanced"
    },
    {
      year: 2023,
      month: "June",
      technology: "Docker",
      type: "learned",
      description: "Started containerization journey with Docker for development environment consistency.",
      context: "DevOps Learning",
      level: "Intermediate"
    },
    {
      year: 2022,
      month: "September",
      technology: "React",
      type: "learned",
      description: "First introduction to React during MIAGE program, building interactive web applications.",
      context: "ESMIA University",
      level: "Beginner"
    },
    {
      year: 2022,
      month: "March",
      technology: "JavaScript",
      type: "mastered",
      description: "Achieved proficiency in modern JavaScript ES6+ features and asynchronous programming.",
      context: "University Coursework",
      level: "Advanced"
    },
    {
      year: 2021,
      month: "October",
      technology: "Java",
      type: "learned",
      description: "Started Java programming with object-oriented principles and enterprise patterns.",
      context: "ESMIA University",
      level: "Intermediate"
    },
    {
      year: 2021,
      month: "February",
      technology: "Python",
      type: "learned",
      description: "First programming language learned, focusing on algorithms and data structures.",
      context: "Computer Science Foundation",
      level: "Beginner"
    }
  ];

  const handleSkillDemo = (skill: Skill) => {
    setActiveDemo(skill);
  };

  const closeDemo = () => {
    setActiveDemo(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Skills & Technologies - Lucien Portfolio</title>
        <meta name="description" content="Interactive showcase of technical skills including React, TypeScript, Node.js, Python, and full-stack development capabilities with hands-on demonstrations." />
        <meta name="keywords" content="React developer, TypeScript, Node.js, Python, full-stack developer, web development skills, technical expertise" />
      </Helmet>
      <Header />
      <StickySkillsBar skills={skills} />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Icon name="Zap" size={32} className="text-primary" />
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                  Laboratoire de compétences
                </h1>
              </div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Démonstrations interactives des capacités techniques avec des exemples de code pratiques,
              certifications et parcours d'apprentissage continu à travers les technologies web modernes.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center space-x-2 bg-card border border-border rounded-lg px-4 py-2">
                  <Icon name="Code" size={20} className="text-primary" />
                  <span className="font-medium text-foreground">{skills?.length} Technologies</span>
                </div>
                <div className="flex items-center space-x-2 bg-card border border-border rounded-lg px-4 py-2">
                  <Icon name="Award" size={20} className="text-secondary" />
                  <span className="font-medium text-foreground">{certifications?.length} Certifications</span>
                </div>
                <div className="flex items-center space-x-2 bg-card border border-border rounded-lg px-4 py-2">
                  <Icon name="TrendingUp" size={20} className="text-accent" />
                  <span className="font-medium text-foreground">4+ Années d'expérience</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  variant="default"
                  size="lg"
                  iconName="Play"
                  iconPosition="left"
                  onClick={() => document.getElementById('interactive-demos')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Essayez les démos interactives
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  iconName="Download"
                  iconPosition="left"
                  onClick={() => window.open('/assets/Lucien_Skills_Matrix.pdf', '_blank')}
                >
                  Télécharger la matrice de compétences
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Matrix Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Matrice des compétences techniques</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Aperçu complet des compétences techniques, incluant les niveaux de maîtrise, la durée de l'expérience et les applications aux projets.
              </p>
            </div>

            <SkillsMatrix skills={skills} />
          </div>
        </section>

        {/* Interactive Skills Cards */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Interactive Skill Showcase</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cliquez sur n'importe quelle fiche de compétence pour explorer des démonstrations interactives et des exemples de code.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {skills?.map((skill) => (
                <SkillCard
                  key={skill?.id}
                  skill={skill}
                  onDemo={handleSkillDemo}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Code Demos */}
        <section id="interactive-demos" className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Live Code Demonstrations</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Des environnements de test de code interactifs présentant des implémentations concrètes et des bonnes pratiques.
              </p>
            </div>

            {activeDemo ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-foreground">
                    {activeDemo?.name} Interactive Demo
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="X"
                    iconPosition="left"
                    onClick={closeDemo}
                  >
                    Close Demo
                  </Button>
                </div>
                <CodeSandbox skill={activeDemo} />
              </div>
            ) : (
              <div className="text-center py-12">
                <Icon name="Code" size={64} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Select a Skill to Demo</h3>
                <p className="text-muted-foreground mb-6">
                  Click on any skill card above to see interactive code demonstrations
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {skills?.slice(0, 6)?.map((skill) => (
                    <Button
                      key={skill?.id}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSkillDemo(skill)}
                    >
                      {skill?.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Certifications Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Professional Certifications</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Diplômes vérifiés et réalisations en matière d'apprentissage continu avec liens de validation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications?.map((certification) => (
                <CertificationBadge
                  key={certification?.id}
                  certification={certification}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Technology Timeline */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Learning Journey Timeline</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Track my continuous learning and skill development progression over the years.
              </p>
            </div>

            <TechnologyTimeline timelineData={timelineData} />
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Collaborate?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's discuss how my technical skills can contribute to your next project. I'm always excited to tackle new challenges and learn emerging technologies.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
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
                onClick={() => window.open('https://github.com/lucien-portfolio', '_blank')}
              >
                View GitHub Profile
              </Button>
            </div>
          </div>
        </section>
      </main>
      {/* Demo Modal Overlay */}
      {activeDemo && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={closeDemo}
        >
          <div 
            className="bg-card border border-border rounded-lg max-w-6xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e?.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-foreground">
                  {activeDemo?.name} Interactive Demo
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={closeDemo}
                />
              </div>
              <CodeSandbox skill={activeDemo} />
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default Skills;