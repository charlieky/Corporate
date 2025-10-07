"use client";

import { useEffect, useRef, useState } from "react";
import { SectionTitle } from "@/components/SectionTitle";
import Image from "next/image";
import { useTranslations } from "@/lib/i18n";

// Client logos
const clients = [
  { name: "Rappi", logo: "/clients/rappi.svg" },
  { name: "NG Cash", logo: "/clients/Logotipo-NG-CASH.png" },
  { name: "Kanastra", logo: "/clients/kanastra.svg" },
  { name: "Merama", logo: "/clients/merama.svg" },
  { name: "Loft", logo: "/clients/loft.svg" },
 
 
];

export function ClientsSection() {
  const { t } = useTranslations();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="clientes"
      className="py-20 bg-background"
    >
      <div ref={sectionRef} className="w-full">
        <div className="container mx-auto px-4">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <SectionTitle>{t('clients.sectionTitle')}</SectionTitle>
          </div>
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <h2
              ref={titleRef}
              className={`text-5xl md:text-6xl font-bold mb-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              dangerouslySetInnerHTML={{ __html: t('clients.title').replace('Confiança', '<span class="font-extrabold">Confiança</span>') }}
            />
            <p
              ref={subtitleRef}
              className={`text-xl text-muted-foreground transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              {t('clients.subtitle')}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Grid: 2 cols on mobile, 3 on tablet, 5 on desktop */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12 lg:gap-16">
              {clients.map((client, idx) => (
                <div
                  key={client.name}
                  className={`flex items-center justify-center p-4 transition-all duration-1000 grayscale hover:grayscale-0 opacity-60 hover:opacity-100`}
                  style={{
                    transitionDelay: `${(idx % 5) * 100 + Math.floor(idx / 5) * 200}ms`,
                    opacity: isVisible ? 0.6 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
                  }}
                >
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={120}
                    height={60}
                    className={`h-12 w-auto object-contain ${client.name === 'Maismu' || client.name === 'Livup' ? 'scale-[1.3]' : ''} ${client.name === 'Osigu' ? 'scale-[1.4]' : ''} ${client.name === 'RappiPay' ? 'scale-[1.2]' : ''} ${client.name === 'Vammo' ? 'scale-[1.5]' : ''}`}
                    unoptimized
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            {/* "And many others" text */}
            <div className={`text-center mt-12 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-lg text-muted-foreground italic">
                {t('clients.andManyOthers')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
