import { ImageWithFallback } from './figma/ImageWithFallback';
import { Award, Heart, Shield, Home } from 'lucide-react';

export function About() {
  const features = [
    {
      icon: Award,
      title: 'ALAA Certified',
      description: 'Australian Labradoodle Association of America registered breeder'
    },
    {
      icon: Heart,
      title: 'Health Tested',
      description: 'All breeding dogs undergo comprehensive health testing and genetic screening'
    },
    {
      icon: Shield,
      title: 'Hypoallergenic',
      description: 'Low to non-shedding coats perfect for families with allergies'
    },
    {
      icon: Home,
      title: 'Guardian Program',
      description: 'Our puppies are raised in loving guardian homes for optimal socialization'
    }
  ];

  return (
    <section id="about" className="bg-white px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl text-gray-800">About Our Australian Labradoodles</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Specializing in multi-generational Australian Labradoodles with exceptional temperaments and health
          </p>
        </div>

        <div className="mb-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-amber-100 p-4">
                    <Icon className="text-amber-600" size={32} />
                  </div>
                </div>
                <h3 className="mb-2 text-xl text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <h3 className="mb-4 text-3xl text-gray-800">Our Story</h3>
            <p className="mb-4 text-gray-600">
              Aussie Doodle Haven was founded in 2009 with a passion for the Australian Labradoodle breed.
              We specialize in breeding multi-generational Australian Labradoodles that are not only beautiful
              but also possess the wonderful temperament and hypoallergenic qualities that make them perfect
              family companions.
            </p>
            <p className="mb-4 text-gray-600">
              Our breeding program focuses on health, temperament, and conformation. All our parent dogs
              undergo extensive health testing including hips, elbows, eyes, and genetic testing. We carefully
              select our breeding pairs to produce puppies with excellent structure, non-shedding fleece or
              wool coats, and the gentle, intelligent temperament Australian Labradoodles are known for.
            </p>
            <p className="text-gray-600">
              Each puppy receives Early Neurological Stimulation, is raised with Puppy Culture protocols,
              and comes home to you well-socialized, crate trained, and ready to be your lifelong companion.
              We provide lifetime breeder support and love staying connected with our puppy families.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1695193984598-2cbfd23c6b0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWJyYWRvb2RsZSUyMGZhbWlseXxlbnwxfHx8fDE3Njc3NTc2NTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Labradoodle family"
              className="h-full w-full rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}