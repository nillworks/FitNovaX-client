import React from 'react';
import { SlideInLeft, SlideInRight, FadeIn, FadeUp } from '../Animations/MotionWrappers';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#15803D]">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
      
      <div className="container mx-auto px-6 lg:px-12 py-20 lg:py-32 relative z-10 flex flex-col lg:flex-row items-center">
        
        {/* Left Side Content */}
        <SlideInLeft className="w-full lg:w-1/2 text-white mb-16 lg:mb-0 lg:pr-12">
          <span className="inline-block py-1.5 px-4 rounded-full bg-[#8FE3B0]/20 border border-[#8FE3B0]/30 text-[#C6F4D6] text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">
            Premium Fitness Platform
          </span>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight mb-6">
            Elevate Your <span className="text-[#22C55E]">Fitness</span> Journey Today.
          </h1>
          <p className="text-lg lg:text-xl text-[#E2E8F0] leading-relaxed mb-10 max-w-xl">
            Join the ultimate community of expert trainers and passionate members. Transform your body and mind with personalized programs and top-tier classes.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5">
            <button className="py-4 px-8 rounded-full bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold tracking-tight transition-all duration-300 shadow-lg hover:shadow-[#22C55E]/20 hover:-translate-y-1">
              Explore Classes
            </button>
            <button className="py-4 px-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold tracking-tight backdrop-blur-md transition-all duration-300 hover:-translate-y-1">
              Become a Trainer
            </button>
          </div>
        </SlideInLeft>

        {/* Right Side Image & Stats */}
        <SlideInRight className="w-full lg:w-1/2 relative" delay={0.2}>
          <div className="relative w-full aspect-[4/5] lg:aspect-square rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop" 
              alt="Fitness Training" 
              className="object-cover w-full h-full object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 to-transparent"></div>
          </div>

          {/* Floating Stat 1 */}
          <div className="absolute top-10 -left-6 lg:-left-12 p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md shadow-2xl animate-pulse">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-[#22C55E]/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-white tracking-tight">15k+</p>
                <p className="text-[#C6F4D6] text-xs font-semibold uppercase tracking-wider">Active Members</p>
              </div>
            </div>
          </div>

          {/* Floating Stat 2 */}
          <div className="absolute bottom-24 -right-4 lg:-right-8 p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md shadow-2xl">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-[#8FE3B0]/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#8FE3B0]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-white tracking-tight">98%</p>
                <p className="text-[#C6F4D6] text-xs font-semibold uppercase tracking-wider">Success Rate</p>
              </div>
            </div>
          </div>
          
          {/* Floating Stat 3 */}
          <div className="absolute -bottom-8 left-10 lg:left-20 p-4 rounded-2xl bg-[#0F172A]/80 border border-white/10 backdrop-blur-xl shadow-2xl">
             <div className="flex items-center space-x-6">
                <div className="text-center">
                  <p className="text-xl font-bold text-[#22C55E]">200+</p>
                  <p className="text-[#64748B] text-[10px] font-bold uppercase tracking-wider">Expert Trainers</p>
                </div>
                <div className="w-px h-8 bg-white/10"></div>
                <div className="text-center">
                  <p className="text-xl font-bold text-[#22C55E]">50k+</p>
                  <p className="text-[#64748B] text-[10px] font-bold uppercase tracking-wider">Classes Done</p>
                </div>
             </div>
          </div>

        </SlideInRight>
      </div>
    </section>
  );
};

export default HeroSection;
