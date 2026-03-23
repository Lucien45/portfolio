import React, { useState } from 'react';
import TimelineItem, { type TimelineItemData } from './TimelineItem';

const JourneyTimeline: React.FC = () => {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded?.has(index)) {
      newExpanded?.delete(index);
    } else {
      newExpanded?.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const timelineData: TimelineItemData[]  = [
    {
      type: 'education',
      period: '2023 - 2024',
      title: 'Master 1 MIAGE - Méthodes Informatiques Appliquées à la Gestion des Entreprises',
      organization: 'ESMIA (École Supérieure de Management et d\'Informatique Appliquée d\'Antananarivo)',
      location: 'Antananarivo, Madagascar',
      summary: 'Programme de master 1 combinant les fondamentaux de l\'informatique et la gestion d\'entreprise, avec une spécialisation en développement de logiciels d\'entreprise et en transformation numérique.',
      details: `Le programme MIAGE de l'ESMIA offrait une double compétence unique en informatique et en gestion d'entreprise. Cette approche interdisciplinaire m'a permis d'acquérir :\n\n• De solides bases en génie logiciel (principes et méthodologies)\n• Une expertise en architecture d'entreprise et intégration de systèmes\n• Des compétences en analyse des processus métier et en stratégies de transformation numérique\n• Des compétences en gestion de projet et en leadership d'équipe\n• Des compétences en conception et gestion de bases de données\n• Une expertise en technologies et frameworks de développement web\n\nLe programme mettait l'accent sur la pratique à travers des projets concrets, des stages et des collaborations avec des entreprises locales, préparant ainsi les diplômés à faire le lien entre les équipes techniques et les parties prenantes commerciales.`,
      skills: ['Java', 'SQL', 'UML', 'Project Management', 'Business Analysis', 'System Design'],
      achievements: [
        'Diplômé avec distinction en génie logiciel',
        'J\'ai dirigé plusieurs projets d\'équipe avec une collaboration interfonctionnelle.',
        'Développement d\'applications d\'entreprise dans le cadre de mes études'
      ]
    },
    {
      type: 'education',
      period: '2021 - 2023',
      title: 'Licence IRD - Informatique, Risques et Decisions',
      organization: 'ESMIA (École Supérieure de Management et d\'Informatique Appliquée d\'Antananarivo)',
      location: 'Antananarivo, Madagascar',
      summary: 'Programme de licence en informatique, risques et décisions, avec une spécialisation en développement de logiciels d\'entreprise et en transformation numérique.',
      details: `Le programme MIAGE de l'ESMIA offrait une double compétence unique en informatique et en gestion d'entreprise. Cette approche interdisciplinaire m'a permis d'acquérir :\n\n• De solides bases en génie logiciel (principes et méthodologies)\n• Une expertise en architecture d'entreprise et intégration de systèmes\n• Des compétences en analyse des processus métier et en stratégies de transformation numérique\n• Des compétences en gestion de projet et en leadership d'équipe\n• Des compétences en conception et gestion de bases de données\n• Une expertise en technologies et frameworks de développement web\n\nLe programme mettait l'accent sur la pratique à travers des projets concrets, des stages et des collaborations avec des entreprises locales, préparant ainsi les diplômés à faire le lien entre les équipes techniques et les parties prenantes commerciales.`,
      skills: ['Java', 'SQL', 'UML', 'Project Management', 'Business Analysis', 'System Design'],
      achievements: [
        'Diplômé avec distinction en génie logiciel',
        'J\'ai dirigé plusieurs projets d\'équipe avec une collaboration interfonctionnelle.',
        'Développement d\'applications d\'entreprise dans le cadre de mes études'
      ]
    },
    {
      type: 'stage',
      period: 'Jun 2023 - Aug 2023',
      title: 'Full Stack Development - Stage',
      organization: 'MESUPRES (Ministère de l\'Enseignement Supérieur et de la Recherche Scientifique)',
      location: 'Antananarivo, Madagascar',
      summary: 'J\'ai développé un système complet d\'enregistrement des étudiants pour les établissements d\'enseignement supérieur de Madagascar, gérant des milliers de dossiers d\'étudiants et de données académiques.',
      details: `Lors de mon stage chez MESUPRES, j'étais responsable de la conception et du développement d'un système d'inscription des étudiants essentiel, destiné à plusieurs universités malgaches. Ce projet comprenait :\n\n• le développement full-stack utilisant des technologies web modernes\n• la conception de l'architecture de la base de données pour la gestion d'un volume important de données étudiantes\n• la mise en œuvre de systèmes d'authentification et d'autorisation sécurisés\n• l'intégration avec les bases de données gouvernementales existantes du secteur de l'éducation\n• la conception de l'interface utilisateur pour les administrateurs et les étudiants\n• l'optimisation des performances pour la gestion des utilisateurs simultanés\n\nLe système a permis de rationaliser efficacement le processus d'inscription des étudiants, réduisant ainsi les frais administratifs de 60 % et améliorant la précision des données dans les établissements participants. Cette expérience m'a apporté des connaissances précieuses sur le développement de logiciels à l'échelle gouvernementale et sur les défis spécifiques à l'infrastructure éducative malgache.`,
      skills: ['React', 'Node.js', 'PostgreSQL', 'Express.js', 'JWT Authentication', 'REST APIs'],
      achievements: [
        'Système entièrement fonctionnel livré en avance sur le calendrier prévu, réduction de 60 % du temps d\'inscription des étudiants, mise en place d\'une gestion sécurisée des données sensibles des étudiants, formation du personnel administratif à l\'utilisation du système, félicitations des représentants du ministère pour la qualité du code'
      ]
    },
    {
      type: 'project',period: 'Mar 2024 - May 2024',title: 'FC FOUDRE Site officiel',organization: 'Projet Freelance',location: 'Remote',summary: 'Conception et développement d\'un site web moderne et adaptatif pour le club de football FC FOUDRE, comprenant des outils de gestion d\'équipe, de planification des matchs et d\'engagement des supporters.',
      details: `Le projet de site web du FC FOUDRE a mis en évidence ma capacité à travailler de manière autonome avec les clients et à fournir une solution numérique complète pour un club de football local. Le périmètre du projet comprenait :\n\n• Conception moderne et réactive, axée sur les mobiles\n• Content management system for team and match information\n• Suivi des profils et des statistiques des joueurs\n• News and blog functionality for club updates\n• Gestion de la galerie photo et des médias\n• Formulaires de contact et fonctionnalités d'engagement des fans\n• Optimisation SEO pour la visibilité en recherche locale\n\nEn collaboration directe avec la direction du club, j'ai recueilli leurs besoins, fourni des maquettes et livré une solution qui a considérablement amélioré leur présence en ligne. Le site web a permis d'accroître l'engagement des supporters de 200 % et a aidé le club à attirer de nouveaux sponsors grâce à une présentation professionnelle.`,
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Sanity CMS', 'Vercel', 'SEO'],
      achievements: [
        'Increased club\'s online visibility by 200%',
        'Delivered project 2 weeks ahead of deadline',
        'Implemented mobile-first design with 95+ PageSpeed score',
        'Integrated social media and content management features',
        'Provided training and documentation for club administrators'
      ]
    },
    {
      type: 'certification',
      period: 'Sep 2024',
      title: 'Certification TECHLAB-JS',
      organization: 'Etech Madagascar',
      location: 'Antananarivo, Madagascar',
      summary: 'Advanced JavaScript certification program focusing on modern ES6+ features, asynchronous programming, and full-stack development best practices.',
      details: `The TECHLAB-JS certification program was an intensive 3-month course covering advanced JavaScript concepts and modern development practices. The curriculum included:\n\n• ES6+ features and modern JavaScript syntax\n• Asynchronous programming with Promises and async/await\n• Advanced DOM manipulation and event handling\n• Node.js server-side development\n• RESTful API design and implementation\n• Testing methodologies and frameworks\n• Performance optimization techniques\n• Security best practices in web development\n\nThis certification validated my expertise in JavaScript and demonstrated my commitment to continuous learning and staying current with industry standards. The hands-on projects and peer collaboration enhanced my problem-solving skills and code quality.`,
      skills: ['JavaScript ES6+', 'Node.js', 'Express.js', 'Testing', 'API Development', 'Performance Optimization'],
      achievements: [
        'Achieved certification with 95% score',
        'Completed all practical projects with distinction',
        'Mentored junior developers during group exercises',
        'Contributed to open-source projects as part of curriculum'
      ]
    },
    {
      type: 'certification',
      period: 'Jan 2026',
      title: 'Certification Base IA chez ODC',
      organization: 'Orange Digital Center Madagascar',
      location: 'Antananarivo, Madagascar',
      summary: 'Advanced JavaScript certification program focusing on modern ES6+ features, asynchronous programming, and full-stack development best practices.',
      details: `The TECHLAB-JS certification program was an intensive 3-month course covering advanced JavaScript concepts and modern development practices. The curriculum included:\n\n• ES6+ features and modern JavaScript syntax\n• Asynchronous programming with Promises and async/await\n• Advanced DOM manipulation and event handling\n• Node.js server-side development\n• RESTful API design and implementation\n• Testing methodologies and frameworks\n• Performance optimization techniques\n• Security best practices in web development\n\nThis certification validated my expertise in JavaScript and demonstrated my commitment to continuous learning and staying current with industry standards. The hands-on projects and peer collaboration enhanced my problem-solving skills and code quality.`,
      skills: ['JavaScript ES6+', 'Node.js', 'Express.js', 'Testing', 'API Development', 'Performance Optimization'],
      achievements: [
        'Achieved certification with 95% score',
        'Completed all practical projects with distinction',
        'Mentored junior developers during group exercises',
        'Contributed to open-source projects as part of curriculum'
      ]
    },
    {
      type: 'education',
      period: 'Janv 2025 - Present',
      title: 'Apprentissage continu et développement des compétences',
      organization: 'Apprentissage autodirigé',
      location: 'Remote',
      summary: 'Ongoing professional development focusing on emerging technologies, cloud platforms, and advanced full-stack development patterns.',
      details: `My commitment to continuous learning drives me to stay current with rapidly evolving web technologies. Current focus areas include:\n\n• Advanced React patterns and performance optimization\n• TypeScript for large-scale application development\n• Cloud platforms (AWS, Vercel, Netlify) and serverless architecture\n• Modern CSS frameworks and design systems\n• DevOps practices and CI/CD pipelines\n• Mobile development with React Native\n• AI/ML integration in web applications\n\nI actively participate in online communities, contribute to open-source projects, and build personal projects to experiment with new technologies. This approach ensures I can bring the latest best practices and innovations to every project I work on.`,
      skills: ['React Advanced Patterns', 'TypeScript', 'AWS', 'DevOps', 'React Native', 'AI Integration'],
      achievements: [
        'Completed 15+ online courses in 2024',
        'Contributed to 5 open-source projects',
        'Built 8 personal projects exploring new technologies',
        'Active member of Madagascar Developer Community',
        'Regular participant in tech meetups and conferences'
      ]
    }
  ];

  return (
    <div className="space-y-0">
      {timelineData?.map((item, index) => (
        <TimelineItem
          key={index}
          item={item}
          index={index}
          isLast={index === timelineData?.length - 1}
          isExpanded={expandedItems?.has(index)}
          onToggle={toggleExpanded}
        />
      ))}
    </div>
  );
};

export default JourneyTimeline;