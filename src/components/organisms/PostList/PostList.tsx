"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PostCard } from "../PostCard/PostCard";
import { Plus } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("posts");

  if (posts.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground">
            {t("noPosts")}
          </p>
          <Link href="/dashboard/generate" className="mt-4">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {t("createPost")}
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
