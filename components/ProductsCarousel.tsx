"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { SectionTitle } from "@/components/SectionTitle";
import { useTranslations } from "@/lib/i18n";

const products = [                                                                                                                                      
  {
    id: "do",
    title: "D&O",
    subtitle: "Directors & Officers",
    description: "Seguro de Responsabilidade Civil para Diretores e Administradores",
    details: "Proteção para executivos contra reclamações relacionadas às suas decisões gerenciais e administrativas.",
    image: "/products/do.webp",
  },
  {
    id: "eo",
    title: "E&O",
    subtitle: "Errors & Omissions",
    description: "Seguro de Responsabilidade Civil Profissional",
    details: "Cobertura para profissionais contra reclamações de erros, omissões ou negligência no exercício de suas atividades.",
    image: "/products/eo.webp",
  },
  {
    id: "rcg",
    title: "RCG",
    subtitle: "Responsabilidade Civil Geral",
    description: "Seguro de Responsabilidade Civil Geral",
    details: "Proteção contra danos corporais, materiais e morais causados a terceiros durante as operações da empresa.",
    image: "/products/rcg.webp",
  },
  {
    id: "cyber",
    title: "Cyber",
    subtitle: "Seguro Cyber",
    description: "Proteção contra Riscos Cibernéticos",
    details: "Cobertura para ataques cibernéticos, vazamento de dados, ransomware e outras ameaças digitais.",
    image: "/products/cyber.webp",
  },
  {
    id: "garantia",
    title: "Seguro Garantia",
    subtitle: "Surety Bond",
    description: "Seguro Garantia para Contratos",
    details: "Garantia para licitações, contratos e obrigações contratuais junto a órgãos públicos e privados.",
    image: "/products/garantia.webp",
  },
  {
    id: "outros",
    title: "Outros Seguros",
    subtitle: "Other Insurance",
    description: "Soluções Personalizadas",
    details: "Oferecemos outras soluções de seguros corporativos adaptadas às necessidades específicas do seu negócio.",
    image: "/products/outros.webp",
  },
];

export function ProductsCarousel() {
  const { t } = useTranslations();
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLDivElement>(null);

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  React.useEffect(() => {
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

  const currentProduct = products[current];

  return (
    <section id="produtos" className="min-h-screen flex items-center py-16 bg-background">
      <div ref={sectionRef} className="container mx-auto px-4">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <SectionTitle>{t('products.sectionTitle')}</SectionTitle>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Carousel */}
          <div className={`lg:pr-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <Carousel
              setApi={setApi}
              opts={{
                align: "center",
                loop: true,
              }}
              plugins={[plugin.current]}
              className="w-full"
            >
              <CarouselContent className="-ml-6">
                {products.map((product, index) => (
                  <CarouselItem key={product.id} className="pl-6 basis-9/12 md:basis-7/12">
                    <Card className={`rounded-2xl overflow-hidden group cursor-pointer transition-all duration-500 border-none shadow-lg p-0 gap-0 ${
                      index === current ? 'opacity-100 scale-100' : 'opacity-40 scale-95'
                    }`}>
                      <CardContent className="p-0 relative h-[500px] md:h-[600px]">
                        {/* Background image */}
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                          style={{
                            backgroundImage: `url(${product.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                        />
                        {/* Dark overlay */}
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />

                        {/* Blue tab with text */}
                        <div className="absolute bottom-0 left-0 bg-primary rounded-tr-xl px-6 py-4">
                          <div className="text-3xl font-bold text-white mb-1">{t(`products.items.${product.id}.title`)}</div>
                          <p className="text-sm text-white/90">{t(`products.items.${product.id}.subtitle`)}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          {/* Right side - Product details */}
          <div className={`space-y-8 lg:pl-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <div className="min-h-[360px] md:min-h-[320px] flex flex-col">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{t(`products.items.${currentProduct.id}.description`)}</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t(`products.items.${currentProduct.id}.details`)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
