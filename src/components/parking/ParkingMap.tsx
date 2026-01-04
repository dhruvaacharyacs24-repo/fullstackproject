import { useState } from 'react';
import { ParkingSlot } from './ParkingSlot';
import { SlotLegend } from './SlotLegend';
import { cn } from '@/lib/utils';
import type { ParkingSlot as ParkingSlotType } from '@/types/parking';

// Generate mock parking slots
const generateMockSlots = (): ParkingSlotType[] => {
  const slots: ParkingSlotType[] = [];
  const zones = ['A', 'B'];
  const statuses: Array<'available' | 'reserved' | 'occupied'> = ['available', 'reserved', 'occupied'];
  
  zones.forEach((zone) => {
    for (let row = 1; row <= 3; row++) {
      for (let col = 1; col <= 5; col++) {
        const randomStatus = statuses[Math.floor(Math.random() * 3)];
        slots.push({
          id: `${zone}-${row}-${col}`,
          label: `${zone}${row}${col}`,
          status: randomStatus,
          zone,
          row,
          column: col,
        });
      }
    }
  });
  
  return slots;
};

interface ParkingMapProps {
  onSlotSelect?: (slot: ParkingSlotType) => void;
  selectedSlot?: ParkingSlotType | null;
  disabled?: boolean;
}

export function ParkingMap({ onSlotSelect, selectedSlot, disabled }: ParkingMapProps) {
  const [slots] = useState<ParkingSlotType[]>(generateMockSlots);
  
  const zones = [...new Set(slots.map(s => s.zone))];
  
  return (
    <div className="space-y-8">
      <SlotLegend />
      
      <div className="space-y-8">
        {zones.map((zone) => (
          <div key={zone} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="font-display text-lg font-bold text-primary-foreground">
                  {zone}
                </span>
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground">
                Zone {zone}
              </h3>
            </div>
            
            <div className={cn(
              "p-6 rounded-2xl border border-border/50 bg-muted/30",
              "grid gap-3"
            )}>
              {/* Road indicator */}
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="h-1 flex-1 bg-muted-foreground/20 rounded-full" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Entry</span>
                <div className="h-1 flex-1 bg-muted-foreground/20 rounded-full" />
              </div>
              
              {/* Parking rows */}
              {[1, 2, 3].map((row) => (
                <div key={row} className="flex items-center justify-center gap-2 md:gap-3">
                  {slots
                    .filter(s => s.zone === zone && s.row === row)
                    .map((slot) => (
                      <ParkingSlot
                        key={slot.id}
                        slot={slot}
                        selected={selectedSlot?.id === slot.id}
                        disabled={disabled}
                        onSelect={onSlotSelect}
                      />
                    ))}
                </div>
              ))}
              
              {/* Exit indicator */}
              <div className="flex items-center justify-center gap-2 mt-2">
                <div className="h-1 flex-1 bg-muted-foreground/20 rounded-full" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Exit</span>
                <div className="h-1 flex-1 bg-muted-foreground/20 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
