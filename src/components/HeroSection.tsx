// Utility hook to detect mobile view
function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    function check() {
      setIsMobile(window.innerWidth <= breakpoint);
    }
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);
  return isMobile;
}
"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Particle = {
  id: number;
  x: number;
  y: number;
  src: string;
};

const images = [
  'https://picsum.photos/seed/a/1080/1080',
  'https://picsum.photos/seed/b/1080/1080',
  'https://picsum.photos/seed/c/1080/1080',
  'https://picsum.photos/seed/d/1080/1080',
  'https://picsum.photos/seed/e/1080/1080',
];

export default function HeroSection() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const idRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef(0);
  const heroRef = useRef<HTMLElement | null>(null);
  const isMobile = useIsMobile();
  const [mobileImageIndex, setMobileImageIndex] = useState(() => Math.floor(Math.random() * images.length));

  useEffect(() => {
    if (!isMobile) return;
    // start with a random image
    setMobileImageIndex(Math.floor(Math.random() * images.length));
    const id = setInterval(() => {
      setMobileImageIndex((i) => (i + 1) % images.length);
    }, 300);
    return () => clearInterval(id);
  }, [isMobile]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  function spawn(x: number, y: number) {
    const id = ++idRef.current;
    const src = images[Math.floor(Math.random() * images.length)];
    const p: Particle = { id, x, y, src };
    setParticles((s) => [...s, p]);

    // remove after animation
    setTimeout(() => {
      setParticles((s) => s.filter((t) => t.id !== id));
    }, 900);
  }
                      boxShadow: '0 18px 32px -8px rgba(0,0,0,0.45), 0 8px 24px -8px rgba(74,144,226,0.12)'
  // throttle spawns using rAF
  function handleMove(e: React.MouseEvent) {
    const now = performance.now();
    const throttle = 60; // ms between spawns
    if (now - lastRef.current < throttle) return;
    lastRef.current = now;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spawn(x, y);
  }

  return (
    <section
      ref={(el: HTMLElement | null) => { heroRef.current = el; }}
      id="home"
      onMouseMove={handleMove}
      className="relative min-h-[119vh] overflow-hidden flex items-center justify-center bg-transparent"
      style={{ marginTop: '-170px', paddingBottom: isMobile ? '180px' : undefined }}
    >
      {/* blank canvas - no initial content */}

      {/* render particles only on desktop */}
      {!isMobile && particles.map((p) => (
        <motion.img
          key={p.id}
          src={p.src}
          alt="popup"
          initial={{ opacity: 0, scale: 0.25, y: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0.25, 1.02, 0.6], y: [-6, -28, -54] }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            left: p.x,
            top: p.y,
            transform: 'translate(-50%, -50%)',
            width: 380,
            height: 500,
            maxWidth: '380px',
            maxHeight: '500px',
            objectFit: 'cover',
            pointerEvents: 'none',
            zIndex: 30,
            borderRadius: 12,
            filter: 'drop-shadow(0 12px 36px rgba(0,0,0,0.6))',
          }}
        />
      ))}

      {/* small helper: hint text that fades once mouse moves */}
      {/* centered hero headline (non-interactive so mouse events pass through) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 z-20 pointer-events-none px-6 w-full flex items-center justify-center"
        style={{ top: '35%', left: 0, height: '55%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', position: 'absolute' }}
      >
        <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
          <div className="max-w-4xl text-center mx-auto">
            {isMobile ? (
              <div className="flex flex-col items-center gap-2 w-full" style={{ marginTop: '-90px' }}>
                <span style={{ fontWeight: 800, fontSize: '2.3rem', color: '#f1f1f1', lineHeight: 1.1 }}>Building brands that</span>
                <span style={{ fontStyle: 'italic', color: '#c7d2da', fontWeight: 700, fontSize: '2.3rem', lineHeight: 1.1 }}>resonate,</span>
                  <img
                    src={images[mobileImageIndex]}
                    alt="Hero Mobile"
                    id="hero-mobile-image"
                    style={{
                      borderRadius: '12px',
                      width: '190px',
                      height: '250px',
                      objectFit: 'cover',
                      margin: '18px 0 6px 0',
                      boxShadow: '0 6px 24px rgba(255, 255, 255, 0.4), 0 2px 8px rgba(74,144,226,0.18)'
                    }}
                  />
                <span style={{ fontWeight: 800, fontSize: '2.4rem', color: '#f1f1f1', lineHeight: 1.1, marginTop: '15px', display: 'inline-block' }}>websites that convert.</span>
                <div className="text-center text-[#cbd5e1] max-w-md" style={{ lineHeight: 1.45, fontSize: '20px', marginTop: '30px', fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif' }}>
                  We know that developing a new project is<br />
                  a complex undertaking. Every day, we work<br />
                  on developments that are truly defined by<br />
                  quality and detail, with a focus on<br />
                  commitment to Client satisfaction and<br />
                  concept realization.
                </div>
              </div>
            ) : (
              <h1 className="hero-title text-center w-full flex flex-col items-center justify-center">
                Building brands that
                <br />
                <span className="italic text-[#c7d2da]">resonate,</span> websites
                <br />
                that <span className="italic text-[#c7d2da]">convert.</span>
              </h1>
            )}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0.85 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
      >
        <div className="text-center text-[#7b93a8] select-none">Move your mouse across the screen</div>
      </motion.div>
    </section>
  );
}
