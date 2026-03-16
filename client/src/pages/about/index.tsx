import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import PersonalInfo from './components/PersonalInfo';
import StatsCard from './components/StatsCard';
import JourneyTimeline from './components/JourneyTimeline';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import type { IconName, StatsColor } from '../projects/type';

interface Stat {
  icon: IconName;
  value: string;
  label: string;
  description: string;
  color: StatsColor;
}

interface CoreValue {
  icon: IconName;
  title: string;
  description: string;
}

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats: Stat[] = [
    {
      icon: 'GraduationCap',
      value: '4',
      label: 'Années d\'études superieur',
      description: 'Programme MIAGE et IRD alliant informatique et gestion d\'entreprise',
      color: 'primary'
    },
    {
      icon: 'Code',
      value: '8+',
      label: 'Projects Completed',
      description: 'Des projets académiques aux applications professionnelles',
      color: 'secondary'
    },
    {
      icon: 'Award',
      value: '1',
      label: 'Certifications',
      description: 'Y compris TECHLAB-JS et les réalisations académiques',
      color: 'accent'
    },
    {
      icon: 'Globe',
      value: '3',
      label: 'Langues',
      description: 'Français, Anglais, et malgache',
      color: 'success'
    }
  ];

  const coreValues: CoreValue[] = [
    {
      icon: 'Lightbulb',
      title: 'Apprentissage continu',
      description: 'Adopter de nouvelles technologies et méthodologies pour rester à la pointe de l’innovation en matière de développement Web.'
    },
    {
      icon: 'Users',
      title: 'Esprit de collaboration',
      description: 'Créer des ponts entre les équipes techniques et les acteurs commerciaux grâce à une communication efficace.'
    },
    {
      icon: 'Target',
      title: 'Accent sur la qualité',
      description: 'Delivering robust, scalable solutions that meet both technical excellence and business objectives.'
    },
    {
      icon: 'Globe',
      title: 'Perspective globale',
      description: 'Apporter des connaissances uniques sur Madagascar aux projets internationaux tout en maintenant les normes globale.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>À propos de Lucien - Parcours de développeur Full Stack | De Madagascar à la technologie globale</title>
        <meta name="description" content="Découvrez le parcours de Lucien, d'étudiant MIAGE à Madagascar à développeur full-stack. Il allie les fondamentaux informatiques traditionnels aux technologies web modernes." />
        <meta name="keywords" content="Savaka Lucien, développeur Madagascar, MIAGE, développeur full-stack, React, TypeScript, ESMIA" />
        <meta property="og:title" content="À propos de Lucien - Parcours de développeur Full Stack" />
        <meta property="og:description" content="De l'étudiant en informatique au développeur full-stack, explorez le parcours unique des talents malgaches dans la technologie globale." />
        <meta property="og:type" content="profile" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-background via-muted/30 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Icon name="MapPin" size={16} />
                Talents malgaches, normes mondiales
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Mon voyage vers
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Développement Full Stack
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              D'étudiant ESMIA MIAGE à développeur professionnel, découvrez comment je relie 
              les fondements de l'informatique traditionnelle aux technologies web modernes, 
              apportant une perspective unique de Madagascar à l'écosystème technologique mondial.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {stats?.map((stat, index) => (
                <StatsCard
                  key={index}
                  icon={stat?.icon}
                  value={stat?.value}
                  label={stat?.label}
                  description={stat?.description}
                  color={stat?.color}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Personal Information Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Rencontrez Lucien 
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Professionnel mais accessible, techniquement confiant mais humble quant à l'apprentissage continu
              </p>
            </div>
            
            <PersonalInfo />
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Valeurs fondamentales et approche
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Les principes qui guident ma philosophie de développement et ma croissance professionnelle
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues?.map((value, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon name={value?.icon} size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {value?.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value?.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Journey Timeline Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Educational & Professional Journey
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Une chronologie interactive présentant mon évolution d'étudiant en informatique à développeur full-stack
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <JourneyTimeline />
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-elevation">
              <Icon name="MessageCircle" size={48} className="text-primary mx-auto mb-6" />
              
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Let's Build Something Amazing Together
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Ready to bring your ideas to life? Whether you're looking for a dedicated team member 
                or a freelance developer for your next project, I'd love to hear from you.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="default"
                  size="lg"
                  iconName="Mail"
                  iconPosition="left"
                  onClick={() => window.location.href = '/contact'}
                >
                  Start a Conversation
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  iconName="FolderOpen"
                  iconPosition="left"
                  onClick={() => window.location.href = '/projects'}
                >
                  View My Projects
                </Button>
              </div>
              
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Available for full-time opportunities and freelance projects
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-foreground text-background py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm opacity-80">
                © {new Date()?.getFullYear()} Lucien Rakotondrabe. Bridging Madagascar talent with global opportunities.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default About;