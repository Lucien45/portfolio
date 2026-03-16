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
      period: '2019 - 2024',
      title: 'MIAGE - Méthodes Informatiques Appliquées à la Gestion des Entreprises',
      organization: 'ESMIA (École Supérieure de Management et d\'Innovation d\'Antananarivo)',
      location: 'Antananarivo, Madagascar',
      summary: 'Comprehensive 5-year program combining computer science fundamentals with business management, specializing in enterprise software development and digital transformation.',
      details: `The MIAGE program at ESMIA provided a unique dual competency in both computer science and business management. This interdisciplinary approach equipped me with:\n\n• Strong foundation in software engineering principles and methodologies\n• Enterprise architecture and system integration expertise\n• Business process analysis and digital transformation strategies\n• Project management and team leadership skills\n• Database design and management systems\n• Web development technologies and frameworks\n\nThe program emphasized practical application through real-world projects, internships, and collaboration with local businesses, preparing graduates to bridge the gap between technical teams and business stakeholders.`,
      skills: ['Java', 'SQL', 'UML', 'Project Management', 'Business Analysis', 'System Design'],
      achievements: [
        'Graduated with distinction in software engineering track',
        'Led multiple team projects with cross-functional collaboration',
        'Developed enterprise-level applications during coursework',
        'Completed thesis on digital transformation in Madagascar businesses'
      ]
    },
    {
      type: 'internship',
      period: 'Jun 2023 - Aug 2023',
      title: 'Full Stack Development Intern',
      organization: 'MESUPRES (Ministère de l\'Enseignement Supérieur et de la Recherche Scientifique)',
      location: 'Antananarivo, Madagascar',
      summary: 'Developed a comprehensive student registry system for higher education institutions across Madagascar, handling thousands of student records and academic data.',
      details: `During my internship at MESUPRES, I was responsible for designing and developing a critical student registry system that would serve multiple universities across Madagascar. This project involved:\n\n• Full-stack development using modern web technologies\n• Database architecture design for handling large-scale student data\n• Implementation of secure authentication and authorization systems\n• Integration with existing government education databases\n• User interface design for both administrators and students\n• Performance optimization for handling concurrent users\n\nThe system successfully streamlined the student registration process, reducing administrative overhead by 60% and improving data accuracy across participating institutions. This experience provided invaluable insights into government-scale software development and the unique challenges of Madagascar's educational infrastructure.`,
      skills: ['React', 'Node.js', 'PostgreSQL', 'Express.js', 'JWT Authentication', 'REST APIs'],
      achievements: [
        'Delivered fully functional system ahead of schedule','Reduced student registration time by 60%','Implemented secure data handling for sensitive student information','Trained administrative staff on system usage','Received commendation from ministry officials for code quality'
      ]
    },
    {
      type: 'project',period: 'Mar 2024 - May 2024',title: 'FC FOUDRE Official Website',organization: 'Freelance Project',location: 'Remote',summary: 'Designed and developed a modern, responsive website for FC FOUDRE football club, featuring team management, match scheduling, and fan engagement tools.',
      details: `The FC FOUDRE website project showcased my ability to work independently with clients and deliver a complete digital solution for a local football club. The project scope included:\n\n• Modern, mobile-first responsive design\n• Content management system for team and match information\n• Player profiles and statistics tracking\n• News and blog functionality for club updates\n• Photo gallery and media management\n• Contact forms and fan engagement features\n• SEO optimization for local search visibility\n\nWorking directly with club management, I gathered requirements, provided design mockups, and delivered a solution that significantly improved their online presence. The website increased fan engagement by 200% and helped the club attract new sponsors through professional presentation.`,
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
      title: 'TECHLAB-JS Certification',
      organization: 'TECHLAB Madagascar',
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
      period: 'Oct 2024 - Present',
      title: 'Continuous Learning & Skill Development',
      organization: 'Self-Directed Learning',
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