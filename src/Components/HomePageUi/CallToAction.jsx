import React from 'react';
import { ScaleIn, FadeUp } from '../Animations/MotionWrappers';
const CallToAction = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-[#16A34A] to-[#15803D]">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
        <ScaleIn className="max-w-4xl mx-auto">
          <h2 className="text-5xl lg:text-7xl font-bold text-white tracking-tight leading-tight mb-8">
            Start Your Fitness Journey Today
          </h2>
          <p className="text-xl text-[#C6F4D6] leading-relaxed mb-12 max-w-2xl mx-auto">
            Join the community that&apos;s reshaping the way we train, connect, and grow. Whether you&apos;re here to sweat or to coach, your next level starts now.
          </p>
          
          <FadeUp delay={0.3} className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="w-full sm:w-auto py-5 px-10 rounded-full bg-[#FFFFFF] hover:bg-[#F8FAFC] text-[#15803D] font-bold text-lg tracking-tight transition-all duration-300 shadow-xl hover:-translate-y-1">
              Explore Classes
            </button>
            <button className="w-full sm:w-auto py-5 px-10 rounded-full bg-white/20 hover:bg-white/30 border border-white/30 text-white font-bold text-lg tracking-tight backdrop-blur-md transition-all duration-300 shadow-xl hover:-translate-y-1">
              Become a Trainer
            </button>
          </FadeUp>
        </ScaleIn>
      </div>
    </section>
  );
};

export default CallToAction;
