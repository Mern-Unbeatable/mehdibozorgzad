import React, { memo, useEffect, useState } from 'react';
import { ArrowLeft, Camera } from 'lucide-react';
import FlooringContactSection from './FlooringContactSection';
import { displayLabel } from '../../../utils/display';

const scrollToContactForm = () => {
  document.getElementById('flooring-contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const FlooringProductDetailSection = memo(
  ({
    product,
    tab,
    allTabProducts,
    onBack,
    onSelect,
    ProductCard,
    getProductSpecs,
    tabDescriptions,
    tabColorLabels,
    getProductColorValue,
    floorSwatches,
    wallSwatches,
  }) => {
    const [activeThumb, setActiveThumb] = useState(0);

    useEffect(() => {
      if (window.location.hash === '#flooring-contact') {
        scrollToContactForm();
      }
    }, [product.id]);

    const relatedProducts = allTabProducts
      .filter((item) => item.id !== product.id)
      .slice(0, tab === 'floors' ? 4 : 3);

    const thumbImages = [
      product.image,
      ...allTabProducts
        .filter((item) => item.id !== product.id)
        .slice(0, 5)
        .map((item) => item.image),
    ];

    const specs = getProductSpecs(product, tab);
    const description = tabDescriptions[tab];
    const colorLabel = tabColorLabels[tab];
    const colorValue = getProductColorValue(tab);

    const showFloorSwatches = tab === 'floors';
    const showWallSwatches = tab === 'walls';
    const showCountertopSwatches = tab === 'countertops';
    const countertopSwatchImages = allTabProducts.map((item) => item.image);

    return (
      <div className=" bg-white">
        <div className="container mx-auto px-4 py-14 md:py-16 lg:py-20">
          <button
            type="button"
            onClick={onBack}
            className="mb-10 flex items-center gap-2 font-['Lato'] text-base text-[#4c4946] transition-colors hover:text-[#0d0b0a]"
          >
            <ArrowLeft size={18} aria-hidden="true" />
            Back to Products
          </button>

          <div className="mb-14 flex flex-col items-start gap-10 lg:flex-row lg:gap-16">
            <div className="flex w-full flex-col gap-4 lg:w-1/2">
              <div className="relative h-80 overflow-hidden rounded-xl bg-gray-100 lg:h-158.5">
                <img
                  src={thumbImages[activeThumb] ?? product.image}
                  alt={product.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                  <button
                    type="button"
                    className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-[#2b2b2b] px-4 py-3 font-['Lato'] text-sm uppercase tracking-[0.4px] text-white transition-colors hover:bg-[#3d3d3d]"
                  >
                    <Camera size={20} aria-hidden="true" />
                    Expand to Full Experience
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {thumbImages.slice(0, 6).map((src, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveThumb(index)}
                    className={`h-24 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-colors ${
                      activeThumb === index
                        ? 'border-[#0d0b0a]'
                        : 'border-[#918b8b] hover:border-[#0d0b0a]'
                    }`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex w-full flex-col gap-6 lg:w-1/2">
              <div className="flex flex-col gap-2">
                <p className="font-['Lato'] text-base font-normal leading-normal text-[#696664]">
                  {displayLabel(product.brand)}
                </p>
                <h1 className="font-['Playfair_Display'] text-3xl font-semibold leading-tight text-[#0d0b0a] lg:text-[32px]">
                  {product.name}
                </h1>
              </div>

              <p className="font-['Lato'] text-base font-normal leading-normal text-[#161311]">
                {colorLabel}: {colorValue}
              </p>

              {showFloorSwatches && (
                <div className="flex flex-col gap-3">
                  {[0, 1, 2].map((row) => (
                    <div key={row} className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                      {floorSwatches
                        .slice(row * 6, row * 6 + (row === 2 ? floorSwatches.length - 12 : 6))
                        .map((cls, colorIndex) => (
                          <button
                            key={colorIndex}
                            type="button"
                            aria-label={`Color option ${row * 6 + colorIndex + 1}`}
                            className={`h-20 rounded ${cls}`}
                          />
                        ))}
                    </div>
                  ))}
                </div>
              )}

              {showWallSwatches && (
                <div className="flex gap-3">
                  {wallSwatches.map((cls, index) => (
                    <button
                      key={index}
                      type="button"
                      aria-label={`Color option ${index + 1}`}
                      className={`h-20 flex-1 rounded ${cls}`}
                    />
                  ))}
                </div>
              )}

              {showCountertopSwatches && (
                <div className="flex flex-col gap-3">
                  {[0, 1, 2].map((row) => (
                    <div key={row} className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                      {countertopSwatchImages
                        .slice(row * 6, row * 6 + (row === 2 ? 4 : 6))
                        .map((src, index) => (
                          <div key={index} className="h-20 overflow-hidden rounded bg-gray-100">
                            <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-2 flex flex-col gap-4">
                <p className="font-['Lato'] text-base font-normal leading-normal text-[#696664]">
                  Interested in learning more?
                </p>
                <button
                  type="button"
                  onClick={scrollToContactForm}
                  className="h-14 w-full whitespace-nowrap rounded-lg bg-[#2b2b2b] px-8 text-center font-['Lato'] text-base uppercase tracking-[0.4px] text-white transition-colors hover:bg-[#3d3d3d] sm:min-w-55 sm:w-auto cursor-pointer"
                >
                  Request an Estimate
                </button>
              </div>
            </div>
          </div>

          {description && (
            <div className="mb-12 flex flex-col gap-6">
              <h2 className="font-['Playfair_Display'] text-[32px] font-semibold leading-tight text-[#0d0b0a]">
                Product Description
              </h2>
              <p className="font-['Lato'] text-base font-normal leading-relaxed text-[#4c4946]">
                {description}
              </p>
            </div>
          )}

          <div className="mb-16 flex flex-col gap-6">
            <h2 className="font-['Playfair_Display'] text-[32px] font-semibold leading-tight text-[#0d0b0a]">
              Specifications
            </h2>
            <div className="flex w-full flex-col">
              {specs.map(([label, value], index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between px-8 py-4 ${
                    index === 0
                      ? 'border border-[rgba(0,0,0,0.3)]'
                      : 'border-b border-l border-r border-[rgba(0,0,0,0.3)]'
                  }`}
                >
                  <span className="font-['Lato'] text-base font-normal leading-normal text-[#161311]">
                    {label}
                  </span>
                  <span className="text-right font-['Lato'] text-base font-normal leading-normal text-[#161311]">
                    {displayLabel(value)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <div className="mb-16 flex flex-col gap-8">
              <h2 className="font-['Playfair_Display'] text-[32px] font-semibold leading-tight text-[#0d0b0a]">
                Other Products You Might Like
              </h2>
              <div
                className={`grid grid-cols-1 gap-5 sm:grid-cols-2 ${
                  tab === 'floors' ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
                }`}
              >
                {relatedProducts.map((item) => (
                  <ProductCard key={item.id} product={item} tab={tab} onSelect={onSelect} />
                ))}
              </div>
            </div>
          )}

          <FlooringContactSection />
        </div>
      </div>
    );
  },
);

FlooringProductDetailSection.displayName = 'FlooringProductDetailSection';

export default FlooringProductDetailSection;
