import { Button } from "@/components/ui/button";
import type { SocialPlatform } from "@/types/post";

interface PlatformSelectorProps {
  value: SocialPlatform;
  onChange: (platform: SocialPlatform) => void;
}

const platforms: { value: SocialPlatform; label: string }[] = [
  { value: "linkedin", label: "LinkedIn" },
  { value: "twitter", label: "Twitter/X" },
];

export function PlatformSelector({ value, onChange }: PlatformSelectorProps) {
  return (
    <div className="flex gap-2">
      {platforms.map((platform) => (
        <Button
          key={platform.value}
          variant={value === platform.value ? "default" : "outline"}
          className="flex-1"
          onClick={() => onChange(platform.value)}
        >
          {platform.label}
        </Button>
      ))}
    </div>
  );
}
