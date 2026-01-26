import { Button } from "@/components/ui/button";
import { Check, Copy, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GeneratedVariation } from "@/types/post";

interface VariationCardProps {
  variation: GeneratedVariation;
  isSelected?: boolean;
  onSelect: () => void;
  onCopy: () => void;
  onSave: () => void;
}

export function VariationCard({
  variation,
  isSelected = false,
  onSelect,
  onCopy,
  onSave,
}: VariationCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border p-4 transition-all",
        isSelected
          ? "border-primary bg-primary/5"
          : "bg-card hover:border-primary/50"
      )}
    >
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            {variation.compatibilityScore}% compatibilité
          </div>
          <span className="text-xs text-muted-foreground">
            • ~{variation.estimatedEngagement} engagements
          </span>
        </div>
        {isSelected && <Check className="h-4 w-4 text-primary" />}
      </div>
      <p className="mb-4 whitespace-pre-wrap text-sm leading-relaxed">
        {variation.content}
      </p>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={onCopy}
          className="flex-1"
        >
          <Copy className="mr-2 h-4 w-4" />
          Copier
        </Button>
        <Button size="sm" onClick={onSave} className="flex-1">
          <Check className="mr-2 h-4 w-4" />
          Sauvegarder
        </Button>
      </div>
    </div>
  );
}
