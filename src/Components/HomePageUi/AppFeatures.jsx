'use client';

import Image from 'next/image';
import React from 'react';
import { FadeUp } from '../Animations/MotionWrappers';
import { CalendarCheck, Users, Activity, ArrowRight, Zap } from 'lucide-react';

const features = [
  {
    id: 1,
    title: 'Book Classes Seamlessly',
    description:
      'Browse through hundreds of available sessions and secure your spot with just a single tap. Our intuitive interface ensures you never miss a beat.',
    image:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1470&auto=format&fit=crop',
    tags: ['Instant Booking', 'Calendar Sync', 'Reminders'],
    icon: CalendarCheck,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100/80',
    gridSpan: 'lg:col-span-2 lg:row-span-2',
    isBig: true,
  },
  {
    id: 2,
    title: 'Trainer Dashboard',
    description:
      'Empower your coaching business with advanced analytics and client tools.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop',
    tags: ['Analytics', 'Management'],
    icon: Users,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100/80',
    gridSpan: 'lg:col-span-1 lg:row-span-1',
    isBig: false,
  },
  {
    id: 3,
    title: 'Track Your Progress',
    description:
      'Visualize your fitness journey with detailed charts and milestone tracking.',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1415&auto=format&fit=crop',
    tags: ['Goals', 'Metrics'],
    icon: Activity,
    color: 'text-rose-600',
    bgColor: 'bg-rose-100/80',
    gridSpan: 'lg:col-span-1 lg:row-span-1',
    isBig: false,
  },
];

const AppFeatures = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <FadeUp className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-medium text-sm mb-6 shadow-sm">
            <Zap className="w-4 h-4 fill-current" />
            <span>Platform Features</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-6">
            Everything You Need,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">
              All in One Place
            </span>
          </h2>
          <p className="text-[#64748B] text-lg leading-relaxed">
            Discover the powerful tools designed to elevate your fitness
            experience, simplify your routine, and accelerate your results.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <FadeUp
                key={feature.id}
                delay={index * 0.15}
                className={`group relative flex flex-col overflow-hidden rounded-[2rem] bg-[#F8FAFC] border border-[#E2E8F0] hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 ${feature.gridSpan}`}
              >
                {feature.isBig ? (
                  <div className="flex flex-col lg:flex-row h-full">
                    <div className="p-8 lg:p-12 z-10 relative flex-1 flex flex-col justify-center">
                      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${feature.bgColor} ${feature.color} mb-8 group-hover:scale-110 transition-transform duration-500 shadow-sm border border-white`}>
                        <Icon className="w-7 h-7" strokeWidth={2} />
                      </div>
                      <h3 className="text-3xl font-bold text-[#0F172A] tracking-tight mb-4 group-hover:text-blue-600 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-[#64748B] text-lg leading-relaxed mb-8 max-w-md">
                        {feature.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {feature.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-4 py-1.5 text-sm font-medium rounded-full bg-white border border-[#E2E8F0] text-[#475569] shadow-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="relative flex-1 min-h-[300px] w-full lg:w-1/2 mt-8 lg:mt-0 pl-8 lg:pl-0 lg:pt-12 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#F8FAFC] to-transparent w-8 z-10 hidden lg:block" />
                      <Image
                        width={800}
                        height={600}
                        unoptimized
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-full object-cover rounded-tl-2xl shadow-2xl border-t border-l border-white group-hover:scale-[1.02] transition-transform duration-700"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col h-full">
                    <div className="p-8 z-10 relative flex-1">
                      <div className="flex items-center justify-between mb-6">
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${feature.bgColor} ${feature.color} group-hover:scale-110 transition-transform duration-500 shadow-sm border border-white`}>
                          <Icon className="w-6 h-6" strokeWidth={2} />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 shadow-sm">
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-[#0F172A] tracking-tight mb-3 group-hover:text-blue-600 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-[#64748B] leading-relaxed mb-6">
                        {feature.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {feature.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-white border border-[#E2E8F0] text-[#475569] shadow-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="relative h-48 w-full mt-auto pl-8 overflow-hidden">
                      <Image
                        width={600}
                        height={400}
                        unoptimized
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-full object-cover rounded-tl-2xl shadow-xl border-t border-l border-white group-hover:scale-[1.03] transition-transform duration-700"
                      />
                    </div>
                  </div>
                )}
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AppFeatures;
