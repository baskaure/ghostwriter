import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/molecules/StatusBadge/StatusBadge";
import { PlatformIcon } from "@/components/molecules/PlatformIcon/PlatformIcon";
import { PostActionsMenu } from "@/components/molecules/PostActionsMenu/PostActionsMenu";
import type { Post } from "@/types/post";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  post: Post;
  onEdit: () => void;
  onCopy: () => void;
  onSchedule: () => void;
  onDelete: () => void;
}

export function PostCard({
  post,
  onEdit,
  onCopy,
  onSchedule,
  onDelete,
}: PostCardProps) {
  return (
    <Card className="flex flex-col transition-shadow hover:shadow-md">
      <CardHeader className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-2">
              <PlatformIcon
                platform={post.platform}
                className={
                  post.platform === "linkedin"
                    ? "h-4 w-4 text-blue-600"
                    : "h-4 w-4 text-sky-500"
                }
              />
              <span className="text-xs font-medium uppercase text-muted-foreground">
                {post.platform}
              </span>
            </div>
            <CardTitle className="text-base line-clamp-2">
              {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
            </CardTitle>
          </div>
          <PostActionsMenu
            onEdit={onEdit}
            onCopy={onCopy}
            onSchedule={onSchedule}
            onDelete={onDelete}
          />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <p className="line-clamp-3 flex-1 text-sm text-muted-foreground">
          {post.content}
        </p>
        <div className="flex items-center justify-between">
          <StatusBadge status={post.status} />
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(post.createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
