import Image from 'next/image';
import React from 'react';
import { FadeUp, StaggerContainer, StaggerItem } from '../Animations/MotionWrappers';
const trainers = [
  {
    id: 1,
    name: "Alex Johnson",
    specialty: "Powerlifting",
    experience: "8 Years",
    students: "1,200+",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Sarah Connor",
    specialty: "HIIT & Cardio",
    experience: "5 Years",
    students: "850+",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1061&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Elena Rostova",
    specialty: "Yoga & Flexibility",
    experience: "10 Years",
    students: "2,000+",
    rating: "5.0",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=988&auto=format&fit=crop",
  }
];

const TrainerSpotlight = () => {
  return (
    <section className="py-24 bg-[#FFFFFF]">
      <div className="container mx-auto px-6 lg:px-12">
        <FadeUp className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1E293B] tracking-tight mb-4">
            Meet Our <span className="text-[#22C55E]">Expert Trainers</span>
          </h2>
          <p className="text-[#64748B] text-lg leading-relaxed">
            Train with industry professionals dedicated to helping you unlock your full potential.
          </p>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {trainers.map((trainer) => (
            <StaggerItem key={trainer.id} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2rem] overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="relative h-72 w-full overflow-hidden">
                <Image width={500} height={500} unoptimized 
                  src={trainer.image} 
                  alt={trainer.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/20 to-transparent"></div>
                
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">{trainer.name}</h3>
                    <p className="text-[#8FE3B0] font-semibold text-sm">{trainer.specialty}</p>
                  </div>
                  <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-white font-bold text-sm">{trainer.rating}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-center flex-1 border-r border-[#E2E8F0]">
                    <p className="text-[#64748B] text-xs font-semibold uppercase tracking-wider mb-1">Experience</p>
                    <p className="text-[#1E293B] font-bold text-lg">{trainer.experience}</p>
                  </div>
                  <div className="text-center flex-1">
                    <p className="text-[#64748B] text-xs font-semibold uppercase tracking-wider mb-1">Students</p>
                    <p className="text-[#1E293B] font-bold text-lg">{trainer.students}</p>
                  </div>
                </div>

                <div className="flex justify-center space-x-4">
                  <button className="w-10 h-10 rounded-full bg-[#E2E8F0]/50 flex items-center justify-center text-[#64748B] hover:bg-[#22C55E] hover:text-white transition-colors duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-[#E2E8F0]/50 flex items-center justify-center text-[#64748B] hover:bg-[#22C55E] hover:text-white transition-colors duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-[#E2E8F0]/50 flex items-center justify-center text-[#64748B] hover:bg-[#22C55E] hover:text-white transition-colors duration-300">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </button>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default TrainerSpotlight;
