import Image from 'next/image';
import {
  BarChart3,
  CalendarDays,
  Clock,
  Sparkles,
  Users,
} from 'lucide-react';

const formatLabel = value =>
  value
    ? String(value)
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : '—';

const getDifficultyStyle = difficulty => {
  const level = String(difficulty || '').toLowerCase();

  if (level === 'beginner') {
    return 'bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]';
  }
  if (level === 'intermediate') {
    return 'bg-[#FEF9C3] text-[#A16207] border-[#FDE68A]';
  }
  if (level === 'advanced') {
    return 'bg-[#FEE2E2] text-[#B91C1C] border-[#FECACA]';
  }

  return 'bg-white/10 text-white border-white/20';
};

const ClassDetailsHero = ({ classData }) => {
  const spotsLeft = Math.max(
    0,
    Number(classData.maxBookings || 0) - Number(classData.bookedCount || 0),
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
      <div className="lg:col-span-7 flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#22C55E]/20 border border-[#22C55E]/30 text-[#C6F4D6] text-xs font-bold uppercase tracking-wider">
            <Sparkles size={12} />
            {formatLabel(classData.category)}
          </span>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider ${getDifficultyStyle(classData.difficulty)}`}
          >
            {formatLabel(classData.difficulty)}
          </span>
          {classData.status && (
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider capitalize">
              {classData.status}
            </span>
          )}
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
          {classData.className}
        </h1>

        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#22C55E]/50 shadow-lg shrink-0">
            <Image
              src={
                classData.userImage ||
                'https://i.pravatar.cc/150?u=trainer'
              }
              alt={classData.userName || 'Trainer'}
              width={56}
              height={56}
              unoptimized
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-[#94A3B8] text-xs font-bold uppercase tracking-wider mb-0.5">
              Lead Instructor
            </p>
            <p className="text-white text-lg font-bold">
              {classData.userName || 'Trainer'}
            </p>
            <p className="text-[#C6F4D6] text-sm font-medium capitalize">
              {classData.userRole || 'trainer'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            {
              icon: Clock,
              label: 'Duration',
              value: `${classData.duration || '—'} min`,
            },
            {
              icon: Users,
              label: 'Booked',
              value: classData.bookedCount ?? 0,
            },
            {
              icon: BarChart3,
              label: 'Spots Left',
              value: spotsLeft,
            },
            {
              icon: CalendarDays,
              label: 'Max Slots',
              value: classData.maxBookings || '—',
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 hover:bg-white/15 transition-colors"
            >
              <stat.icon size={18} className="text-[#8FE3B0] mb-2" />
              <p className="text-[#94A3B8] text-[10px] font-bold uppercase tracking-wider mb-1">
                {stat.label}
              </p>
              <p className="text-white text-lg font-black">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="relative rounded-[2rem] overflow-hidden border border-white/20 shadow-2xl aspect-[4/3] lg:aspect-[5/4]">
          <Image
            src={
              classData.classImage ||
              'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop'
            }
            alt={classData.className}
            fill
            unoptimized
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 right-5">
            <p className="text-[#C6F4D6] text-xs font-bold uppercase tracking-wider mb-1">
              Session Price
            </p>
            <p className="text-4xl font-black text-white">
              ${classData.price || '0.00'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetailsHero;
