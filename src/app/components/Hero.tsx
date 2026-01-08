import { ImageWithFallback } from './figma/ImageWithFallback';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1571999001321-f54197a02cc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWJyYWRvb2RsZSUyMHB1cHB5fGVufDF8fHx8MTc2Nzc1NzY0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Australian Labradoodle Puppy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="mb-4 text-5xl md:text-7xl">Australian Labradoodles</h1>
        <p className="mb-8 max-w-2xl text-xl md:text-2xl">
          Premium Australian Labradoodle breeders specializing in healthy, hypoallergenic family companions
        </p>
        <button
          onClick={() => scrollToSection('puppies')}
          className="rounded-full bg-amber-600 px-8 py-4 text-lg transition-colors hover:bg-amber-700"
        >
          View Available Puppies
        </button>
        
        <button
          onClick={() => scrollToSection('puppies')}
          className="absolute bottom-8 animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown size={40} />
        </button>
      </div>
    </div>
  );
}