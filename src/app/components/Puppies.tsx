import { ImageWithFallback } from './figma/ImageWithFallback';
import { Heart, Calendar, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getPuppies, type Puppy } from '../../lib/payload';
import { PuppyInquiryModal } from './PuppyInquiryModal';

export function Puppies() {
  const [puppies, setPuppies] = useState<Puppy[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPuppy, setSelectedPuppy] = useState<Puppy | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPuppies = async () => {
      try {
        const data = await getPuppies();
        console.log('Fetched puppies:', data); // Debug log
        setPuppies(data);
      } catch (error) {
        console.error('Error loading puppies:', error);
        // Fallback to empty array if API fails
        setPuppies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPuppies();
  }, []);
  return (
    <section id="puppies" className="bg-gray-50 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl text-gray-800">Available Puppies</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            All our Australian Labradoodles are health tested, vaccinated, and come with a comprehensive health guarantee.
            They're raised in our home with lots of love, socialization, and early neurological stimulation.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading puppies...</p>
          </div>
        ) : puppies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No puppies available at this time. Please check back soon!</p>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-8">
            {puppies.map((puppy) => (
            <div
              key={puppy.id}
              className="w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:scale-105 md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)]"
            >
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={puppy.image}
                  alt={puppy.name}
                  className="h-full w-full object-cover"
                />
                {puppy.available ? (
                  <div className="absolute right-4 top-4 rounded-full bg-green-500 px-4 py-1 text-sm text-white">
                    Available
                  </div>
                ) : (
                  <div className="absolute right-4 top-4 rounded-full bg-red-500 px-4 py-1 text-sm text-white">
                    Reserved
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="mb-2 text-2xl text-gray-800">{puppy.name}</h3>
                <p className="mb-4 text-amber-600">{puppy.breed}</p>
                
                <div className="mb-4 space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{puppy.age} old</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart size={16} />
                    <span>{puppy.gender}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>Ready to go home</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between border-t pt-4">
                  <span className="text-2xl text-amber-700">{puppy.price}</span>
                  <button
                    onClick={() => {
                      if (puppy.available) {
                        setSelectedPuppy(puppy);
                        setIsModalOpen(true);
                      }
                    }}
                    disabled={!puppy.available}
                    className={`rounded-lg px-6 py-2 transition-colors ${
                      puppy.available
                        ? 'bg-amber-600 text-white hover:bg-amber-700'
                        : 'cursor-not-allowed bg-gray-300 text-gray-500'
                    }`}
                  >
                    {puppy.available ? 'Inquire' : 'Reserved'}
                  </button>
                </div>
              </div>
            </div>
            ))}
          </div>
        )}
      </div>
      
      <PuppyInquiryModal
        puppy={selectedPuppy}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </section>
  );
}