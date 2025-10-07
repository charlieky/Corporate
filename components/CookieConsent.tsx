"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useTranslations } from "@/lib/i18n";

export function CookieConsent() {
  const { t } = useTranslations();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasConsented = localStorage.getItem("cookieConsent");
    if (!hasConsented) {
      // Show banner after a short delay
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "false");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom duration-500">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg p-4 md:p-6">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <p className="text-sm text-gray-700 leading-relaxed">
                {t('cookies.message')}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={declineCookies}
                className="text-sm text-gray-600 hover:text-gray-900 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                {t('cookies.decline')}
              </button>
              <button
                onClick={acceptCookies}
                className="text-sm bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                {t('cookies.accept')}
              </button>
              <button
                onClick={declineCookies}
                className="text-gray-400 hover:text-gray-600 p-1"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
