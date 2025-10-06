import { LanguageProvider } from "@/lib/LanguageContext";
import type { Locale } from "@/lib/i18n";
import type { Metadata } from "next";

const localeNames: Record<string, string> = {
  pt: "pt_BR",
  en: "en_US",
  es: "es_ES"
};

const localeTitles: Record<string, string> = {
  pt: "Forters - Proteção Financeira Global para Empresas Latino-Americanas",
  en: "Forters - Global Financial Protection for Latin American Companies",
  es: "Forters - Protección Financiera Global para Empresas Latinoamericanas"
};

const localeDescriptions: Record<string, string> = {
  pt: "Soluções especializadas em linhas financeiras com presencia internacional. Corretora oficialmente licenciada pela SUSEP.",
  en: "Specialized solutions in financial lines with international presence. Officially licensed insurance broker.",
  es: "Soluciones especializadas en líneas financieras con presencia internacional. Corredor de seguros oficialmente licenciado."
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    alternates: {
      canonical: `https://forters.com.br/${locale}`,
      languages: {
        'pt-BR': '/pt',
        'en-US': '/en',
        'es-ES': '/es',
      },
    },
    openGraph: {
      locale: localeNames[locale] || 'pt_BR',
      alternateLocale: ['pt_BR', 'en_US', 'es_ES'].filter(l => l !== localeNames[locale]),
      title: localeTitles[locale],
      description: localeDescriptions[locale],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <LanguageProvider initialLocale={locale as Locale}>
      {children}
    </LanguageProvider>
  );
}
