"use client";
import React from 'react';
import CountUp from 'react-countup';
import { StaggerContainer, StaggerItem } from '../Animations/MotionWrappers';
const stats = [
  {
    id: 1,
    label: 'Total Members',
    end: 25000,
    suffix: '+',
    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
  },
  {
    id: 2,
    label: 'Total Trainers',
    end: 350,
    suffix: '+',
    icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  },
  {
    id: 3,
    label: 'Total Classes',
    end: 1200,
    suffix: '+',
    icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  },
  {
    id: 4,
    label: 'Total Bookings',
    end: 150,
    suffix: 'k+',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
];

const TrustStats = () => {
  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="container mx-auto px-6 lg:px-12">
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          {stats.map(stat => (
            <StaggerItem
              key={stat.id}
              className="bg-[#FFFFFF] p-8 rounded-3xl border border-[#E2E8F0] flex flex-col items-center justify-center text-center shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="w-16 h-16 rounded-full bg-[#C6F4D6] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-[#15803D]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={stat.icon}
                  ></path>
                </svg>
              </div>
              <h3 className="text-4xl font-bold text-[#1E293B] tracking-tight mb-2 group-hover:text-[#22C55E] transition-colors">
                <CountUp end={stat.end} suffix={stat.suffix} duration={2.5} enableScrollSpy scrollSpyOnce />
              </h3>
              <p className="text-[#64748B] font-semibold uppercase tracking-wider text-sm">
                {stat.label}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default TrustStats;
