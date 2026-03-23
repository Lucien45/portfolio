import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import type { IconName } from '../../projects/type';

interface PersonalDetail {
  icon: IconName;
  label: string;
  value: string;
}

interface SocialLink {
  icon: IconName;
  label: string;
  url: string;
  color: string;
}

const PersonalInfo: React.FC = () => {
  const personalDetails: PersonalDetail[] = [
    { icon: 'MapPin', label: 'Location', value: 'Antananarivo, Madagascar' },
    { icon: 'Calendar', label: 'Age', value: '23 ans' },
    { icon: 'GraduationCap', label: 'Education', value: 'MIAGE - ESMIA' },
    { icon: 'Languages', label: 'Languages', value: 'Français, anglais, Malagasy' },
    { icon: 'Globe', label: 'Timezone', value: 'GMT+3 (EAT)' },
    { icon: 'Heart', label: 'Interests', value: 'Football, technologie, voyages, jeux vidéo' }
  ];

  const socialLinks: SocialLink[] = [
    { icon: 'Github', label: 'GitHub', url: 'https://github.com/lucien', color: 'text-gray-700' },
    { icon: 'Linkedin', label: 'LinkedIn', url: 'https://linkedin.com/in/lucien', color: 'text-blue-600' },
    { icon: 'Mail', label: 'Email', url: 'mailto:savakalucien@gmail.com', color: 'text-red-500' },
    { icon: 'Phone', label: 'Phone', url: 'tel:+261 032 87 546 72', color: 'text-green-600' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-8 shadow-soft">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-elevation">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
              alt="Lucien - Full Stack Developer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success rounded-full border-4 border-card flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            RAFARALAHY Savaka Lucien
          </h2>
          <p className="text-lg text-primary font-medium mb-3">
            Développeur Full Stack
          </p>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            Développeur passionné originaire de Madagascar, alliant les fondements de l'informatique aux technologies web modernes.
            Spécialisé en React, TypeScript et Node.js, j'offre une vision unique des solutions technologiques globales.
          </p>
          
          {/* Social Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6">
            {socialLinks?.map((link, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                iconName={link?.icon}
                iconPosition="left"
                onClick={() => window.open(link?.url, '_blank')}
                className="hover:scale-105 transition-transform duration-200"
              >
                {link?.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      {/* Personal Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {personalDetails?.map((detail, index) => (
          <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Icon name={detail?.icon} size={18} />
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                {detail?.label}
              </div>
              <div className="text-foreground font-medium">
                {detail?.value}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Call to Action */}
      <div className="mt-8 pt-6 border-t border-border">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="default"
            iconName="Download"
            iconPosition="left"
            onClick={() => window.open('/resume-lucien.pdf', '_blank')}
          >
            Télécharger mon CV
          </Button>
          <Button
            variant="outline"
            iconName="MessageCircle"
            iconPosition="left"
            onClick={() => window.location.href = '/contact'}
          >
            Me contacter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;