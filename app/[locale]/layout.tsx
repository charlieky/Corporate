import { LanguageProvider } from "@/lib/LanguageContext";
import type { Locale } from "@/lib/i18n";
import type { Metadata } from "next";

const localeNames: Record<string, string> = {
  pt: "pt_BR",
  en: "en_US",
  es: "es_ES"
};

const localeTitles: Record<string, string> = {
  pt: "孟加拉国的投资机会和外国直接投资",
  en: "Bangladesh's investment opportunities and foreign direct investment.",
  es: "বাংলাদেশের বিনিয়োগের সুযোগ এবং প্রত্যক্ষ বিদেশি বিনিয়োগ।"
};

const localeDescriptions: Record<string, string> = {
  pt: "不同组织的透明投资者服务一站式提供",
  en: "Transparent investor services of different organizations all in one place",
  es: "বিভিন্ন সংস্থার স্বচ্ছ বিনিয়োগকারী সেবা একই স্থানে।"
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
