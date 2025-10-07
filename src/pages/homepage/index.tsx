import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import StickySkillsBar from './components/StickySkillsBar';
import TechShowcase from './components/TechShowcase';
import ProjectPreview from './components/ProjectPreview';
import CallToAction from './components/CallToAction';
import Footer from '../../components/ui/Footer';


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
        <Footer/>
      </div>
    </>
  );
};

export default Homepage;