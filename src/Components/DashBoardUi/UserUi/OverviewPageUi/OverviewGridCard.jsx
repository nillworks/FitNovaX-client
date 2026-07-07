import Link from 'next/link';
import { Heart, BookOpen, MessageCircle, Star, TrendingUp, ArrowUpRight, CreditCard, ArrowRight } from 'lucide-react';

const OverviewGridCard = ({ data }) => {
  if (!data) return null;
  
  const getIconInfo = (title) => {
    switch (title) {
      case 'Total Favorites':
        return { 
          icon: Heart, color: 'text-rose-500', bg: 'bg-rose-100', shadow: 'shadow-rose-200',
          btnClass: 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-500 hover:text-white hover:border-rose-500'
        };
      case 'Available Classes':
        return { 
          icon: BookOpen, color: 'text-[#22C55E]', bg: 'bg-[#22C55E]/15', shadow: 'shadow-[#22C55E]/30',
          btnClass: 'bg-[#22C55E]/10 border-[#8FE3B0]/50 text-[#15803D] hover:bg-[#22C55E] hover:text-white hover:border-[#22C55E]'
        };
      case 'Community Posts':
        return { 
          icon: MessageCircle, color: 'text-blue-500', bg: 'bg-blue-100', shadow: 'shadow-blue-200',
          btnClass: 'bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-500 hover:text-white hover:border-blue-500'
        };
      case 'Total Spent':
        return { 
          icon: CreditCard, color: 'text-amber-500', bg: 'bg-amber-100', shadow: 'shadow-amber-200',
          btnClass: 'bg-amber-50 border-amber-200 text-amber-600 hover:bg-amber-500 hover:text-white hover:border-amber-500'
        };
      default:
        return { 
          icon: TrendingUp, color: 'text-[#22C55E]', bg: 'bg-[#22C55E]/15', shadow: 'shadow-[#22C55E]/30',
          btnClass: 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-500 hover:text-white hover:border-gray-500'
        };
    }
  };

  const { icon: Icon, color, bg, shadow, btnClass } = getIconInfo(data.title);

  return (
    <div className="flex flex-col h-full gap-4 relative">
      {/* Header with Title and Icon */}
      <div className="flex items-center justify-between">
        <h4 className="text-[#64748B] text-sm md:text-base font-semibold tracking-tight">{data.title}</h4>
        <div className={`p-2.5 sm:p-3 rounded-2xl ${bg} ${color} shadow-sm ${shadow} transition-transform group-hover:scale-110 group-hover:-rotate-3 duration-300`}>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      </div>
      
      {/* Value and Trend */}
      <div className="flex flex-col gap-3 mt-1 sm:mt-2">
        <div className="flex items-baseline gap-2">
           <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E293B] tracking-tight">{data.value}</p>
        </div>
        
        <div className="relative h-8 mt-1">
          {/* Trend Indicator (Visible by default, hidden on hover) */}
          <div className="absolute inset-0 flex items-center transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-2 origin-left">
            <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#15803D] bg-[#8FE3B0]/30 px-3 py-1.5 rounded-full border border-[#8FE3B0]/50 w-fit backdrop-blur-sm">
              {data.title === 'Community Posts' ? (
                 <MessageCircle className="w-3.5 h-3.5" />
              ) : data.title === 'Total Spent' ? (
                 <CreditCard className="w-3.5 h-3.5" />
              ) : data.title === 'Available Classes' ? (
                 <ArrowUpRight className="w-3.5 h-3.5" />
              ) : (
                 <TrendingUp className="w-3.5 h-3.5" />
              )}
              {data.trend}
            </div>
          </div>

          {/* Action Button (Hidden by default, visible on hover) */}
          <div className="absolute inset-0 flex items-center opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 origin-left pointer-events-none group-hover:pointer-events-auto">
            <Link 
              href={data.link || '#'} 
              className={`flex w-full justify-center items-center gap-2 text-xs sm:text-sm font-bold border shadow-sm px-4 py-1.5 rounded-full transition-colors duration-300 ${btnClass}`}
            >
              {data.buttonText || 'View Details'} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewGridCard;
