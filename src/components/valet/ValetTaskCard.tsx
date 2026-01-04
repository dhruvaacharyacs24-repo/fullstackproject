import { Car, MapPin, Clock, User, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ValetAssignment } from '@/types/parking';

interface ValetTaskCardProps {
  assignment: ValetAssignment & {
    vehicleNumber: string;
    studentName: string;
    slotLabel: string;
  };
  onUpdateStatus: (id: string, status: ValetAssignment['status']) => void;
}

const statusConfig = {
  assigned: {
    label: 'Assigned',
    color: 'bg-warning/10 text-warning border-warning/20',
    nextAction: 'Start Parking',
    nextStatus: 'parking' as const,
  },
  parking: {
    label: 'Parking',
    color: 'bg-accent/10 text-accent border-accent/20',
    nextAction: 'Mark Parked',
    nextStatus: 'parked' as const,
  },
  parked: {
    label: 'Parked',
    color: 'bg-success/10 text-success border-success/20',
    nextAction: 'Start Retrieval',
    nextStatus: 'retrieving' as const,
  },
  retrieving: {
    label: 'Retrieving',
    color: 'bg-accent/10 text-accent border-accent/20',
    nextAction: 'Mark Retrieved',
    nextStatus: 'retrieved' as const,
  },
  retrieved: {
    label: 'Completed',
    color: 'bg-muted text-muted-foreground border-border',
    nextAction: null,
    nextStatus: null,
  },
};

export function ValetTaskCard({ assignment, onUpdateStatus }: ValetTaskCardProps) {
  const config = statusConfig[assignment.status];
  
  return (
    <div className={cn(
      "p-5 rounded-xl border border-border/50 bg-card",
      "hover:shadow-md transition-all duration-300"
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Car className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h4 className="font-display font-bold text-foreground text-lg">
              {assignment.vehicleNumber}
            </h4>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <User className="w-3 h-3" />
              {assignment.studentName}
            </div>
          </div>
        </div>
        
        <span className={cn(
          "px-2.5 py-1 rounded-full text-xs font-medium border",
          config.color
        )}>
          {config.label}
        </span>
      </div>
      
      <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4" />
          <span>Slot {assignment.slotLabel}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          <span>{new Date(assignment.assignedAt).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })}</span>
        </div>
      </div>
      
      {config.nextAction && config.nextStatus && (
        <Button 
          className="w-full" 
          variant={assignment.status === 'assigned' ? 'warning' : 'hero'}
          onClick={() => onUpdateStatus(assignment.id, config.nextStatus!)}
        >
          {config.nextAction}
          {assignment.status !== 'parked' ? (
            <ArrowRight className="w-4 h-4" />
          ) : (
            <CheckCircle className="w-4 h-4" />
          )}
        </Button>
      )}
      
      {assignment.status === 'retrieved' && (
        <div className="flex items-center justify-center gap-2 py-2 text-success">
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium">Task Completed</span>
        </div>
      )}
    </div>
  );
}
