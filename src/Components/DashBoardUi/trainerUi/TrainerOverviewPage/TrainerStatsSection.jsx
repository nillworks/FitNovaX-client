import React from 'react';
import { Puzzle, Users, MessageSquare } from 'lucide-react';

const iconMap = {
  Puzzle,
  Users,
  MessageSquare
};

const TrainerStatsSection = ({ statsData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {statsData.map((stat) => {
        const Icon = iconMap[stat.icon];
        return (
          <div 
            key={stat.id} 
            className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-6 flex items-center space-x-5 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="bg-[#C6F4D6] p-4 rounded-xl flex items-center justify-center">
              <Icon className="w-8 h-8 text-[#22C55E]" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-[#1E293B] mb-1">{stat.value}</h3>
              <p className="text-sm font-medium text-[#64748B]">{stat.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TrainerStatsSection;
