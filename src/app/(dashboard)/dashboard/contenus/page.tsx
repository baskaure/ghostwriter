"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Calendar,
  Copy,
  Linkedin,
  Twitter,
} from "lucide-react";
import { usePostStore } from "@/store/postStore";
import type { PostStatus, SocialPlatform } from "@/types/post";
import { formatDistanceToNow } from "date-fns";

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

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce post ?")) {
      deletePost(id);
    }
  };

  const handleStatusChange = (id: string, newStatus: PostStatus) => {
    updatePost(id, { status: newStatus });
  };

  const getStatusBadgeColor = (status: PostStatus) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
      case "scheduled":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "published":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "archived":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: PostStatus) => {
    switch (status) {
      case "draft":
        return "Brouillon";
      case "scheduled":
        return "Planifié";
      case "published":
        return "Publié";
      case "archived":
        return "Archivé";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contenus</h1>
          <p className="text-muted-foreground">
            Gérez votre bibliothèque de posts ({posts.length} post{posts.length > 1 ? "s" : ""})
          </p>
        </div>
        <Link href="/dashboard/generate">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nouveau post
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher un post..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as PostStatus | "all")}>
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
              onValueChange={(value) => setPlatformFilter(value as SocialPlatform | "all")}
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
        </CardContent>
      </Card>

      {/* Content Grid */}
      {filteredPosts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground">
              {posts.length === 0
                ? "Aucun post pour le moment. Créez votre premier post !"
                : "Aucun post ne correspond à vos filtres."}
            </p>
            {posts.length === 0 && (
              <Link href="/dashboard/generate" className="mt-4">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Créer un post
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <Card
              key={post.id}
              className="flex flex-col transition-shadow hover:shadow-md"
            >
              <CardHeader className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      {post.platform === "linkedin" ? (
                        <Linkedin className="h-4 w-4 text-blue-600" />
                      ) : (
                        <Twitter className="h-4 w-4 text-sky-500" />
                      )}
                      <span className="text-xs font-medium uppercase text-muted-foreground">
                        {post.platform}
                      </span>
                    </div>
                    <CardTitle className="text-base line-clamp-2">
                      {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                    </CardTitle>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(post.id, "draft")}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          navigator.clipboard.writeText(post.content);
                          alert("Contenu copié !");
                        }}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copier
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(post.id, "scheduled")}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Planifier
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(post.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <p className="line-clamp-3 flex-1 text-sm text-muted-foreground">
                  {post.content}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusBadgeColor(post.status)}`}
                  >
                    {getStatusLabel(post.status)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
