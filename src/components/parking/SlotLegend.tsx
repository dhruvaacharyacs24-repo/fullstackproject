import { cn } from '@/lib/utils';

const legendItems = [
  { status: 'available', label: 'Available', color: 'bg-success' },
  { status: 'reserved', label: 'Reserved', color: 'bg-warning' },
  { status: 'occupied', label: 'Occupied', color: 'bg-destructive' },
];

export function SlotLegend() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      {legendItems.map((item) => (
        <div key={item.status} className="flex items-center gap-2">
          <div className={cn(
            "w-4 h-4 rounded-sm",
            item.color
          )} />
          <span className="text-sm text-muted-foreground">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
