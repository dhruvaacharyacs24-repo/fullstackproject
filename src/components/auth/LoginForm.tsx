import { useState } from 'react';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { UserRole } from '@/types/parking';

interface LoginFormProps {
  role: UserRole;
  onSubmit: (email: string, password: string) => void;
  onBack: () => void;
}

const roleInfo = {
  student: {
    title: 'Student Login',
    description: 'Use your @bmsce.ac.in email to access your parking dashboard',
    emailPlaceholder: 'username@bmsce.ac.in',
    gradient: 'from-accent to-accent/80',
  },
  admin: {
    title: 'Admin Login',
    description: 'Access the administrative control panel',
    emailPlaceholder: 'admin@bmsce.ac.in',
    gradient: 'from-primary to-primary/80',
  },
  valet: {
    title: 'Valet Staff Login',
    description: 'Access your valet assignment dashboard',
    emailPlaceholder: 'valet.staff@bmsce.ac.in',
    gradient: 'from-secondary to-secondary/80',
  },
};

export function LoginForm({ role, onSubmit, onBack }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const info = roleInfo[role];
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate email domain for students
    if (role === 'student' && !email.endsWith('@bmsce.ac.in')) {
      setError('Please use your @bmsce.ac.in email address');
      return;
    }
    
    setLoading(true);
    
    // Simulate login
    setTimeout(() => {
      setLoading(false);
      onSubmit(email, password);
    }, 1000);
  };
  
  return (
    <div className="w-full max-w-md mx-auto animate-scale-in">
      <div className="p-8 rounded-2xl border border-border/50 bg-card shadow-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className={cn(
            "inline-flex w-16 h-16 rounded-2xl items-center justify-center mb-4",
            "bg-gradient-to-br",
            info.gradient
          )}>
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground">
            {info.title}
          </h2>
          <p className="text-muted-foreground text-sm mt-2">
            {info.description}
          </p>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder={info.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            variant="hero" 
            className="w-full" 
            size="lg"
            disabled={loading}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Sign In
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </form>
        
        {/* Back link */}
        <div className="mt-6 text-center">
          <button 
            onClick={onBack}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to role selection
          </button>
        </div>
      </div>
    </div>
  );
}
