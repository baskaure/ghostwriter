import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PostCard } from "../PostCard/PostCard";
import { Plus } from "lucide-react";
import Link from "next/link";
import type { Post, PostStatus } from "@/types/post";

interface PostListProps {
  posts: Post[];
  onEdit: (post: Post) => void;
  onCopy: (post: Post) => void;
  onSchedule: (post: Post) => void;
  onDelete: (post: Post) => void;
}

export function PostList({
  posts,
  onEdit,
  onCopy,
  onSchedule,
  onDelete,
}: PostListProps) {
  if (posts.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground">
            Aucun post pour le moment. Créez votre premier post !
          </p>
          <Link href="/dashboard/generate" className="mt-4">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Créer un post
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onEdit={() => onEdit(post)}
          onCopy={() => onCopy(post)}
          onSchedule={() => onSchedule(post)}
          onDelete={() => onDelete(post)}
        />
      ))}
    </div>
  );
}
