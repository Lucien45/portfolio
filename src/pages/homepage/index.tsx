import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import StickySkillsBar from './components/StickySkillsBar';
import TechShowcase from './components/TechShowcase';
import ProjectPreview from './components/ProjectPreview';
import Icon from '../../components/AppIcon';
import CallToAction from './components/CallToAction';


const Homepage = () => {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Rafaralahy S.Lucien - Développeur Full Stack | Madagascar Tech Talent</title>
        <meta 
          name="description" 
          content="Développeur full-stack passionné originaire de Madagascar, spécialisé en React, TypeScript, Python et Node.js. Il allie l'informatique traditionnelle aux technologies web modernes." 
        />
        <meta name="keywords" content="Développeur full-stack, développeur React, TypeScript, Node.js, python, développeur Madagascar, développement web" />
        <meta name="author" content="Lucien Rafaralahy" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Lucien Rafaralahy - Full-Stack Developer" />
        <meta property="og:description" content="Développeur full-stack passionné originaire de Madagascar combinant les bases traditionnelles de l'informatique avec des technologies Web de pointe." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lucienrafaralahy.dev" />
        <meta property="og:image" content="https://lucienrafaralahy.dev/og-image.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Lucien Rafaralahy - Full-Stack Developer" />
        <meta name="twitter:description" content="Développeur full-stack passionné originaire de Madagascar combinant les bases traditionnelles de l'informatique avec des technologies Web de pointe." />
        <meta name="twitter:image" content="https://lucienrafaralahy.dev/twitter-image.jpg" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="French" />
        <meta name="geo.region" content="MG" />
        <meta name="geo.country" content="Madagascar" />
        <link rel="canonical" href="https://lucienrafaralahy.dev" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Lucien Rafaralahy",
            "jobTitle": "Full-Stack Developer",
            "description": "Développeur full-stack passionné originaire de Madagascar combinant les bases traditionnelles de l'informatique avec des technologies Web de pointe.",
            "url": "https://lucienrafaralahy.dev",
            "sameAs": [
              "https://github.com/Lucien45",
              "https://www.linkedin.com/in/savaka-lucien-rafaralahy-451924315/"
            ],
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "Madagascar"
            },
            "knowsAbout": [
              "React",
              "TypeScript",
              "Node.js",
              "Java",
              "Python",
              "Full-Stack Development",
              "Web & Mobile Development"
            ]
          })}
        </script>
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header />
        
        {/* Sticky Skills Bar */}
        <StickySkillsBar />
        
        {/* Main Content */}
        <main className="relative">
          {/* Hero Section */}
          <HeroSection />
          
          {/* Technical Showcase */}
          <TechShowcase />
          
          {/* Project Preview */}
          <ProjectPreview />
          
          {/* Call to Action */}
          <CallToAction />
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Brand */}
              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                    <span className="text-white font-mono font-medium text-sm">L</span>
                  </div>
                  <span className="text-lg font-semibold text-foreground">Rafaralahy Savaka Lucien</span>
                </div>
                <p className="text-muted-foreground mb-4 max-w-md">
                  Développeur full-stack originaire de Madagascar, 
                  alliant les fondements traditionnels de l'informatique aux technologies web de pointe.
                </p>
                <div className="flex space-x-4">
                  <a 
                    href="https://github.com/Lucien45" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon name="Github" size={20} />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/savaka-lucien-rafaralahy-451924315/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon name="Linkedin" size={20} />
                  </a>
                  <a 
                    href="mailto:savakalucien@gmail.com"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon name="Mail" size={20} />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Liens rapides</h3>
                <ul className="space-y-2">
                  <li><a href="/about" className="text-muted-foreground hover:text-foreground transition-colors">À propos</a></li>
                  <li><a href="/projects" className="text-muted-foreground hover:text-foreground transition-colors">Projets</a></li>
                  <li><a href="/skills" className="text-muted-foreground hover:text-foreground transition-colors">compétences</a></li>
                  <li><a href="/experience" className="text-muted-foreground hover:text-foreground transition-colors">Expérience</a></li>
                  <li><a href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
                </ul>
              </div>

              {/* Services */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Services</h3>
                <ul className="space-y-2">
                  <li className="text-muted-foreground">Développement Full Stack</li>
                  <li className="text-muted-foreground">React Applications</li>
                  <li className="text-muted-foreground">Développement d'API</li>
                  <li className="text-muted-foreground">Conception de base de données</li>
                  <li className="text-muted-foreground">Conseil technique</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-muted-foreground text-sm">
                © {new Date()?.getFullYear()} Rafaralahy Savaka Lucien. Tous droits réservés.
              </p>
              <p className="text-muted-foreground text-sm mt-2 md:mt-0">
                Made with ❤️ in Madagascar 🇲🇬
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Homepage;