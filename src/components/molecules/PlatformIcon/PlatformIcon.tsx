import { Linkedin, Twitter } from "lucide-react";
import type { SocialPlatform } from "@/types/post";

interface PlatformIconProps {
  platform: SocialPlatform;
  className?: string;
}

export function PlatformIcon({ platform, className }: PlatformIconProps) {
  if (platform === "linkedin") {
    return <Linkedin className={className} />;
  }
  return <Twitter className={className} />;
}
