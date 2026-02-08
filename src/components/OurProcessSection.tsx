"use client";
import React, { useEffect } from "react";

export default function OurProcessSection() {
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>("#cards .card"));
    if (!cards.length) return;

    let ticking = false;

    const updateActive = () => {
      ticking = false;
      cards.forEach((card, idx) => {
        const next = cards[idx + 1];
        if (!next) {
          card.classList.remove("card-blurred");
          return;
        }
        const nextRect = next.getBoundingClientRect();
        const currentRect = card.getBoundingClientRect();
        const overlapThreshold = 40;
        if (nextRect.top <= currentRect.top + overlapThreshold) {
          card.classList.add("card-blurred");
        } else {
          card.classList.remove("card-blurred");
        }
      });
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <section
      id="process"
      className="section stacking-cards-section relative w-full min-h-screen flex items-center"
      aria-label="Our Process"
    >
      <div className="container section-title-container mx-auto w-full max-w-7xl px-6 md:pl-32 md:pr-16">
        <h2 className="h2 section-title" id="process-title">Our Process</h2>
        <p className="section-text">
          Our collaborative approach ensures tailored solutions and impactful results through these key phases.
        </p>
      </div>

      <div className="container cards-container mx-auto w-full max-w-7xl px-6 md:pl-32 md:pr-16">
        <ul id="cards">
          <li className="card" id="card1" style={{ top: "120px", zIndex: 1 }}>
            <div className="card-body">
              <div className="card-text-column">
                <span className="card-step-number" aria-hidden="true">01</span>
                <h3 className="card-title">Discovery &amp; Kickoff</h3>
                <p className="card-text">
                  We dive deep into your business, goals, audience, and competition through workshops and thorough research to understand the full picture.
                </p>
              </div>
              <div className="card-image-column">
                <img src="/card-1.gif" alt="Animated illustration of team members collaborating during discovery phase." loading="lazy" />
              </div>
            </div>
          </li>

          <li className="card" id="card2" style={{ top: "150px", zIndex: 2 }}>
            <div className="card-body">
              <div className="card-text-column">
                <span className="card-step-number" aria-hidden="true">02</span>
                <h3 className="card-title">Strategy &amp; Planning</h3>
                <p className="card-text">
                  Based on insights, we craft a tailored digital strategy and project roadmap, defining clear objectives, milestones, and KPIs for success.
                </p>
              </div>
              <div className="card-image-column">
                <img src="/card-2.gif" alt="Illustration representing strategic planning with charts and graphs." loading="lazy" />
              </div>
            </div>
          </li>

          <li className="card" id="card3" style={{ top: "180px", zIndex: 3 }}>
            <div className="card-body">
              <div className="card-text-column">
                <span className="card-step-number" aria-hidden="true">03</span>
                <h3 className="card-title">Design &amp; Development</h3>
                <p className="card-text">
                  Our team designs intuitive interfaces and develops robust solutions, focusing on user experience, performance, and scalability using modern tech.
                </p>
              </div>
              <div className="card-image-column">
                <img src="/card-3.gif" alt="Illustration showing UI design mockups and coding." loading="lazy" />
              </div>
            </div>
          </li>

          <li className="card" id="card4" style={{ top: "210px", zIndex: 4 }}>
            <div className="card-body">
              <div className="card-text-column">
                <span className="card-step-number" aria-hidden="true">04</span>
                <h3 className="card-title">Launch &amp; Growth</h3>
                <p className="card-text">
                  We manage a smooth deployment and provide ongoing support, analytics insights, and optimization strategies to ensure continued growth and success.
                </p>
              </div>
              <div className="card-image-column">
                <img src="/card-4.gif" alt="Illustration depicting project launch with rocket and growth metrics." loading="lazy" />
              </div>
            </div>
          </li>
        </ul>
      </div>

      <style jsx>{`
        .section-title-container {
          padding-top: 80px;
        }
        .section-title {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
          font-size: 50px;
          line-height: 56px;
          color: #f1f1f1;
          margin-bottom: 12px;
        }
        .section-text {
          color: #cbd5e1;
          max-width: 720px;
        }
        .cards-container {
          padding-top: 48px;
          padding-bottom: 80px;
        }
        #cards {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 24px;
          position: relative;
        }
        .card {
          background: rgba(15, 20, 29, 0.6);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 24px 60px -24px rgba(0,0,0,0.55);
          position: sticky;
          top: 120px;
        }
        .card-body {
          display: grid;
          grid-template-columns: 1.2fr 680px;
          gap: 24px;
          align-items: center;
          padding: 28px;
        }
        .card .card-body {
          transition: filter 200ms ease, opacity 200ms ease;
        }
        .card.card-blurred .card-body {
          filter: blur(10px);
          opacity: 0.6;
        }
        .card-text-column {
          color: #e2e8f0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
        }
        .card-step-number {
          display: inline-block;
          font-size: 20px;
          color: #94a3b8;
          margin-bottom: 10px;
        }
        .card-title {
          font-size: 28px;
          color: #f8fafc;
          margin: 0 0 10px 0;
        }
        .card-text {
          color: #cbd5e1;
          margin: 0;
        }
        .card-image-column img {
          width: 680px;
          height: 493px;
          max-width: 100%;
          max-height: 100%;
          object-fit: cover;
          border-radius: 18px;
          display: block;
        }
        @media (min-width: 768px) {
          .cards-container {
            padding-left: 0;
            padding-right: 0;
          }
          .card {
            width: calc(100% + 200px);
            margin-left: -200px;
          }
        }
        @media (max-width: 900px) {
          .card-body {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 767px) {
          .stacking-cards-section {
            align-items: flex-start;
            flex-direction: column;
          }
          .section-title-container {
            text-align: center;
            margin-bottom: 24px;
          }
          .section-text {
            margin-left: auto;
            margin-right: auto;
          }
          .card-body {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            padding: 40px 24px;
          }
          .card {
            width: 100%;
            box-sizing: border-box;
            border-radius: 24px;
          }
          #cards {
            width: 100%;
            padding-left: 24px;
            padding-right: 24px;
            box-sizing: border-box;
          }
          .cards-container {
            padding-left: 0;
            padding-right: 0;
          }
          .card-text-column {
            flex-basis: auto;
            width: 100%;
            padding-right: 0;
            margin-bottom: 40px;
            text-align: center;
          }
          .card-text-column .card-title,
          .card-text-column .card-text,
          .card-text-column .card-step-number {
            text-align: center;
          }
          .card-text-column .card-step-number {
            margin-left: auto;
            margin-right: auto;
          }
          .card-image-column {
            flex-basis: auto;
            width: 100%;
            max-width: 320px;
            order: 2;
            margin-left: auto;
            margin-right: auto;
          }
          .card-title {
            font-size: 22px;
          }
          .card-image-column img {
            width: 100%;
            height: auto;
          }
        }
      `}</style>
    </section>
  );
}
