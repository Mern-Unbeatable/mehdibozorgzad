import React, { memo } from 'react';
import { Star } from 'lucide-react';

const StarRow = memo(({ count = 5, size = 16 }) => (
  <div className="flex gap-1" aria-label={`${count} out of 5 stars`} role="img">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} size={size} className="text-yellow-400 fill-yellow-400" aria-hidden="true" />
    ))}
  </div>
));

StarRow.displayName = 'StarRow';

export default StarRow;
