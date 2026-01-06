import type { GeneratedVariation, SocialPlatform, PostType } from "@/types/post";

interface GenerateOptions {
  prompt: string;
  platform: SocialPlatform;
  type: PostType;
  tone?: "professionnel" | "décontracté" | "inspirant";
  length?: "court" | "moyen" | "long";
}

// Simule la génération de contenu par l'IA
export async function generateContent(
  options: GenerateOptions
): Promise<GeneratedVariation[]> {
  // Simulation d'un délai de génération
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const { prompt, platform, type, tone = "professionnel", length = "moyen" } = options;

  // Templates de base selon le type
  const templates = {
    conseil: {
      linkedin: [
        `💡 ${prompt}\n\nVoici 3 conseils pratiques que j'ai appris :\n\n1. [Conseil principal]\n2. [Conseil secondaire]\n3. [Conseil bonus]\n\nQu'est-ce qui fonctionne le mieux pour vous ? 👇`,
        `🎯 ${prompt}\n\nAprès plusieurs années d'expérience, voici ce que je recommande :\n\n✅ [Point clé 1]\n✅ [Point clé 2]\n✅ [Point clé 3]\n\nCes pratiques ont transformé ma façon de travailler.`,
        `✨ ${prompt}\n\nJ'ai découvert quelque chose d'important :\n\n[Insight principal]\n\nCela m'a aidé à [résultat]. Partagez votre expérience en commentaire !`,
      ],
      twitter: [
        `💡 ${prompt}\n\n3 conseils rapides :\n\n1. [Conseil 1]\n2. [Conseil 2]\n3. [Conseil 3]\n\nQu'est-ce qui résonne avec vous ?`,
        `🎯 ${prompt}\n\nVoici ce qui fonctionne :\n\n✅ [Point 1]\n✅ [Point 2]\n✅ [Point 3]\n\nTestez et dites-moi !`,
      ],
    },
    story: {
      linkedin: [
        `📖 ${prompt}\n\nIl y a quelques années, j'ai vécu une expérience qui a changé ma perspective...\n\n[Histoire personnelle liée au prompt]\n\nCette leçon m'a appris que [insight]. Et vous, quelle expérience vous a marqué ?`,
        `🌟 ${prompt}\n\nLaissez-moi vous raconter une histoire...\n\n[Contexte]\n\nCe jour-là, j'ai réalisé que [révélation]. Depuis, [transformation].\n\nParfois, les meilleures leçons viennent des expériences les plus inattendues.`,
      ],
      twitter: [
        `📖 ${prompt}\n\nThread 🧵\n\n1/ Il y a quelques années...\n\n[Histoire courte]\n\nCette expérience m'a appris [leçon].`,
      ],
    },
    question: {
      linkedin: [
        `❓ ${prompt}\n\nC'est une question que je me pose souvent : [Question liée au prompt]\n\nQu'en pensez-vous ? Partagez votre avis en commentaire 👇`,
        `💭 ${prompt}\n\nVoici une réflexion qui m'anime : [Question ouverte]\n\nJ'aimerais connaître votre point de vue sur ce sujet.`,
      ],
      twitter: [
        `❓ ${prompt}\n\nQuestion rapide : [Question]\n\nVos réponses ? 👇`,
      ],
    },
    annonce: {
      linkedin: [
        `🚀 ${prompt}\n\nJe suis ravi de vous annoncer que [Annonce liée au prompt] !\n\n[Details]\n\nMerci à tous ceux qui m'ont soutenu dans cette aventure 🙏`,
        `🎉 ${prompt}\n\nExcellente nouvelle à partager : [Annonce]\n\n[Contexte et détails]\n\nC'est le début d'une nouvelle étape passionnante !`,
      ],
      twitter: [
        `🚀 ${prompt}\n\nNouvelle annonce : [Annonce]\n\n[Details]\n\nMerci pour votre soutien ! 🙏`,
      ],
    },
    thread: {
      linkedin: [
        `🧵 ${prompt}\n\nThread LinkedIn :\n\n1/ [Point 1]\n2/ [Point 2]\n3/ [Point 3]\n\n[Conclusion]`,
      ],
      twitter: [
        `🧵 ${prompt}\n\nThread 🧵\n\n1/ [Point 1]\n\n2/ [Point 2]\n\n3/ [Point 3]\n\n4/ [Conclusion]`,
      ],
    },
  };

  const platformTemplates = templates[type][platform] || templates[type].linkedin;
  
  // Génère 3 variations
  const variations: GeneratedVariation[] = platformTemplates.slice(0, 3).map((template, index) => {
    // Remplace les placeholders par du contenu générique basé sur le prompt
    let content = template
      .replace(/\[Conseil principal\]/g, `Focus sur l'essentiel : ${prompt.split(' ').slice(0, 5).join(' ')}`)
      .replace(/\[Conseil secondaire\]/g, `Priorisez la qualité`)
      .replace(/\[Conseil bonus\]/g, `Restez cohérent`)
      .replace(/\[Point clé \d+\]/g, (match) => {
        const num = match.match(/\d+/)?.[0] || "1";
        return `Point important ${num} sur ${prompt.split(' ').slice(0, 3).join(' ')}`;
      })
      .replace(/\[Histoire personnelle liée au prompt\]/g, `Mon expérience avec ${prompt.split(' ').slice(0, 3).join(' ')} a été révélatrice`)
      .replace(/\[Insight principal\]/g, `L'essentiel est de comprendre ${prompt.split(' ').slice(0, 3).join(' ')}`)
      .replace(/\[Question liée au prompt\]/g, `Comment gérez-vous ${prompt.split(' ').slice(0, 3).join(' ')} ?`)
      .replace(/\[Annonce liée au prompt\]/g, `Nouveau projet autour de ${prompt.split(' ').slice(0, 3).join(' ')}`)
      .replace(/\[Point \d+\]/g, (match) => {
        const num = match.match(/\d+/)?.[0] || "1";
        return `Point ${num} : ${prompt.split(' ').slice(0, 4).join(' ')}`;
      })
      .replace(/\[Details\]/g, `Plus d'informations à venir sur ${prompt.split(' ').slice(0, 3).join(' ')}`)
      .replace(/\[Contexte\]/g, `Dans le contexte de ${prompt.split(' ').slice(0, 3).join(' ')}`)
      .replace(/\[révélation\]/g, `l'importance de ${prompt.split(' ').slice(0, 2).join(' ')}`)
      .replace(/\[transformation\]/g, `j'ai adopté une nouvelle approche`)
      .replace(/\[leçon\]/g, `l'importance de ${prompt.split(' ').slice(0, 2).join(' ')}`)
      .replace(/\[Conseil \d+\]/g, (match) => {
        const num = match.match(/\d+/)?.[0] || "1";
        return `Conseil ${num} : ${prompt.split(' ').slice(0, 3).join(' ')}`;
      })
      .replace(/\[Point \d+\]/g, (match) => {
        const num = match.match(/\d+/)?.[0] || "1";
        return `Point ${num} : ${prompt.split(' ').slice(0, 3).join(' ')}`;
      })
      .replace(/\[Conclusion\]/g, `En résumé, ${prompt.split(' ').slice(0, 5).join(' ')} est essentiel`);

    // Ajuste la longueur selon l'option
    if (length === "court" && content.length > 200) {
      content = content.substring(0, 200) + "...";
    } else if (length === "long" && content.length < 300) {
      content += `\n\n${prompt} est un sujet qui mérite qu'on s'y attarde. J'aimerais connaître votre avis sur cette approche.`;
    }

    return {
      id: `var-${Date.now()}-${index}`,
      content,
      compatibilityScore: 85 + Math.floor(Math.random() * 15), // 85-100%
      estimatedEngagement: 50 + Math.floor(Math.random() * 200), // 50-250
    };
  });

  return variations;
}

