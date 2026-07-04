'use client';

import Image from 'next/image';
import React from 'react';
import { FadeUp } from '../Animations/MotionWrappers';
import { CalendarCheck, Users, Activity, CheckCircle2, Sparkles } from 'lucide-react';

const features = [
  {
    id: 1,
    title: 'Book Classes Seamlessly',
    description:
      'Browse through hundreds of available sessions and secure your spot with just a single tap. Our intuitive interface ensures you never miss a beat in your fitness journey.',
    image:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1470&auto=format&fit=crop',
    bullets: ['Instant class booking', 'Real-time availability', 'Smart calendar sync'],
    icon: CalendarCheck,
    color: 'text-[#16A34A]',
    bgColor: 'bg-[#22C55E]/5',
    iconBg: 'bg-[#22C55E]/10',
  },
  {
    id: 2,
    title: 'Trainer Dashboard',
    description:
      'Empower your coaching business with advanced analytics, seamless client management tools, and personalized workout planning capabilities.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop',
    bullets: ['Client progress tracking', 'Revenue analytics', 'Custom workout plans'],
    icon: Users,
    color: 'text-[#16A34A]',
    bgColor: 'bg-[#22C55E]/5',
    iconBg: 'bg-[#22C55E]/10',
  },
  {
    id: 3,
    title: 'Track Your Progress',
    description:
      'Visualize your fitness journey with detailed charts, milestone tracking, and daily insights to keep you motivated and on track.',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1415&auto=format&fit=crop',
    bullets: ['Goal setting & tracking', 'Visual milestone charts', 'Personalized insights'],
    icon: Activity,
    color: 'text-[#16A34A]',
    bgColor: 'bg-[#22C55E]/5',
    iconBg: 'bg-[#22C55E]/10',
  },
];

const AppFeatures = () => {
  return (
    <section className="py-24 bg-[#F8FAFC] relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        <FadeUp className="text-center max-w-3xl mx-auto mb-20 md:mb-28">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#22C55E]/20 text-[#16A34A] font-medium text-sm mb-6 shadow-sm shadow-[#22C55E]/5">
            <Sparkles className="w-4 h-4 text-[#22C55E]" />
            <span>Platform Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight mb-6">
            Designed for Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22C55E] to-[#15803D]">
              Success
            </span>
          </h2>
          <p className="text-[#64748B] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Everything you need to manage your fitness journey or coaching business, packaged in a beautiful, easy-to-use interface.
          </p>
        </FadeUp>

        <div className="space-y-24 md:space-y-32">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isEven = index % 2 !== 0;

            return (
              <div 
                key={feature.id} 
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${isEven ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Image Section */}
                <FadeUp 
                  delay={0.1} 
                  className="w-full lg:w-1/2 relative"
                >
                  <div className={`absolute inset-0 rounded-[2.5rem] transform translate-y-4 ${isEven ? '-translate-x-4' : 'translate-x-4'} ${feature.bgColor} -z-10`} />
                  <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-[#22C55E]/10 group bg-white border border-white">
                    <div className="aspect-[4/3] w-full relative">
                      <div className="absolute inset-0 bg-[#22C55E]/10 group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none mix-blend-overlay"></div>
                      <Image
                        fill
                        unoptimized
                        src={feature.image}
                        alt={feature.title}
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                </FadeUp>

                {/* Content Section */}
                <FadeUp 
                  delay={0.2} 
                  className="w-full lg:w-1/2 flex flex-col justify-center"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${feature.iconBg} ${feature.color} mb-6 shadow-sm border border-[#22C55E]/10`}>
                    <Icon className="w-8 h-8" strokeWidth={2} />
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] tracking-tight mb-5">
                    {feature.title}
                  </h3>
                  
                  <p className="text-[#64748B] text-lg leading-relaxed mb-8">
                    {feature.description}
                  </p>

                  <ul className="space-y-4">
                    {feature.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-[#334155] font-medium">
                        <CheckCircle2 className={`w-6 h-6 flex-shrink-0 text-[#22C55E]`} />
                        <span className="text-lg">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </FadeUp>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AppFeatures;
