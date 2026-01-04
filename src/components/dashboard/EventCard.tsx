import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Event } from '@/types/parking';

interface EventCardProps {
  event: Event;
  onBook?: () => void;
  showBookButton?: boolean;
}

const statusStyles = {
  upcoming: 'bg-accent/10 text-accent border-accent/20',
  ongoing: 'bg-success/10 text-success border-success/20',
  completed: 'bg-muted text-muted-foreground border-border',
};

const statusLabels = {
  upcoming: 'Upcoming',
  ongoing: 'Ongoing',
  completed: 'Completed',
};

export function EventCard({ event, onBook, showBookButton = true }: EventCardProps) {
  const availableSlots = event.totalSlots - event.bookedSlots;
  const occupancyPercent = (event.bookedSlots / event.totalSlots) * 100;
  
  return (
    <div className={cn(
      "group p-6 rounded-xl border border-border/50 bg-card",
      "hover:shadow-lg hover:border-accent/20 transition-all duration-300"
    )}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className={cn(
            "inline-flex px-2 py-0.5 rounded-full text-xs font-medium border",
            statusStyles[event.status]
          )}>
            {statusLabels[event.status]}
          </span>
          <h3 className="font-display text-xl font-bold text-foreground mt-2">
            {event.name}
          </h3>
        </div>
      </div>
      
      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
        {event.description}
      </p>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{new Date(event.date).toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
          })}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{event.startTime} - {event.endTime}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>BMSCE Campus</span>
        </div>
      </div>
      
      {/* Occupancy bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-muted-foreground flex items-center gap-1">
            <Users className="w-4 h-4" />
            Slot Availability
          </span>
          <span className={cn(
            "font-medium",
            availableSlots > 10 ? 'text-success' : availableSlots > 0 ? 'text-warning' : 'text-destructive'
          )}>
            {availableSlots} / {event.totalSlots}
          </span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div 
            className={cn(
              "h-full rounded-full transition-all duration-500",
              occupancyPercent < 70 ? 'bg-success' : occupancyPercent < 90 ? 'bg-warning' : 'bg-destructive'
            )}
            style={{ width: `${occupancyPercent}%` }}
          />
        </div>
      </div>
      
      {showBookButton && event.status !== 'completed' && (
        <Button 
          className="w-full" 
          variant={availableSlots > 0 ? 'hero' : 'secondary'}
          disabled={availableSlots === 0}
          onClick={onBook}
        >
          {availableSlots > 0 ? 'Book Parking Slot' : 'Fully Booked'}
        </Button>
      )}
    </div>
  );
}
