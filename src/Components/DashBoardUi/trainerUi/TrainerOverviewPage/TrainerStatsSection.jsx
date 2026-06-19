import React from 'react';
import { Puzzle, Users, MessageSquare, TrendingUp } from 'lucide-react';

const iconMap = {
  Puzzle,
  Users,
  MessageSquare
};

const TrainerStatsSection = ({ statsData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
      {statsData.map((stat, index) => {
        const Icon = iconMap[stat.icon];
        
        // Mock a slight percentage increase based on index for visual flair
        const mockIncrease = [12, 8, 24][index % 3];
        
        return (
          <div 
            key={stat.id} 
            className="group relative bg-[#FFFFFF] border border-[#E2E8F0] rounded-3xl p-8 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5"
          >
            {/* Background decoration */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-[#C6F4D6] to-transparent rounded-full opacity-40 group-hover:scale-150 transition-transform duration-700 ease-out"></div>
            
            <div className="relative z-10 flex items-start justify-between">
              <div className="pr-4">
                <p className="text-[#64748B] font-bold text-xs tracking-wider uppercase mb-3">{stat.label}</p>
                <h3 className="text-4xl lg:text-5xl font-bold text-[#1E293B] group-hover:text-[#16A34A] transition-colors tracking-tight">{stat.value}</h3>
              </div>
              <div className="bg-[#F8FAFC] group-hover:bg-[#C6F4D6] p-4 rounded-2xl transition-colors duration-300 shadow-sm border border-[#E2E8F0] group-hover:border-[#8FE3B0]">
                <Icon className="w-8 h-8 text-[#22C55E]" />
              </div>
            </div>
            
            <div className="relative z-10 mt-8 flex items-center text-sm font-semibold text-[#15803D]">
               <div className="flex items-center bg-[#C6F4D6] px-2.5 py-1 rounded-lg mr-3 shadow-sm border border-[#8FE3B0]">
                 <TrendingUp className="w-3.5 h-3.5 mr-1" />
                 +{mockIncrease}%
               </div>
               <span className="text-[#64748B] font-medium">from last month</span>
            </div>
            
            {/* Bottom highlight bar */}
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-[#E2E8F0] group-hover:bg-gradient-to-r group-hover:from-[#22C55E] group-hover:to-[#8FE3B0] transition-all duration-300"></div>
          </div>
        );
      })}
    </div>
  );
};

export default TrainerStatsSection;
