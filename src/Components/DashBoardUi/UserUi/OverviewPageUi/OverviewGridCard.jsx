import { Heart, BookOpen, MessageCircle, Star, TrendingUp, ArrowUpRight } from 'lucide-react';

const OverviewGridCard = ({ data }) => {
  if (!data) return null;
  
  const getIconInfo = (title) => {
    switch (title) {
      case 'Total Favorites':
        return { icon: Heart, color: 'text-rose-500', bg: 'bg-rose-100', shadow: 'shadow-rose-200' };
      case 'Available Classes':
        return { icon: BookOpen, color: 'text-[#22C55E]', bg: 'bg-[#22C55E]/15', shadow: 'shadow-[#22C55E]/30' };
      case 'Community Posts':
        return { icon: MessageCircle, color: 'text-blue-500', bg: 'bg-blue-100', shadow: 'shadow-blue-200' };
      case 'Featured Classes':
        return { icon: Star, color: 'text-amber-500', bg: 'bg-amber-100', shadow: 'shadow-amber-200' };
      default:
        return { icon: TrendingUp, color: 'text-[#22C55E]', bg: 'bg-[#22C55E]/15', shadow: 'shadow-[#22C55E]/30' };
    }
  };

  const { icon: Icon, color, bg, shadow } = getIconInfo(data.title);

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
        <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#15803D] bg-[#8FE3B0]/30 px-3 py-1.5 rounded-full border border-[#8FE3B0]/50 w-fit backdrop-blur-sm group-hover:bg-[#8FE3B0]/50 transition-colors duration-300">
          {data.title === 'Community Posts' ? (
             <MessageCircle className="w-3.5 h-3.5" />
          ) : data.title === 'Featured Classes' ? (
             <Star className="w-3.5 h-3.5" />
          ) : data.title === 'Available Classes' ? (
             <ArrowUpRight className="w-3.5 h-3.5" />
          ) : (
             <TrendingUp className="w-3.5 h-3.5" />
          )}
          {data.trend}
        </div>
      </div>
    </div>
  );
};

export default OverviewGridCard;
