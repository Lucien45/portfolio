/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Icon, { type IconName } from '../../../components/AppIcon';

// 1️⃣ Définir un type strict pour tes metrics
type Metric = {
  id: string;
  title: string;
  value: number;
  suffix?: string;
  icon: IconName; // vient de AppIcon (typer l’icône directement)
  color: string;
  bgColor: string;
  description: string;
  trend: {
    value: number;
    direction: 'up' | 'down';
    period: string;
  };
};


const MetricsDashboard: React.FC = () => {
    const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({});
    const [isVisible, setIsVisible] = useState(false);

    const metrics: Metric[] = [
        {
        id: 'projects',
        title: 'Projects Completed',
        value: 15,
        suffix: '+',
        icon: 'FolderCheck',
        color: 'text-primary',
        bgColor: 'bg-primary/10',
        description: 'Successfully delivered projects across internships and freelance work',
        trend: { value: 25, direction: 'up', period: 'vs last quarter' }
        },
        {
        id: 'clients',
        title: 'Satisfied Clients',
        value: 8,
        suffix: '',
        icon: 'Users',
        color: 'text-secondary',
        bgColor: 'bg-secondary/10',
        description: 'Government agencies, sports clubs, and tech organizations',
        trend: { value: 100, direction: 'up', period: 'satisfaction rate' }
        },
        {
        id: 'impact',
        title: 'Users Impacted',
        value: 15000,
        suffix: '+',
        icon: 'TrendingUp',
        color: 'text-success',
        bgColor: 'bg-success/10',
        description: 'Students, fans, and community members reached through applications',
        trend: { value: 300, direction: 'up', period: 'engagement increase' }
        },
        {
        id: 'technologies',
        title: 'Technologies Mastered',
        value: 12,
        suffix: '+',
        icon: 'Code',
        color: 'text-accent',
        bgColor: 'bg-accent/10',
        description: 'Modern web technologies and frameworks in production use',
        trend: { value: 4, direction: 'up', period: 'new skills this year' }
        },
        {
        id: 'mentorship',
        title: 'Developers Mentored',
        value: 8,
        suffix: '',
        icon: 'GraduationCap',
        color: 'text-purple-600',
        bgColor: 'bg-purple-100',
        description: 'Junior developers guided through code reviews and pair programming',
        trend: { value: 15, direction: 'up', period: 'hours per week' }
        },
        {
        id: 'contributions',
        title: 'Open Source PRs',
        value: 50,
        suffix: '+',
        icon: 'GitPullRequest',
        color: 'text-github-green',
        bgColor: 'bg-green-100',
        description: 'Merged pull requests across various open source projects',
        trend: { value: 20, direction: 'up', period: 'this quarter' }
        }
    ];

    useEffect(() => {
        setIsVisible(true);
        
        // Animate numbers
        metrics?.forEach(metric => {
        let start = 0;
        const end = metric?.value;
        const duration = 2000;
        const increment = end / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
            setAnimatedValues(prev => ({ ...prev, [metric?.id]: end }));
            clearInterval(timer);
            } else {
            setAnimatedValues(prev => ({ ...prev, [metric?.id]: Math.floor(start) }));
            }
        }, 16);
        });
    }, []);

    const formatNumber = (num: number) => {
        if (num >= 1000) {
        return (num / 1000)?.toFixed(1) + 'K';
        }
        return num?.toString();
    };

    return (
        <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
            <h3 className="text-2xl font-semibold text-foreground mb-2">Impact & Success Metrics</h3>
            <p className="text-muted-foreground">
            Quantifiable results from professional experiences and community contributions
            </p>
        </div>
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {metrics?.map((metric, index) => (
            <div
                key={metric?.id}
                className={`bg-card border border-border rounded-xl p-6 shadow-soft hover:shadow-elevation transition-all duration-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
            >
                {/* Icon & Title */}
                <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${metric?.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon name={metric?.icon} size={24} className={metric?.color} />
                </div>
                <div className="text-right">
                    <div className={`flex items-center space-x-1 text-xs ${
                    metric?.trend?.direction === 'up' ? 'text-success' : 'text-error'
                    }`}>
                    <Icon 
                        name={metric?.trend?.direction === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                        size={12} 
                    />
                    <span>+{metric?.trend?.value}%</span>
                    </div>
                </div>
                </div>

                {/* Value */}
                <div className="mb-2">
                <div className="text-3xl font-bold text-foreground">
                    {formatNumber(animatedValues?.[metric?.id] || 0)}{metric?.suffix}
                </div>
                <h4 className="text-sm font-medium text-muted-foreground mt-1">
                    {metric?.title}
                </h4>
                </div>

                {/* Description */}
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                {metric?.description}
                </p>

                {/* Trend */}
                <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{metric?.trend?.period}</span>
                <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${
                    metric?.trend?.direction === 'up' ? 'bg-success' : 'bg-error'
                    } animate-pulse`}></div>
                    <span className="text-muted-foreground">Active</span>
                </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3">
                <div className="w-full bg-muted rounded-full h-1.5">
                    <div 
                    className={`h-1.5 rounded-full transition-all duration-1000 ease-out ${
                        metric?.color?.replace('text-', 'bg-')
                    }`}
                    style={{ 
                        width: isVisible ? '100%' : '0%',
                        transitionDelay: `${index * 200}ms`
                    }}
                    ></div>
                </div>
                </div>
            </div>
            ))}
        </div>
        {/* Summary Stats */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 border border-border">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
                <div className="text-2xl font-bold text-primary mb-1">94%</div>
                <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </div>
            <div>
                <div className="text-2xl font-bold text-secondary mb-1">100%</div>
                <div className="text-sm text-muted-foreground">Project Delivery</div>
            </div>
            <div>
                <div className="text-2xl font-bold text-success mb-1">75%</div>
                <div className="text-sm text-muted-foreground">Efficiency Improvement</div>
            </div>
            <div>
                <div className="text-2xl font-bold text-accent mb-1">15+</div>
                <div className="text-sm text-muted-foreground">Universities Served</div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default MetricsDashboard;