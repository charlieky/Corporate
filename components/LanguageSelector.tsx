"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { Languages } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const languages = {
  pt: { name: 'Chinese', code: 'CN' },
  en: { name: 'English', code: 'EN' },
  es: { name: 'Bangladesh', code: 'BD' },
};

export function LanguageSelector() {
  const { locale, setLocale } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    setLocale(newLocale as 'pt' | 'en' | 'es');

    // Replace the current locale in the pathname with the new one
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');

    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Languages className="h-4 w-4" />
          <span>{languages[locale].code}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(languages).map(([code, { name, code: langCode }]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => handleLocaleChange(code)}
            className={locale === code ? 'bg-secondary' : ''}
          >
            <span className="font-semibold mr-2">{langCode}</span>
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
