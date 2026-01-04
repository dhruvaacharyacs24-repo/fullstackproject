import { Bell, LogOut, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { UserRole } from '@/types/parking';

interface DashboardHeaderProps {
  title: string;
  role: UserRole;
  userName?: string;
  onMenuClick?: () => void;
  onLogout?: () => void;
}

const roleColors: Record<UserRole, string> = {
  student: 'bg-accent',
  admin: 'bg-primary',
  valet: 'bg-secondary',
};

const roleLabels: Record<UserRole, string> = {
  student: 'Student',
  admin: 'Administrator',
  valet: 'Valet Staff',
};

export function DashboardHeader({ title, role, userName = 'User', onMenuClick, onLogout }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-3">
            <h1 className="font-display text-xl font-bold text-foreground">
              {title}
            </h1>
            <span className={cn(
              "hidden md:inline-flex px-2 py-0.5 rounded-full text-xs font-medium text-white",
              roleColors[role]
            )}>
              {roleLabels[role]}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-destructive" />
          </Button>
          
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
              <User className="w-4 h-4 text-accent" />
            </div>
            <span className="text-sm font-medium text-foreground">{userName}</span>
          </div>
          
          <Button variant="ghost" size="icon" onClick={onLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
