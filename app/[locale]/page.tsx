"use client";

import { useState, useEffect, useRef } from "react";
import { Shield, Globe, Cpu, Users, Menu, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import dynamic from "next/dynamic";
import { SectionTitle } from "@/components/SectionTitle";
import { CookieConsent } from "@/components/CookieConsent";
import { useTranslations } from "@/lib/i18n";
import { LanguageSelector } from "@/components/LanguageSelector";

// Lazy load below-fold components
const ProductsCarousel = dynamic(() => import("@/components/ProductsCarousel").then(mod => mod.ProductsCarousel), { ssr: false });
const PartnersSection = dynamic(() => import("@/components/PartnersSection").then(mod => mod.PartnersSection), { ssr: false });
const ClientsSection = dynamic(() => import("@/components/ClientsSection").then(mod => mod.ClientsSection), { ssr: false });
const HubSpotContactSection = dynamic(() => import("@/components/HubSpotContactSection").then(mod => mod.HubSpotContactSection), { ssr: false });

export default function Home() {
  const { t } = useTranslations();
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const servicosRef = useRef<HTMLDivElement>(null);
  const [isServicosVisible, setIsServicosVisible] = useState(false);
  const presencaRef = useRef<HTMLDivElement>(null);
  const [isPresencaVisible, setIsPresencaVisible] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselRotateX, setCarouselRotateX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeroVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsServicosVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (servicosRef.current) {
      observer.observe(servicosRef.current);
    }

    return () => {
      if (servicosRef.current) {
        observer.unobserve(servicosRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsPresencaVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (presencaRef.current) {
      observer.observe(presencaRef.current);
    }

    return () => {
      if (presencaRef.current) {
        observer.unobserve(presencaRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Detect mobile on client side only
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!carouselRef.current) return;

      const rect = carouselRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate scroll progress from 0 (entering viewport) to 1 (exiting viewport)
      const scrollProgress = Math.max(0, Math.min(1,
        (viewportHeight - rect.top) / (viewportHeight + rect.height)
      ));

      // Smoothly rotate from -10deg to 10deg as user scrolls down
      setCarouselRotateX(-10 + scrollProgress * 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/15879109422"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BD5A] text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 animate-bounce-slow"
        aria-label="Contatar via WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src="/logo.svg" alt="Forters Logo" width={40} height={40} className="h-10 w-auto" priority />
              <span className="text-2xl font-bold text-foreground"></span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#produtos" className="text-sm font-medium hover:text-primary transition-colors">{t('nav.produtos')}</a>
              <a href="#servicos" className="text-sm font-medium hover:text-primary transition-colors">{t('nav.servicos')}</a>
              <a href="#presenca" className="text-sm font-medium hover:text-primary transition-colors">{t('nav.presencaGlobal')}</a>
              <a href="#clientes" className="text-sm font-medium hover:text-primary transition-colors">{t('nav.clientes')}</a>
              <a href="#parceiros" className="text-sm font-medium hover:text-primary transition-colors">{t('nav.seguradoras')}</a>
              <a href="#contato" className="text-sm font-medium hover:text-primary transition-colors">{t('nav.contato')}</a>
            </div>
            <div className="flex items-center gap-4">
              <Button
                className="hidden md:inline-flex"
                onClick={() => {
                  document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {t('nav.faleConosco')}
              </Button>
              <LanguageSelector />
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menu">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-background via-primary/5 to-accent/10 overflow-hidden">
        <div className="container mx-auto px-4 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Content */}
            <div ref={heroRef} className="space-y-8 pb-16 md:pb-24">
              <div className={`space-y-6 transition-all duration-1000 ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  {t('hero.title')}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                  {t('hero.subtitle')}
                </p>
              </div>

              <div className={`flex flex-wrap gap-4 transition-all duration-1000 delay-200 ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <Button size="lg" className="text-base px-8 h-12" onClick={() => setIsContactDialogOpen(true)}>
                  {t('hero.ctaPrimary')}
                </Button>
                <Button size="lg" variant="outline" className="text-base px-8 h-12">
                  {t('hero.ctaSecondary')}
                </Button>
              </div>

              {/* Stats */}
              <div className={`grid grid-cols-3 gap-8 pt-8 transition-all duration-1000 delay-400 ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="flex flex-col justify-end h-24">
                  <div className="text-4xl font-bold text-primary leading-none">
                    <span className="text-xl font-normal">+US$ </span>
                    <span>500</span>
                    <span className="text-xl font-normal">M</span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2 h-10 leading-5">{t('hero.stats.companies')}</div>
                </div>
                <div className="flex flex-col justify-end h-24">
                  <div className="text-4xl font-bold text-primary leading-none">{t('hero.stats.countriesValue')}</div>
                  <div className="text-sm text-muted-foreground mt-2 h-10 leading-5">{t('hero.stats.countries')}</div>
                </div>
                <div className="flex flex-col justify-end h-24">
                  <div className="text-4xl font-bold text-primary leading-none">{t('hero.stats.insurersValue')}</div>
                  <div className="text-sm text-muted-foreground mt-2 h-10 leading-5">{t('hero.stats.insurers')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Image/Badges - Outside container, positioned absolutely */}
        <div className={`absolute bottom-0 right-0 w-1/2 h-[600px] hidden lg:flex items-end justify-center transition-all duration-1000 delay-300 ${isHeroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
          <Image
            src="/new_for_nobg.png"
            alt="Young professionals representing Forters"
            width={900}
            height={900}
            className="object-contain object-bottom"
            priority
          />
        </div>

        {/* Floating Badges */}
        <div className={`absolute top-1/2 right-64 animate-float hidden lg:block transition-all duration-1000 delay-500 ${isHeroVisible ? 'opacity-70 scale-100' : 'opacity-0 scale-75'}`}>
          <Badge className="bg-white text-foreground shadow-lg px-4 py-2 text-base border flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            {t('hero.badges.business')}
          </Badge>
        </div>
        <div className={`absolute top-2/3 right-80 animate-float-delayed hidden lg:block transition-all duration-1000 delay-700 ${isHeroVisible ? 'opacity-70 scale-100' : 'opacity-0 scale-75'}`}>
          <Badge className="bg-white text-foreground shadow-lg px-4 py-2 text-base border flex items-center gap-2">
            <Globe className="w-5 h-5 text-accent" />
            {t('hero.badges.coverage')}
          </Badge>
        </div>
        <div className={`absolute bottom-32 right-72 animate-float-slow hidden lg:block transition-all duration-1000 delay-900 ${isHeroVisible ? 'opacity-70 scale-100' : 'opacity-0 scale-75'}`}>
          <Badge className="bg-white text-foreground shadow-lg px-4 py-2 text-base border flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            {t('hero.badges.consulting')}
          </Badge>
        </div>
      </section>

      {/* Products Section */}
      <ProductsCarousel />

      {/* Features Section */}
      <section id="servicos" className="py-20 bg-background">
        <div ref={servicosRef} className="container mx-auto px-4">
          <div className={`transition-all duration-1000 ${isServicosVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <SectionTitle>{t('features.sectionTitle')}</SectionTitle>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className={`border-2 hover:border-primary transition-all duration-1000 delay-200 ${isServicosVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <CardHeader>
                <Shield className="w-12 h-12 mb-4 text-primary" />
                <CardTitle>{t('features.items.financial.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t('features.items.financial.description')}
                </p>
              </CardContent>
            </Card>

            <Card className={`border-2 hover:border-primary transition-all duration-1000 delay-300 ${isServicosVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <CardHeader>
                <Globe className="w-12 h-12 mb-4 text-primary" />
                <CardTitle>{t('features.items.international.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t('features.items.international.description')}
                </p>
              </CardContent>
            </Card>

            <Card className={`border-2 hover:border-primary transition-all duration-1000 delay-400 ${isServicosVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <CardHeader>
                <Cpu className="w-12 h-12 mb-4 text-primary" />
                <CardTitle>{t('features.items.technology.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t('features.items.technology.description')}
                </p>
              </CardContent>
            </Card>

            <Card className={`border-2 hover:border-primary transition-all duration-1000 delay-500 ${isServicosVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <CardHeader>
                <Users className="w-12 h-12 mb-4 text-primary" />
                <CardTitle>{t('features.items.team.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t('features.items.team.description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <ClientsSection />

      {/* Global Presence Section */}
      <section id="presenca" className="py-20 bg-background">
        <div ref={presencaRef} className="container mx-auto px-4">
          <div className={`transition-all duration-1000 ${isPresencaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <SectionTitle>{t('presencaGlobal.sectionTitle')}</SectionTitle>
          </div>
          <div className={`text-center mb-16 transition-all duration-1000 delay-200 ${isPresencaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-5xl md:text-6xl font-bold mb-4">{t('presencaGlobal.title')}</h2>
            <p className="text-xl text-muted-foreground">
            {t('presencaGlobal.subtitle')}
            </p>
          </div>

          {/* 3D Flag Carousel - Desktop only, Grid on Mobile */}
          <div className="max-w-6xl mx-auto">
            {/* Mobile: Grid view - Hidden, using 3D carousel instead */}
            <div className="hidden">
              <div className="flex flex-col items-center gap-2">
                <div className="w-full aspect-[3/2] overflow-hidden rounded-lg shadow-lg border border-gray-200 relative">
                  <Image src="https://flagcdn.com/w320/br.png" alt="Brazil" fill className="object-cover" unoptimized />
                </div>
                <div className="text-xs">{t('presencaGlobal.countries.brasil')}</div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-full aspect-[3/2] overflow-hidden rounded-lg shadow-lg border border-gray-200 relative">
                  <Image src="https://flagcdn.com/w320/mx.png" alt="Mexico" fill className="object-cover" unoptimized />
                </div>
                <div className="text-xs">{t('presencaGlobal.countries.mexico')}</div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-full aspect-[3/2] overflow-hidden rounded-lg shadow-lg border border-gray-200 relative">
                  <Image src="https://flagcdn.com/w320/co.png" alt="Colombia" fill className="object-cover" unoptimized />
                </div>
                <div className="text-xs">{t('presencaGlobal.countries.colombia')}</div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-full aspect-[3/2] overflow-hidden rounded-lg shadow-lg border border-gray-200 relative">
                  <Image src="https://flagcdn.com/w320/us.png" alt="USA" fill className="object-cover" unoptimized />
                </div>
                <div className="text-xs">{t('presencaGlobal.countries.usa')}</div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-full aspect-[3/2] overflow-hidden rounded-lg shadow-lg border border-gray-200 relative">
                  <Image src="https://flagcdn.com/w320/ar.png" alt="Argentina" fill className="object-cover" unoptimized />
                </div>
                <div className="text-xs">{t('presencaGlobal.countries.argentina')}</div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-full aspect-[3/2] overflow-hidden rounded-lg shadow-lg border border-gray-200 relative">
                  <Image src="https://flagcdn.com/w320/bd.png" alt="Bangladesh" fill className="object-cover" unoptimized />
                </div>
                <div className="text-xs">Bangladesh</div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-full aspect-[3/2] overflow-hidden rounded-lg shadow-lg border border-gray-200 relative">
                  <Image src="https://flagcdn.com/w320/cn.png" alt="China" fill className="object-cover" unoptimized />
                </div>
                <div className="text-xs">China</div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-full aspect-[3/2] overflow-hidden rounded-lg shadow-lg border border-gray-200 relative">
                  <Image src="https://flagcdn.com/w160/gt.png" alt="Guatemala" fill className="object-cover" unoptimized />
                </div>
                <div className="text-xs">Guatemala</div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-full aspect-[3/2] overflow-hidden rounded-lg shadow-lg border border-gray-200 relative">
                  <Image src="https://flagcdn.com/w320/np.png" alt="Nepal" fill className="object-cover" unoptimized />
                </div>
                <div className="text-xs">Nepal</div>
              </div>
            </div>

            {/* Mobile: Infinite Scroll Carousel */}
            <div className={`md:hidden space-y-6 transition-all duration-1000 delay-400 ${isPresencaVisible ? 'opacity-100' : 'opacity-0'}`}>
              {/* Top row - scroll left */}
              <div className="relative overflow-hidden">
                <div className="flex gap-4 animate-scroll-left">
                  {/* First set */}
                  {[
                    { src: 'https://flagcdn.com/w320/br.png', alt: 'Brazil' },
                    { src: 'https://flagcdn.com/w320/mx.png', alt: 'Mexico' },
                    { src: 'https://flagcdn.com/w320/co.png', alt: 'Colombia' },
                    { src: 'https://flagcdn.com/w320/us.png', alt: 'United States' },
                    { src: 'https://flagcdn.com/w320/ar.png', alt: 'Argentina' },
                    { src: 'https://flagcdn.com/w320/bd.png', alt: 'Bangladesh' },
                    { src: 'https://flagcdn.com/w320/cn.png', alt: 'China' },
                    { src: 'https://flagcdn.com/w320/gt.png', alt: 'Guatemala' },
                    { src: 'https://flagcdn.com/w320/np.png', alt: 'Nepal' }
                  ].map((flag, index) => (
                    <div key={index} className="flex-shrink-0 w-36 h-24 relative rounded-lg overflow-hidden border-2 border-gray-300">
                      <Image src={flag.src} alt={flag.alt} fill className="object-cover" unoptimized />
                    </div>
                  ))}
                  {/* Duplicate set for seamless loop */}
                  {[
                    { src: 'https://flagcdn.com/w320/br.png', alt: 'Brazil' },
                    { src: 'https://flagcdn.com/w320/mx.png', alt: 'Mexico' },
                    { src: 'https://flagcdn.com/w320/co.png', alt: 'Colombia' },
                    { src: 'https://flagcdn.com/w320/us.png', alt: 'United States' },
                    { src: 'https://flagcdn.com/w320/ar.png', alt: 'Argentina' },
                    { src: 'https://flagcdn.com/w320/bd.png', alt: 'Bangladesh' },
                    { src: 'https://flagcdn.com/w320/cn.png', alt: 'China' },
                    { src: 'https://flagcdn.com/w320/gt.png', alt: 'Guatemala' },
                    { src: 'https://flagcdn.com/w320/np.png', alt: 'Nepal' }
                  ].map((flag, index) => (
                    <div key={`dup-${index}`} className="flex-shrink-0 w-36 h-24 relative rounded-lg overflow-hidden border-2 border-gray-300">
                      <Image src={flag.src} alt={flag.alt} fill className="object-cover" unoptimized />
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom row - scroll right */}
              <div className="relative overflow-hidden">
                <div className="flex gap-4 animate-scroll-right">
                  {/* First set - different order */}
                  {[
                    { src: 'https://flagcdn.com/w320/np.png', alt: 'Nepal' },
                    { src: 'https://flagcdn.com/w320/gt.png', alt: 'Guatemala' },
                    { src: 'https://flagcdn.com/w320/cn.png', alt: 'China' },
                    { src: 'https://flagcdn.com/w320/bd.png', alt: 'Bangladesh' },
                    { src: 'https://flagcdn.com/w320/ar.png', alt: 'Argentina' },
                    { src: 'https://flagcdn.com/w320/us.png', alt: 'United States' },
                    { src: 'https://flagcdn.com/w320/co.png', alt: 'Colombia' },
                    { src: 'https://flagcdn.com/w320/mx.png', alt: 'Mexico' },
                    { src: 'https://flagcdn.com/w320/br.png', alt: 'Brazil' }
                  ].map((flag, index) => (
                    <div key={index} className="flex-shrink-0 w-36 h-24 relative rounded-lg overflow-hidden border-2 border-gray-300">
                      <Image src={flag.src} alt={flag.alt} fill className="object-cover" unoptimized />
                    </div>
                  ))}
                  {/* Duplicate set */}
                  {[
                    { src: 'https://flagcdn.com/w320/np.png', alt: 'Nepal' },
                    { src: 'https://flagcdn.com/w320/gt.png', alt: 'Guatemala' },
                    { src: 'https://flagcdn.com/w320/cn.png', alt: 'China' },
                    { src: 'https://flagcdn.com/w320/bd.png', alt: 'Bangladesh' },
                    { src: 'https://flagcdn.com/w320/ar.png', alt: 'Argentina' },
                    { src: 'https://flagcdn.com/w320/us.png', alt: 'United States' },
                    { src: 'https://flagcdn.com/w320/co.png', alt: 'Colombia' },
                    { src: 'https://flagcdn.com/w320/mx.png', alt: 'Mexico' },
                    { src: 'https://flagcdn.com/w320/br.png', alt: 'Brazil' }
                  ].map((flag, index) => (
                    <div key={`dup-${index}`} className="flex-shrink-0 w-36 h-24 relative rounded-lg overflow-hidden border-2 border-gray-300">
                      <Image src={flag.src} alt={flag.alt} fill className="object-cover" unoptimized />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3D Carousel - Desktop only */}
            <div className={`hidden md:block transition-all duration-1000 delay-400 ${isPresencaVisible ? 'opacity-100' : 'opacity-0'}`}>
              <div ref={carouselRef} className="relative w-full h-[300px] flex items-center justify-center overflow-hidden" style={{ perspective: '2000px' }}>
                <div
                  className="relative w-[300px] h-[250px]"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: `rotateX(${carouselRotateX}deg)`
                  }}
                >
                  {[
                    { src: 'https://flagcdn.com/w320/br.png', alt: 'Brazil' },
                    { src: 'https://flagcdn.com/w320/mx.png', alt: 'Mexico' },
                    { src: 'https://flagcdn.com/w320/co.png', alt: 'Colombia' },
                    { src: 'https://flagcdn.com/w320/us.png', alt: 'United States' },
                    { src: 'https://flagcdn.com/w320/ar.png', alt: 'Argentina' },
                    { src: 'https://flagcdn.com/w320/bd.png', alt: 'Bangladesh' },
                    { src: 'https://flagcdn.com/w320/cn.png', alt: 'china' },
                    { src: 'https://flagcdn.com/w320/gt.png', alt: 'Guatemala' },
                    { src: 'https://flagcdn.com/w320/np.png', alt: 'Nepal' }
                  ].map((flag, index) => {
                    const angle = (360 / 9) * index;
                    const rotateY = angle;
                    const translateZ = isMobile ? 280 : 400;

                    return (
                      <div
                        key={index}
                        className="absolute top-1/2 left-1/2 w-48 h-32"
                        style={{
                          transformStyle: 'preserve-3d',
                          transform: `translate(-50%, -50%) rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
                          animationName: `carousel-spin-${isMobile ? 'mobile' : 'desktop'}`,
                          animationDuration: '30s',
                          animationTimingFunction: 'linear',
                          animationIterationCount: 'infinite',
                          animationDelay: `${-index * (30 / 9)}s`
                        }}
                      >
                        <div className="overflow-hidden rounded-lg border-2 border-gray-300 w-full h-full relative bg-white">
                          <Image src={flag.src} alt={flag.alt} fill className="object-cover" unoptimized />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <PartnersSection />

      {/* Contact Section */}
      <HubSpotContactSection
        isDialogOpen={isContactDialogOpen}
        setIsDialogOpen={setIsContactDialogOpen}
      />

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Logo and Description */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Image src="/logo.svg" alt="Forters Logo" width={40} height={40} className="h-10 w-auto" />
                <span className="text-2xl font-bold"></span>
              </div>
              <p className="text-gray-400 max-w-2xl text-lg leading-relaxed">
                {t('footer.description')}
              </p>
            </div>

            {/* Navigation Links */}
            <div className="border-t border-gray-700 pt-8 pb-6">
              <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                <a href="#produtos" className="hover:text-white transition-colors">{t('footer.links.produtos')}</a>
                <a href="#servicos" className="hover:text-white transition-colors">{t('footer.links.servicos')}</a>
                <a href="#presenca" className="hover:text-white transition-colors">{t('footer.links.presencaGlobal')}</a>
                <a href="#parceiros" className="hover:text-white transition-colors">{t('footer.links.parceiros')}</a>
                <a href="#contato" className="hover:text-white transition-colors">{t('footer.links.contato')}</a>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-sm text-gray-700">
              {t('footer.copyright')}
            </div>
          </div>
        </div>
      </footer>

      {/* Cookie Consent Banner */}
      <CookieConsent />
    </div>
  );
}
