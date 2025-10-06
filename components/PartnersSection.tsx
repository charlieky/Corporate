"use client";

import { useEffect, useRef, useState } from "react";
import { SectionTitle } from "@/components/SectionTitle";
import Image from "next/image";
import { useTranslations } from "@/lib/i18n";

const partners = {
  row1: [
    { name: "Chubb", localLogo: "/logos/chubb.svg" },
    { name: "Zurich", localLogo: "/logos/zurich.svg" },
    { name: "Allianz", localLogo: "/logos/allianz.svg" },
    { name: "Tokio Marine", localLogo: "/logos/tokio-marine.svg" },
    { name: "AIG", localLogo: "/logos/aig.svg" },
    { name: "RSA", localLogo: "/logos/rsa.svg" },
    { name: "AXA", localLogo: "/logos/axa.svg" },
    
    
  ],
  row2: [
    { name: "Porto Seguro", localLogo: "/logos/porto-seguro.svg" },
    { name: "Bradesco", localLogo: "/logos/bradesco.svg" },
    { name: "Ezze", localLogo: "/logos/ezze.svg" },
    { name: "Swiss Re", localLogo: "/logos/swiss-re.svg" },
    { name: "Munich Re", localLogo: "/logos/munich-re.svg" },
    { name: "QBE", localLogo: "/logos/qbe.svg" },
    { name: "XL Catlin", localLogo: "/logos/xl-catlin.svg" },
    
  ],
  row3: [
    { name: "Axis", localLogo: "/logos/axis.svg" },

   
   
    
  
  ],
};

// Generate deterministic random delay for logo blink animation
const getRandomDelay = (rowIndex: number, logoIndex: number, duplicateIndex: number): number => {
  const seed = rowIndex * 1000 + logoIndex * 100 + duplicateIndex;
  return ((seed * 137.5) % 30000) / 1000; // Returns delay between 0-30s
};

export function PartnersSection() {
  const { t } = useTranslations();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
//  const row3Ref = useRef<HTMLDivElement>(null);

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
      id="parceiros"
      className="min-h-screen flex items-center py-16 bg-white overflow-hidden"
    >
      <div ref={sectionRef} className="w-full">
        <div className="container mx-auto px-4">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <SectionTitle>{t('seguradoras.sectionTitle')}</SectionTitle>
          </div>
          <div className="text-center mb-32 max-w-4xl mx-auto">
            <h2
              ref={titleRef}
              className={`text-5xl md:text-6xl font-bold mb-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              dangerouslySetInnerHTML={{ __html: t('seguradoras.title').replace('Excelência', '<span class="font-extrabold">Excelência</span>') }}
            />
            <p
              ref={subtitleRef}
              className={`text-xl text-muted-foreground transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              {t('seguradoras.subtitle')}
            </p>
          </div>
        </div>

        {/* Row 1 - Left to Right */}
        <div
          ref={row1Ref}
          className={`mb-8 transition-all duration-1000 delay-600 overflow-hidden ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}
        >
          <div className="flex gap-16 items-center animate-scroll-left">
            {[...partners.row1, ...partners.row1, ...partners.row1, ...partners.row1].map((partner, idx) => (
              <div
                key={`row1-${idx}`}
                className="flex-shrink-0 transition-all duration-300 animate-logo-blink"
                style={{
                  animationDelay: `${getRandomDelay(0, idx % partners.row1.length, Math.floor(idx / partners.row1.length))}s`
                }}
              >
                <Image
                  src={partner.localLogo}
                  alt={partner.name}
                  width={120}
                  height={60}
                  className="h-12 w-auto object-contain"
                  unoptimized
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - Right to Left */}
        <div
          ref={row2Ref}
          className={`mb-8 transition-all duration-1000 delay-700 overflow-hidden ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}
        >
          <div className="flex gap-16 items-center animate-scroll-right">
            {[...partners.row2, ...partners.row2, ...partners.row2, ...partners.row2].map((partner, idx) => (
              <div
                key={`row2-${idx}`}
                className="flex-shrink-0 transition-all duration-300 animate-logo-blink"
                style={{
                  animationDelay: `${getRandomDelay(1, idx % partners.row2.length, Math.floor(idx / partners.row2.length))}s`
                }}
              >
                <Image
                  src={partner.localLogo}
                  alt={partner.name}
                  width={120}
                  height={60}
                  className="h-12 w-auto object-contain"
                  unoptimized
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 3 - Left to Right */}
   {/*   <div
  ref={row3Ref}
  className={`transition-all duration-1000 delay-800 overflow-hidden ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}
>
  <div className="flex gap-16 items-center animate-scroll-left">
    {[...partners.row3, ...partners.row3, ...partners.row3, ...partners.row3].map((partner, idx) => (
      <div
        key={`row3-${idx}`}
        className="flex-shrink-0 transition-all duration-300 animate-logo-blink"
        style={{
          animationDelay: `${getRandomDelay(2, idx % partners.row3.length, Math.floor(idx / partners.row3.length))}s`
        }}
      >
        <Image
          src={partner.localLogo}
          alt={partner.name}
          width={120}
          height={60}
          className="h-12 w-auto object-contain"
          unoptimized
          loading="lazy"
        />
      </div>
    ))}
  </div>
</div> Properly closed here */}

      </div>
    </section>
  );
}
