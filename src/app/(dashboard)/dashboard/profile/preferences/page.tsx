import { PageHeader } from "@/components/organisms";

export default function ProfilePreferencesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Préférences du profil"
        description="Configurez vos préférences personnelles et de notification."
      />
      <p className="text-sm text-muted-foreground">
        Cette section est un exemple de sous-page du profil. La bannière,
        l&apos;avatar et le menu de navigation du profil restent montés pendant
        la navigation entre les onglets, tandis que seul le contenu central est
        remplacé.
      </p>
    </div>
  );
}

