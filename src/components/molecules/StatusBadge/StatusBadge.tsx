import type { PostStatus } from "@/types/post";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: PostStatus;
  className?: string;
}

const statusConfig: Record<PostStatus, { label: string; className: string }> = {
  draft: {
    label: "Brouillon",
    className: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  },
  scheduled: {
    label: "Planifié",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  },
  published: {
    label: "Publié",
    className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  },
  archived: {
    label: "Archivé",
    className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className={cn(
        "rounded-full px-2 py-1 text-xs font-medium",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
