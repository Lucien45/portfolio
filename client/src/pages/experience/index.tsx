import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ExperienceTimeline from './components/ExperienceTimeline';
import TestimonialCarousel from './components/TestimonialCarousel';
import MetricsDashboard from './components/MetricsDashboard';
import LinkedInIntegration from './components/LinkedInIntegration';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Footer from '../../components/ui/Footer';

const Experience = () => {
  // const currentYear = new Date()?.getFullYear();

  return (
    <>
      <Helmet>
        <title>Expérience Professionnelle - Lucien Portfolio</title>
        <meta name="description" content="Detailed case studies of Lucien's internship and freelance work with measurable outcomes. Professional references and testimonials from supervisors, clients, and colleagues." />
        <meta name="keywords" content="professional experience, internship, freelance, web developer, Madagascar, MESUPRES, FC FOUDRE, testimonials" />
        <meta property="og:title" content="Professional Experience - Lucien Portfolio" />
        <meta property="og:description" content="Comprehensive documentation of professional growth and achievements with verified testimonials and impact metrics." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                <Icon name="Briefcase" size={16} className="mr-2" />
                Parcours professionnel
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Professionnel
                <span className="block text-primary">Experience</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Études de cas détaillées de stages et de missions freelance avec des résultats mesurables,
              illustrant la progression professionnelle, des fondements traditionnels de l'informatique à 
              l'expertise en technologies web modernes.
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">15+</div>
                  <div className="text-sm text-muted-foreground">Projets terminés</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">8</div>
                  <div className="text-sm text-muted-foreground">Clients satisfaits</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-success mb-2">15K+</div>
                  <div className="text-sm text-muted-foreground">Utilisateurs concernés</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">94%</div>
                  <div className="text-sm text-muted-foreground">Satisfaction des clients</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Timeline Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Chronologie professionnelle</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
              Un parcours complet à travers des stages, des projets indépendants et des contributions communautaires
              qui témoigne d'un développement axé sur la croissance et de compétences techniques.
              </p>
            </div>
            <ExperienceTimeline />
          </div>
        </section>

        {/* Metrics Dashboard Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <MetricsDashboard />
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Professional References</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
              Témoignages vérifiés de superviseurs, de clients et de collègues soulignant
              son expertise technique, sa maturité professionnelle et son esprit de collaboration.
              </p>
            </div>
            <TestimonialCarousel />
          </div>
        </section>

        {/* LinkedIn Integration Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <LinkedInIntegration />
          </div>
        </section>

        {/* Community Recognition Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Reconnaissance communautaire</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
              Contributions actives à l'écosystème technologique malgache par le biais de projets open source,
              de mentorat et d'initiatives de développement communautaire.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-card border border-border rounded-xl p-6 shadow-soft">
                <div className="w-12 h-12 bg-github-green/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon name="GitPullRequest" size={24} className="text-github-green" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Contributeur open source</h3>
                <p className="text-sm text-muted-foreground mb-4">
                Plus de 50 demandes de fusion réalisées sur différents projets, contribuant à l'accessibilité web
                et aux outils de développement pour la communauté Madagascar.
                </p>
                <div className="text-2xl font-bold text-github-green">50+ PRs</div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 shadow-soft">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon name="GraduationCap" size={24} className="text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Mentor de développeur</h3>
                <p className="text-sm text-muted-foreground mb-4">
                J'ai encadré 8 développeurs juniors lors de revues de code et de sessions de programmation en binôme, 
                et des conseils en matière de développement de carrière.
                </p>
                <div className="text-2xl font-bold text-purple-600">8 Mentees</div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 shadow-soft">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon name="Users" size={24} className="text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Community Builder</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Organized 3 tech meetups with 100+ total attendees, fostering collaboration 
                  and knowledge sharing in the local tech community.
                </p>
                <div className="text-2xl font-bold text-accent">100+ Attendees</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                iconName="Github"
                iconPosition="left"
                onClick={() => window.open('https://github.com', '_blank')}
              >
                View GitHub Profile
              </Button>
              <Button
                variant="outline"
                iconName="MessageCircle"
                iconPosition="left"
              >
                Connect & Collaborate
              </Button>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 ">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready for Your Next Challenge</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Looking for a growth-minded developer who brings technical expertise, 
              professional maturity, and the unique perspective of emerging African tech talent? 
              Let's discuss how I can contribute to your team's success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                iconName="Calendar"
                iconPosition="left"
              >
                Schedule Interview
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Download"
                iconPosition="left"
              >
                Download Resume
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        {/* <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <span className="text-white font-mono font-medium text-sm">L</span>
                </div>
                <span className="text-foreground font-semibold">Lucien Portfolio</span>
              </div>
              <div className="text-sm text-muted-foreground">
                © {currentYear} Lucien. All rights reserved. | Professional Developer Portfolio
              </div>
            </div>
          </div>
        </footer> */}
        <Footer/>
      </div>
    </>
  );
};

export default Experience;