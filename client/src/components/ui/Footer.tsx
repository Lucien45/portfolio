import React from 'react'
import Icon from '../AppIcon';

const Footer: React.FC = () => {
  return (
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
                <li><a href="/" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
            </ul>
            </div>

            {/* Services */}
            <div>
            <h3 className="font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-2">
                <li className="text-muted-foreground">Développement Full Stack</li>
                <li className="text-muted-foreground">React Applications</li>
                <li className="text-muted-foreground">Développement d'API</li>
                <li className="text-muted-foreground">Déploiement de projets</li>
                <li className="text-muted-foreground">Maintenance et support</li>
                <li className="text-muted-foreground">Conseil technique</li>
                <li className="text-muted-foreground">Conception de base de données</li>
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
  )
}

export default Footer;