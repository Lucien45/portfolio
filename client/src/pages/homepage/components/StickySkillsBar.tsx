import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon, { type IconName } from '../../../components/AppIcon';

const StickySkillsBar = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [activeSkill, setActiveSkill] = useState<number>(0);

  type Skill = {
    name: string;
    level: number;
    icon: IconName;
    color: string;
    description: string;
  };

  const skills: Skill[] = [
    { 
      name: 'React', 
      level: 95, 
      icon: 'Code', 
      color: 'bg-blue-500',
      description: 'Modern UI Development'
    },
    { 
      name: 'TypeScript', 
      level: 90, 
      icon: 'FileCode', 
      color: 'bg-blue-600',
      description: 'Type-Safe Development'
    },
    { 
      name: 'Node.js', 
      level: 85, 
      icon: 'Server', 
      color: 'bg-green-600',
      description: 'Backend Architecture'
    },
    { 
      name: 'Java', 
      level: 88, 
      icon: 'Coffee', 
      color: 'bg-orange-600',
      description: 'Enterprise Solutions'
    },
    { 
      name: 'Python', 
      level: 82, 
      icon: 'Code2', 
      color: 'bg-yellow-600',
      description: 'Data & Automation'
    },
    { 
      name: 'Database', 
      level: 87, 
      icon: 'Database', 
      color: 'bg-purple-600',
      description: 'Data Management'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setIsVisible(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSkill((prev) => (prev + 1) % skills?.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [skills?.length]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          {...{
            initial: { y: -100, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            exit: { y: -100, opacity: 0 },
            transition: { duration: 0.3, ease: "easeOut" },
            className:'fixed top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border shadow-soft'
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-3">
              {/* Left: Current Skill Highlight */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${skills?.[activeSkill]?.color} animate-pulse`}></div>
                  <span className="text-sm font-mono text-muted-foreground">À l’affiche:</span>
                </div>
                <motion.div
                  {...{
                    key: activeSkill,
                    initial: { opacity: 0, x: 20 },
                    animate: { opacity: 1, x: 0 },
                    exit: { opacity: 0, x: -20 },
                    transition: { duration: 0.3 },
                    className: "flex items-center space-x-3 bg-card border border-border rounded-full px-4 py-2"
                  }}
                >
                  <Icon name={skills?.[activeSkill]?.icon} size={16} className="text-primary" />
                  <span className="font-semibold text-foreground">{skills?.[activeSkill]?.name}</span>
                  <span className="text-xs text-muted-foreground hidden sm:inline">
                    {skills?.[activeSkill]?.description}
                  </span>
                  <div className="flex items-center space-x-1">
                    <div className="w-16 bg-muted rounded-full h-1.5">
                      <div className={`h-1.5 rounded-full ${skills?.[activeSkill]?.color}`}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skills?.[activeSkill]?.level}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground ml-2">
                      {skills?.[activeSkill]?.level}%
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Right: Skill Icons Grid */}
              <div className="hidden md:flex items-center space-x-2">
                {skills?.map((skill, index) => (
                  <motion.button
                    {...{
                      key: skill?.name,
                      onClick: () => setActiveSkill(index),
                      className: `relative p-2 rounded-lg transition-all duration-200 ${
                        index === activeSkill 
                          ? 'bg-primary text-primary-foreground shadow-soft' 
                          : 'bg-muted text-muted-foreground hover:bg-card hover:text-foreground'
                      }`,
                      whileHover: { scale: 1.05 },
                      whileTap: { scale: 0.95 },
                    }}
                  >
                    <Icon name={skill?.icon} size={16} />
                    
                    {/* Skill Level Indicator */}
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                      <div className="w-6 bg-background rounded-full h-0.5">
                        <div 
                          className={`h-0.5 rounded-full transition-all duration-300 ${
                            index === activeSkill ? skill?.color : 'bg-muted'
                          }`}
                          style={{ width: `${skill?.level}%` }}
                        />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Mobile: Skill Counter */}
              <div className="md:hidden flex items-center space-x-2 text-sm text-muted-foreground">
                <span className="font-mono">
                  {activeSkill + 1}/{skills?.length}
                </span>
                <div className="flex space-x-1">
                  {skills?.map((_, index) => (
                    <div
                      key={index}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                        index === activeSkill ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickySkillsBar;