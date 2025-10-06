"use client";

import { useState, useEffect, useRef } from "react";
import Script from "next/script";
import Image from "next/image";
import { SectionTitle } from "@/components/SectionTitle";
import { Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslations } from "@/lib/i18n";

interface HubSpotContactSectionProps {
  isDialogOpen?: boolean;
  setIsDialogOpen?: (open: boolean) => void;
} 

export function HubSpotContactSection({
  isDialogOpen: externalIsDialogOpen,
  setIsDialogOpen: externalSetIsDialogOpen
}: HubSpotContactSectionProps = {}) {
  const { t, locale } = useTranslations();
  const [internalIsDialogOpen, setInternalIsDialogOpen] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formKey, setFormKey] = useState(0);

  // Use external state if provided, otherwise use internal state
  const isDialogOpen = externalIsDialogOpen !== undefined ? externalIsDialogOpen : internalIsDialogOpen;
  const setIsDialogOpen = externalSetIsDialogOpen || setInternalIsDialogOpen;

  // Reset script loaded state when locale changes
  useEffect(() => {
    console.log("🌍 Locale changed to:", locale);
    // Check if HubSpot script is actually loaded
    // @ts-expect-error - HubSpot global
    const scriptLoaded = typeof window !== 'undefined' && typeof window.hbspt !== 'undefined';
    console.log("🌍 HubSpot script available:", scriptLoaded);
    setIsScriptLoaded(scriptLoaded);
  }, [locale]);

  // Increment form key when dialog opens to force re-render
  useEffect(() => {
    console.log("🔵 Dialog state changed. isDialogOpen:", isDialogOpen);
    if (isDialogOpen) {
      console.log("🔵 Incrementing formKey");
      setFormKey(prev => {
        const newKey = prev + 1;
        console.log("🔵 formKey changed from", prev, "to", newKey);
        return newKey;
      });
    }
  }, [isDialogOpen]);

  // Create form when dialog opens
  useEffect(() => {
    console.log("🟢 Form creation effect triggered. isDialogOpen:", isDialogOpen, "isScriptLoaded:", isScriptLoaded, "formKey:", formKey);

    if (isDialogOpen && isScriptLoaded) {
      console.log("🟢 Dialog opened, starting form creation...");
      setIsFormLoading(true);

      // Wait for dialog to render, then set up observer and create form
      const setupForm = () => {
        console.log("🟡 setupForm called");
        const container = document.getElementById('hubspot-form-container');
        console.log("🟡 Container found:", container);

        // Clear any existing form content to allow re-creation
        if (container) {
          console.log("🟡 Clearing container, current innerHTML length:", container.innerHTML.length);
          container.innerHTML = '';
          console.log("🟡 Container cleared");
        }

        if (container) {
          console.log("🟡 Setting up MutationObserver");
          const observer = new MutationObserver((mutations) => {
            console.log("🔍 MutationObserver triggered, mutations:", mutations.length);
            mutations.forEach((mutation) => {
              console.log("Mutation type:", mutation.type, "Added nodes:", mutation.addedNodes.length);
              if (mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach((node) => {
                  console.log("Added node:", node.nodeName, node);
                  // Check if it's an iframe
                  if (node.nodeName === 'IFRAME') {
                    const iframe = node as HTMLIFrameElement;

                    // Wait a bit for iframe to load and become visible
                    const checkVisibility = setInterval(() => {
                      const isVisible = iframe.style.visibility !== 'hidden';
                      console.log("Checking iframe visibility:", isVisible);
                      if (isVisible) {
                        console.log("✅ HubSpot iframe is now visible!");
                        setIsFormLoading(false);
                        observer.disconnect();
                        clearInterval(checkVisibility);
                      }
                    }, 100);

                    // Fallback: stop checking after 3 seconds
                    setTimeout(() => {
                      clearInterval(checkVisibility);
                    }, 3000);
                  }
                });
              }
            });
          });

          console.log("Starting to observe container...");
          observer.observe(container, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['style']
          });

          // @ts-expect-error - HubSpot global
          if (window.hbspt) {
            try {
              console.log("🟠 HubSpot SDK available, creating form...");
              // @ts-expect-error - HubSpot SDK
              window.hbspt.forms.create({
                region: "na2",
                portalId: "244034295",
                formId: "a0d8be96-c4f1-4e15-964b-f38f4f3e26d9",
                target: "#hubspot-form-container",
                onFormReady: ($form: unknown) => {
                  console.log("✅ onFormReady callback fired!", $form);
                  setIsFormLoading(false);
                },
                onFormSubmit: ($form: unknown) => {
                  console.log("📤 Form submitted", $form);
                },
                onFormSubmitted: ($form: unknown) => {
                  console.log("✅ Form submission complete", $form);
                }
              });
              console.log("🟠 HubSpot form.create() called successfully");
              // Fallback timeout in case observer doesn't fire
              setTimeout(() => {
                console.log("⏰ Fallback timeout reached (2s), hiding skeleton");
                setIsFormLoading(false);
                observer.disconnect();
              }, 2000);
            } catch (error) {
              console.error("❌ Error creating HubSpot form:", error);
              setIsFormLoading(false);
              observer.disconnect();
            }
          } else {
            console.error("❌ window.hbspt not available");
            observer.disconnect();
          }

          // Cleanup observer when dialog closes
          return () => {
            observer.disconnect();
          };
        } else {
          console.error("❌ Container not found after waiting");
        }
      };

      // Wait for dialog content to render
      const timer = setTimeout(setupForm, 50);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isDialogOpen, isScriptLoaded, formKey]);

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
    <>
      <Script
        id="hubspot-forms-script"
        src="https://js.hsforms.net/forms/v2.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("✅ HubSpot script loaded successfully");
          console.log("Environment:", process.env.NODE_ENV);
          console.log("hbspt available:", typeof window !== 'undefined' && 'hbspt' in window);
          setIsScriptLoaded(true);
        }}
        onError={(e) => {
          console.error("❌ Failed to load HubSpot script:", e);
          console.error("This could be due to ad blockers or network restrictions");
        }}
      />

      <section ref={sectionRef} id="contato" className="py-20 bg-gradient-to-r from-[#121929] to-[#32A65D] text-white">
        <div className="container mx-auto px-4">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <SectionTitle variant="light">{t('contact.sectionTitle')}</SectionTitle>
          </div>

          <div className="max-w-6xl mx-auto mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Image */}
              <div className={`rounded-2xl overflow-hidden relative transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
                <Image
                  src="/man.png"
                  alt="Contact Us via WhatsApp"
                  width={600}
                  height={500}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-[#011633]/20"></div>
              </div>

              {/* Right: Content */}
              <div className="space-y-8">
                <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <h2 className="text-5xl font-bold mb-6 text-white">{t('contact.title')}</h2>
                  <p className="text-xl text-gray-400">
                    {t('contact.subtitle')}
                  </p>
                </div>

                <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="text-lg px-12 py-6 h-auto bg-[#9E6300] text-white hover:bg-[#9E6300]/90">
                        {t('contact.button')}
                      </Button>
                    </DialogTrigger>
                  <DialogContent className="fixed top-0 left-0 right-0 bottom-0 w-full h-full max-w-none max-h-none rounded-none border-none m-0 translate-x-0 translate-y-0 lg:inset-auto lg:w-[1200px] lg:max-w-[90vw] lg:h-auto lg:max-h-[90vh] lg:top-[50%] lg:left-[50%] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:rounded-lg lg:border overflow-y-auto p-0 gap-0 bg-white">
                    <DialogTitle className="sr-only">Formulário de Contato</DialogTitle>
                    <DialogDescription className="sr-only">
                      Preencha o formulário para entrar em contato conosco
                    </DialogDescription>
                    {isFormLoading && (
                      <div className="p-8 space-y-6">
                        <div className="space-y-4">
                          <Skeleton className="h-8 w-3/4" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                        <div className="space-y-4">
                          <Skeleton className="h-10 w-full" />
                          <Skeleton className="h-10 w-full" />
                          <Skeleton className="h-10 w-full" />
                          <Skeleton className="h-24 w-full" />
                          <Skeleton className="h-10 w-32" />
                        </div>
                      </div>
                    )}
                    <div
                      key={formKey}
                      id="hubspot-form-container"
                      className={isFormLoading ? "hidden" : ""}
                    />
                  </DialogContent>
                </Dialog>
                </div>

                <div className={`pt-8 border-t border-white/10 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <p className="text-2xl font-semibold mb-6 text-white">{t('contact.direct')}</p>
                  <div className="space-y-4">
                    <a
                      href={`mailto:${t('contact.email')}`}
                      className="flex items-center gap-3 hover:underline text-xl text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      <Mail className="w-6 h-6 text-gray-400" />
                      {t('contact.email')}
                    </a>
                    <a
                      href={`tel:${t('contact.phone').replace(/\s/g, '')}`}
                      className="flex items-center gap-3 hover:underline text-xl text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      <Phone className="w-6 h-6 text-gray-400" />
                      {t('contact.phone')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
