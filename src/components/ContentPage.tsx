import React, { useEffect } from 'react';
import { SeoPage, renderArticleHtml } from '../seo/pages';

interface ContentPageProps {
  page: SeoPage;
  onOpenConsultation: () => void;
}

// Standalone page for a service, location, project or guide. The markup comes
// from renderArticleHtml(), the same function the build-time prerenderer uses,
// so crawlers and visitors receive identical content.
export const ContentPage: React.FC<ContentPageProps> = ({ page, onOpenConsultation }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page.path]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = (e.target as HTMLElement).closest('a');
    if (target && target.classList.contains('seo-cta-link')) {
      e.preventDefault();
      onOpenConsultation();
    }
  };

  return (
    <div className="seo-page" onClick={handleClick}>
      <article
        className="seo-article"
        dangerouslySetInnerHTML={{ __html: renderArticleHtml(page) }}
      />
    </div>
  );
};
