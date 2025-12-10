import type React from 'react';
import Icon, { type IconName } from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

interface Credential {
  id: string;
  icon: IconName;
  title: string;
  subtitle: string;
  description: string;
  year: string;
  verified: boolean;
}

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  avatar: string;
  content: string;
  rating: number; // entre 1 et 5
  project: string;
}

interface Stat {
  label: string;
  value: string;
  icon: IconName;
}

interface Partnership {
  name: string;
  logo: string;
  description: string;
}

const TrustSignals: React.FC = () => {
  const credentials: Credential[] = [
    {
      id: 'education',
      icon: 'GraduationCap',
      title: 'Formation MIAGE',
      subtitle: 'ESMIA - École Supérieure de Management et d\'Informatique Appliquée',
      description: 'Diplôme en Méthodes Informatiques Appliquées à la Gestion d\'Entreprise',
      year: '2022-2024',
      verified: true
    },
    {
      id: 'certification',
      icon: 'Award',
      title: 'Certification TECHLAB-JS',
      subtitle: 'JavaScript & Frameworks Modernes',
      description: 'Certification avancée en développement JavaScript et React',
      year: '2024',
      verified: true
    },
    {
      id: 'registration',
      icon: 'Shield',
      title: 'Enregistrement Professionnel',
      subtitle: 'Madagascar Business Registry',
      description: 'Développeur freelance enregistré officiellement',
      year: '2024',
      verified: true
    }
  ];

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Marie Rasoanaivo',
      position: 'Directrice Technique, MESUPRES',
      company: 'Ministère de l\'Enseignement Supérieur',
      avatar: '../../../../public/no_image.png',
      content: `Lucien a développé notre système de registre avec une expertise remarquable. Son approche méthodique et sa maîtrise des technologies modernes ont permis de livrer une solution robuste et évolutive.`,
      rating: 5,
      project: 'Système de Registre MESUPRES'
    },
    {
      id: 2,
      name: 'Jean-Claude Andrianasolo',
      position: 'Président, FC FOUDRE',
      company: 'Club de Football',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      content: `Le site web du club a dépassé nos attentes. Interface moderne, gestion des membres efficace, et une présentation professionnelle qui renforce notre image. Excellent travail !`,
      rating: 5,
      project: 'Site Web FC FOUDRE'
    },
    {
      id: 3,
      name: 'Dr. Hery Rakotomalala',
      position: 'Superviseur de Stage',
      company: 'ESMIA',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      content: `Lucien démontre une capacité d'adaptation exceptionnelle aux nouvelles technologies. Son passage de Java vers l'écosystème React témoigne de sa polyvalence et de son engagement professionnel.`,
      rating: 5,
      project: 'Supervision Académique'
    }
  ];

  const stats: Stat[] = [
    { label: 'Projets Réalisés', value: '12+', icon: 'FolderOpen' },
    { label: 'Clients Satisfaits', value: '8', icon: 'Users' },
    { label: 'Années d\'Expérience', value: '3', icon: 'Calendar' },
    { label: 'Technologies Maîtrisées', value: '15+', icon: 'Code' }
  ];

  const partnerships: Partnership[] = [
    {
      name: 'MESUPRES',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=60&fit=crop',
      description: 'Ministère de l\'Enseignement Supérieur'
    },
    {
      name: 'ESMIA',
      logo: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=120&h=60&fit=crop',
      description: 'École Supérieure de Management'
    },
    {
      name: 'TECHLAB',
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=60&fit=crop',
      description: 'Centre de Formation Tech'
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < rating ? 'text-amber-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Références & Crédibilité
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez les témoignages de mes clients et partenaires professionnels
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats?.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3">
                <Icon name={stat?.icon} size={24} className="text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">
                {stat?.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat?.label}
              </div>
            </div>
          ))}
        </div>

        {/* Credentials */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            Qualifications Professionnelles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {credentials?.map((credential) => (
              <div
                key={credential?.id}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-elevation transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={credential?.icon} size={24} className="text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="text-lg font-semibold text-foreground">
                        {credential?.title}
                      </h4>
                      {credential?.verified && (
                        <Icon name="CheckCircle" size={16} className="text-success" />
                      )}
                    </div>
                    <p className="text-sm font-medium text-primary mb-2">
                      {credential?.subtitle}
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      {credential?.description}
                    </p>
                    <div className="text-xs text-muted-foreground">
                      {credential?.year}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            Témoignages Clients
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {testimonials?.map((testimonial) => (
              <div
                key={testimonial?.id}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-elevation transition-all duration-300"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <Image
                    src={testimonial?.avatar}
                    alt={testimonial?.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-foreground">
                      {testimonial?.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial?.position}
                    </p>
                    <p className="text-xs text-primary">
                      {testimonial?.company}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1 mb-3">
                  {renderStars(testimonial?.rating)}
                </div>
                
                <blockquote className="text-sm text-muted-foreground mb-4 italic">
                  "{testimonial?.content}"
                </blockquote>
                
                <div className="text-xs text-muted-foreground border-t border-border pt-3">
                  Projet: {testimonial?.project}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partnerships */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            Partenaires & Collaborations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {partnerships?.map((partner, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-elevation transition-all duration-300"
              >
                <div className="mb-4">
                  <Image
                    src={partner?.logo}
                    alt={partner?.name}
                    className="w-24 h-12 mx-auto object-contain rounded"
                  />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  {partner?.name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {partner?.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="bg-muted/30 rounded-xl p-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-foreground mb-2">
              Garanties Professionnelles
            </h3>
            <p className="text-muted-foreground">
              Votre projet entre de bonnes mains
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-success/10 rounded-lg mb-3">
                <Icon name="Shield" size={24} className="text-success" />
              </div>
              <h4 className="text-sm font-semibold text-foreground mb-1">
                Code Sécurisé
              </h4>
              <p className="text-xs text-muted-foreground">
                Bonnes pratiques de sécurité
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3">
                <Icon name="Clock" size={24} className="text-primary" />
              </div>
              <h4 className="text-sm font-semibold text-foreground mb-1">
                Délais Respectés
              </h4>
              <p className="text-xs text-muted-foreground">
                Livraison dans les temps
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-lg mb-3">
                <Icon name="Headphones" size={24} className="text-secondary" />
              </div>
              <h4 className="text-sm font-semibold text-foreground mb-1">
                Support Inclus
              </h4>
              <p className="text-xs text-muted-foreground">
                30 jours de support gratuit
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-3">
                <Icon name="RefreshCw" size={24} className="text-accent" />
              </div>
              <h4 className="text-sm font-semibold text-foreground mb-1">
                Révisions Incluses
              </h4>
              <p className="text-xs text-muted-foreground">
                Modifications jusqu'à satisfaction
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;