import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import type { Category } from '../type';

// type IconName = "FolderOpen" | "Code" | "Filter" | "X" ;


interface ProjectTechnology {
  name: string;
  color?: string;
  count?: number;
}

interface ProjectFilterProps {
  categories: Category[];
  technologies: ProjectTechnology[];
  selectedCategory: string;
  selectedTechnologies: string[];
  onCategoryChange: (categoryId: string) => void;
  onTechnologyToggle: (techName: string) => void;
  onClearFilters: () => void;
  projectCount: number;
}

const ProjectFilter: React.FC<ProjectFilterProps> = ({ 
  categories, 
  technologies, 
  selectedCategory, 
  selectedTechnologies, 
  onCategoryChange, 
  onTechnologyToggle,
  onClearFilters,
  projectCount 
}) => {
  const hasActiveFilters = selectedCategory !== 'all' || selectedTechnologies?.length > 0;

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Filtrer les projets</h3>
          <p className="text-sm text-muted-foreground">
            Affichage {projectCount} project{projectCount !== 1 ? 's' : ''}
          </p>
        </div>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
          >
            Effacer les filtres
          </Button>
        )}
      </div>
      {/* Categories */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
          <Icon name="FolderOpen" size={16} className="mr-2" />
          Type de projet
        </h4>
        <div className="flex flex-wrap gap-2">
          {categories?.map((category) => (
            <motion.button
              {...{
                whileHover: { scale: 1.02 },
                whileTap: { scale: 0.98 },
                onClick: () => onCategoryChange(category.id),
                className: `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground shadow-soft'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                }`,
                key: category.id,
              }}
            >
              <span className="flex items-center space-x-2">
                {category.icon && <Icon name={category.icon} size={14} />}
                {category.count !== undefined && (
                  <span className="text-xs opacity-70">
                    ({category.count})
                  </span>
                )}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
      {/* Technologies */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
          <Icon name="Code" size={16} className="mr-2" />
          Technologies
        </h4>
        <div className="flex flex-wrap gap-2">
          {technologies?.map((tech) => (
            <motion.button
                {...{

                    key: tech?.name,
                    whileHover: { scale: 1.02 },
                    whileTap: { scale: 0.98 },
                    onClick: () => onTechnologyToggle(tech?.name),
                    className: `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                      selectedTechnologies?.includes(tech?.name)
                        ? 'bg-secondary text-secondary-foreground shadow-soft'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                    }`,
                }}
            >
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: tech?.color }}
              />
              <span>{tech?.name}</span>
              <span className="text-xs opacity-70">({tech?.count})</span>
            </motion.button>
          ))}
        </div>
      </div>
      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Filter" size={14} />
            <span>Filtres actifs:</span>
            {selectedCategory !== 'all' && (
              <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                {categories?.find(c => c?.id === selectedCategory)?.name}
              </span>
            )}
            {selectedTechnologies?.map((tech) => (
              <span key={tech} className="px-2 py-1 bg-secondary/10 text-secondary rounded text-xs">
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectFilter;