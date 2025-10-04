import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import ContactHero from './components/ContactHero';
import ContactMethods from './components/ContactMethods';
import InquiryForm from './components/InquiryForm';
import AvailabilityCalendar from './components/AvailabilityCalendar';
import ProjectEstimator from './components/ProjectEstimator';
import TrustSignals from './components/TrustSignals';
import Header from '../../components/ui/Header';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Contact & Collaboration - Lucien Portfolio</title>
        <meta 
          name="description" 
          content="Contactez Lucien pour vos projets de développement web. Développeur full-stack spécialisé React/TypeScript à Madagascar. Consultation gratuite et devis personnalisé." 
        />
        <meta name="keywords" content="contact développeur, freelance Madagascar, React developer, consultation web, devis projet" />
        <meta property="og:title" content="Contact & Collaboration - Lucien Portfolio" />
        <meta property="og:description" content="Développeur full-stack disponible pour vos projets. Expertise React, TypeScript, Node.js. Consultation gratuite." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/contact" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header />
        
        {/* Hero Section */}
        <ContactHero />

        {/* Contact Methods */}
        <ContactMethods />

        {/* Professional Inquiry Form */}
        <InquiryForm />

        {/* Project Estimator */}
        <ProjectEstimator />

        {/* Availability Calendar */}
        <AvailabilityCalendar />

        {/* Trust Signals & Testimonials */}
        <TrustSignals />
      </div>
    </>
  );
};

export default Contact;