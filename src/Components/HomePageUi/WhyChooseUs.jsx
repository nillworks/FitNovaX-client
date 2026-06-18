import React from 'react';
import { FadeUp, StaggerContainer, StaggerItem } from '../Animations/MotionWrappers';
const benefits = [
  { id: 1, title: 'Certified Trainers', description: 'Work with industry-leading experts to achieve your goals safely.', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  { id: 2, title: 'Personalized Programs', description: 'Tailored workout plans designed specifically for your body type.', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
  { id: 3, title: 'Flexible Schedule', description: 'Book classes anytime, anywhere. Your fitness, your time.', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  { id: 4, title: 'Community Support', description: 'Join a thriving community that motivates and pushes you.', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
  { id: 5, title: 'Progress Tracking', description: 'Advanced analytics to visualize your transformation journey.', icon: 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z' },
  { id: 6, title: 'Secure Payments', description: 'Hassle-free, secure, and transparent booking and payment process.', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-[#0F172A] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#22C55E]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#16A34A]/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <FadeUp className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Why Choose <span className="text-[#22C55E]">Us</span>
          </h2>
          <p className="text-[#E2E8F0] text-lg leading-relaxed">
            Experience the difference with a premium platform built to elevate your performance.
          </p>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <StaggerItem 
              key={benefit.id} 
              className="bg-[#1E293B]/50 border border-white/10 p-8 rounded-3xl backdrop-blur-md hover:bg-[#1E293B] transition-all duration-300 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#22C55E]/10"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#C6F4D6]/10 flex items-center justify-center mb-6 group-hover:bg-[#22C55E] transition-colors duration-300">
                <svg className="w-7 h-7 text-[#8FE3B0] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={benefit.icon}></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{benefit.title}</h3>
              <p className="text-[#E2E8F0]/70 leading-relaxed text-sm">
                {benefit.description}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default WhyChooseUs;
