import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { HERO_SLIDES, SLIDE_INTERVAL_MS } from './homeData';

const HeroSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);

  const startAutoPlay = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, SLIDE_INTERVAL_MS);
  }, []);

  useEffect(() => {
    startAutoPlay();
    return () => clearInterval(intervalRef.current);
  }, [startAutoPlay]);

  const goTo = useCallback(
    (index) => {
      setActiveIndex((index + HERO_SLIDES.length) % HERO_SLIDES.length);
      startAutoPlay();
    },
    [startAutoPlay],
  );

  const goPrev = useCallback(() => goTo(activeIndex - 1), [goTo, activeIndex]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [goTo, activeIndex]);

  const slide = HERO_SLIDES[activeIndex];

  return (
    <section
      className="relative flex items-center justify-center min-h-[60vh] sm:min-h-[75vh] lg:min-h-screen overflow-hidden"
      aria-label="Hero slideshow"
      aria-roledescription="carousel"
    >
      {HERO_SLIDES.map((s, i) => (
        <div
          key={s.id}
          aria-hidden="true"
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === activeIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={s.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
          <div className={`absolute inset-0 ${s.overlay}`} />
        </div>
      ))}

      <button
        type="button"
        aria-label="Previous slide"
        onClick={goPrev}
        className="absolute left-4 lg:left-12 z-20 bg-white/10 hover:bg-white/25 transition-colors rounded-full p-3 cursor-pointer"
      >
        <ChevronLeft size={24} className="text-white" aria-hidden="true" />
      </button>

      <div className="container mx-auto px-4 relative z-10">
        <div
          key={slide.id}
          className="text-center text-white max-w-3xl mx-auto animate-fade-in"
          aria-live="polite"
          aria-atomic="true"
        >
          {slide.eyebrow && (
            <p className="font-['Inter'] font-normal text-sm uppercase tracking-[4.2px] mb-4">
              {slide.eyebrow}
            </p>
          )}
          <h1 className="font-['Playfair_Display'] font-semibold text-4xl sm:text-5xl lg:text-[64px] leading-tight mb-5">
            {slide.title}
          </h1>
          <p className="font-['Inter'] font-light text-base sm:text-xl lg:text-2xl leading-relaxed mb-8">
            {slide.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {slide.cta.map((btn) =>
              btn.variant === 'primary' ? (
                <Link
                  key={btn.label}
                  to={btn.href}
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#0f0f0f] hover:bg-gray-100 transition-colors px-6 py-3 rounded-lg font-medium text-base"
                >
                  {btn.label}
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              ) : btn.variant === 'outline' ? (
                <Link
                  key={btn.label}
                  to={btn.href}
                  className="inline-flex items-center justify-center border border-white text-white hover:bg-white/10 transition-colors px-6 py-3 rounded-lg font-medium text-base tracking-wide"
                >
                  {btn.label}
                </Link>
              ) : (
                <Link
                  key={btn.label}
                  to={btn.href}
                  className="inline-flex items-center justify-center gap-3 bg-white text-[#0f0f0f] hover:bg-gray-100 transition-colors px-6 py-3 rounded-lg font-normal text-base tracking-[0.8px]"
                >
                  {btn.label}
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              ),
            )}
          </div>
          {slide.trust && (
            <p className="mt-6 font-['Inter'] font-normal text-sm tracking-wide text-white/80">
              {slide.trust}
            </p>
          )}
        </div>
      </div>

      <button
        type="button"
        aria-label="Next slide"
        onClick={goNext}
        className="absolute right-4 lg:right-12 z-20 bg-black/50 hover:bg-black/70 transition-colors rounded-full p-3 cursor-pointer"
      >
        <ChevronRight size={24} className="text-white" aria-hidden="true" />
      </button>

      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2"
        role="tablist"
        aria-label="Slide indicators"
      >
        {HERO_SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === activeIndex ? 'bg-white w-6 h-2.5' : 'bg-white/50 hover:bg-white/70 w-2.5 h-2.5'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

HeroSlider.displayName = 'HeroSlider';

export default HeroSlider;
