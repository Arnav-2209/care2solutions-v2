import { useEffect } from 'react';

/**
 * Sets document.title and the existing <meta name="description"> tag.
 * No library needed — matches the project's zero-dependency SEO approach.
 */
export function useSEO(title: string, description: string): void {
  useEffect(() => {
    // Set page title
    const previousTitle = document.title;
    document.title = title;

    // Update existing meta description
    let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDesc = metaDesc?.getAttribute('content') ?? '';

    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    return () => {
      document.title = previousTitle;
      if (metaDesc) metaDesc.setAttribute('content', previousDesc);
    };
  }, [title, description]);
}
