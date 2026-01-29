"use client";

import { useState } from "react";
import { PageHeader } from "@/components/organisms/PageHeader/PageHeader";
import { GenerateForm } from "@/components/organisms/GenerateForm/GenerateForm";
import { VariationsList } from "@/components/organisms/VariationsList/VariationsList";
import { usePostStore } from "@/store/postStore";
import { generateContent } from "@/services/contentGenerator";
import type { SocialPlatform, PostType } from "@/types/post";

export default function GeneratePage() {
  const [selectedVariation, setSelectedVariation] = useState<string | null>(null);


  const {
    generatedVariations,
    isLoading,
    currentPlatform,
    currentType,
    setGeneratedVariations,
    clearGeneratedVariations,
    setLoading,
    setGenerationContext,
    addPost,
  } = usePostStore();

  const handleGenerate = async (data: {
    prompt: string;
    platform: SocialPlatform;
    type: PostType;
  }) => {
    setLoading(true);
    clearGeneratedVariations();
    setGenerationContext(data.platform, data.type);

    try {
      const variations = await generateContent(data);
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
    if (!variation || !currentPlatform || !currentType) return;

    const newPost = {
      id: `post-${Date.now()}`,
      content: variation.content,
      platform: currentPlatform,
      type: currentType,
      status: "draft" as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addPost(newPost);
    setSelectedVariation(variationId);
    
    setTimeout(() => {
      alert("Post sauvegardé dans votre bibliothèque !");
    }, 100);
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    alert("Contenu copié dans le presse-papier !");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Générer un post"
        description="Décrivez votre idée et l'IA génère du contenu authentique dans votre style"
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <GenerateForm isLoading={isLoading} onSubmit={handleGenerate} />
        <VariationsList
          variations={generatedVariations}
          isLoading={isLoading}
          selectedVariationId={selectedVariation}
          onSelect={setSelectedVariation}
          onCopy={handleCopy}
          onSave={handleSavePost}
        />
      </div>
    </div>
  );
}
