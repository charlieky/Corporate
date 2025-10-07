import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://corporate-blush.vercel.app/en'),
  title: {
    default: "LOGO",
    template: "%s | Forters"
  },
  description: "Transparent investor services of different organizations all in one place",
  keywords: ["seguros empresariais", "D&O", "E&O", "cyber security", "seguro garantia", "linhas financeiras", "corretora de seguros"],
  authors: [{ name: "Forters" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "",
    siteName: "Forters",
    title: "Bangladesh's investment opportunities and foreign direct investment.",
    description: "Transparent investor services of different organizations all in one place",
    images: []
  },
  twitter: {
    card: "summary",
    title: "Bangladesh's investment opportunities and foreign direct investment.",
    description: "Transparent investor services of different organizations all in one place",
    images: [],
  },
  robots: {
    index: true,
    follow: true,
    noimageindex: true, // Added image index prevention
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'none',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Forters',
  url: '',
  logo: [],
  description: 'Transparent investor services of different organizations all in one place',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+55 11 91235-1414',
    contactType: 'Customer Service',
    email: 'charliekyle795@gmail.com',
    availableLanguage: ['Portuguese', 'English', 'Spanish']
  },
  areaServed: [
    {
      '@type': 'Country',
      name: 'Brasil'
    },
    {
      '@type': 'Country',
      name: 'México'
    },
    {
      '@type': 'Country',
      name: 'Colombia'
    },
    {
      '@type': 'Country',
      name: 'United States'
    },
    {
      '@type': 'Country',
      name: 'Argentina'
    }
  ],
  sameAs: []
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`${inter.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}



