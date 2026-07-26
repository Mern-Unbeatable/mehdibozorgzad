import React, { memo } from 'react';

const PhotoStrip = memo(({ row1, row2, badgeImg }) => (
  <section className="overflow-hidden relative">
    <div className="flex gap-1">
      {row1.map((src, i) => (
        <img key={i} src={src} alt="" className="h-52 lg:h-72 flex-1 object-cover min-w-0" />
      ))}
    </div>
    <div className="flex gap-1 mt-1">
      {row2.map((src, i) => (
        <img key={i} src={src} alt="" className="h-52 lg:h-64 flex-1 object-cover min-w-0" />
      ))}
    </div>
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <img src={badgeImg} alt="badge" className="w-40 h-40 lg:w-52 lg:h-52 object-contain" />
    </div>
  </section>
));

PhotoStrip.displayName = 'PhotoStrip';
export default PhotoStrip;
