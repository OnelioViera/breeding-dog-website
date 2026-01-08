import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Puppies } from './components/Puppies';
import { About } from './components/About';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { PageView } from './components/Page';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string | null>(null);

  const updateCurrentPage = () => {
    const path = window.location.pathname;
    console.log('App: Current pathname:', path);
    if (path !== '/' && path !== '') {
      const slug = path.substring(1); // Remove leading slash
      console.log('App: Setting current page to:', slug);
      setCurrentPage(slug);
      // Scroll to top when navigating to a new page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      console.log('App: Setting current page to null (home)');
      setCurrentPage(null);
    }
  };

  useEffect(() => {
    // Check if we're on a page route on initial load
    updateCurrentPage();

    // Listen for popstate events (back/forward button)
    const handlePopState = () => {
      updateCurrentPage();
      // If navigating to home with a hash, scroll to the section
      const hash = window.location.hash;
      if (hash && window.location.pathname === '/') {
        setTimeout(() => {
          const id = hash.substring(1);
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    };

    // Listen for custom routechange events (programmatic navigation)
    const handleRouteChange = () => {
      updateCurrentPage();
      // If navigating to home with a hash, scroll to the section
      const hash = window.location.hash;
      if (hash && window.location.pathname === '/') {
        setTimeout(() => {
          const id = hash.substring(1);
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('routechange', handleRouteChange);
    
    // Handle initial hash on page load
    if (window.location.hash && window.location.pathname === '/') {
      setTimeout(() => {
        const id = window.location.hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('routechange', handleRouteChange);
    };
  }, []);

  // If we're on a page route, show the page
  if (currentPage) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <PageView slug={currentPage} />
        <Footer />
      </div>
    );
  }

  // Otherwise, show the home page
  return (
    <div className="min-h-screen">
      <Navigation />
      <main id="home">
        <Hero />
        <Puppies />
        <About />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
