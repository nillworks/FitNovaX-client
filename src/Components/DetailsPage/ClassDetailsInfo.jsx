import { CalendarRange, Clock3, FileText, MapPin } from 'lucide-react';

const formatLabel = value =>
  value
    ? String(value)
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : '—';

const formatDate = value => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const ClassDetailsInfo = ({ classData }) => {
  const scheduleDays = Array.isArray(classData.scheduleDays)
    ? classData.scheduleDays
    : [];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7] flex items-center justify-center">
            <FileText size={20} className="text-[#22C55E]" />
          </div>
          <div>
            <h2 className="text-xl font-black text-[#1E293B]">
              About This Class
            </h2>
            <p className="text-sm text-[#64748B] font-medium">
              Full description and what to expect
            </p>
          </div>
        </div>

        <p className="text-[#64748B] text-base leading-relaxed">
          {classData.description ||
            'No description available for this class yet.'}
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center">
            <CalendarRange size={20} className="text-[#2563EB]" />
          </div>
          <div>
            <h2 className="text-xl font-black text-[#1E293B]">
              Schedule & Timing
            </h2>
            <p className="text-sm text-[#64748B] font-medium">
              Plan your training sessions
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {[
            {
              icon: CalendarRange,
              label: 'Start Date',
              value: formatDate(classData.startDate),
            },
            {
              icon: CalendarRange,
              label: 'End Date',
              value: formatDate(classData.endDate),
            },
            {
              icon: Clock3,
              label: 'Start Time',
              value: classData.startTime || '—',
            },
            {
              icon: Clock3,
              label: 'End Time',
              value: classData.endTime || '—',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center shrink-0">
                <item.icon size={18} className="text-[#64748B]" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-0.5">
                  {item.label}
                </p>
                <p className="text-sm font-bold text-[#1E293B]">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-3">
            Training Days
          </p>
          {scheduleDays.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {scheduleDays.map((day, idx) => (
                <span
                  key={`${day}-${idx}`}
                  className="inline-flex items-center px-4 py-2 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7] text-[#15803D] text-sm font-bold capitalize"
                >
                  {formatLabel(day)}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[#64748B] font-medium">
              Schedule days not specified.
            </p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#FFF7ED] border border-[#FFEDD5] flex items-center justify-center">
            <MapPin size={20} className="text-[#EA580C]" />
          </div>
          <h2 className="text-xl font-black text-[#1E293B]">Class Highlights</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Category', value: formatLabel(classData.category) },
            { label: 'Difficulty', value: formatLabel(classData.difficulty) },
            { label: 'Duration', value: `${classData.duration || '—'} min` },
          ].map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-center"
            >
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                {item.label}
              </p>
              <p className="text-base font-black text-[#1E293B]">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassDetailsInfo;
