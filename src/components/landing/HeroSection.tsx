import { Car, Shield, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export function HeroSection() {
  return (
    <div className="relative text-center mb-16">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />
      </div>
      
      {/* Logo and Title */}
      <div className="animate-fade-in">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary mb-6 shadow-xl">
          <Car className="w-10 h-10 text-primary-foreground" />
        </div>
        
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4">
          BMSCE <span className="text-accent">Parking</span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Smart event parking management with priority-based slot allocation and real-time valet coordination
        </p>
      </div>
      
      {/* Feature badges */}
      <div className="flex flex-wrap items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
        <FeatureBadge icon={Shield} text="Priority Booking" />
        <FeatureBadge icon={Zap} text="Real-time Updates" />
        <FeatureBadge icon={Car} text="Valet Service" />
      </div>
    </div>
  );
}

interface FeatureBadgeProps {
  icon: React.ElementType;
  text: string;
}

function FeatureBadge({ icon: Icon, text }: FeatureBadgeProps) {
  return (
    <div className={cn(
      "inline-flex items-center gap-2 px-4 py-2 rounded-full",
      "bg-muted/50 border border-border/50",
      "text-sm font-medium text-muted-foreground"
    )}>
      <Icon className="w-4 h-4 text-accent" />
      {text}
    </div>
  );
}
