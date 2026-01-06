"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sparkles, Check, Copy, Star, Loader2 } from "lucide-react";
import { usePostStore } from "@/store/postStore";
import { generateContent } from "@/services/contentGenerator";
import type { SocialPlatform, PostType } from "@/types/post";
import { cn } from "@/lib/utils";

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform>("linkedin");
  const [selectedType, setSelectedType] = useState<PostType>("conseil");
  const [selectedVariation, setSelectedVariation] = useState<string | null>(null);

  const {
    generatedVariations,
    isLoading,
    setGeneratedVariations,
    clearGeneratedVariations,
    setLoading,
    addPost,
  } = usePostStore();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert("Veuillez entrer un sujet ou une idée");
      return;
    }

    setLoading(true);
    clearGeneratedVariations();

    try {
      const variations = await generateContent({
        prompt,
        platform: selectedPlatform,
        type: selectedType,
      });

      setGeneratedVariations(variations);
    } catch (error) {
      console.error("Erreur lors de la génération:", error);
      alert("Une erreur est survenue lors de la génération");
    } finally {
      setLoading(false);
    }
  };

  const handleSavePost = (variationId: string) => {
    const variation = generatedVariations.find((v) => v.id === variationId);
    if (!variation) return;

    const newPost = {
      id: `post-${Date.now()}`,
      content: variation.content,
      platform: selectedPlatform,
      type: selectedType,
      status: "draft" as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addPost(newPost);
    setSelectedVariation(variationId);
    
    // Afficher un message de succès
    setTimeout(() => {
      alert("Post sauvegardé dans votre bibliothèque !");
    }, 100);
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    alert("Contenu copié dans le presse-papier !");
  };

  const platforms: { value: SocialPlatform; label: string }[] = [
    { value: "linkedin", label: "LinkedIn" },
    { value: "twitter", label: "Twitter/X" },
  ];

  const types: { value: PostType; label: string }[] = [
    { value: "conseil", label: "Conseil" },
    { value: "story", label: "Story" },
    { value: "question", label: "Question" },
    { value: "annonce", label: "Annonce" },
    { value: "thread", label: "Thread" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Générer un post</h1>
        <p className="text-muted-foreground">
          Décrivez votre idée et l'IA génère du contenu authentique dans votre style
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Section */}
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
              <div className="flex gap-2">
                {platforms.map((platform) => (
                  <Button
                    key={platform.value}
                    variant={selectedPlatform === platform.value ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => setSelectedPlatform(platform.value)}
                  >
                    {platform.label}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Type de post</Label>
              <div className="grid grid-cols-2 gap-2">
                {types.map((type) => (
                  <Button
                    key={type.value}
                    variant={selectedType === type.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType(type.value)}
                  >
                    {type.label}
                  </Button>
                ))}
              </div>
            </div>
            <Button
              className="w-full"
              size="lg"
              onClick={handleGenerate}
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

        {/* Output Section */}
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
              ) : generatedVariations.length > 0 ? (
                generatedVariations.map((variation) => (
                  <div
                    key={variation.id}
                    className={cn(
                      "rounded-lg border p-4 transition-all",
                      selectedVariation === variation.id
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
                      {selectedVariation === variation.id && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <p className="mb-4 whitespace-pre-wrap text-sm leading-relaxed">
                      {variation.content}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCopy(variation.content)}
                        className="flex-1"
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copier
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleSavePost(variation.id)}
                        className="flex-1"
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Sauvegarder
                      </Button>
                    </div>
                  </div>
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
      </div>
    </div>
  );
}
