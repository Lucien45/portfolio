import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import type { Skill } from '../types';

type Proficiency = 'Expert' | 'Advanced' | 'Intermediate' | 'Beginner' | string;


interface SkillCardProps {
  skill: Skill;
  onDemo?: (skill: Skill) => void;
}

const SkillCard = ({ skill, onDemo }: SkillCardProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const getProficiencyColor = (level: Proficiency): string => {
    switch (level) {
      case 'Expert': return 'bg-github-green';
      case 'Advanced': return 'bg-primary';
      case 'Intermediate': return 'bg-accent';
      case 'Beginner': return 'bg-secondary';
      default: return 'bg-muted';
    }
  };

  const getProficiencyWidth = (level: Proficiency): string => {
    switch (level) {
      case 'Expert': return 'w-full';
      case 'Advanced': return 'w-4/5';
      case 'Intermediate': return 'w-3/5';
      case 'Beginner': return 'w-2/5';
      default: return 'w-1/5';
    }
  };

  return (
    <div
      className={`bg-card border border-border rounded-lg p-6 transition-all duration-300 cursor-pointer ${
        isHovered ? 'shadow-elevation transform -translate-y-1' : 'shadow-soft'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onDemo && onDemo(skill)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${skill?.bgColor}`}>
            <Icon name={skill?.icon} size={24} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{skill?.name}</h3>
            <p className="text-sm text-muted-foreground">{skill?.category}</p>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          skill?.proficiency === 'Expert' ? 'bg-github-green/10 text-github-green' :
          skill?.proficiency === 'Advanced' ? 'bg-primary/10 text-primary' :
          skill?.proficiency === 'Intermediate'? 'bg-accent/10 text-accent' : 'bg-secondary/10 text-secondary'
        }`}>
          {skill?.proficiency}
        </span>
      </div>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {skill?.description}
      </p>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium text-foreground">Proficiency</span>
          <span className="text-xs text-muted-foreground">{skill?.experience}</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div className={`h-2 rounded-full transition-all duration-500 ${getProficiencyColor(skill?.proficiency)} ${getProficiencyWidth(skill?.proficiency)}`}></div>
        </div>
      </div>
      {skill?.projects && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-foreground">Projects Used</span>
            <span className="text-xs text-primary font-medium">{skill?.projects} projects</span>
          </div>
        </div>
      )}
      {onDemo && (
        <div className="mt-4 flex items-center justify-center">
          <div className={`flex items-center space-x-2 text-xs font-medium transition-all duration-300 ${
            isHovered ? 'text-primary' : 'text-muted-foreground'
          }`}>
            <Icon name="Play" size={14} />
            <span>Try Interactive Demo</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillCard;