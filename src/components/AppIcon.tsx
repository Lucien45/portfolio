import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import { HelpCircle } from 'lucide-react';

export type IconName = keyof typeof LucideIcons;

interface IconProps extends Omit<LucideProps, 'size' | 'color' | 'className' | 'strokeWidth'> {
    name: IconName;
    size?: number | string;
    color?: string;
    className?: string;
    strokeWidth?: number | string;
}

function Icon({
    name,
    size = 24,
    color = "currentColor",
    className = "",
    strokeWidth = 2,
    ...props
}: IconProps) {
    const IconComponent = LucideIcons?.[name] as React.ComponentType<LucideProps> | undefined;

    if (!IconComponent) {
        return <HelpCircle size={size} color="gray" strokeWidth={strokeWidth} className={className} {...props} />;
    }

    return <IconComponent
        size={size}
        color={color}
        strokeWidth={strokeWidth}
        className={className}
        {...props}
    />;
}
export default Icon;