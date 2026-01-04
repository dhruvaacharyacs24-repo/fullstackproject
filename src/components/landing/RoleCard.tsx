import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface RoleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  onClick: () => void;
  delay?: number;
}

export function RoleCard({ title, description, icon: Icon, gradient, onClick, delay = 0 }: RoleCardProps) {
  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-2xl p-8 cursor-pointer",
        "bg-card border border-border/50 shadow-lg",
        "hover:shadow-xl hover:border-accent/30 hover:-translate-y-2",
        "transition-all duration-500 ease-out animate-slide-up"
      )}
      style={{ animationDelay: `${delay}ms` }}
      onClick={onClick}
    >
      {/* Gradient overlay on hover */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500",
        gradient
      )} />
      
      {/* Icon container */}
      <div className={cn(
        "relative w-16 h-16 rounded-xl flex items-center justify-center mb-6",
        "bg-muted group-hover:bg-accent/10 transition-colors duration-300"
      )}>
        <Icon className="w-8 h-8 text-foreground group-hover:text-accent transition-colors duration-300" />
      </div>
      
      {/* Content */}
      <h3 className="font-display text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
        {title}
      </h3>
      <p className="text-muted-foreground mb-6 leading-relaxed">
        {description}
      </p>
      
      {/* Button */}
      <Button 
        variant="hero" 
        className="w-full group-hover:shadow-glow"
      >
        Login as {title.split(' ')[0]}
      </Button>
      
      {/* Decorative corner */}
      <div className={cn(
        "absolute top-0 right-0 w-24 h-24 -translate-y-12 translate-x-12",
        "rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500",
        gradient
      )} />
    </div>
  );
}
