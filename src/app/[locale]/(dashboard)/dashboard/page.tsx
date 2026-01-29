"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, FileText, Calendar, TrendingUp } from "lucide-react";
import { fetchDashboardStats, formatTrendChange } from "@/data/stats";
import { getMockPosts } from "@/data/posts";
import { useTranslations } from "next-intl";
import type { DashboardStats } from "@/data/stats";
import type { Post } from "@/types/post";
import { formatDistanceToNow } from "date-fns";
import { fr, enUS } from "date-fns/locale";
import { useLocale } from "next-intl";

export default function DashboardPage() {
  const t = useTranslations("dashboard");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [topPosts, setTopPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [statsData, postsData] = await Promise.all([
          fetchDashboardStats(),
          getMockPosts(),
        ]);
        setStats(statsData);
        const sortedPosts = postsData
          .filter((p) => p.status === "published" && p.engagement)
          .sort((a, b) => {
            const aEngagement = (a.engagement?.likes || 0) + (a.engagement?.comments || 0);
            const bEngagement = (b.engagement?.likes || 0) + (b.engagement?.comments || 0);
            return bEngagement - aEngagement;
          })
          .slice(0, 3);
        setTopPosts(sortedPosts);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading || !stats) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-muted-foreground">{t("description")}</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">{tCommon("loading")}</p>
        </div>
      </div>
    );
  }

  const dateLocale = locale === "fr" ? fr : enUS;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("stats.postsGenerated")}
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.postsGenerated}</div>
            <p className="text-xs text-muted-foreground">
              {formatTrendChange(stats.trends.postsGenerated.change)} {t("stats.comparedToLastMonth")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("stats.postsScheduled")}</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.postsScheduled}</div>
            <p className="text-xs text-muted-foreground">
              {t("stats.nextPostIn")} 2 {t("stats.days")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("stats.engagementRate")}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.engagementRate}%</div>
            <p className="text-xs text-muted-foreground">
              {formatTrendChange(stats.trends.engagementRate.change)} {t("stats.comparedToLastMonth")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("stats.totalReach")}</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(stats.totalReach / 1000).toFixed(1)}K
            </div>
            <p className="text-xs text-muted-foreground">
              {formatTrendChange(stats.trends.totalReach.change / 100)}K {t("stats.thisMonth")}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("recentActivity")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{t("newPostGenerated")}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(Date.now() - 2 * 60 * 60 * 1000), {
                      addSuffix: true,
                      locale: dateLocale,
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">
                    {t("postPublished")} LinkedIn
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(Date.now() - 5 * 60 * 60 * 1000), {
                      addSuffix: true,
                      locale: dateLocale,
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{t("postScheduled")}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(Date.now() - 24 * 60 * 60 * 1000), {
                      addSuffix: true,
                      locale: dateLocale,
                    })}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t("topPosts")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPosts.length > 0 ? (
                topPosts.map((post) => (
                  <div key={post.id}>
                    <p className="text-sm font-medium line-clamp-2">
                      {post.content.substring(0, 60)}...
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {post.engagement?.likes || 0} likes • {post.engagement?.comments || 0} commentaires
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  {tCommon("noUserInformation")}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
