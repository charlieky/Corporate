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
  metadataBase: new URL('https://forters.com.br'),
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
    url: "https://forters.com.br",
    siteName: "Forters",
    title: "Bangladesh's investment opportunities and foreign direct investment.",
    description: "Transparent investor services of different organizations all in one place",
    images: [
      {
        url: "/forters_logo.png",
        width: 1200,
        height: 630,
        alt: "Forters - Proteção Financeira Global"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Bangladesh's investment opportunities and foreign direct investment.",
    description: "Transparent investor services of different organizations all in one place",
    images: ["/forters_logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Forters',
  url: 'https://forters.com.br',
  logo: 'https://res.cloudinary.com/dtvdfo5yq/image/upload/v1759746510/forters_logo_qp9avs.png',
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
