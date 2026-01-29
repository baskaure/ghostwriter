 "use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("posts.generate");
  const tCommon = useTranslations("common");

  const handleSubmit = () => {
    if (!prompt.trim()) {
      alert(tCommon("enterPrompt"));
      return;
    }
    onSubmit({ prompt, platform: selectedPlatform, type: selectedType });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("yourIdea")}</CardTitle>
        <CardDescription>
          {t("whatToTalkAbout")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="prompt">{t("topicOrIdea")}</Label>
          <Textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={t("placeholder")}
            className="min-h-[200px]"
          />
        </div>
        <div className="space-y-2">
          <Label>{t("socialNetworks")}</Label>
          <PlatformSelector
            value={selectedPlatform}
            onChange={setSelectedPlatform}
          />
        </div>
        <div className="space-y-2">
          <Label>{t("postType")}</Label>
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
              {t("generating")}
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              {t("generate")} 3 {t("variations").toLowerCase()}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
