import { useEffect } from 'react';

/**
 * Sets page title and meta description for SEO.
 */
export function useSEO({ title, description, keywords = [] }) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'description';
        document.head.appendChild(meta);
      }
      meta.content = description;
    }

    if (keywords.length > 0) {
      let meta = document.querySelector('meta[name="keywords"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'keywords';
        document.head.appendChild(meta);
      }
      meta.content = keywords.join(', ');
    }
  }, [title, description, keywords]);
}

export default useSEO;
