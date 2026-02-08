"use client";
import React, { useEffect, useMemo, useState } from "react";

export default function OurWorkSection() {
  const cards = useMemo(
    () => [
      {
        title: "Evolve [25]",
        image: "https://picsum.photos/seed/work1/1200/800",
        tags: ["Website", "Brand Identity", "Brand Implementation"],
        tone: "dark"
      },
      {
        title: "Festive Green",
        image: "https://picsum.photos/seed/work2/1200/800",
        tags: ["Website", "Brand Identity"],
        tone: "light"
      },
      {
        title: "Lift & Revive",
        image: "https://picsum.photos/seed/work3/1200/800",
        tags: ["New", "Website", "Brand Implementation"],
        tone: "mid"
      },
      {
        title: "Evolve [25]",
        image: "https://picsum.photos/seed/work4/1200/800",
        tags: ["Website", "Brand Identity", "Brand Implementation"],
        tone: "dark"
      }
    ],
    []
  );
  const loopedCards = useMemo(() => [...cards, ...cards, ...cards], [cards]);
  const baseCount = cards.length;
  const [index, setIndex] = useState(baseCount);
  const [animate, setAnimate] = useState(true);
  const [layout, setLayout] = useState({
    cardWidth: 480,
    cardHeight: 660,
    gap: 32,
    peek: 24,
    leftPad: 0,
    rightPad: 0
  });

  function scrollByCard(direction: "prev" | "next") {
    setIndex((i) => (direction === "next" ? i + 1 : i - 1));
  }

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => {
      if (mq.matches) {
        setLayout({
          cardWidth: 320,
          cardHeight: 520,
          gap: 16,
          peek: 0,
          leftPad: 16,
          rightPad: 16
        });
      } else {
        setLayout({ cardWidth: 480, cardHeight: 660, gap: 32, peek: 24, leftPad: 0, rightPad: 0 });
      }
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (index >= baseCount * 2) {
      const id = window.setTimeout(() => {
        setAnimate(false);
        setIndex(baseCount);
      }, 350);
      return () => window.clearTimeout(id);
    }
    if (index <= 0) {
      const id = window.setTimeout(() => {
        setAnimate(false);
        setIndex(baseCount);
      }, 350);
      return () => window.clearTimeout(id);
    }
    setAnimate(true);
    return undefined;
  }, [index, baseCount]);

  return (
    <section
      id="work"
      className="relative w-full h-screen min-h-screen flex items-center pt-50"
      aria-label="Our Work"
    >
      <div className="w-full h-full overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-6 md:pl-32 md:pr-16" style={{ position: "relative", zIndex: 2, marginTop: "32px" }}>
        <div className="mb-8">
          <h2
            className="work-title font-semibold"
            style={{
              fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
              fontSize: "50px",
              lineHeight: "56px",
              marginLeft: "24px",
              color: "#f1f1f1"
            }}
          >
            Our Work
          </h2>
        </div>
        <div
          className="work-carousel overflow-hidden pb-4"
          style={{
            paddingLeft: `${layout.leftPad + layout.peek}px`,
            paddingRight: `${layout.rightPad + layout.peek}px`,
            paddingTop: "20px",
            paddingBottom: "40px"
          }}
        >
          <div
            className="flex"
            style={{
              gap: `${layout.gap}px`,
              transform: `translateX(-${index * (layout.cardWidth + layout.gap) - layout.peek}px)`,
              transition: animate ? "transform 350ms ease" : "none"
            }}
          >
            {loopedCards.map((card, i) => {
              const isActive = i === index;
              return (
            <article
              key={`${card.title}-${i}`}
              className="work-card relative flex-shrink-0 overflow-hidden rounded-[40px] shadow-[0_30px_60px_-18px_rgba(0,0,0,0.45),0_12px_24px_-8px_rgba(0,0,0,0.2),0_18px_18px_-12px_rgba(255,255,255,0.28)]"
              style={{
                width: `${layout.cardWidth}px`,
                height: `${layout.cardHeight}px`,
                scrollSnapAlign: "start",
                backgroundColor: "transparent"
              }}
              data-card
            >
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
              />

              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.08) 10%, rgba(0,0,0,0.35) 100%)"
                }}
              />

              <div
                className="work-card-title absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-start rounded-full bg-white/80 px-6 py-4 font-semibold text-black/85 shadow-[0_16px_30px_rgba(0,0,0,0.25)] overflow-hidden"
                style={{
                  fontFamily: "Geist, system-ui, sans-serif",
                  fontSize: "28px",
                  top:"30px",
                  lineHeight: "32px",
                  width: "400px",
                  height: "75px",
                  textAlign: "left",
                  boxSizing: "border-box",
                  paddingLeft: "24px",
                  whiteSpace: "nowrap",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)"
                }}
              >
                <span>{card.title}</span>
              </div>

              <div
                className="work-tags absolute z-10 flex flex-wrap gap-2"
                style={{
                  left: "16px",
                  bottom: "16px",
                  maxWidth: "calc(100% - 32px)",
                  flexWrap: "wrap-reverse",
                  columnGap: "12px",
                  rowGap: "10px"
                }}
              >
                {card.tags.map((tag) => (
                  <span
                    key={`${card.title}-${tag}`}
                    className="inline-flex items-center rounded-full bg-white/80 px-4 font-semibold text-black/85 shadow-[0_16px_30px_rgba(0,0,0,0.25)]"
                    style={{
                      boxSizing: "border-box",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      fontFamily: "Geist, system-ui, sans-serif",
                      fontSize: "18px",
                      height: "42px",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
            );
            })}
          </div>
        </div>

        <div className="work-buttons mt-6 flex items-center gap-4" style={{ marginLeft: "24px", marginTop: "2px" }}>
          <button
            type="button"
            aria-label="Previous"
            onClick={() => scrollByCard("prev")}
            className="inline-flex h-[56px] w-[56px] items-center justify-center rounded-full bg-white/80 text-black shadow-sm"
          >
            {"\u2190"}
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => scrollByCard("next")}
            className="inline-flex h-[56px] w-[56px] items-center justify-center rounded-full bg-white/80 text-black shadow-sm"
          >
            {"\u2192"}
          </button>
        </div>
        <style jsx>{`
          @media (max-width: 767px) {
            .work-title {
              font-size: 36px !important;
              line-height: 42px !important;
              margin-left: 0 !important;
              text-align: center;
            }
            .work-carousel {
              padding-bottom: 32px !important;
            }
            .work-card {
              border-radius: 28px !important;
            }
            .work-card-title {
              width: 80% !important;
              height: 60px !important;
              font-size: 20px !important;
              line-height: 24px !important;
              top: 20px !important;
            }
            .work-tags {
              left: 12px !important;
              bottom: 12px !important;
            }
            .work-tags span {
              font-size: 14px !important;
              height: 34px !important;
              padding-left: 12px !important;
              padding-right: 12px !important;
            }
            .work-buttons {
              justify-content: center;
              margin-left: 0 !important;
              margin-top: 12px !important;
            }
          }
        `}</style>
      </div>
      </div>
    </section>
  );
}
