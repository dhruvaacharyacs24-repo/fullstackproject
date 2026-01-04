import { useState } from 'react';
import { useRouter } from "next/router";
import { GraduationCap, Shield, Car } from 'lucide-react';
import { HeroSection } from '@/components/landing/HeroSection';
import { RoleCard } from '@/components/landing/RoleCard';
import { LoginForm } from '@/components/auth/LoginForm';
import type { UserRole } from '@/types/parking';

const roles = [
  {
    id: 'student' as UserRole,
    title: 'BMSCE Student',
    description: 'Book priority parking slots for campus events using your college credentials.',
    icon: GraduationCap,
    gradient: 'bg-gradient-to-br from-accent to-accent/60',
  },
  {
    id: 'admin' as UserRole,
    title: 'Administrator',
    description: 'Manage events, parking layouts, priority rules, and monitor real-time occupancy.',
    icon: Shield,
    gradient: 'bg-gradient-to-br from-primary to-primary/60',
  },
  {
    id: 'valet' as UserRole,
    title: 'Valet Staff',
    description: 'View assigned vehicles, manage parking operations, and update slot status.',
    icon: Car,
    gradient: 'bg-gradient-to-br from-secondary to-secondary/60',
  },
];

export default function Landing() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const router = useRouter();
  
  const handleLogin = (email: string, password: string) => {
    // For demo, router to appropriate dashboard
    if (selectedRole === 'student') {
      router.push('/student');
    } else if (selectedRole === 'admin') {
      router.push('/admin');
    } else if (selectedRole === 'valet') {
      router.push('/valet');
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      {/* Background pattern */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-bl from-accent/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 py-12 md:py-20">
        {selectedRole ? (
          <div className="max-w-md mx-auto">
            <LoginForm 
              role={selectedRole} 
              onSubmit={handleLogin}
              onBack={() => setSelectedRole(null)}
            />
          </div>
        ) : (
          <>
            <HeroSection />
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {roles.map((role, index) => (
                <RoleCard
                  key={role.id}
                  title={role.title}
                  description={role.description}
                  icon={role.icon}
                  gradient={role.gradient}
                  onClick={() => setSelectedRole(role.id)}
                  delay={index * 100}
                />
              ))}
            </div>
            
            {/* Footer */}
            <footer className="text-center mt-16 text-sm text-muted-foreground">
              <p>© 2026 BMSCE Event Parking Management System</p>
              <p className="mt-1">Secure • Priority-based • Real-time</p>
            </footer>
          </>
        )}
      </div>
    </div>
  );
}
