"use client";

import { Link as I18nLink } from "@/i18n/routing";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/organisms/PageHeader/PageHeader";
import { FilterBar } from "@/components/molecules/FilterBar/FilterBar";
import { PostList } from "@/components/organisms/PostList/PostList";
import { usePostStore } from "@/store/postStore";
import { usePostsFilters } from "@/hooks/usePostsFilters";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import type { Post } from "@/types/post";

export default function ContenusPage() {
  const t = useTranslations("posts");
  const tCommon = useTranslations("common");
  const { posts, deletePost, updatePost } = usePostStore();

  const {
    filters,
    filteredPosts,
    updateSearch,
    updateStatus,
    updatePlatform,
  } = usePostsFilters(posts);

  const handleDelete = (post: Post) => {
    if (confirm(t("deleteConfirm"))) {
      deletePost(post.id);
    }
  };

  const handleEdit = (post: Post) => {
    console.log("Éditer le post:", post);
  };

  const handleCopy = (post: Post) => {
    navigator.clipboard.writeText(post.content);
    alert(t("copyContent"));
  };

  const handleSchedule = (post: Post) => {
    updatePost(post.id, { status: "scheduled" });
  };

  const postCount = posts.length;
  const postText = postCount > 1 ? "posts" : "post";

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("title")}
        description={`${t("title")} (${postCount} ${postText})`}
        action={
        <Link href="/dashboard/generate">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            {t("newPost")}
          </Button>
        </Link>
        }
      />

      <Card>
        <CardContent className="pt-6">
          <FilterBar
            searchQuery={filters.search}
            onSearchChange={updateSearch}
            statusFilter={filters.status}
            onStatusFilterChange={updateStatus}
            platformFilter={filters.platform}
            onPlatformFilterChange={updatePlatform}
          />
        </CardContent>
      </Card>

      <PostList
        posts={filteredPosts}
        onEdit={handleEdit}
        onCopy={handleCopy}
        onSchedule={handleSchedule}
        onDelete={handleDelete}
      />
    </div>
  );
}
