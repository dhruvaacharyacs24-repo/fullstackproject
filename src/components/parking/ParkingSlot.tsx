import { Car } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ParkingSlot as ParkingSlotType, SlotStatus } from '@/types/parking';

interface ParkingSlotProps {
  slot: ParkingSlotType;
  selected?: boolean;
  disabled?: boolean;
  onSelect?: (slot: ParkingSlotType) => void;
}

const statusStyles: Record<SlotStatus, string> = {
  available: 'bg-success/10 border-success/30 hover:border-success hover:bg-success/20 cursor-pointer',
  reserved: 'bg-warning/10 border-warning/30 cursor-not-allowed',
  occupied: 'bg-destructive/10 border-destructive/30 cursor-not-allowed',
};

const statusIconColors: Record<SlotStatus, string> = {
  available: 'text-success',
  reserved: 'text-warning',
  occupied: 'text-destructive',
};

export function ParkingSlot({ slot, selected, disabled, onSelect }: ParkingSlotProps) {
  const isSelectable = slot.status === 'available' && !disabled;
  
  return (
    <button
      className={cn(
        "relative w-16 h-20 md:w-20 md:h-24 rounded-lg border-2 transition-all duration-300",
        "flex flex-col items-center justify-center gap-1",
        statusStyles[slot.status],
        selected && 'ring-2 ring-accent ring-offset-2 ring-offset-background border-accent bg-accent/20',
        selected && 'animate-slot-pulse',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
      onClick={() => isSelectable && onSelect?.(slot)}
      disabled={!isSelectable}
    >
      <Car className={cn(
        "w-6 h-6 md:w-8 md:h-8 transition-colors duration-300",
        selected ? 'text-accent' : statusIconColors[slot.status]
      )} />
      <span className={cn(
        "text-xs font-semibold",
        selected ? 'text-accent' : 'text-foreground'
      )}>
        {slot.label}
      </span>
    </button>
  );
}
