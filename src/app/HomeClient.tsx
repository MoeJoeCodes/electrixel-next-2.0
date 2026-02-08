"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// Ensure the Navigation component exists at the specified path or update the path accordingly
// Update the import path if Navigation is located elsewhere, e.g. "../components/Navbar"
// const Navigation = dynamic(() => import("../components/Navbar"), { ssr: false });

// If the file is missing, create it at ../components/Navigation.tsx or Navigation/index.tsx
const Navigation = dynamic(() => import("../components/Navigation"), { ssr: false });
const HeroSection = dynamic(() => import("../components/HeroSection"), { ssr: false });
const ScrollingTextSection = dynamic(() => import("../components/ScrollingTextSection"), { ssr: false });
const ServicesSection = dynamic(() => import("../components/ServicesSection"), { ssr: false });
const OurWorkSection = dynamic(() => import("../components/OurWorkSection"), { ssr: false });
const OurProcessSection = dynamic(() => import("../components/OurProcessSection"), { ssr: false });
const FooterSection = dynamic(() => import("../components/FooterSection"), { ssr: false });

export default function HomeClient() {
  const workBlockRef = useRef<HTMLDivElement | null>(null);
  const [workBgActive, setWorkBgActive] = useState(false);

  useEffect(() => {
    const node = workBlockRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setWorkBgActive(entry.isIntersecting);
        });
      },
      { root: null, threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navigation />
      <HeroSection />
      <ScrollingTextSection />
      <ServicesSection />
      <div
        ref={workBlockRef}
        style={{
          position: "relative",
          paddingTop: "150px"
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, #090a0f 0%, #0f141d 50%, #1b2735 100%)",
            opacity: workBgActive ? 1 : 0,
            transition: "opacity 1200ms ease-in",
            willChange: "opacity",
            pointerEvents: "none",
            zIndex: 0
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
        <OurWorkSection />
        <OurProcessSection />
        </div>
      </div>
      <FooterSection />
    </>
  );
}
