"use client";

import { SearchBar } from "../SearchBar/SearchBar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import type { PostStatus, SocialPlatform } from "@/types/post";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: PostStatus | "all";
  onStatusFilterChange: (value: PostStatus | "all") => void;
  platformFilter: SocialPlatform | "all";
  onPlatformFilterChange: (value: SocialPlatform | "all") => void;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  platformFilter,
  onPlatformFilterChange,
}: FilterBarProps) {
  const t = useTranslations("posts");
  const tCommon = useTranslations("common");

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <SearchBar
        value={searchQuery}
        onChange={onSearchChange}
        placeholder={t("searchPlaceholder")}
      />
      <Select
        value={statusFilter}
        onValueChange={(value) => onStatusFilterChange(value as PostStatus | "all")}
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder={tCommon("filter")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t("status.all")}</SelectItem>
          <SelectItem value="draft">{t("status.draft")}</SelectItem>
          <SelectItem value="scheduled">{t("status.scheduled")}</SelectItem>
          <SelectItem value="published">{t("status.published")}</SelectItem>
          <SelectItem value="archived">{t("status.archived")}</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={platformFilter}
        onValueChange={(value) =>
          onPlatformFilterChange(value as SocialPlatform | "all")
        }
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder={tCommon("filter")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t("platform.all")}</SelectItem>
          <SelectItem value="linkedin">{t("platform.linkedin")}</SelectItem>
          <SelectItem value="twitter">{t("platform.twitter")}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
