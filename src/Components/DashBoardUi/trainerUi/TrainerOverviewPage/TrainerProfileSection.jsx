import React from 'react';
import { TrendingUp } from 'lucide-react';

const TrainerProfileSection = ({ profileData, children }) => {
  return (
    <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-8 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex-shrink-0">
        <div className="w-28 h-28 rounded-2xl overflow-hidden border-4 border-[#C6F4D6] shadow-sm">
          <img 
            src={profileData.imageUrl} 
            alt={profileData.name} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <div className="flex-grow flex flex-col justify-center space-y-5">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h2 className="text-3xl font-bold text-[#1E293B]">{profileData.name}</h2>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C6F4D6] text-[#15803D] text-sm font-semibold border border-[#8FE3B0]">
              <TrendingUp className="w-4 h-4" />
              {profileData.role}
            </span>
          </div>
          <p className="text-[#64748B] text-base font-medium">{profileData.email}</p>
        </div>
        
        <div className="pt-1">
            {children}
        </div>
      </div>
    </div>
  );
};

export default TrainerProfileSection;
