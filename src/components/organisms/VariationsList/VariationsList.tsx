import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { VariationCard } from "@/components/molecules/VariationCard/VariationCard";
import type { GeneratedVariation } from "@/types/post";

interface VariationsListProps {
  variations: GeneratedVariation[];
  isLoading: boolean;
  selectedVariationId: string | null;
  onSelect: (id: string) => void;
  onCopy: (content: string) => void;
  onSave: (id: string) => void;
}

export function VariationsList({
  variations,
  isLoading,
  selectedVariationId,
  onSelect,
  onCopy,
  onSave,
}: VariationsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Variations générées</CardTitle>
        <CardDescription>
          Choisissez votre préférée ou régénérez
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="mt-4 text-sm text-muted-foreground">
                L'IA génère votre contenu...
              </p>
            </div>
          ) : variations.length > 0 ? (
            variations.map((variation) => (
              <VariationCard
                key={variation.id}
                variation={variation}
                isSelected={selectedVariationId === variation.id}
                onSelect={() => onSelect(variation.id)}
                onCopy={() => onCopy(variation.content)}
                onSave={() => onSave(variation.id)}
              />
            ))
          ) : (
            <div className="rounded-lg border bg-muted/50 p-4">
              <p className="text-sm text-muted-foreground">
                Vos variations apparaîtront ici après génération
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
