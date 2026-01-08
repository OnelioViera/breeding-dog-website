import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { getPuppies, getNavbarDropdownData, type Puppy, type NavbarDropdownData } from '../../lib/payload';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPuppiesDropdownOpen, setIsPuppiesDropdownOpen] = useState(false);
  const [puppies, setPuppies] = useState<Puppy[]>([]);
  const [navbarData, setNavbarData] = useState<NavbarDropdownData | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const [puppiesData, navbarDropdownData] = await Promise.all([
        getPuppies(),
        getNavbarDropdownData(),
      ]);
      setPuppies(puppiesData);
      setNavbarData(navbarDropdownData);
      console.log('Navbar dropdown data loaded:', navbarDropdownData); // Debug log
    };
    fetchData();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsPuppiesDropdownOpen(false);
      }
    };

    if (isPuppiesDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isPuppiesDropdownOpen]);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    setIsPuppiesDropdownOpen(false);
    
    // Check if we're on a custom page (not home)
    const currentPath = window.location.pathname;
    if (currentPath !== '/' && currentPath !== '') {
      // Navigate to home with hash, then scroll to section
      window.history.pushState({}, '', `/#${id}`);
      window.dispatchEvent(new CustomEvent('routechange', { detail: { path: '/' } }));
      window.dispatchEvent(new PopStateEvent('popstate'));
      
      // Wait a bit for the page to render, then scroll
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
    } else {
      // We're already on home, just scroll
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        // If element not found, try again after a short delay (in case page is still loading)
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
  };

  const handleLinkClick = (link: string, openInNewTab?: boolean) => {
    setIsPuppiesDropdownOpen(false);
    setIsOpen(false);
    
    if (openInNewTab) {
      window.open(link, '_blank', 'noopener,noreferrer');
      return;
    }
    
    // Normalize the link - ensure relative paths start with /
    let normalizedLink = link;
    if (!link.startsWith('#') && !link.startsWith('http') && !link.startsWith('/')) {
      normalizedLink = `/${link}`;
    }
    
    // If it's a hash link (internal section), scroll to it
    if (normalizedLink.startsWith('#')) {
      const id = normalizedLink.substring(1);
      scrollToSection(id);
    } else if (normalizedLink.startsWith('/')) {
      // Internal page link - use pushState for SPA navigation
      console.log('Navigating to:', normalizedLink);
      window.history.pushState({}, '', normalizedLink);
      // Dispatch custom event to notify App component of route change
      window.dispatchEvent(new CustomEvent('routechange', { detail: { path: normalizedLink } }));
      // Also dispatch popstate for browser compatibility
      window.dispatchEvent(new PopStateEvent('popstate'));
    } else {
      // External link
      window.location.href = normalizedLink;
    }
  };

  // Get unique litters from puppies
  const litters = Array.from(new Set(puppies.filter(p => p.litter).map(p => p.litter!))).sort();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' }
  ];

  const puppiesButtonTitle = navbarData?.buttonTitle || 'Puppies';

  return (
    <nav className="fixed top-0 z-50 w-full bg-white/95 shadow-md backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <div className="text-2xl text-amber-700">🐾 Aussie Doodle Haven</div>
        
        {/* Desktop Navigation */}
        <div className="hidden gap-8 md:flex items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-gray-700 transition-colors hover:text-amber-600"
            >
              {item.label}
            </button>
          ))}
          
          {/* Puppies Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsPuppiesDropdownOpen(!isPuppiesDropdownOpen)}
              className="flex items-center gap-1 text-gray-700 transition-colors hover:text-amber-600"
            >
              {puppiesButtonTitle}
              <ChevronDown size={16} className={`transition-transform ${isPuppiesDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isPuppiesDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 max-h-96 overflow-y-auto">
                {navbarData?.showAvailablePuppies && (
                  <button
                    onClick={() => scrollToSection('puppies')}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                  >
                    {navbarData.availablePuppiesLabel}
                  </button>
                )}
                
                {/* Custom Items */}
                {navbarData?.customItems && navbarData.customItems.length > 0 && (
                  <>
                    {(navbarData?.showAvailablePuppies || litters.length > 0) && (
                      <div className="border-t border-gray-200 my-1"></div>
                    )}
                    {navbarData.customItems.map((item, index) => {
                      if (!item.title || !item.link) return null; // Skip invalid items
                      return (
                        <button
                          key={`custom-${index}-${item.title}`}
                          onClick={() => handleLinkClick(item.link, item.openInNewTab)}
                          className="w-full px-4 py-2 text-left text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                        >
                          {item.title}
                        </button>
                      );
                    })}
                  </>
                )}
                
                {/* Litters */}
                {litters.length > 0 && (
                  <>
                    {(navbarData?.showAvailablePuppies || (navbarData?.customItems && navbarData.customItems.length > 0)) && (
                      <div className="border-t border-gray-200 my-1"></div>
                    )}
                    {litters.map((litter) => (
                      <button
                        key={litter}
                        onClick={() => scrollToSection('puppies')}
                        className="w-full px-4 py-2 text-left text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                      >
                        {litter}
                      </button>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t bg-white md:hidden">
          <div className="flex flex-col px-4 py-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="py-3 text-left text-gray-700 transition-colors hover:text-amber-600"
              >
                {item.label}
              </button>
            ))}
            
            {/* Mobile Puppies Dropdown */}
            <div className="border-t border-gray-200 mt-2 pt-2">
              <button
                onClick={() => setIsPuppiesDropdownOpen(!isPuppiesDropdownOpen)}
                className="flex items-center justify-between w-full py-3 text-left text-gray-700 transition-colors hover:text-amber-600"
              >
                {puppiesButtonTitle}
                <ChevronDown size={16} className={`transition-transform ${isPuppiesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isPuppiesDropdownOpen && (
                <div className="pl-4 mt-2 space-y-1">
                  {navbarData?.showAvailablePuppies && (
                    <button
                      onClick={() => scrollToSection('puppies')}
                      className="block w-full py-2 text-left text-gray-600 hover:text-amber-600 transition-colors"
                    >
                      {navbarData.availablePuppiesLabel}
                    </button>
                  )}
                  
                  {/* Custom Items */}
                  {navbarData?.customItems && navbarData.customItems.length > 0 && (
                    <>
                      {navbarData?.showAvailablePuppies && <div className="border-t border-gray-200 my-1"></div>}
                      {navbarData.customItems.map((item, index) => {
                        if (!item.title || !item.link) return null; // Skip invalid items
                        return (
                          <button
                            key={`custom-mobile-${index}-${item.title}`}
                            onClick={() => handleLinkClick(item.link, item.openInNewTab)}
                            className="block w-full py-2 text-left text-gray-600 hover:text-amber-600 transition-colors"
                          >
                            {item.title}
                          </button>
                        );
                      })}
                    </>
                  )}
                  
                  {/* Litters */}
                  {litters.length > 0 && (
                    <>
                      {(navbarData?.showAvailablePuppies || (navbarData?.customItems && navbarData.customItems.length > 0)) && (
                        <div className="border-t border-gray-200 my-1"></div>
                      )}
                      {litters.map((litter) => (
                        <button
                          key={litter}
                          onClick={() => scrollToSection('puppies')}
                          className="block w-full py-2 text-left text-gray-600 hover:text-amber-600 transition-colors"
                        >
                          {litter}
                        </button>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}