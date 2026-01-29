import { useTranslations as useNextIntlTranslations } from "next-intl";

export function useTranslations(namespace?: string) {
  const t = useNextIntlTranslations(namespace);

  return {
    t: (key: string, values?: Record<string, any>) => {
      try {
        return t(key, values);
      } catch (error) {
        console.warn(`Translation key not found: ${namespace ? `${namespace}.${key}` : key}`);
        return key;
      }
    },
  };
}
