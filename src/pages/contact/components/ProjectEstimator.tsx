/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import Icon, { type IconName } from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

type ProjectTypeId = 'website' | 'ecommerce' | 'webapp' | 'mobile' | 'api';
type Complexity = 'simple' | 'medium' | 'complex';
type Timeline = 'rush' | 'normal' | 'flexible';
type DesignOption = 'provided' | 'custom' | 'template';

interface ProjectData {
    projectType: ProjectTypeId | '';
    features: string[];
    complexity: Complexity;
    timeline: Timeline | '';
    platforms: string[];
    integrations: string[];
    design: DesignOption;
    maintenance: boolean;
}

interface Estimation {
    basePrice: number;
    featuresPrice: number;
    platformsPrice: number;
    integrationsPrice: number;
    maintenancePrice: number;
    totalPrice: number;
    duration: number;
    breakdown: {
        complexity: number;
        timeline: number;
        design: number;
    };
}

const ProjectEstimator = () => {
  const [projectData, setProjectData] = useState<ProjectData>({
    projectType: '',
    features: [],
    complexity: 'medium',
    timeline: '',
    platforms: [],
    integrations: [],
    design: 'provided',
    maintenance: false
  });

  const [estimation, setEstimation] = useState<Estimation | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  const projectTypes: {
    id: ProjectTypeId;
    name: string;
    icon: string;
    basePrice: number;
    description: string;
  }[] = [
    { id: 'website', name: 'Site Web Vitrine', icon: 'Globe', basePrice: 1500, description: 'Site web professionnel avec pages statiques' },
    { id: 'ecommerce', name: 'E-commerce', icon: 'ShoppingCart', basePrice: 3500, description: 'Boutique en ligne complète avec paiement' },
    { id: 'webapp', name: 'Application Web', icon: 'Monitor', basePrice: 5000, description: 'Application web interactive avec base de données' },
    { id: 'mobile', name: 'Application Mobile', icon: 'Smartphone', basePrice: 7000, description: 'Application mobile native ou hybride' },
    { id: 'api', name: 'API / Backend', icon: 'Server', basePrice: 2500, description: 'API REST ou GraphQL avec base de données' }
  ];

  const features: Record<ProjectTypeId, { id: string; name: string; price: number }[]> = {
    website: [
      { id: 'cms', name: 'Système de gestion de contenu', price: 800 },
      { id: 'multilang', name: 'Multi-langues', price: 600 },
      { id: 'seo', name: 'Optimisation SEO avancée', price: 500 },
      { id: 'analytics', name: 'Analytics et tracking', price: 300 },
      { id: 'contact', name: 'Formulaires de contact avancés', price: 400 }
    ],
    ecommerce: [
      { id: 'inventory', name: 'Gestion des stocks', price: 1200 },
      { id: 'multivendor', name: 'Multi-vendeurs', price: 2000 },
      { id: 'subscription', name: 'Abonnements récurrents', price: 1500 },
      { id: 'reviews', name: 'Système d\'avis clients', price: 600 },
      { id: 'coupons', name: 'Système de coupons', price: 800 }
    ],
    webapp: [
      { id: 'auth', name: 'Authentification avancée', price: 1000 },
      { id: 'realtime', name: 'Fonctionnalités temps réel', price: 1500 },
      { id: 'dashboard', name: 'Tableau de bord analytique', price: 2000 },
      { id: 'notifications', name: 'Système de notifications', price: 800 },
      { id: 'export', name: 'Export de données', price: 600 }
    ],
    mobile: [
      { id: 'push', name: 'Notifications push', price: 800 },
      { id: 'offline', name: 'Mode hors ligne', price: 1200 },
      { id: 'camera', name: 'Intégration caméra', price: 600 },
      { id: 'geolocation', name: 'Géolocalisation', price: 500 },
      { id: 'biometric', name: 'Authentification biométrique', price: 1000 }
    ],
    api: [
      { id: 'documentation', name: 'Documentation interactive', price: 500 },
      { id: 'versioning', name: 'Versioning API', price: 400 },
      { id: 'ratelimit', name: 'Rate limiting', price: 300 },
      { id: 'monitoring', name: 'Monitoring et logs', price: 600 },
      { id: 'testing', name: 'Tests automatisés', price: 800 }
    ]
  };

  const complexityMultipliers: Record<Complexity, { multiplier: number; label: string; description: string }> = {
    simple: { multiplier: 0.8, label: 'Simple', description: 'Fonctionnalités de base' },
    medium: { multiplier: 1.0, label: 'Moyen', description: 'Fonctionnalités standard' },
    complex: { multiplier: 1.5, label: 'Complexe', description: 'Fonctionnalités avancées' }
  };

  const timelineMultipliers: Record<Timeline, { multiplier: number; label: string; description: string }> = {
    rush: { multiplier: 1.5, label: 'Urgent (< 2 semaines)', description: 'Livraison accélérée' },
    normal: { multiplier: 1.0, label: 'Normal (1-2 mois)', description: 'Délai standard' },
    flexible: { multiplier: 0.9, label: 'Flexible (3+ mois)', description: 'Pas de contrainte de temps' }
  };

  const platforms: { id: string; name: string; price: number }[] = [
    { id: 'web', name: 'Web (Desktop/Mobile)', price: 0 },
    { id: 'ios', name: 'iOS', price: 2000 },
    { id: 'android', name: 'Android', price: 2000 },
    { id: 'pwa', name: 'Progressive Web App', price: 800 }
  ];

  const integrations: { id: string; name: string; price: number }[] = [
    { id: 'payment', name: 'Passerelle de paiement', price: 800 },
    { id: 'social', name: 'Réseaux sociaux', price: 400 },
    { id: 'email', name: 'Service d\'emailing', price: 300 },
    { id: 'crm', name: 'CRM externe', price: 1000 },
    { id: 'analytics', name: 'Analytics avancées', price: 500 }
  ];

  const designOptions: Record<DesignOption, { multiplier: number; label: string; description: string }> = {
    provided: { multiplier: 1.0, label: 'Design fourni', description: 'Vous fournissez les maquettes' },
    custom: { multiplier: 1.3, label: 'Design sur mesure', description: 'Création complète du design' },
    template: { multiplier: 0.8, label: 'Template premium', description: 'Adaptation d\'un template existant' }
  };

  const handleProjectTypeChange = (typeId: ProjectTypeId) => {
    setProjectData(prev => ({
      ...prev,
      projectType: typeId,
      features: []
    }));
    setEstimation(null);
  };

  const handleFeatureToggle = (featureId: string) => {
    setProjectData(prev => ({
        ...prev,
        features: prev.features.includes(featureId)
          ? prev.features.filter(f => f !== featureId)
          : [...prev.features, featureId]
    }));
  };

  const handlePlatformToggle = (platformId: string) => {
    setProjectData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platformId)
        ? prev.platforms.filter(p => p !== platformId)
        : [...prev.platforms, platformId]
    }));
  };

  const handleIntegrationToggle = (integrationId: string) => {
    setProjectData(prev => ({
      ...prev,
      integrations: prev.integrations.includes(integrationId)
        ? prev.integrations.filter(i => i !== integrationId)
        : [...prev.integrations, integrationId]
    }));
  };

  const calculateEstimation = async () => {
    if (!projectData?.projectType || !projectData?.timeline) return;

    setIsCalculating(true);
    
    // Simulate calculation delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const selectedType = projectTypes?.find(t => t?.id === projectData?.projectType);
    const basePrice = selectedType?.basePrice ?? 0;

    // Add features cost
    const selectedFeatures = features?.[projectData?.projectType] || [];
    const featuresPrice = selectedFeatures?.filter(f => projectData?.features?.includes(f?.id))?.reduce((sum, f) => sum + f?.price, 0);

    // Add platforms cost
    const platformsPrice = platforms?.filter(p => projectData?.platforms?.includes(p?.id))?.reduce((sum, p) => sum + p?.price, 0);

    // Add integrations cost
    const integrationsPrice = integrations?.filter(i => projectData?.integrations?.includes(i?.id))?.reduce((sum, i) => sum + i?.price, 0);

    // Apply multipliers
    const complexityMultiplier = complexityMultipliers?.[projectData?.complexity]?.multiplier;
    const timelineMultiplier = timelineMultipliers?.[projectData?.timeline]?.multiplier;
    const designMultiplier = designOptions?.[projectData?.design]?.multiplier;

    const totalPrice =
      (basePrice + featuresPrice + platformsPrice + integrationsPrice) *
      complexityMultiplier *
      timelineMultiplier *
      designMultiplier;

    // Add maintenance if selected
    const maintenancePrice = projectData?.maintenance ? totalPrice * 0.2 : 0;

    const estimatedDuration = Math.ceil((totalPrice / 1000) * 0.5); // Rough duration calculation

    setEstimation({
      basePrice,
      featuresPrice,
      platformsPrice,
      integrationsPrice,
      maintenancePrice,
      totalPrice: Math.round(totalPrice),
      duration: estimatedDuration,
      breakdown: {
        complexity: complexityMultiplier,
        timeline: timelineMultiplier,
        design: designMultiplier
      }
    });

    setIsCalculating(false);
  };

  const currentFeatures = projectData.projectType ? features[projectData.projectType] : [];

  return (
    <div className="py-16 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Estimateur de Projet
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Obtenez une estimation personnalisée pour votre projet en quelques clics
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Type */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-xl font-semibold text-foreground mb-6">
                Type de Projet
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projectTypes?.map((type) => (
                  <label
                    key={type?.id}
                    className={`relative flex items-start p-4 border rounded-lg cursor-pointer transition-all ${
                      projectData?.projectType === type?.id
                        ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="projectType"
                      value={type?.id}
                      checked={projectData?.projectType === type?.id}
                      onChange={() => handleProjectTypeChange(type?.id)}
                      className="sr-only"
                    />
                    <Icon name={type?.icon as IconName} size={24} className="mr-3 mt-1" />
                    <div className="flex-1">
                      <div className="text-lg font-medium text-foreground">
                        {type?.name}
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        {type?.description}
                      </div>
                      <div className="text-sm font-medium text-primary">
                        À partir de {type?.basePrice?.toLocaleString()}€
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Features */}
            {projectData?.projectType && currentFeatures?.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Fonctionnalités Additionnelles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentFeatures?.map((feature) => (
                    <div
                      key={feature?.id}
                      className="flex items-center justify-between p-3 border border-border rounded-lg"
                    >
                      <Checkbox
                        label={feature?.name}
                        checked={projectData?.features?.includes(feature?.id)}
                        onChange={() => handleFeatureToggle(feature?.id)}
                      />
                      <span className="text-sm font-medium text-primary">
                        +{feature?.price}€
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Complexity & Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Complexité
                </h3>
                <div className="space-y-3">
                  {Object.entries(complexityMultipliers)?.map(([key, complexity]) => (
                    <label
                      key={key}
                      className={`flex items-start p-3 border rounded-lg cursor-pointer transition-all ${
                        projectData?.complexity === key
                          ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="complexity"
                        value={key}
                        checked={projectData?.complexity === key}
                        onChange={(e) => setProjectData(prev => ({ ...prev, complexity: e.target.value as Complexity }))}
                        className="sr-only"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-foreground">
                          {complexity?.label}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {complexity?.description}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Délai Souhaité
                </h3>
                <div className="space-y-3">
                  {Object.entries(timelineMultipliers)?.map(([key, timeline]) => (
                    <label
                      key={key}
                      className={`flex items-start p-3 border rounded-lg cursor-pointer transition-all ${
                        projectData?.timeline === key
                          ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="timeline"
                        value={key}
                        checked={projectData?.timeline === key}
                        onChange={(e) => setProjectData(prev => ({ ...prev, timeline: e.target.value as Timeline}))}
                        className="sr-only"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-foreground">
                          {timeline?.label}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {timeline?.description}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculate Button */}
            <div className="text-center">
              <Button
                variant="default"
                size="lg"
                onClick={calculateEstimation}
                loading={isCalculating}
                disabled={!projectData?.projectType || !projectData?.timeline}
                iconName="Calculator"
                iconPosition="left"
              >
                {isCalculating ? 'Calcul en cours...' : 'Calculer l\'Estimation'}
              </Button>
            </div>
          </div>

          {/* Estimation Results */}
          <div className="space-y-6">
            {estimation ? (
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Estimation du Projet
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Base du projet</span>
                    <span className="font-medium">{estimation?.basePrice?.toLocaleString()}€</span>
                  </div>
                  
                  {estimation?.featuresPrice > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Fonctionnalités</span>
                      <span className="font-medium">+{estimation?.featuresPrice?.toLocaleString()}€</span>
                    </div>
                  )}
                  
                  {estimation?.platformsPrice > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Plateformes</span>
                      <span className="font-medium">+{estimation?.platformsPrice?.toLocaleString()}€</span>
                    </div>
                  )}
                  
                  {estimation?.integrationsPrice > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Intégrations</span>
                      <span className="font-medium">+{estimation?.integrationsPrice?.toLocaleString()}€</span>
                    </div>
                  )}
                </div>
                
                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span className="text-foreground">Total Estimé</span>
                    <span className="text-primary">{estimation?.totalPrice?.toLocaleString()}€</span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Durée estimée: {estimation?.duration} semaines
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="text-sm text-muted-foreground">
                    <Icon name="Info" size={16} className="inline mr-2" />
                    Cette estimation est indicative et peut varier selon les spécifications exactes
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <Icon name="Clock" size={16} className="inline mr-2" />
                    Devis détaillé fourni après analyse complète du projet
                  </div>
                </div>
                
                <Button
                  variant="default"
                  fullWidth
                  iconName="MessageCircle"
                  iconPosition="left"
                >
                  Discuter du Projet
                </Button>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <Icon name="Calculator" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Estimation Personnalisée
                </h3>
                <p className="text-sm text-muted-foreground">
                  Configurez votre projet pour obtenir une estimation détaillée
                </p>
              </div>
            )}

            {/* Additional Info */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Inclus dans Tous les Projets
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className="text-sm text-foreground">Code source complet</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className="text-sm text-foreground">Documentation technique</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className="text-sm text-foreground">Tests et débogage</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className="text-sm text-foreground">Formation utilisateur</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className="text-sm text-foreground">Support 30 jours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectEstimator;