import Icon from '../../../components/AppIcon';

const ContactHero = () => {
  return (
    <div className="relative bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-16 lg:py-24">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl mb-6">
            <Icon name="MessageCircle" size={32} color="white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Collaborons Ensemble
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Prêt à transformer vos idées en solutions numériques innovantes ? Contactez-moi pour discuter de votre prochain projet ou opportunité professionnelle.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Icon name="MapPin" size={16} />
              <span>Madagascar & International</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Clock" size={16} />
              <span>UTC+3 (EAT)</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Globe" size={16} />
              <span>Français • English</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactHero;