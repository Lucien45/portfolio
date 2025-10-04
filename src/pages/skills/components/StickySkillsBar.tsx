import { useState, useEffect } from 'react';
import Icon, { type IconName } from '../../../components/AppIcon';

type Proficiency = 'Expert' | 'Advanced' | 'Intermediate' | 'Beginner' | string;

type Skill = {
  id: string | number;
  name: string;
  proficiency: Proficiency;
  icon: IconName;
  bgColor: string;
};

interface StickySkillsBarProps {
  skills: Skill[];
}

const StickySkillsBar = ({ skills }: StickySkillsBarProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const triggerPoint = 200; // Show after scrolling 200px
      setIsVisible(scrollPosition > triggerPoint);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const topSkills = skills?.filter(skill => skill?.proficiency === 'Expert' || skill?.proficiency === 'Advanced')?.slice(0, 6);

  const getProficiencyColor = (level: Proficiency): string => {
    switch (level) {
      case 'Expert': return 'bg-github-green';
      case 'Advanced': return 'bg-primary';
      case 'Intermediate': return 'bg-accent';
      default: return 'bg-secondary';
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-300">
      <div className="bg-card/95 backdrop-blur-sm border border-border rounded-full shadow-elevation px-4 py-3">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Icon name="Zap" size={16} className="text-primary" />
            <span className="text-xs font-medium text-foreground hidden sm:block">Top Skills</span>
          </div>
          
          <div className="flex items-center space-x-2">
            {topSkills?.map((skill) => (
              <div
                key={skill?.id}
                className="relative group cursor-pointer"
                onMouseEnter={() => setSelectedSkill(skill)}
                onMouseLeave={() => setSelectedSkill(null)}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${skill?.bgColor} hover:scale-110 transition-transform duration-200`}>
                  <Icon name={skill?.icon} size={14} color="white" />
                </div>
                
                {/* Proficiency indicator */}
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-card ${getProficiencyColor(skill?.proficiency)}`}></div>
                
                {/* Tooltip */}
                {selectedSkill?.id === skill?.id && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-popover border border-border rounded-lg shadow-elevation whitespace-nowrap">
                    <div className="text-xs font-medium text-popover-foreground">{skill?.name}</div>
                    <div className="text-xs text-muted-foreground">{skill?.proficiency}</div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-border"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex items-center space-x-2 pl-2 border-l border-border">
            <span className="text-xs text-muted-foreground hidden sm:block">
              {skills?.length} total
            </span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-110 transition-transform duration-200"
            >
              <Icon name="ArrowUp" size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickySkillsBar;