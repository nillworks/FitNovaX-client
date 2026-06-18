const OverviewGridCard = ({ data }) => {
  if (!data) return null;
  
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-[#64748B] text-sm font-semibold tracking-tight">{data.title}</h4>
      <p className="text-3xl font-bold text-[#1E293B]">{data.value}</p>
      <div className="inline-flex items-center text-xs font-semibold text-[#16A34A] bg-[#C6F4D6] px-2 py-1 rounded-md w-fit">
        {data.trend}
      </div>
    </div>
  );
};

export default OverviewGridCard;
