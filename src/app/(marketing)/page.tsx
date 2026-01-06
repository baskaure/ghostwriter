import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, BarChart3, Calendar, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container px-4 py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            Générez du contenu{" "}
            <span className="text-primary">authentique</span> pour vos réseaux
            sociaux
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
            Ghostwriter Pro apprend votre style d'écriture et génère des posts
            LinkedIn et Twitter qui sonnent naturels et personnels. Réduisez
            votre temps de création de contenu de 80%.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="text-lg">
                Commencer gratuitement
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="text-lg">
                Voir les tarifs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t bg-muted/50 py-24">
        <div className="container px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Pourquoi choisir Ghostwriter Pro ?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Une solution complète pour votre présence sur les réseaux sociaux
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border bg-card p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">IA Personnalisée</h3>
              <p className="text-muted-foreground">
                L'IA apprend votre style unique d'écriture pour générer du
                contenu authentique.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Génération Rapide</h3>
              <p className="text-muted-foreground">
                Créez un post en 30 secondes. Gagnez 80% de temps sur la
                création de contenu.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Planification</h3>
              <p className="text-muted-foreground">
                Calendrier éditorial intelligent avec suggestions de meilleurs
                horaires de publication.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Analytics</h3>
              <p className="text-muted-foreground">
                Suivez vos performances et optimisez votre stratégie avec des
                insights détaillés.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 py-24">
        <div className="mx-auto max-w-2xl rounded-lg border bg-primary/5 p-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Prêt à transformer votre présence en ligne ?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Rejoignez des centaines de professionnels qui utilisent Ghostwriter
            Pro pour créer du contenu authentique.
          </p>
          <div className="mt-8">
            <Link href="/register">
              <Button size="lg" className="text-lg">
                Commencer maintenant
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

