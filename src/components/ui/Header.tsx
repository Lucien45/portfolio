import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon, { type IconName } from '../AppIcon';
import Button from './Button';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const location = useLocation();

  type NavItem = { name: string; path: string; icon: IconName };

  const navigationItems: NavItem[] = [
    { name: 'Accueil', path: '/homepage', icon: 'Home' },
    { name: 'À propos', path: '/about', icon: 'User' },
    { name: 'Projets', path: '/projects', icon: 'FolderOpen' },
    { name: 'compétences', path: '/skills', icon: 'Code' },
    { name: 'Expérience', path: '/experience', icon: 'Briefcase' },
  ];

  const moreItems: NavItem[] = [
    { name: 'Contact', path: '/contact', icon: 'Mail' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActivePath = (path: string) => {
    return location?.pathname === path;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-sm shadow-soft border-b border-border' 
          : 'bg-background/80 backdrop-blur-sm'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/homepage" 
            className="flex items-center space-x-2 group transition-brand hover:opacity-80"
            onClick={closeMenu}
          >
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-mono font-medium text-sm">L</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-github-green rounded-full animate-pulse-slow"></div>
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-semibold text-foreground">Lucien</span>
              <span className="text-sm text-muted-foreground ml-1 font-mono">Portfolio</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-brand ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-soft'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.name}</span>
              </Link>
            ))}
            
            {/* More Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-brand">
                <Icon name="MoreHorizontal" size={16} />
                <span>Plus</span>
              </button>
              
              <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-md shadow-elevation opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  {moreItems?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      className={`flex items-center space-x-2 px-3 py-2 text-sm transition-brand ${
                        isActivePath(item?.path)
                          ? 'bg-primary text-primary-foreground'
                          : 'text-popover-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* CTA Button & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Theme Toggle */}
            <ThemeToggle variant="ghost" />

            <Button 
              variant="outline" 
              size="sm"
              iconName="Github"
              iconPosition="left"
              onClick={() => window.open('https://github.com/Lucien45', '_blank')}
            >
              GitHub
            </Button>
            <Button 
              variant="default" 
              size="sm"
              iconName="MessageCircle"
              iconPosition="left"
            >
              Parlons
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center space-x-2">
            {/* Theme Toggle for Mobile */}
            <ThemeToggle variant="ghost" size="sm" />
            
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-brand"
              aria-label="Toggle menu"
            >
              <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'max-h-96 opacity-100 visible' :'max-h-0 opacity-0 invisible overflow-hidden'
        }`}>
          <nav className="py-4 space-y-1 border-t border-border">
            {[...navigationItems, ...moreItems]?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={closeMenu}
                className={`flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-brand ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-soft'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.name}</span>
              </Link>
            ))}
            
            <div className="pt-4 mt-4 border-t border-border space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                fullWidth
                iconName="Github"
                iconPosition="left"
                onClick={() => {
                  window.open('https://github.com/Lucien45', '_blank');
                  closeMenu();
                }}
              >
                GitHub Profile
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                fullWidth
                iconName="MessageCircle"
                iconPosition="left"
                onClick={closeMenu}
              >
                Parlons
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;