import React from 'react';

const DocumentSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 animate-pulse">
      {/* Document Header Skeleton */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            {/* Title Skeleton */}
            <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
            {/* Category Badge Skeleton */}
            <div className="h-5 bg-gray-200 rounded-full w-20"></div>
          </div>
        </div>
        
        {/* Description Skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
        
        {/* Metadata Skeleton */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-32"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </div>

      {/* Action Buttons Skeleton */}
      <div className="px-6 pb-6">
        <div className="flex gap-2">
          <div className="flex-1 h-10 bg-gray-200 rounded-md"></div>
          <div className="w-12 h-10 bg-gray-200 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

// Grid of skeletons
export const DocumentSkeletonGrid: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }, (_, index) => (
        <DocumentSkeleton key={index} />
      ))}
    </div>
  );
};

export default DocumentSkeleton;