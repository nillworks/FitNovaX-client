import Image from 'next/image';
import React from 'react';

const features = [
  {
    id: 1,
    title: 'Book Classes Seamlessly',
    description:
      'Browse through hundreds of available sessions and secure your spot with just a single tap. Our intuitive interface ensures you never miss a beat.',
    image:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1470&auto=format&fit=crop',
    tags: ['Instant Booking', 'Calendar Sync'],
  },
  {
    id: 2,
    title: 'Trainer Dashboard',
    description:
      'Empower your coaching business with advanced analytics, client management tools, and schedule overviews tailored for top-tier trainers.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop',
    tags: ['Analytics', 'Client Management'],
  },
  {
    id: 3,
    title: 'Track Your Progress',
    description:
      'Visualize your fitness journey with detailed charts, milestone tracking, and personalized insights to keep you motivated every step of the way.',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1415&auto=format&fit=crop',
    tags: ['Goal Setting', 'Performance Metrics'],
  },
];

const AppFeatures = () => {
  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1E293B] tracking-tight mb-4">
            Everything You Need,{' '}
            <span className="text-[#22C55E]">All in One Place</span>
          </h2>
          <p className="text-[#64748B] text-lg leading-relaxed">
            Discover the powerful tools designed to elevate your fitness
            experience and simplify your routine.
          </p>
        </div>

        <div className="space-y-24">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}
            >
              <div className="flex-1 w-full relative">
                <div className="absolute inset-0 bg-[#22C55E]/10 rounded-[3rem] transform rotate-3 blur-sm"></div>
                <div className="relative rounded-[3rem] overflow-hidden border border-[#E2E8F0] shadow-2xl aspect-[4/3]">
                  <Image
                    width={400}
                    height={400}
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 w-full space-y-6">
                <h3 className="text-3xl lg:text-4xl font-bold text-[#1E293B] tracking-tight leading-tight">
                  {feature.title}
                </h3>
                <p className="text-[#64748B] text-lg leading-relaxed">
                  {feature.description}
                </p>
                <div className="flex flex-wrap gap-3 pt-4">
                  {feature.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 rounded-full bg-[#C6F4D6] text-[#15803D] font-bold text-sm tracking-tight"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppFeatures;
