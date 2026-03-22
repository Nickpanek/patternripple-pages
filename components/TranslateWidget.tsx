"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: new (
          options: object,
          elementId: string
        ) => void;
      };
    };
  }
}

export default function TranslateWidget() {
  useEffect(() => {
    // Define init callback before loading script
    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          { pageLanguage: "en", autoDisplay: false },
          "pr-translate-el"
        );
      }
    };

    // Only inject script once
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    // Suppress the Google Translate top bar
    const styleId = "pr-translate-style";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .goog-te-banner-frame, .skiptranslate { display: none !important; }
        body { top: 0 !important; }
        .goog-te-gadget { font-size: 0 !important; }
        .goog-te-gadget select {
          font-size: 13px !important;
          padding: 6px 10px !important;
          border-radius: 8px !important;
          border: 1px solid rgba(255,255,255,0.18) !important;
          background: rgba(20,20,20,0.96) !important;
          color: #e0e0e0 !important;
          cursor: pointer !important;
          outline: none !important;
          max-width: 160px;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "8px",
      }}
    >
      <div id="pr-translate-el" />
    </div>
  );
}
