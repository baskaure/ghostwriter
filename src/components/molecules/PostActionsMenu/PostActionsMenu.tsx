import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Edit, Trash2, Calendar, Copy } from "lucide-react";
import type { PostStatus } from "@/types/post";

interface PostActionsMenuProps {
  onEdit: () => void;
  onCopy: () => void;
  onSchedule: () => void;
  onDelete: () => void;
}

export function PostActionsMenu({
  onEdit,
  onCopy,
  onSchedule,
  onDelete,
}: PostActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onEdit}>
          <Edit className="mr-2 h-4 w-4" />
          Modifier
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onCopy}>
          <Copy className="mr-2 h-4 w-4" />
          Copier
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onSchedule}>
          <Calendar className="mr-2 h-4 w-4" />
          Planifier
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete} className="text-destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Supprimer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
