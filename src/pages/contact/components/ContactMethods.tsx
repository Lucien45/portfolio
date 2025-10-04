import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

type IconName =
  | "Mail" | "Linkedin" | "Github" | "MessageSquare" | "Shield"
  // Ajoute ici toutes les icônes utilisées dans ton projet...

interface ContactMethod {
  id: string;
  icon: IconName;
  title: string;
  description: string;
  value: string;
  action: string;
  primary: boolean;
  availability: string;
}

const contactMethods: ContactMethod[] = [
  {
    id: 'email',
    icon: 'Mail',
    title: 'Email Professionnel',
    description: 'Pour les opportunités d\'emploi et collaborations',
    value: 'lucien.dev@gmail.com',
    action: 'mailto:lucien.dev@gmail.com',
    primary: true,
    availability: 'Réponse sous 24h'
  },
  {
    id: 'linkedin',
    icon: 'Linkedin',
    title: 'LinkedIn',
    description: 'Réseau professionnel et opportunités',
    value: 'linkedin.com/in/lucien-dev',
    action: 'https://linkedin.com/in/lucien-dev',
    primary: false,
    availability: 'Actif quotidiennement'
  },
  {
    id: 'github',
    icon: 'Github',
    title: 'GitHub',
    description: 'Code source et contributions open source',
    value: 'github.com/lucien-dev',
    action: 'https://github.com/lucien-dev',
    primary: false,
    availability: 'Commits réguliers'
  },
  {
    id: 'whatsapp',
    icon: 'MessageSquare',
    title: 'WhatsApp Business',
    description: 'Discussions rapides et consultations',
    value: '+261 34 12 345 67',
    action: 'https://wa.me/261341234567',
    primary: false,
    availability: '9h-18h UTC+3'
  }
];

const handleContactClick = (method: ContactMethod) => {
  if (method.action.startsWith('mailto:')) {
    window.location.href = method.action;
  } else {
    window.open(method.action, '_blank');
  }
};

const ContactMethods = () => {
  return (
    <div className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Méthodes de Contact
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choisissez le canal qui convient le mieux à votre type de demande
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((method) => (
            <div
              key={method.id}
              className={`relative bg-card border border-border rounded-xl p-6 hover:shadow-elevation transition-all duration-300 group ${
                method.primary ? 'ring-2 ring-primary/20 bg-primary/5' : ''
              }`}
            >
              {method.primary && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    Recommandé
                  </span>
                </div>
              )}
              
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${
                  method.primary 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground'
                } transition-colors duration-300`}>
                  <Icon name={method.icon} size={24} />
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {method.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4">
                  {method.description}
                </p>
                
                <div className="text-sm font-mono text-foreground mb-3 break-all">
                  {method.value}
                </div>
                
                <div className="text-xs text-muted-foreground mb-4">
                  {method.availability}
                </div>
                
                <Button
                  variant={method.primary ? "default" : "outline"}
                  size="sm"
                  fullWidth
                  onClick={() => handleContactClick(method)}
                  iconName="ExternalLink"
                  iconPosition="right"
                >
                  Contacter
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-muted/50 rounded-xl p-6 max-w-2xl mx-auto">
            <Icon name="Shield" size={24} className="mx-auto mb-3 text-success" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Confidentialité Garantie
            </h3>
            <p className="text-sm text-muted-foreground">
              Toutes les communications sont traitées de manière confidentielle. 
              Vos informations ne seront jamais partagées avec des tiers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMethods;