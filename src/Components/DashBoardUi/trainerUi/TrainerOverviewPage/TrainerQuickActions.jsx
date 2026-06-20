import React from 'react';
import Link from 'next/link';
import { CirclePlus, CalendarCheck, FilePlus2, MessageSquare } from 'lucide-react';

const iconMap = {
  CirclePlus,
  CalendarCheck,
  FilePlus2,
  MessageSquare,
};

const TrainerQuickActions = ({ actionButtonsData }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {actionButtonsData.map(action => {
        const Icon = iconMap[action.icon];
        return (
          <Link
            href={action.href}
            key={action.id}
            className="cursor-pointer inline-flex justify-center items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F8FAFC] text-[#16A34A] border border-[#8FE3B0] font-semibold text-sm hover:bg-[#C6F4D6] hover:text-[#15803D] hover:border-[#4AD27A] transition-all duration-200 active:scale-95"
          >
            {Icon && <Icon className="w-4 h-4" />}
            {action.name}
          </Link>
        );
      })}
    </div>
  );
};

export default TrainerQuickActions;
