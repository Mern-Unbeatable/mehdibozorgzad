import React from 'react';

const ProductSkeleton = () => (
  <div className="bg-white border border-black/15 rounded-lg p-4 flex flex-col gap-6 animate-pulse">
    <div className="h-72 bg-gray-200 rounded" />
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="h-5 bg-gray-200 rounded w-1/3" />
        <div className="h-7 bg-gray-200 rounded w-2/3" />
        <div className="h-5 bg-gray-200 rounded w-1/4" />
      </div>
      <div className="h-12 bg-gray-200 rounded" />
    </div>
  </div>
);

export default ProductSkeleton;
