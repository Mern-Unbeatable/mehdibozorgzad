import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const getUniqueImages = (images = []) => [...new Set((images ?? []).filter(Boolean))];

const ImageLightbox = memo(({ images, activeIndex, onClose, onNavigate }) => {
  useEffect(() => {
    if (activeIndex === null || !images[activeIndex]) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') onNavigate(-1);
      if (event.key === 'ArrowRight') onNavigate(1);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, images, onClose, onNavigate]);

  if (activeIndex === null || !images[activeIndex]) return null;

  const hasMultiple = images.length > 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-10"
        aria-label="Close preview"
      >
        <X size={24} aria-hidden="true" />
      </button>

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onNavigate(-1);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={28} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onNavigate(1);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-10"
            aria-label="Next image"
          >
            <ChevronRight size={28} aria-hidden="true" />
          </button>
        </>
      )}

      <img
        src={images[activeIndex]}
        alt={`Project image ${activeIndex + 1} of ${images.length}`}
        className="max-h-[90vh] max-w-[min(90vw,1200px)] object-contain select-none"
        onClick={(event) => event.stopPropagation()}
      />

      {hasMultiple && (
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm font-['Lato']">
          {activeIndex + 1} / {images.length}
        </p>
      )}
    </div>
  );
});

ImageLightbox.displayName = 'ImageLightbox';

const ProjectGalleryMosaicSection = memo(({ images = [] }) => {
  const galleryImages = useMemo(() => getUniqueImages(images), [images]);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const navigateLightbox = useCallback(
    (direction) => {
      setLightboxIndex((current) => {
        if (current === null || galleryImages.length === 0) return current;
        return (current + direction + galleryImages.length) % galleryImages.length;
      });
    },
    [galleryImages.length],
  );

  if (galleryImages.length === 0) return null;

  return (
    <>
      <section className="pt-14 md:pt-16 lg:pt-20 pb-14 md:pb-16 lg:pb-20">
        <div className="container mx-auto px-4">
          <h2 className="font-['Playfair_Display'] font-semibold text-[#0e1526] text-2xl md:text-3xl lg:text-4xl leading-tight mb-6">
            Project Gallery
          </h2>

          <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-3 md:gap-4 w-max pb-1">
              {galleryImages.map((src, index) => (
                <button
                  key={`${src}-${index}`}
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  className="relative shrink-0 w-56 sm:w-64 md:w-72 lg:w-80 h-40 sm:h-48 md:h-52 lg:h-56 rounded-xl overflow-hidden border border-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0d0b0a] cursor-pointer group"
                  aria-label={`View project image ${index + 1}`}
                >
                  <img
                    src={src}
                    alt={`Project gallery image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <ImageLightbox
          images={galleryImages}
          activeIndex={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={navigateLightbox}
        />
      )}
    </>
  );
});

ProjectGalleryMosaicSection.displayName = 'ProjectGalleryMosaicSection';

export default ProjectGalleryMosaicSection;
