"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/organisms/PageHeader/PageHeader";
import { FilterBar } from "@/components/molecules/FilterBar/FilterBar";
import { PostList } from "@/components/organisms/PostList/PostList";
import { usePostStore } from "@/store/postStore";
import type { PostStatus, SocialPlatform, Post } from "@/types/post";

export default function ContenusPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<PostStatus | "all">("all");
  const [platformFilter, setPlatformFilter] = useState<SocialPlatform | "all">("all");

  const { posts, deletePost, updatePost } = usePostStore();

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        searchQuery === "" ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || post.status === statusFilter;
      const matchesPlatform =
        platformFilter === "all" || post.platform === platformFilter;

      return matchesSearch && matchesStatus && matchesPlatform;
    });
  }, [posts, searchQuery, statusFilter, platformFilter]);

  const handleDelete = (post: Post) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce post ?")) {
      deletePost(post.id);
    }
  };

  const handleEdit = (post: Post) => {
    console.log("Éditer le post:", post);
  };

  const handleCopy = (post: Post) => {
    navigator.clipboard.writeText(post.content);
    alert("Contenu copié !");
  };

  const handleSchedule = (post: Post) => {
    updatePost(post.id, { status: "scheduled" });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Contenus"
        description={`Gérez votre bibliothèque de posts (${posts.length} post${posts.length > 1 ? "s" : ""})`}
        action={
          <Link href="/dashboard/generate">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nouveau post
            </Button>
          </Link>
        }
      />

      <Card>
        <CardContent className="pt-6">
          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            platformFilter={platformFilter}
            onPlatformFilterChange={setPlatformFilter}
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
