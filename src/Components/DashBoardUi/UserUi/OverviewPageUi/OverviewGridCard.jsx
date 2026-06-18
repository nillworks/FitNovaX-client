const OverviewGridCard = ({ data }) => {
  // If no data passed, use a default fallback
  const stat = data || { title: 'Statistic', value: '0', trend: 'No data' };
  
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-[#64748B] text-sm font-semibold tracking-tight">{stat.title}</h4>
      <p className="text-3xl font-bold text-[#1E293B]">{stat.value}</p>
      <div className="inline-flex items-center text-xs font-semibold text-[#16A34A] bg-[#C6F4D6] px-2 py-1 rounded-md w-fit">
        {stat.trend}
      </div>
    </div>
  );
};

export default OverviewGridCard;
