
import { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ChipFilterProps {
  label: string;
  onRemove?: () => void;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function ChipFilter({
  label,
  onRemove,
  active = false,
  onClick,
  className,
}: ChipFilterProps) {
  return (
    <Badge
      variant={active ? "default" : "outline"}
      className={cn(
        "flex items-center gap-1 px-3 py-1 rounded-full cursor-pointer",
        active && "bg-primary text-white",
        !active && "bg-background hover:bg-accent/50",
        className
      )}
      onClick={onClick}
    >
      {label}
      {onRemove && (
        <button 
          className="ml-1 h-3.5 w-3.5 rounded-full flex items-center justify-center" 
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label={`Remove ${label} filter`}
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </Badge>
  );
}

interface ChipFilterGroupProps {
  filters: {
    id: string;
    label: string;
  }[];
  onChange?: (selected: string[]) => void;
  allowMultiple?: boolean;
  className?: string;
}

export function ChipFilterGroup({
  filters,
  onChange,
  allowMultiple = false,
  className,
}: ChipFilterGroupProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const handleClick = (id: string) => {
    let newSelected: string[];
    
    if (allowMultiple) {
      if (selected.includes(id)) {
        newSelected = selected.filter((s) => s !== id);
      } else {
        newSelected = [...selected, id];
      }
    } else {
      newSelected = selected.includes(id) ? [] : [id];
    }
    
    setSelected(newSelected);
    onChange?.(newSelected);
  };

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {filters.map((filter) => (
        <ChipFilter
          key={filter.id}
          label={filter.label}
          active={selected.includes(filter.id)}
          onClick={() => handleClick(filter.id)}
        />
      ))}
    </div>
  );
}
