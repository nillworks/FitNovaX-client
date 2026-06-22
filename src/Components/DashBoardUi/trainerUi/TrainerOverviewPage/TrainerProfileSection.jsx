import Image from 'next/image';
import React from 'react';
import { TrendingUp, Award, MapPin } from 'lucide-react';

const TrainerProfileSection = ({ profileData, children }) => {
  return (
    <div className="relative bg-white border border-[#E2E8F0] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Decorative Background Banner */}
      <div className="absolute top-0 left-0 w-full h-32 md:h-40 bg-gradient-to-r from-[#15803D] via-[#22C55E] to-[#8FE3B0]"></div>
      
      <div className="relative px-6 md:px-10 pt-20 md:pt-24 pb-8 flex flex-col xl:flex-row items-center xl:items-end justify-between gap-8">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left">
          {/* Profile Image */}
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl bg-white relative z-10 flex-shrink-0">
            <Image width={500} height={500} unoptimized 
              src={profileData.imageUrl} 
              alt={profileData.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Profile Info */}
          <div className="mb-2 md:mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-[#1E293B] tracking-tight">{profileData.name}</h1>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mt-3">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#C6F4D6] text-[#15803D] text-sm font-bold tracking-tight uppercase shadow-sm">
                <Award className="w-4 h-4" />
                {profileData.role}
              </span>
              <span className="text-[#64748B] text-sm font-medium flex items-center gap-1.5 bg-[#F8FAFC] px-3 py-1.5 rounded-full border border-[#E2E8F0]">
                <MapPin className="w-4 h-4 text-[#22C55E]" />
                Trainer Dashboard
              </span>
            </div>
            <p className="text-[#64748B] text-base font-medium mt-4">{profileData.email}</p>
          </div>
        </div>
        
        {/* Quick Actions (Children) */}
        <div className="w-full xl:w-auto mt-4 xl:mt-0 flex justify-center xl:justify-end">
            <div className="bg-[#F8FAFC] p-2 rounded-2xl border border-[#E2E8F0] shadow-sm w-full xl:w-auto">
              {children}
            </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerProfileSection;
