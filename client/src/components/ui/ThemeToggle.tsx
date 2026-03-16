import { useTheme } from '../../context/useTheme';
import Icon from '../AppIcon';

type Size = 'sm' | 'md' | 'lg';
type Variant = 'default' | 'ghost' | 'outline';

interface ThemeToggleProps {
  showLabel?: boolean;
  size?: Size;
  variant?: Variant;
}

const sizeClasses: Record<Size, string> = {
  sm: 'w-8 h-8 p-1.5',
  md: 'w-10 h-10 p-2',
  lg: 'w-12 h-12 p-2.5',
};

const iconSizes: Record<Size, number> = {
  sm: 16,
  md: 18,
  lg: 20,
};

const variantClasses: Record<Variant, string> = {
  default: 'bg-muted hover:bg-accent hover:text-accent-foreground',
  ghost: 'hover:bg-muted',
  outline: 'border border-border hover:bg-accent hover:text-accent-foreground',
};

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  showLabel = false,
  size = 'md',
  variant = 'default',
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={toggleTheme}
        className={`
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          rounded-md 
          text-muted-foreground 
          transition-brand 
          focus:outline-none 
          focus:ring-2 
          focus:ring-ring 
          focus:ring-offset-2 
          relative 
          overflow-hidden
          group
        `}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {/* Sun Icon */}
        <div 
          className={`
            absolute inset-0 flex items-center justify-center
            transform transition-all duration-500 ease-in-out
            ${theme === 'dark' ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}
          `}
        >
          <Icon name="Sun" size={iconSizes[size]} />
        </div>
        
        {/* Moon Icon */}
        <div 
          className={`
            absolute inset-0 flex items-center justify-center
            transform transition-all duration-500 ease-in-out
            ${theme === 'light' ? '-rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}
          `}
        >
          <Icon name="Moon" size={iconSizes[size]} />
        </div>

        {/* Animated background effect */}
        <div 
          className={`
            absolute inset-0 rounded-md
            bg-gradient-to-r from-yellow-400 to-orange-500
            transform transition-all duration-500 ease-in-out
            ${theme === 'dark' ? 'scale-0 opacity-0' : 'scale-110 opacity-20 group-hover:opacity-30'}
          `}
        />
        <div 
          className={`
            absolute inset-0 rounded-md
            bg-gradient-to-r from-blue-600 to-purple-600
            transform transition-all duration-500 ease-in-out
            ${theme === 'light' ? 'scale-0 opacity-0' : 'scale-110 opacity-20 group-hover:opacity-30'}
          `}
        />
      </button>
      {showLabel && (
        <span className="text-sm font-medium text-foreground capitalize">
          {theme} Mode
        </span>
      )}
    </div>
  );
};

export default ThemeToggle;