import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

type InquiryType = 'employment' | 'freelance' | 'collaboration' | 'consultation';
type Urgency = 'normal' | 'urgent';
type PreferredContact = 'email' | 'whatsapp' | 'linkedin' | 'phone';
type Language = 'french' | 'english' | 'both';
type IconName = "Briefcase" | "Code" | "Users" | "MessageCircle";

interface FormData {
  inquiryType: InquiryType;
  name: string;
  email: string;
  company: string;
  position: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  technologies: string[];
  urgency: Urgency;
  preferredContact: PreferredContact;
  language: Language;
}

interface InquiryTypeOption {
    value: InquiryType;
    label: string;
    icon: IconName;
}

interface BudgetRange {
  value: string;
  label: string;
}

interface TimelineOption {
  value: string;
  label: string;
}

const initialFormData: FormData = {
  inquiryType: 'employment',
  name: '',
  email: '',
  company: '',
  position: '',
  projectType: '',
  budget: '',
  timeline: '',
  description: '',
  technologies: [],
  urgency: 'normal',
  preferredContact: 'email',
  language: 'french'
};

const InquiryForm = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const inquiryTypes: InquiryTypeOption[] = [
    { value: 'employment', label: "Opportunité d'Emploi", icon: 'Briefcase' },
    { value: 'freelance', label: 'Projet Freelance', icon: 'Code' },
    { value: 'collaboration', label: 'Collaboration', icon: 'Users' },
    { value: 'consultation', label: 'Consultation', icon: 'MessageCircle' }
  ];

  const technologies: string[] = [
    'React', 'TypeScript', 'Node.js', 'Python', 'Java', 'PostgreSQL', 
    'MongoDB', 'Docker', 'AWS', 'Git', 'REST API', 'GraphQL'
  ];

  const budgetRanges: BudgetRange[] = [
    { value: '500-2000', label: '500€ - 2,000€' },
    { value: '2000-5000', label: '2,000€ - 5,000€' },
    { value: '5000-10000', label: '5,000€ - 10,000€' },
    { value: '10000+', label: '10,000€+' },
    { value: 'discuss', label: 'À discuter' }
  ];

  const timelineOptions: TimelineOption[] = [
    { value: 'asap', label: 'Dès que possible' },
    { value: '1-2weeks', label: '1-2 semaines' },
    { value: '1month', label: '1 mois' },
    { value: '2-3months', label: '2-3 mois' },
    { value: 'flexible', label: 'Flexible' }
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTechnologyToggle = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.includes(tech)
        ? prev.technologies.filter(t => t !== tech)
        : [...prev.technologies, tech]
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData(initialFormData);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderDynamicFields = () => {
    switch (formData.inquiryType) {
      case 'employment':
        return (
          <>
            <Input
              label="Entreprise"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="Nom de votre entreprise"
              required
            />
            <Input
              label="Poste Proposé"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              placeholder="Ex: Développeur Full-Stack Senior"
              required
            />
          </>
        );
      case 'freelance':
        return (
          <>
            <Input
              label="Type de Projet"
              name="projectType"
              value={formData.projectType}
              onChange={handleInputChange}
              placeholder="Ex: Site web e-commerce, Application mobile"
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Budget Estimé
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="">Sélectionner un budget</option>
                  {budgetRanges.map(range => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Délai Souhaité
                </label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="">Sélectionner un délai</option>
                  {timelineOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="py-16 bg-muted/30">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center bg-card border border-border rounded-xl p-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-success/10 rounded-full mb-6">
              <Icon name="CheckCircle" size={32} className="text-success" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Message Envoyé avec Succès !
            </h3>
            <p className="text-muted-foreground mb-6">
              Merci pour votre demande. Je vous répondrai dans les 24 heures.
            </p>
            <Button
              variant="outline"
              onClick={() => setSubmitStatus(null)}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Envoyer un Autre Message
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Formulaire de Demande Professionnelle
          </h2>
          <p className="text-lg text-muted-foreground">
            Décrivez votre projet ou opportunité pour une réponse personnalisée
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Inquiry Type Selection */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-4">
                Type de Demande *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {inquiryTypes.map((type) => (
                  <label
                    key={type.value}
                    className={`relative flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                      formData.inquiryType === type.value
                        ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="inquiryType"
                      value={type.value}
                      checked={formData.inquiryType === type.value}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <Icon name={type.icon} size={20} className="mr-3" />
                    <span className="text-sm font-medium">{type.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Nom Complet"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Votre nom complet"
                required
              />
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="votre.email@exemple.com"
                required
              />
            </div>

            {/* Dynamic Fields Based on Inquiry Type */}
            {renderDynamicFields()}

            {/* Technologies (for freelance and collaboration) */}
            {(formData.inquiryType === 'freelance' || formData.inquiryType === 'collaboration') && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-4">
                  Technologies Requises
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {technologies.map((tech) => (
                    <Checkbox
                      key={tech}
                      label={tech}
                      checked={formData.technologies.includes(tech)}
                      onChange={() => handleTechnologyToggle(tech)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Project Description */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description Détaillée *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder={
                  formData.inquiryType === 'employment' ? "Décrivez le poste, les responsabilités, l'équipe, la culture d'entreprise..." :"Décrivez votre projet, les fonctionnalités souhaitées, les contraintes techniques..."
                }
                required
              />
            </div>

            {/* Contact Preferences */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Méthode de Contact Préférée
                </label>
                <select
                  name="preferredContact"
                  value={formData.preferredContact}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="email">Email</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="phone">Appel Téléphonique</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Langue de Communication
                </label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="french">Français</option>
                  <option value="english">English</option>
                  <option value="both">Les deux</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button
                type="submit"
                variant="default"
                size="lg"
                fullWidth
                loading={isSubmitting}
                iconName="Send"
                iconPosition="right"
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer la Demande'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InquiryForm;