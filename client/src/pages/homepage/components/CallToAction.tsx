import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon, { type IconName } from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const CallToAction = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  type CtaOption = {
    id: string;
    title: string;
    description: string;
    icon: IconName;
    color: string;
    action: string;
    link: string;
    features: string[];
  };

  const ctaOptions: CtaOption[] = [
    {
      id: 'hire',
      title: 'Prêt à embaucher?',
      description: 'Vous recherchez un développeur full-stack dédié pour rejoindre votre équipe ? Discutons de la contribution que je peux apporter à votre prochain projet.',
      icon: 'Briefcase',
      color: 'from-primary to-blue-600',
      action: 'Planifier un entretien',
      link: '/',
      features: ['Postes à temps plein', 'Prêt pour le travail à distance', 'Disponibilité immédiate', 'Tarifs compétitifs']
    },
    {
      id: 'project',
      title: 'Vous avez un projet ?',
      description: 'Besoin d\'une application web personnalisée ou souhaitez moderniser votre système existant ? Je suis là pour donner vie à vos idées.',
      icon: 'Rocket',
      color: 'from-secondary to-green-600',
      action: 'Démarrer le projet',
      link: '/',
      features: ['Développement personnalisé', 'Pile technologique moderne', 'Solutions évolutives', 'Un soutien continu']
    },
    {
      id: 'collaborate',
      title: 'Collaborons',
      description: 'Développeur ou passionné de technologie ? Je suis toujours ouvert à la collaboration sur des projets intéressants et au partage de connaissances.',
      icon: 'Users',
      color: 'from-accent to-orange-600',
      action: 'Connectez-vous maintenant',
      link: '/',
      features: ['Projets open source', 'Partage de connaissances', 'Mentorship', 'Communauté technologique']
    }
  ];

  const quickStats: { label: string; value: string; icon: IconName }[] = [
    { label: 'Temps de réponse', value: '< 24h', icon: 'Clock' },
    { label: 'Succès du projet', value: '100%', icon: 'CheckCircle' },
    { label: 'Satisfaction des clients', value: '5/5', icon: 'Star' },
    { label: 'Disponibilité', value: 'Open', icon: 'Calendar' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 via-background to-muted/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-40 h-40 border border-primary rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 border border-secondary rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-accent rounded-full"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Prêt à travailler ensemble ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Que vous cherchiez à embaucher, à démarrer un projet ou à collaborer, 
            je suis impatient de connaître votre prochaine grande idée.
          </p>
        </motion.div>

        {/* CTA Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {ctaOptions?.map((option, index) => (
            <motion.div
              {...{
                key:option?.id,
                initial:{ opacity: 0, y: 30 },
                whileInView:{ opacity: 1, y: 0 },
                transition:{ duration: 0.6, delay: index * 0.1 },
                viewport:{ once: true },
                onMouseEnter:() => setHoveredCard(option?.id),
                onMouseLeave:() => setHoveredCard(null),
                className:"group relative bg-card border border-border rounded-xl p-8 hover:shadow-elevation transition-all duration-300 overflow-hidden"
              }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${option?.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${option?.color} text-white mb-6`}>
                  <Icon name={option?.icon} size={24} />
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {option?.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {option?.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-8">
                  {option?.features?.map((feature) => (
                    <li key={feature} className="flex items-center space-x-2">
                      <Icon name="Check" size={16} className="text-green-500" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link to={option?.link}>
                  <Button
                    variant="default"
                    size="lg"
                    fullWidth
                    iconName="ArrowRight"
                    iconPosition="right"
                    className={`group-hover:shadow-soft transition-all duration-200 ${
                      hoveredCard === option?.id ? 'transform scale-105' : ''
                    }`}
                  >
                    {option?.action}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <motion.div
          {...{
            initial:{ opacity: 0, y: 20 },
            whileInView:{ opacity: 1, y: 0 },
            transition:{ duration: 0.6, delay: 0.4 },
            viewport:{ once: true },
            className:"bg-card border border-border rounded-xl p-8 mb-12"
          }}
        >
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-2">Pourquoi me choisir ?</h3>
            <p className="text-muted-foreground">Un engagement professionnel soutenu par des résultats</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {quickStats?.map((stat, index) => (
              <motion.div
                {...{
                  key:stat?.label,
                  initial:{ opacity: 0, scale: 0.8 },
                  whileInView:{ opacity: 1, scale: 1 },
                  transition:{ duration: 0.4, delay: index * 0.1 },
                  viewport:{ once: true },
                  className:"text-center group"
                }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-lg mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200">
                  <Icon name={stat?.icon} size={20} />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{stat?.value}</div>
                <div className="text-sm text-muted-foreground">{stat?.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          {...{
            initial:{ opacity: 0, y: 20 },
            whileInView:{ opacity: 1, y: 0 },
            transition:{ duration: 0.6, delay: 0.6 },
            viewport:{ once: true },
            className:"text-center bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-xl p-8"
          }}
        >
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Vous préférez le contact direct ?
          </h3>
          <p className="text-muted-foreground mb-6">
            N'hésitez pas à me contacter directement. Je suis toujours ravi de discuter de nouvelles opportunités.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              iconName="Mail"
              iconPosition="left"
              onClick={() => window.location.href = 'mailto:savakalucien@gmail.com'}
            >
              savakalucien@gmail.com
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              iconName="Phone"
              iconPosition="left"
              onClick={() => window.location.href = 'tel:+261328754672'}
            >
              +261 32 87 546 72
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              iconName="Linkedin"
              iconPosition="left"
              onClick={() => window.open('https://www.linkedin.com/in/savaka-lucien-rafaralahy-451924315/', '_blank')}
            >
              LinkedIn
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;