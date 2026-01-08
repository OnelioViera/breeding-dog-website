import { ImageWithFallback } from './figma/ImageWithFallback';
import { useEffect, useState } from 'react';
import { getGalleryImages, type GalleryImage } from '../../lib/payload';

export function Gallery() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const data = await getGalleryImages();
        console.log('Fetched gallery images:', data); // Debug log
        setGalleryImages(data);
      } catch (error) {
        console.error('Error loading gallery images:', error);
        setGalleryImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  return (
    <section id="gallery" className="bg-gray-50 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl text-gray-800">Gallery</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Meet some of our beautiful Australian Labradoodles and their families
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading gallery...</p>
          </div>
        ) : galleryImages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No gallery images available at this time.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((image) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105"
              >
                <div className="aspect-square">
                  <ImageWithFallback
                    src={image.image}
                    alt={image.title || 'Gallery image'}
                    className="h-full w-full object-cover transition-transform group-hover:scale-110"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
