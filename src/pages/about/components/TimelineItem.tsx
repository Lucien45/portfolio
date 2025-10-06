import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import type { IconName } from '../../projects/type';

export interface TimelineItemData {
  type: 'education' | 'certification' | 'internship' | 'project' | string;
  period: string;
  title: string;
  organization: string;
  location?: string;
  summary?: string;
  details?: string;
  skills?: string[];
  achievements?: string[];
}

interface TimelineItemProps {
  item: TimelineItemData;
  index: number;
  isLast: boolean;
  isExpanded: boolean;
  onToggle: (index: number) => void;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ 
  item, 
  index, 
  isLast, 
  isExpanded, 
  onToggle 
}) => {
  const getTypeIcon = (type: string): IconName => {
    switch (type) {
      case 'education':
        return 'GraduationCap';
      case 'certification':
        return 'Award';
      case 'internship':
        return 'Briefcase';
      case 'project':
        return 'Code';
      default:
        return 'Calendar';
    }
  };        

  const getTypeColor = (type: string): string => {
    switch (type) {
      case 'education':
        return 'bg-blue-500';
      case 'certification':
        return 'bg-amber-500';
      case 'internship':
        return 'bg-green-500';
      case 'project':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="relative flex items-start group">
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute left-6 top-12 w-0.5 h-full bg-border group-hover:bg-primary/30 transition-colors duration-300"></div>
      )}
      {/* Timeline Node */}
      <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full ${getTypeColor(item?.type)} shadow-elevation group-hover:scale-110 transition-transform duration-300`}>
        <Icon name={getTypeIcon(item?.type)} size={20} color="white" />
      </div>
      {/* Content */}
      <div className="flex-1 ml-6 pb-8">
        <div className="bg-card border border-border rounded-lg p-6 shadow-soft hover:shadow-elevation transition-all duration-300 group-hover:border-primary/20">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                  {item?.period}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full text-white ${getTypeColor(item?.type)}`}>
                  {item?.type}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-1">
                {item?.title}
              </h3>
              <p className="text-muted-foreground font-medium">
                {item?.organization}
              </p>
              {item?.location && (
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <Icon name="MapPin" size={14} />
                  {item?.location}
                </p>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              iconPosition="right"
              onClick={() => onToggle(index)}
              className="ml-4"
            >
              {isExpanded ? 'Less' : 'More'}
            </Button>
          </div>
          
          {/* Summary */}
          <p className="text-muted-foreground mb-4 leading-relaxed">
            {item?.summary}
          </p>
          
          {/* Expandable Details */}
          <div className={`transition-all duration-300 overflow-hidden ${
            isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            {item?.details && (
              <div className="border-t border-border pt-4 mt-4">
                <div className="prose prose-sm max-w-none">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {item?.details}
                  </p>
                </div>
              </div>
            )}
            
            {/* Skills/Technologies */}
            {item?.skills && item?.skills?.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-foreground mb-2">
                  Skills & Technologies:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {item?.skills?.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-md border"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Achievements */}
            {item?.achievements && item?.achievements?.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-foreground mb-2">
                  Key Achievements:
                </h4>
                <ul className="space-y-1">
                  {item?.achievements?.map((achievement, achIndex) => (
                    <li key={achIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <Icon name="CheckCircle" size={14} className="text-success mt-0.5 flex-shrink-0" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;