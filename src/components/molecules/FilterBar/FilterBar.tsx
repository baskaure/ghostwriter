import { SearchBar } from "../SearchBar/SearchBar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <SearchBar
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Rechercher un post..."
      />
      <Select
        value={statusFilter}
        onValueChange={(value) => onStatusFilterChange(value as PostStatus | "all")}
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Statut" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les statuts</SelectItem>
          <SelectItem value="draft">Brouillon</SelectItem>
          <SelectItem value="scheduled">Planifié</SelectItem>
          <SelectItem value="published">Publié</SelectItem>
          <SelectItem value="archived">Archivé</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={platformFilter}
        onValueChange={(value) =>
          onPlatformFilterChange(value as SocialPlatform | "all")
        }
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Plateforme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes les plateformes</SelectItem>
          <SelectItem value="linkedin">LinkedIn</SelectItem>
          <SelectItem value="twitter">Twitter/X</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
