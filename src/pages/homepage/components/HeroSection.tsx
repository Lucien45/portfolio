import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon, { type IconName } from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import AppImage from '../../../components/AppImage';

const HeroSection = () => {
  const [currentSkill, setCurrentSkill] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  type Skill = { name: string; level: number; color: string; icon: IconName };

  const skills: Skill[] = [
    { name: 'React', level: 95, color: 'text-blue-500', icon: 'Code' },
    { name: 'TypeScript', level: 90, color: 'text-blue-600', icon: 'FileCode' },
    { name: 'Node.js', level: 85, color: 'text-green-600', icon: 'Server' },
    { name: 'Java', level: 88, color: 'text-orange-600', icon: 'Coffee' },
    { name: 'Python', level: 82, color: 'text-yellow-600', icon: 'Code2' }
  ];

  const codeSnippet = `const developer = {
  name: "Lucien Rafaralahy",
  location: "Madagascar 🇲🇬",
  passion: "Full-Stack Development",
  expertise: ["React", "TypeScript", "Node.js", "Python"],
  mission: "Relier l'informatique traditionnelle à la technologie Web moderne"
};`;

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % skills?.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [skills?.length]);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border border-primary rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-secondary rounded-full"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 border border-accent rounded-full"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <motion.div
            {...{
              initial: { opacity: 0, x: -50 },
              animate: { opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 },
              transition: { duration: 0.8, ease: "easeOut" },
              className: "space-y-8",
            }}
          >
            {/* Greeting */}
            <div className="space-y-2">
              <motion.div
                {...{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.2, duration: 0.6 },
                  className: "flex items-center space-x-2 text-muted-foreground"
                }}
              >
                <Icon name="MapPin" size={16} className="text-secondary" />
                <span className="text-sm font-mono">Madagascar, Indian Ocean</span>
              </motion.div>
              
              <motion.h1
                {...{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.4, duration: 0.6 },
                  className: "text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight"
                }}
              >
                Salut! Je suis{' '}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Lucien
                </span>
              </motion.h1>
            </div>

            {/* Dynamic Role */}
            <motion.div
              {...{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.6, duration: 0.6 },
                className: "space-y-4"
              }}
            >
              <div className="text-xl sm:text-2xl text-muted-foreground">
                <span className="font-mono text-accent">const</span>{' '}
                <span className="text-foreground font-semibold">role</span>{' '}
                <span className="font-mono text-accent">=</span>{' '}
                <span className="text-primary font-mono">"Full-Stack Developer"</span>
              </div>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              En tant qu’étudiant en informatique, je recherche un poste qui me permette de continuer à apprendre et à
              perfectionner mes compétences tout en fournissant un travail de qualité, et m'encourage à m'épanouir en
              tant que technicien informatique.
              </p>
            </motion.div>

            {/* Current Skill Highlight */}
            <motion.div
              {...{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.8, duration: 0.6 },
                className: "bg-card border border-border rounded-lg p-6 shadow-soft"
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={skills?.[currentSkill]?.icon} 
                    size={20} 
                    className={skills?.[currentSkill]?.color} 
                  />
                  <span className="font-semibold text-foreground">
                    {skills?.[currentSkill]?.name}
                  </span>
                </div>
                <span className="text-sm font-mono text-muted-foreground">
                  {skills?.[currentSkill]?.level}%
                </span>
              </div>
              
              <div className="w-full bg-muted rounded-full h-2">
                <motion.div
                  {...{
                    initial: { width: 0 },
                    animate: { width: `${skills?.[currentSkill]?.level}%` },
                    transition: { duration: 1, ease: "easeOut" },
                    className: "bg-gradient-to-r from-primary to-secondary h-2 rounded-full",
                  }}
                />
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              {...{
                initial: { opacity: 0, y: 20 },
                animate:{ opacity: 1, y: 0 },
                transition: { delay: 1, duration: 0.6 },
                className: "flex flex-col sm:flex-row gap-4",
              }}
            >
              <Button
                variant="default"
                size="lg"
                iconName="MessageCircle"
                iconPosition="left"
                className="group"
              >
                Collaborons
                <Icon 
                  name="ArrowRight" 
                  size={16} 
                  className="ml-2 group-hover:translate-x-1 transition-transform" 
                />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                iconName="Download"
                iconPosition="left"
              >
                Télécharger CV
              </Button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
            {...{
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 1.2, duration: 0.6 },
              className: "grid grid-cols-3 gap-6 pt-8 border-t border-border"
            }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">1+</div>
                <div className="text-sm text-muted-foreground">Années d'expérience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">100%</div>
                <div className="text-sm text-muted-foreground">Satisfaction des clients</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            {...{
              initial: { opacity: 0, x: 50 },
              animate: { opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 },
              transition: { duration: 0.8, ease: "easeOut", delay: 0.3 },
              className: "relative",
            }}
          >
            {/* Profile Image Container */}
            <div className="relative mx-auto max-w-md">
              <div className="relative">
                {/* Animated Border */}
                <motion.div
                  {...{
                    animate: { rotate: 360 },
                    transition: { duration: 20, repeat: Infinity, ease: "linear" },
                    className: "absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-accent p-1"
                  }}
                >
                  <div className="w-full h-full rounded-full bg-background"></div>
                </motion.div>
                
                {/* Profile Image */}
                <div className="relative z-10 p-2">
                  <AppImage
                    src="/photo_cv.png"
                    alt="Lucien Rafaralahy - Full-Stack Developer"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>

                {/* Floating Elements */}
                <motion.div
                  {...{
                    animate: { y: [-10, 10, -10] },
                    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    className: "absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-full p-3 shadow-elevation"
                  }}
                >
                  <Icon name="Code" size={20} />
                </motion.div>

                <motion.div
                  {...{
                    animate: { y: [10, -10, 10] },
                    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    className: "absolute -bottom-4 -left-4 bg-secondary text-secondary-foreground rounded-full p-3 shadow-elevation"
                  }}
                >
                  <Icon name="Zap" size={20} />
                </motion.div>
              </div>

              {/* Code Snippet */}
              <motion.div
              {...{
                initial: { opacity: 0, scale: 0.8 },
                animate: { opacity: 1, scale: 1 },
                transition: { delay: 1.5, duration: 0.6 },
                className: "absolute -bottom-8 -right-8 bg-card border border-border rounded-lg p-4 shadow-elevation max-w-xs hidden lg:block"
              }}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <pre className="text-xs font-mono text-muted-foreground overflow-hidden">
                  {codeSnippet}
                </pre>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Scroll Indicator */}
      <motion.div
        {...{
          initial:{ opacity: 0 },
          animate:{ opacity: 1 },
          transition: { delay: 2, duration: 0.6 },
          className:"absolute bottom-8 left-1/2 transform -translate-x-1/2"
        }}
      >
        <motion.div
          {...{
            animate:{ y: [0, 10, 0] },
            transition:{ duration: 2, repeat: Infinity, ease: "easeInOut" },
            className:"flex flex-col items-center space-y-2 text-muted-foreground"
          }}
        >
          <span className="text-sm font-mono">Faites défiler pour explorer</span>
          <Icon name="ChevronDown" size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;