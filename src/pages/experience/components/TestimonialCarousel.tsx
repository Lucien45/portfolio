import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Dr. Rakoto Andriamampianina",
      position: "IT Director, MESUPRES",
      company: "Ministry of Higher Education, Madagascar",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: `Lucien demonstrated exceptional technical skills and professional maturity during his internship. His ability to understand complex government requirements and translate them into efficient technical solutions was impressive. The student registry system he developed has become a cornerstone of our digital transformation initiative.`,
      project: "MESUPRES Student Registry System",
      date: "August 2024",
      verified: true,
      skills: ["React", "TypeScript", "Node.js", "PostgreSQL"]
    },
    {
      id: 2,
      name: "Jean-Claude Ramaroson",
      position: "President",
      company: "FC FOUDRE Football Club",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: `Working with Lucien was a fantastic experience. He understood our vision for connecting with our community and delivered a website that exceeded our expectations. The technical quality and attention to detail were outstanding, and the impact on our fan engagement has been remarkable.`,
      project: "FC FOUDRE Club Website",
      date: "May 2024",
      verified: true,
      skills: ["React", "JavaScript", "Tailwind CSS", "Firebase"]
    },
    {
      id: 3,
      name: "Marie Razafy",
      position: "Senior Developer",
      company: "Madagascar Tech Community",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: `Lucien's contributions to our open source projects have been invaluable. His code quality is consistently high, and his willingness to mentor junior developers shows true leadership potential. He brings fresh perspectives while maintaining professional standards.`,
      project: "Open Source Contributions",
      date: "October 2024",
      verified: true,
      skills: ["JavaScript", "TypeScript", "Git", "Code Review"]
    },
    {
      id: 4,
      name: "Prof. Andry Rasolofomanana",
      position: "Academic Supervisor",
      company: "ESMIA - MIAGE Program",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: `Throughout his MIAGE studies, Lucien consistently demonstrated strong analytical thinking and practical application of computer science principles. His transition from traditional enterprise development to modern web technologies showcases his adaptability and continuous learning mindset.`,
      project: "Academic Excellence & Growth",
      date: "June 2024",
      verified: true,
      skills: ["Java", "Database Design", "System Analysis", "Project Management"]
    },
    {
      id: 5,
      name: "Hery Rakotomalala",
      position: "Junior Developer",
      company: "Mentorship Program",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: `Lucien's mentorship has been transformative for my development career. His patient teaching style and practical insights helped me understand complex concepts and best practices. He's not just technically skilled but also an excellent communicator and leader.`,
      project: "Developer Mentorship",
      date: "September 2024",
      verified: true,
      skills: ["Mentoring", "Code Review", "Best Practices", "Career Guidance"]
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials?.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials?.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials?.length - 1 : currentIndex - 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonials?.length - 1 ? 0 : currentIndex + 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentTestimonial = testimonials?.[currentIndex];

  return (
    <div className="bg-card border border-border rounded-xl shadow-soft overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground flex items-center">
              <Icon name="MessageSquare" size={20} className="mr-2 text-primary" />
              Professional References
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Verified testimonials from supervisors, clients, and colleagues
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="w-8 h-8"
            >
              <Icon name={isAutoPlaying ? "Pause" : "Play"} size={16} />
            </Button>
          </div>
        </div>
      </div>
      {/* Testimonial Content */}
      <div className="p-6">
        <div className="relative min-h-[300px]">
          {/* Main Testimonial */}
          <div className="space-y-6">
            {/* Author Info */}
            <div className="flex items-start space-x-4">
              <div className="relative">
                <img
                  src={currentTestimonial?.avatar}
                  alt={currentTestimonial?.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-border"
                />
                {currentTestimonial?.verified && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center border-2 border-background">
                    <Icon name="CheckCircle" size={12} className="text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground">{currentTestimonial?.name}</h4>
                    <p className="text-sm text-muted-foreground">{currentTestimonial?.position}</p>
                    <p className="text-xs text-muted-foreground">{currentTestimonial?.company}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      {[...Array(currentTestimonial?.rating)]?.map((_, i) => (
                        <Icon key={i} name="Star" size={14} className="text-amber-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">{currentTestimonial?.date}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Text */}
            <blockquote className="text-foreground leading-relaxed">
              <Icon name="Quote" size={20} className="text-muted-foreground mb-2" />
              <p className="italic">"{currentTestimonial?.testimonial}"</p>
            </blockquote>

            {/* Project & Skills */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Icon name="Briefcase" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Project: {currentTestimonial?.project}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {currentTestimonial?.skills?.map((skill, index) => (
                  <span key={index} className="px-2.5 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Navigation */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between">
          {/* Dots Indicator */}
          <div className="flex items-center space-x-2">
            {testimonials?.map((_, index: number) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-brand ${
                  index === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="ChevronLeft"
              onClick={goToPrevious}
              className="w-8 h-8"
            />
            <span className="text-xs text-muted-foreground px-2">
              {currentIndex + 1} / {testimonials?.length}
            </span>
            <Button
              variant="ghost"
              size="sm"
              iconName="ChevronRight"
              onClick={goToNext}
              className="w-8 h-8"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;