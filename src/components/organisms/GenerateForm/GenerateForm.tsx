import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sparkles, Loader2 } from "lucide-react";
import { PlatformSelector } from "@/components/molecules/PlatformSelector/PlatformSelector";
import { PostTypeSelector } from "@/components/molecules/PostTypeSelector/PostTypeSelector";
import type { SocialPlatform, PostType } from "@/types/post";

interface GenerateFormProps {
  isLoading: boolean;
  onSubmit: (data: { prompt: string; platform: SocialPlatform; type: PostType }) => void;
}

export function GenerateForm({ isLoading, onSubmit }: GenerateFormProps) {
  const [prompt, setPrompt] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform>("linkedin");
  const [selectedType, setSelectedType] = useState<PostType>("conseil");

  const handleSubmit = () => {
    if (!prompt.trim()) {
      alert("Veuillez entrer un sujet ou une idée");
      return;
    }
    onSubmit({ prompt, platform: selectedPlatform, type: selectedType });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Votre idée</CardTitle>
        <CardDescription>
          De quoi voulez-vous parler aujourd'hui ?
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="prompt">Sujet ou idée</Label>
          <Textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ex: Mon expérience avec le remote work et comment j'ai amélioré ma productivité..."
            className="min-h-[200px]"
          />
        </div>
        <div className="space-y-2">
          <Label>Réseaux sociaux</Label>
          <PlatformSelector
            value={selectedPlatform}
            onChange={setSelectedPlatform}
          />
        </div>
        <div className="space-y-2">
          <Label>Type de post</Label>
          <PostTypeSelector value={selectedType} onChange={setSelectedType} />
        </div>
        <Button
          className="w-full"
          size="lg"
          onClick={handleSubmit}
          disabled={isLoading || !prompt.trim()}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Génération en cours...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Générer 3 variations
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
