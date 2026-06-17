import React from 'react';

const steps = [
  { id: 1, title: 'Discover Classes', description: 'Find the perfect class that fits your goals and schedule.', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
  { id: 2, title: 'Book Session', description: 'Easily secure your spot with our seamless booking system.', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { id: 3, title: 'Train Consistently', description: 'Show up, put in the work, and stay motivated with our community.', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { id: 4, title: 'Track Progress', description: 'Monitor your achievements and celebrate every milestone.', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
];

const FitnessJourney = () => {
  return (
    <section className="py-24 bg-[#F8FAFC] overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block py-1.5 px-4 rounded-full bg-[#8FE3B0]/20 text-[#15803D] text-sm font-bold tracking-widest uppercase mb-4">
            How It Works
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1E293B] tracking-tight mb-4">
            Your Fitness <span className="text-[#22C55E]">Journey</span> Starts Here
          </h2>
          <p className="text-[#64748B] text-lg leading-relaxed">
            Follow these four simple steps to transform your lifestyle and reach your peak potential.
          </p>
        </div>

        <div className="relative">
          {/* Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-[#E2E8F0] z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-full bg-[#FFFFFF] border-4 border-[#C6F4D6] flex items-center justify-center mb-6 shadow-md group-hover:scale-110 group-hover:border-[#22C55E] transition-all duration-300 relative">
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#1E293B] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                    {step.id}
                  </span>
                  <svg className="w-10 h-10 text-[#16A34A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={step.icon}></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#1E293B] mb-3 group-hover:text-[#22C55E] transition-colors">{step.title}</h3>
                <p className="text-[#64748B] leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FitnessJourney;
