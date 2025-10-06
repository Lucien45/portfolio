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
      value: '5+',
      label: 'Years of Study',
      description: 'MIAGE program combining CS and business management',
      color: 'primary'
    },
    {
      icon: 'Code',
      value: '10+',
      label: 'Projects Completed',
      description: 'From academic projects to professional applications',
      color: 'secondary'
    },
    {
      icon: 'Award',
      value: '3+',
      label: 'Certifications',
      description: 'Including TECHLAB-JS and academic achievements',
      color: 'accent'
    },
    {
      icon: 'Globe',
      value: '3',
      label: 'Languages',
      description: 'French, English, and Malagasy fluency',
      color: 'success'
    }
  ];

  const coreValues: CoreValue[] = [
    {
      icon: 'Lightbulb',
      title: 'Continuous Learning',
      description: 'Embracing new technologies and methodologies to stay at the forefront of web development innovation.'
    },
    {
      icon: 'Users',
      title: 'Collaborative Spirit',
      description: 'Building bridges between technical teams and business stakeholders through effective communication.'
    },
    {
      icon: 'Target',
      title: 'Quality Focus',
      description: 'Delivering robust, scalable solutions that meet both technical excellence and business objectives.'
    },
    {
      icon: 'Globe',
      title: 'Global Perspective',
      description: 'Bringing unique Madagascar insights to international projects while maintaining global standards.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Lucien - Full Stack Developer Journey | Madagascar to Global Tech</title>
        <meta name="description" content="Discover Lucien's journey from MIAGE student in Madagascar to full-stack developer. Bridging traditional CS foundations with modern web technologies." />
        <meta name="keywords" content="Lucien Rakotondrabe, Madagascar developer, MIAGE, full-stack developer, React, TypeScript, ESMIA" />
        <meta property="og:title" content="About Lucien - Full Stack Developer Journey" />
        <meta property="og:description" content="From computer science student to full-stack developer - explore the unique journey of Madagascar talent in global tech." />
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
                Madagascar Talent, Global Standards
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                My Journey to
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Full Stack Development
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                From ESMIA MIAGE student to professional developer, discover how I'm bridging traditional 
                computer science foundations with modern web technologies, bringing a unique Madagascar 
                perspective to the global tech ecosystem.
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
                Meet Lucien
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Professional yet approachable, technically confident but humble about continuous learning
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
                Core Values & Approach
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide my development philosophy and professional growth
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
                An interactive timeline showcasing my evolution from computer science student to full-stack developer
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