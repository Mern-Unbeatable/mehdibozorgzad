import React, { memo } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const Pagination = memo(({ currentPage, totalPages, onPageChange }) => {
  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  const buildPages = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages = [1];
    if (currentPage > 3) pages.push('...');
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
    return pages;
  };

  const btnBase =
    'size-8 flex items-center justify-center rounded-lg border border-[#f1f1f1] bg-white text-[#333] transition-colors hover:bg-gray-50';

  return (
    <nav className="flex items-center gap-1" aria-label="Pagination">
      <button
        type="button"
        className={`${btnBase} ${!canPrev ? 'opacity-40 cursor-not-allowed' : ''}`}
        onClick={() => canPrev && onPageChange(1)}
        disabled={!canPrev}
        aria-label="First page"
      >
        <ChevronsLeft size={14} aria-hidden="true" />
      </button>
      <button
        type="button"
        className={`${btnBase} ${!canPrev ? 'opacity-40 cursor-not-allowed' : ''}`}
        onClick={() => canPrev && onPageChange(currentPage - 1)}
        disabled={!canPrev}
        aria-label="Previous page"
      >
        <ChevronLeft size={14} aria-hidden="true" />
      </button>

      {buildPages().map((page, idx) =>
        page === '...' ? (
          <span
            key={`ellipsis-${idx}`}
            className="size-8 flex items-center justify-center text-sm text-[#333]"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            type="button"
            className={`size-8 flex items-center justify-center rounded-lg text-sm font-semibold font-['Lato'] transition-colors ${
              page === currentPage
                ? 'bg-[#1c1916] text-white border border-[#1c1916]'
                : 'bg-white border border-[#f1f1f1] text-[#333] hover:bg-gray-50'
            }`}
            onClick={() => onPageChange(page)}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ),
      )}

      <button
        type="button"
        className={`${btnBase} ${!canNext ? 'opacity-40 cursor-not-allowed' : ''}`}
        onClick={() => canNext && onPageChange(currentPage + 1)}
        disabled={!canNext}
        aria-label="Next page"
      >
        <ChevronRight size={14} aria-hidden="true" />
      </button>
      <button
        type="button"
        className={`${btnBase} ${!canNext ? 'opacity-40 cursor-not-allowed' : ''}`}
        onClick={() => canNext && onPageChange(totalPages)}
        disabled={!canNext}
        aria-label="Last page"
      >
        <ChevronsRight size={14} aria-hidden="true" />
      </button>
    </nav>
  );
});

Pagination.displayName = 'Pagination';

export default Pagination;
