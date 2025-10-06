import React from 'react';
import Icon from '../../../components/AppIcon';
import type { IconName } from '../../projects/type';

type StatsColor = "primary" | "secondary" | "success" | "warning" | "accent";

interface StatsCardProps {
  icon: IconName;
  value: string | number;
  label: string;
  description?: string;
  color?: StatsColor;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, value, label, description, color = "primary" }) => {
  
  const getColorClasses = (colorName: StatsColor = "primary") => {
    const colors: Record<StatsColor, string> = {
      primary: "text-primary bg-primary/10 border-primary/20",
      secondary: "text-secondary bg-secondary/10 border-secondary/20",
      success: "text-success bg-success/10 border-success/20",
      warning: "text-warning bg-warning/10 border-warning/20",
      accent: "text-accent bg-accent/10 border-accent/20"
    };
    return colors[colorName] || colors.primary;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft hover:shadow-elevation transition-all duration-300 group">
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${getColorClasses(color)} group-hover:scale-110 transition-transform duration-300`}>
          <Icon name={icon} size={24} />
        </div>
        
        <div className="flex-1">
          <div className="text-2xl font-bold text-foreground mb-1">
            {value}
          </div>
          <div className="text-sm font-medium text-muted-foreground mb-2">
            {label}
          </div>
          {description && (
            <div className="text-xs text-muted-foreground leading-relaxed">
              {description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;