import { useState } from 'react';
import Icon, { type IconName } from '../../../components/AppIcon';

type Proficiency = 'Expert' | 'Advanced' | 'Intermediate' | 'Beginner' | string;

type Skill = {
  id: string | number;
  name: string;
  category: string;
  proficiency: Proficiency;
  experience?: string;
  projects?: number;
  icon: IconName;
  bgColor: string;
};

interface SkillsMatrixProps {
  skills: Skill[];
}

const SkillsMatrix = ({ skills }: SkillsMatrixProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'matrix'>('grid'); // grid or matrix

  const categories = ['All', ...new Set(skills.map(skill => skill.category))];

  const filteredSkills = selectedCategory === 'All' 
    ? skills 
    : skills?.filter(skill => skill?.category === selectedCategory);

  const getProficiencyScore = (level: Proficiency): number => {
    switch (level) {
      case 'Expert': return 5;
      case 'Advanced': return 4;
      case 'Intermediate': return 3;
      case 'Beginner': return 2;
      default: return 1;
    }
  };

  const renderMatrixView = () => (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-foreground">Technology</th>
              <th className="text-center py-3 px-4 font-semibold text-foreground">Category</th>
              <th className="text-center py-3 px-4 font-semibold text-foreground">Proficiency</th>
              <th className="text-center py-3 px-4 font-semibold text-foreground">Experience</th>
              <th className="text-center py-3 px-4 font-semibold text-foreground">Projects</th>
            </tr>
          </thead>
          <tbody>
            {filteredSkills?.map((skill) => (
              <tr key={skill?.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${skill?.bgColor}`}>
                      <Icon name={skill?.icon} size={16} color="white" />
                    </div>
                    <span className="font-medium text-foreground">{skill?.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="text-sm text-muted-foreground">{skill?.category}</span>
                </td>
                <td className="py-4 px-4 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5]?.map((star) => (
                        <Icon
                          key={star}
                          name="Star"
                          size={14}
                          className={star <= getProficiencyScore(skill?.proficiency) 
                            ? 'text-accent fill-current' :'text-muted'
                          }
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">{skill?.proficiency}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="text-sm text-foreground">{skill?.experience}</span>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="text-sm text-primary font-medium">{skill?.projects || 0}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex flex-wrap gap-2">
          {categories?.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground shadow-soft'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2 bg-muted rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-all duration-200 ${
              viewMode === 'grid' ?'bg-background text-foreground shadow-soft' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="Grid3X3" size={16} />
          </button>
          <button
            onClick={() => setViewMode('matrix')}
            className={`p-2 rounded-md transition-all duration-200 ${
              viewMode === 'matrix' ?'bg-background text-foreground shadow-soft' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="Table" size={16} />
          </button>
        </div>
      </div>
      {viewMode === 'matrix' ? renderMatrixView() : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills?.map((skill) => (
            <div key={skill?.id} className="bg-card border border-border rounded-lg p-4 hover:shadow-elevation transition-all duration-300">
              <div className="flex items-center space-x-3 mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${skill?.bgColor}`}>
                  <Icon name={skill?.icon} size={20} color="white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{skill?.name}</h4>
                  <p className="text-xs text-muted-foreground">{skill?.category}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-foreground">Proficiency</span>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5]?.map((star) => (
                    <Icon
                      key={star}
                      name="Star"
                      size={12}
                      className={star <= getProficiencyScore(skill?.proficiency) 
                        ? 'text-accent fill-current' :'text-muted'
                      }
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">{skill?.experience}</span>
                <span className="text-primary font-medium">{skill?.projects || 0} projects</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsMatrix;