export function Footer() {
  return (
    <footer className="bg-gray-900 px-4 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4 text-2xl">🐾 Aussie Doodle Haven</div>
            <p className="text-gray-400">
              Breeding exceptional Australian Labradoodles since 2009. Raising healthy, hypoallergenic puppies with love and dedication.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#home" className="transition-colors hover:text-amber-400">
                  Home
                </a>
              </li>
              <li>
                <a href="#puppies" className="transition-colors hover:text-amber-400">
                  Available Puppies
                </a>
              </li>
              <li>
                <a href="#about" className="transition-colors hover:text-amber-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="transition-colors hover:text-amber-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg">Contact Info</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Sacramento, California</li>
              <li>(555) 123-4567</li>
              <li>info@premiumpaws.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2026 Aussie Doodle Haven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}