"use client";
import React, { useState, useEffect, useRef } from "react";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hidden, setHidden] = useState(false);
  const hideTimeoutRef = useRef<number | null>(null);
  const lastYRef = useRef(0);
  const linkStyle = {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: '500',
    letterSpacing: '0.025em',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
    padding: '0 18px',
    transition: 'color 0.3s ease',
    cursor: 'pointer',
    display: 'inline-block'
  };
  const handleHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = '#4a90e2';
  };
  const handleLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = '#ffffff';
  };
  const blinkingDotStyle = {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    marginRight: '8px',
    animation: 'blink 2s infinite'
  };

  useEffect(() => {
    function checkMobile() {
      setIsMobile(window.innerWidth <= 640);
    }
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY || window.pageYOffset;
      if (hideTimeoutRef.current) window.clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = window.setTimeout(() => {
        if (y <= 0) {
          setHidden(false);
        } else if (y > lastYRef.current) {
          setHidden(true);
        } else if (y < lastYRef.current) {
          setHidden(false);
        }
        lastYRef.current = y;
      }, 80);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (hideTimeoutRef.current) window.clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.3; }
        }
        @keyframes booknow-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @media (max-width: 767px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: flex !important; }
        }
        @media (min-width: 768px) {
          .nav-desktop { display: flex !important; }
          .nav-mobile { display: none !important; }
        }
      `}</style>
      {/* Desktop Nav */}
      <nav className="nav-desktop" style={{
        position: 'fixed',
        zIndex: 50,
        left: '50%',
        transform: hidden ? 'translate(-50%, -140%)' : 'translate(-50%, 0)',
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? 'none' : 'auto',
        transition: 'transform 280ms cubic-bezier(.2,.9,.2,1), opacity 220ms ease',
        backdropFilter: 'blur(16px)',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '50px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        width: '380px',
        height: '92px',
        top: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <a href="#home" style={linkStyle} onMouseEnter={handleHover} onMouseLeave={handleLeave}>Home</a>
          <a href="#services" style={linkStyle} onMouseEnter={handleHover} onMouseLeave={handleLeave}>Services</a>
          <a href="#work" style={linkStyle} onMouseEnter={handleHover} onMouseLeave={handleLeave}>Work</a>
          <a href="#about" style={linkStyle} onMouseEnter={handleHover} onMouseLeave={handleLeave}>About</a>
        </div>
      </nav>
      {/* Desktop Logo */}
      <img
        src="/Electrixel_logo.png"
        alt="Electrixel Logo"
        style={{
          position: 'fixed',
          zIndex: 50,
          left: '4px',
          top: '-4px',
          transform: hidden ? 'translateY(-140%)' : 'translateY(0)',
          opacity: hidden ? 0 : 1,
          pointerEvents: hidden ? 'none' : 'auto',
          transition: 'transform 280ms cubic-bezier(.2,.9,.2,1), opacity 220ms ease',
          height: '200px',
          width: 'auto',
          filter: 'brightness(0) invert(1)',
          cursor: 'pointer',
          display: 'block'
        }}
        className="nav-desktop"
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />
      {/* Desktop Get in Touch */}
      <div
        className="nav-desktop"
        style={{
          position: 'fixed',
          zIndex: 50,
          right: '48px',
          top: '48px',
          transform: hidden ? 'translateY(-140%)' : 'translateY(0)',
          opacity: hidden ? 0 : 1,
          pointerEvents: hidden ? 'none' : 'auto',
          transition: 'transform 280ms cubic-bezier(.2,.9,.2,1), opacity 220ms ease, background-color 0.3s ease',
          backdropFilter: 'blur(16px)',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '50px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          padding: '24px 32px',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'; }}
      >
        <div style={blinkingDotStyle}></div>
        <span style={{ color: '#ffffff', fontSize: '16px', fontWeight: '500', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif', letterSpacing: '0.025em' }}>Get in touch</span>
      </div>
      {/* Mobile Nav */}
      <nav className="nav-mobile" style={{
        position: 'fixed',
        zIndex: 100,
        top: 20,
        left: -10,
        width: '100vw',
        height: '64px',
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0',
        boxSizing: 'border-box',
        borderBottom: 'none',
        transform: hidden && !menuOpen ? 'translateY(-240%)' : 'translateY(0)',
        opacity: hidden && !menuOpen ? 0 : 1,
        pointerEvents: hidden && !menuOpen ? 'none' : 'auto',
        transition: 'transform 280ms cubic-bezier(.2,.9,.2,1), opacity 220ms ease, filter 220ms ease'
      }}>
        {/* Logo left, menu button right for mobile */}
        <img
          src="/Electrixel_logo.png"
          alt="Electrixel Logo"
          style={{ height: '170px', width: 'auto', filter: 'brightness(0) invert(1)', cursor: 'pointer', marginLeft: -5, marginTop: 36 }}
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <button
          aria-label="Open menu"
          style={{
            background: 'linear-gradient(135deg, #1b2735 0%, #090a0f 100%)',
            backgroundSize: '200% 200%',
            animation: 'booknow-gradient 6s ease-in-out infinite',
            border: 'none',
            padding: '15px 16px',
            margin: 0,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '999px',
            boxShadow: '0 4px 24px rgba(74,144,226,0.18)',
            gap: '12px',
            fontWeight: 600,
            fontSize: 20,
            color: '#fff',
            letterSpacing: '0.03em',
            position: 'relative',
            marginRight: 18,
            marginTop: 12
          }}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span style={{ fontSize: 18, fontWeight: 300 }}>Menu</span>
        </button>
        {/* Slide-out menu */}
        {menuOpen && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(21,21,21,0.98)',
            zIndex: 200,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2.5rem',
            transition: 'all 0.3s',
          }}>
            <button aria-label="Close menu" style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: 'none', color: '#fff', fontSize: 36, cursor: 'pointer' }} onClick={() => setMenuOpen(false)}>&times;</button>
            <a href="#home" style={{ ...linkStyle, fontSize: 28 }} onClick={() => setMenuOpen(false)}>Home</a>
            <a href="#services" style={{ ...linkStyle, fontSize: 28 }} onClick={() => setMenuOpen(false)}>Services</a>
            <a href="#work" style={{ ...linkStyle, fontSize: 28 }} onClick={() => setMenuOpen(false)}>Work</a>
            <a href="#about" style={{ ...linkStyle, fontSize: 28 }} onClick={() => setMenuOpen(false)}>About</a>
            <button style={{ marginTop: 24, padding: '18px 36px', borderRadius: 32, background: '#4a90e2', color: '#fff', fontWeight: 600, fontSize: 22, border: 'none', boxShadow: '0 4px 24px rgba(74,144,226,0.18)', letterSpacing: '0.03em', display: 'flex', alignItems: 'center' }}>
              <div style={blinkingDotStyle}></div>
              Get in touch
            </button>
          </div>
        )}
      </nav>
    </>
  );
}
