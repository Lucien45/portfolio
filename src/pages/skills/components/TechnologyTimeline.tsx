import { useState } from 'react';
import Icon from '../../../components/AppIcon';

export interface TimelineItem {
  year: number;
  month?: string;
  technology: string;
  description?: string;
  type: 'learned' | 'mastered' | 'project' | 'certification' | string;
  context?: string;
  level?: 'Expert' | 'Advanced' | 'Intermediate' | 'Beginner' | string;
}

interface TechnologyTimelineProps {
  timelineData: TimelineItem[];
}

const TechnologyTimeline: React.FC<TechnologyTimelineProps> = ({ timelineData }) => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const years: number[] = [...new Set(timelineData.map(item => item.year))]?.sort((a, b) => b - a);

  const getItemsByYear = (year: number): TimelineItem[] => {
    return timelineData?.filter(item => item?.year === year);
  };

  const getTypeColor = (type: TimelineItem['type']): string => {
    switch (type) {
      case 'learned': return 'bg-github-green text-white';
      case 'mastered': return 'bg-primary text-white';
      case 'project': return 'bg-secondary text-white';
      case 'certification': return 'bg-accent text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeIcon = (type: TimelineItem['type']): string => {
    switch (type) {
      case 'learned': return 'BookOpen';
      case 'mastered': return 'Trophy';
      case 'project': return 'Code';
      case 'certification': return 'Award';
      default: return 'Circle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Technology Learning Journey</h3>
          <p className="text-sm text-muted-foreground">Track my continuous learning and skill development</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={20} className="text-primary" />
          <span className="text-sm font-medium text-primary">
            {timelineData?.length} milestones
          </span>
        </div>
      </div>
      <div className="space-y-6">
        {years?.map((year, yearIndex) => {
          const yearItems = getItemsByYear(year);
          const isExpanded = selectedYear === year || selectedYear === null;

          return (
            <div key={year} className="relative">
              {/* Year Header */}
              <div 
                className="flex items-center space-x-4 cursor-pointer group"
                onClick={() => setSelectedYear(selectedYear === year ? null : year)}
              >
                <div className="flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-full font-semibold shadow-soft">
                  {year}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {year} - {yearItems?.length} milestone{yearItems?.length !== 1 ? 's' : ''}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {yearItems?.map(item => item?.technology)?.join(', ')}
                  </p>
                </div>
                <Icon 
                  name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                  size={20} 
                  className="text-muted-foreground group-hover:text-primary transition-colors" 
                />
              </div>
              {/* Timeline Line */}
              {yearIndex < years?.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-6 bg-border"></div>
              )}
              {/* Year Items */}
              {isExpanded && (
                <div className="ml-16 mt-4 space-y-4">
                  {yearItems?.map((item, itemIndex) => (
                    <div key={itemIndex} className="relative">
                      <div className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(item?.type)}`}>
                          <Icon name={getTypeIcon(item?.type)} size={16} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-foreground">{item?.technology}</h5>
                            <span className="text-xs text-muted-foreground">{item?.month}</span>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-2">{item?.description}</p>
                          
                          {item?.context && (
                            <div className="flex items-center space-x-2 text-xs">
                              <Icon name="MapPin" size={12} className="text-muted-foreground" />
                              <span className="text-muted-foreground">{item?.context}</span>
                            </div>
                          )}
                          
                          {item?.level && (
                            <div className="flex items-center space-x-2 mt-2">
                              <span className="text-xs font-medium text-foreground">Level:</span>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                item?.level === 'Expert' ? 'bg-github-green/10 text-github-green' :
                                item?.level === 'Advanced' ? 'bg-primary/10 text-primary' :
                                item?.level === 'Intermediate'? 'bg-accent/10 text-accent' : 'bg-secondary/10 text-secondary'
                              }`}>
                                {item?.level}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Connection line to next item */}
                      {itemIndex < yearItems?.length - 1 && (
                        <div className="absolute left-5 top-16 w-0.5 h-4 bg-border"></div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Legend */}
      <div className="mt-8 pt-6 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Legend</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { type: 'learned', label: 'First Learning' },
            { type: 'mastered', label: 'Mastery Achieved' },
            { type: 'project', label: 'Project Application' },
            { type: 'certification', label: 'Certification Earned' }
          ]?.map((legend) => (
            <div key={legend?.type} className="flex items-center space-x-2">
              <div className={`w-6 h-6 rounded flex items-center justify-center ${getTypeColor(legend?.type as TimelineItem['type'])}`}>
                <Icon name={getTypeIcon(legend?.type as TimelineItem['type'])} size={12} />
              </div>
              <span className="text-xs text-muted-foreground">{legend?.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechnologyTimeline;