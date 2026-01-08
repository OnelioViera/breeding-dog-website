import { useEffect, useState } from 'react';
import { getPageBySlug, type Page } from '../../lib/payload';
import RichText from './RichText';

interface PageViewProps {
  slug: string;
}

export function PageView({ slug }: PageViewProps) {
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    const fetchPage = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('PageView: Fetching page with slug:', slug);
        const pageData = await getPageBySlug(slug);
        console.log('PageView: Received page data:', pageData);
        if (pageData) {
          setPage(pageData);
        } else {
          console.log('PageView: No page data returned, setting error');
          setError('Page not found');
        }
      } catch (err) {
        console.error('PageView: Error fetching page:', err);
        setError('Failed to load page');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPage();
    } else {
      setError('Invalid page slug');
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-gray-600">Loading page...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h1 className="mb-4 text-4xl text-gray-800">Page Not Found</h1>
            <p className="text-gray-600">{error || 'The page you are looking for does not exist.'}</p>
            <a
              href="/"
              className="mt-6 inline-block rounded-lg bg-amber-600 px-6 py-3 text-white transition-colors hover:bg-amber-700"
            >
              Go Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <article className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="mb-6 text-4xl font-bold text-gray-800">{page.title}</h1>
          {page.content && (
            <div className="prose prose-lg max-w-none">
              <RichText content={page.content} />
            </div>
          )}
          {!page.content && (
            <div className="text-gray-600">
              <p>This is a test page. Content will be displayed here once you add it in Payload CMS.</p>
              <p className="mt-4">To edit this page, go to Payload Admin → Collections → Pages → Edit "{page.title}"</p>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}

