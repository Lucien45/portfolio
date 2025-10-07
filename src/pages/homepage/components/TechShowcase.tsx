import { useState } from 'react';
import { motion } from 'framer-motion';
import Icon, { type IconName } from '../../../components/AppIcon';



type TechItem = { name: string; level: number; icon: IconName; experience: string };
type CategoryKey = 'frontend' | 'backend' | 'database' | 'tools';
type TechCategory = {
  title: string;
  icon: IconName;
  color: string;
  bgColor: string;
  technologies: TechItem[];
};

const TechShowcase = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('frontend');
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const techCategories: Record<CategoryKey, TechCategory> = {
    frontend: {
      title: 'Maîtrise du Frontend',
      icon: 'Monitor',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      technologies: [
        { name: 'React', level: 95, icon: 'Code', experience: '1+ years' },
        { name: 'TypeScript', level: 90, icon: 'FileCode', experience: '1+ years' },
        { name: 'Tailwind CSS', level: 92, icon: 'Palette', experience: '1+ years' },
        { name: 'Framer Motion', level: 85, icon: 'Zap', experience: '1+ years' }
      ]
    },
    backend: {
      title: 'Architecture Backend',
      icon: 'Server',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      technologies: [
        { name: 'Nest.js', level: 85, icon: 'Server', experience: '1+ years' },
        { name: 'Express.js', level: 88, icon: 'Layers', experience: '1+ years' },
        { name: 'Java Spring', level: 87, icon: 'Coffee', experience: '1+ years' },
        { name: 'Python Django', level: 82, icon: 'Code2', experience: '1+ years' },
        { name: 'REST APIs', level: 90, icon: 'Link', experience: '1+ years' }
      ]
    },
    database: {
      title: 'Data Management',
      icon: 'Database',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      technologies: [
        { name: 'PostgreSQL', level: 87, icon: 'Database', experience: '2+ years' },
        { name: 'MongoDB', level: 85, icon: 'Layers', experience: '1+ years' },
        { name: 'MySQL', level: 90, icon: 'Database', experience: '3+ years' },
      ]
    },
    tools: {
      title: 'Outils de développement',
      icon: 'Wrench',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      technologies: [
        { name: 'Git & GitHub', level: 92, icon: 'GitBranch', experience: '3+ years' },
        { name: 'Docker', level: 80, icon: 'Package', experience: '1+ years' },
        { name: 'VS Code', level: 95, icon: 'Code', experience: '4+ years' },
        { name: 'Postman', level: 88, icon: 'Send', experience: '2+ years' },
        { name: 'JIRA Atlasian', level: 75, icon: 'Palette', experience: '1+ years' }
      ]
    }
  };

  const codeExamples: Record<CategoryKey, string> = {
    frontend: `// Modern React with TypeScript
const Portfolio: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  
  useEffect(() => {
    fetchSkills().then(setSkills);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="portfolio-container"
    >
      {skills.map(skill => (
        <SkillCard key={skill.id} {...skill} />
      ))}
    </motion.div>
  );
};`,
    backend: `// Express.js API with TypeScript
app.post('/api/projects', async (req: Request, res: Response) => {
  try {
    const project = await Project.create({
      ...req.body,
      userId: req.user.id,
      createdAt: new Date()
    });
    
    res.status(201).json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});`,
    database: `-- PostgreSQL Schema Design
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  tech_stack JSONB,
  github_url VARCHAR(500),
  live_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_projects_tech ON projects 
USING GIN (tech_stack);`,
    tools: `# Docker Multi-stage Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS runtime
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "start"]`
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          {...{
            initial:{ opacity: 0, y: 20 },
            whileInView:{ opacity: 1, y: 0 },
            transition:{ duration: 0.6 },
            viewport:{ once: true },
            className:"text-center mb-16"
          }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Expertise technique
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Des fondements de l'informatique traditionnelle aux technologies 
          web de pointe. Voici mon arsenal technique pour créer des solutions numériques évolutives.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          {...{
            initial:{ opacity: 0, y: 20 },
            whileInView:{ opacity: 1, y: 0 },
            transition:{ duration: 0.6, delay: 0.2 },
            viewport:{ once: true },
            className:"flex flex-wrap justify-center gap-4 mb-12"
          }}
        >
          {Object.entries(techCategories)?.map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key as CategoryKey)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                activeCategory === key
                  ? `bg-primary text-primary-foreground shadow-soft`
                  : 'bg-card text-muted-foreground hover:text-foreground hover:bg-muted border border-border'
              }`}
            >
              <Icon name={category?.icon} size={18} />
              <span>{category?.title}</span>
            </button>
          ))}
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Technologies List */}
          <motion.div
            {...{
              key:activeCategory,
              initial:{ opacity: 0, x: -20 },
              animate:{ opacity: 1, x: 0 },
              transition:{ duration: 0.5 },
              className:"space-y-6"
            }}
          >
            <div className={`flex items-center space-x-3 p-4 rounded-lg ${techCategories?.[activeCategory]?.bgColor}`}>
              <Icon 
                name={techCategories?.[activeCategory]?.icon} 
                size={24} 
                className={techCategories?.[activeCategory]?.color} 
              />
              <h3 className="text-xl font-semibold text-foreground">
                {techCategories?.[activeCategory]?.title}
              </h3>
            </div>

            <div className="space-y-4">
              {techCategories?.[activeCategory]?.technologies?.map((tech, index) => (
                <motion.div
                  {...{
                    key:tech?.name,
                    initial:{ opacity: 0, y: 20 },
                    animate:{ opacity: 1, y: 0 },
                    transition:{ duration: 0.4, delay: index * 0.1 },
                    onMouseEnter:() => setHoveredTech(tech?.name),
                    onMouseLeave:() => setHoveredTech(null),
                    className: "bg-card border border-border rounded-lg p-4 hover:shadow-soft transition-all duration-200 cursor-pointer"
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Icon name={tech?.icon} size={20} className="text-primary" />
                      <span className="font-semibold text-foreground">{tech?.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">{tech?.experience}</span>
                      <span className="text-sm font-mono text-foreground">{tech?.level}%</span>
                    </div>
                  </div>
                  
                  <div className="w-full bg-muted rounded-full h-2">
                    <motion.div
                      {...{
                        initial:{ width: 0 },
                        animate:{ width: `${tech?.level}%` },
                        transition:{ duration: 1, delay: index * 0.1, ease: "easeOut" },
                        className:`h-2 rounded-full bg-gradient-to-r from-primary to-secondary ${
                          hoveredTech === tech?.name ? 'shadow-soft' : ''
                        }`
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Code Example */}
          <motion.div
            {...{
              key:`code-${activeCategory}`,
              initial:{ opacity: 0, x: 20 },
              animate:{ opacity: 1, x: 0 },
              transition:{ duration: 0.5 },
              className:"bg-card border border-border rounded-lg overflow-hidden shadow-soft"
            }}
          >
            {/* Terminal Header */}
            <div className="flex items-center space-x-2 px-4 py-3 bg-muted border-b border-border">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-mono text-muted-foreground ml-4">
                {activeCategory}.{activeCategory === 'database' ? 'sql' : activeCategory === 'tools' ? 'dockerfile' : 'tsx'}
              </span>
            </div>
            
            {/* Code Content */}
            <div className="p-6">
              <pre className="text-sm font-mono text-muted-foreground overflow-x-auto">
                <code>{codeExamples?.[activeCategory]}</code>
              </pre>
            </div>
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          {...{
            initial:{ opacity: 0, y: 20 },
            whileInView:{ opacity: 1, y: 0 },
            transition:{ duration: 0.6, delay: 0.4 },
            viewport:{ once: true },
            className:"grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-16 border-t border-border"
          }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">5+</div>
            <div className="text-sm text-muted-foreground">Technologies maîtrisées</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary mb-2">10+</div>
            <div className="text-sm text-muted-foreground">Projets terminés</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">1+</div>
            <div className="text-sm text-muted-foreground">Années d'expérience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-github-green mb-2">500+</div>
            <div className="text-sm text-muted-foreground">GitHub Commits</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechShowcase;